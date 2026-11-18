"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { galleryCategories, type GalleryCategory, type GalleryItem } from "@/data/gallery";

type Filter = "All" | GalleryCategory;

/** Category filter and photo grid. Clicking a photo opens the lightbox for the filtered set. */
export function GalleryGrid({ items }: { items: readonly GalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? items : items.filter((item) => item.category === filter)),
    [filter, items],
  );

  const filters: readonly Filter[] = ["All", ...galleryCategories];
  const countFor = (value: Filter) =>
    value === "All" ? items.length : items.filter((item) => item.category === value).length;

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Filter photographs by category" className="flex flex-wrap gap-2">
        {filters.map((value) => {
          const active = filter === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(value)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-brand-primary text-white shadow-button"
                  : "border border-brand-line bg-white text-brand-ink hover:border-brand-primary hover:text-brand-primary"
              }`}
            >
              {value}
              <span className={`rounded-full px-2 py-0.5 text-xs ${active ? "bg-white/20" : "bg-brand-soft text-brand-muted"}`}>
                {countFor(value)}
              </span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="text-brand-muted">No photographs in this category yet.</p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`Open photo: ${item.title}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-soft shadow-soft"
              >
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/30 to-transparent p-4 pt-10 text-left text-white">
                  <span className="block text-[0.7rem] font-bold tracking-wide text-white/80 uppercase">{item.category}</span>
                  <span className="block text-sm font-semibold sm:text-base">{item.title}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <GalleryLightbox
        items={visible}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </div>
  );
}
