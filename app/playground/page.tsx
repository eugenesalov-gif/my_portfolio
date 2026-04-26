"use client";

import PageLayout from "@/components/layout/PageLayout";
import BackButton from "@/components/ui/BackButton";
import { motion } from "framer-motion";

export default function PlaygroundPage() {
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
            Playground
          </h1>
        </div>

        <div className="rounded-2xl bg-[#F2F2F2] p-6">
          <p className="text-[19px] font-medium leading-7 tracking-[-0.6px] text-text-primary">
            This section is for experiments, prototypes, and quick ideas. More content coming soon.
          </p>
        </div>
      </motion.div>
    </PageLayout>
  );
}
