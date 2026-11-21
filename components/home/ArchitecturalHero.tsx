"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ShieldCheck, HardHat, PhoneCall, ArrowRight, ChevronDown } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks";

const TOTAL_FRAMES = 200;
const FRAME_DIRECTORY = "/images/bannerimages";
const TARGET_FPS = 26; // Smooth, cinematic building construction playback
const FRAME_INTERVAL = 1000 / TARGET_FPS;

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const scrollHintRef = useRef<HTMLButtonElement>(null);

  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  // Cache of preloaded HTMLImageElements (2560x1440 native resolution)
  const imagesCacheRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const inflightRef = useRef<Set<number>>(new Set());
  const lastDrawnFrameRef = useRef<HTMLImageElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isMountedRef = useRef(false);

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
   * Adjusts canvas resolution to match container dimensions and high-DPI displays.
   * Supports up to 2.5x devicePixelRatio for crisp 4K/Retina rendering.
   */
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
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

          // Cinematic 1.05x framing optimization: subtly shifts edge foliage to eliminate bottom-right watermark blur
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

    // 1. Immediately preload frame 0 and set initial canvas size
    updateCanvasSize();
    loadSingleImage(0).then((firstImg) => {
      if (firstImg && isMountedRef.current) {
        setFirstFrameLoaded(true);
        updateCanvasSize();
        renderFrameAtIndex(0);
      }

      // 2. High-Priority Preloading Pipeline:
      // Sequential preloading batch for smooth forward playback
      if (!reducedMotion) {
        for (let i = 1; i <= 24; i++) {
          loadSingleImage(i);
        }

        let currentBatchStart = 25;
        const loadBatches = () => {
          if (!isMountedRef.current) return;
          const end = Math.min(TOTAL_FRAMES, currentBatchStart + 12);
          for (let i = currentBatchStart; i < end; i++) {
            loadSingleImage(i);
          }
          currentBatchStart = end;
          if (currentBatchStart < TOTAL_FRAMES) {
            setTimeout(loadBatches, 40);
          }
        };
        setTimeout(loadBatches, 80);
      }
    });

    // High-DPI Resize handling
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
      lastDrawnFrameRef.current = null;
      renderFrameAtIndex(0);
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    if (reducedMotion) {
      return () => {
        isMountedRef.current = false;
        resizeObserver.disconnect();
      };
    }

    // 3. Smooth Single Playback Loop:
    // Plays smoothly from frame 0 to frame 199 ONCE, then permanently rests on the completed luxury villa!
    // Never restarts or loops back to 0, ensuring the banner never repeats twice.
    let currentFrame = 0;
    let lastTimestamp = performance.now();

    const animLoop = (timestamp: number) => {
      if (!isMountedRef.current) return;

      const elapsed = timestamp - lastTimestamp;
      if (elapsed >= FRAME_INTERVAL) {
        lastTimestamp = timestamp - (elapsed % FRAME_INTERVAL);

        if (currentFrame < TOTAL_FRAMES - 1) {
          currentFrame += 1;
          renderFrameAtIndex(currentFrame);
        } else {
          // Reached final frame (completed building). Stop animation permanently!
          renderFrameAtIndex(TOTAL_FRAMES - 1);
          return;
        }
      }

      rafIdRef.current = requestAnimationFrame(animLoop);
    };

    // Begin animation after brief initial frame settling
    const startTimer = setTimeout(() => {
      if (isMountedRef.current) {
        rafIdRef.current = requestAnimationFrame(animLoop);
      }
    }, 150);

    // 4. Natural Scroll Behavior (Zero Lock / Single Screen):
    // As user scrolls past the banner into About, apply subtle gentle parallax
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (contentRef.current) {
        const translateY = Math.min(scrollY * 0.35, 160);
        contentRef.current.style.transform = `translate3d(0, -${translateY}px, 0)`;
      }
      if (scrollHintRef.current) {
        const hintOpacity = Math.max(0, 1 - scrollY / 140);
        scrollHintRef.current.style.opacity = hintOpacity.toFixed(3);
        scrollHintRef.current.style.pointerEvents = hintOpacity < 0.1 ? "none" : "auto";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      isMountedRef.current = false;
      clearTimeout(startTimer);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [reducedMotion, loadSingleImage, updateCanvasSize, renderFrameAtIndex]);

  return (
    <section
      ref={containerRef}
      aria-labelledby="hero-title"
      className="relative w-full h-[92vh] sm:h-[95vh] lg:h-screen min-h-[640px] max-h-[1080px] overflow-hidden bg-brand-ink select-none flex items-center"
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
        className="absolute right-6 sm:right-10 lg:right-14 bottom-12 sm:bottom-16 lg:bottom-20 z-20 hidden md:flex items-center gap-3.5 rounded-2xl bg-black/65 backdrop-blur-md border border-white/20 p-3.5 sm:p-4 text-white shadow-2xl transition-all duration-300 hover:bg-black/80 hover:border-brand-primary/50"
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
      <div className="relative z-10 flex w-full items-center px-6 sm:px-10 lg:pl-[12vw] lg:pr-10 pt-[calc(var(--header-height,76px)+1.5rem)] pb-20 sm:pb-24 lg:pb-28">
        <div
          ref={contentRef}
          className="flex w-full max-w-[880px] flex-col gap-5 sm:gap-6 text-white will-change-transform"
        >
          {/* Eyebrow & Credential Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary/95 px-3 py-1 text-[0.68rem] sm:text-xs font-bold tracking-wider text-white uppercase shadow-sm">
              <ShieldCheck className="size-3" aria-hidden="true" />
              SKI Construction
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[0.68rem] sm:text-xs font-semibold text-white backdrop-blur-sm">
              <HardHat className="size-3 text-white" aria-hidden="true" />
              Er. D. Satheeshkumar, DCE., BE.
            </span>
          </div>

          {/* Main Headline */}
          <h1
            id="hero-title"
            className="font-serif text-[2.75rem] sm:text-[3.75rem] lg:text-[4.75rem] xl:text-[5.5rem] leading-[1.03] font-normal tracking-[-0.02em] !text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
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

      {/* Interactive Smooth Scroll Cue */}
      {!reducedMotion && (
        <button
          ref={scrollHintRef}
          type="button"
          onClick={() => {
            const heroHeight = containerRef.current?.offsetHeight || window.innerHeight;
            window.scrollTo({ top: heroHeight, behavior: "smooth" });
          }}
          aria-label="Scroll to explore more sections"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-[0.68rem] font-bold tracking-[0.28em] text-white/90 uppercase transition-all duration-300 hover:text-brand-accent hover:scale-105 cursor-pointer pointer-events-auto drop-shadow-md"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="size-4 animate-bounce text-brand-accent" aria-hidden="true" />
        </button>
      )}

      {/* Bottom Progress Bar */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-black/20 z-30">
        <span
          ref={progressBarRef}
          className="block h-full origin-left scale-x-0 bg-brand-primary will-change-transform"
        />
      </div>
    </section>
  );
}
