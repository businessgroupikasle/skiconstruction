"use client";

import CinematicBuildingHero from "@/components/hero/CinematicBuildingHero";
import { GreenCTAButton } from "@/components/ui/GreenCTAButton";
import { ShieldCheck, HardHat, PhoneCall, CheckCircle2 } from "lucide-react";

/**
 * Integrated 20-Image Cinematic Hero Component
 * Replaces the homepage hero banner with the cinematic scroll-driven sequence
 * displaying all 20 authentic construction images with Three.js atmosphere,
 * GSAP ScrollTrigger camera effects, and original SKI Construction branding.
 */
export function ArchitecturalHero() {
  return (
    <CinematicBuildingHero>
      <div className="w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[540px] flex flex-col gap-3.5 sm:gap-4 text-white">
        {/* Eyebrow & Credential Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary px-3.5 py-1 text-[0.68rem] sm:text-xs font-bold tracking-wider text-white uppercase shadow-sm">
            <ShieldCheck className="size-3.5 text-white" />
            SKI Construction
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-3.5 py-1 text-[0.68rem] sm:text-xs font-semibold text-white border border-white/20 shadow-xs">
            <HardHat className="size-3.5 text-brand-accent" />
            Er. D. Satheeshkumar, DCE., BE.
          </span>
        </div>

        {/* Main Headline */}
        <h1
          id="hero-title"
          className="text-[1.85rem] xs:text-[2.1rem] sm:text-[2.5rem] lg:text-[2.65rem] xl:text-[3rem] leading-[1.08] font-black tracking-tight text-white drop-shadow-md"
        >
          <span className="block">WE DON&apos;T JUST</span>
          <span className="block text-white/95">BUILD STRUCTURES.</span>
          <span className="text-brand-gradient block">WE BUILD YOUR FUTURE.</span>
        </h1>

        {/* Brand Tagline Divider */}
        <div className="flex items-center gap-2.5" aria-hidden="true">
          <span className="h-0.5 w-8 bg-brand-accent" />
          <span className="text-[0.68rem] sm:text-[0.74rem] font-black tracking-[0.26em] text-brand-accent uppercase">
            BUILD WITH QUALITY • COIMBATORE
          </span>
          <span className="h-px flex-1 max-w-[120px] bg-white/30" />
        </div>

        {/* Lead Paragraph */}
        <p className="text-[0.88rem] sm:text-[0.98rem] lg:text-[0.95rem] xl:text-[1.02rem] leading-relaxed text-white/90 font-medium drop-shadow-sm">
          From concept 3D elevations and statutory DTCP/LBS plan approvals to bank-ready estimates and turnkey construction, we deliver end-to-end building excellence across Kinathukadavu and Coimbatore.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <GreenCTAButton href="/services" size="md">
            Explore Our Services
          </GreenCTAButton>
          <GreenCTAButton
            href="/contact"
            variant="outline"
            size="md"
            icon="none"
            className="border-white/50 bg-black/25 text-white hover:bg-white hover:text-brand-dark backdrop-blur-xs"
          >
            <PhoneCall aria-hidden="true" className="size-3.5 text-brand-accent" />
            Get a Free Quote
          </GreenCTAButton>
        </div>

        {/* Live Engineering Trust Highlights */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/20">
          <div className="flex flex-col gap-0.5">
            <span className="text-[0.65rem] sm:text-[0.7rem] font-bold text-brand-accent uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="size-3" /> Approvals
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-white">
              100% DTCP / LBS
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[0.65rem] sm:text-[0.7rem] font-bold text-brand-accent uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="size-3" /> Supervision
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-white">
              Direct Engineer
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[0.65rem] sm:text-[0.7rem] font-bold text-brand-accent uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="size-3" /> Quotation
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-white">
              Zero Hidden Cost
            </span>
          </div>
        </div>
      </div>
    </CinematicBuildingHero>
  );
}
