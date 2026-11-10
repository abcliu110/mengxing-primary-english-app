#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
check_js_syntax.py — jscheck node --check 门禁（2026-11-09，第四波第 8 项）。

把 docs/whiteboard/src/jscheck.py 的 node --check 接进 check_all 链。
jscheck.py 曾在末尾跑 anchorcheck（补丁锚点 / 插入标记），其 116 项失败是
与起点 e97aaec 逐项一致的基线遗留；anchorcheck 已于 2026-11-09 第六波
第 9 项正式废止（见 docs/whiteboard/src/anchorcheck.RETIRED.md），
jscheck.py 不再调用它，退出码只由 node --check 决定。jscheck.py 没有
只跑语法的开关，且顶层代码无 main 守卫、不可 import，故本薄 wrapper
以子进程调用它，只取它输出里的 "node --check:" 汇总行定通过与否；
anchorcheck 相关行的忽略分支保留作防御性代码（jscheck 已不再输出这类行）。

判定口径（与 jscheck.py 同源，不复制抽取逻辑）：
  jscheck 抽出主文件全部直接执行的 <script>（41 个内联脚本；白板懒加载
  模块通常 0 个）拼成一个 js 检查；汇总行 "node --check: inline
  scripts=N, lazy modules=M → OK/FAIL" 为 OK 即通过。

用法：
  python3 tools/check_js_syntax.py            # 校验主文件
  python3 tools/check_js_syntax.py <html路径>  # 校验指定副本（自证用）
退出码：0=通过；1=node --check 失败；2=用法错误 / jscheck 未输出汇总行。
"""
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
MAIN = ROOT / "laws-prototype" / "mengxing-prototype-v1.html"
JSCHECK = ROOT / "docs" / "whiteboard" / "src" / "jscheck.py"

SUMMARY_RE = re.compile(r"node --check: inline scripts=(\d+), "
                        r"lazy modules=(\d+) → (OK|FAIL)")


def main(argv):
    path = Path(argv[1]) if len(argv) > 1 else MAIN
    if len(argv) > 2:
        print(__doc__)
        return 2
    if not JSCHECK.is_file():
        print(f"FAIL: 未找到 jscheck.py：{JSCHECK}")
        return 2
    r = subprocess.run([sys.executable, str(JSCHECK), str(path)],
                       capture_output=True, text=True, encoding='utf-8', errors='replace')
    out = (r.stdout or "") + (r.stderr or "")
    # 只保留 node --check 相关行：FAIL 块（不含 "FAIL anchor"）与汇总行；
    # anchorcheck 行与 jscheck 退出码一律忽略。
    keep = []
    keeping = False
    summary = None
    for line in out.splitlines():
        if line.startswith("node --check:"):
            m = SUMMARY_RE.search(line)
            if m:
                summary = m
            keep.append(line)
            keeping = False
        elif line.startswith("FAIL anchor") or line.startswith("anchorcheck:"):
            keeping = False
        elif line.startswith("FAIL "):
            keep.append(line)
            keeping = True
        elif keeping:
            keep.append(line)
    for line in keep:
        print(line)
    if summary is None:
        print("FAIL: 无法判定：jscheck 未输出 node --check 汇总行"
              f"（jscheck 退出码 {r.returncode}）")
        return 2
    n_inline, n_mods, verdict = summary.group(1), summary.group(2), summary.group(3)
    note = (f"（{n_inline} inline + {n_mods} modules；anchorcheck 已于"
            f" 2026-11-09 第六波废止，见 anchorcheck.RETIRED.md）")
    if verdict == "OK":
        print(f"PASS: jscheck node --check 通过{note}")
        return 0
    print(f"FAIL: jscheck node --check 失败{note}")
    return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv))
