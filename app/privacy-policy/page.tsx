import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, Phone, Mail, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { brand, contact, founder } from "@/lib/brand";
import { siteUrl } from "@/lib/site";
import { telHref, mailtoHref } from "@/lib/links";

export const metadata: Metadata = {
  title: "Privacy Policy | SKI Construction Coimbatore",
  description:
    "Privacy Policy for SKI Construction. Understand how we collect, handle, and safeguard your personal data, architectural blueprints, and project information.",
  alternates: { canonical: `${siteUrl}/privacy-policy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "November 23, 2026";

  return (
    <article className="bg-[#fcfdfa] min-h-screen">
      <PageHero
        eyebrow="Legal & Compliance"
        title="Privacy Policy"
        description="How SKI Construction protects your personal details, building site information, and architectural drawings."
        breadcrumb="Privacy Policy"
        backgroundImage="/images/background/breadcrumb-banner.jpg"
      />

      <Container className="py-12 sm:py-16 lg:py-20 max-w-4xl">
        <div className="rounded-2xl border border-brand-line/70 bg-white p-6 sm:p-10 shadow-sm">
          {/* Header metadata pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-brand-line/60">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                <ShieldCheck className="size-4" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary">
                SKI Construction Data Protection
              </span>
            </div>
            <span className="text-xs text-brand-muted">
              Effective Date: {lastUpdated}
            </span>
          </div>

          <div className="prose prose-slate max-w-none pt-6 text-brand-body text-sm sm:text-base leading-relaxed space-y-8">
            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark mb-3">
                1. Introduction
              </h2>
              <p>
                SKI Construction (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), founded by Er. D. Satheeshkumar (Registered LBS Engineer), is committed to safeguarding the privacy and confidentiality of our clients, website visitors, and construction partners across Coimbatore, Kinathukadavu, and surrounding regions.
              </p>
              <p>
                This Privacy Policy explains what personal data and project records we collect, how they are utilized in delivering our civil engineering, 3D elevation, statutory approval, and turnkey construction services, and the security measures we maintain.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark mb-3">
                2. Information We Collect
              </h2>
              <p>We may collect information through our website consultation forms, WhatsApp chats, direct phone calls, and in-person site visits:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Contact Information:</strong> Full name, telephone number, email address, and residential/business address.
                </li>
                <li>
                  <strong>Property & Site Details:</strong> Site location coordinates, plot dimensions, survey numbers, Patta/Chitta documentation, and municipal/panchayat jurisdiction for approval filings.
                </li>
                <li>
                  <strong>Architectural Requirements:</strong> Desired square footage, room configurations, Vastu preferences, material specifications, and budget ranges.
                </li>
                <li>
                  <strong>Technical Browsing Data:</strong> Anonymized analytical data including IP address, browser type, device information, and pages visited to ensure site performance and responsiveness.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark mb-3">
                3. How We Use Your Information
              </h2>
              <p>Your details are strictly used for legitimate construction and engineering purposes:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Preparing accurate Bill of Quantities (BOQ), cost estimates, and structural engineering proposals.</li>
                <li>Filing building plan approval applications with Local Body / Corporation (LBS) and DTCP/LPA authorities on your behalf.</li>
                <li>Communicating daily/weekly construction milestones, site inspection reports, and material delivery updates.</li>
                <li>Providing customer support and after-handover structural maintenance assistance.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark mb-3">
                4. Data Confidentiality & Non-Disclosure
              </h2>
              <p>
                We do not sell, rent, or trade your personal information or site blueprints to any third-party marketing agencies. Project documentation is disclosed only to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Licensed structural engineers, soil testing laboratories, and vetted subcontractors directly working on your project.</li>
                <li>Government planning authorities (Coimbatore Corporation, DTCP, Local Panchayat) strictly for statutory plan approvals.</li>
                <li>Financial institutions or banks when you authorize us to provide construction estimates for bank loan sanctioning.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark mb-3">
                5. Data Security
              </h2>
              <p>
                We employ physical, technical, and administrative safeguards to protect your records against unauthorized access, loss, or misuse. Digital project communications, CAD drawings, and contracts are securely backed up.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark mb-3">
                6. Your Rights
              </h2>
              <p>
                You have the right to request access to the personal data we hold about you, request corrections to inaccurate details, or request deletion of preliminary consultation inquiries that did not proceed to contract, subject to statutory record-keeping requirements under applicable Indian laws.
              </p>
            </section>

            <section className="rounded-xl bg-brand-soft/80 border border-brand-line p-5 sm:p-6 mt-8">
              <h3 className="text-lg font-bold text-brand-dark mb-2">
                Questions or Data Requests?
              </h3>
              <p className="text-sm text-brand-muted mb-4">
                If you have questions about this Privacy Policy or wish to review your records, please contact Er. D. Satheeshkumar:
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 text-xs sm:text-sm">
                <a href={telHref} className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:underline">
                  <Phone className="size-4" />
                  <span>{contact.phoneDisplay}</span>
                </a>
                <a href={mailtoHref} className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:underline">
                  <Mail className="size-4" />
                  <span>{contact.email}</span>
                </a>
                <span className="inline-flex items-center gap-2 text-brand-muted">
                  <MapPin className="size-4" />
                  <span>Kinathukadavu & Coimbatore, Tamil Nadu</span>
                </span>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </article>
  );
}

