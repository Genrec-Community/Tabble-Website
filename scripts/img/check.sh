#!/bin/bash
# Vision-check candidate images; extract message content
check() {
  local label="$1"; local url="$2"
  local out
  out=$(timeout 90 z-ai vision -p "In 2 short sentences: what does this image show? Is it a clean real photograph suitable for a warm restaurant-brand website (answer YES or NO), and does it have any watermark, heavy text overlay, or is it a product screenshot/mockup?" -i "$url" 2>/dev/null)
  local content
  content=$(printf '%s' "$out" | python3 -c "
import json,sys
raw = sys.stdin.read()
start = raw.find('{')
try:
    d = json.loads(raw[start:])
    print(d.get('choices',[{}])[0].get('message',{}).get('content','NO CONTENT'))
except Exception as e:
    print('PARSE ERROR')
")
  echo "=== $label ==="
  echo "$content"
  echo ""
}
check "$1" "$2"
