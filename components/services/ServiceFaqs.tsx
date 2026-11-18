import { ChevronDown } from "lucide-react";
import type { ServiceFaq } from "@/data/types";

/** Accessible accordion built on native details/summary, so it works without JavaScript. */
export function ServiceFaqs({ faqs }: { faqs: readonly ServiceFaq[] }) {
  return (
    <div className="flex flex-col divide-y divide-brand-line overflow-hidden rounded-3xl border border-brand-line bg-white shadow-soft">
      {faqs.map((faq, index) => (
        <details key={faq.question} className="group" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-base font-bold text-brand-dark marker:hidden hover:bg-brand-soft/60 [&::-webkit-details-marker]:hidden">
            {faq.question}
            <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-brand-primary transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <div className="px-6 pb-6 text-[0.97rem] leading-relaxed text-brand-muted">{faq.answer}</div>
        </details>
      ))}
    </div>
  );
}
