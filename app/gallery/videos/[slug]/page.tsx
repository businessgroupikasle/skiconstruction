import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ContactBanner } from "@/components/home/ContactBanner";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { galleryVideos } from "@/data/gallery";

/** Only the videos listed in data/gallery.ts exist. Any other slug returns 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return galleryVideos.map((video) => ({ slug: video.id }));
}

type VideoPageProps = {
  params: Promise<{ slug: string }>;
};

function findVideo(slug: string) {
  return galleryVideos.find((video) => video.id === slug);
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const video = findVideo(slug);
  if (!video) {
    return { title: "Video not found", robots: { index: false, follow: true } };
  }
  return {
    title: video.title,
    description: `${video.category} project video from SKI Construction in Kinathukadavu, Coimbatore.`,
    alternates: { canonical: `/gallery/videos/${video.id}` },
  };
}

export default async function GalleryVideoPage({ params }: VideoPageProps) {
  const { slug } = await params;
  const video = findVideo(slug);
  if (!video) notFound();

  return (
    <>
      <PageHero eyebrow="Project video" title={video.title} breadcrumb="Gallery" backgroundImage={video.poster} />

      <section aria-label="Video player" className="bg-white py-12 sm:py-16">
        <Container className="flex flex-col gap-6">
          <div>
            <Link
              href="/gallery?view=videos#project-videos"
              className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-5 py-2.5 text-sm font-bold text-brand-ink transition-colors hover:border-brand-primary hover:text-brand-primary shadow-xs"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Back to video gallery
            </Link>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-card">
            <video
              src={video.src}
              poster={video.poster}
              controls
              preload="metadata"
              className="size-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold tracking-wider text-brand-primary uppercase">
              {video.category} Walkthrough
            </span>
            <Link
              href="/gallery?view=videos#project-videos"
              className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-5 py-2.5 text-sm font-bold text-brand-ink transition-colors hover:border-brand-primary hover:text-brand-primary"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Back to video gallery
            </Link>
          </div>
        </Container>
      </section>

      <ContactBanner />
    </>
  );
}
