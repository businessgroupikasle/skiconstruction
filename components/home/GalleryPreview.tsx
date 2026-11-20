"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { usePrefersReducedMotion } from "@/lib/hooks";
import type { GalleryItem } from "@/data/gallery";

/**
 * 12 Curated Architectural and Interior Projects for the 3D Panoramic Cylinder
 */
const curatedGalleryItems: readonly GalleryItem[] = [
  {
    id: "luxury-villa",
    title: "Luxury Villa with Pool",
    category: "Residential",
    featured: true,
    image: {
      src: "/images/projects/luxury-villa.jpg",
      alt: "Luxury villa with pool",
      width: 1000,
      height: 667,
    },
  },
  {
    id: "modern-residence",
    title: "Modern Residence with Terrace",
    category: "Residential",
    featured: true,
    image: {
      src: "/images/projects/modern-residence.jpg",
      alt: "Modern residence with terrace",
      width: 1000,
      height: 667,
    },
  },
  {
    id: "3d-elevation-dusk",
    title: "Dusk 3D Elevation Design",
    category: "Design & Planning",
    featured: true,
    image: {
      src: "/images/services/3d-elevation-design.png",
      alt: "Dusk 3D Elevation Design",
      width: 800,
      height: 533,
    },
  },
  {
    id: "contemporary-villa",
    title: "Contemporary Villa in Timber",
    category: "Residential",
    featured: true,
    image: {
      src: "/images/projects/contemporary-villa.jpg",
      alt: "Contemporary villa in timber",
      width: 1000,
      height: 667,
    },
  },
  {
    id: "about-flagship-villa",
    title: "Flagship Luxury Estate",
    category: "Residential",
    featured: true,
    image: {
      src: "/images/about/about2.png",
      alt: "Flagship luxury estate",
      width: 1000,
      height: 667,
    },
  },
  {
    id: "coastal-residence",
    title: "Family House with Palm Garden",
    category: "Residential",
    featured: true,
    image: {
      src: "/images/projects/coastal-residence.jpg",
      alt: "Family house with palm garden",
      width: 1000,
      height: 667,
    },
  },
  {
    id: "hillside-house",
    title: "Hillside House in Evening Light",
    category: "Residential",
    featured: true,
    image: {
      src: "/images/projects/hillside-house.jpg",
      alt: "Hillside house in evening light",
      width: 1000,
      height: 667,
    },
  },
  {
    id: "two-storey-home",
    title: "Two-Storey Home with Wood Cladding",
    category: "Residential",
    featured: true,
    image: {
      src: "/images/about/villa-exterior.jpg",
      alt: "Two-storey home with wood cladding",
      width: 1000,
      height: 667,
    },
  },
  {
    id: "commercial-complex",
    title: "Commercial & Retail Facade",
    category: "Commercial",
    featured: true,
    image: {
      src: "/images/gallery/commercial-facade.jpg",
      alt: "Commercial and retail facade",
      width: 1000,
      height: 667,
    },
  },
  {
    id: "interior-living-room",
    title: "Contemporary Living Room",
    category: "Interiors",
    featured: true,
    image: {
      src: "/images/gallery/interior-living.jpg",
      alt: "Contemporary living room interior",
      width: 1000,
      height: 667,
    },
  },
  {
    id: "interior-dining",
    title: "Modern Dining & Kitchen Space",
    category: "Interiors",
    featured: true,
    image: {
      src: "/images/gallery/interior-dining.jpg",
      alt: "Modern dining and kitchen space",
      width: 1000,
      height: 667,
    },
  },
  {
    id: "structural-framing",
    title: "Precision RCC Framed Structure",
    category: "Construction",
    featured: true,
    image: {
      src: "/images/services/building-construction.png",
      alt: "Precision RCC framed structure on site",
      width: 800,
      height: 533,
    },
  },
] as const;

const processSteps = [
  { step: "#01", title: "Strategy & Planning" },
  { step: "#02", title: "Design & Development" },
  { step: "#03", title: "Launch & Growth" },
  { step: "#04", title: "Ongoing Support" },
] as const;

export function GalleryPreview() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState({
    radius: 720,
    cardWidth: 280,
    cardHeight: 400,
    perspective: 850,
  });

  const turntableRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const isHoveredRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const lastPointerXRef = useRef<number>(0);
  const movedRef = useRef<boolean>(false);

  const reducedMotion = usePrefersReducedMotion();

  // Responsive 3D cylinder dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDimensions({
          radius: 440,
          cardWidth: 210,
          cardHeight: 310,
          perspective: 550,
        });
      } else if (w < 1024) {
        setDimensions({
          radius: 580,
          cardWidth: 250,
          cardHeight: 360,
          perspective: 700,
        });
      } else {
        setDimensions({
          radius: 720,
          cardWidth: 280,
          cardHeight: 400,
          perspective: 850,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Smooth 60fps/120fps hardware-accelerated 3D turntable animation loop
  useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.01) {
          rotationRef.current = (rotationRef.current + velocityRef.current) % 360;
          velocityRef.current *= 0.94; // Smooth momentum friction
          if (turntableRef.current) {
            turntableRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
          }
        } else if (!isHoveredRef.current && !reducedMotion) {
          // Slow cinematic auto-rotation
          rotationRef.current = (rotationRef.current + 0.08) % 360;
          if (turntableRef.current) {
            turntableRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
          }
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [reducedMotion]);

  // Pointer drag handling for rotating the 3D cylinder
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastPointerXRef.current = e.clientX;
    velocityRef.current = 0;
    movedRef.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX;
    const deltaX = currentX - lastPointerXRef.current;
    lastPointerXRef.current = currentX;

    if (Math.abs(currentX - startXRef.current) > 5) {
      movedRef.current = true;
    }

    const sensitivity = 0.18;
    rotationRef.current = (rotationRef.current + deltaX * sensitivity) % 360;
    velocityRef.current = deltaX * sensitivity;

    if (turntableRef.current) {
      turntableRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
    }
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  }, []);

  const handleCardClick = (index: number) => {
    if (movedRef.current) return; // Ignore drag release
    setSelectedPhotoIndex(index);
  };

  return (
    <section
      id="gallery"
      aria-label="Architectural Portfolio Gallery"
      className="relative isolate overflow-hidden bg-white py-20 sm:py-28 lg:py-32"
    >
      {/* ========================================================================= */}
      {/* 1. Header & Call-to-Action Pill matching Folioblox design                 */}
      {/* ========================================================================= */}
      <div className="flex flex-col items-center text-center px-6 max-w-4xl mx-auto mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-bold text-[#0d0d0d] tracking-tight leading-[1.12]">
          Curious What Else We&apos;ve Built?
        </h2>

        <p className="mt-4 text-sm sm:text-base lg:text-[1.1rem] text-[#6e6e6e] max-w-xl mx-auto leading-relaxed">
          Explore more luxury villas, commercial complexes, and bespoke 3D elevations in our extended portfolio.
        </p>

        {/* Pill Button matching the signature white pill with orange arrow */}
        <Link
          href="/gallery"
          className="group mt-6 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white py-2 pl-6 pr-2 text-sm sm:text-base font-semibold text-[#0d0d0d] shadow-sm transition-all duration-300 hover:border-black/25 hover:shadow-md cursor-pointer"
        >
          <span>See more Projects</span>
          <span className="flex size-8 sm:size-9 items-center justify-center rounded-full bg-[#FF5E00] text-white transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </Link>
      </div>

      {/* ========================================================================= */}
      {/* 2. 3D Panoramic Curved Cylinder Carousel                                 */}
      {/* ========================================================================= */}
      <div
        className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] select-none touch-pan-y overflow-hidden cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
      >
        {/* Left Soft Vignette Edge Gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 inset-y-0 w-24 sm:w-44 lg:w-72 bg-gradient-to-r from-white via-white/80 to-transparent z-20"
        />

        {/* Right Soft Vignette Edge Gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 inset-y-0 w-24 sm:w-44 lg:w-72 bg-gradient-to-l from-white via-white/80 to-transparent z-20"
        />

        {/* 3D Perspective Stage Container */}
        <div
          className="relative flex items-center justify-center w-full h-full"
          style={{
            perspective: `${dimensions.perspective}px`,
            perspectiveOrigin: "50% 50%",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Centered Rotating 3D Turntable */}
          <div
            ref={turntableRef}
            className="relative flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateY(0deg)",
              willChange: "transform",
            }}
          >
            {curatedGalleryItems.map((item, index) => {
              const itemAngle = index * (360 / curatedGalleryItems.length);
              return (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(index)}
                  className="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[26px] sm:rounded-[32px] bg-neutral-100 shadow-xl border border-black/5 transition-all duration-300"
                  style={{
                    width: `${dimensions.cardWidth}px`,
                    height: `${dimensions.cardHeight}px`,
                    transform: `rotateY(${itemAngle}deg) translateZ(-${dimensions.radius}px)`,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src={item.image.src}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 300px, 250px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />

                  {/* Gentle hover overlay with category & title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                    <span className="text-[0.7rem] font-bold tracking-wider uppercase text-[#FF5E00]">
                      {item.category}
                    </span>
                    <span className="text-sm sm:text-base font-bold leading-snug">
                      {item.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. Bottom 4 Value Steps (#01 - #04) matching Folioblox design              */}
      {/* ========================================================================= */}
      <div className="w-full max-w-5xl mx-auto px-6 mt-12 sm:mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {processSteps.map((step) => (
            <div key={step.step} className="flex flex-col items-center">
              <span className="text-sm sm:text-base font-bold text-[#FF5E00] tracking-wider mb-1">
                {step.step}
              </span>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-[#0d0d0d]">
                {step.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. Full High-Resolution Photo Lightbox                                     */}
      {/* ========================================================================= */}
      <GalleryLightbox
        items={curatedGalleryItems}
        index={selectedPhotoIndex}
        onIndexChange={setSelectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
      />
    </section>
  );
}
