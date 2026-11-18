'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
  type SyntheticEvent,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { buildingImages, type BuildingImage } from './buildingImages';
import styles from './CinematicBuildingHero.module.css';

const ArchitecturalAtmosphere = dynamic(() => import('./ArchitecturalAtmosphere'), {
  ssr: false,
});

type Props = {
  /** Pass your current hero heading, tagline and CTAs EXACTLY as they are. */
  children: ReactNode;
  /** Defaults to the 20 named image paths in buildingImages.ts. */
  images?: readonly BuildingImage[];
  /** Preserve existing hero classes, when needed. */
  className?: string;
  /** Optional fallback from the user's existing construction video. */
  fallbackImage?: string;
};

const CHAPTERS = ['ARCHITECTURAL VISION', 'FORM & STRUCTURE', 'CRAFT & DETAIL', 'THE FINAL REVEAL'] as const;

function easeInOut(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2'));
  } catch {
    return false;
  }
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const check = () => setReduced(media.matches);
    check();
    media.addEventListener('change', check);
    return () => media.removeEventListener('change', check);
  }, []);
  return reduced;
}

export default function CinematicBuildingHero({
  children,
  images = buildingImages,
  className = '',
  fallbackImage = '/images/hero/house-aerial-fallback.webp',
}: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const photoARef = useRef<HTMLDivElement>(null);
  const photoBRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const progressRef = useRef(0) as MutableRefObject<number>;
  const baseIndexRef = useRef(0);
  const [baseIndex, setBaseIndex] = useState(0);
  const [visibleNumber, setVisibleNumber] = useState(1);
  const [showFX, setShowFX] = useState(false);
  const [inView, setInView] = useState(false);
  const reducedMotion = useReducedMotion();
  const count = images.length;

  // Only two real, unaltered photos are displayed at once, avoiding 20 large GPU textures.
  const current = images[Math.min(baseIndex, Math.max(0, count - 1))];
  const incoming = images[Math.min(baseIndex + 1, Math.max(0, count - 1))];

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const evaluate = () => setShowFX(!reducedMotion && !media.matches && supportsWebGL());
    evaluate();
    media.addEventListener('change', evaluate);
    return () => media.removeEventListener('change', evaluate);
  }, [reducedMotion]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !showFX) {
      setInView(false);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => setInView(Boolean(entries[0]?.isIntersecting)),
      { rootMargin: '160px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [showFX]);

  const paint = useCallback(
    (value: number) => {
      if (count < 2) return;
      const p = Math.max(0, Math.min(1, value));
      progressRef.current = p;

      // Each image receives its own stretch of the scroll narrative.
      const step = p * (count - 1);
      const i = Math.min(count - 2, Math.floor(step));
      const t = Math.max(0, Math.min(1, step - i));
      const blend = easeInOut((t - 0.36) / 0.60);

      const number = p >= 0.9999 ? count : i + 1;
      setVisibleNumber((previous) => previous === number ? previous : number);

      if (i !== baseIndexRef.current) {
        baseIndexRef.current = i;
        setBaseIndex(i);
      }

      const a = photoARef.current;
      const b = photoBRef.current;
      const ambient = ambientRef.current;
      const bar = progressBarRef.current;

      // Camera-motion illusion on unchanged, aspect-correct source photography.
      // These are <2% scale shifts, not geometry warps or aggressive crops.
      const direction = i % 2 === 0 ? 1 : -1;
      const panA = direction * (-0.75 + t * 1.5);
      const panB = -direction * (0.65 - (t - 0.5) * 1.1);
      const fadeEdge = Math.round(blend * 100);

      if (a) {
        a.style.opacity = String(1 - blend * 0.32);
        a.style.transform = `translate3d(${panA}%, ${(0.5 - t) * 0.8}%,0) scale(${(1 + t * 0.011).toFixed(4)})`;
      }
      if (b) {
        b.style.opacity = String(blend);
        b.style.transform = `translate3d(${panB}%, ${(t - 0.5) * 0.8}%,0) scale(${(1.015 - t * 0.011).toFixed(4)})`;
        // Alternating architectural aperture instead of a conventional slider wipe.
        b.style.clipPath = i % 2 === 0
          ? `inset(0 ${100 - fadeEdge}% 0 0 round 2px)`
          : `inset(0 0 0 ${100 - fadeEdge}% round 2px)`;
      }
      if (ambient) {
        ambient.style.transform = `translate3d(${(p - 0.5) * -2.5}%, 0,0) scale(1.11)`;
      }
      if (bar) bar.style.transform = `scaleX(${p})`;
    },
    [count],
  );

  useEffect(() => {
    if (reducedMotion || count < 2 || !rootRef.current || !stageRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const scope = gsap.context(() => {
      const playhead = { progress: 0 };
      // ScrollTrigger's scrub eases this timeline rather than jumping between photos.
      const tween = gsap.to(playhead, {
        progress: 1,
        ease: 'none',
        onUpdate: () => paint(playhead.progress),
        scrollTrigger: {
          trigger: rootRef.current,
          pin: stageRef.current,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 5.6, 2500)}`,
          scrub: 0.65,
          anticipatePin: 1,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });
      triggerRef.current = tween.scrollTrigger ?? null;
      paint(0);
    }, rootRef);
    // Refresh once images have sizes / fonts settled, without mutating other page sections.
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad, { once: true });
    return () => {
      window.removeEventListener('load', handleLoad);
      triggerRef.current = null;
      scope.revert();
    };
  }, [reducedMotion, count, paint]);

  const skipAnimation = () => {
    const end = triggerRef.current?.end;
    if (typeof end === 'number') {
      // The tiny offset ensures the pinned frame is released before moving on.
      window.scrollTo({ top: end + 2, behavior: 'smooth' });
      return;
    }
    rootRef.current?.nextElementSibling?.scrollIntoView({ behavior: 'smooth' });
  };

  const chapter = Math.min(CHAPTERS.length - 1, Math.floor(((visibleNumber - 1) / Math.max(count - 1, 1)) * CHAPTERS.length));

  const useFallback = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    const image = event.currentTarget;
    // A visible still from the user's own uploaded drone video, never stock imagery.
    if (image.dataset.fallbackApplied !== 'true' && fallbackImage) {
      image.dataset.fallbackApplied = 'true';
      image.src = fallbackImage;
    }
  };

  return (
    <section
      ref={rootRef}
      className={`${styles.hero} ${className}`.trim()}
      aria-label="Architectural homepage showcase"
      data-hero-frames={count}
    >
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.ambient} ref={ambientRef} aria-hidden="true">
          {/* Ambient copy may blur/crop; the main building image below is never cropped. */}
          {current && <Image src={current.src} alt="" fill sizes="100vw" className={styles.ambientImage} quality={75} onError={useFallback} />}
        </div>

        <div className={styles.photoFrame} aria-hidden="true">
          {current && (
            <div className={`${styles.photo} ${styles.photoA}`} ref={photoARef}>
              <Image
                key={`primary-${current.src}`}
                onError={useFallback}
                src={current.src}
                alt=""
                fill
                priority={baseIndex === 0}
                quality={75}
                sizes="(max-width: 767px) 100vw, 94vw"
                className={styles.originalImage}
                style={{ objectPosition: current.focus ?? 'center center' }}
              />
            </div>
          )}
          {incoming && !reducedMotion && (
            <div className={`${styles.photo} ${styles.photoB}`} ref={photoBRef}>
              <Image
                key={`incoming-${incoming.src}`}
                onError={useFallback}
                src={incoming.src}
                alt=""
                quality={75}
                sizes="(max-width: 767px) 100vw, 94vw"
                fill
                className={styles.originalImage}
                style={{ objectPosition: incoming.focus ?? 'center center' }}
              />
            </div>
          )}
        </div>

        {showFX && inView && !reducedMotion && (
          <div className={styles.fx} aria-hidden="true">
            <ArchitecturalAtmosphere progress={progressRef} />
          </div>
        )}

        <div className={styles.vignette} aria-hidden="true" />
        <div className={styles.beam} aria-hidden="true" />
        <div className={styles.horizon} aria-hidden="true" />

        {/* Original hero content (real HTML for SEO and accessibility). */}
        <div className={styles.content}>{children}</div>

        {!reducedMotion && count > 1 && (
          <div className={styles.interface} aria-hidden="true">
            <div className={styles.chapter}>
              <span className={styles.microLabel}>ARCHITECTURE IN MOTION</span>
              <span className={styles.chapterName}>{CHAPTERS[chapter]}</span>
            </div>
            <div className={styles.counter}>
              {String(visibleNumber).padStart(2, '0')}
              <span className={styles.counterRule}>/</span>
              {String(count).padStart(2, '0')}
            </div>
            <div className={styles.timeline}>
              <div ref={progressBarRef} className={styles.timelineFill} />
            </div>
            <span className={styles.scrollCue}>SCROLL TO EXPLORE</span>
          </div>
        )}

        {!reducedMotion && count > 1 && (
          <button type="button" onClick={skipAnimation} className={styles.skip}>
            Skip animation <span aria-hidden="true">↘</span>
          </button>
        )}

        <span className={styles.srOnly}>
          Cinematic scroll-driven presentation of twenty original building images. All building photographs
          retain their source proportions. The main website navigation and content remain accessible.
        </span>
      </div>
    </section>
  );
}
