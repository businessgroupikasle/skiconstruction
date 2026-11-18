"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/data/gallery";

interface GalleryLightboxProps {
  items: readonly GalleryItem[];
  /** Index of the photo to show, or null when closed */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/**
 * Full-size photo viewer built on the native dialog element. The browser handles focus
 * trapping, Escape and the backdrop, and focus returns to the photo that opened it.
 * Arrow keys move between photos.
 */
export function GalleryLightbox({ items, index, onIndexChange, onClose }: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = index !== null;
  const item = index === null ? undefined : items[index];
  const total = items.length;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const step = (direction: 1 | -1) => {
    if (index === null || total === 0) return;
    onIndexChange((index + direction + total) % total);
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        // A click on the backdrop lands on the dialog element itself.
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") step(1);
        if (event.key === "ArrowLeft") step(-1);
      }}
      aria-label="Photo viewer"
      className="m-auto w-[min(94vw,1100px)] overflow-hidden rounded-3xl bg-white p-0 text-brand-ink shadow-card backdrop:bg-brand-dark/80"
    >
      {item ? (
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-brand-line px-5 py-3">
            <p className="text-sm font-semibold text-brand-muted" aria-live="polite">
              {(index ?? 0) + 1} / {total}
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close photo viewer"
              className="flex size-10 items-center justify-center rounded-full border border-brand-line text-brand-dark transition-colors hover:bg-brand-primary hover:text-white"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          <div className="relative aspect-[3/2] w-full bg-brand-soft">
            <Image
              key={item.id}
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(min-width: 1100px) 1100px, 94vw"
              className="object-contain"
              priority
            />
          </div>

          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="min-w-0">
              <p className="text-xs font-bold tracking-wide text-brand-primary uppercase">{item.category}</p>
              <p className="truncate text-lg font-bold text-brand-dark">{item.title}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="flex size-11 items-center justify-center rounded-full border border-brand-line text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="flex size-11 items-center justify-center rounded-full border border-brand-line text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
              >
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
