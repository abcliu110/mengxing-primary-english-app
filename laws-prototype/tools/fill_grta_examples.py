#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fill_grta_examples.py — 学习改善·阶段 2 首波：GR/TA 家族例句全量（变式表规格落地）。

执行口径：laws-prototype/docs/variation-spec.md（每律先定变式表；例句 ≥10 或小律铺满注明；
分组呈现且组名说破在变什么；每律 ≥1 边界组；来源三通道逐句登记 src；note 只许孩子白话；
仅换人名/地名的同构句计 1 例）。

落位：
  GR-01…GR-45 —— LAW 通路：事实源 = model/laws_master.json 的 lawdata 分仓 exs。
    写回后须跑 tools/gen_laws.py --write 同值落主文件 LAWDATA 镜像（gen_laws 对非双户口
    条目以总表 lawdata + 派生 rel/exc 生成 LAWDATA 并逐项断言，见 gen_laws.build_lawdata）。
    GR-46…GR-50 渲染走连词区（CJ）不走 LAW 通路，本脚本不处理，波次报告登记。
  TA-01…TA-18 —— yaml 通路：上游源 model/laws/grammar_ext.yaml 的 examples 块与总表
    yaml 分仓同值改写（check_upstream 链 a 把关）；显示镜像 = 主文件动词/时态模块内嵌
    DATA.TA[*].ex（未生成化内嵌源，沿其既有维护方式由本脚本同值写入 {s, n, g}，
    渲染器只读 s/n，g 为数据层分组，TN/VB 渲染不呈现分组标题——报告登记）。
    TA-18 为证据评议型小律：按实有维度铺满 6 例（报告注明）。

例句来源（零自由编造，三通道，逐句登记 src，与 CO 试点同口径）：
  orig —— 原登记例逐字保留，只加 grp 与 src 标记（GR 侧 s/note/words 不动；TA 侧
          sentence/scene_note/supports/word_ids 不动）。
  own  —— 该律自有材料复用（病例 right 句、练习/机制登记句）；脚本断言逐字命中该律
          自有材料 blob（GR：总表条目全文；TA：yaml 条目 + ta_exercises 对应单元）。
  gen  —— 机械组句：句框取自该律登记例句或 App 登记材料（src.from 注明），槽位词只许
          出自 wordbank 与 verb_forms_completion；动词形态逐句校验（复用 CO 派生规则）。

校验（任一失败即停，不写回）：
  - orig 与现行数据逐字一致（GR 比 s/note/words；TA 比 sentence/scene_note/word_ids）；
  - own 逐字命中自有材料；gen 逐 token 过词表 + 动词形态一致 + chips 锚词逐字取词库；
  - 每律句面不重复、不与病例 wrong 撞面；同构（人名/地名占位）合并后有效例数达标；
  - 每例必有 note 与 grp；note/diag 行话扫描（JARGON 正则）命中即停；
  - TA：yaml 文件块替换后 yaml 分仓与上游深比一致（脚本内自检，check_upstream 复核）。

用法：
  python3 tools/fill_grta_examples.py --dry     # 只校验并打印产出
  python3 tools/fill_grta_examples.py --apply   # 校验全过后写回（之后跑 gen_laws --write + check_all）
"""
import copy
import json
import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
MASTER = ROOT / "model" / "laws_master.json"
MAIN = ROOT / "mengxing-prototype-v1.html"
GRAMMAR_EXT = ROOT / "model" / "laws" / "grammar_ext.yaml"
WORDBANK = ROOT / "model" / "wordbank.json"
VERBFORMS = ROOT / "model" / "verb_forms_completion.json"
WORDS_MASTER = ROOT / "model" / "words_master.json"
TA_EXERCISES = ROOT / "model" / "ta_exercises.json"

sys.path.insert(0, str(ROOT / "tools"))
from fill_co_examples import der3sg, dering, derplural, IRREG_PLURAL, FUNC, NAMES, DOUBLE  # noqa: E402


def der3sgx(base):
    """本地扩充：go/do 的三单是 goes/does（CO 派生规则未含 -o 家族，本波补此一家，不改 CO 工具）。"""
    if base in ("go", "do"):
        return base + "es"
    return der3sg(base)


def _der_er(w):
    if re.search(r"[^aeiou]y$", w):
        return w[:-1] + "ier"
    if w in DOUBLE:
        return w + w[-1] + "er"
    if re.search(r"[^aeiou]e$", w):
        return w + "r"
    return w + "er"


def _der_est(w):
    if re.search(r"[^aeiou]y$", w):
        return w[:-1] + "iest"
    if w in DOUBLE:
        return w + w[-1] + "est"
    if re.search(r"[^aeiou]e$", w):
        return w + "st"
    return w + "est"

JARGON = re.compile(r"登记|纲领|coreView|源：|裁定|口径|待补|命中|归一|标志性|入模|本波|逐字|对差|分仓|镜像|生成器|脚本")
PROPER = {"beijing", "london", "china", "tom", "sam", "lily"}


def fail(msg):
    print("FAIL:", msg)
    sys.exit(1)


def norm(s):
    return re.sub(r"\s+", " ", str(s)).strip().lower()


def skeleton(s):
    """同构骨架：人名/地名占位、去标点小写——仅换人名地名的句子骨架相同。"""
    toks = re.findall(r"[A-Za-z']+", s.lower())
    return " ".join("§" if t.strip("'") in PROPER or t.strip("'") in NAMES else t for t in toks)


# ---------------------------------------------------------------- 条目构造器
def O(idx, grp):
    return {"kind": "orig", "idx": idx, "grp": grp}


def OWN(s, note, grp, ref, chips, verb=None):
    return {"kind": "own", "s": s, "note": note, "grp": grp, "ref": ref, "chips": chips, "verb": verb}


def GEN(s, note, grp, frame, frm, slots, chips, verb=None):
    return {"kind": "gen", "s": s, "note": note, "grp": grp, "frame": frame, "from": frm,
            "slots": slots, "chips": chips, "verb": verb}


# ================================================================ GR SPEC
FUNCX = FUNC | {"what", "who", "whom", "whose", "which", "where", "when", "why", "how",
                "one", "can't", "don't", "doesn't", "didn't", "isn't", "aren't", "wasn't",
                "weren't", "won't", "mustn't", "cannot", "nobody",
                "before", "after", "since", "ever", "never", "already", "yet", "last",
                "ago", "suddenly", "first", "out", "up", "down", "back"}
SPEC_GR = {}

# ---- GR-01 形式跟着功能走：小尾巴在说话（可变=尾巴种类；不变=尾巴必传消息；边界=不戴尾巴时意思不同）
_A, _B, _C, _D = "小尾巴说「不止一个」", "小尾巴说「他/她做、已经过去」", "换一个尾巴，换一条消息", "边界：不戴尾巴，消息就不一样"
SPEC_GR["GR-01"] = [
    O(0, _A), O(3, _A), O(1, _B), O(2, _B),
    GEN("The cat drinks milk.", "drinks 的 -s 在说：喝奶的是它（一个）", _C, "3sg-s", "GR-01 exs[2] 句框", {"verb": "drink", "obj": "milk"}, ["drink", "milk"], ("drink", "3sg", "drinks")),
    GEN("We walked home yesterday.", "walked 的 -ed 在说：这事已经过去了", _C, "past-ed", "GR-01 exs[1] 句框", {"verb": "walk"}, ["walk", "home"], ("walk", "past", "walked")),
    GEN("Two birds are in the tree.", "birds 的 -s 在说：不止一只鸟", _C, "plural-s", "GR-01 exs[0] 句框", {"noun": "bird", "place": "tree"}, ["bird", "tree"]),
    GEN("She washes her hands.", "washes 的 -es 也在值班：洗手的是她", _C, "3sg-es", "GR-01 exs[2] 句框", {"verb": "wash", "obj": "hand"}, ["wash", "hand"], ("wash", "3sg", "washes")),
    GEN("One dog is under the tree.", "只有一个时，dog 就不戴 -s——戴不戴，消息不同", _D, "singular-bare", "GR-01 exs[0] 对照框", {"noun": "dog", "place": "tree"}, ["dog", "tree"]),
    GEN("I play football every day.", "I 后面的 play 光着身子：-s 只给 he/she/it 戴", _D, "bare-after-I", "GR-01 exs[1] 对照框", {"verb": "play", "obj": "football"}, ["play", "football"], ("play", "base", "play")),
]

# ---- GR-02 箭头只落一次（可变=站岗的帮手/句式；不变=标记只落一次；边界=没帮手时箭头落回动词）
_A, _B, _C, _D = "did / does 站岗，动词用原形", "帮手扛否定", "边界：没有帮手，箭头落回动词身上", "do 强调：我确实是"
SPEC_GR["GR-02"] = [
    O(0, _A), O(2, _A), O(1, _B), O(3, _D),
    OWN("He doesn't play games.", "和 exs 里 doesn't like 一样：doesn't 扛住了，play 用原形", _B, "lawdata cases[0].right", ["play", "game"]),
    OWN("What does my father look like?", "问题更长也一样：does 站岗，look 用原形", _A, "lawdata cases[1].right", ["father"]),
    GEN("Did she watch TV last night?", "问过去的事：did 扛过去时，watch 用原形", _A, "did-q", "GR-02 exs[0] 句框", {"verb": "watch"}, ["watch"], ("watch", "base", "watch")),
    GEN("Does your mother cook dinner?", "问第三个人：does 站岗，cook 用原形", _A, "does-q", "GR-02 exs[2] 句框", {"verb": "cook", "subj": "mother"}, ["mother", "cook"], ("cook", "base", "cook")),
    GEN("He doesn't read books.", "doesn't 后面，read 不许戴 -s", _B, "doesnt", "GR-02 exs[1] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "base", "read")),
    GEN("She went to school yesterday.", "没有 did 的时候，went 自己就是那支箭头", _C, "no-helper-past", "GR-02 对照框", {"verb": "go"}, ["go", "school"], ("go", "past", "went")),
    GEN("He plays football.", "没有 does 的时候，plays 自己戴上 -s", _C, "no-helper-3sg", "GR-02 对照框", {"verb": "play", "obj": "football"}, ["play", "football"], ("play", "3sg", "plays")),
]

# ---- GR-03 do 来当替补（可变=提问/否定/时态；不变=实义动词请替补；边界=be 与情态自己会）
_A, _B, _C = "do 举手：帮忙提问", "do 摇头：帮忙否定", "边界：这两位不用请替补"
SPEC_GR["GR-03"] = [
    O(0, _A), O(1, _B), O(2, _C), O(3, _C),
    OWN("He doesn't like this book.", "和前面那句只换了东西：doesn't 还是替补，like 用原形", _B, "yaml error_cases / lawdata cases right", ["like", "book"]),
    GEN("Do they play games after school?", "主语换成 they，do 还是站在最前面举手", _A, "do-q", "GR-03 exs[0] 句框", {"verb": "play", "obj": "game"}, ["play", "game"], ("play", "base", "play")),
    GEN("Does he read books?", "主语是 he，替补就换成 does，read 用原形", _A, "does-q", "GR-03 exs[0] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "base", "read")),
    GEN("She doesn't drink milk.", "否定换个人：doesn't 站岗，drink 用原形", _B, "doesnt", "GR-03 exs[1] 句框", {"verb": "drink", "obj": "milk"}, ["drink", "milk"], ("drink", "base", "drink")),
    GEN("Did you go home?", "过去的事也要替补：did 提问，go 用原形", _A, "did-q", "GR-03 exs[0] 句框", {"verb": "go"}, ["go", "home"], ("go", "base", "go")),
    GEN("Are you happy?", "be 自己会提问：直接站到前面，不用请 do", _C, "be-q", "GR-03 exs[2] 对照框", {}, ["happy"]),
]

# ---- GR-04 三单 -s（可变=主语；不变=he/she/it 后动词戴 -s；边界=非三单摘帽）
_A, _B, _C = "he / she 后面，动词戴 -s", "it 后面也戴", "边界：换成 I / they，尾巴就摘掉"
SPEC_GR["GR-04"] = [
    O(0, _A), O(1, _A), O(3, _A), O(2, _B),
    OWN("My friend loves me.", "主语是「我的朋友」——也是一个人，loves 戴 -s", _A, "yaml error_cases right", ["friend", "love"], ("love", "3sg", "loves")),
    OWN("She always wants to be a musician.", "wants 戴着 -s，后面的 be 反而光着身子", _A, "yaml error_cases right", ["want"], ("want", "3sg", "wants")),
    GEN("The dog runs fast.", "主语是一只狗——一个，runs 戴 -s", _A, "3sg", "GR-04 exs[0] 句框", {"verb": "run", "subj": "dog"}, ["dog", "run"], ("run", "3sg", "runs")),
    GEN("She reads a book every day.", "天天做的事也一样：she 后面 reads 戴 -s", _A, "3sg", "GR-04 exs[0] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "3sg", "reads")),
    GEN("It gets cold in winter.", "天气也是 it：gets 戴 -s", _B, "3sg-it", "GR-04 exs[2] 句框", {"verb": "get"}, ["get", "cold"], ("get", "3sg", "gets")),
    GEN("I play football.", "换成 I：play 把尾巴摘掉", _C, "bare-I", "GR-04 对照框", {"verb": "play", "obj": "football"}, ["play", "football"], ("play", "base", "play")),
    GEN("They watch TV.", "换成 they：watch 也不戴尾巴", _C, "bare-they", "GR-04 对照框", {"verb": "watch"}, ["watch"], ("watch", "base", "watch")),
]

# ---- GR-05 两个 -s（可变=哪个 -s 上场；不变=名词管数量、动词管三单；边界=单数时两个都休息）
_A, _B, _C, _D = "名词的 -s：不止一个", "动词的 -s：他/她做", "两个 -s 同框", "边界：只有一个时，两个 -s 都休息"
SPEC_GR["GR-05"] = [
    O(0, _A), O(3, _A), O(2, _B), O(1, _C),
    OWN("We should help strangers.", "strangers 的 -s 是名词的：不止一个陌生人；should 后面没有三单 -s", _A, "yaml error_cases right", ["help"]),
    OWN("We visit a farm.", "we 后面 visit 不戴 -s，a farm 也只有一个", _D, "yaml error_cases right", ["visit", "farm"], ("visit", "base", "visit")),
    GEN("The dog eats apples.", "一句话里两个 -s：eats 是动词的，apples 是名词的", _C, "both-s", "GR-05 exs[1] 句框", {"verb": "eat", "obj": "apple"}, ["dog", "eat", "apple"], ("eat", "3sg", "eats")),
    GEN("She has two cats.", "has 是 have 的三单样子，cats 是名词的 -s", _C, "both-s", "GR-05 exs[0] 句框", {"verb": "have", "noun": "cat"}, ["have", "cat"], ("have", "3sg", "has")),
    GEN("He reads a book.", "只有动词的 -s：book 只有一个，不戴 -s", _B, "verb-s-only", "GR-05 exs[2] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "3sg", "reads")),
    GEN("We see three birds.", "birds 的 -s 管数量；we 后面的 see 不归三单管", _A, "noun-s-only", "GR-05 exs[3] 句框", {"noun": "bird"}, ["bird"]),
]

# ---- GR-06 换元音的一家人（可变=哪家换法；不变=老词靠换元音/换词变过去；边界=规矩的 -ed 大多数）
_A, _B, _C, _D = "换中间的元音变过去", "变得认不出：整个词换掉", "再认几家换元音的", "边界：大多数词规规矩矩加 -ed"
SPEC_GR["GR-06"] = [
    O(0, _A), O(1, _A), O(3, _A), O(2, _B),
    OWN("I went to school yesterday.", "还是 went：一家人里变得最彻底的一个", _B, "yaml error_cases right", ["go", "school"], ("go", "past", "went")),
    GEN("He drank some water.", "drink 换元音成 drank，和 sing 是一家人", _C, "ablaut-i-a", "GR-06 exs[0] 句框", {"verb": "drink", "obj": "water"}, ["drink", "water"], ("drink", "past", "drank")),
    GEN("We sat under the tree.", "sit 换成 sat：坐下这件事已经过去了", _C, "ablaut-i-a", "GR-06 exs[1] 句框", {"verb": "sit", "place": "tree"}, ["sit", "tree"], ("sit", "past", "sat")),
    GEN("He came home late.", "come 换成 came，也是换元音的一家", _C, "ablaut-o-a", "GR-06 exs[3] 句框", {"verb": "come"}, ["come", "home"], ("come", "past", "came")),
    GEN("I took the book.", "take 换成 took：中间的音换了，尾巴没加 -ed", _C, "ablaut-a-oo", "GR-06 exs[3] 句框", {"verb": "take", "obj": "book"}, ["take", "book"], ("take", "past", "took")),
    GEN("We played football yesterday.", "大多数词不这样：play 老老实实加 -ed", _D, "regular-ed", "GR-06 对照框", {"verb": "play", "obj": "football"}, ["play", "football"], ("play", "past", "played")),
]

# ---- GR-07 情态三种力（可变=力的种类；不变=情态词各表一种力；边界=must 否定变味）
_A, _B, _C, _D, _E = "can：我有力气，我能行", "may：请允许我", "must：必须，没得商量", "may：说不准，也许", "边界：must 加否定，意思会变"
SPEC_GR["GR-07"] = [
    O(0, _A), O(1, _B), O(2, _C), O(3, _D),
    GEN("She can ride a bike.", "换成骑车：can 还是说「她有这个本事」", _A, "can", "GR-07 exs[0] 句框", {"verb": "ride", "obj": "bike"}, ["ride", "bike"]),
    GEN("You must finish your homework.", "作业这一件：must 在后面推着你做完", _C, "must", "GR-07 exs[2] 句框", {"verb": "finish", "obj": "homework"}, ["finish", "homework"]),
    GEN("He may be at home.", "他在哪儿说不准：may 在这里是「也许」", _D, "may-maybe", "GR-07 exs[3] 句框", {}, ["home"]),
    GEN("Can you help me?", "can 也能用来拜托人：你能帮我吗", _A, "can-q", "GR-07 exs[0] 句框", {"verb": "help"}, ["help"]),
    GEN("We must wash our hands.", "大家都必须：must 后面 wash 用原形", _C, "must", "GR-07 exs[2] 句框", {"verb": "wash", "obj": "hand"}, ["wash", "hand"], ("wash", "base", "wash")),
    GEN("You mustn't play in the street.", "mustn't 是「不许」——比 must 还严，不是「不必」", _E, "mustnt", "GR-07 对照框", {"verb": "play", "place": "street"}, ["play", "street"], ("play", "base", "play")),
]

# ---- GR-08 情态化石（可变=哪个情态词；不变=不加 -s、后面跟原形；边界=提问否定不用 do）
_A, _B, _C, _D = "will：说将来", "can / must：老帮手的样子", "边界：提问不用 do 帮忙", "边界：否定直接贴上去"
SPEC_GR["GR-08"] = [
    O(0, _A), O(1, _A), O(2, _B), O(3, _B),
    OWN("She must do it.", "must 后面 do 用原形：帮手后面不许变形", _B, "yaml error_cases right", [], ("do", "base", "do")),
    OWN("You can play basketball.", "can 后面 play 用原形，和普通动词不一样", _B, "yaml error_cases right", ["play", "basketball"]),
    GEN("He will go home.", "主语是 he，will 也不戴 -s——它已经定型了", _A, "will", "GR-08 exs[0] 句框", {"verb": "go"}, ["go", "home"], ("go", "base", "go")),
    GEN("The dog can run fast.", "can 后面 run 用原形，can 自己也不变", _B, "can", "GR-08 exs[3] 句框", {"verb": "run", "subj": "dog"}, ["dog", "run"]),
    GEN("Will she come?", "will 提问直接站到前面，不请 do", _C, "will-q", "GR-08 exs[2] 句框", {"verb": "come"}, ["come"]),
    GEN("She cannot swim.", "否定就是把 not 贴在 can 身上：cannot，不用 don't", _D, "cannot", "GR-08 exs[3] 对照框", {"verb": "swim"}, ["swim"]),
]

# ---- GR-09 否定词轮换（可变=否定落在哪；不变=否定总要有人扛；边界=自带否定的词）
_A, _B, _C, _D = "not 跟在 do / does 后面", "not 跟在 be 后面", "换个句子，还是 not 值班", "边界：有的词自己带着否定"
SPEC_GR["GR-09"] = [
    O(0, _A), O(2, _A), O(1, _B), O(3, _B),
    GEN("We are not late.", "be 的否定还是 not：are not，顺序不变", _B, "be-not", "GR-09 exs[1] 句框", {}, ["late"]),
    GEN("She can't ride a bike.", "not 缩成 n't 贴在 can 身上：否定词越变越短", _C, "nt", "GR-09 exs[1] 句框", {"verb": "ride", "obj": "bike"}, ["ride", "bike"]),
    GEN("They do not play games.", "主语换成 they，do not 的样子不变", _A, "do-not", "GR-09 exs[0] 句框", {"verb": "play", "obj": "game"}, ["play", "game"]),
    GEN("I don't like it.", "口语里 not 缩得更短：don't——变弱的脚步还在走", _C, "nt", "GR-09 exs[0] 句框", {}, ["like"]),
    GEN("Nobody is in the classroom.", "nobody 自己就带着「没有人」：不用再加 not", _D, "self-neg", "GR-09 对照框", {}, ["classroom"]),
    GEN("He has no brothers.", "no 直接站在名词前面否定：一个也没有", _D, "no-det", "GR-09 对照框", {"noun": "brother"}, ["brother"]),
]

# ---- GR-10 some / any（可变=句式与心思；不变=举旗看说话人预设；边界=肯定句里的 any 变「任何」）
_A, _B, _C, _D = "some：我心里有数", "any：问问有没有，随便哪个", "边界：any 在肯定句里是「任何」", "some：客客气气地要"
SPEC_GR["GR-10"] = [
    O(0, _A), O(1, _B), O(2, _D), O(3, _C),
    GEN("I have some books.", "我手里有几本：说话人心里有数，用 some", _A, "some-have", "GR-10 exs[0] 句框", {"noun": "book"}, ["book"]),
    GEN("Do you have any brothers?", "不知道你有没有：提问先举 any", _B, "any-q", "GR-10 exs[1] 句框", {"noun": "brother"}, ["brother"]),
    GEN("Would you like some milk?", "请人喝东西是「要」：这时提问也用 some", _D, "some-offer", "GR-10 exs[2] 句框", {"noun": "milk"}, ["milk"]),
    GEN("She doesn't have any pens.", "否定句里举 any：她一支也没有", _B, "any-neg", "GR-10 exs[1] 句框", {"noun": "pen"}, ["pen"]),
    GEN("Any student can do it.", "any 站在肯定句里，意思变成「任何一个都」", _C, "any-any", "GR-10 exs[3] 句框", {}, ["student"]),
    GEN("I want some water, please.", "点东西的时候用 some：我想要一些水", _D, "some-want", "GR-10 exs[2] 句框", {"noun": "water"}, ["water"]),
]

# ---- GR-11 因果只搭一座桥（可变=站哪头；不变=一座桥；边界=because 前置/对调说）
_A, _B, _C = "站 because 这头：先说原因", "站 so 那头：先说结果", "边界：同一件事，换一头说"
SPEC_GR["GR-11"] = [
    O(0, _A), O(2, _A), O(1, _B), O(3, _B),
    GEN("He was hungry, so he ate an apple.", "先说饿（原因在心里），so 引出结果：吃苹果", _B, "so", "GR-11 exs[1] 句框", {"verb": "eat", "obj": "apple"}, ["eat", "apple"], ("eat", "past", "ate")),
    GEN("We stayed in the classroom because it was cold.", "因为冷，所以留在教室：because 后面是原因", _A, "because", "GR-11 exs[0] 句框", {"place": "classroom"}, ["classroom", "cold"]),
    GEN("She was tired, so she went to bed.", "累了是因，上床睡是果：一座 so 桥就够", _B, "so", "GR-11 exs[3] 句框", {"verb": "go"}, ["go"], ("go", "past", "went")),
    GEN("I took a bus because I was late.", "迟到了才坐车：原因在 because 后面", _A, "because", "GR-11 exs[2] 句框", {"noun": "bus"}, ["bus", "late"]),
    GEN("It was my birthday, so Mum made a cake.", "生日是因，蛋糕是果：so 把结果带出来", _B, "so", "GR-11 exs[1] 句框", {"verb": "make", "obj": "cake"}, ["make", "cake"], ("make", "past", "made")),
    GEN("Because it rained, we stayed home.", "because 搬到句首也行：原因先说，桥还是只有一座", _C, "because-front", "GR-11 exs[0] 对照框", {}, ["home"]),
]

# ---- GR-12 三股力拔河（可变=哪股力赢；不变=形式/意义/就近三力并存；边界=and 并列不用就近）
_A, _B, _C, _D = "there be：看紧挨着的第一个名字", "意思赢：看说的是一个还是一群", "形式赢：长相说了算", "边界：and 连起来的主语用复数"
SPEC_GR["GR-12"] = [
    O(0, _A), O(1, _A), O(2, _A), O(3, _A),
    OWN("People were happy but they felt tired.", "people 说的是一群人：意思赢了，动词用复数 were", _B, "yaml error_cases right", ["happy"]),
    GEN("The family is at home.", "family 看成一家人（一个整体）：形式赢，用 is", _C, "family-is", "GR-12 句框", {"noun": "family"}, ["family", "home"]),
    GEN("The family are happy.", "还是 family：这次看成家里的每一个人，意思赢，用 are——三股力在同一词上拔河", _B, "family-are", "GR-12 句框", {"noun": "family"}, ["family", "happy"]),
    GEN("These shoes are new.", "shoes 长着复数的样子：长相赢，用 are", _C, "shoes-are", "GR-12 句框", {"noun": "shoe"}, ["shoe"]),
    GEN("There is a cat and two dogs in the garden.", "there be 只看第一个名字：cat 是一个，用 is——后面的 dogs 不算", _A, "there-first", "GR-12 exs[0] 句框", {"noun": "cat"}, ["cat", "dog", "garden"]),
    GEN("Tom and Sam are friends.", "两个人并起来就是复数：are——就近原则在这里不上场", _D, "and-pair", "GR-12 对照框", {}, ["friend"]),
]

# ---- GR-13 's 小绳子（可变=关系的种类；不变='s 只表「有关系」；边界=复数名词只剩撇号）
_A, _B, _C = "绳子拴「谁的东西」", "绳子拴的不止所有：时间和东西也行", "边界：复数名词的绳子只剩一个撇号"
SPEC_GR["GR-13"] = [
    O(0, _A), O(1, _A), O(2, _B), O(3, _B),
    GEN("This is Tom's bag.", "Tom 的包：'s 把 Tom 和包拴在一起", _A, "s-person", "GR-13 exs[0] 句框", {"obj": "bag"}, ["bag"]),
    GEN("The teacher's desk is clean.", "老师的桌子：'s 拴的是人和桌子的关系", _A, "s-teacher", "GR-13 exs[0] 句框", {}, ["teacher", "desk"]),
    GEN("The dog's tail is long.", "狗的尾巴：尾巴不是「东西」，是身体的一部分——'s 照样拴", _B, "s-body", "GR-13 exs[1] 句框", {}, ["dog", "tail"]),
    GEN("We have a week's holiday.", "一周的假期：'s 拴的是时间——week 不是谁，照样能拴", _B, "s-time", "GR-13 exs[2] 句框", {}, ["week", "holiday"]),
    GEN("The students' books are new.", "学生们（不止一个）的书：-s 后面只剩一个撇号，绳子还在", _C, "s-plural", "GR-13 对照框", {"noun": "student", "obj": "book"}, ["student", "book"]),
    GEN("The girls' bags are red.", "女孩们的包：girls 已经有 -s,'s 就只露一个撇号", _C, "s-plural2", "GR-13 对照框", {"noun": "girl", "obj": "bag"}, ["girl", "bag"]),
]

# ---- GR-14 人称格衣裳（可变=位置；不变=主格开头、宾格跟后；边界=讲究过头也会错）
_A, _B, _C = "站句首当主角：穿 I / he / they", "跟在动词和介词后面：穿 me / him / us", "边界：讲究过头也会穿错"
SPEC_GR["GR-14"] = [
    O(0, _A), O(1, _B), O(2, _B), O(3, _B),
    GEN("We help them.", "一句话两件衣裳：we 站前面当主角，them 跟后面当客人", _A, "we-them", "GR-14 exs[0] 句框", {"verb": "help"}, ["help"]),
    GEN("The teacher helps us.", "us 跟在 helps 后面：我们是被帮的，穿宾格", _B, "helps-us", "GR-14 exs[3] 句框", {"verb": "help"}, ["teacher", "help"]),
    GEN("I like her.", "her 是 she 的宾格衣裳：跟在 like 后面", _B, "like-her", "GR-14 exs[1] 句框", {}, ["like"]),
    GEN("Give it to me, please.", "me 跟在 to 后面：给我——介词后面一律穿宾格", _B, "to-me", "GR-14 exs[1] 句框", {"verb": "give"}, ["give"]),
    GEN("This is between you and me.", "between 后面是 you and me：说 and I 是讲究过头，反而错了", _C, "between", "GR-14 cases right（between you and me）句框", {}, []),
    GEN("Let's play football.", "let's 是 let us 的缩写：us 穿着宾格衣裳躲在里面", _C, "lets", "GR-14 对照框", {"verb": "play", "obj": "football"}, ["play", "football"]),
]

# ---- GR-15 耳朵决定 a / an（可变=首音；不变=听声音不看字母；边界=u 的两种读法）
_A, _B, _C, _D = "h 不出声：用 an", "看着像元音、听着是辅音：用 a", "老实的元音开头：用 an", "边界：同一个字母 u，两种读法"
SPEC_GR["GR-15"] = [
    O(0, _A), O(2, _A), O(1, _B), O(3, _C),
    GEN("I have an apple.", "apple 开头是元音声：an 站在前面垫住", _C, "an-vowel", "GR-15 exs[3] 句框", {"obj": "apple"}, ["apple"]),
    GEN("This is a useful book.", "useful 开头是「优」的滑音——是辅音味儿，用 a", _B, "a-useful", "GR-15 exs[1] 句框", {"obj": "book"}, ["book"]),
    GEN("He is a university student.", "university 也是「优」开头：字母是 u，声音是辅音，用 a", _B, "a-university", "GR-15 exs[1] 句框", {}, ["university", "student"]),
    GEN("It is an old house.", "old 开头是元音声：an——耳朵说了算", _C, "an-old", "GR-15 exs[3] 句框", {}, ["old", "house"]),
    GEN("An elephant is big.", "elephant 开头也是元音声：an 站在最前面", _C, "an-elephant", "GR-15 exs[3] 句框", {}, ["elephant", "big"]),
    GEN("It is a hot day.", "hot 的 h 老老实实出声：辅音开头，用 a——和 an hour 正好对照", _D, "a-hot", "GR-15 exs[0] 对照框", {}, ["hot", "day"]),
]

# ---- GR-16 错误是试单的回执（可变=被试的形式；不变=错误暴露正在形成的规矩；边界=看着错其实对）
_A, _B, _C, _D = "先看对的样子：老词的过去式", "新规矩最容易带偏的地方", "边界：看着别扭，其实是对的", "规规矩矩的大多数"
SPEC_GR["GR-16"] = [
    O(0, _A), O(2, _A), O(1, _B), O(3, _B),
    OWN("I see two sheep.", "sheep 一只两只一个样：说对这句，说明复数不变的规矩已经住进来", _B, "yaml error_cases right", ["sheep"]),
    GEN("She went home.", "went 不合 -ed 的规矩，却是对的——天天用的老词就这样", _A, "went", "GR-16 exs[0] 句框", {"verb": "go"}, ["go", "home"], ("go", "past", "went")),
    GEN("The children are playing.", "children 是另一个不肯加 -s 的复数，说对它也是试出来的", _B, "children", "GR-16 exs[1] 句框", {"noun": "child"}, ["child"]),
    GEN("He watched TV.", "大多数词的过去式就是加 -ed：新规矩先在这些词上练熟", _D, "regular", "GR-16 exs[3] 句框", {"verb": "watch"}, ["watch"], ("watch", "past", "watched")),
    GEN("Two men are here.", "men 也是换来的复数：说对的背后，都试错过很多次", _B, "men", "GR-16 exs[1] 句框", {"noun": "man"}, ["man"]),
    GEN("One sheep is eating grass.", "换成一只，is 又对了——同一句话，数量变了，动词跟着变", _C, "one-sheep", "GR-16 exs[1] 对照框", {"noun": "sheep"}, ["sheep", "grass"]),
]

# ---- GR-17 注意到才算数（可变=被注意的形式；不变=先看见才进脑；边界=最容易被漏看的形式）
_A, _B, _C = "值得「咦」一下的小尾巴", "换个形式，继续练眼睛", "边界：最容易被耳朵漏掉的形式"
SPEC_GR["GR-17"] = [
    O(0, _A), O(1, _A), O(2, _A), O(3, _A),
    GEN("She played football yesterday.", "这次盯 -ed：它在说「昨天就踢完了」", _B, "notice-ed", "GR-17 演示框", {"verb": "play", "obj": "football"}, ["play", "football"], ("play", "past", "played")),
    GEN("I have two books.", "盯住 books 的 -s：不止一本，就藏在这个小尾巴里", _B, "notice-plural", "GR-17 演示框", {"noun": "book"}, ["book"]),
    GEN("Did you go?", "盯住 go：did 来了，它反而光着身子——这个反差最值得「咦」", _B, "notice-did", "GR-17 演示框", {"verb": "go"}, ["go"], ("go", "base", "go")),
    GEN("The cat is sleeping.", "盯住 is sleeping：两个零件一起说「正在睡」", _B, "notice-ing", "GR-17 演示框", {"verb": "sleep"}, ["sleep"], ("sleep", "ing", "sleeping")),
    GEN("It's a cat.", "'s 缩成一小点贴在 It 后面：耳朵最容易漏掉它", _C, "notice-its", "GR-17 对照框", {"noun": "cat"}, ["cat"]),
    GEN("She has a dog.", "has 不起眼：它在说「她有」——has 也是 have 变的", _C, "notice-has", "GR-17 对照框", {"verb": "have", "obj": "dog"}, ["have", "dog"], ("have", "3sg", "has")),
]

# ---- GR-18 卡住的几秒（可变=被卡住的形式；不变=正要用时讲最有效；边界=卡点可以小到一个词）
_A, _B, _C, _D = "正想说，卡住了", "卡完，说出口了", "再换几个卡点", "边界：卡点可以小到只有一个词"
SPEC_GR["GR-18"] = [
    O(0, _A), O(1, _A), O(2, _B), O(3, _B),
    GEN("I bought a book.", "想说「我买了一本书」，正卡在 bought——这时讲过去式，一辈子记得牢", _C, "buy-past", "GR-18 演示框", {"verb": "buy", "obj": "book"}, ["buy", "book"], ("buy", "past", "bought")),
    GEN("She is taller than me.", "想比一比谁高，卡在 taller：比较级就是在这几秒钟学会的", _C, "comparative", "GR-18 演示框", {}, []),
    GEN("There are three cats.", "想数清楚几只猫，卡在 are：不止一个，就要用 are", _C, "there-are", "GR-18 演示框", {"noun": "cat"}, ["cat"]),
    GEN("He doesn't like it.", "想说他不喜欢，卡在 doesn't：否定请 do 来帮忙", _C, "doesnt", "GR-18 演示框", {}, ["like"]),
    GEN("It is raining.", "想说外面下雨了，卡在 is raining：正在下的雨要这样说", _C, "raining", "GR-18 演示框", {"verb": "rain"}, ["rain"], ("rain", "ing", "raining")),
    GEN("I went home.", "整句只卡一个 went：卡点越小，这几秒越值钱", _D, "one-word", "GR-18 exs[3] 对照框", {"verb": "go"}, ["go", "home"], ("go", "past", "went")),
]

# ---- GR-19 频率说了算（可变=词的常见程度；不变=见得多才稳；边界=见得少的老词要多见几次）
_A, _B, _C, _D = "天天见：自己住进脑子", "见得多了，规矩的样子也记住", "边界：见得少的怪词，要多见几次", "天天见的 have 一家"
SPEC_GR["GR-19"] = [
    O(0, _A), O(3, _A), O(1, _B), O(2, _B),
    GEN("I had breakfast.", "had 也是天天见：吃早饭天天说，它就稳稳住下了", _D, "had", "GR-19 exs[0] 句框", {"verb": "have"}, ["have"], ("have", "past", "had")),
    GEN("She said sorry.", "said 一天听八遍：不用背，自己就记住了", _A, "said", "GR-19 exs[3] 句框", {"verb": "say"}, ["say"], ("say", "past", "said")),
    GEN("I read a book.", "read 样子没变、读法变了：见得多了，耳朵自己分得清", _A, "read", "GR-19 exs[3] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "past", "read")),
    GEN("Mum made a cake.", "made 也是高频老词：做的次数多，它的样子就忘不掉", _A, "made", "GR-19 exs[0] 句框", {"verb": "make", "obj": "cake"}, ["make", "cake"], ("make", "past", "made")),
    GEN("The bird flew.", "flew 见得少：不多见几次，就容易被说成 flied", _C, "flew", "GR-19 对照框", {"verb": "fly"}, ["fly"], ("fly", "past", "flew")),
    GEN("He played football yesterday.", "play 见得也多，但它的过去式是规矩的 -ed：频率帮它天天复习", _B, "played", "GR-19 exs[1] 句框", {"verb": "play", "obj": "football"}, ["play", "football"], ("play", "past", "played")),
]

# ---- GR-20 整块先行（可变=框架与零件；不变=先整句、后拆件；边界=没有零件可换的纯整块）
_A, _B, _C, _D = "整句端出来用", "机关露出来：零件能换", "再认几句整块", "边界：只有整块，没有零件"
SPEC_GR["GR-20"] = [
    O(0, _A), O(1, _A), O(2, _B), O(3, _B),
    GEN("Thank you very much.", "谢谢也是整块端出来的：先会说整句，零件以后再认", _C, "chunk-thanks", "GR-20 演示框", {}, []),
    GEN("How are you?", "问身体的整块句：整句记住，不用现拼", _C, "chunk-how", "GR-20 exs[0] 句框", {}, []),
    GEN("Can I have a pen, please?", "还是 Can I have 的机关：零件换成 a pen", _B, "frame-pen", "GR-20 exs[1] 句框", {"obj": "pen"}, ["pen"]),
    GEN("Can I have two pens, please?", "零件再变一步：连数量都能换", _B, "frame-two", "GR-20 exs[3] 句框", {"obj": "pen"}, ["pen"]),
    GEN("What's that?", "What's this 的机关换个零件：this 换 that，问远处的东西", _B, "frame-that", "GR-20 exs[0] 句框", {}, []),
    GEN("Good morning!", "早上好只有整块：里面没有可以换的零件", _D, "chunk-only", "GR-20 对照框", {}, []),
]

# ---- GR-21 递工具（可变=递哪件工具；不变=挑最趁手、讲完就用；边界=趁手就是标准）
_A, _B, _C = "递出去的工具长这样", "再递三件趁手的", "边界：趁手，就是选工具的标准"
SPEC_GR["GR-21"] = [
    O(0, _A), O(1, _A), O(2, _A), O(3, _A),
    GEN("Are you OK? —— are 站到前面提问，you 后面的词不用变。", "这件工具管提问：are 提前就行", _B, "tool-are", "GR-21 exs[1] 句框", {}, []),
    GEN("She has a cat. —— has 是 have 的三单样子。", "这件工具管「她有」：have 换成 has", _B, "tool-has", "GR-21 exs[0] 句框", {"verb": "have", "obj": "cat"}, ["have", "cat"], ("have", "3sg", "has")),
    GEN("Two apples are red. —— 不止一个，apple 戴 -s，be 也换成 are。", "这件工具管「不止一个」：两处一起变", _B, "tool-plural", "GR-21 exs[2] 句框", {"noun": "apple"}, ["apple"]),
    GEN("I can swim. —— can 后面直接跟原形，最趁手。", "选工具先挑最常用的：can 后面什么都不加", _C, "tool-can", "GR-21 对照框", {"verb": "swim"}, ["swim"]),
    GEN("It is cold. —— 说天气，先用 it 开头。", "说天气的工具只有一件：it 开头", _C, "tool-it", "GR-21 对照框", {}, ["cold"]),
    GEN("Let's go. —— let's 后面跟原形，叫上大家一起。", "叫人一起做事的工具：let's 加原形", _C, "tool-lets", "GR-21 对照框", {"verb": "go"}, ["go"]),
]

# ---- GR-22 母语没有的格子（可变=哪个格子；不变=英语必标、汉语不标；边界=英语也不标的地方）
_A, _B, _C, _D = "数量格：一和几都要标", "人称格：he / she 要标", "时间格：过去要标", "边界：这里英语也不标"
SPEC_GR["GR-22"] = [
    O(0, _A), O(2, _A), O(1, _B), O(3, _C),
    GEN("She is a teacher.", "她是老师——「一个」也要用 a 标出来，汉语这里是空的", _A, "gap-a", "GR-22 exs[0] 句框", {}, ["teacher"]),
    GEN("He has two pens.", "has 和 pens 两个格子一起标：他有、而且不止一支", _A, "gap-two", "GR-22 exs[2] 句框", {"verb": "have", "noun": "pen"}, ["have", "pen"], ("have", "3sg", "has")),
    GEN("We went home.", "回家的动作在昨天：went 把时间格标得明明白白", _C, "gap-past", "GR-22 exs[3] 句框", {"verb": "go"}, ["go", "home"], ("go", "past", "went")),
    GEN("The dogs are happy.", "dogs 戴 -s,are 跟着变复数：数量格一标再标", _A, "gap-plural", "GR-22 exs[2] 句框", {"noun": "dog"}, ["dog"]),
    GEN("I like music.", "music 是不可数的：不加 a、不加 -s——这里英语和汉语一样不标", _D, "no-gap-music", "GR-22 对照框", {}, ["music"]),
    GEN("She drinks water.", "water 也不标数量；可是 drinks 的三单格照样要标", _D, "no-gap-water", "GR-22 对照框", {"verb": "drink"}, ["drink", "water"], ("drink", "3sg", "drinks")),
]

# ---- GR-23 说出来才知道（可变=说的场景；不变=输出暴露缺口；边界=长句后半截最容易露馅）
_A, _B, _C, _D = "说一段昨天做了什么", "说在动物园看见的", "换个场景，继续说", "边界：一口气说长，后半截最容易露馅"
SPEC_GR["GR-23"] = [
    O(1, _A), O(2, _A), O(3, _A), O(0, _A),
    GEN("I bought a red bag.", "说自己买了什么：bought 说不出来，才知道这个词还没学会", _C, "say-buy", "GR-23 演示框", {"verb": "buy", "obj": "bag"}, ["buy", "bag"], ("buy", "past", "bought")),
    GEN("She gave me a book.", "说别人给了我东西：gave 要自己说一遍才算会", _C, "say-give", "GR-23 演示框", {"verb": "give", "obj": "book"}, ["give", "book"], ("give", "past", "gave")),
    GEN("We ate noodles.", "说吃了什么：ate 是听别人说一百遍也换不来的", _C, "say-eat", "GR-23 演示框", {"verb": "eat"}, ["eat"], ("eat", "past", "ate")),
    GEN("My dog ran fast.", "说自家小狗跑得多快：ran 要从自己嘴里出来", _C, "say-run", "GR-23 演示框", {"verb": "run", "subj": "dog"}, ["dog", "run"], ("run", "past", "ran")),
    GEN("I went to the park and played football.", "一口气说两件事：两个过去式都要过关，后半截最容易露馅", _D, "say-long", "GR-23 exs[1] 对照框", {"verb": "go"}, ["go", "park"], ("go", "past", "went")),
    GEN("I found my key.", "说「我找到钥匙了」：found 这种词，听懂和说得出是两回事", _D, "say-find", "GR-23 对照框", {"verb": "find", "obj": "key"}, ["find", "key"], ("find", "past", "found")),
]

# ---- GR-24 语法在画画（可变=哪种象似；不变=顺序/亲近/数量照着世界画；边界=词序能搬家、靠小词标明）
_A, _B, _C, _D = "先发生的，先说出口", "越亲，挨得越近", "边界：词序搬了家，靠 before 标明", "越多，词也跟着长"
SPEC_GR["GR-24"] = [
    O(0, _A), O(3, _A), O(2, _B), O(1, _D),
    GEN("First put on your shoes, then go out.", "穿鞋在前，出门在后：说的顺序就是做的顺序", _A, "icon-order", "GR-24 exs[0] 句框", {"noun": "shoe"}, ["shoe"]),
    GEN("He opened the door and went in.", "先开门、再进去：and 把两件事按顺序串起来", _A, "icon-and", "GR-24 exs[3] 句框", {"verb": "open", "obj": "door"}, ["open", "door"], ("open", "past", "opened")),
    GEN("These are my books.", "「我的」书：my 紧紧贴着 books，我的东西离我最近", _B, "icon-close", "GR-24 exs[2] 句框", {"noun": "book"}, ["book"]),
    GEN("My mother is a teacher.", "妈妈是最近的人：my mother 贴得紧紧的", _B, "icon-mother", "GR-24 exs[2] 句框", {}, ["mother", "teacher"]),
    GEN("She has many pens.", "笔一多，pen 就变长成 pens：东西变多，词也变长", _D, "icon-more", "GR-24 exs[1] 句框", {"noun": "pen"}, ["pen"]),
    GEN("Before dinner, I washed my hands.", "洗手其实在吃饭前：before 把顺序挑明说，词序就可以搬家", _C, "icon-before", "GR-24 对照框", {"verb": "wash", "obj": "hand"}, ["wash", "hand"], ("wash", "past", "washed")),
]

# ---- GR-25 标配与加装（可变=加装点；不变=汉语没有的零件最易漏；边界=两边一样的标配区）
_A, _B, _C, _D = "加装件一：冠词", "加装件二：小尾巴", "两个加装件一起上", "边界：标配区——两边说法一样"
SPEC_GR["GR-25"] = [
    O(0, _A), O(2, _A), O(1, _B), O(3, _B),
    GEN("He has a dog.", "a 是冠词加装，has 是尾巴加装：一句话装两件", _C, "both-fit", "GR-25 exs[0] 句框", {"verb": "have", "obj": "dog"}, ["have", "dog"], ("have", "3sg", "has")),
    GEN("She watches TV.", "watches 的 -es 是加装件：汉语的「看」什么都不用装", _B, "fit-es", "GR-25 exs[1] 句框", {"verb": "watch"}, ["watch"], ("watch", "3sg", "watches")),
    GEN("I saw an old man.", "an 要装，saw 的过去也要装：两个难点在一句里碰头", _C, "both-fit2", "GR-25 exs[0] 句框", {"verb": "see"}, ["see", "old"], ("see", "past", "saw")),
    GEN("The baby is sleeping.", "the 要装，is sleeping 也要装：指着那个宝宝说话时全用上", _C, "both-fit3", "GR-25 exs[0] 句框", {"verb": "sleep"}, ["sleep"], ("sleep", "ing", "sleeping")),
    GEN("We are friends.", "are 是 be 的加装样子：主语是 we,be 就得换成 are", _B, "fit-are", "GR-25 exs[1] 句框", {}, ["friend"]),
    GEN("I love my mum.", "这句的顺序和汉语一模一样：我爱我妈妈——标配区，不用加装", _D, "standard", "GR-25 对照框", {"verb": "love"}, ["love"]),
]

# ---- GR-26 语法搬家（可变=搬去哪；不变=词尾瘦、顺序与小词当家；边界=老房子的残迹）
_A, _B, _C, _D = "新家一：词的顺序定角色", "新家二：小帮手当家", "新家三：小介词当家", "边界：老房子的最后一件家具"
SPEC_GR["GR-26"] = [
    O(0, _A), O(1, _A), O(2, _B), O(3, _B),
    GEN("Tom sees Sam.", "还是顺序说了算：Tom 在前面，就是看人的那个（人名换成占位也不影响顺序）", _A, "order-names", "GR-26 exs[0] 句框", {}, [], ("see", "3sg", "sees")),
    GEN("The teacher helps the students.", "谁帮谁，全看谁站在前面：顺序就是规矩", _A, "order-help", "GR-26 exs[0] 句框", {"verb": "help"}, ["teacher", "help", "student"]),
    GEN("I go to school by bus.", "to 和 by 两个小词当家：去哪儿、怎么去，都靠它们", _C, "prep-home", "GR-26 exs[2] 句框", {}, ["school", "bus"]),
    GEN("This book is for you.", "for 站出来表态：这本书是给你的", _C, "prep-for", "GR-26 exs[2] 句框", {"obj": "book"}, ["book"]),
    GEN("He plays football.", "plays 的 -s 是老房子留下的最后一件家具：还没搬走", _D, "relic-s", "GR-26 对照框", {"verb": "play", "obj": "football"}, ["play", "football"], ("play", "3sg", "plays")),
    GEN("She has a cat.", "has 也是残迹：have 在三单这里还留着老房子的样子", _D, "relic-has", "GR-26 对照框", {"verb": "have", "obj": "cat"}, ["have", "cat"], ("have", "3sg", "has")),
]

# ---- GR-27 滑杆不是开关（可变=宾语长短/说法；不变=双宾与 to 式都对、只有偏好；边界=宾语越长越偏 to）
_A, _B, _C = "双宾：人挨着动词坐", "to 式：东西先说，人随后", "边界：宾语越长，越爱用 to 式"
SPEC_GR["GR-27"] = [
    O(0, _A), O(2, _A), O(1, _B), O(3, _B),
    GEN("I gave her a pen.", "先说她、再说笔：双宾的样子，短的时候最顺", _A, "ditrans", "GR-27 exs[0] 句框", {"verb": "give", "obj": "pen"}, ["give", "pen"], ("give", "past", "gave")),
    GEN("She gave the pen to her.", "同一件事换 to 式说：先说笔，再说给谁——也对", _B, "to-version", "GR-27 exs[1] 句框", {"verb": "give", "obj": "pen"}, ["give", "pen"], ("give", "past", "gave")),
    GEN("He bought me a cake.", "buy 也能用双宾：给我买了一块蛋糕", _A, "ditrans-buy", "GR-27 exs[2] 句框", {"verb": "buy", "obj": "cake"}, ["buy", "cake"], ("buy", "past", "bought")),
    GEN("Mum made us some tea.", "make 给我们做了茶：双宾里的人是 us", _A, "ditrans-make", "GR-27 exs[2] 句框", {"verb": "make", "obj": "tea"}, ["make", "tea"], ("make", "past", "made")),
    GEN("They gave us some water.", "他们给我们水：双宾照样说得通", _A, "ditrans-water", "GR-27 exs[2] 句框", {"verb": "give", "obj": "water"}, ["give", "water"], ("give", "past", "gave")),
    GEN("I gave the new book to the boy.", "东西变长了（the new book），说法就滑向 to 式：滑杆往这边偏", _C, "long-to", "GR-27 exs[3] 句框", {"verb": "give", "obj": "book"}, ["give", "book"], ("give", "past", "gave")),
]

# ---- GR-28 复数小宿舍（可变=哪家宿舍；不变=先认家门再变复数；边界=外国宿舍双门牌/规矩宿舍）
_A, _B, _C, _D, _E = "不变宿舍", "换元音宿舍", "-en 老宿舍", "规矩宿舍：加 -s / -es", "边界：大多数词住规矩宿舍"
SPEC_GR["GR-28"] = [
    O(0, _A), O(1, _B), O(3, _B), O(2, _C),
    OWN("There are three children in the park.", "children 住在 -en 老宿舍：公园里三个孩子", _C, "yaml error_cases right", ["child", "park"]),
    GEN("Two men are in the room.", "man 住换元音宿舍：变 men", _B, "men", "GR-28 exs[1] 句框", {"noun": "man"}, ["man"]),
    GEN("The women are teachers.", "woman 也住换元音宿舍：变 women，读音也跟着变", _B, "women", "GR-28 exs[1] 句框", {"noun": "woman"}, ["woman", "teacher"]),
    GEN("I brush my teeth.", "tooth 住换元音宿舍：刷牙刷的是 teeth", _B, "teeth", "GR-28 exs[1] 句框", {"noun": "tooth"}, ["tooth"]),
    GEN("We have five fish.", "fish 住不变宿舍：五条鱼还是 fish", _A, "fish", "GR-28 exs[0] 句框", {"noun": "fish"}, ["fish"]),
    GEN("Six boxes are on the desk.", "box 住 -es 宿舍：尾巴是 x，要加 -es", _D, "boxes", "GR-28 句框", {"noun": "box", "place": "desk"}, ["box", "desk"]),
    GEN("Two dogs are running.", "dog 住最大的规矩宿舍：直接加 -s——大多数词都住这儿", _E, "dogs", "GR-28 对照框", {"noun": "dog"}, ["dog"]),
]

# ---- GR-29 八个尾巴点名（可变=哪个尾巴；不变=屈折尾巴总共八个；边界=be 家族换人不算新尾巴）
_A, _B, _C, _D = "点名：名词的尾巴", "点名：动词的尾巴", "点名：比较的尾巴", "边界：'s 是挂签，不是新尾巴"
SPEC_GR["GR-29"] = [
    O(0, _A), O(1, _B), O(2, _C), O(3, _D),
    OWN("He plays football.", "plays 的 -s 是三单尾巴：八个尾巴里的一个", _B, "yaml error_cases right", ["play", "football"], ("play", "3sg", "plays")),
    GEN("She is reading a book.", "reading 的 -ing 是进行尾巴：八个里的一个", _B, "ing", "GR-29 exs[1] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "ing", "reading")),
    GEN("I have eaten an apple.", "eaten 是过去分词尾巴：have 后面跟着它", _B, "pp", "GR-29 exs[1] 句框", {"verb": "eat", "obj": "apple"}, ["eat", "apple"], ("eat", "pp", "eaten")),
    GEN("He watches TV.", "watches 的 -es 是三单的另一种缝法：还是同一个尾巴位", _B, "es", "GR-29 exs[1] 句框", {"verb": "watch"}, ["watch"], ("watch", "3sg", "watches")),
    GEN("The babies are happy.", "babies 的 -ies 是复数尾巴的变体：y 先变 i 再加 es", _A, "ies", "GR-29 exs[0] 句框", {"noun": "baby"}, ["baby"]),
    GEN("My mother's bag is red.", "'s 挂在整个「我妈妈」后面：它是挂签，挂在词组尾巴上", _D, "s-clitic", "GR-29 exs[3] 对照框", {}, ["mother", "bag"]),
]

# ---- GR-30 从句两种活儿（可变=认人还是补述；不变=逗号分界；边界=that 人物通吃/关系词可省）
_A, _B, _C, _D = "认人组：紧贴着，不打逗号", "补述组：逗号隔开，多说一句", "边界：that 人和物都能领", "关系词可以不说出来"
SPEC_GR["GR-30"] = [
    O(0, _A), O(3, _A), O(1, _B), O(2, _D),
    GEN("The girl who is singing is my sister.", "从一群女孩里认出唱歌的那个：who 从句紧贴着，不打逗号", _A, "who-restrict", "GR-30 exs[0] 句框", {"verb": "sing"}, ["sing", "sister"], ("sing", "ing", "singing")),
    GEN("My teacher, who is kind, helps us.", "老师已经知道是谁，从句只是补一句她人很好：两边逗号隔开", _B, "who-nonrestrict", "GR-30 exs[1] 句框", {"verb": "help"}, ["teacher", "help"]),
    GEN("The house that is big is new.", "认房子的从句用 that 领：先认出哪一栋，再说它是新的", _A, "that-thing", "GR-30 exs[0] 句框", {}, ["house"]),
    GEN("The pen I bought is new.", "关系词藏起来了：I bought 前面省掉了 which——认东西时可以省", _D, "zero-rel", "GR-30 exs[2] 句框", {"verb": "buy", "obj": "pen"}, ["buy", "pen"], ("buy", "past", "bought")),
    GEN("The man that came is my uncle.", "that 领人也行：认人的活儿 who 和 that 都能干", _C, "that-person", "GR-30 exs[3] 句框", {"verb": "come"}, ["come"], ("come", "past", "came")),
    GEN("The book that I read is good.", "that 说出来也对：省不省都可以，认书的活儿不变", _D, "that-keep", "GR-30 exs[2] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "past", "read")),
]


# ---- GR-31 比较级称重量（可变=音节数与尾巴；不变=先称重量再选缝法；边界=better 一家不讲规矩）
_A, _B, _C, _D, _E = "轻的（一拍）：尾巴缝 -er", "两拍看尾巴：y 变 i 加 er", "重的（三拍以上）：请 more 帮忙", "边界：better 一家不讲规矩", "两拍的另一种缝法"
SPEC_GR["GR-31"] = [
    O(0, _A), O(1, _B), O(3, _E), O(2, _C),
    OWN("This one is better.", "better 不称重量：good 的比较级整个换了个样子", _D, "yaml error_cases right", ["good"]),
    GEN("The dog is faster than the cat.", "fast 只有一拍：直接缝 -er，再跟 than", _A, "er-fast", "GR-31 exs[0] 句框", {"adj": "fast"}, ["dog", "fast", "cat"]),
    GEN("It is colder today.", "cold 也是一拍：colder，不用请 more", _A, "er-cold", "GR-31 exs[0] 句框", {"adj": "cold"}, ["cold"]),
    GEN("She is busier than me.", "busy 两拍、尾巴是 y：y 变 i 再加 er", _B, "ier-busy", "GR-31 exs[1] 句框", {"adj": "busy"}, ["busy"]),
    GEN("This book is more interesting.", "interesting 太长，缝不动：请 more 站到前面", _C, "more-interesting", "GR-31 exs[2] 句框", {"obj": "book"}, ["book"]),
    GEN("This box is heavier.", "heavy 也是 y 结尾：heavier——沉的东西，尾巴也要变", _B, "ier-heavy", "GR-31 对照框", {"adj": "heavy", "obj": "box"}, ["heavy", "box"]),
]

# ---- GR-32 搭档与就近（可变=哪对搭档；不变=搭档同形、就近听最近；边界=and 并列不用就近）
_A, _B, _C = "both … and：搭档不能串门", "either / neither：动词听最近的那个", "边界：and 普通并列，不用就近"
SPEC_GR["GR-32"] = [
    O(0, _A), O(1, _A), O(2, _B), O(3, _B),
    OWN("The teacher and the students were happy.", "and 把两个人并成一队：一起用复数，不搞就近", _C, "yaml error_cases right", ["teacher", "student"]),
    GEN("I like both English and music.", "both 后面是 English,and 后面是 music：两边都是科目，长得一样", _A, "both-pair", "GR-32 exs[0] 句框", {}, ["music"]),
    GEN("Either the students or the teacher is here.", "or 连接时听最近的：teacher 是一个人，用 is", _B, "either-near-sg", "GR-32 exs[3] 句框", {}, ["teacher", "student"]),
    GEN("Either the teacher or the students are here.", "把顺序换过来：最近的变成 students，动词就换成 are", _B, "either-near-pl", "GR-32 exs[2] 句框", {}, ["teacher", "student"]),
    GEN("Both the cat and the dog are mine.", "both…and 夹着 cat 和 dog：两个都是小动物，同形", _A, "both-animals", "GR-32 exs[0] 句框", {}, ["cat", "dog"]),
    GEN("I can both read and write.", "both 后面是动词 read,and 后面也是动词 write：搭档夹动词也一样要同形", _A, "both-verbs", "GR-32 exs[1] 句框", {"verb": "read"}, ["read", "write"]),
]

# ---- GR-33 反意小尾巴（可变=前面的帮手；不变=复制帮手再翻正反；边界=命令句/特殊住户）
_A, _B, _C = "复制小帮手，再把正反翻个面", "特殊住户：Let's 和 never", "边界：命令句的尾巴用 will you"
SPEC_GR["GR-33"] = [
    O(0, _A), O(1, _A), O(2, _B), O(3, _B),
    OWN("You went there, didn't you?", "went 没有帮手，就请 did 来复制：didn't you", _A, "yaml error_cases right", ["go"], ("go", "past", "went")),
    GEN("He can swim, can't he?", "前面是 can，尾巴就复制 can 再翻面：can't he", _A, "tag-can", "GR-33 exs[0] 句框", {"verb": "swim"}, ["swim"]),
    GEN("She is happy, isn't she?", "前面是 is，尾巴复制 is：isn't she", _A, "tag-is", "GR-33 exs[0] 句框", {}, ["happy"]),
    GEN("They played football, didn't they?", "过去的事没有帮手：尾巴请 did 来", _A, "tag-did", "GR-33 exs[1] 句框", {"verb": "play", "obj": "football"}, ["play", "football"], ("play", "past", "played")),
    GEN("You don't like it, do you?", "前面是否定，尾巴就翻成肯定：do you", _A, "tag-flip", "GR-33 exs[3] 句框", {}, ["like"]),
    GEN("Open the door, will you?", "命令句的尾巴是 will you：请你照着做", _C, "tag-imperative", "GR-33 对照框", {"verb": "open", "obj": "door"}, ["open", "door"]),
]

# ---- GR-34 三种翻个儿（可变=倒装种类；不变=各种有各的硬条件；边界=代词不许全倒装）
_A, _B, _C, _D = "So do I 一家：小帮手提前", "Here 一家：整个句子翻过来", "否定词搬家：帮手跟着提前", "边界：代词主语不许整个翻"
SPEC_GR["GR-34"] = [
    O(0, _A), O(1, _B), O(2, _B), O(3, _C),
    GEN("I like music. — So do I.", "我也一样：So 后面 do 提前，I 跟在后面", _A, "so-do", "GR-34 exs[0] 句框", {}, ["music", "like"]),
    GEN("Here comes the teacher.", "老师来了：comes 冲到前面，teacher 是名词，可以这样翻", _B, "here-noun", "GR-34 exs[1] 句框", {"verb": "come"}, ["come", "teacher"]),
    GEN("There goes the bus.", "车开走了：goes 提前，bus 跟在后面", _B, "there-noun", "GR-34 exs[1] 句框", {"verb": "go", "noun": "bus"}, ["go", "bus"], ("go", "3sg", "goes")),
    GEN("Never did he play football.", "never 搬到句首，did 必须跟着提前：play 回原形", _C, "never-inv", "GR-34 exs[3] 句框", {"verb": "play", "obj": "football"}, ["play", "football"], ("play", "base", "play")),
    GEN("Here she comes.", "主语是 she（代词）：只能走到动词前面，不许整个翻过去", _D, "here-pron", "GR-34 exs[2] 对照框", {"verb": "come"}, ["come"]),
    GEN("So does he.", "他也是：主语是 he，帮手要用 does", _A, "so-does", "GR-34 exs[0] 句框", {}, []),
]

# ---- GR-35 only 手电筒（可变=only 的站位；不变=照哪儿哪儿就是焦点；边界=书面要贴紧）
_A, _B, _C = "only 挪一格，意思换一件", "口语里 only 常站在中间", "边界：书面里 only 要贴紧它照的词"
SPEC_GR["GR-35"] = [
    O(0, _A), O(1, _A), O(3, _A), O(2, _B),
    GEN("Only she has a pen.", "only 照在 she 上：只有她有笔，别人没有", _A, "only-subj", "GR-35 exs[0] 句框", {"verb": "have", "obj": "pen"}, ["have", "pen"], ("have", "3sg", "has")),
    GEN("She only has one pen.", "口语里 only 站中间：听的人靠声音听出它照的是 one", _B, "only-mid", "GR-35 exs[2] 句框", {"verb": "have", "obj": "pen"}, ["have", "pen"], ("have", "3sg", "has")),
    GEN("I have only one pen.", "only 贴紧 one：强调的只有数量——就一支", _C, "only-one", "GR-35 exs[2] 句框", {"verb": "have", "obj": "pen"}, ["have", "pen"]),
    GEN("Only one pen is on the desk.", "only 照在数量上开场：桌上只有一支笔", _A, "only-num", "GR-35 exs[0] 句框", {"obj": "pen", "place": "desk"}, ["pen", "desk"]),
    GEN("He reads only books.", "only 贴紧 books：他只看书，别的都不看", _C, "only-obj", "GR-35 exs[1] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "3sg", "reads")),
    GEN("He only reads books.", "同一句话 only 站中间：口语里常这样说，靠重音分意思", _B, "only-mid2", "GR-35 exs[2] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "3sg", "reads")),
]

# ---- GR-36 四种力气（可变=哪种力；不变=get 带 to、其余不带；边界=被动时 to 回来已在原例）
_A, _B, _C, _D = "make：推着走（后面不带 to)", "let：放行（也不带 to)", "get：说服（后面带 to)", "have：派活（不带 to)"
SPEC_GR["GR-36"] = [
    O(1, _A), O(0, _B), O(2, _C), O(3, _D),
    OWN("She made me go.", "还是 make 推着走：go 光着身子，不带 to", _A, "yaml error_cases right", ["make", "go"], ("go", "base", "go")),
    GEN("Let us play.", "let 放行我们去玩：play 不带 to", _B, "let-play", "GR-36 exs[0] 句框", {"verb": "play"}, ["play"]),
    GEN("Mum makes us wash our hands.", "妈妈推着我们洗手：wash 不带 to", _A, "make-wash", "GR-36 exs[1] 句框", {"verb": "wash", "obj": "hand"}, ["wash", "hand"], ("wash", "base", "wash")),
    GEN("Dad had me clean my room.", "爸爸派活给我：have 后面 clean 也不带 to", _D, "have-clean", "GR-36 句框", {"verb": "clean", "obj": "room"}, ["clean", "room"], ("clean", "base", "clean")),
    GEN("She got her brother to carry the bag.", "她说服哥哥提包：get 后面的 carry 要带 to", _C, "get-carry", "GR-36 exs[2] 句框", {"verb": "carry", "obj": "bag"}, ["carry", "bag"], ("carry", "base", "carry")),
    GEN("He let the dog in.", "他放狗进来：let 后面直接跟动作", _B, "let-in", "GR-36 exs[0] 句框", {}, ["dog"]),
]

# ---- GR-37 so / such / too / enough（可变=哪个词当班；不变=so 抱形容词、such 抱名词团、too 带刹车、enough 分站位；边界=so 后面不许直接抱名词团）
_A, _B, _C, _D = "so：只抱光秃秃的形容词", "such：抱「形容词 + 东西」", "enough：修饰形容词站后、修饰名词站前", "too：太……以致不能"
SPEC_GR["GR-37"] = [
    O(0, _A), O(1, _B), O(2, _C), O(3, _C),
    OWN("She is old enough to ride a bike.", "enough 站在 old 后面：她年纪够大，能骑车了", _C, "yaml error_cases right", ["ride", "bike"], ("ride", "base", "ride")),
    GEN("It is too hot to play.", "too 是过头了：热得不能出去玩——它带着刹车", _D, "too", "GR-37 句框", {"verb": "play"}, ["hot", "play"]),
    GEN("She is so happy.", "so 后面直接抱 happy：形容词光着身子", _A, "so", "GR-37 exs[0] 句框", {}, ["happy"]),
    GEN("It is such a nice day.", "such 抱的是 a nice day 一整团：形容词和东西一起", _B, "such", "GR-37 exs[1] 句框", {}, ["nice", "day"]),
    GEN("He has enough time.", "enough 修饰名词 time：站在前面", _C, "enough-noun", "GR-37 exs[3] 句框", {}, ["time"]),
    GEN("The bag is big enough.", "enough 修饰形容词 big：站在后面", _C, "enough-adj", "GR-37 exs[2] 句框", {}, ["big", "bag"]),
]

# ---- GR-38 逗号钩不住车厢（可变=接法/撇号工种；不变=完整句之间要够力的连接；边界=its 与 it's 分家）
_A, _B, _C = "两节车厢：分开写，或用够力的钩子", "撇号的两份工作", "边界：its 没有撇号，it's 才有"
SPEC_GR["GR-38"] = [
    O(0, _A), O(1, _A), O(2, _B), O(3, _B),
    GEN("It was cold. We stayed home.", "又是两节车厢：句号分开，各站各的", _A, "split2", "GR-38 exs[0] 句框", {}, ["cold", "home"]),
    GEN("I read a book, and I liked it.", "逗号加 and 才是够力的钩子：两节车厢接得稳", _A, "comma-and", "GR-38 exs[1] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "past", "read")),
    GEN("It's raining.", "It's 是 It is 的缩写：撇号在这里是「省了字母」", _B, "its-be", "GR-38 exs[2] 句框", {"verb": "rain"}, ["rain"], ("rain", "ing", "raining")),
    GEN("This is Sam's bag.", "Sam's 的撇号是另一份工作：表「……的」", _B, "s-poss", "GR-38 exs[3] 句框", {"obj": "bag"}, ["bag"]),
    GEN("The dog found its ball.", "its 是「它的」：自己就是完整的词，不用撇号", _C, "its", "GR-38 对照框", {"verb": "find", "obj": "ball"}, ["dog", "ball"], ("find", "past", "found")),
    GEN("It's my book.", "It's 开头说「这是」：和 its 只差一个撇号，意思全变", _C, "its2", "GR-38 exs[2] 对照框", {"obj": "book"}, ["book"]),
]

# ---- GR-39 两个大版本（可变=版本；不变=先认版本再判对错；边界=拼写也分版本）
_A, _B, _C, _D = "球队：英国版看成员，美国版看整体", "英国版的说法", "边界：拼写和用词都分版本", "美国版看整体"
SPEC_GR["GR-39"] = [
    O(1, _A), O(0, _D), O(2, _B), O(3, _B),
    GEN("The class is big.", "美国版看班级：class 是一个整体，用 is", _D, "us-class", "GR-39 exs[0] 句框", {}, []),
    GEN("The class are happy.", "英国版看班里的人：class 后面跟 are，也对", _A, "uk-class", "GR-39 exs[1] 句框", {}, ["happy"]),
    GEN("Have you got a pen?", "英国版提问爱用 Have you got…：认出来就行", _B, "uk-got", "GR-39 exs[2] 句框", {"obj": "pen"}, ["pen"]),
    GEN("I have a new bag.", "美国版说「我有」就用 have：不用 got", _D, "us-have", "GR-39 exs[2] 对照框", {"obj": "bag"}, ["bag"]),
    GEN("My favourite colour is red.", "favourite 和 colour 是英国版拼写：多一个 u", _C, "uk-spell", "GR-39 对照框", {}, ["red"]),
    GEN("I watch a movie.", "美国版爱说 movie，英国版爱说 film：连词都分版本，认出来就行", _C, "us-movie", "GR-39 对照框", {"verb": "watch", "obj": "movie"}, ["watch", "movie"]),
]

# ---- GR-40 两件说假话的纪念品（可变=哪件纪念品；不变=were/be 都在喊「不真」；边界=真事不用 were）
_A, _B, _C = "were 在喊：这是假的", "be 在喊：这事还没成真", "边界：真有可能的事，用回普通样子"
SPEC_GR["GR-40"] = [
    O(0, _A), O(3, _A), O(1, _B), O(2, _B),
    GEN("If I were a fish, I would swim.", "我不是鱼：were 先喊出「假的」，would 跟着来", _A, "were-fish", "GR-40 exs[3] 句框", {}, ["fish", "swim"]),
    GEN("If she were here, we would play.", "她不在这里：she 也要用 were，不用 was", _A, "were-she", "GR-40 exs[0] 句框", {"verb": "play"}, ["play"]),
    GEN("I suggest that he read the book.", "我建议他读：事情还没发生，read 用回原形 be 那一派的样子", _B, "mandative-read", "GR-40 exs[1] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "base", "read")),
    GEN("I wish I were tall.", "wish 后面也请 were：我现在并不高，这也是「说假话」", _A, "wish-were", "GR-40 exs[0] 句框", {}, []),
    GEN("If I am free, I will go.", "这件事真有可能：用 am，不用 were——纪念品只给假事用", _C, "real-if", "GR-40 对照框", {}, []),
    GEN("If it rains, we stay home.", "下不下雨还不一定，但这是真问题：rains 用普通样子", _C, "real-rain", "GR-40 对照框", {"verb": "rain"}, ["rain"], ("rain", "3sg", "rains")),
]

# ---- GR-41 used to 三兄弟（可变=哪个兄弟；不变=used to 管变化、would 只放动作、be used to 管习惯；边界=状态不进 would）
_A, _B, _C, _D = "used to：一半看过去，一半说「现在变了」", "would：只放动作录像", "be used to：已经习惯了", "边界：状态是照片，进不了 would"
SPEC_GR["GR-41"] = [
    O(0, _A), O(3, _A), O(1, _B), O(2, _C),
    GEN("I used to have a dog.", "以前我有狗：used to 说这事，眼睛还看着现在——现在没有了", _A, "usedto-dog", "GR-41 exs[0] 句框", {"obj": "dog"}, ["dog"]),
    GEN("Every day we would walk to school.", "would 放的是动作录像：天天走路去上学，一遍遍放", _B, "would-walk", "GR-41 exs[1] 句框", {"verb": "walk"}, ["walk", "school"]),
    GEN("She is used to the cold.", "be used to 后面跟东西：她已经习惯冷了", _C, "used-to-cold", "GR-41 exs[2] 句框", {}, ["cold"]),
    GEN("He used to ride a bike.", "他以前骑车：used to 后面跟动作原形", _A, "usedto-ride", "GR-41 exs[3] 句框", {"verb": "ride", "obj": "bike"}, ["ride", "bike"]),
    GEN("We would play after school.", "放学后一遍遍玩：动作录像，would 放得下", _B, "would-play", "GR-41 exs[1] 句框", {"verb": "play"}, ["play"]),
    GEN("I used to like milk.", "喜欢是状态照片：只能请 used to，would 放不进去", _D, "state-like", "GR-41 对照框", {}, ["like", "milk"]),
]

# ---- GR-42 形容词要扶着站（可变=哪个形容词；不变=英语形容词必须有 be；边界=动词不用扶）
_A, _B, _C = "be 扶着形容词站", "换个形容词，还是要扶", "边界：动词自己能站，不用扶"
SPEC_GR["GR-42"] = [
    O(0, _A), O(2, _A), O(1, _B), O(3, _B),
    GEN("The dog is big.", "big 前面要有 is 扶着：狗是大的", _A, "be-big", "GR-42 exs[0] 句框", {}, ["dog", "big"]),
    GEN("I am happy.", "说我开心：am 是 be 在 I 后面的样子", _A, "be-am", "GR-42 exs[1] 句框", {}, ["happy"]),
    GEN("We are late.", "我们迟到了：are 扶着 late，we 后面用 are", _B, "be-are", "GR-42 exs[1] 句框", {}, ["late"]),
    GEN("The water is cold.", "水是凉的：cold 前面站着 is", _B, "be-cold", "GR-42 exs[3] 句框", {}, ["water", "cold"]),
    GEN("The dog runs.", "runs 是动词：它自己就能当谓语，不用 be 扶", _C, "verb-stand", "GR-42 对照框", {"verb": "run", "subj": "dog"}, ["dog", "run"], ("run", "3sg", "runs")),
    GEN("She is a teacher.", "名词也要扶：她是老师——teacher 前面同样站着 is", _C, "noun-stand", "GR-42 对照框", {}, ["teacher"]),
]

# ---- GR-43 形容词座次（可变=哪几类形容词同框；不变=看法在外、固有在内；边界=汉语有「的」逃逸、英语靠排队）
_A, _B, _C, _D = "大小坐在颜色前面", "看法坐最外面", "新旧坐在颜色前面", "边界：英语没有「的」，只能靠座次"
SPEC_GR["GR-43"] = [
    O(0, _A), O(2, _A), O(1, _C), O(3, _B),
    GEN("She has a big black dog.", "big（大小）在 black（颜色）前面：座次排对了", _A, "size-color", "GR-43 exs[0] 句框", {}, ["dog", "big"]),
    GEN("I have a small old bag.", "small（大小）在 old（新旧）前面：越靠后越是它自己的性质", _A, "size-age", "GR-43 exs[3] 句框", {}, ["bag"]),
    GEN("He has a nice new bike.", "nice 是我的看法，坐最外面；new 是车子自己的事，挨着 bike", _B, "opinion-age", "GR-43 exs[3] 句框", {}, ["bike", "nice"]),
    GEN("This is a big round table.", "round 是桌子自己的形状，坐得最靠里", _A, "size-shape", "GR-43 exs[0] 句框", {}, ["table", "big"]),
    GEN("She has a lovely small dog.", "lovely（看法）在 small（大小）前面：看法永远坐外层", _B, "opinion-size", "GR-43 exs[3] 句框", {}, ["dog"]),
    GEN("I see a tall old tree.", "tall 和 old 都是树自己的事：高的在前、老的贴着 tree", _D, "size-age2", "GR-43 exs[2] 句框", {}, ["tree"]),
]

# ---- GR-44 名词包裹（可变=包裹的零件；不变=整包递出、封条在前；边界=不可数可以不封条）
_A, _B, _C, _D = "整包递出去：封条 + 本体 + 说明", "小包装：a bottle of 一类", "边界：不可数名词可以不带封条", "封条说数量"
SPEC_GR["GR-44"] = [
    O(0, _A), O(1, _D), O(2, _B), O(3, _A),
    GEN("The two cats under the tree are mine.", "整包：the two 是封条，cats 是本体，under the tree 是挂在后面的说明", _A, "pack-full", "GR-44 exs[0] 句框", {"noun": "cat", "place": "tree"}, ["cat", "tree"]),
    GEN("This is a cup of tea.", "a cup of 是小包装：茶装在杯子里递出来", _B, "pack-cup", "GR-44 exs[2] 句框", {}, ["cup", "tea"]),
    GEN("The boy in the classroom is my brother.", "本体是 boy，in the classroom 是挂在包后面的说明", _A, "pack-boy", "GR-44 exs[0] 句框", {}, ["boy", "classroom", "brother"]),
    GEN("I have a bag of books.", "a bag of books 也是一包：袋子是包装，书是本体", _B, "pack-bag", "GR-44 exs[2] 句框", {}, ["bag", "book"]),
    GEN("A dog is under the tree.", "dog 是可数的：出门必须带封条 a", _D, "pack-a", "GR-44 对照框", {"noun": "dog", "place": "tree"}, ["dog", "tree"]),
    GEN("Water is in the bottle.", "water 是不可数的：它可以不带封条，自己就是一整包", _C, "pack-water", "GR-44 exs[2] 对照框", {}, ["water", "bottle"]),
]

# ---- GR-45 轻前重后（可变=谁的/多长；不变=轻的贴前、重的挂后；在眼前用 's；边界=太长时 's 抱不动）
_A, _B, _C, _D = "'s 抱到前面：在眼前的、短的", "of 挂在后面：长的说明", "两样都行：先看在不在眼前", "边界：东西太长，'s 抱不动，用 of"
SPEC_GR["GR-45"] = [
    O(1, _A), O(2, _B), O(3, _C), O(0, _B),
    GEN("This is my friend's bag.", "朋友就在眼前：'s 把 bag 抱到前面来", _A, "s-front", "GR-45 exs[1] 句框", {}, ["friend", "bag"]),
    GEN("The name of the book is long.", "书的名字：name of the book——of 把说明挂在后面", _B, "of-back", "GR-45 exs[2] 句框", {}, ["name", "book"]),
    GEN("The students in the classroom are happy.", "in the classroom 是一长串说明：挂在 students 后面", _B, "heavy-back", "GR-45 exs[0] 句框", {}, ["student", "classroom"]),
    GEN("The tail of the dog is long.", "同一件事用 of 说：the tail of the dog——和 the dog's tail 是一对", _C, "of-pair", "GR-45 exs[3] 句框", {}, ["dog", "tail"]),
    GEN("My sister's room is clean.", "姐姐的房间：人就在生活里，'s 抱到前面最顺", _A, "s-sister", "GR-45 exs[1] 句框", {}, ["sister", "room"]),
    GEN("The door of the big house is red.", "house 前面还挂着 big：太长了，'s 抱不动，换 of 挂在后面", _D, "of-long", "GR-45 exs[3] 对照框", {}, ["house", "door"]),
]


# ================================================================ TA SPEC
# 记号同 GR；TA 条目多一个 lv（yaml examples 的 level：核心组 1、拓展/边界组 2）。
def TO(idx, grp, lv=1):
    e = O(idx, grp); e["lv"] = lv; return e


def TOWN(s, note, grp, ref, chips, verb=None, lv=1):
    e = OWN(s, note, grp, ref, chips, verb); e["lv"] = lv; return e


def TGEN(s, note, grp, frame, frm, slots, chips, verb=None, lv=1):
    e = GEN(s, note, grp, frame, frm, slots, chips, verb); e["lv"] = lv; return e


SPEC_TA = {}
TA_MIN = {f"TA-{i:02d}": 10 for i in range(1, 19)}
TA_MIN["TA-18"] = 6   # 证据评议型小律：实有维度铺满 6 例（变式表见报告附录）

# ---- TA-01 两个开关（可变=时间×看法组合；不变=两开关定样子；边界=同动词翻开关对照）
_A, _B = "开关组合：时间 × 看法", "边界：同一个动词，开关一翻样子就变"
SPEC_TA["TA-01"] = [
    TO(0, _A), TO(1, _A), TO(2, _A), TO(3, _A),
    TGEN("She is singing now.", "现在 + 进行：她正在唱——两个开关都拨在「现在、进行」", _A, "combo-pres-prog", "TA-01 exs[0] 句框", {"verb": "sing"}, ["sing"], ("sing", "ing", "singing")),
    TGEN("We played football yesterday.", "过去 + 完整：昨天的球赛，一整件说完", _A, "combo-past-whole", "TA-01 exs[1] 句框", {"verb": "play", "obj": "football"}, ["play", "football"], ("play", "past", "played")),
    TGEN("It rains a lot in summer.", "现在 + 习惯：夏天总下雨——说的是老样子", _A, "combo-pres-habit", "TA-01 句框", {"verb": "rain"}, ["rain"], ("rain", "3sg", "rains")),
    TGEN("He will play tomorrow.", "将来要借 will：时间开关拨到明天，看法还是完整一件", _A, "combo-future", "TA-01 exs[1] 句框", {"verb": "play"}, ["play"]),
    TGEN("I read books every day.", "read 先站完整看法这边：天天读——习惯", _B, "flip-read-habit", "TA-01 对照框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "base", "read"), lv=2),
    TGEN("I am reading a book now.", "还是 read：开关翻到进行，样子马上变成 am reading", _B, "flip-read-prog", "TA-01 对照框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "ing", "reading"), lv=2),
]

# ---- TA-02 两件衣裳（可变=哪件衣裳；不变=动词只有现在/过去两式；边界=将来借衣裳）
_A, _B, _C = "现在衣裳", "过去衣裳", "边界：将来没有自己的衣裳，要借小帮手"
SPEC_TA["TA-02"] = [
    TO(0, _A), TO(1, _B), TO(2, _C), TO(3, _C),
    TGEN("She reads books.", "她平时读书：现在衣裳，she 后面 reads 戴 -s", _A, "pres", "TA-02 exs[0] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "3sg", "reads")),
    TGEN("He went home yesterday.", "他昨天回家：过去衣裳 went，整个词换了样", _B, "past", "TA-02 exs[1] 句框", {"verb": "go"}, ["go", "home"], ("go", "past", "went")),
    TGEN("They watched TV last night.", "昨晚看电视：过去衣裳是规规矩矩的 -ed", _B, "past-ed", "TA-02 exs[1] 句框", {"verb": "watch"}, ["watch"], ("watch", "past", "watched")),
    TGEN("We will play football tomorrow.", "明天的球赛：借 will 的力气说将来", _C, "will", "TA-02 exs[2] 句框", {"verb": "play", "obj": "football"}, ["play", "football"], lv=2),
    TGEN("I am going to read a book.", "我打算读本书：借 going to 说已经想好的将来", _C, "going-to", "TA-02 exs[3] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], lv=2),
    TGEN("We are going to have a test tomorrow.", "明天有考试：这是排好的将来，也用 going to 借力气", _C, "going-to-test", "TA-02 exs[3] 句框", {}, [], lv=2),
]

# ---- TA-03 录像两种看法（可变=站远看/推进看；不变=同一件事两种看法都对；边界=背景与主线分工）
_A, _B, _C = "站远看：一整件", "镜头推进去：只看中间一段", "边界：进行当背景，过去当主线"
SPEC_TA["TA-03"] = [
    TO(0, _A), TO(2, _A), TO(1, _B), TO(3, _B),
    TGEN("She cooked dinner.", "她做晚饭：站远看，做完了整件", _A, "whole-cook", "TA-03 exs[0] 句框", {"verb": "cook"}, ["cook"], ("cook", "past", "cooked")),
    TGEN("She was cooking dinner.", "还是她做晚饭：镜头推进去，只看正在做的中间一段", _B, "prog-cook", "TA-03 exs[1] 句框", {"verb": "cook"}, ["cook"], ("cook", "ing", "cooking")),
    TGEN("The boys played football.", "男孩们踢球：整场说完", _A, "whole-play", "TA-03 exs[2] 句框", {"verb": "play", "obj": "football"}, ["play", "football"], ("play", "past", "played")),
    TGEN("The boys were playing football.", "镜头推进去：他们正在踢的那一段", _B, "prog-play", "TA-03 exs[3] 句框", {"verb": "play", "obj": "football"}, ["play", "football"], ("play", "ing", "playing")),
    TGEN("We were walking home when it rained.", "走路是背景（进行），下雨是主线（过去）：两件事分工合作", _C, "bg-main", "TA-03 exs[3] 句框", {"verb": "walk"}, ["walk", "home"], ("walk", "ing", "walking"), lv=2),
    TGEN("I was reading a book when he came in.", "读书是背景，他进来是主线：镜头停在书上，进门的事一闪而过", _C, "bg-main2", "TA-03 exs[3] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "ing", "reading"), lv=2),
]

# ---- TA-04 一眨眼的现在（可变=正在/习惯/真理；不变=现在装不下整件事；边界=一句话里两个现在打架又合作）
_A, _B, _C, _D = "正在发生：钻进镜头里", "习惯与老道理：一般现在时", "边界：一句话里，正在和习惯同框", "再认一个正在发生的"
SPEC_TA["TA-04"] = [
    TO(0, _A), TO(3, _A), TO(1, _B), TO(2, _B),
    TGEN("I am writing now.", "我正在写：now 一喊，句子就钻进镜头里", _A, "now-write", "TA-04 exs[0] 句框", {"verb": "write"}, ["write"], ("write", "ing", "writing")),
    TGEN("He reads books every day.", "他天天读书：every day 是习惯的标记，用一般现在时", _B, "habit-read", "TA-04 exs[1] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "3sg", "reads")),
    TGEN("She teaches English.", "她教英语：这是她的职业——老道理，也用一般现在时", _B, "truth-job", "TA-04 exs[2] 句框", {"verb": "teach"}, ["teach"], ("teach", "3sg", "teaches")),
    TGEN("Look! She is dancing.", "看！她正在跳舞：Look 一喊，镜头就推过去了", _D, "now-dance", "TA-04 exs[3] 句框", {"verb": "dance"}, ["dance"], ("dance", "ing", "dancing")),
    TGEN("They play football on Sundays.", "他们周日踢球：on Sundays 说的是习惯，不是现在这一场", _B, "habit-sundays", "TA-04 exs[1] 句框", {"verb": "play", "obj": "football"}, ["play", "football"]),
    TGEN("I am reading now, but I read books every day.", "同一句话里两个 read：前半是正在读，后半是天天读——分工很清楚", _C, "both-now", "TA-04 对照框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "ing", "reading"), lv=2),
]

# ---- TA-05 完成时看痕迹（可变=四种用法；不变=锚点在现在；边界=痕迹必须落在现在）
_A, _B, _C, _D, _E = "结果用法：印子是现在的状态", "经历用法：印子是经验本身", "近况用法：刚刚发生", "持续用法：一直连到现在", "边界：先分清是哪种用法"
SPEC_TA["TA-05"] = [
    TO(0, _A), TO(1, _B), TO(2, _A), TO(3, _D),
    TGEN("I have eaten breakfast.", "我吃过早饭了：印子是现在不饿——结果用法", _A, "result-eat", "TA-05 exs[2] 句框", {"verb": "eat"}, ["eat"], ("eat", "pp", "eaten")),
    TGEN("She has read the book.", "她读过这本书：印子是她知道里面讲什么", _B, "exp-read", "TA-05 exs[1] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "pp", "read")),
    TGEN("I have just had lunch.", "我刚吃完午饭：just 把事情拉到刚刚——近况用法", _C, "recent-just", "TA-05 句框", {"verb": "have"}, ["have"], ("have", "pp", "had")),
    TGEN("He has known Tom for two years.", "他认识 Tom 两年了，而且现在还认识：持续用法", _D, "persist-know", "TA-05 exs[3] 句框", {"verb": "know"}, ["know"], ("know", "pp", "known")),
    TGEN("Have you ever been to the zoo?", "问经历用 ever：你去过动物园吗——印子是经验", _B, "exp-ever", "TA-05 exs[1] 句框", {}, []),
    TGEN("She has broken her cup.", "她的杯子摔坏了：印子就是现在这个坏杯子——先认出它是结果用法", _E, "which-use", "TA-05 exs[0] 句框", {"verb": "break", "obj": "cup"}, ["break", "cup"], ("break", "pp", "broken"), lv=2),
]

# ---- TA-06 完成时的眼睛（可变=时间词种类；不变=不点名过去时刻；边界=this week 还没过完）
_A, _B, _C, _D = "不点名时刻：完成时", "点名过去时刻：用过去时", "since 跟起点，for 跟时段", "边界：this week 还没过完，可以用完成时"
SPEC_TA["TA-06"] = [
    TO(1, _A), TO(0, _B), TO(2, _C),
    TGEN("We have known Sam for two years.", "for 后面跟时段（两年）：这段时间一直连到现在", _C, "for-period", "TA-06 exs[2] 句框", {"verb": "know"}, ["know"], ("know", "pp", "known")),
    TGEN("I have just eaten.", "just 是「刚刚」：它指着现在，不算点名过去时刻", _A, "just", "TA-06 exs[1] 句框", {"verb": "eat"}, ["eat"], ("eat", "pp", "eaten")),
    TGEN("He played football yesterday.", "yesterday 一出现，眼睛被掰回过去：只能用过去时", _B, "yesterday-past", "TA-06 exs[0] 句框", {"verb": "play", "obj": "football"}, ["play", "football"], ("play", "past", "played")),
    TGEN("Have you finished?", "没点名任何时刻，只问现在好没好：用完成时问", _A, "ask-perfect", "TA-06 exs[1] 句框", {"verb": "finish"}, ["finish"], ("finish", "pp", "finished")),
    TGEN("I have never seen snow.", "never 说的是到现在为止一次都没有：完成时管这个", _A, "never", "TA-06 exs[1] 句框", {"verb": "see", "obj": "snow"}, ["see", "snow"], ("see", "pp", "seen")),
    TGEN("She has lived here since 2021.", "since 后面跟起点（2021 年）：从那时一直到现在", _C, "since-start", "TA-06 exs[2] 句框", {"verb": "live"}, ["live"], ("live", "pp", "lived")),
    TGEN("She has read three books this week.", "this week 还没过完：这段时间连着现在，完成时站得住", _D, "this-week", "TA-06 对照框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "pp", "read"), lv=2),
]

# ---- TA-07 动词的形状（可变=三种形状；不变=形状决定能不能套进行镜头；边界=状态动词保持原样）
_A, _B, _C, _D = "状态：静止的牌子", "活动：可以一直转的轮子", "终点：有头有尾的一段路", "边界：状态动词套不上进行时"
SPEC_TA["TA-07"] = [
    TO(0, _A), TO(1, _B), TO(2, _C), TO(3, _C),
    TGEN("I like music.", "喜欢是状态：它是一块牌子，不是一个动作", _A, "state-like", "TA-07 exs[0] 句框", {}, ["music"]),
    TGEN("She is swimming.", "游泳是活动：轮子可以一直转，进行时套得上", _B, "activity-swim", "TA-07 exs[1] 句框", {"verb": "swim"}, ["swim"], ("swim", "ing", "swimming")),
    TGEN("He wrote a letter.", "写一封信有头有尾：写完，路就走完了——终点型", _C, "telic-write", "TA-07 exs[2] 句框", {"verb": "write", "obj": "letter"}, ["write", "letter"], ("write", "past", "wrote")),
    TGEN("The baby is sleeping.", "睡觉也是活动：没有明确终点，镜头套得上", _B, "activity-sleep", "TA-07 exs[1] 句框", {"verb": "sleep"}, ["sleep"], ("sleep", "ing", "sleeping")),
    TGEN("They made a cake.", "做蛋糕是终点型：蛋糕出现，事情就完成", _C, "telic-make", "TA-07 exs[2] 句框", {"verb": "make", "obj": "cake"}, ["make", "cake"], ("make", "past", "made")),
    TGEN("She has a dog.", "「有」是状态：has a dog 只能这样站着，不能变成 is having", _D, "state-have", "TA-07 exs[0] 对照框", {"verb": "have", "obj": "dog"}, ["have", "dog"], ("have", "3sg", "has"), lv=2),
]

# ---- TA-08 过去式推远（可变=推远的用途；不变=距离感；边界=没推远的现在时对照）
_A, _B, _C, _D = "推远一：客客气气", "推远二：假设一下", "推远三：转述别人说的话", "边界：不推远的说法长这样"
SPEC_TA["TA-08"] = [
    TO(0, _A), TO(1, _B), TO(2, _C),
    TGEN("Could you help me?", "could 是 can 推远的样子：问得更客气", _A, "could", "TA-08 exs[0] 句框", {"verb": "help"}, ["help"]),
    TGEN("I wanted to ask a question.", "wanted 把话推远：我想问个问题——软乎乎的开口", _A, "wanted", "TA-08 exs[0] 句框", {"verb": "want"}, ["want"], ("want", "past", "wanted")),
    TGEN("If I had a dog, I would play with it.", "我其实没有狗：had 把话推到假的世界里", _B, "if-had", "TA-08 exs[1] 句框", {"verb": "have", "obj": "dog"}, ["have", "dog"], ("have", "past", "had")),
    TGEN("She said she was tired.", "她说她累了：转述时 was 跟着前面的 said 一起往过去退", _C, "reported-tired", "TA-08 exs[2] 句框", {}, []),
    TGEN("He told me he was happy.", "他告诉我他很开心：happy 前面的 is 退成 was", _C, "reported-happy", "TA-08 exs[2] 句框", {}, ["happy"]),
    TGEN("Would you like some tea?", "Would you like 是最客气的请法：would 也是推远的", _A, "would-like", "TA-08 exs[0] 句框", {"obj": "tea"}, ["tea"]),
    TGEN("I wonder if you can help me.", "不推远的版本用 can 和 wonder：直来直去，也没错", _D, "no-distance", "TA-08 exs[0] 对照框", {"verb": "help"}, ["help"], lv=2),
]

# ---- TA-09 旗子插在过去（可变=旗子位置；不变=先于过去某点；边界=顺序清楚时过去时自己能干）
_A, _B, _C = "had + 过去分词：比过去还早", "换个场景，还是先发生的那件", "边界：顺序已经说清楚，过去时自己也能干"
SPEC_TA["TA-09"] = [
    TO(0, _A), TO(1, _A), TO(2, _A),
    TGEN("The film had started when we came in.", "电影先开始（had started），我们后进来：旗子插在「进来」这一刻", _A, "had-started", "TA-09 exs[0] 句框", {"verb": "start"}, ["start"], ("start", "pp", "started")),
    TGEN("She had written three letters before lunch.", "午饭之前，她已经写完三封信：had written 站在更前面", _B, "had-written", "TA-09 exs[1] 句框", {"verb": "write", "obj": "letter"}, ["write", "letter"], ("write", "pp", "written")),
    TGEN("After I had eaten, I did my homework.", "after 把顺序挑明：先吃完（had eaten），再做作业", _A, "after-had", "TA-09 exs[1] 句框", {"verb": "eat"}, ["eat"], ("eat", "pp", "eaten")),
    TGEN("He had never ridden a bike before.", "在那之前他从没骑过车：had never ridden 说的是更早的经历", _B, "had-never", "TA-09 exs[2] 句框", {"verb": "ride", "obj": "bike"}, ["ride", "bike"], ("ride", "pp", "ridden")),
    TGEN("Mum had cooked dinner when Dad came home.", "妈妈先做好饭，爸爸后到家：had cooked 排在 came 前面", _B, "had-cooked", "TA-09 exs[0] 句框", {"verb": "cook"}, ["cook"], ("cook", "pp", "cooked")),
    TGEN("I had lost my key, so I was very sad.", "钥匙先丢（had lost），我后来才难过：丢在难过之前", _B, "had-lost", "TA-09 exs[2] 句框", {"verb": "lose", "obj": "key"}, ["lose", "key"], ("lose", "pp", "lost")),
    TGEN("I finished my homework and went to bed.", "and 把顺序排好了：这时不用 had，过去时自己就够", _C, "and-enough", "TA-09 对照框", {"verb": "finish", "obj": "homework"}, ["finish", "homework"], ("finish", "past", "finished"), lv=2),
]

# ---- TA-10 will 的老习惯（可变=will 的用途；不变=带着「愿意」的味；边界=won't 是拒绝）
_A, _B, _C, _D = "当场答应：好，我来", "拍胸脯保证与预测", "边界：won't 是「我不愿意」", "will 借意愿味来请托"
SPEC_TA["TA-10"] = [
    TO(0, _A), TO(1, _B), TO(2, _A),
    TGEN("I will be careful.", "我保证小心：will 在这里是拍胸脯", _B, "promise", "TA-10 exs[2] 句框", {}, []),
    TGEN("Will you come?", "问你愿不愿意来：will 问的是意愿，不只是时间", _D, "ask-will", "TA-10 exs[0] 句框", {"verb": "come"}, ["come"]),
    TGEN("She will win.", "她会赢：这是预测——will 的老本行是「我看好」", _B, "predict-win", "TA-10 exs[1] 句框", {"verb": "win"}, ["win"], ("win", "base", "win")),
    TGEN("I will call you.", "我会打给你的：当场答应下来", _A, "promise-call", "TA-10 exs[0] 句框", {"verb": "call"}, ["call"]),
    TGEN("It will be cold tomorrow.", "明天会冷：预测天气也用 will", _B, "predict-cold", "TA-10 exs[1] 句框", {}, ["cold"]),
    TGEN("I won't go.", "won't 是 will not：我不去——里面有「不愿意」的劲", _C, "wont", "TA-10 对照框", {"verb": "go"}, ["go"], lv=2),
    TGEN("Will you hold my bag?", "请你帮我拿包：will 在这里借的是「你愿意吗」", _D, "request-hold", "TA-10 exs[0] 句框", {"verb": "hold", "obj": "bag"}, ["hold", "bag"], lv=2),
]

# ---- TA-11 going to 的上路感（可变=苗头/打算；不变=已经发动；边界=苗头要有看得见的证据）
_A, _B, _C = "有苗头：看得见证据", "有打算：已经想好了", "边界：苗头要指得出证据"
SPEC_TA["TA-11"] = [
    TO(0, _A), TO(1, _B), TO(2, _B),
    TGEN("He is going to be late.", "他要迟到了：看他跑的样子，苗头已经很明显", _A, "sign-late", "TA-11 exs[0] 句框", {}, ["late"]),
    TGEN("We are going to play football this afternoon.", "下午踢球是定好的打算：人已经在路上了", _B, "plan-play", "TA-11 exs[1] 句框", {"verb": "play", "obj": "football"}, ["play", "football"]),
    TGEN("I am going to read this book.", "我要读这本书：书都拿出来了，打算很明确", _B, "plan-read", "TA-11 exs[2] 句框", {"verb": "read", "obj": "book"}, ["read", "book"]),
    TGEN("She is going to visit her friend.", "她要去看朋友：这是安排好的，不是随便说说", _B, "plan-visit", "TA-11 exs[1] 句框", {"verb": "visit", "obj": "friend"}, ["visit", "friend"]),
    TGEN("They are going to sing a song.", "他们要唱一首歌：节目已经排上了", _B, "plan-sing", "TA-11 exs[2] 句框", {"verb": "sing", "obj": "song"}, ["sing", "song"]),
    TGEN("It is going to be a hot day.", "看这天色，今天要热：going to 后面跟 be，说的是看出来的将来", _A, "sign-hot", "TA-11 exs[0] 句框", {}, ["hot", "day"]),
    TGEN("Look! The baby is going to cry.", "看，宝宝要哭了：眼泪就是证据——苗头指得出来，才用 going to", _C, "sign-cry", "TA-11 exs[0] 对照框", {"verb": "cry"}, ["cry"], lv=2),
]

# ---- TA-12 完成时长出来（可变=语序滑动的位置；不变=have + 分词是核心；边界=被动与光杆 have）
_A, _B, _C = "老样子：have + 东西 + 分词（重心在东西）", "新样子：have + 分词 + 东西（重心在人）", "边界：这两个长得像，意思不一样"
SPEC_TA["TA-12"] = [
    TO(0, _A), TO(1, _B),
    TGEN("He has the letter written.", "老样子换个人：信还是站在中间——古人先看重「信在我手里」", _A, "old-he", "TA-12 exs[0] 句框", {"verb": "write", "obj": "letter"}, ["write", "letter"], ("write", "pp", "written")),
    TGEN("She has written a letter.", "新样子：written 紧跟着 has，重心回到「她写过」", _B, "new-she", "TA-12 exs[1] 句框", {"verb": "write", "obj": "letter"}, ["write", "letter"], ("write", "pp", "written")),
    TGEN("I have written a letter.", "还是新样子：写信的人是我", _B, "new-I", "TA-12 exs[1] 句框", {"verb": "write", "obj": "letter"}, ["write", "letter"], ("write", "pp", "written")),
    TGEN("We have written two letters.", "新样子站稳了：have + written + 东西，这个顺序一直用到今天", _B, "new-we", "TA-12 exs[1] 句框", {"verb": "write", "obj": "letter"}, ["write", "letter"], ("write", "pp", "written")),
    TGEN("I have read the book.", "换个动词，还是新样子：read 的分词和原形长得一样", _B, "new-read", "TA-12 exs[1] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "pp", "read")),
    TGEN("I have eaten lunch.", "吃也一样：have eaten——完成时的现代样子", _B, "new-eat", "TA-12 exs[1] 句框", {"verb": "eat"}, ["eat"], ("eat", "pp", "eaten")),
    TGEN("She has lost her key.", "今天最常见的完成时：重心全在「她」身上——路走完了", _B, "new-lost", "TA-12 exs[1] 句框", {"verb": "lose", "obj": "key"}, ["lose", "key"], ("lose", "pp", "lost")),
    TGEN("The letter is written.", "这是被动：信是被写的——没有 have，别和老样子认错门", _C, "passive", "TA-12 对照框", {"verb": "write", "obj": "letter"}, ["write", "letter"], ("write", "pp", "written"), lv=2),
    TGEN("I have a letter.", "只有 have、没有分词：这只是「我有一封信」，完成时还没长出来", _C, "have-only", "TA-12 对照框", {"obj": "letter"}, ["letter"], lv=2),
]

# ---- TA-13 时刻表式现在时（可变=哪种时刻表；不变=定死的事借现在时；边界=自己的打算不用这式）
_A, _B, _C = "时刻表：早就定死的事", "边界：自己的打算，要用 going to", "学校与日程"
SPEC_TA["TA-13"] = [
    TO(0, _A), TO(1, _C), TO(2, _A),
    TGEN("The bus leaves at seven.", "公交时刻表：七点发车，定死了——用现在时 leaves", _A, "bus", "TA-13 exs[0] 句框", {"verb": "leave"}, ["leave"], ("leave", "3sg", "leaves")),
    TGEN("The shop opens at nine.", "商店九点开门：这是挂出来的营业时间", _A, "shop", "TA-13 exs[0] 句框", {"verb": "open"}, ["open"], ("open", "3sg", "opens")),
    TGEN("The train comes at five.", "火车五点到：时刻表上印着的", _A, "train-come", "TA-13 exs[0] 句框", {"verb": "come"}, ["come"], ("come", "3sg", "comes")),
    TGEN("The lesson finishes at four.", "这节课四点下课：课表定死的结束时间", _C, "lesson", "TA-13 exs[1] 句框", {"verb": "finish"}, ["finish"], ("finish", "3sg", "finishes")),
    TGEN("The film ends at nine.", "电影九点散场：场次表上写好的", _A, "film-end", "TA-13 exs[2] 句框", {"verb": "end"}, ["end"], ("end", "3sg", "ends")),
    TGEN("My birthday is tomorrow.", "我的生日在明天：日子早就定在日历上，也用现在时 is", _C, "birthday", "TA-13 exs[1] 句框", {}, []),
    TGEN("I am going to visit Grandma tomorrow.", "去看奶奶是我自己的打算，不是时刻表：这时不用 leaves 那一式，要用 going to", _B, "own-plan", "TA-11 exs[1]（App 登记材料）句框", {"verb": "visit"}, ["visit"], lv=2),
]

# ---- TA-14 把过去演在现场（可变=故事的哪一拍；不变=现在时让听众站进现场；边界=演完回到过去时落地）
_A, _B, _C = "演现场：过去的事用现在时演", "边界：演完，回到过去时收尾", "接着演：动作连环"
SPEC_TA["TA-14"] = [
    TO(0, _A), TO(1, _A),
    TGEN("He runs to the door.", "他跑向门口：runs 是现在时，听的人像站在门口看", _A, "run-door", "TA-14 exs[0] 句框", {"verb": "run", "obj": "door"}, ["run", "door"], ("run", "3sg", "runs")),
    TGEN("She opens the box and finds a letter!", "她打开盒子，发现一封信：opens、finds 全是现场直播", _C, "open-find", "TA-14 exs[0] 句框", {"verb": "open", "obj": "box"}, ["open", "box", "letter"], ("open", "3sg", "opens")),
    TGEN("Then the teacher comes in and smiles.", "老师走进来，笑了：comes、smiles 把画面继续往前推", _C, "teacher-come", "TA-14 exs[1] 句框", {"verb": "come"}, ["come", "teacher"], ("come", "3sg", "comes")),
    TGEN("Suddenly, a bird flies in!", "突然，一只鸟飞进来：flies 也是现在时，吓你一跳", _A, "bird-fly", "TA-14 exs[1] 句框", {"verb": "fly"}, ["fly"], ("fly", "3sg", "flies")),
    TGEN("Mum calls, and the baby cries.", "妈妈喊，宝宝哭：calls、cries 一起把声音演出来", _C, "call-cry", "TA-14 exs[0] 句框", {"verb": "call"}, ["call", "cry"], ("call", "3sg", "calls")),
    TGEN("He looks back and waves.", "他回头挥挥手：looks、waves 还是现场", _C, "look-wave", "TA-14 exs[0] 句框", {"verb": "look"}, ["look"], ("look", "3sg", "looks")),
    TGEN("So she says, 'Stop!'", "她喊道「停」:says 把话也演在现场", _A, "says", "TA-14 exs[1] 句框", {"verb": "say"}, ["say"], ("say", "3sg", "says")),
    TGEN("He was happy at last.", "演完了：was 把故事带回过去时，稳稳落地", _B, "back-past", "TA-14 对照框", {}, ["happy"], lv=2),
]

# ---- TA-15 时间藏在动词里（可变=时间词；不变=词换形必须跟着换；边界=be 也要换形）
_A, _B, _C = "时间词一换，动词形必须跟着换", "边界：be 的形也要跟着换", "天天如此：形不变，靠 every day"
SPEC_TA["TA-15"] = [
    TO(0, _A), TO(1, _A),
    TGEN("I play football today.", "今天：play 用现在形——时间词和形一起出现", _A, "today-play", "TA-15 exs[0] 对照框", {"verb": "play", "obj": "football"}, ["play", "football"], ("play", "base", "play")),
    TGEN("I will play football tomorrow.", "换到明天：要请 will 来——形还是要变，只不过是借帮手变（和原句的 played 正好凑成一对）", _A, "tomorrow-play", "TA-15 exs[1] 句框", {"verb": "play", "obj": "football"}, ["play", "football"]),
    TGEN("We will go to school tomorrow.", "我们明天去上学：和原句 I will go 是同一家——主语换了，will 不变", _A, "tomorrow-go", "TA-15 exs[1] 句框", {"verb": "go"}, ["go", "school"]),
    TGEN("We go to school today.", "我们今天去上学：go 是现在形", _A, "today-go", "TA-15 exs[1] 对照框", {"verb": "go"}, ["go", "school"], ("go", "base", "go")),
    TGEN("We went to school yesterday.", "换成昨天：go 换成 went，整个词都变了", _A, "yesterday-go", "TA-15 exs[0] 句框", {"verb": "go"}, ["go", "school"], ("go", "past", "went")),
    TGEN("He watches TV every day.", "天天的事：watches 的形不变，时间靠 every day 说——这种时候词和形分工", _C, "everyday", "TA-15 对照框", {"verb": "watch"}, ["watch"], ("watch", "3sg", "watches")),
    TGEN("Yesterday I was at home.", "昨天：连 be 都要换成 was——藏形的地方一个都跑不掉", _B, "was", "TA-15 exs[0] 对照框", {}, ["home"], lv=2),
    TGEN("Tomorrow I will be at home.", "明天：be 要借 will 变成 will be", _B, "will-be", "TA-15 exs[1] 对照框", {}, ["home"], lv=2),
]

# ---- TA-16 了 / 过 / 完成时（可变=对上的区域；不变=完成时管「牵连」；边界=了/过管不了的持续与否定经历）
_A, _B, _C, _D = "「了」对得上的地方：结果", "「过」对得上的地方：经历", "边界：「了 / 过」管不了的地方", "做成与经历同框"
SPEC_TA["TA-16"] = [
    TO(0, _B), TO(1, _A), TO(2, _D),
    TOWN("I did my homework yesterday.", "这是过去时：我昨天做作业了——点名昨天，就不能用完成时（本条病例的对句）", _A, "yaml error_cases right", ["homework"], ("do", "past", "did"), lv=2),
    TGEN("I have eaten lunch.", "我吃过午饭了：这里的完成时和「了」对得上——吃完，结果还在", _A, "le-eat", "TA-16 exs[1] 句框", {"verb": "eat"}, ["eat"], ("eat", "pp", "eaten")),
    TGEN("She has been to the zoo.", "她去过动物园：这里和「过」对得上——说的是经历", _B, "guo-zoo", "TA-16 exs[0] 句框", {}, []),
    TGEN("We have read the book.", "我们读过这本书，也读完了：这一句「过」和「了」都沾一点", _D, "both-read", "TA-16 exs[0] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "pp", "read")),
    TGEN("He has just finished.", "他刚做完：just 把「刚刚」说出来，完成时和「了」在这里合作", _A, "le-just", "TA-16 exs[1] 句框", {"verb": "finish"}, ["finish"], ("finish", "pp", "finished")),
    TGEN("I have known her for a year.", "我认识她一年了（现在还认识）：这个「持续」，汉语的「了」说不出来，完成时管", _C, "persist-year", "TA-16 对照框", {"verb": "know"}, ["know"], ("know", "pp", "known"), lv=2),
    TGEN("She has never eaten noodles.", "她从来没吃过面条：never 的经历否定，汉语要换一整句说法才行", _C, "never-exp", "TA-16 对照框", {"verb": "eat"}, ["eat"], ("eat", "pp", "eaten"), lv=2),
    TGEN("The rain has stopped.", "雨停了：停的结果留到现在——完成时在这里和「了」握手", _A, "le-stop", "TA-16 exs[1] 句框", {"verb": "stop", "obj": "rain"}, ["stop", "rain"], ("stop", "pp", "stopped")),
]

# ---- TA-17 时态的长大顺序（可变=哪个高频过去式；不变=天天用的先学会；边界=混着说才浮出大表）
_A, _B, _C = "先学会的：天天用的过去式", "讲故事练出来的", "边界：大表是混着用浮出来的"
SPEC_TA["TA-17"] = [
    TO(0, _A), TO(1, _A), TO(2, _A),
    TGEN("I got up at seven.", "got 是 get 的过去式：起床天天说，先学会它", _A, "got-up", "TA-17 exs[2] 句框", {"verb": "get"}, ["get"], ("get", "past", "got")),
    TGEN("We ate lunch at school.", "ate 天天用：吃午饭的故事里总有它", _B, "ate", "TA-17 exs[2] 句框", {"verb": "eat"}, ["eat"], ("eat", "past", "ate")),
    TGEN("He ran to school.", "ran 也是跑出来的：跑着去上学，嘴里先会说 ran", _B, "ran", "TA-17 exs[0] 句框", {"verb": "run"}, ["run"], ("run", "past", "ran")),
    TGEN("She gave me a pen.", "gave 在故事里出场率高：她给了我一支笔", _B, "gave", "TA-17 exs[1] 句框", {"verb": "give", "obj": "pen"}, ["give", "pen"], ("give", "past", "gave")),
    TGEN("They came home late.", "came 也是先行部队：他们很晚才到家", _A, "came", "TA-17 exs[0] 句框", {"verb": "come"}, ["come", "home"], ("come", "past", "came")),
    TGEN("I went home, ate dinner, and slept.", "一口气讲完一天：went、ate、slept 排着队来——大表就是这样浮出来的", _C, "chain-day", "TA-17 对照框", {"verb": "go"}, ["go", "home"], ("go", "past", "went"), lv=2),
    TGEN("The boy took the book and ran.", "男孩拿了书就跑：took 和 ran 连着用，故事就顺了", _C, "chain-took", "TA-17 对照框", {"verb": "take", "obj": "book"}, ["take", "book"], ("take", "past", "took"), lv=2),
]

# ---- TA-18 证据评议（小律铺满 6：标本句 × 教法对照 + 诚实边界）
_A, _B = "标本句：拿完成时家族轮流当标本", "边界：证据只到青少年与成人，小学生还要继续看"
SPEC_TA["TA-18"] = [
    TO(0, _A),
    TGEN("I have been to Beijing.", "标本二（经历用法）：讲「看痕迹」时，老师会问——去过北京的印子是什么？是经验本身", _A, "specimen-exp", "TA-05 exs[1]（同族登记例）句框", {}, []),
    TGEN("I have finished my homework.", "标本三（结果用法）：印子是现在可以玩了——这句最容易看出「痕迹」", _A, "specimen-result", "TA-05 exs[2]（同族登记例）句框", {"verb": "finish", "obj": "homework"}, ["finish", "homework"], ("finish", "pp", "finished")),
    TGEN("We have lived here for three years.", "标本四（持续用法）：印子是一直住到现在——牵连看得见", _A, "specimen-persist", "TA-05 exs[3]（同族登记例）句框", {"verb": "live"}, ["live"], ("live", "pp", "lived")),
    TGEN("I have seen him.", "标本五：这句常被拿来和过去时对照——对照着讲可以，说哪种教法「已经被证明更好」，证据还不够", _B, "specimen-contrast", "TA-06 exs[1]（同族登记例）句框", {"verb": "see"}, ["see"], ("see", "pp", "seen"), lv=2),
    TGEN("I lost my key yesterday.", "标本的对照句：它是过去时——研究里比较的是两种讲法，不是两种句子谁对谁错", _B, "specimen-past", "TA-05 exs[0] 变式框", {"verb": "lose", "obj": "key"}, ["lose", "key"], ("lose", "past", "lost"), lv=2),
]


# 原例注清洗表（CO 清洗波同口径：s/英文句逐字不动，只把命中扫描表的原注改写成孩子白话；
# 改写前后对照随波次报告登记。键=(律, 原例下标)）
NOTE_REWRITES = {
    ("GR-24", 3): "先来、再看、后拿：说的顺序就是发生的顺序",
    ("GR-39", 0): "美国版：把球队看成一个整体，用单数 is",
    ("GR-39", 1): "英国版：把球队看成一群人，用复数 are",
    ("TA-02", 3): "借 going to 谈将来：看云就知道要下雨（TA-11 里还会遇见它）",
    ("TA-05", 0): "钥匙丢了——印子是现在进不了门（结果用法）",
    ("TA-05", 1): "去过北京——印子是经验本身（经历用法；这一句站在边界上）",
    ("TA-08", 0): "礼貌句型——用 wondered 把请求推远一点，听起来更柔和",
    ("TA-08", 1): "假设句型——were 是把事情推到「假如」里",
    ("TA-08", 2): "转述时把 is 推成 was——时态后退也是推远",
    ("TA-10", 0): "门铃响了当场答应——will 的意愿味儿还留着",
    ("TA-11", 0): "眼前有预兆的将来：看云识天气",
    ("TA-12", 0): "老句式再现：重心在「写好的信在我手里」",
    ("TA-13", 0): "时刻表上的将来用现在时",
    ("TA-14", 0): "故事高潮处把过去拉到眼前：opens 用现在时，是演给你看的标记",
}


# ================================================================ 主机械
NOTE_SCAN = re.compile(r"登记|纲领|coreView|源：|裁定|口径")  # 任务口径扫描表（orig+new 全扫）


def load_all():
    wb_rows = json.loads(WORDBANK.read_text(encoding="utf-8"))
    wb = {r["word"]: r for r in wb_rows}
    wb_low = {r["word"].lower(): r for r in wb_rows}
    vf_rows = json.loads(VERBFORMS.read_text(encoding="utf-8"))["rows"]
    vf = {r["base"]: r for r in vf_rows}
    wm_rows = json.loads(WORDS_MASTER.read_text(encoding="utf-8"))["words"]
    wid = {}
    for r in wm_rows:
        if r.get("in_wordbank") and r.get("wordbank_id"):
            wid.setdefault(r["word"].lower(), r["wordbank_id"])
    return wb, wb_low, vf, wid


WB, WB_LOW, VF, WID = load_all()
VF_SURFACES = set()
for _b, _r in VF.items():
    VF_SURFACES |= {_b, _r["past"], _r["past_participle"], der3sg(_b), dering(_b)}
PLURALS = {derplural(w) for w in WB_LOW} | set(IRREG_PLURAL.values())
COMP_SURFACES = {_der_er(w) for w in WB_LOW} | {_der_est(w) for w in WB_LOW} | {"better", "best", "worse", "worst"}


def token_ok(tok):
    t = tok.strip("'").lower()
    if not t:
        return True
    if t.endswith("'s"):
        t = t[:-2]
    if t in ("can't",):
        t = "can"
    elif t in ("won't",):
        t = "will"
    elif t.endswith("n't"):
        t = t[:-3]
    if t in ("i'm", "it's", "let's"):
        return True
    return t in FUNCX or t in NAMES or t in WB_LOW or t in VF_SURFACES or t in PLURALS or t in COMP_SURFACES


def check_sentence(lid, s):
    # GR-21 工具卡格式「英文句 —— 中文规则」：只验英文段（中文段是该律登记的卡面格式）
    eng = s.split(" —— ")[0]
    for tok in re.findall(r"[A-Za-z']+", eng.replace("___", " ")):
        if tok.lower() in PROPER:
            continue
        if not token_ok(tok):
            fail(f"{lid}: 句子含词表外 token「{tok}」：{s}")


def check_verb(lid, s, verb):
    if not verb:
        return
    lemma, cls, surface = verb
    row = VF.get(lemma)
    if row is None:
        fail(f"{lid}: 动词 {lemma} 不在五形式表：{s}")
    expect = {"base": row["base"], "past": row["past"], "pp": row["past_participle"],
              "3sg": der3sgx(lemma), "ing": dering(lemma)}[cls]
    if expect != surface:
        fail(f"{lid}: 动词形态不一致 {lemma}/{cls} 应为 {expect}，脚本声明 {surface}：{s}")
    if not re.search(r"\b" + re.escape(surface) + r"\b", s, re.I):
        fail(f"{lid}: 声明形态 {surface} 未出现在句中：{s}")


def check_note(lid, note, strict=True):
    if not note:
        fail(f"{lid}: 例句缺注")
    if JARGON.search(note):
        fail(f"{lid}: 注含生产腔「{JARGON.search(note).group(0)}」：{note}")
    if NOTE_SCAN.search(note):
        fail(f"{lid}: 注命中扫描表：{note}")


def chips_of(lid, heads):
    out = []
    for h in heads:
        r = WB.get(h)
        if r is None:
            fail(f"{lid}: chip 锚词 {h} 不在 wordbank")
        out.append({"w": r["word"], "p": r["phonetic"], "m": r["meaning"]})
    return out


def slots_of(lid, e):
    slots = {}
    for role, head in e["slots"].items():
        r = WB.get(head)
        if r is not None:
            slots[role] = r["id"]
        elif head.lower() in FUNCX or head.lower() in NAMES or " " in head:
            slots[role] = "lit:" + head
        else:
            fail(f"{lid}: 槽位词 {head} 不在 wordbank：{e['s']}")
    return slots


def effective_count(sentences):
    return len({skeleton(s) for s in sentences})


# ---------------------------------------------------------------- GR 处理
def build_gr(master):
    byid = {x["id"]: x for x in master}
    result = {}
    report = []
    for lid, entries in SPEC_GR.items():
        law = byid.get(lid)
        if law is None or law.get("lawdata") is None:
            fail(f"{lid}: 总表无 lawdata")
        ld = law["lawdata"]
        cur = ld["exs"]
        if any("grp" in x for x in cur):
            fail(f"{lid}: exs 已带 grp（疑似已执行过）——拒绝重复填充")
        own_blob = norm(json.dumps(law, ensure_ascii=False))
        wrongs = {norm(c["wrong"]) for c in ld.get("cases", [])}
        new_exs, seen = [], set()
        mix = {"orig": 0, "own": 0, "gen": 0}
        grps = []
        for e in entries:
            grp = e["grp"]
            if grp not in grps:
                grps.append(grp)
            if e["kind"] == "orig":
                item = copy.deepcopy(cur[e["idx"]])
                item["grp"] = grp
                item["src"] = {"k": "orig"}
                s = item["s"]
                if NOTE_SCAN.search(item.get("note", "")):
                    rw = NOTE_REWRITES.get((lid, e["idx"]))
                    if rw is None:
                        fail(f"{lid}: 原例注命中扫描表且无清洗登记：{item['note']}")
                    item["note"] = rw
                    mix["rewritten"] = mix.get("rewritten", 0) + 1
            elif e["kind"] == "own":
                s = e["s"]
                if norm(s) not in own_blob:
                    fail(f"{lid}: own 句未在该律自有材料中命中：{s}（出处 {e['ref']}）")
                check_sentence(lid, s)
                check_verb(lid, s, e.get("verb"))
                check_note(lid, e["note"])
                item = {"s": s, "note": e["note"], "words": chips_of(lid, e["chips"]),
                        "grp": grp, "src": {"k": "own", "ref": e["ref"]}}
            else:
                s = e["s"]
                check_sentence(lid, s)
                check_verb(lid, s, e.get("verb"))
                check_note(lid, e["note"])
                item = {"s": s, "note": e["note"], "words": chips_of(lid, e["chips"]),
                        "grp": grp, "src": {"k": "gen", "f": e["frame"], "from": e["from"],
                                            "slots": slots_of(lid, e)}}
            key = norm(s)
            if key in seen:
                fail(f"{lid}: 例句重复：{s}")
            if key in wrongs:
                fail(f"{lid}: 例句与病例 wrong 句撞面：{s}")
            seen.add(key)
            mix[e["kind"]] += 1
            new_exs.append(item)
        eff = effective_count([x["s"] for x in new_exs])
        if eff < 10:
            fail(f"{lid}: 同构合并后有效例数 {eff} < 10（表面 {len(new_exs)}）")
        if len(grps) < 3:
            fail(f"{lid}: 分组仅 {len(grps)} 组")
        # 组块连续化（LAW 渲染器顺序出组头，交错组名会重复出头）：按组首次出现序稳定排序，组内保持登记序
        new_exs.sort(key=lambda x: grps.index(x["grp"]))
        seen_g, last_g = set(), None
        for x in new_exs:
            if x["grp"] != last_g:
                if x["grp"] in seen_g:
                    fail(f"{lid}: 分组不连续")
                seen_g.add(x["grp"])
                last_g = x["grp"]
        result[lid] = new_exs
        report.append((lid, len(cur), len(new_exs), eff, mix, len(grps)))
    return result, report


# ---------------------------------------------------------------- TA 处理
def ynorm(x):
    import datetime
    if isinstance(x, (datetime.date, datetime.datetime)):
        return x.isoformat()
    if isinstance(x, dict):
        return {str(k): ynorm(v) for k, v in x.items()}
    if isinstance(x, (list, tuple)):
        return [ynorm(v) for v in x]
    return x


def word_ids_of(lid, e):
    ids = []
    sent_toks = {t.strip("'").lower() for t in re.findall(r"[A-Za-z']+", e["s"])}
    for h in e["chips"]:
        hl = h.lower()
        if hl not in WID:
            fail(f"{lid}: chip 词 {h} 无 words_master id：{e['s']}")
        surfaces = {hl, derplural(hl)}
        if hl in VF:
            r = VF[hl]
            surfaces |= {r["past"], r["past_participle"], der3sgx(hl), dering(hl)}
        if not (surfaces & sent_toks) and not (e.get("verb") and e["verb"][0] == hl):
            fail(f"{lid}: chip 词 {h} 未出现在句中：{e['s']}")
        if WID[hl] not in ids:
            ids.append(WID[hl])
    return ids


def build_ta(master):
    byid = {x["id"]: x for x in master}
    tex = json.loads(TA_EXERCISES.read_text(encoding="utf-8"))
    tex_by = {u["unit_id"]: u for u in tex["units"]}
    result = {}
    report = []
    for lid, entries in SPEC_TA.items():
        law = byid.get(lid)
        if law is None or law.get("yaml") is None:
            fail(f"{lid}: 总表无 yaml 分仓")
        y = law["yaml"]
        cur = y.get("examples") or []
        if any("grp" in x for x in cur):
            fail(f"{lid}: yaml examples 已带 grp（疑似已执行过）——拒绝重复填充")
        own_blob = norm(json.dumps(y, ensure_ascii=False)) + norm(json.dumps(tex_by.get(lid, {}), ensure_ascii=False))
        new_exs, seen = [], set()
        mix = {"orig": 0, "own": 0, "gen": 0}
        grps = []
        for e in entries:
            grp = e["grp"]
            if grp not in grps:
                grps.append(grp)
            if e["kind"] == "orig":
                item = copy.deepcopy(cur[e["idx"]])
                item["grp"] = grp
                item["src"] = {"k": "orig"}
                s = item["sentence"]
                if NOTE_SCAN.search(item.get("scene_note", "")):
                    rw = NOTE_REWRITES.get((lid, e["idx"]))
                    if rw is None:
                        fail(f"{lid}: 原例 scene_note 命中扫描表且无清洗登记：{item['scene_note']}")
                    item["scene_note"] = rw
                    mix["rewritten"] = mix.get("rewritten", 0) + 1
            elif e["kind"] == "own":
                s = e["s"]
                if norm(s) not in own_blob:
                    fail(f"{lid}: own 句未在该律自有材料中命中：{s}（出处 {e['ref']}）")
                check_sentence(lid, s)
                check_verb(lid, s, e.get("verb"))
                check_note(lid, e["note"])
                item = {"level": e["lv"], "sentence": s, "scene_note": e["note"], "supports": "claim",
                        "word_ids": word_ids_of(lid, e), "grp": grp, "src": {"k": "own", "ref": e["ref"]}}
            else:
                s = e["s"]
                check_sentence(lid, s)
                check_verb(lid, s, e.get("verb"))
                check_note(lid, e["note"])
                item = {"level": e["lv"], "sentence": s, "scene_note": e["note"], "supports": "claim",
                        "word_ids": word_ids_of(lid, e), "grp": grp,
                        "src": {"k": "gen", "f": e["frame"], "from": e["from"], "slots": slots_of(lid, e)}}
            key = norm(s)
            if key in seen:
                fail(f"{lid}: 例句重复：{s}")
            seen.add(key)
            mix[e["kind"]] += 1
            new_exs.append(item)
        eff = effective_count([x["sentence"] for x in new_exs])
        if eff < TA_MIN[lid]:
            fail(f"{lid}: 同构合并后有效例数 {eff} < 目标 {TA_MIN[lid]}（表面 {len(new_exs)}）")
        new_exs.sort(key=lambda x: grps.index(x["grp"]))
        seen_g, last_g = set(), None
        for x in new_exs:
            if x["grp"] != last_g:
                if x["grp"] in seen_g:
                    fail(f"{lid}: 分组不连续")
                seen_g.add(x["grp"])
                last_g = x["grp"]
        result[lid] = new_exs
        report.append((lid, len(cur), len(new_exs), eff, mix, len(grps)))
    return result, report


# ---------------------------------------------------------------- yaml 块替换
def serialize_examples_block(items):
    dumped = yaml.dump(items, allow_unicode=True, default_flow_style=False,
                       sort_keys=False, width=100000)
    lines = ["  examples:"]
    for ln in dumped.rstrip("\n").split("\n"):
        lines.append("  " + ln)
    return "\n".join(lines) + "\n"


def replace_yaml_examples(text, lid, items):
    m = re.search(r"^- id: " + re.escape(lid) + r"\n", text, re.M)
    if not m:
        fail(f"{lid}: grammar_ext.yaml 无此条")
    seg_start = m.start()
    nxt = re.search(r"^- id: ", text[m.end():], re.M)
    seg_end = m.end() + nxt.start() if nxt else len(text)
    seg = text[seg_start:seg_end]
    em = re.search(r"^  examples:\n", seg, re.M)
    if not em:
        fail(f"{lid}: 条目无 examples 块")
    after = seg[em.end():]
    nm = re.search(r"^  [a-z_]+:", after, re.M)
    if not nm:
        fail(f"{lid}: examples 块后无同级键")
    block_end = em.end() + nm.start()
    new_seg = seg[:em.start()] + serialize_examples_block(items) + seg[block_end:]
    return text[:seg_start] + new_seg + text[seg_end:]


# ---------------------------------------------------------------- TN 镜像
def match_span(text, i):
    """从 text[i]（[ 或 {）起做字符串感知的括号匹配，返回结束下标（不含）。"""
    depth = 0
    in_str = False
    esc = False
    k = i
    while k < len(text):
        c = text[k]
        if in_str:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == '"':
                in_str = False
        else:
            if c == '"':
                in_str = True
            elif c in "[{":
                depth += 1
            elif c in "]}":
                depth -= 1
                if depth == 0:
                    return k + 1
        k += 1
    fail("TN DATA 括号匹配失败")


def build_tn_mirror(text, ta_result):
    """返回 (新文本, 改动日志)。只替换 DATA.TA 各单元的 ex 数组与两条过时 pending。"""
    log = []
    ai = text.index('"TA": [')
    arr_start = text.index("[", ai)
    arr_end = match_span(text, arr_start)
    arr_text = text[arr_start:arr_end]
    # 顺序扫描顶层对象，按各对象的 id 建 span 表（不能用 index 找 id：rel 里也会出现别的 id）
    unit_spans = {}
    pos = 1
    while pos < len(arr_text):
        while pos < len(arr_text) and arr_text[pos] in " \t\r\n,":
            pos += 1
        if pos >= len(arr_text) or arr_text[pos] == "]":
            break
        o_end = match_span(arr_text, pos)
        obj = json.loads(arr_text[pos:o_end])
        unit_spans[obj["id"]] = (pos, o_end, obj)
        pos = o_end
    spans = []
    for lid, items in ta_result.items():
        if lid not in unit_spans:
            fail(f"{lid}: TN DATA.TA 无此单元")
        obj_start, obj_end, u = unit_spans[lid]
        cur_sents = [x["s"] for x in u.get("ex") or []]
        orig_map = {x["s"]: x for x in u.get("ex") or []}
        new_ex = []
        for it in items:
            s = it["sentence"]
            if it["src"]["k"] == "orig":
                if s not in orig_map:
                    fail(f"{lid}: TN 镜像缺原句：{s}")
                o = dict(orig_map[s])
                o["n"] = it["scene_note"]   # 与 yaml 事实源同值（含注清洗后的注）
                o["g"] = it["grp"]
                new_ex.append(o)
            else:
                new_ex.append({"s": s, "n": it["scene_note"], "g": it["grp"]})
        obj_text = arr_text[obj_start:obj_end]
        ei = obj_text.index('"ex":')
        ex_start = obj_text.index("[", ei)
        ex_end = match_span(obj_text, ex_start)
        new_obj = obj_text[:ex_start] + json.dumps(new_ex, ensure_ascii=False) + obj_text[ex_end:]
        # 过时 pending 清理（逐字锚定，命中才动）
        for stale in STALE_PENDING.get(lid, []):
            if json.dumps(stale, ensure_ascii=False) in new_obj:
                new_obj = remove_pending_item(new_obj, stale)
                log.append(f"{lid}: 移除过时 pending「{stale[:24]}…」")
        spans.append((arr_start + obj_start, arr_start + obj_end, new_obj))
        log.append(f"{lid}: TN ex {len(cur_sents)} -> {len(new_ex)}")
    for s0, e0, rep in sorted(spans, reverse=True):
        text = text[:s0] + rep + text[e0:]
    return text, log


STALE_PENDING = {
    "TA-09": ["例证说明：本条例句为模型层形式例（清单条目未登记例句），动词与场景词均取自词库"],
    "TA-18": ["例证说明：本条为例证单薄条（证据评议型），仅登记标本句 1 例，分级例证待补至规格"],
}


def remove_pending_item(obj_text, stale):
    pi = obj_text.index('"pending":')
    p_start = obj_text.index("[", pi)
    p_end = match_span(obj_text, p_start)
    items = json.loads(obj_text[p_start:p_end])
    items = [x for x in items if x != stale]
    return obj_text[:p_start] + json.dumps(items, ensure_ascii=False) + obj_text[p_end:]


def build_lawdata_mirror(text, gr_result):
    """GR 镜像步：LAWDATA 非双户口条目的 exs 必须与总表同值（gen_laws 只对账不代写，
    CO 通路同此）。序列化用 gen_laws 的 JD 并先验稳态：JD(parse(现行字面量)) 须逐字节
    等于现行字面量，否则拦截。rel/exc 等派生字段原样保留，只换 exs。"""
    import gen_laws as gl
    w = gl.collect(text)
    s, e, parsed = w["lawdata"]
    if gl.JD(parsed) != text[s:e]:
        fail("LAWDATA 稳态自检失败：JD(parse(现行)) != 现行字面量，拒绝镜像")
    log = []
    for lid, items in gr_result.items():
        if lid not in parsed:
            fail(f"{lid}: LAWDATA 无此条目")
        parsed[lid]["exs"] = items
        log.append(f"{lid}: LAWDATA exs -> {len(items)}")
    return text[:s] + gl.JD(parsed) + text[e:], log


# ---------------------------------------------------------------- 组名修正（首轮落盘后复核登记）
def fix_group_labels():
    """两处边界组名修正（内容零增减，只动 grp 标签与组块序）：
    GR-36 原例「He was made to wait.」是被动边界例（make 被动时 to 回归），从 have 组
    析出独立边界组；GR-37 的 too 组即该律边界组，组名补「边界：」前缀与全域口径齐。
    同步改总表 lawdata 与主文件 LAWDATA 镜像；幂等（已修正则跳过）。"""
    master = json.loads(MASTER.read_text(encoding="utf-8"))
    byid = {x["id"]: x for x in master}
    changed = []
    exs36 = byid["GR-36"]["lawdata"]["exs"]
    tgt = [x for x in exs36 if x["s"] == "He was made to wait."]
    if tgt and tgt[0]["grp"] != "边界：make 一变被动，to 就回来":
        tgt[0]["grp"] = "边界：make 一变被动，to 就回来"
        order = []
        for x in exs36:
            if x["grp"] not in order:
                order.append(x["grp"])
        exs36.sort(key=lambda x: order.index(x["grp"]))
        changed.append("GR-36")
    exs37 = byid["GR-37"]["lawdata"]["exs"]
    hit37 = False
    for x in exs37:
        if x["grp"] == "too：太……以致不能":
            x["grp"] = "边界：too 是过头了——太……以致不能"
            hit37 = True
    if hit37:
        changed.append("GR-37")
    if not changed:
        print("组名修正：已是修正态，跳过")
        return
    MASTER.write_text(json.dumps(master, ensure_ascii=False, indent=1), encoding="utf-8")
    text = MAIN.read_text(encoding="utf-8")
    import gen_laws as gl
    w = gl.collect(text)
    s, e, parsed = w["lawdata"]
    if gl.JD(parsed) != text[s:e]:
        fail("LAWDATA 稳态自检失败（组名修正）")
    for lid in changed:
        parsed[lid]["exs"] = byid[lid]["lawdata"]["exs"]
    MAIN.write_text(text[:s] + gl.JD(parsed) + text[e:], encoding="utf-8")
    print("组名修正已落：", changed, "（下一步 gen_laws --write && check_all）")


# ---------------------------------------------------------------- main
def main():
    if "--fix-labels" in sys.argv:
        load_all()
        fix_group_labels()
        return
    apply = "--apply" in sys.argv
    master = json.loads(MASTER.read_text(encoding="utf-8"))
    gr_result, gr_report = build_gr(master)
    ta_result, ta_report = build_ta(master)

    print("== GR（lawdata 通路）law  前 -> 表面/有效  orig own gen  组数")
    tot = [0, 0, 0]
    for lid, b, a, eff, mix, ng in gr_report:
        for i, k in enumerate(("orig", "own", "gen")):
            tot[i] += mix[k]
        print(f"{lid}  {b:3d} -> {a:3d}/{eff:<3d}   {mix['orig']:4d} {mix['own']:3d} {mix['gen']:3d}   {ng}")
    print("GR 合计 orig/own/gen =", tot, " 总例数 =", sum(r[2] for r in gr_report))
    print("== TA（yaml 通路）law  前 -> 表面/有效  orig own gen  组数")
    tot = [0, 0, 0]
    for lid, b, a, eff, mix, ng in ta_report:
        for i, k in enumerate(("orig", "own", "gen")):
            tot[i] += mix[k]
        print(f"{lid}  {b:3d} -> {a:3d}/{eff:<3d}   {mix['orig']:4d} {mix['own']:3d} {mix['gen']:3d}   {ng}")
    print("TA 合计 orig/own/gen =", tot, " 总例数 =", sum(r[2] for r in ta_report))

    if not apply:
        # dry 也验两处镜像可构造
        text = MAIN.read_text(encoding="utf-8")
        text, log0 = build_lawdata_mirror(text, gr_result)
        print("LAWDATA 镜像（dry 构造成功）：", len(log0), "律")
        _, log = build_tn_mirror(text, ta_result)
        print("TN 镜像（dry 构造成功）：")
        for ln in log:
            print("  ", ln)
        print("（--dry：未写回；加 --apply 写回）")
        return

    # ---- 写回 1：总表（GR lawdata + TA yaml 分仓在 yaml 写回后同步）
    byid = {x["id"]: x for x in master}
    for lid, exs in gr_result.items():
        byid[lid]["lawdata"]["exs"] = exs

    # ---- 写回 2：grammar_ext.yaml 的 TA examples 块
    ytext = GRAMMAR_EXT.read_text(encoding="utf-8")
    for lid, items in ta_result.items():
        ytext = replace_yaml_examples(ytext, lid, items)
    GRAMMAR_EXT.write_text(ytext, encoding="utf-8")
    print("已写回", GRAMMAR_EXT)

    # ---- 写回 3：总表 yaml 分仓与上游同值同步
    parsed = yaml.safe_load(ytext)
    pentry = {e["id"]: e for e in parsed["entries"]}
    for lid in ta_result:
        byid[lid]["yaml"] = ynorm(pentry[lid])
    MASTER.write_text(json.dumps(master, ensure_ascii=False, indent=1), encoding="utf-8")
    print("已写回", MASTER)

    # ---- 写回 4：主文件双镜像（LAWDATA exs 与总表同值 + TN DATA.TA ex 与过时 pending）
    text = MAIN.read_text(encoding="utf-8")
    text, log0 = build_lawdata_mirror(text, gr_result)
    text, log = build_tn_mirror(text, ta_result)
    MAIN.write_text(text, encoding="utf-8")
    print("已同步主文件 LAWDATA 镜像：", len(log0), "律")
    print("已同步主文件 TN 镜像：")
    for ln in log:
        print("  ", ln)
    print("下一步：python3 tools/gen_laws.py --write && python3 tools/check_all.py")


if __name__ == "__main__":
    main()
