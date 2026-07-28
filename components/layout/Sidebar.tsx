"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import PortfolioChat from "@/components/chat/PortfolioChat";
import LocationMap from "@/components/LocationMap";
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
          "left-1/2 top-[34px] w-[44px] -translate-x-1/2 rotate-[4deg] drop-shadow-none delay-0 min-[1200px]:group-hover/nav-preview:top-[12px] min-[1200px]:group-hover/nav-preview:rotate-[-2deg] min-[1200px]:group-hover/nav-preview:delay-75",
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
          "left-1/2 top-[34px] w-[44px] -translate-x-1/2 rotate-[4deg] drop-shadow-none delay-0 min-[1200px]:group-hover/nav-preview:top-[12px] min-[1200px]:group-hover/nav-preview:rotate-[-2deg] min-[1200px]:group-hover/nav-preview:delay-75",
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
          "left-[0px] top-[28px] w-[25px] rotate-[-20deg] delay-0 min-[1200px]:group-hover/nav-preview:top-[6px] min-[1200px]:group-hover/nav-preview:rotate-[-24deg] min-[1200px]:group-hover/nav-preview:delay-75",
      },
      {
        src: "/nav-previews/figma.png",
        alt: "",
        width: 375,
        height: 370,
        className:
          "left-[36px] top-[28px] w-[20px] rotate-[20deg] delay-0 min-[1200px]:group-hover/nav-preview:top-[6px] min-[1200px]:group-hover/nav-preview:rotate-[24deg] min-[1200px]:group-hover/nav-preview:delay-75",
      },
      {
        src: "/nav-previews/spark.png",
        alt: "",
        width: 433,
        height: 420,
        className:
          "left-[12px] top-[8px] w-[31px] rotate-[5deg] delay-0 min-[1200px]:group-hover/nav-preview:-top-[8px] min-[1200px]:group-hover/nav-preview:rotate-[8deg]",
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
          className="relative z-[5] mt-5 min-[810px]:mt-6"
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
              style={{ overflow: bioHidden ? "hidden" : "visible" }}
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
              href="mailto:eugenesalov@gmail.com"
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
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[15px] font-medium leading-5 tracking-[-0.5px] text-text-primary min-[810px]:text-[16px] min-[810px]:tracking-[-0.64px]">
        Hola 👋
      </p>
      <p className="text-[15px] font-medium leading-5 tracking-[-0.5px] text-text-primary min-[810px]:text-[16px] min-[810px]:tracking-[-0.64px]">
        Senior Product Designer with 6 years of experience building B2B, SaaS solutions across analytics platforms, automation platforms and video players.
      </p>
      <p className="text-[15px] font-medium leading-5 tracking-[-0.5px] text-text-primary min-[810px]:text-[16px] min-[810px]:tracking-[-0.64px]">
        I turn complex user jobs into simple interfaces by following the &ldquo;Shazam&rdquo; approach: do it in one button if possible.
      </p>
      <div className="relative mt-1 h-[60px] w-full overflow-hidden rounded-[16px]">
        <LocationMap />
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
  const linkRef = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();
  const isDesktopViewport = useIsDesktopViewport();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);
  const springConfig = { stiffness: 220, damping: 24, mass: 0.85 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothScale = useSpring(scale, springConfig);

  const resetLabelTransform = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  useEffect(() => {
    if (!isDesktopViewport) {
      rotateX.set(0);
      rotateY.set(0);
      scale.set(1);
    }
  }, [isDesktopViewport, rotateX, rotateY, scale]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion || !isDesktopViewport) return;
    const rect = linkRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const maxTilt = 10;

    rotateY.set((x - 0.5) * maxTilt * 2);
    rotateX.set((0.5 - y) * maxTilt * 2);
    scale.set(1.06);
  };

  return (
    <Link
      ref={linkRef}
      href={href}
      className={`group/nav-preview relative isolate flex h-[40px] min-w-0 flex-1 items-center justify-center overflow-visible rounded-[12px] bg-white px-1 text-center text-[16px] font-medium text-text-primary outline-none dark:bg-[var(--color-bg-elevated)]${isDesktopViewport ? " [perspective:400px]" : ""}`}
      aria-label={label}
      onMouseMove={isDesktopViewport ? handleMouseMove : undefined}
      onMouseLeave={isDesktopViewport ? resetLabelTransform : undefined}
      onBlur={isDesktopViewport ? resetLabelTransform : undefined}
    >
      <span
        className={`pointer-events-none absolute z-0 hidden opacity-0 transition-opacity duration-100 ease-out delay-0 min-[1200px]:block min-[1200px]:group-hover/nav-preview:opacity-100 min-[1200px]:group-hover/nav-preview:delay-75 min-[1200px]:group-hover/nav-preview:duration-200 min-[1200px]:group-focus-visible/nav-preview:opacity-100 min-[1200px]:group-focus-visible/nav-preview:delay-75 min-[1200px]:group-focus-visible/nav-preview:duration-200 ${previewClassName}`}
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
      <motion.span
        className={`relative z-10 flex items-center justify-center${isDesktopViewport ? " [transform-style:preserve-3d] [will-change:transform]" : ""}`}
        style={
          isDesktopViewport
            ? {
                rotateX: smoothRotateX,
                rotateY: smoothRotateY,
                scale: smoothScale,
              }
            : undefined
        }
      >
        <BottomNavLabel text={label} />
      </motion.span>
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
