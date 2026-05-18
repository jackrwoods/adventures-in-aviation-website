"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIState } from "@/lib/ui-state";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/episodes", label: "Episodes" },
  { href: "/about", label: "About" },
  { href: "/partners", label: "Partners" },
];

export default function Navigation() {
  const pathname = usePathname();
  const { state, setMobileMenuOpen } = useUIState();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-navy-900 z-index-sticky sticky top-0">
      <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg flex items-center justify-between h-16">
        {/* Logo / Wordmark */}
        <Link
          href="/"
          className="font-heading text-label text-inverse tracking-widest uppercase"
        >
          Adventures in Aviation
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
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
          className="lg:hidden text-inverse p-2"
          aria-label={state.mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={state.mobileMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileMenuOpen(!state.mobileMenuOpen)}
        >
          <span className="block w-6 h-0.5 bg-current mb-1.5 transition-transform duration-fast" />
          <span className="block w-6 h-0.5 bg-current mb-1.5 transition-opacity duration-fast" />
          <span className="block w-6 h-0.5 bg-current transition-transform duration-fast" />
        </button>
      </div>

      {/* Mobile nav */}
      <div
        id="mobile-nav"
        className={[
          "lg:hidden overflow-hidden transition-all duration-normal ease-default bg-navy-900",
          state.mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="px-gutter pb-6 flex flex-col gap-4" aria-label="Mobile">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
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
