"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { GreenCTAButton } from "@/components/ui/GreenCTAButton";
import { navigationItems } from "@/data/content";
import { services } from "@/data/services";
import { contact } from "@/lib/brand";
import { telHref } from "@/lib/links";

const PANEL_ID = "mobile-navigation";

/**
 * Mobile and tablet navigation (below the xl breakpoint). The panel closes on Escape,
 * on route change, and when a link is followed. Body scroll is locked while open.
 */
export function MobileNavigation() {
  const pathname = usePathname();
  // Storing the pathname the menu was opened on means navigating away closes it
  // without an effect that sets state.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const isOpen = openedOn === pathname;
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenedOn(null);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpenedOn(isOpen ? null : pathname)}
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        className="inline-flex size-11 items-center justify-center rounded-full border border-brand-line bg-white text-brand-dark shadow-soft lg:hidden"
      >
        <span className="sr-only">{isOpen ? "Close navigation menu" : "Open navigation menu"}</span>
        {isOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
      </button>

      {isOpen ? (
        <div
          id={PANEL_ID}
          className="absolute inset-x-0 top-full z-50 h-[calc(100dvh-var(--header-height))] overflow-y-auto border-t border-brand-line bg-white shadow-card lg:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto flex max-w-[640px] flex-col gap-1 px-5 py-6">
            {navigationItems.map((item, index) => {
              const isActive = item.href === pathname;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-xl px-4 py-3.5 text-lg font-semibold ${
                    isActive ? "bg-brand-primary text-white" : "text-brand-ink hover:bg-brand-soft"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <p className="mt-4 px-4 text-xs font-bold tracking-[0.2em] text-brand-accent uppercase">Our services</p>
            <ul className="grid gap-1 sm:grid-cols-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="block rounded-lg px-4 py-2.5 text-[0.95rem] text-brand-ink hover:bg-brand-soft">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={telHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-brand-primary font-semibold text-brand-primary"
              >
                Call {contact.phoneDisplay}
              </a>
              <GreenCTAButton href="/contact" className="w-full" size="lg">
                Get a Quote
              </GreenCTAButton>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
