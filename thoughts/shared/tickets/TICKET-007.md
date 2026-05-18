---
id: TICKET-007
title: Accessibility, Animation & Performance Polish
status: spec-needed
priority: high
assignee:
created: 2026-05-18
updated: 2026-05-18
---

## Problem to Solve
As a children's website and nonprofit, AIA must meet WCAG 2.1 AA. Additionally, the brand calls for "cinematic" presentation without heavy JS bundles. We need to verify contrast, motion safety, keyboard navigation, and performance across all pages.

## Solution Approach
1. Implement CSS scroll-triggered animations (`fade-up`, `slide-right`, `scale-in`) using `IntersectionObserver` or CSS `@scroll-timeline` with graceful fallback.
2. Wrap all animations in `prefers-reduced-motion` checks: reduce to `duration-instant` or disable entirely.
3. Verify all color contrast ratios from `design_tokens.md` are met in actual UI (text on backgrounds, links, buttons).
4. Run axe-core on every page route and component. Fix any violations (focus traps, missing labels, contrast failures).
5. Audit typography scale at all breakpoints (320px to 1440px+): no text overflow, readable line lengths, comfortable touch targets (min 44px).
6. Verify keyboard navigation flow through all interactive elements (nav, filters, player, TOC, links).
7. Run Lighthouse on all pages: target Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90.

## Acceptance Criteria
- All animations respect `prefers-reduced-motion: reduce`.
- No color contrast violations against WCAG 2.1 AA (4.5:1 normal text, 3:1 large text/UI).
- axe-core reports zero violations on every page.
- All interactive elements are reachable and operable via keyboard only.
- Lighthouse scores meet targets on all pages.
- Typography is readable and layouts do not break at any breakpoint from 320px to 1536px.

## References
- `thoughts/design_document.md` — sections 5 (decisions 9, 15), 7 (Multilayer Validation Requirements)
- `thoughts/design_tokens.md` — motion tokens, accessibility rules, contrast verification table, breakpoints
- `thoughts/research_findings.md` — sections 4 (WCAG 2.1 AA, no PII)

## Comments
