---
id: TICKET-003
title: Episode Discovery — Browse & Filter
status: spec-needed
priority: high
assignee:
created: 2026-05-18
updated: 2026-05-18
---

## Problem to Solve
Students and educators need to browse all episodes and filter by career path or STEM subject to find relevant content. The episodes page must scale from the initial 3 episodes to 8+ without layout or usability issues.

## Solution Approach
1. Build the `/episodes` page with a header and filter controls.
2. Implement client-side filter for career path (8 options) and STEM subject (8 options). Filters can be combined or single-select.
3. Reuse the episode card component from TICKET-002. Grid layout validates for 3–8 items, scales to more.
4. Add filter state to URL query parameters so filtered views are shareable and navigable from homepage tags.
5. Display empty state when no episodes match selected filters.
6. Apply `text-h1` page title, `text-body` for descriptions.

## Acceptance Criteria
- Episodes page lists all episodes by default.
- Filtering by career path and/or STEM subject updates the grid without page reload.
- Filter selections are reflected in the URL and survive a refresh.
- Grid scales from 3 to 8+ items without breaking layout.
- Empty state provides helpful copy and a "clear filters" action.
- All filter controls are keyboard accessible.
- axe-core scan passes.

## References
- `thoughts/design_document.md` — sections 2 (Page Inventory: Episodes), 4 (new patterns), decision 12, Appendix A
- `thoughts/design_tokens.md` — Card primitive, animation patterns
- `thoughts/research_findings.md` — sections 5 (content organization)

## Comments
