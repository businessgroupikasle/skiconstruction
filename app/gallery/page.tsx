import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";
import { ContactBanner } from "@/components/home/ContactBanner";
import { Container } from "@/components/ui/Container";
import { galleryItems, galleryVideos } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Design files, videos and photographs of SKI Construction's design, construction and finished-home work in Kinathukadavu, Coimbatore. Download designs and browse full-size images.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <article className="bg-[#fcfdfa] min-h-screen">
      <PageHero
        eyebrow="Our Work"
        title="Project Gallery"
        description="Download our design files, watch project videos and browse photographs of our finished homes and ongoing constructions."
        breadcrumb="Project Gallery"
        backgroundImage="/images/background/galler-breadcrumb.png"
        imagePosition="object-right md:object-center"
      />

      <section aria-label="Gallery" className="py-12 sm:py-16">
        <Container>
          <Suspense fallback={<div className="min-h-[400px]" />}>
            <GalleryExplorer items={galleryItems} videos={galleryVideos} />
          </Suspense>
        </Container>
      </section>

      <ContactBanner />
    </article>
  );
}
