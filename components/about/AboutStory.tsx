import { History, Calendar, CheckCircle2, Building, ShieldCheck, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { founder } from "@/lib/brand";

/**
 * Our Story & Company Journey Section
 * Authentic narrative detailing SKI Construction's civil engineering roots in Kinathukadavu,
 * founder leadership, and evolution into a premier Coimbatore construction firm.
 */
export function AboutStory() {
  const milestones = [
    {
      year: "Origins",
      title: "Civil Engineering Foundations",
      desc: "Founded in Kinathukadavu by Er. D. Satheeshkumar (DCE., BE.) with a clear commitment: replacing contractor guesswork with certified civil engineering standards.",
      icon: Compass,
    },
    {
      year: "Accreditation",
      title: "Registered LBS Authority",
      desc: "Earned official Registered Licensed Building Surveyor (LBS) recognition under the Coimbatore Municipal Corporation, enabling direct statutory plan approvals.",
      icon: ShieldCheck,
    },
    {
      year: "Integration",
      title: "Turnkey Design-Build Expansion",
      desc: "Integrated photorealistic 3D elevation design, computerized BOQ stage estimations, and structural drafting under one roof for complete client transparency.",
      icon: Building,
    },
    {
      year: "Present",
      title: "Premier Regional Construction Firm",
      desc: "Delivering turnkey luxury villas, commercial showrooms, DTCP & LPA layouts, and structural consulting across Kinathukadavu, Coimbatore, and Pollachi.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section aria-labelledby="story-heading" className="bg-[#fcfdfa] py-14 sm:py-20 border-b border-brand-line/60">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 px-3.5 py-1 text-xs font-mono font-bold text-brand-primary uppercase tracking-widest mb-3">
            <History className="size-3.5" />
            <span>Our Heritage & Milestones</span>
          </div>

          <h2
            id="story-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight"
          >
            Rooted in Kinathukadavu, Built for Coimbatore
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-brand-muted leading-relaxed">
            From our founding headquarters near the MLA Office in Kinathukadavu to iconic projects across Coimbatore, our journey has been defined by one non-negotiable rule: engineering integrity comes before profit.
          </p>
        </div>

        {/* Milestone Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-6 sm:p-7 border border-brand-line shadow-xs hover:border-brand-primary/40 hover:shadow-card hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Top Bar: Era Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-brand-primary bg-brand-soft px-3 py-1 rounded-lg border border-brand-line">
                      {item.year}
                    </span>
                    <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand-primary border border-brand-line group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="size-5" />
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-brand-dark mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-brand-line/60 flex items-center justify-between text-[11px] font-mono text-brand-primary">
                  <span>PHASE 0{idx + 1}</span>
                  <span className="text-brand-primary">●</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

