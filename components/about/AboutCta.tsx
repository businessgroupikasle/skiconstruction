import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import { founder, contact } from "@/lib/brand";
import { telHref } from "@/lib/links";

/**
 * About Page Bottom Call to Action Banner
 * Direct line to Er. D. Satheeshkumar, Registered LBS Engineer.
 */
export function AboutCta() {
  return (
    <section aria-label="Connect with leadership" className="bg-[#fcfdfa] py-14 sm:py-20">
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
                <span>Start Your Construction Journey</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Build With Engineering Certainty
              </h2>

              <p className="mt-3 text-sm sm:text-base text-gray-200/90 leading-relaxed max-w-xl">
                Discuss your plot, architectural plans, and structural goals directly with <strong className="text-white">{founder.name}</strong> ({founder.role}). Visit our office in Kinathukadavu or schedule an on-site visit.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-mono text-emerald-300/80">
                <MapPin className="size-3.5 text-brand-accent shrink-0" />
                <span>Near MLA Office, Krishnasamypuram, Kinathukadavu, Coimbatore - 642109</span>
              </div>
            </div>

            {/* Right Column: High-Intent Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto shrink-0">
              <a
                href={telHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary hover:bg-brand-accent px-6 py-3.5 text-sm font-bold text-white shadow-button transition-all duration-200"
              >
                <Phone className="size-4.5" />
                <span>Call Now: {contact.phoneDisplay}</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-brand-dark px-6 py-3.5 text-sm font-bold hover:bg-emerald-50 transition-all duration-200"
              >
                <span>Contact Office</span>
                <ArrowRight className="size-4 text-brand-primary" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

