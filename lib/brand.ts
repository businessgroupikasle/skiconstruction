/**
 * Centralised brand tokens and company facts.
 * CSS colour tokens live in app/globals.css (@theme). The hex values below mirror
 * them for the places where JavaScript needs a colour (the WebGL scene, metadata).
 */

export const brandColors = {
  primary: "#367C08",
  accent: "#65B516",
  dark: "#153D16",
  ivory: "#FEFEFA",
  white: "#FFFFFF",
  soft: "#F4F8F0",
} as const;

export const brand = {
  name: "SKI Construction",
  shortName: "SKI",
  tagline: "BUILD WITH QUALITY",
  locale: "en_IN",
  description:
    "SKI Construction — build with quality. Construction, 3D elevation design, LBS and DTCP / LPA plan approvals, bank loan estimates and property services in Kinathukadavu, Coimbatore.",
  themeColor: brandColors.primary,
} as const;

export const contact = {
  phoneDisplay: "+91 8526 224354",
  phoneE164: "+918526224354",
  /** WhatsApp click-to-chat uses the number without "+" */
  whatsappNumber: "918526224354",
  email: "skiconstruction.cbe@gmail.com",
  addressLine1: "Near MLA Office, Krishnasamypuram",
  addressLine2: "Kinathukadavu, Coimbatore - 642109",
  address: "Near MLA Office, Krishnasamypuram, Kinathukadavu, Coimbatore - 642109",
  gstin: "33ECHPS1610H1ZT",
  /** Query used for Google Maps embeds and search links */
  mapsQuery: "SKI Construction, Near MLA Office, Krishnasamypuram, Kinathukadavu, Coimbatore 642109",
} as const;

export const founder = {
  name: "Er. D. Satheeshkumar",
  credentials: "DCE., BE.",
  role: "Registered LBS Engineer",
} as const;

/**
 * Optional social profiles. Leave an entry out (or empty) until the company
 * supplies verified URLs; the footer only renders links that have a value.
 */
export const socialProfiles: { label: string; href: string }[] = [];
