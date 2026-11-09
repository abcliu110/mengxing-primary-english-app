#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_wave6_item10_c0607_chips.py — 第六波第 10 项：C-06/C-07 短标题过短，
修呈现。

定夺（主对话 Muse 已定，不重新定夺）：先修芯片只剩 `a` / `the`，孩子看不
懂指什么；但截断逻辑是全局的，不能为两条改全局。只让这两条的芯片显示
完整可读的标题。

实施（补全标题，限于这两条）：
  preShortTitle(hl) → preShortTitle(hl, id)，只在 id 为 C-06/C-07 时
  返回全标题（不过冒号截断）；其余律仍按冒号/破折号截断与 12 字截断，
  全局截断逻辑一字未动。调用点 preBarHTML 传 t（先修目标的解析后 id）。
  全标题：C-06「a：认出是哪一类就行」（11 字）、C-07「the：就是那一个」
  （8 字），均 ≤12 字，本就不会触发长度截断；改动只是跳过冒号截断。
  preShortTitle 唯一调用点是 preBarHTML（另两处先修呈现 preMarkHTML /
  relSectionHTML 只列编号，不受影响）。

用法：
  python3 docs/work-2026-11-09/apply_wave6_item10_c0607_chips.py           # 演练
  python3 docs/work-2026-11-09/apply_wave6_item10_c0607_chips.py --apply   # 写回
退出码：0=演练/写回成功；1=断言失败（拒绝写回）。
"""
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
BASE = HERE.parent.parent
MAIN = BASE / "laws-prototype" / "mengxing-prototype-v1.html"

OLD_FN = """  function preShortTitle(hl){
    var s = String(hl == null ? '' : hl);
    if (!s) return '';
    var cut = s.search(/[：——]/);
    if (cut > 0) return s.slice(0, cut);
    return s.length > 12 ? s.slice(0, 12) + '…' : s;
  }"""
NEW_FN = """  function preShortTitle(hl, id){
    var s = String(hl == null ? '' : hl);
    if (!s) return '';
    /* 第六波第 10 项：C-06/C-07 例外——全标题不过短（冒号不截断），
       芯片显示「a：认出是哪一类就行」「the：就是那一个」；其余律仍按
       冒号/破折号截断，全局截断逻辑不动。 */
    if (id === 'C-06' || id === 'C-07') return s;
    var cut = s.search(/[：——]/);
    if (cut > 0) return s.slice(0, cut);
    return s.length > 12 ? s.slice(0, 12) + '…' : s;
  }"""
OLD_CALL = "      var title = preShortTitle(full);"
NEW_CALL = "      var title = preShortTitle(full, t);"
OLD_NOTE = ("LAWDATA 有 hl 时只取其 hl（已核对与 ROSTER[0] 一字相同）。"
            "先修目标为成人层时文案末尾追加「（给爸爸妈妈看的）」。===== */")
NEW_NOTE = ("LAWDATA 有 hl 时只取其 hl（已核对与 ROSTER[0] 一字相同）。"
            "先修目标为成人层时文案末尾追加「（给爸爸妈妈看的）」。"
            "C-06/C-07 例外见 preShortTitle（全标题不过短）。===== */")


def replace_once(text, old, new, what):
    n = text.count(old)
    if n != 1:
        print(f"FAIL: {what}锚点命中 {n} 处（应为 1）")
        return None
    return text.replace(old, new, 1)


def main(argv):
    apply = "--apply" in argv
    text = MAIN.read_text(encoding="utf-8")
    if "if (id === 'C-06' || id === 'C-07') return s;" in text:
        print("FAIL: 主文件已有 C-06/C-07 例外（疑似已实施），拒绝重复写回")
        return 1
    if text.count("preShortTitle(") != 2:
        print(f"FAIL: preShortTitle 出现 {text.count('preShortTitle(')} 次"
              "（应为定义 + 调用共 2 次）")
        return 1
    for old, new, what in ((OLD_FN, NEW_FN, "preShortTitle 定义"),
                           (OLD_CALL, NEW_CALL, "preBarHTML 调用点"),
                           (OLD_NOTE, NEW_NOTE, "§2.2 注释")):
        text = replace_once(text, old, new, what)
        if text is None:
            return 1
    print("改动：preShortTitle +id 参数与 C-06/C-07 例外；preBarHTML 传 t；§2.2 注释 +1 句")
    if not apply:
        print("演练模式，未写回（加 --apply 写回）")
        return 0
    MAIN.write_text(text, encoding="utf-8")
    print("已写回主文件")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
