"use client";

import { useEffect, useRef } from "react";
import { Building2, Calendar, MapPin, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import type { Stat } from "@/data/types";

interface StatItem {
  value: string;
  number?: number;
  suffix?: string;
  label: string;
  icon: typeof Calendar;
}

const statsData: StatItem[] = [
  {
    value: "10+",
    number: 10,
    suffix: "+",
    label: "Years of Experience",
    icon: Calendar,
  },
  {
    value: "100+",
    number: 100,
    suffix: "+",
    label: "Projects Completed",
    icon: Building2,
  },
  {
    value: "500+",
    number: 500,
    suffix: "+",
    label: "Happy Clients",
    icon: Users,
  },
  {
    value: "Coimbatore",
    label: "Our Base",
    icon: MapPin,
  },
];

/**
 * Company Highlights Statistics Band
 * Standardized across both Homepage and About page for visual and data consistency.
 */
export function StatisticsBand({ items }: { items?: readonly Stat[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate stat items entrance
      gsap.from(containerRef.current?.querySelectorAll(".stat-col") ?? [], {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
      });

      // Animate counter values
      const counters = containerRef.current?.querySelectorAll(".counter-value") ?? [];
      counters.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-target") ?? "0");
        if (target > 0) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
            },
            onUpdate: () => {
              el.textContent = Math.floor(obj.val).toString();
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      aria-label="Company statistics"
      ref={containerRef}
      className="border-y border-brand-line bg-brand-soft/60 py-8 sm:py-10"
    >
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-6 sm:gap-8">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            const isLast = idx === statsData.length - 1;

            return (
              <div
                key={stat.label}
                className={`stat-col min-w-0 flex flex-col items-center text-center gap-3 px-2 lg:flex-row lg:items-center lg:justify-start lg:gap-3 lg:px-2 xl:gap-4 xl:px-4 lg:text-left ${
                  !isLast ? "md:border-r md:border-brand-line" : ""
                }`}
              >
                {/* Brand Green Outline Icon */}
                <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-white border border-brand-primary/25 shadow-xs text-brand-primary">
                  <Icon className="size-6 sm:size-7" strokeWidth={1.8} />
                </div>

                {/* Content */}
                <div className="flex min-w-0 flex-col items-center lg:items-start">
                  <div className="flex flex-wrap items-baseline text-2xl xl:text-[2rem] font-extrabold tracking-tight text-brand-dark leading-none">
                    {stat.number !== undefined ? (
                      <>
                        <span className="counter-value" data-target={stat.number}>
                          {stat.number}
                        </span>
                        <span>{stat.suffix}</span>
                      </>
                    ) : (
                      <span>{stat.value}</span>
                    )}
                  </div>
                  <span className="text-xs sm:text-sm text-brand-muted font-medium mt-1">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
