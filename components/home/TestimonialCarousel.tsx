"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import type { Testimonial } from "@/data/types";

function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function TestimonialCarousel({ testimonials }: { testimonials: readonly Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index];
  if (!current || total === 0) return null;

  const go = (next: number) => setIndex((next + total) % total);

  return (
    <div className="relative flex flex-col gap-6 w-full">
      {/* Featured Testimonial Card */}
      <figure
        aria-roledescription="carousel"
        aria-label="Client Testimonials"
        className="relative flex flex-col gap-6 rounded-3xl border border-brand-line/80 bg-white p-7 sm:p-9 shadow-card transition-all duration-300"
      >
        {/* Top Header: 5 Gold Stars & Quote Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[#f59e0b]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 sm:size-5 fill-[#f59e0b]" />
            ))}
            <span className="ml-2 text-xs font-bold text-brand-dark">5.0 / 5.0</span>
          </div>

          <Quote className="size-8 sm:size-10 text-brand-primary/25 fill-brand-primary/20" />
        </div>

        {/* Quote Content */}
        <blockquote className="text-base sm:text-lg leading-relaxed text-brand-ink font-medium">
          &ldquo;{current.quote}&rdquo;
        </blockquote>

        {/* Client Info and Carousel Controls */}
        <div className="flex items-center justify-between border-t border-brand-line/60 pt-5 mt-2">
          {/* Client Avatar and Identity */}
          <div className="flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className="flex size-12 sm:size-14 items-center justify-center rounded-full bg-brand-mist text-brand-primary font-bold text-base sm:text-lg shadow-xs"
            >
              {initialsFor(current.author)}
            </span>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base text-brand-dark">
                {current.author}
              </span>
              <span className="text-xs sm:text-sm text-brand-muted font-medium">
                {current.location}
              </span>
            </div>
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="flex size-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-dark shadow-xs transition-colors hover:bg-brand-primary hover:text-white active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="flex size-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-dark shadow-xs transition-colors hover:bg-brand-primary hover:text-white active:scale-95 cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </figure>

      {/* Progress Dots */}
      <div className="flex items-center justify-center sm:justify-start gap-2" role="group" aria-label="Choose testimonial">
        {testimonials.map((item, dotIndex) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(dotIndex)}
            aria-label={`Show review ${dotIndex + 1}`}
            aria-current={dotIndex === index ? "true" : undefined}
            className="group flex size-6 cursor-pointer items-center justify-center"
          >
            <span
              aria-hidden="true"
              className={`block h-2.5 rounded-full transition-all duration-300 ${
                dotIndex === index ? "w-8 bg-brand-primary" : "w-2.5 bg-brand-primary/20 group-hover:bg-brand-primary/40"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
