"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { aboutFaqs } from "@/data/about-faqs";


/**
 * About Page GEO & AEO Frequently Asked Questions Section
 * Structured question-based headings and clear factual answers optimized for
 * AI search engines (Perplexity, Google SGE, Gemini) and human visitors.
 */
export function AboutFaqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section aria-labelledby="about-faq-heading" className="bg-[#fcfdfa] py-14 sm:py-20 border-b border-brand-line/60">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 px-3.5 py-1 text-xs font-mono font-bold text-brand-primary uppercase tracking-widest mb-3">
            <HelpCircle className="size-3.5" />
            <span>Company FAQs</span>
          </div>

          <h2
            id="about-faq-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight"
          >
            Frequently Asked Questions About SKI Construction
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-brand-muted leading-relaxed">
            Direct answers to common questions about our leadership, service coverage in Coimbatore, approval credentials, and billing policies.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto flex flex-col gap-3.5">
          {aboutFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-white border border-brand-line/80 shadow-xs overflow-hidden transition-all duration-200 hover:border-brand-primary/40"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left font-bold text-brand-dark text-xs sm:text-sm cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand-primary transition-colors">
                    {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-brand-muted leading-relaxed border-t border-brand-line/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

