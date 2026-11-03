#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen_spoken.py — 口语区数据生成器（《数据源规范》§3：内嵌副本只能由脚本从事实源生成）。

事实源：laws-prototype/model/spoken_data.json（老 App 口语资产逐字提取，
  提取通道 tools/extract_spoken.py，带对账断言）。
生成目标：mengxing-prototype-v1.html 口语区 IIFE 内的 `var SP_DATA = <字面量>;` 一段。
序列化格式：紧凑 JSON（分隔符 ","/":"、双引号、非 ASCII UTF-8 原样、无转义），
  与 gen_morph.py 的再生约定一致；按事实源存储键序输出即可逐字节复现。

用法：
  python3 laws-prototype/tools/gen_spoken.py --check   # 只比对：逐字节一致退出 0
  python3 laws-prototype/tools/gen_spoken.py --write   # 写回主文件（仅替换字面量跨度）
退出码：0=逐字节一致/写回完成；1=内容不一致或出错。
"""
import json
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent  # laws-prototype/
JSON_PATH = BASE / "model" / "spoken_data.json"
MAIN = BASE / "mengxing-prototype-v1.html"
ANCHOR = "var SP_DATA = "
MARKER = "/* GENERATED: tools/gen_spoken.py ← model/spoken_data.json · DO NOT EDIT */"


def ensure_marker(src: str, span_start: int) -> str:
    """确保字面量锚点所在行之前有一行生成标记（规范 §3.1）。"""
    a = src.rfind(ANCHOR, 0, span_start)
    if a < 0:
        return src
    ls = src.rfind("\n", 0, a) + 1
    if ls > 0:
        prev_start = src.rfind("\n", 0, ls - 1) + 1
        if src[prev_start:ls - 1].strip() == MARKER:
            return src
    indent = src[ls:a]
    if indent.strip():
        indent = ""
    return src[:ls] + indent + MARKER + "\n" + src[ls:]


def render(obj) -> str:
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":"))


def scan_literal(src: str, start: int) -> int:
    """从 start（指向 { 或 [）起定界扫描（括号栈 + 字符串感知），返回结束下标（不含）。"""
    pairs = {"{": "}", "[": "]"}
    stack = []
    in_str = None
    esc = False
    k = start
    while k < len(src):
        c = src[k]
        if in_str:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == in_str:
                in_str = None
        else:
            if c in "\"'`":
                in_str = c
            elif c in pairs:
                stack.append(pairs[c])
            elif stack and c == stack[-1]:
                stack.pop()
                if not stack:
                    return k + 1
        k += 1
    raise ValueError(f"字面量定界失败（起始偏移 {start}）")


def find_span(src: str):
    hits = []
    i = 0
    while True:
        j = src.find(ANCHOR, i)
        if j < 0:
            break
        p = j + len(ANCHOR)
        while p < len(src) and src[p].isspace():
            p += 1
        if p < len(src) and src[p] in "{[":
            hits.append(p)
        i = j + len(ANCHOR)
    if len(hits) != 1:
        raise ValueError(f"锚点 {ANCHOR!r} 命中 {len(hits)} 处（应为 1），拒绝操作")
    start = hits[0]
    return start, scan_literal(src, start)


def load_rendered() -> str:
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    return render(data)


def main(argv) -> int:
    if len(argv) < 2 or argv[1] not in ("--check", "--write"):
        print(__doc__)
        return 64
    rendered = load_rendered()
    src = MAIN.read_text(encoding="utf-8")
    try:
        s0, s1 = find_span(src)
    except ValueError as e:
        print("ERROR:", e)
        return 1
    existing = src[s0:s1]
    if argv[1] == "--check":
        if rendered == existing:
            print(f"PASS: SP_DATA 字面量逐字节一致（{len(existing)} 字符）")
            return 0
        try:
            same = json.loads(rendered) == json.loads(existing)
        except Exception:
            same = False
        print(f"FAIL: SP_DATA 不一致（再生 {len(rendered)} 字符 / 现行 {len(existing)} 字符；"
              f"内容深相等={same}）")
        return 1
    out = src if rendered == existing else src[:s0] + rendered + src[s1:]
    s0b, _s1b = find_span(out)
    out = ensure_marker(out, s0b)
    if out == src:
        print("写回完成：SP_DATA 与现行逐字节相同、生成标记在位，文件未改动")
        return 0
    MAIN.write_text(out, encoding="utf-8")
    print(f"写回完成：SP_DATA 已由 spoken_data.json 再生（{len(existing)} → {len(rendered)} 字符；生成标记已确保）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
