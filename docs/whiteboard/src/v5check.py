#!/usr/bin/env python3
"""v5check.py —— v5 原生 R2/R4 轻量静态检查（第五波第 4 项，2026-11-09；第六波第 1、4 项升级）。

为什么需要它：r2check.py 已废止（见 docs/whiteboard/src/r2check.RETIRED.md；
它依赖已停用的 insert_wb.py 与已删旧主文件，从未进仓库）。v5 下 R2/R4
原来只剩打包 grep + 探针时长佐证，没有逐幕的静态检查。本脚本只做能从
场景文件静态验证的那部分，不硬编验不了的检查。

R2/R4 在 v5 下的规格依据（SOP.md §0 / §7 / §8；引擎实测）：
  R2：画面上每个英文单词都要有例句；单词和句子都必须有语音朗读。
  R4：单词或例句里的动作必须由讲解员小人或场景角色演出来，和朗读同步；
      R4v2：主动词用专属动作演，actionWords 不为空（旧引擎概念；v5 里对应
      的是每幕的 ACTS 登记，见下）。
  v5 引擎的结构保证（实测代码，不是推测）：
  - autoBuild（scenes/auto.js）：每个 's' 项必发一次 K.say（'s' 分支末尾）；
    'w' 项只写白板、不单独发 K.say——词级朗读只发生在某条 's' 句里
    （先读词 word: 或句中词）。
  - oralBuild（scenes/oral.js）：每个 's' 项进一个对话轮次，轮次英文必
    K.say（oral.js:132）；核心交际句必 K.say（oral.js:161）。
  - polyBuild（scenes/poly.js）：唯一的 's' 项（sayEn）必 K.say
    （poly.js:109），另读 ex1/ex2 中与 sayEn 不同的那一句（poly.js:110-111）。
  - ACTS 与演出：autoBuild 按 ACTS 键在 's' 句里找动作词，找到才排演员
    关键帧（auto.js 's' 分支）；oralBuild 用 ACTS 的 M/F/A/B 两组角色帧
    （oral.js:42-45），polyBuild 用 ACTS['*'] 的帧（poly.js:41），三者
    都以 SP.FI 里有该帧为演出前提（无帧则该帧不演、不报错）。

检查项（只对 ITEMS/ACTS 约定的三类 builder 幕：autoBuild 630 + oralBuild
144 + polyBuild 96 = 870 幕；其余见“覆盖外”）：
  R2-S1  有朗读句：auto/oral 至少 1 个 's' 项；poly 恰好 1 个 's' 项
          （polyBuild 只读最后一个 's'，多个会丢前面的）。
  R2-W1  白板词有句读：'w' 项里的每个英文词（去音标、去 1 字母标签）
          都出现在某句被朗读的句子里（词形按旧 r2check 口径：-s/-es/
          -ed/-ing/-d 屈折算覆盖；'…ing'、'im-' 类词块按子串算覆盖；
          不规则动词按同族算覆盖，见 IRREGULAR）。以下两类不计入：
          (a) 全局豁免 `r2skip.json`（板上有字但按 SOP 不应读的标记、
          标签、占位符、框架名等，每类有豁免理由，见该文件）；
          (b) 逐幕豁免 `const R2SKIP = [...]`（旧 r2skip 语义，只用于
          画面上故意展示的错误形式，如 longth、stoped；只能用于错误
          形式或字母名，不能拿来躲朗读，见 SOP §13）。
  R2-P1  （仅 auto；WARN）先读词提醒：'s' 项第 4 元（先读词）由 K.say 的
          word: 参数先单独读，R2 本身已满足；统一口径（第六波第 4 项）：
          先读词表 = 空格分隔的词表，表中每个词须满足以下任一才算合规：
          (1) 屈折一致：原形或屈折形（-s/-es/-ed/-ing/-d，不规则动词
          同族，如 give/gave）出现在本句中；
          (2) 词块：是本句某词的子串或包含本句某词（前缀/词根/词尾，
          如 im- ← Import，-ly ← happily，brush ← toothbrush）；
          (3) 词条占位：something / somebody / someone（短语动词词条
          的宾语占位，句中用真实宾语），或词条首的 be（be falling
          down 的不定式标记）；
          (4) 二选一：'/' 连接的备选（如 well/badly），任一备选合规
          即合规。
          其余一律视为错位（多句词表串到一句上、答案词、拼写碎片等），
          须把词移到它所属的那句的词表里或删掉。只提醒，不作门禁。
  R4-F1  ACTS 在位：const ACTS 存在（三类幕实测 870/870 在位）。
  R4-F2  （仅 auto）动作词挂在朗读句上：ACTS 每个键（'*' 除外）按
          autoBuild 的匹配口径出现在某句 's' 句里（单字按屈折口径，
          helps/help、sweeping/sweep 算同一词）。按“课”查，不按单幕：
          长幕拆成多节（split_auto.py：ACTS 原样留在每一节）时，键只
          须在同课任一节的朗读句里出现——动作在该节读到词时演出，
          同课其他节里的同键是同一份 ACTS 登记，不是缺口。
  R4-F3  演出帧在库：ACTS 登记的每个帧都在精灵包 FI 里。精灵包是
          stub（FI 为空）或缺失时记 UNKNOWN，不算失败——帧是否存在
          是重建进度问题，不是场景内容问题。
  WARN   ACTS 为空：该幕没排任何动作（R4 要求动作词有演出；但“该幕
          有没有动作词”静态定不了——没有动词词表，不硬编；只计数提醒）。

覆盖外（本脚本只盘点数量，不判对错；原因写在底稿 wave5_wb.md §4）：
  mindmapBuild 25 幕（导图结构，无 ITEMS/'s'）、lightTwinsBuild 3 幕、
  buildAdj 4 幕、frBuild 4 幕、其他手写幕 51 幕（各用 kit 的 say() 等
  不同写法，无统一 ITEMS/ACTS 约定）、共享 lib/引擎模块 10 个。
  另：'m' 灰片与 'n' 讲解字幕的英文词不在 R2-W1 范围内（'m' 多为
  分类标签/中文，'n' 是讲解不是白板词）。

用法：
  python3 docs/whiteboard/src/v5check.py [--only <前缀> ...] [--json out.json]
退出码：0 = 无 FAIL（WARN/UNKNOWN 不影响）；1 = 有 FAIL。
"""
import json, os, re, sys
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
SCENES = os.path.join(ROOT, 'docs/whiteboard/v5/scenes')
SPRITES = os.path.join(ROOT, 'docs/whiteboard/v5/sprites')
LIB_ENGINE = {'cmp_lib.js', 'fb39_lib.js', 'g14_lib.js', 'fr_lib.js',
              'hd_poly_g4_157_v2.js', 'wordcard_items.js',
              'auto.js', 'adj_train.js', 'oral.js', 'poly.js'}
BUILDERS = (('auto', 'autoBuild('), ('oral', 'oralBuild('), ('poly', 'polyBuild('),
            ('mindmap', 'mindmapBuild('), ('twins', 'lightTwinsBuild('),
            ('adj', 'buildAdj('), ('fr', 'frBuild('))
SUFFIXES = ('s', 'es', 'ed', 'ing', 'd')
FRAGMENTS = {'ing', 'ed', 'es', 'er', 'est'}   # '…ing' 之类词块：按子串算覆盖

# ---- r2skip 全局豁免清单（第六波第 1 项）----
# docs/whiteboard/src/r2skip.json：每类有豁免理由，见该文件与底稿
# docs/work-2026-11-09/wave6_item1_v5check_baseline.md。
# 只豁免板上有字但按 SOP 不应读的东西；实词一律不豁免。
def _load_exempt():
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'r2skip.json')
    try:
        data = json.load(open(p, encoding='utf-8'))
    except Exception:
        return set()
    out = set()
    for cat in data.get('categories', []):
        out.update(w.lower() for w in cat.get('words', []))
    return out

EXEMPT = _load_exempt()

# ---- 不规则动词同族表（第六波第 1、4 项）----
# 旧 r2check 口径只认 -s/-es/-ed/-ing/-d 规则屈折；先读词用原形、句中用
# 不规则过去式/过去分词（如 give vs gave、go vs went）是合法教学写法，
# 不是缺口。表里只列常见不规则动词（原形 → 过去式/过去分词）；双向同族。
IRREGULAR = {
    'go': {'went', 'gone'}, 'fall': {'fell', 'fallen'}, 'fly': {'flew', 'flown'},
    'get': {'got', 'gotten'}, 'give': {'gave', 'given'}, 'speak': {'spoke', 'spoken'},
    'stand': {'stood'}, 'hold': {'held'}, 'take': {'took', 'taken'},
    'come': {'came'}, 'see': {'saw', 'seen'}, 'eat': {'ate', 'eaten'},
    'buy': {'bought'}, 'bring': {'brought'}, 'think': {'thought'},
    'teach': {'taught'}, 'catch': {'caught'}, 'write': {'wrote', 'written'},
    'swim': {'swam', 'swum'}, 'run': {'ran'}, 'sit': {'sat'}, 'win': {'won'},
    'do': {'did', 'done'}, 'make': {'made'}, 'keep': {'kept'}, 'sleep': {'slept'},
    'tell': {'told'}, 'find': {'found'}, 'leave': {'left'}, 'feel': {'felt'},
    'meet': {'met'}, 'pay': {'paid'}, 'say': {'said'}, 'sell': {'sold'},
    'send': {'sent'}, 'sing': {'sang', 'sung'}, 'drink': {'drank', 'drunk'},
    'begin': {'began', 'begun'}, 'break': {'broke', 'broken'},
    'choose': {'chose', 'chosen'}, 'drive': {'drove', 'driven'},
    'forget': {'forgot', 'forgotten'}, 'grow': {'grew', 'grown'},
    'hear': {'heard'}, 'hide': {'hid', 'hidden'}, 'know': {'knew', 'known'},
    'ride': {'rode', 'ridden'}, 'ring': {'rang', 'rung'}, 'rise': {'rose', 'risen'},
    'wear': {'wore', 'worn'}, 'throw': {'threw', 'thrown'}, 'blow': {'blew', 'blown'},
    'draw': {'drew', 'drawn'}, 'dream': {'dreamt', 'dreamed'}, 'wake': {'woke', 'woken'},
    'bite': {'bit', 'bitten'}, 'steal': {'stole', 'stolen'}, 'build': {'built'},
    'lend': {'lent'}, 'spend': {'spent'}, 'shoot': {'shot'}, 'mean': {'meant'},
    'lose': {'lost'}, 'light': {'lit'}, 'fight': {'fought'}, 'hang': {'hung'},
    'feed': {'fed'}, 'lead': {'led'}, 'dig': {'dug'}, 'sweep': {'swept'},
    'deal': {'dealt'}, 'freeze': {'froze', 'frozen'}, 'shake': {'shook', 'shaken'},
    'tear': {'tore', 'torn'}, 'forbid': {'forbade', 'forbidden'},
    'forgive': {'forgave', 'forgiven'}, 'understand': {'understood'},
    'become': {'became'}, 'be': {'am', 'is', 'are', 'was', 'were', 'been', 'being'},
    'have': {'has', 'had'}, 'can': {'could'}, 'will': {'would'},
    'shall': {'should'}, 'may': {'might'},
}
_IRREG_FAM = {}
for _base, _forms in IRREGULAR.items():
    _fam = {_base} | set(_forms)
    for _w in _fam:
        _IRREG_FAM[_w] = _fam

PLACEHOLDERS = {'something', 'somebody', 'someone'}  # 短语动词词条的宾语占位


def family_key(name):
    """同课分组：长幕拆节（_pN_）与生成副本（gen_stock_/gen_b6pilot_/gen_）
    归到同一课；R4-F2 按课查。"""
    n = re.sub(r'^gen_(stock_|b6pilot_)?', '', name)
    n = re.sub(r'_p\d+_', '_', n)
    return n


def decode_js_string(raw):
    """解 JS 字符串转义（\\' \\" \\\\ \\n \\t \\uXXXX），其余原样。"""
    out, i = [], 0
    while i < len(raw):
        ch = raw[i]
        if ch == '\\' and i + 1 < len(raw):
            n = raw[i + 1]
            if n == 'u' and i + 5 < len(raw) + 1:
                try:
                    out.append(chr(int(raw[i + 2:i + 6], 16)))
                    i += 6
                    continue
                except ValueError:
                    pass
            out.append({'n': '\n', 't': '\t', 'r': '\r'}.get(n, n))
            i += 2
        else:
            out.append(ch)
            i += 1
    return ''.join(out)


def scan_balanced(src, start, open_ch, close_ch):
    """从 start 处的开括号扫描到配对的闭括号，返回括号内文本；字符串感知。"""
    assert src[start] == open_ch
    depth, i, in_str, esc = 0, start, None, False
    while i < len(src):
        ch = src[i]
        if in_str:
            if esc:
                esc = False
            elif ch == '\\':
                esc = True
            elif ch == in_str:
                in_str = None
        else:
            if ch in ('"', "'"):
                in_str = ch
            elif ch == open_ch:
                depth += 1
            elif ch == close_ch:
                depth -= 1
                if depth == 0:
                    return src[start + 1:i]
        i += 1
    return None


def extract_strings(text):
    """抽一段 JS 文本里的全部字符串字面量（按出现顺序，解转义）。"""
    out, i, in_str, esc, buf = [], 0, None, False, []
    while i < len(text):
        ch = text[i]
        if in_str:
            if esc:
                buf.append(ch)
                esc = False
            elif ch == '\\':
                buf.append(ch)
                esc = True
            elif ch == in_str:
                out.append(decode_js_string(''.join(buf)))
                buf, in_str = [], None
            else:
                buf.append(ch)
        else:
            if ch in ('"', "'"):
                in_str, buf = ch, []
        i += 1
    return out


def extract_items(src):
    """读 const ITEMS = [...]，返回 [[kind, a, b, ...], ...]；无则 None。"""
    m = re.search(r'const ITEMS\s*=\s*\[', src)
    if not m:
        return None
    body = scan_balanced(src, m.end() - 1, '[', ']')
    if body is None:
        return None
    items = []
    i = 0
    while i < len(body):
        if body[i] == '[':
            inner = scan_balanced(body, i, '[', ']')
            if inner is None:
                break
            strs = extract_strings(body[i:i + len(inner) + 2])
            if strs:
                items.append(strs)
            i += len(inner) + 2
        else:
            i += 1
    return items


def extract_acts(src):
    """读 const ACTS = {...}，返回 {key: [frames]}；无则 None。"""
    m = re.search(r'const ACTS\s*=\s*\{', src)
    if not m:
        return None
    body = scan_balanced(src, m.end() - 1, '{', '}')
    if body is None:
        return None
    acts = {}
    for km in re.finditer(r'''(?:(['"])(.*?)\1|([A-Za-z0-9_*]+))\s*:\s*\[([^\]]*)\]''', body):
        key = decode_js_string(km.group(2)) if km.group(2) is not None else km.group(3)
        acts[key] = extract_strings(km.group(4))
    return acts


def norm_word(w):
    return re.sub(r"[^a-z']", '', w.lower())


def en_tokens(s):
    """英文词：去 /音标/ 段，取 [A-Za-z']+ 并按引擎 norm() 归一（缩写不断开：
    don't → dont，与朗读句侧同一口径），去 1 字母标签；返回小写词表。"""
    s = re.sub(r'/[^/]{1,20}/', ' ', s)
    return [norm_word(t) for t in re.findall(r"[A-Za-z']+", s)
            if len(norm_word(t)) > 1]


def token_covered(w, read_tokens):
    """旧 r2check 口径：原形或 -s/-es/-ed/-ing/-d 屈折出现即覆盖；
    词块（ing/ed/es/er/est、带 - 的前后缀）按子串算覆盖；
    不规则动词按同族算覆盖（give/gave、go/went 双向）。"""
    if w in read_tokens:
        return True
    if w in FRAGMENTS:
        return any(w in t for t in read_tokens)
    if w.endswith('-'):
        return any(w[:-1] in t for t in read_tokens)
    for suf in SUFFIXES:
        if w + suf in read_tokens or (w.endswith(suf) and w[:-len(suf)] in read_tokens):
            return True
    if w in _IRREG_FAM and _IRREG_FAM[w] & read_tokens:
        return True
    return False


def extract_r2skip(src):
    """读 const R2SKIP = [...]（逐幕豁免，只用于故意展示的错误形式，
    如 longth、stoped；无则返回空集）。"""
    m = re.search(r'const R2SKIP\s*=\s*\[', src)
    if not m:
        return set()
    body = scan_balanced(src, m.end() - 1, '[', ']')
    if body is None:
        return set()
    return {s.lower() for s in extract_strings(body)}


def sprite_fi(lib):
    """读精灵包 FI 键集合；返回 (status, keys)：status ∈ real/stub/missing。"""
    p = os.path.join(SPRITES, lib)
    if not os.path.exists(p):
        return 'missing', set()
    if os.path.getsize(p) == 44:
        return 'stub', set()
    src = open(p, encoding='utf-8', errors='replace').read()
    m = re.search(r'export const FI\s*=\s*\{', src)
    if not m:
        return 'stub', set()
    body = scan_balanced(src, m.end() - 1, '{', '}')
    try:
        return 'real', set(json.loads('{' + body + '}').keys())
    except Exception:
        return 'real-unparsed', set()


def pre_word_ok(pre, sent_tokens, pre_list_first):
    """R2-P1 统一口径（第六波第 4 项）：先读词表中一个词合规，当且仅当满足
    以下任一：(1) 屈折一致（原形/屈折形/不规则同族在本句中）；
    (2) 词块（本句某词的子串，或包含本句某词）；(3) 词条占位
    （something/somebody/someone，或词条首的 be）。'/' 备选由调用方拆开，
    任一备选合规即合规。"""
    if not pre:
        return True
    if token_covered(pre, sent_tokens):
        return True
    # 词块：本句某词包含先读词（如 im- ← Import），或先读词包含本句某词
    # （如 toothbrush ← brush）；前一方向只认 ≥2 字母的先读词（'s' 是复数
    # 标记，特许 1 字母），否则 'I' ⊂ 'with' 之类的 1 字母短词会误判通过；
    # 后一方向只认 ≥3 字母的词块，否则 'on' ⊂ 'moon' 之类的 2 字母短词
    # 会误判通过。
    if len(pre) >= 2 or pre == 's':
        if any(pre in t for t in sent_tokens if len(t) >= 2):
            return True
    if any(t in pre for t in sent_tokens if len(t) >= 3):
        return True
    if pre in PLACEHOLDERS:
        return True
    if pre == 'be' and pre_list_first:
        return True
    return False


def check_scene(path, name, fam_sents=None):
    """返回 (builder, fails, warns, unknowns, stats)。
    fam_sents：同课各节的朗读句 token 表（R4-F2 按课查；无则只查本幕）。"""
    src = open(path, encoding='utf-8', errors='replace').read()
    builder = None
    for b, pat in BUILDERS:
        if pat in src and 'export default' in src:
            builder = b
            break
    if builder is None:
        return None, [], [], [], {}
    if builder not in ('auto', 'oral', 'poly'):
        return builder, [], [], [], {}
    items = extract_items(src) or []
    acts = extract_acts(src)
    fails, warns, unknowns = [], [], []
    s_items = [it for it in items if it and it[0] == 's']
    w_items = [it for it in items if it and it[0] == 'w']
    # ---- R2-S1：有朗读句 ----
    if builder == 'poly':
        if len(s_items) != 1:
            fails.append(('R2-S1', f"'s' 项 {len(s_items)} 个，polyBuild 只读最后一个"))
    elif not s_items:
        fails.append(('R2-S1', '无 s 项：该幕没有朗读句'))
    # ---- 读句语料（被朗读的句子）----
    read_sents = [it[1] for it in s_items if len(it) > 1]
    if builder == 'oral':
        for it in w_items:
            m = re.match(r'^核心交际句：(.*?) （(.*)）$', it[1] if len(it) > 1 else '')
            if m:
                read_sents.append(m.group(1))
    if builder == 'poly':
        # polyBuild 另读 ex1/ex2 中与 sayEn 不同的那一句
        ex = []
        last = None
        for it in items:
            a = it[1] if len(it) > 1 else ''
            if re.match(r'^① ', a):
                last = 's1'
            elif re.match(r'^② ', a):
                last = 'br'
            elif re.match(r'^③ ', a):
                last = 's2'
            elif last == 's1' and a:
                ex.append(a)
                last = None
            elif last == 's2' and a:
                ex.append(a)
                last = None
        say_en = s_items[0][1] if s_items and len(s_items[0]) > 1 else ''
        read_sents += [e for e in ex if e != say_en][:1]
    read_tokens = set()
    for s in read_sents:
        read_tokens.update(norm_word(t) for t in re.findall(r"[A-Za-z']+", s))
    if builder == 'auto':
        # 先读词（'s' 第 4 元）由 K.say 的 word: 参数先单独读（auto.js 's'
        # 分支），故计入已读语料；R2-P1 另查它与句中词形是否一致。
        for it in s_items:
            if len(it) > 3 and it[3]:
                read_tokens.update(norm_word(t) for t in re.findall(r"[A-Za-z']+", it[3]))
    # ---- R2-W1：白板词有句读（豁免：全局 r2skip.json + 逐幕 R2SKIP）----
    scene_skip = extract_r2skip(src)
    uncovered = Counter()
    n_exempted = 0
    for it in w_items:
        if len(it) < 2:
            continue
        for w in en_tokens(it[1]):
            if w in EXEMPT or w in scene_skip:
                n_exempted += 1
                continue
            if not token_covered(w, read_tokens):
                uncovered[w] += 1
    if uncovered:
        fails.append(('R2-W1', '白板词未被任何朗读句读到：' +
                     ', '.join(f'{w}×{n}' for w, n in uncovered.most_common(8))))
    # ---- R2-P1：先读词统一口径（仅 auto；WARN 不判失败）----
    # 先读词由 K.say 的 word: 参数先单独读（auto.js 's' 分支），R2 本身已
    # 满足；这里只提醒表中词与本句无任何合规关系（屈折/词块/词条占位/
    # 二选一皆不满足），即多句词表串到一句上等错位，须移走或删掉。
    if builder == 'auto':
        for it in s_items:
            if len(it) > 3 and it[3]:
                # 先按空白切词表；'/' 备选（如 well/badly）先拆再归一，
                # 不能先归一（norm 会吞掉 '/'）。
                raw_list = re.findall(r"[A-Za-z'/]+", it[3])
                sent = {norm_word(t) for t in re.findall(r"[A-Za-z']+", it[1])}
                miss = []
                for raw_tok in raw_list:
                    alts = [norm_word(a) for a in raw_tok.split('/') if a]
                    if not alts:
                        continue
                    first = (raw_tok == raw_list[0])
                    if not any(pre_word_ok(a, sent, first) for a in alts):
                        miss.append(raw_tok)
                if miss:
                    warns.append(('R2-P1', f"先读词 {it[3]!r} 与本句无合规关系：{miss}"))
    # ---- R4 ----
    if acts is None:
        fails.append(('R4-F1', '无 const ACTS'))
    else:
        if not acts:
            warns.append(('R4-WARN', 'ACTS 为空：该幕没排任何动作'))
        if builder == 'auto':
            # 键按 autoBuild 的匹配口径找句：键词在句中连续出现，单字按
            # 屈折口径（helps/help、sweeping/sweep 算同一词，见 token_covered）。
            # 按课查：同课各节共享同一份 ACTS（split_auto.py 原样保留），
            # 键只须在同课任一节的朗读句里出现（fam_sents）；单幕查会把
            # 属于别节的动作误判为缺口。
            sent_token_lists = fam_sents if fam_sents is not None else [
                [norm_word(t) for t in re.findall(r"[A-Za-z']+", s)]
                for s in read_sents]
            for key in acts:
                if key == '*':
                    continue
                key_words = [norm_word(t) for t in key.split()]
                hit = False
                for toks in sent_token_lists:
                    for i in range(len(toks) - len(key_words) + 1):
                        if all(token_covered(kw, {toks[i + j]})
                               for j, kw in enumerate(key_words)):
                            hit = True
                            break
                    if hit:
                        break
                if not hit:
                    fails.append(('R4-F2', f'ACTS 键 {key!r} 不在任何朗读句里'))
        m = re.search(r"""from\s+['"]\.\./sprites/([^'"]+\.js)['"]""", src)
        if m:
            status, fi = sprite_fi(m.group(1))
            if status in ('stub', 'missing'):
                unknowns.append(('R4-F3', f'精灵包 {m.group(1)} 是 {status}：帧在库与否验不了'))
            elif status == 'real':
                for key, frames in acts.items():
                    for f in frames:
                        if f not in fi:
                            fails.append(('R4-F3', f'帧 {f}（ACTS {key!r}）不在精灵包 FI 里'))
    return builder, fails, warns, unknowns, {
        's': len(s_items), 'w': len(w_items),
        'acts_keys': len(acts) if acts is not None else -1,
        'acts_frames': sum(len(v) for v in (acts or {}).values()),
        'exempted': n_exempted}


def family_sentences():
    """同课朗读句 token 表：{family_key: [[token, ...], ...]}（仅 auto 幕，
    R4-F2 按课查用；oral/poly 的 ACTS 不按句挂接，不参与）。"""
    fams = {}
    for name in sorted(os.listdir(SCENES)):
        if not name.endswith('.js') or name in LIB_ENGINE:
            continue
        p = os.path.join(SCENES, name)
        src = open(p, encoding='utf-8', errors='replace').read()
        if 'autoBuild(' not in src or 'export default' not in src:
            continue
        items = extract_items(src) or []
        sents = [[norm_word(t) for t in re.findall(r"[A-Za-z']+", it[1])]
                 for it in items if it and it[0] == 's' and len(it) > 1]
        fams.setdefault(family_key(name), []).extend(sents)
    return fams


def main():
    only = []
    json_out = None
    args = sys.argv[1:]
    while args:
        a = args.pop(0)
        if a == '--only' and args:
            only.append(args.pop(0))
        elif a == '--json' and args:
            json_out = args.pop(0)
        else:
            print(f'未知参数：{a}', file=sys.stderr)
            return 2
    rows = []
    uncovered_builders = Counter()
    n_fail_scenes = 0
    fail_count = Counter()
    warn_count = Counter()
    unknown_count = Counter()
    n_exempted = 0
    fams = family_sentences()
    for name in sorted(os.listdir(SCENES)):
        if not name.endswith('.js') or name in LIB_ENGINE:
            continue
        if only and not any(name.startswith(p) for p in only):
            continue
        builder, fails, warns, unknowns, stats = check_scene(
            os.path.join(SCENES, name), name,
            fams.get(family_key(name)))
        if builder is None:
            uncovered_builders['unparsed'] += 1
            continue
        if builder not in ('auto', 'oral', 'poly'):
            uncovered_builders[builder] += 1
            continue
        n_exempted += stats.get('exempted', 0)
        for code, msg in fails:
            rows.append({'scene': name, 'builder': builder, 'level': 'FAIL',
                         'code': code, 'msg': msg})
            fail_count[code] += 1
        for code, msg in warns:
            warn_count[code] += 1
        for code, msg in unknowns:
            unknown_count[code] += 1
        if fails:
            n_fail_scenes += 1
    for r in rows:
        print(f"FAIL {r['scene']} [{r['builder']}] {r['code']}：{r['msg']}")
    checked = sum(1 for name in sorted(os.listdir(SCENES))
                  if name.endswith('.js') and name not in LIB_ENGINE
                  and (not only or any(name.startswith(p) for p in only))) \
        - sum(uncovered_builders.values())
    print(f'v5check：覆盖 {checked} 幕（auto/oral/poly）；'
          f'FAIL {len(rows)} 项 / {n_fail_scenes} 幕；'
          f'WARN {sum(warn_count.values())} 项；UNKNOWN {sum(unknown_count.values())} 项；'
          f'豁免跳过（r2skip 全局 + 逐幕 R2SKIP，白板词出现次数）：{n_exempted} 处；'
          f'未覆盖（builder 非 ITEMS 约定）：{dict(uncovered_builders)}')
    for code, n in sorted(fail_count.items()):
        print(f'  FAIL {code}：{n} 项')
    if json_out:
        json.dump({'fails': rows,
                   'counts': {'fail': dict(fail_count), 'warn': dict(warn_count),
                              'unknown': dict(unknown_count),
                              'uncovered': dict(uncovered_builders),
                              'exempted': n_exempted}},
                  open(json_out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print(f'json written: {json_out}')
    return 1 if rows else 0


if __name__ == '__main__':
    sys.exit(main())
