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
        teamMembers={[
          {
            imageSrc: "/images/team/team-member-1.png",
            imageAlt: "Team member 1",
            tooltip: "Yauheni Salau",
            imageClassName: "object-center",
          },
          {
            imageSrc: "/images/team/network-team-member-tom.png",
            imageAlt: "Team member 2",
            tooltip: "Tom Power (Global Director of Technology)",
            profileUrl: "https://www.linkedin.com/in/tom-power/",
          },
          {
            imageSrc: "/images/team/create-team-member-vadim.png",
            imageAlt: "Team member 3",
            tooltip: "Vadim Mazzherin (Frontend Team & Tech Lead)",
            profileUrl: "https://www.linkedin.com/in/vadim-mazzherin/",
          },
          {
            imageSrc: "/images/team/network-team-member-sergey.png",
            imageAlt: "Team member 4",
            tooltip: "Sergey Kuraksin (Senior PHP Developer)",
            profileUrl: "https://www.linkedin.com/in/sergey-kuraksin-746b03137/",
          },
        ]}
        teamExtraCount={2}
        previousCase={{
          href: "/design-system",
          title: "ShowHeroes Design System",
        }}
        nextCase={{
          href: "/player",
          title: "Redesigning a Video Player Ecosystem for Content and Ads",
        }}
        compactExploreCards
        imagePlaceholderColor="#E8F5EA"
        sections={[
          {
            label: "about the project",
            content: (
              <p>
                AI Agent Chat turns passive video ads into active conversations. It’s an interactive end card built right into the video player, letting viewers chat with the brand and share their info without ever leaving the ad.
              </p>
            ),
          },
          {
            label: "my role",
            content: (
              <p>
                I led the design from start to finish, defining how the AI interaction feels and building a flexible UI for chat and rich media. I teamed up with stakeholders and engineering to make sure the format was scalable and ready for pilot launches across CTV and web.
              </p>
            ),
          },
          {
            label: "problems to solve",
            content: (
              <ul className="list-disc list-outline pl-6 flex flex-col gap-2">
                <li>Traditional end cards were too static, with most viewers glancing at them for just a few seconds before moving on.</li>
                <li><strong>Brands</strong> were looking for real, meaningful engagement that a simple button could not provide.</li>
                <li>As <strong>Cookies 🍪</strong> fade and targeting gets tougher, capturing user intent directly inside the ad is now a huge competitive advantage.</li>
                <li>External landing pages were conversion killers, as forcing people to leave the video player to fill out a form caused most of them to drop off.</li>
              </ul>
            ),
          },
          {
            label: "my goals",
            content: (
              <ul className="list-disc list-outline pl-6 flex flex-col gap-2">
                <li><strong>Turn ads into a conversation</strong> rather than just another one-way message.</li>
                <li>I wanted to keep the experience entirely inside the player to make conversion as frictionless as possible.</li>
                <li>Build a fluid experience that handles questions, curiosity, and actions all in one flow.</li>
                <li>Design a flexible UI that adapts to any player size, ensuring a seamless experience across both web and mobile browsers.</li>
              </ul>
            ),
          },
          {
            label: "key decisions",
            content: (
              <ul className="list-disc list-outline pl-6 flex flex-col gap-2">
                <li>I kept the UI super light and minimal to make the chat interface feel like a native part of the player.</li>
                <li>I added things like cards, forms, and media right inside the chat bubbles. This way, users can explore products or sign up without ever having to leave the conversation.</li>
                <li>For longer interactions, I introduced a full-screen mode. It gives the conversation space to breathe when things get detailed, without cluttering the small, compact view.</li>
                <li>Enabled full customization for colors, assets, and tone of voice. This means brands can make the tool feel like their own without us having to rebuild it every time.</li>
              </ul>
            ),
          },
          {
            label: "results",
            content: (
              <ul className="list-disc list-outline pl-6 flex flex-col gap-2">
                <li>Users spent <strong>8× more time</strong> with the brand (averaging <strong>3+ minutes</strong>) compared to static cards.</li>
                <li><strong>Shipped the first AI video ad format at ShowHeroes</strong>, embedding a conversational assistant directly into the player.</li>
                <li><strong>Removed conversion friction</strong> by moving lead generation from external pages directly into the video player.</li>
              </ul>
            ),
          },
        ]}
      />
    </PageLayout>
  );
}
