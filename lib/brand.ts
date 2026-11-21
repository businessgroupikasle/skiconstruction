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
  tagline: "Build With Quality",
  locale: "en_IN",
  description:
    "SKI Construction in Kinathukadavu, Coimbatore: building construction, civil engineering consulting, registered LBS plan approval, Vastu plans, 3D elevation design, bank loan estimates, DTCP/LPA approval guidance, and real estate services.",
  themeColor: brandColors.primary,
} as const;

export const contact = {
  phoneDisplay: "+91 8526 224354",
  phoneE164: "+918526224354",
  /** WhatsApp click-to-chat uses the number without "+" */
  whatsappNumber: "918526224354",
  email: "skiconstruction.cbe@gmail.com",
  addressLine1: "Near MLA Office, Krishnasamypuram",
  addressLine2: "Kinathukadavu, Coimbatore – 642109, Tamil Nadu, India",
  address: "Near MLA Office, Krishnasamypuram, Kinathukadavu, Coimbatore – 642109, Tamil Nadu, India.",
  gstin: "33ECHPS1610H1ZT",
  /** Query used for Google Maps embeds and search links */
  mapsQuery: "SKI Construction, Near MLA Office, Krishnasamypuram, Kinathukadavu, Coimbatore 642109",
} as const;

export const founder = {
  name: "Er. D. Satheeshkumar",
  credentials: "DCE, BE",
  role: "Registered LBS Engineer",
} as const;

/**
 * Verified social profiles for SKI Construction.
 */
export const socialProfiles: { label: string; href: string }[] = [
  { label: "Instagram", href: "https://www.instagram.com/skiconstruction" },
  { label: "Facebook", href: "https://www.facebook.com/SkiconstructionCbe" },
];
