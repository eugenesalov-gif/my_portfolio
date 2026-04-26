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
        imagePlaceholderColor="#EAE8F5"
        sections={[
          {
            label: "about the project",
            content: (
              <p>
                No single source of truth meant inconsistent UI everywhere — duplicated designer-developer work caused maintenance challenges and development delays across three product teams. I built the SHG Design System from scratch as the single source of truth.
              </p>
            ),
          },
          {
            label: "my role",
            content: (
              <p>
                Led the design system end-to-end: token architecture, component library (200+ components), documentation, and roll-out across three product teams.
              </p>
            ),
          },
          {
            label: "problems to solve",
            content: (
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>No single source of truth → inconsistent UI across products.</li>
                <li>Duplicated design and development work on every new feature.</li>
                <li>Slow delivery cycles due to component rebuilds.</li>
                <li>No support for dark mode at system level.</li>
              </ul>
            ),
          },
          {
            label: "key decisions",
            content: (
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>Separated raw values (Primitives) from intended purpose (Semantics) through token architecture.</li>
                <li>Implemented light/dark modes at system level — instant switching via semantic tokens.</li>
                <li>Built 200+ components covering all three product surfaces.</li>
                <li>Centralised governance for efficient maintenance across the ecosystem.</li>
              </ul>
            ),
          },
          {
            label: "results",
            content: (
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>Delivery speed: 21 days → 4 days.</li>
                <li>200+ components used across 3 product teams.</li>
                <li>Eliminated design version confusion.</li>
                <li>Teams now focus on UX rather than implementation details.</li>
              </ul>
            ),
          },
        ]}
      />
    </PageLayout>
  );
}
