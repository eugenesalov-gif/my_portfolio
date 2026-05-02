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
            label: "my role",
            content: (
              <p>
                I initiated the system and owned the entire architecture from the token logic to the Figma libraries and how they’re used across products.
              </p>
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
        ]}
      />
    </PageLayout>
  );
}
