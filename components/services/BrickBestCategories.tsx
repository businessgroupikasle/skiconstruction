"use client";

import { useState } from "react";
import Image from "next/image";
import { Hotel, Factory, Store, CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

/**
 * Section 3: "Specifications - Our Best Services Category"
 * Matches brickbybrickworks.com Section 3:
 * - Eyebrow: "Specifications"
 * - Heading: "Our Best Services Category"
 * - Interactive Tabs / Category Cards: Hospitality Facilities, Industrial Sheds & Workshops, Retail & Showrooms
 */
export function BrickBestCategories() {
  const categories = [
    {
      id: "hospitality",
      title: "Hospitality Facilities",
      icon: Hotel,
      image: "/images/projects/luxury-villa.jpg",
      desc: "We create modern hospitality spaces such as boutique hotels, resorts, and executive guesthouses that prioritize comfort, architectural aesthetics, and utility.",
      points: [
        "High-quality acoustic and luxury finishes",
        "Optimized visitor flow and functional layouts",
        "Timely delivery with complete local body compliance",
        "Energy-efficient lighting and HVAC ducting integration",
      ],
    },
    {
      id: "industrial",
      title: "Industrial Sheds & Workshops",
      icon: Factory,
      image: "/images/about/ref/helmet-blueprint.png",
      desc: "We design and install long-lasting industrial sheds, production workshops, and warehouse facilities adapted to specific heavy operating requirements in Coimbatore and Kinathukadavu.",
      points: [
        "Heavy-duty PEB steel structural framing",
        "Reinforced VDF concrete industrial flooring",
        "Optimal ventilation, crane gantry support, and natural lighting",
        "Adherence to industrial safety, fire, and statutory norms",
      ],
    },
    {
      id: "retail",
      title: "Retail & Showrooms",
      icon: Store,
      image: "/images/gallery/commercial-facade.jpg",
      desc: "We design appealing, practical retail spaces, commercial showrooms, and business premises to enhance customer experience, brand visibility, and foot traffic.",
      points: [
        "Striking commercial facades with glass and ACP cladding",
        "Column-free interior layouts for flexible display spaces",
        "Comprehensive electrical and ambient lighting design",
        "Durable, high-traffic commercial flooring and fixtures",
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const activeCategory = (categories[activeTab] ?? categories[0])!;

  return (
    <section aria-labelledby="best-categories-heading" className="bg-[#f4f8f0]/60 py-14 sm:py-20 border-b border-brand-line/60">
      <Container>
        {/* Section Header with "Specifications" eyebrow */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-2.5">
            <span className="h-0.5 w-8 bg-brand-accent rounded-full inline-block" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-primary">
              Specifications
            </span>
            <span className="h-0.5 w-8 bg-brand-accent rounded-full inline-block" />
          </div>

          <h2
            id="best-categories-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight"
          >
            Our Best Services Category
          </h2>

          <p className="mt-3 text-sm sm:text-base text-brand-muted leading-relaxed">
            As reputable builders in Coimbatore, we contribute technical excellence and certified quality across commercial, industrial, and hospitality construction.
          </p>
        </div>

        {/* Tab Buttons matching brickbybrickworks.com */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-xs ${
                  isActive
                    ? "bg-brand-primary text-white shadow-button scale-105"
                    : "bg-white text-brand-dark hover:bg-brand-soft border border-brand-line"
                }`}
              >
                <Icon className={`size-4.5 ${isActive ? "text-white" : "text-brand-primary"}`} />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Content Card */}
        <div className="rounded-3xl bg-white border border-brand-line p-6 sm:p-10 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Text & Features (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-widest bg-brand-soft px-3 py-1 rounded-md border border-brand-line w-fit mb-3">
                CATEGORY {String(activeTab + 1).padStart(2, "0")}
              </span>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-brand-dark mb-4">
                {activeCategory.title}
              </h3>

              <p className="text-sm sm:text-base text-brand-muted leading-relaxed mb-6">
                {activeCategory.desc}
              </p>

              {/* 4 Points Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t border-brand-line/60">
                {activeCategory.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4.5 text-brand-accent shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-brand-dark leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Category Photo (5 cols) */}
            <div className="lg:col-span-5 relative h-[260px] sm:h-[320px] rounded-3xl overflow-hidden shadow-card border border-brand-line">
              <Image
                src={activeCategory.image}
                alt={activeCategory.title}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
              />
              <span className="absolute bottom-4 left-4 rounded-xl bg-white/90 backdrop-blur-xs px-3 py-1.5 text-xs font-bold text-brand-dark shadow-xs">
                {activeCategory.title}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
