"use client";

import type React from "react";
import { useRef, useState } from "react";
import exifr from "exifr";
import clsx from "clsx";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import svgPaths from "./photoBoothSvgPaths";

const thumbLeft = "/images/playground/polaroid-thumb-left.png";
const thumbCenter = "/images/playground/polaroid-thumb-center.png";
const thumbRight = "/images/playground/polaroid-thumb-right.png";
const iconFacebook = "/images/playground/icon-facebook.svg";
const iconX = "/images/playground/icon-x.svg";
const iconLinkedIn = "/images/playground/icon-linkedin.svg";
const iconTelegram = "/images/playground/icon-telegram.svg";

type Wrapper1Props = {
  additionalClassNames?: string;
  onClick?: () => void;
  disabled?: boolean;
  hoverStyle?: "lift" | "flat";
  baseColor?: string;
  hoverColor?: string;
};

function Wrapper1({
  children,
  additionalClassNames = "",
  onClick,
  disabled = false,
  hoverStyle = "lift",
  baseColor,
  hoverColor,
}: React.PropsWithChildren<Wrapper1Props>) {
  const [isHovered, setIsHovered] = useState(false);
  const resolvedBackgroundColor = disabled
    ? baseColor
    : isHovered && hoverColor
      ? hoverColor
      : baseColor;

  return (
    <div
      className={clsx(
        "relative rounded-[12px] shrink-0 size-[40px] transition-all duration-200",
        disabled
          ? "cursor-not-allowed opacity-45"
          : hoverStyle === "lift"
            ? "cursor-pointer hover:-translate-y-[1px] hover:shadow-[0px_8px_18px_rgba(0,0,0,0.12)]"
            : "cursor-pointer",
        disabled ? additionalClassNames.replace(/hover:[^\s]+/g, "") : additionalClassNames
      )}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={disabled ? undefined : () => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-disabled={disabled}
      style={resolvedBackgroundColor ? { backgroundColor: resolvedBackgroundColor } : undefined}
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[28px] py-[14px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

type WrapperProps = {
  additionalClassNames?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
};

function Wrapper({ children, additionalClassNames = "", onClick, active, disabled = false }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div
      className={clsx(
        "flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[18px] transition-colors duration-200",
        disabled ? "cursor-not-allowed opacity-45" : "cursor-pointer hover:bg-white/70",
        additionalClassNames
      )}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] relative size-full">{children}</div>
      </div>
    </div>
  );
}

const COLORS_SOLID = ["#E8939A", "#F2C98A", "#1A1A2E", "#B8B5D4", "#D4A98A", "#FFFFFF"];
const COLORS_GRADIENT = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(90deg, hsla(228, 17%, 53%, 1) 0%, hsla(229, 28%, 88%, 1) 100%)",
  "linear-gradient(90deg, hsla(333, 100%, 53%, 1) 0%, hsla(33, 94%, 57%, 1) 100%)",
  "linear-gradient(90deg, hsla(141, 54%, 86%, 1) 0%, hsla(333, 73%, 85%, 1) 50%, hsla(211, 58%, 79%, 1) 100%)",
  "linear-gradient(90deg, hsla(202, 71%, 27%, 1) 0%, hsla(176, 45%, 66%, 1) 100%)",
];

export default function PhotoBoothApp() {
  const [selectedColor, setSelectedColor] = useState(COLORS_SOLID[5]);
  const [colorMode, setColorMode] = useState<"solid" | "gradient">("solid");
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [showTextInput, setShowTextInput] = useState(false);
  const [showDateInput, setShowDateInput] = useState(false);
  const [exifDate, setExifDate] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [showShadow, setShowShadow] = useState(true);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isDropZoneHovered, setIsDropZoneHovered] = useState(false);
  const [isUploadBtnHovered, setIsUploadBtnHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);
  const liftY = useMotionValue(0);
  const springConfig = { stiffness: 220, damping: 24, mass: 0.85 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothScale = useSpring(scale, springConfig);
  const smoothLiftY = useSpring(liftY, springConfig);

  // Gloss: derived from spring-animated rotation — synced with card tilt, not cursor
  const maxR = 12;
  const glossBg = useTransform([smoothRotateX, smoothRotateY], ([rx, ry]: number[]) => {
    const nx = ry / maxR;  // -1..1 (left/right tilt)
    const ny = rx / maxR;  // -1..1 (up/down tilt)
    const hx = Math.max(0, Math.min(100, 50 + nx * 65));
    const hy = Math.max(0, Math.min(100, 50 - ny * 55));
    return `radial-gradient(ellipse 160% 130% at ${hx}% ${hy}%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.08) 42%, transparent 65%)`;
  });
  const glossOpacity = useTransform([smoothRotateX, smoothRotateY], ([rx, ry]: number[]) => {
    const nx = ry / maxR;
    const ny = rx / maxR;
    return Math.min(Math.sqrt(nx ** 2 + ny ** 2), 1) * 0.9;
  });

  const loadImageFile = (file?: File | null) => {
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    exifr.parse(file).then((exif) => {
      const raw = exif?.DateTimeOriginal ?? exif?.DateTime ?? exif?.CreateDate;
      if (!raw) return;
      const d = raw instanceof Date ? raw : new Date(String(raw).replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3"));
      if (isNaN(d.getTime())) return;
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const yyyy = d.getFullYear();
      setExifDate(`${dd}.${mm}.${yyyy}`);
    }).catch(() => {});
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    loadImageFile(e.target.files?.[0]);
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    loadImageFile(e.dataTransfer.files?.[0]);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    if (hasUserContent) {
      const maxTilt = 6;
      rotateY.set((x - 0.5) * maxTilt * 2);
      rotateX.set((0.5 - y) * maxTilt * 2);
      scale.set(1.012);
      liftY.set(-4);
    }
  };

  const resetCardTransform = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    liftY.set(0);
  };

  const fetchEmbeddedFontCSS = async (): Promise<string> => {
    try {
      const apiUrl = "https://fonts.googleapis.com/css2?family=Covered+By+Your+Grace&family=WDXL+Lubrifont+SC&display=swap";
      const cssRes = await fetch(apiUrl);
      const css = await cssRes.text();
      const fontUrls = [...css.matchAll(/url\(([^)]+)\)/g)].map((m) => m[1].replace(/['"]/g, ""));
      let embeddedCSS = css;
      for (const fontUrl of fontUrls) {
        const fontRes = await fetch(fontUrl);
        const fontData = await fontRes.arrayBuffer();
        const base64 = btoa(new Uint8Array(fontData).reduce((d, b) => d + String.fromCharCode(b), ""));
        const ext = (fontUrl.split(".").pop()?.split("?")[0] ?? "woff2");
        const mime = ext === "woff2" ? "font/woff2" : ext === "woff" ? "font/woff" : "font/truetype";
        embeddedCSS = embeddedCSS.replace(fontUrl, `data:${mime};base64,${base64}`);
      }
      return embeddedCSS;
    } catch {
      return "";
    }
  };

  const generatePolaroidBlob = (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const polaroid = document.getElementById("polaroid-card");
      if (!polaroid) return reject(new Error("No card"));

      Promise.all([import("html-to-image"), fetchEmbeddedFontCSS()]).then(([{ toPng }, fontEmbedCSS]) => {
        toPng(polaroid, {
          pixelRatio: 2,
          style: { transform: "none", overflow: "hidden" },
          fontEmbedCSS,
        }).then((dataUrl) => {
          const img = new Image();
          img.onload = () => {
            const dpr = 2;
            const pad = showShadow ? 60 : 6;
            const cardW = img.width;
            const cardH = img.height;
            const r = 5 * dpr;

            const canvas = document.createElement("canvas");
            canvas.width  = cardW + pad * 2;
            canvas.height = cardH + pad * 2;
            const ctx = canvas.getContext("2d")!;
            const x = pad, y = pad;

            if (showShadow) {
              ctx.save();
              ctx.shadowColor   = "rgba(119,136,156,0.28)";
              ctx.shadowBlur    = 40;
              ctx.shadowOffsetX = 0;
              ctx.shadowOffsetY = 14;
              ctx.fillStyle = "#ffffff";
              ctx.beginPath();
              ctx.roundRect(x, y, cardW, cardH, r);
              ctx.fill();
              ctx.restore();
            }

            ctx.save();
            ctx.beginPath();
            ctx.roundRect(x, y, cardW, cardH, r);
            ctx.clip();
            ctx.drawImage(img, x, y, cardW, cardH);
            ctx.restore();

            ctx.save();
            ctx.strokeStyle = BORDER_COLOR_MAP[selectedColor] ?? "#F2F2F2";
            ctx.lineWidth   = 1.5 * dpr;
            ctx.beginPath();
            ctx.roundRect(x + 1, y + 1, cardW - 2, cardH - 2, r - 1);
            ctx.stroke();
            ctx.restore();

            canvas.toBlob((blob) => {
              if (!blob) return reject(new Error("No blob"));
              resolve(blob);
            }, "image/png");
          };
          img.src = dataUrl;
        }).catch(reject);
      }).catch(reject);
    });
  };

  const handleDownload = () => {
    generatePolaroidBlob().then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "polaroid.png";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  const PORTFOLIO_URL = "https://eugenesalov.com/";
  const PLATFORM_URLS: Record<string, string> = {
    Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(PORTFOLIO_URL)}`,
    X: `https://twitter.com/intent/tweet?url=${encodeURIComponent(PORTFOLIO_URL)}`,
    LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(PORTFOLIO_URL)}`,
    Telegram: `https://t.me/share/url?url=${encodeURIComponent(PORTFOLIO_URL)}`,
  };

  const handleShare = (platform: string) => {
    window.open(PLATFORM_URLS[platform], "_blank");
  };

  const handleDelete = () => {
    setImage(null);
    setText("");
    setDate("");
    setShowTextInput(false);
    setShowDateInput(false);
    setIsDragActive(false);
    resetCardTransform();
  };

  const currentColors = colorMode === "solid" ? COLORS_SOLID : COLORS_GRADIENT;

  const BORDER_COLOR_MAP: Record<string, string> = {
    // Solid colors — slightly darker/harmonious tone
    "#E8939A": "#C97A82",
    "#F2C98A": "#D4A86A",
    "#1A1A2E": "#2D2D45",
    "#B8B5D4": "#9A96BC",
    "#D4A98A": "#B8886A",
    "#FFFFFF": "#E0E0E0",
    // Gradients — pick dominant hue as semi-transparent overlay
    [COLORS_GRADIENT[0]]: "rgba(70,40,140,0.35)",
    [COLORS_GRADIENT[1]]: "rgba(200,60,100,0.35)",
    [COLORS_GRADIENT[2]]: "rgba(80,90,140,0.30)",
    [COLORS_GRADIENT[3]]: "rgba(180,40,70,0.35)",
    [COLORS_GRADIENT[4]]: "rgba(140,100,160,0.25)",
    [COLORS_GRADIENT[5]]: "rgba(20,70,100,0.45)",
  };
  const hasUserContent = Boolean(image || text.trim() || date.trim());
  const isDarkColor = selectedColor === "#1A1A2E";
  const isWhiteTextColor = selectedColor === COLORS_GRADIENT[0] || selectedColor === COLORS_GRADIENT[3] || selectedColor === COLORS_GRADIENT[5];
  const captionColor = isDarkColor ? "#DF782F" : isWhiteTextColor ? "#FFFFFF" : undefined;
  const polaroidCardStyle = {
    background: selectedColor,
    backgroundImage: colorMode === "gradient" ? selectedColor : undefined,
  };
  const bottomSectionShadow = isDarkColor
    ? "0px -16px 20px -4px rgba(0,0,0,0.20)"
    : undefined;

  return (
    <div className="h-full w-full bg-[#f9f9f9] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto flex h-full w-full max-w-[368px] items-center justify-center">
        <div className="relative flex w-full flex-col items-center gap-[32px]">
        <div className="[perspective:1400px]">
        <motion.div
          ref={cardRef}
          id="polaroid-card"
          className="bg-white h-[500px] overflow-clip relative rounded-[5px] shadow-[0px_168px_47px_0px_rgba(119,136,156,0),0px_108px_43px_0px_rgba(119,136,156,0.01),0px_61px_36px_0px_rgba(119,136,156,0.02),0px_27px_27px_0px_rgba(119,136,156,0.04),0px_7px_15px_0px_rgba(119,136,156,0.05)] shrink-0 w-[314px] [transform-style:preserve-3d] will-change-transform"
          style={{
            ...polaroidCardStyle,
            rotateX: smoothRotateX,
            rotateY: smoothRotateY,
            scale: smoothScale,
            y: smoothLiftY,
          }}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={resetCardTransform}
        >
          {/* Gloss overlay — driven by spring-animated tilt, not cursor */}
          {hasUserContent && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-10 rounded-[5px]"
              style={{ background: glossBg, opacity: glossOpacity }}
            />
          )}

          <div
            className="absolute inset-[86.05%_0_0_0]"
            style={{ ...polaroidCardStyle, boxShadow: bottomSectionShadow ?? "0px -203px 57px 0px rgba(219,219,219,0),0px -130px 52px 0px rgba(219,219,219,0.01),0px -73px 44px 0px rgba(219,219,219,0.05),0px -32px 32px 0px rgba(219,219,219,0.08),0px -8px 18px 0px rgba(219,219,219,0.09)" }}
          >
            <div className="flex flex-col items-center justify-center h-full px-4">
              {showTextInput ? (
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Add a caption..."
                  className="text-center outline-none bg-transparent w-full"
                  style={{ fontFamily: "'Covered By Your Grace', cursive", color: captionColor }}
                  autoFocus
                  onBlur={() => {
                    if (!text) setShowTextInput(false);
                  }}
                />
              ) : text ? (
                <p
                  className="text-center cursor-pointer"
                  style={{ fontFamily: "'Covered By Your Grace', cursive", color: captionColor }}
                  onClick={() => setShowTextInput(true)}
                >
                  {text}
                </p>
              ) : null}

              {showDateInput ? (
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Add a date..."
                  className="text-center text-[12px] outline-none bg-transparent mt-1"
                  style={{ fontFamily: "'WDXL Lubrifont SC', sans-serif", color: captionColor }}
                  autoFocus
                  onBlur={() => {
                    if (!date) setShowDateInput(false);
                  }}
                />
              ) : date ? (
                <p
                  className="text-center text-[12px] mt-1 cursor-pointer"
                  style={{ fontFamily: "'WDXL Lubrifont SC', sans-serif", color: captionColor }}
                  onClick={() => setShowDateInput(true)}
                >
                  {date}
                </p>
              ) : null}
            </div>
          </div>

          <div
            className={clsx(
              "absolute inset-[9.3%_7.41%_18.6%_7.41%] cursor-pointer overflow-hidden rounded-[2px] transition-all duration-200",
              image
                ? "flex items-center justify-center"
                : "flex items-center justify-center border-2 border-dashed",
              !image && (isDragActive ? "border-[#c8c8c8]" : isDropZoneHovered ? "border-[#c0c0c0]" : "border-[#dadada]"),
              isDragActive && "scale-[1.01]"
            )}
            style={{
              backgroundColor: isDragActive ? "#e0e0e0" : isDropZoneHovered ? "#ebebeb" : "#f2f2f2",
            }}
            onClick={() => fileInputRef.current?.click()}
            onMouseEnter={() => setIsDropZoneHovered(true)}
            onMouseLeave={() => setIsDropZoneHovered(false)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-center h-fit">
                {/* Three fanned polaroid thumbnails */}
                <div
                  className="relative flex h-[82px] w-[173px] shrink-0 items-start justify-center pr-[20px]"
                >
                  {/* Left photo */}
                  <motion.div
                    className="absolute left-[16px] top-[2px] flex size-[78px] items-center justify-center"
                    animate={{ rotate: isDropZoneHovered ? -20 : -15, x: isDropZoneHovered ? -4 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <div className="overflow-clip rounded-[6px] bg-white p-[5px] shadow-[0px_11px_8px_-3px_rgba(103,103,103,0.25)]">
                      <div className="relative size-[54px] overflow-hidden rounded-[2px]">
                        <img alt="" className="absolute left-[-24%] top-0 h-full w-[150%] max-w-none" src={thumbLeft} />
                      </div>
                    </div>
                  </motion.div>
                  {/* Center photo */}
                  <motion.div
                    className="absolute left-[54px] top-[2px] overflow-clip rounded-[6px] bg-white p-[5px] shadow-[0px_11px_8px_-3px_rgba(103,103,103,0.25)]"
                    animate={{ y: isDropZoneHovered ? -4 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <div className="relative size-[54px] overflow-hidden rounded-[2px]">
                      <img alt="" className="absolute left-[-26%] top-0 h-full w-[150%] max-w-none" src={thumbCenter} />
                    </div>
                  </motion.div>
                  {/* Right photo */}
                  <motion.div
                    className="absolute left-[79px] top-[2px] flex size-[78px] items-center justify-center"
                    animate={{ rotate: isDropZoneHovered ? 20 : 15, x: isDropZoneHovered ? 4 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <div className="overflow-clip rounded-[6px] bg-white p-[5px] shadow-[0px_11px_8px_-3px_rgba(103,103,103,0.25)]">
                      <div className="relative size-[54px] overflow-hidden rounded-[2px]">
                        <img alt="" className="absolute left-0 top-[-25%] h-[150%] w-full max-w-none" src={thumbRight} />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Text */}
                <p className="font-medium text-[14px] tracking-[-0.28px] text-[#333]">
                  Choose a photo or
                  <br />
                  drag &amp; drop it here
                </p>
                <p className="text-[13px] tracking-[-0.26px] text-[#777]">
                  JPG, PNG, GIF
                  <br />
                  Up to 5MB
                </p>

                {/* Upload button */}
                <div
                  className="flex items-center gap-2 rounded-[12px] border border-[#eee] px-[20px] py-[10px] shadow-sm transition-colors duration-150"
                  style={{ backgroundColor: isUploadBtnHovered ? "#EEEEEE" : "#ffffff" }}
                  onMouseEnter={() => setIsUploadBtnHovered(true)}
                  onMouseLeave={() => setIsUploadBtnHovered(false)}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <path d="M10.625 3.75C10.625 3.40482 10.3452 3.125 9.99998 3.125C9.6548 3.125 9.37498 3.40482 9.37498 3.75V10.8016L9.36993 10.7957C9.19436 10.5885 9.02246 10.3695 8.8617 10.1647L8.82442 10.1172C8.66423 9.9133 8.49571 9.69904 8.36482 9.56438C8.12424 9.31686 7.72855 9.31124 7.48103 9.55182C7.23351 9.79241 7.22789 10.1881 7.46847 10.4356C7.54239 10.5117 7.66374 10.6632 7.8414 10.8894L7.88062 10.9393C8.039 11.1411 8.22483 11.3778 8.41626 11.6037C8.62143 11.8459 8.85107 12.0974 9.08064 12.2929C9.19568 12.3909 9.32534 12.4875 9.46483 12.5622C9.59937 12.6341 9.78474 12.7083 9.99998 12.7083C10.2152 12.7083 10.4006 12.6341 10.5351 12.5622C10.6746 12.4875 10.8043 12.3909 10.9193 12.2929C11.1489 12.0974 11.3785 11.8459 11.5837 11.6037C11.7751 11.3778 11.9609 11.1411 12.1193 10.9394L12.1586 10.8894C12.3362 10.6632 12.4576 10.5117 12.5315 10.4356C12.7721 10.1881 12.7665 9.79241 12.5189 9.55182C12.2714 9.31124 11.8757 9.31686 11.6351 9.56438C11.5043 9.69904 11.3357 9.9133 11.1755 10.1172L11.1383 10.1647C10.9775 10.3695 10.8056 10.5885 10.63 10.7957L10.625 10.8016V3.75Z" fill="black"/>
                    <path d="M3.95831 13.75C3.95831 13.4048 3.67849 13.125 3.33331 13.125C2.98814 13.125 2.70831 13.4048 2.70831 13.75C2.70831 14.2806 2.73517 14.7492 2.82263 15.1473C2.91165 15.5525 3.07174 15.9236 3.36575 16.2176C3.65975 16.5116 4.0308 16.6717 4.43601 16.7607C4.83413 16.8481 5.3027 16.875 5.83331 16.875H14.1666C14.6973 16.875 15.1658 16.8481 15.564 16.7607C15.9692 16.6717 16.3402 16.5116 16.6342 16.2176C16.9282 15.9236 17.0883 15.5525 17.1773 15.1473C17.2648 14.7492 17.2916 14.2806 17.2916 13.75C17.2916 13.4048 17.0118 13.125 16.6666 13.125C16.3215 13.125 16.0416 13.4048 16.0416 13.75C16.0416 14.2536 16.0145 14.6146 15.9564 14.8791C15.8999 15.1366 15.8228 15.2612 15.7503 15.3337C15.6779 15.4061 15.5532 15.4832 15.2957 15.5398C15.0312 15.5979 14.6702 15.625 14.1666 15.625H5.83331C5.32976 15.625 4.96874 15.5979 4.70421 15.5398C4.44676 15.4832 4.32209 15.4061 4.24963 15.3337C4.17717 15.2612 4.10008 15.1366 4.04352 14.8791C3.98541 14.6146 3.95831 14.2536 3.95831 13.75Z" fill="black"/>
                  </svg>
                  <span className="font-medium text-[14px] tracking-[-0.28px] text-[#333]">Upload image</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        <div className="bg-white content-stretch flex flex-col gap-[20px] items-center overflow-clip p-[24px] relative rounded-[16px] shadow-[0px_126px_35px_0px_rgba(199,198,198,0),0px_80px_32px_0px_rgba(199,198,198,0.01),0px_45px_27px_0px_rgba(199,198,198,0.05),0px_20px_20px_0px_rgba(199,198,198,0.09),0px_5px_11px_0px_rgba(199,198,198,0.1)] shrink-0">
          <div className="bg-[#f2f2f2] h-[32px] relative rounded-[22px] shrink-0 w-full">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[2px] items-center justify-center p-[2px] relative size-full">
                <Wrapper
                  onClick={() => {
                    setColorMode("solid");
                    setSelectedColor(COLORS_SOLID[5]);
                  }}
                >
                  {colorMode === "solid" && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute inset-0 bg-white rounded-[18px] shadow-[0px_2px_4px_0px_rgba(222,220,220,0.25)]"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <p className={clsx(
                    "font-['Inter:Regular',sans-serif] font-normal leading-[1.3] not-italic relative z-10 shrink-0 text-[14px] tracking-[-0.28px] whitespace-nowrap",
                    colorMode === "solid" ? "text-[#333]" : "text-[#777777]"
                  )}>
                    Solid
                  </p>
                </Wrapper>
                <Wrapper
                  onClick={() => {
                    setColorMode("gradient");
                    setSelectedColor(COLORS_GRADIENT[0]);
                  }}
                >
                  {colorMode === "gradient" && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute inset-0 bg-white rounded-[18px] shadow-[0px_2px_4px_0px_rgba(222,220,220,0.25)]"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <p className={clsx(
                    "font-['Inter:Regular',sans-serif] font-normal leading-[1.3] not-italic relative z-10 shrink-0 text-[14px] tracking-[-0.28px] whitespace-nowrap",
                    colorMode === "gradient" ? "text-[#333]" : "text-[#777777]"
                  )}>
                    Gradient
                  </p>
                </Wrapper>
              </div>
            </div>
          </div>

          <div className="content-stretch flex items-center relative shrink-0 w-full justify-center gap-[12px]">
            {currentColors.map((color, index) => (
              <div
                key={index}
                className="h-[40px] w-[40px] cursor-pointer rounded-full transition-transform duration-200 hover:scale-110"
                style={{
                  background: color,
                  border: color === "#FFFFFF" ? "1px solid #EEEEEE" : undefined,
                  boxShadow: selectedColor === color
                    ? "rgb(255, 79, 0) 0px 0px 0px 3px inset, rgb(255, 255, 255) 0px 0px 0px 6px inset"
                    : undefined,
                }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>

          <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
            <Wrapper1
              additionalClassNames=""
              hoverStyle="flat"
              baseColor="#ffffff"
              hoverColor="#fafafa"
              onClick={() => {
                setShowTextInput(true);
                setTimeout(() => {
                  (document.querySelector('input[placeholder="Add a caption..."]') as HTMLInputElement)?.focus();
                }, 100);
              }}
            >
              <div className="h-[19.2px] relative shrink-0 w-[20px]" data-name="text">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19.2">
                  <g id="text">
                    <path d={svgPaths.p3eb3cb80} fill="var(--fill-0, #333333)" id="Vector" />
                  </g>
                </svg>
              </div>
            </Wrapper1>
            <Wrapper1
              additionalClassNames=""
              hoverStyle="flat"
              baseColor="#ffffff"
              hoverColor="#fafafa"
              onClick={() => {
                if (exifDate) setDate(exifDate);
                setShowDateInput(true);
                setTimeout(() => {
                  (document.querySelector('input[placeholder="Add a date..."]') as HTMLInputElement)?.focus();
                }, 100);
              }}
            >
              <div className="relative shrink-0 size-[20px]" data-name="icons 24x24/calendar">
                <div className="absolute inset-[1.04%_7.29%_9.37%_7.29%]" data-name="elements">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.0833 17.9167">
                    <g>
                      <g id="Icon">
                        <path d={svgPaths.p21ac0900} fill="var(--fill-0, #333333)" />
                        <path d={svgPaths.p171a0572} fill="var(--fill-0, #333333)" />
                        <path d={svgPaths.p3bee7072} fill="var(--fill-0, #333333)" />
                        <path d={svgPaths.p2de28f00} fill="var(--fill-0, #333333)" />
                        <path d={svgPaths.p1b932c80} fill="var(--fill-0, #333333)" />
                        <path clipRule="evenodd" d={svgPaths.p303c7e80} fill="var(--fill-0, #333333)" fillRule="evenodd" />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </Wrapper1>
          </div>
        </div>

        <div className={clsx("absolute content-stretch flex flex-col gap-[12px] items-start justify-center right-[-25px] top-0 transition-opacity duration-200", image ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}>
          <Wrapper1
            additionalClassNames="bg-white shadow-lg hover:bg-[#f7f7f7]"
            onClick={() => setShowShareModal(true)}
            disabled={!hasUserContent}
          >
            <div className="relative shrink-0 size-[20px]" data-name="icons 24x24/paper-plane-right">
              <div className="absolute flex inset-[9.38%_5.21%_9.37%_5.21%] items-center justify-center">
                <div className="-scale-y-100 flex-none h-[16.25px] w-[17.917px]">
                  <div className="relative size-full" data-name="elements">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9166 16.2503">
                      <g>
                        <path clipRule="evenodd" d={svgPaths.p37757780} fill="var(--fill-0, #333333)" fillRule="evenodd" id="Icon" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Wrapper1>
          <Wrapper1
            additionalClassNames="bg-white shadow-lg hover:bg-[#fff1f1]"
            onClick={handleDelete}
            disabled={!hasUserContent}
          >
            <div className="relative shrink-0 size-[20px]" data-name="icons 24x24/trash">
              <div className="absolute inset-[5.21%_9.38%]" data-name="elements">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.25 17.9167">
                  <g>
                    <g id="Icon">
                      <path d={svgPaths.pebc0c80} fill="var(--fill-0, #EE1E1E)" />
                      <path d={svgPaths.p274fab40} fill="var(--fill-0, #EE1E1E)" />
                      <path clipRule="evenodd" d={svgPaths.pbf60b00} fill="var(--fill-0, #EE1E1E)" fillRule="evenodd" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </Wrapper1>
        </div>
      </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(212,218,229,0.30)" }}
          onClick={() => setShowShareModal(false)}
        >
          <motion.div
            className="bg-white rounded-[24px] border border-[#f2f2f2] shadow-[0px_4px_16px_1px_rgba(199,198,198,0.35)] w-full max-w-[420px] p-[24px] flex flex-col gap-[20px] h-fit"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-[24px] font-medium tracking-[-0.48px] text-[#1a1a1a]">Share photo</h2>
              <button
                className="size-[32px] rounded-full bg-[#f0f0f0] flex items-center justify-center hover:bg-[#e5e5e5] transition-colors duration-150 cursor-pointer"
                onClick={() => setShowShareModal(false)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="#333" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Polaroid preview — scaled-down replica of the main card */}
            {(() => {
              const CARD_W = 314;
              const CARD_H = 500;
              const PREVIEW_H = 180;
              const s = PREVIEW_H / CARD_H;
              const previewW = CARD_W * s;
              return (
                <div className="flex justify-center">
                  <div style={{ width: previewW, height: PREVIEW_H, flexShrink: 0 }}>
                    <div
                      style={{
                        width: CARD_W,
                        height: CARD_H,
                        transform: `scale(${s})`,
                        transformOrigin: "top left",
                        background: selectedColor,
                        backgroundImage: colorMode === "gradient" ? selectedColor : undefined,
                        boxShadow: "0px 5px 30px 4px rgba(119,136,156,0.2)",
                      }}
                      className="relative rounded-[5px] overflow-hidden border border-[#f2f2f2]"
                    >
                      {/* Photo area */}
                      <div
                        className="absolute inset-[9.3%_7.41%_18.6%_7.41%] overflow-hidden rounded-[2px]"
                        style={{ backgroundColor: "#f2f2f2" }}
                      >
                        {image && <img src={image} alt="" className="w-full h-full object-cover" />}
                      </div>
                      {/* Bottom caption area */}
                      <div className="absolute inset-[86.05%_0_0_0] flex flex-col items-center justify-center px-4"
                        style={{ background: selectedColor, backgroundImage: colorMode === "gradient" ? selectedColor : undefined }}
                      >
                        {text && <p className="text-center text-[18px]" style={{ fontFamily: "'Covered By Your Grace', cursive" }}>{text}</p>}
                        {date && <p className="text-center text-[14px] mt-1">{date}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Shadow toggle */}
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-normal text-[#555555]">Add shadow to card</span>
              <button
                onClick={() => setShowShadow((v) => !v)}
                className="relative w-[44px] h-[26px] rounded-full transition-colors duration-200 cursor-pointer flex-shrink-0"
                style={{ backgroundColor: showShadow ? "#FF4F00" : "#CDCDCD" }}
              >
                <span
                  className="absolute top-[3px] size-[20px] rounded-full bg-white shadow-sm transition-transform duration-200"
                  style={{ left: 3, transform: showShadow ? "translateX(18px)" : "translateX(0px)" }}
                />
              </button>
            </div>

            {/* Social buttons */}
            <div className="flex h-fit gap-[10px] justify-center">
              {[
                { label: "Facebook", icon: iconFacebook },
                { label: "X", icon: iconX },
                { label: "LinkedIn", icon: iconLinkedIn },
                { label: "Telegram", icon: iconTelegram },
              ].map(({ label, icon }) => (
                <button
                  key={label}
                  className="flex-1 h-[40px] rounded-[12px] border border-[#eeeeee] flex items-center justify-center hover:bg-[#f7f7f7] transition-colors duration-150 cursor-pointer bg-white"
                  title={label}
                  onClick={() => handleShare(label)}
                >
                  <img src={icon} alt={label} width={20} height={20} />
                </button>
              ))}
            </div>

            {/* Download button */}
            <button
              className="w-full flex items-center justify-center gap-[8px] h-[40px] rounded-[12px] transition-colors duration-150 cursor-pointer"
              style={{ backgroundColor: "#FF4F00" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e04600")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF4F00")}
              onClick={handleDownload}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10.625 3.75C10.625 3.40482 10.3452 3.125 9.99998 3.125C9.6548 3.125 9.37498 3.40482 9.37498 3.75V10.8016L9.36993 10.7957C9.19436 10.5885 9.02246 10.3695 8.8617 10.1647L8.82442 10.1172C8.66423 9.9133 8.49571 9.69904 8.36482 9.56438C8.12424 9.31686 7.72855 9.31124 7.48103 9.55182C7.23351 9.79241 7.22789 10.1881 7.46847 10.4356C7.54239 10.5117 7.66374 10.6632 7.8414 10.8894L7.88062 10.9393C8.039 11.1411 8.22483 11.3778 8.41626 11.6037C8.62143 11.8459 8.85107 12.0974 9.08064 12.2929C9.19568 12.3909 9.32534 12.4875 9.46483 12.5622C9.59937 12.6341 9.78474 12.7083 9.99998 12.7083C10.2152 12.7083 10.4006 12.6341 10.5351 12.5622C10.6746 12.4875 10.8043 12.3909 10.9193 12.2929C11.1489 12.0974 11.3785 11.8459 11.5837 11.6037C11.7751 11.3778 11.9609 11.1411 12.1193 10.9394L12.1586 10.8894C12.3362 10.6632 12.4576 10.5117 12.5315 10.4356C12.7721 10.1881 12.7665 9.79241 12.5189 9.55182C12.2714 9.31124 11.8757 9.31686 11.6351 9.56438C11.5043 9.69904 11.3357 9.9133 11.1755 10.1172L11.1383 10.1647C10.9775 10.3695 10.8056 10.5885 10.63 10.7957L10.625 10.8016V3.75Z" fill="#FFFFFF"/>
                <path d="M3.95831 13.75C3.95831 13.4048 3.67849 13.125 3.33331 13.125C2.98814 13.125 2.70831 13.4048 2.70831 13.75C2.70831 14.2806 2.73517 14.7492 2.82263 15.1473C2.91165 15.5525 3.07174 15.9236 3.36575 16.2176C3.65975 16.5116 4.0308 16.6717 4.43601 16.7607C4.83413 16.8481 5.3027 16.875 5.83331 16.875H14.1666C14.6973 16.875 15.1658 16.8481 15.564 16.7607C15.9692 16.6717 16.3402 16.5116 16.6342 16.2176C16.9282 15.9236 17.0883 15.5525 17.1773 15.1473C17.2648 14.7492 17.2916 14.2806 17.2916 13.75C17.2916 13.4048 17.0118 13.125 16.6666 13.125C16.3215 13.125 16.0416 13.4048 16.0416 13.75C16.0416 14.2536 16.0145 14.6146 15.9564 14.8791C15.8999 15.1366 15.8228 15.2612 15.7503 15.3337C15.6779 15.4061 15.5532 15.4832 15.2957 15.5398C15.0312 15.5979 14.6702 15.625 14.1666 15.625H5.83331C5.32976 15.625 4.96874 15.5979 4.70421 15.5398C4.44676 15.4832 4.32209 15.4061 4.24963 15.3337C4.17717 15.2612 4.10008 15.1366 4.04352 14.8791C3.98541 14.6146 3.95831 14.2536 3.95831 13.75Z" fill="#FFFFFF"/>
              </svg>
              <span className="text-[14px] font-normal tracking-[-0.28px] text-white">Download</span>
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
