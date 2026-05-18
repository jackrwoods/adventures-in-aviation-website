# Adventures in Aviation Website — Research Findings

## 1. Audience & Content Strategy

| Question | Answer |
|----------|--------|
| Target age range | **10–18 years old** |
| Content types | **Blog posts with minimal text; mostly video content** |
| Publishing cadence | **Infrequent; written by the stakeholder** |
| Baseline knowledge | **Complete beginners** |

## 2. Visual Identity & Brand

| Question | Answer |
|----------|--------|
| Existing logo/assets | **No** |
| Imagery sources | **Stock photos initially; transition to original photography later. DO NOT USE AI-GENERATED VISUALS.** |
| Issues with reference design | 1. AI-generated imagery looks bad<br>2. Over-reliance on stock images<br>3. Gradients imply skeuomorphic/corporate design from ~15 years ago<br>4. Customer testimonials with fake people are a bad idea |

## 3. Technical Requirements

| Question | Answer |
|----------|--------|
| Build tool | **Next.js** |
| Hosting | **Out of scope for now** |
| Non-technical publishing | **Yes, eventually — out of scope for now** |
| Domain | **Out of scope for now** |

## 4. Functional Requirements

| Question | Answer |
|----------|--------|
| Donations | **Future requirement — out of scope for now** |
| Newsletter | **Future requirement — out of scope for now** |
| Search | **Curated navigation sufficient for now** |
| Accessibility | **WCAG 2.1 AA** |
| Privacy/COPPA | **Do not collect any personally-identifiable information** |

## 5. Navigation & Information Architecture

| Question | Answer |
|----------|--------|
| Content organization | **By career path and/or STEM subject (college majors)** |
| Cross-linking / lesson plans | **Out of scope for now** |
| External partner resources | **Yes — EAA, AOPA, FAA, etc.** |

## 6. Competitive & Comparative Research

| Question | Answer |
|----------|--------|
| Sites you admire | *(No answer provided)* |
| Sites you hate | *(No answer provided)* |

---

## Design Implications (Preliminary)

- **Tone**: Educational but not patronizing. Target is 10–18 (tweens/teens), so avoid "kiddie" aesthetics but also avoid the corporate/LinkedIn vibe of the reference image.
- **Visual language**: Flat/modern, no gradients, no skeuomorphism. Authentic photography over stock-looking composites.
- **Trust signals**: No fake testimonials. Trust must come from real credentials, partner affiliations, and content quality.
- **Privacy-first**: No cookies, no tracking, no PII forms. This rules out most third-party analytics and embedded newsletter signups.
- **Video-first UX**: The page layouts must prioritize video embeds over long-form text.
- **Build target**: Next.js static export is the likely path given no hosting requirements yet.
