"use client";

import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[1600px] mx-auto flex gap-[60px] px-6 py-6 pb-16 items-start">
      <aside className="w-[450px] shrink-0 sticky top-6 self-start h-[calc(100svh-48px)]">
        <Sidebar />
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
