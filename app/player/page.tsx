import PageLayout from "@/components/layout/PageLayout";
import CasePage from "@/components/ui/CasePage";

export default function PlayerPage() {
  return (
    <PageLayout>
      <CasePage
        title="Redesigning a Video Player Ecosystem for Content and Ads"
        description="Redesigning a dual-player ecosystem with interactive formats and playlists to drive engagement and revenue."
        tags={["Ad Tech", "B2B", "Video Player", "Design System", "Web App"]}
        metrics={[
          { value: "+10%", label: "unit fill rate" },
          { value: "+10%", label: "ad impressions" },
          { value: "+5%", label: "revenue" },
          { value: "+16%", label: "content impressions" },
        ]}
        teamMembers={[
          {
            imageSrc: "/images/team/team-member-1.png",
            imageAlt: "Team member 1",
            tooltip: "Yauheni Salau",
            imageClassName: "object-center",
          },
          {
            imageSrc: "/images/team/player-team-member-jean-marie.png",
            imageAlt: "Team member 2",
            tooltip: "Jean-Marie Salamon (Senior Product Manager)",
            profileUrl: "https://www.linkedin.com/in/jeanmariesalamon/",
          },
          {
            imageSrc: "/images/team/player-team-member-bruno.png",
            imageAlt: "Team member 3",
            tooltip: "Bruno Mikec (Player Engineer)",
            profileUrl: "https://www.linkedin.com/in/bruno-mikec-ab3175117/",
          },
          {
            imageSrc: "/images/team/player-team-member-emilio.png",
            imageAlt: "Team member 4",
            tooltip: "Emilio Vitulano (Lead Software Engineer)",
            profileUrl: "https://www.linkedin.com/in/evitulano/",
          },
        ]}
        teamExtraCount={3}
        previousCase={{
          href: "/ai-agent-chat",
          title: "Creating an AI Agent Chat for Interactive Video Ads",
        }}
        nextCase={{
          href: "/create",
          title: "Transforming a complex ad platform into a simple no-code tool",
        }}
        compactExploreCards
        imagePlaceholderColor="#F5EEE8"
        sections={[
          {
            label: "about the project",
            content: (
              <div className="flex flex-col gap-6">
                <p>
                  We were managing two separate products, a Content Player and an Ad Player. They worked, but the UI was starting to show its age, navigation felt cluttered, and they weren&apos;t built for the interactive features we wanted to launch.
                </p>
                <p>
                  I led the redesign to create a unified visual system that gave publishers more flexibility and made the entire experience feel like one smooth, connected product.
                </p>
              </div>
            ),
          },
          {
            label: "my role",
            content: (
              <p>
                I led the redesign for both players, from the core UI to specific features like the Clipchoice interactive format and playlists. I also helped build a unified component library to keep our design consistent across the board. To make sure we were moving in the right direction, I worked closely with engineering and product through 15 A/B tests to iterate safely and drive KPI growth.
              </p>
            ),
          },
          {
            label: "problems to solve",
            content: (
              <ul className="list-disc list-outline pl-6 flex flex-col gap-2">
                <li>The old player was strictly linear which made it impossible to launch the interactive features we were planning.</li>
                <li>Limited customization meant brands couldn’t easily adapt the player to match their own unique look and feel.</li>
                <li>The UI was stuck in the past and the navigation felt too limited, which kept the viewing experience from feeling truly modern.</li>
              </ul>
            ),
          },
          {
            label: "my goals",
            content: (
              <ul className="list-disc list-outline pl-6 flex flex-col gap-2">
                <li>Refresh both players with a modern UI that is much easier for people to use.</li>
                <li>Integrate the new Clipchoice format to bring interactivity to our video ads.</li>
                <li>Build a playlist system to help users discover more content and stay on the platform longer.</li>
                <li>Focus on growing key metrics like unit fill rate and revenue through better design.</li>
                <li>Create a unified design language to keep the experience consistent across every player.</li>
              </ul>
            ),
          },
          {
            label: "key decisions",
            content: (
              <ul className="list-disc list-outline pl-6 flex flex-col gap-2">
                <li>Redesigned the core UI and navigation for both players to prioritize clarity and strip away any unnecessary visual noise.</li>
                <li>Introduced playlists to make it faster for viewers to move between videos and stay focused on the content for longer.</li>
                <li>Created a unified component system to align the visual style across both players and finally get rid of all the inconsistencies.</li>
                <li>We ran 15 A/B tests to validate our hypotheses and make sure every design change actually worked for the users.</li>
                <li>Also drafted a concept for a Live Streaming player as a future direction, making sure we were prepared for the next step without slowing down our current roadmap.</li>
              </ul>
            ),
          },
          {
            label: "the results",
            content: (
              <ul className="list-disc list-outline pl-6 flex flex-col gap-2">
                <li>Boosted <strong>unit fill rate</strong> and <strong>ad impressions by 10%</strong> through a more effective player design.</li>
                <li>Increased content impressions by <strong>16%</strong> and total revenue by <strong>5%</strong> after the full rollout.</li>
                <li>Proven reliability with zero rollbacks in <strong>2.5 years</strong> because our experimentation process allowed us to catch and fix issues early.</li>
                <li>Our iterative approach allowed us to fix early performance issues and turn an initial dip into long-term growth once the new UI and features were fully rolled out.</li>
              </ul>
            ),
          },
        ]}
      />
    </PageLayout>
  );
}
