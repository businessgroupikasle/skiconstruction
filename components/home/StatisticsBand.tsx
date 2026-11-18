import { BadgeCheck, CalendarDays, HardHat, Users, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { stats } from "@/data/content";
import type { Stat } from "@/data/types";

const iconByStat: Record<string, LucideIcon> = {
  projects: HardHat,
  experience: CalendarDays,
  clients: Users,
  quality: BadgeCheck,
};

/**
 * Premium Company Statistics Band
 * Modernized architectural counters with deep forest green gradient and clean dividers.
 */
export function StatisticsBand({ items = stats }: { items?: readonly Stat[] }) {
  return (
    <section aria-label="Company statistics" className="relative isolate overflow-hidden bg-gradient-to-r from-[#072415] via-[#0d3822] to-[#12452a] text-white py-12 sm:py-16">
      {/* Subtle Background Architectural Line Blueprint */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 h-full w-[50%] opacity-15"
        viewBox="0 0 600 200"
        preserveAspectRatio="xMaxYMid slice"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.2"
      >
        <path d="M380 200 V60 L460 20 L540 60 V200" />
        <path d="M420 200 V110 H500 V200 M440 90 H480" />
        <path d="M560 200 V120 H600" />
        <path d="M0 200 H600" />
      </svg>

      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:divide-x lg:divide-white/20">
          {items.map((stat) => {
            const Icon = iconByStat[stat.id] ?? BadgeCheck;
            return (
              <div key={stat.id} className="flex flex-col-reverse gap-1 lg:px-8">
                <dt className="pl-[3.75rem] sm:pl-[4.75rem] text-xs sm:text-sm font-medium text-white/80 leading-tight">
                  {stat.label}
                </dt>
                <dd className="flex items-center gap-3 sm:gap-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight tabular-nums text-white leading-tight">
                  <span className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-[#65b516] backdrop-blur-xs">
                    <Icon aria-hidden="true" className="size-6 sm:size-7" strokeWidth={1.8} />
                  </span>
                  <span>
                    {stat.value}
                    <span className="text-[#65b516]">{stat.suffix}</span>
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
