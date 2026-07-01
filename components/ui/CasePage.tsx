"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import BackButton from "./BackButton";
import CaseSummary, { type CaseSummarySection } from "./CaseSummary";

interface Section {
  label?: string;
  content: React.ReactNode;
  contentMaxWidthClassName?: string;
  containerClassName?: string;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
}

interface TeamMember {
  imageSrc: string;
  imageAlt: string;
  tooltip: string;
  imageClassName?: string;
  profileUrl?: string;
}

interface CaseNavItem {
  href: string;
  title: string;
}

interface CaseSummaryContent {
  preview: string;
  sections?: CaseSummarySection[];
  full?: string;
}

interface CasePageProps {
  title: string;
  description: string;
  tags: string[];
  summary?: CaseSummaryContent;
  metrics?: { value: string; label: string }[];
  imagePlaceholderColor?: string;
  heroContent?: React.ReactNode;
  sections: Section[];
  teamMembers?: TeamMember[];
  teamExtraCount?: number;
  previousCase?: CaseNavItem;
  nextCase?: CaseNavItem;
  compactExploreCards?: boolean;
}

function normalizeSectionLabel(label?: string) {
  return (label ?? "").trim().toLowerCase();
}

export default function CasePage({
  title,
  summary,
  metrics = [],
  imagePlaceholderColor = "#E8E8EE",
  heroContent,
  sections,
  teamMembers = [
    { imageSrc: "/images/team/team-member-1.png", imageAlt: "Team member 1", tooltip: "Team member 1", imageClassName: "object-center" },
    { imageSrc: "/images/team/team-member-2.png", imageAlt: "Team member 2", tooltip: "Team member 2" },
    { imageSrc: "/images/team/team-member-3.png", imageAlt: "Team member 3", tooltip: "Team member 3" },
    { imageSrc: "/images/team/team-member-4.png", imageAlt: "Team member 4", tooltip: "Team member 4" },
  ],
  teamExtraCount,
  previousCase,
  nextCase,
  compactExploreCards = false,
}: CasePageProps) {
  const miniMapLabels = sections
    .filter((section): section is Section & { label: string } => Boolean(section.label))
    .map((section) => section.label);
  const hasMiniMap = miniMapLabels.length > 0;
  const isCompactPreviousCard = compactExploreCards || previousCase?.href === "/player";
  const isCompactNextCard = compactExploreCards || nextCase?.href === "/network-insight";
  const reduceMotion = useReducedMotion();

  const scrollReveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.4, ease: "easeOut" as const, delay },
        };

  return (
    <div data-case-content-root className="relative flex flex-col gap-8 min-[810px]:gap-10">
      {hasMiniMap && <CaseScrollMiniMap labels={miniMapLabels} />}
      {/* Close button — sticky overlay, zero layout height */}
      <div className="sticky top-6 z-20 flex h-0 -translate-y-2 justify-end overflow-visible">
        <BackButton variant="close" alwaysVisible />
      </div>

      {/* Hero image placeholder */}
      {heroContent ? (
        <motion.div className="-mt-8 w-full relative min-[810px]:-mt-10" {...scrollReveal(0)}>
          {heroContent}
        </motion.div>
      ) : (
        <motion.div
          className="-mt-8 w-full rounded-[20px] relative min-[810px]:-mt-10"
          style={{
            backgroundColor: imagePlaceholderColor,
            aspectRatio: "16/9",
          }}
          {...scrollReveal(0)}
        >
          {metrics.length > 0 && (
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
              {metrics.map((m, i) => (
                <div key={i} className="flex flex-col rounded-lg bg-bg-chip px-2 py-2">
                  <span className="text-[16px] font-semibold leading-tight text-text-primary">{m.value}</span>
                  <span className="text-[11px] font-normal text-text-secondary leading-tight">{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      <motion.h1
        data-case-title
        className="mx-auto w-full max-w-[800px] text-[28px] font-semibold leading-[34px] tracking-[-0.9px] text-text-primary min-[810px]:text-[32px] min-[810px]:leading-10 min-[810px]:tracking-[-1.2px]"
        {...scrollReveal(0)}
      >
        {title}
      </motion.h1>

      {summary && (
        <motion.div {...scrollReveal(0.05)}>
          <CaseSummary preview={summary.preview} sections={summary.sections} full={summary.full} />
        </motion.div>
      )}

      {/* Sections */}
      {sections.map((section, i) => {
        const navIndex = section.label
          ? miniMapLabels.findIndex(
              (label) => normalizeSectionLabel(label) === normalizeSectionLabel(section.label),
            )
          : -1;

        return (
        <motion.div
          key={i}
          data-case-nav-index={navIndex >= 0 ? navIndex : undefined}
          className={`mx-auto flex w-full flex-col ${section.label ? "case-section-label-gap" : ""} ${section.contentMaxWidthClassName ?? "max-w-[800px]"} ${section.containerClassName ?? ""}`}
          {...scrollReveal(Math.min(i * 0.05, 0.25))}
        >
          {section.label && (
            <h2
              className={`w-full text-[23px] font-semibold leading-7 tracking-[-0.8px] lowercase text-accent min-[810px]:text-[26px] min-[810px]:leading-8 min-[810px]:tracking-[-1.2px] ${section.labelClassName ?? ""}`}
              style={section.labelStyle}
            >
              {section.label}
            </h2>
          )}
          <div className="w-full text-[17px] font-medium leading-7 tracking-[-0.45px] text-text-primary min-[810px]:text-[19px] min-[810px]:tracking-[-0.6px]">
            {section.content}
          </div>
        </motion.div>
        );
      })}

      <motion.div
        aria-hidden="true"
        className="divider-line"
        {...scrollReveal(0)}
      />
      <motion.div className="mx-auto flex w-full max-w-[800px] flex-col items-center gap-3 py-1" {...scrollReveal(0)}>
        <p className="text-[20px] font-semibold leading-none text-text-primary">Team</p>
        <div className="flex items-center gap-3">
          {teamMembers.map((member, index) => {
            const commonClassName = `${index > 0 ? "-ml-1 " : ""}group relative block`;

            return member.profileUrl ? (
              <a
                key={`${member.imageSrc}-${index}`}
                className={commonClassName}
                href={member.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.tooltip} LinkedIn profile`}
              >
                <div className="pointer-events-none absolute -inset-1 rounded-full border-2 border-accent opacity-0 scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100" />
                <div className="h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={member.imageSrc}
                    alt={member.imageAlt}
                    width={32}
                    height={32}
                    className={`h-full w-full object-cover ${member.imageClassName ?? ""}`.trim()}
                  />
                </div>
                <div
                  className="pointer-events-none absolute -top-8 left-1/2 flex h-6 -translate-x-1/2 items-center whitespace-nowrap rounded-[5px] px-3 text-[13px] font-medium leading-none text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  style={{ backgroundColor: "var(--color-tooltip-bg)" }}
                >
                  {member.tooltip}
                </div>
              </a>
            ) : (
              <div key={`${member.imageSrc}-${index}`} className={commonClassName}>
                <div className="pointer-events-none absolute -inset-1 rounded-full border-2 border-accent opacity-0 scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100" />
                <div className="h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={member.imageSrc}
                    alt={member.imageAlt}
                    width={32}
                    height={32}
                    className={`h-full w-full object-cover ${member.imageClassName ?? ""}`.trim()}
                  />
                </div>
                <div
                  className="pointer-events-none absolute -top-8 left-1/2 flex h-6 -translate-x-1/2 items-center whitespace-nowrap rounded-[5px] px-3 text-[13px] font-medium leading-none text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  style={{ backgroundColor: "var(--color-tooltip-bg)" }}
                >
                  {member.tooltip}
                </div>
              </div>
            );
          })}
          {typeof teamExtraCount === "number" && teamExtraCount > 0 && (
            <div className="-ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-bg-muted text-[12px] font-semibold leading-none text-text-secondary">
              +{teamExtraCount}
            </div>
          )}
        </div>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="divider-line"
        {...scrollReveal(0)}
      />
      {(previousCase || nextCase) && (
        <motion.div className="mx-auto flex w-full max-w-[800px] flex-col gap-6 pt-2" {...scrollReveal(0)}>
          <h3 className="text-[24px] font-semibold leading-[0.95] tracking-[-0.8px] text-text-primary lowercase min-[810px]:text-[26px] min-[810px]:tracking-[-1.2px]">
            explore more
          </h3>
          <div className="grid w-full gap-4 min-[810px]:gap-5 min-[810px]:grid-cols-2">
            {previousCase ? (
              <Link
                href={previousCase.href}
                className={`group flex flex-col justify-center rounded-[20px] bg-bg-muted py-5 transition-colors duration-200 hover:bg-bg-muted-hover ${
                  isCompactPreviousCard ? "h-[99px] px-5" : "min-h-[112px] px-6"
                }`}
              >
                <div className="flex flex-col gap-3">
                  <div
                    className={`flex gap-3 ${
                      isCompactPreviousCard ? "flex-row justify-start items-center" : "flex-col"
                    }`}
                  >
                    <span
                      className={`leading-none text-text-secondary ${
                        isCompactPreviousCard
                          ? "inline-flex h-6 w-6 shrink-0 items-center justify-center text-[22px]"
                          : "text-[22px]"
                      }`}
                    >
                      ←
                    </span>
                    <span
                      className={`font-medium leading-none tracking-[-0.8px] text-text-secondary ${
                        isCompactPreviousCard ? "text-[16px]" : "text-[30px]"
                      }`}
                    >
                      Previous
                    </span>
                  </div>
                  <span
                    className={`line-clamp-1 font-medium tracking-[-1px] text-text-primary ${
                      isCompactPreviousCard ? "h-fit text-[19px] leading-[120%]" : "text-[40px] leading-none"
                    }`}
                  >
                    {previousCase.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextCase ? (
              <Link
                href={nextCase.href}
                className={`group flex flex-col justify-center rounded-[20px] bg-bg-muted py-5 transition-colors duration-200 hover:bg-bg-muted-hover ${
                  isCompactNextCard ? "h-[99px] gap-0 px-5" : "min-h-[112px] gap-3 px-6"
                }`}
              >
                <div className="flex flex-col gap-3">
                  <div
                    className={`flex ${
                      isCompactNextCard ? "flex-row items-center justify-start gap-3" : "flex-col gap-1"
                    }`}
                  >
                    <span
                      className={`font-medium leading-none tracking-[-0.8px] text-text-secondary ${
                        isCompactNextCard ? "h-fit w-fit text-[16px]" : "text-[30px]"
                      }`}
                    >
                      Next
                    </span>
                    <span
                      className={`leading-none text-text-secondary ${
                        isCompactNextCard
                          ? "inline-flex h-6 w-6 shrink-0 items-center justify-center text-[22px]"
                          : "text-[22px]"
                      }`}
                    >
                      →
                    </span>
                  </div>
                  <span
                    className={`line-clamp-1 font-medium tracking-[-1px] text-text-primary ${
                      isCompactNextCard ? "text-[19px] leading-[120%]" : "text-[40px] leading-none"
                    }`}
                  >
                    {nextCase.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function CaseScrollMiniMap({ labels }: { labels: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [minimapOffsetTop, setMinimapOffsetTop] = useState(0);
  const [stickyPinnedTop, setStickyPinnedTop] = useState(0);
  const [isMapHovered, setIsMapHovered] = useState(false);

  useLayoutEffect(() => {
    const updateLayout = () => {
      const rootEl = document.querySelector<HTMLElement>("[data-case-content-root]");
      const titleEl = document.querySelector<HTMLElement>("[data-case-title]");
      const pinnedTop = Math.round(window.innerHeight * 0.42);

      setStickyPinnedTop(pinnedTop);

      if (rootEl && titleEl) {
        const rootRect = rootEl.getBoundingClientRect();
        const titleRect = titleEl.getBoundingClientRect();
        setMinimapOffsetTop(Math.max(0, Math.round(titleRect.top - rootRect.top)));
      }

      const sectionNodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-case-nav-index]"),
      ).sort(
        (a, b) =>
          Number(a.dataset.caseNavIndex ?? "0") - Number(b.dataset.caseNavIndex ?? "0"),
      );
      if (sectionNodes.length === 0) {
        return;
      }

      const anchorY = window.innerHeight * 0.36;
      let nextActive = 0;
      for (let i = 0; i < sectionNodes.length; i += 1) {
        const rect = sectionNodes[i].getBoundingClientRect();
        if (rect.top <= anchorY) {
          nextActive = i;
        } else {
          break;
        }
      }
      setActiveIndex(nextActive);
    };

    updateLayout();

    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(updateLayout);
    });

    const rootEl = document.querySelector<HTMLElement>("[data-case-content-root]");
    const titleEl = document.querySelector<HTMLElement>("[data-case-title]");
    const resizeObserver = new ResizeObserver(updateLayout);

    if (rootEl) {
      resizeObserver.observe(rootEl);
    }
    if (titleEl) {
      resizeObserver.observe(titleEl);
    }

    window.addEventListener("scroll", updateLayout, { passive: true });
    window.addEventListener("resize", updateLayout);
    window.addEventListener("load", updateLayout);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateLayout);
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("load", updateLayout);
    };
  }, []);

  const scrollToSection = (index: number) => {
    const target = document.querySelector<HTMLElement>(`[data-case-nav-index="${index}"]`);
    if (!target) {
      return;
    }
    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div
      className="pointer-events-none absolute left-[-34px] top-0 z-10 hidden h-full min-[1200px]:block"
      style={{ paddingTop: minimapOffsetTop }}
    >
      <div className="sticky" style={{ top: stickyPinnedTop }}>
        <div
          className="pointer-events-auto relative flex flex-col gap-2 py-1"
          onMouseEnter={() => setIsMapHovered(true)}
          onMouseLeave={() => {
            setIsMapHovered(false);
          }}
        >
          <div
            className={`absolute left-[-12px] top-1/2 z-20 w-[200px] -translate-y-1/2 rounded-[16px] border border-[var(--color-divider)] bg-bg-elevated p-2 shadow-[var(--color-minimap-popover-shadow)] transition-[opacity,transform] duration-150 ${
              isMapHovered ? "pointer-events-auto translate-x-0 opacity-100" : "pointer-events-none -translate-x-1 opacity-0"
            }`}
          >
            <ul className="flex flex-col gap-0.5">
              {labels.map((label, index) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(index)}
                    className={`block w-full truncate rounded-[8px] px-2 py-2 text-left text-[13px] font-medium leading-[1.35] tracking-[-0.2px] transition-colors duration-150 hover:bg-[var(--color-minimap-item-hover)] ${
                      index === activeIndex ? "text-accent" : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {labels.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => scrollToSection(index)}
              aria-label={`Go to ${label}`}
              className={`block h-[2px] rounded-full transition-[color,background-color,width] duration-200 focus-visible:outline-none ${
                index === activeIndex
                  ? "w-[12px] bg-[var(--color-minimap-line-active)]"
                  : "w-[8px] bg-[var(--color-minimap-line)] hover:bg-[var(--color-minimap-line-hover)]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
