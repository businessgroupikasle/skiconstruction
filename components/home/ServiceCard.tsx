import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { GreenCTAButton } from "@/components/ui/GreenCTAButton";
import { WhatsAppIcon } from "@/components/ui/icons";
import type { Service } from "@/data/types";
import { buildServiceContactHref, buildServiceEnquiryUrl } from "@/lib/links";

interface ServiceCardProps {
  service: Service;
  index?: number;
  /** compact: horizontal card for homepage 3x3 grid. detailed: full content for /services */
  variant?: "compact" | "detailed";
  /** Alternates the image side in the detailed layout */
  reverse?: boolean;
}

export function ServiceCard({ service, index = 0, variant = "compact", reverse = false }: ServiceCardProps) {
  const detailHref = `/services/${service.slug}`;

  if (variant === "compact") {
    return (
      <article className="group relative flex h-full min-h-[168px] sm:min-h-[182px] overflow-hidden rounded-2xl sm:rounded-3xl border border-brand-line/80 bg-white shadow-soft transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-card hover:border-brand-primary/50">
        <Link
          href={detailHref}
          className="relative flex size-full items-stretch justify-between"
        >
          {/* Left Content Area: Text smoothly merges towards the right photo */}
          <div className="relative z-10 flex flex-1 flex-col justify-between p-4 sm:p-5 pr-2 min-w-0">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <div className="flex items-center gap-1.5">
                <span className="flex size-5 items-center justify-center rounded-full bg-brand-soft text-[0.65rem] font-bold text-brand-primary border border-brand-line/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.62rem] font-bold uppercase tracking-wider text-brand-primary">
                  Service
                </span>
              </div>

              <h3 className="text-[0.95rem] sm:text-[1.02rem] xl:text-[1.08rem] font-extrabold text-brand-dark leading-snug group-hover:text-brand-primary transition-colors">
                {service.name}
              </h3>

              <p className="text-[0.73rem] sm:text-[0.78rem] leading-relaxed text-brand-muted line-clamp-2">
                {service.summary}
              </p>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-[0.74rem] sm:text-[0.78rem] font-bold text-brand-primary group-hover:text-brand-dark transition-colors">
                Explore
                <ArrowRight aria-hidden="true" className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </div>

          {/* Right Image: Full-height, edge-to-edge merged with soft gradient blend */}
          <div className="relative w-[38%] sm:w-[42%] md:w-[40%] shrink-0 overflow-hidden">
            {/* The photo is 2:1 and object-cover fills this box by height, so it is drawn about 2x the box height wide.
                `sizes` must describe that drawn width, not the narrow box, or the optimizer serves a blurry low-res copy. */}
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              quality={95}
              sizes="(min-width: 1280px) 480px, (min-width: 768px) 420px, 380px"
              className="size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
            />
            {/* Seamless Merge Blend: soft white-to-transparent gradient melting image into text area */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-12 sm:w-16 bg-gradient-to-r from-white via-white/70 to-transparent pointer-events-none"
            />
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article
      id={service.slug}
      aria-labelledby={`${service.slug}-title`}
      className={`scroll-mt-28 grid items-center gap-8 rounded-3xl border border-brand-line bg-white p-5 shadow-soft sm:p-8 lg:grid-cols-2 lg:gap-12 ${
        reverse ? "lg:[&>div:first-child]:order-2" : ""
      }`}
    >
      <Link href={detailHref} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl" aria-label={`${service.name}: view service details`}>
        <Image
          src={service.image.src}
          alt={service.image.alt}
          width={service.image.width}
          height={service.image.height}
          sizes="(min-width: 1024px) 45vw, 92vw"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h3 id={`${service.slug}-title`} className="text-2xl font-extrabold text-brand-dark sm:text-3xl">
            {service.name}
          </h3>
          <p className="text-[0.97rem] leading-relaxed text-brand-muted">{service.description}</p>
        </div>

        <ul className="grid gap-2.5 sm:grid-cols-2">
          {service.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2.5 text-sm text-brand-ink">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-mist text-brand-primary">
                <Check aria-hidden="true" className="size-3.5" strokeWidth={3} />
              </span>
              {benefit}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3 pt-1">
          <GreenCTAButton href={buildServiceEnquiryUrl(service.name)} newTab icon="none" size="md">
            <WhatsAppIcon className="size-5" />
            Enquire on WhatsApp
          </GreenCTAButton>
          <GreenCTAButton href={buildServiceContactHref(service.name)} variant="outline" size="md">
            Send an enquiry
          </GreenCTAButton>
        </div>

        <Link href={detailHref} className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand-primary hover:underline">
          View service details
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
