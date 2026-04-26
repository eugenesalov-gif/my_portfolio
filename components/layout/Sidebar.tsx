"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Sidebar() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col gap-6">
        <ProfileCard />
        <Bio />
      </div>
      <BottomNav />
    </div>
  );
}

function ProfileCard() {
  return (
    <div className="bg-white rounded-3xl p-5">
      <div className="flex items-start gap-4">
        {/* Portrait placeholder */}
        <div className="w-[80px] h-[80px] rounded-2xl bg-[#F2F2F2] shrink-0" />

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[26px] font-semibold leading-tight tracking-[-0.96px] text-text-primary">
                Yauheni Salau
              </p>
              <p
                className="text-[14px] font-medium text-text-secondary mt-0.5"
                style={{ fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}
              >
                Senior Product Designer
              </p>
            </div>
            <motion.a
              href="https://drive.google.com/file/d/1wNJ9fGxSyQqS2zsYullXaZ86fLwSPXSH/view"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-bg-dark text-text-white text-[12px] font-medium rounded-2xl px-3 py-1.5 shrink-0 whitespace-nowrap"
              whileHover={{ scale: 0.97 }}
              whileTap={{ scale: 0.97 }}
            >
              <DownloadIcon />
              Download CV
            </motion.a>
          </div>

          <div className="flex gap-3 mt-2 text-[14px] font-medium text-text-primary">
            <a href="https://linkedin.com/in/eugenesalov" target="_blank" rel="noopener noreferrer" className="underline">
              linkedin
            </a>
            <span className="text-text-tertiary">·</span>
            <a href="mailto:eugensalov@gmail.com" className="underline">
              email
            </a>
            <span className="text-text-tertiary">·</span>
            <a href="https://t.me/eugenesalov" target="_blank" rel="noopener noreferrer" className="underline">
              telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bio() {
  return (
    <div className="flex flex-col gap-3 px-1">
      <p className="text-[16px] font-medium leading-5 tracking-[-0.64px] text-text-primary">
        Hola 👋
      </p>
      <p className="text-[16px] font-medium leading-5 tracking-[-0.64px] text-text-primary">
        Senior Product Designer with 5+ years of experience building B2B, SaaS solutions across analytics platforms, automation platforms and video players.
      </p>
      <p className="text-[16px] font-medium leading-5 tracking-[-0.64px] text-text-primary">
        I turn complex user jobs into simple interfaces by following the &ldquo;Shazam&rdquo; approach: do it in one button if possible.
      </p>
      <div className="flex items-center gap-1.5 mt-1">
        <PinIcon />
        <span className="text-[13px] leading-[13px] tracking-[-0.6px]">
          <span className="font-semibold text-text-tertiary">36°43′13″ N, 4°25′13″ W</span>
          {" "}<span className="font-semibold text-text-primary">/ Now here</span>
        </span>
      </div>
    </div>
  );
}

function BottomNav() {
  return (
    <div className="flex gap-6 px-1 pt-2 mt-auto pb-2">
      <Link href="/about-me" className="text-[16px] font-medium text-text-primary underline">
        About me
      </Link>
      <Link href="/testimonials" className="text-[16px] font-medium text-text-primary underline">
        Testimonials
      </Link>
      <Link href="/playground" className="text-[16px] font-medium text-text-primary underline">
        Playground
      </Link>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 1C4.79 1 3 2.79 3 5c0 3.25 4 8 4 8s4-4.75 4-8c0-2.21-1.79-4-4-4z" stroke="#888888" strokeWidth="1.2" fill="none" />
      <circle cx="7" cy="5" r="1.2" fill="#888888" />
    </svg>
  );
}
