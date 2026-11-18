"use client";

import { Suspense, useEffect, useRef, useState, type MutableRefObject } from "react";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { WebGLFallback } from "@/components/three/WebGLFallback";
import { Villa3DScene } from "@/components/three/Villa3DScene";
import { useIsCoarsePointer, useIsDesktop, usePrefersReducedMotion, useWebGLSupport } from "@/lib/hooks";

export interface Villa3DStageProps {
  progressRef?: MutableRefObject<number>;
  /** Allow mouse and touch orbit. Off for purely decorative placements */
  interactive?: boolean;
  label?: string;
  className?: string;
  priority?: boolean;
  autoRotate?: boolean;
}

/**
 * Client boundary for the 3D villa. It decides what to show:
 *  - WebGL unknown (first client render): static poster, so the layout is already sized
 *  - WebGL unsupported, context lost or scene error: static poster with a note
 *  - Otherwise: the live canvas, which fades in once the first frame renders
 * Offscreen, rendering is paused. Reduced-motion users get a static, still-orbitable view.
 */
export default function Villa3DStage({
  progressRef,
  interactive = true,
  label = "Interactive 3D model of modern luxury villa and structural concrete framework based on banner1.png",
  className = "",
  priority = false,
  autoRotate = false,
}: Villa3DStageProps) {
  const support = useWebGLSupport();
  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const coarsePointer = useIsCoarsePointer();
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? true),
      { rootMargin: "120px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const frameloop = !inView ? "never" : reducedMotion ? "demand" : "always";
  const quality = isDesktop && !coarsePointer ? "high" : "low";
  const showUnsupported = support === "unsupported" || failed;
  const showCanvas = support === "supported" && !failed;

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label={label}
      className={`relative size-full overflow-hidden rounded-[2rem] ${className}`}
    >
      <WebGLFallback variant={showUnsupported ? "unsupported" : "loading"} priority={priority} />

      {showCanvas ? (
        <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
          <ErrorBoundary fallback={<WebGLFallback variant="unsupported" />} onError={() => setFailed(true)}>
            <Suspense fallback={null}>
              <Villa3DScene
                progressRef={progressRef}
                frameloop={frameloop}
                quality={quality}
                reducedMotion={reducedMotion}
                interactive={interactive}
                touch={coarsePointer}
                label={label}
                autoRotate={autoRotate}
                onReady={() => setReady(true)}
                onError={() => setFailed(true)}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      ) : null}
    </div>
  );
}
