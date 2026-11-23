"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ShieldCheck, PhoneCall, ArrowRight, Compass } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks";

const TOTAL_FRAMES = 102;
const FRAME_DIRECTORY = "/images/bannerimages";

/**
 * Builds the URL for any 0-based frame index:
 * index 0   -> /images/bannerimages/ezgif-frame-001.jpg
 * index 199 -> /images/bannerimages/ezgif-frame-200.jpg
 */
function getFrameUrl(index: number): string {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `${FRAME_DIRECTORY}/ezgif-frame-${frameNumber}.jpg`;
}

export function ArchitecturalHero() {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);

  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  // Cache of preloaded HTMLImageElements (2560x1440 native resolution)
  const imagesCacheRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const inflightRef = useRef<Set<number>>(new Set());
  const lastDrawnFrameRef = useRef<HTMLImageElement | null>(null);
  const currentFrameIndexRef = useRef<number>(0);
  const isMountedRef = useRef(false);
  const rafScrollIdRef = useRef<number | null>(null);

  /**
   * Retrieves the closest loaded frame to the requested target index.
   * Guarantees zero blank flashes while intermediate frames are decoding.
   */
  const getBestLoadedFrame = useCallback((index: number): HTMLImageElement | null => {
    const cache = imagesCacheRef.current;
    if (cache[index]) return cache[index];

    // Search outwards for closest loaded frame
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = index - offset;
      if (prev >= 0 && cache[prev]) return cache[prev];
      const next = index + offset;
      if (next < TOTAL_FRAMES && cache[next]) return cache[next];
    }
    return cache[0] || null;
  }, []);

  /**
   * Adjusts canvas resolution to match viewport dimensions and high-DPI displays.
   * Uses sticky wrapper or viewport client dimensions (never the 300vh scroll runway).
   */
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const sticky = stickyRef.current;
    if (!canvas || !sticky) return;

    const rect = sticky.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const targetWidth = Math.round(rect.width * dpr);
    const targetHeight = Math.round(rect.height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      lastDrawnFrameRef.current = null;
    }
  }, []);

  /**
   * Renders the specified frame index onto the canvas with cinematic framing.
   */
  const renderFrameAtIndex = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const progress = Math.min(1, Math.max(0, index / (TOTAL_FRAMES - 1)));

      // Update bottom progress bar
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      if (canvas.width > 0 && canvas.height > 0) {
        const frame = getBestLoadedFrame(index);
        if (frame && frame !== lastDrawnFrameRef.current) {
          const cw = canvas.width;
          const ch = canvas.height;
          const iw = frame.naturalWidth || 2560;
          const ih = frame.naturalHeight || 1440;

          // Cinematic 1.05x framing optimization: subtly shifts edge foliage to eliminate corner watermark blur
          const scale = Math.max(cw / iw, ch / ih) * 1.05;
          const dw = iw * scale;
          const dh = ih * scale;
          const dx = (cw - dw) * 0.44;
          const dy = (ch - dh) * 0.45;

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(frame, dx, dy, dw, dh);
          lastDrawnFrameRef.current = frame;
        }
      }
    },
    [getBestLoadedFrame]
  );

  /**
   * Loads an individual image and caches it once fully decoded.
   */
  const loadSingleImage = useCallback((index: number): Promise<HTMLImageElement | null> => {
    if (index < 0 || index >= TOTAL_FRAMES) return Promise.resolve(null);
    if (imagesCacheRef.current[index]) return Promise.resolve(imagesCacheRef.current[index]);
    if (inflightRef.current.has(index)) return Promise.resolve(null);

    inflightRef.current.add(index);
    const url = getFrameUrl(index);

    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;

      const onDone = () => {
        inflightRef.current.delete(index);
        if (isMountedRef.current) {
          imagesCacheRef.current[index] = img;
        }
        resolve(img);
      };

      if (img.complete && img.naturalWidth > 0) {
        onDone();
      } else {
        img.onload = () => {
          if ("decode" in img) {
            img.decode().then(onDone).catch(onDone);
          } else {
            onDone();
          }
        };
        img.onerror = () => {
          inflightRef.current.delete(index);
          resolve(null);
        };
      }
    });
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    // Ensure hero always starts from the very top with full text opacity and initial frame
    if (typeof window !== "undefined") {
      if (window.scrollY > 0) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
      currentFrameIndexRef.current = 0;
      if (contentRef.current) {
        contentRef.current.style.opacity = "1";
        contentRef.current.style.transform = "translate3d(0, 0, 0)";
        contentRef.current.style.pointerEvents = "auto";
      }
    }

    // 1. Immediately preload frame 0 and set initial canvas size
    updateCanvasSize();
    loadSingleImage(0).then((firstImg) => {
      if (firstImg && isMountedRef.current) {
        setFirstFrameLoaded(true);
        updateCanvasSize();
        renderFrameAtIndex(0);
      }

      // 2. High-Priority Preload Pipeline:
      // Load key landmark frames first for instant scrub responsiveness
      const landmarkFrames = [0, 15, 30, 45, 60, 75, 90, 101];
      landmarkFrames.forEach((idx) => loadSingleImage(idx));

      // Load remaining frames in fast sequential batches
      if (!reducedMotion) {
        let currentBatchStart = 1;
        const loadBatches = () => {
          if (!isMountedRef.current) return;
          const end = Math.min(TOTAL_FRAMES, currentBatchStart + 16);
          for (let i = currentBatchStart; i < end; i++) {
            loadSingleImage(i);
          }
          currentBatchStart = end;
          if (currentBatchStart < TOTAL_FRAMES) {
            setTimeout(loadBatches, 30);
          }
        };
        setTimeout(loadBatches, 60);
      }
    });

    // High-DPI Resize handling
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
      lastDrawnFrameRef.current = null;
      renderFrameAtIndex(currentFrameIndexRef.current);
    });
    if (stickyRef.current) {
      resizeObserver.observe(stickyRef.current);
    }

    if (reducedMotion) {
      renderFrameAtIndex(TOTAL_FRAMES - 1);
      return () => {
        isMountedRef.current = false;
        resizeObserver.disconnect();
      };
    }

    // 3. Mouse Scroll Animation Scrubbing Engine:
    // User scrolling smoothly drives the frame from 0 (empty site) -> 199 (completed villa)
    const handleScroll = () => {
      if (!isMountedRef.current || !containerRef.current || !stickyRef.current) return;

      if (rafScrollIdRef.current !== null) {
        cancelAnimationFrame(rafScrollIdRef.current);
      }

      rafScrollIdRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollDistance = rect.height - window.innerHeight;

        if (scrollDistance > 0) {
          // Calculate exact scroll progress through the runway (0.0 to 1.0)
          const currentScroll = Math.max(0, -rect.top);
          const progress = Math.min(1, Math.max(0, currentScroll / scrollDistance));
          const targetIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)));

          if (targetIndex !== currentFrameIndexRef.current) {
            currentFrameIndexRef.current = targetIndex;
            renderFrameAtIndex(targetIndex);
          }

          // Editorial Text Layer: Smoothly fades out and lifts during the initial 26% of scroll
          if (contentRef.current) {
            const fadeThreshold = 0.26;
            const textProgress = Math.min(1, progress / fadeThreshold);
            const textOpacity = Math.max(0, 1 - textProgress * 1.15);
            const textTranslateY = textProgress * 50;

            contentRef.current.style.opacity = textOpacity.toFixed(3);
            contentRef.current.style.transform = `translate3d(0, -${textTranslateY}px, 0)`;
            contentRef.current.style.pointerEvents = textOpacity < 0.1 ? "none" : "auto";
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial sync
    handleScroll();

    return () => {
      isMountedRef.current = false;
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (rafScrollIdRef.current !== null) {
        cancelAnimationFrame(rafScrollIdRef.current);
      }
    };
  }, [reducedMotion, loadSingleImage, updateCanvasSize, renderFrameAtIndex]);

  return (
    <section
      ref={containerRef}
      aria-labelledby="hero-title"
      className={`relative w-full bg-brand-ink select-none ${
        reducedMotion ? "h-[92vh] sm:h-[95vh] lg:h-screen" : "h-[220vh] sm:h-[250vh]"
      }`}
    >
      {/* Sticky Viewport Container: Locks to screen while user scrubs the villa construction */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-start"
      >
        {/* Instant First-Frame Fallback (visible immediately on HTML parse before JS/canvas mount) */}
        {!firstFrameLoaded && (
          <img
            src={getFrameUrl(0)}
            alt="SKI Construction Architectural Project Hero"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover pointer-events-none contrast-[1.04] saturate-[1.03] scale-[1.05] origin-[44%_45%]"
          />
        )}

        {/* High-Performance High-DPI Canvas with Enhanced Contrast and Sharpness */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 block pointer-events-none contrast-[1.04] saturate-[1.03]"
          style={{ imageRendering: "auto" }}
        />

        {/* Balanced Left Gradient Overlay: Cinematic deep scrim that guarantees ultra-sharp contrast for text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent pointer-events-none"
        />

        {/* Bottom Ambient Gradient for Depth */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none"
        />

        {/* Bottom-Right Soft Botanical Vignette (smoothly conceals corner watermark blur) */}
        <div
          aria-hidden="true"
          className="absolute -right-10 -bottom-10 w-[420px] h-80 bg-gradient-to-tl from-black/70 via-black/25 to-transparent blur-2xl pointer-events-none z-10"
        />

        {/* Bottom-Right Floating Engineering Accreditation Badge */}
        <div
          className="absolute right-6 sm:right-10 lg:right-14 bottom-8 sm:bottom-10 lg:bottom-14 z-20 hidden md:flex items-center gap-3.5 rounded-2xl bg-black/65 backdrop-blur-md border border-white/20 p-3.5 sm:p-4 text-white shadow-2xl transition-all duration-300 hover:bg-black/80 hover:border-brand-primary/50"
        >
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white shadow-md">
            <ShieldCheck className="size-6 text-white" />
          </div>
          <div className="pr-1 text-left">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="size-1.5 rounded-full bg-brand-accent animate-pulse" />
              <span className="text-[0.62rem] font-bold uppercase tracking-widest text-brand-accent">
                Registered LBS Engineer
              </span>
            </div>
            <span className="block text-sm sm:text-base font-bold text-white leading-snug">
              Er. D. Satheeshkumar, DCE., BE.
            </span>
            <span className="block text-[0.68rem] text-white/75 font-medium">
              Kinathukadavu & Coimbatore
            </span>
          </div>
        </div>

        {/* Hero Editorial Content Layer */}
        <div className="relative z-10 flex flex-1 w-full flex-col justify-start px-6 sm:px-10 lg:pl-[12vw] lg:pr-10 pt-[calc(var(--header-height,76px)+1.5rem)] sm:pt-[calc(var(--header-height,76px)+2rem)] lg:pt-[calc(var(--header-height,76px)+2.5rem)] pb-10 sm:pb-14 lg:pb-16">
          <div
            ref={contentRef}
            className="my-auto flex w-full max-w-[880px] flex-col gap-4 sm:gap-5 lg:gap-6 text-white will-change-transform transition-[opacity,transform] duration-75"
          >
            {/* Eyebrow & Credential Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary/95 px-3 py-1 text-[0.68rem] sm:text-xs font-bold tracking-wider text-white uppercase shadow-sm">
                <ShieldCheck className="size-3" aria-hidden="true" />
                SKI Construction
              </span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-title"
              className="font-serif text-[2.25rem] xs:text-[2.65rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5rem] leading-[1.05] font-normal tracking-[-0.02em] !text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
              style={{ color: "#ffffff" }}
            >
              <span className="block !text-white" style={{ color: "#ffffff" }}>We don&apos;t just</span>
              <span className="block !text-white" style={{ color: "#ffffff" }}>build structures.</span>
              <span className="block !text-white" style={{ color: "#ffffff" }}>
                We build{" "}
                <span
                  className="italic font-semibold drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]"
                  style={{ color: "#9df028" }}
                >
                  your future.
                </span>
              </span>
            </h1>

            {/* Brand Tagline Divider */}
            <div className="flex items-center gap-2.5" aria-hidden="true">
              <span className="h-0.5 w-8 bg-brand-accent shadow-sm" />
              <span
                className="text-[0.68rem] sm:text-[0.72rem] font-bold tracking-[0.28em] !text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                style={{ color: "#ffffff" }}
              >
                BUILD WITH QUALITY
              </span>
              <span className="h-px flex-1 max-w-[120px] bg-white/40" />
            </div>

            {/* Lead Paragraph */}
            <p
              className="max-w-[560px] text-[0.95rem] sm:text-base lg:text-[1.05rem] leading-relaxed !text-white/95 font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
              style={{ color: "#f3f4f6" }}
            >
              3D elevation design, DTCP/LBS approvals and turnkey construction across Coimbatore and Kinathukadavu.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/services"
                className="group inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-6 pr-1.5 text-[0.95rem] font-semibold text-brand-ink shadow-soft transition-all duration-300 hover:bg-brand-soft hover:shadow-lg"
              >
                Explore Our Services
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-ink text-white transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full border border-white/50 bg-white/10 py-1.5 pl-1.5 pr-6 text-[0.95rem] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-primary text-white">
                  <PhoneCall className="size-4" aria-hidden="true" />
                </span>
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Progress Bar */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-black/40 z-30">
          <span
            ref={progressBarRef}
            className="block h-full origin-left scale-x-0 bg-gradient-to-r from-brand-primary via-brand-accent to-emerald-400 will-change-transform transition-transform duration-75"
          />
        </div>
      </div>
    </section>
  );
}
