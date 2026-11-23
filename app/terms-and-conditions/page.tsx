import type { Metadata } from "next";
import Link from "next/link";
import { Scale, CheckCircle2, AlertCircle, FileCheck, Phone, Mail, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { brand, contact, founder } from "@/lib/brand";
import { siteUrl } from "@/lib/site";
import { telHref, mailtoHref } from "@/lib/links";

export const metadata: Metadata = {
  title: "Terms and Conditions | SKI Construction Coimbatore",
  description:
    "Terms and Conditions governing civil engineering, turnkey construction, 3D elevation design, and statutory plan approval services by SKI Construction.",
  alternates: { canonical: `${siteUrl}/terms-and-conditions` },
  robots: { index: true, follow: true },
};

export default function TermsAndConditionsPage() {
  const lastUpdated = "November 23, 2026";

  return (
    <article className="bg-[#fcfdfa] min-h-screen">
      <PageHero
        eyebrow="Legal & Contracts"
        title="Terms & Conditions"
        description="General terms of service governing architectural design, civil contracting, and statutory approvals with SKI Construction."
        breadcrumb="Terms & Conditions"
        backgroundImage="/images/background/breadcrumb-banner.jpg"
      />

      <Container className="py-12 sm:py-16 lg:py-20 max-w-4xl">
        <div className="rounded-2xl border border-brand-line/70 bg-white p-6 sm:p-10 shadow-sm">
          {/* Header metadata pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-brand-line/60">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                <Scale className="size-4" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary">
                Service Agreement & Terms
              </span>
            </div>
            <span className="text-xs text-brand-muted">
              Last Updated: {lastUpdated}
            </span>
          </div>

          <div className="prose prose-slate max-w-none pt-6 text-brand-body text-sm sm:text-base leading-relaxed space-y-8">
            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By commissioning SKI Construction (&quot;the Contractor&quot;), led by Er. D. Satheeshkumar (Registered LBS Engineer), or by accessing our digital estimates and consultation channels, you (&quot;the Client&quot;) agree to be bound by these Terms and Conditions along with any formal Bill of Quantities (BOQ) or construction agreement signed between both parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark mb-3">
                2. Scope of Services
              </h2>
              <p>SKI Construction provides professional civil engineering services including but not limited to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Turnkey residential and commercial building construction.</li>
                <li>Architectural 2D floor plans, Vastu compliance planning, and realistic 3D elevation renderings.</li>
                <li>Preparation and submission of building permits for Local Body / Corporation (LBS) and DTCP/LPA approvals.</li>
                <li>Detailed structural drawings, structural stability certificates, and bank loan valuation estimates.</li>
                <li>Real estate and site consultation across Coimbatore and Kinathukadavu.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark mb-3">
                3. Estimates, BOQ & Quotations
              </h2>
              <p>
                All preliminary website quote calculations and initial verbal estimates are indicative. Binding prices are established only via a formally signed Construction Agreement or Bill of Quantities (BOQ) detailing material grades (cement, steel, sand, plumbing, electrical fixtures) and specific stage schedules.
              </p>
              <p>
                Quotations remain valid for 30 calendar days from the date of issuance due to regional raw material price dynamics (e.g., TMT steel and cement market rates).
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark mb-3">
                4. Payment Milestones
              </h2>
              <p>
                Turnkey construction contracts operate on milestone-based disbursements (e.g., Foundation, Plinth Beam, Column Erection, Roof Slab, Brickwork, Plastering, Flooring & Finishing, Handover).
              </p>
              <p>
                The Client agrees to release stage payments promptly upon engineer inspection and verification of completed milestones to prevent site delays.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark mb-3">
                5. Statutory Approvals & Client Responsibilities
              </h2>
              <p>
                While SKI Construction handles drafting, liaison, and technical submission of building plan permits (LBS/DTCP), final statutory approval depends on government departmental review and property title validity.
              </p>
              <p>
                The Client is responsible for furnishing clear, undisputed title documents, revenue records (Patta, Chitta, FMB sketch, Encumbrance Certificate), and providing uninterrupted site access, water, and initial temporary electricity connection for construction.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark mb-3">
                6. Intellectual Property
              </h2>
              <p>
                All architectural concept sketches, custom 3D elevation models, structural calculations, and CAD drawings created by SKI Construction remain our intellectual property until the full design fee is settled. Clients receive a license to construct the building solely on the specified plot.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark mb-3">
                7. Force Majeure & Delays
              </h2>
              <p>
                Neither party shall be held liable for construction schedule delays caused by events beyond reasonable control, including extreme weather events, unseasonal monsoon flooding, government-mandated quarry closures, regional sand transport strikes, or municipal permit processing delays.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-brand-dark mb-3">
                8. Governing Law & Jurisdiction
              </h2>
              <p>
                These Terms and any project contracts entered into shall be governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the competent courts in Coimbatore, Tamil Nadu.
              </p>
            </section>

            <section className="rounded-xl bg-brand-soft/80 border border-brand-line p-5 sm:p-6 mt-8">
              <h3 className="text-lg font-bold text-brand-dark mb-2">
                Need Clarification on Contracts?
              </h3>
              <p className="text-sm text-brand-muted mb-4">
                Reach out to our engineering office in Kinathukadavu for contract inquiries or project agreements:
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
                  <span>{contact.addressLine1}, {contact.addressLine2}</span>
                </span>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </article>
  );
}

