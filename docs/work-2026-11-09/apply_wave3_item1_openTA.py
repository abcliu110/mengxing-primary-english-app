#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_wave3_item1_openTA.py — 第三波第 1 项：openTA 接标准先修条。

背景：时态站 VB.openTA（主文件约 11960 行）至今没接 LINKGO.preBarHTML /
relSectionHTML；TA 站只有行内 DATA.rel 的“亲戚条”芯片，无 2.2 第一波的
标准先修条（顶部先修条 + 底部“相关规律”块）。先修数据已到位（总表前置
75 对、LINKIDX.g p 槽 75，第二波第 7 项已把 TA 5 对迁入总表并再生 LINKIDX）。

接法（照第一波 2.2 的既有调用点，不改共享函数）：
  顶部：标题 + 时间机器预设行之后、讲解（机制）之前，
        if(window.LINKGO&&LINKGO.preBarHTML){h+=LINKGO.preBarHTML(id);}
        —— 对位 LAW.render（uhead 之后、kid 文之前）、PN vLaw（正式说法之后、
        kidbox 之前）、MZ lawBodyHTML（meta 行之后、机制段之前）。
  底部：亲戚条之后、页尾“版式借鉴 Murphy”注记之前，
        if(window.LINKGO){h+=LINKGO.relSectionHTML(id,'sec');}
        —— flavor 'sec'，与 PN/AR vLaw 同口径；位置对位 LAW.render（练习之后、
        adultHtml 之前）的“底部相关规律块保留”。
  行内 DATA.rel 的 5 条前置边故意不动：VB.openTA 的“亲戚条”芯片直接读它，
  删了会丢页面显示（第二波第 7 项底稿 §2 已登记）。

注意：TA 不在 LAWDATA 里，preBarHTML 按 2.2 模板“无标题只写编号”回落，
芯片只显示编号（如 TA-01），但 lawChip 经 taLanding 判定可点，点击走
LINKGO.openLaw → VB.openTA。标题回落到 ROSTER/DATA.TA 不在本项范围，
如需加须另行定夺（改的是共享 preBarHTML）。

用法：python3 docs/work-2026-11-09/apply_wave3_item1_openTA.py [--apply]
缺省只演练核对；--apply 写回主文件。写回后须重跑 check_all 与 jscheck，
并用 jsdom 核对 5 个有先修的 TA 站出现标准先修条、p/q 对位。
"""

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MAIN = ROOT / "laws-prototype" / "mengxing-prototype-v1.html"

# 锚点 1：预设行（openTA 内唯一）。在其后插顶部先修条。
ANCHOR_TOP = ("  if(pr){ h+='<div class=\"tagrow\"><button class=\"chip gold\" "
              "onclick=\"VB.openMachinePreset(\\''+pr[0]+'\\',\\''+pr[1]+'\\',\\''+pr[2]+'\\')\">"
              "⏰ 在时间机器上打开本条预设 →</button></div>'; "
              "if(DATA.PRESET_NOTES[id]) h+='<div class=\"adult\">'+esc(DATA.PRESET_NOTES[id])+'</div>'; }")
PREBAR = "  if(window.LINKGO&&LINKGO.preBarHTML){h+=LINKGO.preBarHTML(id);}"

# 锚点 2：亲戚条行（openTA 内唯一）。在其后插底部相关规律块。
ANCHOR_REL = "  if(u.rel&&u.rel.length) h+='<h4>亲戚条</h4>"
RELSEC = "  if(window.LINKGO){h+=LINKGO.relSectionHTML(id,'sec');}"
FOOTER = "版式借鉴 Murphy"


def fail(msg):
    print("FAIL:", msg)
    return 1


def main(argv=None):
    ap = argparse.ArgumentParser(description="第 1 项：openTA 接标准先修条（默认演练）")
    ap.add_argument("--apply", action="store_true", help="真正写回主文件")
    args = ap.parse_args(argv)
    text = MAIN.read_text(encoding="utf-8")
    problems = []

    if text.count(ANCHOR_TOP) != 1:
        problems.append(f"顶部锚点（预设行）出现 {text.count(ANCHOR_TOP)} 次（应为 1）")
    if text.count(ANCHOR_REL) != 1:
        problems.append(f"底部锚点（亲戚条行）出现 {text.count(ANCHOR_REL)} 次（应为 1）")
    if text.count(FOOTER) != 1:
        problems.append(f"页尾注记出现 {text.count(FOOTER)} 次（应为 1）")
    # 注意：PREBAR / RELSEC 的同文行在 MZ renderLaw 等处已存在（同文不同函数），
    # 故不做全文件“已存在”检查；重复插入只在 openTA 体内查（见下）。
    start = text.find("function openTA(id){")
    end = text.find("/* ================= 衣橱 ================= */", start)
    if start < 0 or end < 0:
        problems.append("openTA 函数边界未找到")
    else:
        body = text[start:end]
        if "preBarHTML" in body:
            problems.append("openTA 体内已有 preBarHTML，拒绝重复插入")
        if "relSectionHTML" in body:
            problems.append("openTA 体内已有 relSectionHTML，拒绝重复插入")
        if body.count("亲戚条") != 1:
            problems.append(f"openTA 体内“亲戚条”出现 {body.count('亲戚条')} 次（应为 1）")
        # 顺序自检基线：预设行 < 亲戚条 < 页尾注记
        if not (body.find("openMachinePreset") < body.find("亲戚条") < body.find(FOOTER)):
            problems.append("openTA 体内顺序异常：预设行应在亲戚条之前、页尾注记应在亲戚条之后")

    if problems:
        for p in problems:
            print("FAIL:", p)
        return 1
    print("OK 核对通过：预设行/亲戚条/页尾注记各 1 处；openTA 体内无 preBar/relSection；"
          "DATA.rel 亲戚条行未动（本脚本不碰它）")

    if not args.apply:
        print("DRY-RUN：未写文件。加 --apply 写回。")
        return 0

    new = text.replace(ANCHOR_TOP, ANCHOR_TOP + "\n" + PREBAR, 1)
    # 亲戚条行是长行：只在行尾（</div>'; 之前）无法精确定位，改为在该行后插入新行——
    # 该行以 "};" 结尾且独占一行，用行级替换。
    lines = new.split("\n")
    out = []
    inserted = 0
    for ln in lines:
        out.append(ln)
        if ln.strip().startswith("if(u.rel&&u.rel.length)"):
            out.append(RELSEC)
            inserted += 1
    if inserted != 1:
        return fail(f"底部插入命中 {inserted} 行（应为 1），已中止，未写文件")
    new = "\n".join(out)

    body2 = new[new.find("function openTA(id){"):new.find("/* ================= 衣橱 ================= */")]
    # 注意：PREBAR 整行含 2 次 "preBarHTML"（守卫 + 调用），故按整行计数，不按子串计数。
    if body2.count(PREBAR) != 1 or body2.count(RELSEC) != 1:
        return fail("写回自检失败：openTA 体内 preBar/relSection 接入行各应为 1")
    if body2.count("亲戚条") != 1:
        return fail("写回自检失败：亲戚条被误动")
    if not (body2.find("preBarHTML") < body2.find("讲解（机制）") and
            body2.find("relSectionHTML") > body2.find("亲戚条") and
            body2.find("relSectionHTML") < body2.find(FOOTER)):
        return fail("写回自检失败：插入位置顺序异常（顶部条应在机制前、底部块应在亲戚条后页尾前）")
    MAIN.write_text(new, encoding="utf-8")
    print("APPLY 完成：openTA 顶部接 preBarHTML（预设行后、机制前）；"
          "底部接 relSectionHTML('sec')（亲戚条后、页尾注记前）；DATA.rel 未动。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
