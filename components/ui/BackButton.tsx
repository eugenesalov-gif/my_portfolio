"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface BackButtonProps {
  variant?: "back" | "close";
  alwaysVisible?: boolean;
}

export default function BackButton({ variant = "back", alwaysVisible = false }: BackButtonProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isClose = variant === "close";
  const showButton = alwaysVisible || isVisible;

  useEffect(() => {
    if (alwaysVisible) return;

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
  }, [alwaysVisible]);

  return (
    <motion.button
      onClick={() => router.push("/")}
      className={`flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-[rgba(85,85,85,0.4)] text-white backdrop-blur-[3px] shadow-[inset_1px_1px_2px_-1px_rgba(255,255,255,1),inset_-1px_-1px_2px_-1px_rgba(255,255,255,1)] ${
        isClose ? "w-10" : "gap-1 pl-3 pr-4"
      }`}
      animate={alwaysVisible ? undefined : { y: showButton ? 0 : -20, opacity: showButton ? 1 : 0 }}
      whileHover={isClose ? { scale: 1.05 } : { x: -3 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      aria-label={isClose ? "Close" : "Go back"}
      style={{ pointerEvents: showButton ? "auto" : "none" }}
    >
      {isClose ? (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[14px] font-semibold leading-none">Back</span>
        </>
      )}
    </motion.button>
  );
}
