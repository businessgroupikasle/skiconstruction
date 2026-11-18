import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { buildServiceContactHref, buildServiceEnquiryUrl, telHref } from "@/lib/links";
import { contact, founder } from "@/lib/brand";

interface ServiceCtaBannerProps {
  serviceName?: string;
}

/**
 * High-Converting Bottom CTA Banner
 * Dark forest emerald card with architectural sketch watermark,
 * direct WhatsApp instant quote link, and direct line to Er. D. Satheeshkumar.
 */
export function ServiceCtaBanner({ serviceName = "Building Construction" }: ServiceCtaBannerProps) {
  const contactHref = buildServiceContactHref(serviceName);
  const whatsappUrl = buildServiceEnquiryUrl(serviceName);

  return (
    <section aria-label="Request a quote" className="bg-[#fcfdfa] py-12 sm:py-16 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#071911] via-[#0d2a1d] to-[#123a28] text-white p-7 sm:p-10 lg:p-14 shadow-2xl border border-brand-primary/30">
          {/* Subtle architectural wireframe sketch watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-full w-[45%] opacity-15 select-none overflow-hidden"
          >
            <Image
              src="/images/contact/sketch.png"
              alt=""
              fill
              sizes="500px"
              className="object-cover object-right"
            />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Left Column: Heading & Subtext */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3.5 py-1 text-xs font-mono font-bold text-emerald-300 uppercase tracking-widest mb-3.5">
                <ShieldCheck className="size-3.5 text-brand-accent" />
                <span>Free On-Site Consultation & Transparent Estimation</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Plan Your {serviceName} With Confidence
              </h2>

              <p className="mt-3 text-sm sm:text-base text-gray-200/90 leading-relaxed max-w-xl">
                Speak directly with <strong className="text-white">{founder.name}</strong> ({founder.role}) to discuss floor plans, stage-wise BOQ estimates, and statutory approval requirements in Coimbatore and Kinathukadavu.
              </p>
            </div>

            {/* Right Column: High-Intent Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-sm font-bold text-white shadow-button hover:bg-brand-accent transition-all duration-200"
              >
                <MessageSquare className="size-4.5" />
                <span>WhatsApp Quote</span>
              </a>

              <a
                href={telHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3.5 text-sm font-bold text-white backdrop-blur-xs transition-all duration-200"
              >
                <Phone className="size-4 text-emerald-400" />
                <span>{contact.phoneDisplay}</span>
              </a>

              <Link
                href={contactHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-brand-dark px-5 py-3.5 text-sm font-bold hover:bg-emerald-50 transition-all duration-200"
              >
                <span>Book Site Visit</span>
                <ArrowRight className="size-4 text-brand-primary" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
