"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

interface Metric {
  value: string;
  label: string;
}

interface CaseCardProps {
  href: string;
  title: string;
  description: string;
  tags: string[];
  metrics?: Metric[];
  imagePlaceholderColor?: string;
}

export default function CaseCard({
  href,
  title,
  description,
  tags,
  metrics = [],
  imagePlaceholderColor = "#E8E8EE",
}: CaseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isCreateCard = href === "/create";
  const isNetworkInsightCard = href === "/network-insight";
  const isDesignSystemCard = href === "/design-system";
  const isPlayerCard = href === "/player";
  const isAiAgentChatCard = href === "/ai-agent-chat";
  const shouldUseAutoHeightMedia =
    isCreateCard ||
    isNetworkInsightCard ||
    isDesignSystemCard ||
    isPlayerCard ||
    isAiAgentChatCard;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href={href} className="block group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="flex flex-col gap-3">
          <h2 className="text-[26px] font-semibold leading-8 tracking-[-1.2px] text-text-primary group-hover:opacity-80 transition-opacity">
            {title}
          </h2>
          <p className="text-[16px] font-medium leading-5 tracking-[-0.64px] text-text-secondary">
            {description}
          </p>
          {tags.length > 0 && (
            <p className="text-[13px] font-medium text-text-tertiary tracking-[-0.52px]">
              {tags.join(" • ")}
            </p>
          )}

          {/* Image with metrics chips */}
          <div
            className={`relative rounded-[20px] overflow-hidden w-full ${shouldUseAutoHeightMedia ? "" : "aspect-[16/9]"}`}
            style={{ backgroundColor: imagePlaceholderColor }}
          >
            {isCreateCard && (
              <video
                src="/videos/about/create.webm"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="block h-auto w-full object-contain"
              />
            )}
            {isNetworkInsightCard && (
              <Image
                src="/images/cases/network-insight/main.png"
                alt="Network Insight interface preview"
                width={1024}
                height={640}
                className="block h-auto w-full object-contain"
                sizes="(min-width: 1200px) 640px, (min-width: 768px) 60vw, 100vw"
                unoptimized
                priority={false}
              />
            )}
            {isDesignSystemCard && (
              <Image
                src="/images/cases/design-system/main.png"
                alt="Design system components overview"
                width={1024}
                height={656}
                className="block h-auto w-full object-contain"
                sizes="(min-width: 1200px) 640px, (min-width: 768px) 60vw, 100vw"
                unoptimized
                priority={false}
              />
            )}
            {isPlayerCard && (
              <Image
                src="/images/cases/player/main.png"
                alt="Player product interface preview"
                width={5424}
                height={3480}
                className="block h-auto w-full object-contain"
                sizes="(min-width: 1200px) 640px, (min-width: 768px) 60vw, 100vw"
                unoptimized
                priority={false}
              />
            )}
            {isAiAgentChatCard && (
              <Image
                src="/images/cases/ai-agent-chat/main.png"
                alt="AI agent chat interface preview"
                width={5424}
                height={3480}
                className="block h-auto w-full object-contain"
                sizes="(min-width: 1200px) 640px, (min-width: 768px) 60vw, 100vw"
                unoptimized
                priority={false}
              />
            )}
            <motion.div
              className="pointer-events-none absolute left-[-15px] top-0 z-20"
              initial={false}
              animate={{ x: isHovered ? 0 : "-110%" }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
            >
              <img src="/icons/checkout-block.svg" alt="" aria-hidden="true" className="block h-auto w-[201px] select-none" draggable={false} />
              <span className="absolute left-12 top-3.5 inline-flex items-baseline gap-2 text-[14px] font-semibold leading-none tracking-[-0.04em] text-text-primary">
                Check it out
                <span aria-hidden="true" className="inline-flex h-4 w-4 items-center justify-center text-[16px] leading-none">
                  <span className="relative top-[1px]">→</span>
                </span>
              </span>
            </motion.div>
            {metrics.length > 0 && (
              <div
                className={`absolute bottom-3 right-3 flex flex-nowrap items-start justify-center rounded-[12px] bg-[rgba(150,150,150,0.2)] p-1 backdrop-blur-[12px] ${
                  href === "/player" || href === "/create" ? "gap-1" : "gap-2"
                }`}
              >
                {metrics.map((m, i) => (
                  <MetricChip key={i} value={m.value} label={m.label} />
                ))}
              </div>
            )}
          </div>

        </div>
      </Link>
    </motion.div>
  );
}

function MetricChip({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="flex flex-col items-center justify-start rounded-lg px-2 py-2"
      style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
    >
      <span className="w-fit text-[16px] font-bold leading-tight text-text-primary">{value}</span>
      <span className="text-[11px] font-semibold leading-tight tracking-[-0.3px] text-text-secondary">{label}</span>
    </div>
  );
}
