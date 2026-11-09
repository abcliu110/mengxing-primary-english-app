#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""wave6_item11_vtech_selfproof.py — 第六波第 11 项反向自证（只读探针，不改仓库文件）。

对主文件各做 1 处单点变异（副本在工作树内临时目录，做完即删），
跑扩面后的 check_badge_erridx.py，每处应报且只报 1 行不符、退出码 1：
  1. 痛点组徽标：TEC-V01 痛点行路名 词汇与构词路 → 语法与句法路
  2. 路组徽标：TEC-G30 路组行区名 语法区 → 拼读区
  3. 区组徽标：TEC-S01 区组行定位 先行 → 进阶
  4. 分组头计数：记不住（40 条次）→（41 条次）

用法：python3 docs/work-2026-11-09/wave6_item11_vtech_selfproof.py
退出码：0=4 处自证全过；1=有自证失败。
"""
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MAIN = ROOT / "laws-prototype" / "mengxing-prototype-v1.html"
GATE = ROOT / "laws-prototype" / "tools" / "check_badge_erridx.py"
SCRATCH = ROOT / ".selfproof-wave6-item11"

MUTATIONS = [
    ("痛点组徽标",
     '<div class="gh">记不住（40 条次）</div><div class="urow" data-tec="TEC-V01">'
     '<span class="id">TEC-V01</span>'
     '<span class="tt">认词先认「劳模词」</span><span class="st ok">词汇与构词路</span></div>',
     '<div class="gh">记不住（40 条次）</div><div class="urow" data-tec="TEC-V01">'
     '<span class="id">TEC-V01</span>'
     '<span class="tt">认词先认「劳模词」</span><span class="st ok">语法与句法路</span></div>'),
    ("路组徽标",
     '<div class="urow" data-tec="TEC-G30"><span class="id">TEC-G30</span>'
     '<span class="tt">说过去习惯先分家：状态归 used to，动作回放才用 would</span>'
     '<span class="st ok">语法区</span></div>',
     '<div class="urow" data-tec="TEC-G30"><span class="id">TEC-G30</span>'
     '<span class="tt">说过去习惯先分家：状态归 used to，动作回放才用 would</span>'
     '<span class="st ok">拼读区</span></div>'),
    ("区组徽标",
     '<div class="urow" data-tec="TEC-S01"><span class="id">TEC-S01</span>'
     '<span class="tt">读到生词先自己拼，拼对了就等于学会了。</span>'
     '<span class="st part">先行</span></div>',
     '<div class="urow" data-tec="TEC-S01"><span class="id">TEC-S01</span>'
     '<span class="tt">读到生词先自己拼，拼对了就等于学会了。</span>'
     '<span class="st part">进阶</span></div>'),
    ("分组头计数",
     '记不住（40 条次）',
     '记不住（41 条次）'),
]


def main():
    src = MAIN.read_text(encoding="utf-8")
    SCRATCH.mkdir(exist_ok=True)
    ok = True
    try:
        for label, old, new in MUTATIONS:
            if src.count(old) != 1:
                print(f"SELFPROOF FAIL [{label}]：变异锚点出现 {src.count(old)} 次（应为 1），"
                      f"无法单点变异")
                ok = False
                continue
            copy = SCRATCH / "probe.html"
            copy.write_text(src.replace(old, new, 1), encoding="utf-8")
            r = subprocess.run([sys.executable, str(GATE), str(copy)],
                               capture_output=True, text=True)
            # 问题行以 "FAIL:" 开头；末尾另有 1 行汇总 "FAIL: …对账失败：N 行不符"，
            # 只计问题行，不计汇总行。
            fails = [ln for ln in r.stdout.splitlines()
                     if ln.startswith("FAIL:") and "对账失败" not in ln]
            print(f"[{label}] 退出码 {r.returncode}，FAIL 行 {len(fails)} 条")
            for ln in fails:
                print("   ", ln[:220])
            if r.returncode != 1 or len(fails) != 1:
                print(f"SELFPROOF FAIL [{label}]：应报且只报 1 行（退出码 1），"
                      f"实为 {len(fails)} 行（退出码 {r.returncode}）")
                ok = False
            copy.unlink()
    finally:
        shutil.rmtree(SCRATCH, ignore_errors=True)
    print("SELFPROOF:", "全部通过（4/4 各报且只报 1 行）" if ok else "有失败项")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
