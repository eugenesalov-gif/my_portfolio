"use client";

import PageLayout from "@/components/layout/PageLayout";
import BackButton from "@/components/ui/BackButton";
import { motion } from "framer-motion";

export default function AboutMePage() {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col gap-8"
      >
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <BackButton />
          </div>
          <h1 className="text-[32px] font-semibold leading-10 tracking-[-1.2px] text-text-primary">
            About me
          </h1>
        </div>

        {/* Photo placeholder */}
        <div
          className="w-full rounded-[20px] bg-[#E8E8EE]"
          style={{ aspectRatio: "16/7" }}
        />

        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-3">
            <h2 className="text-[26px] font-semibold leading-8 tracking-[-1.2px] text-accent lowercase">
              how do i design
            </h2>
            <div className="flex flex-col gap-4 text-[19px] font-medium leading-7 tracking-[-0.6px] text-text-primary">
              <p>
                Senior Product Designer with 5+ years of experience building B2B, SaaS solutions across analytics platforms, automation platforms and video players.
              </p>
              <p>
                I turn complex user jobs into simple interfaces by following the &ldquo;Shazam&rdquo; approach: do it in one button if possible.
              </p>
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li><strong>Clarity first</strong> — converting complex systems into intuitive experiences.</li>
                <li><strong>Systems over screens</strong> — emphasising scalable design systems.</li>
                <li><strong>Collaboration matters</strong> — valuing teamwork across disciplines.</li>
                <li><strong>Impact by design</strong> — connecting aesthetics with measurable business results.</li>
              </ul>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-[26px] font-semibold leading-8 tracking-[-1.2px] text-accent lowercase">
              beyond work
            </h2>
            <p className="text-[19px] font-medium leading-7 tracking-[-0.6px] text-text-primary">
              My journey into design began with creating a website for an online flower shop. Later experience in Abu Dhabi in food and beverage roles cultivated a passion for detail. I pursued formal design training at the British Higher School of Art and Design in Moscow.
            </p>
            <p className="text-[19px] font-medium leading-7 tracking-[-0.6px] text-text-primary">
              Now I live by the sea in Spain with my spouse and dog — enjoying travel and everyday adventures.
            </p>
          </section>
        </div>
      </motion.div>
    </PageLayout>
  );
}
