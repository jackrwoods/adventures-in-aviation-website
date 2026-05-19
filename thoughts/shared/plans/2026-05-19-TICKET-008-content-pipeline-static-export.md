# Content Pipeline & Static Export Verification Implementation Plan

## Overview

Harden the Adventures in Aviation static site so that episode metadata, thumbnails, and video files are managed as external data and correctly included in the Next.js static export (`out/`). Convert the hard-coded TypeScript episode array into JSON files consumed at build time, add placeholder MP4s for build verification, run a full build + link check, and document a repeatable content-authoring workflow.

## Current State Analysis

- Episode data is a hard-coded TypeScript array in `lib/data.ts` (`lib/data.ts:13–50`).
- Three placeholder thumbnails exist in `/public/episodes/` but **no episode MP4 files** exist in `/public/videos/` — only `hero-poster.jpg`.
- `next.config.ts:4–5` already has `output: "export"` and `distDir: "out"`.
- Previous builds (`out/`) contain all pages and thumbnails, but `out/videos/` is missing episode video files.
- All internal navigation uses `next/link` consistently across `components/Navigation.tsx`, `components/EpisodeCard.tsx`, `components/Tag.tsx`, `components/Footer.tsx`, and `components/TableOfContents.tsx`.
- No API routes or server-side dependencies exist (`app/api/` is empty).
- `generateStaticParams` at `app/episodes/[slug]/page.tsx:7` generates detail pages correctly.

## Desired End State

1. Episode metadata lives in `content/episodes.json` and `content/categories.json`, imported at build time by a thin `lib/data.ts` loader.
2. Type-safe TypeScript types remain in `lib/data.ts`; all pages and components consume the same exported `episodes`, `careerPaths`, `stemSubjects`, and `getRelatedEpisodes` API.
3. Placeholder MP4 files exist in `/public/videos/` for all three episodes so the static export copies them to `out/videos/`.
4. A full `npm run build` produces `out/` with all pages, all thumbnails, and all video files.
5. A link-check script crawls the built HTML and confirms every internal `href` resolves to an existing file in `out/`.
6. A `CONTENT_WORKFLOW.md` guide and a `scripts/add-episode.ts` template allow a non-developer to add an episode by dropping files and editing JSON.

### Key Discoveries:
- Next.js static export automatically copies `public/` to `out/` — no extra config needed (`next.config.ts` is sufficient).
- TypeScript can import JSON directly with type assertions, keeping the loader thin and build-time only.
- `next/link` generates standard `<a href="...">` tags in the static HTML; a simple grep + file-existence check is enough for verification.
- Video.js on the detail page references `/videos/[slug].mp4` paths; missing files will cause a player error even if the HTML renders.

## What We're NOT Doing

- Replacing thumbnails with a CMS or image pipeline (out of scope).
- Adding actual video encoding or production assets (placeholders only).
- Adding server-side rendering, API routes, or dynamic data fetching.
- Writing a full-blown content management system.
- Adding search, pagination, or pagination for episodes.
- Changing the existing page/component logic beyond data-source swap.

## Implementation Approach

Follow the existing static-export and central-store patterns:
1. Extract data into JSON under a `content/` directory.
2. Keep `lib/data.ts` as the type definition + loader layer so all imports (`@/lib/data`) continue to work unchanged.
3. Create a small Node.js script to generate minimal valid placeholder MP4s (no ffmpeg dependency).
4. Add a post-build shell script that greps all `href` values from `out/*.html` and `out/**/*.html` and verifies file existence.
5. Write the workflow documentation and a helper script/template.

## Phase 1: Content Data Extraction (JSON + Type-Safe Loader)

### Overview
Move episode metadata and category lists from TypeScript constants into JSON files, then re-export them through `lib/data.ts` with the same TypeScript types and helper functions.

### Changes Required:

#### 1. Create `content/` directory and `content/episodes.json`
**File**: `content/episodes.json`
**Changes**: Move the three episode objects from `lib/data.ts` into a JSON array.

```json
[
  {
    "slug": "aircraft-manufacturer",
    "title": "Wings of Precision: Inside an Aircraft Manufacturer",
    "description": "Students tour a major aircraft production facility, meet aerospace engineers, and see how physics and materials science come together to build commercial jets.",
    "thumbnail": "/episodes/aircraft-manufacturer.jpg",
    "videoUrl": "/videos/aircraft-manufacturer.mp4",
    "careerPath": "Aerospace Engineers",
    "stemSubject": "Materials Science",
    "duration": "12:34",
    "publishedAt": "2026-04-15"
  },
  {
    "slug": "flight-school",
    "title": "First Solo: A Day at Flight School",
    "description": "Follow three students through ground school, simulator training, and their first supervised solo flight with certified flight instructors.",
    "thumbnail": "/episodes/flight-school.jpg",
    "videoUrl": "/videos/flight-school.mp4",
    "careerPath": "Pilots",
    "stemSubject": "Physics",
    "duration": "15:20",
    "publishedAt": "2026-04-22"
  },
  {
    "slug": "drone-operator",
    "title": "Sky Eyes: The World of Commercial Drone Operations",
    "description": "Explore the fast-growing field of unmanned aerial systems with professional drone pilots working in agriculture, inspection, and search-and-rescue.",
    "thumbnail": "/episodes/drone-operator.jpg",
    "videoUrl": "/videos/drone-operator.mp4",
    "careerPath": "Drone / UAS Operators",
    "stemSubject": "Computer Science",
    "duration": "10:45",
    "publishedAt": "2026-05-01"
  }
]
```

#### 2. Create `content/categories.json`
**File**: `content/categories.json`
**Changes**: Move `careerPaths` and `stemSubjects` arrays into a single JSON file.

```json
{
  "careerPaths": [
    "Pilots",
    "Aerospace Engineers",
    "Air Traffic Controllers",
    "Aircraft Maintenance Technicians",
    "Drone / UAS Operators",
    "Aviation Meteorologists",
    "Aerospace Medicine / Flight Surgeons",
    "Space Systems Engineers"
  ],
  "stemSubjects": [
    "Physics",
    "Mathematics",
    "Computer Science",
    "Materials Science",
    "Mechanical Engineering",
    "Electrical / Avionics Engineering",
    "Atmospheric Science / Meteorology",
    "Aeronautical / Astronautical Engineering"
  ]
}
```

#### 3. Rewrite `lib/data.ts` as a JSON loader
**File**: `lib/data.ts`
**Changes**: Keep the `Episode` type and `getRelatedEpisodes` helper, but import JSON data. Re-export `episodes`, `careerPaths`, and `stemSubjects` with the same names so every consumer file (`app/page.tsx`, `app/episodes/page.tsx`, `app/episodes/[slug]/page.tsx`, `lib/filter-state.tsx`) requires zero changes.

```typescript
import episodesJson from "@/content/episodes.json";
import categoriesJson from "@/content/categories.json";

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

export const episodes: Episode[] = episodesJson;

export const careerPaths = categoriesJson.careerPaths as const;
export const stemSubjects = categoriesJson.stemSubjects as const;

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

**Design notes**:
- Using `@/` path alias keeps imports consistent with the rest of the codebase.
- The `as const` assertions on `careerPaths` and `stemSubjects` preserve the existing literal-union behavior for any downstream type consumers.
- No runtime fetch calls; JSON is bundled at build time by Next.js / webpack.

### Success Criteria:

#### Automated Verification:
- [ ] `npm run build` completes without errors.
- [ ] TypeScript compilation passes: `npx tsc --noEmit`.
- [ ] `npx eslint .` passes.
- [ ] `out/` contains all pages (`index.html`, `episodes.html`, `about.html`, `partners.html`, and `episodes/*.html`).

#### Manual Verification:
- [ ] Homepage renders all 3 episode cards from `content/episodes.json`.
- [ ] Episodes browse page shows all 3 episodes.
- [ ] Each episode detail page (`/episodes/[slug]`) renders with correct metadata.
- [ ] Career path and STEM subject filter lists populate from `content/categories.json`.
- [ ] `getRelatedEpisodes` returns expected ordering on detail pages.

---

## Phase 2: Placeholder Video Assets

### Overview
Create minimal placeholder MP4 files for the three episodes so Video.js has valid sources and the static export copies them to `out/videos/`.

### Changes Required:

#### 1. Create a Node.js script to generate minimal MP4 placeholders
**File**: `scripts/create-placeholder-videos.ts`
**Changes**: Script that writes a tiny, structurally valid MP4 file (ftyp + moov boxes, no mdat) for each slug. This is enough for Video.js to recognize the container format and attempt playback; the player will show a black screen / loading spinner, confirming path resolution works.

```typescript
import fs from "fs";
import path from "path";

const slugs = [
  "aircraft-manufacturer",
  "flight-school",
  "drone-operator",
];

const outDir = path.resolve(process.cwd(), "public", "videos");

// Minimal valid MP4 skeleton (ftyp + moov, no mdat).
// This is a tiny binary blob that makes the file recognizable as MP4.
const ftyp = Buffer.from([
  0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70,
  0x69, 0x73, 0x6f, 0x6d, 0x00, 0x00, 0x00, 0x00,
  0x69, 0x73, 0x6f, 0x6d, 0x6d, 0x70, 0x34, 0x31,
]);

const moov = Buffer.from([
  0x00, 0x00, 0x00, 0x08, 0x6d, 0x6f, 0x6f, 0x76,
]);

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

for (const slug of slugs) {
  const filePath = path.join(outDir, `${slug}.mp4`);
  fs.writeFileSync(filePath, Buffer.concat([ftyp, moov]));
  console.log(`Created placeholder: ${filePath}`);
}
```

**Command to run**:
```bash
npx tsx scripts/create-placeholder-videos.ts
```

#### 2. Verify files exist
**Command**:
```bash
ls -la public/videos/
```

Expected output:
```
hero-poster.jpg
aircraft-manufacturer.mp4
flight-school.mp4
drone-operator.mp4
```

### Success Criteria:

#### Automated Verification:
- [ ] Script runs without errors and creates 3 `.mp4` files in `public/videos/`.
- [ ] `npm run build` completes without errors.
- [ ] `out/videos/` contains all 3 `.mp4` files plus `hero-poster.jpg`.

#### Manual Verification:
- [ ] Episode detail pages load without Video.js source errors.
- [ ] Player poster images display correctly.

---

## Phase 3: Build & Link Verification

### Overview
Run a full production build and verify that every internal link resolves to an existing file in the `out/` directory. Also confirm no API routes or server dependencies are present.

### Changes Required:

#### 1. Create `scripts/verify-links.sh`
**File**: `scripts/verify-links.sh`
**Changes**: Post-build shell script that:
1. Finds all `.html` files in `out/`.
2. Greps `href` attributes.
3. Filters to internal links (starts with `/` and not `http`).
4. Checks whether the target file exists in `out/`.

```bash
#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="${1:-out}"
ERRORS=0

echo "Verifying internal links in ${OUT_DIR}..."

# Find all href values that are internal paths
while IFS= read -r line; do
  # Extract href value
  href="${line}"

  # Skip external links, anchors-only, javascript:, mailto:, tel:
  case "$href" in
    http*|https*|#*|javascript:*|mailto:*|tel:*) continue ;;
  esac

  # Strip query strings and hashes for file existence check
  target="${href%%\?*}"
  target="${target%%\#*}"

  # Normalize: root -> index.html; directory -> directory/index.html
  if [ "$target" = "/" ]; then
    check="${OUT_DIR}/index.html"
  elif [ -d "${OUT_DIR}${target}" ]; then
    check="${OUT_DIR}${target}/index.html"
  else
    check="${OUT_DIR}${target}"
  fi

  if [ ! -f "$check" ]; then
    echo "  MISSING: ${href} (expected ${check})"
    ERRORS=$((ERRORS + 1))
  fi
done < <(grep -oP 'href="\K[^"]+' "${OUT_DIR}"/*.html "${OUT_DIR}"/*/*.html 2>/dev/null | sort -u)

if [ "$ERRORS" -eq 0 ]; then
  echo "All internal links resolve successfully."
else
  echo "Found ${ERRORS} broken internal link(s)."
  exit 1
fi
```

#### 2. Create `scripts/verify-build.sh`
**File**: `scripts/verify-build.sh`
**Changes**: One-command wrapper that runs the full build + verification pipeline.

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "=== Running Next.js build ==="
npm run build

echo ""
echo "=== Verifying static output structure ==="
for file in index.html episodes.html about.html partners.html; do
  if [ ! -f "out/${file}" ]; then
    echo "Missing required page: out/${file}"
    exit 1
  fi
done

echo "Required pages present."

echo ""
echo "=== Verifying episode detail pages ==="
for slug in aircraft-manufacturer flight-school drone-operator; do
  if [ ! -f "out/episodes/${slug}.html" ]; then
    echo "Missing episode page: out/episodes/${slug}.html"
    exit 1
  fi
done

echo "Episode detail pages present."

echo ""
echo "=== Verifying assets ==="
for asset in episodes/aircraft-manufacturer.jpg episodes/flight-school.jpg episodes/drone-operator.jpg; do
  if [ ! -f "out/${asset}" ]; then
    echo "Missing asset: out/${asset}"
    exit 1
  fi
done

for video in videos/aircraft-manufacturer.mp4 videos/flight-school.mp4 videos/drone-operator.mp4 videos/hero-poster.jpg; do
  if [ ! -f "out/${video}" ]; then
    echo "Missing video asset: out/${video}"
    exit 1
  fi
done

echo "Assets present."

echo ""
echo "=== Verifying internal links ==="
bash scripts/verify-links.sh out

echo ""
echo "=== Checking for API routes ==="
if [ -d "app/api" ] && [ "$(ls -A app/api)" ]; then
  echo "WARNING: app/api/ contains files — static export may include server routes."
else
  echo "No API routes found."
fi

echo ""
echo "=== Build verification complete ==="
```

### Success Criteria:

#### Automated Verification:
- [ ] `bash scripts/verify-build.sh` runs end-to-end with exit code 0.
- [ ] `npm run build` produces zero errors.
- [ ] `out/` contains all required pages, episode HTML files, thumbnails, and video files.
- [ ] `scripts/verify-links.sh out` reports zero broken links.
- [ ] No files exist in `app/api/`.

#### Manual Verification:
- [ ] Spot-check a few internal links in browser (nav, episode cards, tags, footer).
- [ ] Confirm no 404s on navigation between pages in a local static server (e.g., `npx serve out`).

---

## Phase 4: Content Authoring Workflow

### Overview
Write documentation and a helper script so a non-developer can add a new episode by dropping files and editing JSON.

### Changes Required:

#### 1. Create `CONTENT_WORKFLOW.md`
**File**: `CONTENT_WORKFLOW.md`
**Changes**: Step-by-step guide for adding an episode without touching React/TypeScript code.

```markdown
# Content Authoring Workflow

## Adding a New Episode

1. **Prepare assets**
   - Export the episode thumbnail as a JPG, 16:9 aspect ratio, max 1920px wide.
   - Export the episode video as an MP4, 16:9 aspect ratio, H.264 codec.
   - Name both files using kebab-case based on the episode title, e.g.:
     - `aircraft-maintenance.jpg`
     - `aircraft-maintenance.mp4`

2. **Drop files into `public/`**
   - Copy the thumbnail to `public/episodes/<slug>.jpg`
   - Copy the video to `public/videos/<slug>.mp4`

3. **Edit `content/episodes.json`**
   - Open `content/episodes.json` in any text editor.
   - Append a new JSON object to the array. Example:

     ```json
     {
       "slug": "aircraft-maintenance",
       "title": "Wrench to Wing: A Day with an AMT",
       "description": "Students shadow aircraft maintenance technicians through a full inspection cycle, learning the math and materials science behind airworthiness.",
       "thumbnail": "/episodes/aircraft-maintenance.jpg",
       "videoUrl": "/videos/aircraft-maintenance.mp4",
       "careerPath": "Aircraft Maintenance Technicians",
       "stemSubject": "Mechanical Engineering",
       "duration": "14:20",
       "publishedAt": "2026-05-15"
     }
     ```

   - **Field reference**:
     - `slug` — URL-safe identifier, must be unique, kebab-case, no spaces.
     - `title` — Episode display title.
     - `description` — 1–2 sentence summary.
     - `thumbnail` — Must match the path in `public/episodes/` prefixed with `/episodes/`.
     - `videoUrl` — Must match the path in `public/videos/` prefixed with `/videos/`.
     - `careerPath` — Must be one of the values in `content/categories.json` → `careerPaths`.
     - `stemSubject` — Must be one of the values in `content/categories.json` → `stemSubjects`.
     - `duration` — Human-readable length, e.g. `"12:34"`.
     - `publishedAt` — ISO date string (`YYYY-MM-DD`).

4. **Verify**
   - Run `bash scripts/verify-build.sh` in the project root.
   - If it exits with `Build verification complete`, the episode is ready.

## Do NOT Modify
- Any file in `app/`, `components/`, or `lib/` — these are code files.
- `next.config.ts` — build configuration is handled by developers.

## Adding a New Career Path or STEM Subject
1. Open `content/categories.json`.
2. Add the new value to the appropriate array.
3. Run `bash scripts/verify-build.sh` to confirm the build still passes.
```

#### 2. Create `scripts/add-episode.ts`
**File**: `scripts/add-episode.ts`
**Changes**: Interactive Node.js script that prompts for episode fields, validates `careerPath` / `stemSubject` against `content/categories.json`, appends the episode to `content/episodes.json`, and prints a checklist for the user.

```typescript
import fs from "fs";
import path from "path";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  const episodesPath = path.resolve(process.cwd(), "content", "episodes.json");
  const categoriesPath = path.resolve(process.cwd(), "content", "categories.json");

  const episodes: unknown[] = JSON.parse(fs.readFileSync(episodesPath, "utf-8"));
  const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf-8")) as {
    careerPaths: string[];
    stemSubjects: string[];
  };

  console.log("Add a new episode\n");

  const slug = await ask("Slug (kebab-case, unique): ");
  if (episodes.some((e: any) => e.slug === slug)) {
    console.error(`Error: slug "${slug}" already exists.`);
    process.exit(1);
  }

  const title = await ask("Title: ");
  const description = await ask("Description: ");

  console.log("\nAvailable career paths:");
  categories.careerPaths.forEach((p, i) => console.log(`  ${i + 1}. ${p}`));
  const careerIdx = parseInt(await ask("Select career path (number): "), 10) - 1;
  const careerPath = categories.careerPaths[careerIdx];

  console.log("\nAvailable STEM subjects:");
  categories.stemSubjects.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
  const stemIdx = parseInt(await ask("Select STEM subject (number): "), 10) - 1;
  const stemSubject = categories.stemSubjects[stemIdx];

  const duration = await ask("Duration (e.g. 12:34): ");
  const publishedAt = await ask("Published date (YYYY-MM-DD): ");

  const newEpisode = {
    slug,
    title,
    description,
    thumbnail: `/episodes/${slug}.jpg`,
    videoUrl: `/videos/${slug}.mp4`,
    careerPath,
    stemSubject,
    duration,
    publishedAt,
  };

  episodes.push(newEpisode);
  fs.writeFileSync(episodesPath, JSON.stringify(episodes, null, 2) + "\n");

  console.log("\nEpisode added to content/episodes.json.");
  console.log("Next steps:");
  console.log(`  1. Copy thumbnail to public/episodes/${slug}.jpg`);
  console.log(`  2. Copy video to public/videos/${slug}.mp4`);
  console.log("  3. Run: bash scripts/verify-build.sh");

  rl.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

### Success Criteria:

#### Automated Verification:
- [ ] `npx tsx scripts/add-episode.ts` runs without errors.
- [ ] Script rejects duplicate slugs.
- [ ] Script validates career path and STEM subject selection against `content/categories.json`.
- [ ] After adding an episode via the script, `npm run build` still completes successfully.

#### Manual Verification:
- [ ] A non-developer can follow `CONTENT_WORKFLOW.md` to add an episode.
- [ ] The interactive script produces a valid JSON entry.
- [ ] Build verification passes after adding content.

---

## Testing Strategy

### Unit Tests:
- Not required for this ticket — the data layer has no business logic beyond `getRelatedEpisodes`, which is unchanged.

### Integration / Build Tests:
- `scripts/verify-build.sh` is the primary integration test.
- It validates the full static export pipeline: data → build → output → links → assets.

### Manual Testing Steps:
1. Run `bash scripts/verify-build.sh` — confirm exit code 0 and no broken links.
2. Serve `out/` locally (`npx serve out`) and browse all pages.
3. Click every navigation link, episode card, tag, and footer link.
4. Load an episode detail page and confirm Video.js poster shows with no source error.
5. Add a test episode via `scripts/add-episode.ts`, copy placeholder files, re-run verification.

## Performance Considerations

- JSON data files are bundled at build time; they add zero runtime network requests.
- Placeholder MP4s are ~40 bytes each; they will be replaced by real assets and do not affect production bandwidth.
- The verification scripts are developer-only tooling and are not included in the client bundle.

## Migration Notes

- All existing pages (`app/page.tsx`, `app/episodes/page.tsx`, `app/episodes/[slug]/page.tsx`, `lib/filter-state.tsx`) import from `@/lib/data`. Since `lib/data.ts` keeps the same exports, **no page or component files need changes**.
- The `episodes`, `careerPaths`, and `stemSubjects` arrays remain reference-equal at build time; any code that depended on their literal types will continue to work.

## References

- Original ticket: `thoughts/shared/tickets/TICKET-008.md`
- Design document: `thoughts/design_document.md` — sections 2 (static export), 3 (content as data), 7 (build layer requirements)
- Research findings: `thoughts/research_findings.md` — sections 3 (Next.js static export)
- Current data file: `lib/data.ts`
- Current build config: `next.config.ts`
- Current detail page: `app/episodes/[slug]/page.tsx`
