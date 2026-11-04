#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
词汇维度索引生成器（《数据源规范》§3：内嵌副本只能由脚本从事实源生成）。
2026-11-04 维度视图并入波新建（Stewart 拍板：主题查 + 级别查并入词汇解码区）。

事实源
  - laws-prototype/model/wordbank.json（主题标记 theme_sub/theme_macro、
    词面/音标/词性/释义/emoji/词频）
  - laws-prototype/model/words_master.json（「有词页」判定：vc 分仓非 null）
  - laws-prototype/imported/wordlist-snapshots-2026-11-03/wordlist-census-2026-11-03.json
    （Dolch / Fry 编号表 / YLE 三张名单快照；本波登记为名单事实源，见
    DATA_SOURCE_SPEC §1「词汇维度索引」行）

生成目标：mengxing-prototype-v1.html 词汇维度呈现脚本段的
  var VOCAB_DIM = {"topic": {...}, "level": {...}};

构成规则（与四份维度原型构建脚本逐字同口径，原型为验证工具、口径以本
生成器为准落盘）
  - 主题 topic：分类只用 wordbank.theme_sub 字段原值。15 个 theme_sub 值
    是补入波次/来源标签（非主题，PROV_SUB 集合与原型脚本一致），其 694
    词归「暂未分主题」、按原标签分组如实呈现，不改名、不归并、不猜补；
    其余 25 个为真主题共 2,248 词。主题墙分区 = theme_macro 三大主题
    （人与自我/人与社会/人与自然），断言每个真主题的词其真 macro 值唯
    一；macro 全为来源标签的主题（核心语法功能词）单列「其他主题」。
    词卡 = [wordbank_id, 词, 英式音标（phonetic_gb 优先）, 词性首项,
    释义, emoji, 有词页 0/1]，卡序 = 词频 rank 升序（无 rank 的排后按字
    母），与原型 sortkey 一致。
  - 级别 level：名单归一逐字沿用填词波普查 census 口径（clean_head /
    classify：小写、纯 [a-z]+ 单字、短语/专名/非纯形剔除计数）；定级首
    现优先——Dolch 按 [pre-primer, primer, grade1, grade2, grade3, nouns]
    序，Fry 按编号表原序 idx//100+1 定百段，YLE 用快照首现级别标记。
    交集 = 名单归一词形 ∩ 词库（word 精确，或 aliases 通道）。Fry 以编
    号表为口径：普查并集 995 中的 PDF 补集 33 词（7 词手工定段仅存普查
    脚本源码、26 词无分段，快照未存）不收，差额在此登记（见
    DATA_SOURCE_SPEC §1 同行）。词卡 = [wordbank_id, 词, 英式音标, 释
    义, 有词页 0/1, aliases 命中 0/1]；名单内未收录词只列词形（miss）。
  - 有词页：words_master 中该词条 vc 非 null（与原型 vc_by_word 同口
    径：按词条 word 小写查表）。硬断言对账原型命中表：Dolch 315/315/
    287、Fry 962/962/640、YLE 1179/1179/964；主题 25 主题 / 2,248 词 /
    未分 694 词，抽查主题词数（食物与饮品 128、交通与出行 79、家庭与
    亲友 42）。

序列化格式：同 gen_phonics.py——Python json 默认分隔符、ensure_ascii=False。

写回安全边界：只替换唯一定位锚（"var VOCAB_DIM="，命中 != 1 拒绝）定界
扫描得到的字面量跨度，其余字节原样不动。锚缺失即停（呈现脚本段由并入
波手工落位，含占位字面量）。

用法
  python3 laws-prototype/tools/gen_vocab.py --check   # 稳态校验
  python3 laws-prototype/tools/gen_vocab.py --write   # 生成并写回主文件
--check 退出码：0=逐字节一致；1=不一致或断言失败。
"""
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
MAIN = BASE / "mengxing-prototype-v1.html"
WB_PATH = BASE / "model" / "wordbank.json"
WM_PATH = BASE / "model" / "words_master.json"
SNAP_PATH = BASE / "imported" / "wordlist-snapshots-2026-11-03" / "wordlist-census-2026-11-03.json"

JD = lambda o: json.dumps(o, ensure_ascii=False)

MARKER = ("/* GENERATED: tools/gen_vocab.py ← model/wordbank.json + model/words_master.json"
          " + imported/wordlist-snapshots-2026-11-03 · DO NOT EDIT */")
ANCHOR = "var VOCAB_DIM="

PROV_SUB = {'词表缺口普查补入', '动词形式补齐波次例词', '词汇波次例词', 'S组例词', 'SR组例词',
            '旗舰例词', '拼读波次例词', '词根补强波次例词', '小系统波次例词', '教学波次例词',
            '表达波次例词', '支撑波次例词', '前缀补强波次例词', '语法扩展波次例词',
            '收官缺口补入（SR-06 锚词）'}
GEN_MAC = ['人与自我', '人与社会', '人与自然']

POS_TAIL = {'n', 'v', 'adj', 'adv', 'prep', 'conj', 'det', 'pron', 'poss', 'int',
            'dis', 'excl', 'modal'}


def fail(msg):
    raise AssertionError(msg)


def scan_literal(src: str, start: int) -> int:
    """定界扫描（与 gen_morph.py 同逻辑）。"""
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


def find_span(src: str, anchor: str, first_char: str):
    hits = []
    i = 0
    while True:
        j = src.find(anchor, i)
        if j < 0:
            break
        p = j + len(anchor)
        while p < len(src) and src[p].isspace():
            p += 1
        if p < len(src) and src[p] == first_char:
            hits.append(p)
        i = j + len(anchor)
    if len(hits) != 1:
        raise ValueError(f"锚点 {anchor!r} 命中 {len(hits)} 处（应为 1），拒绝操作")
    s = hits[0]
    return s, scan_literal(src, s)


# ---------------- 名单归一（普查 census 同口径） ----------------

def clean_head(raw):
    h = raw.strip()
    h = re.sub(r'^Pre A1 Starters, A1 Movers and A2 Flyers\s+', '', h)
    h = re.sub(r'\([^)]*\)', '', h)
    h = h.replace('(e)', '')
    if '/' in h:
        h = h.split('/')[0]
    toks = h.split()
    while toks:
        last = toks[-1]
        if last in POS_TAIL or last == '+':
            toks.pop()
        elif last in ('place', 'time') and len(toks) >= 2 and toks[-2] == 'of':
            toks.pop(); toks.pop()
            if toks and toks[-1] in POS_TAIL:
                toks.pop()
        else:
            break
    return ' '.join(toks)


def classify(token):
    if not token:
        return ('nonpure', None)
    if ' ' in token:
        return ('phrase', None)
    if token == 'I':
        return ('word', 'i')
    if token[0].isupper():
        return ('proper', None)
    low = token.lower()
    if re.fullmatch(r'[a-z]+', low):
        return ('word', low)
    return ('nonpure', None)


# ---------------- 构建 ----------------

def build(wb, wm, snap):
    vc_by_word = {x['word'].lower(): (x.get('vc') is not None) for x in wm['words']}

    def has_page(entry):
        return 1 if vc_by_word.get(entry['word'].lower(), False) else 0

    # ---- 主题 ----
    def tcard(it):
        return [it["id"], it["word"], it.get("phonetic_gb") or it.get("phonetic") or "",
                (it.get("pos_tags") or [it.get("pos", "")])[0],
                it.get("meaning", ""), it.get("emoji", ""), has_page(it)]

    def tsort(c):
        fr = _frank[c[0]]
        return (fr is None, fr if fr is not None else 0, c[1].lower())

    _frank = {it["id"]: it.get("freq_rank") for it in wb}
    themes = {}
    unc = defaultdict(list)
    for it in wb:
        c = tcard(it)
        if it["theme_sub"] in PROV_SUB:
            unc[it["theme_sub"]].append(c)
        else:
            t = themes.setdefault(it["theme_sub"], {"macros": Counter(), "words": []})
            t["words"].append(c)
            if it["theme_macro"] in GEN_MAC:
                t["macros"][it["theme_macro"]] += 1
    theme_list = []
    for sub, t in themes.items():
        if len(t["macros"]) > 1:
            fail(f"主题 {sub} 跨多个真大主题：{dict(t['macros'])}")
        macro = next(iter(t["macros"])) if t["macros"] else None
        theme_list.append({"name": sub, "macro": macro, "words": sorted(t["words"], key=tsort)})
    theme_list.sort(key=lambda t: -len(t["words"]))
    secs = []
    for mac in GEN_MAC:
        ts = [{"name": t["name"], "w": t["words"]} for t in theme_list if t["macro"] == mac]
        if ts:
            secs.append({"mac": mac, "themes": ts})
    rest = [{"name": t["name"], "w": t["words"]} for t in theme_list if not t["macro"]]
    if rest:
        secs.append({"mac": "其他主题", "themes": rest})
    unc_list = [{"label": k, "w": sorted(v, key=tsort)}
                for k, v in sorted(unc.items(), key=lambda kv: -len(kv[1]))]
    n_gen = sum(len(t["words"]) for t in theme_list)
    n_unc = sum(len(g["w"]) for g in unc_list)
    if not (n_gen == 2248 and n_unc == 694 and n_gen + n_unc == len(wb) == 2942):
        fail(f"主题对账失败：真主题 {n_gen} / 未分 {n_unc} / 词库 {len(wb)}（应 2248/694/2942）")
    if len(theme_list) != 25:
        fail(f"主题数应为 25，实得 {len(theme_list)}")
    by_theme = {t["name"]: len(t["words"]) for t in theme_list}
    for name, want in (("食物与饮品", 128), ("交通与出行", 79), ("家庭与亲友", 42)):
        if by_theme.get(name) != want:
            fail(f"主题 {name} 词数应为 {want}，实得 {by_theme.get(name)}")
    topic = {"tot": len(wb), "ng": n_gen, "nu": n_unc, "secs": secs, "unc": unc_list}

    # ---- 级别 ----
    excl = Counter()
    DOLCH_ORDER = ['pre-primer', 'primer', 'grade1', 'grade2', 'grade3']
    dolch_map = {}
    for lv in DOLCH_ORDER:
        for w_ in snap['dolch_levels'][lv]:
            kind, norm = classify(w_.strip())
            if kind == 'word':
                dolch_map.setdefault(norm, lv)
            else:
                excl['dolch_' + kind] += 1
    for w_ in snap['dolch_nouns']:
        kind, norm = classify(w_.strip())
        if kind == 'word':
            dolch_map.setdefault(norm, 'noun')
        else:
            excl['dolch_' + kind] += 1
    fry_map = {}
    for idx, w_ in enumerate(snap['fry_readingblocks_order']):
        kind, norm = classify(w_.strip())
        if kind == 'word':
            fry_map.setdefault(norm, idx // 100 + 1)
        else:
            excl['fry_' + kind] += 1
    YLE_NAME = {'S': 'Starters', 'M': 'Movers', 'F': 'Flyers'}
    yle_map = {}
    for raw, lv in snap['yle_entries']:
        if 'Grammatical key' in raw or ('interrogative' in raw and 'adjective' in raw):
            excl['yle_garbage'] += 1
            continue
        kind, norm = classify(clean_head(raw))
        if kind == 'word':
            yle_map.setdefault(norm, YLE_NAME[lv])
        else:
            excl['yle_' + kind] += 1

    bank = {}
    alias_hit = {}
    for e in wb:
        w_ = e['word']
        if re.fullmatch(r"[A-Za-z][A-Za-z'\-]*", w_) and ' ' not in w_ and '/' not in w_:
            bank.setdefault(w_.lower(), e)
    for e in wb:
        for a in e.get('aliases') or []:
            alias_hit.setdefault(a.lower(), e)

    def lcard(norm):
        e = bank.get(norm) or alias_hit.get(norm)
        if not e:
            return None
        return [e['id'], e['word'], e.get('phonetic_gb') or e.get('phonetic') or '',
                e.get('meaning') or '', has_page(e), 0 if norm in bank else 1]

    LEVELS = []
    DOLCH_LABEL = {'pre-primer': '学前级 Pre-Primer', 'primer': '入门级 Primer',
                   'grade1': '一年级 Grade 1', 'grade2': '二年级 Grade 2',
                   'grade3': '三年级 Grade 3', 'noun': '名词专段 Nouns'}
    for lv in DOLCH_ORDER + ['noun']:
        ws = sorted(w_ for w_, l in dolch_map.items() if l == lv)
        LEVELS.append({'group': 'Dolch 高频词', 'id': 'dolch-' + lv,
                       'label': 'Dolch · ' + DOLCH_LABEL[lv], 'words': ws})
    for h in range(1, 11):
        ws = sorted(w_ for w_, l in fry_map.items() if l == h)
        LEVELS.append({'group': 'Fry 前 1000', 'id': f'fry-{h}',
                       'label': f'Fry · 第 {h} 百词', 'words': ws})
    for lv in ['Starters', 'Movers', 'Flyers']:
        ws = sorted(w_ for w_, l in yle_map.items() if l == lv)
        LEVELS.append({'group': '剑桥 YLE', 'id': 'yle-' + lv.lower(),
                       'label': 'YLE · ' + lv, 'words': ws})

    out_levels = []
    stats = {}
    for L in LEVELS:
        cards, missing = [], []
        for norm in L['words']:
            c = lcard(norm)
            (cards.append(c) if c else missing.append(norm))
        out_levels.append({"id": L['id'], "label": L['label'], "nl": len(L['words']),
                           "cards": cards, "miss": missing})
        stats[L['id']] = (len(L['words']), len(cards), sum(1 for c in cards if c[4]))
    groups = []
    for gname in ('Dolch 高频词', 'Fry 前 1000', '剑桥 YLE'):
        ls = [o for L, o in zip(LEVELS, out_levels) if L['group'] == gname]
        groups.append({"name": gname, "levels": ls})
    # 硬断言：与原型命中表逐项对账
    tot = lambda ids: (sum(stats[i][0] for i in ids), sum(stats[i][1] for i in ids),
                       sum(stats[i][2] for i in ids))
    d_ids = ['dolch-' + lv for lv in DOLCH_ORDER + ['noun']]
    f_ids = [f'fry-{h}' for h in range(1, 11)]
    y_ids = ['yle-starters', 'yle-movers', 'yle-flyers']
    if tot(d_ids) != (315, 315, 287):
        fail(f"Dolch 命中表对账失败：{tot(d_ids)} != (315, 315, 287)")
    if tot(f_ids) != (962, 962, 640):
        fail(f"Fry 命中表对账失败：{tot(f_ids)} != (962, 962, 640)")
    if tot(y_ids) != (1179, 1179, 964):
        fail(f"YLE 命中表对账失败：{tot(y_ids)} != (1179, 1179, 964)")
    union = set(dolch_map) | set(fry_map) | set(yle_map)
    ungraded = sorted((set(bank) | set(alias_hit)) - union)
    if len(ungraded) != 1300:
        fail(f"未归级词应为 1300，实得 {len(ungraded)}")
    level = {"groups": groups, "ungr": len(ungraded)}
    stats_out = {"dolch": tot(d_ids), "fry": tot(f_ids), "yle": tot(y_ids),
                 "ungraded": len(ungraded)}
    return {"topic": topic, "level": level}, stats_out


def main(argv) -> int:
    if len(argv) != 2 or argv[1] not in ("--check", "--write"):
        print(__doc__)
        return 64
    wb = json.loads(WB_PATH.read_text(encoding="utf-8"))
    wm = json.loads(WM_PATH.read_text(encoding="utf-8"))
    snap = json.loads(SNAP_PATH.read_text(encoding="utf-8"))
    src = MAIN.read_bytes().decode("utf-8")
    try:
        s0, s1 = find_span(src, ANCHOR, "{")
    except ValueError as e:
        print(f"FAIL: {e}")
        return 1
    cur_text = src[s0:s1]
    try:
        built, stats = build(wb, wm, snap)
    except AssertionError as e:
        print(f"FAIL: {e}")
        return 1
    gen_text = JD(built)
    print(f"对账：主题 25 个 / 真主题 2248 词 / 未分 694 词；级别 Dolch {stats['dolch']}、"
          f"Fry {stats['fry']}、YLE {stats['yle']}（名单/收录/有词页）；未归级 {stats['ungraded']} 词")
    if gen_text == cur_text:
        print(f"PASS: VOCAB_DIM 字面量逐字节一致（{len(cur_text)} 字符）")
        return 0
    if argv[1] == "--check":
        print(f"VOCAB_DIM 与生成结果不一致（再生 {len(gen_text)} / 现行 {len(cur_text)} 字符，待 --write 落盘）")
        return 2
    out = src[:s0] + gen_text + src[s1:]
    # 确保生成标记在锚点行之前（规范 §3.1）
    a = out.rfind(ANCHOR, 0, s0)
    ls = out.rfind("\n", 0, a) + 1
    if ls > 0:
        prev_start = out.rfind("\n", 0, ls - 1) + 1
        if out[prev_start:ls - 1].strip() != MARKER:
            out = out[:ls] + MARKER + "\n" + out[ls:]
    MAIN.write_bytes(out.encode("utf-8"))
    print(f"VOCAB_DIM 写回完成：文件 {len(src)} -> {len(out)} 字符（索引 {len(gen_text)} 字符）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
