import { z } from "zod";
import { services } from "@/data/services";

export const enquiryTopics = [...services.map((service) => service.name), "General enquiry"] as const;

export type EnquiryTopic = (typeof enquiryTopics)[number];

const indianMobilePattern = /^(\+?91)?[6-9]\d{9}$/;
const alphabeticNamePattern = /^[A-Za-z\s]+$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(80, "Please keep your name under 80 characters.")
    .regex(
      alphabeticNamePattern,
      "Name must contain only alphabetic characters and spaces. Numbers and special characters are not allowed."
    ),
  phone: z
    .string()
    .trim()
    .refine((value) => indianMobilePattern.test(value.replace(/[\s-]/g, "")), {
      message: "Enter a valid 10-digit mobile number, for example +91 98765 43210.",
    }),
  email: z
    .string()
    .trim()
    .max(120, "Please keep your email under 120 characters.")
    .refine((value) => value === "" || z.email().safeParse(value).success, {
      message: "Enter a valid email address, or leave this blank.",
    }),
  topic: z.enum(enquiryTopics, { message: "Choose the service you are interested in." }),
  location: z.string().trim().max(120, "Please keep the location under 120 characters."),
  message: z
    .string()
    .trim()
    .min(10, "Please describe your requirement in at least 10 characters.")
    .max(1000, "Please keep your message under 1000 characters."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const contactFormDefaults: ContactFormValues = {
  name: "",
  phone: "",
  email: "",
  topic: "General enquiry",
  location: "",
  message: "",
};

/** Human-readable enquiry text used by both the WhatsApp and email handoffs. */
export function buildEnquiryText(values: ContactFormValues): string {
  const lines = [
    "New enquiry from the SKI Construction website",
    "",
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email || "not provided"}`,
    `Service: ${values.topic}`,
    `Location: ${values.location || "not provided"}`,
    "",
    "Requirement:",
    values.message,
  ];
  return lines.join("\n");
}
