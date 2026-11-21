import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core canonical site pages
  const coreRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/projects", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/gallery", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.85, changeFrequency: "monthly" as const },
  ].map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // 8 individual service detail pages
  const serviceDetailPages = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...coreRoutes, ...serviceDetailPages];
}
