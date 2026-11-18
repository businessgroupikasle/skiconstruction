import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";

interface SkiLogoProps {
  /** "light" for use on dark surfaces, "default" for white and ivory surfaces */
  tone?: "default" | "light";
  /** Hides the tagline in tight spaces such as the mobile header */
  compact?: boolean;
  className?: string;
  imageClassName?: string;
  /** Wrap the logo in a link to the home page */
  asLink?: boolean;
}

/**
 * Official SKI Construction Brand Logo
 * Displays the authentic brand logo from /images/logo.png
 * Optimised by next/image; priority keeps it in the first paint.
 */
export function SkiLogo({ className, imageClassName, asLink = true }: SkiLogoProps) {
  const content = (
    <span className={`inline-flex items-center select-none ${className ?? ""}`}>
      <Image
        src="/images/logo.png"
        alt="SKI Construction - Build With Quality"
        width={240}
        height={210}
        priority
        className={
          imageClassName ??
          "h-12 sm:h-14 lg:h-16 w-auto object-contain transition-transform duration-200 hover:scale-[1.02]"
        }
      />
    </span>
  );

  if (!asLink) return content;

  return (
    <Link
      href="/"
      aria-label={`${brand.name}, go to home page`}
      className="inline-flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
    >
      {content}
    </Link>
  );
}

export function SkiMark({ className }: { className?: string }) {
  return (
    <span className={`relative inline-block overflow-hidden ${className ?? "size-10"}`}>
      <Image
        src="/images/logo.png"
        alt="SKI Construction Mark"
        width={80}
        height={80}
        className="size-full object-contain"
      />
    </span>
  );
}
