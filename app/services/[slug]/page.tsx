import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrickHeroBanner } from "@/components/services/BrickHeroBanner";
import { MorphServiceContent } from "@/components/services/MorphServiceContent";
import { BrickFaqSection } from "@/components/services/BrickFaqSection";
import { ServiceJsonLd } from "@/components/services/ServiceJsonLd";
import { services, getServiceBySlug } from "@/data/services";
import { getServiceDetail } from "@/data/service-details";
import { siteUrl } from "@/lib/site";
import { brand } from "@/lib/brand";

/** Only the nine known services exist. Any other slug returns 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * On-page SEO, GEO, and AEO metadata generator.
 */
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: "Service not found", robots: { index: false, follow: true } };
  }

  const pageTitle = `${service.name} in Coimbatore | SKI Construction`;
  const pageDescription = `${service.description} Led by Registered LBS Engineer Er. D. Satheeshkumar, SKI Construction delivers transparent, durable solutions across Coimbatore and Kinathukadavu.`;
  const canonicalUrl = `${siteUrl}/services/${service.slug}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      `${service.name.toLowerCase()} Coimbatore`,
      `${service.name.toLowerCase()} Kinathukadavu`,
      "construction company Coimbatore",
      "registered LBS engineer Coimbatore",
      "Er D Satheeshkumar civil engineer",
      "DTCP LPA building approvals",
      "residential commercial builders Coimbatore",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: brand.name,
      locale: brand.locale,
      type: "website",
      images: [
        {
          url: `${siteUrl}${service.image.src}`,
          width: service.image.width,
          height: service.image.height,
          alt: `${service.name} by SKI Construction in Coimbatore`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [`${siteUrl}${service.image.src}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Service Detail Page
 * Designed after the user's reference image (Morph Construction Architecture template):
 * 
 * 1. Breadcrumb Hero Banner (Title & Breadcrumbs)
 * 2. Morph Service Content Layout:
 *    - Left Sidebar:
 *      - "Build Your Dream Home with Us" Dark CTA Card
 *      - "Download" Card (Download DOC / Download PDF)
 *      - "Our Services" Navigation List
 *    - Right Main Content:
 *      - Block 1: "Comprehensive [Service Name] Solutions"
 *        (Landscape Photo + 5 Checkpoint Deliverables + Overview Narrative)
 *      - Block 2: "Comprehensive [Service Name] Approach"
 *        (5 Checkmark Guarantees + Tall Vertical Construction Photo)
 * 3. FAQs Section (GEO & AEO search optimized accordion)
 * 4. Request a Quote Form (Direct WhatsApp submission)
 * 5. Structured Data (Service, BreadcrumbList, and FAQPage schemas)
 */
export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const detail = getServiceDetail(service.slug);

  return (
    <article className="bg-[#fcfdfa] min-h-screen">
      {/* 5. Structured Schema Markup */}
      <ServiceJsonLd service={service} faqs={detail.faqs} />

      {/* 1. Breadcrumb Hero Banner */}
      <BrickHeroBanner title={service.name} />

      {/* 2. Morph Service Content (Exact match to reference screenshot) */}
      <MorphServiceContent service={service} detail={detail} />

      {/* 3. Frequently Asked Questions */}
      <BrickFaqSection customFaqs={detail.faqs} />
    </article>
  );
}
