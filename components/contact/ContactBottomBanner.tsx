import { Phone } from "lucide-react";
import { contact } from "@/lib/brand";
import { telHref } from "@/lib/links";

/**
 * Bottom Call-to-Action Banner: "Ready to Start Your Project?"
 * Replicates the exact banner from the design mockup:
 * - Dark forest green backdrop with architectural blueprint outline
 * - Headline "Ready to Start Your Project?" with gold emphasis
 * - Vertical separator line
 * - Subtitle "Contact us today for a free consultation and site discussion."
 * - Golden yellow pill CTA button "+91 8526 224354"
 */
export function ContactBottomBanner() {
  return (
    <section aria-labelledby="cta-bottom-heading" className="pt-4 pb-12 sm:pb-16">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#092a1a] via-[#0d3422] to-[#123e2a] p-6 sm:p-9 lg:p-10 shadow-xl border border-brand-line/40 text-white">
        {/* Subtle Architectural CAD Blueprint background vector on right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 top-0 w-1/2 opacity-15 overflow-hidden select-none"
        >
          <svg className="size-full" viewBox="0 0 500 200" fill="none" stroke="#65b516">
            <path d="M100 200 L100 50 L250 50 L250 200 Z" strokeWidth="1.5" />
            <path d="M70 50 L175 0 L280 50 Z" strokeWidth="1.5" />
            <path d="M250 200 L250 90 L420 90 L420 200 Z" strokeWidth="1.5" />
            <path d="M230 90 L335 40 L440 90 Z" strokeWidth="1.5" />
            <line x1="120" y1="80" x2="160" y2="80" strokeWidth="1" />
            <line x1="120" y1="120" x2="160" y2="120" strokeWidth="1" />
            <line x1="280" y1="120" x2="380" y2="120" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 text-center lg:text-left">
          {/* Left Title & Center Description block */}
          <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-8">
            {/* Title */}
            <div>
              <h3 id="cta-bottom-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                <span className="block text-white">Ready to</span>
                <span className="block text-[#f5b838]">Start Your Project?</span>
              </h3>
            </div>

            {/* Vertical Divider */}
            <div
              aria-hidden="true"
              className="hidden md:block h-12 w-px bg-white/20 shrink-0"
            />

            {/* Subtext */}
            <p className="text-xs sm:text-sm text-white/80 max-w-xs leading-relaxed font-normal">
              Contact us today for a free consultation and site discussion.
            </p>
          </div>

          {/* Right: Golden Yellow CTA Pill Button */}
          <a
            href={telHref}
            aria-label={`Call SKI Construction at ${contact.phoneDisplay}`}
            className="shrink-0 inline-flex items-center gap-3 rounded-full bg-[#f5b838] hover:bg-[#e0a72f] text-[#0a2e1d] px-6 sm:px-8 py-3.5 text-sm sm:text-base font-extrabold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-[#0a2e1d] text-[#f5b838]">
              <Phone className="size-3.5 fill-current" />
            </span>
            <span>{contact.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

