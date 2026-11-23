import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  FileCode,
  FolderTree,
  Building2,
  HardHat,
  Image as ImageIcon,
  PhoneCall,
  Scale,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { services } from "@/data/services";
import { brand, contact } from "@/lib/brand";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sitemap | SKI Construction Coimbatore",
  description:
    "Complete directory of pages, civil engineering services, 3D architectural gallery, and project portfolios on the SKI Construction website.",
  alternates: { canonical: `${siteUrl}/sitemap` },
  robots: { index: true, follow: true },
};

export default function SitemapPage() {
  const mainPages = [
    { title: "Home", href: "/", description: "Interactive 3D construction hero, company introduction, and service highlights." },
    { title: "About Us", href: "/about", description: "Company background, Er. D. Satheeshkumar's credentials, mission, vision, and core values." },
    { title: "Our Services", href: "/services", description: "Comprehensive directory of our 8 core architectural and civil engineering services." },
    { title: "Projects Explorer", href: "/projects", description: "Ongoing and completed residential villas and commercial buildings." },
    { title: "Media Gallery", href: "/gallery", description: "3D architectural elevation renders, drone perspectives, and project video walkthroughs." },
    { title: "Contact Us", href: "/contact", description: "Office location in Kinathukadavu, phone numbers, WhatsApp, and inquiry form." },
  ];

  const legalPages = [
    { title: "Privacy Policy", href: "/privacy-policy", description: "How we collect, handle, and secure client personal and site data." },
    { title: "Terms & Conditions", href: "/terms-and-conditions", description: "General terms governing contracts, estimates, approvals, and IP." },
    { title: "XML Sitemap (Raw)", href: "/sitemap.xml", description: "Machine-readable XML sitemap for search engine web crawlers." },
  ];

  return (
    <article className="bg-[#fcfdfa] min-h-screen">
      <PageHero
        eyebrow="Website Directory"
        title="HTML Sitemap"
        description="Browse the complete site architecture of SKI Construction, including all pages, services, portfolios, and legal policies."
        breadcrumb="Sitemap"
        backgroundImage="/images/background/breadcrumb-banner.jpg"
      />

      <Container className="py-12 sm:py-16 lg:py-20 max-w-5xl">
        <div className="flex flex-col gap-12">
          {/* Top XML Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand-primary text-white">
                <FileCode className="size-5" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-brand-dark">Search Engine XML Sitemap</h3>
                <p className="text-xs text-brand-muted">Machine-readable index updated regularly for Google & Bing web crawlers.</p>
              </div>
            </div>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-xs font-bold text-brand-primary border border-emerald-600/30 hover:bg-emerald-50 transition-colors shadow-xs"
            >
              <span>View sitemap.xml</span>
              <ArrowRight className="size-3.5" />
            </a>
          </div>

          {/* Section 1: Main Pages */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-brand-line pb-3">
              <FolderTree className="size-5 text-brand-primary" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark">
                Primary Navigation
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mainPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group flex flex-col justify-between p-5 rounded-xl border border-brand-line bg-white hover:border-brand-primary/50 hover:shadow-soft transition-all duration-200"
                >
                  <div>
                    <h3 className="text-base font-bold text-brand-dark group-hover:text-brand-primary transition-colors flex items-center justify-between">
                      <span>{page.title}</span>
                      <ArrowRight className="size-4 text-brand-muted group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                      {page.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 2: Core Engineering Services */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-brand-line pb-3">
              <Building2 className="size-5 text-brand-primary" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark">
                Engineering & Construction Services
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex flex-col justify-between p-4 rounded-xl border border-brand-line bg-white hover:border-brand-primary/50 hover:shadow-soft transition-all duration-200"
                >
                  <div>
                    <h3 className="text-sm font-bold text-brand-dark group-hover:text-brand-primary transition-colors flex items-center justify-between">
                      <span>{service.name}</span>
                      <ArrowRight className="size-3.5 text-brand-muted group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all" />
                    </h3>
                    <p className="text-xs text-brand-muted mt-1.5 line-clamp-2 leading-relaxed">
                      {service.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 3: Legal & Technical */}
          <section>
            <div className="flex items-center gap-2 mb-6 border-b border-brand-line pb-3">
              <Scale className="size-5 text-brand-primary" />
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark">
                Legal, Policies & Search Engine Files
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {legalPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group flex flex-col justify-between p-5 rounded-xl border border-brand-line bg-white hover:border-brand-primary/50 hover:shadow-soft transition-all duration-200"
                >
                  <div>
                    <h3 className="text-base font-bold text-brand-dark group-hover:text-brand-primary transition-colors flex items-center justify-between">
                      <span>{page.title}</span>
                      <ArrowRight className="size-4 text-brand-muted group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                      {page.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </article>
  );
}

