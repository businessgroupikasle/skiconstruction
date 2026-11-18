import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface BrickHeroBannerProps {
  title: string;
}

/**
 * Section 0: Breadcrumb Hero Banner matching brickbybrickworks.com
 * Dark forest-green header with centered title and breadcrumb navigation.
 */
export function BrickHeroBanner({ title }: BrickHeroBannerProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#071911] via-[#0d2a1d] to-[#133d2a] text-white py-14 sm:py-20 border-b border-brand-primary/30">
      {/* Subtle CAD Drafting Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          {title}
        </h1>

        {/* Breadcrumb matching Home / Services / [Service Name] */}
        <nav aria-label="Breadcrumb">
          <ol className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-200/80">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-emerald-400/50">
              <ChevronRight className="size-3.5" />
            </li>
            <li>
              <Link href="/services" className="hover:text-white transition-colors">
                Services
              </Link>
            </li>
            <li aria-hidden="true" className="text-emerald-400/50">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="font-semibold text-white">
              {title}
            </li>
          </ol>
        </nav>
      </Container>
    </section>
  );
}

