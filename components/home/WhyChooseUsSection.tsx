import { BenefitCard } from "@/components/home/BenefitCard";
import { Container } from "@/components/ui/Container";
import { benefits } from "@/data/content";

/** Why Choose Us: four glassy benefit cards showcasing SKI Construction advantages. */
export function WhyChooseUsSection() {
  return (
    <section
      aria-labelledby="why-heading"
      className="relative isolate overflow-hidden bg-gradient-to-b from-brand-soft/60 via-white to-brand-soft/30 py-16 sm:py-20 lg:py-24"
    >
      {/* Soft Ambient Radial Light for Glassmorphism Depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-brand-accent/10 blur-3xl -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 size-96 rounded-full bg-brand-primary/10 blur-3xl -z-10"
      />

      <Container className="flex flex-col gap-8 sm:gap-10">
        <div className="flex flex-col gap-2.5 max-w-2xl">
          <p className="text-xs font-bold tracking-[0.22em] text-brand-primary uppercase">Why choose us</p>
          <h2 id="why-heading" className="text-2xl sm:text-3xl lg:text-4xl leading-tight font-extrabold text-brand-dark">
            The SKI Construction Advantage
          </h2>
          <p className="text-sm sm:text-base text-brand-muted">
            Engineering expertise, municipal compliance, and transparent financial estimates for every homeowner.
          </p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {benefits.map((benefit) => (
            <li key={benefit.id} className="h-full">
              <BenefitCard benefit={benefit} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
