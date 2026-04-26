import PageLayout from "@/components/layout/PageLayout";
import CasePage from "@/components/ui/CasePage";

export default function CreatePage() {
  return (
    <PageLayout>
      <CasePage
        title="Transforming a complex ad platform into a simple no-code tool"
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
                Create is the ad campaign platform that brings advertisers and publishers together to build interactive ads without code. The platform consolidates templates, collaboration tools, analytics, and reporting into one interface, enabling non-technical teams to manage campaigns independently.
              </p>
            ),
          },
          {
            label: "my role",
            content: (
              <p>
                I led the complete UX/UI redesign — managing user research, navigation architecture, permissions systems, and the analytics dashboard. I also mentored a fellow designer while collaborating with product and engineering teams to maintain alignment.
              </p>
            ),
          },
          {
            label: "problems to solve",
            content: (
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>The UI was too technical — non-technical users were constantly getting stuck.</li>
                <li>Template limitations forced teams to purchase external tools.</li>
                <li>Absence of roles and permissions created workflow chaos and developer overhead.</li>
                <li>Analytics lived outside the product, making reporting a slow, manual, and expensive process.</li>
              </ul>
            ),
          },
          {
            label: "my goals",
            content: (
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>Enhance platform usability for non-technical users.</li>
                <li>Facilitate teamwork via clear roles and permissions.</li>
                <li>Integrate analytics for transparent, efficient reporting.</li>
                <li>Reduce costs and accelerate workflows.</li>
              </ul>
            ),
          },
          {
            label: "key decisions",
            content: (
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>Expanded template library from 3 to 14 formats with organized subgroups.</li>
                <li>Streamlined creation workflows to minimize technical friction.</li>
                <li>Implemented roles, permissions, and folder structures for autonomous team management.</li>
                <li>Integrated analytics directly into the UI with event tracking and fast exports.</li>
                <li>Added advanced ad formats for CTV and Brand Lift studies.</li>
              </ul>
            ),
          },
          {
            label: "results",
            content: (
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>Revenue: €1.3M → €3.3M (+147%)</li>
                <li>Analytics cost reduction: 95% — €500K savings annually</li>
                <li>Reporting time: 5 hours → 2 hours (60% improvement)</li>
                <li>Onboarding: 5 days → 3 days (40% reduction)</li>
                <li>Team efficiency: +35% improvement</li>
              </ul>
            ),
          },
        ]}
      />
    </PageLayout>
  );
}
