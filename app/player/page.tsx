import Image from "next/image";
import PageLayout from "@/components/layout/PageLayout";
import CasePage from "@/components/ui/CasePage";
import BottomUpLetters from "@/components/ui/BottomUpLetters";

export default function PlayerPage() {
  return (
    <PageLayout>
      <CasePage
        title="Redesigning a Video Player Ecosystem for Content and Ads"
        description="Redesigning a dual-player ecosystem with interactive formats and playlists to drive engagement and revenue."
        tags={["Ad Tech", "B2B", "Video Player", "Design System", "Web App"]}
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
        heroContent={(
          <div className="relative w-full overflow-hidden rounded-[20px]" style={{ backgroundColor: "#F5EEE8" }}>
            <Image
              src="/images/cases/player/main.png"
              alt="Player product interface preview"
              width={5424}
              height={3480}
              className="block h-auto w-full object-contain"
              sizes="(min-width: 1200px) 640px, (min-width: 768px) 60vw, 100vw"
              unoptimized
              priority
            />
          </div>
        )}
        sections={[
          {
            label: "about the project",
            content: (
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <p>
                    We were managing two separate products, a Content Player and an Ad Player. They worked, but the UI was starting to show its age, navigation felt cluttered, and they weren&apos;t built for the interactive features we wanted to launch.
                  </p>
                  <p>
                    I led the redesign to create a unified visual system that gave publishers more flexibility and made the entire experience feel like one smooth, connected product.
                  </p>
                </div>
                <div className="flex w-full flex-wrap items-start justify-around gap-8 px-4 sm:px-10">
                  <div className="flex min-w-[140px] flex-col items-center gap-1">
                    <p className="flex min-h-[32px] items-end justify-center">
                      <BottomUpLetters
                        text="+5%"
                        className="text-[32px] font-bold leading-none tracking-[-1px] text-accent"
                        blockDelay={0}
                      />
                    </p>
                    <p className="text-center text-[16px] font-bold leading-tight tracking-[-0.4px] text-text-secondary">
                      revenue
                    </p>
                  </div>
                  <div className="flex min-w-[140px] flex-col items-center gap-1">
                    <p className="flex min-h-[32px] items-end justify-center">
                      <BottomUpLetters
                        text="+16%"
                        className="text-[32px] font-bold leading-none tracking-[-1px] text-accent"
                        blockDelay={0.1}
                      />
                    </p>
                    <p className="text-center text-[16px] font-bold leading-tight tracking-[-0.4px] text-text-secondary">
                      content impressions
                    </p>
                  </div>
                  <div className="flex min-w-[140px] flex-col items-center gap-1">
                    <p className="flex min-h-[32px] items-end justify-center">
                      <BottomUpLetters
                        text="+10%"
                        className="text-[32px] font-bold leading-none tracking-[-1px] text-accent"
                        blockDelay={0.2}
                      />
                    </p>
                    <p className="text-center text-[16px] font-bold leading-tight tracking-[-0.4px] text-text-secondary">
                      ad impressions
                    </p>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <div
                    className="mx-auto w-fit max-w-full overflow-hidden rounded-[8px]"
                    style={{ backgroundColor: "#F5EEE8" }}
                  >
                    <Image
                      src="/images/cases/player/playerui.png"
                      alt="Player UI overview"
                      width={628}
                      height={354}
                      className="block aspect-[628/354] h-auto w-[628px] max-w-full shrink-0 object-contain"
                      sizes="628px"
                      unoptimized
                    />
                  </div>
                  <p className="text-center text-[15px] font-medium leading-tight tracking-[-0.4px] text-text-secondary">
                    Redesigned Player Interface
                  </p>
                </div>
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
            content: (
              <div className="flex flex-col gap-8">
                <div className="flex w-full flex-col gap-2">
                  <div
                    className="mx-auto w-fit max-w-full overflow-hidden rounded-[8px]"
                    style={{ backgroundColor: "#F5EEE8" }}
                  >
                    <Image
                      src="/images/cases/player/adplayer.png"
                      alt="Ad Player interface"
                      width={1256}
                      height={708}
                      className="block aspect-[1256/708] h-auto w-[628px] max-w-full shrink-0 object-contain"
                      sizes="628px"
                      unoptimized
                    />
                  </div>
                  <p className="text-center text-[13px] font-medium leading-tight tracking-[-0.4px] text-text-secondary">
                    Ad Player
                  </p>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <div
                    className="mx-auto w-fit max-w-full overflow-hidden rounded-[8px]"
                    style={{ backgroundColor: "#F5EEE8" }}
                  >
                    <Image
                      src="/images/cases/player/vipmode.png"
                      alt="VIP mode in the player"
                      width={1200}
                      height={812}
                      className="block aspect-[1200/812] h-auto w-[628px] max-w-full shrink-0 object-contain"
                      sizes="628px"
                      unoptimized
                    />
                  </div>
                  <p className="text-center text-[13px] font-medium leading-tight tracking-[-0.4px] text-text-secondary">
                    VIP Mode for Content Player
                  </p>
                </div>
              </div>
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
            content: (
              <div className="flex w-full flex-col gap-2">
                <div
                  className="mx-auto w-fit max-w-full overflow-hidden rounded-[8px]"
                  style={{ backgroundColor: "#F5EEE8" }}
                >
                  <Image
                    src="/images/cases/player/oldplayer.png"
                    alt="Previous player UI"
                    width={1058}
                    height={632}
                    className="block aspect-[1058/632] h-auto w-[628px] max-w-full shrink-0 object-contain"
                    sizes="628px"
                    unoptimized
                  />
                </div>
                <p className="text-center text-[13px] font-medium leading-tight tracking-[-0.4px] text-text-secondary">
                  Previous Player UI
                </p>
              </div>
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
            content: (
              <div className="flex flex-col gap-8">
                <div className="flex w-full flex-col gap-2">
                  <div
                    className="mx-auto w-fit max-w-full overflow-hidden rounded-[8px]"
                    style={{ backgroundColor: "#F5EEE8" }}
                  >
                    <Image
                      src="/images/cases/player/clipchoice.png"
                      alt="Clipchoice interactive ad format in the player"
                      width={1256}
                      height={1004}
                      className="block aspect-[1256/1004] h-auto w-[628px] max-w-full shrink-0 object-contain"
                      sizes="628px"
                      unoptimized
                    />
                  </div>
                  <p className="text-center text-[13px] font-medium leading-tight tracking-[-0.4px] text-text-secondary">
                    Clipchoice format
                  </p>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <div
                    className="mx-auto w-fit max-w-full overflow-hidden rounded-[8px]"
                    style={{ backgroundColor: "#F5EEE8" }}
                  >
                    <Image
                      src="/images/cases/player/playlist.png"
                      alt="Playlist UI in the player"
                      width={1256}
                      height={708}
                      className="block aspect-[1256/708] h-auto w-[628px] max-w-full shrink-0 object-contain"
                      sizes="628px"
                      unoptimized
                    />
                  </div>
                  <p className="text-center text-[13px] font-medium leading-tight tracking-[-0.4px] text-text-secondary">
                    Playlist
                  </p>
                </div>
              </div>
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
            content: (
              <div className="flex w-full flex-col gap-2">
                <div
                  className="mx-auto w-fit max-w-full overflow-hidden rounded-[8px]"
                  style={{ backgroundColor: "#F5EEE8" }}
                >
                  <Image
                    src="/images/cases/player/errors.png"
                    alt="Error monitoring and experimentation metrics for the player redesign"
                    width={1256}
                    height={1004}
                    className="block aspect-[1256/1004] h-auto w-[628px] max-w-full shrink-0 object-contain"
                    sizes="628px"
                    unoptimized
                  />
                </div>
                <p className="text-center text-[13px] font-medium leading-tight tracking-[-0.4px] text-text-secondary">
                  Global + item-level alerts for unavailable videos
                </p>
              </div>
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
          {
            content: (
              <div
                className="mx-auto w-fit max-w-full overflow-hidden rounded-[8px]"
                style={{ backgroundColor: "#F5EEE8" }}
              >
                <Image
                  src="/images/cases/player/next.png"
                  alt="Live streaming player concept — next direction for the product"
                  width={1256}
                  height={708}
                  className="block aspect-[1256/708] h-auto w-[628px] max-w-full shrink-0 object-contain"
                  sizes="628px"
                  unoptimized
                />
              </div>
            ),
          },
        ]}
      />
    </PageLayout>
  );
}
