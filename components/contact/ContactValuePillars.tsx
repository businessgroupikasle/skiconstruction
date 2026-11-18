import { Headphones, Calendar, Calculator, ShieldCheck } from "lucide-react";

const valuePillars = [
  {
    icon: Headphones,
    title: "Quick Response",
    description: "We reply within 24 hours",
  },
  {
    icon: Calendar,
    title: "Expert Consultation",
    description: "Plan your project with experts",
  },
  {
    icon: Calculator,
    title: "Detailed Estimate",
    description: "Transparent & accurate pricing",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Support",
    description: "From planning to handover",
  },
] as const;

/**
 * 4 Horizontal Value Pillar Cards
 * Matches the row from the mockup:
 * - Quick Response
 * - Expert Consultation
 * - Detailed Estimate
 * - Reliable Support
 */
export function ContactValuePillars() {
  return (
    <section aria-label="Customer service commitments" className="py-8 sm:py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {valuePillars.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-2xl border border-brand-line/70 bg-white p-4 sm:p-5 shadow-xs hover:shadow-soft hover:border-brand-primary/40 transition-all duration-300"
            >
              {/* Gold Outlined Rounded Square Icon Box */}
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[#f5b838]/40 bg-[#fdfaf3] text-[#d4972a]">
                <Icon className="size-6 stroke-[1.8]" />
              </div>

              {/* Title & Description */}
              <div className="flex flex-col">
                <h4 className="text-sm sm:text-base font-extrabold text-[#11231a] tracking-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-brand-muted leading-snug">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

