import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/agent-knowledge";
import { getClientIp, validateChatMessages } from "@/lib/chat-limits";
import { checkChatRateLimit } from "@/lib/chat-rate-limit";

const anthropic = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = validateChatMessages(body.messages);

    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.error },
        { status: validation.status },
      );
    }

    const clientIp = getClientIp(req);
    const rateLimit = checkChatRateLimit(clientIp);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error:
            "Too many requests. Please wait a few minutes and try again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
          },
        },
      );
    }

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: validation.messages,
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const reply = textBlock?.type === "text" ? textBlock.text : "";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or reach out directly." },
      { status: 500 },
    );
  }
}
