"use client";

import Link from "next/link";

interface TagProps {
  label: string;
  href?: string;
  variant?: "career" | "stem";
}

export default function Tag({ label, href, variant = "career" }: TagProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-heading text-label uppercase tracking-widest px-4 py-2 min-h-[44px] rounded-full transition-colors duration-fast";

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
