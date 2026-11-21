import { homeFaqs } from "@/data/home-faqs";
import { brand } from "@/lib/brand";
import { siteUrl } from "@/lib/site";

/**
 * Structured data specifically for the Homepage:
 * - WebSite Schema
 * - FAQPage Schema (for Google Rich Snippets)
 */
export function HomeJsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: brand.name,
    description: brand.description,
    publisher: {
      "@id": `${siteUrl}#organization`,
    },
    inLanguage: "en-IN",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((faq) => ({
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
        __html: JSON.stringify([websiteSchema, faqSchema]).replace(/</g, "\\u003c"),
      }}
    />
  );
}
