"use client";

import { useState } from "react";
import { MessageSquare, Phone, Send, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { buildWhatsAppUrl, telHref } from "@/lib/links";
import { contact, founder } from "@/lib/brand";

interface BrickQuoteFormProps {
  serviceName: string;
}

/**
 * Section 8: "Request a Quote" Section matching brickbybrickworks.com
 * Form with Name, Mobile, Email, and Message that submits directly to WhatsApp.
 */
export function BrickQuoteForm({ serviceName }: BrickQuoteFormProps) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello SKI Construction, I would like a quote for ${serviceName}.\n\nName: ${name || "Client"}\nPhone: ${mobile || "Not specified"}\nEmail: ${email || "Not specified"}\nDetails: ${notes || "Looking forward to your guidance."}`;
    window.open(buildWhatsAppUrl(msg), "_blank");
  };

  return (
    <section aria-labelledby="quote-heading" className="bg-[#fcfdfa] py-14 sm:py-20">
      <Container>
        <div className="rounded-3xl bg-white border border-brand-line p-8 sm:p-12 lg:p-14 shadow-card max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Heading & Intro (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-widest bg-brand-soft px-3 py-1 rounded-md border border-brand-line w-fit mb-3 block">
                  GET IN TOUCH
                </span>

                <h2
                  id="quote-heading"
                  className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight mb-3"
                >
                  Request a Quote
                </h2>

                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-6">
                  Share your project details with Coimbatore&apos;s trusted civil engineering firm and get started today with a transparent stage-wise estimate.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-brand-line/60 text-xs text-brand-dark">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-brand-accent shrink-0" />
                  <span>Free Initial Plan & Soil Assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-brand-accent shrink-0" />
                  <span>Direct Supervision by {founder.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-brand-accent shrink-0" />
                  <span>Fixed Stage-Wise BOQ Estimation</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Form (7 cols) */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col gap-4">
              <div>
                <label htmlFor="quote-name" className="block text-xs font-bold text-brand-dark mb-1">
                  Name *
                </label>
                <input
                  id="quote-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Full Name"
                  className="w-full rounded-xl border border-brand-line bg-[#fcfdfa] px-4 py-3 text-xs sm:text-sm text-brand-dark placeholder:text-brand-muted/50 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-mobile" className="block text-xs font-bold text-brand-dark mb-1">
                    Mobile Number *
                  </label>
                  <input
                    id="quote-mobile"
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-brand-line bg-[#fcfdfa] px-4 py-3 text-xs sm:text-sm text-brand-dark placeholder:text-brand-muted/50 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label htmlFor="quote-email" className="block text-xs font-bold text-brand-dark mb-1">
                    Email ID
                  </label>
                  <input
                    id="quote-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-brand-line bg-[#fcfdfa] px-4 py-3 text-xs sm:text-sm text-brand-dark placeholder:text-brand-muted/50 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quote-msg" className="block text-xs font-bold text-brand-dark mb-1">
                  Project Notes / Location
                </label>
                <textarea
                  id="quote-msg"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={`Tell us about your ${serviceName.toLowerCase()} requirements in Coimbatore...`}
                  className="w-full rounded-xl border border-brand-line bg-[#fcfdfa] px-4 py-3 text-xs sm:text-sm text-brand-dark placeholder:text-brand-muted/50 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-button hover:bg-brand-accent transition-all duration-200 cursor-pointer mt-1"
              >
                <Send className="size-4" />
                <span>Submit & Chat on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

