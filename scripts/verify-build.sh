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
  echo "WARNING: app/api/ contains files -- static export may include server routes."
else
  echo "No API routes found."
fi

echo ""
echo "=== Build verification complete ==="
