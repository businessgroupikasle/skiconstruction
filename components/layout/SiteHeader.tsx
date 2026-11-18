"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { SkiLogo } from "@/components/brand/SkiLogo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Container } from "@/components/ui/Container";
import { GreenCTAButton } from "@/components/ui/GreenCTAButton";
import { navigationItems } from "@/data/content";
import { contact } from "@/lib/brand";
import { telHref } from "@/lib/links";
import type { NavItem } from "@/data/types";

/** Pill-shaped active state for the current route. Hash links are never "active". */
function isActiveItem(item: NavItem, pathname: string): boolean {
  if (item.href.includes("#")) return false;
  if (item.href === "/") return pathname === "/";
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function DesktopNavLink({ item, active }: { item: NavItem; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`relative py-1 text-[0.95rem] font-semibold transition-colors duration-200 ${
        active
          ? "text-[#143d2b] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#c59b27] after:rounded-full"
          : "text-[#1a3024] hover:text-brand-primary"
      }`}
    >
      {item.label}
    </Link>
  );
}

function ServicesDropdown({ item, active }: { item: NavItem; active: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close automatically whenever the user scrolls anywhere on the page
  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => {
      setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Close when clicking outside the dropdown
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className="relative flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href="/services"
        aria-current={active ? "page" : undefined}
        onClick={() => setIsOpen(false)}
        className={`relative py-1 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold transition-colors duration-200 cursor-pointer ${
          active
            ? "text-[#143d2b] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#c59b27] after:rounded-full"
            : "text-[#1a3024] hover:text-brand-primary"
        }`}
      >
        <span>{item.label}</span>
        <ChevronDown
          aria-hidden="true"
          className={`size-3.5 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Link>

      {/* Services Dropdown Sub-menu. The transparent top padding replaces a margin, so there is no
          gap for the pointer to cross between the button and the list (crossing it closed the menu). */}
      <div
        className={`absolute top-full left-1/2 z-50 w-[280px] -translate-x-1/2 pt-2.5 transition-all duration-200 ${
          isOpen
            ? "opacity-100 visible translate-y-0 pointer-events-auto"
            : "opacity-0 invisible -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="rounded-2xl border border-brand-line bg-white/98 p-2.5 shadow-card backdrop-blur-md">
          <ul className="flex flex-col gap-0.5">
            {(item.children ?? []).map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl px-3 py-1.5 text-xs text-brand-ink hover:bg-brand-soft hover:text-brand-primary font-medium"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isHome && !scrolled
          ? "bg-transparent border-b border-transparent -mb-[var(--header-height,76px)]"
          : "bg-white/95 backdrop-blur-md border-b border-brand-line/70 shadow-soft"
      }`}
    >
      <Container className="relative flex h-[var(--header-height,76px)] items-center justify-between gap-4">
        <SkiLogo className="shrink-0" />

        <nav aria-label="Primary" className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {navigationItems.map((item) =>
            item.children ? (
              <ServicesDropdown key={item.label} item={item} active={pathname.startsWith("/services")} />
            ) : (
              <DesktopNavLink key={item.label} item={item} active={isActiveItem(item, pathname)} />
            ),
          )}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href={telHref}
            className="flex items-center gap-2 rounded-full bg-[#0d3822] px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#154a30] transition-colors"
          >
            <Phone aria-hidden="true" className="size-3.5 sm:size-4 text-[#c59b27]" />
            <span>{contact.phoneDisplay}</span>
          </a>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
