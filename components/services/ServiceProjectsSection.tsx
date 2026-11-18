import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building, Building2, Home } from "lucide-react";

/**
 * Our Projects Showcase Section
 * Matches Section 6 of mockup:
 * - Eyebrow: "Our Projects"
 * - 3 Featured Project Cards with green location pill & gold arrow
 * - 1 "Explore More Projects" CTA card with building icon & gold button
 */
export function ServiceProjectsSection() {
  const projects = [
    {
      title: "Luxury Villa - Coimbatore",
      image: "/images/projects/luxury-villa.jpg",
      icon: Home,
      href: "/gallery",
    },
    {
      title: "Commercial Building - Coimbatore",
      image: "/images/gallery/commercial-facade.jpg",
      icon: Building2,
      href: "/gallery",
    },
    {
      title: "Apartment Project - Coimbatore",
      image: "/images/background/1 (5).jpg",
      icon: Building,
      href: "/gallery",
    },
  ];

  return (
    <section aria-labelledby="projects-heading" className="bg-[#fbfdf9] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow Header */}
        <div className="flex items-center gap-2 mb-8">
          <span className="h-0.5 w-6 bg-[#d4972a] rounded-full inline-block" />
          <h2
            id="projects-heading"
            className="text-2xl sm:text-3xl font-extrabold text-[#11231a] tracking-tight"
          >
            Our Projects
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {projects.map((proj) => {
            const Icon = proj.icon;
            return (
              <div
                key={proj.title}
                className="group relative h-[240px] sm:h-[260px] rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col justify-end p-3.5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Background Image */}
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle gradient scrim */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"
                />

                {/* Bottom Bar: Green Pill + Gold Circle Arrow */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-xl bg-[#0e3021]/90 backdrop-blur-xs px-3 py-1.5 text-[0.72rem] sm:text-xs font-bold text-white shadow-xs border border-white/10">
                    <Icon className="size-3.5 text-[#d4972a]" />
                    <span className="truncate">{proj.title}</span>
                  </div>

                  <Link
                    href={proj.href}
                    aria-label={`View ${proj.title}`}
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f2bd48] to-[#d4972a] text-[#0d2a1c] shadow-md transition-transform duration-300 group-hover:scale-110"
                  >
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* 4th Card: "Explore More Projects" CTA Card */}
          <Link
            href="/gallery"
            className="group flex flex-col items-center justify-center text-center p-6 rounded-3xl bg-[#edf6ef] border-2 border-[#143d2b]/15 shadow-sm transition-all duration-300 hover:border-[#143d2b] hover:bg-[#e4f1e7] hover:-translate-y-1 hover:shadow-md"
          >
            <span className="flex size-14 items-center justify-center rounded-2xl bg-[#143d2b] text-white shadow-xs mb-3 transition-transform duration-300 group-hover:scale-110">
              <Building2 className="size-7 text-[#f2bd48]" />
            </span>

            <h3 className="text-base sm:text-lg font-extrabold text-[#11231a] max-w-[140px] leading-snug mb-4">
              Explore More Projects
            </h3>

            <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f2bd48] to-[#d4972a] text-[#0d2a1c] shadow-md transition-transform duration-300 group-hover:scale-110">
              <ArrowRight className="size-4.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

