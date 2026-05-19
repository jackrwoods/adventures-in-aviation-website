"use client";

interface FilterTagProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
  variant?: "career" | "stem";
}

export default function FilterTag({ label, selected, onToggle, variant = "career" }: FilterTagProps) {
  const baseClasses =
    "inline-block font-heading text-label uppercase tracking-widest px-3 py-1 rounded-full transition-all duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const variantClasses =
    variant === "career"
      ? selected
        ? "bg-navy-700 text-white hover:bg-navy-600"
        : "bg-navy-100 text-navy-700 hover:bg-navy-200"
      : selected
        ? "bg-gold-500 text-navy-800 hover:bg-gold-400"
        : "bg-gold-300 text-navy-800 hover:bg-gold-400";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`${baseClasses} ${variantClasses}`}
    >
      {label}
    </button>
  );
}
