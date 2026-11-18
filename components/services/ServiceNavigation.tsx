import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Service } from "@/data/types";

/** Previous and next service links at the foot of a detail page. */
export function ServiceNavigation({ previous, next }: { previous: Service; next: Service }) {
  return (
    <nav aria-label="Other services" className="grid gap-4 sm:grid-cols-2">
      <Link
        href={`/services/${previous.slug}`}
        className="group flex flex-col gap-2 rounded-2xl border border-brand-line bg-white p-5 shadow-soft transition-shadow hover:shadow-card"
      >
        <span className="flex items-center gap-2 text-xs font-bold tracking-wide text-brand-muted uppercase">
          <ArrowLeft aria-hidden="true" className="size-3.5" />
          Previous service
        </span>
        <span className="text-lg font-bold text-brand-dark group-hover:text-brand-primary">{previous.name}</span>
      </Link>
      <Link
        href={`/services/${next.slug}`}
        className="group flex flex-col items-end gap-2 rounded-2xl border border-brand-line bg-white p-5 text-right shadow-soft transition-shadow hover:shadow-card"
      >
        <span className="flex items-center gap-2 text-xs font-bold tracking-wide text-brand-muted uppercase">
          Next service
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </span>
        <span className="text-lg font-bold text-brand-dark group-hover:text-brand-primary">{next.name}</span>
      </Link>
    </nav>
  );
}
