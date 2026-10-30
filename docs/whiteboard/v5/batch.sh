#!/bin/bash
# batch.sh "<提交说明>" 页签… —— 依次 do_unit，全部过后提交并推 master
cd "$(dirname "$0")"; msg=$1; shift
fail=0
for u in "$@"; do python3 do_unit.py units.json $u > /tmp/du_$u.log 2>&1 || { fail=1; echo "FAILED $u"; tail -5 /tmp/du_$u.log; }; grep -E "缺|v5|errors" /tmp/du_$u.log; done
[ $fail = 1 ] && { echo "有失败，未提交"; exit 1; }
cd ../../..; sed -i "s|^> 更新：[^（]*（|> 更新：$(TZ=Asia/Tokyo date "+%Y-%m-%d %H:%M") JST（$msg；|" docs/whiteboard/HANDOFF.md
git add -A && git -c user.name=abcliu110 -c user.email=abcliu110@users.noreply.github.com commit -qm "feat(v5): $msg v5.1 重画并替换进 App（R1 全过、回归 0 报错）；HANDOFF 更新" && git push -q origin master 2>&1 | tail -2; git log --oneline -1
