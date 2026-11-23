"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import type { ServiceFaq } from "@/data/types";

interface ServiceFaqSectionProps {
  faqs?: readonly ServiceFaq[];
}

/**
 * Frequently Asked Questions Section
 * Matches Section 7 of mockup:
 * - Left: "Frequently Asked Questions" headline with architectural wireframe sketch watermark
 * - Right: Accordion list with expandable questions and "+" / "−" toggles
 */
export function ServiceFaqSection({ faqs }: ServiceFaqSectionProps) {
  const defaultFaqs: ServiceFaq[] = [
    {
      question: "What is the typical duration for a construction project?",
      answer:
        "Typical residential projects take between 6 to 12 months depending on built-up area, architectural complexity, and weather conditions. We provide a milestone-based timeline before signing.",
    },
    {
      question: "Do you provide both design and construction services?",
      answer:
        "Yes, we provide complete end-to-end services including 3D elevation design, architectural planning, structural analysis, and turn-key construction with supervised quality.",
    },
    {
      question: "Can you handle project approvals (LBS, DTCP, etc.)?",
      answer:
        "Yes, our team manages all required building permits and authority sanctions including Local Body Sanctions (LBS), DTCP approvals, and Coimbatore local planning permissions.",
    },
    {
      question: "Do you offer post-construction support?",
      answer:
        "Yes, we provide documented handover paperwork, post-handover warranty, and dedicated support for plumbing, electrical, and structural maintenance.",
    },
  ];

  const items = faqs && faqs.length > 0 ? faqs : defaultFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section aria-labelledby="faq-heading" className="bg-[#fbfdf9] py-14 sm:py-20 relative overflow-x-clip">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
          {/* Left Column: Heading + Wireframe Sketch Watermark */}
          <div className="lg:col-span-5 relative flex flex-col justify-between min-h-[300px] lg:sticky lg:top-[calc(var(--header-height,76px)+2rem)]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-0.5 w-6 bg-[#d4972a] rounded-full inline-block" />
                <h2
                  id="faq-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#11231a] tracking-tight leading-tight"
                >
                  Frequently
                  <br />
                  Asked Questions
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-xs">
                Clear answers to common questions about our construction process, timelines, and guarantees.
              </p>
            </div>

            {/* Architectural Sketch Watermark */}
            <div
              aria-hidden="true"
              className="pointer-events-none relative w-full h-[220px] sm:h-[260px] opacity-70 mt-6 select-none"
            >
              <Image
                src="/images/contact/sketch.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 400px, 80vw"
                className="object-contain object-bottom-left"
              />
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 pt-2">
            {items.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl bg-white border border-gray-200/90 shadow-xs overflow-hidden transition-all duration-200 hover:border-[#143d2b]/30"
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left font-bold text-[#11231a] text-xs sm:text-sm cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700 transition-colors">
                      {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

