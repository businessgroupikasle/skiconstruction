import Image from "next/image";
import { Home, Building2, Factory, CheckCircle, Award } from "lucide-react";
import type { Service, ServiceDetail } from "@/data/types";

interface ServiceOverviewProps {
  service: Service;
  detail: ServiceDetail;
}

/**
 * Service Overview Section
 * Clean architectural presentation showcasing scope, residential & commercial
 * capabilities, and structural credentials.
 */
export function ServiceOverviewSection({ service, detail }: ServiceOverviewProps) {
  const categories = [
    {
      title: "Residential Architecture",
      desc: "Custom villas, independent duplexes, and residential apartments.",
      icon: Home,
    },
    {
      title: "Commercial & Retail",
      desc: "Office complexes, commercial showrooms, and business premises.",
      icon: Building2,
    },
    {
      title: "Industrial & Development",
      desc: "Warehouses, industrial sheds, and approved plot layouts.",
      icon: Factory,
    },
  ];

  const overviewParagraphs =
    detail.overview && detail.overview.length > 0
      ? detail.overview
      : [
          `SKI Construction delivers complete ${service.name.toLowerCase()} solutions tailored to the soil, bylaws, and climate conditions of Coimbatore and Kinathukadavu.`,
          "Every phase is systematically planned under the direct leadership of our Registered LBS Engineer to guarantee structural longevity, flawless legal compliance, and on-schedule handover.",
        ];

  return (
    <section aria-labelledby="overview-heading" className="bg-[#fbfdf9] py-14 sm:py-20 border-b border-brand-line/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Framed Image with Technical Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[320px] sm:h-[380px] lg:h-[440px] rounded-3xl overflow-hidden shadow-card border border-brand-line bg-brand-soft">
              <Image
                src="/images/about/ref/helmet-blueprint.png"
                alt={`${service.name} engineering planning and on-site blueprint supervision by SKI Construction`}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
              />

              {/* On-site Engineering Tag */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-white/95 p-3.5 backdrop-blur-md shadow-soft border border-brand-line">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-brand-primary text-white shadow-xs">
                    <Award className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-dark">Registered LBS Engineer</p>
                    <p className="text-[11px] text-brand-muted">Coimbatore Municipal Corporation</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-wider bg-brand-soft px-2.5 py-1 rounded-md border border-brand-line">
                  VERIFIED
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Scope Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-2.5">
              <span className="h-0.5 w-6 bg-brand-accent rounded-full inline-block" />
              <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-primary">
                Service Scope & Engineering
              </span>
            </div>

            {/* Title */}
            <h2
              id="overview-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight mb-5"
            >
              Engineered Excellence in {service.name}
            </h2>

            {/* Description */}
            <div className="space-y-3.5 text-sm sm:text-base text-brand-muted leading-relaxed mb-8">
              {overviewParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* 3 Scope Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.title}
                    className="flex flex-col gap-2 p-4 rounded-2xl bg-white border border-brand-line shadow-xs hover:border-brand-primary/40 hover:shadow-soft transition-all duration-200"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand-primary border border-brand-line">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="text-sm font-bold text-brand-dark mt-1">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
