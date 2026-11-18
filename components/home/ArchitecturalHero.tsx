"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  HardHat,
  Play,
  RotateCw,
  Eye,
  CheckCircle2,
  ChevronDown,
  Layers,
  Building2,
  Maximize2,
  Sun,
  Sunset,
  X,
  ArrowRight,
  Compass,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GreenCTAButton } from "@/components/ui/GreenCTAButton";
import { usePrefersReducedMotion, useIsDesktop } from "@/lib/hooks";
import type { CameraPresetKey } from "@/components/three/scene-config";
import { contact } from "@/lib/brand";
import { telHref } from "@/lib/links";

gsap.registerPlugin(ScrollTrigger);

const Villa3DStage = dynamic(() => import("@/components/three/Villa3DStage"), {
  ssr: false,
  loading: () => null,
});

const CAMERA_VIEW_OPTIONS: Array<{
  key: CameraPresetKey;
  label: string;
  shortLabel: string;
  icon: typeof Building2;
}> = [
  { key: "hero", label: "Full Villa Composition", shortLabel: "Full Villa", icon: Maximize2 },
  { key: "completed", label: "Architecture & Louvers", shortLabel: "Residence", icon: Building2 },
  { key: "construction", label: "Structural RCC & Framework", shortLabel: "Structure", icon: HardHat },
  { key: "topElevation", label: "Isometric Masterplan", shortLabel: "Elevation", icon: Layers },
];

/**
 * Premium 3D Cinematic Construction Hero Banner
 * Inspired by https://kpconstructions.group/
 *
 * Architecture:
 * - 320vh scroll-pinned timeline allowing continuous 60 FPS building reveal
 * - Real-time Three.js / React Three Fiber villa with progressive construction states
 * - Smooth camera choreography (Approach, Framework zoom, Facade glide, Masterplan elevation)
 * - Dynamic scroll-based text fade-out and phase milestone HUD
 * - Mix-blend company brand watermark reveal at completion
 * - Atmospheric sunlight, ACESFilmic tone mapping, and lighting modes
 * - 360° Drag-to-Orbit and Camera Director controls
 * - High-speed poster fallback (banner1.png) for 0 CLS and instant LCP
 */
export function ArchitecturalHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const phaseHudRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const scrollProgressRef = useRef<number>(0);

  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  const [activePreset, setActivePreset] = useState<CameraPresetKey>("hero");
  const [lightingMode, setLightingMode] = useState<"day" | "sunset" | "blueprint">("day");
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [currentPhaseLabel, setCurrentPhaseLabel] = useState<string>("");
  const [currentPhaseSub, setCurrentPhaseSub] = useState<string>("");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const totalScrollable = section.offsetHeight - window.innerHeight;
        if (totalScrollable <= 0) {
          ticking = false;
          return;
        }

        const rawProgress = Math.min(1, Math.max(0, -rect.top / totalScrollable));
        scrollProgressRef.current = rawProgress;

        // 1. Update bottom scroll progress bar
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${rawProgress.toFixed(4)})`;
        }

        // 2. Text overlay fade-out and parallax downward translation
        if (textOverlayRef.current) {
          const textOpacity = Math.max(0, 1 - rawProgress / 0.16);
          const translateY = rawProgress * 140;
          textOverlayRef.current.style.opacity = textOpacity.toFixed(3);
          textOverlayRef.current.style.transform = `translateY(${translateY.toFixed(1)}px)`;
          textOverlayRef.current.style.pointerEvents = textOpacity > 0.1 ? "auto" : "none";
        }

        // 3. Phase HUD & Camera presets orchestration
        if (rawProgress < 0.18) {
          setCurrentPhaseLabel("");
          setCurrentPhaseSub("");
          setActivePreset("hero");
          if (phaseHudRef.current) phaseHudRef.current.style.opacity = "0";
        } else if (rawProgress >= 0.18 && rawProgress < 0.48) {
          setCurrentPhaseLabel("PHASE 01 • STRUCTURAL RCC FRAMEWORK & REBAR");
          setCurrentPhaseSub("Fe550D high-tensile steel, cast concrete columns and scaffolding systems");
          setActivePreset("construction");
          if (phaseHudRef.current) phaseHudRef.current.style.opacity = "1";
        } else if (rawProgress >= 0.48 && rawProgress < 0.78) {
          setCurrentPhaseLabel("PHASE 02 • 3D ELEVATION, TEAK LOUVERS & GLAZING");
          setCurrentPhaseSub("Cantilever canopy, vertical timber louvers and warm ambient living lights");
          setActivePreset("completed");
          if (phaseHudRef.current) phaseHudRef.current.style.opacity = "1";
        } else {
          setCurrentPhaseLabel("PHASE 03 • TURNKEY RESIDENCE & LBS SANCTION");
          setCurrentPhaseSub("Complete luxury architectural delivery by Er. D. Satheeshkumar");
          setActivePreset("topElevation");
          if (phaseHudRef.current) phaseHudRef.current.style.opacity = "1";
        }

        // 4. Large company brand watermark reveal at culmination (like reference site)
        if (watermarkRef.current) {
          if (rawProgress >= 0.76 && rawProgress <= 0.98) {
            const wmProgress = (rawProgress - 0.76) / 0.18;
            const opacity = Math.min(1, Math.max(0, wmProgress));
            watermarkRef.current.style.opacity = opacity.toFixed(3);
          } else {
            watermarkRef.current.style.opacity = "0";
          }
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  const handleSelectPreset = (preset: CameraPresetKey) => {
    setActivePreset(preset);
    setAutoRotate(false);
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative w-full"
      style={{
        // 320vh height gives a smooth cinematic scroll journey on desktop; 100vh on reduced-motion
        height: reducedMotion ? "100vh" : isDesktop ? "320vh" : "100vh",
      }}
    >
      {/* ========================================================================= */}
      {/* 1. STICKY FULL-SCREEN 100VH CINEMATIC CONTAINER                           */}
      {/* ========================================================================= */}
      <div
        ref={stickyContainerRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#0c1f13] select-none"
      >
        {/* Instant Fallback Poster (avoids any blank flash during initial client render) */}
        <Image
          src="/images/hero/banner1.png"
          alt="SKI Construction - Luxury Villa Architecture and Structural Engineering"
          fill
          priority
          sizes="100vw"
          quality={92}
          className="object-cover object-[75%_center] md:object-[70%_center] lg:object-[82%_center] xl:object-[75%_center] 2xl:object-center -z-20"
        />

        {/* Live Interactive 3D WebGL Canvas */}
        {!reducedMotion && (
          <div className="absolute inset-0 z-0">
            <Villa3DStage
              progressRef={scrollProgressRef}
              interactive={true}
              priority={true}
              autoRotate={autoRotate}
              activePreset={activePreset}
              lightingMode={lightingMode}
              onReady={() => setIsReady(true)}
              label="Interactive 3D architectural model of modern luxury villa and RCC skeleton"
              className="size-full rounded-none"
            />
          </div>
        )}

        {/* Left Side Frosted Light Gradient: guarantees 100% crisp typography readability */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-full sm:w-[68%] md:w-[58%] lg:w-[48%] xl:w-[42%] bg-gradient-to-r from-white/98 via-white/85 to-transparent pointer-events-none z-10"
        />

        {/* Bottom Ambient Vignette for Depth */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/55 via-black/20 to-transparent pointer-events-none z-10"
        />

        {/* Top Vignette for Nav Contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/30 to-transparent pointer-events-none z-10"
        />

        {/* ========================================================================= */}
        {/* 2. EDITORIAL HERO TEXT CONTENT (Left Aligned, Fades Out On Scroll)        */}
        {/* ========================================================================= */}
        <div
          ref={textOverlayRef}
          className="absolute inset-0 z-20 flex items-center will-change-transform"
        >
          <Container className="pt-[calc(var(--header-height,76px)+1rem)] sm:pt-[calc(var(--header-height,76px)+2rem)] pb-12 sm:pb-16 flex items-center justify-between">
            <div className="w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[480px] xl:max-w-[530px] flex flex-col gap-3.5 sm:gap-4 lg:gap-4 pointer-events-auto">
              {/* Eyebrow & Credential Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#69AB38] px-3.5 py-1 text-[0.68rem] sm:text-xs font-bold tracking-wider text-white uppercase shadow-sm">
                  <ShieldCheck className="size-3.5 text-white" />
                  SKI CONSTRUCTION
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1 text-[0.68rem] sm:text-xs font-semibold text-[#14251A] border border-brand-line/80 shadow-xs">
                  <HardHat className="size-3.5 text-[#69AB38]" />
                  Er. D. Satheeshkumar, DCE., BE.
                </span>
              </div>

              {/* Main Headline */}
              <h1
                id="hero-title"
                className="text-[1.85rem] xs:text-[2.1rem] sm:text-[2.5rem] lg:text-[2.5rem] xl:text-[2.95rem] leading-[1.08] font-black tracking-tight text-[#14251A] drop-shadow-xs"
              >
                <span className="block">WE DON&apos;T JUST</span>
                <span className="block text-[#103D25]">BUILD STRUCTURES.</span>
                <span className="block text-[#69AB38]">WE BUILD YOUR FUTURE.</span>
              </h1>

              {/* Tagline */}
              <div className="flex items-center gap-2.5" aria-hidden="true">
                <span className="h-0.5 w-8 bg-[#69AB38]" />
                <span className="text-[0.68rem] sm:text-[0.74rem] font-black tracking-[0.26em] text-[#69AB38] uppercase">
                  BUILD WITH QUALITY • COIMBATORE
                </span>
                <span className="h-px flex-1 max-w-[120px] bg-brand-line" />
              </div>

              {/* Description */}
              <p className="text-[0.88rem] sm:text-[0.98rem] lg:text-[0.95rem] xl:text-[1.02rem] leading-relaxed text-[#46534A] font-medium">
                From concept to construction, we deliver end-to-end building solutions with engineering expertise, quality and trust.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <GreenCTAButton href="/services" size="md">
                  Explore Our Services
                </GreenCTAButton>
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-brand-primary bg-white/95 backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm font-bold text-brand-primary shadow-xs transition-all duration-200 hover:bg-brand-primary hover:text-white hover:shadow-soft"
                >
                  <span className="flex size-6 items-center justify-center rounded-full bg-brand-mist text-brand-primary">
                    <Play className="size-3 fill-current ml-0.5" />
                  </span>
                  <span>Watch Our Work</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-brand-line/60">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.65rem] sm:text-[0.7rem] font-bold text-[#69AB38] uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="size-3" /> Approvals
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#14251A]">
                    100% DTCP / LBS
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.65rem] sm:text-[0.7rem] font-bold text-[#69AB38] uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="size-3" /> Supervision
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#14251A]">
                    Direct Engineer
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.65rem] sm:text-[0.7rem] font-bold text-[#69AB38] uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="size-3" /> Quotation
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#14251A]">
                    Zero Hidden Cost
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* ========================================================================= */}
        {/* 3. DYNAMIC PROGRESSIVE CONSTRUCTION PHASE HUD (Reveals during scroll)     */}
        {/* ========================================================================= */}
        <div
          ref={phaseHudRef}
          style={{ opacity: 0 }}
          className="pointer-events-none absolute bottom-12 left-6 sm:left-12 z-20 transition-opacity duration-300 max-w-lg"
        >
          <div className="rounded-2xl border border-white/20 bg-black/60 backdrop-blur-xl p-4 text-white shadow-2xl flex items-start gap-3.5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#69AB38] text-white shadow-md">
              <Compass className="size-5 animate-spin" style={{ animationDuration: "16s" }} />
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-xs sm:text-sm font-black tracking-wider text-[#69AB38] uppercase">
                {currentPhaseLabel}
              </p>
              <p className="text-[0.72rem] sm:text-xs text-white/80 leading-relaxed font-medium">
                {currentPhaseSub}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. COMPANY BRAND WATERMARK (Emerges at scroll climax, like reference)     */}
        {/* ========================================================================= */}
        <div
          ref={watermarkRef}
          style={{ opacity: 0 }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 transition-opacity duration-500"
        >
          <h2 className="font-display text-4xl sm:text-7xl lg:text-[8rem] font-black text-white/20 tracking-tighter uppercase select-none drop-shadow-2xl">
            SKI CONSTRUCTION
          </h2>
          <p className="text-xs sm:text-base font-black tracking-[0.35em] text-[#69AB38] uppercase mt-2">
            BUILD WITH QUALITY • KINATHUKADAVU, COIMBATORE
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 5. FLOATING 3D DIRECTOR HUD (Interactive Showcase Controls)               */}
        {/* ========================================================================= */}
        <aside
          aria-label="3D architectural viewport controls"
          className="hidden md:flex flex-col gap-3 absolute bottom-12 right-6 lg:right-12 z-30 max-w-[270px]"
        >
          <div className="rounded-2xl border border-white/40 bg-black/50 backdrop-blur-xl p-3 text-white shadow-2xl flex flex-col gap-3">
            {/* HUD Header */}
            <div className="flex items-center justify-between border-b border-white/15 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="flex size-2 rounded-full bg-[#69AB38] animate-pulse" />
                <span className="text-[0.68rem] font-bold uppercase tracking-wider text-white/90">
                  Interactive 3D Villa
                </span>
              </div>
              <span className="text-[0.62rem] font-semibold text-white/60">
                60 FPS • WebGL
              </span>
            </div>

            {/* Camera Perspective Presets */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[0.62rem] font-bold uppercase tracking-wider text-white/70">
                3D Camera Perspective
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {CAMERA_VIEW_OPTIONS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePreset === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleSelectPreset(item.key)}
                      aria-pressed={isActive}
                      className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[0.7rem] font-bold transition-all ${
                        isActive
                          ? "bg-[#69AB38] text-white shadow-md ring-1 ring-white/50"
                          : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      <Icon className="size-3 shrink-0" />
                      <span className="truncate">{item.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lighting Mode Switcher */}
            <div className="flex flex-col gap-1.5 pt-1 border-t border-white/10">
              <span className="text-[0.62rem] font-bold uppercase tracking-wider text-white/70">
                Lighting Atmosphere
              </span>
              <div className="grid grid-cols-3 gap-1">
                <button
                  type="button"
                  onClick={() => setLightingMode("day")}
                  className={`flex items-center justify-center gap-1 rounded-lg py-1 px-1.5 text-[0.68rem] font-semibold transition-all ${
                    lightingMode === "day"
                      ? "bg-white/25 text-white ring-1 ring-white/40"
                      : "bg-white/5 text-white/70 hover:bg-white/15"
                  }`}
                >
                  <Sun className="size-3 text-amber-300" />
                  <span>Day</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLightingMode("sunset")}
                  className={`flex items-center justify-center gap-1 rounded-lg py-1 px-1.5 text-[0.68rem] font-semibold transition-all ${
                    lightingMode === "sunset"
                      ? "bg-white/25 text-white ring-1 ring-white/40"
                      : "bg-white/5 text-white/70 hover:bg-white/15"
                  }`}
                >
                  <Sunset className="size-3 text-orange-400" />
                  <span>Sunset</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLightingMode("blueprint")}
                  className={`flex items-center justify-center gap-1 rounded-lg py-1 px-1.5 text-[0.68rem] font-semibold transition-all ${
                    lightingMode === "blueprint"
                      ? "bg-white/25 text-white ring-1 ring-white/40"
                      : "bg-white/5 text-white/70 hover:bg-white/15"
                  }`}
                >
                  <Layers className="size-3 text-cyan-400" />
                  <span>CAD</span>
                </button>
              </div>
            </div>

            {/* Auto-Rotate Toggle & Orbit Hint */}
            <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[0.65rem] text-white/75">
              <button
                type="button"
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex items-center gap-1 rounded-md px-2 py-0.5 transition-colors ${
                  autoRotate ? "text-[#69AB38] font-bold" : "text-white/60 hover:text-white"
                }`}
              >
                <RotateCw className={`size-3 ${autoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "6s" }} />
                <span>Auto-Orbit {autoRotate ? "ON" : "OFF"}</span>
              </button>
              <span className="text-[0.6rem] text-white/50">
                Drag to orbit 360°
              </span>
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* 6. BOTTOM SCROLL CUE & SCROLL PROGRESS BAR                                */}
        {/* ========================================================================= */}
        <div className="absolute inset-x-0 bottom-3 z-20 flex flex-col items-center justify-center pointer-events-none">
          <div className="flex items-center gap-1.5 text-[0.65rem] sm:text-xs font-bold tracking-[0.2em] text-white/80 uppercase mb-1 drop-shadow-md">
            <span>Scroll to explore architecture</span>
            <ChevronDown className="size-3 animate-bounce" />
          </div>
        </div>

        {/* Bottom Scroll Progress Bar */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-black/30 z-30">
          <span ref={progressBarRef} className="block h-full origin-left scale-x-0 bg-[#69AB38]" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. WATCH OUR WORK VIDEO MODAL                                             */}
      {/* ========================================================================= */}
      {videoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn"
        >
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-[#14251A] text-white shadow-2xl border border-white/20">
            <div className="flex items-center justify-between border-b border-white/10 p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-[#69AB38] text-white">
                  <Play className="size-3.5 fill-current ml-0.5" />
                </span>
                <h2 id="video-modal-title" className="text-base sm:text-lg font-bold text-white">
                  SKI Construction Architectural Walkthrough
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="flex size-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close video modal"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <Image
                src="/images/hero/banner1.png"
                alt="Architectural construction walkthrough"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6 text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-[#69AB38] text-white shadow-lg mb-3">
                  <Play className="size-7 fill-current ml-1" />
                </span>
                <p className="text-lg font-extrabold text-white">Watch Real Projects &amp; 3D Elevations</p>
                <p className="text-sm text-white/80 max-w-md mt-1 mb-4">
                  Explore our completed luxury residences, structural concrete construction, and 3D elevation walkthroughs across Coimbatore.
                </p>
                <Link
                  href="/gallery"
                  onClick={() => setVideoModalOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs sm:text-sm font-bold text-[#14251A] shadow-md hover:bg-brand-mist"
                >
                  <span>Open Full Project Gallery</span>
                  <ArrowRight className="size-4 text-[#69AB38]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}