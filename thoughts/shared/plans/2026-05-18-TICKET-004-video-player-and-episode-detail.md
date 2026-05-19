# Video Playback — Player & Episode Detail Page Implementation Plan

## Overview

Integrate Video.js as the privacy-first, accessible video player and upgrade the episode detail page (`/episodes/[slug]`) to a polished viewing experience: video player top, episode metadata and description below, and a visually consistent related-episodes grid at the bottom.

## Current State Analysis

- Episode detail page exists at `app/episodes/[slug]/page.tsx` with a placeholder div for the video player and a bare `<ul>` text list for "Related Episodes".
- `lib/data.ts` exports 3 mock episodes; each has `videoUrl` (`/videos/...`) and `thumbnail` (`/episodes/...`).
- Reusable components available: `EpisodeCard`, `EpisodeGrid`, `SectionHeader`, `Tag`.
- No video player library installed; no `video.js` in `package.json`.
- `/public/videos/` exists but contains only `hero-poster.jpg` — no MP4 files yet.
- Next.js 16 static export (`output: "export"`, `distDir: "out"`).
- Tailwind v4 with all design tokens in `app/globals.css`.
- `UIStateProvider` pattern in `lib/ui-state.tsx` for central state.
- Styling rule: no raw hex codes, no ad-hoc margins; all values from `globals.css` tokens.

## Desired End State

The episode detail page renders:
1. A responsive 16:9 Video.js player with the episode thumbnail as poster and self-hosted MP4 source.
2. Episode title, career/STEM tags, duration, and publish date in a clean metadata header.
3. Episode description below the player.
4. A "Related Episodes" section using the existing `EpisodeGrid` + `EpisodeCard` components.
5. Related episodes exclude the current episode and prioritize matches by career path or STEM subject.
6. Player is keyboard accessible (tab to controls, space/enter to play/pause) — Video.js provides this.
7. No layout shift on poster/thumbnail load.
8. Static export copies video assets from `/public/videos/` to `out/videos/`.
9. Lighthouse Performance ≥ 90; axe-core scan passes with 0 violations.

## What We're NOT Doing

- Custom Video.js skin/theming beyond ensuring the default skin is visible and functional.
- Actual video encoding or production assets (placeholder MP4s are acceptable for verification).
- Adding a video player to the homepage hero (that uses a native `<video>` loop; TICKET-002 scope).
- Transcript or caption support (deferred; no content exists yet).
- URL-based timestamp deep-linking or playlist functionality.
- Redux or complex state management for the player (Video.js manages its own internal state).

## Implementation Approach

Follow the project's MVC rule: the detail page is a thin controller that reads from `lib/data.ts` and passes data to pure view components. No local state inside `VideoPlayer` that leaks upward; the player is a self-contained client component.

Because Video.js accesses the DOM (`window` / `document`), the player component must be loaded with `next/dynamic` and `ssr: false` to avoid hydration mismatches in the static export. Video.js CSS is imported once, inside the client component.

### Related Episodes Logic

A utility function in `lib/data.ts` computes related episodes:

- Exclude the current episode.
- Score each remaining episode: +2 for matching career path, +1 for matching STEM subject.
- Sort by score descending (highest relevance first).
- With the current 3-episode dataset this typically yields 2 related episodes; the logic scales cleanly to larger datasets.

## Phase 1: Video.js Installation & VideoPlayer Component

### Overview
Install Video.js from npm and build a reusable, SSR-safe `VideoPlayer` component.

### Changes Required:

#### 1. Install Video.js
**Command**:
```bash
npm install video.js
```

Video.js ships with its own TypeScript definitions; no `@types/video.js` needed.

#### 2. New file: `components/VideoPlayer.tsx`
**File**: `components/VideoPlayer.tsx`
**Changes**: Create a client-only Video.js wrapper.

```tsx
"use client";

import { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReturnType<typeof videojs> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const videoEl = document.createElement("video");
    videoEl.className = "video-js vjs-big-play-centered vjs-fluid";
    containerRef.current.appendChild(videoEl);

    playerRef.current = videojs(videoEl, {
      controls: true,
      responsive: true,
      fluid: true,
      preload: "metadata",
      poster,
      sources: [{ src, type: "video/mp4" }],
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src, poster]);

  return (
    <div className="relative aspect-video bg-navy-900 rounded-md overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}
```

**Design notes**:
- `aspect-video` enforces 16:9 before the player initializes, preventing layout shift.
- `bg-navy-900` provides a dark background behind the poster/video for visual cohesion with the site palette.
- `vjs-fluid` makes Video.js fill its container responsively.
- The container uses `relative` + `absolute inset-0` so Video.js measures against the 16:9 parent.

#### 3. New file: `components/VideoPlayerLoader.tsx`
**File**: `components/VideoPlayerLoader.tsx`
**Changes**: Thin dynamic-import wrapper to keep the heavy Video.js bundle out of the server chunk.

```tsx
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("./VideoPlayer"), {
  ssr: false,
  loading: () => (
    <div className="aspect-video bg-navy-900 rounded-md flex items-center justify-center">
      <p className="text-caption text-muted">Loading video player…</p>
    </div>
  ),
});

export default VideoPlayer;
```

### Success Criteria:

#### Automated Verification:
- [x] `npm run lint` passes with no errors.
- [x] `npm run build` completes without errors.
- [x] `out/episodes/` contains all 3 episode HTML files.

#### Manual Verification:
- [x] `VideoPlayer` renders on `/episodes/flight-school` with poster thumbnail visible.
- [x] Big play button is centered and clickable.
- [x] Player controls appear on hover/focus.
- [x] Tab navigation reaches play/pause, volume, and progress controls.
- [x] Space/Enter toggles play/pause when the player has focus.

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful before proceeding to the next phase.

---

## Phase 2: Episode Detail Page Enhancement

### Overview
Replace the placeholder video area and bare related-episodes list with the real player, metadata, and a card-based related episodes grid.

### Changes Required:

#### 1. Update `lib/data.ts`
**File**: `lib/data.ts`
**Changes**: Add a `getRelatedEpisodes` utility function below the existing exports.

```typescript
export function getRelatedEpisodes(currentSlug: string): Episode[] {
  const current = episodes.find((e) => e.slug === currentSlug);
  if (!current) return [];

  const score = (ep: Episode): number => {
    let s = 0;
    if (ep.careerPath === current.careerPath) s += 2;
    if (ep.stemSubject === current.stemSubject) s += 1;
    return s;
  };

  return episodes
    .filter((e) => e.slug !== currentSlug)
    .sort((a, b) => score(b) - score(a));
}
```

#### 2. Update `app/episodes/[slug]/page.tsx`
**File**: `app/episodes/[slug]/page.tsx`
**Changes**: Full rewrite of the detail page layout.

```tsx
import { episodes, getRelatedEpisodes } from "@/lib/data";
import Tag from "@/components/Tag";
import SectionHeader from "@/components/SectionHeader";
import EpisodeGrid from "@/components/EpisodeGrid";
import VideoPlayer from "@/components/VideoPlayerLoader";

export function generateStaticParams() {
  return episodes.map((episode) => ({ slug: episode.slug }));
}

export default function EpisodeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const episode = episodes.find((e) => e.slug === params.slug);

  if (!episode) {
    return (
      <div className="max-w-content mx-auto px-gutter lg:px-gutter-lg py-spacing-7">
        <h1 className="font-heading text-h1 text-text-primary">
          Episode not found
        </h1>
      </div>
    );
  }

  const relatedEpisodes = getRelatedEpisodes(params.slug);

  return (
    <article className="max-w-content mx-auto px-gutter lg:px-gutter-lg py-spacing-7 lg:py-spacing-8">
      {/* Metadata header */}
      <header className="mb-spacing-6">
        <h1 className="font-heading text-h1 text-text-primary mb-4">
          {episode.title}
        </h1>
        <div className="flex flex-wrap gap-2 mb-4">
          <Tag label={episode.careerPath} variant="career" />
          <Tag label={episode.stemSubject} variant="stem" />
        </div>
        <div className="flex items-center gap-4 text-caption text-muted font-mono">
          <span>{episode.duration}</span>
          <span aria-hidden="true">•</span>
          <time dateTime={episode.publishedAt}>
            {new Date(episode.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </header>

      {/* Video player */}
      <section className="mb-spacing-8">
        <VideoPlayer src={episode.videoUrl} poster={episode.thumbnail} />
      </section>

      {/* Description */}
      <section className="mb-spacing-10">
        <p className="text-body text-text-secondary max-w-text">
          {episode.description}
        </p>
      </section>

      {/* Related episodes */}
      {relatedEpisodes.length > 0 && (
        <section className="mb-spacing-8">
          <div className="mb-6">
            <SectionHeader
              title="Related Episodes"
              description="More episodes you might enjoy based on this career path and STEM subject."
            />
          </div>
          <EpisodeGrid episodes={relatedEpisodes} />
        </section>
      )}
    </article>
  );
}
```

**Key layout choices**:
- `VideoPlayer` is imported via the `VideoPlayerLoader` dynamic wrapper so the page itself can remain a server component.
- Metadata uses `font-mono` for duration/date to signal technical data, per the design system.
- `time` element with `dateTime` attribute for semantic markup.
- `max-w-text` on the description keeps line length readable.
- `SectionHeader` reuses the existing component with a description prop.
- `EpisodeGrid` reuses the existing grid; with 1–2 items it simply fills the first slots.
- Related episodes section is omitted entirely if there are zero related episodes (defensive for future edge cases).

### Success Criteria:

#### Automated Verification:
- [x] `npm run lint` passes with no errors.
- [x] `npm run build` completes without errors.
- [x] `out/episodes/` contains `aircraft-manufacturer.html`, `flight-school.html`, `drone-operator.html`.

#### Manual Verification:
- [x] `/episodes/flight-school` displays the video player with the flight-school thumbnail as poster.
- [x] Title, career tag, STEM tag, duration, and formatted publish date appear above the player.
- [x] Description appears below the player.
- [x] "Related Episodes" section shows 2 cards (all other episodes).
- [x] Related episode cards link to their detail pages and render thumbnails correctly.
- [x] Navigation back to `/episodes` and homepage works.
- [x] axe-core DevTools scan passes with 0 violations on the detail page.

**Implementation Note**: After completing this phase and all automated verification passes, pause here for manual confirmation from the human that the manual testing was successful before proceeding to the next phase.

---

## Phase 3: Static Export & Performance Verification

### Overview
Confirm that video assets are copied to the output directory and that the detail page meets the performance budget.

### Changes Required:

No new code files. This phase is pure verification.

#### 1. Verify `/public/videos/` → `out/videos/` copy
Next.js static export automatically copies everything from `public/` into `distDir` (`out/`). We will verify empirically after build.

If no MP4 files exist yet for testing, create a minimal placeholder so the build verification is meaningful:

```bash
# Optional — only if no real MP4 is available for smoke-testing
touch public/videos/smoke-test.mp4
```

(The `touch` creates a 0-byte file; Video.js will show an error in the player, but it confirms the file lands in `out/videos/` and the path resolution works. Remove before shipping if desired.)

#### 2. Check Lighthouse / Performance
Run the production build and audit one detail page:

```bash
npm run build
# Verify out/videos/ exists and contains files
ls out/videos/
```

### Success Criteria:

#### Automated Verification:
- [x] `npm run build` completes without errors.
- [x] `out/videos/` directory exists and contains the files from `public/videos/`.
- [x] `out/episodes/` contains all 3 episode detail HTML files.

#### Manual Verification:
- [ ] Lighthouse Performance score ≥ 90 on an episode detail page.
- [ ] No layout shift detected between initial paint and poster load.
- [ ] Video player LCP element is not the poster image (the `aspect-video` container reserves space, so the image is not an LCP shift source).
- [ ] axe-core scan passes with 0 violations.

---

## Testing Strategy

### Manual Testing Steps:
1. Run `npm run build` and confirm zero errors.
2. Check `out/videos/` exists with expected files.
3. Load `/episodes/flight-school` — confirm player poster shows, title/metadata visible, description readable.
4. Click the big play button — confirm Video.js controls appear.
5. Tab through the page — focus moves from skip-link → nav → player controls → related episode cards.
6. With player focused, press Space — video plays/pauses.
7. Click a related episode card — navigates to the correct detail page.
8. Click browser back — previous page state restored (Next.js static export handles this).
9. Run axe-core DevTools scan — verify 0 violations.
10. Run Lighthouse in Chrome DevTools on the detail page — verify Performance ≥ 90, Accessibility ≥ 90.

## Performance Considerations

- **Video.js bundle size**: ~150 KB minified + gzipped. It is code-split via `next/dynamic` with `ssr: false`, so it only downloads on episode detail pages, never on the homepage or episodes browse page.
- **Poster image**: Already uses the episode `thumbnail`, which is a static asset. The `aspect-video` container reserves space before the image loads, preventing CLS.
- **Preload strategy**: `preload: "metadata"` loads only video metadata initially, keeping bandwidth usage low until the user presses play.
- **No layout shift**: The player wrapper uses `aspect-video` + `bg-navy-900`, so the browser allocates the correct box before Video.js or the poster render.

## Migration Notes

- No breaking changes to existing pages.
- `EpisodeCard`, `EpisodeGrid`, `SectionHeader`, `Tag` remain unchanged.
- The existing placeholder comment `Video player coming in TICKET-004` is replaced by the real component.
- The existing bare `<ul>` related-episodes list is replaced by `EpisodeGrid`.

## References

- Original ticket: `thoughts/shared/tickets/TICKET-004.md`
- Design document: `thoughts/design_document.md` — sections 2 (Episode Detail page), decision 3 (Video.js), decision 20 (video specs)
- Video player research: `thoughts/video_player_research.md`
- Design tokens: `thoughts/design_tokens.md` — asset tokens (`video-aspect`, `thumbnail-aspect`), component primitives
- Current episode data: `lib/data.ts`
- Current detail page: `app/episodes/[slug]/page.tsx`
- Styling system: `app/globals.css` (Tailwind v4 `@theme`)
