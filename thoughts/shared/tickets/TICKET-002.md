---
id: TICKET-002
title: Homepage — Mission Hero & Featured Episodes
status: spec-needed
priority: critical
assignee:
created: 2026-05-18
updated: 2026-05-18
---

## Problem to Solve
The homepage must simultaneously communicate AIA's mission to foundation funders and surface video content to students. It needs a cinematic hero landing that transitions into an episode discovery grid, establishing the "mission + content" dual-purpose pattern that defines the site.

## Solution Approach
1. Build hero section with dark background (`bg-dark` / `navy-900`), mission headline "A flight plan for aviation's talent crisis.", and subtle scroll-linked entrance animation.
2. Implement episode card component: thumbnail (16:9), title, career path tag, STEM subject tag. Card uses `radius-md`, `shadow-none` default with `shadow-sm` hover + `hover-lift` animation.
3. Build featured episodes grid on light background (`bg-primary` / `slate-100`) below hero. Grid must validate for 3–8 items.
4. Add career path and STEM subject navigation tags/chips linking to the Episodes page with filter pre-selected.
5. Apply typography scale: `text-hero` for headline, `text-h3` for section headings, `text-body` for descriptions.
6. Respect `prefers-reduced-motion`: animations become instant or disabled.

## Acceptance Criteria
- Hero renders mission text with no layout shift (font preloading + metric fallbacks).
- Episode cards display thumbnail, title, career path tag, and STEM subject tag.
- Grid layout is responsive: 1 column mobile, 2 columns tablet, 3 columns desktop.
- Career/STEM tags navigate to Episodes page with correct filter active.
- All motion respects `prefers-reduced-motion`.
- axe-core scan passes with zero violations.
- Lighthouse: Performance ≥ 90, Accessibility ≥ 90.

## References
- `thoughts/design_document.md` — sections 2, 4, 5 (decisions 5, 8, 12, 16–20), Appendix A
- `thoughts/design_tokens.md` — component primitives (Button, Card, Navigation Item), animation patterns (`fade-up`, `hover-lift`), typography scale
- `thoughts/research_findings.md` — sections 1, 4, 5

## Comments
