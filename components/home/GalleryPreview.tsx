"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Eye,
  Film,
  Maximize2,
  Play,
  X,
} from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks";

export type MediaType = "video" | "image";

export interface CarouselMediaItem {
  id: string;
  type: MediaType;
  title: string;
  category: string;
  duration?: string; // only for videos, e.g. "1:45"
  src: string; // video .mp4 path OR full image path
  poster: string; // thumbnail / high-res photo path
}

/**
 * Curated Architectural Media Collection (Both Videos and Photos)
 * Users can easily add or edit images and videos here:
 * - For images: set type: "image", src: "/images/your-image.jpg", poster: "/images/your-image.jpg"
 * - For videos: set type: "video", src: "/videos/your-video.mp4", poster: "/images/your-thumbnail.jpg"
 */
export const curatedMediaItems: readonly CarouselMediaItem[] = [
  {
    id: "media-1",
    type: "video",
    title: "Aishwarya Galaxy 152 & 153 - Site Structural Progress",
    category: "Residential Villa",
    duration: "0:45",
    src: "/projects/folders/aishwarya-galaxy-152---153/20260811_184130.mp4",
    poster: "/projects/folders/aishwarya-galaxy-152---153/20260811_183257.jpg",
  },
  {
    id: "media-2",
    type: "image",
    title: "AJ Avenue Krishnan Site - Column & Beam Reinforcement",
    category: "Residential Villa",
    src: "/projects/folders/aj-avenue-krishnan/20250711_101802.jpg",
    poster: "/projects/folders/aj-avenue-krishnan/20250711_101802.jpg",
  },
  {
    id: "media-3",
    type: "video",
    title: "Ganesh & Tharani SK Garden - Slab Casting & Shuttering",
    category: "Residential Villa",
    duration: "1:15",
    src: "/projects/folders/ganesh-tharani-sk-garden/20251228_100858.mp4",
    poster: "/projects/folders/ganesh-tharani-sk-garden/20251124_114729.jpg",
  },
  {
    id: "media-4",
    type: "image",
    title: "Sivaperumal Aishwarya Galaxy - Exterior Masonry & Plastering",
    category: "Turnkey Home",
    src: "/projects/folders/sivaperumal-aishwarya-galaxy/20260721_115646.jpg",
    poster: "/projects/folders/sivaperumal-aishwarya-galaxy/20260721_115646.jpg",
  },
  {
    id: "media-5",
    type: "video",
    title: "Ramaraj Thamarai Site - Plinth Beam & Foundation Concrete",
    category: "Site Construction",
    duration: "0:50",
    src: "/projects/folders/ramaraj-thamarai-site/20260814_093123.mp4",
    poster: "/projects/folders/ramaraj-thamarai-site/20260814_093129.jpg",
  },
  {
    id: "media-6",
    type: "image",
    title: "RS Road Site Kinathukadavu - Modern Residential Structure",
    category: "Kinathukadavu Site",
    src: "/projects/folders/rs-road-site-kkd/20250829_063645.jpg",
    poster: "/projects/folders/rs-road-site-kkd/20250829_063645.jpg",
  },
  {
    id: "media-7",
    type: "video",
    title: "Senthor Garden 49 - First Floor Slab Concrete Pour",
    category: "Ongoing Project",
    duration: "1:30",
    src: "/projects/folders/senthor-garden-49/VID20240902111549.mp4",
    poster: "/projects/folders/senthor-garden-49/IMG20240822082721.jpg",
  },
  {
    id: "media-8",
    type: "image",
    title: "Sadhasivam Site Muthugoundanur - Structural Handover",
    category: "Turnkey Project",
    src: "/projects/folders/sadhasivam-site-muthugoundanur/IMG-20241130-WA0056.jpg",
    poster: "/projects/folders/sadhasivam-site-muthugoundanur/IMG-20241130-WA0056.jpg",
  },
  {
    id: "media-9",
    type: "video",
    title: "Kangayam Site - Heavy Structural RCC Work & Inspection",
    category: "Structural Construction",
    duration: "1:10",
    src: "/projects/folders/kangayam-site/VID-20250411-WA0060.mp4",
    poster: "/projects/folders/kangayam-site/20250624_143136.jpg",
  },
  {
    id: "media-10",
    type: "image",
    title: "Site No 27 Senthor KKD - Footing & Basement Work",
    category: "Individual Villa",
    src: "/projects/folders/site-no-27-senthor-kkd/20260526_105333.jpg",
    poster: "/projects/folders/site-no-27-senthor-kkd/20260526_105333.jpg",
  },
  {
    id: "media-11",
    type: "video",
    title: "Sivaperumal Aishwarya Galaxy - On-Site Walkthrough & Finishing",
    category: "Turnkey Villa",
    duration: "1:20",
    src: "/projects/folders/sivaperumal-aishwarya-galaxy/20260606_075119.mp4",
    poster: "/projects/folders/sivaperumal-aishwarya-galaxy/20260721_115646.jpg",
  },
  {
    id: "media-12",
    type: "image",
    title: "Site Celebration & Engineering Team - Kinathukadavu",
    category: "Team & Events",
    src: "/projects/folders/ayudhapooja/IMG-20261019-WA0070.jpg",
    poster: "/projects/folders/ayudhapooja/IMG-20261019-WA0070.jpg",
  },
];

const processSteps = [
  { step: "#01", title: "Strategy & Planning" },
  { step: "#02", title: "Design & Development" },
  { step: "#03", title: "Launch & Growth" },
  { step: "#04", title: "Ongoing Support" },
] as const;

type FilterMode = "all" | "video" | "image";

/**
 * Individual 3D Carousel Card with Mouse-Hover Autoplay for Videos
 */
function CarouselCard({
  item,
  index,
  itemAngle,
  dimensions,
  onClick,
}: {
  item: CarouselMediaItem;
  index: number;
  itemAngle: number;
  dimensions: { radius: number; cardWidth: number; cardHeight: number };
  onClick: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mouse Hover: Auto-plays video immediately inside the card
  const handleMouseEnter = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay policy or cancelled
        });
    }
  };

  const handleMouseLeave = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const isVideo = item.type === "video";

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl sm:rounded-[32px] bg-brand-dark shadow-2xl border border-black/10 transition-all duration-300 cursor-pointer select-none"
      style={{
        width: `${dimensions.cardWidth}px`,
        height: `${dimensions.cardHeight}px`,
        transform: `rotateY(${itemAngle}deg) translateZ(-${dimensions.radius}px)`,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* High-Resolution Poster Image (Visible when video is idle or for photo cards) */}
      <Image
        src={item.poster}
        alt={item.title}
        fill
        sizes="(min-width: 1024px) 300px, 200px"
        className={`object-cover object-center transition-all duration-700 ${
          isPlaying ? "opacity-0" : "opacity-100 group-hover:scale-108"
        }`}
        draggable={false}
      />

      {/* HTML5 Video for Instant Mouse Hover Autoplay */}
      {isVideo && (
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 size-full object-cover transition-opacity duration-300 pointer-events-none ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Dark Vignette Gradient for Depth and Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-black/30 to-black/35 pointer-events-none transition-opacity duration-300" />

      {/* Top Badges: Category & Media Type / Duration */}
      <div className="absolute top-2.5 sm:top-4 inset-x-2.5 sm:inset-x-4 flex items-center justify-between z-10 pointer-events-none">
        <span className="rounded-full bg-black/60 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 text-[0.58rem] sm:text-[0.68rem] font-bold tracking-wider text-white uppercase border border-white/15">
          {item.category}
        </span>

        {isVideo ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 text-[0.58rem] sm:text-[0.68rem] font-medium text-white/95 border border-white/15 font-mono">
            <Film className="size-2.5 sm:size-3 text-brand-accent" />
            <span>{item.duration ?? "Video"}</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 text-[0.58rem] sm:text-[0.68rem] font-medium text-white/95 border border-white/15">
            <Camera className="size-2.5 sm:size-3 text-brand-accent" />
            <span>Photo</span>
          </span>
        )}
      </div>

      {/* Center Action Button (Play for Video, Eye/Zoom for Image) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        {isVideo ? (
          <div
            className={`flex size-10 sm:size-16 items-center justify-center rounded-full bg-white/95 text-brand-primary shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-all duration-300 ${
              isPlaying
                ? "scale-90 opacity-70 bg-brand-primary text-white"
                : "group-hover:scale-115 group-hover:bg-brand-primary group-hover:text-white"
            }`}
          >
            <Play className="ml-0.5 sm:ml-1 size-4.5 sm:size-7 fill-current transition-colors" />
          </div>
        ) : (
          <div className="flex size-10 sm:size-16 items-center justify-center rounded-full bg-white/90 text-brand-primary shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white">
            <Maximize2 className="size-4.5 sm:size-7 transition-colors" />
          </div>
        )}
      </div>

      {/* Bottom Title & Action Label */}
      <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-5 z-10 flex flex-col gap-0.5 sm:gap-1 text-white pointer-events-none">
        <span className="text-[0.58rem] sm:text-[0.68rem] font-bold tracking-widest text-brand-accent uppercase">
          {isVideo ? (isPlaying ? "PLAYING PREVIEW" : "CLICK TO PLAY") : "VIEW PHOTO"}
        </span>
        <h3 className="text-[0.68rem] sm:text-xs md:text-sm font-bold leading-snug line-clamp-2 text-white drop-shadow-md">
          {item.title}
        </h3>
      </div>
    </div>
  );
}

export function GalleryPreview() {
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({
    radius: 720,
    cardWidth: 280,
    cardHeight: 400,
    perspective: 850,
  });

  const turntableRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const isHoveredRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const lastPointerXRef = useRef<number>(0);
  const movedRef = useRef<boolean>(false);
  const hasCapturedRef = useRef<boolean>(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const reducedMotion = usePrefersReducedMotion();

  // Filter items according to user selection (All, Videos, or Photos)
  const displayedItems =
    filterMode === "all"
      ? curatedMediaItems
      : curatedMediaItems.filter((item) => item.type === filterMode);

  // Responsive 3D cylinder dimensions - Preserves identical curved cylindrical design across all viewports
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 400) {
        setDimensions({
          radius: 260,
          cardWidth: 130,
          cardHeight: 195,
          perspective: 480,
        });
      } else if (w < 640) {
        setDimensions({
          radius: 320,
          cardWidth: 155,
          cardHeight: 230,
          perspective: 560,
        });
      } else if (w < 1024) {
        setDimensions({
          radius: 540,
          cardWidth: 230,
          cardHeight: 330,
          perspective: 700,
        });
      } else {
        setDimensions({
          radius: 720,
          cardWidth: 280,
          cardHeight: 400,
          perspective: 850,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Smooth 60fps/120fps hardware-accelerated 3D turntable animation loop
  useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
      if (!isDraggingRef.current && selectedItemIndex === null) {
        if (Math.abs(velocityRef.current) > 0.01) {
          rotationRef.current = (rotationRef.current + velocityRef.current) % 360;
          velocityRef.current *= 0.94; // Smooth momentum friction
          if (turntableRef.current) {
            turntableRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
          }
        } else if (!isHoveredRef.current && !reducedMotion) {
          // Slow cinematic auto-rotation
          rotationRef.current = (rotationRef.current + 0.08) % 360;
          if (turntableRef.current) {
            turntableRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
          }
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [reducedMotion, selectedItemIndex]);

  // Pointer drag handling for rotating the 3D cylinder
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastPointerXRef.current = e.clientX;
    velocityRef.current = 0;
    movedRef.current = false;
    hasCapturedRef.current = false;
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX;
    const deltaX = currentX - lastPointerXRef.current;
    lastPointerXRef.current = currentX;

    if (Math.abs(currentX - startXRef.current) > 10) {
      movedRef.current = true;
      if (!hasCapturedRef.current) {
        try {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          hasCapturedRef.current = true;
        } catch {
          // Ignore
        }
      }
    }

    if (movedRef.current) {
      const sensitivity = 0.18;
      rotationRef.current = (rotationRef.current + deltaX * sensitivity) % 360;
      velocityRef.current = deltaX * sensitivity;

      if (turntableRef.current) {
        turntableRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
      }
    }
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (hasCapturedRef.current) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
      hasCapturedRef.current = false;
    }
  }, []);

  const handleCardClick = (index: number) => {
    if (movedRef.current) return; // Ignore drag release
    setSelectedItemIndex(index);
  };

  // Keyboard controls for modal viewer
  useEffect(() => {
    if (selectedItemIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItemIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedItemIndex((prev) =>
          prev !== null ? (prev - 1 + displayedItems.length) % displayedItems.length : null,
        );
      } else if (e.key === "ArrowRight") {
        setSelectedItemIndex((prev) =>
          prev !== null ? (prev + 1) % displayedItems.length : null,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItemIndex, displayedItems.length]);

  const activeItem = selectedItemIndex !== null ? displayedItems[selectedItemIndex] : null;

  // Autoplay video immediately when modal opens or active item switches
  useEffect(() => {
    if (activeItem?.type === "video" && modalVideoRef.current) {
      const v = modalVideoRef.current;
      v.currentTime = 0;
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback to muted playback if browser policy restricts unmuted autoplay
          v.muted = true;
          v.play().catch(() => {});
        });
      }
    }
  }, [activeItem]);

  return (
    <section
      id="gallery"
      aria-label="Architectural Project Gallery (Photos & Videos)"
      className="relative isolate overflow-hidden bg-gradient-to-b from-brand-soft/40 via-white to-brand-soft/20 py-20 sm:py-28 lg:py-32"
    >
      {/* Soft Ambient Radial Light for Theme Depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-brand-primary/5 blur-3xl -z-10"
      />

      {/* ========================================================================= */}
      {/* 1. Header & Call-to-Action Pill in SKI Brand Theme Style                 */}
      {/* ========================================================================= */}
      <div className="flex flex-col items-center text-center px-6 max-w-4xl mx-auto mb-10 sm:mb-12">
        {/* Brand Theme Eyebrow */}
        <p className="text-xs font-bold tracking-[0.22em] text-brand-primary uppercase mb-3">
          Project Gallery &amp; Walkthroughs
        </p>

        {/* Brand Theme Heading */}
        <h2 className="text-balance font-extrabold leading-[1.14] text-brand-dark text-2xl xs:text-3xl sm:text-4xl lg:text-[2.6rem] tracking-tight">
          Curious What Else We&apos;ve <span className="text-brand-primary">Built?</span>
        </h2>

        {/* Brand Theme Description */}
        <p className="mt-4 text-[0.95rem] leading-relaxed text-brand-muted max-w-xl mx-auto">
          Explore our interactive showcase of on-site construction videos, 3D elevation walkthroughs, and completed luxury villa photographs.
        </p>

        {/* Media Filter Tabs: All, Videos, Photos */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1 rounded-2xl sm:rounded-full bg-brand-soft border border-brand-line shadow-2xs">
          <button
            type="button"
            onClick={() => setFilterMode("all")}
            className={`px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full text-[0.72rem] sm:text-xs font-bold transition-all duration-200 cursor-pointer ${
              filterMode === "all"
                ? "bg-brand-primary text-white shadow-xs"
                : "text-brand-dark hover:text-brand-primary"
            }`}
          >
            All Perspectives ({curatedMediaItems.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("video")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full text-[0.72rem] sm:text-xs font-bold transition-all duration-200 cursor-pointer ${
              filterMode === "video"
                ? "bg-brand-primary text-white shadow-xs"
                : "text-brand-dark hover:text-brand-primary"
            }`}
          >
            <Film className="size-3 sm:size-3.5" />
            Project Videos ({curatedMediaItems.filter((i) => i.type === "video").length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("image")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full text-[0.72rem] sm:text-xs font-bold transition-all duration-200 cursor-pointer ${
              filterMode === "image"
                ? "bg-brand-primary text-white shadow-xs"
                : "text-brand-dark hover:text-brand-primary"
            }`}
          >
            <Camera className="size-3 sm:size-3.5" />
            Photo Gallery ({curatedMediaItems.filter((i) => i.type === "image").length})
          </button>
        </div>

        {/* Brand Theme CTA Button */}
        <Link
          href="/gallery"
          className="group mt-6 inline-flex items-center gap-3 rounded-full border-2 border-brand-primary bg-white py-2 pl-6 pr-2 text-sm sm:text-base font-bold text-brand-primary shadow-soft transition-all duration-300 hover:bg-brand-primary hover:text-white hover:shadow-button cursor-pointer"
        >
          <span>See Full Gallery &amp; Videos</span>
          <span className="flex size-8 sm:size-9 items-center justify-center rounded-full bg-brand-primary text-white transition-all duration-300 group-hover:bg-white group-hover:text-brand-primary group-hover:translate-x-0.5">
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </Link>
      </div>

      {/* ========================================================================= */}
      {/* 2. 3D Panoramic Curved Cylinder Carousel (Supports Photos & Videos)      */}
      {/* ========================================================================= */}
      <div
        className="relative w-full h-[270px] xs:h-[310px] sm:h-[460px] lg:h-[520px] select-none touch-pan-y overflow-hidden cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
      >
        {/* Left Soft Vignette Edge Gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 inset-y-0 w-6 xs:w-10 sm:w-28 lg:w-72 bg-gradient-to-r from-white via-white/80 to-transparent z-20"
        />

        {/* Right Soft Vignette Edge Gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 inset-y-0 w-6 xs:w-10 sm:w-28 lg:w-72 bg-gradient-to-l from-white via-white/80 to-transparent z-20"
        />

        {/* 3D Perspective Stage Container */}
        <div
          className="relative flex items-center justify-center w-full h-full"
          style={{
            perspective: `${dimensions.perspective}px`,
            perspectiveOrigin: "50% 50%",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Centered Rotating 3D Turntable */}
          <div
            ref={turntableRef}
            className="relative flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateY(0deg)",
              willChange: "transform",
            }}
          >
            {displayedItems.map((item, index) => {
              const itemAngle = index * (360 / displayedItems.length);
              return (
                <CarouselCard
                  key={item.id}
                  item={item}
                  index={index}
                  itemAngle={itemAngle}
                  dimensions={dimensions}
                  onClick={() => handleCardClick(index)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. Bottom 4 Value Steps in Theme Colors (#01 - #04)                       */}
      {/* ========================================================================= */}
      <div className="w-full max-w-5xl mx-auto px-6 mt-8 sm:mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
          {processSteps.map((step) => (
            <div key={step.step} className="flex flex-col items-center">
              <span className="text-base sm:text-lg font-extrabold text-brand-primary tracking-wider mb-1">
                {step.step}
              </span>
              <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-brand-dark">
                {step.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. Fullscreen Interactive Modal Lightbox (Plays Video OR Shows Photo)     */}
      {/* ========================================================================= */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedItemIndex(null)}
        >
          <div
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-neutral-950 border border-brand-line/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-white">
              <div className="flex items-center gap-3 pr-4">
                <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-bold text-white uppercase shadow-sm">
                  {activeItem.type === "video" ? "Video Walkthrough" : "Architectural Photo"}
                </span>
                <span className="text-xs text-brand-accent font-semibold hidden sm:inline">
                  {activeItem.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-lg">
                  {activeItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItemIndex(null)}
                aria-label="Close modal"
                className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white cursor-pointer shrink-0"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Media Viewer: Video Player OR High-Res Photo */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {activeItem.type === "video" ? (
                <video
                  ref={modalVideoRef}
                  key={activeItem.src}
                  src={activeItem.src}
                  poster={activeItem.poster}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  className="size-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="relative size-full">
                  <Image
                    src={activeItem.src}
                    alt={activeItem.title}
                    fill
                    sizes="(min-width: 1280px) 1200px, 100vw"
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Modal Footer with Previous / Next Controls */}
            <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-xs text-white/70">
              <button
                type="button"
                onClick={() =>
                  setSelectedItemIndex(
                    (prev) => (prev! - 1 + displayedItems.length) % displayedItems.length,
                  )
                }
                className="flex items-center gap-1.5 font-semibold text-white/90 hover:text-brand-accent transition-colors cursor-pointer"
              >
                <ChevronLeft className="size-4" />
                Previous {activeItem.type === "video" ? "Video" : "Photo"}
              </button>

              <span className="font-mono text-white/50">
                {selectedItemIndex! + 1} / {displayedItems.length}
              </span>

              <button
                type="button"
                onClick={() =>
                  setSelectedItemIndex((prev) => (prev! + 1) % displayedItems.length)
                }
                className="flex items-center gap-1.5 font-semibold text-white/90 hover:text-brand-accent transition-colors cursor-pointer"
              >
                Next {activeItem.type === "video" ? "Video" : "Photo"}
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
