import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumb: string;
  /** Custom background image for this page's breadcrumb banner */
  backgroundImage?: string;
  /** Image object-position classes, e.g. object-center, object-right */
  imagePosition?: string;
  /** Optional content under the heading, such as quick links or CTAs */
  children?: ReactNode;
}

/** Shared header band for the inner pages, with breadcrumb navigation and unique per-page architectural background. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  backgroundImage = "/images/background/breadcrumb-banner.jpg",
  imagePosition = "object-right md:object-center",
  children,
}: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden bg-brand-soft py-8 pb-10 sm:py-10 sm:pb-12 border-b border-brand-line/60">
      {/* Background Architectural Banner */}
      <div className="absolute inset-0 -z-10 select-none">
        <Image
          src={backgroundImage}
          alt={`${breadcrumb} - SKI Construction`}
          fill
          priority
          sizes="100vw"
          quality={95}
          className={`object-cover ${imagePosition}`}
        />
        {/* Ambient base overlay across the background image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-white/30 pointer-events-none"
        />

        {/* Left side: Soft architectural theme ivory-sage wash instead of stark white */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-full md:w-[68%] lg:w-[58%] bg-gradient-to-r from-[#f4f8f0] via-[#f4f8f0]/95 via-70% to-transparent pointer-events-none"
        />

        {/* Left side: Light theme shadow gradient (brand forest-green #153d16 & brand primary #367c08) */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-full md:w-[60%] lg:w-[48%] bg-gradient-to-r from-[#153d16]/15 via-[#367c08]/08 to-transparent pointer-events-none"
        />

        {/* Left side: Ambient radial theme shadow glow */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-full md:w-[50%] bg-[radial-gradient(ellipse_at_top_left,rgba(21,61,22,0.14),transparent_70%)] pointer-events-none"
        />
      </div>

      <Container className="relative z-10 flex flex-col gap-4 sm:gap-5">
        <nav aria-label="Breadcrumb">
          <ol className="inline-flex items-center gap-1.5 rounded-full border border-brand-line/80 bg-white/90 backdrop-blur-xs px-3.5 py-1 text-xs sm:text-[0.82rem] text-brand-muted shadow-sm shadow-brand-dark/15">
            <li className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
              <Link href="/" className="hover:text-brand-primary transition-colors font-medium">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-brand-muted/50">
              <ChevronRight className="size-3" />
            </li>
            <li aria-current="page" className="font-bold text-brand-dark">
              {breadcrumb}
            </li>
          </ol>
        </nav>
        <SectionHeading as="h1" id="page-title" eyebrow={eyebrow} title={title} description={description} />
        {children}
      </Container>
    </section>
  );
}
