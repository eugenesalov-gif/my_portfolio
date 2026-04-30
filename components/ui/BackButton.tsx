"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function BackButton() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Always show the button near the top.
      if (currentY <= 8) {
        setIsVisible(true);
        lastScrollY.current = currentY;
        return;
      }

      if (currentY > lastScrollY.current) {
        setIsVisible(false);
      } else if (currentY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.button
      onClick={() => router.push("/")}
      className="flex h-10 shrink-0 items-center justify-center gap-1 overflow-hidden rounded-3xl bg-[rgba(85,85,85,0.4)] pl-3 pr-4 text-white backdrop-blur-[3px] shadow-[inset_1px_1px_2px_-1px_rgba(255,255,255,1),inset_-1px_-1px_2px_-1px_rgba(255,255,255,1)]"
      animate={{ y: isVisible ? 0 : -20, opacity: isVisible ? 1 : 0 }}
      whileHover={{ x: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      aria-label="Go back"
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[14px] font-semibold leading-none">Back</span>
    </motion.button>
  );
}
