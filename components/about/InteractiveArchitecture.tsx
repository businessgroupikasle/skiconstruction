"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Hand, MousePointer2, RotateCw } from "lucide-react";
import { WebGLFallback } from "@/components/three/WebGLFallback";

/** The About page 3D building visualization with full touch and orbit controls. */
const Villa3DStage = dynamic(() => import("@/components/three/Villa3DStage"), {
  ssr: false,
  loading: () => <WebGLFallback variant="loading" />,
});

export function InteractiveArchitecture() {
  const [autoRotate, setAutoRotate] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-[320px] xs:h-[380px] sm:h-[460px] md:h-[500px] lg:h-[560px] xl:h-[600px] w-full overflow-hidden rounded-3xl border border-brand-line shadow-card bg-gradient-to-b from-[#e8f3fa] to-[#f4f7f2]">
        <Villa3DStage
          interactive
          autoRotate={autoRotate}
          label="Interactive 3D architectural model of SKI Construction villa and structural framework"
          className="size-full"
        />

        {/* 360-degree rotation button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            type="button"
            onClick={() => setAutoRotate((v) => !v)}
            aria-label="Toggle 360-degree rotation"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full backdrop-blur-md border shadow-sm transition-all ${
              autoRotate
                ? "bg-brand-dark text-white border-brand-dark"
                : "bg-white/85 text-brand-dark border-brand-line hover:border-brand-primary"
            }`}
          >
            <RotateCw className={`size-3.5 ${autoRotate ? "animate-spin" : ""}`} />
            <span>{autoRotate ? "Rotating" : "360° View"}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 text-xs sm:text-sm text-brand-muted">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="inline-flex items-center gap-1.5">
            <MousePointer2 aria-hidden="true" className="size-4 text-brand-primary" />
            Drag to orbit 360°
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Hand aria-hidden="true" className="size-4 text-brand-primary" />
            Touch swipe to rotate
          </span>
        </div>
        <span className="text-[0.75rem] sm:text-xs">Architectural 3D concept model</span>
      </div>
    </div>
  );
}
