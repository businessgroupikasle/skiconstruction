import Image from "next/image";
import { Eye, Loader2 } from "lucide-react";

export type WebGLFallbackVariant = "loading" | "unsupported";

interface WebGLFallbackProps {
  variant: WebGLFallbackVariant;
  /** Set true for the above-the-fold hero so the poster is preloaded */
  priority?: boolean;
  className?: string;
}

/**
 * Static poster shown while the 3D scene loads, and as the permanent alternative when
 * WebGL is unavailable or the scene fails. It has no three.js dependency so it can be
 * rendered on the server.
 */
export function WebGLFallback({ variant, priority = false, className = "" }: WebGLFallbackProps) {
  const isLoading = variant === "loading";
  return (
    <div className={`absolute inset-0 overflow-hidden rounded-[2rem] bg-brand-soft ${className}`}>
      <Image
        src="/images/hero/banner1.png"
        alt={
          isLoading
            ? "Modern villa with wood cladding and glass walls, shown as a static preview"
            : "Static preview of a modern villa with wood cladding and glass walls"
        }
        fill
        priority={priority}
        sizes="(min-width: 1024px) 52vw, 100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
      {isLoading ? (
        <p role="status" className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-brand-dark shadow-soft">
          <Loader2 aria-hidden="true" className="size-3.5 animate-spin text-brand-primary" />
          Loading 3D model
        </p>
      ) : (
        <p className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-brand-dark shadow-soft">
          <Eye aria-hidden="true" className="size-3.5 text-brand-primary" />
          3D view unavailable on this device. Static view shown.
        </p>
      )}
    </div>
  );
}
