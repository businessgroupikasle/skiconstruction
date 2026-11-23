"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  PhoneCall,
  Layers,
  FileSpreadsheet,
  HardHat,
  Key,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

const journeySteps = [
  {
    step: "01",
    phase: "Phase 01 • Consultation",
    title: "Talk to us",
    tagline: "Understanding Your Dream & Plot Inspection",
    description:
      "Share your plot, lifestyle needs and budget. Er. Satheeshkumar visits the site in person, tests soil conditions, inspects terrain, and listens carefully to your family's requirements.",
    deliverable: "In-Person Site Survey & Soil Test",
    timeline: "Days 1–3",
    image: "/images/journey/step-1-consultation.jpg",
    icon: PhoneCall,
    points: [
      "On-site soil & slope evaluation",
      "Lifestyle & budget alignment",
      "Vastu orientation study",
    ],
  },
  {
    step: "02",
    phase: "Phase 02 • Architecture",
    title: "Design in 3D",
    tagline: "Photorealistic 3D & Floor Planning",
    description:
      "Floor plans and elevations rendered in photorealistic 3D, shaped to your daily living patterns, Vastu principles, and adjusted collaboratively until it feels authentically yours.",
    deliverable: "3D Elevation & BIM Blueprint",
    timeline: "Weeks 1–2",
    image: "/images/journey/step-2-3d-design.jpg",
    icon: Layers,
    points: [
      "Photorealistic exterior 3D view",
      "Detailed architectural floor plans",
      "Structural stability modeling",
    ],
  },
  {
    step: "03",
    phase: "Phase 03 • Transparency",
    title: "Clear quotation",
    tagline: "Itemised BOQ with Zero Hidden Costs",
    description:
      "Every single material, brand specification, statutory fee, and stage-wise payment milestone is itemised clearly with zero hidden surprises or sudden price escalations.",
    deliverable: "Fixed Itemised BOQ Quote",
    timeline: "Pre-construction",
    image: "/images/journey/step-3-quotation.jpg",
    icon: FileSpreadsheet,
    points: [
      "Item-by-item material specifications",
      "Stage-wise payment roadmap",
      "Zero cost escalation guarantee",
    ],
  },
  {
    step: "04",
    phase: "Phase 04 • Execution",
    title: "Build & follow live",
    tagline: "Direct Engineer Site Supervision",
    description:
      "Construction begins under Registered LBS Engineer Satheeshkumar's direct on-site supervision. Receive weekly photo and video progress updates, cube test results, and milestone logs.",
    deliverable: "Live Updates & Quality Checks",
    timeline: "Milestone-based",
    image: "/images/journey/step-4-construction.jpg",
    icon: HardHat,
    points: [
      "Daily on-site engineer oversight",
      "Certified concrete cube testing",
      "Regular WhatsApp progress photos",
    ],
  },
  {
    step: "05",
    phase: "Phase 05 • Milestone",
    title: "Handover",
    tagline: "Key Ceremony & Structural Warranty",
    description:
      "Rigorous 100-point quality audit, finishing touches, and the ceremonial keys to your dream home delivered on time, backed by comprehensive warranty documentation.",
    deliverable: "Keys & Structural Warranty",
    timeline: "On-time delivery",
    image: "/images/journey/step-5-handover.jpg",
    icon: Key,
    points: [
      "100-point inspection checklist",
      "Ceremonial keys handover",
      "Structural warranty documents",
    ],
  },
] as const;

/**
 * Creative & Animated 5-Step Customer Journey Section
 * Responsive expanding luxury accordion card slider with real architectural imagery,
 * identical design on both mobile and desktop views, smooth spring physics and guaranteed visibility.
 */
export function HomeJourneySection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollCardIntoContainer = (idx: number) => {
    const container = cardContainerRef.current;
    const el = cardItemRefs.current[idx];
    if (container && el && typeof window !== "undefined" && window.innerWidth < 1024) {
      const scrollLeft = el.offsetLeft - container.offsetLeft - 16;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
    }
  };

  const handleSelectStep = (idx: number) => {
    setActiveStep(idx);
    scrollCardIntoContainer(idx);
  };

  // Auto-advance through the steps every 6s unless paused by user interaction
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % journeySteps.length;
        scrollCardIntoContainer(next);
        return next;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      id="how-we-work"
      aria-labelledby="journey-heading"
      className="relative bg-gradient-to-b from-[#f9fbf6] via-[#f3f7ef] to-[#f9fbf6] py-14 sm:py-20 lg:py-24 overflow-hidden border-t border-brand-line/50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Architectural Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-35 select-none"
        style={{
          backgroundImage: "radial-gradient(#367c08 0.75px, transparent 0.75px)",
          backgroundSize: "28px 28px",
        }}
      />

      <Container className="relative">
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center text-center gap-3 mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-accent/40 bg-white px-4 py-1.5 text-xs font-bold text-brand-dark shadow-xs uppercase tracking-wider">
            <Compass className="size-3.5 text-brand-primary" />
            How We Work • 5-Step Process
          </span>

          <h2
            id="journey-heading"
            className="text-2xl xs:text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold uppercase tracking-tight text-brand-ink leading-[1.12] max-w-2xl"
          >
            <span>YOUR JOURNEY TO A</span>{" "}
            <span className="block">
              NEW HOME <span className="text-brand-gradient">STARTS HERE</span>
            </span>
          </h2>

          <p className="text-xs sm:text-base text-brand-muted max-w-xl leading-relaxed">
            From initial site inspection to final key handover, experience a transparent, engineer-led process with zero hidden costs.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* UNIFIED EXPANDING ACCORDION CARDS (Same Design on Mobile & Desktop)       */}
        {/* ========================================================================= */}
        <div
          ref={cardContainerRef}
          className="flex gap-3 sm:gap-4 w-full h-[460px] sm:h-[480px] overflow-x-auto overscroll-x-contain lg:overflow-visible no-scrollbar py-2 -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory"
        >
          {journeySteps.map((item, idx) => {
            const isActive = idx === activeStep;
            const StepIcon = item.icon;

            return (
              <div
                key={item.step}
                ref={(el) => {
                  cardItemRefs.current[idx] = el;
                }}
                onClick={() => handleSelectStep(idx)}
                onMouseEnter={() => handleSelectStep(idx)}
                className={`relative rounded-3xl overflow-hidden border transition-all duration-500 ease-out cursor-pointer snap-center shrink-0 lg:shrink ${
                  isActive
                    ? "w-[85vw] max-w-[480px] lg:max-w-none lg:w-auto lg:flex-[3.5] border-brand-primary/80 shadow-2xl ring-2 ring-brand-primary/25"
                    : "w-[86px] sm:w-[110px] lg:w-auto lg:flex-1 border-brand-line/80 shadow-soft hover:flex-[1.2] hover:border-brand-primary/40"
                }`}
              >
                {/* Real High-Resolution Photo Background */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 85vw"
                  className="size-full object-cover object-center transition-transform duration-700"
                />

                {/* Dark Vignette Gradient Overlays */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? "bg-gradient-to-t from-black/95 via-black/60 to-black/35"
                      : "bg-black/70 hover:bg-black/55"
                  }`}
                />

                {/* =============================================================== */}
                {/* INACTIVE STATE: Sleek Vertical Strip                            */}
                {/* =============================================================== */}
                {!isActive && (
                  <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-between items-center text-white z-10 select-none">
                    {/* Step Number Badge */}
                    <span className="flex size-9 sm:size-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-xs sm:text-sm font-black text-white shadow-md">
                      {item.step}
                    </span>

                    {/* Vertical Step Title */}
                    <div className="[writing-mode:vertical-rl] rotate-180 flex items-center gap-3">
                      <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-white/90">
                        {item.title}
                      </span>
                    </div>

                    {/* Mini Icon */}
                    <span className="flex size-8 sm:size-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-xs text-brand-accent">
                      <StepIcon className="size-4" />
                    </span>
                  </div>
                )}

                {/* =============================================================== */}
                {/* ACTIVE STATE: Rich Cinematic Editorial Content                  */}
                {/* =============================================================== */}
                {isActive && (
                  <div className="absolute inset-0 p-5 sm:p-7 lg:p-8 flex flex-col justify-between text-white z-20 animate-fadeIn">
                    {/* Top Row: Phase Tag & Timeline Badge */}
                    <div className="flex items-center justify-between gap-2 sm:gap-3">
                      <div className="flex items-center gap-2">
                        <span className="flex size-9 sm:size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#65b516] to-[#367c08] text-xs sm:text-sm font-black text-white shadow-md ring-4 ring-white/20">
                          {item.step}
                        </span>
                        <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-2.5 sm:px-3.5 py-1 text-[0.68rem] sm:text-xs font-bold text-white uppercase tracking-wider">
                          <Sparkles className="size-2.5 sm:size-3 text-brand-accent" />
                          {item.phase}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-md px-2.5 sm:px-3 py-1 text-[0.68rem] sm:text-xs font-bold text-white border border-white/20 shrink-0">
                        <Clock className="size-2.5 sm:size-3 text-brand-accent" />
                        {item.timeline}
                      </span>
                    </div>

                    {/* Center Content: Title, Tagline & Description */}
                    <div className="my-auto max-w-xl py-2">
                      <h3 className="text-xl sm:text-3xl lg:text-[2.2rem] font-black tracking-tight text-white mb-1 sm:mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#84cc16] mb-2 sm:mb-3">
                        {item.tagline}
                      </p>
                      <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal mb-3 sm:mb-5 line-clamp-3 sm:line-clamp-none">
                        {item.description}
                      </p>

                      {/* 3 Key Deliverable Checkmarks */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 pt-2 sm:pt-3 border-t border-white/20">
                        {item.points.map((pt) => (
                          <div key={pt} className="flex items-start gap-1.5 text-[0.72rem] sm:text-xs text-white/90">
                            <CheckCircle2 className="size-3.5 text-[#84cc16] shrink-0 mt-0.5" />
                            <span className="leading-tight font-medium">{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet Next & Prev Controls */}
        <div className="lg:hidden flex items-center justify-between mt-3 px-2">
          <div className="flex items-center gap-1.5">
            {journeySteps.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectStep(i)}
                aria-label={`Jump to step ${i + 1}`}
                className="group flex size-6 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === activeStep ? "w-6 bg-brand-primary" : "w-1.5 bg-brand-line group-hover:bg-brand-primary/50"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous step"
              onClick={() => handleSelectStep((activeStep - 1 + journeySteps.length) % journeySteps.length)}
              className="flex size-8 items-center justify-center rounded-full bg-white border border-brand-line text-brand-dark shadow-xs hover:bg-brand-soft"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next step"
              onClick={() => handleSelectStep((activeStep + 1) % journeySteps.length)}
              className="flex size-8 items-center justify-center rounded-full bg-white border border-brand-line text-brand-dark shadow-xs hover:bg-brand-soft"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

      </Container>
    </section>
  );
}
