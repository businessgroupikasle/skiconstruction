import {
  Building,
  FileCheck,
  KeyRound,
  MessageCircle,
  PencilRuler,
  type LucideIcon,
} from "lucide-react";
import type { ProcessStep } from "@/data/types";

const iconByKey: Record<ProcessStep["icon"], LucideIcon> = {
  consultation: MessageCircle,
  design: PencilRuler,
  approvals: FileCheck,
  construction: Building,
  handover: KeyRound,
};

/**
 * Five-step work process. A horizontal timeline on desktop and a vertical one
 * on mobile and tablet screens. Steps are numbered and fully responsive.
 */
export function WorkProcessTimeline({ steps }: { steps: readonly ProcessStep[] }) {
  return (
    <ol className="relative grid gap-6 sm:gap-8 lg:grid-cols-5 lg:gap-4">
      {steps.map((step, index) => {
        const Icon = iconByKey[step.icon];
        const isLast = index === steps.length - 1;
        return (
          <li key={step.id} className="relative flex items-start gap-4 sm:gap-5 lg:flex-col lg:items-center lg:text-center">
            {!isLast ? (
              <span
                aria-hidden="true"
                className="absolute top-12 left-7 h-[calc(100%+0.5rem)] w-px border-l-2 border-dashed border-brand-accent/50 sm:left-9 lg:top-10 lg:left-[calc(50%+2.5rem)] lg:h-px lg:w-[calc(100%-5rem)] lg:border-l-0 lg:border-t-2"
              />
            ) : null}
            <span className="relative flex size-14 sm:size-18 lg:size-20 shrink-0 items-center justify-center rounded-full bg-brand-mist text-brand-primary shadow-soft z-10">
              <Icon aria-hidden="true" className="size-6 sm:size-8" strokeWidth={1.6} />
              <span className="absolute -top-1 -right-1 flex size-6 sm:size-7 items-center justify-center rounded-full bg-brand-primary text-[0.7rem] sm:text-xs font-bold text-white shadow-xs">
                {String(index + 1).padStart(2, "0")}
              </span>
            </span>
            <div className="flex flex-col gap-1 pt-1 sm:pt-2 lg:pt-3 min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-bold text-brand-dark">{step.title}</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-brand-muted">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
