import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/icons";
import { services } from "@/data/services";
import type { Service, ServiceDetail, ServiceSlug } from "@/data/types";
import { founder, contact } from "@/lib/brand";
import { buildServiceEnquiryUrl, telHref } from "@/lib/links";

interface BrickMainWithSidebarProps {
  service: Service;
  detail: ServiceDetail;
}

/**
 * Section 2: Main Content Area with Sticky Services List Sidebar
 * Matches the layout of brickbybrickworks.com Section 2:
 * - Left: Service title, comprehensive narrative, and "Service all details" feature box with checkmarks
 * - Right: Numbered "Services List" sidebar + Quick LBS Engineer consultation card
 */
export function BrickMainWithSidebar({ service, detail }: BrickMainWithSidebarProps) {
  const whatsappUrl = buildServiceEnquiryUrl(service.name);

  const bulletPoints = [
    "Create the space that propels your living and business goals ahead.",
    "Engineered under direct supervision of a Registered LBS Engineer.",
    "From concept drawings to final handover, your project starts here.",
    "Where skilled construction meets certified long-term value.",
  ];

  const overviewParagraphs =
    detail.overview && detail.overview.length > 0
      ? detail.overview
      : [
          `We provide comprehensive ${service.name.toLowerCase()} solutions customized to meet the highest engineering standards and client expectations in Coimbatore. From planning and 3D design to turnkey execution, we strive to create efficient, durable, and aesthetic spaces.`,
          `As one of the trusted construction companies in Coimbatore and Kinathukadavu, we contribute strategic planning, technical experience, and strict adherence to IS standards at every stage. Our methodology ensures projects are delivered on schedule, under budget, and with complete safety.`,
        ];

  return (
    <section aria-labelledby="main-content-heading" className="bg-[#fcfdfa] py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Main Service Narrative & "Service all details" Box (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div>
              {/* Service Title */}
              <h2
                id="main-content-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight mb-5"
              >
                {service.name} in Coimbatore
              </h2>

              {/* Description Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-brand-muted leading-relaxed">
                {overviewParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* "Service all details" Feature Box matching brickbybrickworks.com */}
            <div className="rounded-3xl bg-white border border-brand-line p-6 sm:p-8 shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-0.5 w-6 bg-brand-accent rounded-full inline-block" />
                <h3 className="text-xl sm:text-2xl font-bold text-brand-dark">
                  Service all details
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-6">
                As one of Coimbatore&apos;s premier civil engineering and construction firms, we provide end-to-end solutions from architectural design to completion. Led by {founder.name} ({founder.role}), we execute each project with accuracy, quality materials, and transparent stage-wise updates.
              </p>

              {/* 4 Bullet Checklist items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-brand-line/60">
                {bulletPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white mt-0.5 shadow-xs">
                      <CheckCircle2 className="size-3.5" />
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-brand-dark leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Sidebar with "Services List" (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
            {/* Services List Widget matching brickbybrickworks.com */}
            <div className="rounded-3xl bg-white border border-brand-line p-6 shadow-card">
              <h3 className="text-lg font-bold text-brand-dark pb-4 border-b border-brand-line/80 flex items-center justify-between">
                <span>Services List</span>
                <span className="text-xs font-mono text-brand-primary bg-brand-soft px-2.5 py-1 rounded-md border border-brand-line">
                  09 SERVICES
                </span>
              </h3>

              <nav aria-label="Services Navigation" className="mt-4 flex flex-col gap-2">
                {services.map((s, index) => {
                  const isActive = s.slug === service.slug;
                  return (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className={`group flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-brand-primary text-white shadow-button"
                          : "bg-[#fcfdfa] text-brand-dark hover:bg-brand-soft hover:text-brand-primary border border-brand-line/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs tabular-nums ${
                            isActive ? "text-emerald-200" : "text-brand-primary/80"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}.
                        </span>
                        <span className="line-clamp-1">{s.name}</span>
                      </div>
                      <ArrowRight
                        className={`size-4 transition-transform duration-200 ${
                          isActive ? "translate-x-0.5 text-white" : "text-brand-muted group-hover:translate-x-1 group-hover:text-brand-primary"
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Quick Contact Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#071911] via-[#0d2a1d] to-[#123a28] text-white p-6 shadow-card border border-brand-primary/30">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="size-4 text-brand-accent" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-bold">
                  Direct LBS Engineer
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                Have questions about your project?
              </h4>

              <p className="text-xs text-gray-300 leading-relaxed mb-5">
                Speak directly with {founder.name} ({founder.role}) for a free plan review and stage-wise estimate.
              </p>

              <div className="flex flex-col gap-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-button hover:bg-brand-accent transition-all duration-200"
                >
                  <WhatsAppIcon className="size-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={telHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-xs transition-all duration-200"
                >
                  <Phone className="size-4 text-emerald-400" />
                  <span>{contact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

