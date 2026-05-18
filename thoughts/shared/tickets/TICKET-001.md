---
id: TICKET-001
title: Project Foundation & Global Shell
status: spec-needed
priority: critical
assignee:
created: 2026-05-18
updated: 2026-05-18
---

## Problem to Solve
Adventures in Aviation has no existing website or codebase. Before any page can be built or demoed, we need the foundational Next.js project, design tokens, self-hosted fonts, and global shell (navigation + footer) that every other slice depends on.

## Solution Approach
1. Initialize Next.js project with App Router and configure `output: 'export'` for static generation.
2. Install and configure self-hosted fonts via Fontsource: B612 (heading, 400/700), B612 Mono (technical, 400), Andika (body, 400/700).
3. Implement design tokens from `thoughts/design_tokens.md` as Tailwind config extensions + CSS custom properties.
4. Build responsive navigation component: full menu on desktop (`bp-lg`), hamburger on mobile. Uppercase label style, active/hover states with gold accent.
5. Build footer component with basic site links and partner references.
6. Create root layout wrapping all pages with nav + footer.
7. Set up placeholder routes for all pages so navigation works end-to-end even before content is implemented.

## Acceptance Criteria
- `npm run build` produces static HTML in `out/` with no errors.
- Fonts load without flash of unstyled text (metric-matched fallbacks, `font-display` strategy per design tokens).
- Navigation collapses to hamburger below `bp-lg` and shows full menu above.
- All design tokens (colors, typography, spacing, motion) are accessible in Tailwind/CSS.
- Lighthouse scores: Performance ≥ 90, Accessibility ≥ 90 for the shell alone.

## References
- `thoughts/design_document.md` — sections 1–3, decision log entries 1–3, 8, 16–17, 21
- `thoughts/design_tokens.md` — colors, typography, spacing, motion, font loading strategy
- `thoughts/research_findings.md` — sections 2–3

## Comments
