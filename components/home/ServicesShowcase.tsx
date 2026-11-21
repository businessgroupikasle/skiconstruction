import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ServiceCard } from "@/components/home/ServiceCard";
import { services } from "@/data/services";

/**
 * 9 Photographic Services Showcase in a 3x3 Grid (3 Rows & 3 Columns)
 * Each card features a unified layout:
 * - Left side: Number badge, Service title, Summary, and Explore CTA
 * - Right side: High-resolution photographic service image
 * - Backed by the custom architectural background artwork: /images/background/service.png
 */
export function ServicesShowcase() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-24 relative isolate overflow-hidden py-16 sm:py-20 lg:py-26 bg-brand-soft"
    >
      {/* Background Architectural Artwork: /images/background/service.png */}
      <div className="absolute inset-0 -z-10 select-none">
        <Image
          src="/images/background/service.png"
          alt="SKI Construction Services Architectural Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle, soft overlay keeping the blueprint sketch and completed villa sharp, vibrant, and high-definition */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-white/15 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-brand-ivory/60 to-transparent pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-ivory/60 to-transparent pointer-events-none"
        />
      </div>

      <Container className="relative z-10 flex flex-col gap-8 sm:gap-10">
        {/* Header Block Matching Reference */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-[0.72rem] sm:text-xs font-bold tracking-[0.22em] text-brand-primary uppercase">
              OUR SERVICES
            </span>
            <h2
              id="services-heading"
              className="text-2xl sm:text-3xl lg:text-[2.6rem] font-extrabold text-brand-dark leading-[1.14] tracking-tight"
            >
              Complete Construction
              <br />
              &amp; Real Estate Solutions
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-brand-muted max-w-xl">
              From plan approval to project completion and property solutions, we offer a complete range of construction
              services under one roof.
            </p>
          </div>

          <div className="self-start md:self-auto shrink-0">
            {/* View All Services Pill Button */}
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-brand-primary bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-brand-primary shadow-xs transition-all duration-200 hover:bg-brand-primary hover:text-white hover:shadow-soft"
            >
              View All Services
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        {/* 9 Services arranged in 3 Rows and 3 Columns (3x3 Grid) */}
        <ul
          aria-label="Services list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 pt-2"
        >
          {services.map((service, index) => (
            <li key={service.slug} className="h-full">
              <ServiceCard service={service} index={index} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}