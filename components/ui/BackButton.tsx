"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function BackButton() {
  const router = useRouter();
  return (
    <motion.button
      onClick={() => router.back()}
      className="w-10 h-10 rounded-3xl bg-bg-gray flex items-center justify-center shrink-0"
      whileHover={{ x: -3 }}
      transition={{ duration: 0.15 }}
      aria-label="Go back"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 3L5 8l5 5" stroke="#1D1D26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.button>
  );
}
