"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Ensures that navigating between pages always starts at the top of the viewport.
 * Fixes Next.js App Router issue where scroll position from the previous route
 * (e.g. /contact) persists on the destination page (e.g. /).
 */
export function RouteScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Force instantaneous scroll reset on every route transition
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
}
