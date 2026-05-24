"use client";

interface EmptyStateProps {
  onClear: () => void;
}

export default function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="text-center py-8">
      <h3 className="font-heading text-h3 text-text-primary mb-3">
        No episodes match your filters
      </h3>
      <p className="text-body text-text-secondary max-w-text mx-auto mb-6">
        Try removing some filters to see more results, or browse all episodes by
        clearing your selections.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="inline-block font-heading text-body font-bold bg-accent text-navy-800 px-6 py-3 rounded-sm shadow-sm hover:bg-accent-hover hover:shadow-md transition-all duration-fast"
      >
        Clear all filters
      </button>
    </div>
  );
}
