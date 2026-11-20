import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { stats } from "@/data/content";
import type { Stat } from "@/data/types";

/**
 * Flat Solid Vector Icons for High-Contrast Flat Design
 */
function FlatHardHatIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 3a8 8 0 0 0-8 8v1h16v-1a8 8 0 0 0-8-8z" />
      <path d="M2 13a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-1H2v1z" />
      <path d="M11 4.05V10h2V4.05a8.1 8.1 0 0 0-2 0z" fill="currentColor" opacity="0.4" />
      <rect x="7" y="15" width="10" height="2" rx="1" opacity="0.75" />
    </svg>
  );
}

function FlatCalendarIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V9h14v11z" />
      <circle cx="8" cy="12.5" r="1.3" />
      <circle cx="12" cy="12.5" r="1.3" />
      <circle cx="16" cy="12.5" r="1.3" />
      <circle cx="8" cy="16.5" r="1.3" />
      <circle cx="12" cy="16.5" r="1.3" />
      <circle cx="16" cy="16.5" r="1.3" />
    </svg>
  );
}

function FlatUsersIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

function FlatQualityIcon({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  );
}

const flatIconByStat: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  projects: FlatHardHatIcon,
  experience: FlatCalendarIcon,
  clients: FlatUsersIcon,
  quality: FlatQualityIcon,
};

/**
 * Premium Company Statistics Band
 * - Line blueprint building is replaced with authentic photographic architectural background
 * - Modern flat vector icons with flat styled badge containers
 */
export function StatisticsBand({ items = stats }: { items?: readonly Stat[] }) {
  return (
    <section aria-label="Company statistics" className="relative isolate overflow-hidden bg-gradient-to-r from-[#062013] via-[#0d3822] to-[#12452a] text-white py-12 sm:py-16">
      {/* Background Architectural Artwork with Rich Forest Green Gradient Overlay (Building wireframe removed) */}
      <div className="absolute inset-0 -z-10 select-none">
        <Image
          src="/images/background/breadcrumb-banner.jpg"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#062013]/95 via-[#0d3822]/90 to-[#12452a]/95" />
      </div>

      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:divide-x lg:divide-white/20">
          {items.map((stat) => {
            const FlatIcon = flatIconByStat[stat.id] ?? FlatQualityIcon;
            return (
              <div key={stat.id} className="group flex flex-col-reverse gap-1.5 lg:px-8">
                <dt className="pl-[3.75rem] sm:pl-[4.75rem] text-xs sm:text-sm font-medium text-white/85 leading-tight">
                  {stat.label}
                </dt>
                <dd className="flex items-center gap-3 sm:gap-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight tabular-nums text-white leading-tight">
                  {/* Flat Icon Container */}
                  <span className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-white/12 border border-white/25 text-[#65b516] backdrop-blur-xs transition-all duration-300 group-hover:scale-105 group-hover:bg-[#65b516]/20 group-hover:border-[#65b516]/50">
                    <FlatIcon className="size-6 sm:size-7 text-[#65b516] transition-transform duration-300 group-hover:scale-110" />
                  </span>
                  <span>
                    {stat.value}
                    <span className="text-[#65b516] pl-0.5">{stat.suffix}</span>
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
