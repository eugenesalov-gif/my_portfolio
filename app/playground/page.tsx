"use client";

import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import PhotoBoothApp from "@/components/playground/PhotoBoothApp";
import BackButton from "@/components/ui/BackButton";
import CheckoutBadge from "@/components/ui/CheckoutBadge";

export default function PlaygroundPage() {
  const [isPhotoBoothOpen, setIsPhotoBoothOpen] = useState(false);
  const [isPhotoBoothCardHovered, setIsPhotoBoothCardHovered] = useState(false);

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col gap-8"
      >
        <div className="sticky top-3 z-20 mt-1 w-fit min-[810px]:top-6 min-[1200px]:hidden">
          <BackButton />
        </div>
        <div className="flex items-start gap-4">
          <h1 className="text-[32px] font-semibold leading-10 tracking-[-1.2px] text-text-primary">
            Playground
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-[26px] font-semibold leading-[1] tracking-[-1.6px] text-text-primary">
            Photo booth
          </h2>
          <button
            type="button"
            onClick={() => setIsPhotoBoothOpen(true)}
            onMouseEnter={() => setIsPhotoBoothCardHovered(true)}
            onMouseLeave={() => setIsPhotoBoothCardHovered(false)}
            className="group relative mt-2 w-full overflow-hidden rounded-[20px] bg-[#E8E8EE] text-left aspect-[16/9]"
            aria-label="Open Photo booth modal"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[20px]" style={{ backgroundColor: "#E8E8EE" }}>
              <video
                src="/videos/playground/photo-booth.mp4"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                draggable={false}
              />

              <CheckoutBadge visible={isPhotoBoothCardHovered} />
            </div>
          </button>
        </div>
      </motion.div>

      {isPhotoBoothOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(38,38,46,0.52)] p-4">
          <button
            type="button"
            className="absolute inset-0"
            aria-label="Close Photo booth modal overlay"
            onClick={() => setIsPhotoBoothOpen(false)}
          />
          <div className="relative z-10 h-[min(90vh,860px)] w-[min(96vw,1380px)] overflow-hidden rounded-[24px] bg-[#f9f9f9] shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
            <div className="group absolute right-5 top-5 z-20">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border-0 border-transparent border-none bg-transparent text-[rgba(249,249,249,1)] [background:unset] [background-color:unset] [background-clip:unset] [-webkit-background-clip:unset] [border-image:none] transition-colors hover:bg-transparent"
                aria-label="About Photo booth stack"
              >
                <img
                  src="/icons/information-circle.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-6 w-6 select-none bg-transparent [background:unset] [background-color:unset]"
                  draggable={false}
                />
              </button>
              <div className="pointer-events-none absolute right-0 top-10 flex w-fit flex-col gap-4 rounded-[14px] border border-[#ececec] bg-white p-4 opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-opacity duration-200 group-hover:opacity-100">
                <p className="mb-2 text-[20px] font-semibold leading-[0.95] tracking-[-1.2px] text-text-primary">
                  Photo Booth
                </p>
                <div className="flex w-fit items-start gap-6 text-[14px] text-text-primary">
                  <div className="flex w-fit flex-col gap-1">
                    <span className="h-fit w-fit text-[12px] text-text-secondary">Design</span>
                    <span className="h-fit w-fit">Figma</span>
                  </div>
                  <div className="flex w-fit flex-col gap-1">
                    <span className="h-fit w-fit text-[12px] text-text-secondary">Frontend</span>
                    <span className="h-fit w-fit">TypeScript</span>
                    <span className="h-fit w-fit">React</span>
                    <span className="h-fit w-fit">Vite</span>
                  </div>
                  <div className="flex w-fit flex-col gap-1">
                    <span className="h-fit w-fit text-[12px] text-text-secondary">Styling</span>
                    <span className="h-fit w-fit">Tailwind CSS</span>
                  </div>
                  <div className="flex w-fit flex-col gap-1">
                    <span className="h-fit w-fit text-[12px] text-text-secondary">Design</span>
                    <span className="h-fit w-fit whitespace-nowrap">Figma Make</span>
                    <span className="h-fit w-fit whitespace-nowrap">Claude Code</span>
                    <span className="h-fit w-fit">Cursor</span>
                  </div>
                </div>
              </div>
            </div>
            <PhotoBoothApp />
          </div>
        </div>
      )}
    </PageLayout>
  );
}
