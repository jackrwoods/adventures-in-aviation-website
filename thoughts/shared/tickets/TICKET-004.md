---
id: TICKET-004
title: Video Playback — Player & Episode Detail Page
status: spec-needed
priority: high
assignee:
created: 2026-05-18
updated: 2026-05-18
---

## Problem to Solve
The core purpose of the site is delivering educational video content. We need a privacy-first, accessible video player and a detail page where students can watch an episode, read a brief description, and discover related episodes. No YouTube or Vimeo embeds — all self-hosted.

## Solution Approach
1. Integrate Video.js as the video player. Load from npm, not CDN, for privacy and static export compatibility.
2. Configure player for self-hosted MP4 in `/public/videos/`. Player container is 16:9 aspect ratio, responsive from mobile to desktop.
3. Build `/episodes/[slug]` detail page: video player top, brief description below, related episodes grid at bottom.
4. Ensure Video.js controls are keyboard accessible and screen-reader friendly (WCAG AA out of the box).
5. Implement "related episodes" logic: same career path or same STEM subject, excluding current episode.
6. Add video poster/thumbnail support for before-play state.
7. Verify video files are copied to `out/` during static export.

## Acceptance Criteria
- Video.js player renders, plays/pauses, and shows controls on self-hosted MP4.
- Player is keyboard accessible (tab to controls, space/enter to play/pause).
- Episode detail page displays player, description, and related episodes.
- Related episodes exclude current episode and prioritize same career path or STEM subject.
- Video assets in `/public/videos/` are present in `out/` after build.
- No layout shift on video thumbnail/poster load.
- axe-core scan passes on the detail page.
- Lighthouse: Performance ≥ 90 (video loading strategy should not block LCP).

## References
- `thoughts/design_document.md` — sections 2 (Episode Detail page), decision 3 (Video.js), decision 20 (video specs)
- `thoughts/video_player_research.md` — Video.js analysis and alternatives
- `thoughts/design_tokens.md` — asset tokens (`video-aspect`, `thumbnail-aspect`)

## Comments
