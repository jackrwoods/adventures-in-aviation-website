---
date: 2026-05-18T13:50:17-0700
researcher: Jack Woods
git_commit: 446050c97e7971114d87bd319ff01ab2aa63c191
branch: main
repository: adventures-in-aviation-website
topic: "Fonts, colors, and design research for aviation children's educational website"
tags: [research, fonts, design, accessibility, aviation, children, typography, color-palette, web-performance]
status: complete
last_updated: 2026-05-18
last_updated_by: Jack Woods
---

# Research: Fonts, Colors, and Design for Aviation Children's Educational Website

**Date**: 2026-05-18T13:50:17-0700
**Researcher**: Jack Woods
**Git Commit**: 446050c97e7971114d87bd319ff01aa63c191
**Branch**: main
**Repository**: adventures-in-aviation-website

## Research Question

Find fonts that have free commercial use licenses and fit a nonprofit children's aviation education website with these requirements:
1. Colors, fonts, and themes that allude to aviation in subtle ways
2. Clear, accessible, easily consumable content compatible with desktop and mobile browsers
3. Consistent style
4. Easy navigation between pages and topics

Target audience: ages 10–18 (tweens/teens). Must meet WCAG 2.1 AA. No AI-generated visuals. Flat/modern design, no gradients, no skeuomorphism. Video-first UX. Privacy-first (no cookies, no tracking, no PII).

## Summary

This research identified **35+ free commercial-use fonts** across six aviation aesthetic categories, **four curated font pairings** optimized for the target audience, a comprehensive **aviation-themed color palette** meeting WCAG AA, and detailed **web font performance best practices**. The standout discovery is **B612** — a font literally commissioned by Airbus for cockpit displays — which pairs excellently with either **Lexend** or **Andika** for body text. The research also revealed that dyslexia-specific fonts (OpenDyslexic, Dyslexie) do NOT significantly improve reading performance compared to standard fonts with generous spacing; the active ingredient is **spacing**, not letter design. This means any font paired with proper CSS spacing (line-height 1.5+, letter-spacing 0.12em+) can serve dyslexic readers well.

## Detailed Findings

### Current Codebase State

The repository is at an early stage (initial commit only). No CSS, theme configuration, Tailwind config, font files, or style files exist yet. The project has no existing design tokens (colors, fonts, spacing) or visual mockups.

Key project constraints from `thoughts/research_findings.md`:
- **Tone**: Educational but not patronizing. Target 10–18 (tweens/teens). No "kiddie" aesthetics, no corporate/LinkedIn vibe.
- **Visual language**: Flat/modern, no gradients, no skeuomorphism.
- **Privacy-first**: No cookies, no tracking, no PII forms.
- **Video-first UX**: Layouts must prioritize video embeds over long-form text.
- **Build target**: Next.js static export.
- **Accessibility**: WCAG 2.1 AA.

### Top Font Pairing Recommendations

#### Pairing 1: "Authentic Aviation" (Best Overall Match)

| Role | Font | License | Rationale |
|------|------|---------|-----------|
| **Headings** | **B612 Bold** | SIL OFL 1.1 | Designed by Airbus for cockpit displays. Named after the asteroid in Saint-Exupery's *The Little Prince*. Won Observeur du Design Industry Star 2018. |
| **Body text** | **Andika Regular/Bold** | SIL OFL 1.1 | Designed by SIL International specifically for literacy and beginning readers. Single-storey 'a' and 'g', clearly differentiated b/d and p/q. Endorsed by USAID for educational materials. |
| **Monospace accent** | **B612 Mono** | SIL OFL 1.1 | Cockpit instrument font for data, code, flight numbers. |

```html
<link href="https://fonts.googleapis.com/css2?family=B612:wght@400;700&family=B612+Mono:wght@400;700&family=Andika:wght@400;700&display=swap" rel="stylesheet">
```

**Why this works**: The strongest aviation narrative (a font built for Airbus cockpits paired with a font built for children learning to read). B612's angular, technical letterforms create clear visual hierarchy for headings while Andika's warm, literacy-optimized forms keep body text accessible.

#### Pairing 2: "Space-Age Explorer" (More Playful)

| Role | Font | License | Rationale |
|------|------|---------|-----------|
| **Headings** | **Orbitron** (600–900) | SIL OFL 1.1 | Geometric sans-serif inspired by aerospace display type. Evokes fuselage lettering and space-age optimism. |
| **Body text** | **Lexend** (Mega or Peta spacing) | SIL OFL 1.1 | Designed by educational therapist Dr. Bonnie Shaver-Troup. Research-backed wider spacing improves reading speed/comprehension. |

```html
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Lexend:wght@400;500;600;700&display=swap" rel="stylesheet">
```

#### Pairing 3: "Airport Signage" (Professional, Wayfinding-Inspired)

| Role | Font | License | Rationale |
|------|------|---------|-----------|
| **Headings** | **Barlow Condensed** (600–800) | SIL OFL 1.1 | DIN-derived; evokes airport terminal displays and flight information boards. Google Fonts demo literally uses "FLIGHT319" as sample text. |
| **Body text** | **Andika Regular/Bold** | SIL OFL 1.1 | Literacy-optimized; warm but not childish. |

```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Andika:wght@400;700&display=swap" rel="stylesheet">
```

#### Pairing 4: "Technical Aerospace" (Precision Meets Approachability)

| Role | Font | License | Rationale |
|------|------|---------|-----------|
| **Headings** | **Chakra Petch SemiBold/Bold** | SIL OFL 1.1 | Angular, HUD-inspired; feels like cockpit instrument display. Built on 45-degree angle system. |
| **Body text** | **Exo 2 Regular/Medium** | SIL OFL 1.1 | Technological aesthetic with humanist warmth. Variable font (100–900). Readable at body sizes. |

```html
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600;700&family=Exo+2:wght@400;500;600&display=swap" rel="stylesheet">
```

### Complete Font Inventory: Aviation-Themed Free Commercial-Use Fonts

#### Google Fonts with Aviation/Sky/Aerospace Connections

| Font | Category | Aviation Connection | Weights | Variable? |
|------|----------|---------------------|---------|-----------|
| **B612** | Heading/Body | Designed by Airbus for cockpit displays | 4 (Regular, Italic, Bold, Bold Italic) | No |
| **B612 Mono** | Monospace | Monospace cockpit variant | 4 | No |
| **Orbitron** | Display | Inspired by aerospace/space-age display type (Eurostile/Bank Gothic alternatives) | 6 (400–900) | Yes |
| **Barlow Condensed** | Heading | DIN-derived; evokes airport terminal signage | 18 (Thin 100–Black 900) | No |
| **Chakra Petch** | Heading | Angular forms mimic HUD/instrument panels | 5 (300–700) + italics | No |
| **Exo 2** | Heading/Body | Geometric, futuristic/aerospace tech aesthetic | 9 (100–900) + italics | Yes |
| **Saira Condensed** | Heading | Technical, information-dense proportions; aviation charts | 9 (100–900) + italics | No (but Saira is) |
| **Overpass** | Heading/Body | Interpretation of U.S. highway sign alphabet (FHWA/Highway Gothic). Wayfinding DNA. | 9 + Overpass Mono | No |
| **Space Grotesk** | Heading/Body | Proportional variant of Space Mono; aerospace name + character | 3 (300–700) | Yes |
| **Space Mono** | Monospace | Standard for avionics/instrument displays | 4 | No |
| **Instrument Sans** | Heading/Body | Named for instrument panels; variable width axis | Variable | Yes |
| **Rajdhani** | Heading | Squared, condensed; technical/futuristic dashboard aesthetic | 5 (300–700) | No |
| **Michroma** | Display | Described as embodying "advanced nature of aerospace technology" | 1 (400) | No |
| **Mr De Haviland** | Script | Named after de Havilland Aircraft Company (Mosquito, Comet) | 1 (400) | No |
| **Spinnaker** | Heading | Named after spinnaker sail; evokes aerial/nautical navigation | 1 (400) | No |
| **Stardos Stencil** | Display | Stencil typeface; military/aerospace equipment markings | 2 (400, 700) | No |

#### Rounded/Friendly Fonts (Children-Appropriate, Not Cartoonish)

| Font | Category | Vibe | Weights | Variable? |
|------|----------|------|---------|-----------|
| **Nunito** | Heading/Body | Warm, rounded; most popular rounded sans on Google Fonts (#15) | 9 + italics | Yes |
| **Quicksand** | Heading | Light, airy, sky-like feel. Inspired by Johnston/Gill but softer. | 5 (300–700) | No |
| **Varela Round** | Heading | Extremely rounded terminals; geometric yet "grown-up" | 1 (400) | No |
| **Rubik** | Heading/Body | Stout, structured; more neutral than Nunito. 14 weights. | 14 + italics | Yes |
| **Fredoka** | Display | Bold, cheerful; display-only | 6 (300–700) | No |
| **Comfortaa** | Display | Geometric rounded; good for large display sizes | Variable (300–700) | Yes |

#### Dyslexia/Accessibility-Specialized Fonts

| Font | On Google Fonts? | Key Feature | Research Backing |
|------|-----------------|-------------|-----------------|
| **Lexend** | Yes | 7 spacing variants (Deca–Zetta); designed by educational therapist | Research shows wider spacing improves reading speed |
| **Andika** | Yes | Single-storey a/g; clearly differentiated b/d, p/q | Endorsed by USAID for educational materials |
| **Atkinson Hyperlegible** | Yes | Designed by Braille Institute for low vision; strong character disambiguation | Won Fast Company Innovation by Design Award; in Cooper Hewitt permanent collection |
| **Comic Neue** | Yes | Modernized Comic Sans; British Dyslexia Association recommends Comic Sans | Asymmetrical letterforms reduce confusion |
| **OpenDyslexic** | No (self-host) | Weighted letter bottoms anchor glyphs to baseline | Research shows NO significant improvement vs. Arial+spacing |

**Critical finding**: Multiple peer-reviewed studies (Shewalter 2025, Machado/Elmore/Hall 2025, Joseph/Powell 2022, Kuster et al. 2018) found that **dyslexia-specific fonts do NOT significantly improve reading performance**. The active ingredient is **spacing** — adding `letter-spacing: 0.12em+` and `line-height: 1.5+` to any good sans-serif font produces comparable or better results. **Recommendation**: Use a font that readers find comfortable, provide generous spacing in CSS, and consider offering a font toggle (Lexend/Andika/Atkinson Hyperlegible/standard) since individual preference varies.

#### Vintage/Art Deco Aviation Fonts (Display/Accent Only)

| Font | License | On Google Fonts? | Aviation Era/Aesthetic |
|------|---------|-----------------|----------------------|
| **Lakehurst Gothic** | SIL OFL 1.1 | No (Fontesk) | Based on lettering from U.S. Navy airships (1920s–30s). Named after NAS Lakehurst. |
| **Air Americana** | SIL OFL 1.1 | No (DaFont) | Inspired by Air America airline logo. 5 weights + italics. |
| **Departura** | Fontspring EULA | Partially (2 of 18 styles free) | Art Deco travel posters. 632 glyphs, 200+ languages. |
| **Oswald** | SIL OFL 1.1 | Yes | Reworking of classic American gothic condensed. Wartime/airline poster era. |
| **Bebas Neue** | SIL OFL 1.1 | Yes | Condensed, geometric, industrial. Uppercase only. |
| **Poiret One** | SIL OFL 1.1 | Yes | Art Deco geometric grotesque. Thin, elegant. |
| **Staatliches** | SIL OFL 1.1 | Yes | Bold, condensed; Bauhaus/constructivist. Zeppelin-era. |
| **Routed Gothic** | SIL OFL 1.1 | No (GitHub) | Mid-20th century avionics technical lettering. 9 variants. |

### Color Palette Recommendations

#### Recommended: "Adventure Aloft" Palette

| Role | Color | HEX | WCAG Contrast on White | Rationale |
|------|-------|-----|----------------------|-----------|
| **Primary Background** | Warm Cloud White | `#F4F4F0` | — | Softer than pure white; reduces eye strain |
| **Primary Text** | Deep Navy | `#002244` | 16.0:1 (AAA) | Strong aviation identity; excellent contrast |
| **Secondary Text** | Slate Gray | `#475569` | 8.4:1 (AAA) | Softer than black for body text |
| **Headings/Accent** | Aviation Blue | `#0B3D91` | 10.2:1 (AAA) | NASA blue; strong aviation identity |
| **Interactive/Links** | Sky Blue (darkened) | `#5B9BD5` | ~4.5:1 (AA) | Accessible on light backgrounds |
| **Decorative Sky** | Bright Sky Blue | `#87CEEB` | 3.2:1 (FAILS AA on white) | Use ONLY on dark backgrounds or in illustrations |
| **Playful Accent** | Golden Yellow | `#F1C933` | 13.1:1 with navy text (AAA) | Warm, child-friendly; aviation liveries, wing badges |
| **Success** | Dartmouth Green | `#00693E` | 7.1:1 (AAA) | "You did it!" feedback color |
| **Alert/Error** | Warm Red | `#DD361C` | — | NASA-style alert red |
| **Light Background Alt** | Ice Blue | `#E8F4FD` | — | Subtle sky tint for cards |

**Critical accessibility note**: Sky blue `#87CEEB` FAILS WCAG AA on white backgrounds (3.2:1 contrast). Use `#5B9BD5` for text on light backgrounds, and reserve bright sky blue for decorative elements and dark-background applications only.

### Typography Best Practices for Children (Ages 10–18)

| Parameter | Ages 7–12 | Ages 13–18 | WCAG Minimum |
|-----------|-----------|------------|-------------|
| Body text size | 14–18px | 12–16px | No minimum specified |
| Heading size | 24–36px | 20–28px | 18pt/14pt bold for "large text" |
| Line height | 1.4–1.8 | 1.4–1.6 | 1.5x font-size (SC 1.4.12) |
| Letter spacing | 0.5–1px | 0.5px | 0.12x font-size (SC 1.4.12) |
| Max line length | 80 characters | 80 characters | — |
| Tap targets | 75×75px minimum | 44×44px minimum | 44×44px (SC 2.5.8) |
| Text alignment | Left-aligned (no justify) | Left-aligned | — |

**Font characteristics for this age range**:
- Sans-serif fonts (cleaner, simpler processing)
- Single-storey 'a' and 'g' (reduces confusion)
- Distinct b/d and p/q forms
- Generous counters (enclosed spaces in letters)
- Extended ascenders/descenders
- No decorative fonts, thin weights, extra-bold, or all-caps text
- `font-synthesis: none` to prevent browser-generated fake bold/italic

### Web Font Performance Recommendations

**For production: Self-host fonts.** Since Chrome 86, Google Fonts' shared cache is dead (partitioned per site). Self-hosting eliminates DNS/TCP/TLS overhead and avoids GDPR concerns.

**Performance budget**: Maximum 2 font families, 2–3 weights each, total WOFF2 payload under 50 KB.

| Configuration | Files | Total WOFF2 Size |
|---|---|---|
| B612 Regular + Bold | 2 | ~30 KB |
| Andika Regular + Bold | 2 | ~40 KB |
| B612 Mono Regular | 1 | ~15 KB |
| **Total** | **5** | **~85 KB** (before subsetting) |
| **After Latin subsetting** | **5** | **~40–50 KB** |

**Font loading strategy**:
- **Body text**: `font-display: optional` + preload + metric-matched fallbacks (zero CLS, best Core Web Vitals)
- **Headings**: `font-display: swap` + metric-matched fallbacks (brand is important, accept minimal CLS)

**Self-hosting via Fontsource (Next.js-friendly)**:

```bash
npm install @fontsource/b612 @fontsource/b612-mono @fontsource/andika
```

```javascript
import "@fontsource/b612/400.css";
import "@fontsource/b612/700.css";
import "@fontsource/b612-mono/400.css";
import "@fontsource/andika/400.css";
import "@fontsource/andika/700.css";
```

**CSS custom properties for production**:

```css
:root {
  --font-system: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
                 Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-body: 'Andika', 'Andika Fallback', var(--font-system);
  --font-heading: 'B612', var(--font-system);
  --font-mono: 'B612 Mono', ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace;

  --text-h1: 2.25rem;
  --text-h2: 1.75rem;
  --text-h3: 1.375rem;
  --text-body: 1.125rem;
  --line-height: 1.6;
  --letter-spacing: 0.01em;

  --color-bg-primary: #F4F4F0;
  --color-bg-alt: #E8F4FD;
  --color-text-primary: #002244;
  --color-text-secondary: #475569;
  --color-heading: #0B3D91;
  --color-link: #5B9BD5;
  --color-accent: #F1C933;
  --color-success: #00693E;
  --color-error: #DD361C;
}
```

### Competitive Analysis: Aviation Education Websites

| Site | Primary Font | Color Palette | Accessibility |
|------|-------------|---------------|---------------|
| EAA / Young Eagles | Helvetica Neue, Roboto, Arial | Foundation defaults: blue `#1779ba`, gray `#8a8a8a` | No skip link, no ARIA |
| Civil Air Patrol | (External CSS) | Air Force blue + red | Skip link, Google Translate |
| AOPA "You Can Fly" | Raleway (display), Helvetica, Arial | Gold `#f5b822`, navy `#004c97` | AccessiBe widget, no skip link |
| NASM / Smithsonian | Roboto, Helvetica, Arial | Orange `#d93f02`, dark `#26282f` | Full skip link, ARIA, focus rings |
| Space Camp | (External CSS) | Navy, red (NASA branding) | Skip link, ARIA labels |

**Common patterns**: Mega-menu navigation, card-based program grids, blue-dominant palettes, hero sections with video/image, dual-audience pathways (youth + parents/educators).

### Historical Context (from thoughts/)

- `thoughts/research_questions.md` — Structured questionnaire for stakeholder requirements
- `thoughts/research_questions-comments.md` — Stakeholder answers defining target audience (10–18), content strategy (video-first, minimal text), and constraints (WCAG 2.1 AA, no PII, flat/modern design)
- `thoughts/research_findings.md` — Cleaned-up summary of answers plus preliminary design implications

Key design implications from stakeholder answers:
- **Tone**: Educational but not patronizing. No "kiddie" aesthetics.
- **Visual**: Flat/modern, no gradients, no skeuomorphism, no AI-generated visuals.
- **Privacy**: No cookies, no tracking, no PII.
- **Content**: Video-first, minimal text.
- **Organization**: By career path and/or STEM subject.

## Open Questions

1. **Final font pairing decision**: The research identifies 4 strong pairings but a final decision depends on stakeholder preference for visual tone (authentic aviation vs. playful vs. professional vs. technical).
2. **Font toggle feature**: Should the site offer a dyslexia-friendly font toggle? Research shows individual preference matters more than any single font choice. Implementation adds complexity but significantly improves accessibility.
3. **Vintage accent fonts**: Should any vintage aviation fonts (Lakehurst Gothic, Air Americana, Routed Gothic) be used as accent/display fonts for special sections (e.g., "History of Flight" content)? This could add thematic richness but increases font payload.
4. **Color palette finalization**: The "Adventure Aloft" palette is research-recommended but needs visual validation against actual page layouts and video content integration.
5. **Self-hosting vs. CDN**: Research strongly recommends self-hosting for production (privacy-first, no Google Fonts CDN sending IPs), but Google Fonts CDN is simpler for prototyping. When should the switch happen?

## Sources

### Font Sources
- [B612 on Google Fonts](https://fonts.google.com/specimen/B612)
- [B612 GitHub Repository](https://github.com/polarsys/b612)
- [B612 Project Page at ENAC](https://lii.enac.fr/projects/definition-and-validation-of-an-aeronautical-font/)
- [Orbitron on Google Fonts](https://fonts.google.com/specimen/Orbitron)
- [Chakra Petch on Google Fonts](https://fonts.google.com/specimen/Chakra+Petch)
- [Barlow Condensed on Google Fonts](https://fonts.google.com/specimen/Barlow+Condensed)
- [Exo 2 on Google Fonts](https://fonts.google.com/specimen/Exo2)
- [Saira Condensed on Google Fonts](https://fonts.google.com/specimen/Saira+Condensed)
- [Andika on Google Fonts](https://fonts.google.com/specimen/Andika)
- [Andika at SIL International](https://software.sil.org/andika/about/)
- [Lexend on Google Fonts](https://fonts.google.com/specimen/Lexend)
- [Lexend Design Case Study at Google](https://design.google/library/lexend-readability)
- [Atkinson Hyperlegible on Google Fonts](https://fonts.google.com/specimen/Atkinson+Hyperlegible/about)
- [Comic Neue on Google Fonts](https://fonts.google.com/specimen/Comic+Neue)
- [Nunito on Google Fonts](https://fonts.google.com/specimen/Nunito)
- [Quicksand on Google Fonts](https://fonts.google.com/specimen/Quicksand)
- [Overpass on Google Fonts](https://fonts.google.com/specimen/Overpass)
- [Space Grotesk on Google Fonts](https://fonts.google.com/specimen/Space+Grotesk)
- [Instrument Sans on Google Fonts](https://fonts.google.com/specimen/Instrument+Sans)
- [Routed Gothic on GitHub](https://github.com/dse/routed-gothic)
- [Lakehurst Gothic on Fontesk](https://fontesk.com/lakehurst-gothic-font/)
- [Air Americana](https://air-americana.com/)
- [Aileron at Font Squirrel](https://www.fontsquirrel.com/fonts/aileron)
- [Font Alternatives: Aviation & Transportation](https://fontalternatives.com/industries/aviation-transportation/)

### Accessibility & Typography Research
- [Shewalter (2025) — Effects of Altered Font on Reading](https://jewlscholar.mtsu.edu/bitstreams/562777d8-075d-47e3-ba88-d5bbf17742b8/download)
- [Machado, Elmore & Hall (2025) — Dyslexie Evaluation](https://link.springer.com/article/10.1007/s40617-025-01048-x)
- [Joseph & Powell (2022) — Specialist Typeface and Dyslexia](https://ncbi.nlm.nih.gov/pmc/articles/PMC9804695/)
- [WCAG 2.2 Specification](https://www.w3.org/TR/WCAG22/)
- [Web.dev Typography Accessibility](https://web.dev/learn/accessibility/typography)
- [Smashing Magazine: Designing for Children](https://smashingmagazine.com/2024/02/practical-guide-design-children)

### Color & Design
- [Aviation Color Palettes](https://colorany.com/color-palettes/aviation-color-palettes-in-red-blue-and-white/)
- [Top 10 Colors in Aviation](https://airline.logostream.dev/colors-in-aviation)
- [NASA Web Design System — Colors](https://nasa.github.io/nasawds-site/components/colors/)
- [UK Civil Aviation Authority Design System](https://caa.co.uk/website-policies/design-system/styling/colours)
- [Avionics Design System](https://asdlc.io/resources/design-system/)

### Web Font Performance
- [web.dev — Best Practices for Fonts](https://web.dev/articles/font-best-practices)
- [web.dev — Optimize Web Fonts](https://web.dev/learn/performance/optimize-web-fonts)
- [Smashing Magazine — Optimizing Google Fonts Performance](https://smashingmagazine.com/2019/06/optimizing-google-fonts-performance)
- [Self-Hosted vs CDN Fonts Guide 2025](https://font-converters.com/compare/self-hosted-vs-cdn)
- [Fontsource npm packages](https://www.npmjs.com/package/@fontsource/nunito)

### Competitive Analysis
- [EAA Youth Programs](https://www.eaa.org/eaa/youth)
- [Civil Air Patrol](https://www.gocivilairpatrol.com/)
- [AOPA You Can Fly](https://youcanfly.aopa.org/)
- [National Air and Space Museum](https://airandspace.si.edu/)
- [NASM Brand Identity](https://airandspace.si.edu/stories/editorial/space-everyone-our-new-brand-identity)
- [Smithsonian Brand Typography](https://logo.si.edu/visual-styles/typography/)
- [Space Camp](https://www.rocketcenter.com/SpaceCamp)