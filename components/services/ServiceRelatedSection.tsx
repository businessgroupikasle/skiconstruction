import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { services } from "@/data/services";
import type { ServiceSlug } from "@/data/types";

/**
 * Related Services Section
 * Enables smooth lateral navigation between all 9 services without bounce-back.
 */
export function ServiceRelatedSection({ currentSlug }: { currentSlug: ServiceSlug }) {
  const relatedServices = services.filter((s) => s.slug !== currentSlug);

  return (
    <section aria-labelledby="related-services-heading" className="bg-[#fcfdfa] py-14 sm:py-20 border-b border-brand-line/60">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-0.5 w-6 bg-brand-accent rounded-full inline-block" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-brand-primary">
                Explore More Solutions
              </span>
            </div>
            <h2
              id="related-services-heading"
              className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight"
            >
              Related Construction & Engineering Services
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:text-brand-dark transition-colors uppercase tracking-wider"
          >
            <span>View All 9 Services</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Services Grid (Shows 4 key complementary services) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedServices.slice(0, 4).map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-brand-line shadow-xs hover:border-brand-primary/40 hover:shadow-card hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-44 w-full overflow-hidden bg-brand-soft">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
                />
                <span className="absolute bottom-3 left-3 rounded-lg bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-mono font-bold text-brand-dark uppercase tracking-wider">
                  SKI VERIFIED
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="text-base font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-brand-muted leading-relaxed line-clamp-2">
                    {service.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-line/60 flex items-center justify-between text-xs font-bold text-brand-primary">
                  <span>Explore Service</span>
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

