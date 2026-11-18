"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user's reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // Animate text content
      gsap.from(textRef.current?.querySelectorAll(".animate-item") ?? [], {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Animate villa image with subtle scale and reveal
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scale: 1.08,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="About Hero"
      className="relative w-full overflow-hidden bg-brand-dark"
    >
      {/* Background split layout */}
      <div className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] w-full">
        {/* Right Villa Image */}
        <div
          ref={imageRef}
          className="absolute inset-y-0 right-0 w-full lg:w-[65%] h-full overflow-hidden z-0"
        >
          <Image
            src="/images/about/ref/hero-villa.png"
            alt="Luxury two-storey modern villa with warm architectural illumination"
            fill
            priority
            sizes="(min-width: 1024px) 65vw, 100vw"
            className="object-cover object-center"
          />
          {/* Subtle warm gradient overlay to match reference lighting */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        </div>

        {/* Left Deep Forest-Green Angled Panel */}
        <div
          className="absolute inset-y-0 left-0 w-full lg:w-[52%] z-10 bg-gradient-to-r from-[#072014] via-brand-dark to-[#12442a] lg:[clip-path:polygon(0_0,100%_0,84%_100%,0_100%)] opacity-95 lg:opacity-100"
        >
          {/* Soft ambient radial highlight */}
          <div className="absolute -left-20 -top-20 size-96 rounded-full bg-brand-primary/20 blur-3xl pointer-events-none" />
        </div>

        {/* Content Container */}
        <Container className="relative z-20 flex min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] items-center pt-8 pb-20">
          <div ref={textRef} className="max-w-xl py-8 text-white">
            {/* Eyebrow with green accent line */}
            <div className="animate-item flex items-center gap-3 mb-4">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-accent">
                About Us
              </span>
              <span className="h-[2px] w-12 sm:w-16 bg-brand-accent" />
            </div>

            {/* Main Heading with Brand Green Highlight */}
            <h1 className="animate-item font-sans text-3xl xs:text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              Building Spaces <br />
              That Add Value <br />
              <span className="text-brand-accent drop-shadow-xs">To Your Life</span>
            </h1>

            {/* Description */}
            <p className="animate-item text-sm sm:text-base leading-relaxed text-white/85 max-w-md mb-6 font-normal">
              A trusted construction and engineering partner in Coimbatore, delivering quality spaces with precision,
              transparency and care.
            </p>

            {/* Thin Green Decorative Line Beneath */}
            <div className="animate-item h-[2px] w-16 bg-brand-accent" />
          </div>
        </Container>

        {/* Sloped Organic White Curve Bottom Boundary */}
        <div className="absolute bottom-0 inset-x-0 z-30 pointer-events-none">
          <svg
            viewBox="0 0 1440 85"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-12 sm:h-16 lg:h-20 text-white"
          >
            <path
              d="M0,85 C380,85 520,30 840,45 C1160,60 1320,10 1440,0 L1440,85 L0,85 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

