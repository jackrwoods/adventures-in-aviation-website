"use client";

import FilterTag from "./FilterTag";

interface FilterGroupProps {
  title: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
  variant: "career" | "stem";
}

export default function FilterGroup({ title, options, selected, onToggle, variant }: FilterGroupProps) {
  return (
    <div role="group" aria-label={title}>
      <h2 className="font-heading text-h4 text-text-primary mb-3">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <FilterTag
            key={option}
            label={option}
            selected={selected.includes(option)}
            onToggle={() => onToggle(option)}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}
