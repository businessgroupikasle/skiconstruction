import { BenefitCard } from "@/components/home/BenefitCard";
import { Container } from "@/components/ui/Container";
import { benefits } from "@/data/content";

/** Why Choose Us: four benefit cards showcasing SKI Construction advantages. */
export function WhyChooseUsSection() {
  return (
    <section aria-labelledby="why-heading" className="bg-white py-14 sm:py-18 lg:py-20">
      <Container className="flex flex-col gap-7 sm:gap-8">
        <div className="flex flex-col gap-2 max-w-2xl">
          <p className="text-xs font-bold tracking-[0.22em] text-brand-primary uppercase">Why choose us</p>
          <h2 id="why-heading" className="text-2xl sm:text-3xl lg:text-4xl leading-tight font-extrabold text-brand-dark">
            The SKI Construction Advantage
          </h2>
          <p className="text-sm sm:text-base text-brand-muted">
            Engineering expertise, municipal compliance, and transparent financial estimates for every homeowner.
          </p>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {benefits.map((benefit) => (
            <li key={benefit.id}>
              <BenefitCard benefit={benefit} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
