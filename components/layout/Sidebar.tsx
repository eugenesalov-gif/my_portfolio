"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type NavPreviewImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className: string;
};

const bottomNavItems: Array<{
  href: string;
  label: string;
  previewClassName: string;
  glowClassName?: string;
  images: NavPreviewImage[];
}> = [
  {
    href: "/about-me",
    label: "About me",
    previewClassName: "left-1/2 bottom-[-14px] h-[94px] w-[94px] -translate-x-1/2",
    images: [
      {
        src: "/nav-previews/avatar.png",
        alt: "",
        width: 1024,
        height: 1024,
        className:
          "left-1/2 top-[34px] w-[44px] -translate-x-1/2 rotate-[4deg] drop-shadow-none group-hover/nav-preview:top-[20px] group-hover/nav-preview:rotate-[-2deg]",
      },
    ],
  },
  {
    href: "/testimonials",
    label: "Testimonials",
    previewClassName: "left-1/2 bottom-[-14px] h-[94px] w-[94px] -translate-x-1/2",
    images: [
      {
        src: "/nav-previews/quote.png",
        alt: "",
        width: 1024,
        height: 1024,
        className:
          "left-1/2 top-[34px] w-[44px] -translate-x-1/2 rotate-[4deg] drop-shadow-none group-hover/nav-preview:top-[20px] group-hover/nav-preview:rotate-[-2deg]",
      },
    ],
  },
  {
    href: "/playground",
    label: "Playground",
    previewClassName: "left-1/2 bottom-[-14px] h-[70px] w-[56px] -translate-x-1/2",
    images: [
      {
        src: "/nav-previews/arrow.png",
        alt: "",
        width: 406,
        height: 374,
        className:
          "left-[0px] top-[28px] w-[25px] rotate-[-20deg] delay-75 group-hover/nav-preview:top-[14px] group-hover/nav-preview:rotate-[-24deg]",
      },
      {
        src: "/nav-previews/figma.png",
        alt: "",
        width: 375,
        height: 370,
        className:
          "left-[36px] top-[28px] w-[20px] rotate-[20deg] delay-75 group-hover/nav-preview:top-[14px] group-hover/nav-preview:rotate-[24deg]",
      },
      {
        src: "/nav-previews/spark.png",
        alt: "",
        width: 433,
        height: 420,
        className:
          "left-[12px] top-[8px] w-[31px] rotate-[5deg] group-hover/nav-preview:top-0 group-hover/nav-preview:rotate-[8deg]",
      },
    ],
  },
];

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
    <div className="relative w-full h-[164px] rounded-[20px] overflow-hidden">
      <Link href="/" className="absolute left-0 top-0 z-0 block h-full w-full" aria-label="Go to homepage">
        <Image
          src="/profilecard.png"
          alt="Yauheni Salau portrait"
          width={479}
          height={200}
          quality={100}
          className="h-full w-full object-cover object-left"
          priority
        />
      </Link>

      <motion.a
        href="https://drive.google.com/file/d/1wNJ9fGxSyQqS2zsYullXaZ86fLwSPXSH/view"
        target="_blank"
        rel="noopener noreferrer"
        className="group absolute left-[304px] top-[5px] z-20 flex h-[32px] w-[142px] items-center justify-center rounded-full bg-bg-dark text-[14px] font-medium text-text-white"
      >
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,#1D1D26_0%,#686875_100%)] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden="true"
        />
        <span className="relative z-10 flex items-center justify-center gap-1.5">
          <DownloadIcon />
          Download CV
        </span>
      </motion.a>

      <div className="absolute left-[156px] top-[5px] z-10 flex h-[155px] w-[290px] flex-col items-start justify-end pl-4 pb-6">
        <Image
          src="/whiteblock_profile.svg"
          alt=""
          width={290}
          height={155}
          className="absolute inset-0 h-full w-full pointer-events-none select-none"
          aria-hidden="true"
          priority
        />
        <div className="relative z-10 box-border flex h-full w-full flex-col items-start justify-end gap-2 pl-0 pr-0 pt-0 pb-0">
          <div className="flex h-fit flex-col items-start gap-1">
            <p className="text-[26px] font-semibold leading-tight tracking-[-0.96px] text-text-primary">
              Yauheni Salau
            </p>
            <p
              className="text-[14px] font-medium text-text-secondary"
              style={{ fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}
            >
              Senior Product Designer
            </p>
          </div>

          <div className="flex justify-start gap-1 text-[14px] font-medium text-text-primary">
            <a
              href="https://linkedin.com/in/eugenesalov"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-text-primary transition-colors duration-200 ease-out hover:text-[#626266] focus-visible:text-[#626266]"
            >
              linkedin
            </a>
            <span className="text-text-tertiary">·</span>
            <a
              href="mailto:eugensalov@gmail.com"
              className="underline text-text-primary transition-colors duration-200 ease-out hover:text-[#626266] focus-visible:text-[#626266]"
            >
              email
            </a>
            <span className="text-text-tertiary">·</span>
            <a
              href="https://t.me/eugenesalov"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-text-primary transition-colors duration-200 ease-out hover:text-[#626266] focus-visible:text-[#626266]"
            >
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
      <div className="flex items-center gap-1.5 mt-1 h-9">
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
    <div className="flex gap-6 px-1 pt-2 mt-auto pb-2 overflow-visible">
      {bottomNavItems.map((item) => (
        <PreviewNavLink key={item.href} {...item} />
      ))}
    </div>
  );
}

function PreviewNavLink({
  href,
  label,
  previewClassName,
  glowClassName,
  images,
}: {
  href: string;
  label: string;
  previewClassName: string;
  glowClassName?: string;
  images: NavPreviewImage[];
}) {
  return (
    <Link
      href={href}
      className="group/nav-preview relative isolate inline-flex text-[16px] font-medium text-text-primary outline-none"
      aria-label={label}
    >
      <span
        className={`pointer-events-none absolute z-0 opacity-0 transition-opacity duration-200 ease-out group-hover/nav-preview:opacity-100 group-focus-visible/nav-preview:opacity-100 ${previewClassName}`}
        aria-hidden="true"
      >
        {glowClassName && <span className={`absolute ${glowClassName}`} />}
        {images.map((image) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            draggable={false}
            className={`absolute h-auto select-none drop-shadow-[0_20px_32px_rgba(29,29,38,0.24)] transition-all duration-300 ease-out [will-change:transform,opacity] group-hover/nav-preview:scale-100 group-focus-visible/nav-preview:scale-100 ${image.className}`}
          />
        ))}
      </span>
      <span className="relative z-10 underline decoration-[1.5px] underline-offset-[2px]">
        {label}
      </span>
    </Link>
  );
}

function DownloadIcon() {
  return (
    <div className="h-[22px] w-[22px] leading-none">
      <DotLottieReact
        src="https://lottie.host/f80c385d-318e-48e4-8435-078b09a4f8c4/sTC5j7ZKLl.lottie"
        autoplay
        loop
        style={{ width: 22, height: 22 }}
      />
    </div>
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
