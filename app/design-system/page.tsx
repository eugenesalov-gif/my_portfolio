import Image from "next/image";
import PageLayout from "@/components/layout/PageLayout";
import CasePage from "@/components/ui/CasePage";

export default function DesignSystemPage() {
  return (
    <PageLayout>
      <CasePage
        title="ShowHeroes Design System"
        description="A shared design system built from scratch to keep multiple ShowHeroes products visually consistent and speed up design and development."
        tags={["Design System", "Design Tokens", "Component Library", "Multi-product", "B2B SaaS"]}
        metrics={[]}
        teamMembers={[
          {
            imageSrc: "/images/team/team-member-1.png",
            imageAlt: "Team member 1",
            tooltip: "Yauheni Salau",
            imageClassName: "object-center",
          },
          {
            imageSrc: "/images/team/team-member-4.png",
            imageAlt: "Team member 4",
            tooltip: "Kay Schneider (President at ShowHeroes Group)",
            profileUrl: "https://www.linkedin.com/in/kayschneider/",
          },
        ]}
        previousCase={{
          href: "/network-insight",
          title: "Building an Analytics Platform for Contextual Targeting",
        }}
        nextCase={{
          href: "/ai-agent-chat",
          title: "Creating an AI Agent Chat for Interactive Video Ads",
        }}
        compactExploreCards
        heroContent={(
          <div className="relative w-full overflow-hidden rounded-[20px]" style={{ backgroundColor: "#EAE8F5" }}>
            <Image
              src="/images/cases/design-system/main.png"
              alt="Design system components overview"
              width={1024}
              height={656}
              className="block h-auto w-full object-contain"
              sizes="(min-width: 1200px) 640px, (min-width: 768px) 60vw, 100vw"
              unoptimized
              priority
            />
          </div>
        )}
        imagePlaceholderColor="#EAE8F5"
        sections={[
          {
            label: "about the project",
            content: (
              <p>
                I built this design system from scratch to create a scalable foundation that’s now used by 3 different teams. It acts as a single source of truth for our tokens and components, so teams can move fast without worrying about messy code or designs drifting apart.
              </p>
            ),
          },
          {
            contentMaxWidthClassName: "max-w-[900px]",
            content: (
              <div className="flex w-full flex-col gap-5">
                <div className="flex w-full items-start justify-between gap-8 px-10">
                  <div className="flex flex-col justify-start items-center gap-1">
                    <p className="text-[32px] font-bold leading-none tracking-[-1px] text-accent">21d → 4d</p>
                    <p className="text-[16px] font-bold text-center leading-tight tracking-[-0.4px] text-text-secondary">
                      delivery speed boost
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-center gap-1">
                    <p className="text-[32px] font-bold leading-none tracking-[-1px] text-accent">3</p>
                    <p className="text-[16px] font-bold text-center leading-tight tracking-[-0.4px] text-text-secondary">
                      products
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-center gap-1">
                    <p className="text-[32px] font-bold leading-none tracking-[-1px] text-accent">200+</p>
                    <p className="text-[16px] font-bold text-center leading-tight tracking-[-0.4px] text-text-secondary">
                      components
                    </p>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <div className="w-full overflow-visible rounded-[12px]">
                    <img
                      src="/images/cases/design-system/listds.png"
                      alt="Design system library — components list and documentation"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            ),
          },
          {
            label: "my role",
            content: (
              <p>
                I initiated the system and owned the entire architecture from the token logic to the Figma libraries and how they’re used across products.
              </p>
            ),
          },
          {
            contentMaxWidthClassName: "max-w-[900px]",
            content: (
              <div className="flex w-full flex-col gap-3">
                <div className="w-full overflow-visible rounded-[12px]">
                  <img
                    src="/images/cases/design-system/variables.avif"
                    alt="Design tokens — primitive and semantic variables in the design system"
                    className="block h-auto w-full rounded-[8px] object-contain"
                    draggable={false}
                  />
                </div>
              </div>
            ),
          },
          {
            label: "problems to solve",
            content: (
              <ul className="list-disc list-outside pl-6 flex flex-col gap-2">
                <li>No single source of truth → inconsistent UI everywhere.</li>
                <li>Designers and devs duplicating work.</li>
                <li>Maintenance becoming a nightmare.</li>
                <li>Development slowed down due to rework and misalignment.</li>
              </ul>
            ),
          },
          {
            label: "my goals",
            content: (
              <ul className="list-disc list-outside pl-6 flex flex-col gap-2">
                <li>Get everyone speaking the same UI language.</li>
                <li>Speed up the design-to-dev cycle.</li>
                <li>Maintained high quality.</li>
              </ul>
            ),
          },
          {
            contentMaxWidthClassName: "max-w-[900px]",
            content: (
              <div className="flex w-full flex-col gap-3">
                <div className="w-full overflow-visible rounded-[12px]">
                  <img
                    src="/images/cases/design-system/colords.webp"
                    alt="Design system color tokens and scales for light and dark modes"
                    className="block h-auto w-full rounded-[8px] object-contain"
                    draggable={false}
                  />
                </div>
              </div>
            ),
          },
          {
            label: "key decisions",
            content: (
              <ul className="list-disc list-outside pl-6 flex flex-col gap-2">
                <li>Built a token architecture to separate raw values (<strong>Primitives</strong>) from their actual purpose (<strong>Semantics</strong>).</li>
                <li>Baked light and dark modes directly into the system level. By using semantic tokens, products can switch their look and feel instantly. </li>
                <li>Structured our Figma libraries to make life easier for the team. With standardized variants, designers and engineering can work faster. </li>
                <li>Created dedicated libraries for specific areas like analytics charts, maps and the video player so we don&apos;t have to build ad-hoc solutions every time.</li>
              </ul>
            ),
          },
          {
            contentMaxWidthClassName: "max-w-[900px]",
            content: (
              <div className="flex w-full flex-col gap-3">
                <div className="relative w-full overflow-visible rounded-[12px] [background:unset]">
                  <img
                    src="/images/cases/design-system/icons.avif"
                    alt="Design system icon library and component set"
                    className="relative z-0 block h-auto w-full rounded-[8px] object-contain"
                    draggable={false}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-10 rounded-[8px] bg-[linear-gradient(to_top,white_0%,rgba(255,255,255,0.92)_22%,transparent_58%)]"
                  />
                </div>
              </div>
            ),
          },
          {
            label: "the results",
            content: (
              <ul className="list-disc list-outside pl-6 flex flex-col gap-2">
                <li><strong>Increased the average delivery time</strong> from <strong>21 days</strong> to <strong>4 days</strong>. </li>
                <li><strong>One Source of Truth</strong>: No more &ldquo;which version of the button is this?&rdquo;</li>
                <li><strong>Faster Iteration</strong>: Teams can now focus on UX problems instead of pushing pixels.</li>
                <li><strong>Centralized Governance</strong>: maintenance is cheaper because we fix things in one place, and it updates everywhere.</li>
              </ul>
            ),
          },
          {
            contentMaxWidthClassName: "max-w-[900px]",
            content: (
              <div className="flex w-full flex-col gap-3">
                <div className="w-full overflow-visible rounded-[12px]">
                  <img
                    src="/images/cases/design-system/dsbutton.avif"
                    alt="Design system button components — variants and states"
                    className="block h-auto w-full rounded-[8px] object-contain"
                    draggable={false}
                  />
                </div>
                <div className="relative w-full overflow-visible rounded-[12px] [background:unset]">
                  <img
                    src="/images/cases/design-system/informer.avif"
                    alt="Design system informer and notification patterns"
                    className="relative z-0 block h-auto w-full rounded-[8px] object-contain"
                    draggable={false}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-10 rounded-[8px] bg-[linear-gradient(to_top,white_0%,rgba(255,255,255,0.92)_22%,transparent_58%)]"
                  />
                </div>
              </div>
            ),
          },
        ]}
      />
    </PageLayout>
  );
}
