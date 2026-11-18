import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageSquareQuote, Star } from "lucide-react";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/data/content";

/**
 * Premium Client Testimonials Section
 * Balanced 2-column layout:
 * Left: Trust badges, Google rating badge, headline and direct consultation CTA
 * Right: Interactive multi-card review carousel
 */
export function TestimonialsSection() {
  return (
    <section id="testimonials" aria-label="Client testimonials" className="scroll-mt-24 bg-[#f8faf5] py-16 sm:py-24 border-t border-brand-line/60">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          {/* Left Column: Social Proof & Trust Badges */}
          <div className="flex flex-col items-start gap-6">
            {/* 5-Star Trust Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/40 bg-[#fef3c7]/60 px-4 py-1.5 text-xs font-bold text-[#b45309] shadow-xs">
              <div className="flex items-center gap-0.5 text-[#f59e0b]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-[#f59e0b]" />
                ))}
              </div>
              <span>5.0 Rating from Coimbatore Homeowners</span>
            </div>

            {/* Section Heading */}
            <div className="flex flex-col gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-primary">
                <MessageSquareQuote className="size-4" />
                Client Testimonials
              </span>
              <h2 className="text-3xl xs:text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-dark leading-[1.15]">
                Real Stories from <br />
                <span className="text-brand-gradient">Happy Homeowners</span>
              </h2>
            </div>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base leading-relaxed text-brand-muted max-w-lg">
              Hear what clients in Kinathukadavu, Coimbatore and Pollachi say about our architectural planning,
              DTCP / LPA approvals, and turnkey building construction.
            </p>

            {/* Key Trust Highlights */}
            <ul className="flex flex-col gap-3 pt-2">
              <li className="flex items-center gap-3 text-sm font-semibold text-brand-ink">
                <CheckCircle2 className="size-5 text-brand-primary shrink-0" />
                <span>100% On-Time Handover with Quality Checklist</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold text-brand-ink">
                <CheckCircle2 className="size-5 text-brand-primary shrink-0" />
                <span>Direct Site Supervision by Registered LBS Engineer</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold text-brand-ink">
                <CheckCircle2 className="size-5 text-brand-primary shrink-0" />
                <span>Zero Hidden Costs — Stage-wise Payment Schedule</span>
              </li>
            </ul>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-bold text-white shadow-button transition-all duration-300 hover:bg-brand-dark hover:shadow-card hover:-translate-y-0.5"
              >
                <span>Start Your Construction Plan</span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Carousel Component */}
          <div className="w-full">
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </div>
      </Container>
    </section>
  );
}
