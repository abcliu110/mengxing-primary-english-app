#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
词根数据生成器（《数据源规范》§3：内嵌副本只能由脚本从事实源生成）。

事实源：laws-prototype/model/morph_data.json（{data, lawreg}）。
生成目标：mengxing-prototype-v1.html 与 morphology-prototype-v1.html 中的
  const DATA = <字面量>; 与 const LAWREG = <字面量>;
两段字面量。本脚本把事实源按现行文件的确切序列化格式再生为字面量文本，
可与现行内嵌逐字节比对（--check），或写回指定文件（--write）。

序列化格式（2026-11-03 从现行字面量反推，切换阶段 1 实测）：
  - JSON 紧凑式：分隔符 "," 与 ":"，无任何空白；
  - 键与字符串一律双引号；字符串内容不转义正斜杠；
  - 非 ASCII（中文、音标、emoji）一律 UTF-8 原样输出，不用 \\uXXXX；
  - 现行字面量内不含任何反斜杠转义、无浮点数、无整数型键名，
    故 Python json.dumps(ensure_ascii=False, separators=(",", ":"))
    按事实源存储键序输出即可逐字节复现（四段实测全等）。

写回安全边界：只替换以唯一定位锚（"const DATA = " / "const LAWREG = "，
DATA 另以 '{"groups"' 过滤）定界扫描得到的字面量跨度，其余字节原样不动；
锚命中数 != 1 时拒绝操作。

用法：
  python3 laws-prototype/tools/gen_morph.py --check [html ...]   # 默认两个主文件
  python3 laws-prototype/tools/gen_morph.py --write <html>        # 写回一个文件

--check 退出码：0=全部逐字节一致；2=内容深相等但序列化不同；1=内容不一致或出错。
"""
import json
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
JSON_PATH = BASE / "model" / "morph_data.json"
DEFAULT_TARGETS = [BASE / "mengxing-prototype-v1.html", BASE / "morphology-prototype-v1.html"]

SEGMENTS = [
    ("DATA", "const DATA = ", '{"groups"', "data"),
    ("LAWREG", "const LAWREG = ", None, "lawreg"),
]

MAX_DIFFS = 10


def render(obj) -> str:
    """按反推格式把事实源对象渲染为 JS 字面量文本。"""
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":"))


def scan_literal(src: str, start: int) -> int:
    """从 start（指向 { 或 [）起定界扫描，返回字面量结束下标（不含）。与
    check_morph_sync.py 同一扫描逻辑（字符串/注释感知）。"""
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
                return k + 1
        k += 1
    raise ValueError(f"字面量定界失败（起始偏移 {start}）")


def find_span(src: str, anchor: str, must_start_with: str = None):
    """唯一定位锚 → (start, end) 字面量跨度；命中数 != 1 抛错。"""
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
        raise ValueError(f"锚点 {anchor!r} 过滤后命中 {len(hits)} 处（应为 1），拒绝操作")
    start = hits[0]
    return start, scan_literal(src, start)


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
                out.append(f"{path}.{k}: 仅现行有（{_short(b[k])}）")
            elif k not in b:
                out.append(f"{path}.{k}: 仅再生有（{_short(a[k])}）")
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


def classify(generated: str, existing: str):
    """返回 (等级, 说明)：byte=逐字节一致；deep=深相等但序列化不同；diff=内容不一致。"""
    if generated == existing:
        return "byte", f"逐字节一致（{len(existing)} 字符）"
    try:
        g_obj = json.loads(generated)
        e_obj = json.loads(existing)
    except Exception as e:
        return "diff", f"现行字面量无法按 JSON 解析比对: {e}"
    if canon(g_obj) == canon(e_obj):
        n = min(len(generated), len(existing))
        i = next((k for k in range(n) if generated[k] != existing[k]), n)
        ctx_g = generated[max(0, i - 30): i + 30]
        ctx_e = existing[max(0, i - 30): i + 30]
        return "deep", (
            f"深相等但序列化不同：首个差异在第 {i} 字符"
            f"（再生长 {len(generated)} / 现行长 {len(existing)}）\n"
            f"    再生: ...{ctx_g!r}...\n"
            f"    现行: ...{ctx_e!r}..."
        )
    lines = diff_paths(g_obj, e_obj)
    return "diff", "内容不一致，差异位置（最多 %d 处）:\n" % MAX_DIFFS + "\n".join(
        f"    {ln}" for ln in lines
    )


def load_master():
    master = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    return {key: render(master[key]) for _, _, _, key in SEGMENTS}


def check_file(path: Path, rendered: dict) -> int:
    """逐段比对。返回 0/2/1（取最差等级）。"""
    src = path.read_bytes().decode("utf-8")
    worst = 0
    for label, anchor, start_filter, key in SEGMENTS:
        s0, s1 = find_span(src, anchor, start_filter)
        level, msg = classify(rendered[key], src[s0:s1])
        print(f"[{path.name}] {label}: {msg}")
        if level == "deep":
            worst = max(worst, 2)
        elif level == "diff":
            worst = max(worst, 1) if worst != 1 else 1
            worst = 1
    return worst


def write_file(path: Path, rendered: dict) -> None:
    raw = path.read_bytes()
    src = raw.decode("utf-8")
    spans = []
    for label, anchor, start_filter, key in SEGMENTS:
        s0, s1 = find_span(src, anchor, start_filter)
        spans.append((s0, s1, label, rendered[key]))
    out = src
    changed = []
    for s0, s1, label, text in sorted(spans, reverse=True):
        if out[s0:s1] != text:
            changed.append(label)
        out = out[:s0] + text + out[s1:]
    new_raw = out.encode("utf-8")
    if new_raw != raw:
        path.write_bytes(new_raw)
    print(
        f"[{path.name}] 写回完成：{'、'.join(changed) if changed else '两段均与现行逐字节相同，文件未改动'}"
        f"（文件 {len(raw)} → {len(new_raw)} 字节）"
    )


def main(argv) -> int:
    rendered = load_master()
    if len(argv) >= 2 and argv[1] == "--check":
        targets = [Path(p) for p in argv[2:]] or DEFAULT_TARGETS
        worst = 0
        for t in targets:
            try:
                rc = check_file(t, rendered)
            except Exception as e:
                print(f"[{t.name}] ERROR: {e}")
                rc = 1
            if rc == 1:
                worst = 1
            elif rc == 2 and worst == 0:
                worst = 2
        print("结论:", {0: "全部逐字节一致", 2: "内容一致但序列化有别", 1: "存在不一致"}[worst])
        return worst
    if len(argv) == 3 and argv[1] == "--write":
        write_file(Path(argv[2]), rendered)
        return 0
    print(__doc__)
    return 64


if __name__ == "__main__":
    sys.exit(main(sys.argv))
