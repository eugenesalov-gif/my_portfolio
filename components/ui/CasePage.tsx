"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import BackButton from "./BackButton";

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

interface CasePageProps {
  title: string;
  description: string;
  tags: string[];
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

export default function CasePage({
  title,
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
  const isCompactPreviousCard = compactExploreCards || previousCase?.href === "/player";
  const isCompactNextCard = compactExploreCards || nextCase?.href === "/network-insight";

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
      {heroContent ? (
        <div className="-mt-5 w-full relative">{heroContent}</div>
      ) : (
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
      )}

      <h1 className="mx-auto w-full max-w-[800px] text-[32px] font-semibold leading-10 tracking-[-1.2px] text-text-primary">
        {title}
      </h1>

      {/* Sections */}
      {sections.map((section, i) => (
        <div
          key={i}
          className={`mx-auto flex w-full flex-col gap-5 ${section.contentMaxWidthClassName ?? "max-w-[800px]"} ${section.containerClassName ?? ""}`}
        >
          {section.label && (
            <h2
              className={`w-full text-[26px] font-semibold leading-8 tracking-[-1.2px] lowercase ${section.labelClassName ?? ""}`}
              style={section.labelStyle ?? { color: "rgba(14, 154, 255, 1)" }}
            >
              {section.label}
            </h2>
          )}
          <div className="w-full text-[19px] font-medium leading-7 tracking-[-0.6px] text-text-primary">
            {section.content}
          </div>
        </div>
      ))}

      <div
        aria-hidden="true"
        className="h-px w-full bg-[linear-gradient(90deg,#FFFFFF00_0%,#EBEBEB_50%,#FFFFFF00_100%)]"
      />
      <div className="mx-auto flex w-full max-w-[800px] flex-col items-center gap-3 py-1">
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
                <div className="pointer-events-none absolute -inset-1 rounded-full border-2 border-[#0E9AFF] opacity-0 scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100" />
                <div className="h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={member.imageSrc}
                    alt={member.imageAlt}
                    width={32}
                    height={32}
                    className={`h-full w-full object-cover ${member.imageClassName ?? ""}`.trim()}
                  />
                </div>
                <div className="pointer-events-none absolute -top-8 left-1/2 flex h-6 -translate-x-1/2 items-center whitespace-nowrap rounded-[5px] bg-[#4A4A56] px-3 text-[13px] font-medium leading-none text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {member.tooltip}
                </div>
              </a>
            ) : (
              <div key={`${member.imageSrc}-${index}`} className={commonClassName}>
                <div className="pointer-events-none absolute -inset-1 rounded-full border-2 border-[#0E9AFF] opacity-0 scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100" />
                <div className="h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={member.imageSrc}
                    alt={member.imageAlt}
                    width={32}
                    height={32}
                    className={`h-full w-full object-cover ${member.imageClassName ?? ""}`.trim()}
                  />
                </div>
                <div className="pointer-events-none absolute -top-8 left-1/2 flex h-6 -translate-x-1/2 items-center whitespace-nowrap rounded-[5px] bg-[#4A4A56] px-3 text-[13px] font-medium leading-none text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {member.tooltip}
                </div>
              </div>
            );
          })}
          {typeof teamExtraCount === "number" && teamExtraCount > 0 && (
            <div className="-ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F0F0] text-[12px] font-semibold leading-none text-text-secondary">
              +{teamExtraCount}
            </div>
          )}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="h-px w-full bg-[linear-gradient(90deg,#FFFFFF00_0%,#EBEBEB_50%,#FFFFFF00_100%)]"
      />
      {(previousCase || nextCase) && (
        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-6 pt-2">
          <h3 className="text-[26px] font-semibold leading-[0.95] tracking-[-1.2px] text-text-primary lowercase">
            explore more
          </h3>
          <div className="grid w-full gap-5 md:grid-cols-2">
            {previousCase ? (
              <Link
                href={previousCase.href}
                className={`group flex flex-col justify-center rounded-[20px] bg-[#F0F0F0] py-5 transition-colors duration-200 hover:bg-[#EBEBEB] ${
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
                className={`group flex flex-col justify-center rounded-[20px] bg-[#F0F0F0] py-5 transition-colors duration-200 hover:bg-[#EBEBEB] ${
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
        </div>
      )}
    </motion.div>
  );
}
