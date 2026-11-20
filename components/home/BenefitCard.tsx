import { BadgeCheck, Clock, Ruler, ScrollText, type LucideIcon } from "lucide-react";
import type { Benefit } from "@/data/types";

const iconByKey: Record<Benefit["icon"], LucideIcon> = {
  expertise: Ruler,
  quality: BadgeCheck,
  transparency: ScrollText,
  delivery: Clock,
};

/**
 * Premium Glassmorphic "Why Choose Us" Card
 * - Frosted glass backdrop with dynamic depth
 * - Diagonal left-to-right specular glow sweep on hover
 * - Glowing icon badge with smooth micro-interactions
 */
export function BenefitCard({ benefit }: { benefit: Benefit }) {
  const Icon = iconByKey[benefit.icon];
  return (
    <article className="group relative flex h-full flex-col items-center gap-4 overflow-hidden rounded-2xl border border-white/80 bg-white/60 p-6 text-center backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(21,61,22,0.12)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-accent/50 hover:bg-white/85 hover:shadow-[0_20px_40px_-15px_rgba(54,124,8,0.28)]">
      {/* Top Glass Edge Specular Highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-90"
      />

      {/* Shimmering Left-to-Right Glow Sweep on Hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-4 -left-full w-full -skew-x-12 bg-gradient-to-r from-transparent via-white/80 via-brand-accent/30 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-full group-hover:opacity-100"
      />

      {/* Ambient Radial Hover Glow at the bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-1/2 h-20 w-3/4 -translate-x-1/2 rounded-full bg-brand-accent/25 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Frosted Glass Icon Badge with Halo */}
      <div className="relative flex size-16 items-center justify-center rounded-2xl border border-brand-accent/30 bg-gradient-to-br from-white via-brand-mist/70 to-white text-brand-primary shadow-xs transition-all duration-500 group-hover:scale-110 group-hover:border-brand-primary/50 group-hover:shadow-[0_0_24px_rgba(101,181,22,0.35)]">
        <Icon aria-hidden="true" className="size-8 transition-transform duration-500 group-hover:rotate-3" strokeWidth={1.75} />
      </div>

      {/* Title & Description */}
      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="text-[1.02rem] font-bold leading-snug text-brand-dark transition-colors duration-300 group-hover:text-brand-primary">
          {benefit.title}
        </h3>
        <p className="text-sm leading-relaxed text-brand-muted/95">
          {benefit.description}
        </p>
      </div>

      {/* Bottom Accent Glow Bar expanding on hover */}
      <div
        aria-hidden="true"
        className="mt-auto h-0.5 w-6 rounded-full bg-brand-line/60 transition-all duration-500 group-hover:w-16 group-hover:bg-gradient-to-r group-hover:from-brand-accent group-hover:to-brand-primary group-hover:shadow-[0_0_12px_rgba(101,181,22,0.6)]"
      />
    </article>
  );
}
