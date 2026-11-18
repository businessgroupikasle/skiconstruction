import type {
  Benefit,
  NavItem,
  ProcessStep,
  Project,
  Stat,
  Testimonial,
} from "@/data/types";
import { services } from "@/data/services";

export const navigationItems: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: services.map((service) => ({
      label: service.name,
      href: `/services/${service.slug}`,
    })),
  },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const footerQuickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Illustrative project examples. The imagery is design inspiration, not verified
 * photography of completed work. Replace with real projects before launch.
 */
export const projects: readonly Project[] = [
  {
    id: "luxury-villa",
    title: "Luxury Villa",
    category: "Residential",
    illustrative: true,
    image: {
      src: "/images/projects/luxury-villa.jpg",
      alt: "Illustrative example: contemporary villa with glass walls and a pool",
      width: 1000,
      height: 667,
    },
  },
  {
    id: "modern-residence",
    title: "Modern Residence",
    category: "Residential",
    illustrative: true,
    image: {
      src: "/images/projects/modern-residence.jpg",
      alt: "Illustrative example: white modern residence with terrace and pool",
      width: 1000,
      height: 667,
    },
  },
  {
    id: "contemporary-villa",
    title: "Contemporary Villa",
    category: "Residential",
    illustrative: true,
    image: {
      src: "/images/projects/contemporary-villa.jpg",
      alt: "Illustrative example: contemporary house with timber cladding and a lawn",
      width: 1000,
      height: 667,
    },
  },
  {
    id: "coastal-residence",
    title: "Coastal Residence",
    category: "Residential",
    illustrative: true,
    image: {
      src: "/images/projects/coastal-residence.jpg",
      alt: "Illustrative example: white family house with a palm tree and terrace",
      width: 1000,
      height: 667,
    },
  },
  {
    id: "hillside-house",
    title: "Hillside House",
    category: "Residential",
    illustrative: true,
    image: {
      src: "/images/projects/hillside-house.jpg",
      alt: "Illustrative example: timber and stone house with warm evening lights",
      width: 1000,
      height: 667,
    },
  },
];

export const benefits: readonly Benefit[] = [
  {
    id: "expertise",
    title: "Engineering Expertise",
    description: "Led by a registered LBS engineer with DCE and BE qualifications.",
    icon: "expertise",
  },
  {
    id: "quality",
    title: "Quality Assurance",
    description: "Plans, materials and workmanship checked at each stage of the build.",
    icon: "quality",
  },
  {
    id: "transparency",
    title: "Transparent Process",
    description: "Clear estimates, milestones and documentation shared with you.",
    icon: "transparency",
  },
  {
    id: "delivery",
    title: "Timely Delivery",
    description: "Schedules agreed up front and tracked against actual progress.",
    icon: "delivery",
  },
];

export const processSteps: readonly ProcessStep[] = [
  {
    id: "consultation",
    title: "Consultation",
    description: "We understand your requirements, site and budget.",
    icon: "consultation",
  },
  {
    id: "planning-design",
    title: "Planning & Design",
    description: "Layout and 3D elevation drafted with your input.",
    icon: "design",
  },
  {
    id: "approvals",
    title: "Approvals",
    description: "LBS, DTCP and LPA documentation prepared and submitted.",
    icon: "approvals",
  },
  {
    id: "construction",
    title: "Construction",
    description: "Structure, finishing and quality checks on site.",
    icon: "construction",
  },
  {
    id: "handover",
    title: "Handover",
    description: "Final inspection, documentation and handover of your property.",
    icon: "handover",
  },
];

/**
 * Figures from the design reference. They are placeholders: confirm or replace
 * them with verified company numbers before publishing. See the footnote in StatisticsBand.
 */
export const stats: readonly Stat[] = [
  { id: "projects", value: 150, suffix: "+", label: "Projects Completed" },
  { id: "experience", value: 12, suffix: "+", label: "Years of Experience" },
  { id: "clients", value: 100, suffix: "+", label: "Happy Clients" },
  { id: "quality", value: 100, suffix: "%", label: "Quality Commitment" },
];

export const testimonials: readonly Testimonial[] = [
  {
    id: "review-1",
    quote:
      "Er. Satheeshkumar guided us right from DTCP approval and 3D elevation to the final key handover. There were zero hidden costs and the structural quality of materials was exceptional.",
    author: "R. Karthik & Revathi",
    location: "Kinathukadavu, Coimbatore",
    sample: false,
  },
  {
    id: "review-2",
    quote:
      "The regular photo updates on WhatsApp and direct supervision gave our family complete peace of mind. The elevation turned out even better than the 3D design!",
    author: "Dr. S. Mohanraj",
    location: "Pollachi Road, Coimbatore",
    sample: false,
  },
  {
    id: "review-3",
    quote:
      "Timely LBS plan approval and bank loan estimate documentation helped us get our bank loan cleared without any hassle. Highly recommend SKI Construction.",
    author: "V. Senthilkumar",
    location: "Malumichampatti, Coimbatore",
    sample: false,
  },
  {
    id: "review-4",
    quote:
      "Very professional and transparent team. Satheeshkumar sir personally inspected concrete pouring and curing at every stage. We are truly proud of our new home.",
    author: "P. Anitha",
    location: "Eachanari, Coimbatore",
    sample: false,
  },
];

export const aboutApproach = [
  "Understand the brief, the site and the budget before drawing anything.",
  "Design in 3D so the facade, layout and materials are agreed early.",
  "Prepare approval documents and keep every drawing consistent.",
  "Build in clear stages with checks at each milestone.",
  "Hand over the property with documentation and a final walkthrough.",
] as const;
