"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";

type GalleryMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string };

interface GalleryCard {
  id: string;
  label: string;
  media: GalleryMedia;
}

interface GalleryBlockProps {
  blockId: "top" | "middle" | "bottom";
  cards: GalleryCard[];
}

function GalleryVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          setShouldLoad(true);
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.25, rootMargin: "120px" },
    );

    observer.observe(videoElement);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !shouldLoad) {
      return;
    }

    if (isVisible) {
      void videoElement.play().catch(() => {
        // Ignore play interruptions from quick viewport changes.
      });
    } else {
      videoElement.pause();
    }
  }, [isVisible, shouldLoad]);

  return (
    <video
      ref={videoRef}
      {...(shouldLoad ? { src } : {})}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

function GalleryBlock({ blockId, cards }: GalleryBlockProps) {
  return (
    <div
      className="grid w-full max-w-[900px] grid-cols-1 gap-6 md:grid-cols-3"
      data-gallery-block={blockId}
    >
      {cards.map((card) => (
        <div
          key={card.id}
          className="relative overflow-hidden rounded-[20px]"
          data-gallery-card={card.id}
        >
          <div className="relative aspect-[3/5] w-full">
            {card.media.type === "image" ? (
              <Image
                src={card.media.src}
                alt={card.media.alt}
                fill
                unoptimized
                className="object-cover"
                sizes="(min-width: 768px) 260px, 100vw"
              />
            ) : (
              <GalleryVideo
                src={card.media.src}
                poster={card.media.poster}
              />
            )}
          </div>
          <span className="absolute bottom-3 left-3 inline-flex h-8 items-center rounded-3xl bg-[rgba(85,85,85,0.4)] px-3 py-[6px] text-[16px] font-bold leading-none tracking-[-0.4px] text-white backdrop-blur-[3px] shadow-[inset_1px_1px_2px_-1px_rgba(255,255,255,1),inset_-1px_-1px_2px_-1px_rgba(255,255,255,1)]">
            {card.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AboutMePage() {
  const travelGalleryTop: GalleryCard[] = [
    {
      id: "top-left",
      label: "Sorrento, Italy",
      media: { type: "image", src: "/images/places/sorrento-italy-original.jpg", alt: "Sorrento, Italy" },
    },
    {
      id: "top-center",
      label: "Andorra",
      media: { type: "video", src: "/videos/about/andorra.mp4", poster: "/images/posters/about/andorra.mp4.png" },
    },
    {
      id: "top-right",
      label: "Seville, Spain",
      media: { type: "image", src: "/images/places/seville-spain.png", alt: "Seville, Spain" },
    },
  ];

  const travelGalleryMiddle: GalleryCard[] = [
    {
      id: "middle-left",
      label: "Porto, Portugal",
      media: { type: "video", src: "/videos/about/porto-portugal.mp4", poster: "/images/posters/about/porto-portugal.mp4.png" },
    },
    {
      id: "middle-center",
      label: "Madrid, Spain",
      media: { type: "image", src: "/images/places/andorra-hands.png", alt: "Madrid, Spain" },
    },
    {
      id: "middle-right",
      label: "Agerola, Italy",
      media: { type: "video", src: "/videos/about/agerola-italy.mp4", poster: "/images/posters/about/agerola-italy.mp4.png" },
    },
  ];

  const travelGalleryBottom: GalleryCard[] = [
    {
      id: "bottom-left",
      label: "Madrid, Spain",
      media: { type: "image", src: "/images/places/madrid-field.png", alt: "Madrid, Spain" },
    },
    {
      id: "bottom-center",
      label: "Andorra",
      media: { type: "image", src: "/images/places/andorra-snowboard.png", alt: "Andorra" },
    },
    {
      id: "bottom-right",
      label: "Tenerife, Spain",
      media: { type: "video", src: "/videos/about/tenerife-spain.mp4", poster: "/images/posters/about/tenerife-spain.mp4.png" },
    },
  ];

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex max-w-[900px] flex-col gap-8"
      >
        <div className="flex items-start gap-4">
          <h1 className="text-[32px] font-semibold leading-10 tracking-[-1.2px] text-text-primary">
            About me
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-3">
            <div className="flex flex-col items-center justify-start gap-12 text-[19px] font-medium leading-7 tracking-[-0.6px] text-text-primary">
              <p className="max-w-[800px]">
                My design journey started with my first online flower shop. I needed a website, so I created it myself, and that was the moment I understood how much I like design.
              </p>
              <p className="max-w-[800px]">
                Later, when I worked in Abu Dhabi, first as a bartender and then as a F&amp;B supervisor, I discovered the same passion for details while crafting cocktails and designing signature menus.
              </p>
              <p className="max-w-[800px]">
                That was the moment I realized I wanted to pursue design seriously. To make this step, I studied at the British Higher School of Art and Design in Moscow, which gave me the foundation for my career.
              </p>
              <GalleryBlock blockId="top" cards={travelGalleryTop} />
              <div className="flex w-fit max-w-[800px] flex-col gap-6">
                <h2 className="text-[26px] font-semibold leading-8 tracking-[-1.2px] text-accent lowercase">
                  how do i design
                </h2>
                <div className="relative pl-4">
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 top-0 w-[2px] rounded-[2px] bg-[linear-gradient(180deg,#0E9AFF_0%,#0D9AFF00_100%)]"
                  />
                  <ul className="list-disc list-inside flex flex-col gap-5">
                    <li className="flex flex-col gap-2">
                    <p className="max-w-[800px]"><strong>Clarity first</strong></p>
                    <p className="max-w-[800px]">I turn complex systems into simple, intuitive experiences that people actually enjoy using.</p>
                    </li>
                    <li className="flex flex-col gap-2">
                    <p className="max-w-[800px]"><strong>Systems over screens</strong></p>
                    <p className="max-w-[800px]">I focus on scalable design systems that speed up development and keep products consistent across platforms.</p>
                    </li>
                    <li className="flex flex-col gap-4">
                    <p className="max-w-[800px]"><strong>Collaboration matters</strong></p>
                    <p className="max-w-[800px]">I believe the best solutions come from close teamwork with product managers, engineers, and stakeholders.</p>
                    </li>
                    <li className="flex flex-col gap-5">
                    <p className="max-w-[800px]"><strong>Impact by design</strong></p>
                    <p className="max-w-[800px]">For me, good design isn’t just about aesthetics — it’s about driving measurable results for both users and businesses.</p>
                    </li>
                  </ul>
                </div>
              </div>
              <GalleryBlock blockId="middle" cards={travelGalleryMiddle} />
            </div>
          </section>

          <section className="mx-auto flex w-full max-w-[800px] flex-col items-center gap-6">
            <h2 className="w-full max-w-[800px] text-[26px] font-semibold leading-8 tracking-[-1.2px] text-accent lowercase">
              beyond work
            </h2>
            <p className="w-full max-w-[800px] text-[19px] font-medium leading-7 tracking-[-0.6px] text-text-primary">
              Beyond design, I’m happiest when spending time with my wife and our dog. We live by the sea in Spain, love to travel, and enjoy the small adventures of everyday life.
            </p>
          </section>
          <div className="mx-auto w-full max-w-[900px]">
            <GalleryBlock blockId="bottom" cards={travelGalleryBottom} />
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
}
