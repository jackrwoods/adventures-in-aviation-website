# Partners & Resources Page Implementation Plan

## Overview

Replace the placeholder `/partners` page with a full Partners & Resources page listing external aviation organizations (EAA, AOPA, FAA) and host company placeholders. All external links open safely in new tabs with descriptive link text and screen-reader-friendly announcements. The footer already contains direct external partner links, satisfying that acceptance criterion without additional changes.

## Current State Analysis

- Placeholder page exists at `app/partners/page.tsx:1-10` with "Coming soon..." copy and a static `h1`.
- Footer (`components/Footer.tsx:50-69`) already links externally to EAA, AOPA, FAA with `target="_blank" rel="noopener noreferrer"`.
- No reusable `PartnerCard`, `ExternalLink`, or screen-reader-only utility component exists.
- Static data pattern is established: `lib/about-data.ts` exports typed arrays consumed by `app/about/page.tsx`.
- Design tokens are fully defined in `app/globals.css` Tailwind v4 `@theme` block.
- Reusable `SectionHeader` component exists at `components/SectionHeader.tsx:1-15`.

## Desired End State

- `/partners` renders a full page with:
  - Page header (`h1` + subtitle)
  - "Aviation Organizations" section with 3 partner cards (EAA, AOPA, FAA)
  - "Host Company Profiles" section with 2 placeholder cards
  - Each card: name (`h3`), description (`text-body`), external link with descriptive text
  - Links open in new tab with `rel="noopener noreferrer"` and screen-reader "opens in new tab" announcement
  - Consistent page container (`max-w-content mx-auto px-gutter lg:px-gutter-lg py-10 lg:py-16`)
  - Section backgrounds alternate between `bg-primary` and `bg-secondary`
  - Scroll-driven entrance animations (`scroll-fade-up`) on sections
- Footer partner links remain unchanged (already compliant).
- axe-core scan passes with 0 violations.
- Lighthouse Accessibility score ≥ 90.

### Key Discoveries:
- Tailwind v4 `sr-only` class is available for screen-reader-only link announcements — no custom CSS needed.
- Existing pages use `lg:grid lg:grid-cols-12 lg:gap-8` for sidebar layouts, but this page does not need a TOC/sidebar; a simple stacked layout with alternating section backgrounds is sufficient.
- The `SectionHeader` component is already the right primitive for section intros.

## What We're NOT Doing

- No footer changes — acceptance criterion #4 is already satisfied.
- No new npm dependencies — Tailwind utilities cover all needs.
- No real host company data — only named placeholders.
- No search, filter, or sort on partners.
- No partner logos or images — text-only cards for now.
- No dark-mode section backgrounds — this page uses `bg-primary` / `bg-secondary` alternation like `/about`.

## Implementation Approach

Follow the established data-first pattern:
1. Define typed static data in a new `lib/partners-data.ts`.
2. Build two dumb reusable components: `ExternalLink` (accessible new-tab link) and `PartnerCard`.
3. Assemble the page in `app/partners/page.tsx`, consuming data and components.
4. Verify with axe-core and Lighthouse.

All styling draws from the global Tailwind theme — no raw hex codes, no ad-hoc margins.

---

## Phase 1: Data Layer

### Overview
Create `lib/partners-data.ts` exporting typed partner arrays for both sections.

### Changes Required:

#### 1. New file: `lib/partners-data.ts`
**File**: `lib/partners-data.ts`
**Changes**: Define `Partner` type and two arrays — `aviationOrganizations` and `hostCompanies`.

```ts
export type Partner = {
  name: string;
  url: string;
  description: string;
};

export const aviationOrganizations: Partner[] = [
  {
    name: "Experimental Aircraft Association (EAA)",
    url: "https://www.eaa.org",
    description:
      "The Experimental Aircraft Association is a community of pilots and builders dedicated to growing participation in aviation through education, safety, and historic preservation.",
  },
  {
    name: "Aircraft Owners and Pilots Association (AOPA)",
    url: "https://www.aopa.org",
    description:
      "AOPA is the largest community of pilots in the world, protecting the freedom to fly while promoting aviation safety and education for pilots of all experience levels.",
  },
  {
    name: "Federal Aviation Administration (FAA)",
    url: "https://www.faa.gov",
    description:
      "The FAA regulates all aspects of civil aviation in the United States, from pilot certification to airspace management, ensuring the safest and most efficient aerospace system in the world.",
  },
];

export const hostCompanies: Partner[] = [
  {
    name: "AeroTech Industries",
    url: "#",
    description:
      "Placeholder profile for a future host company. AeroTech Industries represents the kind of aerospace manufacturer that opens its doors to student fellows.",
  },
  {
    name: "Skyway Flight Services",
    url: "#",
    description:
      "Placeholder profile for a future host company. Skyway Flight Services illustrates how regional operators can become classrooms for the next generation of aviators.",
  },
];
```

### Success Criteria:

#### Automated Verification:
- [x] File exists: `lib/partners-data.ts`
- [x] TypeScript compilation passes: `npx tsc --noEmit`
- [x] Types are exported and importable

#### Manual Verification:
- [ ] Data covers EAA, AOPA, FAA with accurate URLs
- [ ] Descriptions are factual and appropriate for the 10–18 audience

---

## Phase 2: Component Layer

### Overview
Build `ExternalLink` and `PartnerCard` components. Both are pure, prop-driven, and reusable.

### Changes Required:

#### 1. New file: `components/ExternalLink.tsx`
**File**: `components/ExternalLink.tsx`
**Changes**: Accessible external anchor with `target="_blank"`, `rel="noopener noreferrer"`, and a screen-reader-only "opens in new tab" label.

```tsx
interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}
```

#### 2. New file: `components/PartnerCard.tsx`
**File**: `components/PartnerCard.tsx`
**Changes**: Card wrapper with `h3` name, `text-body` description, and `ExternalLink` call-to-action styled as `text-link` with underline.

```tsx
import ExternalLink from "./ExternalLink";
import type { Partner } from "@/lib/partners-data";

interface PartnerCardProps {
  partner: Partner;
}

export default function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <article className="bg-bg-card border border-border rounded-md p-6 space-y-4 hover:shadow-sm transition-shadow duration-fast">
      <h3 className="font-heading text-h3 text-text-primary">
        {partner.name}
      </h3>
      <p className="text-body text-text-secondary">
        {partner.description}
      </p>
      <ExternalLink
        href={partner.url}
        className="text-body text-text-link underline underline-offset-4 hover:text-text-link-hover transition-colors duration-fast"
      >
        Visit {partner.name}
      </ExternalLink>
    </article>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] TypeScript compilation passes: `npx tsc --noEmit`
- [x] No lint errors: `npx eslint <files>` (Next.js lint had CLI arg parsing issue; `next build` also passed)

#### Manual Verification:
- [ ] `ExternalLink` renders an `<a>` with correct attributes
- [ ] Screen-reader text "(opens in new tab)" is present in DOM but visually hidden
- [ ] `PartnerCard` renders all props correctly

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation that components render correctly in isolation before proceeding to the next phase.

---

## Phase 3: Page Layer

### Overview
Replace the placeholder `app/partners/page.tsx` with the full page layout, consuming data from `lib/partners-data.ts` and rendering sections with alternating backgrounds.

### Changes Required:

#### 1. Replace file: `app/partners/page.tsx`
**File**: `app/partners/page.tsx`
**Changes**: Full page with header, two `SectionHeader` + card-grid sections, and `scroll-fade-up` animations.

```tsx
import PartnerCard from "@/components/PartnerCard";
import SectionHeader from "@/components/SectionHeader";
import {
  aviationOrganizations,
  hostCompanies,
} from "@/lib/partners-data";

export default function PartnersPage() {
  return (
    <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg py-10 lg:py-16">
      {/* Page header */}
      <header className="mb-10 lg:mb-16 scroll-fade-up">
        <h1 className="font-heading text-h1 text-text-primary mb-4">
          Partners & Resources
        </h1>
        <p className="text-body text-text-secondary max-w-text">
          Aviation organizations and host companies that make Adventures in Aviation possible. Each link opens in a new tab so you can explore without losing your place.
        </p>
      </header>

      {/* Aviation Organizations */}
      <section className="py-spacing-9 lg:py-spacing-10 scroll-fade-up">
        <SectionHeader
          title="Aviation Organizations"
          description="Established institutions that support student pathways into aviation through education, certification, and community."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aviationOrganizations.map((partner) => (
            <PartnerCard key={partner.url} partner={partner} />
          ))}
        </div>
      </section>

      {/* Host Company Profiles */}
      <section className="py-spacing-9 lg:py-spacing-10 bg-bg-secondary -mx-gutter lg:-mx-gutter-lg px-gutter lg:px-gutter-lg scroll-fade-up">
        <SectionHeader
          title="Host Company Profiles"
          description="Companies that open their facilities to student fellows for tours, interviews, and hands-on experiences."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostCompanies.map((partner) => (
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </div>
      </section>
    </div>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] `next build` completes without errors
- [x] TypeScript compilation passes: `npx tsc --noEmit`
- [x] Linting passes: `npx eslint <files>` (Next.js lint had CLI arg parsing issue; `next build` also passed)
- [x] Static export includes `/partners.html` in `out/`

#### Manual Verification:
- [ ] Page renders at `/partners` with correct heading hierarchy (`h1` → `h2` → `h3`)
- [ ] Aviation Organizations section shows 3 cards
- [ ] Host Company Profiles section shows 2 placeholder cards
- [ ] Each external link opens in a new tab
- [ ] Screen-reader text "(opens in new tab)" is announced
- [ ] Keyboard navigation (Tab) reaches every link
- [ ] Alternating section background is visible (Host Companies has `bg-bg-secondary`)
- [ ] Scroll fade-up animation triggers on section entry (if motion is not reduced)

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation that the page renders correctly in a browser before proceeding to the next phase.

---

## Phase 4: Verification

### Overview
Run accessibility and quality checks to ensure compliance with acceptance criteria.

### Changes Required:

#### 1. axe-core scan
**Run**: Install and run axe-core DevTools (browser extension) or `@axe-core/cli` against the built `/partners.html`.

```bash
# If using axe-core CLI (optional)
npx @axe-core/cli http://localhost:3000/partners --exit
```

#### 2. Lighthouse audit
**Run**: Open built page in Chrome DevTools → Lighthouse → Accessibility.

### Success Criteria:

#### Automated Verification:
- [ ] axe-core reports 0 violations
- [ ] Lighthouse Accessibility score ≥ 90

#### Manual Verification:
- [ ] Link text is descriptive (e.g., "Visit Federal Aviation Administration (FAA)", not "click here")
- [ ] No raw hex codes or one-off margins in the page or components
- [ ] Footer partner links still work correctly (no regression)

---

## Testing Strategy

### Unit Tests:
- Not required — this is a static page with no interactive logic beyond external links.

### Integration Tests:
- Not required — no API or state management.

### Manual Testing Steps:
1. Navigate to `/partners`
2. Verify `h1` reads "Partners & Resources"
3. Tab through the page; confirm focus rings appear on every link
4. Activate an external link; confirm it opens in a new tab
5. Run axe-core DevTools; confirm 0 violations
6. Run Lighthouse; confirm Accessibility ≥ 90
7. Shrink viewport to 320px; confirm cards stack in a single column without overflow
8. Enable `prefers-reduced-motion: reduce`; confirm animations are disabled

## Performance Considerations

- Page is static HTML with no JS bundles for interactivity — minimal overhead.
- `scroll-fade-up` uses CSS `animation-timeline: view()` (progressive enhancement); browsers that do not support it simply show content immediately with no layout shift.
- No images or videos on this page — fast First Contentful Paint.

## Migration Notes

- The placeholder `app/partners/page.tsx` is fully replaced; no migration of existing data or state needed.
- Footer partner links are unchanged; no migration there.

## References

- Original ticket: `thoughts/shared/tickets/TICKET-006.md`
- Design tokens: `thoughts/design_tokens.md`
- Existing data pattern: `lib/about-data.ts`
- Existing page pattern: `app/about/page.tsx`
- Footer component: `components/Footer.tsx`
- Global styles: `app/globals.css`
