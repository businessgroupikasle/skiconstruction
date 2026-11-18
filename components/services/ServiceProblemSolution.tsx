import { AlertCircle, CheckCircle2, ShieldAlert, Sparkles, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

/**
 * Problems We Solve vs. The SKI Construction Solution
 * A high-converting comparison grid highlighting real customer pain points
 * and how our engineering-first method solves them with absolute certainty.
 */
export function ServiceProblemSolution({ serviceName }: { serviceName: string }) {
  const comparisons = [
    {
      problem: "Unpredictable Cost Escalations",
      problemDesc:
        "Contractors quoting low initial rates then inflating final bills with surprise add-ons and hidden material charges.",
      solution: "Fixed Stage-Wise BOQ Estimation",
      solutionDesc:
        "Every brick, steel grade, and finishing spec is itemized in advance. No mid-project cost surprises without written client approval.",
    },
    {
      problem: "Unsupervised Labor & Weak Quality",
      problemDesc:
        "Unskilled subcontractors mixing improper concrete ratios, skipping curing times, and causing long-term structural cracks.",
      solution: "Direct Registered LBS Supervision",
      solutionDesc:
        "Er. D. Satheeshkumar personally inspects foundation, column reinforcement, and slab casting with certified cube strength tests.",
    },
    {
      problem: "Painful Approval Delays & Bylaw Penalties",
      problemDesc:
        "Plans drafted without local municipality alignment getting rejected by Coimbatore Corporation or DTCP/LPA authorities.",
      solution: "Official In-House LBS Licensing",
      solutionDesc:
        "As an authorized Registered LBS Engineer, our drawings adhere 100% to Tamil Nadu Combined Development and Building Rules.",
    },
    {
      problem: "Unresponsive Contractors & Empty Promises",
      problemDesc:
        "Leaving clients in the dark with delayed timelines, missed handovers, and untraceable milestone completion.",
      solution: "Milestone-Linked Handover & Weekly Logs",
      solutionDesc:
        "Progress is documented with weekly photographic and video logs. You only pay for verified, completed milestones.",
    },
  ];

  return (
    <section aria-labelledby="problem-solution-heading" className="bg-white py-14 sm:py-20 border-b border-brand-line/60">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/20 px-3.5 py-1 text-xs font-mono font-bold text-red-600 uppercase tracking-widest mb-3">
            <ShieldAlert className="size-3.5" />
            <span>Eliminating Industry Risks</span>
          </div>

          <h2
            id="problem-solution-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight"
          >
            Common Industry Challenges vs. Our Engineered Solution
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-brand-muted leading-relaxed">
            Building in Coimbatore requires structural precision, local bylaw compliance, and strict financial transparency.
            Here is how SKI Construction guarantees peace of mind for your {serviceName.toLowerCase()}.
          </p>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {comparisons.map((item, index) => (
            <div
              key={index}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-brand-line bg-[#fcfdfa] p-6 sm:p-7 shadow-xs hover:border-brand-primary/40 hover:shadow-card transition-all duration-300"
            >
              {/* Problem Area (Red Tint) */}
              <div className="rounded-2xl bg-red-50/70 border border-red-100 p-4 mb-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700">
                  <AlertCircle className="size-4 shrink-0 text-red-600" />
                  <span>The Usual Industry Risk</span>
                </div>
                <h3 className="mt-1.5 text-base font-bold text-red-950">
                  {item.problem}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-red-800/80 leading-relaxed">
                  {item.problemDesc}
                </p>
              </div>

              {/* Solution Area (Green Tint) */}
              <div className="rounded-2xl bg-brand-soft border border-brand-line p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
                    <CheckCircle2 className="size-4 shrink-0 text-brand-accent" />
                    <span>SKI Construction Guarantee</span>
                  </div>
                  <h4 className="mt-1.5 text-base font-bold text-brand-dark">
                    {item.solution}
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {item.solutionDesc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

