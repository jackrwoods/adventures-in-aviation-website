# Episode Discovery — Browse & Filter Implementation Plan

## Overview

Replace the placeholder `/episodes` page with a fully functional episode browser that supports multi-select filtering by career path and STEM subject. Filters are reflected in URL query parameters, keyboard accessible, and gracefully handle empty results.

## Current State Analysis

- `/episodes/page.tsx` is a placeholder ("Coming soon").
- Homepage (`app/page.tsx:68-93`) renders pill-shaped tags that link to `/episodes?career=...` and `/episodes?stem=...`.
- `EpisodeCard`, `Tag`, `SectionHeader` are reusable components.
- Episode data lives in `lib/data.ts`: 3 episodes, 8 career paths, 8 STEM subjects.
- State management is a lightweight `UIStateProvider` (`lib/ui-state.tsx`) for mobile menu only.
- Styling is Tailwind v4 with all tokens in `globals.css`; no CSS modules anywhere.
- Static export (`next.config.ts:4`); no SSR.
- No test framework configured.

## Desired End State

The `/episodes` page:
1. Lists all episodes by default in a responsive grid.
2. Provides toggleable pill-tag filters for career path and STEM subject.
3. Allows multi-selection within and across both categories.
4. Syncs filter selections to URL query params (`?career=Pilots&career=Aerospace%20Engineers&stem=Physics`).
5. Reads URL query params on page load to restore filter state.
6. Displays an empty state with helpful copy and a "Clear all filters" action when no episodes match.
7. Is keyboard accessible (tab navigation, Enter/Space to toggle filters).
8. Passes axe-core accessibility scan.

## What We're NOT Doing

- Search functionality (out of scope per Decision 14).
- Server-side filtering (static export; all filtering is client-side).
- Animation/filter transitions beyond standard Tailwind transitions.
- Unit or integration test suites (no test framework; manual verification only).
- URL history push/replace for every filter toggle (we will update the URL but not create a history stack entry for every click; `replaceState` is fine).

## Implementation Approach

### State Architecture

Create a **separate** `EpisodeFilterProvider` (not extending `UIStateProvider`) to keep concerns distinct:

- `selectedCareers: string[]`
- `selectedStems: string[]`
- `toggleCareer(path: string)` — add or remove from array
- `toggleStem(subject: string)` — add or remove from array
- `clearAll()` — reset both arrays
- Derive `filteredEpisodes` from the episodes array + selected filters (AND logic across categories, OR logic within a category).

The provider lives in a new file `lib/filter-state.tsx`.

### URL Sync Strategy

Since this is a static export, query params are only available client-side. The `EpisodeFilterProvider` will:
1. Read `window.location.search` on mount to initialize state.
2. Call `window.history.replaceState` whenever filters change to update the URL without adding history entries.
3. Parse `URLSearchParams` for repeated keys (`career=...&career=...`).

### Component Inventory

| Component | File | Purpose |
|---|---|---|
| `EpisodeFilterProvider` | `lib/filter-state.tsx` | Context provider + hook for filter state and URL sync |
| `FilterGroup` | `components/FilterGroup.tsx` | Renders a labeled group of toggleable filter pills |
| `FilterTag` | `components/FilterTag.tsx` | Individual toggle button (pill) with selected/unselected state |
| `EpisodeGrid` | `components/EpisodeGrid.tsx` | Responsive grid of `EpisodeCard` components |
| `EmptyState` | `components/EmptyState.tsx` | Message + clear action when no episodes match |
| `EpisodesBrowse` | `components/EpisodesBrowse.tsx` | Client component composing filters + grid/empty state |

### Filter Logic

- **Within a category (OR)**: An episode matches if its `careerPath` is in `selectedCareers` OR if `selectedCareers` is empty.
- **Across categories (AND)**: An episode must match the career filter AND the STEM filter.
- Example: `selectedCareers = ["Pilots", "Aerospace Engineers"]` → matches episodes with career path "Pilots" OR "Aerospace Engineers".
- Example: `selectedCareers = ["Pilots"]` + `selectedStems = ["Physics"]` → matches episodes that are "Pilots" AND "Physics".

## Phase 1: Episode Filter State & URL Sync

### Overview
Create the `EpisodeFilterProvider` context with state, actions, and URL synchronization.

### Changes Required:

#### 1. New file: `lib/filter-state.tsx`
**File**: `lib/filter-state.tsx`
**Changes**: Create a new React Context for episode filter state.

```tsx
"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { Episode } from "./data";
import { episodes } from "./data";

type EpisodeFilterState = {
  selectedCareers: string[];
  selectedStems: string[];
};

type EpisodeFilterContextType = {
  state: EpisodeFilterState;
  filteredEpisodes: Episode[];
  toggleCareer: (path: string) => void;
  toggleStem: (subject: string) => void;
  clearAll: () => void;
};

const EpisodeFilterContext = createContext<EpisodeFilterContextType | null>(null);

function parseQueryParams(): EpisodeFilterState {
  if (typeof window === "undefined") return { selectedCareers: [], selectedStems: [] };
  const params = new URLSearchParams(window.location.search);
  return {
    selectedCareers: params.getAll("career"),
    selectedStems: params.getAll("stem"),
  };
}

function updateUrl(state: EpisodeFilterState) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams();
  state.selectedCareers.forEach((c) => params.append("career", c));
  state.selectedStems.forEach((s) => params.append("stem", s));
  const query = params.toString();
  const newUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState(null, "", newUrl);
}

export function EpisodeFilterProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<EpisodeFilterState>(parseQueryParams);

  const toggleCareer = useCallback((path: string) => {
    setState((prev) => {
      const next = {
        ...prev,
        selectedCareers: prev.selectedCareers.includes(path)
          ? prev.selectedCareers.filter((c) => c !== path)
          : [...prev.selectedCareers, path],
      };
      return next;
    });
  }, []);

  const toggleStem = useCallback((subject: string) => {
    setState((prev) => {
      const next = {
        ...prev,
        selectedStems: prev.selectedStems.includes(subject)
          ? prev.selectedStems.filter((s) => s !== subject)
          : [...prev.selectedStems, subject],
      };
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setState({ selectedCareers: [], selectedStems: [] });
  }, []);

  useEffect(() => {
    updateUrl(state);
  }, [state]);

  const filteredEpisodes = episodes.filter((ep) => {
    const careerMatch = state.selectedCareers.length === 0 || state.selectedCareers.includes(ep.careerPath);
    const stemMatch = state.selectedStems.length === 0 || state.selectedStems.includes(ep.stemSubject);
    return careerMatch && stemMatch;
  });

  return (
    <EpisodeFilterContext.Provider value={{ state, filteredEpisodes, toggleCareer, toggleStem, clearAll }}>
      {children}
    </EpisodeFilterContext.Provider>
  );
}

export function useEpisodeFilters() {
  const ctx = useContext(EpisodeFilterContext);
  if (!ctx) throw new Error("useEpisodeFilters must be used within EpisodeFilterProvider");
  return ctx;
}
```

### Success Criteria:

#### Automated Verification:
- [x] `npm run lint` passes with no errors.
- [x] `npm run build` completes without errors.

#### Manual Verification:
- [ ] Visiting `/episodes` initializes with no filters selected.
- [ ] Visiting `/episodes?career=Pilots` initializes with "Pilots" selected.
- [ ] Visiting `/episodes?career=Pilots&career=Aerospace%20Engineers` initializes with both selected.
- [ ] Visiting `/episodes?stem=Physics&career=Pilots` initializes with both categories selected.
- [ ] URL updates to reflect filter changes without adding browser history entries.

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful before proceeding to the next phase.

---

## Phase 2: Reusable Filter Components

### Overview
Create the `FilterTag` (individual toggle pill) and `FilterGroup` (labeled group) components, plus `EpisodeGrid` and `EmptyState`.

### Changes Required:

#### 1. New file: `components/FilterTag.tsx`
**File**: `components/FilterTag.tsx`
**Changes**: Create a toggleable pill button for filter selections.

```tsx
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
```

#### 2. New file: `components/FilterGroup.tsx`
**File**: `components/FilterGroup.tsx`
**Changes**: Create a labeled group of `FilterTag` components.

```tsx
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
      <h3 className="font-heading text-h4 text-text-primary mb-3">{title}</h3>
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
```

#### 3. New file: `components/EpisodeGrid.tsx`
**File**: `components/EpisodeGrid.tsx`
**Changes**: Reusable grid layout for episode cards.

```tsx
import type { Episode } from "@/lib/data";
import EpisodeCard from "./EpisodeCard";

interface EpisodeGridProps {
  episodes: Episode[];
}

export default function EpisodeGrid({ episodes }: EpisodeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {episodes.map((episode) => (
        <EpisodeCard key={episode.slug} episode={episode} />
      ))}
    </div>
  );
}
```

#### 4. New file: `components/EmptyState.tsx`
**File**: `components/EmptyState.tsx`
**Changes**: Displayed when no episodes match selected filters.

```tsx
"use client";

interface EmptyStateProps {
  onClear: () => void;
}

export default function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="text-center py-spacing-8">
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
```

### Success Criteria:

#### Automated Verification:
- [x] `npm run lint` passes with no errors.
- [x] `npm run build` completes without errors.

#### Manual Verification:
- [ ] `FilterTag` renders with correct selected/unselected styling for both career and stem variants.
- [ ] `FilterGroup` renders all options and passes correct `selected` state.
- [ ] `EmptyState` displays centered with readable text and a styled "Clear all filters" button.
- [ ] `EpisodeGrid` renders cards in a responsive 1/2/3 column layout.

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful before proceeding to the next phase.

---

## Phase 3: Episodes Page Assembly

### Overview
Assemble the `/episodes` page using the provider and components built in Phases 1-2.

### Changes Required:

#### 1. Update file: `app/episodes/page.tsx`
**File**: `app/episodes/page.tsx`
**Changes**: Replace placeholder with full episodes browse page.

```tsx
import { episodes, careerPaths, stemSubjects } from "@/lib/data";
import { EpisodeFilterProvider } from "@/lib/filter-state";
import EpisodesBrowse from "@/components/EpisodesBrowse";

export default function EpisodesPage() {
  return (
    <EpisodeFilterProvider>
      <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg py-spacing-9 lg:py-spacing-10">
        <header className="mb-spacing-8">
          <h1 className="font-heading text-h1 text-text-primary mb-4">
            All Episodes
          </h1>
          <p className="text-body text-text-secondary max-w-text">
            Browse all Adventures in Aviation episodes. Filter by career path
            and STEM subject to find content relevant to your interests.
          </p>
        </header>

        <EpisodesBrowse
          careerPaths={careerPaths}
          stemSubjects={stemSubjects}
          totalEpisodes={episodes.length}
        />
      </div>
    </EpisodeFilterProvider>
  );
}
```

#### 2. New file: `components/EpisodesBrowse.tsx`
**File**: `components/EpisodesBrowse.tsx`
**Changes**: Client component composing filter groups, results count, grid, and empty state.

```tsx
"use client";

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

      <div className="mb-6 flex items-center justify-between">
        <p className="text-caption text-text-muted" aria-live="polite">
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
    </>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] `npm run lint` passes with no errors.
- [x] `npm run build` completes without errors.
- [x] Static export generates `out/episodes.html`.

#### Manual Verification:
- [ ] `/episodes` loads with all 3 episodes displayed.
- [ ] Selecting one career filter narrows results correctly.
- [ ] Selecting multiple career filters uses OR logic within category.
- [ ] Selecting both career and STEM filters uses AND logic across categories.
- [ ] "Showing X of Y episodes" count updates correctly.
- [ ] "Clear all" link appears when filters are active and resets everything.
- [ ] Empty state appears and "Clear all filters" button works when no episodes match.
- [ ] Homepage tag links (`/episodes?career=Pilots`, `/episodes?stem=Physics`) pre-populate filters on arrival.
- [ ] Keyboard navigation works through all filter pills (Tab, Enter, Space).
- [ ] axe-core browser extension scan passes with 0 violations.

---

## Testing Strategy

### Manual Testing Steps:
1. Load `/episodes` — verify all episodes visible, no filters selected.
2. Click "Pilots" under Career Path — verify only flight-school episode shows.
3. Click "Aerospace Engineers" — verify flight-school AND aircraft-manufacturer show.
4. Click "Physics" under STEM Subject — verify only flight-school shows.
5. Click "Materials Science" under STEM — verify no episodes match; empty state appears.
6. Click "Clear all filters" — verify all episodes reappear.
7. Navigate from homepage "Pilots" tag — verify filter pre-selected.
8. Run axe-core DevTools scan — verify 0 violations.
9. Test keyboard: Tab through filters, Enter/Space to toggle, Tab to "Clear all", Enter to activate.

## Performance Considerations

- Filtering is client-side on a small dataset (< 100 episodes). No virtualization needed.
- `useMemo` is unnecessary for this data size; `Array.prototype.filter` is fast enough.
- `window.history.replaceState` is synchronous and non-blocking.
- `FilterTag` is a simple button; no heavy re-renders expected.

## Migration Notes

- No breaking changes to existing pages.
- Homepage tag links (`/episodes?career=...`, `/episodes?stem=...`) continue to work.
- `EpisodeCard`, `Tag`, `SectionHeader` remain unchanged.

## References

- Original ticket: `thoughts/shared/tickets/TICKET-003.md`
- Design tokens: `thoughts/design_tokens.md` — Card primitive, Button Primary, spacing, typography
- Design document: `thoughts/design_document.md` — Page Inventory: Episodes (section 2), content organization (decision 12, Appendix A)
- Research findings: `thoughts/research_findings.md` — Content organization (section 5)
- Current episode data: `lib/data.ts`
- Current UI state pattern: `lib/ui-state.tsx`
- Styling system: `app/globals.css` (Tailwind v4 `@theme`)
