import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Box,
  Building2,
  Calculator,
  ClipboardCheck,
  Compass,
  FileCheck2,
  Handshake,
  Home,
  MessageSquare,
  Phone,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { FlowingServicesShowcase } from "@/components/services/FlowingServicesShowcase";
import { services } from "@/data/services";
import type { ServiceSlug } from "@/data/types";
import { contact, founder } from "@/lib/brand";
import { buildWhatsAppUrl, telHref } from "@/lib/links";

export const metadata: Metadata = {
  title: "Services | Complete Construction & Engineering Solutions",
  description:
    "Explore SKI Construction's nine comprehensive civil engineering and construction services in Coimbatore: building construction, 3D elevation design, consulting, bank loan estimates, LBS & DTCP plan approvals, Vastu plans, and real estate services.",
  alternates: { canonical: "/services" },
};

const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  "building-construction": Building2,
  "3d-elevation-design": Box,
  "construction-consulting": Users,
  "bank-loan-estimate": Calculator,
  "lbs-plan-approval": FileCheck2,
  "dtcp-lpa-approval": ClipboardCheck,
  "vastu-plan": Compass,
  "real-estate": Home,
  "property-buying-selling": Handshake,
};

/**
 * SKI Construction Services Listing Page
 * Designed after the staggered photo-card layout with overlapping floating cards:
 * - Top: Breadcrumb Page Hero
 * - Section Title: "Construction Solutions For Every Need"
 * - 3-Column Staggered Grid with overlapping floating white cards
 * - Bottom: High-converting Call-to-Action banner
 */
export default function ServicesPage() {
  const whatsappUrl = buildWhatsAppUrl(
    "Hello SKI Construction, I would like to enquire about your services in Coimbatore.",
  );

  return (
    <article className="bg-[#fcfdfa] min-h-screen">
      {/* 1. Page Hero Banner */}
      <PageHero
        eyebrow="Our Services"
        title={
          <>
            Complete Construction
            <br className="hidden sm:block" /> Solutions
          </>
        }
        description="From architectural planning and statutory approvals to turnkey construction and handover, we deliver end-to-end solutions for residential, commercial, and property needs."
        breadcrumb="Services"
        backgroundImage="/images/background/service-breadcrumb.png"
        imagePosition="object-right md:object-center"
      />

      {/* 2. Main Services Staggered Card Grid */}
      <section aria-labelledby="services-heading" className="py-16 sm:py-24">
        <Container>
          {/* Section Header matching "Every Need" layout */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14 sm:mb-20">
            <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-[0.25em] bg-brand-soft px-3.5 py-1.5 rounded-full border border-brand-line mb-3">
              Comprehensive Services
            </span>

            <h2
              id="services-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight leading-tight"
            >
              Every Need
            </h2>

            <p className="mt-3.5 text-sm sm:text-base text-brand-muted leading-relaxed">
              Tailored civil engineering and architectural solutions backed by Registered LBS Engineer supervision and 100% transparent milestone estimates.
            </p>
          </div>

          {/* Flowing Services Showcase: Left cards flow UP, Right cards flow DOWN */}
          <FlowingServicesShowcase />
        </Container>
      </section>

      {/* 3. Bottom Conversion Call-to-Action Banner */}
      <section aria-labelledby="cta-heading" className="bg-[#fcfdfa] pb-16 sm:pb-24">
        <Container>
          <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#071911] via-[#0d2a1d] to-[#123a28] text-white p-8 sm:p-12 lg:p-14 shadow-2xl border border-brand-primary/30">
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-6 bg-[#d4972a] rounded-full inline-block" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                    Direct LBS Engineering Consultation
                  </span>
                </div>

                <h2 id="cta-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Let&apos;s Build <span className="text-[#e5b357]">Your Dream Space</span>
                </h2>

                <p className="mt-3 text-sm sm:text-base text-gray-200/90 leading-relaxed">
                  Speak directly with {founder.name} ({founder.role}) to discuss your floor plan, 3D elevation, or Coimbatore municipal approvals.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto shrink-0">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-sm font-bold text-white shadow-button hover:bg-brand-accent transition-all duration-200"
                >
                  <MessageSquare className="size-4" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <a
                  href={telHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-xs transition-all duration-200"
                >
                  <Phone className="size-4 text-emerald-400" />
                  <span>{contact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
