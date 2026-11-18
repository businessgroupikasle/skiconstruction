"use client";

import { useEffect, useRef } from "react";
import { Award, Handshake, HardHat, Leaf, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";

const valuesData = [
  {
    title: "Quality",
    subtitle: "First",
    icon: Award,
  },
  {
    title: "Integrity &",
    subtitle: "Transparency",
    icon: Handshake,
  },
  {
    title: "Customer",
    subtitle: "Centric",
    icon: Users,
  },
  {
    title: "Safety",
    subtitle: "Always",
    icon: HardHat,
  },
  {
    title: "Sustainable",
    subtitle: "Construction",
    icon: Leaf,
  },
] as const;

export function CoreValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(itemsRef.current?.querySelectorAll(".value-item") ?? [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="values-heading"
      className="relative bg-white pt-14 sm:pt-20 pb-24 sm:pb-32 overflow-hidden"
    >
      <Container className="relative z-10">
        {/* Section Heading with brand green horizontal accent lines */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
          <span className="h-[2px] w-10 sm:w-16 bg-brand-accent" />
          <h2
            id="values-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-dark text-center"
          >
            Our <span className="text-brand-primary">Core Values</span>
          </h2>
          <span className="h-[2px] w-10 sm:w-16 bg-brand-accent" />
        </div>

        {/* 5 Horizontally Aligned Value Items */}
        <div
          ref={itemsRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-0"
        >
          {valuesData.map((val, idx) => {
            const Icon = val.icon;
            const isLast = idx === valuesData.length - 1;

            return (
              <div
                key={val.subtitle}
                className={`value-item flex flex-col items-center text-center px-4 py-2 ${
                  !isLast ? "lg:border-r lg:border-brand-line" : ""
                }`}
              >
                {/* Large Elegant Brand Green Outline Icon */}
                <div className="flex size-16 sm:size-18 items-center justify-center text-brand-primary mb-3 transition-transform duration-300 hover:scale-110">
                  <Icon className="size-10 sm:size-12" strokeWidth={1.6} />
                </div>

                {/* Title */}
                <div className="text-sm sm:text-base font-bold text-brand-dark leading-tight">
                  <p>{val.title}</p>
                  <p>{val.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* Decorative Deep-Green and Accent-Green Curved Wave Footer Transition */}
      <div className="absolute bottom-0 inset-x-0 z-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-20 lg:h-24"
        >
          {/* Brand Accent Green Underline Curve */}
          <path
            d="M0,90 Q720,-10 1440,90 L1440,90 L0,90 Z"
            fill="#65b516"
            className="opacity-90"
          />
          {/* Deep Forest-Green Main Wave */}
          <path
            d="M0,90 Q720,10 1440,90 L1440,90 L0,90 Z"
            fill="#153d16"
          />
        </svg>
      </div>
    </section>
  );
}

