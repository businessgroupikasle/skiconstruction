import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { ContactBanner } from "@/components/home/ContactBanner";
import { Container } from "@/components/ui/Container";
import { brand } from "@/lib/brand";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects | Ongoing & Completed Works in Coimbatore",
  description:
    "Explore SKI Construction's portfolio of ongoing and completed residential villas, commercial showrooms, and turnkey projects in Coimbatore and Kinathukadavu led by Er. D. Satheeshkumar.",
  keywords: [
    "construction projects Coimbatore",
    "ongoing projects Kinathukadavu",
    "completed residential villas Coimbatore",
    "commercial building projects Coimbatore",
    "turnkey builders portfolio Tamil Nadu",
    "Er D Satheeshkumar projects",
  ],
  alternates: { canonical: `${siteUrl}/projects` },
  openGraph: {
    title: "Projects | Ongoing & Completed Works | SKI Construction",
    description:
      "Explore SKI Construction's portfolio of ongoing and completed residential and commercial projects in Coimbatore and Kinathukadavu.",
    url: `${siteUrl}/projects`,
    siteName: brand.name,
    locale: brand.locale,
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/projects/luxury-villa.jpg`,
        width: 1000,
        height: 667,
        alt: "SKI Construction Projects in Coimbatore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | SKI Construction Coimbatore",
    description: "Browse ongoing and completed construction projects in Coimbatore.",
    images: [`${siteUrl}/images/projects/luxury-villa.jpg`],
  },
};

/**
 * Projects Page
 * Features two interactive toggle buttons: "Ongoing Projects" and "Completed Projects",
 * matching the brand green and ivory architectural design system.
 */
export default function ProjectsPage() {
  return (
    <article className="bg-[#fcfdfa] min-h-screen">
      {/* 1. Page Hero Banner */}
      <PageHero
        eyebrow="Our Portfolio"
        title="Signature Projects"
        description="Explore our portfolio of ongoing construction works and completed residential, commercial, and turnkey projects across Coimbatore and Kinathukadavu."
        breadcrumb="Projects"
        backgroundImage="/images/background/project-breadcrumb.png"
        imagePosition="object-right md:object-center"
      />

      {/* 2. Interactive Projects Explorer with Ongoing & Completed Buttons */}
      <section aria-labelledby="projects-list-heading" className="py-14 sm:py-20">
        <Container>
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-[0.2em] bg-brand-soft px-3.5 py-1.5 rounded-full border border-brand-line mb-3">
              Verified Works
            </span>

            <h2
              id="projects-list-heading"
              className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight"
            >
              Crafted With Engineering Precision
            </h2>

            <p className="mt-3 text-sm sm:text-base text-brand-muted leading-relaxed">
              Toggle between our active on-site construction works and recently handed-over completed properties.
            </p>
          </div>

          <ProjectsExplorer />
        </Container>
      </section>

      {/* 3. Bottom Conversion CTA Banner */}
      <ContactBanner />
    </article>
  );
}
