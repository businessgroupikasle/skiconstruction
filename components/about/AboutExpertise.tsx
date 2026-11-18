import Link from "next/link";
import { Home, Building2, Layers, FileCheck, Calculator, Compass, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

/**
 * Our Core Expertise & Industries We Serve
 * Explains technical capabilities across residential, commercial, statutory,
 * and design domains in Coimbatore.
 */
export function AboutExpertise() {
  const capabilities = [
    {
      title: "Residential Villas & Duplexes",
      desc: "Turnkey architectural construction tailored to Coimbatore's soil and climate, featuring reinforced concrete frames and high-end finishes.",
      icon: Home,
      href: "/services/building-construction",
    },
    {
      title: "Commercial & Retail Complexes",
      desc: "Multi-level office buildings, modern commercial showrooms, and warehouse spaces built for operational efficiency and structural durability.",
      icon: Building2,
      href: "/services/building-construction",
    },
    {
      title: "3D Elevation & Facade Design",
      desc: "Photorealistic 3D architectural renders, day/night lighting simulations, and material palettes to visualize homes before groundbreaking.",
      icon: Layers,
      href: "/services/3d-elevation-design",
    },
    {
      title: "LBS & DTCP / LPA Approvals",
      desc: "Registered LBS Engineer coordination for building permits, layout sanctions, and statutory Coimbatore Corporation submissions.",
      icon: FileCheck,
      href: "/services/lbs-plan-approval",
    },
    {
      title: "Bank Loan Cost Estimates",
      desc: "Detailed stage-wise Bill of Quantities (BOQ) and valuation documentation compliant with leading nationalized and private bank loan formats.",
      icon: Calculator,
      href: "/services/bank-loan-estimate",
    },
    {
      title: "Vastu Architecture Planning",
      desc: "Harmonizing traditional Vastu Shastra principles with modern daylighting, cross-ventilation, and contemporary living spaces.",
      icon: Compass,
      href: "/services/vastu-plan",
    },
  ];

  return (
    <section aria-labelledby="expertise-heading" className="bg-white py-14 sm:py-20 border-b border-brand-line/60">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 px-3.5 py-1 text-xs font-mono font-bold text-brand-primary uppercase tracking-widest mb-3">
            <Building2 className="size-3.5" />
            <span>Comprehensive Disciplines</span>
          </div>

          <h2
            id="expertise-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight"
          >
            Engineering Expertise Under One Roof
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-brand-muted leading-relaxed">
            From preliminary plot assessment and statutory approvals to photorealistic 3D facades and turnkey construction, our team delivers complete end-to-end solutions.
          </p>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#fcfdfa] p-6 sm:p-7 border border-brand-line shadow-xs hover:border-brand-primary/40 hover:shadow-card hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-soft text-brand-primary border border-brand-line group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="size-5.5" />
                    </span>
                    <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider group-hover:text-brand-primary transition-colors">
                      LEARN MORE
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-brand-line/60 flex items-center justify-between text-xs font-bold text-brand-primary">
                  <span>View Details</span>
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

