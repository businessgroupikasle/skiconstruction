"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type TabType = "mission" | "vision" | "values";

interface TabContent {
  description: string;
  points: [string, string, string, string, string, string];
}

const tabContents: Record<TabType, TabContent> = {
  mission: {
    description:
      "SKI Construction delivers tailored architectural design, structural management & precision execution services across Coimbatore. We operate with strict IS 456 engineering oversight, transparent milestone BOQ schedules, and personal supervision by Registered LBS Engineer Er. D. Satheeshkumar.",
    points: [
      "Precision Structural Design",
      "IS 456 Concrete Testing",
      "Transparent Milestone BOQ",
      "Direct LBS Site Supervision",
      "Certified Primary Materials",
      "On-Time Project Handover",
    ],
  },
  vision: {
    description:
      "To be the leading and most trusted civil engineering and construction firm in Coimbatore, recognized for architectural craftsmanship, sustainable innovation, 3D photorealistic elevations, and generational value creation for every homeowner.",
    points: [
      "Photorealistic 3D Elevations",
      "Bylaw-Compliant Blueprints",
      "DTCP & LPA Fast Approvals",
      "Sustainable Green Methods",
      "Zero Subcontracting Dilution",
      "Generational Durability",
    ],
  },
  values: {
    description:
      "Construction tailored design, management & support services building business agency elit, sed do eiusmod tempor majority have this best in some we form, by injected humour solution.",
    points: [
      "Innovation Design Technology.",
      "Innovation Design Technology.",
      "Innovation Design Technology.",
      "Innovation Design Technology.",
      "Innovation Design Technology.",
      "Innovation Design Technology.",
    ],
  },
};

/**
 * Exact 100% 2-Column Mission, Vision & Values Section
 * Matching the reference construction layout:
 * - Left: Eyebrow + Heading + Large Photo with Chamfered Angled Top-Right Corner
 * - Right: Top Experience Badge Card with Chamfer Cut + Ribbon Tabs with Folded Ears + 2-Column Checklist + Read More Button
 */
export function MissionVision() {
  const [activeTab, setActiveTab] = useState<TabType>("values");
  const current = tabContents[activeTab];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* =======================================================
            LEFT COLUMN: Eyebrow + Heading + Chamfered Image
           ======================================================= */}
        <div className="lg:col-span-6 flex flex-col">
          {/* Eyebrow: —o MISSION VISION & VALUES */}
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[2px] w-6 bg-[#e65c00]" />
            <span className="size-2 rounded-full border-2 border-[#e65c00]" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#e65c00]">
              MISSION VISION & VALUES
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-[2.35rem] font-extrabold text-[#111827] tracking-tight leading-[1.2] mb-6 sm:mb-8">
            We Deliver Lasting Quality Using The Best Materials Skilled.
          </h2>

          {/* Big Photo with Diagonal Chamfered Top-Right Corner */}
          <div
            className="relative h-[340px] sm:h-[400px] lg:h-[450px] w-full overflow-hidden shadow-xl bg-gray-100"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 0 100%)",
            }}
          >
            <Image
              src="/images/services/building-construction.png"
              alt="Construction engineers on site supervising structural building works"
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
          {/* 1. Top Experience Badge Card with Chamfered Top-Right Corner */}
          <div
            className="flex items-stretch overflow-hidden bg-[#111827] shadow-lg"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)",
            }}
          >
            {/* Left Photo with Orange Border */}
            <div className="relative w-24 sm:w-28 shrink-0 border-l-4 border-[#e65c00] bg-white">
              <Image
                src="/images/about/ref/helmet-blueprint.png"
                alt="Construction engineer work experience"
                fill
                sizes="120px"
                className="object-cover object-center"
              />
            </div>

            {/* Right Text */}
            <div className="p-4 sm:p-5 flex flex-col justify-center text-white">
              <h3 className="text-sm sm:text-base lg:text-lg font-black uppercase tracking-tight text-white leading-snug">
                CONSTRUCTION WORK EXPERIENCE AND BUILDING{" "}
                <span className="text-[#e65c00]">QUALITY.</span>
              </h3>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-300">
                <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#e65c00] text-white text-[10px] font-bold">
                  ✓
                </span>
                <span>Building steps to ensure control.</span>
              </div>
            </div>
          </div>

          {/* 2. Ribbon Tabs with Folded Corner Ears */}
          <div className="flex items-end gap-3 sm:gap-4 pb-2">
            {/* Tab 1: OUR MISSION */}
            <div className="relative inline-block">
              <button
                type="button"
                onClick={() => setActiveTab("mission")}
                className={`relative px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                  activeTab === "mission"
                    ? "bg-[#111827] text-white"
                    : "bg-[#f3f4f6] text-[#374151] hover:bg-[#e5e7eb]"
                }`}
              >
                OUR MISSION
              </button>
              {/* Ribbon fold triangle */}
              <div
                className={`absolute top-full right-0 w-0 h-0 border-t-[8px] border-r-[8px] border-r-transparent ${
                  activeTab === "mission"
                    ? "border-t-[#e65c00]"
                    : "border-t-[#111827]"
                }`}
              />
            </div>

            {/* Tab 2: OUR VISION */}
            <div className="relative inline-block">
              <button
                type="button"
                onClick={() => setActiveTab("vision")}
                className={`relative px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                  activeTab === "vision"
                    ? "bg-[#111827] text-white"
                    : "bg-[#f3f4f6] text-[#374151] hover:bg-[#e5e7eb]"
                }`}
              >
                OUR VISION
              </button>
              {/* Ribbon fold triangle */}
              <div
                className={`absolute top-full right-0 w-0 h-0 border-t-[8px] border-r-[8px] border-r-transparent ${
                  activeTab === "vision"
                    ? "border-t-[#e65c00]"
                    : "border-t-[#111827]"
                }`}
              />
            </div>

            {/* Tab 3: OUR VALUES */}
            <div className="relative inline-block">
              <button
                type="button"
                onClick={() => setActiveTab("values")}
                className={`relative px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                  activeTab === "values"
                    ? "bg-[#111827] text-white"
                    : "bg-[#f3f4f6] text-[#374151] hover:bg-[#e5e7eb]"
                }`}
              >
                OUR VALUES
              </button>
              {/* Ribbon fold triangle */}
              <div
                className={`absolute top-full right-0 w-0 h-0 border-t-[8px] border-r-[8px] border-r-transparent ${
                  activeTab === "values"
                    ? "border-t-[#e65c00]"
                    : "border-t-[#111827]"
                }`}
              />
            </div>
          </div>

          {/* 3. Tab Narrative Paragraph */}
          <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed">
            {current.description}
          </p>

          {/* 4. 2-Column Checklist Grid (2 columns x 3 rows with thin dividers) */}
          <div className="border-t border-[#e5e7eb]">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* Row 1 */}
              <div className="flex items-center gap-2.5 py-3 pr-4 border-b border-[#e5e7eb] sm:border-r">
                <span className="flex size-3.5 shrink-0 items-center justify-center border border-[#111827]">
                  <span className="size-1.5 bg-[#111827]" />
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#1f2937]">
                  {current.points[0]}
                </span>
              </div>
              <div className="flex items-center gap-2.5 py-3 sm:pl-4 border-b border-[#e5e7eb]">
                <span className="flex size-3.5 shrink-0 items-center justify-center border border-[#111827]">
                  <span className="size-1.5 bg-[#111827]" />
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#1f2937]">
                  {current.points[1]}
                </span>
              </div>

              {/* Row 2 */}
              <div className="flex items-center gap-2.5 py-3 pr-4 border-b border-[#e5e7eb] sm:border-r">
                <span className="flex size-3.5 shrink-0 items-center justify-center border border-[#111827]">
                  <span className="size-1.5 bg-[#111827]" />
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#1f2937]">
                  {current.points[2]}
                </span>
              </div>
              <div className="flex items-center gap-2.5 py-3 sm:pl-4 border-b border-[#e5e7eb]">
                <span className="flex size-3.5 shrink-0 items-center justify-center border border-[#111827]">
                  <span className="size-1.5 bg-[#111827]" />
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#1f2937]">
                  {current.points[3]}
                </span>
              </div>

              {/* Row 3 */}
              <div className="flex items-center gap-2.5 py-3 pr-4 border-b border-[#e5e7eb] sm:border-r">
                <span className="flex size-3.5 shrink-0 items-center justify-center border border-[#111827]">
                  <span className="size-1.5 bg-[#111827]" />
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#1f2937]">
                  {current.points[4]}
                </span>
              </div>
              <div className="flex items-center gap-2.5 py-3 sm:pl-4 border-b border-[#e5e7eb]">
                <span className="flex size-3.5 shrink-0 items-center justify-center border border-[#111827]">
                  <span className="size-1.5 bg-[#111827]" />
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#1f2937]">
                  {current.points[5]}
                </span>
              </div>
            </div>
          </div>

          {/* 5. [ READ MORE | ↗ ] Button */}
          <div>
            <Link
              href="/contact"
              className="group inline-flex items-center bg-[#111827] hover:bg-brand-primary transition-colors duration-200 text-white font-bold text-xs sm:text-sm tracking-wider uppercase pl-6 pr-1 py-1 shadow-sm"
            >
              <span>READ MORE</span>
              <span className="ml-5 bg-white text-[#e65c00] p-2 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="size-4 text-[#e65c00]" strokeWidth={2.5} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
