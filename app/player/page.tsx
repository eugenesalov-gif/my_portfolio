import PageLayout from "@/components/layout/PageLayout";
import CasePage from "@/components/ui/CasePage";

export default function PlayerPage() {
  return (
    <PageLayout>
      <CasePage
        title="Redesigning a Video Player Ecosystem for Content and Ads"
        description="Redesigning a dual-player ecosystem with interactive formats and playlists to drive engagement and revenue."
        tags={["Ad Tech", "B2B", "Video Player", "Design System", "Web App"]}
        metrics={[
          { value: "+10%", label: "unit fill rate" },
          { value: "+10%", label: "ad impressions" },
          { value: "+5%", label: "revenue" },
          { value: "+16%", label: "content impressions" },
        ]}
        imagePlaceholderColor="#F5EEE8"
        sections={[
          {
            label: "about the project",
            content: (
              <p>
                A comprehensive redesign of two separate video player products — a Content Player and an Ad Player — to create a unified visual system. The initiative modernised an aging interface while enabling new interactive features and playlists.
              </p>
            ),
          },
          {
            label: "my role",
            content: (
              <p>
                Led UX and UI design across both players. Defined the unified component library, ran 15 A/B tests for validation, and collaborated with engineering and product throughout the iterative development process.
              </p>
            ),
          },
          {
            label: "problems to solve",
            content: (
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>Linear architecture prevented launching interactive feature formats.</li>
                <li>Limited customisation restricted brand adaptation.</li>
                <li>Outdated UI hindered modern user experience.</li>
              </ul>
            ),
          },
          {
            label: "my goals",
            content: (
              <p>
                Refresh both players with a modern UI that is much easier for people to use, while integrating new interactive formats and playlist functionality to boost key performance indicators.
              </p>
            ),
          },
          {
            label: "key decisions",
            content: (
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>Streamlined core UI and navigation with emphasis on clarity.</li>
                <li>Introduced playlist system for improved content discovery.</li>
                <li>Established unified component library across both players.</li>
                <li>Conducted 15 A/B tests to validate design decisions.</li>
                <li>Developed Live Streaming player concept for future roadmap.</li>
              </ul>
            ),
          },
          {
            label: "results",
            content: (
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>Revenue increased by 5%.</li>
                <li>Content impressions grew 16%.</li>
                <li>Ad impressions rose 10%.</li>
                <li>Zero rollbacks over 2.5 years of deployment.</li>
              </ul>
            ),
          },
        ]}
      />
    </PageLayout>
  );
}
