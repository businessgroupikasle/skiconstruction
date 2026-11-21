import type { Metadata } from "next";
import { ArchitecturalHero } from "@/components/home/ArchitecturalHero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ContactBanner } from "@/components/home/ContactBanner";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { HomeJourneySection } from "@/components/home/HomeJourneySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ProjectArc } from "@/components/home/ProjectArc";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { StatisticsBand } from "@/components/home/StatisticsBand";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { HomeJsonLd } from "@/components/seo/HomeJsonLd";
import { projects, stats } from "@/data/content";
import { siteUrl } from "@/lib/site";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "SKI Construction | Building Construction & Plan Approval in Coimbatore",
  description:
    "SKI Construction in Kinathukadavu, Coimbatore: building construction, 3D elevation design, LBS & DTCP/LPA plan approvals, Vastu plans, bank loan estimates and real estate services. Led by Registered LBS Engineer Er. D. Satheeshkumar.",
  keywords: [
    "building construction Coimbatore",
    "house construction Kinathukadavu",
    "registered LBS engineer Coimbatore",
    "building plan approval Kinathukadavu",
    "3D elevation design Coimbatore",
    "DTCP LPA approval Coimbatore",
    "Vastu house plan Coimbatore",
    "bank loan estimate Kinathukadavu",
    "real estate Kinathukadavu Coimbatore",
    "Er D Satheeshkumar civil engineer",
  ],
  alternates: { canonical: `${siteUrl}/` },
  openGraph: {
    title: "SKI Construction | Building Construction & Plan Approval in Coimbatore",
    description:
      "SKI Construction in Kinathukadavu, Coimbatore: building construction, 3D elevation design, LBS & DTCP/LPA plan approvals, Vastu plans, bank loan estimates and real estate. Led by Registered LBS Engineer Er. D. Satheeshkumar.",
    url: `${siteUrl}/`,
    siteName: brand.name,
    locale: brand.locale,
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/background/breadcrumb-banner.jpg`,
        width: 1920,
        height: 600,
        alt: "SKI Construction - Build With Quality in Coimbatore and Kinathukadavu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SKI Construction | Building Construction & Plan Approval in Coimbatore",
    description:
      "Professional civil engineering, building construction, and registered LBS plan approvals in Kinathukadavu and Coimbatore.",
    images: [`${siteUrl}/images/background/breadcrumb-banner.jpg`],
  },
};

/** Home page: sections follow the approved design order, top to bottom. */
export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <ArchitecturalHero />
      <AboutPreview />
      <ServicesShowcase />
      <HomeJourneySection />
      <ProjectArc projects={projects} />
      <StatisticsBand items={stats} />
      <GalleryPreview />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <HomeFaqSection />
      <ContactBanner />
    </>
  );
}
