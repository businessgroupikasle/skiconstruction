"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, HardHat, PhoneCall, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GreenCTAButton } from "@/components/ui/GreenCTAButton";
import { usePrefersReducedMotion } from "@/lib/hooks";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 72;
const FRAME_DIRECTORY = "/images/bannerimages";

/**
 * Builds the URL for any 0-based frame index:
 * index 0  -> /images/bannerimages/ezgif-frame-001.jpg
 * index 71 -> /images/bannerimages/ezgif-frame-072.jpg
 */
function getFrameUrl(index: number): string {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `${FRAME_DIRECTORY}/ezgif-frame-${frameNumber}.jpg`;
}

type FrameAsset = ImageBitmap | HTMLImageElement;

export function ArchitecturalHero() {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  // Cache and state stored in refs to prevent unnecessary React re-renders during 60/120fps scrolling
  const framesCacheRef = useRef<(FrameAsset | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const targetIndexRef = useRef(0);
  const lastDrawnIndexRef = useRef(-1);
  const rafIdRef = useRef<number | null>(null);
  const isMountedRef = useRef(false);

  /**
   * Retrieves the closest loaded frame to the requested target index.
   * Eliminates black or blank flashes if a frame is still decoding.
   */
  const getBestAvailableFrame = useCallback((index: number): FrameAsset | null => {
    const cache = framesCacheRef.current;
    if (cache[index]) return cache[index];

    // Search outwards for the closest loaded frame
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = index - offset;
      if (prev >= 0 && cache[prev]) return cache[prev];
      const next = index + offset;
      if (next < TOTAL_FRAMES && cache[next]) return cache[next];
    }
    return cache[0] || null;
  }, []);

  /**
   * High-performance canvas drawing with high-definition aspect-ratio preservation.
   * Supports ultra-crisp 4K/8K display output.
   */
  const renderCanvasFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const frame = getBestAvailableFrame(index);
    if (!frame) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    const iw = frame.width || 3840;
    const ih = frame.height || 2160;

    // Cinematic cover algorithm
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(frame, dx, dy, dw, dh);
    lastDrawnIndexRef.current = index;
  }, [getBestAvailableFrame]);

  /**
   * Loads an individual frame asset, preferring off-thread ImageBitmap decoding
   * with a graceful fallback to HTMLImageElement.
   */
  const loadSingleFrame = useCallback(async (index: number): Promise<FrameAsset | null> => {
    if (framesCacheRef.current[index]) {
      return framesCacheRef.current[index];
    }

    const url = getFrameUrl(index);

    return new Promise((resolve) => {
      const img = new Image();
      img.decoding = "async";
      img.src = url;

      const finishLoad = async () => {
        try {
          if (typeof window !== "undefined" && "createImageBitmap" in window) {
            const bitmap = await createImageBitmap(img);
            if (isMountedRef.current) {
              framesCacheRef.current[index] = bitmap;
            }
            resolve(bitmap);
            return;
          }
        } catch {
          // If createImageBitmap fails for any reason, fall back to standard HTMLImageElement
        }

        if (isMountedRef.current) {
          framesCacheRef.current[index] = img;
        }
        resolve(img);
      };

      if (img.complete && img.naturalWidth > 0) {
        finishLoad();
      } else {
        img.onload = () => {
          if ("decode" in img) {
            img.decode().then(finishLoad).catch(finishLoad);
          } else {
            finishLoad();
          }
        };
        img.onerror = () => {
          resolve(null);
        };
      }
    });
  }, []);

  /**
   * Resizes the canvas buffer according to container client bounds and device pixel ratio.
   * Scales resolution up to full 4K / high-DPI capability for ultra-sharp rendering.
   */
  const resizeCanvasBuffer = useCallback(() => {
    const canvas = canvasRef.current;
    const stickyEl = stickyRef.current;
    if (!canvas || !stickyEl) return;

    const rect = stickyEl.getBoundingClientRect();
    const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 2), 3);

    // Maximize resolution up to 3840x2160 native frames
    const targetWidth = Math.min(3840, Math.floor(rect.width * dpr));
    const targetHeight = Math.min(2160, Math.floor(rect.height * dpr));

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    renderCanvasFrame(targetIndexRef.current);
  }, [renderCanvasFrame]);

  // Main Effect: Preload sequence, setup ScrollTrigger, and handle resize
  useEffect(() => {
    isMountedRef.current = true;

    // Initial subtle text entrance animation
    const textRevealAnimation = gsap.from(".hero-reveal", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.08,
    });

    // 1. Immediately preload the first frame
    loadSingleFrame(0).then((firstFrame) => {
      if (firstFrame && isMountedRef.current) {
        setFirstFrameLoaded(true);
        resizeCanvasBuffer();
        renderCanvasFrame(0);
      }

      // 2. Progressively preload remaining frames with controlled fast batch concurrency
      if (!reducedMotion) {
        let activeLoads = 0;
        let nextIndex = 1;
        const maxConcurrency = 6;

        const pumpQueue = () => {
          if (!isMountedRef.current) return;
          while (activeLoads < maxConcurrency && nextIndex < TOTAL_FRAMES) {
            const idx = nextIndex++;
            activeLoads++;
            loadSingleFrame(idx).then(() => {
              activeLoads--;
              if (idx === targetIndexRef.current) {
                renderCanvasFrame(idx);
              }
              pumpQueue();
            });
          }
        };

        pumpQueue();
      }
    });

    // 3. Set up responsive ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvasBuffer();
    });

    if (stickyRef.current) {
      resizeObserver.observe(stickyRef.current);
    }

    // If reduced motion is requested, do not configure sticky scroll scrubbing
    if (reducedMotion) {
      return () => {
        isMountedRef.current = false;
        textRevealAnimation.kill();
        resizeObserver.disconnect();
      };
    }

    // 4. Scroll-controlled animation using GSAP ScrollTrigger
    const container = containerRef.current;
    if (!container) return;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.06, // Smooth micro-damped responsiveness
      onUpdate: (self) => {
        const progress = Math.min(1, Math.max(0, self.progress));
        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(progress * (TOTAL_FRAMES - 1)))
        );

        targetIndexRef.current = targetFrame;

        // If target frame is not yet loaded, trigger immediate load
        if (!framesCacheRef.current[targetFrame]) {
          loadSingleFrame(targetFrame).then(() => {
            if (targetIndexRef.current === targetFrame) {
              renderCanvasFrame(targetFrame);
            }
          });
        }

        // Schedule canvas draw via requestAnimationFrame
        if (rafIdRef.current === null) {
          rafIdRef.current = requestAnimationFrame(() => {
            rafIdRef.current = null;
            renderCanvasFrame(targetIndexRef.current);
          });
        }

        // Update progress bar
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
        }

        // Fade scroll hint early
        if (scrollHintRef.current) {
          const hintOpacity = Math.max(0, 1 - progress * 8);
          scrollHintRef.current.style.opacity = hintOpacity.toFixed(3);
        }

        // Subtle editorial text transition: stays clear initially, then gracefully yields to the visual
        if (contentRef.current) {
          let textOpacity = 1;
          let textTranslateY = 0;
          if (progress > 0.12) {
            const fade = Math.min(1, (progress - 0.12) / 0.38);
            textOpacity = 1 - fade;
            textTranslateY = -24 * fade;
          }
          contentRef.current.style.opacity = textOpacity.toFixed(3);
          contentRef.current.style.transform = `translate3d(0, ${textTranslateY.toFixed(1)}px, 0)`;
          contentRef.current.style.pointerEvents = textOpacity < 0.1 ? "none" : "auto";
        }

        // Soft gradient overlay gently clears as the sequence progresses
        if (overlayRef.current) {
          let overlayOpacity = 1;
          if (progress > 0.15) {
            overlayOpacity = Math.max(0, 1 - (progress - 0.15) / 0.35);
          }
          overlayRef.current.style.opacity = (overlayOpacity * 0.95).toFixed(3);
        }
      },
    });

    return () => {
      isMountedRef.current = false;
      textRevealAnimation.kill();
      st.kill();
      resizeObserver.disconnect();

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }

      // Memory cleanup: close GPU ImageBitmaps
      framesCacheRef.current.forEach((frame) => {
        if (frame && "close" in frame && typeof frame.close === "function") {
          frame.close();
        }
      });
    };
  }, [reducedMotion, loadSingleFrame, resizeCanvasBuffer, renderCanvasFrame]);

  return (
    <section
      ref={containerRef}
      aria-labelledby="hero-title"
      className={`relative w-full ${
        reducedMotion ? "min-h-[580px] sm:min-h-[640px] lg:h-screen" : "h-[420vh] sm:h-[480vh] lg:h-[500vh]"
      } bg-brand-soft`}
    >
      {/* Sticky Hero Viewport */}
      <div
        ref={stickyRef}
        className={`${
          reducedMotion ? "relative h-full" : "sticky top-0 h-screen"
        } w-full overflow-hidden flex items-center bg-brand-ink select-none`}
      >
        {/* Instant First-Frame Fallback (visible immediately on HTML parse before JS/canvas mount) */}
        {!firstFrameLoaded && (
          <img
            src={getFrameUrl(0)}
            alt="SKI Construction Architectural Project Hero"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
          />
        )}

        {/* High-Performance High-Resolution Canvas for Scroll-Controlled Frame Playback */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full block pointer-events-none"
        />

        {/* Left Gradient Overlay: Ensures 100% crisp text readability without blocking the center building */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-full sm:w-[65%] lg:w-[48%] xl:w-[42%] bg-gradient-to-r from-white/95 via-white/70 to-transparent pointer-events-none transition-opacity duration-200"
        />

        {/* Subtle Bottom Ambient Gradient for Depth */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 via-black/10 to-transparent pointer-events-none"
        />

        {/* Hero Editorial Content Layer */}
        <Container className="relative z-10 pt-[calc(var(--header-height,76px)+1.5rem)] sm:pt-[calc(var(--header-height,76px)+2.5rem)] pb-8 sm:pb-12 lg:pb-14">
          <div
            ref={contentRef}
            className="w-full max-w-[390px] sm:max-w-[420px] lg:max-w-[420px] xl:max-w-[460px] flex flex-col gap-3.5 sm:gap-4 lg:gap-3.5 xl:gap-4 transition-all duration-150 will-change-transform"
          >
            {/* Eyebrow & Credential Badge */}
            <div className="hero-reveal flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary px-3 py-1 text-[0.68rem] sm:text-xs font-bold tracking-wider text-white uppercase shadow-sm">
                <ShieldCheck className="size-3" />
                SKI Construction
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-xs px-3 py-1 text-[0.68rem] sm:text-xs font-semibold text-brand-dark border border-brand-line/60 shadow-xs">
                <HardHat className="size-3 text-brand-primary" />
                Er. D. Satheeshkumar, DCE., BE.
              </span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-title"
              className="hero-reveal text-[1.7rem] xs:text-[1.95rem] sm:text-[2.25rem] lg:text-[2.2rem] xl:text-[2.65rem] leading-[1.08] font-extrabold tracking-tight text-brand-ink drop-shadow-xs"
            >
              <span className="block">WE DON&apos;T JUST</span>
              <span className="block">BUILD STRUCTURES.</span>
              <span className="text-brand-gradient block">WE BUILD YOUR FUTURE.</span>
            </h1>

            {/* Brand Tagline Divider */}
            <div className="hero-reveal flex items-center gap-2.5" aria-hidden="true">
              <span className="h-0.5 w-8 bg-brand-primary" />
              <span className="text-[0.68rem] sm:text-[0.72rem] font-extrabold tracking-[0.28em] text-brand-primary uppercase">
                BUILD WITH QUALITY
              </span>
              <span className="h-px flex-1 max-w-[120px] bg-brand-line" />
            </div>

            {/* Lead Paragraph */}
            <p className="hero-reveal text-[0.88rem] sm:text-[0.96rem] lg:text-[0.92rem] xl:text-[0.98rem] leading-relaxed text-brand-dark/90 font-medium">
              From concept 3D elevations and statutory DTCP/LBS approvals to bank-ready estimates and turnkey construction, we deliver end-to-end building excellence across Coimbatore and Kinathukadavu.
            </p>

            {/* Action Buttons */}
            <div className="hero-reveal flex flex-wrap items-center gap-2.5 pt-1">
              <GreenCTAButton href="/services" size="md">
                Explore Our Services
              </GreenCTAButton>
              <GreenCTAButton
                href="/contact"
                variant="outline"
                size="md"
                icon="none"
                className="bg-white/85 backdrop-blur-xs"
              >
                <PhoneCall aria-hidden="true" className="size-3.5 text-brand-primary" />
                Get a Free Quote
              </GreenCTAButton>
            </div>
          </div>
        </Container>

        {/* Scroll Hint Cue (Visible at 0 scroll, fades immediately on scroll) */}
        {!reducedMotion && (
          <div
            ref={scrollHintRef}
            aria-hidden="true"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-brand-dark/80 transition-opacity duration-300 pointer-events-none"
          >
            <span className="text-[0.65rem] sm:text-[0.68rem] font-bold tracking-[0.2em] text-brand-dark/70 uppercase">
              Scroll to explore
            </span>
            <ChevronDown className="size-3.5 text-brand-primary animate-bounce" />
          </div>
        )}

        {/* Bottom Scroll Progress Bar */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-black/15 z-30">
          <span
            ref={progressBarRef}
            className="block h-full origin-left scale-x-0 bg-brand-primary will-change-transform"
          />
        </div>
      </div>
    </section>
  );
}
