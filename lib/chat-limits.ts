import type { NextRequest } from "next/server";

export const CHAT_MAX_MESSAGE_LENGTH = 800;
export const CHAT_MAX_CONVERSATION_MESSAGES = 12;
export const CHAT_RATE_LIMIT_MAX_REQUESTS = 15;
export const CHAT_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

export function validateChatMessages(
  input: unknown,
):
  | { ok: true; messages: ChatMessage[] }
  | { ok: false; error: string; status: number } {
  if (!Array.isArray(input) || input.length === 0) {
    return {
      ok: false,
      error: "Please enter a message to continue.",
      status: 400,
    };
  }

  const sanitized: ChatMessage[] = [];

  for (const item of input) {
    if (
      !item ||
      typeof item !== "object" ||
      (item.role !== "user" && item.role !== "assistant") ||
      typeof item.content !== "string"
    ) {
      return {
        ok: false,
        error: "Invalid message format.",
        status: 400,
      };
    }

    const content = item.content.trim();
    if (!content) {
      continue;
    }

    if (content.length > CHAT_MAX_MESSAGE_LENGTH) {
      return {
        ok: false,
        error: `Messages must be ${CHAT_MAX_MESSAGE_LENGTH} characters or fewer.`,
        status: 400,
      };
    }

    sanitized.push({ role: item.role, content });
  }

  if (sanitized.length === 0) {
    return {
      ok: false,
      error: "Please enter a message to continue.",
      status: 400,
    };
  }

  const trimmedHistory = sanitized.slice(-CHAT_MAX_CONVERSATION_MESSAGES);

  if (trimmedHistory.at(-1)?.role !== "user") {
    return {
      ok: false,
      error: "The latest message must be from the user.",
      status: 400,
    };
  }

  return { ok: true, messages: trimmedHistory };
}
