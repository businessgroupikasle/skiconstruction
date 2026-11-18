"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Box,
  Building2,
  Camera,
  Film,
  HardHat,
  Home,
  LayoutGrid,
  Play,
  Sofa,
  Video,
} from "lucide-react";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import type { GalleryCategory, GalleryItem, GalleryVideo } from "@/data/gallery";
import { galleryCategories } from "@/data/gallery";

type MediaView = "images" | "videos";
type CategoryFilter = "All" | GalleryCategory;

const views: readonly { id: MediaView; label: string; icon: LucideIcon }[] = [
  { id: "images", label: "Image Gallery", icon: Camera },
  { id: "videos", label: "Video Gallery", icon: Video },
];

const categoryIcons: Record<GalleryCategory, LucideIcon> = {
  Residential: Home,
  Interiors: Sofa,
  Construction: HardHat,
  "Design & Planning": Box,
  Commercial: Building2,
};

interface GalleryExplorerProps {
  items: readonly GalleryItem[];
  videos?: readonly GalleryVideo[];
}

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

/**
 * One view at a time: the switch shows either the Images or the Videos. Each video opens on
 * its own page. A link to #project-videos (such as the video page's back link) opens the
 * Videos view until a switch button is used.
 */
export function GalleryExplorer({ items, videos = [] }: GalleryExplorerProps) {
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash,
    () => "",
  );
  const [chosenView, setChosenView] = useState<MediaView | null>(null);
  const view: MediaView = chosenView ?? (hash === "#project-videos" ? "videos" : "images");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  const filters: readonly CategoryFilter[] = ["All", ...galleryCategories];

  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      {/* View switch */}
      <nav aria-label="Gallery sections" className="flex justify-center">
        <div
          role="group"
          aria-label="Choose what to show"
          className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-brand-line bg-white p-1.5 shadow-soft"
        >
          {views.map(({ id, label, icon: Icon }) => {
            const active = view === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => setChosenView(id)}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-colors duration-200 sm:px-8 ${
                  active ? "bg-brand-dark text-white" : "text-brand-ink hover:text-brand-primary"
                }`}
              >
                <Icon aria-hidden="true" className="size-4" />
                {label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Image gallery: category chips and photo grid */}
      {view === "images" && (
        <section aria-label="Photographs" className="flex flex-col gap-8">
          <div role="group" aria-label="Filter photographs by category" className="flex flex-wrap gap-3">
            {filters.map((value) => {
              const active = activeCategory === value;
              const Icon = value === "All" ? LayoutGrid : categoryIcons[value];
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveCategory(value)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-brand-dark text-white shadow-button"
                      : "border border-brand-line bg-white text-brand-ink hover:border-brand-primary hover:text-brand-primary"
                  }`}
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {value}
                </button>
              );
            })}
          </div>

          {filteredPhotos.length === 0 ? (
            <p className="text-brand-muted">No photographs in this category yet.</p>
          ) : (
            <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {filteredPhotos.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    aria-label={`Open photo in fullscreen: ${item.title}`}
                    className="group relative block aspect-[5/3] w-full overflow-hidden rounded-2xl border border-brand-line/70 bg-brand-soft shadow-soft transition-shadow duration-300 hover:shadow-card cursor-pointer"
                  >
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 46vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Project videos: each card opens its own page */}
      {view === "videos" && (
        <section
          id="project-videos"
          aria-labelledby="project-videos-heading"
          className="scroll-mt-28 flex flex-col gap-10"
        >
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <span aria-hidden="true" className="hidden h-px w-20 bg-brand-accent sm:block" />
            <h2
              id="project-videos-heading"
              className="text-2xl font-extrabold text-brand-dark sm:text-3xl"
            >
              Project <span className="text-brand-accent">Videos</span>
            </h2>
            <span aria-hidden="true" className="hidden h-px w-20 bg-brand-accent sm:block" />
          </div>

          {videos.length === 0 ? (
            <p className="text-center text-sm text-brand-muted">No project videos have been added yet.</p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((vid) => (
                <li key={vid.id}>
                  <Link
                    href={`/gallery/videos/${vid.id}`}
                    aria-label={`Watch video: ${vid.title}`}
                    className="group flex w-full flex-col overflow-hidden rounded-2xl border border-brand-line/80 bg-white text-left shadow-soft transition-shadow duration-300 hover:shadow-card"
                  >
                    <span className="relative block aspect-video w-full overflow-hidden bg-brand-dark">
                      <Image
                        src={vid.poster}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                        className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex size-14 items-center justify-center rounded-full bg-white/95 text-brand-primary shadow-xl transition-transform duration-300 group-hover:scale-110">
                          <Play className="ml-0.5 size-6 fill-current" />
                        </span>
                      </span>
                    </span>
                    <span className="flex items-center gap-3 p-4 text-sm font-bold text-brand-ink">
                      <Film aria-hidden="true" className="size-4 shrink-0 text-brand-primary" />
                      <span className="truncate">{vid.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Fullscreen photo viewer */}
      <GalleryLightbox
        items={filteredPhotos}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </div>
  );
}
