"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href={href} className="block group">
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
          <div className="relative rounded-[20px] overflow-hidden w-full aspect-[16/9]" style={{ backgroundColor: imagePlaceholderColor }}>
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

          <p className="text-[16px] font-medium text-text-primary underline">
            Check it out
          </p>
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
