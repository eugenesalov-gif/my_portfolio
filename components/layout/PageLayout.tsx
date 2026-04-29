"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="w-full max-w-[1600px] mx-auto flex gap-[60px] px-6 py-6 pb-16 items-start">
      <aside className="w-[450px] shrink-0 self-start">
        <div className="fixed top-6 left-[max(24px,calc((100vw-1600px)/2+24px))] h-[calc(100svh-48px)] w-[450px]">
          <Sidebar />
        </div>
      </aside>
      <motion.main
        className="flex-1 min-w-0 w-full max-w-[1000px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.main>
    </div>
  );
}
