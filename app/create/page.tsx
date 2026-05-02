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
        teamMembers={[
          {
            imageSrc: "/images/team/team-member-1.png",
            imageAlt: "Team member 1",
            tooltip: "Yauheni Salau",
            imageClassName: "object-center",
          },
          {
            imageSrc: "/images/team/team-member-2.png",
            imageAlt: "Team member 2",
            tooltip: "Irina Stepanova (Product Designer)",
            profileUrl: "https://www.linkedin.com/in/irina-stepi/",
          },
          {
            imageSrc: "/images/team/team-member-3.png",
            imageAlt: "Team member 3",
            tooltip: "Shahla Velieva (Product Manager)",
            profileUrl: "https://www.linkedin.com/in/shahlavelieva/",
          },
          {
            imageSrc: "/images/team/team-member-4.png",
            imageAlt: "Team member 4",
            tooltip: "Kay Schneider (President at ShowHeroes Group)",
            profileUrl: "https://www.linkedin.com/in/kayschneider/",
          },
        ]}
        teamExtraCount={4}
        previousCase={{
          href: "/player",
          title: "Redesigning a Video Player Ecosystem for Content and Ads",
        }}
        nextCase={{
          href: "/network-insight",
          title: "Building an Analytics Platform for Contextual Targeting",
        }}
        heroContent={(
          <div className="relative w-full overflow-hidden rounded-[20px]" style={{ backgroundColor: "#E8E8EE" }}>
            <video
              src="/videos/about/create.webm"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="block h-auto w-full object-contain"
            />
          </div>
        )}
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
            content: (
              <div className="flex w-full items-start justify-between gap-8 px-10">
                <div className="flex flex-col justify-start items-center gap-1">
                  <p className="text-[32px] font-bold leading-none tracking-[-1px] text-accent">+147%</p>
                  <p className="text-[16px] font-bold text-center leading-tight tracking-[-0.4px] text-text-secondary">revenue growth YoY</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[32px] font-bold leading-none tracking-[-1px] text-accent">~€500K</p>
                  <p className="text-[16px] font-bold text-center leading-tight tracking-[-0.4px] text-text-secondary">annual savings</p>
                </div>
                <div className="flex flex-col justify-start items-center gap-1">
                  <p className="text-[32px] font-bold leading-none tracking-[-1px] text-accent">+30%</p>
                  <p className="text-[16px] font-bold leading-tight tracking-[-0.4px] text-text-secondary">conversion rate</p>
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
                    src="/images/cases/create/editor.png"
                    alt="Create platform editor interface"
                    className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                    draggable={false}
                  />
                </div>
                <p className="text-center text-[13px] text-[#626266]">Create editor shown in dark theme</p>
              </div>
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
            contentMaxWidthClassName: "max-w-[900px]",
            content: (
              <div className="flex w-full flex-col gap-3">
                <div className="flex w-full flex-col gap-5 rounded-[20px] bg-[linear-gradient(0deg,rgba(35,35,36,1)_0%,rgba(54,54,54,1)_100%)] p-5">
                  <h2
                    className="w-full text-[26px] font-semibold leading-8 tracking-[-1.2px] lowercase"
                    style={{ color: "rgba(255, 255, 255, 1)" }}
                  >
                    before
                  </h2>
                  <div className="flex w-full flex-col gap-4">
                    <div className="w-full overflow-hidden rounded-[12px]">
                      <img
                        src="/images/cases/create/createbefore1.png"
                        alt="Create interface before redesign overview"
                        className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                        draggable={false}
                      />
                    </div>
                    <div className="w-full overflow-hidden rounded-[12px]">
                      <img
                        src="/images/cases/create/createbefore2.png"
                        alt="Create interface before redesign details"
                        className="block h-auto w-full rounded-[12px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-center text-[13px] text-[#626266]">
                  Legacy Create interface before redesign — creatives list and editing screen
                </p>
              </div>
            ),
          },
          {
            contentMaxWidthClassName: "max-w-[900px]",
            content: (
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
                      src="/images/cases/create/createlist.png"
                      alt="Create interface after redesign"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                </div>
                <p className="text-center text-[13px] text-[#626266]">
                  New Create interface after redesign — homepage with creatives list
                </p>
              </div>
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
            contentMaxWidthClassName: "max-w-[900px]",
            content: (
              <div className="flex w-full flex-col gap-3">
                <div className="flex w-full flex-col gap-5 rounded-[20px] bg-[linear-gradient(0deg,rgba(35,35,36,1)_0%,rgba(54,54,54,1)_100%)] p-5">
                  <div className="flex w-full flex-col gap-4">
                    <div className="w-full overflow-hidden rounded-[12px]">
                      <img
                        src="/images/cases/create/interviewRi.png"
                        alt="Create case study — user interview materials (interviewRi)"
                        className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                        draggable={false}
                      />
                    </div>
                    <div className="w-full overflow-hidden rounded-[12px]">
                      <img
                        src="/images/cases/create/interviewRu.png"
                        alt="Create case study — user interview materials (interviewRu)"
                        className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-center text-[13px] text-[#626266]">
                  Conducting user interviews and interface research
                </p>
              </div>
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
            contentMaxWidthClassName: "max-w-[900px]",
            content: (
              <div className="flex w-full flex-col gap-6">
                <div className="flex w-full flex-col gap-3">
                  <div className="w-full overflow-visible rounded-[12px]">
                    <img
                      src="/images/cases/create/template.png"
                      alt="Create template library with subgroups for navigation"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                  <p className="text-center text-[13px] text-[#626266]">
                    14 new templates added and organized into subgroups for easier navigation
                  </p>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <div className="w-full overflow-visible rounded-[12px]">
                    <img
                      src="/images/cases/create/poll.png"
                      alt="Brand Lift Study creation with poll setup and answer options in Create"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                  <p className="text-center text-[13px] text-[#626266]">
                    Brand Lift Study creation with poll setup and answer options
                  </p>
                </div>
              </div>
            ),
          },
          {
            label: "key decisions",
            content: (
              <ul className="list-disc list-outside pl-6 flex flex-col gap-3">
                <li>Created a scalable template library from 3 to 14 formats and organized them into subgroups so they’re easy to find and reuse.</li>
                <li>Simplified the creation flow so users can go from &ldquo;idea&rdquo; to &ldquo;launch&rdquo; without getting lost in technical complexity.</li>
                <li>Built a foundation for teamwork with roles, permissions, and a folder system so teams can manage their own projects without needing a developer for every small change.</li>
                <li>Integrated analytics directly into the UI with event tracking and fast exports, making performance transparent and reducing reporting time by 60%.</li>
                <li>Supported complex ad formats for CTV and Brand Lift studies, allowing users to handle advanced campaigns inside the same platform.</li>
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
                      src="/images/cases/create/related.png"
                      alt="Format Statistics — related creatives with CTR, attention time, completion rate and impressions"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                  <p className="text-center text-[13px] text-[#626266]">
                    Format Statistics with related creatives window showing CTR, attention time, completion rate and impressions
                  </p>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <div className="w-full overflow-visible rounded-[12px]">
                    <img
                      src="/images/cases/create/format.png"
                      alt="Format Statistics — market overview of formats and performance results"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                  <p className="text-center text-[13px] text-[#626266]">
                    Format Statistics with market overview of formats and performance results
                  </p>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <div className="w-full overflow-visible rounded-[12px]">
                    <img
                      src="/images/cases/create/managelocation.png"
                      alt="CTV template with location management and QR code generation"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                  <p className="text-center text-[13px] text-[#626266]">
                    CTV template with location management and QR code generation
                  </p>
                </div>
              </div>
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
          {
            contentMaxWidthClassName: "max-w-[900px]",
            content: (
              <div className="flex w-full flex-col gap-6">
                <div className="flex w-full flex-col gap-3">
                  <div className="w-full overflow-visible rounded-[12px]">
                    <img
                      src="/images/cases/create/analytics.png"
                      alt="Analytics dashboard with time spent metrics and user engagement data"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                  <p className="text-center text-[13px] text-[#626266]">
                    Analytics dashboard with time spent metrics and user engagement data
                  </p>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <div className="w-full overflow-visible rounded-[12px]">
                    <img
                      src="/images/cases/create/teams.png"
                      alt="Team and Members with team management and member role settings"
                      className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
                      draggable={false}
                    />
                  </div>
                  <p className="text-center text-[13px] text-[#626266]">
                    Team & Members with team management and member role settings
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
