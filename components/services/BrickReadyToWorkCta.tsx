import { MessageSquare, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { founder, contact } from "@/lib/brand";
import { buildServiceEnquiryUrl, telHref } from "@/lib/links";

/**
 * Section 5: "Ready to work with Together?" High-Impact CTA Banner
 * Matches brickbybrickworks.com Section 5:
 * - Headline: "Ready to work with Together?"
 * - Subtext: "Join together with us to turn your concept into a sustainable framework. As experienced builders in Coimbatore, we prioritize quality, transparency, and cooperation..."
 * - Action: "Get Quote" button + direct call button
 */
export function BrickReadyToWorkCta({ serviceName }: { serviceName: string }) {
  const whatsappUrl = buildServiceEnquiryUrl(serviceName);

  return (
    <section aria-label="Ready to work together" className="bg-[#fcfdfa] py-12 sm:py-16">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#071911] via-[#0d2a1d] to-[#123a28] text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-brand-primary/30">
          {/* Subtle Ambient Light Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-brand-accent/20 blur-3xl"
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3.5 py-1 text-xs font-mono font-bold text-emerald-300 uppercase tracking-widest mb-3.5">
                <ShieldCheck className="size-3.5 text-brand-accent" />
                <span>Leadership by Er. D. Satheeshkumar</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Ready to work with Together?
              </h2>

              <p className="mt-3.5 text-sm sm:text-base text-gray-200/90 leading-relaxed">
                Join together with us to turn your concept into a sustainable framework. As experienced builders in Coimbatore, we prioritize quality, transparency, and cooperation to provide outcomes that accurately represent your objectives.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-4 text-sm font-bold text-white shadow-button hover:bg-brand-accent transition-all duration-200"
              >
                <MessageSquare className="size-4.5" />
                <span>Get Quote</span>
              </a>

              <a
                href={telHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-4 text-sm font-semibold text-white backdrop-blur-xs transition-all duration-200"
              >
                <Phone className="size-4 text-emerald-400" />
                <span>{contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

