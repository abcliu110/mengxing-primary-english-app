#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
统一级别生成器（《数据源规范》§3：内嵌副本只能由脚本从事实源生成）。
2026-11-04「全部修改」第三波 A 新建（Stewart 两条裁定落地：①词库所有词全部
得有级别或者年级信息；②只要有词的列表出现，都可以选择按级别排序）。

事实源
  - laws-prototype/model/wordbank.json（2,942 词：词面/词频序/屈折基形链/词素）
  - laws-prototype/imported/kebiao-standards-2026-11-04/kebiao_level2_505.txt
    （2022 课标附录 3 二级表 505 条，官方扫描版 OCR 核验版，见该目录 README）
  - laws-prototype/imported/kebiao-standards-2026-11-04/kebiao_level3_new.txt
    （同上，三级表新增词 1,095 条）
  - laws-prototype/imported/kebiao-standards-2026-11-04/ecdict_freq_extract.json
    （ECDICT bnc/frq 词频序提取，仅作「推导」层分档依据）
  - laws-prototype/imported/wordlist-snapshots-2026-11-03/wordlist-census-2026-11-03.json
    （Dolch / Fry / YLE 名单快照，与 gen_vocab.py 同源同口径）

生成目标：mengxing-prototype-v1.html 呈现脚本段的
  var WORD_LEVELS = {"tags": [...], "byId": {bank_id: [ord, tagIdx, src, freq_rank, word]},
                     "byWord": {词面原形: bank_id}};

定级口径（分层顺序，先到先得；每词级别必带来源标签，推导永不冒充权威）
  1. 课标二级（ord 10）：词面命中二级表词形集。普查归一逐字沿用课标侦察
     census 口径（kebiao-scout/census_intersect.py 的 census_words：条目取
     括号前词头、按 / 分拆，分桶 word/proper/phrase/nonpure）。
     【口径登记（2026-11-04 R5-01 修复）：分桶只作普查统计，匹配用全量词形
     ——专名/短语/非纯形与纯词同权参与权威匹配：先按词面原形（含 '/' 分拆
     原形）大小写敏感精确匹配全量词形集，纯 [a-z] 词再走小写归一回退命中
     word 桶（保旧口径既有命中）。旧版只取 word 桶匹配，静默丢弃 14 个专名/
     短语/非纯形（China、Chinese、English、Internet、Miss、Mr、Mrs、Ms、OK、
     PE、TV、ice cream、o'clock、ping-pong），且小写 miss 在三级表内致 Miss
     被大小写不敏感误配三级——16 词标签错，R5-01 确诊后改为现行口径。】
     对账：二级表展开全量词形 506（word 492 + proper 11 + phrase 1 +
     nonpure 2），506/506 全部按上口径命中词库，落到词库条目 516 条（部分
     词形对应多条同形条目），与三级合计覆盖 1,364 条。
  2. 课标三级（ord 20）：同法命中三级新增词集（全量词形 1,103，命中 851，
     落条目 848）。
  3. 课标数词（ord 15）：数词闭集（基数 one–twenty/整十/hundred/thousand +
     序数 first–twelfth，共命中 40 条）——数词在原书数词分表单独立出、未并入
     505 主表普查，故单独成层并在来源标签中注明，不冒充主表词。
  4. 词表收录（ord 30）：Dolch / Fry / YLE 名单成员（归一与定级逐字沿用
     gen_vocab.py 普查口径，交集走 word 精确或 aliases 通道，与级别查同源）。
     来源标签逐表写明（如「剑桥 YLE · Movers ＋ Dolch · 一年级」）。
  5. 词频推导（ord 41–44）：ECDICT 词频序（bnc/frq 任一有值取更小序位，
     查表形 = 词面原形/斜杠分拆形/空格连字符成分形，成分命中在来源标签中
     注明「依成分「X」」）。分档：≤1500 → 41、≤3500 → 42、≤7000 → 43、
     >7000 → 44。标签恒为「推导·词频」。
  6. 随基形推导（ord = 基形 ord）：词库自带链——verb_form_of 基形或
     morphemes.root 词根形（须为词库在册词）已定级者，屈折/派生形随基形，
     标签「推导·随基形」，来源注明基形。仅用词库已登记的结构链，不猜拆。
  7. 形态推导（ord 50）：以上皆无（无词频、无基形链）→ 置末段，标签
     「推导」，来源如实写明无数据。

旧字段对账：wordbank.kebiao_level（60 条，旧波次手填「二级」）与新口径冲突
冻结 1 条，登记在本脚本 OLD_CONFLICTS 并在 --check 时断言集合相等：仅
cream——旧字段无主表依据（505 只有短语 ice cream，ice cream 本身经短语
精确匹配已归二级，cream 单列不在表内）。其余 7 条（OK/TV/Mr/Mrs/Ms/China
专名/缩略形、Miss 大小写口径差）已于 R5-01 修复后与旧字段一致（均归二级），
退出冻结表。旧字段保留原样不改（WEXTRA 档案卡仍读旧字段，属既有呈现，
本波不动）。

序列化格式：同 gen_vocab.py——Python json 默认分隔符、ensure_ascii=False。
写回安全边界：只替换唯一定位锚（"var WORD_LEVELS="，命中 != 1 拒绝）定界
扫描得到的字面量跨度，其余字节原样不动。锚缺失即停（呈现段由本波手工落位
占位字面量，同 gen_vocab 先例）。

用法
  python3 laws-prototype/tools/gen_levels.py --check
  python3 laws-prototype/tools/gen_levels.py --write
"""
import json
import re
import sys
from collections import Counter
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
MAIN = BASE / "mengxing-prototype-v1.html"
WB_PATH = BASE / "model" / "wordbank.json"
KB_DIR = BASE / "imported" / "kebiao-standards-2026-11-04"
KB2_PATH = KB_DIR / "kebiao_level2_505.txt"
KB3_PATH = KB_DIR / "kebiao_level3_new.txt"
EC_PATH = KB_DIR / "ecdict_freq_extract.json"
SNAP_PATH = BASE / "imported" / "wordlist-snapshots-2026-11-03" / "wordlist-census-2026-11-03.json"

JD = lambda o: json.dumps(o, ensure_ascii=False)

MARKER = ("/* GENERATED: tools/gen_levels.py ← model/wordbank.json + imported/kebiao-standards-2026-11-04"
          " + imported/wordlist-snapshots-2026-11-03 · DO NOT EDIT */")
ANCHOR = "var WORD_LEVELS="

TAGS = ["课标二级", "课标数词", "课标三级", "词表收录", "推导·词频", "推导·随基形", "推导"]
TG = {t: i for i, t in enumerate(TAGS)}

NUMSET = {'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
          'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
          'seventeen', 'eighteen', 'nineteen', 'twenty', 'thirty', 'forty', 'fifty',
          'sixty', 'seventy', 'eighty', 'ninety', 'hundred', 'thousand',
          'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth',
          'ninth', 'tenth', 'eleventh', 'twelfth'}

# 旧 kebiao_level 字段冲突冻结表（id: 原因），与新口径对账的登记面，见头注。
# R5-01 修复后仅剩 cream 1 条：OK/TV/Mr/Mrs/Ms/China/Miss 已按全量词形匹配
# 归二级，与旧字段一致，退出冻结（历史原因见头注旧字段对账段）。
OLD_CONFLICTS = {
    'G3_K39': 'cream：旧字段无主表依据（505 仅有短语 ice cream；ice cream 经短语精确匹配归二级，cream 单列不在表内）',
}


def fail(msg):
    raise AssertionError(msg)


def scan_literal(src: str, start: int) -> int:
    """定界扫描（与 gen_vocab.py 同逻辑）。"""
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


# ---------------- 课标普查归一（census_intersect.census_words 逐字口径） ----------------

def census_words(forms):
    ws = []
    for e in forms:
        h = re.split(r'\s*\(', e.replace('（', '(').replace('）', ')'))[0].strip()
        for part in [p.strip() for p in h.replace('/', ' / ').split('/')]:
            if not part:
                continue
            if ' ' in part:
                ws.append(('phrase', part))
                continue
            if part == 'I':
                ws.append(('word', 'i'))
                continue
            if part[0].isupper():
                ws.append(('proper', part))
                continue
            low = part.lower()
            if re.fullmatch(r'[a-z]+', low):
                ws.append(('word', low))
            else:
                ws.append(('nonpure', part))
    return ws


def kebiao_forms(path):
    return [l.strip() for l in path.read_text(encoding="utf-8").splitlines()
            if l.strip() and not l.strip().startswith('#')]


# ---------------- 名单归一（gen_vocab 普查口径，逐字复用其函数） ----------------

POS_TAIL = {'n', 'v', 'adj', 'adv', 'prep', 'conj', 'det', 'pron', 'poss', 'int',
            'dis', 'excl', 'modal'}


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

def build(wb, snap, ec):
    by_id = {e['id']: e for e in wb}

    def parts_of(item):
        w = item['word'].strip().lower()
        return [p.strip() for p in w.split('/')] if '/' in w else [w]

    bank_keys = {}
    for item in wb:
        bank_keys.setdefault(item['word'].strip().lower(), item['id'])
        if '/' in item['word']:
            for p in item['word'].split('/'):
                bank_keys.setdefault(p.strip().lower(), item['id'])

    # ---- 1/2 课标 ----
    # 口径（R5-01 修复登记）：分桶（word/proper/phrase/nonpure）只作普查统计，
    # 权威匹配用全量词形集——先按词面原形大小写敏感精确匹配，再以小写归一
    # 回退命中 word 桶。旧版只取 word 桶，专名/短语/非纯形在匹配前被丢弃。
    l2_census = census_words(kebiao_forms(KB2_PATH))
    l3_census = census_words(kebiao_forms(KB3_PATH))
    l2_forms = {w for k, w in l2_census}
    l3_forms = {w for k, w in l3_census}
    l2_words = {w for k, w in l2_census if k == 'word'}
    l3_words = {w for k, w in l3_census if k == 'word'}
    bank_exact = set()
    for e in wb:
        w0 = e['word'].strip()
        bank_exact.add(w0)
        for p0 in w0.split('/'):
            bank_exact.add(p0.strip())

    def census_hit(forms_all, forms_word):
        # 词形命中词库：原形精确命中，或 word 桶词形经小写键命中（同匹配口径）
        return {f for f in forms_all if f in bank_exact or (f in forms_word and f in bank_keys)}

    h2 = census_hit(l2_forms, l2_words)
    h3 = census_hit(l3_forms, l3_words)
    if len(l2_forms) != 506 or len(h2) != 506:
        fail(f"课标二级全量词形应为 506 且全部命中词库，实得词形 {len(l2_forms)} / 命中 {len(h2)}")
    if len(l3_forms) != 1103 or len(h3) != 851:
        fail(f"课标三级全量词形应为 1103、命中 851，实得词形 {len(l3_forms)} / 命中 {len(h3)}")

    lv = {}  # id -> [ord, tag, src]

    def put(item, o, tag, src):
        lv[item['id']] = [o, tag, src]

    def orig_parts(item):
        w = item['word'].strip()
        return [p.strip() for p in w.split('/')] if '/' in w else [w]

    def kb_match(item, forms_all, forms_word):
        if any(p in forms_all for p in orig_parts(item)):
            return True
        return any(p in forms_word for p in parts_of(item))

    for item in wb:
        if kb_match(item, l2_forms, l2_words):
            put(item, 10, '课标二级', '课标二级 · 2022 课标附录3 二级表')
        elif kb_match(item, l3_forms, l3_words):
            put(item, 20, '课标三级', '课标三级 · 2022 课标附录3 三级表新增词')
    n_kb = len(lv)
    if n_kb != 1364:
        fail(f"课标二级+三级覆盖词库条目应为 1364（全量 2942 − 未覆盖 1578），实得 {n_kb}")

    # ---- 3 数词 ----
    n_num = 0
    for item in wb:
        if item['id'] in lv:
            continue
        if any(p in NUMSET for p in parts_of(item)):
            put(item, 15, '课标数词', '课标附录3 · 数词分表（原书分表单列，未并入 505 主表）')
            n_num += 1
    if n_num != 40:
        fail(f"数词层应为 40 条，实得 {n_num}")

    # ---- 4 名单（gen_vocab 口径） ----
    DOLCH_ORDER = ['pre-primer', 'primer', 'grade1', 'grade2', 'grade3']
    dolch_map = {}
    for l_ in DOLCH_ORDER:
        for w_ in snap['dolch_levels'][l_]:
            kind, norm = classify(w_.strip())
            if kind == 'word':
                dolch_map.setdefault(norm, l_)
    for w_ in snap['dolch_nouns']:
        kind, norm = classify(w_.strip())
        if kind == 'word':
            dolch_map.setdefault(norm, 'noun')
    fry_map = {}
    for idx, w_ in enumerate(snap['fry_readingblocks_order']):
        kind, norm = classify(w_.strip())
        if kind == 'word':
            fry_map.setdefault(norm, idx // 100 + 1)
    YLE_NAME = {'S': 'Starters', 'M': 'Movers', 'F': 'Flyers'}
    yle_map = {}
    for raw, l_ in snap['yle_entries']:
        if 'Grammatical key' in raw or ('interrogative' in raw and 'adjective' in raw):
            continue
        kind, norm = classify(clean_head(raw))
        if kind == 'word':
            yle_map.setdefault(norm, YLE_NAME[l_])
    bank = {}
    alias_hit = {}
    for e in wb:
        w_ = e['word']
        if re.fullmatch(r"[A-Za-z][A-Za-z'\-]*", w_) and ' ' not in w_ and '/' not in w_:
            bank.setdefault(w_.lower(), e)
    for e in wb:
        for a in e.get('aliases') or []:
            alias_hit.setdefault(a.lower(), e)
    DOLCH_CN = {'pre-primer': '学前级', 'primer': '入门级', 'grade1': '一年级',
                'grade2': '二年级', 'grade3': '三年级', 'noun': '名词专段'}
    mem = {}
    for norm, l_ in yle_map.items():
        e = bank.get(norm) or alias_hit.get(norm)
        if e:
            mem.setdefault(e['id'], []).append('剑桥 YLE · ' + l_)
    for norm, l_ in dolch_map.items():
        e = bank.get(norm) or alias_hit.get(norm)
        if e:
            mem.setdefault(e['id'], []).append('Dolch · ' + DOLCH_CN[l_])
    for norm, hh in fry_map.items():
        e = bank.get(norm) or alias_hit.get(norm)
        if e:
            mem.setdefault(e['id'], []).append(f'Fry · 第 {hh} 百词')
    n_list = 0
    for item in wb:
        if item['id'] in lv or item['id'] not in mem:
            continue
        put(item, 30, '词表收录', ' ＋ '.join(mem[item['id']]))
        n_list += 1

    # ---- 5 词频推导 ----
    def ec_rank(item):
        w = item['word'].strip().lower()
        cands = [w] + parts_of(item) + [t for t in re.split(r'[\s\-]+', w) if t]
        best = None
        for c in cands:
            r = ec.get(c)
            if r:
                for v, srcn in ((r[0], 'BNC'), (r[1], 'COCA')):
                    if v > 0 and (best is None or v < best[0]):
                        best = (v, srcn, c)
        return best

    n_freq = Counter()
    for item in wb:
        if item['id'] in lv:
            continue
        best = ec_rank(item)
        if not best:
            continue
        v, srcn, c = best
        o = 41 if v <= 1500 else 42 if v <= 3500 else 43 if v <= 7000 else 44
        via = '' if c == item['word'].strip().lower() else f'依成分「{c}」的 '
        put(item, o, '推导·词频', f'词频推导 · {via}ECDICT {srcn} 序 {v}')
        n_freq[o] += 1

    # ---- 6 随基形推导（两轮定点：基形可为同层派生） ----
    word2id = {}
    for e in wb:
        word2id.setdefault(e['word'].strip().lower(), e['id'])
    n_form = 0
    for _round in range(3):
        progressed = False
        for item in wb:
            if item['id'] in lv:
                continue
            base = None
            vf = item.get('verb_form_of')
            if vf:
                bid = word2id.get(str(vf).strip().lower())
                if bid and bid in lv:
                    base = (str(vf).strip(), '原形')
            if base is None:
                mm = item.get('morphemes')
                if isinstance(mm, dict) and mm.get('root'):
                    rid = word2id.get(str(mm['root']).strip().lower())
                    if rid and rid in lv and by_id[rid]['word'] != item['word']:
                        base = (str(mm['root']).strip(), '词根')
            if base:
                bo = lv[word2id[base[0].lower()]][0]
                put(item, bo, '推导·随基形', f'形态推导 · 随基形「{base[0]}」（{base[1]}已定级）')
                n_form += 1
                progressed = True
        if not progressed:
            break

    # ---- 7 形态推导（末段） ----
    n_morph = 0
    for item in wb:
        if item['id'] not in lv:
            put(item, 50, '推导', '形态推导 · 无词频与基形链数据，按词形置末段')
            n_morph += 1

    if len(lv) != 2942 or len(wb) != 2942:
        fail(f"级别覆盖应为 2942/2942，实得 {len(lv)}/{len(wb)}")

    # ---- 旧字段冲突对账 ----
    conflicts = {}
    for e in wb:
        if e.get('kebiao_level') == '二级' and lv[e['id']][1] != '课标二级':
            conflicts[e['id']] = e['word']
    if set(conflicts) != set(OLD_CONFLICTS):
        fail(f"旧 kebiao_level 冲突集合与冻结表不符：新增 {sorted(set(conflicts) - set(OLD_CONFLICTS))}，"
             f"消失 {sorted(set(OLD_CONFLICTS) - set(conflicts))}（{conflicts}）")

    byId = {}
    for e in wb:
        o, tag, src = lv[e['id']]
        byId[e['id']] = [o, TG[tag], src, e.get('freq_rank'), e['word']]
    byWord = {}
    for e in wb:
        byWord[e['word']] = e['id']
        lw = e['word'].lower()
        if lw != e['word'] and lw not in byWord:
            byWord[lw] = e['id']
    stats = {"kb2_entries": sum(1 for v in lv.values() if v[1] == '课标二级'),
             "kb3_entries": sum(1 for v in lv.values() if v[1] == '课标三级'),
             "num": n_num, "list": n_list,
             "freq": dict(n_freq), "form": n_form, "morph": n_morph}
    # 全层计数冻结（2026-11-04 首建实测；2026-11-04 R5-01 修复后重登记：
    # 名单层 −1（Internet 归课标二级）、词频层 −14（14 词归课标二/三级，
    # 分档 {41:−8, 42:−3, 43:−1, 44:−2}）；源表或口径变更须同步改此表并在报告中说明）
    if not (stats["list"] == 487 and stats["freq"] == {41: 126, 42: 178, 43: 250, 44: 407}
            and stats["form"] == 72 and stats["morph"] == 18):
        fail(f"分层计数与冻结表不符：{stats}")
    return {"tags": TAGS, "byId": byId, "byWord": byWord}, stats


def main(argv) -> int:
    if len(argv) != 2 or argv[1] not in ("--check", "--write"):
        print(__doc__)
        return 64
    wb = json.loads(WB_PATH.read_text(encoding="utf-8"))
    snap = json.loads(SNAP_PATH.read_text(encoding="utf-8"))
    ec = json.loads(EC_PATH.read_text(encoding="utf-8"))
    src = MAIN.read_bytes().decode("utf-8")
    try:
        s0, s1 = find_span(src, ANCHOR, "{")
    except ValueError as e:
        print(f"FAIL: {e}")
        return 1
    cur_text = src[s0:s1]
    try:
        built, stats = build(wb, snap, ec)
    except AssertionError as e:
        print(f"FAIL: {e}")
        return 1
    gen_text = JD(built)
    print(f"对账：覆盖 2942/2942；课标二级 {stats['kb2_entries']} 条（全量词形 506/506 命中）、"
          f"课标三级 {stats['kb3_entries']} 条（全量词形命中 851/1103）、数词 {stats['num']}、"
          f"词表收录 {stats['list']}、词频推导 {sum(stats['freq'].values())}（分档 {stats['freq']}）、"
          f"随基形 {stats['form']}、形态末段 {stats['morph']}；旧字段冲突冻结 1 条（cream）登记在案")
    if gen_text == cur_text:
        print(f"PASS: WORD_LEVELS 字面量逐字节一致（{len(cur_text)} 字符）")
        return 0
    if argv[1] == "--check":
        print(f"WORD_LEVELS 与生成结果不一致（再生 {len(gen_text)} / 现行 {len(cur_text)} 字符，待 --write 落盘）")
        return 2
    out = src[:s0] + gen_text + src[s1:]
    a = out.rfind(ANCHOR, 0, s0)
    ls = out.rfind("\n", 0, a) + 1
    if ls > 0:
        prev_start = out.rfind("\n", 0, ls - 1) + 1
        if out[prev_start:ls - 1].strip() != MARKER:
            out = out[:ls] + MARKER + "\n" + out[ls:]
    MAIN.write_bytes(out.encode("utf-8"))
    print(f"WORD_LEVELS 写回完成：文件 {len(src)} -> {len(out)} 字符（级别表 {len(gen_text)} 字符）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
