import Image from "next/image";
import { Award, Handshake, Lightbulb } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GreenCTAButton } from "@/components/ui/GreenCTAButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FounderCard } from "@/components/home/FounderCard";

const features = [
  { label: "Quality Construction", icon: Award },
  { label: "Expert Guidance", icon: Lightbulb },
  { label: "End-to-End Support", icon: Handshake },
] as const;

/** Architectural wireframe to completed building image, introduction, and founder card. */
function AboutVisual() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-brand-soft shadow-soft">
      <Image
        src="/images/about/about.png"
        alt="Architectural design and modern building construction by SKI Construction"
        fill
        sizes="(min-width: 1024px) 35vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
        priority
      />
    </div>
  );
}

/** About SKI Construction: visual, introduction, features and the founder card. */
export function AboutPreview() {
  return (
    <section aria-labelledby="about-heading" className="relative isolate overflow-hidden bg-white py-16 sm:py-20">
      {/* Background decorative team helmet graphic in top-right corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 -z-10 w-44 sm:w-56 md:w-64 lg:w-72 aspect-square select-none"
      >
        <Image
          src="/images/background/team-helmate.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 288px, (min-width: 768px) 256px, 176px"
          className="object-contain object-top-right"
        />
      </div>

      <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr_0.72fr] lg:gap-10">
        <AboutVisual />

        <div className="flex flex-col gap-6">
          <SectionHeading
            size="compact"
            eyebrow="About SKI Construction"
            id="about-heading"
            title="A Trusted Construction Partner in Coimbatore"
            description={
              <>
                SKI Construction is a Coimbatore-based construction and consulting company led by{" "}
                <strong className="font-semibold text-brand-ink">Er. D. Satheeshkumar, DCE., BE.</strong>, a registered
                LBS engineer. We combine engineering expertise, modern design and quality construction to deliver lasting
                spaces for residential and commercial needs.
              </>
            }
          />

          <ul className="grid grid-cols-3 gap-3 sm:gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <li key={feature.label} className="flex flex-col items-start gap-2.5">
                  <Icon aria-hidden="true" className="size-8 text-brand-primary" strokeWidth={1.6} />
                  <span className="text-sm leading-snug font-semibold text-brand-ink">{feature.label}</span>
                </li>
              );
            })}
          </ul>

          <div>
            <GreenCTAButton href="/about" variant="outline" size="md">
              Know More About Us
            </GreenCTAButton>
          </div>
        </div>

        <FounderCard imageSrc="/images/about/about2.png" />
      </Container>
    </section>
  );
}
