import { brand, contact, founder, socialProfiles } from "@/lib/brand";
import { siteUrl } from "@/lib/site";
import { services } from "@/data/services";

/**
 * Structured data for search engines. Conforms to Schema.org LocalBusiness,
 * GeneralContractor, and ProfessionalService specifications with verified company data.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "LocalBusiness"],
    "@id": `${siteUrl}#organization`,
    name: brand.name,
    legalName: brand.name,
    alternateName: "SKI Construction Kinathukadavu Coimbatore",
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    image: `${siteUrl}/images/about/about.png`,
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.8228,
      longitude: 77.0197,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Bank Transfer, UPI, Cheque",
    areaServed: [
      {
        "@type": "City",
        name: "Kinathukadavu",
      },
      {
        "@type": "City",
        name: "Coimbatore",
      },
      {
        "@type": "City",
        name: "Pollachi",
      },
      {
        "@type": "AdministrativeArea",
        name: "Tamil Nadu",
      },
    ],
    identifier: {
      "@type": "PropertyValue",
      name: "GSTIN",
      value: contact.gstin,
    },
    founder: {
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
      honorificPrefix: "Er.",
      hasCredential: founder.credentials,
    },
    sameAs: socialProfiles.map((p) => p.href),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "SKI Construction Services",
      itemListElement: services.map((s, idx) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: `${siteUrl}/services/${s.slug}`,
          description: s.summary,
        },
        position: idx + 1,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
