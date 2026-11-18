import type { Metadata } from "next";
import { ArchitecturalHero } from "@/components/home/ArchitecturalHero";
import { ServiceQuickLinks } from "@/components/home/ServiceQuickLinks";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ContactBanner } from "@/components/home/ContactBanner";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { HomeJourneySection } from "@/components/home/HomeJourneySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ProjectArc } from "@/components/home/ProjectArc";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { StatisticsBand } from "@/components/home/StatisticsBand";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { projects, stats } from "@/data/content";

export const metadata: Metadata = {
  title: "SKI Construction | Building Construction & Plan Approval in Coimbatore",
  description:
    "SKI Construction in Kinathukadavu, Coimbatore: building construction, 3D elevation design, LBS and DTCP / LPA plan approvals, Vastu plans, bank loan estimates and property services.",
  alternates: { canonical: "/" },
};

/** Home page: sections follow the approved design order, top to bottom. */
export default function HomePage() {
  return (
    <>
      <ArchitecturalHero />
      <ServiceQuickLinks />
      <AboutPreview />
      <ServicesShowcase />
      <HomeJourneySection />
      <ProjectArc projects={projects} />
      <GalleryPreview />
      <WhyChooseUsSection />
      <StatisticsBand items={stats} />
      <TestimonialsSection />
      <ContactBanner />
    </>
  );
}
