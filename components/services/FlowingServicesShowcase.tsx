"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Box,
  Building2,
  Calculator,
  ClipboardCheck,
  Compass,
  FileCheck2,
  Handshake,
  Home,
  Users,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/services";
import type { ServiceSlug, Service } from "@/data/types";

const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  "building-construction": Building2,
  "3d-elevation-design": Box,
  "construction-consulting": Users,
  "bank-loan-estimate": Calculator,
  "lbs-plan-approval": FileCheck2,
  "dtcp-lpa-approval": ClipboardCheck,
  "vastu-plan": Compass,
  "real-estate": Home,
  "property-buying-selling": Handshake,
};

function ServiceCard({ service }: { service?: Service }) {
  if (!service || !service.slug) return null;
  const Icon = serviceIcons[service.slug] ?? Building2;

  return (
    <div className="group flex flex-col pb-6">
      <Link
        href={`/services/${service.slug}`}
        className="flex flex-col focus:outline-none"
      >
        {/* Upper Rounded Image */}
        <div className="relative h-[230px] sm:h-[260px] lg:h-[270px] w-full overflow-hidden rounded-3xl bg-brand-soft border border-brand-line/70 shadow-sm">
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
          />
        </div>

        {/* Floating Overlapping White Card (Signature layout from reference) */}
        <div className="-mt-12 mx-4 sm:mx-5 relative z-10 flex items-center justify-between gap-4 rounded-2xl bg-white p-5 sm:p-5.5 shadow-card border border-brand-line/80 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:border-brand-primary/40">
          {/* Left Side: Title & Read More */}
          <div className="flex flex-col min-w-0 pr-2">
            <h3 className="text-base sm:text-lg font-bold text-brand-dark group-hover:text-brand-primary transition-colors leading-snug line-clamp-2">
              {service.name}
            </h3>

            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-muted group-hover:text-brand-primary transition-colors mt-2">
              <ArrowUpRight className="size-4 text-brand-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span>Read More</span>
            </span>
          </div>

          {/* Right Side: Tinted Icon Box */}
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#fdf5eb] text-[#d4832a] border border-[#fae2c8] shadow-xs transition-all duration-300 group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary">
            <Icon className="size-6 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.8} />
          </div>
        </div>
      </Link>
    </div>
  );
}

/**
 * Flowing Services Showcase Component
 * - Left column cards flow UP continuously (infinite smooth marquee)
 * - Right column cards flow DOWN continuously (infinite smooth marquee)
 * - Center column flows in harmonized cadence
 * - Hover any column or card to pause
 */
export function FlowingServicesShowcase() {
  const [isPaused, setIsPaused] = useState(false);

  // Split 8 verified services across 3 balanced columns with 3 cards each for seamless looping
  const col1: Service[] = [services[0], services[3], services[6]].filter((s): s is Service => Boolean(s));
  const col2: Service[] = [services[1], services[4], services[7]].filter((s): s is Service => Boolean(s));
  const col3: Service[] = [services[2], services[5], services[0]].filter((s): s is Service => Boolean(s));

  // Duplicate each column array so the -50% CSS keyframe loops infinitely without gaps
  const col1Doubled = [...col1, ...col1];
  const col2Doubled = [...col2, ...col2];
  const col3Doubled = [...col3, ...col3];

  return (
    <div
      className="flowing-showcase-container relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Status Pill: Explains the live motion & dynamic pause state */}
      <div className="flex justify-center mb-6">
        <span
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono font-semibold shadow-xs transition-colors duration-200 ${
            isPaused
              ? "bg-amber-500/10 border-amber-500/30 text-amber-800"
              : "bg-brand-soft border-brand-line text-brand-primary"
          }`}
        >
          <span className="relative flex size-2">
            {isPaused ? (
              <span className="relative inline-flex rounded-full size-2 bg-amber-500" />
            ) : (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
              </>
            )}
          </span>
          <span>
            {isPaused
              ? "Flow Paused · Click any card to explore"
              : "Live Flow Showcase · Hover any card to pause"}
          </span>
        </span>
      </div>

      {/* Main Flowing Viewport Window */}
      <div className="relative h-[720px] sm:h-[800px] lg:h-[860px] overflow-hidden rounded-3xl">
        {/* Top Gradient Fade Overlay for seamless infinite transition */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#fcfdfa] via-[#fcfdfa]/80 to-transparent z-20"
        />

        {/* Bottom Gradient Fade Overlay for seamless infinite transition */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#fcfdfa] via-[#fcfdfa]/80 to-transparent z-20"
        />

        {/* 3-Column Flowing Grid with Guaranteed Pause on Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-8 xl:gap-10 h-full">
          {/* =====================================================
              COLUMN 1 (LEFT): FLOWS UP (Smooth 30s Pace)
             ===================================================== */}
          <div className="flowing-showcase-column overflow-hidden h-full">
            <div
              className="flex flex-col animate-flow-col-1 will-change-transform"
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {col1Doubled.map((service, idx) => (
                <ServiceCard key={`col1-${service.slug}-${idx}`} service={service} />
              ))}
            </div>
          </div>

          {/* =====================================================
              COLUMN 2 (CENTER): FLOWS DOWN (Dynamic 24s Counter-Pace)
             ===================================================== */}
          <div className="flowing-showcase-column overflow-hidden h-full hidden md:block">
            <div
              className="flex flex-col animate-flow-col-2 will-change-transform pt-8"
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {col2Doubled.map((service, idx) => (
                <ServiceCard key={`col2-${service.slug}-${idx}`} service={service} />
              ))}
            </div>
          </div>

          {/* =====================================================
              COLUMN 3 (RIGHT): FLOWS UP (Gentle 38s Staggered Pace)
             ===================================================== */}
          <div className="flowing-showcase-column overflow-hidden h-full hidden lg:block">
            <div
              className="flex flex-col animate-flow-col-3 will-change-transform pt-16"
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {col3Doubled.map((service, idx) => (
                <ServiceCard key={`col3-${service.slug}-${idx}`} service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
