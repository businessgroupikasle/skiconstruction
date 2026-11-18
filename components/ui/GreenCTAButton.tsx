import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

export type CTAVariant = "solid" | "outline" | "white" | "ghost-light";
export type CTASize = "sm" | "md" | "lg";
export type CTAIcon = "arrow" | "phone" | "chat" | "none";

interface GreenCTAButtonProps {
  href: string;
  children: ReactNode;
  variant?: CTAVariant;
  size?: CTASize;
  icon?: CTAIcon;
  /** Opens in a new tab with safe rel attributes (WhatsApp, Google Maps) */
  newTab?: boolean;
  className?: string;
  ariaLabel?: string;
}

const variantClasses: Record<CTAVariant, string> = {
  solid:
    "bg-brand-primary text-white shadow-button hover:bg-brand-dark focus-visible:outline-brand-accent",
  outline:
    "border-2 border-brand-primary bg-white/60 text-brand-primary hover:bg-brand-primary hover:text-white",
  white: "bg-white text-brand-primary shadow-soft hover:bg-brand-soft",
  "ghost-light": "border-2 border-white/80 text-white hover:bg-white hover:text-brand-primary",
};

const sizeClasses: Record<CTASize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

const iconFor = (icon: CTAIcon) => {
  switch (icon) {
    case "arrow":
      return <ArrowRight aria-hidden="true" className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />;
    case "phone":
      return <Phone aria-hidden="true" className="size-4 shrink-0" />;
    case "chat":
      return <MessageCircle aria-hidden="true" className="size-4 shrink-0" />;
    default:
      return null;
  }
};

/**
 * The single button primitive for brand CTAs. Internal paths use next/link;
 * tel:, mailto:, WhatsApp and external URLs render as plain anchors.
 */
export function GreenCTAButton({
  href,
  children,
  variant = "solid",
  size = "md",
  icon = "arrow",
  newTab = false,
  className = "",
  ariaLabel,
}: GreenCTAButtonProps) {
  const classes = [
    "group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap",
    "transition-[background-color,color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5",
    "focus-visible:outline-offset-4",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(" ");

  const isInternal = href.startsWith("/") && !href.startsWith("//");
  const content = (
    <>
      {children}
      {iconFor(icon)}
    </>
  );

  if (isInternal) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
