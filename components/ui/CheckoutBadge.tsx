"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";

type CheckoutBadgeProps = {
  visible: boolean;
};

export default function CheckoutBadge({ visible }: CheckoutBadgeProps) {
  const { theme } = useTheme();
  const shapeSrc =
    theme === "dark" ? "/icons/checkout-block-dark.svg" : "/icons/checkout-block.svg";

  return (
    <motion.div
      className="pointer-events-none absolute left-[-15px] top-0 z-20"
      initial={false}
      animate={{ x: visible ? 0 : "-110%" }}
      transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
    >
      <img
        src={shapeSrc}
        alt=""
        aria-hidden="true"
        className="block h-auto w-[201px] select-none"
        draggable={false}
      />
      <span className="checkout-badge__label absolute left-12 top-3.5 inline-flex items-baseline gap-2 text-[14px] font-semibold leading-none tracking-[-0.04em]">
        Check it out
        <span aria-hidden="true" className="inline-flex h-4 w-4 items-center justify-center text-[16px] leading-none">
          <span className="relative top-[1px]">→</span>
        </span>
      </span>
    </motion.div>
  );
}
