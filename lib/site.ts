/** Absolute site origin used for canonical URLs, sitemap and Open Graph. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
