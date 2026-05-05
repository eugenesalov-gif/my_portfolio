"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-10 px-4 py-3 pb-6 items-start min-[810px]:px-6 min-[810px]:py-6 min-[810px]:pb-8 min-[1200px]:flex-row min-[1200px]:gap-[60px]">
      <aside className={`${isHomePage ? "block" : "hidden"} relative w-full self-start min-[810px]:w-full min-[1200px]:block min-[1200px]:w-[450px] min-[1200px]:shrink-0 min-[1200px]:min-h-[calc(100svh-48px)]`}>
        <div className="relative h-auto w-full min-[1200px]:fixed min-[1200px]:top-6 min-[1200px]:left-[max(24px,calc((100vw-1600px)/2+24px))] min-[1200px]:h-[calc(100svh-48px)] min-[1200px]:w-[450px]">
          <Sidebar />
        </div>
      </aside>
      <motion.main
        className="w-full min-w-0 max-w-[1000px] min-[1200px]:flex-1"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.main>
    </div>
  );
}
