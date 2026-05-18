---
id: TICKET-005
title: Program Info — About Page
status: spec-needed
priority: medium
assignee:
created: 2026-05-18
updated: 2026-05-18
---

## Problem to Solve
Parents, educators, potential hosts, and funders need a single, discoverable page that explains how Adventures in Aviation operates: the 4-step episode structure, safety protocols, host guide, FAQ, and application process. This page replaces scattered operational documents with one authoritative source.

## Solution Approach
1. Build `/about` (or `/program`) as a single long-form page with anchored sections.
2. Sections in logical order: Program Overview → 4-Step Episode Structure → Safety Briefing → FAQ → Host Guide → Application Info.
3. Use `text-h2` for section headings, `text-body` for content. Section backgrounds alternate between `bg-primary` and `bg-secondary` for visual rhythm.
4. Add a table of contents nav (sticky on desktop, inline on mobile) linking to each section anchor.
5. Host guide and safety content should be formatted as checklists or step lists where appropriate.
6. All copy should be minimal and scannable — bullet points over paragraphs where possible.

## Acceptance Criteria
- All 6 sections are present and navigable via TOC or scrolling.
- Section anchors work as direct links (`/about#safety`).
- TOC is sticky on desktop and collapsible/inline on mobile.
- Content is scannable: uses headings, lists, and short paragraphs.
- axe-core scan passes.
- Lighthouse: Accessibility ≥ 90.

## References
- `thoughts/design_document.md` — sections 2 (About / Program Info page), decision 7 (single page)
- `thoughts/research_findings.md` — sections 4 (no PII, so no contact forms)

## Comments
