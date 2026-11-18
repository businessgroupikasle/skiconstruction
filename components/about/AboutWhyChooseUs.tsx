import { ShieldCheck, Award, Eye, FileText, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { founder } from "@/lib/brand";

/**
 * Why Choose SKI Construction & Authorizations
 * Highlights structural accreditations, registered LBS credentials,
 * and our 4 core guarantees to clients.
 */
export function AboutWhyChooseUs() {
  const credentials = [
    {
      title: "Registered LBS Engineer",
      authority: "Coimbatore Municipal Corporation",
      desc: `Direct certification and license held by ${founder.name} (${founder.credentials}), granting statutory authority to prepare and sign municipal building plans.`,
      icon: Award,
    },
    {
      title: "DTCP & LPA Sanction Expertise",
      authority: "Directorate of Town & Country Planning",
      desc: "Comprehensive familiarity with Tamil Nadu Combined Development and Building Rules (TNCDBR) for flawless layout and building permits.",
      icon: FileText,
    },
    {
      title: "100% Transparent Milestone BOQ",
      authority: "Zero Hidden Cost Guarantee",
      desc: "Stage-wise payments released strictly upon verified on-site milestone completion. No unexpected material surcharges or inflated invoices.",
      icon: Eye,
    },
    {
      title: "Direct On-Site Supervision",
      authority: "Civil Engineering Rigor",
      desc: "We do not hand over your project to third-party brokers. Structural casting, column alignment, and curing are checked personally by our chief engineer.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section aria-labelledby="why-us-heading" className="bg-white py-14 sm:py-20 border-b border-brand-line/60">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 px-3.5 py-1 text-xs font-mono font-bold text-brand-primary uppercase tracking-widest mb-3">
            <CheckCircle2 className="size-3.5" />
            <span>Accreditations & Guarantees</span>
          </div>

          <h2
            id="why-us-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight"
          >
            Why Coimbatore Homeowners Trust SKI Construction
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-brand-muted leading-relaxed">
            Building a home or commercial property is often a once-in-a-lifetime investment. Here are the credentials and principles that protect your peace of mind.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {credentials.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#fcfdfa] p-6 sm:p-8 border border-brand-line shadow-xs hover:border-brand-primary/40 hover:shadow-card transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand-primary border border-brand-line group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="size-6" />
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-primary bg-brand-soft px-3 py-1 rounded-md border border-brand-line">
                      VERIFIED
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-brand-dark mb-1">
                    {item.title}
                  </h3>

                  <p className="text-xs font-mono font-bold text-brand-primary mb-2.5">
                    {item.authority}
                  </p>

                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-brand-line/60 flex items-center justify-between text-xs font-semibold text-brand-primary">
                  <span>Authoritative Standards</span>
                  <span className="text-brand-primary">✦ ✦ ✦</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

