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
    http*|https*|[#]*|javascript:*|mailto:*|tel:*) continue ;;
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
