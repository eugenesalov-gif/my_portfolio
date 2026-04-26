import PageLayout from "@/components/layout/PageLayout";
import CasePage from "@/components/ui/CasePage";

export default function NetworkInsightPage() {
  return (
    <PageLayout>
      <CasePage
        title="Building an Analytics Platform for Contextual Targeting"
        description="Network Insights is a ShowHeroes platform that unifies data from internal silos and external sources, giving Supply and Demand teams powerful tools to work faster and more efficiently"
        tags={["Ad Tech", "B2B", "Analytics Dashboard", "Contextual Targeting", "Automation", "Big Data", "Web App"]}
        metrics={[
          { value: "924", label: "segments" },
          { value: "769,715", label: "keywords" },
          { value: "7.6M", label: "pages analyzed" },
          { value: "300", label: "MAU" },
          { value: "2h→6m", label: "reporting" },
        ]}
        imagePlaceholderColor="#E0EAF5"
        sections={[
          {
            label: "about the project",
            content: (
              <p>
                Network Insights consolidated messy spreadsheets into a unified data management system for C-level executives, Supply, Demand, and Finance teams — streamlining decision-making and reducing manual work across 6 previously separate platforms.
              </p>
            ),
          },
          {
            label: "my role",
            content: (
              <p>
                I led the comprehensive design from inception — mapping team workflows, designing interfaces for complex data handling, and collaborating with product management and engineering throughout development and launch phases.
              </p>
            ),
          },
          {
            label: "problems to solve",
            content: (
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>Data fragmented across multiple internal tools, Odoo, SSPs, and Excel spreadsheets.</li>
                <li>Repetitive manual segment and report creation wasted hours every week.</li>
                <li>Difficulty demonstrating client value and verifying ad placement.</li>
                <li>Time-intensive semantic analysis and reporting tasks slowed teams down.</li>
              </ul>
            ),
          },
          {
            label: "my goals",
            content: (
              <p>
                Bring scattered systems together into one place the team can actually trust. Turn manual busywork into smooth, automated tools. Make the numbers clear.
              </p>
            ),
          },
          {
            label: "key decisions",
            content: (
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>Rejected monolithic dashboard in favour of focused, modular task-centred tools.</li>
                <li>Designed distinct interfaces for segmentation, brand safety verification, and reporting.</li>
                <li>Clear role hierarchy: Viewer, Creator, Admin.</li>
                <li>Mobile-optimised views for executives on the go.</li>
              </ul>
            ),
          },
          {
            label: "results",
            content: (
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>Unified 6 internal tools into one single platform.</li>
                <li>Sustained 300+ monthly active users.</li>
                <li>Reduced segment and report creation from hours to minutes.</li>
                <li>Increased daily engagement demonstrating real platform utility.</li>
              </ul>
            ),
          },
        ]}
      />
    </PageLayout>
  );
}
