import { MessageSquare, Compass, FileText, Hammer, Handshake } from "lucide-react";

/**
 * Our Process Section
 * - Eyebrow: "Our Process"
 * - Headline: "A Systematic Construction Approach"
 * - Subtext: "A clear, transparent and efficient process that ensures quality, cost control and timely delivery."
 * - 5 set-square nodes joined by a dashed gold drafting line
 */
export function ServiceProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Consultation & Requirement",
      icon: MessageSquare,
    },
    {
      num: "02",
      title: "Planning & Design",
      icon: Compass,
    },
    {
      num: "03",
      title: "Approvals & Estimation",
      icon: FileText,
    },
    {
      num: "04",
      title: "Construction & Execution",
      icon: Hammer,
    },
    {
      num: "05",
      title: "Handover & Support",
      icon: Handshake,
    },
  ];

  return (
    <section aria-labelledby="process-heading" className="bg-[#fbfdf9] py-14 sm:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-0.5 w-6 bg-[#d4972a] rounded-full inline-block" />
            <span className="text-[0.72rem] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#d4972a]">
              Our Process
            </span>
          </div>

          <h2
            id="process-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#11231a] tracking-tight leading-tight mb-3"
          >
            A Systematic Construction Approach
          </h2>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
            A clear, transparent and efficient process that ensures quality, cost control and timely delivery.
          </p>
        </div>

        {/* 5 Process Steps */}
        <ol className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === steps.length - 1;

            return (
              <li
                key={step.num}
                className={`group relative flex flex-col items-start gap-5 ${
                  isLast
                    ? ""
                    : "lg:after:absolute lg:after:top-8 lg:after:left-20 lg:after:-right-4 lg:after:h-px lg:after:border-t lg:after:border-dashed lg:after:border-[#d4972a]/70"
                }`}
              >
                {/* Set-square node: a rotated tile with the icon held upright */}
                <span className="relative flex size-16 shrink-0 items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rotate-45 rounded-xl border-2 border-[#143d2b]/25 bg-[#eef7f0] transition-all duration-500 group-hover:rotate-[225deg] group-hover:border-[#143d2b] group-hover:bg-[#143d2b]"
                  />
                  <Icon className="relative size-6 text-[#143d2b] transition-colors duration-500 group-hover:text-white sm:size-7" />
                </span>

                {/* Outlined step number */}
                <span className="text-[2.75rem] leading-none font-extrabold text-transparent [-webkit-text-stroke:1px_#d4972a] transition-all duration-500 group-hover:[-webkit-text-stroke:1px_#143d2b]">
                  {step.num}
                </span>

                {/* Step Title */}
                <h3 className="max-w-[11rem] border-l-2 border-[#d4972a] pl-3 text-xs sm:text-sm font-bold text-[#11231a] leading-snug">
                  {step.title}
                </h3>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
