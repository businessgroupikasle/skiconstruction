"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, HardHat, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GreenCTAButton } from "@/components/ui/GreenCTAButton";
import { usePrefersReducedMotion } from "@/lib/hooks";

gsap.registerPlugin(ScrollTrigger);

/**
 * Full-width Panoramic Hero Banner featuring the official architectural reference image:
 * D:\Project\skiconstruction\public\images\hero\banner1.png
 *
 * Designed with a compact frosted-glass editorial card on the left so that
 * the entire building, luxury villa facade, concrete framework, and drafting table
 * in banner1.png remain 100% visible, bright, and unobstructed.
 */
export function ArchitecturalHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const context = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.1,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        onUpdate: (self) => {
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${self.progress.toFixed(4)})`;
          }
        },
      });
    }, section);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[640px] lg:h-screen lg:max-h-[760px] xl:max-h-[820px] flex items-center overflow-hidden bg-brand-soft"
    >
      {/* Full-Width Background Architectural Image - Clean, bright, unobstructed */}
      <div className="absolute inset-0 -z-10 select-none">
        <Image
          src="/images/hero/banner1.png"
          alt="SKI Construction - Luxury Villa Architecture and Structural Engineering"
          fill
          priority
          sizes="100vw"
          quality={95}
          className="object-cover object-[75%_center] md:object-[70%_center] lg:object-[82%_center] xl:object-[75%_center] 2xl:object-center"
        />

        {/* Soft natural light gradient on the far left to keep text 100% crisp without any card container */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-full sm:w-[60%] lg:w-[44%] xl:w-[40%] bg-gradient-to-r from-white/95 via-white/50 to-transparent pointer-events-none"
        />

        {/* Minimal ambient gradient at the bottom for depth */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"
        />
      </div>

      <Container className="relative z-10 pt-[calc(var(--header-height,76px)+1.5rem)] sm:pt-[calc(var(--header-height,76px)+2.5rem)] pb-8 sm:pb-12 lg:pb-14">
        {/* Editorial Text directly on the banner (Left-aligned, NO card box, leaving the villa & structure in full view) */}
        <div className="hero-reveal w-full max-w-[390px] sm:max-w-[420px] lg:max-w-[420px] xl:max-w-[460px] flex flex-col gap-3.5 sm:gap-4 lg:gap-3.5 xl:gap-4">
          {/* Eyebrow & Credential Badge */}
          <div className="flex flex-wrap items-center gap-2">
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
            className="text-[1.7rem] xs:text-[1.95rem] sm:text-[2.25rem] lg:text-[2.2rem] xl:text-[2.65rem] leading-[1.08] font-extrabold tracking-tight text-brand-ink drop-shadow-xs"
          >
            <span className="block">WE DON&apos;T JUST</span>
            <span className="block">BUILD STRUCTURES.</span>
            <span className="text-brand-gradient block">WE BUILD YOUR FUTURE.</span>
          </h1>

          {/* Brand Tagline Divider */}
          <div className="flex items-center gap-2.5" aria-hidden="true">
            <span className="h-0.5 w-8 bg-brand-primary" />
            <span className="text-[0.68rem] sm:text-[0.72rem] font-extrabold tracking-[0.28em] text-brand-primary uppercase">
              BUILD WITH QUALITY
            </span>
            <span className="h-px flex-1 max-w-[120px] bg-brand-line" />
          </div>

          {/* Lead Paragraph */}
          <p className="text-[0.88rem] sm:text-[0.96rem] lg:text-[0.92rem] xl:text-[0.98rem] leading-relaxed text-brand-dark/90 font-medium">
            From concept 3D elevations and statutory DTCP/LBS approvals to bank-ready estimates and turnkey construction, we deliver end-to-end building excellence across Coimbatore and Kinathukadavu.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <GreenCTAButton href="/services" size="md">
              Explore Our Services
            </GreenCTAButton>
            <GreenCTAButton href="/contact" variant="outline" size="md" icon="none" className="bg-white/80 backdrop-blur-xs">
              <PhoneCall aria-hidden="true" className="size-3.5 text-brand-primary" />
              Get a Free Quote
            </GreenCTAButton>
          </div>
        </div>
      </Container>

      {/* Bottom Scroll Progress Bar */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-black/10">
        <span ref={progressBarRef} className="block h-full origin-left scale-x-0 bg-brand-primary" />
      </div>
    </section>
  );
}