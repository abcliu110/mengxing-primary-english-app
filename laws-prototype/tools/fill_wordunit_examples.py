#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fill_wordunit_examples.py — 学习改善·阶段 2 第五波（例词型单元配例句）。

范围（例词型单元：拼读模式页 + 词缀家族页）：
  - 拼读模式页 174：model/phonics_master.json patterns[].embedded 新增 exs
    （gen_phonics 已判项 4 携带进主文件 DATA.patterns；渲染层暂无例句位，
    本波只落数据层，呈现待接——登记于波次报告 stage2e-wordunits.md）
  - 词缀家族页 126：model/morph_data.json data.pages 新增 exs
    （gen_morph 再生主文件与 morphology-prototype 两文件；呈现待接同上）

口径：Stewart 补裁（2026-11-03 晚：例词型单元同样要配例句，例句由其成员词
机械组句）+ docs/variation-spec.md §3 gen 通道——
  - 句框 = 本脚本登记的 S2E 框组（小学常用句式，按成员词词性选框）；
  - 槽位只许本页成员词；句中其余词只许出自 FUNC 功能词表与词库
    （fill_grta_examples 引擎 token_ok 逐 token 把关，不过关整句弃用）；
  - 每页目标 10 句、至少 5 句；成员词（可组句者）不足者按实有铺满，
    逐页在产出清单中注明，不硬凑同构句；
  - 逐句 src 登记 {k:gen, f:框号, from, slots:{target:成员 id}}；
    note 孩子白话（引擎 JARGON 扫描 = 0）；
  - 分组：拼读按目标字素在词中的位置（occ 跨度：开头/中间/结尾）分组，
    词缀按词卡 parts 中本页词缀的义项分工分组（提取不出时整页一组）；
  - 原例词逐字不动：本脚本只新增 exs 字段，成员表/词表任何字段不改
    （--apply 前后由校验段断言）。

用法：
  python3 tools/fill_wordunit_examples.py          # --dry：构造+全量校验+产出清单，不写回
  python3 tools/fill_wordunit_examples.py --apply  # 写回两总表（之后跑 gen_phonics --write、
                                                   # gen_morph --write 两文件、check_all）
"""
import copy
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PM_PATH = ROOT / "model" / "phonics_master.json"
MD_PATH = ROOT / "model" / "morph_data.json"
WORK = Path.home() / "workspace" / "laws-merge-2026-11-03" / "stage2e-work"

sys.path.insert(0, str(ROOT / "tools"))
import fill_grta_examples as E  # noqa: E402  校验引擎：token/形态/note 行话/同构骨架
from fill_co_examples import derplural, IRREG_PLURAL, FUNC  # noqa: E402
from fill_grta_examples import der3sgx, dering, JARGON  # noqa: E402

fail = E.fail
JD = lambda o: json.dumps(o, ensure_ascii=False)  # noqa: E731

# ---------------------------------------------------------------- 基础数据
WB_ROWS = json.loads((ROOT / "model" / "wordbank.json").read_text(encoding="utf-8"))
WBID = {r["id"]: r for r in WB_ROWS}
WBW = {}
for r in WB_ROWS:
    WBW.setdefault(r["word"].lower(), r)
VF_ROWS = json.loads((ROOT / "model" / "verb_forms_completion.json").read_text(encoding="utf-8"))["rows"]
VF = {r["base"]: r for r in VF_ROWS}


def _der_er(w):
    return E._der_er(w)


def _der_est(w):
    return E._der_est(w)


# 派生表面形索引（成员词可能是词库词的派生形而非词条本身）
PLURAL_OF = {}
for w, r in WBW.items():
    if "n." in (r.get("pos_tags") or []):
        PLURAL_OF.setdefault(derplural(w), w)
for k, v in IRREG_PLURAL.items():
    PLURAL_OF[v] = k
for _pl, _sg in {  # -f/-fe → -ves 家族（derplural 规则外，逐词登记）
        "leaves": "leaf", "lives": "life", "wives": "wife", "knives": "knife",
        "wolves": "wolf", "halves": "half", "shelves": "shelf", "thieves": "thief",
        "loaves": "loaf", "scarves": "scarf", "calves": "calf", "elves": "elf",
        "selves": "self", "teeth": "tooth", "geese": "goose", "mice": "mouse",
        "oxen": "ox"}.items():
    if _sg in WBW:
        PLURAL_OF[_pl] = _sg
PAST_OF, PP_OF, S3_OF, ING_OF = {}, {}, {}, {}
for base, r in VF.items():
    PAST_OF.setdefault(r["past"], base)
    PP_OF.setdefault(r["past_participle"], base)
    S3_OF.setdefault(der3sgx(base), base)
    ING_OF.setdefault(dering(base), base)
ER_OF, EST_OF = {}, {}
for w, r in WBW.items():
    if "adj." in (r.get("pos_tags") or []):
        ER_OF.setdefault(_der_er(w), w)
        EST_OF.setdefault(_der_est(w), w)

# ---------------------------------------------------------------- 句框登记
VSTOP_HARD = {  # 连 it 宾语框也救不了的动词：完全不组句（组句质量口径，报告登记）
    "entertain", "irritate", "surprise", "tell", "ask", "put", "invite",
    "interrogate", "refer", "attend", "intend", "undertake",
}
VT_OK = {  # 无宾语读起来残缺、但可进「{v} it」框的及物动词
    "take", "bring", "send", "catch", "leave", "lend", "borrow", "spend",
    "get", "set", "keep", "find", "lose", "visit", "show", "make", "cut",
    "hit", "need", "know", "want", "clothe", "receive", "deceive", "conceive",
    "perceive", "accept", "promise", "provide", "affect", "inject", "respect",
    "expect", "support", "collect", "subscribe", "import", "export", "express",
    "supply", "announce", "pronounce", "underline", "preheat", "predict",
    "define", "remove", "despise", "suspect", "offer", "prefer", "extend",
    "sustain", "reject", "immerse", "irrigate", "mimic", "forfeit", "employ",
    "use", "say", "misread", "misunderstand", "enable", "enrich", "simplify",
    "suggest", "describe", "discover", "include", "protect", "illuminate",
    "introduce", "prove",
}
VSTOP = VSTOP_HARD | VT_OK
MASS_NOUNS = {  # 不可数名词：不用 a/an 与桌上框，走「I like … / Look at …」
    "grass", "water", "rain", "snow", "sand", "rice", "tea", "milk", "meat",
    "paper", "wood", "money", "homework", "music", "news", "air", "bread",
    "butter", "cheese", "chalk", "dust", "fire", "gold", "hair", "ice",
    "soup", "sugar", "salt", "oil", "fun", "work", "weather", "traffic",
    "furniture", "advice", "luck", "glue", "joy",
}
SCENE_KW = ("湖", "河", "江", "海", "山", "森林", "草原", "沙漠", "岛", "瀑布",
            "田野", "公园")  # 风景名词：看/望框，不用所有格与桌上框
UNIQUE_NOUNS = {"sun", "moon", "earth", "sky", "world", "universe"}
TIME_WORDS = {  # 时间类名词专用框（It is June. / Autumn is coming.）
    "january", "february", "march", "april", "may", "june", "july", "august",
    "september", "october", "november", "december", "spring", "summer",
    "autumn", "fall", "winter", "monday", "tuesday", "wednesday", "thursday",
    "friday", "saturday", "sunday", "today", "tomorrow", "yesterday",
    "morning", "afternoon", "evening", "night", "noon", "midnight",
}
MONTH_WEEK = {"january", "february", "march", "april", "may", "june", "july",
              "august", "september", "october", "november", "december",
              "monday", "tuesday", "wednesday", "thursday", "friday",
              "saturday", "sunday"}
ABSTRACT_KW = ("政府", "国家", "社会", "制度", "学科", "科学", "历史", "文化",
               "经济", "政治", "法律", "语言", "文字", "字母", "音节", "后缀",
               "前缀", "词缀", "词根", "语法", "概念", "主义", "思想", "信息",
               "知识", "系统", "标点", "符号", "自然", "反义", "同义", "统治", "欺骗",
               "想法", "念头", "部门", "行业", "宽度", "长度", "高度", "温度",
               "速度", "角度", "程度", "深度", "动词", "名词", "形容词", "副词",
               "介词", "代词", "连词", "单词", "词语")
PERSON_KW = ("师", "员", "医生", "警察", "农民", "工人", "司机", "歌手",
             "演员", "作者", "运动员", "科学家", "画家", "作家", "者", "家")
FEM_KW = ("女", "母亲", "妈妈", "姐", "妹", "奶奶", "祖母", "外祖母", "姥姥",
          "夫人", "女士", "姑娘", "女王", "王后", "公主", "妻子", "新娘", "阿姨")
MASC_KW = ("男", "父亲", "爸爸", "哥", "弟", "爷爷", "祖父", "外祖父", "姥爷",
           "先生", "国王", "王子", "丈夫", "新郎")
CARDINALS = {"two", "three", "four", "five", "six", "seven", "eight", "nine",
             "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
             "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "thirty",
             "forty", "fifty", "sixty", "seventy", "eighty", "ninety",
             "hundred", "thousand", "million", "billion", "zero"}
VAUX = {"be", "have", "do", "can", "could", "may", "might", "must", "will",
        "would", "shall", "should", "ought"}
INTR = {  # 过去式无宾语框（I {past} yesterday.）放行的不及物常用动词
    "go", "come", "run", "swim", "sing", "sleep", "sit", "stand", "fall",
    "fly", "walk", "jump", "cry", "laugh", "play", "arrive", "happen", "smile",
    "fight", "work", "talk", "listen", "wait", "dream", "travel", "grow",
    "die", "stay", "appear", "disappear", "return", "climb", "dance", "shout",
    "knock", "cough", "sneeze", "rest", "exercise", "practice", "hurry",
    "relax", "bathe", "boil", "melt", "freeze",
}
PP_SKIP = {"be", "have", "do", "go", "come", "become"}
SPATIAL_PREP = {"in", "on", "under", "behind", "near", "beside", "over", "above", "below"}
FREQ_ADV = {"always", "usually", "often", "sometimes", "never"}
MANNER_ADV_EXTRA = {"fast", "well", "hard"}

SUBJ_BE = {"i": "am", "you": "are", "he": "is", "she": "is", "it": "is",
           "we": "are", "they": "are"}
REFL_SUBJ = {"myself": "I", "yourself": "You", "himself": "He", "herself": "She",
             "itself": "It", "ourselves": "We", "yourselves": "You",
             "themselves": "They"}
FIXED = {  # 功能词/疑问词的整句登记框（句面固定，目标词必在句中）
    "what": "What is this?", "who": "Who is she?", "where": "Where is the cat?",
    "whose": "Whose book is this?", "which": "Which book do you like?",
    "when": "When do you play?", "why": "Why do you run?", "how": "How are you?",
    "how many": "How many cats do you see?", "how much": "How much water do you drink?",
    "how old": "How old are you?", "how tall": "How tall is Tom?",
    "how heavy": "How heavy is the box?",
    "the": "The cat is happy.", "a": "I have a book.", "an": "I see an apple.",
    "of": "I drink a cup of water.", "to": "I want to play.",
    "and": "Tom and Sam play.", "at": "Look at the cat!",
    "for": "This is for you.", "with": "I play with Tom.",
    "from": "I am from China.", "by": "I go to school by bus.",
    "but": "I am small, but I can run.", "because": "I run because I am happy.",
    "am": "I am happy.", "is": "It is cold.", "are": "We are happy.",
    "was": "I was happy yesterday.", "were": "We were happy yesterday.",
    "be": "I can be good.",
    "can": "I can swim.", "will": "I will play.", "must": "I must go.",
    "may": "May I go?", "could": "I could swim.", "would": "I would play.",
    "should": "I should go.", "do": "Do you play?", "does": "Does Tom play?",
    "did": "Did you play?",
    "this": "This is my book.", "that": "That is my book.",
    "said": "Tom said it yesterday.", "again": "Please read it again.",
    "one": "I have one book.",
    "these": "These are my books.", "those": "Those are my books.",
    "some": "I have some books.", "any": "Do you have any books?",
    "every": "I play every day.", "each": "Each book is good.",
    "all": "All my books are here.",
}
CHIP_VOCAB = {"desk", "school", "cat", "dog", "box", "book", "happy", "cold",
              "water", "park", "girl", "boy", "apple", "cup", "bus"}


def article(word, phonetic):
    """a/an 由登记音标首音素机械判定（/j/、/w/ 起头读 a，元音起头读 an）。"""
    ph = (phonetic or "").strip("/").lstrip("ˈˌ")
    if not ph:
        return "a"
    c = ph[0]
    if c in "jw":
        return "a"
    if c in "aæeɪɒʌɑɔɜə":
        return "an"
    return "a"


def resolve_combined(w):
    """组合条目（如「we / us / our / ours」）中单个词形的词库行。"""
    for r in WB_ROWS:
        if " / " in r["word"] and w in [p.strip().lower() for p in r["word"].split("/")]:
            return r
    return None


def tokens_ok(s):
    """全句 token 过引擎词表（返回不过关 token 列表，空 = 全过）。"""
    bad = []
    for tok in re.findall(r"[A-Za-z']+", s):
        if tok.lower() in E.PROPER:
            continue
        if not E.token_ok(tok):
            bad.append(tok)
    return bad


# ---------------------------------------------------------------- 候选与选框
class Cand:
    __slots__ = ("word", "mid", "row", "chip", "kind", "base", "freq", "grp_key", "_parts", "_abstract")

    def __init__(self, word, mid, row, chip):
        self.word = word          # 表面形（成员词本身）
        self.mid = mid            # 成员 id（拼读=bank_key，词缀=词 id）
        self.row = row            # 词库行（派生形时为基词行，可为 None）
        self.chip = chip          # {"w","p","m"} 逐字取登记卡面
        self.kind = None          # head/plural/past/pp/s3/ing/comp/est/fixed/poss
        self.base = None
        self.freq = (row or {}).get("freq_rank") or 9999
        self.grp_key = None       # classify() 返回的框组名
        self._parts = ""          # 词缀页：词卡 parts（义项分组用）
        self._abstract = False    # 抽象/状态名词标记（词缀义项或词尾 -ness 推断）


def classify(c):
    """给候选定形类与可用框组。返回框组名或 None（不可组句）。"""
    w = c.word.lower()
    if w in FIXED:
        if w == "may" and "五月" in c.chip["m"].split("；")[0]:
            c.kind = "head"  # 本页取「五月」义：不走情态固定句，改走时间名词框
            return "time_noun"
        c.kind = "fixed"
        return "fixed"
    row = c.row
    if row is not None and row.get("verb_form_of"):
        base = row["verb_form_of"]
        vfr = VF.get(base)
        if vfr:
            if w == vfr["past"]:
                c.kind, c.base = "past", base
                return "past" if base in INTR else None
            if w == vfr["past_participle"]:
                c.kind, c.base = "pp", base
                return "pp" if base not in PP_SKIP else None
            if w == der3sgx(base):
                c.kind, c.base = "s3", base
                return "s3"
            if w == dering(base):
                c.kind, c.base = "ing", base
                return "ing"
            return None
        # 五形式表未立条：以词库 verb_form_of 登记为准辨形（派生可辨者先行，
        # 其余默认过去式——该家族 past/pp 多同形，FPA 框对两者都成立）
        if w == der3sgx(base):
            c.kind, c.base = "s3", base
            return "s3"
        if w == dering(base):
            c.kind, c.base = "ing", base
            return "ing"
        c.kind, c.base = "past", base
        return "past" if base in INTR else None
    if row is None:
        # 派生表面形（非词条本身）
        if w in PLURAL_OF:
            c.kind, c.base = "plural", PLURAL_OF[w]
            c.row = WBW[c.base]
            return "plural"
        if w in PAST_OF:
            c.kind, c.base = "past", PAST_OF[w]
            c.row = WBW.get(c.base)
            return "past" if c.base in INTR else None
        if w in PP_OF:
            c.kind, c.base = "pp", PP_OF[w]
            c.row = WBW.get(c.base)
            return "pp" if c.base not in PP_SKIP else None
        if w in S3_OF:
            c.kind, c.base = "s3", S3_OF[w]
            c.row = WBW.get(c.base)
            return "s3"
        if w in ING_OF:
            c.kind, c.base = "ing", ING_OF[w]
            c.row = WBW.get(c.base)
            return "ing"
        if w in ER_OF:
            c.kind, c.base = "comp", ER_OF[w]
            c.row = WBW[c.base]
            return "comp"
        if w in EST_OF:
            c.kind, c.base = "est", EST_OF[w]
            c.row = WBW[c.base]
            return "est"
        return None
    # 词条本身即派生形（复数/比较级/最高级立条者）：先按派生形归类
    if w in PLURAL_OF and PLURAL_OF[w] != w:
        c.kind, c.base = "plural", PLURAL_OF[w]
        return "plural"
    if (row.get("pos_tags") or [""])[0] == "v." and w in PAST_OF and PAST_OF[w] != w:
        c.kind, c.base = "past", PAST_OF[w]  # 如 sought：立条的过去式，按过去式框走
        return "past" if c.base in INTR else None
    if w in ER_OF and ER_OF[w] != w:
        c.kind, c.base = "comp", ER_OF[w]
        return "comp"
    if w in EST_OF and EST_OF[w] != w:
        c.kind, c.base = "est", EST_OF[w]
        return "est"
    # 立条词形（verb_form_of 未标、但释义写明「X 的过去式/过去分词」者，如 sought）：
    # 仅动词首词性者按词形框走（名词首义者如 thought「想法」仍走名词框）
    if (row.get("pos_tags") or [""])[0] == "v.":
        _note_blob = (row.get("meaning") or "") + (row.get("morph_note") or "")
        _mp = re.search(r"([a-z]+)\s*的过去式", _note_blob)
        if _mp:
            c.kind, c.base = "past", _mp.group(1)
            return "past" if c.base in INTR else None
        _mpp = re.search(r"([a-z]+)\s*的过去分词", _note_blob)
        if _mpp:
            c.kind, c.base = "pp", _mpp.group(1)
            return "pp" if c.base not in PP_SKIP else None
    # 词条本身：按首要词性选框
    tags = row.get("pos_tags") or []
    tag = tags[0] if tags else ""
    if re.fullmatch(r"[a-z]+'s", w):
        c.kind = "poss"
        return "poss"
    if tag == "n.":
        c.kind = "head"
        if w in TIME_WORDS:
            return "time_noun"
        return "noun"
    if tag == "v.":
        if w in VAUX or w in VSTOP_HARD:
            return None
        c.kind = "head"
        if w in VT_OK:
            return "verb_it"
        return "verb"
    if tag == "adj.":
        c.kind = "head"
        return "adj"
    if tag == "adv.":
        c.kind = "head"
        if w.endswith("ly") or w in MANNER_ADV_EXTRA:
            return "adv_manner"
        if w in FREQ_ADV:
            return "adv_freq"
        return None
    if tag == "num.":
        c.kind = "head"
        return "num" if w in CARDINALS else None
    if tag == "pron.":
        c.kind = "head"
        if w in SUBJ_BE:
            return "pron_subj"
        if w in ("me", "him", "her", "us", "them"):
            return "pron_obj"
        if w in ("my", "your", "his", "its", "our", "their"):
            return "pron_padj"
        if w in ("mine", "yours", "hers", "ours", "theirs"):
            return "pron_ppron"
        if w in REFL_SUBJ:
            return "pron_refl"
        return None
    if tag == "prep.":
        c.kind = "head"
        return "prep" if w in SPATIAL_PREP else None
    return None


NOUN_FRAMES = [
    ("FN1", lambda c: f"This is my {c.word}."),
    ("FN2", lambda c: f"I have {article(c.word, c.chip['p'])} {c.word}."),
    ("FN3", lambda c: f"Look at the {c.word}!"),
    ("FN4", lambda c: f"The {c.word} is on the desk."),
]
VERB_FRAMES = [
    ("FV1", lambda c: f"I {c.word} every day."),
    ("FV2", lambda c: f"We {c.word} at school."),
    ("FV4", lambda c: f"I can {c.word}."),
]
ADJ_PERSON = [
    ("FA1", lambda c: f"I am {c.word}."),
    ("FA2", lambda c: f"She is {c.word}."),
    ("FA3", lambda c: f"He is {c.word}."),
]
ADJ_THING = [
    ("FA4", lambda c: f"It is {c.word}."),
    ("FA5", lambda c: f"The dog is {c.word}."),
]


def is_abstract(c):
    w, mean = c.word, c.chip["m"]
    return (c._abstract or len(w) >= 10 or w.lower().endswith("ness")
            or any(k in mean for k in ABSTRACT_KW))


def noun_sentence(c, idx):
    """名词选框（语义护栏）：性别人物词走 She/He is a … 框；抽象/术语/状态词
    走「认识这个词」框；人物名词不用 have 框；「在桌子上」框只给短小常用词；
    其余四框轮转。"""
    w, mean = c.word, c.chip["m"]
    art = article(w, c.chip["p"])
    if any(k in mean for k in FEM_KW):
        return f"She is {art} {w}.", "FPERF", None
    if any(k in mean for k in MASC_KW):
        return f"He is {art} {w}.", "FPERM", None
    if is_abstract(c):
        fid, s = [("FN9", f"I know the word {w}."),
                  ("FN10", f"Say {w} with me.")][idx % 2]
        return s, fid, None
    if w.lower() in MASS_NOUNS:
        fid, s = [("FM1", f"I like {w}."), ("FN3", f"Look at the {w}!")][idx % 2]
        return s, fid, None
    if w.lower() in ING_OF and w.lower().endswith("ing") \
            and not any(k in mean for k in ("建筑", "大楼")):
        fid, s = [("FG1", f"I like {w}."), ("FG2", f"I am good at {w}.")][idx % 2]
        return s, fid, None  # 动名词活动词（skiing/reading…）：喜欢/擅长框
    if w.lower() in UNIQUE_NOUNS:
        return f"Look at the {w}!", "FN3", None
    if any(k in mean for k in SCENE_KW):
        fid, s = [("FSCE", f"I see {art} {w}."), ("FN3", f"Look at the {w}!")][idx % 2]
        return s, fid, None
    frames = [("FN1", f"This is my {w}."),
              ("FN2", f"I have {art} {w}."),
              ("FN3", f"Look at the {w}!"),
              ("FN4", f"The {w} is on the desk.")]
    if any(k in mean for k in PERSON_KW):
        frames = [f for f in frames if f[0] not in ("FN2", "FN4")]
    if len(w) > 8 or c.freq > 1000:
        frames = [f for f in frames if f[0] != "FN4"] or frames[:1]
    fid, s = frames[idx % len(frames)]
    return s, fid, None


def build_sentence(c, group, idx):
    """按形类组句。返回 (句, 框号, 动词声明 or None)；不可组句返回 None。"""
    w = c.word
    if group == "fixed":
        return FIXED[w.lower()], "FX", None
    if group == "noun":
        return noun_sentence(c, idx)
    if group == "time_noun":
        cap = w.capitalize() if w in MONTH_WEEK else w
        fid, s = [("FT1", f"It is {cap}."), ("FT2", f"{w.capitalize()} is coming.")][idx % 2]
        return s, fid, None
    if group == "plural":
        fid, s = [("FPL1", f"I like {w}."), ("FPL2", f"Look at the {w}!")][idx % 2]
        return s, fid, None
    if group == "verb_it":
        fid, s = [("VT1", f"I can {w} it."),
                  ("VT2", f"I {w} it every day."),
                  ("VT3", f"Tom {der3sgx(w.lower())} it every day.")][idx % 3]
        vdecl = (w.lower(), "3sg", der3sgx(w.lower())) if fid == "VT3" else None
        return s, fid, vdecl
    if group == "verb":
        if idx % 4 == 3:  # 每 4 句轮一次三单框（形态经引擎核对）
            return f"Tom {der3sgx(w.lower())} every day.", "FV3", (w.lower(), "3sg", der3sgx(w.lower()))
        fid, fn = VERB_FRAMES[idx % len(VERB_FRAMES)]
        return fn(c), fid, None
    if group == "adj":
        theme = (c.row.get("theme_macro") or "") + (c.row.get("theme_sub") or "")
        frames = ADJ_PERSON if "情感" in theme else ADJ_THING
        fid, fn = frames[idx % len(frames)]
        return fn(c), fid, None
    if group == "adv_manner":
        fid, s = [("FD1", f"He runs {w}."), ("FD2", f"She sings {w}.")][idx % 2]
        return s, fid, None
    if group == "adv_freq":
        fid, s = [("FD3", f"We {w} play."), ("FD4", f"I {w} sing.")][idx % 2]
        return s, fid, None
    if group == "num":
        return f"I have {w} books.", "FNUM", None
    if group == "pron_subj":
        return f"{w.capitalize()} {SUBJ_BE[w.lower()]} happy.", "FPR1", None
    if group == "pron_obj":
        return f"I like {w}.", "FPR2", None
    if group == "pron_padj":
        return f"This is {w} book.", "FPR3", None
    if group == "pron_ppron":
        return f"The book is {w}.", "FPR4", None
    if group == "pron_refl":
        return f"{REFL_SUBJ[w.lower()]} did it by {w}.", "FPR5", None
    if group == "prep":
        return f"The cat is {w} the box.", "FPREP", None
    if group == "poss":
        return f"This is {w} book.", "FPOSS", None
    if group == "past":
        fid, s = [("FPA1", f"I {w} yesterday."), ("FPA2", f"Tom {w} yesterday.")][idx % 2]
        return s, fid, (c.base, "past", w.lower())
    if group == "pp":
        return f"I have {w} it.", "FPP", (c.base, "pp", w.lower())
    if group == "s3":
        return f"Tom {w} every day.", "FS3", (c.base, "3sg", w.lower())
    if group == "ing":
        fid, s = [("FING1", f"I am {w}."), ("FING2", f"She is {w} now.")][idx % 2]
        return s, fid, (c.base, "ing", w.lower())
    if group == "comp":
        fid, s = [("FC1", f"Tom is {w} than Sam."),
                  ("FC2", f"The dog is {w} than the cat.")][idx % 2]
        return s, fid, None
    if group == "est":
        fid, s = [("FS1", f"He is the {w} boy."), ("FS2", f"She is the {w} girl.")][idx % 2]
        return s, fid, None
    return None


def chips_for(c, s):
    chips = [dict(c.chip)]
    seen = {c.chip["w"].lower()}
    for tok in re.findall(r"[A-Za-z']+", s):
        t = tok.lower()
        if t in CHIP_VOCAB and t not in seen and t in WBW:
            r = WBW[t]
            chips.append({"w": r["word"], "p": r["phonetic"], "m": r["meaning"]})
            seen.add(t)
    return chips


def make_item(c, s, fid, grp, note):
    return {
        "s": s,
        "note": note,
        "words": chips_for(c, s),
        "grp": grp,
        "src": {"k": "gen", "f": fid, "from": "例词型单元：成员词机械组句（阶段2第五波）",
                "slots": {"target": c.mid}},
    }


def assemble(pairs, note_fn, maxn=10):
    """pairs: [(Cand, 分组名)] 已按选取序排好；逐个组句，返回 (items, used)。"""
    items, used = [], []
    idx = 0
    for c, grp in pairs:
        if len(items) >= maxn:
            break
        built = build_sentence(c, c.grp_key, idx)
        if built is None:
            continue
        s, fid, vdecl = built
        if tokens_ok(s):  # 有词表外 token：整句弃用（缺口在 dry 清单中登记）
            continue
        if not re.search(r"\b" + re.escape(c.word) + r"\b", s, re.I):
            continue
        if vdecl:
            lemma, cls, surf = vdecl
            row = VF.get(lemma)
            if row is not None:  # 五形式表未立条者以词库 verb_form_of 登记为准，不复核
                expect = {"past": row["past"], "pp": row["past_participle"],
                          "3sg": der3sgx(lemma), "ing": dering(lemma)}[cls]
                if expect != surf:
                    continue
        if any(it["s"] == s for it in items):
            continue
        items.append(make_item(c, s, fid, grp, note_fn(c, grp)))
        used.append(c)
        idx += 1
    return items, used


# ---------------------------------------------------------------- 拼读模式页
def phonics_note(g, ph):
    def fn(c, grp):
        w = c.word
        if grp.endswith("在开头"):
            return f"{w} 开头的 {g} 读 {ph}，在句子里把这个音读出来。"
        if grp.endswith("在结尾"):
            return f"{w} 结尾的 {g} 读 {ph}，读到词尾也要读清楚。"
        if grp.endswith("在中间"):
            return f"{w} 中间的 {g} 读 {ph}，慢慢读，别漏掉这个音。"
        return f"{w} 里的 {g} 读 {ph}，在句子里读一读。"
    return fn


def build_phonics(pm):
    bank = {}
    for _w, crec in pm["cards"].items():
        for card in crec["cards"]:
            snap = card["snapshot"]
            bank[card["bank_key"]] = {"w": snap["word"], "p": snap["phonetic"], "m": snap["meaning"]}
    out = {}          # pid -> exs
    stats = {"pages": 0, "sent": 0, "low": [], "empty": [], "unframeable": []}
    for rec in pm["patterns"]:
        pid = rec["id"]
        emb = rec["embedded"]
        if "exs" in emb:
            fail(f"{pid}: embedded 已带 exs（疑似已执行过）——拒绝重复填充")
        g, ph = emb["g"], emb["ph"]
        occ = rec["wordsets"].get("occ") or {}
        seen, cands = set(), []
        for mid in rec["members"]:
            snap = bank[mid]
            w = snap["w"]
            if w.lower() in seen:
                continue
            seen.add(w.lower())
            if " " in w and w.lower() not in FIXED:
                stats["unframeable"].append((pid, w, "短语成员（非固定框短语）"))
                continue
            if not re.fullmatch(r"[A-Za-z]+('[a-z])?", w) and w.lower() not in FIXED:
                stats["unframeable"].append((pid, w, "含非字母字符"))
                continue
            row = WBW.get(w.lower()) or resolve_combined(w.lower())
            c = Cand(w, mid, row, dict(snap))
            grp_key = classify(c)
            if grp_key is None:
                stats["unframeable"].append((pid, w, "词性/形类无可用框"))
                continue
            c.grp_key = grp_key
            cands.append(c)
        cands.sort(key=lambda c: (c.freq, len(c.word), c.word.lower()))
        # 分组：目标字素在词中的位置（occ 首跨度）
        def pos_grp(c):
            spans = occ.get(c.mid)
            if not spans:
                return f"读 {g}（{ph}）"
            s0, s1 = spans[0]
            if s0 == 0 and s1 < len(c.word):
                return f"{g} 在开头"
            if s1 >= len(c.word) and s0 > 0:
                return f"{g} 在结尾"
            return f"{g} 在中间"
        pairs = [(c, pos_grp(c)) for c in cands]
        items, used = assemble(pairs, phonics_note(g, ph))
        # 一句话读两个（成员名词 ≥2 且未满 10 句时补 1 句进阶）
        nouns = [c for c in used if c.grp_key == "noun" and not is_abstract(c)]
        if 2 <= len(cands) and len(items) < 10 and len(nouns) >= 2:
            n1, n2 = nouns[0], nouns[1]
            s = (f"I see {article(n1.word, n1.chip['p'])} {n1.word} and "
                 f"{article(n2.word, n2.chip['p'])} {n2.word}.")
            if not tokens_ok(s) and not any(it["s"] == s for it in items):
                items.append({
                    "s": s,
                    "note": f"一句话里有两个今天的词：{n1.word} 和 {n2.word}，都把 {g} 读成 {ph}。",
                    "words": [dict(n1.chip), dict(n2.chip)],
                    "grp": "一句话里读两个",
                    "src": {"k": "gen", "f": "FCB", "from": "例词型单元：成员词机械组句（阶段2第五波）",
                            "slots": {"target": n1.mid, "target2": n2.mid}},
                })
        stats["pages"] += 1
        stats["sent"] += len(items)
        if not items:
            stats["empty"].append((pid, len(rec["members"])))
        elif len(items) < 5:
            stats["low"].append((pid, len(rec["members"]), len(items)))
        if items:
            out[pid] = items
    return out, stats


# ---------------------------------------------------------------- 词缀家族页
def affix_gloss(label, parts):
    """从词卡 parts 中提取本页词缀在该词上的义项（如 un- → 不/相反）。"""
    core = label.split("（")[0].split("「")[0].strip().strip("-")
    if not core or not parts:
        return None
    for seg in parts.split("＋"):
        seg = seg.strip()
        if not seg:
            continue
        head = seg.split(" ")[0].strip()
        if head in (core, core + "-", "-" + core):
            gloss = seg[len(head):].strip()
            gloss = re.sub(r"（.*?）", "", gloss).strip(" ·")
            return gloss or None
    return None


GROUP_FALLBACK = {
    "whole": "整个词放进句子里读",
    "gallery": "整个词放进句子里读",
    "inflection": "换上这个小尾巴，放进句子里读",
    "compound": "两个词拼成一个，放进句子里读",
}


def build_morph(md):
    words = md["data"]["words"]
    pages = md["data"]["pages"]
    out, stats = {}, {"pages": 0, "sent": 0, "low": [], "empty": [], "unframeable": []}
    for pid, p in pages.items():
        if "exs" in p:
            fail(f"{pid}: pages 已带 exs（疑似已执行过）——拒绝重复填充")
        label = p.get("label") or pid
        ids = list(p.get("words") or [])
        for s in (p.get("sections") or []):
            ids += list(s["words"])
        for gsec in (p.get("kin") or []):
            ids += list(gsec["words"])
        from_pending = False
        if not ids and p.get("pending"):
            ids = [it["bank_id"] for it in p["pending"]]
            from_pending = True
        seen, cands = set(), []
        for wid in ids:
            wrec = words.get(wid)
            if wrec is None:
                stats["unframeable"].append((pid, wid, "词 id 不在词缀词表"))
                continue
            w = wrec["w"]
            if w.lower() in seen:
                continue
            seen.add(w.lower())
            if not re.fullmatch(r"[A-Za-z]+('[a-z])?", w) and w.lower() not in FIXED:
                stats["unframeable"].append((pid, w, "含非字母/空格字符"))
                continue
            row = WBID.get(wid) or WBW.get(w.lower())
            chip = {"w": w, "p": wrec.get("gb") or "", "m": wrec.get("mean") or ""}
            c = Cand(w, wid, row, chip)
            grp_key = classify(c)
            if grp_key is None:
                stats["unframeable"].append((pid, w, "词性/形类无可用框"))
                continue
            c.grp_key = grp_key
            c._parts = wrec.get("parts") or ""
            cands.append(c)
        cands.sort(key=lambda c: (c.freq, len(c.word), c.word.lower()))
        # 分组：词缀义项分工（≥2 个不同义项才分组，否则整页一组）
        glosses = {}
        for c in cands:
            glosses[id(c)] = affix_gloss(label, getattr(c, "_parts", ""))
            if glosses[id(c)] and any(k in glosses[id(c)] for k in ("状态", "性质", "感觉")):
                c._abstract = True
        distinct = {g for g in glosses.values() if g}
        if from_pending:
            grp_of = lambda c: "整个词放进句子里读"  # noqa: E731
        elif len(distinct) >= 2:
            grp_of = lambda c: (f"{label} 表示「{glosses[id(c)]}」" if glosses[id(c)]  # noqa: E731
                                else f"把 {label} 的词放进句子里读")
        else:
            fb = GROUP_FALLBACK.get(p.get("group")) or f"把 {label} 的词放进句子里读"
            grp_of = lambda c, fb=fb: fb  # noqa: E731

        def note_fn(c, grp, label=label):
            gl = glosses[id(c)]
            mean1 = re.split(r"[；,，]", c.chip["m"])[0]
            if gl:
                return f"{c.word} 里的 {label} 是「{gl}」的意思（{c.word}：{mean1}），在句子里用一用。"
            return f"{c.word} 是「{mean1}」，放进句子里读一读。"

        pairs = [(c, grp_of(c)) for c in cands]
        items, used = assemble(pairs, note_fn)
        stats["pages"] += 1
        stats["sent"] += len(items)
        if not items:
            stats["empty"].append((pid, len(ids)))
        elif len(items) < 5:
            stats["low"].append((pid, len(ids), len(items)))
        if items:
            out[pid] = items
    return out, stats


# ---------------------------------------------------------------- 主流程
def validate_all(ph_out, md_out):
    """全量校验：note 行话 0、句面页内不重复、同构骨架页内不重复、目标词在句中。"""
    total = 0
    for scope, out in (("phonics", ph_out), ("morph", md_out)):
        for pid, items in out.items():
            skels = set()
            for it in items:
                total += 1
                E.check_note(f"{scope}:{pid}", it["note"])
                if JARGON.search(it["grp"]):
                    fail(f"{scope}:{pid}: 分组名含生产腔：{it['grp']}")
                sk = E.skeleton(it["s"])
                if sk in skels:
                    fail(f"{scope}:{pid}: 同构句重复：{it['s']}")
                skels.add(sk)
    return total


def main():
    apply = "--apply" in sys.argv
    pm = json.loads(PM_PATH.read_text(encoding="utf-8"))
    md = json.loads(MD_PATH.read_text(encoding="utf-8"))
    pm_before = copy.deepcopy(pm)
    md_before = copy.deepcopy(md)

    ph_out, ph_stats = build_phonics(pm)
    md_out, md_stats = build_morph(md)
    total = validate_all(ph_out, md_out)

    print(f"拼读模式页：{ph_stats['pages']} 页，产出 {len(ph_out)} 页 / {ph_stats['sent']} 句")
    print(f"词缀家族页：{md_stats['pages']} 页，产出 {len(md_out)} 页 / {md_stats['sent']} 句")
    print(f"合计例句 {total} 句，全量校验通过（note 行话 0 / 同构不重复）")
    print(f"拼读 <5 句页 {len(ph_stats['low'])}、空页 {len(ph_stats['empty'])}；"
          f"词缀 <5 句页 {len(md_stats['low'])}、空页 {len(md_stats['empty'])}")
    WORK.mkdir(parents=True, exist_ok=True)
    (WORK / "dry-summary.json").write_text(json.dumps({
        "phonics": {"stats": {k: v for k, v in ph_stats.items()},
                    "counts": {k: len(v) for k, v in ph_out.items()}},
        "morph": {"stats": {k: v for k, v in md_stats.items()},
                  "counts": {k: len(v) for k, v in md_out.items()}},
    }, ensure_ascii=False, indent=1), encoding="utf-8")
    (WORK / "ph-exs.json").write_text(JD(ph_out), encoding="utf-8")
    (WORK / "md-exs.json").write_text(JD(md_out), encoding="utf-8")

    if not apply:
        print("（--dry：未写回）")
        return
    by_pid = {p["id"]: p for p in pm["patterns"]}
    for pid, items in ph_out.items():
        by_pid[pid]["embedded"]["exs"] = items
    for pid, items in md_out.items():
        md["data"]["pages"][pid]["exs"] = items
    # 原例词逐字保留断言：除新增 exs 外两总表深比全等
    pm_chk = copy.deepcopy(pm)
    md_chk = copy.deepcopy(md)
    for p in pm_chk["patterns"]:
        p["embedded"].pop("exs", None)
    for p in md_chk["data"]["pages"].values():
        p.pop("exs", None)
    if pm_chk != pm_before:
        fail("phonics_master 除 exs 外有变化——停工")
    if md_chk != md_before:
        fail("morph_data 除 exs 外有变化——停工")
    PM_PATH.write_text(json.dumps(pm, ensure_ascii=False, indent=1), encoding="utf-8")
    MD_PATH.write_text(json.dumps(md, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    print("已写回 phonics_master.json / morph_data.json（除 exs 外零变化断言通过）")


if __name__ == "__main__":
    main()
