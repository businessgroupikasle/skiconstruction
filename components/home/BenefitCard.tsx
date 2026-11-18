import { BadgeCheck, Clock, Ruler, ScrollText, type LucideIcon } from "lucide-react";
import type { Benefit } from "@/data/types";

const iconByKey: Record<Benefit["icon"], LucideIcon> = {
  expertise: Ruler,
  quality: BadgeCheck,
  transparency: ScrollText,
  delivery: Clock,
};

/** Single "Why Choose Us" card. Data-driven: pass one entry from data/content.ts. */
export function BenefitCard({ benefit }: { benefit: Benefit }) {
  const Icon = iconByKey[benefit.icon];
  return (
    <article className="flex h-full flex-col items-center gap-3 rounded-2xl border border-brand-line bg-white px-4 py-6 text-center shadow-soft transition-shadow duration-300 hover:shadow-card">
      <span className="flex size-16 items-center justify-center rounded-full bg-brand-mist text-brand-primary">
        <Icon aria-hidden="true" className="size-8" strokeWidth={1.6} />
      </span>
      <h3 className="text-[0.95rem] font-bold leading-snug text-brand-dark">{benefit.title}</h3>
      <p className="text-sm leading-relaxed text-brand-muted">{benefit.description}</p>
    </article>
  );
}
