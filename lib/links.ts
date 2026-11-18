import { brand, contact } from "@/lib/brand";

/** Canonical contact hrefs. Kept here so every button uses the same values. */
export const telHref = `tel:${contact.phoneE164}`;
export const mailtoHref = `mailto:${contact.email}`;

/** WhatsApp click-to-chat link with an optional pre-filled message. */
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Default WhatsApp greeting used by generic "chat with us" buttons. */
export const defaultWhatsAppMessage = `Hello ${brand.name}, I would like to know more about your services.`;

export function buildMailtoUrl(subject: string, body: string): string {
  const params = new URLSearchParams({ subject, body });
  // URLSearchParams encodes spaces as "+", which some mail clients show literally.
  return `${mailtoHref}?${params.toString().replace(/\+/g, "%20")}`;
}

/** Pre-filled WhatsApp enquiry for one service. */
export function buildServiceEnquiryUrl(serviceName: string): string {
  return buildWhatsAppUrl(
    `Hello SKI Construction, I would like an enquiry about ${serviceName}. Please share the next steps.`,
  );
}

/** Contact form link that preselects a service. */
export function buildServiceContactHref(serviceName: string): string {
  return `/contact?service=${encodeURIComponent(serviceName)}`;
}

/** Google Maps search for an arbitrary query, opened in a new tab. */
export function buildMapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Google Maps directions to the company office. */
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.mapsQuery)}`;

/** Embeddable Google Maps view (no API key required). */
export function buildMapsEmbedUrl(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}
