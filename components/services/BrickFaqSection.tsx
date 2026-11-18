"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { ServiceFaq } from "@/data/types";

interface BrickFaqSectionProps {
  customFaqs?: readonly ServiceFaq[];
}

/**
 * Section 6: "Quality & Efficiency - Frequently ask questions"
 * Matches brickbybrickworks.com Section 6:
 * - Eyebrow: "Quality & Efficiency"
 * - Heading: "Frequently ask questions"
 * - Clean interactive accordion list
 */
export function BrickFaqSection({ customFaqs }: BrickFaqSectionProps) {
  const defaultFaqs: ServiceFaq[] = [
    {
      question: "What types of projects do you handle?",
      answer:
        "We manage residential, commercial, industrial, and interior projects from conception to final handover. Our portfolio spans custom luxury villas, duplex homes, commercial showrooms, industrial sheds, and DTCP approved layouts in Coimbatore.",
    },
    {
      question: "What materials do you use in construction?",
      answer:
        "We deploy premium, long-lasting, and certified materials tailored to your project. This includes Grade 53 OPC/PPC cement, primary-grade Fe 550D TMT steel bars, clean graded M-sand, and mandatory concrete cube testing for guaranteed structural strength.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project schedules differ according to site circumstances, architectural design, built-up area, and statutory approvals. Most residential and commercial projects take between 6 to 12 months, guided by transparent weekly milestone logs.",
    },
    {
      question: "Do you provide custom construction services?",
      answer:
        "Yes, we provide completely personalized building solutions tailored to your plot size, lifestyle requirements, budget parameters, and Vastu preferences.",
    },
    {
      question: "Do you handle permits and approvals?",
      answer:
        "Yes. Led by Er. D. Satheeshkumar, Registered LBS Engineer, we oversee all required approvals, Coimbatore Municipal Corporation sanctions, and DTCP / LPA permits to ensure a 100% compliant and seamless building journey.",
    },
  ];

  const items = customFaqs && customFaqs.length > 0 ? [...customFaqs, ...defaultFaqs.slice(0, 2)] : defaultFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section aria-labelledby="faq-heading" className="bg-[#fcfdfa] py-14 sm:py-20 border-b border-brand-line/60">
      <Container>
        {/* Section Header with "Quality & Efficiency" eyebrow */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-2.5">
            <span className="h-0.5 w-8 bg-brand-accent rounded-full inline-block" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-primary">
              Quality & Efficiency
            </span>
            <span className="h-0.5 w-8 bg-brand-accent rounded-full inline-block" />
          </div>

          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight"
          >
            Frequently ask questions
          </h2>

          <p className="mt-3 text-sm sm:text-base text-brand-muted leading-relaxed">
            Find clear answers about our commercial and residential construction workflows, materials, and approvals in Coimbatore.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto flex flex-col gap-3.5">
          {items.map((faq, idx) => {
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

