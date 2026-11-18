import { Shield, Eye, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { founder } from "@/lib/brand";

/**
 * Why Choose SKI Construction Section
 * 4 Pillars of Engineering Leadership, Transparency, Local Coimbatore Mastery, and Durability.
 */
export function ServiceWhyChooseUs({ serviceName }: { serviceName: string }) {
  const pillars = [
    {
      title: "Direct LBS Engineer Leadership",
      desc: `No middlemen or outsourced supervisors. ${founder.name} (${founder.credentials}, ${founder.role}) personally manages structural designs, approval documentation, and on-site concrete casting.`,
      icon: Shield,
      tag: "EXECUTIVE SUPERVISION",
    },
    {
      title: "100% Milestone-Based Transparency",
      desc: "Detailed Bill of Quantities (BOQ) with zero surprise costs. Payments are split into clear construction milestones, released only after your personal inspection and verification.",
      icon: Eye,
      tag: "ZERO HIDDEN COSTS",
    },
    {
      title: "Coimbatore & Kinathukadavu Mastery",
      desc: "Deep working knowledge of local soil mechanics, red soil vs. black cotton foundation depths, Coimbatore Corporation bylaws, and DTCP/LPA clearance protocols.",
      icon: MapPin,
      tag: "REGIONAL EXPERTISE",
    },
    {
      title: "Generational Structural Longevity",
      desc: "Engineered for durability. From seismic framing and waterproofing to anti-termite treatment and electrical load balancing, we build spaces that stand the test of time.",
      icon: Sparkles,
      tag: "LONG-LASTING QUALITY",
    },
  ];

  return (
    <section aria-labelledby="why-choose-heading" className="bg-white py-14 sm:py-20 border-b border-brand-line/60">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 px-3.5 py-1 text-xs font-mono font-bold text-brand-primary uppercase tracking-widest mb-3">
            <CheckCircle2 className="size-3.5" />
            <span>The SKI Distinction</span>
          </div>

          <h2
            id="why-choose-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight"
          >
            Why Choose SKI Construction for {serviceName}?
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-brand-muted leading-relaxed">
            We merge formal civil engineering discipline with grounded on-site execution. When you entrust your project to us, you receive absolute accountability from blueprint to keys.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#fcfdfa] p-6 sm:p-8 border border-brand-line shadow-xs hover:border-brand-primary/40 hover:shadow-card transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand-primary border border-brand-line group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="size-6" />
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-primary bg-brand-soft px-2.5 py-1 rounded-md border border-brand-line">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-brand-dark mb-2.5">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-brand-line/60 flex items-center justify-between text-xs font-semibold text-brand-primary">
                  <span>Guaranteed Standards</span>
                  <span className="text-brand-accent">✦ ✦ ✦</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

