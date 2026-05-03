"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const letterEase = [0.22, 1, 0.36, 1] as const;

type BottomUpLettersProps = {
  text: string;
  className?: string;
  /** Extra delay before this block’s letter stagger (seconds). */
  blockDelay?: number;
};

export default function BottomUpLetters({
  text,
  className = "",
  blockDelay = 0,
}: BottomUpLettersProps) {
  const ref = useRef<HTMLSpanElement>(null);
  /** Root margin as typed tuple so TS accepts Framer’s MarginType. */
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px 0px -40px 0px",
    amount: 0.2,
  });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const chars = Array.from(text);
  const show = isInView;

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className}`.trim()}>
      {chars.map((char, i) => (
        <span
          key={`${i}-${char}`}
          className="inline-block overflow-hidden align-baseline"
          style={{ height: "1.08em" }}
        >
          <motion.span
            className="inline-block leading-none"
            initial={false}
            animate={show ? { y: 0, opacity: 1 } : { y: 32, opacity: 0 }}
            transition={{
              delay: blockDelay + i * 0.045,
              duration: 0.52,
              ease: letterEase,
            }}
            style={{ willChange: "transform, opacity" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
