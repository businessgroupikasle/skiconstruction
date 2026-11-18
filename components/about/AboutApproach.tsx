import { MapPin, Compass, FileCheck2, Hammer, Key } from "lucide-react";
import { Container } from "@/components/ui/Container";

/**
 * Our Approach / Work Process Section
 * Explains the 5-stage engineering lifecycle that ensures predictable quality,
 * on-time milestones, and stress-free execution for clients.
 */
export function AboutApproach() {
  const steps = [
    {
      num: "01",
      title: "Soil & Site Investigation",
      desc: "Topographical survey, soil bearing capacity (SBC) analysis, and plot orientation check to determine the exact foundation depth and footing type.",
      icon: MapPin,
    },
    {
      num: "02",
      title: "Architectural & 3D Modeling",
      desc: "Drafting optimized floor plans, daylighting analysis, Vastu alignment, and photorealistic 3D exterior elevations before breaking ground.",
      icon: Compass,
    },
    {
      num: "03",
      title: "Approvals & Fixed BOQ",
      desc: "Registered LBS Engineer submission to Coimbatore Corporation or DTCP/LPA, accompanied by an itemized stage-wise cost breakdown.",
      icon: FileCheck2,
    },
    {
      num: "04",
      title: "Directly Supervised Execution",
      desc: "On-site quality supervision by Er. D. Satheeshkumar, IS 456 reinforced concrete compliance, mandatory concrete cube tests, and weekly video logs.",
      icon: Hammer,
    },
    {
      num: "05",
      title: "Inspection & Handover",
      desc: "Comprehensive quality audit, plumbing and electrical pressure tests, statutory completion files, and keys handed over with enduring support.",
      icon: Key,
    },
  ];

  return (
    <section aria-labelledby="approach-heading" className="bg-[#fcfdfa] py-14 sm:py-20 border-b border-brand-line/60">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 px-3.5 py-1 text-xs font-mono font-bold text-brand-primary uppercase tracking-widest mb-3">
            <Compass className="size-3.5" />
            <span>The Construction Lifecycle</span>
          </div>

          <h2
            id="approach-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight"
          >
            A Systematic, Engineering-Led Approach
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-brand-muted leading-relaxed">
            We reject the chaotic, unpredictable nature of traditional construction. Every SKI Construction build is governed by a transparent 5-stage milestone protocol.
          </p>
        </div>

        {/* 5-Step Process Horizontal / Grid Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-5 sm:p-6 border border-brand-line shadow-xs hover:border-brand-primary/40 hover:shadow-card hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-brand-primary bg-brand-soft px-2.5 py-1 rounded-md border border-brand-line">
                      {step.num}
                    </span>
                    <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand-primary border border-brand-line group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="size-5" />
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-brand-dark mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-brand-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-brand-line/60 flex items-center justify-between text-[11px] font-mono text-brand-primary">
                  <span>STAGE {step.num}</span>
                  <span className="text-brand-primary">✓</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

