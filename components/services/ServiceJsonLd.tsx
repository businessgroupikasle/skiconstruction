import type { Service, ServiceFaq } from "@/data/types";
import { brand, contact, founder } from "@/lib/brand";
import { siteUrl } from "@/lib/site";

interface ServiceJsonLdProps {
  service: Service;
  faqs: readonly ServiceFaq[];
}

/**
 * Service, Breadcrumb, and FAQ structured data for the Service Detail Page.
 * Conforms 100% to Schema.org standards for Google Rich Results, SGE, and AI Engine Optimization.
 */
export function ServiceJsonLd({ service, faqs }: ServiceJsonLdProps) {
  const serviceUrl = `${siteUrl}/services/${service.slug}`;

  // 1. BreadcrumbList Schema
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: serviceUrl,
      },
    ],
  };

  // 2. Service Schema
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in Coimbatore`,
    serviceType: service.name,
    description: service.description || service.summary,
    url: serviceUrl,
    image: `${siteUrl}${service.image.src}`,
    provider: {
      "@type": "GeneralContractor",
      name: brand.name,
      url: siteUrl,
      telephone: contact.phoneE164,
      email: contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: contact.addressLine1,
        addressLocality: "Kinathukadavu",
        addressRegion: "Tamil Nadu",
        postalCode: "642109",
        addressCountry: "IN",
      },
      founder: {
        "@type": "Person",
        name: founder.name,
        jobTitle: founder.role,
      },
    },
    areaServed: [
      {
        "@type": "City",
        name: "Coimbatore",
      },
      {
        "@type": "AdministrativeArea",
        name: "Kinathukadavu",
      },
      {
        "@type": "AdministrativeArea",
        name: "Pollachi",
      },
    ],
    termsOfService: `${siteUrl}/contact`,
  };

  // 3. FAQPage Schema
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const schemaArray = [breadcrumbData, serviceData];
  if (faqs && faqs.length > 0) {
    schemaArray.push(faqData as any);
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaArray).replace(/</g, "\\u003c"),
      }}
    />
  );
}
