import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone, MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { Service } from "@/data/types";
import { founder, contact } from "@/lib/brand";
import { buildServiceEnquiryUrl, telHref } from "@/lib/links";

/**
 * Service Detail Hero Section
 * Modern, handcrafted engineering hero with dusk luxury villa visual,
 * verified LBS credentials, breadcrumbs, direct action CTAs and trust specs.
 */
export function ServiceDetailHero({ service }: { service: Service }) {
  const whatsappUrl = buildServiceEnquiryUrl(service.name);
  const serviceSummary =
    service.description ||
    service.summary ||
    "End-to-end construction and engineering solutions in Coimbatore with absolute transparency, safety, and on-time delivery.";

  const trustSpecs = [
    "Direct On-Site LBS Supervision",
    "Transparent Stage-Wise BOQ",
    "DTCP & LPA Compliance",
    "Certified Quality Materials",
  ];

  return (
    <header className="relative isolate overflow-hidden bg-[#0a2318] text-white">
      {/* Background container with split layout */}
      <div className="absolute inset-0 -z-10 flex">
        {/* Left emerald gradient base */}
        <div className="w-full lg:w-[54%] bg-gradient-to-br from-[#071911] via-[#0d2a1d] to-[#133d2a] relative z-10" />

        {/* Right Villa Image */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-[58%] select-none">
          <Image
            src="/images/about/ref/hero-villa.png"
            alt={`${service.name} by SKI Construction in Coimbatore`}
            fill
            priority
            sizes="60vw"
            className="object-cover object-center"
          />
          {/* Subtle gradient overlay to blend into emerald */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#0d2a1d] via-[#0d2a1d]/85 to-transparent pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#071911]/80 via-transparent to-black/25 pointer-events-none"
          />
        </div>
      </div>

      {/* Mobile background fallback */}
      <div className="lg:hidden absolute inset-0 -z-10 opacity-20">
        <Image
          src="/images/about/ref/hero-villa.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071911] via-[#071911]/90 to-[#071911]" />
      </div>

      <Container className="relative z-20 pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
          <ol className="inline-flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-gray-300">
            <li>
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <span className="text-[0.8rem] opacity-75">Home</span>
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400 opacity-60">
              <ChevronRight className="size-3.5" />
            </li>
            <li>
              <Link href="/services" className="hover:text-white transition-colors">
                Services
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400 opacity-60">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="font-semibold text-emerald-300">
              {service.name}
            </li>
          </ol>
        </nav>

        {/* Content Column */}
        <div className="max-w-xl lg:max-w-xl xl:max-w-2xl">
          {/* Eyebrow & LBS Badge */}
          <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 text-[11px] font-semibold text-emerald-300 backdrop-blur-xs">
              <ShieldCheck className="size-3.5 text-brand-accent" />
              <span>{founder.role} Supervised</span>
            </span>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#e0a943] font-bold">
              Coimbatore & Kinathukadavu
            </span>
          </div>

          {/* Service Title */}
          <h1
            id="service-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12] mb-4"
          >
            {service.name}{" "}
            <span className="text-emerald-400 block text-2xl sm:text-3xl lg:text-3xl font-bold mt-1 font-sans">
              in Coimbatore
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-200/90 leading-relaxed max-w-xl mb-7">
            {serviceSummary}
          </p>

          {/* Direct Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-bold text-white shadow-button hover:bg-brand-accent transition-all duration-200"
            >
              <MessageSquare className="size-4" />
              <span>Enquire on WhatsApp</span>
            </a>
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-3 text-sm font-semibold text-white backdrop-blur-xs transition-all duration-200"
            >
              <Phone className="size-4 text-emerald-400" />
              <span>{contact.phoneDisplay}</span>
            </a>
          </div>

          {/* 4-Item Quick Trust Specs Strip */}
          <div className="grid grid-cols-2 gap-2.5 pt-5 border-t border-white/10 max-w-lg">
            {trustSpecs.map((spec) => (
              <div key={spec} className="flex items-center gap-2 text-xs text-emerald-200/90 font-medium">
                <CheckCircle2 className="size-3.5 text-brand-accent shrink-0" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </header>
  );
}
