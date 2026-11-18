"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";

export function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const centerColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Left image card entrance
      gsap.from(leftColRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
      });

      // Center text entrance
      gsap.from(centerColRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        ease: "power2.out",
      });

      // Right wireframe sketch subtle fade-in
      gsap.from(rightColRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        x: 40,
        opacity: 0,
        duration: 1.1,
        delay: 0.25,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="who-we-are-heading"
      className="relative bg-white pt-10 sm:pt-14 pb-14 sm:pb-20 overflow-hidden"
    >
      <Container className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr_0.8fr] lg:gap-10">
          {/* Left Column: Image with signature brand green top-left swoosh curve */}
          <div ref={leftColRef} className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Signature Brand Green Corner Swoosh / Frame Accent */}
            <div className="absolute -top-3.5 -left-3.5 z-20 pointer-events-none">
              <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
                <path
                  d="M0,45 C0,15 15,0 45,0 L15,0 C5,0 0,5 0,15 Z"
                  fill="url(#green-gradient-who)"
                />
                <defs>
                  <linearGradient id="green-gradient-who" x1="0" y1="0" x2="90" y2="90" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#65b516" />
                    <stop offset="0.6" stopColor="#367c08" />
                    <stop offset="1" stopColor="#153d16" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Main Rounded Frame */}
            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden rounded-3xl border border-brand-line/60 bg-brand-soft shadow-card">
              <Image
                src="/images/about/ref/helmet-blueprint.png"
                alt="White SKI Construction safety helmet, rolled blueprints and unfinished building at sunset"
                fill
                sizes="(min-width: 1024px) 35vw, (min-width: 640px) 70vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Center Column: Text Description */}
          <div ref={centerColRef} className="flex flex-col gap-4 text-left">
            <h2
              id="who-we-are-heading"
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-brand-dark leading-tight"
            >
              Who We <span className="text-brand-primary">Are</span>
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-brand-muted font-normal">
              SKI Construction is a Coimbatore-based construction and engineering company, known for high-quality
              construction, reliable consulting and end-to-end plan approval support. We design and build homes,
              commercial spaces and real estate assets that are functional, aesthetic and built to last.
            </p>
          </div>

          {/* Right Column: Modern 3D Architectural Building Render */}
          <div
            ref={rightColRef}
            className="hidden md:flex justify-center lg:justify-end items-center select-none"
          >
            <div className="relative w-[230px] sm:w-[270px] lg:w-[310px] aspect-[1000/1135] overflow-hidden transition-transform duration-500 hover:scale-105">
              <Image
                src="/images/cutouts/building-transparent-2.png"
                alt="SKI Construction Modern 3D Architectural Building"
                fill
                sizes="(min-width: 1024px) 310px, 270px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

