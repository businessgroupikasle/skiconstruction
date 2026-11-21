import type { Service } from "@/data/types";

/**
 * The 8 Verified Core Services of SKI Construction:
 * 1. Construction
 * 2. Consulting
 * 3. LBS – Plan Approval
 * 4. Vastu Plan
 * 5. 3D Elevation
 * 6. Bank Loan Estimate
 * 7. DTCP / LPA
 * 8. Real Estate
 */
export const services: readonly Service[] = [
  {
    slug: "building-construction",
    name: "Construction",
    summary:
      "Turnkey residential and commercial building construction with supervised engineering quality, IS 456 compliance, and transparent stage-wise schedules.",
    description:
      "End-to-end turnkey building construction for individual houses, modern duplex villas, and commercial premises across Coimbatore and Kinathukadavu. We manage site preparation, structural RCC framework, masonry, services integration, and premium interior-exterior finishes with scheduled milestone oversight.",
    benefits: [
      "Supervised directly by Er. D. Satheeshkumar, Registered LBS Engineer",
      "Reinforced concrete casting compliant with IS 456 standards",
      "Transparent stage-wise BOQ billing and zero hidden costs",
      "Quality certified raw materials and verified concrete testing",
    ],
    image: {
      src: "/images/services/building-construction.png",
      alt: "Building construction site with reinforced concrete framework in Coimbatore",
      width: 1754,
      height: 896,
    },
  },
  {
    slug: "construction-consulting",
    name: "Consulting",
    summary:
      "Independent civil engineering guidance on architectural plans, contractor scopes, material quality audits, and structural safety.",
    description:
      "Independent technical civil engineering consultation for property owners and builders. We evaluate soil reports, review structural drawings, audit contractor estimates, and conduct stage-wise site inspections so your capital is protected and construction quality is assured.",
    benefits: [
      "Independent plan and structural drawing evaluation",
      "Contractor quote and itemized BOQ rate comparison",
      "Stage-wise on-site concrete and structural quality audits",
      "Direct technical advice from a Registered LBS Engineer",
    ],
    image: {
      src: "/images/services/construction-consulting.png",
      alt: "Civil engineering consultant reviewing architectural blueprints on site",
      width: 1754,
      height: 896,
    },
  },
  {
    slug: "lbs-plan-approval",
    name: "LBS – Plan Approval",
    summary:
      "Statutory building plan preparation and municipal submission led directly by a Registered LBS Engineer in full compliance with TNCDBR bylaws.",
    description:
      "Statutory architectural drawing preparation and building permit documentation led by Er. D. Satheeshkumar, Registered LBS Engineer. We handle boundary verification, municipal setback rules, FSI calculations, and portal submissions for swift town panchayat and municipal corporation clearances.",
    benefits: [
      "Direct certification by authorized Registered LBS Engineer",
      "Full compliance with Tamil Nadu Combined Building Rules (TNCDBR)",
      "Accurate boundary, setback, and FSI calculations",
      "End-to-end documentation coordination for municipal permits",
    ],
    image: {
      src: "/images/services/lbs-plan-approval.png",
      alt: "Registered LBS engineer preparing building plan approval drawings",
      width: 1754,
      height: 896,
    },
  },
  {
    slug: "vastu-plan",
    name: "Vastu Plan",
    summary:
      "Scientifically oriented residential house plans harmonizing traditional Vastu principles with natural daylight, ventilation, and modern functional living.",
    description:
      "Practical, scientifically balanced architectural floor plans that integrate authentic Vastu principles with contemporary functional design. We analyze cardinal orientations to align entrance doors, kitchens, master bedrooms, and living spaces while preserving excellent daylight, privacy, and airflow.",
    benefits: [
      "Accurate cardinal orientation and compass alignment for your plot",
      "Harmonious room placement (Kuber, Agni, and Vayu quadrants)",
      "Optimized natural daylighting, ventilation, and spatial efficiency",
      "Fully buildable drawings aligned with municipal setback bylaws",
    ],
    image: {
      src: "/images/services/vastu-plan.png",
      alt: "Vastu compliant residential house floor plan layout with natural lighting",
      width: 1754,
      height: 896,
    },
  },
  {
    slug: "3d-elevation-design",
    name: "3D Elevation",
    summary:
      "High-definition photorealistic 3D exterior visualization, contemporary facade concepts, lighting simulations, and material selection before site work.",
    description:
      "Photorealistic 3D building exterior visualization that helps you finalize facades, balcony railings, roof lines, color palettes, and exterior textures before construction begins. Experience your modern villa in realistic daylight and evening lighting simulations.",
    benefits: [
      "Photorealistic 3D daytime and dusk architectural renders",
      "Contemporary facade styling, texture, and stone cladding options",
      "Easy design revisions on screen before casting site concrete",
      "Directly coordinates with working drawings and approval submissions",
    ],
    image: {
      src: "/images/services/3d-elevation-design.png",
      alt: "Photorealistic 3D elevation design for modern luxury villa in Coimbatore",
      width: 1754,
      height: 896,
    },
  },
  {
    slug: "bank-loan-estimate",
    name: "Bank Loan Estimate",
    summary:
      "Bank-compliant itemized civil engineering estimates and stage-wise Bill of Quantities (BOQ) prepared for fast housing loan approvals.",
    description:
      "Comprehensive, bank-approved civil engineering construction estimates and stage-wise Bill of Quantities (BOQ). Formatted strictly to the valuation standards of nationalized and private banks (SBI, HDFC, Canara Bank, and housing finance companies) for residential construction loans.",
    benefits: [
      "Detailed stage-wise construction cost estimation",
      "Itemized Bill of Quantities (BOQ) in standardized bank formats",
      "Aligned with prevailing market rates and structural specifications",
      "Prompt revisions if architectural floor plans or loan terms change",
    ],
    image: {
      src: "/images/services/bank-loan-estimate.png",
      alt: "Civil engineer preparing bank loan estimate and stage wise BOQ documents",
      width: 1754,
      height: 896,
    },
  },
  {
    slug: "dtcp-lpa-approval",
    name: "DTCP / LPA",
    summary:
      "Technical layout planning, open space reservations, documentation coordination, and procedural guidance for DTCP and LPA approvals.",
    description:
      "Technical layout planning, zoning verification, and procedural guidance for Directorate of Town and Country Planning (DTCP) and Local Planning Authority (LPA) approvals. We assist land promoters, developers, and builders with layout master plans, OSR reservations, and document readiness.",
    benefits: [
      "Zoning verification and master plan land-use feasibility checks",
      "Comprehensive layout master planning and OSR demarcation",
      "Preparation of required CAD drawings and revenue survey files",
      "Technical assistance for departmental queries and compliance",
    ],
    image: {
      src: "/images/services/dtcp-lpa-approval.png",
      alt: "DTCP and LPA layout approval master plan and technical survey documentation",
      width: 1755,
      height: 896,
    },
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    summary:
      "Trusted local property guidance for buying and selling residential plots, villas, and commercial lands across Kinathukadavu and Coimbatore.",
    description:
      "Professional real estate advisory for buyers and sellers across Kinathukadavu, Coimbatore, and Pollachi. We conduct on-site physical inspections, verify DTCP/LPA approval status, assess soil and foundation buildability, and assist with clear-title documentation from enquiry to property registration.",
    benefits: [
      "Technical site inspection evaluating soil, road access, and buildability",
      "Verification of DTCP / LPA layout approvals and revenue records",
      "Property buying assistance with fair market valuation insights",
      "Property selling support and coordinated transaction documentation",
    ],
    image: {
      src: "/images/services/real-estate.png",
      alt: "Residential property plot and modern villa real estate in Kinathukadavu",
      width: 1754,
      height: 896,
    },
  },
] as const;

export function getServiceBySlug(slug: string): Service | undefined {
  // Support canonical slugs and legacy alias redirects
  if (slug === "property-buying-selling") {
    return services.find((service) => service.slug === "real-estate");
  }
  return services.find((service) => service.slug === slug);
}

/** Previous and next services in list order, wrapping at the ends. */
export function getAdjacentServices(slug: string): { previous: Service; next: Service } | undefined {
  const index = services.findIndex((service) => service.slug === slug);
  if (index === -1) return undefined;
  const count = services.length;
  const previous = services[(index - 1 + count) % count];
  const next = services[(index + 1) % count];
  if (!previous || !next) return undefined;
  return { previous, next };
}

/** Other services, starting after the current one, for "related services" lists. */
export function getRelatedServices(slug: string, limit = 3): Service[] {
  const index = services.findIndex((service) => service.slug === slug);
  if (index === -1) return [];
  const others: Service[] = [];
  for (let step = 1; step < services.length && others.length < limit; step += 1) {
    const candidate = services[(index + step) % services.length];
    if (candidate) others.push(candidate);
  }
  return others;
}
