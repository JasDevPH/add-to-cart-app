#!/usr/bin/env bash
# Renders the app icon / splash PNGs from assets/brand/logo.svg using headless Edge.
# Usage: bash scripts/render-brand.sh   (Windows, Git Bash)
set -euo pipefail

EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
ROOT="$(cd "$(dirname "$0")/.." && pwd -W)"
TMP="$ROOT/.brand-tmp"
mkdir -p "$TMP"

# Bag + dot only (no tile), used for adaptive foreground / monochrome.
BAG='<g transform="translate(0 -34)" fill="none" stroke="STROKE" stroke-width="44" stroke-linecap="round" stroke-linejoin="round"><path d="M312 420 H712 L684 776 Q680 812 644 812 H380 Q344 812 340 776 Z"/><path d="M412 420 V384 Q412 284 512 284 Q612 284 612 384 V420"/></g><circle cx="512" cy="586" r="38" fill="DOT"/>'

render() { # name size svg-body
  local name=$1 size=$2 body=$3
  cat > "$TMP/$name.html" <<EOF
<!doctype html><html><head><style>html,body{margin:0;background:transparent}svg{display:block}</style></head>
<body><svg xmlns="http://www.w3.org/2000/svg" width="$size" height="$size" viewBox="0 0 1024 1024">$body</svg></body></html>
EOF
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --default-background-color=00000000 \
    --window-size=$size,$size --screenshot="$TMP/$name.png" "file:///$TMP/$name.html" >/dev/null 2>&1
}

TILE='<rect width="1024" height="1024" rx="232" fill="#111111"/>'
SQUARE='<rect width="1024" height="1024" fill="#111111"/>'
WHITE_BAG=${BAG//STROKE/#FFFFFF}; WHITE_BAG=${WHITE_BAG//DOT/#10B981}
MONO_BAG=${BAG//STROKE/#FFFFFF}; MONO_BAG=${MONO_BAG//DOT/#FFFFFF}

render icon 1024 "$SQUARE$WHITE_BAG"                       # iOS/legacy icon (OS rounds corners)
render android-icon-foreground 1024 "$WHITE_BAG"           # adaptive foreground (inside 66% safe zone)
render android-icon-monochrome 1024 "$MONO_BAG"            # themed icon (Android 13+)
render android-icon-background 1024 '<rect width="1024" height="1024" fill="#111111"/>'
render splash-icon 1024 "$TILE$WHITE_BAG"                  # rounded tile on light splash background
render favicon 48 "$TILE$WHITE_BAG"
render logo-mark 192 "$TILE$WHITE_BAG"                     # in-app header logo

for f in icon android-icon-foreground android-icon-monochrome android-icon-background splash-icon favicon; do
  cp "$TMP/$f.png" "$ROOT/assets/$f.png"
done
mkdir -p "$ROOT/src/assets"
cp "$TMP/logo-mark.png" "$ROOT/src/assets/logo-mark.png"
rm -rf "$TMP"
echo "Brand assets rendered."
