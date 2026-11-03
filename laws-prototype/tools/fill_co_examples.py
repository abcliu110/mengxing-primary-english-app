#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fill_co_examples.py — CO 构式族补例试点（Stewart 2026-11-03 规矩：每概念至少 10 例展开，
且分组呈现 + 每例带讲解注）。把 CO-01…CO-16 的 lawdata.exs 补到每条 ≥10 例。

落位：事实源 = model/laws_master.json 的 lawdata 分仓 exs 字段。
主文件 LAWDATA 对非双户口条目是「与总表深相等」的受检镜像：gen_laws.py 的 build_lawdata
只断言现行文件 == 总表 lawdata + 派生 rel、并不把总表内容写进 LAWDATA（区数据 PN/AR/CJ
才由它生成）。故本脚本同批把同一批新值以 gen_laws 同一 JD 字节格式写入主文件 LAWDATA
镜像，两侧深相等由 gen_laws/check_all 把关——与切换阶段以来 lawdata 改版的既有做法一致。
yaml 分仓的上游是 model/laws/grammar_ext.yaml（图鉴侧），按 check_upstream 纪律本批不动；
普查口径为多表示去重计数，lawdata 补齐即达标（报告中登记此落位决定）。

例句来源（零自由编造，三条通道，逐句在 src 字段登记）：
  orig —— 条目原登记例（本脚本只给它加 grp 分组与 src 标记，s/note/words 逐字不动）。
  own  —— 通道 1「自有材料复用」：该律 yaml/lawdata/co_qi 练习里已有、但未进 exs 的完整句
          （病例 right 句、练习题干/答案句）。脚本断言该句逐字存在于该律自有材料中。
  gen  —— 通道 2「机械组句」：句框（frame）取自该律登记例句或 App 登记材料（src.from 逐项注明），
          槽位词只许出自 wordbank 与 verb_forms_completion（含词形链）；
          动词形态由句框的人称/时态要求决定，脚本逐句校验形态与五形式表一致
          （三单/-ing 表内未立条者按拼写规则派生，规则见 der3sg/dering，与 gen_interact 先例同口径）。
          CO-12 的整块句（whole）为口语语料逐字例证句，脚本断言其在 spoken_data 中逐字存在。
  ecdict —— 通道 3：本机 ECDICT（wordfill-scratch/ecdict.csv，770,611 行）经全量扫描，
          detail（例句）字段非空仅 1 行且非例句 —— 该通道在本工作区无数据，产出 0（报告登记）。

分组（grp）：按该律机制的变式维度分组，组名为白话小标题；每律至少 1 个边界/易混对照组。
病例（wrong→right）不计入 exs 例数：CO-16 另按其自有 quiz[0] 登记错形补 1 条 cases（单列）。

校验（任一失败即停，不写回）：
  - orig 条目的 s/note 与现行 lawdata 逐字一致；
  - own/whole 句子在登记出处中逐字命中；
  - gen 句子逐 token 过词表（wordbank 词目 / 五形式形态 / 规则复数 / 功能词白名单 / 登记人名），
    且声明的动词形态与五形式表（或派生规则）一致；
  - 每律最终 exs 句面互不重复（规范化比对），且不与该律 cases 的 wrong 句撞面；
  - 每例必有 note 与 grp；新例 chips 锚词全部命中 wordbank 并逐字取其音标/释义。

用法：
  python3 tools/fill_co_examples.py --apply   # 校验全过后写回 laws_master.json
  python3 tools/fill_co_examples.py --dry     # 只校验并打印产出（不写回）
  python3 tools/fill_co_examples.py --clean-notes  # 提交前注清洗（NOTE_REWRITES 驱动，幂等）
写回后须跑：python3 tools/gen_laws.py --write && python3 tools/check_all.py
"""
import copy
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MASTER = ROOT / "model" / "laws_master.json"
MAIN = ROOT / "mengxing-prototype-v1.html"
WORDBANK = ROOT / "model" / "wordbank.json"
VERBFORMS = ROOT / "model" / "verb_forms_completion.json"
PRACTICE = ROOT / "model" / "co_qi_practice_items.json"
SPOKEN = ROOT / "model" / "spoken_data.json"

LAWS = [f"CO-{i:02d}" for i in range(1, 17)]


def fail(msg):
    print("FAIL:", msg)
    sys.exit(1)


# ---------------------------------------------------------------- 形态派生规则
IRREG_3SG = {"have": "has", "be": "is"}


def der3sg(base):
    if base in IRREG_3SG:
        return IRREG_3SG[base]
    if re.search(r"(s|x|z|ch|sh)$", base):
        return base + "es"
    if re.search(r"[^aeiou]y$", base):
        return base[:-1] + "ies"
    return base + "s"


DOUBLE = {"stop", "swim", "run", "sit", "get", "put", "cut", "dig", "drop", "plan", "shop", "clap", "skip", "chat", "rob", "beg", "hug", "nod", "pat", "rub", "shut", "win", "forget"}


def dering(base):
    if base.endswith("ie"):
        return base[:-2] + "ying"
    if re.search(r"[^aeiou]e$", base) and not base.endswith(("ee", "ye", "oe")):
        return base[:-1] + "ing"
    if base in DOUBLE:
        return base + base[-1] + "ing"
    return base + "ing"


def derplural(noun):
    if re.search(r"(s|x|z|ch|sh)$", noun):
        return noun + "es"
    if re.search(r"[^aeiou]y$", noun):
        return noun[:-1] + "ies"
    return noun + "s"


IRREG_PLURAL = {"child": "children", "man": "men", "woman": "women", "foot": "feet",
                "tooth": "teeth", "mouse": "mice", "person": "people", "sheep": "sheep", "fish": "fish"}

FUNC = set("""a an the to of in on under at by for into off over from with and or but is are was were be am
has have had do does did can could will would shall should may must i you he she we they me him her us them it
my mine his their our your this that these those some any no every two there here please now then just as than
too very not""".split())
NAMES = {"tom", "sam"}  # App 登记材料中的专名（Tom 见 GR-38 例句，Sam 见 CO-04 登记例）


# ---------------------------------------------------------------- 条目构造器
def O(idx, grp):
    return {"kind": "orig", "idx": idx, "grp": grp}


def OWN(s, note, grp, ref, chips, verb=None):
    return {"kind": "own", "s": s, "note": note, "grp": grp, "ref": ref, "chips": chips, "verb": verb}


def GEN(s, note, grp, frame, frm, slots, chips, verb=None):
    return {"kind": "gen", "s": s, "note": note, "grp": grp, "frame": frame, "from": frm,
            "slots": slots, "chips": chips, "verb": verb}


# ================================================================ SPEC（逐律条目表）
# 记号：slots 的值为 wordbank 词目（脚本解析为 id 登记进 src.slots）；verb=(词元, 形态类, 句中形态)。
SPEC = {}

# ---------------------------------------------------------------- CO-01 模具本身带意思
_A = "双宾模具：动词没说「给」"
_B = "结果模具：动词没说「变样」"
_C = "原型成员：动词自己带着这层意思"
_D = "对照组：没有模具，动词就只是动词"
SPEC["CO-01"] = [
    O(0, _A),
    GEN("She made him a cup of tea.", "make 只管「做」，「给他」是双宾模具多给的——和烤着给一个道理",
        _A, "ditrans", "CO-01 exs[0] 句框", {"verb": "make", "recip": "him", "obj": "tea"},
        ["make", "tea"], verb=("make", "past", "made")),
    GEN("They built her a small house.", "build 只管「建」，放进双宾模具就成了「为她建」",
        _A, "ditrans", "CO-01 exs[0] 句框", {"verb": "build", "recip": "her", "obj": "house"},
        ["build", "house"], verb=("build", "past", "built")),
    O(1, _B),
    GEN("She wiped the table clean.", "wipe 只管「擦」，「变成干净」是结果模具给的终点——CO-05 讲的就是这一家",
        _B, "resultative", "CO-01 exs[1] 句框", {"verb": "wipe", "obj": "table", "result": "clean"},
        ["wipe", "table", "clean"], verb=("wipe", "past", "wiped")),
    GEN("He painted the door blue.", "还是 paint、还是 door，只换结果词：模具给的是「变成蓝色」",
        _B, "resultative", "CO-01 exs[1] 句框", {"verb": "paint", "obj": "door", "result": "blue"},
        ["paint", "door", "blue"], verb=("paint", "past", "painted")),
    O(2, _C),
    GEN("Dad gave me a new bike.", "give 自己就带「给」，是双宾模具的原型成员——动词义和模具义在这里重合",
        _C, "ditrans-proto", "CO-01 exs[2] 句框", {"verb": "give", "recip": "me", "obj": "bike"},
        ["give", "bike"], verb=("give", "past", "gave")),
    OWN("He baked a cake.", "对照：句中只有一个人，bake 就只是「烤」，没有谁收到蛋糕",
        _D, "CO-01 quiz[3] 题干句", ["bake", "cake"]),
    GEN("She painted the door.", "对照：没有 red 这个终点词，paint 就只是「刷」这个动作",
        _D, "plain-transitive", "CO-01 exs[1] 去结果短语", {"verb": "paint", "obj": "door"},
        ["paint", "door"], verb=("paint", "past", "painted")),
    GEN("She made a cup of tea.", "对照：没有第二个人的时候，make 就只是「做」一杯茶，不带「给」味",
        _D, "plain-transitive", "CO-01 exs[0] 模具对照形", {"verb": "make", "obj": "tea"},
        ["make", "tea"], verb=("make", "past", "made")),
]

# ---------------------------------------------------------------- CO-02 双宾自带「给」
_A = "换个动词，给的意思还在"
_B = "换个收东西的人"
_C = "对照组：拿走第二个人，给就没了"
SPEC["CO-02"] = [
    O(0, _A), O(1, _A), O(2, _A),
    GEN("She cooked us a big dinner.", "cook 只管「做饭」，进了模具就是「做给我们吃」——动词换了，给还在",
        _A, "ditrans", "CO-02 exs[0] 句框", {"verb": "cook", "recip": "us", "obj": "dinner"},
        ["cook", "dinner"], verb=("cook", "past", "cooked")),
    GEN("They built me a small house.", "还是 build、还是小房子，只把收的人换成 me——模具的「给」照样在",
        _A, "ditrans", "CO-02 exs[2] 句框", {"verb": "build", "recip": "me", "obj": "house"},
        ["build", "house"], verb=("build", "past", "built")),
    GEN("He made them a cake.", "make 换到蛋糕上、收到的人换成 them，转移义不变",
        _A, "ditrans", "CO-02 exs[1] 句框", {"verb": "make", "recip": "them", "obj": "cake"},
        ["make", "cake"], verb=("make", "past", "made")),
    OWN("Mum baked us a cake.", "Mum 烤给「我们」吃——bake 的「给」义仍是模具供给的",
        _B, "CO-02 quiz[3] 题干句", ["bake", "cake"]),
    GEN("Dad baked me a cake.", "和前面那句只差收的人：her 换成 me，句子的「给」不减",
        _B, "ditrans", "CO-02 exs[0] 句框", {"verb": "bake", "recip": "me", "obj": "cake"},
        ["bake", "cake"], verb=("bake", "past", "baked")),
    GEN("She made him a cup of tea.", "收茶的人换成 him——「做给他喝」还是模具给的",
        _B, "ditrans", "CO-02 exs[1] 句框", {"verb": "make", "recip": "him", "obj": "tea"},
        ["make", "tea"], verb=("make", "past", "made")),
    OWN("He baked a cake.", "对照：把第二个人拿走，bake 只剩「烤」，整句没有「给」",
        _C, "CO-02 quiz[2] 题干句", ["bake", "cake"]),
    GEN("She made a cup of tea.", "对照：没有 me 站在中间，make 就只是做茶，没人「收到」",
        _C, "plain-transitive", "CO-02 exs[1] 模具对照形", {"verb": "make", "obj": "tea"},
        ["make", "tea"], verb=("make", "past", "made")),
]

# ---------------------------------------------------------------- CO-03 两道门
_A = "两关都过：短词进双宾"
_B = "意思不过关：言说类走 to 小路"
_C = "长相不过关：长词走 to 小路"
SPEC["CO-03"] = [
    O(1, _A),
    GEN("He told me a story.", "tell 是本族短词：说给谁听，东西（故事）直接跟在人后面——两关都过",
        _A, "ditrans", "CO-03 exs[1] 句框", {"verb": "tell", "recip": "me", "obj": "story"},
        ["tell", "story"], verb=("tell", "past", "told")),
    GEN("Dad bought me a new bike.", "buy 单音节、重音在前：进双宾，买给谁一目了然",
        _A, "ditrans", "CO-03 exs[1] 句框", {"verb": "buy", "recip": "me", "obj": "bike"},
        ["buy", "bike"], verb=("buy", "past", "bought")),
    GEN("She showed him the photo.", "show 也是短词：把照片给他看，双宾队形站得稳",
        _A, "ditrans", "CO-03 exs[1] 句框", {"verb": "show", "recip": "him", "obj": "photo"},
        ["show", "photo"], verb=("show", "past", "showed")),
    GEN("She wrote me a letter.", "write 写信给人：短词过长相关，双宾正形",
        _A, "ditrans", "CO-03 exs[1] 句框", {"verb": "write", "recip": "me", "obj": "letter"},
        ["write", "letter"], verb=("write", "past", "wrote")),
    O(0, _B),
    OWN("Explain this to me.", "本条病例的正形：explain 只好走 to 小路（病例在病句医院成对呈现）",
        _B, "CO-03 cases[0].right", ["explain"]),
    GEN("The teacher explained the story to us.", "还是 explain、还是走 to：换成长句也一样，它的意思里没有「交到手里」这一段",
        _B, "to-dative-blocked", "CO-03 exs[0] 句框", {"verb": "explain", "obj": "story", "recip": "us"},
        ["explain", "story", "teacher"], verb=("explain", "past", "explained")),
    O(2, _C),
    GEN("Dad donated a bike to our school.", "还是 donate：换了个捐的东西，照样只能走 to 小路——卡它的是长相，不是东西",
        _C, "to-dative-blocked", "CO-03 exs[2] 句框", {"verb": "donate", "obj": "bike"},
        ["donate", "bike", "school"], verb=("donate", "past", "donated")),
    GEN("He donated some books to our school.", "some books 换掉 books 的定指，长相关照样不过：donate 永远走 to 式",
        _C, "to-dative-blocked", "CO-03 exs[2] 句框", {"verb": "donate", "obj": "book"},
        ["donate", "book", "school"], verb=("donate", "past", "donated")),
]

# ---------------------------------------------------------------- CO-04 致使移动
_A = "动词自己带劲：踢、扔、推"
_B = "本来不及物，入模长出推动力"
_C = "换条路走：路径词变一变"
_D = "对照组：没有模具，喷嚏只是喷嚏"
SPEC["CO-04"] = [
    O(1, _A),
    GEN("She threw the ball over the fence.", "throw 和 kick 一样自带「弄过去」的劲：球飞过栅栏，路径还是 over",
        _A, "caused-motion", "CO-04 exs[1] 句框", {"verb": "throw", "obj": "ball", "path": "over the fence"},
        ["throw", "ball"], verb=("throw", "past", "threw")),
    GEN("He pushed the box to the door.", "push 是推着走：箱子被一路推到门口，路径 to 说清了终点",
        _A, "caused-motion", "CO-04 exs[1] 句框", {"verb": "push", "obj": "box", "path": "to the door"},
        ["push", "box", "door"], verb=("push", "past", "pushed")),
    GEN("Dad pulled the box to the window.", "pull 是拉着走：和 push 方向相反，模具的「弄到某处」不变",
        _A, "caused-motion", "CO-04 exs[1] 句框", {"verb": "pull", "obj": "box", "path": "to the window"},
        ["pull", "box", "window"], verb=("pull", "past", "pulled")),
    O(0, _B), O(2, _B),
    GEN("He sneezed the paper off the desk.", "还是喷嚏当发动机：只换被喷走的东西（纸）和落点（书桌）",
        _B, "caused-motion-coerced", "CO-04 exs[0] 句框", {"verb": "sneeze", "obj": "paper", "path": "off the desk"},
        ["sneeze", "paper", "desk"], verb=("sneeze", "past", "sneezed")),
    GEN("The wind blew the hat to the floor.", "还是风当致使者：帽子被吹到地板上——非人力量照样能推动",
        _B, "caused-motion", "CO-04 exs[2] 句框", {"verb": "blow", "obj": "hat", "path": "to the floor"},
        ["blow", "hat"], verb=("blow", "past", "blew")),
    GEN("She kicked the ball to the boy.", "路径换成 to the boy：球不是飞过去，是滚到男孩脚边",
        _C, "caused-motion", "CO-04 exs[1] 句框", {"verb": "kick", "obj": "ball", "path": "to the boy"},
        ["kick", "ball", "boy"], verb=("kick", "past", "kicked")),
    GEN("He kicked the ball into the room.", "路径换成 into：球进了房间——into 强调「进到里面」",
        _C, "caused-motion", "CO-04 exs[1] 句框", {"verb": "kick", "obj": "ball", "path": "into the room"},
        ["kick", "ball", "room"], verb=("kick", "past", "kicked")),
    GEN("Sam sneezed.", "对照：没有模具帮忙，sneeze 就只是一个人的动作，谁也推不动",
        _D, "plain-intransitive", "CO-04 exs[0] 动词单用形", {"verb": "sneeze"},
        ["sneeze"], verb=("sneeze", "past", "sneezed")),
]

# ---------------------------------------------------------------- CO-05 结果模具
_A = "颜色终点：刷成什么色"
_B = "干净整齐终点：擦出来、收出来"
_C = "make 领队：弄成某样"
_D = "对照组：只说手法，没说变成什么样"
SPEC["CO-05"] = [
    O(0, _A),
    GEN("She painted the wall blue.", "同一套模具换面墙、换个颜色：blue 仍是终点，paint 仍是手法",
        _A, "resultative", "CO-05 exs[0] 句框", {"verb": "paint", "obj": "wall", "result": "blue"},
        ["paint", "wall", "blue"], verb=("paint", "past", "painted")),
    GEN("He painted his room green.", "刷自己的房间：终点 green 说清了「变成什么样」",
        _A, "resultative", "CO-05 exs[0] 句框", {"verb": "paint", "obj": "room", "result": "green"},
        ["paint", "room", "green"], verb=("paint", "past", "painted")),
    O(1, _B), O(2, _B),
    GEN("Mum wiped the desk clean.", "还是 wipe + clean 的搭配：只换被擦的东西，终点不变",
        _B, "resultative", "CO-05 exs[1] 句框", {"verb": "wipe", "obj": "desk", "result": "clean"},
        ["wipe", "desk", "clean"], verb=("wipe", "past", "wiped")),
    GEN("She wiped her shoes clean.", "鞋擦干净：clean 是擦完之后的状态，不是擦的动作",
        _B, "resultative", "CO-05 exs[1] 句框", {"verb": "wipe", "obj": "shoes", "result": "clean"},
        ["wipe", "shoes", "clean"], verb=("wipe", "past", "wiped")),
    GEN("The sun made the room warm.", "make + warm：太阳没动手，「让房间变暖」的结果义全靠模具撑",
        _C, "resultative-make", "CO-05 exs[2] 句框", {"verb": "make", "obj": "room", "result": "warm"},
        ["make", "sun", "warm"], verb=("make", "past", "made")),
    GEN("It made him happy.", "it 指前面那件事：结果落在人身上——happy 是他后来的样子",
        _C, "resultative-make", "CO-05 exs[2] 句框", {"verb": "make", "obj": "him", "result": "happy"},
        ["make", "happy"], verb=("make", "past", "made")),
    GEN("They painted the door.", "对照：没有 red，paint 就只是「刷了门」，变成什么样没人知道",
        _D, "plain-transitive", "CO-05 exs[0] 去结果短语", {"verb": "paint", "obj": "door"},
        ["paint", "door"], verb=("paint", "past", "painted")),
    GEN("She wiped the table.", "对照：没有 clean，wipe 只报告「擦了」，结果义缺席",
        _D, "plain-transitive", "CO-05 exs[1] 去结果短语", {"verb": "wipe", "obj": "table"},
        ["wipe", "table"], verb=("wipe", "past", "wiped")),
]

# ---------------------------------------------------------------- CO-06 双宾家族
_A = "大哥 · 成功转移：真交到手里"
_B = "意图转移：答应给，还没到手"
_C = "使能转移：做给他，成品就是转移物"
_D = "未来转移：先留给他"
SPEC["CO-06"] = [
    O(0, _A),
    GEN("She sent him a letter.", "信真的寄到了他手里：send 是大哥家族的正成员",
        _A, "ditrans-central", "CO-06 exs[0] 句框", {"verb": "send", "recip": "him", "obj": "letter"},
        ["send", "letter"], verb=("send", "past", "sent")),
    GEN("He showed her the book.", "把书给她看：东西到了她眼前，转移完成",
        _A, "ditrans-central", "CO-06 exs[0] 句框", {"verb": "show", "recip": "her", "obj": "book"},
        ["show", "book"], verb=("show", "past", "showed")),
    O(1, _B),
    GEN("Mum promised us a cake.", "答应给我们烤蛋糕：话先到了，蛋糕还没到——意图转移",
        _B, "ditrans-intended", "CO-06 exs[1] 句框", {"verb": "promise", "recip": "us", "obj": "cake"},
        ["promise", "cake"], verb=("promise", "past", "promised")),
    GEN("He promised her a story.", "答应给她讲个故事：转移的是「将来要讲」这份承诺",
        _B, "ditrans-intended", "CO-06 exs[1] 句框", {"verb": "promise", "recip": "her", "obj": "story"},
        ["promise", "story"], verb=("promise", "past", "promised")),
    O(2, _C),
    GEN("She made him a cup of tea.", "茶做好就归他喝：做给他，成品一出锅就是转移物",
        _C, "ditrans-enabling", "CO-06 exs[2] 句框", {"verb": "make", "recip": "him", "obj": "tea"},
        ["make", "tea"], verb=("make", "past", "made")),
    GEN("Dad built us a small house.", "房子建好归我们住：build 的成品即转移物（与 CO-02 同句不同读法）",
        _C, "ditrans-enabling", "CO-06 exs[2] 句框", {"verb": "build", "recip": "us", "obj": "house"},
        ["build", "house"], verb=("build", "past", "built")),
    GEN("She saved me a cake.", "先把蛋糕留给我：东西还没交手，名分已经定了——未来转移",
        _D, "ditrans-future", "CO-06 机制「未来转移」义项", {"verb": "save", "recip": "me", "obj": "cake"},
        ["save", "cake"], verb=("save", "past", "saved")),
    GEN("Dad left me his book.", "把他的书留给我：leave 的双宾说的是「留给」，指向将来的拿到",
        _D, "ditrans-future", "CO-06 机制「未来转移」义项", {"verb": "leave", "recip": "me", "obj": "book"},
        ["leave", "book"], verb=("leave", "past", "left")),
]

# ---------------------------------------------------------------- CO-07 There be 出场介绍
_A = "领新客上台：第一次出现用 a"
_B = "归谁管：have 说领有"
_C = "老朋友到达：the 被特许"
SPEC["CO-07"] = [
    O(0, _A),
    OWN("There is a book on the desk.", "本条病例的正形：书是第一次被介绍出场的新客，所以用 a",
        _A, "CO-07 cases[0].right", ["book", "desk"]),
    GEN("There is a cat on the desk.", "换个新客：一只猫趴在书桌上——第一次露面，照例用 a",
        _A, "there-be-new", "CO-07 exs[0] 句框", {"guest": "cat", "place": "desk"},
        ["cat", "desk"]),
    GEN("There is a bird in the tree.", "树上有只鸟：bird 是新面孔，in the tree 是它站的台",
        _A, "there-be-new", "CO-07 exs[0] 句框", {"guest": "bird", "place": "tree"},
        ["bird", "tree"]),
    GEN("There are two books on the desk.", "新客不止一位时主持人换 are：离动词最近的 two books 是复数",
        _A, "there-be-new-pl", "CO-07 exs[0] 句框", {"guest": "book", "place": "desk"},
        ["book", "desk"]),
    GEN("There is an apple on the table.", "apple 开头是元音音，新客的名字牌换成 an",
        _A, "there-be-new", "CO-07 exs[0] 句框", {"guest": "apple", "place": "table"},
        ["apple", "table"]),
    O(1, _B),
    GEN("We have a dog.", "have 的戏是领有：狗归我们家管，不是在介绍它出场",
        _B, "have-possess", "CO-07 exs[1] 句框", {"owner": "we", "obj": "dog"},
        ["dog"]),
    GEN("She has a cat.", "她有一只猫：has 是 have 的三单形，管的仍是「归谁」",
        _B, "have-possess", "CO-07 exs[1] 句框", {"owner": "she", "obj": "cat"},
        ["cat"], verb=("have", "3sg", "has")),
    O(2, _C),
    GEN("There is the train!", "等的是火车：火车一进站，老朋友到达，the 被特许放行",
        _C, "there-be-arrival", "CO-07 exs[2] 句框", {"guest": "train"},
        ["train"]),
]

# ---------------------------------------------------------------- CO-08 被动换主角
_A = "主角是被收拾的东西：做事的人不出现"
_B = "同一件事的主动版：做事的人站中间"
_C = "做事的人退到 by 后面"
SPEC["CO-08"] = [
    O(0, _A),
    GEN("The door was opened.", "门成了主角：谁开的门不出现，大家只看门怎么样了",
        _A, "passive-noagent", "CO-08 exs[0] 句框", {"patient": "door", "verb": "open"},
        ["door", "open"], verb=("open", "pp", "opened")),
    GEN("The window was cleaned.", "窗户站中间：was + 过去分词 cleaned，做事的人隐去",
        _A, "passive-noagent", "CO-08 exs[0] 句框", {"patient": "window", "verb": "clean"},
        ["window", "clean"], verb=("clean", "pp", "cleaned")),
    GEN("The cake was made today.", "蛋糕是主角：今天被做出来——镜头只对准成果",
        _A, "passive-noagent", "CO-08 exs[0] 句框", {"patient": "cake", "verb": "make"},
        ["cake", "make"], verb=("make", "pp", "made")),
    O(1, _B),
    GEN("Mum made the cake.", "和被动版同一件事实：镜头转回做事的人，Mum 站中间",
        _B, "active-pair", "CO-08 exs[2] 主动形", {"agent": "mum", "verb": "make", "patient": "cake"},
        ["make", "cake"], verb=("make", "past", "made")),
    GEN("The cat broke the cup.", "做事的是猫：cup 是被收拾的，但这句让动手的那位当主角",
        _B, "active", "CO-08 exs[1] 句框", {"agent": "cat", "verb": "break", "patient": "cup"},
        ["cat", "break", "cup"], verb=("break", "past", "broke")),
    GEN("Dad cleaned the window.", "主动版：Dad 动手擦窗——和本页被动版 The window was cleaned. 是同一件事",
        _B, "active-pair", "CO-08 exs[0] 主动形", {"agent": "dad", "verb": "clean", "patient": "window"},
        ["clean", "window"], verb=("clean", "past", "cleaned")),
    O(2, _C),
    GEN("The window was broken by the boy.", "和第一句是同一扇窗：主角仍是窗，男孩退到 by 后面补一句",
        _C, "passive-by", "CO-08 exs[2] 句框", {"patient": "window", "verb": "break", "agent": "boy"},
        ["window", "break", "boy"], verb=("break", "pp", "broken")),
    GEN("The book was written by Tom.", "书站中间，作者 Tom 退到 by 后：介绍作品时最常见的站位",
        _C, "passive-by", "CO-08 exs[2] 句框", {"patient": "book", "verb": "write", "agent": "tom"},
        ["book", "write"], verb=("write", "pp", "written")),
]

# ---------------------------------------------------------------- CO-09 主语是镜头主角
_A = "主角是被看的那位：它没动手"
_B = "主角是工具"
_C = "主角恰好是动手的：原型情形"
SPEC["CO-09"] = [
    O(0, _A),
    GEN("The window opened.", "和门一样：窗自己开了的样子——主语是被看的那扇窗，不是动手的人",
        _A, "middle-subject", "CO-09 exs[0] 句框", {"subject": "window", "verb": "open"},
        ["window", "open"], verb=("open", "past", "opened")),
    GEN("The door closed.", "开和关是一对：门合上了，镜头仍对准门自己",
        _A, "middle-subject", "CO-09 exs[0] 句框", {"subject": "door", "verb": "close"},
        ["door", "close"], verb=("close", "past", "closed")),
    GEN("The ball stopped.", "球滚着滚着自己停了：主语是被看的球，后面藏着摩擦力",
        _A, "middle-subject", "CO-09 exs[0] 句框", {"subject": "ball", "verb": "stop"},
        ["ball", "stop"], verb=("stop", "past", "stopped")),
    O(1, _B),
    GEN("This key opened the box.", "还是钥匙当主角：换成开箱子，工具的身份不变（到底是谁在开，要结合上下文看）",
        _B, "instrument-subject", "CO-09 exs[1] 句框", {"subject": "key", "verb": "open", "obj": "box"},
        ["key", "open", "box"], verb=("open", "past", "opened")),
    GEN("The knife cut the cake.", "刀站中间：真正动手的是人，但句子把功劳记在工具头上",
        _B, "instrument-subject", "CO-09 exs[1] 句框", {"subject": "knife", "verb": "cut", "obj": "cake"},
        ["knife", "cut", "cake"], verb=("cut", "past", "cut")),
    O(2, _C),
    GEN("The boy is reading.", "男孩既是主角也是动手的：这是主语的原型情形，不是唯一情形",
        _C, "agent-subject", "CO-09 exs[2] 句框", {"subject": "boy", "verb": "read"},
        ["boy", "read"], verb=("read", "ing", "reading")),
    GEN("She is cooking.", "她在做饭：镜头对准她，她也正动手——原型情形",
        _C, "agent-subject", "CO-09 exs[2] 句框", {"subject": "she", "verb": "cook"},
        ["cook"], verb=("cook", "ing", "cooking")),
    GEN("They are playing.", "他们在玩：主角和动作者是同一批人",
        _C, "agent-subject", "CO-09 exs[2] 句框", {"subject": "they", "verb": "play"},
        ["play"], verb=("play", "ing", "playing")),
]

# ---------------------------------------------------------------- CO-10 先整句再换零件
_A = "框架 I want ___：只换最后一个零件"
_B = "再认一个框架：I like ___"
_C = "提问框架：Can I have ___?"
SPEC["CO-10"] = [
    O(0, _A), O(1, _A), O(2, _A),
    GEN("I want a pen.", "框架不动，只把零件换成 pen——换零件的练习就是这么攒出来的",
        _A, "frame-fill", "CO-10 exs[0] 框架", {"slot": "pen"},
        ["pen"]),
    GEN("I want an orange.", "零件换成 orange，名字牌跟着换成 an，框架本身没动",
        _A, "frame-fill", "CO-10 exs[0] 框架", {"slot": "orange"},
        ["orange"]),
    GEN("I like apples.", "新框架 I like ___：第一个零件填 apples（和 GR-03 的句型是同一家）",
        _B, "frame-fill", "GR-03 exs 登记框架（She doesn't like apples.）", {"slot": "apple"},
        ["like", "apple"], verb=("like", "base", "like")),
    GEN("I like books.", "同一框架换零件：books——喜欢的东西成排换下去",
        _B, "frame-fill", "GR-03 exs 登记框架", {"slot": "book"},
        ["like", "book"], verb=("like", "base", "like")),
    GEN("I like my dog.", "零件也可以是「我的狗」：框架越用越长，机关口还是那个",
        _B, "frame-fill", "GR-03 exs 登记框架", {"slot": "dog"},
        ["like", "dog"], verb=("like", "base", "like")),
    GEN("Can I have a book?", "提问也是框架：Can I have ___? 是 GR-20 里的整句机关，零件填 book",
        _C, "frame-fill", "GR-20 机制登记框架（Can I have...?）", {"slot": "book"},
        ["book"]),
    GEN("Can I have some water?", "零件填 some water：和陈述框架 I want some water. 是同一批零件",
        _C, "frame-fill", "GR-20 机制登记框架（Can I have...?）", {"slot": "water"},
        ["water"]),
    GEN("Can I have a cake?", "再换一块蛋糕：问句框架换零件的节奏和陈述框架一样",
        _C, "frame-fill", "GR-20 机制登记框架（Can I have...?）", {"slot": "cake"},
        ["cake"]),
]

# ---------------------------------------------------------------- CO-11 先认模具
_A = "双宾一堆：动词不同，队形相同"
_B = "有给的意思，走 to 小路"
_C = "不是这一堆：没有谁给谁"
_D = "对照组：同一个动词，换了队形"
SPEC["CO-11"] = [
    O(0, _A), O(1, _A),
    GEN("She made me a cup of tea.", "分堆练习句：make 和 give、bake 都不同，但「人+人+东西」的队形相同——同一堆",
        _A, "sorting-ditrans", "CO-02 exs[1] 登记句型", {"verb": "make"},
        ["make", "tea"], verb=("make", "past", "made")),
    GEN("They built us a small house.", "build 也不是 give：实验里它还是被分进双宾堆——认的是队形",
        _A, "sorting-ditrans", "CO-02 exs[2] 登记句型", {"verb": "build"},
        ["build", "house"], verb=("build", "past", "built")),
    GEN("Dad promised me a new bike.", "promise 更不像 give：但队形是双宾，分堆时照样进这一堆",
        _A, "sorting-ditrans", "CO-06 exs[1] 登记句型", {"verb": "promise"},
        ["promise", "bike"], verb=("promise", "past", "promised")),
    GEN("She gave the book to him.", "意思还是给，队形却换了：东西先行、人跟 to 走——分堆时它离开双宾堆",
        _B, "to-dative", "CO-11 exs[0] to 式变换", {"verb": "give", "obj": "book", "recip": "him"},
        ["give", "book"], verb=("give", "past", "gave")),
    GEN("He showed the photo to her.", "show 走 to 小路：给的意思没变，模具变了——大脑认的是后面这个",
        _B, "to-dative", "CO-03 exs[0] 句框", {"verb": "show", "obj": "photo", "recip": "her"},
        ["show", "photo"], verb=("show", "past", "showed")),
    OWN("The cat is sleeping.", "没有谁给谁——它进不了双宾堆，是分堆时的干扰项",
        _C, "CO-11 quiz[2] 题干句", ["cat", "sleep"], verb=("sleep", "ing", "sleeping")),
    GEN("The dog is running.", "狗在跑：没有接受者、没有东西易手——不是双宾队形",
        _C, "non-ditrans", "CO-09 exs[2] 登记句型", {"verb": "run"},
        ["dog", "run"], verb=("run", "ing", "running")),
    GEN("I want a cake.", "want 框架句：只有想要的人和东西，没有「给到谁」——不同堆",
        _C, "non-ditrans", "CO-10 exs[2] 登记句型", {"verb": "want"},
        ["want", "cake"], verb=("want", "base", "want")),
    GEN("He baked a cake.", "对照：bake 还是那个 bake，没有第二个人时它离开双宾堆——分堆看的是整句的队形",
        _D, "plain-transitive", "CO-11 exs[1] 模具对照形", {"verb": "bake", "obj": "cake"},
        ["bake", "cake"], verb=("bake", "past", "baked")),
]

# ---------------------------------------------------------------- CO-12 一家三代
_A = "爷爷辈：整块背下来的整句"
_B = "爸爸辈：半截话，能换零件"
_C = "孙子辈：只剩角色的模具"
SPEC["CO-12"] = [
    O(0, _A),
    GEN("Nice to meet you!", "口语课的整块句：整句端出来打招呼，不拆开分析——爷爷辈的典型",
        _A, "whole-chunk", "spoken_data 口语对话登记句", {},
        ["meet", "you"], verb=None),
    GEN("I'm fine, thank you.", "回答身体怎么样也是整块存取：先会说整句，里面的零件后认",
        _A, "whole-chunk", "spoken_data 口语对话登记句", {},
        ["fine", "thank"], verb=None),
    GEN("Good morning!", "早上打招呼的整块句：用的时候整句拿，不现拼",
        _A, "whole-chunk", "spoken_data 口语对话登记句", {},
        ["good", "morning"], verb=None),
    O(1, _B),
    GEN("I want a cake.", "爸爸辈的填充实例：框架是 I want ___，零件填 cake",
        _B, "frame-fill", "CO-12 exs[1] 框架", {"slot": "cake"},
        ["want", "cake"], verb=("want", "base", "want")),
    GEN("I want some water.", "同一个框架换零件：填 some water——换得越多，框架越清楚",
        _B, "frame-fill", "CO-12 exs[1] 框架", {"slot": "water"},
        ["want", "water"], verb=("want", "base", "want")),
    GEN("I like books.", "另一个半截话 I like ___：谱系中段不止一条框架",
        _B, "frame-fill", "GR-03 exs 登记框架", {"slot": "book"},
        ["like", "book"], verb=("like", "base", "like")),
    O(2, _C),
    GEN("She gave him a book.", "孙子辈模具装上真词：X=give 的人、Y=收的人、Z=书——模具的实体填充",
        _C, "schema-filled", "CO-12 exs[2] 模具", {"verb": "give"},
        ["give", "book"], verb=("give", "past", "gave")),
    GEN("He baked her a cake.", "同一个模具换动词填充：bake 进模，X、Y、Z 各就各位",
        _C, "schema-filled", "CO-12 exs[2] 模具", {"verb": "bake"},
        ["bake", "cake"], verb=("bake", "past", "baked")),
]

# ---------------------------------------------------------------- CO-13 一台发动机
_A = "want 一家：穿 to 工作服"
_B = "enjoy 一家：穿 -ing 工作服"
_C = "stop + to：停下来去做另一件事"
SPEC["CO-13"] = [
    O(0, _A),
    OWN("I want to go.", "本条病例的正形：go 穿上 to 工作服，句子才合格出厂",
        _A, "CO-13 cases[0].right", ["want", "go"], verb=("go", "base", "go")),
    GEN("She wants to read.", "箭头落在 wants 上（带三单 -s），read 只能穿 to 工作服跟在后面",
        _A, "nonfinite-to", "CO-13 exs[0] 句框", {"verb": "want", "second": "read"},
        ["want", "read"], verb=("want", "3sg", "wants")),
    GEN("They want to play.", "主语换成 they，want 不带 -s；play 照样穿 to——箭头永远只有一支",
        _A, "nonfinite-to", "CO-13 exs[0] 句框", {"verb": "want", "second": "play"},
        ["want", "play"], verb=("want", "base", "want")),
    GEN("He wants to swim.", "wants 落箭头，swim 穿 to：和 read、play 是同一套站位",
        _A, "nonfinite-to", "CO-13 exs[0] 句框", {"verb": "want", "second": "swim"},
        ["want", "swim"], verb=("want", "3sg", "wants")),
    O(1, _B),
    GEN("She enjoys reading.", "enjoy 落箭头（带 -s），read 穿 -ing 工作服：reading",
        _B, "nonfinite-ing", "CO-13 exs[1] 句框", {"verb": "enjoy", "second": "read"},
        ["enjoy", "read"], verb=("enjoy", "3sg", "enjoys")),
    GEN("We enjoy singing.", "主语换成 we：sing 穿 -ing，一台发动机的规矩不变",
        _B, "nonfinite-ing", "CO-13 exs[1] 句框", {"verb": "enjoy", "second": "sing"},
        ["enjoy", "sing"], verb=("enjoy", "base", "enjoy")),
    O(2, _C),
    GEN("She stopped to read the book.", "stop 落箭头，read 穿 to：停下手里的事，去读这本书",
        _C, "nonfinite-to", "CO-13 exs[2] 句框", {"verb": "stop", "second": "read"},
        ["stop", "read", "book"], verb=("stop", "past", "stopped")),
    GEN("He stopped to drink some water.", "停下来喝口水：to 后面是「接下来要做的事」，不是正在做的",
        _C, "nonfinite-to", "CO-13 exs[2] 句框", {"verb": "stop", "second": "drink"},
        ["stop", "drink", "water"], verb=("stop", "past", "stopped")),
]

# ---------------------------------------------------------------- CO-14 点名搭档
_A = "点 to 的一队"
_B = "点 -ing 的一队"
_C = "两个都点：意思翻转"
SPEC["CO-14"] = [
    O(0, _A),
    GEN("She wants to read.", "want 的搭档名片再确认：主语换成 she，搭档还是 to",
        _A, "complement-to", "CO-14 exs[0] 句框", {"verb": "want", "second": "read"},
        ["want", "read"], verb=("want", "3sg", "wants")),
    GEN("He hopes to win.", "hope 也点 to：盼着将来赢——to 一队多是「还没发生的」事（助记倾向，不是规则）",
        _A, "complement-to", "CO-14 机制「语义倾向群」", {"verb": "hope", "second": "win"},
        ["hope", "win"], verb=("hope", "3sg", "hopes")),
    GEN("They decided to play.", "decide 点 to：主意打定，接下来去玩——决定的是将来的事",
        _A, "complement-to", "CO-14 机制「语义倾向群」", {"verb": "decide", "second": "play"},
        ["decide", "play"], verb=("decide", "past", "decided")),
    O(1, _B),
    GEN("She enjoys reading.", "enjoy 的名片不变：主语换人，搭档仍是 -ing",
        _B, "complement-ing", "CO-14 exs[1] 句框", {"verb": "enjoy", "second": "read"},
        ["enjoy", "read"], verb=("enjoy", "3sg", "enjoys")),
    GEN("He finished reading the book.", "finish 点 -ing：读这本书是「已经在做、现在收尾」的事",
        _B, "complement-ing", "CO-14 机制「语义倾向群」", {"verb": "finish", "second": "read"},
        ["finish", "read", "book"], verb=("finish", "past", "finished")),
    GEN("They keep playing.", "keep 点 -ing：一直在玩——-ing 一队多是「正在进行」的事",
        _B, "complement-ing", "CO-14 机制「语义倾向群」", {"verb": "keep", "second": "play"},
        ["keep", "play"], verb=("keep", "base", "keep")),
    GEN("We enjoy cooking.", "enjoy 再添一位：cooking——做饭这件事本身好玩",
        _B, "complement-ing", "CO-14 exs[1] 句框", {"verb": "enjoy", "second": "cook"},
        ["enjoy", "cook"], verb=("enjoy", "base", "enjoy")),
    O(2, _C),
    GEN("She stopped talking. / She stopped to talk to Tom.", "同一位 stop、同一个 talk：穿 -ing 是「停下不说了」，穿 to 是「停下来去跟 Tom 说话」——搭档一换，意思翻转",
        _C, "complement-flip", "CO-14 exs[2] 反转对句框", {"verb": "stop", "second": "talk"},
        ["stop", "talk"], verb=("stop", "past", "stopped")),
]

# ---------------------------------------------------------------- CO-15 两种盖法
_A = "英语的盖法：先立柱子"
_B = "再往后挂：地点、时间排队"
_C = "特许：把时间提到最前面强调"
SPEC["CO-15"] = [
    O(0, _A),
    GEN("She reads a book at school.", "柱子还是「谁读了什么」：reads 立稳，at school 挂在后面",
        _A, "skeleton-first", "CO-15 exs[0] 句框", {"verb": "read", "place": "school"},
        ["read", "book", "school"], verb=("read", "3sg", "reads")),
    GEN("The dog ran in the park.", "先立「狗跑了」这根柱子，在哪儿跑是后挂的房间",
        _A, "skeleton-first", "CO-15 exs[0] 句框", {"verb": "run", "place": "park"},
        ["dog", "run", "park"], verb=("run", "past", "ran")),
    GEN("We play games in the park.", "柱子是「我们玩游戏」：主谓宾齐了，地点才上场",
        _A, "skeleton-first", "CO-15 exs[0] 句框", {"verb": "play", "place": "park"},
        ["play", "game", "park"], verb=("play", "base", "play")),
    GEN("Mum cooks dinner in the kitchen.", "「妈妈做晚饭」先立住，in the kitchen 是挂上去的第三间房",
        _A, "skeleton-first", "CO-15 exs[0] 句框", {"verb": "cook", "place": "kitchen"},
        ["cook", "dinner", "kitchen"], verb=("cook", "3sg", "cooks")),
    GEN("I read a book in my room in the morning.", "第一句的加长版：柱子后连挂两间——先地点（我的房间）、再时间（早上）",
        _B, "skeleton-extended", "CO-15 exs[0]+exs[1] 槽位叠加", {"verb": "read"},
        ["read", "book", "room", "morning"], verb=("read", "base", "read")),
    GEN("He walks his dog in the park in the evening.", "walk 的柱子后挂地点再挂时间：排队往后加，骨架始终在最前面",
        _B, "skeleton-extended", "CO-15 exs[1] 后半句框", {"verb": "walk", "obj": "dog"},
        ["walk", "dog", "park", "evening"], verb=("walk", "3sg", "walks")),
    GEN("She reads a book at home in the morning.", "地点 at home、时间 in the morning 都挂在柱子后面：英语的常规排队",
        _B, "skeleton-extended", "CO-15 exs[0] 句框", {"verb": "read"},
        ["read", "book", "home", "morning"], verb=("read", "3sg", "reads")),
    O(1, _C),
    GEN("In the morning, she reads a book in her room.", "把时间提到最前面是英语自己的特许：为了强调「早上」，不是学汉语的铺陈",
        _C, "fronted-time", "CO-15 exs[1] 句框", {"verb": "read"},
        ["read", "book", "room", "morning"], verb=("read", "3sg", "reads")),
    GEN("In the evening, we play games in the park.", "晚上被提到句首强调：柱子（我们玩游戏）照样紧跟其后，房子没散架",
        _C, "fronted-time", "CO-15 exs[1] 句框", {"verb": "play"},
        ["play", "game", "park", "evening"], verb=("play", "base", "play")),
]

# ---------------------------------------------------------------- CO-16 分工地图
_A = "构式车间看戏：谁给谁、谁变样"
_B = "形态车间查扣子：时态与 -s"
_C = "两个车间都要过"
SPEC["CO-16"] = [
    O(0, _A),
    GEN("She gave him a book.", "构式车间判读：双宾的「给」成立——这出戏归模具管",
        _A, "construction-check", "CO-16 exs[0] 同族句型", {"verb": "give"},
        ["give", "book"], verb=("give", "past", "gave")),
    GEN("They built us a small house.", "戏的判读：为我们建→转移成立；built 的词形对不对，是隔壁车间的活",
        _A, "construction-check", "CO-16 exs[0] 同族句型", {"verb": "build"},
        ["build", "house"], verb=("build", "past", "built")),
    GEN("They painted the door red.", "这出戏是「谁变样」：门变红——构式车间管的正是这一层",
        _A, "construction-check", "CO-16 exs[0] 同族句型（结果构式）", {"verb": "paint"},
        ["paint", "door"], verb=("paint", "past", "painted")),
    O(1, _B),
    GEN("He makes her a cake every Sunday.", "戏和前面那句一样，扣子逐颗查：makes 的 -s、every Sunday 的现在时——都是形态层的结论",
        _B, "morphology-check", "CO-16 exs[1] 句框", {"verb": "make"},
        ["make", "cake"], verb=("make", "3sg", "makes")),
    GEN("She sends him a book every day.", "查扣子：sends 带 -s 与 every day 对位；「给」的戏成立与否归构式车间",
        _B, "morphology-check", "CO-16 exs[1] 句框", {"verb": "send"},
        ["send", "book"], verb=("send", "3sg", "sends")),
    GEN("He reads her a book every day.", "reads 的 -s 是形态车间盖的章；构式车间只管「读给她听」这出戏",
        _B, "morphology-check", "CO-16 exs[1] 句框", {"verb": "read"},
        ["read", "book"], verb=("read", "3sg", "reads")),
    GEN("Mum baked us a cake.", "两个车间各下一句结论：戏——使能给成立（构式）；词形——baked 过去式正确（形态）",
        _C, "both-checks", "CO-16 分工判读示范", {"verb": "bake"},
        ["bake", "cake"], verb=("bake", "past", "baked")),
    GEN("Dad writes her a letter every week.", "全套检查走一遍：戏是写信给她（构式过），writes 的 -s 与 every week 的时态（形态过）",
        _C, "both-checks", "CO-16 exs[1] 句框", {"verb": "write"},
        ["write", "letter"], verb=("write", "3sg", "writes")),
    GEN("He told her a story.", "戏归构式（讲给她听），told 的不规则过去式归形态——一句话，两个车间各管一段",
        _C, "both-checks", "CO-16 分工判读示范", {"verb": "tell"},
        ["tell", "story"], verb=("tell", "past", "told")),
]

# CO-16 病例补登（不计入 exs 例数）：错形与正形均出自本条 quiz[0] 登记材料。
CO16_CASE = {
    "wrong": "He bake her a cake every Sunday.",
    "right": "He bakes her a cake every Sunday.",
    "type": "戏对了、扣子错了：三单 -s 缺失",
    "diag": "「给」的戏（构式层）成立，但 bake 缺三单 -s——这是形态车间的活，模具选对了也不豁免",
    "src": "CO-16 quiz[0] 登记错形",
}


# ================================================================ 注清洗（提交前工序）
# CO 补例试点提交前清洗（Stewart 2026-11-03 晚）：部分例句注与病例 diag 混了生产腔
# （登记/纲领/coreView/标志性原例/Goldberg 出处/待补词之类），孩子看不懂。
# 本表逐条把「出镜文本」改写成白话注：英文例句一字不改、分组不改、
# src 出处字段原样保留在数据里（只清 note/diag 文本）。
# own/gen 条目的新注已同步改进上方 SPEC 字面量与 CO16_CASE；orig 条目与既有病例
# 的注不在 SPEC 里，故全部 36 条统一由本表驱动总表与主文件镜像同值改写。
# 用法：python3 tools/fill_co_examples.py --clean-notes（幂等：已改条目跳过；旧注对不上即停）
NOTE_REWRITES = [
    # (条号, 类别 exs/case, 定位键=例句 s 或病例 wrong, 旧注, 新注)
    ("CO-01", "exs", "He baked her a cake.",
     "纲领 coreView 登记例：bake 本无「给」义，双宾模具给了它「给」味",
     "先记住这一句：bake 本来只管「烤」，是双宾模具给了它「给」味"),
    ("CO-01", "exs", "She wiped the table clean.",
     "wipe 只管「擦」，「变成干净」是结果模具给的终点（CO-05 的登记例型）",
     "wipe 只管「擦」，「变成干净」是结果模具给的终点——CO-05 讲的就是这一家"),
    ("CO-02", "exs", "He baked her a cake.",
     "纲领与条目共同登记的核心例——bake 长出「给」义",
     "最重要的一句：bake 本来只管「烤」，进了双宾模具就长出了「给」义"),
    ("CO-02", "exs", "They built us a small house.",
     "build 入模——「为我们建」即转移解读（条目机制登记动词）",
     "build 进了模具——「为我们建」：房子建好就归我们，这就是「转移」"),
    ("CO-02", "exs", "Mum baked us a cake.",
     "本条练习登记句：Mum 烤给「我们」——bake 的给义仍由模具供给",
     "Mum 烤给「我们」吃——bake 的「给」义仍是模具供给的"),
    ("CO-02", "exs", "Dad baked me a cake.",
     "和登记例只差收的人：her 换成 me，句子的「给」不减",
     "和前面那句只差收的人：her 换成 me，句子的「给」不减"),
    ("CO-04", "exs", "Sam sneezed the napkin off the table.",
     "Goldberg (1995) 标志性原例：sneeze、napkin 未在词库命中，已登记待补词；句中可引词仅 table 一词",
     "最有名的一句：sneeze 明明只是「打喷嚏」，餐巾却被一个喷嚏「喷」下了桌——动词没变，全靠模具给它添的劲"),
    ("CO-05", "exs", "They painted the door red.",
     "条目标题登记例——paint 是手法，red 是终点",
     "这一条的招牌句——paint 是手法，red 是终点"),
    ("CO-05", "exs", "She wiped the table clean.",
     "条目标题登记例（wipe 未在词库命中，已登记待补词）；句中可引词为 table、clean",
     "招牌句之二——wipe 是手法，clean 是擦完之后的样子"),
    ("CO-07", "exs", "There is a dog under the tree.",
     "条目儿童版登记例型——把新面孔（a dog）介绍出场",
     "先看这一句的样子——把新面孔（a dog）介绍出场"),
    ("CO-08", "exs", "The window was broken.",
     "条目儿童版登记例——镜头对准窗户（broken 的词形归一见待补说明）",
     "先看这一句：镜头只对准窗户，谁打破的没有出现"),
    ("CO-08", "exs", "The window was broken by the boy.",
     "和登记例是同一扇窗：主角仍是窗，男孩退到 by 后面补一句",
     "和第一句是同一扇窗：主角仍是窗，男孩退到 by 后面补一句"),
    ("CO-09", "exs", "The door opened.",
     "条目儿童版登记例——主语是被看的那扇门，不是动作发出者",
     "先看这一句——主语是被看的那扇门，不是动手的人"),
    ("CO-09", "exs", "The key opened the door.",
     "条目边界登记例——主语是工具，判读仍需结合语境",
     "一句边界上的句子——主语是工具（钥匙），意思要结合上下文来定"),
    ("CO-09", "exs", "This key opened the box.",
     "还是钥匙当主角：换成开箱子，工具的身份不变（判读靠语境，见本条范围）",
     "还是钥匙当主角：换成开箱子，工具的身份不变（到底是谁在开，要结合上下文看）"),
    ("CO-10", "exs", "I want an apple.",
     "条目儿童版登记的框架 I want ___ 的首个填充",
     "框架 I want ___ 的第一个填充：零件是 an apple"),
    ("CO-10", "exs", "I like apples.",
     "新框架 I like ___：第一个零件填 apples（GR-03 登记句型）",
     "新框架 I like ___：第一个零件填 apples（和 GR-03 的句型是同一家）"),
    ("CO-10", "exs", "Can I have a book?",
     "提问也是框架：Can I have ___? 是 GR-20 登记的整句机关，零件填 book",
     "提问也是框架：Can I have ___? 是 GR-20 里的整句机关，零件填 book"),
    ("CO-11", "exs", "The cat is sleeping.",
     "本条练习登记句：没有谁给谁——它进不了双宾堆，是分堆时的干扰项",
     "没有谁给谁——它进不了双宾堆，是分堆时的干扰项"),
    ("CO-12", "exs", "Nice to meet you!",
     "口语课的整块句：整句端出来打招呼，不拆开分析——爷爷辈的典型（口语区登记原句）",
     "口语课的整块句：整句端出来打招呼，不拆开分析——爷爷辈的典型"),
    ("CO-12", "exs", "I'm fine, thank you.",
     "回答身体怎么样也是整块存取：先会说整句，里面的零件后认（口语区登记原句）",
     "回答身体怎么样也是整块存取：先会说整句，里面的零件后认"),
    ("CO-12", "exs", "Good morning!",
     "早上打招呼的整块句：用的时候整句拿，不现拼（口语区登记原句）",
     "早上打招呼的整块句：用的时候整句拿，不现拼"),
    ("CO-12", "exs", "I want ___.",
     "谱系中段：半成品框架（以框架本身为登记对象，空格为图式槽位）",
     "谱系中段：半成品框架——空格处就是留给零件的位置"),
    ("CO-12", "exs", "（双宾模具）X gives Y Z.",
     "抽象端：全图式模具，只剩角色槽位（登记形式，引 CO-02 实体例填充）",
     "抽象端：模具只剩角色——X 是给的人，Y 是收的人，Z 是东西（CO-02 里有装上真词的样子）"),
    ("CO-13", "exs", "I want to go home.",
     "条目支撑登记例——want 落箭头，go 穿 to 工作服",
     "先看这一句——want 落箭头，go 穿 to 工作服"),
    ("CO-13", "exs", "I enjoy swimming.",
     "条目支撑登记例——第二动词穿 -ing 工作服（swimming 的词元 swim 归一）",
     "再看这一句——第二动词穿 -ing 工作服：swimming"),
    ("CO-13", "exs", "He stopped to smoke.",
     "条目支撑登记例——stop 落箭头，后动词 to 式",
     "还有这一句——stop 落箭头，后面的动词穿 to 式"),
    ("CO-14", "exs", "I enjoy swimming.",
     "enjoy 点名 -ing（swimming 归一为 swim）",
     "enjoy 点名 -ing：swim 穿上 -ing 工作服，变成 swimming"),
    ("CO-14", "exs", "He stopped smoking. / He stopped to smoke.",
     "条目支撑登记的反转对：框架一换，意思翻转——选择即意义",
     "一对反转句：框架一换，意思翻转——选哪个搭档，就是选哪个意思"),
    ("CO-15", "exs", "I read a book in my room in the morning.",
     "登记例的加长版：柱子后连挂两间——先地点（我的房间）、再时间（早上）",
     "第一句的加长版：柱子后连挂两间——先地点（我的房间）、再时间（早上）"),
    ("CO-16", "exs", "He makes her a cake every Sunday.",
     "戏和登记例一样，扣子逐颗查：makes 的 -s、every Sunday 的现在时——都是形态层的结论",
     "戏和前面那句一样，扣子逐颗查：makes 的 -s、every Sunday 的现在时——都是形态层的结论"),
    ("CO-03", "case", "Explain me this.",
     "explain 不含「致使拥有转移」义，过不了宽域关；纲领 coreView 与本条目共同登记此错形（回 CO-03 机制节）",
     "explain 的意思里没有「交到手里」这一段，过不了意思这一关，只能走 to 小路（回 CO-03 机制节）"),
    ("CO-04", "case", "He knew the ball over the fence.",
     "know 没有可识解的物理致使链，与构式义不相容（条目边界登记的星号例；回 CO-04 机制节）",
     "know 只是心里「知道」，推不动任何东西，跟模具要的「致使移动」合不来（边界上的一句错句；回 CO-04 机制节）"),
    ("CO-07", "case", "There has a book on the desk.",
     "把 have 的领有戏码搬进存现模具；There be 管出场介绍，have 管领有（条目支撑登记 *There has a book；回 CO-07 机制节）",
     "把 have 的领有戏码搬进存现模具；There be 管出场介绍，have 管领有——*There has a book 是最常见的错法（回 CO-07 机制节）"),
    ("CO-13", "case", "I want go.",
     "want 已占用唯一的限定位置，go 必须以非限定形式（to go）出现（条目儿童版登记此错形；回 CO-13 机制节）",
     "want 已经占了唯一的「发动机」位置，go 只能穿上 to 工作服（to go）跟在后面（这是最常见的错形；回 CO-13 机制节）"),
    ("CO-16", "case", "He bake her a cake every Sunday.",
     "「给」的戏（构式层）成立，但 bake 缺三单 -s——这是形态车间的活，模具选对了也不豁免（本条 quiz[0] 登记错形）",
     "「给」的戏（构式层）成立，但 bake 缺三单 -s——这是形态车间的活，模具选对了也不豁免"),
]

HARD_TOKENS = ("登记", "纲领", "标志性", "coreView", "源：", "裁定", "口径")


def clean_notes():
    master = json.loads(MASTER.read_text(encoding="utf-8"))
    by_id = {x["id"]: x for x in master}
    applied, skipped, touched_cases = [], 0, set()
    for lid, kind, key, old, new in NOTE_REWRITES:
        ld = by_id[lid]["lawdata"]
        if kind == "exs":
            hits = [e for e in ld["exs"] if e["s"] == key]
            field = "note"
        else:
            hits = [c for c in ld.get("cases", []) if c["wrong"] == key]
            field = "diag"
            touched_cases.add(lid)
        if len(hits) != 1:
            fail(f"注清洗定位失败 {lid}/{kind}/{key}：命中 {len(hits)} 条")
        item = hits[0]
        if item[field] == new:
            skipped += 1
            continue
        if item[field] != old:
            fail(f"注清洗旧注对不上 {lid}/{kind}/{key}：现值「{item[field]}」")
        item[field] = new
        applied.append((lid, kind, key))
    # 改后全量复扫：CO 出镜 note / 病例 diag·type 行话清零（src 数据字段不算出镜，不扫）
    for lid in LAWS:
        ld = by_id[lid]["lawdata"]
        for e in ld["exs"]:
            for t in HARD_TOKENS:
                if t in e.get("note", ""):
                    fail(f"注清洗后仍有行话 {lid} 例句注含「{t}」：{e['s']}")
        for c in ld.get("cases", []):
            for f in ("diag", "type"):
                for t in HARD_TOKENS:
                    if t in c.get(f, ""):
                        fail(f"注清洗后仍有行话 {lid} 病例{f}含「{t}」：{c['wrong']}")
    MASTER.write_text(json.dumps(master, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"已写回总表：改写 {len(applied)} 条，跳过（已改） {skipped} 条")
    # 主文件 LAWDATA 镜像同值同步（与 --apply 同口径：JD 序列化、raw_decode 定位）
    text = MAIN.read_text(encoding="utf-8")
    i = text.index("var LAWDATA=")
    j = text.index("{", i)
    obj, end = json.JSONDecoder().raw_decode(text, j)
    for lid in LAWS:
        obj[lid]["exs"] = copy.deepcopy(by_id[lid]["lawdata"]["exs"])
    for lid in touched_cases:
        obj[lid]["cases"] = copy.deepcopy(by_id[lid]["lawdata"]["cases"])
    text = text[:j] + json.dumps(obj, ensure_ascii=False) + text[end:]
    MAIN.write_text(text, encoding="utf-8")
    print("已同步主文件 LAWDATA 镜像（exs 全 16 条 + 病例", len(touched_cases), "条）")


# ================================================================ 校验与落位
def norm(s):
    return re.sub(r"\s+", " ", s).strip().lower()


def main():
    if "--clean-notes" in sys.argv:
        clean_notes()
        return
    apply = "--apply" in sys.argv
    master = json.loads(MASTER.read_text(encoding="utf-8"))
    wb_rows = json.loads(WORDBANK.read_text(encoding="utf-8"))
    wb = {r["word"]: r for r in wb_rows}
    wb_low = {r["word"].lower(): r for r in wb_rows}
    vf_rows = json.loads(VERBFORMS.read_text(encoding="utf-8"))["rows"]
    vf = {r["base"]: r for r in vf_rows}
    practice = json.loads(PRACTICE.read_text(encoding="utf-8"))
    spoken_blob = norm(json.dumps(json.loads(SPOKEN.read_text(encoding="utf-8")), ensure_ascii=False))

    vf_surfaces = set()
    for b, r in vf.items():
        vf_surfaces |= {b, r["past"], r["past_participle"], der3sg(b), dering(b)}
    plurals = {derplural(w) for w in wb_low} | set(IRREG_PLURAL.values())

    def token_ok(tok):
        t = tok.strip("'").lower()
        if not t:
            return True
        if t.endswith("'s"):
            t = t[:-2]
        if t in ("i'm",):
            return True
        return (t in FUNC or t in NAMES or t in wb_low or t in vf_surfaces or t in plurals)

    def check_sentence(lid, s):
        for tok in re.findall(r"[A-Za-z']+", s.replace("___", " ")):
            if not token_ok(tok):
                fail(f"{lid}: 句子含词表外 token「{tok}」：{s}")

    def check_verb(lid, s, verb):
        if not verb:
            return
        lemma, cls, surface = verb
        row = vf.get(lemma)
        if row is None:
            fail(f"{lid}: 动词 {lemma} 不在五形式表：{s}")
        expect = {"base": row["base"], "past": row["past"], "pp": row["past_participle"],
                  "3sg": der3sg(lemma), "ing": dering(lemma)}[cls]
        if expect != surface:
            fail(f"{lid}: 动词形态不一致 {lemma}/{cls} 应为 {expect}，脚本声明 {surface}：{s}")
        if not re.search(r"\b" + re.escape(surface) + r"\b", s, re.I):
            fail(f"{lid}: 声明形态 {surface} 未出现在句中：{s}")

    def chips_of(lid, heads):
        out = []
        for h in heads:
            r = wb.get(h)
            if r is None:
                fail(f"{lid}: chip 锚词 {h} 不在 wordbank")
            out.append({"w": r["word"], "p": r["phonetic"], "m": r["meaning"]})
        return out

    report = []
    new_exs_by_law = {}
    for lid in LAWS:
        law = next((x for x in master if x["id"] == lid), None)
        if law is None:
            fail(f"{lid}: laws_master 无此条")
        ld = law["lawdata"]
        cur = ld["exs"]
        if any("grp" in x for x in cur):
            fail(f"{lid}: exs 已带 grp（疑似已执行过本脚本）——一次性试点工具，拒绝重复填充")
        own_blob = norm(json.dumps(law, ensure_ascii=False))
        entries = SPEC[lid]
        new_exs, seen = [], set()
        mix = {"orig": 0, "own": 0, "gen": 0}
        grps = []
        for e in entries:
            grp = e["grp"]
            if grp not in grps:
                grps.append(grp)
            if e["kind"] == "orig":
                src_item = cur[e["idx"]]
                item = copy.deepcopy(src_item)
                item["grp"] = grp
                item["src"] = {"k": "orig"}
                s = item["s"]
            elif e["kind"] == "own":
                s = e["s"]
                if norm(s) not in own_blob:
                    fail(f"{lid}: own 句未在该律自有材料中命中：{s}（出处 {e['ref']}）")
                check_sentence(lid, s)
                check_verb(lid, s, e.get("verb"))
                item = {"s": s, "note": e["note"], "words": chips_of(lid, e["chips"]),
                        "grp": grp, "src": {"k": "own", "ref": e["ref"]}}
            else:  # gen
                s = e["s"]
                if e["frame"] == "whole-chunk":
                    if norm(s) not in spoken_blob:
                        fail(f"{lid}: 整块句未在 spoken_data 中逐字命中：{s}")
                check_sentence(lid, s)
                check_verb(lid, s, e.get("verb"))
                slots = {}
                for role, head in e["slots"].items():
                    r = wb.get(head)
                    if r is not None:
                        slots[role] = r["id"]
                    elif head.lower() in FUNC or head.lower() in NAMES or " " in head:
                        slots[role] = "lit:" + head  # 功能词/登记人名/路径短语：字面槽位（非词库锚点）
                    else:
                        fail(f"{lid}: 槽位词 {head} 不在 wordbank：{s}")
                item = {"s": s, "note": e["note"], "words": chips_of(lid, e["chips"]),
                        "grp": grp, "src": {"k": "gen", "f": e["frame"], "from": e["from"], "slots": slots}}
            if not item.get("note"):
                fail(f"{lid}: 例句缺讲解注：{s}")
            key = norm(s)
            if key in seen:
                fail(f"{lid}: 例句重复：{s}")
            seen.add(key)
            mix[e["kind"]] += 1
            new_exs.append(item)
        wrongs = {norm(c["wrong"]) for c in ld.get("cases", [])}
        for s in seen:
            if s in wrongs:
                fail(f"{lid}: 例句与病例 wrong 句撞面：{s}")
        if len(new_exs) < 10:
            fail(f"{lid}: 补后仅 {len(new_exs)} 例，未达 10")
        report.append((lid, len(cur), len(new_exs), mix, len(grps)))
        ld["exs"] = new_exs
        new_exs_by_law[lid] = new_exs

    # CO-16 病例补登（单列，不计入 exs）：wrong 为 quiz[0] 登记错形，right 为现行 exs[1] 原句
    co16 = next(x for x in master if x["id"] == "CO-16")
    if not any(norm(c["wrong"]) == norm(CO16_CASE["wrong"]) for c in co16["lawdata"].get("cases", [])):
        co16["lawdata"].setdefault("cases", []).append(dict(CO16_CASE))

    print("law     前 -> 后   orig own gen  分组")
    tot = {"orig": 0, "own": 0, "gen": 0}
    for lid, before, after, mix, ng in report:
        for k in tot:
            tot[k] += mix[k]
        print(f"{lid}  {before:3d} -> {after:3d}   {mix['orig']:4d} {mix['own']:3d} {mix['gen']:3d}   {ng}")
    print("合计 orig/own/gen =", tot, " 总例数 =", sum(r[2] for r in report))

    if apply:
        MASTER.write_text(json.dumps(master, ensure_ascii=False, indent=1), encoding="utf-8")
        print("已写回", MASTER)
        # 主文件 LAWDATA 镜像同步：gen_laws 对非双户口条目只做「现行文件 == 总表 lawdata + 派生 rel」
        # 深相等断言、不代写内容（见 gen_laws.py build_lawdata），故镜像须与事实源同批同值写入；
        # 序列化用 gen_laws 同一 JD 格式，字面量跨度以 raw_decode 精确定位。
        text = MAIN.read_text(encoding="utf-8")
        i = text.index("var LAWDATA=")
        j = text.index("{", i)
        obj, end = json.JSONDecoder().raw_decode(text, j)
        for lid, exs in new_exs_by_law.items():
            obj[lid]["exs"] = copy.deepcopy(exs)
        html_cases = obj["CO-16"].setdefault("cases", [])
        if not any(norm(c["wrong"]) == norm(CO16_CASE["wrong"]) for c in html_cases):
            html_cases.append(copy.deepcopy(co16["lawdata"]["cases"][-1]))
        text = text[:j] + json.dumps(obj, ensure_ascii=False) + text[end:]
        MAIN.write_text(text, encoding="utf-8")
        print("已同步主文件 LAWDATA 镜像", MAIN)
    else:
        print("（--dry：未写回；加 --apply 写回）")


if __name__ == "__main__":
    main()
