#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
词根数据同步校验门（《数据源规范》§6 第一条）。

事实源：laws-prototype/model/morph_data.json（{data, lawreg}）。
受控副本：mengxing-prototype-v1.html 与 morphology-prototype-v1.html 内嵌的
const DATA / const LAWREG 字面量。

三方两两深比较（json ↔ 主文件、json ↔ morphology、主文件 ↔ morphology，
DATA 与 LAWREG 分开比）。全部一致退出 0；任一不一致退出 1 并打印差异路径。
不修改任何文件。依赖：python3 + node（用 node 求值 JS 字面量，与运行时语义一致）。

用法：python3 laws-prototype/tools/check_morph_sync.py
"""
import json
import subprocess
import sys
import tempfile
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
JSON_PATH = BASE / "model" / "morph_data.json"
MAIN_HTML = BASE / "mengxing-prototype-v1.html"
MORPH_HTML = BASE / "morphology-prototype-v1.html"

MAX_DIFFS = 20


def scan_literal(src: str, start: int) -> str:
    """从 start（指向 { 或 [）起做定界扫描，返回完整字面量文本。"""
    open_c = src[start]
    close_c = "}" if open_c == "{" else "]"
    depth = 0
    in_str = None
    esc = False
    line_c = block_c = False
    k = start
    while k < len(src):
        c = src[k]
        n = src[k + 1] if k + 1 < len(src) else ""
        if line_c:
            if c == "\n":
                line_c = False
            k += 1
            continue
        if block_c:
            if c == "*" and n == "/":
                block_c = False
                k += 2
                continue
            k += 1
            continue
        if in_str:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == in_str:
                in_str = None
            k += 1
            continue
        if c == "/" and n == "/":
            line_c = True
            k += 2
            continue
        if c == "/" and n == "*":
            block_c = True
            k += 2
            continue
        if c in "\"'`":
            in_str = c
            k += 1
            continue
        if c == open_c:
            depth += 1
        elif c == close_c:
            depth -= 1
            if depth == 0:
                return src[start : k + 1]
        k += 1
    raise ValueError(f"字面量定界失败（起始偏移 {start}）")


def extract_literal(src: str, anchor: str, must_start_with: str = None) -> str:
    hits = []
    i = 0
    while True:
        j = src.find(anchor, i)
        if j < 0:
            break
        p = j + len(anchor)
        while p < len(src) and src[p].isspace():
            p += 1
        if p < len(src) and src[p] in "{[":
            if must_start_with is None or src.startswith(must_start_with, p):
                hits.append(p)
        i = j + len(anchor)
    if len(hits) != 1:
        raise ValueError(f"锚点 {anchor!r} 过滤后命中 {len(hits)} 处（应为 1）")
    return scan_literal(src, hits[0])


NODE_HELPER = (
    "const fs=require('fs');"
    "const t=fs.readFileSync(process.argv[2],'utf8');"
    "const v=eval('('+t+')');"
    "fs.writeFileSync(process.argv[3], JSON.stringify(v));"
)


def eval_literal(literal: str):
    with tempfile.TemporaryDirectory() as td:
        lit = Path(td) / "lit.js"
        out = Path(td) / "out.json"
        helper = Path(td) / "helper.js"
        lit.write_text(literal, encoding="utf-8")
        helper.write_text(NODE_HELPER, encoding="utf-8")
        r = subprocess.run(
            ["node", str(helper), str(lit), str(out)],
            capture_output=True, text=True,
        )
        if r.returncode != 0:
            raise RuntimeError(f"node 求值失败: {r.stderr.strip()[:400]}")
        return json.loads(out.read_text(encoding="utf-8"))


def load_html_side(path: Path):
    src = path.read_text(encoding="utf-8")
    data = eval_literal(extract_literal(src, "const DATA = ", '{"groups"'))
    lawreg = eval_literal(extract_literal(src, "const LAWREG = "))
    return data, lawreg


def canon(obj) -> str:
    return json.dumps(obj, sort_keys=True, ensure_ascii=False, separators=(",", ":"))


def _short(v) -> str:
    s = json.dumps(v, ensure_ascii=False)
    return s if len(s) <= 80 else s[:77] + "..."


def diff_paths(a, b, path="$", out=None):
    if out is None:
        out = []
    if len(out) >= MAX_DIFFS:
        return out
    if type(a) is not type(b):
        out.append(f"{path}: 类型不同 {type(a).__name__} != {type(b).__name__}（{_short(a)} vs {_short(b)}）")
        return out
    if isinstance(a, dict):
        for k in sorted(set(a) | set(b)):
            if len(out) >= MAX_DIFFS:
                break
            if k not in a:
                out.append(f"{path}.{k}: 仅右侧有（{_short(b[k])}）")
            elif k not in b:
                out.append(f"{path}.{k}: 仅左侧有（{_short(a[k])}）")
            else:
                diff_paths(a[k], b[k], f"{path}.{k}", out)
    elif isinstance(a, list):
        if len(a) != len(b):
            out.append(f"{path}: 数组长度 {len(a)} != {len(b)}")
        for idx in range(min(len(a), len(b))):
            if len(out) >= MAX_DIFFS:
                break
            diff_paths(a[idx], b[idx], f"{path}[{idx}]", out)
    elif a != b:
        out.append(f"{path}: {_short(a)} != {_short(b)}")
    return out


def compare(label: str, left_name: str, left, right_name: str, right) -> bool:
    if canon(left) == canon(right):
        print(f"PASS {label}: {left_name} == {right_name}")
        return True
    print(f"FAIL {label}: {left_name} != {right_name}，差异位置（最多 {MAX_DIFFS} 处）:")
    for line in diff_paths(left, right):
        print(f"  {line}")
    return False


def main() -> int:
    try:
        master = json.loads(JSON_PATH.read_text(encoding="utf-8"))
        j_data, j_lawreg = master["data"], master["lawreg"]
        m_data, m_lawreg = load_html_side(MAIN_HTML)
        o_data, o_lawreg = load_html_side(MORPH_HTML)
    except Exception as e:  # 抽取/解析失败即校验失败
        print(f"ERROR 抽取或解析失败: {e}")
        return 1

    ok = True
    for label, j, m, o in (
        ("DATA", j_data, m_data, o_data),
        ("LAWREG", j_lawreg, m_lawreg, o_lawreg),
    ):
        ok &= compare(label, "morph_data.json", j, "mengxing-prototype-v1.html", m)
        ok &= compare(label, "morph_data.json", j, "morphology-prototype-v1.html", o)
        ok &= compare(label, "mengxing-prototype-v1.html", m, "morphology-prototype-v1.html", o)

    print("结论:", "三方一致" if ok else "存在不一致（见上）")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
