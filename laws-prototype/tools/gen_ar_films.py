#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
冠词区白板影片生成器（《数据源规范》§3：内嵌副本只能由脚本从事实源生成）。
2026-11-04 落地批第 4 项新建（Stewart 裁定：冠词区影片数据建 master + 生成器，
补全站最后的数据治理缺口；验收线 = 与现主文件逐字节一致）。

事实源：laws-prototype/model/ar_films.json（21 节 / 105 场，节序与主文件现序一致，
含 GR-15 一节；每节 {id, [pace], name, short, src, scenes:[{cap, svg}]}）。

生成目标：mengxing-prototype-v1.html 冠词区（window.AR）作用域内的
  var WB_SECTIONS = <本生成器输出>;
PN 区的同名变量是代码拼装字面量（单引号 + wbT() 调用），不是 JSON，
本生成器以「可被 json 解析且首节 id 为 C-/GR- 律」定位 AR 字面量，不会误伤 PN。

序列化口径：json.dumps(ensure_ascii=False, indent=1)，与现文件逐字节对齐；
唯一格式例外（历史手工格式，登记在案）：C-16 节首行 "id" 与 "pace" 同行，
生成时把该节的两行并一行（断言恰合并 1 处），其余全部走标准 dumps。
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HTML = ROOT / "mengxing-prototype-v1.html"
MASTER = ROOT / "model" / "ar_films.json"

EXPECTED_SECTIONS = 21
EXPECTED_SCENES = 105
PACE_JOIN_OLD = '"id": "C-16",\n  "pace": 0.91,'
PACE_JOIN_NEW = '"id": "C-16", "pace": 0.91,'


def serialize(data):
    body = json.dumps(data, ensure_ascii=False, indent=1)
    assert body.count(PACE_JOIN_OLD) == 1, "C-16 pace 并行例外未命中（数据或格式已变，先核对）"
    return body.replace(PACE_JOIN_OLD, PACE_JOIN_NEW)


def array_span(text, start):
    """从 '[' 起做字符串感知的括号匹配，返回 ']' 的下标。"""
    depth = 0
    instr = False
    esc = False
    k = start
    while k < len(text):
        c = text[k]
        if instr:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == '"':
                instr = False
        else:
            if c == '"':
                instr = True
            elif c == "[":
                depth += 1
            elif c == "]":
                depth -= 1
                if depth == 0:
                    return k
        k += 1
    raise ValueError("WB_SECTIONS 数组未闭合")


def locate_ar_literal(text):
    """返回 AR 区 WB_SECTIONS 数组字面量的 (start, end) 下标（含两端括号）。"""
    pos = 0
    while True:
        i = text.find("var WB_SECTIONS =", pos)
        if i < 0:
            raise ValueError("未找到 AR 区 WB_SECTIONS 字面量")
        start = text.find("[", i)
        end = array_span(text, start)
        try:
            obj = json.loads(text[start:end + 1])
        except Exception:
            obj = None
        if isinstance(obj, list) and obj and str(obj[0].get("id", "")).startswith(("C-", "GR-")):
            return start, end
        pos = end + 1


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "--check"
    data = json.loads(MASTER.read_text(encoding="utf-8"))
    assert isinstance(data, list) and len(data) == EXPECTED_SECTIONS, f"节数异常：{len(data)}"
    scenes = sum(len(x.get("scenes") or []) for x in data)
    assert scenes == EXPECTED_SCENES, f"场数异常：{scenes}"
    ids = [x["id"] for x in data]
    assert len(set(ids)) == len(ids), "节 id 重复"
    body = serialize(data)

    text = HTML.read_text(encoding="utf-8")
    start, end = locate_ar_literal(text)
    cur = text[start:end + 1]
    if mode == "--check":
        if cur != body:
            print("gen_ar_films --check FAIL：主文件 WB_SECTIONS 与 model/ar_films.json 生成结果不一致")
            return 1
        print(f"gen_ar_films --check OK（{EXPECTED_SECTIONS} 节 / {EXPECTED_SCENES} 场，逐字节一致）")
        return 0
    if mode == "--write":
        if cur == body:
            print("gen_ar_films --write：已是最新，无变化")
            return 0
        HTML.write_text(text[:start] + body + text[end + 1:], encoding="utf-8")
        print("gen_ar_films --write OK：已从 model/ar_films.json 刷新 WB_SECTIONS")
        return 0
    print("用法：gen_ar_films.py [--check|--write]")
    return 2


if __name__ == "__main__":
    sys.exit(main())
