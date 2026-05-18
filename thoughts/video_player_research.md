# Open-Source Video Player Options for Self-Hosted Video

## Recommended: Video.js

- **URL**: https://videojs.com
- **License**: Apache 2.0
- **Pros**: Most widely used open-source HTML5 player; excellent accessibility (keyboard controls, ARIA labels, screen-reader support); responsive by default; extensive plugin ecosystem; no telemetry or tracking.
- **Cons**: Slightly larger bundle than minimal alternatives.
- **Why it fits**: WCAG 2.1 AA compliance is built-in. No third-party cookies. Works with self-hosted MP4/WebM files via the standard HTML5 `<video>` element.

## Alternative: Plyr

- **URL**: https://github.com/sampotts/plyr
- **License**: MIT
- **Pros**: Lightweight, modern UI, no dependencies, accessibility-first.
- **Cons**: Smaller community than Video.js; fewer advanced plugins.

## Alternative: Native HTML5 `<video>`

- **Pros**: Zero dependencies, smallest bundle, full browser control.
- **Cons**: Inconsistent UI across browsers; lacks advanced accessibility polish (custom controls needed for full WCAG AA).

## Decision

**Recommend Video.js** for production-grade accessibility and future flexibility, with a fallback to native HTML5 for the lightest possible static build if bundle size becomes critical.

## Video Delivery Notes (for design context)

- Self-hosted MP4 (H.264) is the safest codec for cross-browser compatibility.
- For a static Next.js export, videos can live in `/public/videos/` and be served as static assets.
- If video library grows large, a separate object-store/CDN (Cloudflare R2, Backblaze B2) will be needed, but that is out of scope for now.
