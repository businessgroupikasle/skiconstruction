import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home, Building2, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "404 - Page Not Found | SKI Construction",
  description:
    "The requested page could not be found. Explore our residential construction, 3D elevation design, and plan approval services in Coimbatore.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="relative flex min-h-[75dvh] items-center justify-center bg-brand-soft/40 py-20 overflow-hidden"
    >
      {/* Background Architectural Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[radial-gradient(#153d16_1px,transparent_1px)] [background-size:20px_20px]"
      />

      <Container className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto px-4">
        {/* Error Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 px-4 py-1.5 text-xs font-mono font-bold text-brand-primary uppercase tracking-widest">
          <span>Error Code 404</span>
        </div>

        {/* Big Stylized Number */}
        <h1
          id="not-found-title"
          className="mt-6 text-7xl sm:text-8xl font-black tracking-tighter text-brand-dark"
        >
          4<span className="text-brand-primary">0</span>4
        </h1>

        <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-brand-dark">
          Page Not Found
        </h2>

        <p className="mt-4 max-w-md text-sm sm:text-base text-brand-muted leading-relaxed">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let us get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-bold text-white shadow-button hover:bg-brand-dark transition-all duration-200"
          >
            <Home className="size-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-brand-line bg-white px-5 py-3 text-sm font-bold text-brand-dark shadow-xs hover:border-brand-primary/50 hover:bg-brand-soft transition-all duration-200"
          >
            <Building2 className="size-4 text-brand-primary" />
            <span>Our Services</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-brand-line bg-white px-5 py-3 text-sm font-bold text-brand-dark shadow-xs hover:border-brand-primary/50 hover:bg-brand-soft transition-all duration-200"
          >
            <Phone className="size-4 text-brand-primary" />
            <span>Contact Us</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
