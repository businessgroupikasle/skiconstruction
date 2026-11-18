import Image from "next/image";
import { Container } from "@/components/ui/Container";

interface BrickThreePhotoGridProps {
  serviceName: string;
}

/**
 * Section 1: 3-Photo Gallery Grid matching brickbybrickworks.com (comm-img-1, comm-img-2, comm-img-3)
 * Showcases the project in progress, facade execution, and finished craftsmanship.
 */
export function BrickThreePhotoGrid({ serviceName }: BrickThreePhotoGridProps) {
  const images = [
    {
      src: "/images/about/ref/helmet-blueprint.png",
      alt: `${serviceName} on-site structural planning and engineering supervision`,
      caption: "On-Site Supervision",
    },
    {
      src: "/images/gallery/commercial-facade.jpg",
      alt: `${serviceName} commercial building facade and modern structural design`,
      caption: "Commercial & Retail Facades",
    },
    {
      src: "/images/projects/luxury-villa.jpg",
      alt: `${serviceName} finished luxury construction in Coimbatore`,
      caption: "Turnkey Quality Execution",
    },
  ];

  return (
    <section aria-label="Project photo showcase" className="bg-[#fcfdfa] pt-12 sm:pt-16 pb-6">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="group relative h-[260px] sm:h-[300px] lg:h-[340px] overflow-hidden rounded-3xl border border-brand-line shadow-card bg-brand-soft"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
              />
              <span className="absolute bottom-4 left-4 rounded-xl bg-white/90 backdrop-blur-xs px-3.5 py-1.5 text-xs font-mono font-bold text-brand-dark uppercase tracking-wider shadow-xs">
                {img.caption}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

