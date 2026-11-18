import Image from "next/image";
import {
  ShieldCheck,
  Award,
  Ruler,
  Compass,
  Phone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { founder, contact } from "@/lib/brand";
import { buildWhatsAppUrl, telHref } from "@/lib/links";

/**
 * Executive Full-Width Founder & Engineering Leadership Banner
 * Editorial architectural design featuring Er. D. Satheeshkumar,
 * Registered LBS Engineer, with direct consultation CTAs and statutory credentials.
 */
export function FounderProfile() {
  const whatsappUrl = buildWhatsAppUrl(
    "Hello Er. D. Satheeshkumar, I would like to consult about construction and architectural plan approval in Coimbatore."
  );

  return (
    <article className="group relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#061e10] via-[#0b2b17] to-[#04150b] p-6 sm:p-10 lg:p-12 shadow-card border border-emerald-500/25 text-white">
      {/* CAD Drafting Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]"
      />

      {/* Ambient Emerald Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-emerald-500/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full bg-brand-primary/20 blur-[100px]"
      />

      {/* Grid: 7 cols Content on Left, 5 cols Photo on Right on lg screens */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Leadership Identity & Credentials */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
          {/* Top Eyebrow Tag */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-300">
              <Compass className="size-3.5 text-brand-accent" />
              <span>LEADERSHIP & CIVIL ENGINEERING</span>
            </span>
            <span className="text-[11px] font-mono text-gray-400">
              COIMBATORE & KINATHUKADAVU
            </span>
          </div>

          {/* Founder Name & Registered Credentials */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {founder.name}
            </h2>
            <p className="mt-1 font-mono text-xs sm:text-sm font-semibold tracking-wide text-emerald-300">
              {founder.credentials} · {founder.role}
            </p>
          </div>

          {/* Three Key Accreditation Badges */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            <div className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-emerald-400/25 px-3 py-1.5 text-xs font-semibold text-emerald-200 backdrop-blur-xs">
              <ShieldCheck className="size-4 text-brand-accent shrink-0" />
              <span>Corporation Registered LBS</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-emerald-400/25 px-3 py-1.5 text-xs font-semibold text-emerald-200 backdrop-blur-xs">
              <Award className="size-4 text-brand-accent shrink-0" />
              <span>DTCP & LPA Approval Specialist</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-emerald-400/25 px-3 py-1.5 text-xs font-semibold text-emerald-200 backdrop-blur-xs">
              <CheckCircle2 className="size-4 text-brand-accent shrink-0" />
              <span>Direct On-Site Supervision</span>
            </div>
          </div>

          {/* Authoritative Engineering Philosophy Statement */}
          <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-gray-200/90 font-normal max-w-2xl">
            Direct civil engineering leadership from initial architectural drafting and soil investigation
            to structural concrete casting and final key handover. We eliminate contractor intermediaries,
            guaranteeing that every beam, column, and foundation is constructed strictly in compliance
            with Bureau of Indian Standards (IS 456).
          </p>

          {/* Direct Contact Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-primary px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-button hover:bg-brand-accent transition-all duration-200"
            >
              <WhatsAppIcon className="size-4" />
              <span>Consult Chief Engineer</span>
            </a>

            <a
              href={telHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-3 text-xs sm:text-sm font-bold text-white transition-all duration-200"
            >
              <Phone className="size-3.5 text-emerald-400" />
              <span>{contact.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Architectural Visual & Field Directive Framing */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="relative h-[260px] sm:h-[300px] lg:h-[340px] w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-brand-dark/80">
            <Image
              src="/images/about/ref/founder-tools.png"
              alt="Civil engineering blueprints, drafting equipment, and structural planning"
              fill
              sizes="(min-width: 1024px) 35vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Precision Gradient Overlays */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none"
            />

            {/* Top-left Drafting Tag */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-md bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-mono tracking-wider text-emerald-300 border border-white/15">
              <Ruler className="size-3 text-brand-accent" />
              <span>FIELD DIRECTIVE</span>
            </div>

            {/* Bottom Overlay Card */}
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/70 backdrop-blur-md p-3 border border-white/15">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Zero Subcontracting Dilution</span>
              </div>
              <p className="text-[11px] text-gray-300 mt-0.5 leading-snug">
                Every concrete pour and structural milestone personally verified by Er. D. Satheeshkumar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
