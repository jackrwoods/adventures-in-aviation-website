# Adventures in Aviation Website — Design Document

## Overview

Vertical slice design for a Next.js static website serving as the digital home for Adventures in Aviation (AIA), a nonprofit that creates cinematic educational aviation content for children aged 10–18. The site bridges mission storytelling with video-first episode distribution.

---

## 1. Current State

- AIA is a multimedia educational initiative that flies a small jet to aviation companies, bringing STEM students for facility tours, CEO interviews, and hands-on experiences
- Content is filmed and distributed via YouTube and educational channels
- The organization has no existing website or digital infrastructure
- A grant proposal (`/Users/jack/Downloads/AIA modified.docx`) defines the program mechanics, brand voice, and operational structure but contains no visual identity or digital platform specifications
- No existing codebase or technology choices have been made

## 2. Desired End State

A static Next.js website with the following characteristics:

- **Mission-first homepage**: Cinematic hero landing page followed by episodic video content grid
- **Video-first content**: Self-hosted video using Video.js player, minimal text, organized by career path and STEM subject
- **Technical/industrial aesthetic**: "Adventure Aloft" color palette (deep navy, NASA blue, golden yellow), B612 + Andika aviation/industrial typography, flat modern design (no gradients, no skeuomorphism)
- **Privacy-first**: No PII collection, no tracking cookies, no third-party embeds that load trackers
- **Accessibility**: WCAG 2.1 AA compliant
- **Program info page**: Single page aggregating all operational information (4-step episode structure, safety briefing, FAQ, host guide, application info)
- **Responsive**: Desktop and mobile compatible
- **Static export**: Built as static HTML/CSS/JS for deployment to any static host

### Page Inventory

| Page | Purpose | Content |
|------|---------|---------|
| **Home** | Mission landing + content discovery | Hero mission statement, featured episodes, career path/STEM navigation |
| **Episodes** | Content grid | All episodes organized by career path and STEM subject |
| **Episode Detail** | Single video viewing | Video player, brief description, related episodes |
| **About / Program Info** | Operational transparency | 4-step structure, safety, FAQ, host guide, application |
| **Partners / Resources** | External links | EAA, AOPA, FAA, host company profiles |

## 3. Existing Patterns

- **Next.js App Router static export pattern**: Generate static HTML at build time; no SSR or API routes
- **Content as data**: Episodes and metadata stored as TypeScript/JSON constants or Markdown files, compiled at build time
- **Component-based architecture**: Reusable video cards, navigation, and layout components
- **CSS-first animation**: Use CSS transitions and `@media (prefers-reduced-motion)` for scroll-triggered effects without heavy JS libraries

## 4. New Patterns

- **Mission + Content dual homepage**: Uncommon pattern requiring clear visual hierarchy to separate "pitch" from "browse"
- **Self-hosted video delivery**: No YouTube/Vimeo embeds; static MP4 files served from `/public/videos/` via Video.js
- **Privacy-first analytics**: If metrics are needed later, use privacy-respecting server-side log analysis (e.g., GoAccess on static host) rather than client-side scripts
- **Cinematic scroll choreography**: Subtle, performant scroll-linked animations that reinforce the "flight" metaphor without compromising accessibility or static export compatibility

## 5. Resolved Design Decisions

### Decision Log

| # | Decision | Rationale | Date |
|---|----------|-----------|------|
| 1 | **Build tool: Next.js** | User requirement; excellent static export support, React ecosystem, image optimization | 2026-05-18 |
| 2 | **Static export (no backend)** | No dynamic data needed; content is infrequently published by a single author; simplifies hosting and eliminates attack surface | 2026-05-18 |
| 3 | **Video player: Video.js** | Open-source, Apache 2.0, WCAG AA compliant out of the box, no telemetry, widely supported | 2026-05-18 |
| 4 | **Color palette: Tarmac + Sky** | Authentic, operational feel; avoids corporate navy and kiddie bright; aligns with brand analysis "flight jacket over production studio" | 2026-05-18 |
| 5 | **Homepage: Mission landing + episode grid** | Must appeal to both student audience and foundation funders; mission section establishes credibility, episodes provide immediate value | 2026-05-18 |
| 6 | **Animations: CSS scroll + hover states** | Static content does not preclude dynamic presentation; reinforces cinematic brand without heavy JS bundles | 2026-05-18 |
| 7 | **Program info: Single page** | Consolidates all operational content (safety, FAQ, host guide, application, 4-step structure) for easy discovery | 2026-05-18 |
| 8 | **Typography: Technical/industrial** | Aligns with "rustic-meets-polished" brand; readable for 10–18 age range without being patronizing | 2026-05-18 |
| 9 | **No PII collection** | Children's website compliance; eliminates contact forms, newsletter signups, comment systems | 2026-05-18 |
| 10 | **Stock photos initially, original photography later** | Budget-constrained launch strategy; curated selection to avoid generic overuse | 2026-05-18 |
| 11 | **No AI-generated visuals** | Authenticity is core to brand identity; AI visuals conflict with "real jet, real students, real CEOs" value proposition | 2026-05-18 |
| 12 | **Content organization: Career path + STEM subject** | 8 career paths + 8 STEM subjects; dual taxonomy with clear navigation | 2026-05-18 |
| 13 | **Placeholder logo (PNG)** | No existing logo; text-based wordmark or simple placeholder to be replaced later | 2026-05-18 |
| 14 | **Curated navigation (no search)** | Scope decision for initial build; search can be added later if content volume grows | 2026-05-18 |
| 15 | **Accessibility: WCAG 2.1 AA** | Baseline for nonprofit and children's content; no legal requirement for AAA identified | 2026-05-18 |
| 16 | **Color palette: "Adventure Aloft"** | Research-informed palette: warm cloud white, deep navy, NASA blue, golden yellow accent. Stronger aviation signals than tarmac palette; NASA blue and aviation-livery yellow. | 2026-05-18 |
| 17 | **Typography: B612 + Andika + B612 Mono** | B612 commissioned by Airbus for cockpit displays. Andika designed by SIL International for literacy learners. B612 Mono for technical data. Self-hosted via Fontsource. | 2026-05-18 |
| 18 | **Hero copy: "A flight plan for aviation's talent crisis."** | Single-line mission statement that frames the program as a solution to the talent shortage. Aviation-native vocabulary ("flight plan") + urgency ("crisis"). | 2026-05-18 |
| 19 | **Launch episode count: 3 episodes** | Minimal viable content for launch; grid layout validated for 3–8 items. | 2026-05-18 |
| 20 | **Video specs: 16:9 aspect ratio, 4K resolution** | Matches standard YouTube cinematic format. 4K source allows downscaling to 1080p/720p for delivery. Player sized to 16:9 with responsive container. | 2026-05-18 |
| 21 | **Font loading: Self-hosted via Fontsource** | Privacy-first requirement eliminates Google Fonts CDN. Metric-matched fallbacks prevent CLS. Latin-subset payload ~40–50KB. | 2026-05-18 |

## 6. Open Questions

| # | Question | Impact | Status |
|---|----------|--------|--------|
| 1 | What are the actual career paths and STEM subjects to display? | Content architecture and navigation design | **Resolved** — 8 career paths + 8 STEM subjects as listed in Appendix A |
| 2 | What is the final color palette hex value specification? | Component implementation | **Resolved** — "Adventure Aloft" palette defined in `thoughts/design_tokens.md` |
| 3 | What typefaces will be used for headings and body? | Typography implementation | **Resolved** — B612 (headings), Andika (body), B612 Mono (technical) |
| 4 | How many episodes will exist at launch? | Episode grid layout decisions | **Resolved** — 3 episodes at launch |
| 5 | What is the aspect ratio and resolution of source videos? | Video player component sizing | **Resolved** — 16:9 aspect ratio, 4K resolution |
| 6 | Will the site require a donation mechanism in the future? | Affects footer and "About" page structure | Out of scope for now |
| 7 | What is the exact copy for the hero mission statement? | Homepage implementation | **Resolved** — "A flight plan for aviation's talent crisis." |
| 8 | What external partner logos/resources need linking? | Partners page and footer content | Partially answered (EAA, AOPA, FAA) |
| 9 | Is there a preferred static hosting target? | Deployment configuration | Out of scope for now |
| 10 | Will episodes have written transcripts for accessibility? | A11y compliance and content workflow | Unknown — deferred to content production workflow |

## 7. Multilayer Validation Requirements

### Design Layer (Figma / prototype)

- [ ] Homepage prototype validated with stakeholder
- [ ] Typography scale tested at all breakpoints (mobile 320px to desktop 1440px+)
- [ ] Color contrast ratios verified against WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text/UI components)
- [ ] Animation timing respects `prefers-reduced-motion`
- [ ] Video player UI tested at mobile and desktop sizes

### Component Layer (Storybook / isolated)

- [ ] Video.js player renders with self-hosted MP4, plays/pauses, shows controls, keyboard accessible
- [ ] Episode card renders with thumbnail, title, career path tag, STEM subject tag
- [ ] Navigation component collapses to hamburger on mobile, shows full menu on desktop
- [ ] Hero section renders mission text without layout shift
- [ ] All components pass axe-core accessibility scan

### Page Layer (integrated)

- [ ] Homepage loads with hero + episode grid; no layout shift on video thumbnail load
- [ ] Episodes page filters correctly by career path and STEM subject
- [ ] Episode detail page loads video player, description, related episodes
- [ ] About page renders all program info sections in logical order
- [ ] Partners page displays external links with accessible link text
- [ ] All pages pass Lighthouse audit: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90

### Build Layer (Next.js static export)

- [ ] `next build` completes without errors
- [ ] `out/` directory contains all pages as static HTML
- [ ] Video files in `/public/videos/` are copied to output
- [ ] All internal links use `next/link` and resolve to `.html` files in export
- [ ] No client-side API routes or server dependencies

### Deployment Layer

- [ ] Static files deploy successfully to target host
- [ ] Video assets load correctly from static paths
- [ ] No 404s on internal navigation
- [ ] HTTPS enforced
- [ ] `Content-Security-Policy` headers configured if host supports it

---

## Appendix A: Content Categories (Proposed)

### Career Paths
1. Pilots (Commercial, Cargo, Military, Private)
2. Aerospace Engineers
3. Air Traffic Controllers
4. Aircraft Maintenance Technicians
5. Drone / UAS Operators
6. Aviation Meteorologists
7. Aerospace Medicine / Flight Surgeons
8. Space Systems Engineers

### STEM Subjects (College Majors)
1. Physics
2. Mathematics
3. Computer Science
4. Materials Science
5. Mechanical Engineering
6. Electrical / Avionics Engineering
7. Atmospheric Science / Meteorology
8. Aeronautical / Astronautical Engineering

## Appendix B: Reference Documents

- `thoughts/research_questions.md` — Initial research questionnaire
- `thoughts/research_findings.md` — Consolidated answers to research questions
- `thoughts/video_player_research.md` — Video.js and alternative player analysis
- `thoughts/shared/research/2026-05-18-aia-proposal-brand-analysis.md` — Brand tone, style, vocabulary, and identity analysis from grant proposal
