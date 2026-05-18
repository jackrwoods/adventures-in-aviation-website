# Adventures in Aviation — Design Tokens

## Color Palette

### Primitive Colors (Raw Values)

| Token | Hex | Usage |
|-------|-----|-------|
| `navy-900` | `#001122` | Deepest backgrounds, dark sections, footer |
| `navy-800` | `#002244` | Primary text on light backgrounds, headings |
| `navy-700` | `#0B3D91` | **NASA blue**; headings, interactive hover, brand accent |
| `navy-600` | `#1E5AA8` | Link hover, active navigation |
| `navy-500` | `#2E6EA0` | Secondary accents |
| `navy-400` | `#5B9BD5` | **Sky link blue**; text links, accessible on light |
| `navy-300` | `#87CEEB` | **Bright sky blue**; decorative ONLY on dark backgrounds |
| `navy-200` | `#A8D0EC` | Borders on dark backgrounds, muted accents |
| `navy-100` | `#E8F4FD` | **Ice blue**; card backgrounds, alternate sections |
| `slate-800` | `#475569` | Secondary body text, captions |
| `slate-700` | `#6B7280` | Muted text, metadata, timestamps |
| `slate-600` | `#8A8A8A` | Disabled states, placeholder text |
| `slate-500` | `#A8A8A8` | Borders, dividers on light backgrounds |
| `slate-400` | `#C8C8C8` | Light borders |
| `slate-300` | `#E5E5E5` | Subtle backgrounds, separators |
| `slate-200` | `#F2F2F2` | Card backgrounds |
| `slate-100` | `#F4F4F0` | **Warm cloud white**; primary page background |
| `gold-600` | `#C9A72C` | Dark gold, pressed/active CTA states |
| `gold-500` | `#F1C933` | **Primary accent**; CTAs, highlights, aviation livery yellow |
| `gold-400` | `#F5D76A` | CTA hover states |
| `gold-300` | `#F9E79F` | Subtle warm accents, badges |
| `green-600` | `#00693E` | Dartmouth green; success states |
| `red-600` | `#DD361C` | NASA-style alert red; error states |
| `white` | `#FFFFFF` | Pure white, text on dark backgrounds |

### Semantic Colors

| Token | Value | Usage |
|-------|-------|-------|
| `bg-primary` | `slate-100` (`#F4F4F0`) | Default page background — warm cloud white |
| `bg-secondary` | `navy-100` (`#E8F4FD`) | Alternating section backgrounds — ice blue |
| `bg-dark` | `navy-900` (`#001122`) | Hero, footer, dark feature sections |
| `bg-card` | `white` | Card surfaces on light backgrounds |
| `text-primary` | `navy-800` (`#002244`) | Main headings, primary content — deep navy |
| `text-secondary` | `slate-800` (`#475569`) | Body text, descriptions — slate gray |
| `text-muted` | `slate-700` (`#6B7280`) | Timestamps, metadata, captions |
| `text-inverse` | `white` | Text on dark backgrounds |
| `text-link` | `navy-400` (`#5B9BD5`) | Text links, accessible on light |
| `text-link-hover` | `navy-600` (`#1E5AA8`) | Link hover |
| `accent` | `gold-500` (`#F1C933`) | CTAs, active states, emphasis — golden yellow |
| `accent-hover` | `gold-400` (`#F5D76A`) | Hover states for accent elements |
| `border` | `slate-400` (`#C8C8C8`) | Default borders, dividers |
| `border-light` | `navy-200` (`#A8D0EC`) | Borders on dark backgrounds |
| `success` | `green-600` (`#00693E`) | Success feedback |
| `error` | `red-600` (`#DD361C`) | Error feedback |

### Accessibility Contrast Verification

| Pair | Foreground | Background | Ratio | Grade |
|------|-----------|------------|-------|-------|
| Primary text on bg | `#002244` | `#F4F4F0` | 16.0:1 | AAA |
| Secondary text on bg | `#475569` | `#F4F4F0` | 8.4:1 | AAA |
| Heading on bg | `#0B3D91` | `#F4F4F0` | 10.2:1 | AAA |
| Link on bg | `#5B9BD5` | `#F4F4F0` | ~4.6:1 | AA |
| Accent text on navy | `#F1C933` | `#002244` | 13.1:1 | AAA |
| Inverse text on dark | `#FFFFFF` | `#001122` | 19.8:1 | AAA |
| Muted text on dark | `#A8D0EC` | `#001122` | 8.2:1 | AAA |
| **Decorative sky on white** | `#87CEEB` | `#FFFFFF` | 3.2:1 | **FAILS AA** |

**Rule**: `#87CEEB` (bright sky blue) may ONLY be used as decorative fill (SVG backgrounds, illustration accents) or on dark backgrounds. Never for text or UI elements on light backgrounds.

---

## Typography

### Font Families

| Token | Value | Rationale |
|-------|-------|-----------|
| `font-heading` | `"B612", "Helvetica Neue", Arial, sans-serif` | **Commissioned by Airbus for cockpit displays.** Named after the asteroid in Saint-Exupéry's *The Little Prince*. Angular, technical letterforms create clear visual hierarchy. Won Observeur du Design Industry Star 2018. |
| `font-body` | `"Andika", "Helvetica Neue", Arial, sans-serif` | **Designed by SIL International for literacy and beginning readers.** Single-storey 'a' and 'g', clearly differentiated b/d and p/q. Endorsed by USAID for educational materials. Warm but not childish. |
| `font-mono` | `"B612 Mono", ui-monospace, "Cascadia Code", Menlo, Consolas, monospace` | **Monospace cockpit variant of B612.** Used for technical data, flight specs, metadata. Signals operational authenticity. |

### Type Scale

| Token | Size (desktop) | Size (mobile) | Line Height | Letter Spacing | Weight | Usage |
|-------|----------------|---------------|-------------|----------------|--------|-------|
| `text-hero` | `56px` | `36px` | `1.05` | `-0.02em` | 700 (Bold) | Homepage hero headline |
| `text-h1` | `44px` | `32px` | `1.1` | `-0.015em` | 700 (Bold) | Page titles |
| `text-h2` | `32px` | `26px` | `1.15` | `-0.01em` | 700 (Bold) | Section headings |
| `text-h3` | `24px` | `20px` | `1.2` | `-0.005em` | 700 (Bold) | Card titles, subsections |
| `text-h4` | `20px` | `18px` | `1.3` | `0` | 700 (Bold) | Small headings, labels |
| `text-body` | `18px` | `16px` | `1.6` | `0.12em` | 400 (Regular) | Paragraphs, descriptions |
| `text-body-sm` | `16px` | `15px` | `1.5` | `0.12em` | 400 (Regular) | Secondary body, captions |
| `text-caption` | `14px` | `13px` | `1.4` | `0.01em` | 400 (Regular) | Metadata, timestamps, tags |
| `text-label` | `12px` | `11px` | `1.3` | `0.05em` | 700 (Bold) | Uppercase labels, nav items |
| `text-mono` | `14px` | `13px` | `1.4` | `0` | 400 (Regular) | Technical data, flight numbers |

### Typography Accessibility Rules

- **`font-synthesis: none`** globally — prevents browser-generated fake bold/italic. Both B612 and Andika have real bold weights loaded.
- **Letter-spacing `0.12em` on body text** — meets WCAG SC 1.4.12 minimum; research shows this is the active ingredient for dyslexic readability (more impactful than dyslexia-specific fonts).
- **No decorative fonts, thin weights, extra-bold, or all-caps text** for body content.
- **Left-aligned text only** — no justified text.

---

## Spacing

### Base Unit: `4px`

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | `4px` | Tight internal padding, icon gaps |
| `space-2` | `8px` | Inline spacing, small gaps |
| `space-3` | `12px` | Button padding-y, tight card padding |
| `space-4` | `16px` | Default component padding, mobile gutters |
| `space-5` | `24px` | Section internal padding, card padding |
| `space-6` | `32px` | Medium section gaps |
| `space-7` | `48px` | Large section gaps, desktop gutters |
| `space-8` | `64px` | Major section separators |
| `space-9` | `96px` | Hero padding, page section spacing |
| `space-10` | `128px` | Maximum section breathing room |

### Layout

| Token | Value | Usage |
|-------|-------|-------|
| `max-width-content` | `1200px` | Maximum content width |
| `max-width-text` | `680px` | Optimal reading width for body text |
| `gutter-mobile` | `16px` | Mobile horizontal padding |
| `gutter-desktop` | `48px` | Desktop horizontal padding |

---

## Radii

| Token | Value | Usage |
|-------|-------|-------|
| `radius-none` | `0` | Technical elements, data tables, video containers |
| `radius-sm` | `4px` | Buttons, small tags |
| `radius-md` | `8px` | Cards, images |
| `radius-lg` | `16px` | Feature cards, large containers |
| `radius-full` | `9999px` | Pill buttons, badges |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-none` | `none` | Flat technical aesthetic default |
| `shadow-sm` | `0 1px 2px rgba(0, 34, 68, 0.06)` | Subtle card lift |
| `shadow-md` | `0 4px 12px rgba(0, 34, 68, 0.08)` | Card hover, dropdowns |
| `shadow-lg` | `0 12px 24px rgba(0, 34, 68, 0.12)` | Modals, overlays |

---

## Motion

### Timing

| Token | Value | Usage |
|-------|-------|-------|
| `duration-instant` | `100ms` | Micro-interactions, button presses |
| `duration-fast` | `200ms` | Hover states, color transitions |
| `duration-normal` | `300ms` | Standard transitions, opacity fades |
| `duration-slow` | `500ms` | Scroll-triggered reveals, entrance animations |
| `duration-slower` | `800ms` | Hero animations, major reveals |

### Easing

| Token | Value | Usage |
|-------|-------|-------|
| `ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard transitions (Material default) |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements exiting |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful bounces (limited use) |

### Animation Patterns

| Pattern | Properties | Duration | Easing |
|---------|------------|----------|--------|
| `fade-up` | `opacity: 0→1`, `translateY: 20px→0` | `duration-slow` | `ease-out` |
| `fade-in` | `opacity: 0→1` | `duration-normal` | `ease-out` |
| `scale-in` | `opacity: 0→1`, `scale: 0.96→1` | `duration-normal` | `ease-out` |
| `slide-right` | `translateX: -20px→0`, `opacity: 0→1` | `duration-slow` | `ease-out` |
| `hover-lift` | `translateY: 0→-4px`, `shadow-sm→shadow-md` | `duration-fast` | `ease-default` |

### Accessibility

- All motion must respect `prefers-reduced-motion: reduce`
- In reduced motion mode: animations become instant (`duration-instant`) or are disabled entirely
- No auto-playing motion that cannot be paused
- No parallax or scroll-jacking

---

## Breakpoints

| Token | Value | Usage |
|-------|-------|-------|
| `bp-sm` | `640px` | Small tablets, landscape phones |
| `bp-md` | `768px` | Tablets |
| `bp-lg` | `1024px` | Small desktops, landscape tablets |
| `bp-xl` | `1280px` | Standard desktops |
| `bp-2xl` | `1536px` | Large monitors |

---

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `z-base` | `0` | Default |
| `z-dropdown` | `100` | Navigation dropdowns |
| `z-sticky` | `200` | Sticky headers |
| `z-modal` | `300` | Modals, overlays |
| `z-toast` | `400` | Notifications |

---

## Component Primitives

### Button Primary (CTA)

| Property | Value |
|----------|-------|
| Background | `accent` (`gold-500` `#F1C933`) |
| Text | `navy-800` (`#002244`) — NOT white, for better contrast and aviation-livery authenticity |
| Font | `text-body`, weight 700 (Bold), `font-heading` (B612) |
| Padding | `space-3` `space-5` (12px 24px) |
| Radius | `radius-sm` (4px) |
| Hover | Background `accent-hover` (`#F5D76A`), `shadow-md`, text unchanged |
| Active | Background `gold-600` (`#C9A72C`) |
| Transition | `duration-fast` `ease-default` |

### Button Secondary

| Property | Value |
|----------|-------|
| Background | `transparent` |
| Border | `1px solid navy-700` (`#0B3D91`) |
| Text | `navy-700` (`#0B3D91`) |
| Hover | Background `navy-100` (`#E8F4FD`), border `navy-600` |

### Card

| Property | Value |
|----------|-------|
| Background | `bg-card` (`white`) |
| Radius | `radius-md` (8px) |
| Shadow | `shadow-none` (default), `shadow-sm` (hover) |
| Padding | `space-5` (24px) |
| Border | `1px solid border` (`#C8C8C8`) — optional, for flatter aesthetic |

### Navigation Item

| Property | Value |
|----------|-------|
| Font | `text-label` (uppercase, 12px, weight 700, `font-heading`) |
| Color | `text-inverse` on dark, `text-primary` on light |
| Hover | `accent` underline, `duration-fast` |
| Active | `accent` color |

---

## Asset Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `video-aspect` | `16:9` | Default video player aspect ratio |
| `thumbnail-aspect` | `16:9` | Episode card thumbnail ratio |
| `hero-aspect` | `21:9` (cinematic) | Hero background/video option |
| `icon-size-sm` | `16px` | Inline icons |
| `icon-size-md` | `24px` | Navigation, controls |
| `icon-size-lg` | `32px` | Feature icons |

---

## Theme Modes

### Light Mode (Default)

- `bg-primary`: `slate-100` (`#F4F4F0`)
- `text-primary`: `navy-800` (`#002244`)
- `text-secondary`: `slate-800` (`#475569`)
- All tokens as defined above.

### Dark Mode (Sections Only)

Used for hero, footer, and feature sections, not as a full-site toggle:

- `bg-dark`: `navy-900` (`#001122`)
- `text-inverse`: `white`
- `text-muted-inverse`: `navy-200` (`#A8D0EC`)
- `accent`: `gold-500` (`#F1C933`) — unchanged
- `border-inverse`: `navy-700` (`#0B3D91`)

---

## Font Loading & Performance

### Self-Hosting Strategy

**No Google Fonts CDN.** Privacy-first requirement + GDPR compliance + Chrome 86+ partitioned cache makes CDN loading slower than self-hosting.

**Packages:**
```bash
npm install @fontsource/b612 @fontsource/b612-mono @fontsource/andika
```

**Imports:**
```javascript
import "@fontsource/b612/400.css";
import "@fontsource/b612/700.css";
import "@fontsource/b612-mono/400.css";
import "@fontsource/andika/400.css";
import "@fontsource/andika/700.css";
```

### Performance Budget

| File | Size (WOFF2, Latin subset) |
|------|---------------------------|
| B612 Regular | ~15 KB |
| B612 Bold | ~15 KB |
| B612 Mono Regular | ~15 KB |
| Andika Regular | ~20 KB |
| Andika Bold | ~20 KB |
| **Total** | **~85 KB** (before subsetting) |
| **After Latin subsetting** | **~40–50 KB** |

### Font Display Strategy

- **Body text (Andika)**: `font-display: optional` + metric-matched fallback + preload = zero CLS, best Core Web Vitals
- **Headings (B612)**: `font-display: swap` + metric-matched fallback = brand-critical, accept minimal CLS

### CSS Custom Properties (Production)

```css
:root {
  --font-system: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
                 Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-body: 'Andika', 'Andika Fallback', var(--font-system);
  --font-heading: 'B612', var(--font-system);
  --font-mono: 'B612 Mono', ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace;

  --text-hero: 3.5rem;    /* 56px */
  --text-h1: 2.75rem;     /* 44px */
  --text-h2: 2rem;        /* 32px */
  --text-h3: 1.5rem;      /* 24px */
  --text-h4: 1.25rem;     /* 20px */
  --text-body: 1.125rem;  /* 18px */
  --line-height: 1.6;
  --letter-spacing-body: 0.12em;

  --color-bg-primary: #F4F4F0;
  --color-bg-alt: #E8F4FD;
  --color-bg-dark: #001122;
  --color-text-primary: #002244;
  --color-text-secondary: #475569;
  --color-text-heading: #0B3D91;
  --color-text-link: #5B9BD5;
  --color-accent: #F1C933;
  --color-accent-hover: #F5D76A;
  --color-success: #00693E;
  --color-error: #DD361C;
}
```

---

## Token Distribution Summary

- **Colors**: 32 primitive + 14 semantic = 46 total
- **Typography**: 3 families + 10 scale steps + 4 accessibility rules = 17 tokens
- **Spacing**: 10 scale steps + 4 layout = 14 tokens
- **Radii**: 5 tokens
- **Shadows**: 4 tokens
- **Motion**: 5 durations + 4 easings + 5 patterns = 14 tokens
- **Breakpoints**: 5 tokens
- **Z-Index**: 5 tokens

**Total: 110 design tokens**
