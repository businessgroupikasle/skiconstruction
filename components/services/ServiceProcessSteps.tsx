import type { ServiceProcessStep } from "@/data/types";

/** Ordered workflow for one service. Four columns on desktop, stacked on small screens. */
export function ServiceProcessSteps({ steps }: { steps: readonly ServiceProcessStep[] }) {
  return (
    <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {steps.map((step, index) => (
        <li key={step.title} className="relative flex flex-col gap-4 rounded-2xl border border-brand-line bg-white p-6 shadow-soft">
          <span className="flex size-12 items-center justify-center rounded-full bg-brand-primary text-base font-bold text-white shadow-button">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-lg font-bold text-brand-dark">{step.title}</h3>
          <p className="text-sm leading-relaxed text-brand-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
