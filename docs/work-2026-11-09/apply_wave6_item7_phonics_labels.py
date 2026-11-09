#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_wave6_item7_phonics_labels.py — 第六波第 7 项：拼读区 ERRIDX 与律页
cases 口径分叉（49 行）标注“索引有、律页无”，不补齐律页 cases。

定夺（主对话 Muse 已定，不重新定夺）：49 行分叉是数据模型区别，不是缺
内容；补齐须先定 phonics 律页病例口径，本波不写新病例内容。只在孩子看得
见的拼读索引（#v-phon-laws 静态行）上把分叉标出来，不再是悄悄漂移。

做法（只做标注，不改数据、不改徽标）：
  1. 49 行（PHONLAWS cases == 0 且再生 ERRIDX > 0 的 S/SR 行）各加一个
     <span class="ph-note"> 索引有 · 律页无</span>，紧跟在徽标 span 之后；
     另 3 行（S-14、S-43、SR-04，cases > 0 且 ERRIDX == cases）不动。
     标注 span 不用 `st` class，不进徽标门禁的徽标计数（门禁仍按 299 行
     对账，见 check_badge_erridx.py），也不改行内标题与徽标文本。
  2. #v-phon-laws 区首 <p class="sub"> 末尾加一句，解释这个标记。
  3. 加一条 `.urow .ph-note` 样式（虚线边框小 pill，与实心徽标区分，
     沿用 .lz-pre 的暖金配色 #f7ecd2 / #8a6a1f）。

49 行集合由脚本实时算出（PHONLAWS cases + gen_errors.build 再生
ERRIDX），不是手抄名单；断言每行现行徽标与 prb 口径一致才动手，
与底稿 wave6_item7_phonics_labels.md 的实测数字互相核对。

用法：
  python3 docs/work-2026-11-09/apply_wave6_item7_phonics_labels.py           # 演练
  python3 docs/work-2026-11-09/apply_wave6_item7_phonics_labels.py --apply   # 写回
退出码：0=演练/写回成功；1=断言失败（拒绝写回）。
"""
import json
import re
import sys
from collections import Counter
from pathlib import Path

HERE = Path(__file__).resolve().parent
BASE = HERE.parent.parent
MAIN = BASE / "laws-prototype" / "mengxing-prototype-v1.html"
TOOLS = BASE / "laws-prototype" / "tools"

sys.path.insert(0, str(TOOLS))
from check_badge_erridx import get_literal  # noqa: E402
import gen_errors  # noqa: E402

MARKER = ('<span class="ph-note" title="错句索引里有这条的病例，'
          '规律页上还没放进来">索引有 · 律页无</span>')
SUB_OLD = "没有的会如实标出来）。"
SUB_NEW = ("没有的会如实标出来）。标「索引有 · 律页无」的行：错句索引里有"
           "这条的病例，规律页上还没放进来。")
CSS_ANCHOR = ".st.wait{background:#e8edd8;color:#5c6648}"
CSS_NEW = (".st.wait{background:#e8edd8;color:#5c6648}\n"
           ".urow .ph-note{flex:none;font-size:11px;font-weight:700;"
           "border-radius:999px;padding:2px 9px;margin-left:6px;"
           "white-space:nowrap;background:#fffdf4;color:#8a6a1f;"
           "border:1px dashed #d9b96a}")
PART_PRB = "还没有病例 · 有理解探针"
PART_NOPRB = "还没有病例 · 还没有理解探针"


def compute_target(text):
    """算出 49 行集合：PHONLAWS cases==0 且再生 ERRIDX>0。"""
    phon = get_literal(text, "var PHONLAWS=")
    master = json.loads((BASE / "laws-prototype" / "model"
                         / "laws_master.json").read_text(encoding="utf-8"))
    contrast = json.loads((BASE / "laws-prototype" / "model"
                           / "contrast_pages.json").read_text(encoding="utf-8"))
    built, _stats = gen_errors.build(master, contrast)
    gen_n = Counter(c[0] for c in built["cases"])
    target, untouched, problems = [], [], []
    for lid in sorted(phon):
        entry = phon[lid] or {}
        pc = len(entry.get("cases") or [])
        prb = len(entry.get("prb") or [])
        en = gen_n.get(lid, 0)
        if pc == 0 and en > 0:
            target.append((lid, prb))
        elif pc > 0:
            if en != pc:
                problems.append(f"{lid}：cases={pc} 但 ERRIDX={en}，不在 49 行"
                                "口径内（律页病例数与索引数不一致，需另行定夺）")
            untouched.append(lid)
        else:
            problems.append(f"{lid}：cases=0 且 ERRIDX=0，既无律页病例也无"
                            "索引病例，不在 49 行口径内")
    return target, untouched, problems


def main(argv):
    apply = "--apply" in argv
    text = MAIN.read_text(encoding="utf-8")
    if 'class="ph-note"' in text:
        print("FAIL: 主文件已有 ph-note 标注（疑似已实施），拒绝重复写回")
        return 1
    target, untouched, problems = compute_target(text)
    if problems:
        for p in problems:
            print("FAIL:", p)
        return 1
    if len(target) != 49:
        print(f"FAIL: 算出目标行 {len(target)} 行（应为 49 行）："
              f"{[t[0] for t in target]}")
        return 1
    if sorted(untouched) != ["S-14", "S-43", "SR-04"]:
        print(f"FAIL: 未标注行应为 S-14/S-43/SR-04，现为 {sorted(untouched)}")
        return 1
    # 取拼读区段，逐行核对徽标后插入标注
    sec_anchor = '<section class="view" id="v-phon-laws">'
    s = text.find(sec_anchor)
    if s < 0:
        print("FAIL: 未找到 #v-phon-laws 区段")
        return 1
    e = text.find("<section", s + len(sec_anchor))
    seg = text[s:None if e < 0 else e]
    new_seg = seg
    for lid, prb in target:
        want_badge = PART_PRB if prb > 0 else PART_NOPRB
        pat = re.compile(r'(<div class="urow" data-law="' + re.escape(lid) +
                         r'"><span class="id">' + re.escape(lid) +
                         r'</span><span class="tt">.*?</span>'
                         r'<span class="st part">' + re.escape(want_badge) +
                         r'</span>)(</div>)', re.S)
        m = pat.search(new_seg)
        if not m:
            print(f"FAIL: {lid} 行未按预期徽标「{want_badge}」找到，拒绝写回")
            return 1
        new_seg = pat.sub(lambda mm: mm.group(1) + MARKER + mm.group(2),
                          new_seg, count=1)
    if new_seg.count('class="ph-note"') != 49:
        print("FAIL: 插入后标注数不为 49，拒绝写回")
        return 1
    # 区首说明句
    if seg.count(SUB_OLD) != 1:
        print(f"FAIL: 区首说明句锚点命中 {seg.count(SUB_OLD)} 处（应为 1）")
        return 1
    new_seg = new_seg.replace(SUB_OLD, SUB_NEW, 1)
    new_text = text[:s] + new_seg + text[None if e < 0 else e:]
    # 样式
    if new_text.count(CSS_ANCHOR) != 1:
        print(f"FAIL: 样式锚点命中 {new_text.count(CSS_ANCHOR)} 处（应为 1）")
        return 1
    new_text = new_text.replace(CSS_ANCHOR, CSS_NEW, 1)
    print(f"目标行 49 行：{[t[0] for t in target]}")
    print(f"未标注行：{sorted(untouched)}（cases>0 且 ERRIDX==cases）")
    print("改动：49 行各 +1 个 ph-note 标注；区首 sub +1 句；样式 +1 条")
    if not apply:
        print("演练模式，未写回（加 --apply 写回）")
        return 0
    MAIN.write_text(new_text, encoding="utf-8")
    print("已写回主文件")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
