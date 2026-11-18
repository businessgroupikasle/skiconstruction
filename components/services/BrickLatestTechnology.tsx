import Image from "next/image";
import { Cpu, Layers, CheckCircle2, Ruler } from "lucide-react";
import { Container } from "@/components/ui/Container";

/**
 * Section 4: "Using the Latest Technology"
 * Matches brickbybrickworks.com Section 4:
 * - Left: Headline, description of modern technology & eco-friendly materials, and 2 feature cards (Design & Build, Build a Project)
 * - Right: High-resolution modern project / engineering visual
 */
export function BrickLatestTechnology() {
  const features = [
    {
      title: "Design & Build",
      desc: "Customized design and construction services offered with originality, engineering quality, and millimeter accuracy.",
      icon: Cpu,
    },
    {
      title: "Build a Project",
      desc: "Execute your project with meticulous planning, high-quality IS-standard materials, and consistent on-time delivery.",
      icon: Layers,
    },
  ];

  return (
    <section aria-labelledby="technology-heading" className="bg-white py-14 sm:py-20 border-b border-brand-line/60">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading, Tech Narrative & 2 Feature Boxes (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="h-0.5 w-6 bg-brand-accent rounded-full inline-block" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-brand-primary">
                Modern Engineering
              </span>
            </div>

            <h2
              id="technology-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight mb-5"
            >
              Using the Latest Technology
            </h2>

            <p className="text-sm sm:text-base text-brand-muted leading-relaxed mb-8">
              We use innovative construction technologies to ensure that every job is completed accurately, quickly, and with outstanding quality. From 3D BIM design tools and automated site surveying to environmentally friendly building materials, we create efficient and future-ready spaces. As creative civil engineers and builders in Coimbatore, we are committed to providing advanced solutions that satisfy changing client demands and rigorous industry standards.
            </p>

            {/* 2 Feature Cards matching brickbybrickworks.com (Design & Build, Build a Project) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="flex flex-col gap-2.5 p-5 rounded-2xl bg-[#fcfdfa] border border-brand-line shadow-xs hover:border-brand-primary/40 hover:shadow-soft transition-all duration-200"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand-primary border border-brand-line shadow-xs">
                      <Icon className="size-5.5" />
                    </span>
                    <h3 className="text-base font-bold text-brand-dark mt-1">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: High-Resolution Engineering Visual (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[320px] sm:h-[400px] lg:h-[460px] rounded-3xl overflow-hidden shadow-card border border-brand-line bg-brand-soft">
              <Image
                src="/images/projects/modern-residence.jpg"
                alt="Modern technology in construction by SKI Construction in Coimbatore"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
              />

              {/* Engineering Tag Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-white/95 p-3.5 backdrop-blur-md shadow-soft border border-brand-line">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-brand-primary text-white">
                    <Ruler className="size-4" />
                  </div>
                  <span className="text-xs font-bold text-brand-dark">AutoCAD & 3D BIM Precision</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-brand-primary bg-brand-soft px-2.5 py-1 rounded-md border border-brand-line">
                  IS 456
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

