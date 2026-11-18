import Image from "next/image";
import { MapPin, Navigation, ExternalLink, Maximize2 } from "lucide-react";
import { contact } from "@/lib/brand";
import { buildMapsEmbedUrl, mapsDirectionsUrl } from "@/lib/links";

/**
 * "Our Location" 3-Part Showcase Section
 * Matches the layout from the mockup:
 * - Left: Stylized Google Map card with pin badge and controls
 * - Middle: Location header, address, and "Get Directions on Google Maps" button
 * - Right: Office facade photo showing SKI Construction illuminated signage on stone wall
 */
export function LocationMap() {
  return (
    <section aria-labelledby="location-heading" className="py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* ========================================================================= */}
        {/* 1. LEFT: Interactive Google Map Card (5 cols on lg)                       */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 relative h-[250px] sm:h-[280px] lg:h-[300px] rounded-3xl overflow-hidden border border-brand-line/80 bg-brand-soft shadow-card group">
          {/* Live Google Map iframe */}
          <iframe
            title={`Google Map showing ${contact.mapsQuery}`}
            src={buildMapsEmbedUrl(contact.mapsQuery)}
            className="absolute inset-0 size-full border-0 filter contrast-[1.02]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />


          {/* Direct Fullscreen map link */}
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open in Google Maps"
            className="absolute top-4 right-4 z-10 size-8 rounded-lg bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-brand-primary transition-colors cursor-pointer"
          >
            <Maximize2 className="size-4" />
          </a>
        </div>

        {/* ========================================================================= */}
        {/* 2. MIDDLE: Address Details & Directions CTA (3 cols on lg)                */}
        {/* ========================================================================= */}
        <div className="lg:col-span-3 flex flex-col justify-center gap-4 py-2">
          {/* Header */}
          <div className="flex items-center gap-2">
            <MapPin className="size-6 text-[#f5b838] fill-[#f5b838]/20 shrink-0" />
            <h3 id="location-heading" className="text-xl sm:text-2xl font-extrabold text-[#11231a] tracking-tight">
              Our Location
            </h3>
          </div>

          {/* Address with gold pin */}
          <div className="flex items-start gap-2.5">
            <MapPin className="size-4 text-[#f5b838] shrink-0 mt-1" />
            <address className="text-xs sm:text-sm font-medium leading-relaxed text-[#11231a] not-italic">
              {contact.addressLine1},
              <br />
              {contact.addressLine2}
            </address>
          </div>

          {/* Get Directions Button */}
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#143d2b] bg-white hover:bg-[#143d2b] text-[#143d2b] hover:text-white px-4 py-2.5 text-xs sm:text-sm font-bold shadow-xs transition-all duration-200 group w-fit"
          >
            <Navigation className="size-4 text-[#143d2b] group-hover:text-white transition-colors" />
            <span>Get Directions on Google Maps</span>
            <ExternalLink className="size-3 opacity-70 group-hover:opacity-100" />
          </a>
        </div>

        {/* ========================================================================= */}
        {/* 3. RIGHT: Office Facade Image (4 cols on lg)                              */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 relative h-[250px] sm:h-[280px] lg:h-[300px] rounded-3xl overflow-hidden border border-brand-line/80 shadow-card bg-stone-900 group">
          <Image
            src="/images/contact/ski.png"
            alt="SKI Construction Office Entrance & Showroom"
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Warm architectural lighting overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
