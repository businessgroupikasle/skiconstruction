import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { CompanyHighlights } from "@/components/about/CompanyHighlights";
import { MissionVision } from "@/components/about/MissionVision";
import { AboutStory } from "@/components/about/AboutStory";
import { CoreValues } from "@/components/about/CoreValues";
import { AboutApproach } from "@/components/about/AboutApproach";
import { AboutFaqs } from "@/components/about/AboutFaqs";
import { AboutCta } from "@/components/about/AboutCta";
import { AboutJsonLd } from "@/components/about/AboutJsonLd";
import { Container } from "@/components/ui/Container";
import { brand } from "@/lib/brand";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About SKI Construction | Engineering & Builders in Coimbatore",
  description:
    "Learn about SKI Construction, a premier civil engineering and building company based in Kinathukadavu, Coimbatore. Led by Registered LBS Engineer Er. D. Satheeshkumar, we specialize in turnkey construction, 3D elevation design, and statutory plan approvals.",
  keywords: [
    "about SKI Construction",
    "construction company Coimbatore",
    "builders in Kinathukadavu",
    "registered LBS engineer Coimbatore",
    "Er D Satheeshkumar civil engineer",
    "DTCP approval consultants Coimbatore",
    "turnkey residential builders Tamil Nadu",
    "civil engineering contractors Coimbatore",
  ],
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About SKI Construction | Engineering & Builders in Coimbatore",
    description:
      "A trusted civil engineering and construction firm in Coimbatore led by Er. D. Satheeshkumar, Registered LBS Engineer. Discover our story, values, and engineering discipline.",
    url: `${siteUrl}/about`,
    siteName: brand.name,
    locale: brand.locale,
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/background/breadcrumb-banner.jpg`,
        width: 1920,
        height: 600,
        alt: "SKI Construction Engineering & Building in Coimbatore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About SKI Construction | Engineering & Builders in Coimbatore",
    description:
      "Learn about SKI Construction, led by Registered LBS Engineer Er. D. Satheeshkumar. Building lasting spaces with engineering precision across Coimbatore.",
    images: [`${siteUrl}/images/background/breadcrumb-banner.jpg`],
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

/**
 * SKI Construction Premium About Page
 * 
 * 1. Structured Data (AboutPage, Organization, BreadcrumbList, FAQPage Schemas)
 * 2. Breadcrumb Page Hero (Compact architectural hero)
 * 3. Who We Are (Company Introduction, blueprint photo, 3D building render)
 * 4. Company Highlights (Verified experience & completion metrics)
 * 5. Leadership & Vision/Mission (Architectural dossier for Er. D. Satheeshkumar + Mission & Vision cards)
 * 6. Our Story & Milestones (Origins in Kinathukadavu, expansion into Coimbatore)
 * 7. Our Expertise & Industries (Turnkey residential, commercial, 3D facades, statutory permits)
 * 8. Our Core Values (5 brand pillars: Quality, Integrity, Customer Focus, Safety, Sustainability)
 * 9. Our Approach & Work Process (5-phase engineering lifecycle from soil test to handover)
 * 10. Why Choose Us & Accreditations (Registered LBS certification, milestone BOQ, regional mastery)
 * 11. Company FAQs (GEO & AEO question-based answers for AI and human search)
 * 12. Bottom Conversion CTA (Direct line to Er. D. Satheeshkumar)
 */
export default function AboutPage() {
  return (
    <article className="bg-[#fcfdfa] min-h-screen">
      {/* 1. Structured JSON-LD Schemas */}
      <AboutJsonLd />

      {/* 2. Compact Breadcrumb Page Hero */}
      <PageHero
        eyebrow="SKI Construction"
        title="About Us"
        breadcrumb="About"
        backgroundImage="/images/background/about-breadcrumb.png"
        imagePosition="object-right md:object-center"
      />

      {/* 3. Who We Are (Company Introduction) */}
      <WhoWeAre />

      {/* 4. Company Highlights (Verified Metrics) */}
      <CompanyHighlights />

      {/* 5b. Exact Mission, Vision & Values Section */}
      <section
        aria-label="Mission, Vision and Values"
        className="bg-white py-14 sm:py-20 border-b border-brand-line/60"
      >
        <Container>
          <MissionVision />
        </Container>
      </section>

      {/* 6. Our Story & Company Milestones */}
      <AboutStory />

      {/* 8. Our Core Values */}
      <CoreValues />

      {/* 9. Our Approach / 5-Stage Engineering Process */}
      <AboutApproach />

      {/* 11. GEO & AEO Frequently Asked Questions */}
      <AboutFaqs />

      {/* 12. Bottom Conversion Call to Action */}
      <AboutCta />
    </article>
  );
}
