#!/bin/bash
# Sequential stock image fetcher — captures stdout (the -o flag is broken in this CLI build)
cd /home/z/my-project/scripts/img

fetch() {
  local name="$1"; local query="$2"
  if [ -s "${name}.json" ] && grep -q '"success": true' "${name}.json" 2>/dev/null; then
    echo "[skip] ${name} already done"
    return 0
  fi
  for attempt in 1 2 3; do
    echo "[fetch] ${name} attempt ${attempt}"
    out=$(timeout 150 z-ai image-search -q "${query}" --count 4 --gl us --no-rank 2>/dev/null)
    json=$(printf '%s' "$out" | sed -n '/^{/,$p')
    if [ -n "$json" ] && printf '%s' "$json" | grep -q '"success": true'; then
      printf '%s' "$json" > "${name}.json"
      echo "[ok] ${name}"
      sleep 6
      return 0
    fi
    sleep 12
  done
  echo "[fail] ${name}"
  return 1
}

fetch "rest_interior" "warm cozy restaurant interior with ambient lighting and wooden tables in the evening"
fetch "qr_scan" "person scanning QR code menu with smartphone at restaurant table"
fetch "indian_food" "colorful indian thali food platter with curries and naan close up"
fetch "chef" "chef plating a gourmet dish in a professional restaurant kitchen"
fetch "diners" "happy young friends dining together at a restaurant table"
fetch "owner" "smiling restaurant owner standing at the counter of his small restaurant"

echo "ALL_DONE"
