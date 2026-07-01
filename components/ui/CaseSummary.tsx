"use client";

import { useId, useState } from "react";
import { CaseSummarySectionIcon } from "./caseSummarySectionIcons";

export type CaseSummaryIcon =
  | "user-group-02"
  | "pen-01"
  | "star"
  | "checkmark-badge-01"
  | "chart"
  | "money-bag-02"
  | "user-03"
  | "paintbrush"
  | "alert-02"
  | "login-circle-01"
  | "ai-brain-01";

export interface CaseSummarySection {
  icon: CaseSummaryIcon;
  title: string;
  description: string;
}

export interface CaseSummaryProps {
  preview: string;
  sections?: CaseSummarySection[];
  full?: string;
}

function AiStarsIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
    >
      <path
        d="M6.66667 4.66666L6.32277 5.59602C5.87183 6.81466 5.64635 7.42399 5.20185 7.86852C4.75735 8.31299 4.14803 8.53846 2.92937 8.98946L2 9.33332L2.92937 9.67719C4.14803 10.1282 4.75735 10.3537 5.20185 10.7981C5.64635 11.2427 5.87183 11.852 6.32277 13.0706L6.66667 14L7.01053 13.0706C7.46153 11.852 7.687 11.2427 8.13147 10.7981C8.576 10.3537 9.18533 10.1282 10.4039 9.67719L11.3333 9.33332L10.4039 8.98946C9.18533 8.53846 8.576 8.31299 8.13147 7.86852C7.687 7.42399 7.46153 6.81466 7.01053 5.59602L6.66667 4.66666Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M12 2L11.8526 2.3983C11.6593 2.92058 11.5627 3.18173 11.3722 3.37222C11.1817 3.56272 10.9206 3.65935 10.3983 3.85261L10 4L10.3983 4.14739C10.9206 4.34065 11.1817 4.43728 11.3722 4.62778C11.5627 4.81827 11.6593 5.07942 11.8526 5.6017L12 6L12.1474 5.6017C12.3407 5.07942 12.4373 4.81827 12.6278 4.62777C12.8183 4.43728 13.0794 4.34065 13.6017 4.14739L14 4L13.6017 3.85261C13.0794 3.65935 12.8183 3.56272 12.6278 3.37222C12.4373 3.18173 12.3407 2.92058 12.1474 2.3983L12 2Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionIcon({ icon }: { icon: CaseSummaryIcon }) {
  return <CaseSummarySectionIcon icon={icon} />;
}

function ChevronIcon({ className, expanded }: { className?: string; expanded: boolean }) {
  return (
    <svg
      className={`${className ?? ""} transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CaseSummary({ preview, sections, full }: CaseSummaryProps) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();
  const hasSections = Boolean(sections?.length);
  const isLegacyExpandable = Boolean(full?.trim() && full.trim() !== preview.trim());
  const isExpandable = hasSections || isLegacyExpandable;
  const canExpandByCard = isExpandable && !expanded;

  const handleCardClick = () => {
    if (canExpandByCard) {
      setExpanded(true);
    }
  };

  const handleCardKeyDown = (event: React.KeyboardEvent) => {
    if (canExpandByCard && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      setExpanded(true);
    }
  };

  const handleCollapse = (event: React.MouseEvent) => {
    event.stopPropagation();
    setExpanded(false);
  };

  return (
    <div className="mx-auto w-full max-w-[800px]">
      <div
        className={`group relative overflow-hidden rounded-2xl px-2 pt-3 pb-1.5 ${canExpandByCard ? "cursor-pointer" : ""}`}
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        role={canExpandByCard ? "button" : undefined}
        tabIndex={canExpandByCard ? 0 : undefined}
        aria-expanded={isExpandable ? expanded : undefined}
      >
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#F6F0FA] via-[#FAF8FC] to-[#EFF5FC] dark:from-[#1A1524] dark:via-[#12101A] dark:to-[#101520]"
        />
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#EDE0F7] via-[#F2EBFC] to-[#DCE8FA] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-[#241C34] dark:via-[#1A1628] dark:to-[#152035]"
        />
        {expanded && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-14 rounded-b-2xl opacity-0 transition-opacity duration-300 group-has-[.collapse-trigger:hover]:opacity-100"
            style={{
              background:
                "linear-gradient(to top, rgba(107, 78, 155, 0.22) 0%, rgba(107, 78, 155, 0.08) 40%, transparent 100%)",
            }}
          />
        )}
        <div className="relative flex flex-col gap-2">
          <div className="mx-2 flex items-center justify-start gap-1 text-[#6B4E9B] dark:text-[#B49AE0]">
            <AiStarsIcon />
            <span className="text-[15px] font-semibold leading-5 tracking-[-0.3px] min-[810px]:text-[16px]">
              Summarized for you
            </span>
          </div>

          <p
            id={contentId}
            className="mx-2 text-[16px] font-medium leading-[120%] tracking-[-0.2px] text-text-primary"
          >
            {hasSections || !expanded ? preview : full}
          </p>

          {hasSections && (
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="mx-2 flex flex-col gap-4 pb-1 pt-2">
                  {sections?.map((section) => (
                    <div key={section.title} className="flex items-start gap-2 px-4">
                      <div className="shrink-0 text-[#6B4E9B] dark:text-[#B49AE0]">
                        <SectionIcon icon={section.icon} />
                      </div>
                      <div className="min-w-0 flex flex-col gap-2">
                        <h3 className="h-5 text-[15px] font-semibold leading-5 tracking-[-0.3px] text-text-primary min-[810px]:text-[16px]">
                          {section.title}
                        </h3>
                        <p className="text-[16px] font-medium leading-[120%] tracking-[-0.2px] text-text-primary">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {isExpandable && (
            <button
              type="button"
              onClick={expanded ? handleCollapse : undefined}
              aria-expanded={expanded}
              aria-controls={contentId}
              className={`mx-auto flex h-4 w-9 items-center justify-center text-text-secondary transition-colors hover:text-text-primary ${expanded ? "collapse-trigger relative z-10 mt-1" : ""}`}
            >
              <span className="sr-only">{expanded ? "Collapse summary" : "Expand summary"}</span>
              <ChevronIcon expanded={expanded} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
