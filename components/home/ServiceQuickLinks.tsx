import Link from "next/link";
import {
  Box,
  Building,
  ClipboardCheck,
  Compass,
  FileCheck,
  House,
  Handshake,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ServiceSlug } from "@/data/types";

interface QuickLink {
  label: string;
  slug: ServiceSlug;
  icon: LucideIcon;
}

/** Icon strip under the hero. Each item links to its service entry. */
const quickLinks: readonly QuickLink[] = [
  { label: "Building Construction", slug: "building-construction", icon: Building },
  { label: "3D Elevation", slug: "3d-elevation-design", icon: Box },
  { label: "Construction Consulting", slug: "construction-consulting", icon: Users },
  { label: "LBS Plan Approval", slug: "lbs-plan-approval", icon: FileCheck },
  { label: "Vastu Plan", slug: "vastu-plan", icon: Compass },
  { label: "DTCP / LPA Approval", slug: "dtcp-lpa-approval", icon: ClipboardCheck },
  { label: "Real Estate", slug: "real-estate", icon: House },
  { label: "Property Buying & Selling", slug: "property-buying-selling", icon: Handshake },
];

export function ServiceQuickLinks() {
  return (
    <nav aria-label="Quick service links" className="relative border-y border-brand-line bg-white/80">
      <ul className="mx-auto grid max-w-[1280px] grid-cols-2 px-4 sm:grid-cols-4 lg:grid-cols-8">
        {quickLinks.map((item, index) => {
          const Icon = item.icon;
          return (
            <li
              key={item.slug}
              className={`flex ${index % 2 === 0 ? "border-r" : ""} border-brand-line sm:border-r sm:last:border-r-0 lg:border-r lg:last:border-r-0 ${
                index >= 4 ? "border-t sm:border-t-0" : ""
              }`}
            >
              <Link
                href={`/services/${item.slug}`}
                className="group flex w-full flex-col items-center gap-3 px-3 py-6 text-center transition-colors hover:bg-brand-soft"
              >
                <span className="flex size-14 items-center justify-center rounded-full border-2 border-brand-accent/70 bg-white text-brand-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-brand-primary">
                  <Icon aria-hidden="true" className="size-7" strokeWidth={1.6} />
                </span>
                <span className="text-[0.82rem] leading-snug font-semibold text-brand-ink sm:text-sm">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}