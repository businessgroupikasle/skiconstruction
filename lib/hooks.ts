"use client";

import { useSyncExternalStore } from "react";

/**
 * Browser-only hooks built on useSyncExternalStore. The server snapshot is a
 * fixed value, so server HTML and the first client render always match.
 */

function subscribeToMediaQuery(query: string) {
  return (onChange: () => void) => {
    const list = window.matchMedia(query);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  };
}

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribeToMediaQuery(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}

export function useIsCoarsePointer(): boolean {
  return useMediaQuery("(pointer: coarse)");
}

export type WebGLSupport = "unknown" | "supported" | "unsupported";

let cachedSupport: WebGLSupport | null = null;

/** Detects WebGL 2 or WebGL 1 without creating a long-lived context. */
export function detectWebGL(): WebGLSupport {
  if (cachedSupport) return cachedSupport;
  try {
    const canvas = document.createElement("canvas");
    const context = (canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | WebGL2RenderingContext | null;
    cachedSupport = context ? "supported" : "unsupported";
    // Release the probe context so it does not count against the browser limit.
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    cachedSupport = "unsupported";
  }
  return cachedSupport;
}

function subscribeNoop() {
  return () => {};
}

export function useWebGLSupport(): WebGLSupport {
  return useSyncExternalStore(
    subscribeNoop,
    () => detectWebGL(),
    () => "unknown" as WebGLSupport,
  );
}
