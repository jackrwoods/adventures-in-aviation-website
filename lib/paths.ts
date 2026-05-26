/**
 * Returns the basePath prefix for static assets.
 *
 * Next.js automatically prepends `basePath` to `<Link>` hrefs and
 * `/_next/` chunk URLs, but it does NOT prepend it to `src`
 * attributes on `<img>`, `<video>`, or `next/image` with
 * `unoptimized: true`. Use this utility for those cases.
 */
const basePath = process.env.NODE_ENV === "production"
  ? "/adventures-in-aviation-website"
  : "";

export function assetPath(path: string): string {
  return `${basePath}${path}`;
}