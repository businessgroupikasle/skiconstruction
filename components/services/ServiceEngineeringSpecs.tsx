import { ShieldCheck, Ruler, Layers, Cpu, Award, FileCheck2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

/**
 * Engineering Standards & Technical Rigor
 * Highlights compliance with Bureau of Indian Standards (IS Codes),
 * quality testing procedures, and digital drafting tools.
 */
export function ServiceEngineeringSpecs() {
  const specs = [
    {
      code: "IS 456:2000",
      title: "Structural Concrete Compliance",
      desc: "All structural columns, beams, footings, and slabs follow Bureau of Indian Standards code of practice for plain and reinforced concrete.",
      icon: ShieldCheck,
    },
    {
      code: "IS 1893:2016",
      title: "Seismic Resistant Design",
      desc: "Earthquake-resistant structural detailing tailored to Coimbatore's seismic zone parameters with ductile reinforcement framing.",
      icon: Ruler,
    },
    {
      code: "Grade 53 & Fe 550",
      title: "Certified Raw Materials",
      desc: "Strict procurement of high-tensile Fe 550D TMT rebars, Grade 53 cement, and clean graded M-sand for maximum compressive strength.",
      icon: Layers,
    },
    {
      code: "Cube Testing",
      title: "7-Day & 28-Day Curing Verification",
      desc: "Mandatory concrete test cubes taken from every slab and column pour, cured and compression tested to ensure M20/M25 load capacities.",
      icon: Award,
    },
    {
      code: "CAD & 3D BIM",
      title: "Precision Digital Modeling",
      desc: "AutoCAD architectural drafting, 3D elevation modeling, and structural detailing prevent on-site rework and material wastage.",
      icon: Cpu,
    },
    {
      code: "LBS & DTCP",
      title: "Statutory Bylaw Alignment",
      desc: "Drawings drafted to 100% compliance with Tamil Nadu Combined Development and Building Rules (TNCDBR) for hassle-free approvals.",
      icon: FileCheck2,
    },
  ];

  return (
    <section aria-labelledby="specs-heading" className="bg-[#f4f8f0]/60 py-14 sm:py-20 border-b border-brand-line/60">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 px-3.5 py-1 text-xs font-mono font-bold text-brand-primary uppercase tracking-widest mb-3">
            <ShieldCheck className="size-3.5" />
            <span>Technical Rigor & Compliance</span>
          </div>

          <h2
            id="specs-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight"
          >
            Engineering Standards & Quality Control
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-brand-muted leading-relaxed">
            We build structures intended to last generations. Our engineering team enforces strict compliance with Indian Standard (IS) codes, certified material testing, and local authority mandates.
          </p>
        </div>

        {/* 6 Technical Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((spec) => {
            const Icon = spec.icon;
            return (
              <div
                key={spec.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-6 border border-brand-line shadow-xs hover:border-brand-primary/40 hover:shadow-soft transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-soft text-brand-primary border border-brand-line group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-mono text-xs font-bold text-brand-primary bg-brand-soft px-2.5 py-1 rounded-md border border-brand-line">
                      {spec.code}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-brand-dark mb-2">
                    {spec.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {spec.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-brand-line/60 flex items-center justify-between text-[11px] font-mono text-brand-primary">
                  <span>VERIFIED SPECIFICATION</span>
                  <span>✓</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

