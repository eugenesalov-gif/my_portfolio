import PageLayout from "@/components/layout/PageLayout";
import CaseCard from "@/components/ui/CaseCard";
import Link from "next/link";

const changelogText = "CHANGELOG: 03/05/2026";

const cases = [
  {
    href: "/create",
    title: "Transforming a complex ad platform into a simple no-code tool",
    description:
      "Create is the ad campaign platform that brings advertisers and publishers together to build interactive ads without code.",
    tags: ["Ad Tech", "B2B", "Analytics Dashboard", "Web App", "Interactive Ads", "Collaboration Tools", "SaaS Platform"],
    metrics: [
      { value: "+147%", label: "revenue boost" },
      { value: "~€500K", label: "saving costs" },
      { value: "+30%", label: "conversion rate" },
      { value: "+60%", label: "faster reporting" },
      { value: "+2B", label: "impressions growth" },
    ],
    imagePlaceholderColor: "#E8E8EE",
  },
  {
    href: "/network-insight",
    title: "Building an Analytics Platform for Contextual Targeting",
    description:
      "Network Insights is a ShowHeroes platform that unifies data from internal silos and external sources, giving Supply and Demand teams powerful tools to work faster and more efficiently",
    tags: ["Ad Tech", "B2B", "Analytics Dashboard", "Contextual Targeting", "Automation", "Big Data", "Web App"],
    metrics: [
      { value: "6-in-1", label: "platforms combined" },
      { value: "300", label: "monthly active users" },
      { value: "2h→6m", label: "faster reporting" },
    ],
    imagePlaceholderColor: "#E0EAF5",
  },
  {
    href: "/design-system",
    title: "ShowHeroes Design System",
    description:
      "A shared design system built from scratch to keep multiple ShowHeroes products visually consistent and speed up design and development.",
    tags: ["Design System", "Design Tokens", "Component Library", "Multi-product", "B2B SaaS"],
    metrics: [],
    imagePlaceholderColor: "#EAE8F5",
  },
  {
    href: "/ai-agent-chat",
    title: "Creating an AI Agent Chat for Interactive Video Ads",
    description:
      "AI-powered interactive end card that transforms video ads into a two-way dialogue, driving deeper engagement and seamless lead generation",
    tags: ["B2C", "Artificial Intelligence", "Interactive Chat", "Web App"],
    metrics: [],
    imagePlaceholderColor: "#E8F5EA",
  },
  {
    href: "/player",
    title: "Redesigning a Video Player Ecosystem for Content and Ads",
    description:
      "Redesigning a dual-player ecosystem with interactive formats and playlists to drive engagement and revenue.",
    tags: [],
    metrics: [
      { value: "+10%", label: "unit fill rate" },
      { value: "+10%", label: "ad impressions" },
      { value: "+5%", label: "revenue" },
      { value: "+16%", label: "content impressions" },
    ],
    imagePlaceholderColor: "#F5EEE8",
  },
];

export default function Home() {
  return (
    <PageLayout>
      <div className="flex flex-col gap-16">
        {cases.map((c, index) => (
          <div key={c.href} className="flex flex-col gap-16">
            <CaseCard {...c} />
            {index < cases.length - 1 && (
              <div
                aria-hidden="true"
                className="h-px w-full bg-[linear-gradient(90deg,#FFFFFF00_0%,#EBEBEB_50%,#FFFFFF00_100%)]"
              />
            )}
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="mt-16 h-px w-full bg-[linear-gradient(90deg,#FFFFFF00_0%,#EBEBEB_50%,#FFFFFF00_100%)]"
      />
      <footer className="mx-auto flex w-full flex-col items-center gap-1 pt-8 pb-0 text-center text-[13px] font-light tracking-[-0.3px] text-[#888888]">
        <p>Made with love by me and a bit of Next.js magic</p>
        <Link
          href="https://github.com/eugenesalov-gif/my_portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="top-down-letters-link"
          aria-label="Open changelog repository on GitHub"
        >
          {changelogText.split("").map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="top-down-letter"
              style={{ animationDelay: `${index * 18}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </Link>
      </footer>
    </PageLayout>
  );
}
