#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen_et.py — 词源区数据生成器（《数据源规范》§3：内嵌副本只能由脚本从事实源生成）。

事实源：laws-prototype/model/etymology.json（词源记录全集）
        + laws-prototype/model/wordbank.json（词库：payload 的 bank 子集与 bankTotal 出处）。
生成目标：mengxing-prototype-v1.html 词源区 script 内的整行 `var D = <payload>;`。
payload 构造与原 refresh_et.py 完全一致（2026-11-03 由 imported/ 归档区迁回 tools/ 后，
构造逻辑收编于此，tools/refresh_et.py 为其刷新入口包装）：
  verified = status=='verified' 的完整记录按 word 排序；
  pending  = 其余记录只取 {word, pending_reason} 按 word 排序；
  bank     = ver+pend 各词在词库中的 {phonetic(phonetic_gb 优先), meaning, pos, emoji} 子集；
  flagship = 固定 12 词（须全 verified，硬断言）；bankTotal = 词库总条数；
  未收（unc）= bankTotal - NV - NP，硬断言 == 195。
序列化：json.dumps(ensure_ascii=False) 默认分隔符，后做 '</' -> '<\\/' 转义（与现行行文逐字节同）。
计数文案：区内 5 处静态计数文案随 NV/NP 派生，--check 一并核对（现行值或派生值须全等），
  --write 时若与派生值不符则按派生值改写（每处断言唯一命中）。

用法：
  python3 laws-prototype/tools/gen_et.py --check   # 只比对：载荷行逐字节 + 5 处计数文案
  python3 laws-prototype/tools/gen_et.py --write   # 写回主文件（载荷行 + 计数文案 + 生成标记）
退出码：0=一致/写回完成；1=不一致或断言失败；64=用法错误。
生成标记：载荷行上一行应有 /* GENERATED: tools/gen_et.py ← model/etymology.json · DO NOT EDIT */；
  --check 忽略之（只比载荷行本体），--write 确保其存在。
"""
import json
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent  # laws-prototype/
ET_PATH = BASE / "model" / "etymology.json"
BANK_PATH = BASE / "model" / "wordbank.json"
MAIN = BASE / "mengxing-prototype-v1.html"

FLAG = ['school', 'camp', 'law', 'horse', 'beach', 'gentle', 'magazine',
        'lunatic', 'coin', 'charge', 'doctor', 'light']
EXPECTED_UNC = 195
MARKER = "/* GENERATED: tools/gen_et.py ← model/etymology.json · DO NOT EDIT */"


def build_payload():
    """返回 (payload_obj, rendered_line)。断言失败抛 AssertionError。"""
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
    return payload, 'var D = ' + pj + ';'


def count_texts(nv, np_):
    """5 处计数文案的派生形态（模板取自原 refresh_et.py 的替换表）。"""
    return [
        f'词源数据层：{nv} 已核 + {np_} 待核',
        f'{nv} 个词的身世档案 · 全部双源核实',
        f'其余 {np_} 个词按卡住的原因分五组如实标待核',
        f'<span class="n">{nv} 词 · 双源核实 · 真模块</span>',
        f'词源区：{nv} 个词的身世档案',
    ]


def find_payload_line(lines):
    hits = [i for i, ln in enumerate(lines)
            if ln.startswith('var D = {') and '"flagship"' in ln]
    assert len(hits) == 1, f'payload 行命中 {len(hits)} 处（应为 1）'
    return hits[0]


def ensure_marker(lines, i):
    """确保 lines[i]（payload 行）上一行为生成标记；返回是否做了插入。"""
    if i > 0 and lines[i - 1].strip() == MARKER:
        return False
    lines.insert(i, MARKER)
    return True


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
    src = MAIN.read_text(encoding="utf-8")
    lines = src.split('\n')
    try:
        i = find_payload_line(lines)
    except AssertionError as e:
        print(f"FAIL: {e}")
        return 1
    cur_line = lines[i]
    ok = True
    if gen_line == cur_line:
        print(f"PASS: ET 载荷逐字节一致（{len(cur_line)} 字符；verified {nv} / pending {np_}）")
    else:
        ok = False
        try:
            same = json.loads(gen_line[len('var D = '):-1]) == json.loads(cur_line[len('var D = '):-1])
        except Exception:
            same = False
        print(f"FAIL: ET 载荷不一致（再生 {len(gen_line)} / 现行 {len(cur_line)} 字符；内容深相等={same}）")
    derived = count_texts(nv, np_)
    for t in derived:
        c = src.count(t)
        if c != 1:
            ok = False
            print(f"FAIL: 计数文案应唯一命中派生形态，实得 {c}：{t[:28]}…")
    if argv[1] == "--check":
        return 0 if ok else 1
    # --write
    changed = []
    if gen_line != cur_line:
        lines[i] = gen_line
        changed.append("载荷行")
    # 计数文案：现行与派生不符者，用「现行计数」形态定位再改写。
    # 现行计数从现行 payload 解析（verified/pending 条数）。
    cur_payload = json.loads(cur_line[len('var D = '):-1])
    cur_texts = count_texts(len(cur_payload['verified']), len(cur_payload['pending']))
    text = '\n'.join(lines)
    for old, new in zip(cur_texts, derived):
        if old != new:
            assert text.count(old) == 1, f'计数文案现行形态命中 != 1：{old[:24]}'
            text = text.replace(old, new)
            changed.append(f"计数文案「{old[:16]}…」")
    lines = text.split('\n')
    i = find_payload_line(lines)
    if ensure_marker(lines, i):
        changed.append("生成标记")
    out = '\n'.join(lines)
    if out != src:
        MAIN.write_text(out, encoding="utf-8")
    school = next(r for r in payload['verified'] if r['word'] == 'school')
    print(f"写回完成：{'、'.join(changed) if changed else '载荷与文案均与现行一致，仅确认标记'}"
          f"（verified {nv} / pending {np_}；school 原义: {school['original_meaning']}）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
