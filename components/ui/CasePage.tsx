"use client";

import { motion } from "framer-motion";
import BackButton from "./BackButton";

interface Section {
  label: string;
  content: React.ReactNode;
}

interface CasePageProps {
  title: string;
  description: string;
  tags: string[];
  metrics?: { value: string; label: string }[];
  imagePlaceholderColor?: string;
  sections: Section[];
}

export default function CasePage({
  title,
  metrics = [],
  imagePlaceholderColor = "#E8E8EE",
  sections,
}: CasePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col gap-8"
    >
      {/* Back button */}
      <div className="sticky top-6 z-20 mt-1">
        <BackButton />
      </div>

      {/* Hero image placeholder */}
      <div
        className="-mt-5 w-full rounded-[20px] relative"
        style={{
          backgroundColor: imagePlaceholderColor,
          aspectRatio: "16/9",
        }}
      >
        {metrics.length > 0 && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="rounded-lg px-2 py-2 flex flex-col"
                style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
              >
                <span className="text-[16px] font-semibold leading-tight text-text-primary">{m.value}</span>
                <span className="text-[11px] font-normal text-text-secondary leading-tight">{m.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <h1 className="mx-auto w-full max-w-[800px] text-[32px] font-semibold leading-10 tracking-[-1.2px] text-text-primary">
        {title}
      </h1>

      {/* Sections */}
      {sections.map((section, i) => (
        <div key={i} className="mx-auto flex w-full max-w-[800px] flex-col gap-6">
          <h2 className="w-full text-[26px] font-semibold leading-8 tracking-[-1.2px] text-accent lowercase">
            {section.label}
          </h2>
          <div className="w-full text-[19px] font-medium leading-7 tracking-[-0.6px] text-text-primary">
            {section.content}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
