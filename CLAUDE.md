# Adventures in Aviation — Claude Development Rules

## 1. Global Stylesheet as Source of Truth

All styling values must be drawn from a single global stylesheet. **No raw hex codes, no ad-hoc margins, no one-off font sizes.**

- Colors, fonts, spacing, shadows, radii, motion timing, and breakpoints live in one place and are consumed as CSS custom properties or Tailwind theme tokens.
- Reference: `thoughts/design_tokens.md` defines the canonical palette and scale. The project stylesheet must map these 1:1.
- **Violation examples:** writing `margin-top: 20px` instead of `var(--space-5)`; using `#002244` inline instead of `var(--color-text-primary)`.

## 2. Everything Is a Reusable Component

Every UI element that appears on any page must be a reusable React component. **Do not inline markup or duplicate structure across pages.**

- Components should be dumb, focused, and composable: `EpisodeCard`, `Button`, `NavItem`, `SectionHeader`, `VideoPlayer`, etc.
- Props drive variation; switching behavior via `if` inside a page file instead of extracting a component violates this rule.
- Keep components co-located with their styles, or use the global stylesheet — no scoped one-off CSS modules for single-use cases.

## 3. MVC Architecture — Central State Store Only

**Components must not hold local state.** All data and UI state live in a central store; components receive it via props or a lightweight context/provider.

- Model: episode data, filters, navigation state.
- View: pure React components that render what they are given.
- Controller: hooks or thin adapter layers that read from the store and hand derived data to views.
- **Violation examples:** `useState` inside `EpisodeCard` for hover; `useState` inside a page for filter selection. Lift that state to the store and pass it down.
- For this static site, the "store" is typically a top-level data object + React Context for any runtime UI state (e.g., mobile menu open, active filter). No Redux needed unless complexity demands it.
