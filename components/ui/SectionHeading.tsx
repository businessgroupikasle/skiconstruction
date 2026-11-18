import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Use h1 only for the page's main heading */
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  /** compact: for narrow columns, keeps the heading to fewer lines */
  size?: "default" | "compact";
}

/** Eyebrow, title and description block used by every section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  id,
  className = "",
  size = "default",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
  const titleSize =
    size === "compact"
      ? "text-xl sm:text-2xl lg:text-[1.85rem]"
      : "text-2xl xs:text-3xl sm:text-4xl lg:text-[2.6rem]";
  return (
    <div className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow ? (
        <p className="text-xs font-bold tracking-[0.22em] text-brand-primary uppercase">{eyebrow}</p>
      ) : null}
      <Heading id={id} className={`text-balance font-extrabold leading-[1.1] text-brand-dark ${titleSize}`}>
        {title}
      </Heading>
      {description ? <div className="max-w-2xl text-pretty text-[0.97rem] leading-relaxed text-brand-muted">{description}</div> : null}
    </div>
  );
}
