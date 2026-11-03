#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
extract_spoken.py — 老 App 口语资产提取器（借鉴搬运 A1/A3 的唯一通道）。

来源：仓库根目录 `萌星小学英语_最终合并版.html`（老 App）三处内嵌字面量
  - DAILY_EXPRESSIONS_DB：144 条场景对话 / 16 场景
  - ORAL_12_SCENES：12 组场景问答
  - GRAMMAR_CHANTS：8 首双语拍手歌
事实源：laws-prototype/model/spoken_data.json（《数据源规范》§1 登记在册）。
  dialogues / scene_qa / chants 逐条逐字段原文保全（不改写、不润色）；
  scenes 为按 scenario_id 生成的索引（标题/类型/条数/id 列表），不复制正文。

对账断言（任一失败即停，退出码 1）：
  - 计数：对话 144 / 场景 16 / 问答 12 / 拍手歌 8；
  - 同一 scenario_id 下 scenario_title 与 scene_type 全一致；
  - 分组索引覆盖全部 144 条恰好一次，分组内记录与源记录深相等；
  - 写盘后回读 spoken_data.json 与源字面量再做一次全量深比。

用法：
  python3 laws-prototype/tools/extract_spoken.py           # 提取 + 对账 + 写盘
  python3 laws-prototype/tools/extract_spoken.py --verify  # 只对账现有 spoken_data.json，不写盘
退出码：0=对账全过；1=断言失败。
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]  # 仓库根
OLD_APP = ROOT / "萌星小学英语_最终合并版.html"
OUT = ROOT / "laws-prototype" / "model" / "spoken_data.json"

EXPECT = {"dialogues": 144, "scenes": 16, "scene_qa": 12, "chants": 8}


def scan_literal(text, i):
    """从 i 起扫描一个 JS 字面量（括号栈 + 字符串感知），返回结束下标（不含）。"""
    pairs = {"{": "}", "[": "]"}
    stack = []
    ins = None
    esc = False
    k = i
    while k < len(text):
        c = text[k]
        if ins:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == ins:
                ins = None
        else:
            if c in "\"'`":
                ins = c
            elif c in pairs:
                stack.append(pairs[c])
            elif stack and c == stack[-1]:
                stack.pop()
                if not stack:
                    return k + 1
        k += 1
    raise ValueError(f"字面量定界失败（起始偏移 {i}）")


def extract_literal(src, anchor):
    j = src.find(anchor)
    if j < 0:
        raise ValueError(f"锚点未找到：{anchor!r}")
    if src.find(anchor, j + 1) >= 0:
        raise ValueError(f"锚点不唯一：{anchor!r}")
    p = j + len(anchor)
    while src[p].isspace():
        p += 1
    return src[p:scan_literal(src, p)]


def fail(msg):
    print("FAIL:", msg)
    sys.exit(1)


def build(src):
    dialogues = json.loads(extract_literal(src, "DAILY_EXPRESSIONS_DB = "))
    scene_qa = json.loads(extract_literal(src, "ORAL_12_SCENES = "))
    chants = json.loads(extract_literal(src, "GRAMMAR_CHANTS = "))

    if len(dialogues) != EXPECT["dialogues"]:
        fail(f"对话条数 {len(dialogues)} != {EXPECT['dialogues']}")
    if len(scene_qa) != EXPECT["scene_qa"]:
        fail(f"场景问答 {len(scene_qa)} != {EXPECT['scene_qa']}")
    if len(chants) != EXPECT["chants"]:
        fail(f"拍手歌 {len(chants)} != {EXPECT['chants']}")

    scenes = []
    by_id = {}
    for rec in dialogues:
        sid = rec["scenario_id"]
        if sid not in by_id:
            by_id[sid] = {
                "scenario_id": sid,
                "scenario_title": rec["scenario_title"],
                "scene_types": [],
                "ids": [],
            }
            scenes.append(by_id[sid])
        else:
            if by_id[sid]["scenario_title"] != rec["scenario_title"]:
                fail(f"{sid} 的 scenario_title 不一致")
        # 注：scene_type 在源里并非每场景单一（SC02 八条中 greeting/thanks_sorry 各半，
        # 记录原文不动），索引只收录出现过的类型集合，不做一致性断言。
        if rec["scene_type"] not in by_id[sid]["scene_types"]:
            by_id[sid]["scene_types"].append(rec["scene_type"])
        by_id[sid]["ids"].append(rec["id"])
    if len(scenes) != EXPECT["scenes"]:
        fail(f"场景数 {len(scenes)} != {EXPECT['scenes']}")
    for sc in scenes:
        sc["count"] = len(sc["ids"])

    data = {
        "meta": {
            "source": "老 App 萌星小学英语_最终合并版.html：DAILY_EXPRESSIONS_DB / ORAL_12_SCENES / GRAMMAR_CHANTS",
            "moved": "2026-11-03 按借鉴清单 A1/A3（Stewart 裁定）逐字提取保全；口语白板 152 页未搬（登记待办）",
            "counts": {
                "dialogues": len(dialogues),
                "scenes": len(scenes),
                "scene_qa": len(scene_qa),
                "chants": len(chants),
            },
        },
        "scenes": scenes,
        "dialogues": dialogues,
        "scene_qa": scene_qa,
        "chants": chants,
    }
    verify(data, dialogues, scene_qa, chants)
    return data


def verify(data, dialogues, scene_qa, chants):
    """分组索引覆盖全量恰好一次且深相等；三仓与源逐条深比。"""
    if data["dialogues"] != dialogues:
        fail("dialogues 与源字面量深比不一致")
    if data["scene_qa"] != scene_qa:
        fail("scene_qa 与源字面量深比不一致")
    if data["chants"] != chants:
        fail("chants 与源字面量深比不一致")
    by_rec = {r["id"]: r for r in dialogues}
    seen = []
    for sc in data["scenes"]:
        if sc["count"] != len(sc["ids"]):
            fail(f"{sc['scenario_id']} count 与 ids 长度不一致")
        for rid in sc["ids"]:
            rec = by_rec.get(rid)
            if rec is None:
                fail(f"索引含未知 id {rid}")
            if rec["scenario_id"] != sc["scenario_id"]:
                fail(f"{rid} 的 scenario_id 与索引分组不一致")
            seen.append(rid)
    if sorted(seen) != sorted(by_rec):
        fail("分组索引未恰好覆盖全部对话一次")


def main(argv):
    if not OLD_APP.exists():
        fail(f"老 App 不在预期位置：{OLD_APP}")
    src = OLD_APP.read_text(encoding="utf-8")
    data = build(src)
    if "--verify" in argv:
        if not OUT.exists():
            fail(f"事实源不存在：{OUT}")
        cur = json.loads(OUT.read_text(encoding="utf-8"))
        if cur != data:
            fail("现有 spoken_data.json 与老 App 源不一致")
        print("VERIFY PASS: spoken_data.json 与老 App 三处源字面量逐条深比一致"
              f"（对话 144 / 场景 16 / 问答 12 / 拍手歌 8）")
        return 0
    OUT.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
    cur = json.loads(OUT.read_text(encoding="utf-8"))
    if cur != data:
        fail("写盘回读不一致")
    print(f"EXTRACT OK: {OUT}（{OUT.stat().st_size} 字节）"
          "— 对话 144 / 场景 16 / 问答 12 / 拍手歌 8，逐条深比对账全过")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
