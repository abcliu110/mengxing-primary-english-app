#!/bin/bash
# run_auto.sh <页签> <案例号> <库名> <INV> <标题> <acts JSON> <帧...>  —— 生成 + 打包 + R1 + 联络表
set -e; cd "$(dirname "$0")"
tab=$1; n=$2; lib=$3; inv=$4; title=$5; acts=$6; shift 6
[ $# -gt 0 ] && python3 sprites/build_sprites.py $lib "$@" >/dev/null || [ -f sprites/$lib.js ] || echo 'export const FR = {}; export const FI = {};' > sprites/$lib.js
python3 gen_auto.py $inv $n $tab $lib "$title" "$acts"
node build.mjs scenes/${tab}_$n.js out/${tab}_$n.html "$title"
python3 r1v5.py $inv $n scenes/${tab}_$n.js ../lab/INVENTORY_${tab^^}_${n}_V5.md
d=$(node -e "")
python3 shots.py out/${tab}_$n.html /tmp/${tab}_$n.png 1 6 12 25 40 60 80 100 300
