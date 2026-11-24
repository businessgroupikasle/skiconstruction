import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Phone,
  ArrowRight,
  ShieldCheck,
  Check,
  Ruler,
  Layers,
  Award,
  Cpu,
  Home,
  Building2,
  Factory,
  Compass,
  MapPin,
  Clock,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { services } from "@/data/services";
import type { Service, ServiceDetail } from "@/data/types";
import { founder, contact } from "@/lib/brand";
import { telHref } from "@/lib/links";

interface MorphServiceContentProps {
  service: Service;
  detail: ServiceDetail;
}

/**
 * Service Detail Content layout:
 * - Left Main Content Area (8 cols on lg screens):
 *   Block 1: Comprehensive [Service Name] Solutions (Overview, landscape photo, 5 deliverables)
 *   Block 2: Key Guarantees & Tall Vertical Photo (5 guarantees)
 *   Block 3: Our 5-Stage Engineering Lifecycle (Step-by-step workflow)
 *   Block 4: Technical Specifications & IS Standards Compliance (IS 456, IS 1893, Cube Testing)
 *   Block 5: Sectors & Applications We Serve (Residential, Commercial, Industrial)
 *   Block 6: Executive Trust & Direct LBS Supervision Banner
 * - Right Sticky Sidebar (4 cols on lg screens):
 *   1. Dark Navy/Forest CTA box: "Build Your Dream Home with Us" + Contact CTA
 *   2. Download Card: "Download DOC" & "Download PDF" (Brochure & Spec Sheet)
 *   3. Services Navigation List (Quick switch between all 9 services)
 */
export function MorphServiceContent({ service, detail }: MorphServiceContentProps) {
  // Process / Deliverables for Block 1 (service-specific from detail.included)
  const deliverables =
    detail.included && detail.included.length > 0
      ? detail.included.slice(0, 5)
      : [
          "Architectural and structural design",
          "Foundation and framework development",
          "Professional electrical and plumbing coordination",
          "Modern interior & exterior finishing",
          "Complete project supervision and quality control",
        ];

  // 5 Key Guarantees for Block 2
  const guarantees = [
    {
      title: "Experienced Professionals",
      desc: `Led by ${founder.name} (${founder.role}) with certified civil engineering standards.`,
    },
    {
      title: "Modern & Functional Design",
      desc: "Focused on maximizing space, natural daylight, ventilation, and Vastu alignment.",
    },
    {
      title: "On-Time Delivery",
      desc: "We ensure every project milestone is completed as scheduled with weekly progress logs.",
    },
    {
      title: "Transparent Budgeting",
      desc: "No hidden costs, clear stage-wise BOQ planning, precision estimation, and zero surprises.",
    },
    {
      title: "Quality Guarantee",
      desc: "Strong, durable, and long-lasting construction with certified IS 456 concrete testing.",
    },
  ];

  // Sectors for Block 3
  const sectors = [
    {
      title: "Residential Architecture & Custom Villas",
      desc: "Individual duplexes, contemporary bungalows, and multi-family residences built for lifelong comfort and low maintenance.",
      icon: Home,
    },
    {
      title: "Commercial & Retail Complexes",
      desc: "Commercial showrooms, retail complexes, and office buildings engineered for business foot traffic and structural elegance.",
      icon: Building2,
    },
    {
      title: "Industrial Sheds & Storage Facilities",
      desc: "Heavy-duty PEB framing, industrial warehouses, and manufacturing workshops designed for operational efficiency.",
      icon: Factory,
    },
  ];

  const overviewParagraphs =
    detail.overview && detail.overview.length > 0
      ? detail.overview
      : [
          `We provide full-service modern ${service.name.toLowerCase()}, from initial planning to final handover. Our construction process includes certified engineering and on-site supervision.`,
          `Every step is handled with precision and attention to detail to ensure a high-quality and durable result compliant with Coimbatore Municipal Corporation and DTCP bylaws.`,
        ];

  return (
    <section className="bg-[#fcfdfa] py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* =====================================================
              MAIN CONTENT AREA (Left Side, 8 cols on lg screens)
             ===================================================== */}
          <main className="lg:col-span-8 flex flex-col gap-12 sm:gap-16">
            {/* ---------------------------------------------------
                BLOCK 1: "Comprehensive [Service Name] Solutions"
               --------------------------------------------------- */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight mb-4">
                  Comprehensive {service.name} Solutions
                </h2>

                <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                  {overviewParagraphs[0]}
                </p>
              </div>

              {/* Split: Landscape Photo + 5 Checkpoint Deliverables */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center pt-2">
                {/* Landscape Image (6 cols) */}
                <div className="md:col-span-6 relative h-[240px] sm:h-[280px] lg:h-[300px] w-full overflow-hidden rounded-2xl bg-brand-soft border border-brand-line shadow-card">
                  <Image
                    src={service.image.src || "/images/projects/luxury-villa.jpg"}
                    alt={`${service.name} Solutions by SKI Construction`}
                    fill
                    sizes="(min-width: 1024px) 35vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* 5 Bullet Points with Checkmarks (6 cols) */}
                <div className="md:col-span-6 flex flex-col gap-3.5">
                  {deliverables.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e65c00] text-white mt-0.5 shadow-xs">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-brand-dark leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detail paragraph below photo & bullets */}
              <div className="flex flex-col gap-3 pt-2">
                {overviewParagraphs.slice(1).map((para, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-brand-muted leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* ---------------------------------------------------
                BLOCK 2: Key Guarantees & Tall Vertical Photo
               --------------------------------------------------- */}
            <div className="flex flex-col gap-6 pt-8 border-t border-brand-line/80">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight leading-tight mb-2">
                  Comprehensive {service.name} Approach
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  Why property owners across Coimbatore trust our civil engineering discipline and stage-wise transparency.
                </p>
              </div>

              {/* Split: 5 Checkmark Guarantees on Left + Tall Vertical Photo on Right */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center pt-2">
                {/* Left: 5 Guarantees (7 cols) */}
                <div className="md:col-span-7 flex flex-col gap-4">
                  {guarantees.map((g, index) => (
                    <div key={index} className="flex items-start gap-3.5">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-brand-primary text-brand-primary mt-0.5 shadow-xs">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      <div className="flex flex-col">
                        <h4 className="text-sm sm:text-base font-bold text-brand-dark">
                          {g.title}
                        </h4>
                        <p className="text-xs text-brand-muted leading-relaxed mt-0.5">
                          {g.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Tall Vertical Construction Photo (5 cols) */}
                <div className="md:col-span-5 relative h-[320px] sm:h-[380px] lg:h-[420px] w-full overflow-hidden rounded-2xl bg-brand-soft border border-brand-line shadow-card">
                  <Image
                    src="/images/journey/step-4-construction.jpg"
                    alt={`Construction site framework and engineering for ${service.name}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 40vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
                  />
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 p-3 backdrop-blur-xs shadow-soft border border-brand-line text-xs font-bold text-brand-dark">
                    <span>Direct On-Site Supervision</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------
                BLOCK 3: Sectors & Applications We Serve
               --------------------------------------------------- */}
            <div className="flex flex-col gap-6 pt-8 border-t border-brand-line/80">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight leading-tight mb-2">
                  Applications & Sectors We Serve
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  Delivering specialized architectural planning, structural execution, and statutory permissions across multiple building categories in Coimbatore.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {sectors.map((sector) => {
                  const Icon = sector.icon;
                  return (
                    <div
                      key={sector.title}
                      className="flex flex-col gap-2 p-5 rounded-2xl bg-white border border-brand-line shadow-xs hover:border-brand-primary/40 hover:shadow-soft transition-all duration-200"
                    >
                      <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand-primary border border-brand-line">
                        <Icon className="size-5" />
                      </span>
                      <h4 className="text-sm font-bold text-brand-dark mt-1">
                        {sector.title}
                      </h4>
                      <p className="text-xs text-brand-muted leading-relaxed">
                        {sector.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ---------------------------------------------------
                BLOCK 6: Direct LBS Supervision Trust Banner
               --------------------------------------------------- */}
            <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-[#0a2c19] to-[#082213] text-white p-6 sm:p-8 shadow-card border border-brand-primary/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="size-4 text-brand-accent" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                    Coimbatore Corporation Registered LBS
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                  Direct Leadership by {founder.name}
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  No middlemen or third-party contractors. Every architectural drawing, statutory submission, and concrete pour is personally supervised by our licensed chief engineer.
                </p>
              </div>

              <Link
                href="/contact"
                className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-button hover:bg-brand-accent transition-all duration-200"
              >
                <span>Contact Office</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </main>

          {/* =====================================================
              SIDEBAR (Right Side, 4 cols on lg screens, sticky)
             ===================================================== */}
          <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
            {/* 1. Dark CTA Card matching the reference screenshot */}
            <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#071911] via-[#0d2a1d] to-[#133d2a] text-white p-7 sm:p-8 shadow-card border border-brand-primary/30">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-300 bg-emerald-500/15 px-3 py-1 rounded-md border border-emerald-400/30 w-fit block mb-4">
                GET IN TOUCH
              </span>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-3">
                Build Your Dream Home with Us
              </h3>

              <p className="text-xs sm:text-sm text-gray-200/90 leading-relaxed mb-6">
                Turn your vision into reality with {service.name} by SKI Construction.
              </p>

              <div className="flex flex-col gap-2.5">
                <a
                  href={telHref}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3.5 text-xs sm:text-sm font-bold text-white shadow-button hover:bg-brand-accent transition-all duration-200"
                >
                  <Phone className="size-4" />
                  <span>Call Now: {contact.phoneDisplay}</span>
                </a>

                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 text-xs sm:text-sm font-bold text-white transition-all duration-200"
                >
                  <span>Contact Office</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Services Navigation List */}
            <div className="rounded-3xl bg-white border border-brand-line p-6 shadow-card">
              <h4 className="text-base font-bold text-brand-dark mb-4 pb-3 border-b border-brand-line flex items-center justify-between">
                <span>Our Services</span>
                <span className="text-[10px] font-mono text-brand-primary bg-brand-soft px-2 py-0.5 rounded-md border border-brand-line">
                  9 SERVICES
                </span>
              </h4>

              <nav aria-label="Services sidebar list" className="flex flex-col gap-1.5">
                {services.map((s) => {
                  const isActive = s.slug === service.slug;
                  return (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-brand-primary text-white shadow-xs"
                          : "text-brand-dark hover:bg-brand-soft hover:text-brand-primary"
                      }`}
                    >
                      <span className="line-clamp-1">{s.name}</span>
                      <ArrowRight className={`size-3.5 ${isActive ? "text-white" : "text-brand-muted"}`} />
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
