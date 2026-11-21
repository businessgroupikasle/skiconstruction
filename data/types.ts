/** Shared content model. Every card on the site is rendered from these shapes. */

export type ServiceSlug =
  | "building-construction"
  | "3d-elevation-design"
  | "construction-consulting"
  | "bank-loan-estimate"
  | "lbs-plan-approval"
  | "dtcp-lpa-approval"
  | "vastu-plan"
  | "real-estate"
  | "property-buying-selling";

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Service {
  slug: ServiceSlug;
  name: string;
  /** Short line shown on compact cards */
  summary: string;
  /** Longer description for the services page */
  description: string;
  benefits: readonly string[];
  image: ImageAsset;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

/** Long-form content for each service's detail page. */
export interface ServiceDetail {
  /** Overview paragraphs */
  overview: readonly string[];
  /** What the service covers, shown as a checklist */
  included: readonly string[];
  /** Workflow steps, in order */
  process: readonly ServiceProcessStep[];
  /** Who the service is for */
  audience: readonly string[];
  faqs: readonly ServiceFaq[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  /** Projects are design-inspiration examples until verified photos are supplied */
  illustrative: boolean;
  image: ImageAsset;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: "expertise" | "quality" | "transparency" | "delivery";
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: "consultation" | "design" | "approvals" | "construction" | "handover";
}

export interface Stat {
  id: string;
  value: number | string;
  suffix?: string;
  label: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  /** Sample quotes are labelled on screen until real approved quotes replace them */
  sample?: boolean;
}

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: readonly NavChild[];
}
