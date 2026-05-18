# Homepage — Mission Hero & Featured Episodes Implementation Plan

## Overview

Build the homepage for Adventures in Aviation: a cinematic hero with background video, mission statement, and a featured episodes grid. Establish the episode data model, card component, and detail page routing pattern that will be reused across the site.

## Current State Analysis

- Next.js 16 static export with Tailwind v4 and full design tokens in `globals.css`
- Hero section exists as a basic dark block with mission text; no video or animation
- No episode data model, types, or mock data
- No episode card component
- No episode detail page (`/episodes/[slug]`)
- Navigation and footer exist; layout wraps pages correctly
- Fontsource packages installed but not imported in layout

## Desired End State

Homepage renders:
1. Full-viewport cinematic hero with looping muted background video, mission headline "A flight plan for aviation's talent crisis.", and CTA
2. Featured Episodes section with 3 mock episodes in a responsive grid (1/2/3 columns)
3. Career path and STEM subject tag navigation linking to `/episodes` with filters
4. Each episode card links to `/episodes/[slug]`
5. All motion respects `prefers-reduced-motion`
6. Lighthouse: Performance ≥ 90, Accessibility ≥ 90

### Key Discoveries:
- `globals.css` already defines all tokens; no raw hex codes needed
- `app/layout.tsx` needs Fontsource imports added
- Static export means `generateStaticParams` is required for dynamic routes
- `next.config.ts` already has `images.unoptimized: true` for static export

## What We're NOT Doing

- Real video assets (use placeholder/looped muted video or poster image)
- Episode filtering logic on `/episodes` page (TICKET-003 scope)
- Video player component (TICKET-004 scope)
- Search functionality
- Newsletter/donation elements
- Real episode content — mock data only

## Implementation Approach

Follow the MVC architecture from CLAUDE.md: central data store, pure view components, thin controller layer. All episode data lives in `lib/data.ts`. Components receive data via props. Page-level components read from the store and pass to views.

## Phase 1: Data Model & Types

### Overview
Define the Episode type and create 3 mock episodes with realistic metadata.

### Changes Required:

#### 1. Create `lib/data.ts`
**File**: `lib/data.ts`
**Changes**: Define `Episode` type and export `episodes` array with 3 mock entries.

```typescript
export type Episode = {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  careerPath: string;
  stemSubject: string;
  duration: string;
  publishedAt: string;
};

export const episodes: Episode[] = [
  {
    slug: "aircraft-manufacturer",
    title: "Wings of Precision: Inside an Aircraft Manufacturer",
    description: "Students tour a major aircraft production facility, meet aerospace engineers, and see how physics and materials science come together to build commercial jets.",
    thumbnail: "/episodes/aircraft-manufacturer.jpg",
    videoUrl: "/videos/aircraft-manufacturer.mp4",
    careerPath: "Aerospace Engineers",
    stemSubject: "Materials Science",
    duration: "12:34",
    publishedAt: "2026-04-15",
  },
  {
    slug: "flight-school",
    title: "First Solo: A Day at Flight School",
    description: "Follow three students through ground school, simulator training, and their first supervised solo flight with certified flight instructors.",
    thumbnail: "/episodes/flight-school.jpg",
    videoUrl: "/videos/flight-school.mp4",
    careerPath: "Pilots",
    stemSubject: "Physics",
    duration: "15:20",
    publishedAt: "2026-04-22",
  },
  {
    slug: "drone-operator",
    title: "Sky Eyes: The World of Commercial Drone Operations",
    description: "Explore the fast-growing field of unmanned aerial systems with professional drone pilots working in agriculture, inspection, and search-and-rescue.",
    thumbnail: "/episodes/drone-operator.jpg",
    videoUrl: "/videos/drone-operator.mp4",
    careerPath: "Drone / UAS Operators",
    stemSubject: "Computer Science",
    duration: "10:45",
    publishedAt: "2026-05-01",
  },
];

export const careerPaths = [
  "Pilots",
  "Aerospace Engineers",
  "Air Traffic Controllers",
  "Aircraft Maintenance Technicians",
  "Drone / UAS Operators",
  "Aviation Meteorologists",
  "Aerospace Medicine / Flight Surgeons",
  "Space Systems Engineers",
] as const;

export const stemSubjects = [
  "Physics",
  "Mathematics",
  "Computer Science",
  "Materials Science",
  "Mechanical Engineering",
  "Electrical / Avionics Engineering",
  "Atmospheric Science / Meteorology",
  "Aeronautical / Astronautical Engineering",
] as const;
```

#### 2. Update `app/layout.tsx`
**File**: `app/layout.tsx`
**Changes**: Add Fontsource imports for B612, B612 Mono, Andika.

### Success Criteria:

#### Automated Verification:
- [x] `npx tsc --noEmit` passes with new types
- [x] `npx eslint .` passes
- [x] `npx next build` completes without errors

#### Manual Verification:
- [ ] `lib/data.ts` exports 3 episodes with all required fields
- [ ] Career paths and STEM subjects match Appendix A of design document

---

## Phase 2: Reusable Components

### Overview
Build `EpisodeCard`, `Tag`, and `SectionHeader` components with full design token compliance.

### Changes Required:

#### 1. Create `components/Tag.tsx`
**File**: `components/Tag.tsx`
**Changes**: Pill-shaped tag component for career path and STEM subject labels.

```tsx
"use client";

import Link from "next/link";

interface TagProps {
  label: string;
  href?: string;
  variant?: "career" | "stem";
}

export default function Tag({ label, href, variant = "career" }: TagProps) {
  const baseClasses =
    "inline-block font-heading text-label uppercase tracking-widest px-3 py-1 rounded-full transition-colors duration-fast";

  const variantClasses =
    variant === "career"
      ? "bg-navy-100 text-navy-700 hover:bg-navy-200"
      : "bg-gold-300 text-navy-800 hover:bg-gold-400";

  const classes = `${baseClasses} ${variantClasses}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return <span className={classes}>{label}</span>;
}
```

#### 2. Create `components/EpisodeCard.tsx`
**File**: `components/EpisodeCard.tsx`
**Changes**: Card with 16:9 thumbnail, title, career tag, STEM tag, hover lift animation.

```tsx
import Link from "next/link";
import Image from "next/image";
import Tag from "./Tag";
import type { Episode } from "@/lib/data";

interface EpisodeCardProps {
  episode: Episode;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <article className="group">
      <Link href={`/episodes/${episode.slug}`} className="block">
        <div className="relative aspect-video rounded-md overflow-hidden mb-4 bg-navy-100">
          <Image
            src={episode.thumbnail}
            alt={`Thumbnail for ${episode.title}`}
            fill
            className="object-cover transition-transform duration-fast ease-default group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <h3 className="font-heading text-h3 text-text-primary mb-2 group-hover:text-text-heading transition-colors duration-fast">
          {episode.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          <Tag label={episode.careerPath} href={`/episodes?career=${encodeURIComponent(episode.careerPath)}`} variant="career" />
          <Tag label={episode.stemSubject} href={`/episodes?stem=${encodeURIComponent(episode.stemSubject)}`} variant="stem" />
        </div>
      </Link>
    </article>
  );
}
```

#### 3. Create `components/SectionHeader.tsx`
**File**: `components/SectionHeader.tsx`
**Changes**: Reusable section heading with optional description.

```tsx
interface SectionHeaderProps {
  title: string;
  description?: string;
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="font-heading text-h2 text-text-primary mb-3">{title}</h2>
      {description && (
        <p className="text-body text-text-secondary max-w-text">{description}</p>
      )}
    </div>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] `npx tsc --noEmit` passes
- [x] `npx eslint .` passes

#### Manual Verification:
- [ ] Episode card renders thumbnail placeholder, title, career tag, STEM tag
- [ ] Card hover applies shadow-sm and slight lift (translateY -4px)
- [ ] Tags are pill-shaped and link to `/episodes?filter=value`
- [ ] All components use design tokens (no raw hex/margins)

---

## Phase 3: Hero Section Enhancement

### Overview
Enhance the hero with a full-viewport background video loop, cinematic entrance animation, and scroll-linked fade.

### Changes Required:

#### 1. Update `app/page.tsx`
**File**: `app/page.tsx`
**Changes**: Replace simple hero with full-viewport cinematic hero including background video, scroll fade animation, and CTA.

### Success Criteria:

#### Automated Verification:
- [x] `npx next build` passes
- [x] No layout shift on page load

#### Manual Verification:
- [ ] Hero fills viewport height on mobile and desktop
- [ ] Background video autoplays, loops, muted (or poster fallback)
- [ ] Mission text readable with sufficient contrast over video
- [ ] Subtle scroll-linked fade effect works smoothly
- [ ] Reduced motion: animation disabled

---

## Phase 4: Featured Episodes Grid

### Overview
Add the featured episodes section below the hero with responsive grid and tag navigation.

### Changes Required:

#### 1. Update `app/page.tsx`
**File**: `app/page.tsx`
**Changes**: Add featured episodes grid with `EpisodeCard` components and career/STEM tag navigation.

### Success Criteria:

#### Automated Verification:
- [x] `npx next build` passes
- [x] Grid validates for 3–8 items (tested with 3 mock episodes)

#### Manual Verification:
- [ ] Grid is 1 column mobile, 2 columns tablet, 3 columns desktop
- [ ] Career/STEM tags navigate to `/episodes` with query params
- [ ] Section uses `bg-primary` (`slate-100`) background
- [ ] Typography uses `text-h3` for card titles, `text-body` for descriptions

---

## Phase 5: Episode Detail Page

### Overview
Create `/episodes/[slug]` dynamic route for individual episode viewing.

### Changes Required:

#### 1. Create `app/episodes/[slug]/page.tsx`
**File**: `app/episodes/[slug]/page.tsx`
**Changes**: Dynamic page using `generateStaticParams` for static export. Displays episode title, description, tags, and placeholder for video player.

```tsx
import { episodes } from "@/lib/data";
import Tag from "@/components/Tag";

export function generateStaticParams() {
  return episodes.map((episode) => ({ slug: episode.slug }));
}

export default function EpisodeDetailPage({ params }: { params: { slug: string } }) {
  const episode = episodes.find((e) => e.slug === params.slug);
  if (!episode) {
    // Static export means this shouldn't happen with valid params,
    // but fallback for type safety
    return <div>Episode not found</div>;
  }

  return (
    <article className="max-w-content mx-auto px-gutter lg:px-gutter-lg py-spacing-7">
      <h1 className="font-heading text-h1 text-text-primary mb-4">{episode.title}</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        <Tag label={episode.careerPath} variant="career" />
        <Tag label={episode.stemSubject} variant="stem" />
      </div>
      <p className="text-body text-text-secondary max-w-text mb-8">{episode.description}</p>
      {/* Video player placeholder — TICKET-004 */}
      <div className="aspect-video bg-navy-100 rounded-md flex items-center justify-center">
        <p className="text-caption text-muted">Video player coming in TICKET-004</p>
      </div>
    </article>
  );
}
```

### Success Criteria:

#### Automated Verification:
- [x] `npx next build` passes
- [x] `generateStaticParams` generates all 3 episode pages

#### Manual Verification:
- [ ] `/episodes/aircraft-manufacturer` renders correctly
- [ ] `/episodes/flight-school` renders correctly
- [ ] `/episodes/drone-operator` renders correctly
- [ ] Navigation back to home and episodes works

---

## Testing Strategy

### Manual Testing Steps:
1. Load homepage — hero fills viewport, video plays, text readable
2. Scroll down — hero fades subtly, episodes section appears
3. Resize to mobile — grid becomes 1 column, hero text scales down
4. Click episode card — navigates to correct `/episodes/[slug]`
5. Click career tag — navigates to `/episodes?career=...`
6. Click STEM tag — navigates to `/episodes?stem=...`
7. Enable `prefers-reduced-motion` — no animations play
8. Run Lighthouse — Performance ≥ 90, Accessibility ≥ 90
9. Run axe-core scan — zero violations

## Performance Considerations

- Background video: use muted, looped, low-bitrate MP4; provide poster image fallback
- Thumbnails: use Next.js `Image` component with proper `sizes` attribute
- Font loading: `font-display: swap` for headings, `optional` for body
- Static export eliminates server roundtrips

## Migration Notes

No migration needed — this is net-new functionality.

## References

- Original ticket: `thoughts/shared/tickets/TICKET-002.md`
- Design document: `thoughts/design_document.md`
- Design tokens: `thoughts/design_tokens.md`
- Research findings: `thoughts/research_findings.md`
