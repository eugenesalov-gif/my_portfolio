import Image from "next/image";
import PageLayout from "@/components/layout/PageLayout";
import CasePage from "@/components/ui/CasePage";
import ImageCarousel from "@/components/ui/ImageCarousel";
import BottomUpLetters from "@/components/ui/BottomUpLetters";

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
        teamMembers={[
          {
            imageSrc: "/images/team/team-member-1.png",
            imageAlt: "Team member 1",
            tooltip: "Yauheni Salau",
            imageClassName: "object-center",
          },
          {
            imageSrc: "/images/team/create-team-member-maike.png",
            imageAlt: "Team member 2",
            tooltip: "Maike Selle (Senior Product Manager)",
            profileUrl: "https://www.linkedin.com/in/maike-selle-showheroes/",
          },
          {
            imageSrc: "/images/team/create-team-member-ken.png",
            imageAlt: "Team member 3",
            tooltip: "Ken Lim (Global Director Platform & Data Solutions)",
            profileUrl: "https://www.linkedin.com/in/limliken/",
          },
          {
            imageSrc: "/images/team/create-team-member-vadim.png",
            imageAlt: "Team member 4",
            tooltip: "Vadim Mazzherin (Frontend Team & Tech Lead)",
            profileUrl: "https://www.linkedin.com/in/vadim-mazzherin/",
          },
        ]}
        teamExtraCount={4}
        previousCase={{
          href: "/create",
          title: "Transforming a complex ad platform into a simple no-code tool",
        }}
        nextCase={{
          href: "/design-system",
          title: "ShowHeroes Design System",
        }}
        compactExploreCards
        heroContent={(
          <div className="relative w-full overflow-hidden rounded-[20px]" style={{ backgroundColor: "#E0EAF5" }}>
            <Image
              src="/images/cases/network-insight/main.png"
              alt="Network Insight interface preview"
              width={1024}
              height={640}
              className="block h-auto w-full object-contain"
              sizes="(min-width: 1200px) 640px, (min-width: 768px) 60vw, 100vw"
              unoptimized
              priority
            />
          </div>
        )}
        imagePlaceholderColor="#E0EAF5"
        sections={[
          {
            label: "about the project",
            content: (
              <p>
                Network Insights was built to get data out of messy spreadsheets and into one place where it’s actually useful. My goal was to make life easier for the C-levels, Supply, Demand and Finance teams, giving them the clarity they need to make quick decisions without the manual grunt work.
              </p>
            ),
          },
          {
            contentMaxWidthClassName: "max-w-[900px]",
            content: (
              <div className="flex w-full items-start justify-between gap-8 px-4 min-[810px]:px-10">
                <div className="flex flex-col justify-start items-center gap-1">
                  <p className="flex min-h-[32px] items-end justify-center">
                    <BottomUpLetters
                      text="6-in-1"
                      className="text-[24px] font-bold leading-none tracking-[-0.8px] text-accent min-[810px]:text-[32px] min-[810px]:tracking-[-1px]"
                      blockDelay={0}
                    />
                  </p>
                  <p className="text-[16px] font-bold text-center leading-tight tracking-[-0.4px] text-text-secondary">
                    platforms combined
                  </p>
                </div>
                <div className="flex flex-col justify-start items-center gap-1">
                  <p className="flex min-h-[32px] items-end justify-center">
                    <BottomUpLetters
                      text="300+"
                      className="text-[24px] font-bold leading-none tracking-[-0.8px] text-accent min-[810px]:text-[32px] min-[810px]:tracking-[-1px]"
                      blockDelay={0.1}
                    />
                  </p>
                  <p className="text-[16px] font-bold text-center leading-tight tracking-[-0.4px] text-text-secondary">
                    monthly active users
                  </p>
                </div>
                <div className="flex flex-col justify-start items-center gap-1">
                  <p className="flex min-h-[32px] items-end justify-center">
                    <BottomUpLetters
                      text="2h → 6m"
                      className="flex-nowrap text-[22px] font-bold leading-none tracking-[-0.9px] text-accent min-[810px]:flex-wrap min-[810px]:text-[32px] min-[810px]:tracking-[-1px]"
                      blockDelay={0.2}
                    />
                  </p>
                  <p className="text-[16px] font-bold text-center leading-tight tracking-[-0.4px] text-text-secondary min-[810px]:text-left">
                    faster reporting
                  </p>
                </div>
              </div>
            ),
          },
          {
            contentMaxWidthClassName: "max-w-[900px]",
            content: (
              <div className="flex w-full flex-col gap-3">
                <div className="w-full overflow-visible rounded-[12px]">
                  <img
                    src="/images/cases/network-insight/customsegment.png"
                    alt="Detailed view of the selected segment showing performance trends and campaign details"
                    className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                    draggable={false}
                  />
                </div>
                <p className="text-center text-[13px] text-text-secondary">
                  Detailed view of the selected segment showing performance trends and campaign details
                </p>
              </div>
            ),
          },
          {
            label: "my role",
            content: (
              <p>
                I led the design from the ground up. I mapped out how the different teams work to create a structure that makes sense for them. I designed the interface to handle complex data and worked side-by-side with the product manager and engineering to build and ship the platform step by step.
              </p>
            ),
          },
          {
            contentMaxWidthClassName: "max-w-[900px]",
            content: (
              <div className="flex w-full flex-col gap-3">
                <div className="flex w-full flex-col gap-5 rounded-[20px] bg-[linear-gradient(0deg,rgba(222,222,222,1)_0%,rgba(235,235,235,1)_100%)] p-5">
                  <h2 className="w-full text-[26px] font-semibold leading-8 tracking-[-1.2px] lowercase text-[rgba(29,29,38,1)]">
                    before
                  </h2>
                  <div className="flex w-full flex-col gap-4">
                    <div className="w-full overflow-hidden rounded-[12px]">
                      <img
                        src="/images/cases/network-insight/oldlist.png"
                        alt="Legacy Network Insights interface — list view"
                        className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                        draggable={false}
                      />
                    </div>
                    <div className="w-full overflow-hidden rounded-[12px]">
                      <img
                        src="/images/cases/network-insight/oldlistb.png"
                        alt="Legacy Network Insights interface — secondary screen"
                        className="block h-auto w-full rounded-[12px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ),
          },
          {
            contentMaxWidthClassName: "max-w-[900px]",
            content: (
              <div className="flex w-full flex-col gap-5">
                <div className="flex w-full flex-col gap-3">
                  <div className="flex w-full flex-col gap-5 rounded-[20px] bg-[linear-gradient(0deg,rgba(35,35,36,1)_0%,rgba(54,54,54,1)_100%)] p-5">
                    <h2
                      className="w-full text-[26px] font-semibold leading-8 tracking-[-1.2px] lowercase"
                      style={{ color: "rgba(255, 255, 255, 1)" }}
                    >
                      after
                    </h2>
                    <div className="w-full overflow-hidden rounded-[4px]">
                      <img
                        src="/images/cases/network-insight/bt.png"
                        alt="New Network Insights interface with global map and regional revenue analytics"
                        className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                        draggable={false}
                      />
                    </div>
                  </div>
                  <p className="text-center text-[13px] leading-[130%] text-text-secondary">
                    New Network Insights interface with global map and regional revenue analytics
                  </p>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <div className="w-full overflow-visible rounded-[12px]">
                    <img
                      src="/images/cases/network-insight/btbelow.png"
                      alt="Updated Network Insights dashboard with new demand, supply and margin metrics providing deeper insight into market performance"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                  <p className="text-center text-[13px] leading-[130%] text-text-secondary">
                    Updated Network Insights dashboard with new demand, supply and margin metrics providing deeper insight into market performance
                  </p>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <div className="w-full overflow-visible rounded-[12px]">
                    <img
                      src="/images/cases/network-insight/mobile.png"
                      alt="Network Insights mobile view with dashboards and comments"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                  <p className="text-center text-[13px] leading-[130%] text-text-secondary">
                    Mobile version with optimized dashboards and comments for quick access to analytics on the go
                  </p>
                </div>
              </div>
            ),
          },
          {
            label: "problems to solve",
            content: (
              <ul className="list-disc list-outside pl-6 flex flex-col gap-2">
                <li>Data fragmented across multiple internal tools, Odoo, SSPs, and Excel spreadsheets.</li>
                <li>Teams were wasting time manually building the same segments, reports, and site lists over and over.</li>
                <li>It was hard to show value to clients, especially proving exactly where ads ran and confirming that the content was safe.</li>
                <li>Simple things took too long, and tasks like semantic analysis and reporting could drag on for hours.</li>
              </ul>
            ),
          },
          {
            contentMaxWidthClassName: "max-w-[900px]",
            content: (
              <div className="flex w-full flex-col gap-5">
                <div className="flex w-full flex-col gap-3">
                  <div className="w-full overflow-visible rounded-[12px]">
                    <img
                      src="/images/cases/network-insight/comments.png"
                      alt="New comments section for sharing analytics and collaboration"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                  <p className="text-center text-[13px] leading-[130%] text-text-secondary">
                    New comments section for sharing analytics and real-time, enabling top management to track performance and highlight key insights
                  </p>
                </div>
                <div className="w-full overflow-visible rounded-[12px]">
                  <img
                    src="/images/cases/network-insight/tam.png"
                    alt="Network Insights TAM analytics view"
                    className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                    draggable={false}
                  />
                </div>
              </div>
            ),
          },
          {
            label: "my goals",
            content: (
              <ul className="list-disc list-outside pl-6 flex flex-col gap-2">
              <li>Bring scattered systems together into one place the team can actually trust.</li>
              <li>Turn manual busywork into smooth, automated tools.</li>
              <li>Make the numbers clear so revenue, margin, and profit are easy to understand.</li>
              </ul>
            ),
          },
          {
            contentMaxWidthClassName: "max-w-[900px]",
            content: (
              <div className="flex w-full flex-col gap-6">
                <div className="flex w-full flex-col gap-3">
                  <div className="w-full overflow-visible rounded-[12px]">
                    <img
                      src="/images/cases/network-insight/segment.png"
                      alt="Custom Segment section for creating and managing campaign segments"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                  <p className="text-center text-[13px] leading-[130%] text-text-secondary">
                    Custom Segment section for creating and managing campaign segments
                  </p>
                </div>
                <ImageCarousel
                  slides={[
                    {
                      src: "/images/cases/network-insight/cs1.png",
                      alt: "Custom Segment interface, screen 1",
                    },
                    {
                      src: "/images/cases/network-insight/cs2.png",
                      alt: "Custom Segment interface, screen 2",
                    },
                    {
                      src: "/images/cases/network-insight/cs3.png",
                      alt: "Custom Segment interface, screen 3",
                    },
                    {
                      src: "/images/cases/network-insight/cs4.png",
                      alt: "Custom Segment interface, screen 4",
                    },
                    {
                      src: "/images/cases/network-insight/cs5.png",
                      alt: "Custom Segment interface, screen 5",
                    },
                  ]}
                />
              </div>
            ),
          },
          {
            label: "key decisions",
            content: (
              <ul className="list-disc list-outside pl-6 flex flex-col gap-2">
                <li>Avoided the &apos;mega dashboard&apos; trap by building a set of focused tools instead of one giant system, allowing us to release features faster and scale without breaking things.</li>
                <li>Designed the flows around what people actually do, like building segments or verifying brand safety, rather than just dumping raw data on the screen.</li>
                <li>Cut the chaos with clear roles (<strong>Viewer, Creator, Admin</strong>) so everyone knows exactly what they own, keeping workflows clean and conflict-free.</li>
                <li>Made a mobile version for quick check-ins, especially for C-levels who needed to track numbers on the go without struggling with complex desktop charts.</li>
              </ul>
            ),
          },
          {
            contentMaxWidthClassName: "max-w-[900px]",
            content: (
              <div className="flex w-full flex-col gap-5">
                <div className="flex w-full flex-col gap-3">
                  <div className="w-full overflow-visible rounded-[12px]">
                    <img
                      src="/images/cases/network-insight/members.png"
                      alt="User Management section with role configuration, access permissions and member overview"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                  <p className="text-center text-[13px] leading-[130%] text-text-secondary">
                    User Management section with role configuration, access permissions and member overview
                  </p>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <div className="w-full overflow-visible rounded-[12px]">
                    <img
                      src="/images/cases/network-insight/contentvideo.png"
                      alt="Campaign section with content video analytics and key campaign performance metrics"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                  <p className="text-center text-[13px] leading-[130%] text-text-secondary">
                    Campaign section with content video analytics and key campaign performance metrics
                  </p>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <div className="w-full overflow-visible rounded-[12px]">
                    <img
                      src="/images/cases/network-insight/inventory.png"
                      alt="Inventory section for analyzing top keywords, categories and segments by domain, country and language"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                  <p className="text-center text-[13px] leading-[130%] text-text-secondary">
                    Inventory section for analyzing top keywords, categories and segments by domain, country and language
                  </p>
                </div>
              </div>
            ),
          },
          {
            label: "the results",
            content: (
              <ul className="list-disc list-outside pl-6 flex flex-col gap-2">
                <li>Launched a <strong>6 new</strong> internal tools that replaced a mess of different systems and brought everything into one place.</li>
                <li>Reached <strong>300+ active users</strong> every month across the company.</li>
                <li>Massive <strong>time savings</strong>, as creating segments and reports now takes just <strong>minutes</strong> instead of <strong>hours</strong>.</li>
                <li>We&apos;ve seen real engagement with more users and longer sessions proving the platform is a key daily tool instead of just a reporting portal.</li>
              </ul>
            ),
          },
          {
            contentMaxWidthClassName: "max-w-[900px]",
            content: (
              <div className="flex w-full flex-col gap-5">
                <div className="flex w-full flex-col gap-3">
                  <div className="w-full overflow-visible rounded-[12px]">
                    <img
                      src="/images/cases/network-insight/iab.png"
                      alt="IAB Overview section for analyzing content categories and subcategories with view and engagement data"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                  <p className="text-center text-[13px] leading-[130%] text-text-secondary">
                    IAB Overview section for analyzing content categories and subcategories with view and engagement data
                  </p>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <div className="w-full overflow-visible rounded-[12px]">
                    <img
                      src="/images/cases/network-insight/olv.png"
                      alt="OLV Site List section for managing and optimizing site lists by campaign and performance parameter"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                  <p className="text-center text-[13px] leading-[130%] text-text-secondary">
                    OLV Site List section for managing and optimizing site lists by campaign and performance parameter
                  </p>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <div className="w-full overflow-visible rounded-[12px]">
                    <img
                      src="/images/cases/network-insight/export.png"
                      alt="Results table after report setup with data export options and filtering by categories and regions"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                  <p className="text-center text-[13px] leading-[130%] text-text-secondary">
                    Results table after report setup, featuring data export options and flexible filtering by categories and regions
                  </p>
                </div>
              </div>
            ),
          },
        ]}
      />
    </PageLayout>
  );
}
