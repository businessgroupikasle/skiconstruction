"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

/**
 * Contact Page Hero Banner
 * Matches the layout in the design mockup:
 * - Deep emerald green backdrop on the left with gold curved accents
 * - Eyebrow "CONTACT US ──"
 * - Headline "Let's Build Your Dream Together" (with gold highlight)
 * - Subtitle description
 * - Modern luxury illuminated two-story villa on the right with curved golden ribbon transition
 */
export function ContactHero() {
  return (
    <section aria-labelledby="contact-hero-heading" className="relative bg-[#fbfdf9] pt-4 sm:pt-6 pb-6 overflow-hidden">
      <Container>
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0a2e1d] via-[#0f3825] to-[#14422c] shadow-xl border border-brand-line/40">
          {/* Subtle architectural grid pattern in dark background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-10 select-none -z-0"
            style={{
              backgroundImage: "radial-gradient(#f5b838 0.75px, transparent 0.75px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] sm:min-h-[420px] lg:min-h-[440px] relative z-10 items-center">
            {/* Left Content Column (7 cols on lg) */}
            <div className="lg:col-span-6 xl:col-span-6 p-7 sm:p-10 lg:p-14 flex flex-col justify-center text-white relative z-20">
              {/* Eyebrow with gold horizontal accent line */}
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="text-[0.72rem] sm:text-xs font-black uppercase tracking-[0.2em] text-[#f5b838]">
                  Contact Us
                </span>
                <span className="h-0.5 w-8 bg-[#f5b838] rounded-full inline-block" />
              </div>

              {/* Main Headline */}
              <h1
                id="contact-hero-heading"
                className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold tracking-tight text-white leading-[1.15] mb-4"
              >
                <span>Let&apos;s Build Your</span>{" "}
                <span className="block text-[#f5b838]">Dream Together</span>
              </h1>

              {/* Subtitle Description */}
              <p className="text-sm sm:text-base text-white/80 max-w-lg leading-relaxed mb-6 font-normal">
                Have a project in mind? Get in touch with us for expert consultation, planning and construction support.
              </p>

              {/* Quick direct breadcrumb link */}
              <div className="flex items-center gap-2 text-xs text-white/60">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-[#f5b838] font-semibold">Contact</span>
              </div>
            </div>

            {/* Right Image Column (Villa Image with Golden Curved Divider) */}
            <div className="lg:col-span-6 xl:col-span-6 relative h-[260px] sm:h-[340px] lg:h-full min-h-[340px] overflow-hidden">
              {/* Luxury Modern Villa Image */}
              <div className="relative size-full">
                <Image
                  src="/images/about/ref/hero-villa.png"
                  alt="Modern Luxury Villa designed and built with quality"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="size-full object-cover object-center"
                />

                {/* Soft warm vignette & dark gradient to blend with left dark green */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0a2e1d] lg:via-[#0a2e1d]/40 lg:to-transparent"
                />

                {/* Golden Curved Swoosh Accent Overlay along the boundary */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute -left-8 top-0 bottom-0 w-24 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(245, 184, 56, 0.4) 0%, transparent 60%)",
                    clipPath: "polygon(0 0, 100% 0, 40% 100%, 0% 100%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Golden Ribbon Bar */}
          <div
            aria-hidden="true"
            className="h-1.5 w-full bg-gradient-to-r from-[#f5b838] via-[#ffd67a] to-[#f5b838]"
          />
        </div>
      </Container>
    </section>
  );
}

