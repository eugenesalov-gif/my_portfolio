"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

export type ImageCarouselSlide = {
  src: string;
  alt: string;
  caption?: string;
};

type ImageCarouselProps = {
  slides: ImageCarouselSlide[];
  className?: string;
  footerCaption?: string;
};

export default function ImageCarousel({
  slides,
  className = "",
  footerCaption,
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, slides.length - 1)));
  }, [slides.length]);

  useEffect(() => {
    if (slides.length === 0) return;
    const si = Math.min(index, slides.length - 1);
    thumbRefs.current[si]?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index, slides.length, reduceMotion]);

  if (slides.length === 0) return null;

  const safeIndex = Math.min(index, slides.length - 1);
  const active = slides[safeIndex] ?? slides[0];
  const hasPerSlideCaptions = slides.some((s) => s.caption);

  return (
    <div className={`flex w-full flex-col gap-4 ${className}`.trim()}>
      <div className="relative w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.src}
            initial={{ opacity: reduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduceMotion ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
            className="rounded-[12px]"
          >
            <img
              src={active.src}
              alt={active.alt}
              className="block h-auto w-full rounded-[8px] object-contain shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        className="-mx-1 flex justify-center overflow-x-auto px-1 py-3 [scrollbar-width:thin]"
        role="tablist"
        aria-label="Gallery thumbnails"
      >
        <div className="flex w-max max-w-full items-center gap-2.5">
          {slides.map((slide, i) => {
            const selected = i === safeIndex;
            return (
              <button
                key={slide.src}
                ref={(el) => {
                  thumbRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`Show image ${i + 1}: ${slide.alt}`}
                onClick={() => setIndex(i)}
                className={clsx(
                  "relative shrink-0 rounded-[8px] outline-none transition-[box-shadow,opacity,transform] focus-visible:ring-2 focus-visible:ring-[#0E9AFF] focus-visible:ring-offset-2",
                  selected
                    ? "z-[1] opacity-100 shadow-[0_0_0_2px_#0E9AFF,0_4px_12px_rgba(14,154,255,0.25)]"
                    : "opacity-[0.72] hover:opacity-100",
                )}
              >
                <span className="block overflow-hidden rounded-[8px]">
                  <img
                    src={slide.src}
                    alt=""
                    className="pointer-events-none block h-[52px] w-[88px] bg-[#F0F0F0] object-contain object-top"
                    draggable={false}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {footerCaption ? (
        <p className="text-center text-[13px] leading-[130%] text-[#626266]">
          {footerCaption}
        </p>
      ) : hasPerSlideCaptions ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={safeIndex}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.22, ease: "easeOut" }}
            className="text-center text-[13px] leading-[130%] text-[#626266]"
          >
            {slides[safeIndex]?.caption}
          </motion.p>
        </AnimatePresence>
      ) : null}
    </div>
  );
}
