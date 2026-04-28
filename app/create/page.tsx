import PageLayout from "@/components/layout/PageLayout";
import CasePage from "@/components/ui/CasePage";

export default function CreatePage() {
  return (
    <PageLayout>
      <CasePage
        title="Transforming a complex ad platform into a simple no-code tool"
        description="Create is the ad campaign platform that brings advertisers and publishers together to build interactive ads without code."
        tags={["Ad Tech", "B2B", "Analytics Dashboard", "Web App", "Interactive Ads", "Collaboration Tools", "SaaS Platform"]}
        metrics={[
          { value: "+147%", label: "revenue boost" },
          { value: "~€500K", label: "saving costs" },
          { value: "+30%", label: "conversion rate" },
          { value: "+60%", label: "faster reporting" },
          { value: "+2B", label: "impressions growth" },
        ]}
        imagePlaceholderColor="#E8E8EE"
        sections={[
          {
            label: "about the project",
            content: (
              <p>
                Create is the ad campaign platform that brings advertisers and publishers together to build interactive ads without code. It takes the messy parts (templates, collaboration, analytics, reporting) and puts them in one place, so non-technical teams can launch campaigns without depending on developers for every step.
              </p>
            ),
          },
          {
            label: "my role",
            content: (
              <p>
                I led the UX/UI redesign from the ground up. This included user research, core navigation, permissions, and the analytics dashboard. I also onboarded and mentored another designer on the project, while working closely with product and engineering to keep everything aligned.
              </p>
            ),
          },
          {
            label: "problems to solve",
            content: (
              <ul className="list-disc list-outside pl-6 flex flex-col gap-3">
                <li>The UI was too technical, which meant non-technical users were constantly getting stuck.</li>
                <li>Limited templates forced teams to pay for external tools just to get their work done.</li>
                <li>There was no roles or permissions system → teamwork was messy and developers wasted time on routine tasks.</li>
                <li>Analytics lived outside the product, making reporting a slow, manual, and expensive process.</li>
              </ul>
            ),
          },
          {
            label: "my goals",
            content: (
              <ul className="list-disc list-outside pl-6 flex flex-col gap-3">
                <li>Make the platform actually usable for non-technical people.</li>
                <li>Enable smooth teamwork through clear roles and permissions.</li>
                <li>Build integrated analytics for faster, transparent reporting.</li>
                <li>Cut unnecessary costs and speed up the whole workflow.</li>
              </ul>
            ),
          },
          {
            label: "key decisions",
            content: (
              <ul className="list-disc list-outside pl-6 flex flex-col gap-3">
                <li>Created a scalable template library from 3 to 14 formats and organized them into subgroups so they’re easy to find and reuse.</li>
                <li>Simplified the creation flow so users can go from "idea" to "launch" without getting lost in technical complexity.</li>
                <li>Built a foundation for teamwork with roles, permissions, and a folder system so teams can manage their own projects without needing a developer for every small change.</li>
                <li>Integrated analytics directly into the UI with event tracking and fast exports, making performance transparent and reducing reporting time by 60%.</li>
                <li>Supported complex ad formats for CTV and Brand Lift studies, allowing users to handle advanced campaigns inside the same platform.</li>
              </ul>
            ),
          },
          {
            label: "the results",
            content: (
              <ul className="list-disc list-outside pl-6 flex flex-col gap-3">
                <li><strong>Revenue growth:</strong> Grew revenue from <strong>€1.3M to €3.3M</strong> (+147% YoY) while supporting a massive growth in impressions.</li>
                <li><strong>Cost savings:</strong> Cut analytics costs by <strong>95%</strong>, saving roughly <strong>€500K</strong> every year.</li>
                <li><strong>Efficiency:</strong> Cut reporting from <strong>5h to 2h</strong> (60% faster) and onboarding from <strong>5d to 3d</strong> (40% less time).</li>
                <li><strong>Team impact:</strong> Increased project efficiency by <strong>35%</strong> through better collaboration and clearer roles.</li>
              </ul>
            ),
          },
        ]}
      />
    </PageLayout>
  );
}
