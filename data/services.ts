import type { Service } from "@/data/types";

/** All nine services, in the order shown on the homepage strip. */
export const services: readonly Service[] = [
  {
    slug: "building-construction",
    name: "Building Construction",
    summary: "Residential and commercial construction, from structure to finishing.",
    description:
      "Complete construction for homes and commercial buildings: site preparation, structural work, masonry, finishing and handover, run with clear milestones and a single point of contact.",
    benefits: [
      "Structural planning with clear milestones",
      "Quality materials and supervised workmanship",
      "Transparent cost tracking and progress updates",
      "Finishing and handover-ready inspection",
    ],
    image: {
      src: "/images/services/building-construction.png",
      alt: "Construction site with reinforcement steel and workers on a concrete slab",
      width: 1754,
      height: 896,
    },
  },
  {
    slug: "3d-elevation-design",
    name: "3D Elevation Design",
    summary: "See the exterior of your home in 3D before construction begins.",
    description:
      "Realistic 3D elevation views that settle the facade, balconies, materials and colours early, so changes happen on screen rather than on site.",
    benefits: [
      "Realistic 3D exterior views",
      "Facade, material and colour options",
      "Revisions before construction starts",
      "Helps with budgeting and approval drawings",
    ],
    image: {
      src: "/images/services/3d-elevation-design.png",
      alt: "Modern house exterior with warm lighting at dusk",
      width: 1754,
      height: 896,
    },
  },
  {
    slug: "construction-consulting",
    name: "Construction Consulting",
    summary: "Practical guidance on plans, contractors, materials and sequencing.",
    description:
      "Independent advice at each stage: choosing the right plan, defining scope for contractors, comparing materials and sequencing the work so decisions are informed.",
    benefits: [
      "Plan and scope review before you commit",
      "Contractor and material comparison",
      "Stage-wise site guidance",
      "A single point of advice throughout",
    ],
    image: {
      src: "/images/services/construction-consulting.png",
      alt: "Aerial view of a construction site with engineers in safety helmets",
      width: 1754,
      height: 896,
    },
  },
  {
    slug: "bank-loan-estimate",
    name: "Bank Loan Estimate",
    summary: "Organised cost estimates to support your home loan discussions.",
    description:
      "Itemised construction estimates and a stage-wise cost breakdown, organised so you can take a clear budget into your home loan conversations.",
    benefits: [
      "Itemised construction estimate",
      "Stage-wise cost breakdown",
      "Document checklist for loan discussions",
      "Easy to revise as the design changes",
    ],
    image: {
      src: "/images/services/bank-loan-estimate.png",
      alt: "Two people signing paperwork at a desk",
      width: 1754,
      height: 896,
    },
  },
  {
    slug: "lbs-plan-approval",
    name: "LBS Plan Approval",
    summary: "Plan documentation and approval support led by a registered LBS engineer.",
    description:
      "Preparation and coordination of plan documentation for LBS approval, led by a registered LBS engineer who keeps the paperwork and drawings aligned.",
    benefits: [
      "Plan documentation prepared for approval",
      "Coordinated drawings and checklists",
      "Led by a registered LBS engineer",
      "Clear status updates at each step",
    ],
    image: {
      src: "/images/services/lbs-plan-approval.png",
      alt: "Architect drafting plans on a table with a scale ruler",
      width: 1754,
      height: 896,
    },
  },
  {
    slug: "dtcp-lpa-approval",
    name: "DTCP / LPA Approval",
    summary: "Guidance through DTCP and LPA approval requirements.",
    description:
      "Support understanding and completing the Directorate of Town and Country Planning (DTCP) and Local Planning Authority (LPA) requirements for layouts and building plans.",
    benefits: [
      "Requirement checklist for DTCP / LPA",
      "Help assembling application documents",
      "Follow-up on queries and revisions",
      "Plain-language explanation at every step",
    ],
    image: {
      src: "/images/services/dtcp-lpa-approval.png",
      alt: "Approval checklist on a clipboard next to a laptop",
      width: 1755,
      height: 896,
    },
  },
  {
    slug: "vastu-plan",
    name: "Vastu Plan",
    summary: "Layouts that respect Vastu principles alongside everyday practicality.",
    description:
      "Layout planning that considers Vastu principles together with light, ventilation, circulation and privacy, so the home feels right and works well day to day.",
    benefits: [
      "Room placement guided by Vastu principles",
      "Light and ventilation considered",
      "Practical circulation and privacy",
      "Adjusted to your family's preferences",
    ],
    image: {
      src: "/images/services/vastu-plan.png",
      alt: "Bright living room with indoor plants and warm wooden furniture",
      width: 1754,
      height: 896,
    },
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    summary: "Local property guidance for plots, houses and developments.",
    description:
      "Practical guidance on plots, houses and developments in and around Kinathukadavu and Coimbatore, including site visits and location advice.",
    benefits: [
      "Local area guidance",
      "Site visits arranged on request",
      "Honest, practical advice on options",
      "Support from enquiry to decision",
    ],
    image: {
      src: "/images/services/real-estate.png",
      alt: "White family house with a covered porch and a green lawn",
      width: 1754,
      height: 896,
    },
  },
  {
    slug: "property-buying-selling",
    name: "Property Buying & Selling",
    summary: "Personal support for buyers and sellers, from documents to handover.",
    description:
      "Support for buyers and sellers: document checks, discussion of value and coordinated next steps so each transaction is clear and organised.",
    benefits: [
      "Document checklist for buyers and sellers",
      "Coordinated next steps",
      "Practical local market guidance",
      "Personal support throughout",
    ],
    image: {
      src: "/images/services/property-buying-selling.png",
      alt: "Model house resting on a table beside a set of house keys",
      width: 1755,
      height: 896,
    },
  },
] as const;

export function getServiceBySlug(slug: string): Service | undefined {
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
