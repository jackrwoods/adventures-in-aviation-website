# TICKET-007: Accessibility, Animation & Performance Polish — Implementation Plan

## Overview

Bring the Adventures in Aviation static site to WCAG 2.1 AA compliance, add the missing cinematic scroll animation variants, fix keyboard navigation and focus traps, and optimize image/render performance to hit Lighthouse targets (Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90).

## Current State Analysis

**What already works:**
- `globals.css` has `prefers-reduced-motion: reduce` handling, `font-synthesis: none`, skip links, global `:focus-visible`, and scroll-driven `animation-timeline: view()` for `.scroll-fade-up` (`app/globals.css:266-272`).
- Semantic HTML and ARIA present on filters (`aria-pressed`, `role="group"`, `aria-live="polite"`), navigation (`aria-expanded`, `aria-controls`), and external links (`sr-only` new-tab text).
- Reduced-motion gating exists for keyframe and scroll animations.
- `letter-spacing: 0.12em` on body text is intentional per `design_tokens.md` (WCAG SC 1.4.12).

**What's missing or broken:**
- Only two animation utilities exist (`fade-up`, `fade-in`). `slide-right` and `scale-in` are missing.
- Mobile navigation has **no Escape key handler**, **no focus trap**, and the closed panel is **still in the accessibility tree** (`components/Navigation.tsx:78-105`).
- No `aria-current="page"` on active nav links.
- Heading hierarchy violations: `h3` used directly under `h1` with no `h2` on Home (`app/page.tsx:64`, `:81`) and Episodes (`components/FilterGroup.tsx:16`) pages.
- Scroll indicator and hamburger icon bars are decorative but not marked `aria-hidden`.
- Video player container lacks an `aria-label` or accessible description (`components/VideoPlayer.tsx:41-43`).
- Video player loader lacks an `aria-busy` indicator (`components/VideoPlayerLoader.tsx:7-11`).
- No programmatic focus management after filter toggles or mobile menu close.
- `FilterTag` and `Tag` touch targets are well below 44 px (`px-3 py-1` with 12 px text).
- No performance CSS hints (`will-change`, `content-visibility`) on animated or below-fold sections.
- `EpisodeCard` images have `sizes` but no `priority` prop for above-the-fold grids.

## Desired End State

- All four scroll animation patterns (`fade-up`, `fade-in`, `slide-right`, `scale-in`) are defined as CSS utilities with `prefers-reduced-motion` fallbacks.
- Existing pages apply varied entrance animations to sections (not just `fade-up` everywhere).
- Mobile menu can be opened/closed with keyboard, Escape dismisses it, focus is trapped inside, and focus returns to the toggle button on close.
- Zero heading-skip violations (no `h1` → `h3` jumps).
- All decorative elements hidden from AT.
- Video player and loader are announced accessibly.
- All interactive elements have touch targets ≥ 44 px.
- Images above the fold use `priority`.
- Animated elements hint `will-change` for compositor promotion.
- Below-fold sections use `content-visibility: auto` where appropriate.

## What We're NOT Doing

- **No automated test framework installation** — user explicitly said "don't worry about tests."
- **No new pages or content** — this is a polish pass on existing pages only.
- **No color palette changes** — tokens are already verified in `design_tokens.md`; we only fix contrast violations if found in actual UI.
- **No `next/image` optimization pipeline** — static export requires `unoptimized: true`; we only add `priority`/`sizes` props.
- **No video transcript links** — transcripts are deferred to content production per `design_document.md` open questions.

## Implementation Approach

Four incremental phases, each testable in isolation. Every change is scoped to existing components/pages; no new dependencies.

---

## Phase 1: Animation System — Define `slide-right` / `scale-in` and Apply to Pages

### Overview
Add the two missing animation keyframes and scroll-triggered utility classes, then vary their application across existing pages so sections don't all animate identically. Add `will-change` hints for compositor performance.

### Changes Required:

#### 1. Add keyframes and utilities in `globals.css`
**File**: `app/globals.css`
**Changes**: Insert new keyframes after `fade-in`, add utility classes, and add `will-change` to scroll-driven utilities. Keep all existing `prefers-reduced-motion` blocks.

```css
/* After line 237 (end of fade-in keyframe) */
@keyframes slide-right {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* After line 263 (end of animation-delay utilities) */
.animate-slide-right {
  opacity: 0;
  animation: slide-right var(--duration-slow) var(--ease-out) forwards;
}

.animate-scale-in {
  opacity: 0;
  animation: scale-in var(--duration-normal) var(--ease-out) forwards;
}

/* Update existing scroll-fade-up block (lines 266-273) to include will-change */
@media (prefers-reduced-motion: no-preference) {
  .scroll-fade-up {
    opacity: 0;
    animation: fade-up var(--duration-slow) var(--ease-out) both;
    animation-timeline: view();
    animation-range: entry 10% cover 30%;
    will-change: transform, opacity;
  }

  .scroll-slide-right {
    opacity: 0;
    animation: slide-right var(--duration-slow) var(--ease-out) both;
    animation-timeline: view();
    animation-range: entry 10% cover 30%;
    will-change: transform, opacity;
  }

  .scroll-scale-in {
    opacity: 0;
    animation: scale-in var(--duration-normal) var(--ease-out) both;
    animation-timeline: view();
    animation-range: entry 10% cover 30%;
    will-change: transform, opacity;
  }
}

/* After existing reduced-motion block (line 289), add fallback visibility */
@media (prefers-reduced-motion: reduce) {
  .animate-slide-right,
  .animate-scale-in {
    opacity: 1;
    animation: none;
  }

  .scroll-slide-right,
  .scroll-scale-in {
    opacity: 1;
    animation: none;
  }
}
```

#### 2. Modify `AboutSection` to support animation variants
**File**: `components/AboutSection.tsx`
**Changes**: Add optional `animation` prop defaulting to `"fade-up"`.

```tsx
interface AboutSectionProps {
  id: string;
  background?: "primary" | "secondary" | "dark";
  animation?: "fade-up" | "slide-right" | "scale-in";
  children: React.ReactNode;
}

export default function AboutSection({
  id,
  background = "primary",
  animation = "fade-up",
  children,
}: AboutSectionProps) {
  const bgClass = { /* existing */ }[background];
  const animClass = {
    "fade-up": "scroll-fade-up",
    "slide-right": "scroll-slide-right",
    "scale-in": "scroll-scale-in",
  }[animation];

  return (
    <section id={id} className={`${bgClass} py-spacing-9 lg:py-spacing-10 ${animClass}`}>
      {children}
    </section>
  );
}
```

#### 3. Apply varied animations on `app/about/page.tsx`
**File**: `app/about/page.tsx`
**Changes**: Pass alternating `animation` props to `<AboutSection>` instances.
- `overview` → `animation="fade-up"` (default, no change needed)
- `episode-structure` → `animation="slide-right"`
- `safety` → `animation="scale-in"`
- `faq` → `animation="slide-right"`
- `host-guide` → `animation="fade-up"`
- `apply` → `animation="scale-in"`

#### 4. Apply varied animations on `app/partners/page.tsx`
**File**: `app/partners/page.tsx`
**Changes**:
- Header keeps `scroll-fade-up`
- Aviation Organizations section changes to `scroll-slide-right`
- Host Company Profiles section changes to `scroll-scale-in`

#### 5. Add `content-visibility` to below-fold sections
**File**: `app/globals.css`
**Changes**: Add after the animation blocks.

```css
.content-visibility-auto {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}
```

Then apply `content-visibility-auto` to the Featured Episodes section on Home and to non-hero sections on Partners.

### Success Criteria:

#### Automated Verification:
- [x] `npm run build` completes without errors
- [x] `npm run lint` passes

#### Manual Verification:
- [ ] Scroll down Home, About, and Partners pages in a motion-enabled browser — sections animate with distinct patterns (fade-up, slide-right, scale-in)
- [ ] Enable "Prefers reduced motion" in OS settings — all animated elements appear instantly without motion
- [ ] DevTools Performance tab shows no main-thread jank during scroll

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation that animations look correct and respect reduced motion before proceeding to Phase 2.

---

## Phase 2: Mobile Navigation — Keyboard Support, Focus Trap, and `inert`

### Overview
Fix the mobile menu so it is fully operable via keyboard, follows WCAG disclosure pattern recommendations, and does not leak focus to background content when open.

### Changes Required:

#### 1. Add `useEffect` keydown listener and focus trap in `Navigation.tsx`
**File**: `components/Navigation.tsx`
**Changes**: Add `useRef` for mobile nav container, `useEffect` for Escape key and focus trap.

```tsx
import { useEffect, useRef } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const { state, setMobileMenuOpen } = useUIState();
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Escape to close
  useEffect(() => {
    if (!state.mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
      // Focus trap: Tab cycles within mobile nav
      if (e.key === "Tab" && mobileNavRef.current) {
        const focusable = mobileNavRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    // Store previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;
    // Focus first link in menu
    const firstLink = mobileNavRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [state.mobileMenuOpen, setMobileMenuOpen]);

  // Return focus to toggle button when closing
  useEffect(() => {
    if (!state.mobileMenuOpen && menuButtonRef.current) {
      menuButtonRef.current.focus();
    }
  }, [state.mobileMenuOpen]);
```

Then attach `ref={menuButtonRef}` to the `<button>` and `ref={mobileNavRef}` to the mobile nav `<div>`.

#### 2. Add `aria-hidden` / `inert` to closed mobile nav
**File**: `components/Navigation.tsx`
**Changes**: On the mobile nav `<div>` (line 78-84), add:

```tsx
<div
  id="mobile-nav"
  ref={mobileNavRef}
  className={...}
  aria-hidden={!state.mobileMenuOpen}
  inert={!state.mobileMenuOpen ? "" : undefined}
>
```

**Note**: React 19 supports the `inert` boolean prop natively.

#### 3. Mark hamburger bars as decorative
**File**: `components/Navigation.tsx`
**Changes**: Add `aria-hidden="true"` to the three `<span>` bars inside the mobile menu button (lines 71-73).

### Success Criteria:

#### Automated Verification:
- [x] `npm run build` passes
- [x] `npm run lint` passes

#### Manual Verification:
- [ ] Tab to mobile menu button, press Enter/Space → menu opens, focus moves to first link
- [ ] Press Tab repeatedly → focus cycles within menu links only (focus trap)
- [ ] Press Escape → menu closes, focus returns to toggle button
- [ ] Close menu, run axe DevTools → no "aria-hidden-focus" or "focusable-content" violations on `#mobile-nav`

**Implementation Note**: Pause for manual confirmation of keyboard navigation flow before proceeding.

---

## Phase 3: Semantic Markup, ARIA, and Accessible Descriptions

### Overview
Fix heading hierarchy violations, add missing ARIA attributes, and improve accessible descriptions for dynamic/video content.

### Changes Required:

#### 1. Fix heading hierarchy on Home page
**File**: `app/page.tsx`
**Changes**: Change `h3` to `h2` for "Explore by Career Path" (line 64) and "Explore by STEM Subject" (line 81). Use `text-h4` styling if the visual size must stay smaller, but keep semantic `h2`.

```tsx
<h2 className="font-heading text-h4 text-text-primary mb-3">
  Explore by Career Path
</h2>
```

#### 2. Fix heading hierarchy on Episodes page
**File**: `components/FilterGroup.tsx`
**Changes**: Change `h3` to `h2` with `text-h4` styling (line 16).

```tsx
<h2 className="font-heading text-h4 text-text-primary mb-3">{title}</h2>
```

#### 3. Add `aria-current="page"` to active nav links
**File**: `components/Navigation.tsx`
**Changes**: Add `aria-current={active ? "page" : undefined}` to desktop nav `<Link>` (line 39-58) and mobile nav `<Link>` (line 89-101).

#### 4. Mark scroll indicator as decorative
**File**: `app/page.tsx`
**Changes**: Add `aria-hidden="true"` to the scroll indicator wrapper `<div>` (line 47).

#### 5. Add accessible label to video player
**File**: `components/VideoPlayer.tsx`
**Changes**: Add `aria-label` to the outer container.

```tsx
<div
  className="relative aspect-video bg-navy-900 rounded-md overflow-hidden"
  aria-label="Video player"
  role="region"
>
```

#### 6. Add `aria-busy` to video player loader
**File**: `components/VideoPlayerLoader.tsx`
**Changes**: Add `aria-busy="true"` to the loading placeholder.

```tsx
<div
  className="aspect-video bg-navy-900 rounded-md flex items-center justify-center"
  aria-busy="true"
  aria-label="Loading video player"
>
```

#### 7. Programmatic focus after filter changes
**File**: `components/EpisodesBrowse.tsx`
**Changes**: Add a `ref` to the results container and focus it after filters change. This ensures screen-reader users land on the updated results.

```tsx
const resultsRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (resultsRef.current) {
    resultsRef.current.focus();
  }
}, [filteredEpisodes.length, activeFilterCount]);
```

Then add `tabIndex={-1}` and `ref={resultsRef}` to the wrapper around the episode grid / empty state:

```tsx
<div ref={resultsRef} tabIndex={-1} aria-live="polite">
  {/* existing results count, grid, empty state */}
</div>
```

**Note**: Move the `aria-live` paragraph inside this wrapper or keep it as-is; the key is that the container receives focus so screen-reader users know results updated.

### Success Criteria:

#### Automated Verification:
- [x] `npm run build` passes
- [x] `npm run lint` passes

#### Manual Verification:
- [ ] axe DevTools reports zero "heading-order" violations on Home and Episodes pages
- [ ] axe DevTools reports zero "aria-required-attr" or "aria-valid-attr-value" violations
- [ ] Screen reader (VoiceOver/NVDA) announces "current page" on active nav link
- [ ] Screen reader does not announce scroll indicator
- [ ] After toggling a filter, focus moves to results count/area and live region announces updated count
- [ ] Video player region is labeled "Video player" in rotor/landmarks list

**Implementation Note**: Pause for manual confirmation of heading and ARIA fixes before proceeding.

---

## Phase 4: Image Performance, Touch Targets, and CSS Performance Hints

### Overview
Optimize Largest Contentful Paint (LCP) by prioritizing above-the-fold images, ensure all interactive elements meet WCAG 2.1 AA touch target requirements (min 44 px), and add CSS hints for smoother rendering.

### Changes Required:

#### 1. Add `priority` to above-the-fold images
**File**: `components/EpisodeCard.tsx`
**Changes**: Add optional `priority` prop.

```tsx
interface EpisodeCardProps {
  episode: Episode;
  priority?: boolean;
}

export default function EpisodeCard({ episode, priority }: EpisodeCardProps) {
  // ...
  <Image
    src={episode.thumbnail}
    alt={`Thumbnail for ${episode.title}`}
    fill
    className="object-cover ..."
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    priority={priority}
  />
```

**File**: `app/page.tsx`
**Changes**: Pass `priority` to the first episode card in the grid (line 98-100).

```tsx
{episodes.map((episode, index) => (
  <EpisodeCard
    key={episode.slug}
    episode={episode}
    priority={index === 0}
  />
))}
```

**File**: `app/episodes/[slug]/page.tsx`
**Changes**: Pass `priority` to related episode cards if they are above the fold (line 75). Since related episodes appear mid-page, `priority` is not needed here.

#### 2. Audit and fix touch targets
**File**: `components/FilterTag.tsx`
**Changes**: Increase padding to meet 44 px minimum. Current: `px-3 py-1`. New:

```tsx
const baseClasses =
  "inline-flex items-center justify-center font-heading text-label uppercase tracking-widest px-4 py-2 min-h-[44px] rounded-full transition-all duration-fast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
```

**File**: `components/Tag.tsx`
**Changes**: Same padding and `min-h-[44px]` increase.

```tsx
const baseClasses =
  "inline-flex items-center justify-center font-heading text-label uppercase tracking-widest px-4 py-2 min-h-[44px] rounded-full transition-colors duration-fast";
```

**File**: `components/Navigation.tsx`
**Changes**: Ensure mobile menu button is at least 44 px. Add `min-h-[44px] min-w-[44px]` to the `<button>` (line 63).

**File**: `components/Footer.tsx`
**Changes**: Footer links (`text-body-sm`) may be below 44 px depending on line height. Add `min-h-[44px] inline-flex items-center` to footer `<Link>` and `<a>` elements (lines 39-44, 58-65).

**File**: `app/page.tsx`
**Changes**: CTA button `px-6 py-3` with 18 px text is roughly 42 px tall. Add `min-h-[44px] inline-flex items-center` to the hero CTA `<Link>` (line 38-43).

#### 3. Add `will-change` to animated elements
Already handled in Phase 1 via `will-change: transform, opacity` on `.scroll-fade-up`, `.scroll-slide-right`, and `.scroll-scale-in`.

#### 4. Add `content-visibility: auto` to below-fold sections
**File**: `app/page.tsx`
**Changes**: Add `content-visibility-auto` class to the Featured Episodes `<section>` (line 55).

**File**: `app/about/page.tsx`
**Changes**: This is trickier because `AboutSection` wraps `<section>`. Add `content-visibility-auto` to `AboutSection` when not the first section. Modify `AboutSection` to accept a `contentVisibility` boolean prop, default `false`, and apply `content-visibility-auto` when true. Then set it on all `AboutSection` instances except `overview`.

**File**: `app/partners/page.tsx`
**Changes**: Add `content-visibility-auto` to Aviation Organizations and Host Companies sections.

### Success Criteria:

#### Automated Verification:
- [x] `npm run build` passes
- [x] `npm run lint` passes

#### Manual Verification:
- [ ] Lighthouse Performance score ≥ 90 on Home page (LCP should be ≤ 2.5 s)
- [ ] DevTools Elements panel: `<Image>` for first episode on Home has `fetchpriority="high"`
- [ ] DevTools tap targets overlay: no red warnings for FilterTag, Tag, footer links, or mobile menu button
- [ ] DevTools Performance: scrolling shows no main-thread paint cost for below-fold sections (compositor-only)
- [ ] Layout does not break at 320 px, 768 px, 1024 px, 1440 px, and 1536 px viewports

---

## Testing Strategy

### Manual Testing Steps (per page):
1. **Homepage** — Verify hero animations, scroll indicator hidden from AT, first image prioritized, tag touch targets ≥ 44 px.
2. **Episodes** — Verify heading hierarchy, filter keyboard operability, focus management after toggle, results live region.
3. **Episode Detail** — Verify video player labeled, loader has `aria-busy`, related cards render correctly.
4. **About** — Verify varied scroll animations on sections, TOC keyboard navigation, no heading skips.
5. **Partners** — Verify varied scroll animations, external links have accessible text, card touch targets.
6. **Navigation (all pages)** — Verify Escape closes mobile menu, focus trap, focus return, `aria-current="page"`.
7. **Reduced Motion** — Enable OS reduced motion; verify all scroll/keyframe animations disabled, content visible immediately.
8. **Responsive** — Test at 320 px, 640 px, 768 px, 1024 px, 1280 px, 1536 px. No horizontal scroll, no text overflow, readable line lengths.

### Lighthouse Targets (manual run):
- Performance ≥ 90
- Accessibility ≥ 90
- Best Practices ≥ 90

---

## Performance Considerations

- `will-change: transform, opacity` is applied only to elements with scroll-driven animations. This promotes them to their own compositor layers, reducing paint cost during scroll.
- `content-visibility: auto` defers layout and paint for below-fold sections until they enter the viewport, reducing initial render time. `contain-intrinsic-size` provides a placeholder size to prevent scrollbar jumping.
- `priority` on the first `EpisodeCard` image tells the browser to fetch it early, improving LCP.
- No new JS bundles or animation libraries are added; all animations remain CSS-native.

---

## References

- Original ticket: `thoughts/shared/tickets/TICKET-007.md`
- Design tokens: `thoughts/design_tokens.md`
- Design document: `thoughts/design_document.md`
- Research findings: `thoughts/research_findings.md`
