import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { LocationMap } from "@/components/contact/LocationMap";
import { Container } from "@/components/ui/Container";
import { enquiryTopics, type EnquiryTopic } from "@/lib/validation/contact-schema";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact SKI Construction at Kinathukadavu, Coimbatore. Call +91 8526 224354, WhatsApp, email or send an enquiry form for building construction, 3D elevation design and property services.",
  alternates: { canonical: "/contact" },
};

interface ContactPageProps {
  searchParams: Promise<{ service?: string | string[] }>;
}

/** Accepts only known service names, so arbitrary query text never reaches the form. */
function topicFromQuery(value: string | string[] | undefined): EnquiryTopic | undefined {
  const candidate = Array.isArray(value) ? value[0] : value;
  return enquiryTopics.find((topic) => topic === candidate);
}

/**
 * Contact Page
 * Completely matches the approved design layout:
 * 1. Curved Emerald & Gold Hero ("Let's Build Your Dream Together" + Luxury Villa)
 * 2. Contact Information & "Send Us a Message" 2-Column Section
 * 3. 3-Part "Our Location" Section (Map + Address & Directions + Office Facade)
 * 4. 4 Horizontal Value Pillar Cards
 * 5. "Ready to Start Your Project?" Bottom Call-to-Action Banner
 */
export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const defaultTopic = topicFromQuery(params.service);

  return (
    <article className="bg-[#fcfdfa] min-h-screen">
      {/* 1. Consistent Breadcrumb PageHero matching all pages */}
      <PageHero
        eyebrow="Contact us"
        title="Let's Build Your Dream Together"
        description="Have a project in mind? Get in touch with us for expert consultation, planning and construction support."
        breadcrumb="Contact"
        backgroundImage="/images/background/contact-breadcrums.png"
        imagePosition="object-right md:object-center"
      />

      {/* 2. Contact Information & Send Us a Message Card */}
      <section aria-label="Contact options and enquiry form" className="py-6 sm:py-10">
        <Container className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr] gap-8 lg:gap-12 items-stretch">
          <ContactDetails />
          <ContactForm defaultTopic={defaultTopic} />
        </Container>
      </section>

      {/* 3. 3-Part Location Section */}
      <section aria-label="Our office location" className="py-4 sm:py-6 pb-12 sm:pb-16">
        <Container>
          <LocationMap />
        </Container>
      </section>
    </article>
  );
}
