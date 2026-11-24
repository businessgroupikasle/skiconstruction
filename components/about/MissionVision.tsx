"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

type TabType = "mission" | "vision" | "values";

interface TabContent {
  description: string;
  points: [string, string, string, string, string, string];
}

const tabContents: Record<TabType, TabContent> = {
  mission: {
    description:
      "SKI Construction delivers tailored architectural design, statutory plan approvals, structural consulting, and turnkey construction execution across Coimbatore. We operate with strict IS 456 engineering oversight, transparent milestone BOQ schedules, and direct on-site supervision by Registered LBS Engineer Er. D. Satheeshkumar.",
    points: [
      "Precision Structural Design",
      "IS 456 Concrete Standards",
      "Transparent Milestone BOQ",
      "Direct LBS Site Supervision",
      "Certified Primary Materials",
      "On-Time Project Handover",
    ],
  },
  vision: {
    description:
      "To be the foremost and most trusted civil engineering and construction firm in Coimbatore, recognized for architectural craftsmanship, statutory municipal compliance, 3D photorealistic elevations, and lasting generational quality for every homeowner.",
    points: [
      "Photorealistic 3D Elevations",
      "Bylaw-Compliant Blueprints",
      "DTCP & LPA Fast Approvals",
      "Sustainable Eco Methods",
      "Zero Brokerage / Direct Engineering",
      "Generational Durability",
    ],
  },
  values: {
    description:
      "Our core principles are rooted in engineering integrity, statutory transparency, and unwavering material quality. We treat every residential and commercial project as a lasting milestone, ensuring complete client peace of mind from initial soil testing to final key handover.",
    points: [
      "Structural Safety First",
      "100% Transparent Quotations",
      "No Subcontractor Dilution",
      "Strict Statutory Compliance",
      "Certified Premium Materials",
      "Direct Engineer Supervision",
    ],
  },
};

/**
 * SKI Construction Mission, Vision & Values Section
 * - Brand Theme Colors: Primary Green (#367c08), Accent Green (#65b516), Deep Forest (#0d3822)
 * - 100% Authentic Content (Zero dummy / placeholder text)
 * - Left: Eyebrow + Heading + Chamfered Project Construction Visual
 * - Right: Experience Badge Card + Folded Ribbon Tabs + 2-Column Checklist + CTA
 */
export function MissionVision() {
  const [activeTab, setActiveTab] = useState<TabType>("mission");
  const current = tabContents[activeTab];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* =======================================================
            LEFT COLUMN: Eyebrow + Heading + Chamfered Image
           ======================================================= */}
        <div className="lg:col-span-6 flex flex-col">
          {/* Eyebrow: —o MISSION VISION & VALUES in Brand Theme Green */}
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[2px] w-6 bg-brand-primary" />
            <span className="size-2 rounded-full border-2 border-brand-accent bg-white" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-primary">
              MISSION, VISION & VALUES
            </span>
          </div>

          {/* Heading in Brand Dark */}
          <h2 className="text-2xl sm:text-3xl lg:text-[2.35rem] font-extrabold text-brand-dark tracking-tight leading-[1.2] mb-6 sm:mb-8">
            We Deliver Lasting Quality Using The Best Skilled Engineering.
          </h2>

          {/* Big Photo with Diagonal Chamfered Top-Right Corner */}
          <div
            className="relative h-[340px] sm:h-[400px] lg:h-[450px] w-full overflow-hidden shadow-card rounded-2xl bg-brand-soft border border-brand-line/60"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 0 100%)",
            }}
          >
            <Image
              src="/images/services/building-construction.png"
              alt="SKI Construction engineers on site supervising structural building works"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* =======================================================
            RIGHT COLUMN: Experience Card + Tabs + Checklist + CTA
           ======================================================= */}
        <div className="lg:col-span-6 flex flex-col gap-7 sm:gap-8">
          {/* 1. Top Experience Badge Card with Chamfered Top-Right Corner in Forest Green Theme */}
          <div
            className="flex items-stretch overflow-hidden bg-gradient-to-r from-[#072415] via-[#0d3822] to-[#12452a] shadow-card rounded-xl border border-white/10"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)",
            }}
          >
            {/* Left Photo with Brand Accent Border */}
            <div className="relative w-24 sm:w-28 shrink-0 border-l-4 border-brand-accent bg-white">
              <Image
                src="/images/about/ref/helmet-blueprint.png"
                alt="Construction engineering leadership"
                fill
                sizes="120px"
                className="object-cover object-center"
              />
            </div>

            {/* Right Text */}
            <div className="p-4 sm:p-5 flex flex-col justify-center text-white">
              <h3 className="text-sm sm:text-base lg:text-lg font-black uppercase tracking-tight text-white leading-snug">
                CONSTRUCTION WORK EXPERIENCE AND BUILDING{" "}
                <span className="text-brand-accent">QUALITY.</span>
              </h3>
              <div className="flex items-center gap-2 mt-2 text-xs text-white/80">
                <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-accent text-[#072415] text-[10px] font-black">
                  ✓
                </span>
                <span className="font-medium">Direct engineering steps to ensure 100% quality control.</span>
              </div>
            </div>
          </div>

          {/* 2. Ribbon Tabs with Brand Theme Styling */}
          <div
            role="tablist"
            aria-label="Mission, Vision and Values Tabs"
            className="flex flex-wrap items-center gap-2.5 sm:gap-3"
          >
            {/* Tab 1: OUR MISSION */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "mission"}
              onClick={() => setActiveTab("mission")}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-xl ${
                activeTab === "mission"
                  ? "bg-brand-primary text-white shadow-button"
                  : "bg-brand-soft text-brand-dark hover:bg-brand-mist/70 border border-brand-line/60"
              }`}
            >
              OUR MISSION
            </button>

            {/* Tab 2: OUR VISION */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "vision"}
              onClick={() => setActiveTab("vision")}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-xl ${
                activeTab === "vision"
                  ? "bg-brand-primary text-white shadow-button"
                  : "bg-brand-soft text-brand-dark hover:bg-brand-mist/70 border border-brand-line/60"
              }`}
            >
              OUR VISION
            </button>

            {/* Tab 3: OUR VALUES */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "values"}
              onClick={() => setActiveTab("values")}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-xl ${
                activeTab === "values"
                  ? "bg-brand-primary text-white shadow-button"
                  : "bg-brand-soft text-brand-dark hover:bg-brand-mist/70 border border-brand-line/60"
              }`}
            >
              OUR VALUES
            </button>
          </div>

          {/* 3. Tab Narrative Paragraph in Brand Typography */}
          <p className="text-sm sm:text-[0.95rem] text-brand-dark/85 leading-relaxed font-medium">
            {current.description}
          </p>

          {/* 4. 2-Column Checklist Grid in Brand Green Theme */}
          <div className="border-t border-brand-line">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* Row 1 */}
              <div className="flex items-center gap-3 py-3 pr-4 border-b border-brand-line sm:border-r">
                <span className="flex size-4 shrink-0 items-center justify-center rounded-xs bg-brand-primary text-white shadow-2xs">
                  <Check className="size-3 text-white" strokeWidth={3} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-brand-ink">
                  {current.points[0]}
                </span>
              </div>
              <div className="flex items-center gap-3 py-3 sm:pl-4 border-b border-brand-line">
                <span className="flex size-4 shrink-0 items-center justify-center rounded-xs bg-brand-primary text-white shadow-2xs">
                  <Check className="size-3 text-white" strokeWidth={3} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-brand-ink">
                  {current.points[1]}
                </span>
              </div>

              {/* Row 2 */}
              <div className="flex items-center gap-3 py-3 pr-4 border-b border-brand-line sm:border-r">
                <span className="flex size-4 shrink-0 items-center justify-center rounded-xs bg-brand-primary text-white shadow-2xs">
                  <Check className="size-3 text-white" strokeWidth={3} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-brand-ink">
                  {current.points[2]}
                </span>
              </div>
              <div className="flex items-center gap-3 py-3 sm:pl-4 border-b border-brand-line">
                <span className="flex size-4 shrink-0 items-center justify-center rounded-xs bg-brand-primary text-white shadow-2xs">
                  <Check className="size-3 text-white" strokeWidth={3} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-brand-ink">
                  {current.points[3]}
                </span>
              </div>

              {/* Row 3 */}
              <div className="flex items-center gap-3 py-3 pr-4 border-b border-brand-line sm:border-r">
                <span className="flex size-4 shrink-0 items-center justify-center rounded-xs bg-brand-primary text-white shadow-2xs">
                  <Check className="size-3 text-white" strokeWidth={3} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-brand-ink">
                  {current.points[4]}
                </span>
              </div>
              <div className="flex items-center gap-3 py-3 sm:pl-4 border-b border-brand-line">
                <span className="flex size-4 shrink-0 items-center justify-center rounded-xs bg-brand-primary text-white shadow-2xs">
                  <Check className="size-3 text-white" strokeWidth={3} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-brand-ink">
                  {current.points[5]}
                </span>
              </div>
            </div>
          </div>

          {/* 5. [ READ MORE | ↗ ] Button in Brand Green Theme */}
          <div>
            <Link
              href="/contact"
              className="group inline-flex items-center rounded-full bg-brand-primary hover:bg-brand-dark transition-all duration-300 text-white font-bold text-xs sm:text-sm tracking-wider uppercase pl-6 pr-1.5 py-1.5 shadow-button"
            >
              <span>READ MORE</span>
              <span className="ml-5 size-8 rounded-full bg-white text-brand-primary flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-xs">
                <ArrowUpRight className="size-4 text-brand-primary" strokeWidth={2.5} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
