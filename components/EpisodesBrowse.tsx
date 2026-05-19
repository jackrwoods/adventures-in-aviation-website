"use client";

import { useEffect, useRef } from "react";
import { useEpisodeFilters } from "@/lib/filter-state";
import FilterGroup from "./FilterGroup";
import EpisodeGrid from "./EpisodeGrid";
import EmptyState from "./EmptyState";

interface EpisodesBrowseProps {
  careerPaths: readonly string[];
  stemSubjects: readonly string[];
  totalEpisodes: number;
}

export default function EpisodesBrowse({
  careerPaths,
  stemSubjects,
  totalEpisodes,
}: EpisodesBrowseProps) {
  const { state, filteredEpisodes, toggleCareer, toggleStem, clearAll } = useEpisodeFilters();
  const activeFilterCount = state.selectedCareers.length + state.selectedStems.length;
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resultsRef.current) {
      resultsRef.current.focus();
    }
  }, [filteredEpisodes.length, activeFilterCount]);

  return (
    <>
      <div className="space-y-6 mb-spacing-8">
        <FilterGroup
          title="Filter by Career Path"
          options={careerPaths}
          selected={state.selectedCareers}
          onToggle={toggleCareer}
          variant="career"
        />
        <FilterGroup
          title="Filter by STEM Subject"
          options={stemSubjects}
          selected={state.selectedStems}
          onToggle={toggleStem}
          variant="stem"
        />
      </div>

      <div ref={resultsRef} tabIndex={-1} aria-live="polite">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-caption text-text-muted">
            Showing {filteredEpisodes.length} of {totalEpisodes} episodes
            {activeFilterCount > 0 && ` (${activeFilterCount} filter${activeFilterCount > 1 ? "s" : ""} active)`}
          </p>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="font-heading text-caption text-text-link hover:text-text-link-hover transition-colors duration-fast"
            >
              Clear all
            </button>
          )}
        </div>

        {filteredEpisodes.length > 0 ? (
          <EpisodeGrid episodes={filteredEpisodes} />
        ) : (
          <EmptyState onClear={clearAll} />
        )}
      </div>
    </>
  );
}
