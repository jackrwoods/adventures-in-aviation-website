---
id: TICKET-006
title: Partners & Resources Page
status: spec-needed
priority: medium
assignee:
created: 2026-05-18
updated: 2026-05-18
---

## Problem to Solve
AIA partners with established aviation organizations (EAA, AOPA, FAA) and host companies. The site needs a dedicated page listing these external resources with clear, accessible link text so students and educators can find pathways into the aviation community.

## Solution Approach
1. Build `/partners` (or `/resources`) page with two sections: Aviation Organizations and Host Company Profiles.
2. Each partner card: organization name, brief description, external link with clear link text (not "click here"). Use `text-link` style with accessible underline.
3. Links open in new tab with `rel="noopener noreferrer"` and screen-reader announcement.
4. Add partner links to the footer for persistent discovery.
5. Use `text-h2` for section headings, `text-h3` for partner names, `text-body` for descriptions.

## Acceptance Criteria
- Page lists EAA, AOPA, FAA, and placeholder slots for host companies.
- Every external link has descriptive text and opens safely in a new tab.
- Footer includes partner resource links.
- All links are keyboard accessible and screen-reader friendly.
- axe-core scan passes.

## References
- `thoughts/design_document.md` — sections 2 (Partners / Resources page), decision 5, research findings section 5
- `thoughts/research_findings.md` — sections 5 (external partner resources)

## Comments
