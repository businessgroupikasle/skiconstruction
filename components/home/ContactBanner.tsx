import { Container } from "@/components/ui/Container";
import { GreenCTAButton } from "@/components/ui/GreenCTAButton";
import { contact } from "@/lib/brand";
import { telHref } from "@/lib/links";

interface ContactBannerProps {
  title?: string;
  description?: string;
}

/** Full-width green call-to-action used at the foot of the main pages. */
export function ContactBanner({
  title = "Ready to Build Your Dream Project?",
  description = "Get expert consultation, plan approval and a tailor-made construction solution.",
}: ContactBannerProps) {
  return (
    <section aria-labelledby="contact-banner-title" className="relative isolate overflow-hidden bg-brand-gradient text-white">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 h-full w-1/2 opacity-15"
        viewBox="0 0 500 160"
        preserveAspectRatio="xMinYMid slice"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.1"
      >
        <path d="M20 160 V70 L90 30 L160 70 V160" />
        <path d="M110 160 V100 H150 V160" />
        <path d="M200 160 V40 H300 V160 M230 60 H270 M230 100 H270" />
      </svg>
      <Container className="flex flex-col gap-6 py-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2">
          <h2 id="contact-banner-title" className="text-2xl font-extrabold sm:text-3xl lg:text-[2rem]">
            {title}
          </h2>
          <p className="text-sm text-white/90 sm:text-base">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <GreenCTAButton href={telHref} variant="ghost-light" icon="phone" size="md" ariaLabel={`Call ${contact.phoneDisplay}`}>
            {contact.phoneDisplay}
          </GreenCTAButton>
          <GreenCTAButton href="/contact" variant="white" size="md">
            Get a Free Quote
          </GreenCTAButton>
        </div>
      </Container>
    </section>
  );
}
