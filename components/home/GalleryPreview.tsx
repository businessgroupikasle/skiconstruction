"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GreenCTAButton } from "@/components/ui/GreenCTAButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredGalleryItems } from "@/data/gallery";
import { useIsCoarsePointer, usePrefersReducedMotion } from "@/lib/hooks";

gsap.registerPlugin(ScrollTrigger);

/**
 * Home-page preview of the gallery. Each tile opens the full gallery page.
 * Motion: the header rises in, tiles unveil as curtains (alternating from top and
 * bottom) while their photos settle from a close crop, and on fine pointers each
 * tile tilts towards the cursor. Reduced-motion users get the static layout.
 */
export function GalleryPreview() {
  const previewItems = featuredGalleryItems.slice(0, 6);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const coarsePointer = useIsCoarsePointer();

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header || reducedMotion) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });

      timeline
        .from(Array.from(header.children), {
          y: 28,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
        })
        .fromTo(
          "[data-gallery-tile]",
          {
            clipPath: (index: number) =>
              index % 2 === 0 ? "inset(100% 0% 0% 0% round 16px)" : "inset(0% 0% 100% 0% round 16px)",
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 16px)",
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.12,
          },
          "-=0.4",
        )
        .fromTo(
          "[data-gallery-media]",
          { scale: 1.3 },
          { scale: 1, duration: 1.6, ease: "power3.out", stagger: 0.12 },
          "<",
        );
    }, section);

    return () => context.revert();
  }, [reducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion || coarsePointer) return;

    const cards = Array.from(section.querySelectorAll<HTMLLIElement>("[data-gallery-card]"));
    const cleanups = cards.map((card) => {
      gsap.set(card, { transformPerspective: 900, transformOrigin: "50% 50%" });
      const tiltX = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
      const tiltY = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        tiltY(x * 8);
        tiltX(-y * 8);
      };
      const onLeave = () => {
        tiltX(0);
        tiltY(0);
      };

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      return () => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
        gsap.set(card, { clearProps: "transform" });
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [reducedMotion, coarsePointer]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-labelledby="gallery-heading"
      className="scroll-mt-24 bg-white py-16 sm:py-20"
    >
      <Container className="flex flex-col gap-10">
        <div ref={headerRef} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Project Gallery"
            id="gallery-heading"
            title="Design, construction and finished homes"
            description="A curated selection of our residential architecture, 3D designs, and construction walkthroughs."
          />
          <GreenCTAButton href="/gallery" variant="outline" size="md" className="self-start md:self-auto">
            View project gallery
          </GreenCTAButton>
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {previewItems.map((item) => (
            <li key={item.id} data-gallery-card>
              <Link
                href="/gallery"
                data-gallery-tile
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-brand-soft shadow-soft transition-shadow duration-300 hover:shadow-card"
              >
                <span data-gallery-media className="absolute inset-0 block">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 31vw, 48vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </span>

                {/* Light sheen that sweeps across the tile on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/2 z-10 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-[translate,opacity] duration-1000 ease-out group-hover:translate-x-[300%] group-hover:opacity-100"
                />

                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-brand-dark/85 via-brand-dark/30 to-transparent p-4 pt-10 text-white">
                  <span className="min-w-0">
                    <span className="block text-[0.7rem] font-bold tracking-wide text-white/80 uppercase">{item.category}</span>
                    <span className="block truncate text-sm font-semibold sm:text-base">{item.title}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
