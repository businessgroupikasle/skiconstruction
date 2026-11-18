import Image from "next/image";
import { Check } from "lucide-react";
import type { ServiceDetail } from "@/data/types";

interface ServiceIncludedProps {
  detail?: ServiceDetail;
}

/**
 * What's Included Section
 * - Left: living room photo with an offset gold frame behind it
 * - Right: "What's Included?" title and a numbered spec-sheet list, two columns on larger screens
 */
export function ServiceIncludedSection({ detail }: ServiceIncludedProps) {
  // Use mockup items or fallback to detail.included
  const defaultItems = [
    "Site Analysis & Planning",
    "Architectural & Structural Design",
    "Material Procurement & Quality Check",
    "Skilled Workforce & Supervision",
    "Regular Progress Updates",
    "Safety & Regulatory Compliance",
    "Finishing & Quality Inspection",
    "Final Handover with Support",
  ];

  const items = detail?.included && detail.included.length >= 6 ? detail.included : defaultItems;

  return (
    <section aria-labelledby="included-heading" className="bg-[#fbfdf9] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Living room photo with offset frame */}
          <div className="relative lg:col-span-5">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border-2 border-[#d4972a]/60"
            />
            <div className="relative h-[280px] overflow-hidden rounded-3xl sm:h-[340px] lg:h-[400px]">
              <Image
                src="/images/gallery/interior-living.jpg"
                alt="Luxury modern interior by SKI Construction"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Headline & numbered list */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-0.5 w-6 bg-[#d4972a] rounded-full inline-block" />
              <h2
                id="included-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#11231a] tracking-tight leading-tight"
              >
                What&apos;s Included?
              </h2>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
              {items.map((item, index) => (
                <li
                  key={item}
                  className="group flex items-center gap-4 border-b border-[#143d2b]/15 py-4 transition-colors duration-300 hover:text-[#143d2b]"
                >
                  <span className="font-mono text-xs font-bold tabular-nums text-[#b87d19]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-xs sm:text-sm font-semibold text-[#1c2e24] leading-snug">
                    {item}
                  </span>
                  <Check
                    aria-hidden="true"
                    strokeWidth={3}
                    className="size-4 shrink-0 text-[#b87d19] transition-transform duration-300 group-hover:scale-125"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
