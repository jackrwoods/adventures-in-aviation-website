# TICKET-005: Program Info — About Page Implementation Plan

## Overview

Replace the placeholder `/about` page with a full, scannable, anchored program-info page that explains how Adventures in Aviation operates. The page will host six sections with a sticky table of contents, alternating backgrounds, and authentic copy drawn from the grant proposal.

## Current State Analysis

- `app/about/page.tsx` exists as a placeholder heading + "Coming soon" paragraph.
- Navigation already links to `/about` (`components/Navigation.tsx:10`).
- The global stylesheet (`app/globals.css`) defines all required tokens: `bg-bg-primary`, `bg-bg-secondary`, `text-h2`, `text-body`, `font-heading`, spacing scale, etc.
- Reusable components exist: `SectionHeader`, `Tag`, `EpisodeCard`, but none for long-form content sections, TOCs, or step lists.
- No test suite or axe-core is currently configured; verification will rely on `npm run build`, `npm run lint`, and manual Lighthouse.

## Desired End State

A single `/about` page containing:
1. **Program Overview** (`#overview`)
2. **4-Step Episode Structure** (`#episode-structure`)
3. **Safety Briefing** (`#safety`)
4. **FAQ** (`#faq`)
5. **Host Guide** (`#host-guide`)
6. **Application Info** (`#apply`)

Each section is:
- Reachable via anchor links (`/about#safety`).
- Styled with alternating `bg-bg-primary` / `bg-bg-secondary` backgrounds.
- Built from dumb, reusable components receiving data via props.
- Preceded by a sticky TOC on desktop and an inline/collapsible TOC on mobile.

## What We're NOT Doing

- No contact forms (no PII collection per `thoughts/research_findings.md` §4).
- No backend or API routes — this is a static page.
- No animations beyond existing `scroll-fade-up` utility.
- No new dependencies; we use existing Tailwind v4 + React.

## Implementation Approach

1. Build three new reusable components: `AboutSection` (wrapper with id + background), `TableOfContents` (sticky/inline nav), and `StepList` (numbered or checklist items).
2. Populate the page with copy drawn from the grant proposal brand analysis (`thoughts/shared/research/2026-05-18-aia-proposal-brand-analysis.md`).
3. Keep all content data in a TypeScript constant file (`lib/about-data.ts`) so the page file remains pure view logic.
4. Update `app/about/page.tsx` to compose the sections and TOC.
5. Verify static export, lint, and Lighthouse accessibility.

## Phase 1: Reusable Components and Data Layer

### Overview
Create the component primitives and data constants needed by the About page.

### Changes Required:

#### 1. `lib/about-data.ts` — Central Content Store
**File**: `lib/about-data.ts` (new)
**Changes**: Export typed constants for all six sections: title, id, description, and body items.

```typescript
export type Step = {
  title: string;
  description: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type ChecklistItem = {
  label: string;
  detail?: string;
};

export const aboutSections = [
  {
    id: "overview",
    title: "Program Overview",
    background: "primary" as const,
    content: /* ... mission copy ... */,
  },
  /* ... five more sections ... */
];
```

#### 2. `components/AboutSection.tsx` — Section Wrapper
**File**: `components/AboutSection.tsx` (new)
**Changes**: Wrapper that accepts `id`, `background` (`"primary" | "secondary" | "dark"`), and children. Applies alternating background class, `py-spacing-9 lg:py-spacing-10`, and `scroll-fade-up`.

```tsx
interface AboutSectionProps {
  id: string;
  background?: "primary" | "secondary" | "dark";
  children: React.ReactNode;
}

export default function AboutSection({ id, background = "primary", children }: AboutSectionProps) {
  const bgClass = {
    primary: "bg-bg-primary",
    secondary: "bg-bg-secondary",
    dark: "bg-bg-dark",
  }[background];

  return (
    <section id={id} className={`${bgClass} py-spacing-9 lg:py-spacing-10 scroll-fade-up`}>
      <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg">
        {children}
      </div>
    </section>
  );
}
```

#### 3. `components/TableOfContents.tsx` — TOC Nav
**File**: `components/TableOfContents.tsx` (new)
**Changes**: Accepts an array of `{ id, title }`. Renders a sticky sidebar on desktop (`lg:sticky lg:top-24`) and a collapsible details/summary block on mobile. Uses Next.js `<Link>` with `href={`#${id}`}` for smooth anchor navigation.

Per CLAUDE.md rule 3 (no local state in components), mobile open/close should use a prop or context. Since this is a single-page concern, we'll accept `mobileOpen?: boolean` and `onToggle?: () => void` props, driven by a thin controller in the page or `UIStateProvider`.

```tsx
interface TOCItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
  mobileOpen?: boolean;
  onToggle?: () => void;
}
```

#### 4. `components/StepList.tsx` — Numbered / Checklist Items
**File**: `components/StepList.tsx` (new)
**Changes**: Accepts `steps: Step[]` and an optional `variant: "numbered" | "checklist"`. Renders as an ordered list or unordered list with check icons.

```tsx
interface StepListProps {
  steps: Step[];
  variant?: "numbered" | "checklist";
}
```

### Success Criteria:

#### Automated Verification:
- [x] `npm run build` completes without errors.
- [x] `npm run lint` passes with no new errors.
- [x] TypeScript compiles (`npx tsc --noEmit` or equivalent).

#### Manual Verification:
- [ ] Components render in isolation without runtime errors.
- [ ] `AboutSection` correctly applies `id` and background classes.
- [ ] `TableOfContents` links scroll to correct anchors.

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful before proceeding to Phase 2.

---

## Phase 2: About Page Composition and Content

### Overview
Compose the six sections into `app/about/page.tsx`, populate copy from the grant proposal, and wire the TOC.

### Changes Required:

#### 1. `app/about/page.tsx` — Full Page
**File**: `app/about/page.tsx`
**Changes**: Complete rewrite. Imports `aboutSections` data, renders a page header + `TableOfContents` + six `AboutSection` instances.

Section content (derived from `thoughts/shared/research/2026-05-18-aia-proposal-brand-analysis.md`):

1. **Program Overview** (`#overview`, `bg-primary`)
   - Heading: "Program Overview"
   - Body: Mission statement + dual-crisis framing (talent shortage + perception gap).
   - Key phrase: "The sky is not the limit, it's the classroom."

2. **4-Step Episode Structure** (`#episode-structure`, `bg-secondary`)
   - Heading: "The 4-Step Episode Structure"
   - `StepList` (numbered):
     1. *The Arrival* — Jet lands; 10 students meet flight crew on the tarmac.
     2. *The Insight Session* — 10-on-1 interview with the company Principal.
     3. *The Immersive Tour* — Behind-the-scenes facility tour with hands-on Q&A.
     4. *The Departure & Digital Legacy* — Jet takeoff, tease next episode; content distributed via YouTube, schools, and planetariums.

3. **Safety Briefing** (`#safety`, `bg-primary`)
   - Heading: "Safety Briefing"
   - `StepList` (checklist):
     - **EYES UP** — Situational awareness at all times.
     - **STAY WITH THE CREW** — Never wander off alone on the tarmac.
     - **HEARING PROTECTION** — PPE required near running engines.
     - **NO TOUCHING** — Hands off unless explicitly invited.
     - **REPRESENT** — You are ambassadors for your school and community.

4. **FAQ** (`#faq`, `bg-secondary`)
   - Heading: "Frequently Asked Questions"
   - Simple Q&A list using `text-h4` for questions and `text-body` for answers.
   - Sample questions (from proposal FAQ):
     - Who can participate?
     - How is content distributed?
     - What does it cost a host company?
     - How do you measure impact?

5. **Host Guide** (`#host-guide`, `bg-primary`)
   - Heading: "Host Participation Guide"
   - Checklist of what host companies provide:
     - Facility access for film crew and 10 students.
     - A company Principal (CEO/Lead Engineer/Chief Pilot) for the Insight Session.
     - A behind-the-scenes tour route (hangar, lab, control room, etc.).
     - Tarmac or ramp access for jet arrival/departure footage.
   - Timeline: Pre-flight call → Arrival day → Episode release → Digital legacy.

6. **Application Info** (`#apply`, `bg-secondary`)
   - Heading: "Apply to Be a Student Fellow"
   - Who: STEM students aged 14–18 with teacher recommendation.
   - How: Short essay + teacher nomination (no online form per privacy rules — direct outreach via schools).
   - What to expect: One landing for 10 students becomes a lesson for 10,000.

#### 2. `lib/ui-state.tsx` — TOC Mobile Toggle State
**File**: `lib/ui-state.tsx`
**Changes**: Add `aboutTocOpen: boolean` and `setAboutTocOpen(value: boolean)` to the global UI state. This keeps component state out of `TableOfContents` per CLAUDE.md rule 3.

### Success Criteria:

#### Automated Verification:
- [x] `npm run build` completes without errors.
- [x] `npm run lint` passes.
- [x] All anchor IDs are unique and valid HTML.
- [x] No TypeScript errors.

#### Manual Verification:
- [ ] All 6 sections are present and visible.
- [ ] Section anchors work as direct links (`/about#safety`).
- [ ] TOC is sticky on desktop and collapsible on mobile.
- [ ] Alternating background colors are visually distinct.
- [ ] Content is scannable: uses headings, lists, short paragraphs.
- [ ] axe-core scan passes (can be run via browser DevTools).
- [ ] Lighthouse: Accessibility ≥ 90.

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful before proceeding to Phase 3.

---

## Phase 3: Integration Verification & Polish

### Overview
Run final checks, verify static export, and ensure the page fits seamlessly into the existing site architecture.

### Changes Required:

#### 1. `app/layout.tsx` — No Changes Expected
Confirm that `<main id="main-content">` still wraps the page correctly and skip-link focus works.

#### 2. `components/Navigation.tsx` — No Changes Expected
Confirm active state on `/about` still works.

### Success Criteria:

#### Automated Verification:
- [x] `npm run build` produces static HTML in `out/about.html`.
- [x] `npm run lint` passes.
- [x] No console errors on page load.

#### Manual Verification:
- [ ] Page loads correctly from `/about` and `/about.html` in static export.
- [ ] Navigation active state highlights "About" when on this page.
- [ ] Skip-link jumps to `#main-content` and bypasses TOC.
- [ ] Mobile TOC toggle does not interfere with mobile nav hamburger.
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90.

---

## Testing Strategy

### Manual Testing Steps:
1. Navigate to `/about` and verify all six section headings render.
2. Click each TOC link and confirm smooth scroll to the correct section.
3. Open `/about#safety` in a new tab and confirm the page scrolls to Safety.
4. Resize to mobile width; confirm TOC collapses into a summary block.
5. Run Lighthouse audit in Chrome DevTools.
6. Run axe DevTools extension scan.

### Regression Checks:
- Verify `/`, `/episodes`, `/episodes/[slug]`, and `/partners` are unaffected.

## Performance Considerations

- The page is static HTML with no JS bundles beyond the existing shared chunk.
- No images or videos are embedded on this page (text-only), so it should score very high on Performance.
- `scroll-fade-up` animations use CSS only; no JS scroll listeners.

## Migration Notes

- This replaces a placeholder page; no data migration needed.
- The `/about` route already exists in navigation and sitemap (implicitly via Next.js static export).

## References

- Original ticket: `thoughts/shared/tickets/TICKET-005.md`
- Design document: `thoughts/design_document.md` — sections 2 (About / Program Info page), decision 7 (single page)
- Research findings: `thoughts/research_findings.md` — sections 4 (no PII, no contact forms)
- Brand analysis / source copy: `thoughts/shared/research/2026-05-18-aia-proposal-brand-analysis.md`
- Existing placeholder: `app/about/page.tsx`
- Global stylesheet / tokens: `app/globals.css`
