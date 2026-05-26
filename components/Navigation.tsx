"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useUIState } from "@/lib/ui-state";
import { assetPath } from "@/lib/paths";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/episodes", label: "Episodes" },
  { href: "/about", label: "About" },
  { href: "/partners", label: "Partners" },
];

export default function Navigation() {
  const pathname = usePathname();
  const { state, setMobileMenuOpen } = useUIState();
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Escape to close + focus trap
  useEffect(() => {
    if (!state.mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
      // Focus trap: Tab cycles within mobile nav
      if (e.key === "Tab" && mobileNavRef.current) {
        const focusable = mobileNavRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    // Store previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;
    // Focus first link in menu
    const firstLink = mobileNavRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [state.mobileMenuOpen, setMobileMenuOpen]);

  // Return focus to toggle button when closing
  useEffect(() => {
    if (!state.mobileMenuOpen && menuButtonRef.current) {
      menuButtonRef.current.focus();
    }
  }, [state.mobileMenuOpen]);

  return (
    <header className="bg-navy-900 z-sticky sticky top-0">
      <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg flex items-center justify-between h-16">
        {/* Logo / Wordmark */}
        <Link href="/" className="flex items-center">
          <img
            src={assetPath("/logo.svg")}
            alt="Adventures in Aviation"
            className="h-8 w-auto block"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "group font-heading text-label uppercase tracking-widest relative transition-colors duration-fast",
                  active
                    ? "text-accent"
                    : "text-inverse hover:text-accent",
                ].join(" ")}
              >
                {link.label}
                <span
                  className={[
                    "absolute left-0 -bottom-1 h-0.5 bg-accent transition-all duration-fast",
                    active ? "w-full" : "w-0 group-hover:w-full",
                  ].join(" ")}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          ref={menuButtonRef}
          className="lg:hidden text-inverse p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label={state.mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={state.mobileMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileMenuOpen(!state.mobileMenuOpen)}
        >
          <span className="block w-6 h-0.5 bg-current mb-1.5 transition-transform duration-fast" aria-hidden="true" />
          <span className="block w-6 h-0.5 bg-current mb-1.5 transition-opacity duration-fast" aria-hidden="true" />
          <span className="block w-6 h-0.5 bg-current transition-transform duration-fast" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile nav */}
      <div
        id="mobile-nav"
        ref={mobileNavRef}
        className={[
          "lg:hidden overflow-hidden transition-all duration-normal ease-default bg-navy-900",
          state.mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
        aria-hidden={!state.mobileMenuOpen}
        inert={!state.mobileMenuOpen}
      >
        <nav className="px-gutter pb-6 flex flex-col gap-4" aria-label="Mobile">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={[
                  "font-heading text-label uppercase tracking-widest transition-colors duration-fast",
                  active
                    ? "text-accent"
                    : "text-inverse hover:text-accent",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
