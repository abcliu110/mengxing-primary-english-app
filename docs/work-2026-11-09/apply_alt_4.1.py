#!/usr/bin/env python3
"""TODO 4.1：给介词区 57 张 class="frame" 关键帧图填描述性 alt。

用法（从仓库根目录运行）：
    python3 docs/work-2026-11-09/apply_alt_4.1.py [主文件路径]

默认目标：laws-prototype/mengxing-prototype-v1.html。
按 docs/work-2026-11-09/alt_text_map.json 的出现顺序，把 57 张
class="frame" 的 img 的 alt="" 一一替换成对应 alt。

安全锚点（任一不满足即拒绝执行，不改文件）：
  1. 主文件中 class="frame" 的 <img> 正好 57 个；
  2. 这 57 个的 alt 全部为空（alt=""），且每个标签里恰好一个 alt 属性；
  3. alt_text_map.json 恰好 57 项，index 为 0..56 连续，alt 均非空且互不相同。
替换后会复核：57 个 frame 的 alt 与映射逐一相等，且文件中其余
<img>（如 alt="真照片" 的那张）未被改动。
"""
import html as html_mod
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
DEFAULT_HTML = ROOT / "laws-prototype" / "mengxing-prototype-v1.html"
MAP_PATH = Path(__file__).resolve().parent / "alt_text_map.json"

FRAME_RE = re.compile(r'<img\b[^>]*?class="frame"[^>]*?>', re.DOTALL)


def load_map():
    data = json.loads(MAP_PATH.read_text(encoding="utf-8"))
    assert isinstance(data, list) and len(data) == 57, \
        f"alt_text_map.json 应有 57 项，实有 {len(data)}"
    assert [d["index"] for d in data] == list(range(57)), \
        "alt_text_map.json 的 index 必须为 0..56 连续"
    alts = [d["alt"] for d in data]
    assert all(isinstance(a, str) and a.strip() for a in alts), "alt 不可为空"
    assert len(set(alts)) == 57, "alt 不可重复"
    return alts


def main():
    html_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_HTML
    alts = load_map()
    text = html_path.read_text(encoding="utf-8")

    tags = list(FRAME_RE.finditer(text))
    assert len(tags) == 57, \
        f"class=\"frame\" 的 <img> 应正好 57 个，实有 {len(tags)}"
    for i, m in enumerate(tags):
        tag = m.group(0)
        assert tag.count("alt=") == 1, f"第 {i} 张 frame 的 alt 属性个数不是 1"
        assert 'alt=""' in tag, f"第 {i} 张 frame 的 alt 不是空（已填过或被改过），拒绝执行"

    # 逐个替换：按出现顺序一一对应，只动这 57 个标签内的 alt=""
    out = []
    pos = 0
    for i, m in enumerate(tags):
        new_tag = m.group(0).replace(
            'alt=""', 'alt="' + html_mod.escape(alts[i], quote=True) + '"', 1)
        out.append(text[pos:m.start()])
        out.append(new_tag)
        pos = m.end()
    out.append(text[pos:])
    new_text = "".join(out)

    # 复核：替换结果与映射逐一相等
    new_tags = list(FRAME_RE.finditer(new_text))
    assert len(new_tags) == 57
    for i, m in enumerate(new_tags):
        got = re.search(r'alt="([^"]*)"', m.group(0)).group(1)
        assert html_mod.unescape(got) == alts[i], f"复核失败：第 {i} 张 alt 不符"
    # 其余 <img> 未被改动：全文件 <img> 总数不变
    assert len(re.findall(r"<img\b", new_text)) == len(re.findall(r"<img\b", text))

    html_path.write_text(new_text, encoding="utf-8")
    print(f"OK：已在 {html_path} 上按顺序替换 57 张 frame 的 alt。")


if __name__ == "__main__":
    main()
