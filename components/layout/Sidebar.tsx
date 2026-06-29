"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import PortfolioChat from "@/components/chat/PortfolioChat";
import {
  ChatLayoutProvider,
  useChatLayout,
} from "@/components/chat/ChatLayoutContext";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";
import { PROFILE_CARD_SHAPE_DEFAULT, PROFILE_CARD_SHAPE_DESKTOP } from "@/lib/profile-card-shapes";
import { homeRiseTransition, homeRiseVisible } from "@/lib/motion";

const CV_LOTTIE_LIGHT =
  "https://lottie.host/f80c385d-318e-48e4-8435-078b09a4f8c4/sTC5j7ZKLl.lottie";
const CV_LOTTIE_DARK =
  "https://lottie.host/40623bdc-12e1-42e7-af4c-e40b410704bc/Zzb6l2torl.lottie";

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
          "left-1/2 top-[34px] w-[44px] -translate-x-1/2 rotate-[4deg] drop-shadow-none min-[1200px]:group-hover/nav-preview:top-[12px] min-[1200px]:group-hover/nav-preview:rotate-[-2deg]",
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
          "left-1/2 top-[34px] w-[44px] -translate-x-1/2 rotate-[4deg] drop-shadow-none min-[1200px]:group-hover/nav-preview:top-[12px] min-[1200px]:group-hover/nav-preview:rotate-[-2deg]",
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
          "left-[0px] top-[28px] w-[25px] rotate-[-20deg] delay-75 min-[1200px]:group-hover/nav-preview:top-[6px] min-[1200px]:group-hover/nav-preview:rotate-[-24deg]",
      },
      {
        src: "/nav-previews/figma.png",
        alt: "",
        width: 375,
        height: 370,
        className:
          "left-[36px] top-[28px] w-[20px] rotate-[20deg] delay-75 min-[1200px]:group-hover/nav-preview:top-[6px] min-[1200px]:group-hover/nav-preview:rotate-[24deg]",
      },
      {
        src: "/nav-previews/spark.png",
        alt: "",
        width: 433,
        height: 420,
        className:
          "left-[12px] top-[8px] w-[31px] rotate-[5deg] min-[1200px]:group-hover/nav-preview:-top-[8px] min-[1200px]:group-hover/nav-preview:rotate-[8deg]",
      },
    ],
  },
];

function BottomNavLabel({ text }: { text: string }) {
  return <span className="block leading-[1.25]">{text}</span>;
}

function HomeRiseBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const isHomePage = pathname === "/";

  if (!isHomePage || reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={false}
      animate={homeRiseVisible}
      transition={{ ...homeRiseTransition, delay }}
    >
      {children}
    </motion.div>
  );
}

const DESKTOP_MEDIA_QUERY = "(min-width: 1200px)";

function useIsDesktopViewport() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const update = () => setIsDesktop(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export default function Sidebar() {
  return (
    <ChatLayoutProvider>
      <SidebarContent />
    </ChatLayoutProvider>
  );
}

function SidebarContent() {
  const chatLayout = useChatLayout();
  const reduceMotion = useReducedMotion();
  const isDesktopViewport = useIsDesktopViewport();
  const setBioSlotHeight = chatLayout?.setBioSlotHeight;
  const bioMeasureRef = chatLayout?.bioMeasureRef;

  useLayoutEffect(() => {
    if (!setBioSlotHeight || !bioMeasureRef) {
      return;
    }

    if (isDesktopViewport) {
      setBioSlotHeight(null);
      return;
    }

    const measureBioSlot = () => {
      const measureEl = bioMeasureRef.current;
      if (!measureEl) {
        return;
      }

      const nextHeight = Math.round(measureEl.getBoundingClientRect().height);
      setBioSlotHeight?.(nextHeight);
    };

    measureBioSlot();

    const resizeObserver = new ResizeObserver(measureBioSlot);
    if (bioMeasureRef.current) {
      resizeObserver.observe(bioMeasureRef.current);
    }

    window.addEventListener("resize", measureBioSlot);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureBioSlot);
    };
  }, [isDesktopViewport, setBioSlotHeight, bioMeasureRef]);

  if (!chatLayout) {
    return null;
  }

  const {
    bioRef,
    profileCardRef,
    bioHidden,
    suggestionsInBioSlot,
    dialogInBioSlot,
    bioSlotHeight,
  } = chatLayout;

  const bioObscured = suggestionsInBioSlot || dialogInBioSlot;
  const lockBioSlotHeight = !isDesktopViewport && bioSlotHeight !== null;

  return (
    <div className="h-full flex flex-col px-0 min-[810px]:px-0">
      <div className="flex flex-col">
        <div ref={profileCardRef}>
          <ProfileCard />
        </div>
        <div
          ref={bioRef}
          className="relative mt-5 min-[810px]:mt-6"
          style={lockBioSlotHeight ? { minHeight: bioSlotHeight } : undefined}
        >
          <div
            ref={chatLayout.bioMeasureRef}
            className={
              bioObscured ? "invisible pointer-events-none select-none" : undefined
            }
            aria-hidden={bioObscured}
          >
            <motion.div
              initial={false}
              animate={
                isDesktopViewport
                  ? reduceMotion
                    ? { opacity: bioHidden ? 0 : 1, display: bioHidden ? "none" : "block" }
                    : {
                        opacity: bioHidden ? 0 : 1,
                        height: bioHidden ? 0 : "auto",
                        marginTop: bioHidden ? 0 : undefined,
                      }
                  : { opacity: 1, height: "auto" }
              }
              transition={
                isDesktopViewport
                  ? { duration: bioHidden ? 0 : 0.3, ease: "easeOut" }
                  : { duration: 0 }
              }
              style={{ overflow: "hidden" }}
              aria-hidden={isDesktopViewport ? bioHidden : false}
            >
              <Bio />
            </motion.div>
          </div>
        </div>
      </div>
      <div className="flex flex-col min-[1200px]:mt-auto">
        <HomeRiseBlock delay={0.2} className="w-full">
          <PortfolioChat />
        </HomeRiseBlock>
        <HomeRiseBlock delay={0} className="w-full">
          <BottomNav />
        </HomeRiseBlock>
      </div>
    </div>
  );
}

function CvDownloadButton({ className = "" }: { className?: string }) {
  return (
    <motion.a
      href="https://drive.google.com/file/d/1wNJ9fGxSyQqS2zsYullXaZ86fLwSPXSH/view"
      target="_blank"
      rel="noopener noreferrer"
      className={`profile-cv-button relative flex items-center justify-center rounded-[10px] text-[13px] font-medium min-[810px]:rounded-[12px] min-[810px]:text-[14px] ${className}`}
    >
      <span className="relative flex items-center justify-center gap-1.5">
        <DownloadIcon />
        <span className="min-[810px]:hidden">CV</span>
        <span className="hidden min-[810px]:inline">Download CV</span>
      </span>
    </motion.a>
  );
}

function ProfileCard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const profileObjectPosition =
    "object-cover object-[24%_center] min-[810px]:object-left";

  return (
    <div className="relative w-full h-[146px] rounded-[16px] overflow-hidden min-[810px]:h-[164px] min-[810px]:w-[450px]">
      <Link
        href="/"
        className="peer/profile-image absolute left-0 top-0 z-0 block h-full w-full overflow-hidden"
        aria-label="Go to homepage"
      >
        <Image
          src="/images/ui/profilecard-original.png"
          alt="Yauheni Salau portrait"
          width={479}
          height={200}
          unoptimized
          quality={100}
          className={`h-full w-full transition-opacity duration-300 ${profileObjectPosition} ${isDark ? "opacity-0" : "opacity-100"}`}
          priority
        />
        <Image
          src="/images/ui/profilecard-original-dark.png"
          alt=""
          width={1024}
          height={376}
          unoptimized
          quality={100}
          aria-hidden
          className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${profileObjectPosition} ${isDark ? "opacity-100" : "opacity-0"}`}
          priority
        />
      </Link>
      <Link
        href="/"
        aria-label="Go to homepage"
        className="group/home-pulse absolute bottom-2 left-[58px] z-30 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(85,85,85,0.4)] opacity-0 backdrop-blur-[3px] shadow-[inset_1px_1px_2px_-1px_rgba(255,255,255,1),inset_-1px_-1px_2px_-1px_rgba(255,255,255,1)] transition-[opacity,transform] duration-[600ms] ease-out translate-y-2 scale-95 hover/home-pulse:translate-y-0 hover/home-pulse:scale-[1.06] hover/home-pulse:opacity-100 focus-visible/home-pulse:translate-y-0 focus-visible/home-pulse:scale-[1.06] focus-visible/home-pulse:opacity-100 peer-hover/profile-image:translate-y-0 peer-hover/profile-image:scale-100 peer-hover/profile-image:opacity-100 peer-focus-visible/profile-image:translate-y-0 peer-focus-visible/profile-image:scale-100 peer-focus-visible/profile-image:opacity-100 min-[810px]:bottom-3 min-[810px]:left-[70px]"
      >
        <Image
          src="/icons/home-07.svg"
          alt=""
          width={16}
          height={16}
          aria-hidden="true"
          className="h-4 w-4 select-none brightness-0 invert"
        />
      </Link>

      <CvDownloadButton className="absolute top-[6px] z-20 hidden h-[30px] w-[140px] min-[810px]:left-[305px] min-[810px]:right-auto min-[810px]:flex" />

      <div className="profile-card-info absolute left-auto right-[4px] top-[5px] z-10 flex h-[136px] w-[235px] flex-col items-start justify-end pl-2 pb-4 min-[810px]:left-auto min-[810px]:right-[4px] min-[810px]:h-[155px] min-[810px]:w-[290px] min-[810px]:pl-4 min-[810px]:pb-6 min-[1200px]:left-[156px] min-[1200px]:right-auto">
        <svg
          width="290"
          height="155"
          viewBox="0 0 290 155"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full select-none min-[1200px]:hidden"
        >
          <path className="profile-card__shape" d={PROFILE_CARD_SHAPE_DEFAULT} />
        </svg>
        <svg
          width="290"
          height="155"
          viewBox="0 0 290 155"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          shapeRendering="geometricPrecision"
          className="pointer-events-none absolute inset-0 hidden h-full w-full select-none min-[1200px]:block"
        >
          <path className="profile-card__shape" d={PROFILE_CARD_SHAPE_DESKTOP} />
        </svg>
        <div className="absolute right-[2px] top-0 z-20 min-[810px]:hidden">
          <CvDownloadButton className="h-[28px] w-[112px] shrink-0" />
        </div>
        <ThemeToggle
          variant="profile"
          className="absolute right-[8px] bottom-[8px] z-20 max-[809px]:bottom-[13px] min-[810px]:max-[1199px]:right-[8px] min-[810px]:max-[1199px]:bottom-[8px] rounded-xl bg-[var(--color-profile-toggle-bg)] text-[var(--color-profile-toggle-icon)] min-[1200px]:right-0 min-[1200px]:bottom-0 min-[1200px]:h-8 min-[1200px]:w-[43px] min-[1200px]:shadow-[0_1px_2px_var(--color-shadow-soft)] min-[1200px]:hover:bg-[var(--color-profile-toggle-hover)]"
        />
        <div className="relative z-10 box-border flex h-full w-full flex-col items-start justify-end gap-2 pl-0 pr-0 pt-0 pb-0">
          <div className="flex h-fit flex-col items-start gap-1">
            <p className="text-[22px] font-semibold leading-tight tracking-[-0.7px] text-text-primary min-[810px]:text-[26px] min-[810px]:tracking-[-0.96px]">
              Yauheni Salau
            </p>
            <p
              className="text-[12px] font-medium tracking-[-0.2px] text-text-secondary min-[810px]:text-[14px]"
              style={{ fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}
            >
              Senior Product Designer
            </p>
          </div>

          <div className="flex justify-start gap-1 text-[12px] font-medium text-text-primary min-[810px]:text-[14px]">
            <a
              href="https://linkedin.com/in/eugenesalov"
              target="_blank"
              rel="noopener noreferrer"
              className="underline tracking-[-0.2px] text-text-primary transition-colors duration-200 ease-out hover:text-text-secondary focus-visible:text-text-secondary"
            >
              linkedin
            </a>
            <span className="text-text-tertiary">·</span>
            <a
              href="mailto:eugensalov@gmail.com"
              className="underline tracking-[-0.2px] text-text-primary transition-colors duration-200 ease-out hover:text-text-secondary focus-visible:text-text-secondary"
            >
              email
            </a>
            <span className="text-text-tertiary">·</span>
            <a
              href="https://t.me/eugenesalov"
              target="_blank"
              rel="noopener noreferrer"
              className="underline tracking-[-0.2px] text-text-primary transition-colors duration-200 ease-out hover:text-text-secondary focus-visible:text-text-secondary"
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
  const [isMapPreviewVisible, setIsMapPreviewVisible] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const hidePreviewTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleMobileMapPreview = () => {
    if (!isMobileViewport) {
      return;
    }
    if (hidePreviewTimeoutRef.current) {
      clearTimeout(hidePreviewTimeoutRef.current);
      hidePreviewTimeoutRef.current = null;
    }

    if (isMapPreviewVisible) {
      setIsMapPreviewVisible(false);
      return;
    }

    setIsMapPreviewVisible(true);
    hidePreviewTimeoutRef.current = setTimeout(() => {
      setIsMapPreviewVisible(false);
      hidePreviewTimeoutRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(max-width: 809px)");
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (hidePreviewTimeoutRef.current) {
        clearTimeout(hidePreviewTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 px-1">
      <p className="text-[15px] font-medium leading-5 tracking-[-0.5px] text-text-primary min-[810px]:text-[16px] min-[810px]:tracking-[-0.64px]">
        Hola 👋
      </p>
      <p className="text-[15px] font-medium leading-5 tracking-[-0.5px] text-text-primary min-[810px]:text-[16px] min-[810px]:tracking-[-0.64px]">
        Senior Product Designer with 5+ years of experience building B2B, SaaS solutions across analytics platforms, automation platforms and video players.
      </p>
      <p className="text-[15px] font-medium leading-5 tracking-[-0.5px] text-text-primary min-[810px]:text-[16px] min-[810px]:tracking-[-0.64px]">
        I turn complex user jobs into simple interfaces by following the &ldquo;Shazam&rdquo; approach: do it in one button if possible.
      </p>
      <div className="relative mt-1 h-9 overflow-visible">
        <motion.span
          onHoverStart={() => {
            if (!isMobileViewport) {
              setIsMapPreviewVisible(true);
            }
          }}
          onHoverEnd={() => {
            if (!isMobileViewport) {
              setIsMapPreviewVisible(false);
            }
          }}
          onTap={toggleMobileMapPreview}
          className="group relative inline-flex h-full items-center gap-1.5"
        >
          <PinIcon />
          <span className="text-[13px] leading-[13px] tracking-[-0.6px]">
            <span className="font-semibold text-text-tertiary transition-colors duration-200 ease-out group-hover:text-text-secondary group-focus-visible:text-text-secondary">
              36°43′13″ N, 4°25′13″ W
            </span>
            {" "}
            <span className="relative inline-block font-semibold text-text-primary transition-colors duration-200 ease-out group-hover:text-text-secondary group-focus-visible:text-text-secondary">
              / Now here

              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute left-[calc(50%-80px)] top-[calc(100%+14px)] z-20 block h-[80px] w-[180px] -translate-x-[18%]"
                initial={false}
                animate={
                  isMapPreviewVisible
                    ? {
                        opacity: [0, 1],
                        y: [8, 17, 14],
                        scale: [0.92, 1.02, 1],
                        rotate: [-12, -3, -5],
                        filter: ["blur(6px)", "blur(0px)"],
                      }
                    : {
                        opacity: 0,
                        y: 4,
                        scale: 0.9,
                        rotate: -5,
                        filter: "blur(5px)",
                      }
                }
                transition={
                  isMapPreviewVisible
                    ? {
                        duration: 0.58,
                        times: [0, 0.42, 1],
                        ease: [0.16, 1, 0.3, 1],
                        opacity: { duration: 0.2, ease: "easeOut" },
                        filter: { duration: 0.24, ease: "easeOut" },
                      }
                    : {
                        duration: 0.22,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
                style={{ transformOrigin: "14% -12%" }}
              >
                <span className="relative block">
                  <span
                    className="absolute inset-0 rounded-[18px] opacity-35 blur-[10px]"
                    style={{ background: "rgba(22, 22, 28, 0.2)", transform: "translate(4px, 7px) scale(1.01)" }}
                  />
                  <img
                    src="/images/places/map-preview-malaga.png"
                    alt="Malaga map preview"
                    draggable={false}
                    className="relative z-10 block h-full w-full select-none rounded-[18px] object-cover shadow-[0_18px_40px_rgba(0,0,0,0.12),0_4px_10px_rgba(0,0,0,0.08)]"
                  />
                </span>
              </motion.span>
            </span>
          </span>
        </motion.span>
      </div>
    </div>
  );
}

function BottomNav() {
  return (
    <div className="mt-6 flex h-[48px] w-full shrink-0 items-center gap-1 overflow-visible rounded-[16px] border border-[#F9F9F9] bg-[#F9F9F9] p-1 dark:border-[var(--color-divider)] dark:bg-[var(--color-bg-muted)]">
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
      className="group/nav-preview relative isolate flex h-[40px] min-w-0 flex-1 items-center justify-center overflow-visible rounded-[12px] bg-white px-1 text-center text-[16px] font-medium text-text-primary outline-none dark:bg-[var(--color-bg-elevated)]"
      aria-label={label}
    >
      <span
        className={`pointer-events-none absolute z-0 hidden opacity-0 transition-opacity duration-200 ease-out min-[1200px]:block min-[1200px]:group-hover/nav-preview:opacity-100 min-[1200px]:group-focus-visible/nav-preview:opacity-100 ${previewClassName}`}
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
            className={`absolute h-auto select-none drop-shadow-[0_20px_32px_rgba(29,29,38,0.24)] transition-all duration-300 ease-out [will-change:transform,opacity] min-[1200px]:group-hover/nav-preview:scale-100 min-[1200px]:group-focus-visible/nav-preview:scale-100 ${image.className}`}
          />
        ))}
      </span>
      <span className="relative z-10 flex items-center justify-center">
        <BottomNavLabel text={label} />
      </span>
    </Link>
  );
}

function DownloadIcon() {
  const { theme } = useTheme();

  return (
    <div className="h-[22px] w-[22px] leading-none">
      <DotLottieReact
        key={theme}
        src={theme === "dark" ? CV_LOTTIE_DARK : CV_LOTTIE_LIGHT}
        autoplay
        loop
        style={{ width: 22, height: 22 }}
      />
    </div>
  );
}

function PinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="text-text-tertiary"
    >
      <path
        d="M12 1.25C17.275 1.25 21.75 5.61 21.75 10.926C21.75 13.639 20.6 15.921 18.987 17.804C17.379 19.68 15.285 21.193 13.318 22.396L13.307 22.403L13.296 22.41C12.9 22.633 12.454 22.75 12 22.75C11.546 22.75 11.1 22.633 10.704 22.41L10.691 22.402L10.678 22.394C8.718 21.181 6.625 19.673 5.017 17.802C3.402 15.924 2.25 13.648 2.25 10.926C2.25 5.61 6.725 1.25 12 1.25ZM3.75 10.926C3.75 13.191 4.7 15.133 6.154 16.825C7.612 18.52 9.549 19.93 11.453 21.11C11.62 21.202 11.808 21.25 12 21.25C12.192 21.25 12.381 21.201 12.548 21.109C14.453 19.942 16.391 18.528 17.848 16.828C19.301 15.131 20.25 13.183 20.25 10.926C20.25 6.456 16.466 2.75 12 2.75C7.534 2.75 3.75 6.456 3.75 10.926ZM12 6.75C14.347 6.75 16.25 8.653 16.25 11C16.25 13.347 14.347 15.25 12 15.25C9.653 15.25 7.75 13.347 7.75 11C7.75 8.653 9.653 6.75 12 6.75ZM9.25 11C9.25 12.519 10.481 13.75 12 13.75C13.519 13.75 14.75 12.519 14.75 11C14.75 9.481 13.519 8.25 12 8.25C10.481 8.25 9.25 9.481 9.25 11Z"
        fill="currentColor"
      />
    </svg>
  );
}
