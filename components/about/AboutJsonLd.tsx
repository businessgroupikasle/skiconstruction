import { brand, contact, founder } from "@/lib/brand";
import { siteUrl } from "@/lib/site";
import { aboutFaqs } from "@/data/about-faqs";

/**
 * Structured Data for the About Us Page.
 * Conforms 100% to Schema.org standards for AboutPage, Organization,
 * BreadcrumbList, and FAQPage.
 */
export function AboutJsonLd() {
  const pageUrl = `${siteUrl}/about`;

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
        name: "About Us",
        item: pageUrl,
      },
    ],
  };

  // 2. AboutPage Schema
  const aboutPageData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About SKI Construction",
    url: pageUrl,
    description:
      "Learn about SKI Construction, a leading construction, structural engineering, and plan approval firm in Coimbatore and Kinathukadavu led by Er. D. Satheeshkumar, Registered LBS Engineer.",
    mainEntity: {
      "@type": "GeneralContractor",
      name: brand.name,
      legalName: brand.name,
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
      identifier: {
        "@type": "PropertyValue",
        name: "GSTIN",
        value: contact.gstin,
      },
      founder: {
        "@type": "Person",
        name: founder.name,
        jobTitle: founder.role,
        alumniOf: "Civil & Structural Engineering",
      },
    },
  };

  // 3. FAQPage Schema
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: aboutFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([breadcrumbData, aboutPageData, faqData]).replace(/</g, "\\u003c"),
      }}
    />
  );
}

