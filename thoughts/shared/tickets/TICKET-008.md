---
id: TICKET-008
title: Content Pipeline & Static Export Verification
status: spec-needed
priority: high
assignee:
created: 2026-05-18
updated: 2026-05-18
---

## Problem to Solve
Episode metadata, thumbnails, and video files must be managed as code/data and correctly included in the static export. The build pipeline must produce a fully functional static site with working internal links, copied assets, and no broken routes.

## Solution Approach
1. Define episode content data structure as TypeScript types and JSON/Markdown files (compiled at build time). Fields: slug, title, description, careerPaths[], stemSubjects[], videoFileName, thumbnailFileName, publishDate, duration.
2. Set up `/public/videos/` and `/public/thumbnails/` directories. Ensure `next.config.js` copies these to `out/` during static export.
3. Verify all `next/link` internal navigation resolves to `.html` files in the export and loads without 404s.
4. Confirm no client-side API routes or server dependencies exist.
5. Run a full build + link check crawl to verify all internal links and asset paths resolve.
6. Establish content authoring workflow: adding a new episode = adding a data file + video + thumbnail to `public/`.

## Acceptance Criteria
- `next build` completes without errors and produces all pages as static HTML in `out/`.
- Episode data is type-safe and consumed by homepage, episodes page, and detail pages.
- Video and thumbnail files in `/public/` are present in `out/` with correct paths.
- All internal links (nav, episode cards, tags, related episodes) resolve successfully in the static output.
- No API routes, server functions, or dynamic dependencies are included.
- Content workflow documented: a non-developer can add an episode by dropping files and editing a JSON file.

## References
- `thoughts/design_document.md` — sections 2 (static export), 3 (content as data), 7 (build layer requirements)
- `thoughts/research_findings.md` — sections 3 (Next.js, static export)

## Comments
