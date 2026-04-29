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
            label: "my role",
            content: (
              <p>
                I led the design from the ground up. I mapped out how the different teams work to create a structure that makes sense for them. I designed the interface to handle complex data and worked side-by-side with the product manager and engineering to build and ship the platform step by step.
              </p>
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
            label: "key decisions",
            content: (
              <ul className="list-disc list-outside pl-6 flex flex-col gap-2">
                <li>Avoided the 'mega dashboard' trap by building a set of focused tools instead of one giant system, allowing us to release features faster and scale without breaking things.</li>
                <li>Designed the flows around what people actually do, like building segments or verifying brand safety, rather than just dumping raw data on the screen.</li>
                <li>Cut the chaos with clear roles (<strong>Viewer, Creator, Admin</strong>) so everyone knows exactly what they own, keeping workflows clean and conflict-free.</li>
                <li>Made a mobile version for quick check-ins, especially for C-levels who needed to track numbers on the go without struggling with complex desktop charts.</li>
              </ul>
            ),
          },
          {
            label: "the results",
            content: (
              <ul className="list-disc list-outside pl-6 flex flex-col gap-2">
                <li>Launched a <strong>6 new</strong> internal tools that replaced a mess of different systems and brought everything into one place.</li>
                <li>Reached <strong>300+ active users</strong> every month across the company.</li>
                <li>Massive <strong>time savings</strong>, as creating segments and reports now takes just <strong>minutes</strong> instead of <strong>hours</strong>.</li>
                <li>We've seen real engagement with more users and longer sessions proving the platform is a key daily tool instead of just a reporting portal.</li>
              </ul>
            ),
          },
        ]}
      />
    </PageLayout>
  );
}
