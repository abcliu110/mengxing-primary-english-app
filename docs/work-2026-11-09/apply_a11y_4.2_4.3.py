#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""萌星小学英语 · TODO 4.2 + 4.3 可访问性补丁
================================================
只出补丁，不直接改主文件时请传参到副本上跑；确认无误后由人工在主文件上执行。

用法（从仓库根目录运行）：
    python3 docs/work-2026-11-09/apply_a11y_4.2_4.3.py [输入] [输出]
缺省：输入 = 输出 = laws-prototype/mengxing-prototype-v1.html（原地打补丁）

内容：
  4.2 首页 22 个 hm-ic SVG：逐个加 aria 属性
      - 仅装饰、含义已被旁边 hm-name 文字完全覆盖 -> aria-hidden="true"
      - 图标传达了按钮文字之外的含义 -> role="img" aria-label="..."
      判定逐条见 docs/work-2026-11-09/a11y_4.2_4.3_note.md
  4.3 三处低对比度替换（WCAG AA，正常文字 >= 4.5:1，实测值见文末校验表）：
      - #99a      -> #5f6b5a（动词区 .vb 来源标注与页脚，2 处）
      - #8a8272   -> #6b6151（词源区 .et-scope 小字，4 处 CSS + 1 处 JS 内联 h3）
      - --muted   -> #4f5a4c（:root 定义 1 处 + var(--muted, ...) 回退值 1 处）

安全规则：
  - 每个替换点都有唯一锚点；锚点在全文恰出现一次才替换，否则报错退出，不写文件。
  - 写文件前先在内存里校验：22 个 hm-ic SVG 全部带 aria、3 组新旧对比度重算
    全部 >= 4.5:1；任一校验失败则不写文件。
  - 刻意不动：4 处 #99a SVG 描边（动词区方向示意图的装饰线，非文字）、
    其余 53 处硬编码 #6b7566 字面量（见 note.md“范围外遗留”）。

背景核实（与 TODO 清单口径的出入，已实测）：
  - #99a 的实际背景不是 #fff：.vb .sent .src 在 #f4f6ff 句框内，
    .vb footer 在 .app 背景 #f2f6ee 上；旧值在这两处分别是 2.60:1 / 2.56:1。
  - #8a8272 的实际背景不是 #f8faf5：.et-scope .card/.wchip 在 #fff 上，
    .station 在 #fdf8ec 上，.pathcard 在 #f6fbff 上；旧值 3.59~3.81:1。
  - 旧 --muted #6b7566 不只在 --accent-soft 上不达标（3.66:1），
    在 #f2f6ee 上 4.40:1、在 #e4eedf 上 4.03:1，同样低于 4.5:1；
    换 token 定义处一并修掉这三处。
"""

import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_HTML = REPO_ROOT / "laws-prototype" / "mengxing-prototype-v1.html"

# ---------------------------------------------------------------- WCAG 对比度
def _lin(c: float) -> float:
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4


def luminance(hex_color: str) -> float:
    h = hex_color.lstrip("#")
    if len(h) == 3:
        h = "".join(ch * 2 for ch in h)
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
    r, g, b = _lin(r), _lin(g), _lin(b)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(fg: str, bg: str) -> float:
    l1, l2 = luminance(fg), luminance(bg)
    if l1 < l2:
        l1, l2 = l2, l1
    return (l1 + 0.05) / (l2 + 0.05)


# ---------------------------------------------------------------- 4.2 逐图标判定
# key = 卡片 data-go；attr = 要插进 <svg ...> 里的属性（插在 <svg 后、viewBox 前）
# label 5 个 / hidden 17 个；理由见 a11y_4.2_4.3_note.md
ICON_DECISIONS = [
    # (data-go, hm-name, attr)
    ("phon",     "拼读区",     'role="img" aria-label="扬声器：听声音、拼读音"'),
    ("vocab",    "词汇解码区", 'aria-hidden="true"'),
    ("morph",    "词根词缀",   'role="img" aria-label="幼苗：词根像植物的根一样生长"'),
    ("etym",     "词源区",     'aria-hidden="true"'),
    ("grammar",  "语法区",     'aria-hidden="true"'),
    ("verb",     "动词区",     'aria-hidden="true"'),
    ("pron",     "代词区",     'aria-hidden="true"'),
    ("art",      "冠词区",     'aria-hidden="true"'),
    ("conj",     "连词区",     'aria-hidden="true"'),
    ("prep",     "介词区",     'role="img" aria-label="定位针：表示位置与空间关系"'),
    ("spoken",   "口语区",     'aria-hidden="true"'),
    ("expr",     "表达写作区", 'aria-hidden="true"'),
    ("tech",     "技巧区",     'aria-hidden="true"'),
    ("review",   "复习区",     'aria-hidden="true"'),
    ("map",      "学习地图",   'aria-hidden="true"'),
    ("rush",     "闯关模式",   'role="img" aria-label="闪电：闯关挑战"'),
    ("wrong",    "错题本",     'aria-hidden="true"'),
    ("trump",    "王牌速查",   'aria-hidden="true"'),
    ("decide",   "决策助手",   'aria-hidden="true"'),
    ("wbindex",  "白板课索引", 'role="img" aria-label="播放键：视频白板课"'),
    ("errfind",  "错句查规律", 'aria-hidden="true"'),
    ("contrast", "易混辨析",   'aria-hidden="true"'),
]

# ---------------------------------------------------------------- 4.3 替换点
# (说明, 锚点原文, 替换后, 备注) —— 锚点必须在全文恰出现一次
COLOR_REPLACEMENTS = [
    ("4.3-1 --muted token 定义 (:root)",
     "--muted:#6b7566;", "--muted:#4f5a4c;",
     "旧 #6b7566 on --accent-soft #d3e5d6 = 3.66:1"),
    ("4.3-1b --muted 回退值 (JS 注入 CSS, .mxlv-lab)",
     "color:var(--muted,#6b7566)", "color:var(--muted,#4f5a4c)",
     "与 token 定义同值，保持一致；无 --muted 定义时才生效"),
    ("4.3-2 #99a 动词区来源标注 (.vb .sent .src / .vb .src)",
     ".vb .sent .src, .vb .src{font-size:11.5px;color:#99a}",
     ".vb .sent .src, .vb .src{font-size:11.5px;color:#5f6b5a}",
     "背景 #f4f6ff（句框），旧 2.60:1"),
    ("4.3-2b #99a 动词区页脚 (.vb footer)",
     ".vb footer{color:#99a;font-size:12.5px",
     ".vb footer{color:#5f6b5a;font-size:12.5px",
     "背景 #f2f6ee（.app），旧 2.56:1"),
    ("4.3-3 #8a8272 词源区小字 (.et-scope .small)",
     ".et-scope .small{font-size:12.5px;color:#8a8272}",
     ".et-scope .small{font-size:12.5px;color:#6b6151}",
     "背景 #fff（.card），旧 3.81:1"),
    ("4.3-3b #8a8272 词源区词条小字 (.et-scope .wchip span)",
     ".et-scope .wchip span{display:block;font-size:11.5px;color:#8a8272;",
     ".et-scope .wchip span{display:block;font-size:11.5px;color:#6b6151;",
     "背景 #fff（.wchip），旧 3.81:1"),
    ("4.3-3c #8a8272 词源区站点语言 (.et-scope .station .lang)",
     ".et-scope .station .lang{font-size:12.5px;color:#8a8272}",
     ".et-scope .station .lang{font-size:12.5px;color:#6b6151}",
     "背景 #fdf8ec（.station），旧 3.59:1"),
    ("4.3-3d #8a8272 词源区路径卡说明 (.et-scope .pathcard .p)",
     ".et-scope .pathcard .p{font-size:12px;color:#8a8272}",
     ".et-scope .pathcard .p{font-size:12px;color:#6b6151}",
     "背景 #f6fbff（.pathcard），旧 3.65:1"),
    ("4.3-3e #8a8272 待核词分组标题 (JS 内联 h3, pendGroupsHtml)",
     "color:#8a8272",
     "color:#6b6151",
     "背景 #fff（词源区卡片内），旧 3.81:1；必须放在 4 项 CSS 替换之后，"
     "此时全文只剩这一处 color:#8a8272，锚点唯一（避开 JS 转义引号）"),
]

# 校验用：(前景旧, 前景新, 背景, 背景说明) —— 全部按真实背景重算
CONTRAST_CHECKS = [
    ("#9999aa", "#5f6b5a", "#f4f6ff", ".vb .sent .src（句框）"),
    ("#9999aa", "#5f6b5a", "#f2f6ee", ".vb footer（.app 底）"),
    ("#8a8272", "#6b6151", "#ffffff", ".et-scope .small / .wchip span / 内联 h3（白卡）"),
    ("#8a8272", "#6b6151", "#fdf8ec", ".et-scope .station .lang"),
    ("#8a8272", "#6b6151", "#f6fbff", ".et-scope .pathcard .p"),
    ("#6b7566", "#4f5a4c", "#d3e5d6", "--muted on --accent-soft（新用户引导卡等）"),
    ("#6b7566", "#4f5a4c", "#f8faf5", "--muted on --card"),
    ("#6b7566", "#4f5a4c", "#f2f6ee", "--muted on --app"),
    ("#6b7566", "#4f5a4c", "#e4eedf", "--muted on --bg"),
    ("#6b7566", "#4f5a4c", "#ffffff", "--muted on #fff"),
]


def replace_once(text: str, anchor: str, replacement: str, label: str) -> str:
    n = text.count(anchor)
    assert n == 1, f"{label}: 锚点出现 {n} 次（要求恰 1 次），拒绝替换: {anchor!r}"
    return text.replace(anchor, replacement)


def apply(text: str) -> str:
    # ---- 4.2：按行定位 hm-card，再给该行唯一的 <svg 加 aria 属性 ----
    lines = text.split("\n")
    done = set()
    for key, _name, attr in ICON_DECISIONS:
        hits = [i for i, ln in enumerate(lines)
                if '<div class="hm-card' in ln and f'data-go="{key}"' in ln]
        assert len(hits) == 1, f"4.2 {key}: hm-card 行出现 {len(hits)} 次（要求恰 1 次）"
        i = hits[0]
        assert lines[i].count("<svg ") == 1, f"4.2 {key}: 该行 <svg 出现 {lines[i].count('<svg ')} 次"
        assert 'aria-hidden' not in lines[i] and 'aria-label' not in lines[i], \
            f"4.2 {key}: 该行 SVG 已有 aria 属性，拒绝重复打补丁"
        lines[i] = lines[i].replace("<svg ", f"<svg {attr} ", 1)
        done.add(key)
    assert len(done) == 22, f"4.2: 只处理了 {len(done)} 个图标，要求 22 个"
    text = "\n".join(lines)

    # ---- 4.3：颜色替换 ----
    for label, anchor, replacement, _note in COLOR_REPLACEMENTS:
        text = replace_once(text, anchor, replacement, label)
    return text


def verify(text: str) -> None:
    # 4.2：22 个 hm-ic SVG 全部带 aria，且 label 5 / hidden 17
    n_hidden = text.count('<div class="hm-ic"><svg aria-hidden="true"')
    n_label = text.count('<div class="hm-ic"><svg role="img" aria-label="')
    n_ic = text.count('<div class="hm-ic"><svg ')
    assert n_ic == 22, f"校验失败：hm-ic SVG 共 {n_ic} 个，要求 22 个"
    assert n_hidden == 17, f"校验失败：aria-hidden 共 {n_hidden} 个，要求 17 个"
    assert n_label == 5, f"校验失败：aria-label 共 {n_label} 个，要求 5 个"
    # 4.3：旧值残留检查（#99a 只应剩 4 处 SVG 描边；#8a8272 应为 0；--muted 旧值只剩范围外字面量）
    assert text.count("#8a8272") == 0, "校验失败：仍有 #8a8272 残留"
    assert text.count("#99a") == 4, f"校验失败：#99a 残留 {text.count('#99a')} 处，要求 4 处（SVG 描边）"
    assert "--muted:#4f5a4c" in text, "校验失败：--muted 新值未写入 :root"
    assert "var(--muted,#4f5a4c)" in text, "校验失败：--muted 回退新值未写入"
    assert ".vb .sent .src, .vb .src{font-size:11.5px;color:#5f6b5a}" in text
    assert ".vb footer{color:#5f6b5a" in text
    # 对比度重算：全部 >= 4.5:1
    print("\n对比度重算（WCAG，正常文字 AA >= 4.5:1）：")
    print(f"{'位置':<42}{'旧':>7}{'新':>7}")
    for old, new, bg, where in CONTRAST_CHECKS:
        c_old, c_new = contrast(old, bg), contrast(new, bg)
        assert c_new >= 4.5, f"校验失败：{where} 新对比度 {c_new:.2f} < 4.5"
        print(f"{where:<42}{c_old:>7.2f}{c_new:>7.2f}  (背景 {bg})")
    print(f"\n4.2 校验：hm-ic SVG {n_ic} 个，aria-hidden {n_hidden} 个，aria-label {n_label} 个")
    print("全部校验通过。")


def main(argv) -> int:
    src = Path(argv[1]) if len(argv) > 1 else DEFAULT_HTML
    dst = Path(argv[2]) if len(argv) > 2 else src
    text = src.read_text(encoding="utf-8")
    patched = apply(text)
    verify(patched)
    dst.write_text(patched, encoding="utf-8")
    print(f"\n已写入：{dst}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
