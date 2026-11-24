"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
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
  const [servicesOpen, setServicesOpen] = useState(true);
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
              const isServicesItem = item.label === "Services";
              const isServicesSection = pathname === "/services" || pathname.startsWith("/services/");
              const isActive = isServicesItem ? isServicesSection : item.href === pathname;

              if (isServicesItem) {
                return (
                  <div key={item.href} className="flex flex-col">
                    <div className="flex items-center justify-between rounded-xl">
                      <Link
                        href={item.href}
                        scroll={true}
                        onClick={() => setOpenedOn(null)}
                        aria-current={pathname === "/services" ? "page" : undefined}
                        className={`flex-1 rounded-xl px-4 py-3.5 text-lg font-semibold transition-colors ${
                          pathname === "/services"
                            ? "bg-brand-primary text-white"
                            : isServicesSection
                              ? "bg-brand-soft text-brand-primary font-bold"
                              : "text-brand-ink hover:bg-brand-soft"
                        }`}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setServicesOpen((prev) => !prev)}
                        aria-expanded={servicesOpen}
                        aria-label={servicesOpen ? "Collapse services menu" : "Expand services menu"}
                        className="flex size-12 items-center justify-center rounded-xl text-brand-dark/70 hover:bg-brand-soft hover:text-brand-primary transition-colors"
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={`size-5 transition-transform duration-200 ${
                            servicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {servicesOpen ? (
                      <ul className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-brand-line/70 pl-3 py-1">
                        {services.map((service) => {
                          const serviceHref = `/services/${service.slug}`;
                          const isServiceActive =
                            pathname === serviceHref || pathname.startsWith(`${serviceHref}/`);
                          return (
                            <li key={service.slug}>
                              <Link
                                href={serviceHref}
                                onClick={() => setOpenedOn(null)}
                                aria-current={isServiceActive ? "page" : undefined}
                                className={`block rounded-lg px-3.5 py-2 text-[0.95rem] transition-colors ${
                                  isServiceActive
                                    ? "bg-brand-primary text-white font-semibold shadow-xs"
                                    : "text-brand-ink hover:bg-brand-soft hover:text-brand-primary font-medium"
                                }`}
                              >
                                {service.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  scroll={true}
                  onClick={() => {
                    setOpenedOn(null);
                    if (item.href === "/" && typeof window !== "undefined") {
                      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                    }
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-xl px-4 py-3.5 text-lg font-semibold transition-colors ${
                    isActive ? "bg-brand-primary text-white" : "text-brand-ink hover:bg-brand-soft"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

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
