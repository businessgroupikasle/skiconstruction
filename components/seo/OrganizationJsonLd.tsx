import { brand, contact, founder } from "@/lib/brand";
import { siteUrl } from "@/lib/site";

/**
 * Structured data for search engines. Deliberately omits ratings, reviews and
 * credentials that were not supplied by the company.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: brand.name,
    url: siteUrl,
    description: brand.description,
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
    },
  };

  return (
    <script
      type="application/ld+json"
      // The payload is built from static constants above, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
