import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { contact } from "@/lib/brand";
import { mailtoHref, telHref } from "@/lib/links";

/**
 * Contact Information Column
 * Replicates the exact left column from the design layout:
 * - "GET IN TOUCH ──" gold eyebrow
 * - "Contact Information" prominent headline
 * - Subtitle description
 * - 3 dark green rounded-square icon list items (Phone, Email, Office Address)
 * - Faint architectural wireframe sketch watermark in the background
 */
export function ContactDetails() {
  return (
    <div className="relative flex flex-col justify-between h-full pt-2 overflow-hidden lg:overflow-visible">
      <div className="relative z-10">
        {/* Eyebrow with gold horizontal accent */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#9a6b1c]">
            Get In Touch
          </span>
          <span className="h-0.5 w-7 bg-[#d4972a] rounded-full inline-block" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-[2.1rem] font-extrabold tracking-tight text-[#11231a] mb-3">
          Contact Information
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-brand-muted leading-relaxed max-w-md mb-8">
          Reach out to us through phone, email or visit our office. Our team will be happy to assist you.
        </p>

        {/* 3 Contact Info Items */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {/* Phone Item */}
          <div className="flex items-start gap-4 group">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#143d2b] text-white shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#0c2e1f]">
              <Phone className="size-5" />
            </span>
            <div className="flex flex-col pt-0.5">
              <span className="text-xs font-semibold text-gray-500">Phone</span>
              <a
                href={telHref}
                className="text-base sm:text-lg font-bold text-[#11231a] hover:text-brand-primary transition-colors"
              >
                {contact.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Email Item */}
          <div className="flex items-start gap-4 group">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#143d2b] text-white shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#0c2e1f]">
              <Mail className="size-5" />
            </span>
            <div className="flex flex-col pt-0.5">
              <span className="text-xs font-semibold text-gray-500">Email</span>
              <a
                href={mailtoHref}
                className="text-sm sm:text-base font-bold text-[#11231a] hover:text-brand-primary transition-colors break-all"
              >
                {contact.email}
              </a>
            </div>
          </div>

          {/* Address Item */}
          <div className="flex items-start gap-4 group">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#143d2b] text-white shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#0c2e1f]">
              <MapPin className="size-5" />
            </span>
            <div className="flex flex-col pt-0.5 max-w-sm">
              <span className="text-xs font-semibold text-gray-500">Office Address</span>
              <address className="text-sm sm:text-base font-medium leading-snug text-[#11231a] not-italic mt-0.5">
                {contact.addressLine1},
                <br />
                {contact.addressLine2}
              </address>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Wireframe Sketch Watermark in the background (backside of text) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-20px] bottom-0 sm:right-[-32px] sm:bottom-0 lg:right-[-48px] lg:bottom-0 w-[260px] xs:w-[300px] sm:w-[380px] lg:w-[480px] xl:w-[520px] h-[280px] xs:h-[320px] sm:h-[400px] lg:h-[500px] xl:h-[540px] select-none z-0"
      >
        <div className="relative w-full h-full opacity-25 sm:opacity-40 lg:opacity-85">
          <Image
            src="/images/contact/sketch.png"
            alt="Architectural modern building sketch"
            fill
            sizes="(min-width: 1280px) 520px, (min-width: 1024px) 480px, 90vw"
            className="object-contain object-bottom-right"
            priority
          />
        </div>
      </div>
    </div>
  );
}
