"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { homeFaqs } from "@/data/home-faqs";

export function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      aria-labelledby="home-faq-heading"
      className="bg-[#fbfdf9] py-16 sm:py-20 lg:py-24 border-t border-brand-line/60"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left: sticky section header */}
        <div className="flex flex-col items-start text-left lg:col-span-5 lg:sticky lg:top-[calc(var(--header-height,76px)+2rem)]">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-soft px-3.5 py-1 text-xs font-semibold text-brand-primary">
            <HelpCircle className="size-3.5" aria-hidden="true" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2
            id="home-faq-heading"
            className="mt-3 text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl lg:text-4xl"
          >
            Got Questions About Building or Approvals?
          </h2>

          <p className="mt-3 text-sm text-brand-muted sm:text-base max-w-md">
            Find clear, honest answers about our construction process, registered LBS plan approvals, Vastu plans, and engineering consulting services in Kinathukadavu and Coimbatore.
          </p>
        </div>

        {/* Right: accordion list */}
        <div className="lg:col-span-7 divide-y divide-brand-line/70 rounded-2xl border border-brand-line/70 bg-white p-4 sm:p-8 shadow-xs">
          {homeFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="py-4 sm:py-5 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-start justify-between gap-4 text-left font-semibold text-brand-dark transition-colors hover:text-brand-primary"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base leading-snug">{faq.question}</span>
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-dark">
                    <ChevronDown
                      className={`size-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-brand-primary" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-brand-muted pr-8">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        </div>
      </Container>
    </section>
  );
}
