"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { SkiLogo } from "@/components/brand/SkiLogo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Container } from "@/components/ui/Container";
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

function DesktopNavLink({
  item,
  active,
  isDarkHero,
}: {
  item: NavItem;
  active: boolean;
  isDarkHero: boolean;
}) {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: active ? "smooth" : "instant" });
    }
  };

  return (
    <Link
      href={item.href}
      scroll={true}
      onClick={handleClick}
      aria-current={active ? "page" : undefined}
      className={`relative py-1 text-[0.95rem] font-semibold transition-all duration-200 cursor-pointer ${
        isDarkHero
          ? active
            ? "!text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#8ce034] after:rounded-full after:shadow-sm"
            : "!text-white/95 hover:!text-[#8ce034] font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          : active
            ? "text-[#143d2b] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#c59b27] after:rounded-full"
            : "text-[#1a3024] hover:text-brand-primary"
      }`}
      style={isDarkHero ? { color: active ? "#ffffff" : "rgba(255, 255, 255, 0.95)" } : undefined}
    >
      {item.label}
    </Link>
  );
}

function ServicesDropdown({
  item,
  active,
  isDarkHero,
}: {
  item: NavItem;
  active: boolean;
  isDarkHero: boolean;
}) {
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
        className={`relative py-1 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold transition-all duration-200 cursor-pointer ${
          isDarkHero
            ? active
              ? "!text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#8ce034] after:rounded-full after:shadow-sm"
              : "!text-white/95 hover:!text-[#8ce034] font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
            : active
              ? "text-[#143d2b] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#c59b27] after:rounded-full"
              : "text-[#1a3024] hover:text-brand-primary"
        }`}
        style={isDarkHero ? { color: active ? "#ffffff" : "rgba(255, 255, 255, 0.95)" } : undefined}
      >
        <span>{item.label}</span>
        <ChevronDown
          aria-hidden="true"
          className={`size-3.5 transition-transform duration-200 ${
            isDarkHero ? "!text-white/80" : "text-gray-500"
          } ${isOpen ? "rotate-180" : ""}`}
        />
      </Link>

      {/* Services Dropdown Sub-menu */}
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
    // Re-evaluate scroll state on route transition
    setScrolled(window.scrollY > 20);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDarkHero = isHome && !scrolled;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isDarkHero
          ? "bg-gradient-to-b from-black/80 via-black/45 to-transparent border-b border-white/10 -mb-[var(--header-height,76px)]"
          : "bg-white/95 backdrop-blur-md border-b border-brand-line/70 shadow-soft"
      }`}
    >
      <Container className="relative flex h-[var(--header-height,76px)] items-center justify-between gap-4">
        <SkiLogo className={`shrink-0 ${isDarkHero ? "drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]" : ""}`} />

        <nav
          aria-label="Primary"
          className={`hidden items-center gap-6 xl:gap-8 lg:flex transition-all duration-300 ${
            isDarkHero
              ? "rounded-full bg-black/40 backdrop-blur-md border border-white/20 px-6 py-2 shadow-lg"
              : ""
          }`}
        >
          {navigationItems.map((item) =>
            item.children ? (
              <ServicesDropdown
                key={item.label}
                item={item}
                active={pathname.startsWith("/services")}
                isDarkHero={isDarkHero}
              />
            ) : (
              <DesktopNavLink
                key={item.label}
                item={item}
                active={isActiveItem(item, pathname)}
                isDarkHero={isDarkHero}
              />
            ),
          )}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href={telHref}
            className={`flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold shadow-sm transition-all duration-300 ${
              isDarkHero
                ? "bg-black/50 hover:bg-black/70 text-white border border-white/25 backdrop-blur-md shadow-md"
                : "bg-[#0d3822] hover:bg-[#154a30] text-white"
            }`}
          >
            <Phone
              aria-hidden="true"
              className={`size-3.5 sm:size-4 ${isDarkHero ? "text-[#8ce034]" : "text-[#c59b27]"}`}
            />
            <span className="text-white drop-shadow-sm">{contact.phoneDisplay}</span>
          </a>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
