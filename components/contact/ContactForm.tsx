"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MessageSquare,
  User,
  Phone,
  Mail,
  Layers,
  Pencil,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import {
  buildEnquiryText,
  contactFormDefaults,
  contactSchema,
  enquiryTopics,
  type ContactFormValues,
  type EnquiryTopic,
} from "@/lib/validation/contact-schema";
import { buildMailtoUrl, buildWhatsAppUrl } from "@/lib/links";
import { contact } from "@/lib/brand";

interface ContactFormProps {
  /** Pre-selects the service when visitor arrives from a service card */
  defaultTopic?: EnquiryTopic;
}

type Status = { tone: "success" | "info"; message: string; actionUrl?: string } | null;

/**
 * "Send Us a Message" Form Card
 * Matches the design layout:
 * - Amber rounded square chat icon header
 * - 2-column grid with inline icons
 * - Dark forest green "Send Message →" submit button
 * - "Your information is safe with us." shield badge
 * - Synchronously opens WhatsApp or Email with pre-filled enquiry
 */
export function ContactForm({ defaultTopic }: ContactFormProps) {
  const [status, setStatus] = useState<Status>(null);
  const [channel, setChannel] = useState<"whatsapp" | "email">("whatsapp");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      ...contactFormDefaults,
      topic: defaultTopic ?? contactFormDefaults.topic,
    },
    mode: "onTouched",
  });

  const onSubmit = (values: ContactFormValues) => {
    if (channel === "whatsapp") {
      const url = buildWhatsAppUrl(buildEnquiryText(values));
      window.open(url, "_blank", "noopener,noreferrer");
      setStatus({
        tone: "success",
        message:
          "WhatsApp has opened with your enquiry details pre-filled. Tap send in WhatsApp to deliver it directly to our team.",
        actionUrl: url,
      });
    } else {
      const mailUrl = buildMailtoUrl(`Enquiry: ${values.topic}`, buildEnquiryText(values));
      window.location.assign(mailUrl);
      setStatus({
        tone: "info",
        message: `Your email app is opening addressed to ${contact.email}.`,
      });
    }
  };

  return (
    <div className="relative rounded-3xl bg-white p-6 sm:p-8 lg:p-9 shadow-xl border border-gray-100 flex flex-col justify-between">
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Header with Amber Chat Icon */}
        <div className="flex items-center gap-3.5 pb-2 border-b border-gray-100">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#f5b838] text-white shadow-sm">
            <MessageSquare className="size-6 fill-white" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#11231a] tracking-tight">
              Send Us a Message
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Fill in the details and we&apos;ll get back to you shortly.
            </p>
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1">
          {/* 1. Your Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="form-name" className="text-xs font-bold text-gray-700">
              Your Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <User className="size-4" />
              </span>
              <input
                id="form-name"
                type="text"
                placeholder="Enter your name"
                pattern="[A-Za-z\s]+"
                title="Only alphabetic characters and spaces are allowed"
                onKeyDown={(e) => {
                  // Prevent typing numbers and symbols directly into the name field
                  if (
                    e.key.length === 1 &&
                    !/[A-Za-z\s]/.test(e.key) &&
                    !e.ctrlKey &&
                    !e.metaKey &&
                    !e.altKey
                  ) {
                    e.preventDefault();
                  }
                }}
                className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm text-[#11231a] placeholder:text-gray-400 focus:border-[#143d2b] focus:outline-none focus:ring-2 focus:ring-[#143d2b]/15 transition-all"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <span className="text-[0.72rem] text-red-600 font-medium">{errors.name.message}</span>
            )}
          </div>

          {/* 2. Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="form-phone" className="text-xs font-bold text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Phone className="size-4" />
              </span>
              <input
                id="form-phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm text-[#11231a] placeholder:text-gray-400 focus:border-[#143d2b] focus:outline-none focus:ring-2 focus:ring-[#143d2b]/15 transition-all"
                {...register("phone")}
              />
            </div>
            {errors.phone && (
              <span className="text-[0.72rem] text-red-600 font-medium">{errors.phone.message}</span>
            )}
          </div>

          {/* 3. Email Address */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="form-email" className="text-xs font-bold text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Mail className="size-4" />
              </span>
              <input
                id="form-email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm text-[#11231a] placeholder:text-gray-400 focus:border-[#143d2b] focus:outline-none focus:ring-2 focus:ring-[#143d2b]/15 transition-all"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <span className="text-[0.72rem] text-red-600 font-medium">{errors.email.message}</span>
            )}
          </div>

          {/* 4. Service Interested In */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="form-service" className="text-xs font-bold text-gray-700">
              Service Interested In <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <Layers className="size-4" />
              </span>
              <select
                id="form-service"
                className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-8 py-2.5 text-sm text-[#11231a] focus:border-[#143d2b] focus:outline-none focus:ring-2 focus:ring-[#143d2b]/15 transition-all appearance-none cursor-pointer"
                {...register("topic")}
              >
                {enquiryTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400">
                <svg className="size-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            {errors.topic && (
              <span className="text-[0.72rem] text-red-600 font-medium">{errors.topic.message}</span>
            )}
          </div>

          {/* 5. Message / Project Details (Full width) */}
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label htmlFor="form-message" className="text-xs font-bold text-gray-700">
              Your Message / Project Details <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute top-3 left-3.5 text-gray-400">
                <Pencil className="size-4" />
              </span>
              <textarea
                id="form-message"
                rows={4}
                placeholder="Tell us about your plot location, size, or building requirement..."
                className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm text-[#11231a] placeholder:text-gray-400 focus:border-[#143d2b] focus:outline-none focus:ring-2 focus:ring-[#143d2b]/15 transition-all resize-none"
                {...register("message")}
              />
            </div>
            {errors.message && (
              <span className="text-[0.72rem] text-red-600 font-medium">{errors.message.message}</span>
            )}
          </div>
        </div>

        {/* Quick Send via Choice (WhatsApp or Email toggle) */}
        <div className="flex items-center gap-4 text-xs font-medium text-gray-600 pt-1">
          <span className="font-semibold text-gray-700">Deliver via:</span>
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="channel"
              value="whatsapp"
              checked={channel === "whatsapp"}
              onChange={() => setChannel("whatsapp")}
              className="text-[#143d2b] focus:ring-[#143d2b]"
            />
            <span>WhatsApp (Fastest)</span>
          </label>
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="channel"
              value="email"
              checked={channel === "email"}
              onChange={() => setChannel("email")}
              className="text-[#143d2b] focus:ring-[#143d2b]"
            />
            <span>Email</span>
          </label>
        </div>

        {/* Form Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-gray-100 mt-1">
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#143d2b] hover:bg-[#0c2e1f] text-white px-7 py-3 text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer disabled:opacity-70"
          >
            <span>Send Message</span>
            <ArrowRight className="size-4" />
          </button>

          {/* Trust Badge */}
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <ShieldCheck className="size-4 text-brand-primary shrink-0" />
            <span>Your information is safe with us.</span>
          </div>
        </div>
      </form>

      {/* Status Feedback Alert */}
      {status && (
        <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-3.5 flex items-start gap-2.5 text-xs text-green-900 animate-fadeIn">
          <CheckCircle2 className="size-4 text-green-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium">{status.message}</p>
            {status.actionUrl && (
              <a
                href={status.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-1 font-bold text-green-700 underline"
              >
                <span>Re-open WhatsApp</span>
                <ExternalLink className="size-3" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
