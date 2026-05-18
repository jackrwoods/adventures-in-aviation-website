import Link from "next/link";

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/episodes", label: "Episodes" },
  { href: "/about", label: "About" },
  { href: "/partners", label: "Partners" },
];

const partnerLinks = [
  { href: "https://www.eaa.org", label: "EAA" },
  { href: "https://www.aopa.org", label: "AOPA" },
  { href: "https://www.faa.gov", label: "FAA" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-inverse mt-auto">
      <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg py-10 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-heading text-label uppercase tracking-widest text-accent mb-4">
              Adventures in Aviation
            </p>
            <p className="text-body-sm text-muted">
              A flight plan for aviation&apos;s talent crisis.
            </p>
          </div>

          {/* Site links */}
          <div>
            <p className="font-heading text-label uppercase tracking-widest mb-4">
              Site
            </p>
            <ul className="flex flex-col gap-2">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-inverse hover:text-accent transition-colors duration-fast"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner links */}
          <div>
            <p className="font-heading text-label uppercase tracking-widest mb-4">
              Partners
            </p>
            <ul className="flex flex-col gap-2">
              {partnerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm text-inverse hover:text-accent transition-colors duration-fast"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border-dark">
          <p className="text-caption text-muted">
            &copy; {new Date().getFullYear()} Adventures in Aviation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
