"use client";

import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ArrowUp,
  Award,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { SkiLogo } from "@/components/brand/SkiLogo";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from "@/components/ui/icons";
import { footerQuickLinks } from "@/data/content";
import { brand, contact, founder, socialProfiles } from "@/lib/brand";
import {
  buildWhatsAppUrl,
  defaultWhatsAppMessage,
  mapsDirectionsUrl,
  telHref,
  mailtoHref,
} from "@/lib/links";

const featuredServices = [
  { name: "Construction", href: "/services/building-construction" },
  { name: "Consulting", href: "/services/construction-consulting" },
  { name: "LBS – Plan Approval", href: "/services/lbs-plan-approval" },
  { name: "Vastu Plan", href: "/services/vastu-plan" },
  { name: "3D Elevation", href: "/services/3d-elevation-design" },
  { name: "Bank Loan Estimate", href: "/services/bank-loan-estimate" },
  { name: "DTCP / LPA", href: "/services/dtcp-lpa-approval" },
  { name: "Real Estate", href: "/services/real-estate" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const consultationWhatsAppUrl = buildWhatsAppUrl(
    "Hello Er. D. Satheeshkumar, I would like to consult about construction and elevation services for my site in Coimbatore."
  );

  return (
    <footer className="relative bg-[#05140b] text-white overflow-hidden border-t border-emerald-950">
      {/* Subtle architectural grid pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.04] pointer-events-none"
      />

      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/4 -z-10 size-96 rounded-full bg-brand-primary/15 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 -z-10 size-80 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none"
      />



      {/* =========================================================
          MAIN 4-COLUMN FOOTER CONTENT (EQUAL 4 COLUMNS)
         ========================================================= */}
      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 xl:gap-10 items-start">
          {/* -------------------------------------------------------
              COL 1: Brand & Engineer Authority (Equal 1 col)
             ------------------------------------------------------- */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                About SKI
              </h4>
            </div>

            {/* Logo in bright card */}
            <div>
              <div className="inline-flex items-center rounded-2xl bg-white px-3.5 py-2 shadow-md shadow-black/20 border border-white/20">
                <SkiLogo imageClassName="h-10 sm:h-12 w-auto object-contain" />
              </div>
            </div>

            {/* Founder Registered Credential Card */}
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-emerald-500/20 backdrop-blur-xs">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-primary/20 text-brand-accent border border-brand-primary/30 mt-0.5">
                <Award className="size-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Registered LBS Engineer
                </span>
                <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                  {founder.name}, {founder.credentials}
                </span>
                <span className="text-[11px] text-gray-300 leading-snug mt-0.5">
                  Coimbatore Corporation Approved
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed !text-left">
              Delivering turnkey residential & commercial construction, realistic 3D
              elevation designs, and statutory LBS/DTCP plan approvals across
              Coimbatore, Kinathukadavu, and surrounding areas.
            </p>

            {/* Social & Direct Contact Icons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={consultationWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-xl bg-white/8 hover:bg-brand-primary text-gray-300 hover:text-white border border-white/10 hover:border-brand-primary transition-all duration-200 shadow-xs"
                aria-label="WhatsApp SKI Construction"
              >
                <WhatsAppIcon className="size-4" />
              </a>

              <a
                href={telHref}
                className="flex size-9 items-center justify-center rounded-xl bg-white/8 hover:bg-brand-primary text-gray-300 hover:text-white border border-white/10 hover:border-brand-primary transition-all duration-200 shadow-xs"
                aria-label={`Call ${contact.phoneDisplay}`}
              >
                <Phone className="size-4" />
              </a>

              <a
                href={mailtoHref}
                className="flex size-9 items-center justify-center rounded-xl bg-white/8 hover:bg-brand-primary text-gray-300 hover:text-white border border-white/10 hover:border-brand-primary transition-all duration-200 shadow-xs"
                aria-label={`Email ${contact.email}`}
              >
                <Mail className="size-4" />
              </a>

              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-9 items-center justify-center rounded-xl bg-white/8 hover:bg-brand-primary text-gray-300 hover:text-white border border-white/10 hover:border-brand-primary transition-all duration-200 shadow-xs"
                aria-label="Find us on Google Maps"
              >
                <MapPin className="size-4" />
              </a>

              {socialProfiles.map((profile) => {
                const isInstagram = profile.label.toLowerCase().includes("instagram");
                const isFacebook = profile.label.toLowerCase().includes("facebook");

                return (
                  <a
                    key={profile.href}
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-9 items-center justify-center rounded-xl bg-white/8 hover:bg-brand-primary text-gray-300 hover:text-white border border-white/10 hover:border-brand-primary transition-all duration-200 shadow-xs"
                    aria-label={profile.label}
                  >
                    {isInstagram ? (
                      <InstagramIcon className="size-4" />
                    ) : isFacebook ? (
                      <FacebookIcon className="size-4" />
                    ) : (
                      <span className="text-xs font-bold">
                        {profile.label.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* -------------------------------------------------------
              COL 2: Core Engineering Services (Equal 1 col)
             ------------------------------------------------------- */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Our Services
              </h4>
            </div>

            <ul className="flex flex-col gap-2">
              {featuredServices.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="group flex items-center justify-between py-1 text-xs sm:text-sm text-gray-300 hover:text-emerald-300 transition-colors duration-150"
                  >
                    <span>{service.name}</span>
                    <ArrowRight className="size-3 text-gray-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-emerald-400 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* -------------------------------------------------------
              COL 3: Quick Navigation & Legal (Equal 1 col)
             ------------------------------------------------------- */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Navigation
              </h4>
            </div>

            <ul className="flex flex-col gap-2">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    scroll={true}
                    onClick={() => {
                      if (link.href === "/" && typeof window !== "undefined") {
                        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                      }
                    }}
                    className="group flex items-center justify-between py-1 text-xs sm:text-sm text-gray-300 hover:text-emerald-300 transition-colors duration-150"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="size-3 text-gray-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-emerald-400 transition-all duration-200" />
                  </Link>
                </li>
              ))}
              <li className="pt-2 mt-1 border-t border-white/10">
                <Link
                  href="/privacy-policy"
                  className="group flex items-center justify-between py-1 text-xs sm:text-sm text-gray-300 hover:text-emerald-300 transition-colors duration-150"
                >
                  <span>Privacy Policy</span>
                  <ArrowRight className="size-3 text-gray-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-emerald-400 transition-all duration-200" />
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="group flex items-center justify-between py-1 text-xs sm:text-sm text-gray-300 hover:text-emerald-300 transition-colors duration-150"
                >
                  <span>Terms & Conditions</span>
                  <ArrowRight className="size-3 text-gray-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-emerald-400 transition-all duration-200" />
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap"
                  className="group flex items-center justify-between py-1 text-xs sm:text-sm text-gray-300 hover:text-emerald-300 transition-colors duration-150"
                >
                  <span>Sitemap</span>
                  <ArrowRight className="size-3 text-gray-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-emerald-400 transition-all duration-200" />
                </Link>
              </li>
            </ul>
          </div>

          {/* -------------------------------------------------------
              COL 4: Visit & Office Coordinates (Equal 1 col)
             ------------------------------------------------------- */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Visit & Contact
              </h4>
            </div>

            {/* Address box */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                <div className="text-xs text-gray-300 leading-relaxed !text-left">
                  <span className="font-semibold text-white block">
                    SKI Construction Office
                  </span>
                  {contact.addressLine1},
                  <br />
                  {contact.addressLine2}
                </div>
              </div>

              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <Compass className="size-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>

            {/* Direct Contact links */}
            <div className="flex flex-col gap-2 text-xs">
              <a
                href={telHref}
                className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors py-1"
              >
                <span className="flex size-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Phone className="size-3" />
                </span>
                <span>{contact.phoneDisplay}</span>
              </a>

              <a
                href={mailtoHref}
                className="flex items-center gap-2.5 break-all text-gray-300 hover:text-white transition-colors py-1"
              >
                <span className="flex size-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Mail className="size-3" />
                </span>
                <span>{contact.email}</span>
              </a>
            </div>

            {/* Verified Compliance Badge */}
            <div className="flex items-center gap-2 pt-1 text-[11px] text-gray-400">
              <ShieldCheck className="size-4 text-emerald-400 shrink-0" />
              <span>GSTIN: {contact.gstin}</span>
            </div>
          </div>
        </div>
      </Container>

      {/* =========================================================
          CREATIVE BOTTOM BAR
         ========================================================= */}
      <div className="border-t border-white/10 bg-[#030d07]">
        <Container className="flex flex-col lg:flex-row items-center justify-between gap-4 py-5 text-xs text-gray-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-center sm:text-left">
              © {year} <span className="text-white font-medium">{brand.name}</span>. All rights reserved.
            </p>
            <span className="hidden sm:inline text-white/20">|</span>
            <p className="text-gray-400 text-center sm:text-left">
              Crafted and Maintained by{" "}
              <a
                href="https://www.ikasletechnologies.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-semibold hover:text-emerald-300 hover:underline transition-colors"
              >
                Ikaslé Technologies
              </a>
            </p>
          </div>

          {/* Legal & Directory Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-gray-400">
            <Link
              href="/privacy-policy"
              className="hover:text-emerald-300 transition-colors duration-150"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20" aria-hidden="true">·</span>
            <Link
              href="/terms-and-conditions"
              className="hover:text-emerald-300 transition-colors duration-150"
            >
              Terms & Conditions
            </Link>
            <span className="text-white/20" aria-hidden="true">·</span>
            <Link
              href="/sitemap"
              className="hover:text-emerald-300 transition-colors duration-150"
            >
              Sitemap
            </Link>
          </div>

          {/* Smooth Back to Top Button */}
          <button
            onClick={scrollToTop}
            type="button"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-brand-primary text-gray-300 hover:text-white border border-white/10 hover:border-brand-primary transition-all duration-200 cursor-pointer text-xs font-semibold"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </Container>
      </div>
    </footer>
  );
}
