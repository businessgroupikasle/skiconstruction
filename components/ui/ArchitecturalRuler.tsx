import React from "react";

interface ArchitecturalRulerProps {
  className?: string;
  unit?: string;
  showBadge?: boolean;
}

/**
 * Architectural Drafting Ruler / Engineering Scale
 * Displays precision CAD drafting tick marks with metric scale units,
 * creating an authentic engineering blueprint transition below the hero banner.
 */
export function ArchitecturalRuler({
  className = "",
  unit = "m",
  showBadge = true,
}: ArchitecturalRulerProps) {
  // Generate sequential major markers (each 80px apart, covering up to 4000px screen widths)
  const segments = Array.from({ length: 48 }, (_, i) => i);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative w-full overflow-hidden select-none ${className}`}
    >
      {/* Top drafting datum baseline */}
      <div className="absolute top-0 inset-x-0 h-px bg-brand-line/90 z-10" />

      {/* SVG repeating pattern for high-density architectural drafting ticks (every 4px) */}
      <svg
        className="absolute top-0 left-0 h-10 sm:h-12 w-full text-brand-dark"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="architectural-drafting-ticks"
            width="80"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            {/* Major tick mark (x=0) */}
            <line
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="28"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.55"
            />

            {/* Mid tick mark (x=40) */}
            <line
              x1="40.5"
              y1="0"
              x2="40.5"
              y2="18"
              stroke="currentColor"
              strokeWidth="1.2"
              opacity="0.38"
            />

            {/* Quarter tick marks (x=20, x=60) */}
            <line
              x1="20.5"
              y1="0"
              x2="20.5"
              y2="13"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.28"
            />
            <line
              x1="60.5"
              y1="0"
              x2="60.5"
              y2="13"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.28"
            />

            {/* Minor drafting ticks (every 4px) */}
            {[4, 8, 12, 16, 24, 28, 32, 36, 44, 48, 52, 56, 64, 68, 72, 76].map((x) => (
              <line
                key={x}
                x1={x + 0.5}
                y1="0"
                x2={x + 0.5}
                y2="7"
                stroke="currentColor"
                strokeWidth="0.8"
                opacity="0.18"
              />
            ))}
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#architectural-drafting-ticks)"
        />
      </svg>

      {/* Numbered measurement labels aligned with each 80px major tick */}
      <div className="relative flex h-10 sm:h-12 w-full flex-nowrap pl-0.5">
        {segments.map((num) => {
          const displayValue = String(num * 10).padStart(2, "0");
          return (
            <div
              key={num}
              style={{ width: "80px", minWidth: "80px" }}
              className="relative shrink-0"
            >
              <span className="absolute top-7 sm:top-8 left-1 font-mono text-[8.5px] sm:text-[9.5px] font-semibold tracking-tighter text-brand-dark/45 select-none">
                {displayValue}
                {num === 0 && <span className="ml-0.5 text-[7px] text-brand-primary">{unit}</span>}
              </span>
            </div>
          );
        })}
      </div>

      {/* Engineering Scale Metadata Badge */}
      {showBadge && (
        <div className="absolute top-2 right-4 sm:right-8 z-20 hidden md:flex items-center gap-2 rounded-full border border-brand-line/80 bg-white/90 px-3 py-0.5 shadow-xs backdrop-blur-xs">
          <span className="size-1.5 rounded-full bg-brand-primary animate-pulse" />
          <span className="font-mono text-[9px] font-semibold tracking-widest text-brand-dark/60 uppercase">
            SCALE 1:100 • DRAFTING GAUGE
          </span>
        </div>
      )}
    </div>
  );
}

