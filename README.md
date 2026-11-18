# SKI Construction website

Responsive marketing site for SKI Construction (Coimbatore). Built with Next.js App Router, TypeScript, Tailwind CSS v4, React Three Fiber (Three.js + Drei) for the villa scene, and GSAP ScrollTrigger for the hero animation. Forms are validated with React Hook Form and Zod.

## Requirements

- Node.js 20.9 or newer (developed on Node 24)
- npm
- Internet access at build time: Google Fonts (Montserrat) is downloaded by `next/font`, and the office map is an embedded Google Maps view

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (type-checks and compiles all routes) |
| `npm run start` | Serves the production build (run `build` first) |
| `npm run lint` | ESLint (Next.js Core Web Vitals and TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` in strict mode |

## Routes

| Route | Content |
| --- | --- |
| `/` | Home: hero with the 3D villa, service icon strip, about and founder, nine service cards, recent projects carousel, gallery preview, why choose us, work process, statistics, testimonials, contact banner |
| `/about` | Company introduction, founder, vision and mission, construction approach, interactive 3D model |
| `/services` | All nine services with descriptions, benefits and enquiry buttons. Each has an anchor (`/services#lbs-plan-approval`, etc.) |
| `/services/[slug]` | Detail page for each of the nine services: overview, what is included, benefits, process, audience, FAQs, related services and previous/next navigation. Statically generated; unknown slugs return 404 |
| `/gallery` | Two gallery types: "Computer files" (downloadable design files) and "Videos and images" (a Videos or Images switch). Photos have category filters and a keyboard-accessible full-size viewer |
| `/contact` | Contact details (call, WhatsApp, email, address, GSTIN), enquiry form, Google Maps embed with search. `?service=<name>` preselects a service |

Also provided: `/robots.txt`, `/sitemap.xml`, a themed `icon.svg`, and a branded 404 page.

## Deploying

The site is a Next.js server app, not a static export, because the contact page reads the `service` query parameter.

1. Set the public site URL (used for canonical links, Open Graph and the sitemap):

   ```bash
   NEXT_PUBLIC_SITE_URL=https://www.your-domain.example
   ```

2. Build and run:

   ```bash
   npm run build
   npm run start        # listens on port 3000 (set PORT to change)
   ```

Any Node host works (for example a VM with a process manager, or a platform such as Vercel). Point the host at `npm run start`.

## Where to edit content

| Area | File |
| --- | --- |
| Brand colours, phone, email, address, GSTIN, founder | `lib/brand.ts` |
| Navigation, projects, benefits, process, statistics, testimonials | `data/content.ts` |
| Service detail pages (overview, included items, process, FAQs, audience) | `data/service-details.ts` |
| Gallery photographs, categories, design files and videos | `data/gallery.ts` |
| Nine services (text, benefits, photos) | `data/services.ts` |
| About page copy: vision, mission, founder introduction | `data/about.ts` |
| Colour, shadow and font tokens (Tailwind `@theme`) | `app/globals.css` |
| 3D camera, lighting and orbit limits | `components/three/scene-config.ts` |
| Logo | `components/brand/SkiLogo.tsx` |

## Placeholders to replace before launch

These items are visible on the site and must be replaced or confirmed by the company:

- **Logo.** No logo file was supplied. `SkiLogo.tsx` draws a placeholder mark. Replace it with the official asset.
- **Statistics.** The figures (150+ projects, 12+ years, 100+ clients, 100% quality) come from the design reference. They are labelled "illustrative" on the page. Confirm them or remove the band.
- **Testimonials.** All three quotes are marked "Sample quote". Replace them with approved client quotes.
- **Projects.** The three to five project cards are design examples marked "Illustrative". Replace them with verified project photographs and details.
- **Gallery photographs.** All gallery images are stock photographs labelled as illustrative. Replace them in `public/images/` (and the entries in `data/gallery.ts`) with SKI Construction's own work.
- **Gallery design files and videos.** The "Computer files" list uses three sample JPG files from `public/images/services/`. Replace them with the company's real design files (PDF, DWG, etc.) and update `designFiles` in `data/gallery.ts`. No videos exist yet, so the Videos option is empty. Add `.mp4` files to `public/videos/` and entries to `galleryVideos`.
- **Service detail copy.** The overview, included items, process steps, audience and FAQs in `data/service-details.ts` were drafted for this site. Requirements that depend on location (approvals, documents) are worded as "confirmed for your site". Review all of it before launch.
- **Vision, mission and founder copy** in `data/about.ts` was drafted for this site. The company should review it.
- **Photography.** Service, project and about images are Unsplash photographs (free to use under the Unsplash licence), stored in `public/images/`. Swap them for the company's own photos where available.
- **Social profiles.** None were supplied. Add them to `socialProfiles` in `lib/brand.ts` to show footer icons.

## Behaviour and limits

- **Enquiry form.** Validation runs in the browser. There is no server or database. "Send on WhatsApp" opens WhatsApp with the enquiry pre-filled. "Send by email" opens the visitor's mail app. Nothing is stored by the site.
- **3D villa.** A procedural model built from primitives, so there are no third-party model files. It loads only on the client, after a WebGL check. If WebGL is unavailable, or the scene fails, a static poster with a note is shown. With reduced motion enabled, the build-up animation and scroll-linked camera motion are turned off. The model stays static and can still be rotated.
- **Scroll camera.** GSAP ScrollTrigger drives the hero camera. Rendering pauses when the canvas is off-screen.
- **Contact details** are live links: `tel:`, `mailto:`, `https://wa.me/918526224354` and Google Maps directions.

## Legacy prototype

The earlier Vite and React prototype is kept in `legacy/vite-prototype/` for reference. It is not built, and it is excluded from TypeScript and ESLint. Delete the folder once the new site is approved.
