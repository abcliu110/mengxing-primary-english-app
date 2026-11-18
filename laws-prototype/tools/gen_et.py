#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen_et.py — 词源区数据生成器（《数据源规范》§3：派生数据只能由脚本从事实源生成）。

事实源：laws-prototype/model/etymology.json（词源记录全集）
        + laws-prototype/model/wordbank.json（词库：payload 的 bank 子集与 bankTotal 出处）。
生成目标（v2 外置）：laws-prototype/assets/data/et_data.js（`window.__MX_ET_DATA = <payload>;`），
        由 mengxing-prototype-v1.html 词源区按需动态加载（file:// 与 http:// 均可直接加载）；
        HTML 主文件不再内嵌 2.9 MB 的整行 `var D = ...;`。
payload 构造与原 refresh_et.py 完全一致：
  verified = status=='verified' 的完整记录按 word 排序；
  pending  = 其余记录只取 {word, pending_reason} 按 word 排序；
  bank     = ver+pend 各词在词库中的 {phonetic(phonetic_gb 优先), meaning, pos, emoji} 子集；
  flagship = 固定 12 词（须全 verified，硬断言）；bankTotal = 词库总条数；
  未收（unc）= bankTotal - NV - NP，硬断言 == 664（2026-11-03 词表普查补入 469 词后更新：195 + 469；新词无词源记录，运行时呈「未收」为预期行为）。
序列化：json.dumps(ensure_ascii=False) 默认分隔符，后做 '</' -> '<\\/' 转义。
计数文案：区内 5 处静态计数文案随 NV/NP 派生，--check 一并核对，--write 时按派生值同步改写。

用法：
  python3 laws-prototype/tools/gen_et.py --check   # 校验：et_data.js 逐字节 + 无 HTML 内联膨胀 + loader 引用 + 5 处计数文案
  python3 laws-prototype/tools/gen_et.py --write   # 生成 assets/data/et_data.js（若主文件仍残余旧内联 var D 行则一并剥离）+ 同步计数文案
退出码：0=一致/写回完成；1=不一致或断言失败；64=用法错误。
"""
import json
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent  # laws-prototype/
ET_PATH = BASE / "model" / "etymology.json"
BANK_PATH = BASE / "model" / "wordbank.json"
MAIN = BASE / "mengxing-prototype-v1.html"
ET_JS_PATH = BASE / "assets" / "data" / "et_data.js"
ET_JS_REL = "assets/data/et_data.js"

FLAG = ['school', 'camp', 'law', 'horse', 'beach', 'gentle', 'magazine',
        'lunatic', 'coin', 'charge', 'doctor', 'light']
EXPECTED_UNC = 664  # 2026-11-03 词表普查补入 469 词后更新（195+469）
MARKER = "/* GENERATED: tools/gen_et.py ← model/etymology.json · DO NOT EDIT */"
EXT_MARKER = "/* EXTERNALIZED: assets/data/et_data.js ← tools/gen_et.py ← model/etymology.json · DO NOT EDIT */"


def build_payload():
    """返回 (payload_obj, rendered_js_assign_line)。断言失败抛 AssertionError。"""
    data = json.loads(ET_PATH.read_text(encoding="utf-8"))
    bank_raw = json.loads(BANK_PATH.read_text(encoding="utf-8"))
    bank = {w['word'].lower(): w for w in bank_raw}
    bank_total = len(bank_raw)
    ver = sorted([r for r in data if r['status'] == 'verified'], key=lambda r: r['word'])
    pend = sorted([{'word': r['word'], 'pending_reason': r.get('pending_reason', '')}
                   for r in data if r['status'] != 'verified'], key=lambda r: r['word'])
    assert all(any(r['word'] == w for r in ver) for w in FLAG), 'flagship 未全 verified'
    unc = bank_total - len(ver) - len(pend)
    assert unc == EXPECTED_UNC, f'未收数 {unc} != {EXPECTED_UNC}'
    banksub = {}
    for r in ver + pend:
        b = bank.get(r['word']) or bank.get(r['word'].lower())
        if b:
            banksub[r['word']] = {
                'phonetic': b.get('phonetic_gb') or b.get('phonetic') or '',
                'meaning': b.get('meaning', ''), 'pos': b.get('pos', ''),
                'emoji': b.get('emoji', '') or ''}
    payload = {'verified': ver, 'pending': pend, 'bank': banksub,
               'flagship': FLAG, 'bankTotal': bank_total}
    pj = json.dumps(payload, ensure_ascii=False).replace('</', '<\\/')
    return payload, 'window.__MX_ET_DATA = ' + pj + ';'


def count_texts(nv, np_):
    """5 处计数文案的派生形态（模板取自原 refresh_et.py 的替换表）。"""
    return [
        f'词源数据层：{nv} 已核 + {np_} 待核',
        f'{nv} 个词的身世档案 · 全部双源核实',
        f'其余 {np_} 个词的身世还没查清，按卡住的原因分五组如实标出来',
        f'<span class="n">{nv} 词 · 双源核实 · 真模块</span>',
        f'词源区：{nv} 个词的身世档案',
    ]


def find_inline_payload_lines(lines):
    return [i for i, ln in enumerate(lines)
            if ln.startswith('var D = {') and '"flagship"' in ln]


def parse_existing_counts():
    """读取现有 ET_JS_PATH 或主文件旧内联行中的 verified/pending 条数，供计数文案替换定位。"""
    if ET_JS_PATH.is_file():
        for ln in ET_JS_PATH.read_text(encoding="utf-8").splitlines():
            if ln.startswith('window.__MX_ET_DATA = {') and ln.endswith(';'):
                obj = json.loads(ln[len('window.__MX_ET_DATA = '):-1])
                return len(obj['verified']), len(obj['pending'])
    lines = MAIN.read_text(encoding="utf-8").split('\n')
    hits = find_inline_payload_lines(lines)
    if hits:
        ln = lines[hits[0]]
        obj = json.loads(ln[len('var D = '):-1])
        return len(obj['verified']), len(obj['pending'])
    return None


def main(argv) -> int:
    if len(argv) != 2 or argv[1] not in ("--check", "--write"):
        print(__doc__)
        return 64
    try:
        payload, gen_line = build_payload()
    except AssertionError as e:
        print(f"FAIL: 事实源断言失败：{e}")
        return 1
    nv, np_ = len(payload['verified']), len(payload['pending'])
    expected_js = f"{MARKER}\n{gen_line}\n"
    src = MAIN.read_text(encoding="utf-8")
    lines = src.split('\n')
    inline_hits = find_inline_payload_lines(lines)
    ok = True

    if argv[1] == "--check":
        if inline_hits:
            ok = False
            print(f"FAIL: 主文件仍残留 {len(inline_hits)} 处内联 ET 大载荷行（应已外置至 {ET_JS_REL}）")
        if ET_JS_REL not in src:
            ok = False
            print(f"FAIL: 主文件未引用外置词源脚本 {ET_JS_REL}")
        if not ET_JS_PATH.is_file():
            ok = False
            print(f"FAIL: 缺少外置词源数据文件：{ET_JS_PATH}")
        else:
            cur_js = ET_JS_PATH.read_text(encoding="utf-8")
            if cur_js == expected_js:
                print(f"PASS: ET 外置载荷逐字节一致（{len(cur_js)} 字符；verified {nv} / pending {np_}）")
            else:
                ok = False
                print(f"FAIL: {ET_JS_REL} 与生成结果不一致（再生 {len(expected_js)} / 现行 {len(cur_js)} 字符）")
        derived = count_texts(nv, np_)
        for t in derived:
            c = src.count(t)
            if c != 1:
                ok = False
                print(f"FAIL: 计数文案应唯一命中派生形态，实得 {c}：{t[:28]}…")
        return 0 if ok else 1

    # --write
    changed = []
    cur_counts = parse_existing_counts()
    ET_JS_PATH.parent.mkdir(parents=True, exist_ok=True)
    if not ET_JS_PATH.is_file() or ET_JS_PATH.read_text(encoding="utf-8") != expected_js:
        ET_JS_PATH.write_text(expected_js, encoding="utf-8")
        changed.append(ET_JS_REL)

    if inline_hits:
        for idx in sorted(inline_hits, reverse=True):
            if idx > 0 and lines[idx - 1].strip() == MARKER:
                lines[idx - 1] = EXT_MARKER
            lines.pop(idx)
        changed.append("剥离主文件旧内联 ET 载荷")

    text = '\n'.join(lines)
    derived = count_texts(nv, np_)
    if cur_counts:
        cur_texts = count_texts(cur_counts[0], cur_counts[1])
        for old, new in zip(cur_texts, derived):
            if old != new:
                assert text.count(old) == 1, f'计数文案现行形态命中 != 1：{old[:24]}'
                text = text.replace(old, new)
                changed.append(f"计数文案「{old[:16]}…」")

    if text != src:
        MAIN.write_text(text, encoding="utf-8")
    school = next(r for r in payload['verified'] if r['word'] == 'school')
    print(f"写回完成：{'、'.join(changed) if changed else '外置载荷与计数文案均已是最新'}"
          f"（verified {nv} / pending {np_}；school 原义: {school['original_meaning']}）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
