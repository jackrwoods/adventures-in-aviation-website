"use client";

import Link from "next/link";

interface TOCItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
  onToggle?: () => void;
}

export default function TableOfContents({
  items,
  onToggle,
}: TableOfContentsProps) {
  return (
    <>
      {/* Mobile: collapsible details/summary */}
      <div className="lg:hidden mb-8">
        <details
          className="group border border-border rounded-md bg-bg-card"
          onToggle={() => {
            if (onToggle) onToggle();
          }}
        >
          <summary className="cursor-pointer px-4 py-3 font-heading text-h4 text-text-primary flex items-center justify-between select-none">
            On this page
            <span
              className="transition-transform duration-fast group-open:rotate-180"
              aria-hidden="true"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </summary>
          <nav aria-label="Table of contents">
            <ul className="px-4 pb-4 space-y-2">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`#${item.id}`}
                    className="text-body text-text-link hover:text-text-link-hover transition-colors duration-fast"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>

      {/* Desktop: sticky sidebar */}
      <nav
        className="hidden lg:block sticky top-24 self-start"
        aria-label="Table of contents"
      >
        <h2 className="font-heading text-label uppercase tracking-widest text-text-muted mb-4">
          On this page
        </h2>
        <ul className="space-y-3 border-l-2 border-border-light pl-4">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className="text-body text-text-secondary hover:text-text-link transition-colors duration-fast"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
