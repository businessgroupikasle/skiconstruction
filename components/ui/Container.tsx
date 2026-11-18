import type { ReactNode } from "react";

/** Standard page width and gutters. Keeps content aligned at every breakpoint. */
export function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer";
}) {
  return (
    <Tag className={`mx-auto w-full max-w-[1360px] 2xl:max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10 ${className}`}>
      {children}
    </Tag>
  );
}
