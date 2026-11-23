"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/hooks";

gsap.registerPlugin(ScrollTrigger);

/**
 * 9 Curated Architectural Cards matching the Circular Arc design
 * From architectural wireframe/sketch on the far-left to luxury completed homes in center,
 * to 3D elevation render on the far-right.
 * Calibrated angles and proportional radius prevent cards from clipping at screen edges.
 */
const arcCards = [
  {
    id: "card-1",
    title: "3D Wireframe & Floor Planning",
    category: "Design Phase",
    src: "/images/about/about.png",
    angle: -48,
  },
  {
    id: "card-2",
    title: "Warm Contemporary Villa",
    category: "Residential",
    src: "/images/about/villa-exterior.jpg",
    angle: -36,
  },
  {
    id: "card-3",
    title: "Luxury Modern Residence",
    category: "Turnkey Villa",
    src: "/images/projects/luxury-villa.jpg",
    angle: -24,
  },
  {
    id: "card-4",
    title: "Timber & Glass Villa",
    category: "Residential",
    src: "/images/projects/contemporary-villa.jpg",
    angle: -12,
  },
  {
    id: "card-5",
    title: "Flagship Luxury Estate",
    category: "Turnkey Architecture",
    src: "/images/about/about2.png",
    angle: 0,
  },
  {
    id: "card-6",
    title: "Modern Minimalist Home",
    category: "Residential",
    src: "/images/projects/modern-residence.jpg",
    angle: 12,
  },
  {
    id: "card-7",
    title: "Coastal Terrace Residence",
    category: "Villa Design",
    src: "/images/projects/coastal-residence.jpg",
    angle: 24,
  },
  {
    id: "card-8",
    title: "Hillside Stone Villa",
    category: "Turnkey Villa",
    src: "/images/projects/hillside-house.jpg",
    angle: 36,
  },
  {
    id: "card-9",
    title: "3D Elevation & Lighting",
    category: "Elevation Design",
    src: "/images/services/3d-elevation-design.png",
    angle: 48,
  },
] as const;

const pillars = [
  {
    title: "One team",
    description: "Plan, 3D, structure and interiors under one roof",
  },
  {
    title: "Coimbatore-ready",
    description: "Designed for our rain, sun and local plot sizes",
  },
  {
    title: "Open pricing",
    description: "Itemised quotes and stage-wise payments",
  },
  {
    title: "Always informed",
    description: "Photos and progress directly from Er. Satheeshkumar",
  },
] as const;

import type { Project } from "@/data/types";

/** Distance of each card centre from the arc pivot, and the angle the sweep-in starts from. */
const radius = 660;
const sweepStartAngle = 60;

interface ProjectArcProps {
  projects?: readonly Project[];
}

/**
 * Authentic FabHome Circular Arc Showcase Section
 * Replicates the signature semi-circular curved fan of 9 architectural project cards,
 * radial gauge tick marks, centered headline with green accent, lime pill button,
 * and 4-column value pillars at the bottom.
 */
export function ProjectArc({ projects }: ProjectArcProps = {}) {
  const arcId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = usePrefersReducedMotion();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      // 1320px is the calibrated base width where all 9 cards fit with safe margins
      const nextScale = Math.min(1, Math.max(0.68, width / 1320));
      setScale(nextScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Two-way scroll-driven scrub animation:
  // - As the user scrolls DOWN, the cards smoothly fan and rotate back with depth ("back la varanum")
  // - As the user scrolls UP, the cards smoothly rotate forward and return into place ("animation varanum")
  // Continuous 2-way scrub physics with zero blank states.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion || (typeof window !== "undefined" && window.innerWidth < 1024)) return;
    const elements = cardRefs.current;

    const paint = (el: HTMLDivElement, angle: number, opacity: number, scaleVal = 1) => {
      el.style.transform = `rotate(${angle}deg) translateY(-${radius}px) scale(${scaleVal})`;
      el.style.opacity = String(opacity);
    };

    const context = gsap.context(() => {
      const state = { progress: 0.5 };

      const updateCards = (p: number) => {
        // p ranges from 0 (top entering viewport) to 1 (bottom leaving viewport)
        // Center focus is at p = 0.5 where cards match nominal arc angles
        const angleOffset = (p - 0.5) * 26; // -13deg to +13deg rotation sweep
        const spreadFactor = 0.88 + p * 0.24; // 0.88 (compact) to 1.12 (fanned)

        arcCards.forEach((card, index) => {
          const el = elements[index];
          if (!el) return;

          const angle = card.angle * spreadFactor + angleOffset;
          // Smooth opacity: fully opaque while on screen, gentle fade at extreme boundaries
          let opacity = 1;
          if (p < 0.1) opacity = Math.max(0.3, p / 0.1);
          if (p > 0.9) opacity = Math.max(0.3, (1 - p) / 0.1);

          // Subtle 3D perspective depth: cards scale slightly as they move along the scroll
          const cardScale = 1 - Math.abs(p - 0.5) * 0.08;

          paint(el, angle, opacity, cardScale);
        });
      };

      // Set initial clean state based on nominal angles
      updateCards(0.5);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          onUpdate: (self) => {
            updateCards(self.progress);
          },
        },
      });

      timeline.to(state, {
        progress: 1,
        ease: "none",
        duration: 1,
      });
    }, container);

    return () => {
      context.revert();
      arcCards.forEach((card, index) => {
        const el = elements[index];
        if (el) paint(el, card.angle, 1, 1);
      });
    };
  }, [reducedMotion]);

  // Calibrated Circle Geometry for perfect fitting inside desktop viewports
  const centerY = 780;

  return (
    <section
      id="projects"
      aria-labelledby="arc-heading"
      className="relative overflow-hidden bg-[#f4f6ee] pt-10 sm:pt-12 lg:pt-12 pb-12 sm:pb-14"
    >
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* DESKTOP CIRCULAR ARC (Visible on lg+ screens)                             */}
        {/* ========================================================================= */}
        <div
          ref={containerRef}
          className="relative hidden lg:block w-full max-h-[580px] aspect-[1320/580] select-none"
        >
          <div
            className="absolute left-1/2 top-0 w-[1320px] h-[580px] -translate-x-1/2 origin-top"
            style={{ transform: `scale(${scale})` }}
          >
            {/* Radial Gauge Tick Marks SVG Layer */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-full z-0"
              viewBox="0 0 1320 580"
              fill="none"
            >
              {/* Left Arc Radial Ticks */}
              {Array.from({ length: 18 }).map((_, i) => {
                const deg = -76 + i * 1.6;
                const rad = (deg * Math.PI) / 180;
                const x1 = 660 + 630 * Math.sin(rad);
                const y1 = centerY - 630 * Math.cos(rad);
                const x2 = 660 + 665 * Math.sin(rad);
                const y2 = centerY - 665 * Math.cos(rad);
                return (
                  <line
                    key={`left-tick-${deg}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#cfd8c4"
                    strokeWidth={i % 2 === 0 ? "2" : "1.2"}
                    strokeLinecap="round"
                    opacity={0.35 + (i / 18) * 0.5}
                  />
                );
              })}

              {/* Right Arc Radial Ticks */}
              {Array.from({ length: 18 }).map((_, i) => {
                const deg = 48 + i * 1.6;
                const rad = (deg * Math.PI) / 180;
                const x1 = 660 + 630 * Math.sin(rad);
                const y1 = centerY - 630 * Math.cos(rad);
                const x2 = 660 + 665 * Math.sin(rad);
                const y2 = centerY - 665 * Math.cos(rad);
                return (
                  <line
                    key={`right-tick-${deg}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#cfd8c4"
                    strokeWidth={i % 2 === 0 ? "2" : "1.2"}
                    strokeLinecap="round"
                    opacity={0.85 - (i / 18) * 0.5}
                  />
                );
              })}

              {/* Subtle Dashed Outer & Inner Arc Lines */}
              <path
                d="M 170 340 A 660 660 0 0 1 1150 340"
                stroke="#cbd6be"
                strokeWidth="1.2"
                strokeDasharray="5 5"
                className="opacity-40"
              />
              <path
                d="M 200 360 A 630 630 0 0 1 1120 360"
                stroke="#cbd6be"
                strokeWidth="1"
                strokeDasharray="3 3"
                className="opacity-30"
              />
            </svg>

            {/* 9 Tangential Project Cards along the Arc */}
            <div className="absolute inset-0 z-10">
              {arcCards.map((card, index) => {
                return (
                  <div
                    key={card.id}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="absolute left-1/2 top-[780px] -ml-[69px] -mt-[98px] w-[138px] h-[196px] group"
                    style={{
                      transform: `rotate(${card.angle}deg) translateY(-${radius}px)`,
                      transformOrigin: "center center",
                    }}
                  >
                    <Link
                      href="/gallery"
                      aria-label={`View ${card.title}`}
                      className="relative block size-full overflow-hidden rounded-2xl bg-white shadow-card border-[3px] border-white transition-all duration-300 group-hover:scale-108 group-hover:shadow-2xl group-hover:border-brand-primary/50 group-hover:z-30 cursor-pointer"
                    >
                      <Image
                        src={card.src}
                        alt={card.title}
                        fill
                        sizes="180px"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Gradient Overlay with Category & Title tooltip on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 text-white">
                        <span className="text-[0.62rem] uppercase tracking-wider text-brand-accent font-semibold">
                          {card.category}
                        </span>
                        <p className="text-xs font-bold leading-tight line-clamp-2 text-white">
                          {card.title}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Center Content Inside the Arc */}
            <div className="absolute inset-x-0 top-[242px] z-20 flex flex-col items-center text-center px-4">
              {/* Tag Pill */}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-line/80 bg-white/90 backdrop-blur-xs px-3.5 py-1 text-xs font-semibold text-brand-dark shadow-xs mb-3">
                <Sparkles className="size-3.5 text-brand-primary" />
                About SKI Construction
              </span>

              {/* Main Headline */}
              <h2
                id="arc-heading"
                className="text-2xl sm:text-3xl lg:text-[2.35rem] font-extrabold uppercase tracking-tight text-brand-ink leading-[1.12] max-w-xl mb-3"
              >
                <span>BUILDING HOMES WITH</span>{" "}
                <span className="block">
                  CARE, CLARITY AND <span className="text-brand-primary">CRAFT</span>
                </span>
              </h2>

              {/* Subtext Paragraph */}
              <p className="text-xs sm:text-sm leading-relaxed text-brand-muted max-w-md mb-5">
                SKI Construction is a design-and-build team from Kinathukadavu, Coimbatore. We listen first, design in 3D,
                quote every item clearly and build with updates you can see.
              </p>

              {/* Lime Pill CTA Button */}
              <Link
                href="/services"
                className="group inline-flex items-center gap-3 rounded-full bg-[#84cc16] hover:bg-[#74b810] pl-5 pr-2 py-1.5 text-sm font-bold text-[#142310] shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <span>What we do</span>
                <span className="flex size-7 items-center justify-center rounded-full bg-[#1b2a1a] text-white transition-transform duration-300 group-hover:translate-x-0.5">
                  <ChevronRight className="size-4" strokeWidth={2.8} />
                </span>
              </Link>

              {/* Center Dial Indicator Dot on Arc Track */}
              <div className="mt-5 flex items-center justify-center">
                <div className="size-4 rounded-full border-2 border-brand-ink/80 bg-white flex items-center justify-center shadow-xs">
                  <div className="size-1.5 rounded-full bg-brand-ink" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET RESPONSIVE CAROUSEL (< lg screens)                        */}
        {/* ========================================================================= */}
        <div className="lg:hidden flex flex-col items-center text-center">
          {/* Tag Pill */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-line/80 bg-white px-3.5 py-1 text-xs font-semibold text-brand-dark shadow-xs mb-3">
            <Sparkles className="size-3.5 text-brand-primary" />
            About SKI Construction
          </span>

          {/* Headline */}
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-brand-ink leading-tight max-w-md mb-3">
            <span>BUILDING HOMES WITH</span>{" "}
            <span className="block">
              CARE, CLARITY AND <span className="text-brand-primary">CRAFT</span>
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-sm leading-relaxed text-brand-muted max-w-sm mb-6">
            SKI Construction is a design-and-build team from Kinathukadavu, Coimbatore. We listen first, design in 3D,
            quote every item clearly and build with updates you can see.
          </p>

          {/* Mobile Horizontal Swipeable Cards Ribbon */}
          <div className="w-full overflow-x-auto overscroll-x-contain no-scrollbar py-4 -mx-4 px-4 flex gap-4 snap-x snap-mandatory">
            {arcCards.map((card, idx) => (
              <div
                key={`${card.id}-mobile`}
                className="shrink-0 w-[160px] h-[220px] rounded-2xl overflow-hidden bg-white shadow-card border-2 border-white snap-center relative"
              >
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  sizes="160px"
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5 text-white">
                  <span className="text-[0.6rem] font-bold text-brand-accent uppercase">
                    {card.category}
                  </span>
                  <p className="text-xs font-bold leading-tight line-clamp-1">{card.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="mt-6 mb-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 rounded-full bg-[#84cc16] hover:bg-[#74b810] pl-6 pr-2 py-2 text-sm font-bold text-[#142310] shadow-md"
            >
              <span>What we do</span>
              <span className="flex size-7 items-center justify-center rounded-full bg-[#1b2a1a] text-white">
                <ChevronRight className="size-4" strokeWidth={2.8} />
              </span>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM 4-COLUMN VALUE PILLARS                                             */}
        {/* ========================================================================= */}
        <Container className="pt-2 sm:pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 border-t border-brand-line/60 pt-6 sm:pt-8">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="flex flex-col gap-1.5 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-brand-ink">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-brand-muted">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
