"use client";

import Link from "next/link";

interface TagProps {
  label: string;
  href?: string;
  variant?: "career" | "stem";
}

export default function Tag({ label, href, variant = "career" }: TagProps) {
  const baseClasses =
    "inline-block font-heading text-label uppercase tracking-widest px-3 py-1 rounded-full transition-colors duration-fast";

  const variantClasses =
    variant === "career"
      ? "bg-navy-100 text-navy-700 hover:bg-navy-200"
      : "bg-gold-300 text-navy-800 hover:bg-gold-400";

  const classes = `${baseClasses} ${variantClasses}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return <span className={classes}>{label}</span>;
}
