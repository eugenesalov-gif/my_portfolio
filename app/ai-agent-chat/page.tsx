import PageLayout from "@/components/layout/PageLayout";
import CasePage from "@/components/ui/CasePage";

export default function AIAgentChatPage() {
  return (
    <PageLayout>
      <CasePage
        title="Creating an AI Agent Chat for Interactive Video Ads"
        description="AI-powered interactive end card that transforms video ads into a two-way dialogue, driving deeper engagement and seamless lead generation"
        tags={["B2C", "Artificial Intelligence", "Interactive Chat", "Web App"]}
        metrics={[
          { value: "8x", label: "engagement duration" },
          { value: "~3 min", label: "avg interaction" },
        ]}
        imagePlaceholderColor="#E8F5EA"
        sections={[
          {
            label: "about the project",
            content: (
              <p>
                AI Agent Chat transforms passive video advertisements into conversational experiences through an interactive end card embedded within the video player. Viewers can engage without ever leaving the ad — the first AI video ad format launched at ShowHeroes.
              </p>
            ),
          },
          {
            label: "my role",
            content: (
              <p>
                Led UX and UI design for the entire product — from concept through launch. Defined interaction patterns, responsive layout across device sizes, and brand customisation system.
              </p>
            ),
          },
          {
            label: "problems to solve",
            content: (
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>Static end cards received minimal viewer attention.</li>
                <li>Brands needed authentic engagement beyond simple buttons.</li>
                <li>Cookie deprecation increased the value of direct intent capture.</li>
                <li>External landing pages reduced conversion rates by breaking the viewing context.</li>
              </ul>
            ),
          },
          {
            label: "my goals",
            content: (
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>Reframe advertisements as two-way conversations.</li>
                <li>Keep the entire experience inside the player.</li>
                <li>Enable frictionless information collection.</li>
                <li>Ensure responsive design across all device sizes.</li>
              </ul>
            ),
          },
          {
            label: "key decisions",
            content: (
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>Minimal UI to keep focus on the conversation.</li>
                <li>Interactive elements (cards, forms, media) embedded within chat bubbles.</li>
                <li>Full-screen mode for extended interactions.</li>
                <li>Comprehensive brand customisation without breaking the system.</li>
              </ul>
            ),
          },
          {
            label: "results",
            content: (
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>8x longer engagement compared to traditional formats.</li>
                <li>~3 minutes average interaction time.</li>
                <li>First AI video ad format launched at ShowHeroes.</li>
                <li>Eliminated conversion barriers through in-player lead generation.</li>
              </ul>
            ),
          },
        ]}
      />
    </PageLayout>
  );
}
