#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
check_all.py — 一键总检（《数据源规范》§6 校验门的统一入口）。

依次运行全部校验并输出汇总表；任一失败则退出码非零：
  gen_morph.py --check        词根 DATA/LAWREG 两文件再生比对
  gen_laws.py --check         规律（LAWDATA + 代词/冠词/连词专区）稳态比对
  gen_phonics.py --check      拼读 DATA 再生比对
  gen_phonics.py --check-letters  拼读按字母查索引 PHX_LETTERS 再生比对
  gen_phonics.py --check-sounds   拼读按读音查索引 PHX_SOUNDS 再生比对
  gen_phonlaws.py --check     拼读律页运行时记录 PHONLAWS（S/SR quiz 106 题）再生比对
  gen_words.py --check        词页 WLIST/WPAGE 再生比对
  gen_vocab.py --check        词汇维度索引 VOCAB_DIM（主题/级别）再生比对
  gen_levels.py --check       统一级别 WORD_LEVELS（全词级别+来源标签，覆盖 2942/2942）再生比对
  gen_errors.py --check       错句反查索引 ERRIDX 再生比对
  gen_spoken.py --check       口语 SP_DATA 再生比对
  gen_et.py --check           词源 ET 载荷 + 计数文案比对
  gen_borrow.py --check       借鉴呈现 BORROW（王牌 15 / 天坑 10）再生比对
  check_morph_sync.py         词根三方（事实源 ↔ 主文件 ↔ morphology 文件）深比
  check_upstream.py           上游 ↔ 总表五条链对账
  extract_review_data.py      复习池新题源（专区/词根/介词）提取块比对
  gen_links.py --check        知识联动 LINKIDX 链接索引再生比对
  gen_interact.py --check     规律互动题集 INTERACT（D6/D2/D24 各 150 题）再生比对
  gen_feedback.py --check     选项级反馈 RV_FEEDBACK（错选项↔病例对齐表，阶段3 试点）再生比对
  gen_roster.py --check       全册规律名册 ROSTER（456 条户口×呈现路由）再生比对
  gen_questions.py --check    规律补题 RV_GENQ（S-44 屈折三读，词库音标派生）再生比对
  gen_schema.py --check       机制图式卡 SCHEMA_TA（TA 18 律，标签逐片段对源断言）再生比对
  gen_contrast.py --check     辨析对照页 CONTRAST（种子批 9 页，律对关系/短名对源断言）再生比对
  check_rel_coverage.py       关系户口门禁（R11-01 修复登记）：LAWDATA.rel 全部边 ⊆ LINKIDX.g
  check_lawdata_roster.py     LAWDATA 对账（字面量 224 + PHONLAWS 53 + SUPPDATA 114 = 运行时 391；
                              hl == ROSTER[0]，无 hl ⟺ ptr）
  check_badge_erridx.py       静态徽标 × ERRIDX 对账（全部 830 行：ERRIDX 区 133 行徽标 vs 再生 ERRIDX、
                             CO-17 深研行 1 行「已做深」、拼读区 52 行 vs 本律 cases/prb、
                             家长区 114 行计数 vs prb/ERRIDX/quiz、
                             v-tech 530 行三组口径 vs TECDAT）
  check_js_syntax.py          jscheck node --check（41 内联脚本；anchorcheck 已于 2026-11-09 第六波废止）

用法：python3 laws-prototype/tools/check_all.py
退出码：0=全绿；1=至少一项失败。
"""
import subprocess
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
sys.stderr.reconfigure(encoding='utf-8', errors='replace')
from pathlib import Path

HERE = Path(__file__).resolve().parent

CHECKS = [
    ("gen_morph --check", "gen_morph.py", ["--check"]),
    ("gen_laws --check", "gen_laws.py", ["--check"]),
    ("gen_phonics --check", "gen_phonics.py", ["--check"]),
    ("gen_phonics letters --check", "gen_phonics.py", ["--check-letters"]),
    ("gen_phonics sounds --check", "gen_phonics.py", ["--check-sounds"]),
    ("gen_phonlaws --check", "gen_phonlaws.py", ["--check"]),
    ("gen_words --check", "gen_words.py", ["--check"]),
    ("gen_vocab --check", "gen_vocab.py", ["--check"]),
    ("gen_levels --check", "gen_levels.py", ["--check"]),
    ("gen_errors --check", "gen_errors.py", ["--check"]),
    ("gen_spoken --check", "gen_spoken.py", ["--check"]),
    ("gen_et --check", "gen_et.py", ["--check"]),
    ("gen_ar_films --check", "gen_ar_films.py", ["--check"]),
    ("gen_borrow --check", "gen_borrow.py", ["--check"]),
    ("check_morph_sync", "check_morph_sync.py", []),
    ("check_upstream", "check_upstream.py", []),
    ("extract_review --check", "extract_review_data.py", ["--check"]),
    ("gen_links --check", "gen_links.py", ["--check"]),
    ("gen_interact --check", "gen_interact.py", ["--check"]),
    ("gen_feedback --check", "gen_feedback.py", ["--check"]),
    ("gen_roster --check", "gen_roster.py", ["--check"]),
    ("gen_questions --check", "gen_questions.py", ["--check"]),
    ("gen_schema --check", "gen_schema.py", ["--check"]),
    ("gen_contrast --check", "gen_contrast.py", ["--check"]),
    ("check_rel_coverage", "check_rel_coverage.py", []),
    ("check_lawdata_roster", "check_lawdata_roster.py", []),
    ("check_badge_erridx", "check_badge_erridx.py", []),
    ("jscheck node --check", "check_js_syntax.py", []),
]


def main():
    rows = []
    all_ok = True
    for label, script, args in CHECKS:
        r = subprocess.run([sys.executable, str(HERE / script), *args],
                           capture_output=True, text=True,
                           encoding='utf-8', errors='replace')
        ok = r.returncode == 0
        all_ok = all_ok and ok
        tail = (r.stdout.strip().splitlines() or [""])[-1]
        if not ok and r.stderr.strip():
            tail = (tail + " | stderr: " + r.stderr.strip().splitlines()[-1])[:160]
        rows.append((label, "PASS" if ok else f"FAIL(rc={r.returncode})", tail))
    print("=" * 78)
    print("一键总检 check_all")
    print("=" * 78)
    for label, status, tail in rows:
        print(f"{status:>10}  {label:<24} {tail[:100]}")
    print("-" * 78)
    print("结论：", "全部通过" if all_ok else "存在失败项（见上）")
    return 0 if all_ok else 1


if __name__ == "__main__":
    sys.exit(main())
