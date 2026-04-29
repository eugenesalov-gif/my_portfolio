"use client";

import Image from "next/image";
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

        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-3">
            <div className="flex flex-col items-center justify-start gap-12 text-[19px] font-medium leading-7 tracking-[-0.6px] text-text-primary">
              <p className="max-w-[800px]">
                My design journey started with my first online flower shop. I needed a website, so I created it myself, and that was the moment I understood how much I like design.
              </p>
              <p className="max-w-[800px]">
                Later, when I worked in Abu Dhabi, first as a bartender and then as a F&amp;B supervisor, I discovered the same passion for details while crafting cocktails and designing signature menus.
              </p>
              <p className="max-w-[800px]">
                That was the moment I realized I wanted to pursue design seriously. To make this step, I studied at the British Higher School of Art and Design in Moscow, which gave me the foundation for my career.
              </p>
              <div className="grid w-full max-w-[900px] grid-cols-1 gap-6 md:grid-cols-3">
                <div className="relative overflow-hidden rounded-[20px]">
                  <div className="relative aspect-[3/5] w-full">
                    <Image src="/images/places/map-preview-malaga.png" alt="Sorrento, Italy" fill className="object-cover" sizes="(min-width: 768px) 260px, 100vw" />
                  </div>
                  <span className="absolute bottom-3 left-3 inline-flex h-8 items-center rounded-3xl bg-[rgba(85,85,85,0.4)] px-3 py-[6px] text-[16px] font-bold leading-none tracking-[-0.4px] text-white backdrop-blur-[3px] shadow-[inset_1px_1px_2px_-1px_rgba(255,255,255,1),inset_-1px_-1px_2px_-1px_rgba(255,255,255,1)]">
                    Sorrento, Italy
                  </span>
                </div>
                <div className="relative overflow-hidden rounded-[20px]">
                  <div className="relative aspect-[3/5] w-full">
                    <Image src="/images/testimonials/testimonial-arseniy.png" alt="Andorra" fill className="object-cover" sizes="(min-width: 768px) 260px, 100vw" />
                  </div>
                  <span className="absolute bottom-3 left-3 inline-flex h-8 items-center rounded-3xl bg-[rgba(85,85,85,0.4)] px-3 py-[6px] text-[16px] font-bold leading-none tracking-[-0.4px] text-white backdrop-blur-[3px] shadow-[inset_1px_1px_2px_-1px_rgba(255,255,255,1),inset_-1px_-1px_2px_-1px_rgba(255,255,255,1)]">
                    Andorra
                  </span>
                </div>
                <div className="relative overflow-hidden rounded-[20px]">
                  <div className="relative aspect-[3/5] w-full">
                    <Image src="/images/team/team-member-2.png" alt="Seville, Spain" fill className="object-cover" sizes="(min-width: 768px) 260px, 100vw" />
                  </div>
                  <span className="absolute bottom-3 left-3 inline-flex h-8 items-center rounded-3xl bg-[rgba(85,85,85,0.4)] px-3 py-[6px] text-[16px] font-bold leading-none tracking-[-0.4px] text-white backdrop-blur-[3px] shadow-[inset_1px_1px_2px_-1px_rgba(255,255,255,1),inset_-1px_-1px_2px_-1px_rgba(255,255,255,1)]">
                    Seville, Spain
                  </span>
                </div>
              </div>
              <div className="flex w-fit max-w-[800px] flex-col gap-6">
                <h2 className="text-[26px] font-semibold leading-8 tracking-[-1.2px] text-accent lowercase">
                  how do i design
                </h2>
                <div className="relative pl-4">
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 top-0 w-[2px] rounded-[2px] bg-[linear-gradient(180deg,#0E9AFF_0%,#0D9AFF00_100%)]"
                  />
                  <ul className="list-disc list-inside flex flex-col gap-5">
                    <li className="flex flex-col gap-2">
                    <p className="max-w-[800px]"><strong>Clarity first</strong></p>
                    <p className="max-w-[800px]">I turn complex systems into simple, intuitive experiences that people actually enjoy using.</p>
                    </li>
                    <li className="flex flex-col gap-2">
                    <p className="max-w-[800px]"><strong>Systems over screens</strong></p>
                    <p className="max-w-[800px]">I focus on scalable design systems that speed up development and keep products consistent across platforms.</p>
                    </li>
                    <li className="flex flex-col gap-4">
                    <p className="max-w-[800px]"><strong>Collaboration matters</strong></p>
                    <p className="max-w-[800px]">I believe the best solutions come from close teamwork with product managers, engineers, and stakeholders.</p>
                    </li>
                    <li className="flex flex-col gap-5">
                    <p className="max-w-[800px]"><strong>Impact by design</strong></p>
                    <p className="max-w-[800px]">For me, good design isn’t just about aesthetics — it’s about driving measurable results for both users and businesses.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto flex w-full max-w-[800px] flex-col items-center gap-6">
            <h2 className="w-full max-w-[800px] text-[26px] font-semibold leading-8 tracking-[-1.2px] text-accent lowercase">
              beyond work
            </h2>
            <p className="w-full max-w-[800px] text-[19px] font-medium leading-7 tracking-[-0.6px] text-text-primary">
              Beyond design, I’m happiest when spending time with my wife and our dog. We live by the sea in Spain, love to travel, and enjoy the small adventures of everyday life.
            </p>
          </section>
        </div>
      </motion.div>
    </PageLayout>
  );
}
