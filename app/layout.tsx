import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Montserrat } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RouteScrollRestoration } from "@/components/layout/RouteScrollRestoration";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { brand, brandColors } from "@/lib/brand";
import { siteUrl } from "@/lib/site";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SKI Construction | Build With Quality",
    template: "%s | SKI Construction",
  },
  description: brand.description,
  applicationName: brand.name,
  keywords: [
    "construction company Coimbatore",
    "LBS plan approval",
    "DTCP LPA approval",
    "3D elevation design",
    "construction consulting Kinathukadavu",
    "Vastu plan",
    "bank loan estimate",
  ],
  openGraph: {
    type: "website",
    siteName: brand.name,
    locale: brand.locale,
    title: "SKI Construction | Build With Quality",
    description: brand.description,
    url: siteUrl,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: brandColors.primary,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${instrumentSerif.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <RouteScrollRestoration />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
