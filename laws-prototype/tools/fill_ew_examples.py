#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fill_ew_examples.py — 学习改善·阶段 2 第三波：表达写作家族（E-01…E-15、W-01…W-15、
NE-01…NE-29，共 59 律）例句全量。

执行口径：laws-prototype/docs/variation-spec.md（每律先定变式表；例句 ≥10 有效例
（同构合并后计数）；分组呈现且组名说破在变什么；每律 ≥1 边界组；来源三通道逐句
登记 src；note 只许孩子白话）。引擎与校验全部沿用首波 tools/fill_grta_examples.py，
处理结构沿用第二波 tools/fill_v_examples.py 的 build_v。

范围与落位：
  59 律全部走 LAW 通路（总表 lawdata 与主文件 LAWDATA 均为 FULL 条目、无 zone
  双户口）：事实源 = model/laws_master.json 的 lawdata 分仓 exs；写回后由本脚本
  同值写入主文件 LAWDATA 镜像（gen_laws 的 JD 序列化 + 稳态自检，与首波
  build_lawdata_mirror 同一实现），再跑 tools/gen_laws.py --write 对账。
  不在本波范围（只登记）：C（冠词区呈现）、PR/QI（代词区呈现）、PB（介词区
  Stewart 自有线）、S/SR/P（拼读呈现）、TM/VB/LS/YL/CB/CG/WA/NEW（无 lawdata
  条目或专区/成人层呈现）。

表达写作族特点（与 GR/TA/V 的差异）：
  - 例句多为「一句话在干什么活」的标本：对话对（— 问 — 答）、单句加场合、
    写作样本句与句框。gen 组句的句框一律取自该律自有登记材料（exs 原例框、
    mech 机制框、quiz/prb 情景、cases.right），src.from 逐项注明；写作类律的
    模板句只用该律讲解过的句型，不引入未讲结构；槽位词只许词库真词与动词
    五形式表词形，不许生造词。
  - 原例注命中 NOTE_SCAN 的（22 条，多为「清单登记例」类生产标注）按首波口径
    登记 NOTE_REWRITES：英文句与 words 逐字不动，仅注改写为孩子白话（去掉生产
    标注，解释内容保留）。

校验（任一失败即停，不写回，沿用首波同名函数）：
  - orig 与现行数据逐字一致（比 s/note/words）；原例注命中 NOTE_SCAN 且无清洗
    登记即停；
  - own 逐字命中自有材料；gen 逐 token 过词表 + 动词形态一致 + chips 锚词逐字
    取词库；
  - 每律句面不重复、不与病例 wrong 撞面；同构合并后有效例数 ≥10；分组 ≥3 且
    组块连续；每律至少 1 个组名含「边界」的组；每例必有 note 与 grp；note 行话
    扫描命中即停。

用法：
  python3 tools/fill_ew_examples.py --dry     # 只校验并打印产出
  python3 tools/fill_ew_examples.py --apply   # 校验全过后写回（之后跑 gen_laws --write + check_all）
"""
import copy
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MASTER = ROOT / "model" / "laws_master.json"
MAIN = ROOT / "mengxing-prototype-v1.html"

sys.path.insert(0, str(ROOT / "tools"))
import fill_grta_examples as fg  # noqa: E402  沿用首波引擎（校验/派生/镜像）

fail = fg.fail
norm = fg.norm
O, OWN, GEN = fg.O, fg.OWN, fg.GEN

# 原例注命中 NOTE_SCAN 时的清洗登记（首波同口径：英文句逐字不动，仅注改写——
# 去掉「清单登记例」等生产标注，解释内容用孩子白话保留）。
NOTE_REWRITES = {
    ("E-01", 0): "教室窗边的一句话：可以是陈述、抱怨，也可以是请人关窗",
    ("E-01", 1): "道歉、请求、感谢三个动作各有现成说法",
    ("E-02", 0): "餐桌上请人递盐：问的是「能」，要的是「递」",
    ("E-02", 1): "教室里请人开窗",
    ("E-04", 0): "生日场景整块取用，不逐词拼",
    ("E-04", 1): "要水/点餐时整句取用，槽位可替换",
    ("E-07", 0): "默认请求式：情态问句作缓冲",
    ("E-07", 1): "更重的请求再升一级客气",
    ("E-08", 0): "食客说=夸奖，服务员说=角色错位",
    ("E-08", 1): "回指句：上一句有被回指的对象才成立",
    ("E-11", 0): "想不起词时向对方求助的现成句",
    ("E-11", 1): "说不出名字时用比方绕过去",
    ("W-14", 0): "时序路标：先做什么、再做什么",
    ("W-14", 1): "因果、转折、让步路标各就各位：although 表让步，不进时序链",
    ("NE-01", 0): "母语者会选的说法",
    ("NE-01", 1): "同样合语法，母语者不这么说",
    ("NE-08", 0): "ask 的接法：ask + 人 + to do",
    ("NE-10", 0): "调核落在不同词上，否认对象完全不同",
    ("NE-11", 0): "每一组词都是一个「集」：把一组词的读法对照着听，就能听出不同口音的系统差别",
    ("NE-14", 0): "最小对立：区别在，可懂度就在",
    ("NE-25", 0): "给理由的谈话句框：主张必须带理由",
    ("NE-28", 0): "连接词动作锚点举例：时序连接词各配全身动作，成为可提取的线索",
}

SPEC_EW = {}

# ---- E-01 说话就是做事（可变=这句话在干的活：报告/请求/道歉/感谢/承诺/邀请；不变=每句话都在做一件事，判断先看做的事成没成；边界=同一句能干不同的活，看场合）
_A, _B, _C, _D = "报告一件事：说出来也是在做事", "开口请人：请求与邀请", "道歉、感谢、承诺：各有各的活", "边界：同一句话，能干不同的活"
SPEC_EW["E-01"] = [
    O(0, _A),
    GEN("It is raining.", "报天气：把外面的事说给屋里人听——这也是在做事", _A, "weather", "E-01 exs[0] 天气陈述框", {"obj": "rain"}, ["rain"], ("rain", "ing", "raining")),
    GEN("Dinner is ready.", "报一声「饭好了」：听的人就知道该来吃饭了", _A, "ready", "E-01 mech『言内与言外』演示框", {"obj": "dinner"}, ["dinner", "ready"]),
    GEN("Please close the window.", "一个 please 把命令变成请求：请人动手关窗", _B, "close-window", "E-01 exs[0] 关窗情景框", {"verb": "close", "obj": "window"}, ["close", "window"], ("close", "base", "close")),
    GEN("Come to my birthday party, please.", "这是邀请：请人来参加生日会", _B, "party", "E-01 mech 邀请动作演示框", {"verb": "come", "obj": "party"}, ["come", "birthday", "party"], ("come", "base", "come")),
    GEN("Can you help me, please?", "请求帮忙：话一出口，就在请人做事", _B, "help-me", "E-01 mech 请求动作演示框", {"verb": "help"}, ["help"], ("help", "base", "help")),
    O(1, _C),
    GEN("Thank you for your help.", "感谢要说出口：谢的是对方帮过的忙", _C, "thank-help", "E-01 exs[1] 感谢动作演示框", {"verb": "thank", "obj": "help"}, ["thank", "help"], ("thank", "base", "thank")),
    GEN("I will help you tomorrow.", "这是承诺：把「我会帮」说出来，就是答应了", _C, "promise", "E-01 mech 承诺动作演示框", {"verb": "help"}, ["help", "tomorrow"], ("help", "base", "help")),
    GEN("— It's cold here. — Sorry. I will close the window.", "还是 exs 里那句：这次被听成了请求——对方道歉加起身关窗", _D, "cold-request", "E-01 exs[0] 对照框", {"verb": "close", "obj": "window"}, ["close", "window", "sorry"], ("close", "base", "close")),
    GEN("— It's cold here. — Yes, the window is open.", "同一句，这次只被当成陈述来接：说的是事实，没请人做什么", _D, "cold-fact", "E-01 exs[0] 对照框", {"verb": "open", "obj": "window"}, ["open", "window"], ("open", "base", "open")),
]

# ---- E-02 听话听用意（可变=外壳与事情：Can/Could/Would you…配不同的事；不变=问能力的外壳、干请求的事，要过『他想让我做什么』这一关；边界=真问能力时外壳就是字面意思）
_A, _B, _C, _D = "现成的间接请求：问『能』，要『做』", "换外壳、换事情：壳变活不变", "答到点子上：回应也是在做事", "边界：真问能力时，就按字面答"
SPEC_EW["E-02"] = [
    O(0, _A), O(1, _A),
    GEN("Can you close the door, please?", "还是请人做事：这次是关门——壳一样，事换了", _B, "close-door", "E-02 exs[1] 句框", {"verb": "close", "obj": "door"}, ["close", "door"], ("close", "base", "close")),
    GEN("Could you pass me the book, please?", "外壳升级成 Could：问得更客气，活还是『递给我』", _B, "pass-book", "E-02 exs[0] 句框", {"verb": "pass", "obj": "book"}, ["pass", "book"], ("pass", "base", "pass")),
    GEN("Can you help me with this bag?", "请人搭把手：问的是『能』，要的是帮忙拎包", _B, "help-bag", "E-02 exs[1] 句框", {"verb": "help", "obj": "bag"}, ["help", "bag"], ("help", "base", "help")),
    GEN("— Can you open the window? — Sure.", "答到点子上：Sure 加上起身开窗——听懂了用意", _C, "sure-window", "E-02 cases[0].right 回应框", {"verb": "open", "obj": "window"}, ["open", "window"], ("open", "base", "open")),
    GEN("— Can you pass me the salt? — Here you are.", "递过去就是回答：动作比 Yes 更对", _C, "here-salt", "E-02 exs[0] 情景回应框", {"verb": "pass", "obj": "salt"}, ["pass", "salt"], ("pass", "base", "pass")),
    GEN("— Can you help me carry the bag? — Sure.", "听懂是请你拎包：答应下来，活就接上了", _C, "carry-bag", "E-02 prb 餐桌版情景框", {"verb": "carry", "obj": "bag"}, ["carry", "help", "bag"], ("carry", "base", "carry")),
    GEN("— Can you swim? — Yes, I can.", "泳池边真问本事：这里问的就是能力，按字面答没错", _D, "swim-ability", "E-02 对照框", {"verb": "swim"}, ["swim"], ("swim", "base", "swim")),
    GEN("— Can you open the window? — Yes, I can. (He does not move.)", "只答字面、人不动：请求落了空——壳听对了，活没接住", _D, "not-move", "E-02 cases[0].wrong 标本框", {"verb": "open", "obj": "window"}, ["open", "window", "move"], ("open", "base", "open")),
]

# ---- E-03 答非所问是信号（可变=绕弯的方式：点评别样/给不准/给太少；不变=先默认对方在配合，绕弯本身就是信息；边界=真没听清、真不知道不是绕弯）
_A, _B, _C = "绕个弯回答：话里有话", "给多给少也是信号", "边界：真没接上，不是绕弯"
SPEC_EW["E-03"] = [
    O(0, _A),
    GEN("— Do you like my cake? — It looks very nice.", "只夸样子、不夸味道：绕开的那一半，就是他的回答", _A, "cake-looks", "E-03 exs[0] 对照框", {"verb": "look", "obj": "cake"}, ["look", "cake", "nice"], ("look", "3sg", "looks")),
    GEN("— Is Tom at home? — His bag is on the desk.", "不直接答在不在，给你一条证据自己想：他在——包都在桌上", _A, "bag-desk", "E-03 exs[0] 绕弯框", {"obj": "bag"}, ["bag", "desk", "home"]),
    GEN("— Is the soup good? — The bread is good.", "问汤答面包：和爆米花那次一样，绕开的就是答案", _A, "soup-bread", "E-03 exs[0] 句框", {"obj": "soup"}, ["soup", "bread", "good"]),
    O(1, _B),
    GEN("— What time is it? — It is a sunny day.", "问时间答天气：对不上号本身就是信号——他没在好好答", _B, "sunny-answer", "E-03 mech『违反即信号』演示框", {"obj": "day"}, ["sunny", "day"]),
    GEN("— Did you eat my cake? — The dog is under the table.", "问蛋糕答小狗：绕开话题，多半是心里有事", _B, "dog-table", "E-03 mech『违反即信号』演示框", {"obj": "dog"}, ["dog", "table", "cake"]),
    GEN("— Who broke the cup? — I don't know.", "推说不知道也是回答：他不想说，或者真的在躲", _B, "dont-know", "E-03 exs[1] 信息不足框", {"verb": "know", "obj": "cup"}, ["know", "cup"], ("know", "base", "know")),
    GEN("— Where is the zoo? — Sorry, I don't know.", "老实说不知道：这是直接回答，不是绕弯", _C, "zoo-sorry", "E-03 对照框", {"verb": "know", "obj": "zoo"}, ["know", "zoo", "sorry"], ("know", "base", "know")),
    GEN("— Can you hear me? — What? I can't hear you.", "真没听清：耳朵没接上，不算不配合", _C, "cant-hear", "E-03 对照框", {"verb": "hear"}, ["hear"], ("hear", "base", "hear")),
]

# ---- E-04 整块取用（可变=整块的场合：祝贺/见面/点餐/道别；不变=整存整取，不逐词现拼；边界=槽位可换、骨架不动）
_A, _B, _C, _D = "祝贺与见面：整块拿出来", "吃喝场合：整句点单", "道别：整块收尾", "边界：只换槽位，骨架不动"
SPEC_EW["E-04"] = [
    O(0, _A),
    GEN("Happy New Year!", "新年祝贺也是整块：想都不用想，张口就来", _A, "new-year", "E-04 exs[0] 祝贺框", {"obj": "year"}, ["happy", "year"]),
    GEN("Good morning! How are you?", "见面问候成对整块：早上打招呼就这一整串", _A, "morning", "E-04 mech『整存整取』演示框", {"obj": "morning"}, ["good", "morning"]),
    O(1, _B),
    GEN("Can I have some tea, please?", "把 water 换成 tea：整块还在，只是槽里换了东西", _B, "some-tea", "E-04 exs[1] 句框", {"obj": "tea"}, ["tea"]),
    GEN("Can I have a cake, please?", "点一块蛋糕：整句取用，不用现拼", _B, "a-cake", "E-04 exs[1] 句框", {"obj": "cake"}, ["cake"]),
    GEN("See you tomorrow!", "道别整块：明天见——整句存、整句取", _C, "see-tomorrow", "E-04 mech『整存整取』演示框", {"verb": "see"}, ["see", "tomorrow"], ("see", "base", "see")),
    GEN("Have a good day!", "送人出门的一整块：祝你一天顺利", _C, "good-day", "E-04 mech『整存整取』演示框", {"verb": "have", "obj": "day"}, ["have", "good", "day"], ("have", "base", "have")),
    GEN("Can I have a cup of tea, please?", "glass 换 cup、water 换 tea：只换槽位，骨架一点没动", _D, "cup-of-tea", "E-04 exs[1] 槽位框", {"obj": "cup"}, ["cup", "tea"]),
    GEN("Happy birthday, Tom!", "后面加上名字：整块还是那块，只是尾巴上多了一个槽", _D, "birthday-tom", "E-04 exs[0] 槽位框", {"obj": "birthday"}, ["happy", "birthday"]),
]

# ---- E-05 场合错更伤人（可变=错的种类：语法错/场合错；不变=归因不同——语法错被读作『还在学』，场合错被读作『人不好』；边界=场合错没有报错信号，没人提醒）
_A, _B, _C, _D = "语法小错：人家知道你在学", "场合错：句子全对，人却受伤", "换个场合，同样的话就对味", "边界：场合错了，没人会告诉你"
SPEC_EW["E-05"] = [
    O(0, _A),
    GEN("She doesn't like apples.", "把标本改对：语法错明明白白，改起来有章可循", _A, "doesnt-like", "E-05 exs[0] 对照框", {"obj": "apple"}, ["apple", "like"]),
    GEN("He don't like apples. — He is learning English.", "听的人心里想的是『他还在学』：语法错伤的是面子小事", _A, "he-learning", "E-05 mech『两种归因』演示框", {"verb": "learn", "obj": "apple"}, ["learn", "apple"], ("learn", "ing", "learning")),
    O(1, _B),
    GEN("Teacher, open the window!", "对老师下命令：每个词都对，场合全错", _B, "teacher-open", "E-05 exs[1] 场合框", {"verb": "open", "obj": "window"}, ["open", "window", "teacher"], ("open", "base", "open")),
    GEN("Give me the salt.", "在别人家餐桌上这么要盐：句子没错，听的人心里咯噔一下", _B, "give-salt", "E-05 exs[1] 场合框", {"verb": "give", "obj": "salt"}, ["give", "salt"], ("give", "base", "give")),
    GEN("— Pass me the ball! — Here!", "球场上对队友喊一声：同样的命令口吻，在这里完全对味", _C, "pass-ball", "E-05 对照框", {"verb": "pass", "obj": "ball"}, ["pass", "ball"], ("pass", "base", "pass")),
    GEN("— Give me your book. — Sure. We are good friends.", "好朋友之间直说没关系：关系近，命令就不扎人", _C, "good-friends", "E-05 对照框", {"verb": "give", "obj": "book"}, ["give", "book", "friend"], ("give", "base", "give")),
    GEN("A wrong word makes people smile. A wrong place makes people quiet.", "词错了人笑一笑，场合错了人一下安静——安静就是没说出口的判断", _D, "wrong-place", "E-05 mech『没有报错信号』演示框", {"verb": "make", "obj": "word"}, ["make", "word", "wrong", "people", "smile", "quiet"], ("make", "3sg", "makes")),
    GEN("No one tells him. He says it again tomorrow.", "没人提醒，他明天还这样说：场合错最难自己发现", _D, "no-one-tells", "E-05 mech『没有报错信号』演示框", {"verb": "tell", "obj": "tomorrow"}, ["tell", "tomorrow"], ("tell", "3sg", "tells")),
]

# ---- E-06 失误两分法（可变=失误类型：形式配错/场合判断错；不变=两类治法不同——形式类换说法，场合类讲逻辑；边界=纯语法错两类都不算）
_A, _B, _C = "形式配错：换个说法就好", "场合判断错：句子没错，错在对谁说", "边界：先分清是哪一类，再下药"
SPEC_EW["E-06"] = [
    O(0, _A), O(1, _A),
    OWN("Thank you!", "受夸回错的那句，换上这一句就对了：形式类失误，换说法即可", _A, "E-06 cases[1].right", ["thank"]),
    GEN("Could I have a book, please?", "和借笔那句同一个规约说法：换个东西借，形式照样对", _A, "could-book", "E-06 exs[1] 句框", {"verb": "have", "obj": "book"}, ["have", "book"], ("have", "base", "have")),
    O(2, _B),
    GEN("He says 'Come here now!' to the head teacher.", "话本身没语法错：错的是对校长用了喊人的口气——场合判断错", _B, "head-teacher", "E-06 exs[2] 场合框", {"verb": "say"}, ["say", "come", "here", "teacher"], ("say", "3sg", "says")),
    GEN("— Come and eat! — (to a good friend at home)", "同一句喊人吃饭，对好朋友说就完全没问题：场合一换，判断就变", _B, "come-eat", "E-06 exs[2] 对照框", {"verb": "come"}, ["come", "eat", "friend", "home"], ("come", "base", "come")),
    GEN("— Teacher, give me a pen. — Could I have a pen, please?", "两句同屏：一句是病，一句是药——形式类的错，换说法当场就好", _C, "pen-pair", "E-06 exs[0]/exs[1] 对照框", {"verb": "give", "obj": "pen"}, ["give", "have", "pen"], ("give", "base", "give")),
    GEN("The words are right, but the place is wrong.", "先分清：词句都对、场合不对——这是场合类，要讲场合的道理", _C, "place-wrong", "E-06 mech『两分法』演示框", {"obj": "word"}, ["word", "right", "wrong", "place"]),
    GEN("He don't go to school.", "这句是纯语法错：两类语用失误都不算，先把语法改对再说", _C, "dont-go", "E-06 对照框", {"verb": "go", "obj": "school"}, ["go", "school"], ("go", "base", "go")),
    GEN("First ask: is it the words, or is it the place?", "下药之前先分诊：错在说法，还是错在场合——分错类，药就白下", _C, "first-ask", "E-06 mech『对症治法』演示框", {"verb": "ask", "obj": "word"}, ["ask", "first", "word", "place"], ("ask", "base", "ask")),
]

# ---- E-07 礼貌滑动标尺（可变=事的大小与关系远近；不变=越压人越要缓冲，客气程度随之滑动；边界=小事对熟人客气过头，反而见外）
_A, _B, _C, _D = "默认款：情态问句当缓冲", "小事、熟人：可以更轻", "大事、陌生人：再升一级客气", "边界：客气过头，也会见外"
SPEC_EW["E-07"] = [
    O(0, _A),
    GEN("Could you open the window, please?", "默认款：情态问句加 please，多数请求都合身", _A, "could-window", "E-07 exs[0] 句框", {"verb": "open", "obj": "window"}, ["open", "window"], ("open", "base", "open")),
    GEN("Could you pass me the salt, please?", "餐桌上请人递盐：这一级客气刚刚好", _A, "could-salt", "E-07 exs[0] 句框", {"verb": "pass", "obj": "salt"}, ["pass", "salt"], ("pass", "base", "pass")),
    GEN("Pass me the pen, please.", "请同桌递支笔：事小人熟，一个 please 就够了", _B, "pass-pen", "E-07 prb 分级题说法", {"verb": "pass", "obj": "pen"}, ["pass", "pen"], ("pass", "base", "pass")),
    GEN("Can you help me?", "请同学搭把手：熟人小事，不用绕弯", _B, "can-help", "E-07 prb 分级题说法", {"verb": "help"}, ["help"], ("help", "base", "help")),
    O(1, _C),
    GEN("Would you mind helping me with this big bag?", "请陌生人帮着拎大包：事越大，话越要软", _C, "mind-bag", "E-07 exs[1] 句框", {"verb": "help", "obj": "bag"}, ["help", "bag", "big"], ("help", "ing", "helping")),
    GEN("Sorry, could you help me? This bag is very heavy.", "先垫一句 Sorry 再开口：给对方留足台阶", _C, "sorry-heavy", "E-07 prb 致歉垫话框", {"verb": "help", "obj": "bag"}, ["sorry", "help", "bag", "heavy"], ("help", "base", "help")),
    GEN("Would you mind passing me the pen?", "只递一支笔给同桌，却用了最高一级客气：同桌会觉得你见外了", _D, "mind-pen", "E-07 exs[1] 对照框", {"verb": "pass", "obj": "pen"}, ["pass", "pen"], ("pass", "ing", "passing")),
    GEN("— Pass me the pen. — Here you are.", "最亲近的人之间，干脆利落反而最自然", _D, "here-pen", "E-07 对照框", {"verb": "pass", "obj": "pen"}, ["pass", "pen"], ("pass", "base", "pass")),
]

# ---- E-08 回应看三件事（可变=三件事的组合：谁说/对谁说/上一句；不变=脱开这三样，谁也判不了对错；边界=回指句在上一句里没有着落，就不成立）
_A, _B, _C, _D = "看谁在说：同一句，换个人就变味", "看上一句：回应要有着落", "看对谁说：关系决定分寸", "边界：上一句没着落，回指句落空"
SPEC_EW["E-08"] = [
    O(0, _A),
    GEN("The cook says, 'It tastes good.' People look at her.", "厨师夸自己做的汤：同一句话，换成做饭的人说，味道就不对了", _A, "cook-says", "E-08 exs[0] 角色框", {"verb": "say", "obj": "cook"}, ["say", "cook", "taste", "good", "people", "look"], ("say", "3sg", "says")),
    GEN("A guest says, 'It tastes good.' The cook smiles.", "客人夸汤好喝，厨师笑了：谁说，决定了这句话成不成立", _A, "guest-says", "E-08 exs[0] 角色框", {"verb": "say", "obj": "guest"}, ["say", "guest", "taste", "good", "cook", "smile"], ("say", "3sg", "says")),
    O(1, _B),
    GEN("— Happy birthday! — Thank you.", "回得有根：上一句是祝福，这一句是道谢，对子接上了", _B, "birthday-thank", "E-08 exs[1] 回指框", {"verb": "thank"}, ["thank", "happy", "birthday"], ("thank", "base", "thank")),
    GEN("— I am sorry. — Never mind.", "道歉在前，安慰在后：回应挂在上一句上，才站得住", _B, "sorry-nevermind", "E-08 exs[1] 回指框", {"obj": "sorry"}, ["sorry"]),
    GEN("He says 'Give me your book' to his friend. It is fine.", "对好朋友直说：关系近，这么说没问题", _C, "friend-fine", "E-08 mech『关系判断』演示框", {"verb": "say", "obj": "book"}, ["say", "give", "book", "friend"], ("say", "3sg", "says")),
    GEN("He says it to the teacher. It is not fine.", "同一句换成对老师说：关系一变，分寸就变，对错也跟着变", _C, "teacher-notfine", "E-08 mech『关系判断』演示框", {"verb": "say"}, ["say", "teacher"], ("say", "3sg", "says")),
    GEN("Tom says, 'The same to you.' No one talked to him first.", "没人先跟他说话，他却回一句『你也一样』：回指没有着落，这句话落了空", _D, "same-nohome", "E-08 exs[1] 对照框", {"verb": "say"}, ["say", "talk", "first"], ("say", "3sg", "says")),
    GEN("— Thank you. — You are welcome.", "最稳的一对：道谢在前，回应在后，各就各位", _D, "you-are-welcome", "E-08 对照框", {"verb": "thank"}, ["thank", "welcome"], ("thank", "base", "thank")),
]

# ---- E-09 客套出国（可变=错位点：受夸/称呼/拒绝；不变=汉语程式直译会变味，要换英语的规矩；边界=有的客气话两边恰好一样，不用改）
_A, _B, _C, _D = "受夸：先说谢，不自谦", "称呼：直译会出戏", "拒绝与道别：说法要换家", "边界：两边恰好一样的，不用改"
SPEC_EW["E-09"] = [
    O(0, _A),
    GEN("— Your picture is very good. — Thank you.", "被夸先道谢：不推辞、不自谦，这一句就够了", _A, "picture-thank", "E-09 cases[0] 情景框", {"obj": "picture"}, ["picture", "good", "thank"], ("thank", "base", "thank")),
    GEN("— You sing very well. — Thank you. I like singing.", "受夸回谢，再加一句自己的话：大方接住夸奖", _A, "sing-thank", "E-09 mech『客套出国』演示框", {"verb": "sing"}, ["sing", "thank", "like"], ("sing", "ing", "singing")),
    GEN("— Good morning, Miss Green.", "称呼老师要用 Miss/Mr 加姓：不直译『老师』这个词本身", _B, "miss-green", "E-09 mech『高频错位点』演示框", {"obj": "morning"}, ["good", "morning", "green"]),
    GEN("— Good morning, Mr Brown.", "男老师称 Mr：称呼的规矩，两边不是一回事", _B, "mr-brown", "E-09 mech『高频错位点』演示框", {"obj": "morning"}, ["good", "morning", "brown"]),
    GEN("We do not say 'Teacher Green' in English.", "把『格林老师』一个词一个词搬过去，英语里不成立：这就是直译出戏", _B, "not-teacher-green", "E-09 对照框", {"verb": "say"}, ["say", "teacher", "green"], ("say", "base", "say")),
    GEN("— Have some more cake. — No, thank you. I am full.", "婉拒也要带谢：先谢再拒，不说硬邦邦的不要", _C, "more-cake", "E-09 mech『客套出国』演示框", {"obj": "cake"}, ["cake", "thank", "full"]),
    GEN("We say 'Take care' to say goodbye.", "道别不说『慢慢走』：英语里换上 Take care 才对味", _C, "take-care", "E-09 mech『高频错位点』演示框", {"verb": "say", "obj": "care"}, ["say", "care", "goodbye"], ("say", "base", "say")),
    GEN("'Thank you' is kind in Chinese and in English.", "这一句两边一样：道谢的客气，全世界都通", _D, "thank-both", "E-09 对照框", {"verb": "thank"}, ["thank", "kind"], ("thank", "base", "thank")),
    GEN("We say it in China. We say it in London, too.", "在中国这么说，在伦敦也这么说：少数说法不用换家", _D, "china-london", "E-09 对照框", {"verb": "say"}, ["say"], ("say", "base", "say")),
]

# ---- E-10 四块拼图（可变=哪一块当班：成篇/语法/得体/自救；不变=四块合起来才叫会说，语法只占一块；边界=单块满分，不等于会说）
_A, _B, _C, _D, _E = "成篇这一块：连着说得成段", "语法这一块：句子本身对不对", "得体这一块：合不合场合", "自救这一块：卡住有办法", "边界：只有一块强，还是不会说"
SPEC_EW["E-10"] = [
    O(0, _A),
    GEN("I have a dog. It is small. It likes to run.", "连着三句说一只狗：话说成段，成篇这一块在当班", _A, "dog-run", "E-10 exs[0] 成篇框", {"verb": "run", "obj": "dog"}, ["dog", "run", "small", "like"], ("run", "base", "run")),
    GEN("She has a red bag.", "先看句子本身：词对、序对——这是语法这一块", _B, "red-bag", "E-10 mech『四块拼图』演示框", {"verb": "have", "obj": "bag"}, ["have", "bag", "red"], ("have", "3sg", "has")),
    GEN("They are playing in the park.", "句子站得稳：语法块管的就是这一句对不对", _B, "playing-park", "E-10 mech『四块拼图』演示框", {"verb": "play", "place": "park"}, ["play", "park"], ("play", "ing", "playing")),
    O(1, _C),
    GEN("Sorry, can I use your pen?", "先垫一个 Sorry 再开口借：得体块在当班", _C, "sorry-pen", "E-10 exs[1] 得体框", {"verb": "use", "obj": "pen"}, ["use", "pen", "sorry"], ("use", "base", "use")),
    O(2, _D),
    GEN("I don't know the word for it. It is long. We write with it.", "说不出『笔』，就绕着样子说：自救块把话接下去", _D, "write-with-it", "E-10 exs[2] 自救框", {"verb": "write"}, ["write", "word", "long", "know"], ("write", "base", "write")),
    GEN("Every word is right. But he stops. He can't go on.", "每个词都对，却连不成话：缺的不是语法块，是成篇和自救", _E, "cant-go-on", "E-10 mech『四块拼图』演示框", {"verb": "stop", "obj": "word"}, ["stop", "word", "right"], ("stop", "3sg", "stops")),
    GEN("She knows many words. But she can't talk with a friend.", "词背得再多，不会连、不会救，见了人还是开不了口", _E, "many-words", "E-10 对照框", {"verb": "know", "obj": "word"}, ["know", "word", "talk", "friend"], ("know", "3sg", "knows")),
    GEN("He can say one sentence. Then he stops and looks at the teacher.", "一句就停、等老师救：四块里缺了两块的样子", _E, "one-sentence", "E-10 对照框", {"verb": "say", "obj": "sentence"}, ["say", "sentence", "stop", "look", "teacher"], ("say", "base", "say")),
]

# ---- E-11 卡壳自救（可变=自救的招数：求助句/打比方/绕着样子说；不变=不停摆，先把话接下去；边界=停下来死查词典，是中断不是自救）
_A, _B, _C, _D = "求助句：问一句就接上", "打比方：说不出名字，说像什么", "绕着样子说：描出来给对方猜", "边界：停下来死等，不是自救"
SPEC_EW["E-11"] = [
    O(0, _A),
    GEN("How do you say '伞' in English?", "把不会的词直接拿出来问：求助句要整块存好，张口就能用", _A, "how-say", "E-11 exs[0] 句框", {"verb": "say"}, ["say"], ("say", "base", "say")),
    GEN("What is this in English?", "指着东西问一句：话没停，词也学到了", _A, "what-this", "E-11 exs[0] 句框", {"frame": "what is this"}, []),
    O(1, _B),
    GEN("It's like a small house for a dog.", "说不出『狗窝』，就说像什么：给狗住的小房子", _B, "dog-house", "E-11 exs[1] 比方框", {"obj": "house"}, ["house", "dog", "small", "like"]),
    GEN("It's like a bird, but it can't fly. It swims in the cold sea.", "说不出『企鹅』：像鸟、不会飞、在冷海里游——比方把意思送到了", _B, "bird-swims", "E-11 exs[1] 比方框", {"verb": "swim", "obj": "bird"}, ["bird", "swim", "fly", "cold", "sea"], ("swim", "3sg", "swims")),
    GEN("We hold it over our heads when it rains.", "说不出『伞』，绕着用处说：下雨时举在头顶的东西", _C, "hold-rains", "E-11 mech『补救即能力』演示框", {"verb": "hold"}, ["hold", "head", "rain"], ("hold", "base", "hold")),
    GEN("You open it when it rains. It keeps the rain off you.", "接着描：打开它，雨就淋不到你——对方一听就懂", _C, "open-rains", "E-11 mech『补救即能力』演示框", {"verb": "open"}, ["open", "rain", "keep"], ("open", "base", "open")),
    GEN("He stops. He looks in the book for a long time. The talk is over.", "停下来埋头查很久：话断了——这是中断，不是自救", _D, "stops-looks", "E-11 对照框", {"verb": "stop"}, ["stop", "look", "book", "long", "talk"], ("stop", "3sg", "stops")),
    GEN("Say it in a new way. Don't stop.", "自救的口令：换个说法，别停下来", _D, "new-way", "E-11 mech『求生句库存』演示框", {"verb": "say"}, ["say", "new", "stop"], ("say", "base", "say")),
]

# ---- E-12 得体要专门教（可变=同一请求在教前教后的两种样子；不变=语法水平不会自动带来得体，得体靠显性教；边界=只背说法不看场合，照样会错）
_A, _B, _C, _D = "没教之前：语法全对、场合不对", "专门教过之后：换上得体的说法", "老师把规矩点在明处", "边界：只背说法、不看场合，还会错"
SPEC_EW["E-12"] = [
    O(0, _A),
    GEN("Teacher, give me your book.", "对老师要书也是直给命令：句子没错，错在没人教过他场合", _A, "give-book", "E-12 exs[0] 场合框", {"verb": "give", "obj": "book"}, ["give", "book", "teacher"], ("give", "base", "give")),
    GEN("Close the door. Now.", "词都对、序都对：得体不会自己从语法里长出来", _A, "close-now", "E-12 exs[0] 场合框", {"verb": "close", "obj": "door"}, ["close", "door"], ("close", "base", "close")),
    O(1, _B),
    GEN("Could you help me, please?", "教过之后，帮忙也换上了情态问句：得体是教出来的", _B, "could-help", "E-12 exs[1] 句框", {"verb": "help"}, ["help"], ("help", "base", "help")),
    GEN("Could I have a pen, please?", "借笔也一样：规矩点明了，孩子马上就会用", _B, "could-pen", "E-12 exs[1] 句框", {"verb": "have", "obj": "pen"}, ["have", "pen"], ("have", "base", "have")),
    GEN("The teacher says, 'Say it in a kind way.'", "老师把话说在明处：这样说，才客气——规矩要出声", _C, "kind-way", "E-12 mech『显性教更快』演示框", {"verb": "say"}, ["say", "teacher", "kind"], ("say", "3sg", "says")),
    GEN("Now we know: ask, don't tell.", "点明了就记住：对人是『请』，不是『令』", _C, "ask-dont-tell", "E-12 mech『显性教更快』演示框", {"verb": "know"}, ["know", "ask", "tell"], ("know", "base", "know")),
    GEN("Good words in a wrong place are still wrong.", "说法背得再熟，用错场合还是错：背说法不能代替看场合", _D, "wrong-place", "E-12 对照框", {"obj": "word"}, ["word", "good", "wrong", "place"]),
    GEN("We learn the words. We learn the place, too.", "两样一起学：说什么，和在哪儿说", _D, "learn-place", "E-12 对照框", {"verb": "learn", "obj": "word"}, ["learn", "word", "place"], ("learn", "base", "learn")),
]

# ---- E-13 相邻对（可变=对子的种类：问候/提问/招待/邀请/道别；不变=第一部分发出去，就预定了第二部分；边界=该接不接，沉默本身也是回答）
_A, _B, _C, _D = "问候与提问：对子最紧", "招待与邀请：接得有来有回", "道别：也要成对收尾", "边界：该接不接，沉默也是回答"
SPEC_EW["E-13"] = [
    O(0, _A), O(2, _A),
    GEN("— How are you? — I am fine, thank you.", "问身体、答身体：问题一出，回答的活就定好了", _A, "how-are-you", "E-13 exs[2] 提问框", {"verb": "thank"}, ["thank", "fine"], ("thank", "base", "thank")),
    O(1, _B),
    GEN("— Come to my party! — Thank you. I will come.", "邀请发出去，接回来的是接受：对子接上了", _B, "party-come", "E-13 mech『相邻对』演示框", {"verb": "come", "obj": "party"}, ["come", "party", "thank"], ("come", "base", "come")),
    GEN("— Would you like some cake? — Yes, please.", "招待吃的，接的是要或不要：第二句早被第一句定好", _B, "like-cake", "E-13 exs[1] 招待框", {"obj": "cake"}, ["cake", "like"]),
    GEN("— Goodbye! — Goodbye! See you tomorrow.", "道别也是对子：你说再见，我回再见", _C, "goodbye-pair", "E-13 mech『话轮交接』演示框", {"verb": "see"}, ["see", "tomorrow", "goodbye"], ("see", "base", "see")),
    GEN("— Good night! — Good night!", "睡觉前的道别成对出现：一句出去，一句回来", _C, "good-night", "E-13 mech『话轮交接』演示框", {"obj": "night"}, ["good", "night"]),
    GEN("— Would you like some tea? — (No one says a word.)", "招待发出去，没人接：空着的那一格，本身就是一种回答", _D, "no-one-says", "E-13 prb 邀请情景框", {"verb": "say", "obj": "tea"}, ["say", "tea", "word"], ("say", "3sg", "says")),
    GEN("She asks him a question. He does not answer. He walks away.", "该答不答、转身走开：他什么都没说，可意思已经传到了", _D, "walks-away", "E-13 prb 邀请情景框", {"verb": "ask", "obj": "question"}, ["ask", "question", "answer", "walk"], ("ask", "3sg", "asks")),
]

# ---- E-14 注意到才算数（可变=被指给看的规矩：客气说法/回应方式；不变=听见不等于看见，注意力被引过去才学得会；边界=听一百遍没人指，照样看不见）
_A, _B, _C, _D = "听过很多遍，还是没看见", "有人指给他看", "看见之后，就变了", "边界：没人指，听一百遍也白听"
SPEC_EW["E-14"] = [
    GEN("He hears 'Could you help me?' every day.", "这句话他天天听：耳朵听到了，脑子没记下", _A, "hears-everyday", "E-14 mech『听见≠看见』演示框", {"verb": "hear"}, ["hear", "help", "day"], ("hear", "3sg", "hears")),
    GEN("The teacher says it again and again. He does not see it.", "老师说了很多遍，他还是没看见里面的规矩", _A, "again-again", "E-14 mech『听见≠看见』演示框", {"verb": "say"}, ["say", "teacher", "see", "again"], ("say", "3sg", "says")),
    GEN("We hear songs in English every day.", "歌天天放：听见是听见，规矩藏在里面没被看见", _A, "songs-everyday", "E-14 mech『听见≠看见』演示框", {"verb": "hear", "obj": "song"}, ["hear", "song", "day"], ("hear", "base", "hear")),
    GEN("Look! She says 'Could you', not 'Give me'.", "有人一指：看，她说的是 Could you，不是 Give me——规矩现形了", _B, "look-she-says", "E-14 mech『把注意力引过去』演示框", {"verb": "say"}, ["say", "look", "give"], ("say", "3sg", "says")),
    GEN("The teacher points to the word 'please'.", "老师指着 please 说：客气就藏在这个词里", _B, "points-please", "E-14 mech『把注意力引过去』演示框", {"verb": "point", "obj": "word"}, ["point", "word", "please", "teacher"], ("point", "3sg", "points")),
    GEN("Now he hears it. Now he sees it.", "被指过以后：同一句话，听见了，也看见了", _C, "now-he-sees", "E-14 mech『听见≠看见』演示框", {"verb": "hear"}, ["hear", "see"], ("hear", "3sg", "hears")),
    GEN("He says, 'Could you open the window, please?'", "看见了就用得出来：这次他自己说对了场合", _C, "he-says-could", "E-14 mech『把注意力引过去』演示框", {"verb": "say"}, ["say", "open", "window"], ("say", "3sg", "says")),
    GEN("She can say it now. She sees how it works.", "她不光会说，还看见了它为什么这么说", _C, "sees-how", "E-14 mech『把注意力引过去』演示框", {"verb": "say"}, ["say", "see"], ("say", "base", "say")),
    GEN("One hundred times is not enough. No one shows him.", "听一百遍也没用：没人指给他看，规矩一直隐形", _D, "hundred-times", "E-14 hl 演示框", {"verb": "show"}, ["show", "hundred"], ("show", "3sg", "shows")),
    GEN("First we look. Then we learn.", "顺序是这样：先看见，再学会", _D, "first-look", "E-14 mech『听见≠看见』演示框", {"verb": "look"}, ["look", "learn", "first"], ("look", "base", "look")),
]

# ---- E-15 自我修复（可变=修复的办法：重说/换词/I mean 接回；不变=说错了先自己接回来，不必停摆等纠正；边界=别人抢着打断，修复就走不完）
_A, _B, _C, _D = "自己改回来：说错当场修", "换个词接回来", "修复的小词：no、sorry、I mean", "边界：先让他说完，修复才走得完"
SPEC_EW["E-15"] = [
    O(0, _A),
    GEN("She have — she has a dog.", "主语说错了，自己重说一遍：话没停，句子修好了", _A, "she-has", "E-15 exs[0] 修复框", {"obj": "dog"}, ["dog"]),
    GEN("They was — they were happy.", "was 说出口又改成 were：修复就是这样一顿、一改", _A, "they-were", "E-15 exs[0] 修复框", {"obj": "happy"}, ["happy"]),
    O(1, _B),
    GEN("I see a cat — I mean, a dog!", "词说错了，用 I mean 把对的词接回来", _B, "cat-dog", "E-15 exs[1] 修复框", {"verb": "see", "obj": "cat"}, ["see", "cat", "dog", "mean"], ("see", "base", "see")),
    GEN("We go to the zoo on Sunday — I mean, on Saturday.", "日子说错了，换回来接着说：听的人完全跟得上", _B, "sunday-saturday", "E-15 exs[1] 修复框", {"verb": "go", "obj": "zoo"}, ["go", "zoo"], ("go", "base", "go")),
    GEN("I like coffee — no, tea.", "一个 no 就把词换了：最短的修复", _C, "coffee-tea", "E-15 mech『修复偏好』演示框", {"verb": "like", "obj": "coffee"}, ["like", "coffee", "tea"], ("like", "base", "like")),
    GEN("He is my friend — sorry, my good friend.", "sorry 在这里不是道歉，是『我说得不够准，重来』的信号", _C, "sorry-friend", "E-15 mech『修复偏好』演示框", {"obj": "friend"}, ["friend", "sorry", "good"]),
    GEN("She says a word wrong. She says it again. Now it is right.", "自己说错、自己重说、说对：修复走完，谁也没打断她", _D, "says-again", "E-15 mech『先让他说完』演示框", {"verb": "say", "obj": "word"}, ["say", "word", "wrong", "right", "again"], ("say", "3sg", "says")),
    GEN("Don't stop him. Let him finish.", "听的人忍住不打断：修复的路，让他自己走完", _D, "let-finish", "E-15 mech『先让他说完』演示框", {"verb": "stop"}, ["stop", "finish"], ("stop", "base", "stop")),
    GEN("He stops. The teacher says the word. He starts again.", "一停一等，话就断了：等纠正的样子，和自己接回来不一样", _D, "stops-teacher", "E-15 对照框", {"verb": "stop"}, ["stop", "teacher", "say", "word", "start", "again"], ("stop", "3sg", "stops")),
]

# ---- W-01 读者不在面前（可变=交代的要素：何时/何地/何人/何事；不变=每个信息都要用文字亲手交到读者眼前；边界=当面说话可以指、可以省，写在纸上不行）
_A, _B, _C, _D = "没交代的样子：自己懂，读者懵", "一样样交代清楚", "人物先报名，读者才认得", "边界：当面可以指，纸上不能指"
SPEC_EW["W-01"] = [
    O(0, _A),
    GEN("He put it there and was happy.", "习作标本：it 是什么、there 是哪儿、为什么高兴——读者全得猜", _A, "put-it-there", "W-01 prb 习作情景框", {"verb": "put"}, ["put", "happy"], ("put", "past", "put")),
    O(1, _B),
    GEN("Last Sunday, I went to the park with my sister. We flew a kite.", "何时、和谁、做什么，一样不缺：读者眼前有了画", _B, "flew-kite", "W-01 exs[1] 交代框", {"verb": "fly", "place": "park"}, ["fly", "park", "sister", "kite", "Sunday"], ("fly", "past", "flew")),
    GEN("We went to the beach in the afternoon. We swam in the sea.", "地点和时间都写在纸上：没去过的人也看得懂", _B, "beach-swam", "W-01 exs[1] 交代框", {"verb": "swim", "place": "beach"}, ["swim", "beach", "afternoon", "sea"], ("swim", "past", "swam")),
    GEN("My friend Tom has a small dog. The dog likes to run.", "人物先报名：先说清是谁的狗，后面再提它就不乱", _C, "friend-tom", "W-01 mech『以写者为中心』演示框", {"verb": "run", "obj": "dog"}, ["friend", "dog", "run", "small", "like"], ("run", "base", "run")),
    GEN("This is my grandpa. He lives in a small town.", "先把人介绍给读者：他是谁、住哪儿，后文才有着落", _C, "grandpa-town", "W-01 mech『以写者为中心』演示框", {"verb": "live", "obj": "grandpa"}, ["live", "grandpa", "town", "small"], ("live", "3sg", "lives")),
    GEN("— Where did you go? — There. (He points at the zoo.)", "当面说可以指：手指一指，对方就懂——这是说话的便宜", _D, "points-zoo", "W-01 对照框", {"verb": "point", "obj": "zoo"}, ["point", "zoo", "go"], ("point", "3sg", "points")),
    GEN("On paper, 'there' tells the reader nothing.", "同一个 there 写在纸上：没有手指，读者什么都不知道", _D, "paper-there", "W-01 对照框", {"verb": "tell", "obj": "reader"}, ["tell", "paper", "reader"], ("tell", "3sg", "tells")),
    GEN("In the morning, Mum took me to the zoo. We saw the monkeys.", "时间和人物都交代了：这一段谁看都明白", _B, "mum-zoo", "W-01 exs[1] 交代框", {"verb": "take", "place": "zoo"}, ["take", "morning", "zoo", "monkey"], ("take", "past", "took")),
]

# ---- W-02 三过程回环（可变=当下在哪个过程：想/写/改，往哪个方向切；不变=三件事来回切换，不是一条直线；边界=提纲定死不许动，是流水线的害）
_A, _B, _C, _D = "落笔：先把想法变成文字", "写着写着，改计划", "改着改着，重写出细节", "边界：一条直线走到底，文章是死的"
SPEC_EW["W-02"] = [
    O(0, _A),
    GEN("I write: My cat is small and white.", "落笔就是这样：先有一句算一句，想法先落到纸上", _A, "write-cat", "W-02 exs[0] 落笔框", {"verb": "write", "obj": "cat"}, ["write", "cat", "small", "white"], ("write", "base", "write")),
    GEN("First, I think: what can I write about my dog?", "想也在半路回来：写之前想，写中间还会再想", _A, "think-dog", "W-02 mech『三过程回环』演示框", {"verb": "think", "obj": "dog"}, ["think", "write", "dog", "first"], ("think", "base", "think")),
    O(1, _B),
    GEN("I stop. A new idea comes: the dog can find a lost ball!", "新想法半路杀到：停下来，把计划改一改，再接着写", _B, "new-idea", "W-02 exs[1] 回看框", {"verb": "come", "obj": "idea"}, ["come", "stop", "idea", "find", "ball", "dog"], ("come", "3sg", "comes")),
    O(2, _C),
    GEN("The new sentence says what the dog does: It runs, it jumps, it waits.", "重写不是抄一遍：句子长出动作，狗活起来了", _C, "runs-jumps", "W-02 exs[2] 重写框", {"verb": "say", "obj": "sentence"}, ["say", "sentence", "dog", "run", "jump", "wait"], ("say", "3sg", "says")),
    GEN("I read my sentence again. I make it longer.", "回看一遍再改长：想、写、改就这样转圈", _C, "read-again", "W-02 mech『三过程回环』演示框", {"verb": "read", "obj": "sentence"}, ["read", "sentence", "make", "again"], ("read", "base", "read")),
    GEN("He writes the plan. He never looks back. The story stays thin.", "计划定死、从不回头：文章薄得像纸——流水线的害", _D, "never-looks", "W-02 mech『流水线之害』演示框", {"verb": "look", "obj": "plan"}, ["look", "write", "plan", "story", "thin"], ("look", "3sg", "looks")),
    GEN("A good writer goes back again and again.", "好写手都是转圈的：回去改，不是错，是本事", _D, "goes-back", "W-02 对照框", {"verb": "go", "obj": "writer"}, ["go", "writer", "good", "again"], ("go", "3sg", "goes")),
    GEN("Write a word, think a little, write again.", "最小的回环：一句之内也在想—写—改", _A, "word-think", "W-02 mech『三过程回环』演示框", {"verb": "write", "obj": "word"}, ["write", "word", "think", "little", "again"], ("write", "base", "write")),
]

# ---- W-03 知识讲述是发展阶段（可变=讲述的题材，与转化时补上的维度：原因/感受；不变=一件件倒出是这个年龄的正常样子，转化靠回看时多问一句；边界=列得再多，不回看仍是讲述）
_A, _B, _C, _D = "知识讲述的样子：一件件倒出来", "回看时多问一句：为什么", "边写边想清楚", "边界：列得再多，不回看还是讲述"
SPEC_EW["W-03"] = [
    O(0, _A),
    GEN("I went to the park. I played football. I ate an ice cream.", "想到什么写什么，一件接一件：这就是知识讲述的标本", _A, "park-football", "W-03 exs[0] 讲述框", {"verb": "play", "place": "park"}, ["play", "park", "football", "eat"], ("play", "past", "played")),
    GEN("She got a new bag. She put her books in it. She went to school.", "还是顺次倒出：不丢人，这是低龄写手的起点", _A, "new-bag", "W-03 exs[0] 讲述框", {"verb": "get", "obj": "bag"}, ["get", "bag", "book", "school", "new"], ("get", "past", "got")),
    O(1, _B),
    GEN("I was happy because my friend came to play.", "多问一句为什么，感受就出来了：转化的一小步", _B, "happy-because", "W-03 exs[1] 转化框", {"verb": "come", "obj": "friend"}, ["come", "happy", "friend", "play"], ("come", "past", "came")),
    GEN("I went to bed late, so I was tired in class.", "把原因接上结果：读者不用猜，事情连成了一条线", _B, "bed-late", "W-03 exs[1] 转化框", {"verb": "go", "obj": "bed"}, ["go", "bed", "late", "tired", "class"], ("go", "past", "went")),
    GEN("The dog was not bad. It was hungry.", "回看时想明白：狗不是坏，是饿——写的时候把道理想清楚", _C, "dog-hungry", "W-03 mech『知识转化』演示框", {"obj": "dog"}, ["dog", "hungry"]),
    GEN("At first I wrote 'a bird'. Then I saw it again in my head: a small yellow bird.", "写着写着看得更清：从『一只鸟』到『一只小黄鸟』", _C, "yellow-bird", "W-03 mech『知识转化』演示框", {"verb": "write", "obj": "bird"}, ["write", "bird", "small", "yellow", "see", "head"], ("write", "past", "wrote")),
    GEN("He writes ten things. He does not look back. Nothing changes.", "十件事列完就停：不回看，讲述还是讲述", _D, "ten-things", "W-03 对照框", {"verb": "write", "obj": "thing"}, ["write", "thing", "look"], ("write", "3sg", "writes")),
    GEN("More is not better. Thinking is better.", "转化不靠多写几件，靠多想一层", _D, "more-not-better", "W-03 对照框", {}, []),
]

# ---- W-04 修改分两层（可变=改的层：意思层/字词层；不变=顺序不能反：先意思、后字词；边界=先抠字词，整段一删全白改）
_A, _B, _C, _D = "草稿：先看意思，别管字词", "先改意思层：故事理顺", "再改字词层：一处一处抠", "边界：顺序反了，白费功夫"
SPEC_EW["W-04"] = [
    O(0, _A),
    GEN("First, read for the story: Who runs? Who is happy?", "第一遍只问故事：谁在跑、谁开心——字词先放一边", _A, "read-story", "W-04 exs[0] 草稿框", {"verb": "read", "obj": "story"}, ["read", "story", "happy", "first"], ("read", "base", "read")),
    O(1, _B),
    GEN("Move this sentence to the front. Now the story is clear.", "把句子挪个位置，故事就顺了：这是意思层的改", _B, "move-front", "W-04 mech『两层修改』演示框", {"verb": "move", "obj": "sentence"}, ["move", "sentence", "front", "story", "clear"], ("move", "base", "move")),
    GEN("Cut the long part. Keep the good part.", "该删的删、该留的留：动的是整段的意思，不是某个词", _B, "cut-part", "W-04 mech『两层修改』演示框", {"verb": "cut", "obj": "part"}, ["cut", "long", "good", "part"], ("cut", "base", "cut")),
    GEN("'Run' must be 'ran'. 'I' must be 'me'.", "轮到字词层：一处一处对——跑要用 ran，我要用 me", _C, "run-ran", "W-04 exs[1] 字词框", {"obj": "run"}, ["run"]),
    GEN("Now check the small words and the full stops.", "最后查小词和句号：故事已经顺了，才轮到这些", _C, "check-small", "W-04 mech『两层修改』演示框", {"verb": "check", "obj": "word"}, ["check", "small", "word", "stop"], ("check", "base", "check")),
    GEN("Is it 'ran' or 'run'? Look at the time words.", "拿不准就看时间词：字词层的查法也是有章可循的", _C, "time-words", "W-04 exs[1] 字词框", {"verb": "look", "obj": "time"}, ["look", "time", "word", "run"], ("look", "base", "look")),
    GEN("He makes every word right. Then he must cut the whole page.", "先抠字词的下场：整页要删，抠好的字词全白抠了", _D, "whole-page", "W-04 prb 情景框", {"verb": "make", "obj": "word"}, ["make", "word", "right", "cut", "page"], ("make", "3sg", "makes")),
    GEN("First the story, then the words. Never the other way.", "顺序口令：先故事，后字词，反过来就白干", _D, "first-story", "W-04 mech『顺序不可反』演示框", {"obj": "story"}, ["first", "story", "word"]),
]

# ---- W-05 接着写（可变=接住的东西：情节/句式/词；不变=先读懂原文，理解会把产出拉平；边界=撇开原文另编一个，不是续写）
_A, _B, _C, _D = "先读懂原文", "顺势接着写", "读过的说法，悄悄跑进笔下", "边界：撇开原文另编，不是续写"
SPEC_EW["W-05"] = [
    O(0, _A),
    GEN("Read the story first. What do you see? A little bird that can't fly.", "续写第一步是读：先看清原文里有谁、在干什么", _A, "read-first", "W-05 exs[0] 原文框", {"verb": "read", "obj": "story"}, ["read", "story", "bird", "fly", "first", "see"], ("read", "base", "read")),
    GEN("The words you read stay in your head.", "读过的词句留在脑子里：这就是续写时的本钱", _A, "words-stay", "W-05 mech『拉平效应』演示框", {"verb": "read", "obj": "word"}, ["read", "word", "head"], ("read", "base", "read")),
    O(1, _B),
    GEN("It saw a tree. 'I can try,' it said.", "接着原文往下编：鸟还在、事还在，情节接得上", _B, "saw-tree", "W-05 exs[1] 续写框", {"verb": "say", "obj": "tree"}, ["say", "tree", "try", "see"], ("say", "past", "said")),
    GEN("The bird cried, but it did not stop.", "续写要接住情绪：哭过、没停——和原文的劲是一股劲", _B, "bird-cried", "W-05 exs[1] 续写框", {"verb": "stop", "obj": "bird"}, ["stop", "bird", "cry"], ("stop", "base", "stop")),
    GEN("Day after day, the rain came down.", "原文的说法被顺手借来：day after day 是刚读到的节奏", _C, "rain-came", "W-05 exs[1] 句式框", {"verb": "come", "obj": "rain"}, ["come", "day", "rain"], ("come", "past", "came")),
    GEN("One morning, the bird flew over the river.", "飞过河：新情节用了原文练熟的飞法说法", _C, "flew-river", "W-05 exs[1] 句式框", {"verb": "fly", "obj": "bird"}, ["fly", "morning", "bird", "river"], ("fly", "past", "flew")),
    GEN("He reads about a bird. Then he writes about a car.", "读的是鸟、写的是车：内容不接、说法不用——这不叫续写", _D, "bird-car", "W-05 prb 情景框", {"verb": "read", "obj": "bird"}, ["read", "bird", "write", "car"], ("read", "3sg", "reads")),
    GEN("The new story must hold the old story's hand.", "续写的规矩：新故事牵着老故事的手往前走", _D, "hold-hand", "W-05 对照框", {"verb": "hold", "obj": "story"}, ["hold", "new", "story", "old", "hand"], ("hold", "base", "hold")),
]

# ---- W-06 资源分工（可变=借的框架：因果/开头/日常句型；不变=内容自己发明，说法先借现成；边界=两头都发明会卡死，两头都借是抄）
_A, _B, _C, _D = "说法借框架，内容是自己的", "日常句型，整块借来", "内容这一头，自己发明", "边界：两头都发明卡死，两头都借是抄"
SPEC_EW["W-06"] = [
    O(0, _A), O(1, _A),
    GEN("My favourite animal is the panda, because it is cute and quiet.", "还是借 because 的架子：内容换成熊猫，是我自己的", _A, "panda-because", "W-06 exs[0] 框架框", {"obj": "panda"}, ["panda", "animal", "cute", "quiet"]),
    GEN("I like winter because I can play with snow.", "框架借现成的，喜欢冬天的理由是自己的", _A, "winter-snow", "W-06 exs[0] 框架框", {"verb": "play", "obj": "snow"}, ["play", "winter", "snow", "like"], ("play", "base", "play")),
    GEN("In the afternoon, I play football with my friends.", "下午做什么，用学过的日常句型整块说：稳当", _B, "afternoon-football", "W-06 exs[1] 句型框", {"verb": "play", "obj": "football"}, ["play", "afternoon", "football", "friend"], ("play", "base", "play")),
    GEN("On Sunday, we go to the park and fly a kite.", "周末去公园放风筝：说法是借的，事是我的", _B, "sunday-kite", "W-06 exs[1] 句型框", {"verb": "fly", "obj": "kite"}, ["fly", "Sunday", "park", "kite", "go"], ("fly", "base", "fly")),
    GEN("My story is about a dog that can talk.", "会说话的狗：这个主意没人借我，是我自己想的", _C, "dog-talk", "W-06 mech『资源分工』演示框", {"verb": "talk", "obj": "dog"}, ["talk", "story", "dog"], ("talk", "base", "talk")),
    GEN("No one in my class writes this story. It is mine.", "内容自己发明的样子：全班只有我写这个故事", _C, "story-mine", "W-06 mech『资源分工』演示框", {"verb": "write", "obj": "story"}, ["write", "class", "story"], ("write", "3sg", "writes")),
    GEN("New story, new sentences, all at once — his pen stops.", "两头一起发明的下场：笔停在半路，什么都写不出来", _D, "pen-stops", "W-06 prb 情景框", {"verb": "stop", "obj": "pen"}, ["stop", "new", "story", "sentence", "pen"], ("stop", "3sg", "stops")),
    GEN("He takes the story from the book. He takes the sentences, too. Nothing is his.", "两头都借：故事是书里的，句子也是书里的——这叫抄", _D, "takes-story", "W-06 对照框", {"verb": "take", "obj": "story"}, ["take", "story", "book", "sentence"], ("take", "3sg", "takes")),
]

# ---- W-07 写不出来是扳机（可变=卡住的位置：词/说法/拼法；不变=卡住就记下缺口，听读时专门抓它，再写一遍验证；边界=含糊绕过去，缺口永远在）
_A, _B, _C, _D = "卡住的时刻：缺口被照出来", "把缺口记下来", "听读时，专门抓它", "边界：绕过去，缺口还在"
SPEC_EW["W-07"] = [
    O(0, _A), O(1, _A),
    GEN("She can say 'beautiful', but she can't spell it.", "说得出、写不出：缺口就卡在拼法上，清清楚楚", _A, "cant-spell", "W-07 exs[1] 缺口框", {"verb": "spell"}, ["spell", "say"], ("spell", "base", "spell")),
    GEN("Write the hard word in a small book.", "卡住先记账：把不会的词写进小本子，秋后算账", _B, "small-book", "W-07 mech『扳机三步』演示框", {"verb": "write", "obj": "word"}, ["write", "hard", "word", "small", "book"], ("write", "base", "write")),
    GEN("The word you stop at is the word to learn.", "口令：你卡在哪个词，哪个词就是下一个要学的", _B, "word-to-learn", "W-07 mech『扳机三步』演示框", {"verb": "stop", "obj": "word"}, ["stop", "word", "learn"], ("stop", "base", "stop")),
    GEN("A stop is a sign: learn this next.", "卡住不是坏事，是路标：它指着你接下来该学什么", _B, "stop-sign", "W-07 mech『缺口被点亮』演示框", {"verb": "learn", "obj": "stop"}, ["learn", "stop", "next"], ("learn", "base", "learn")),
    GEN("Now I hear 'beautiful' in a song. I see it in a story.", "记下缺口以后，耳朵变尖了：歌里、故事里都能抓到它", _C, "hear-beautiful", "W-07 exs[1] 对照框", {"verb": "hear"}, ["hear", "song", "see", "story"], ("hear", "base", "hear")),
    GEN("I look for the word when I read.", "读书时专门找它：缺口领着眼睛走", _C, "look-for", "W-07 mech『扳机三步』演示框", {"verb": "look", "obj": "word"}, ["look", "word", "read"], ("look", "base", "look")),
    GEN("He writes 'the thing' again and again. The word is still not his.", "每次都写 the thing 糊弄过去：缺口一次都没补上", _D, "the-thing", "W-07 prb 情景框", {"verb": "write", "obj": "thing"}, ["write", "thing", "word", "again"], ("write", "3sg", "writes")),
    GEN("Skip it today, skip it tomorrow — the stop is still there.", "今天跳、明天跳：卡住的地方，一直在原地等你", _D, "skip-it", "W-07 对照框", {"verb": "skip", "obj": "stop"}, ["skip", "stop", "today", "tomorrow"]),
]

# ---- W-08 四条推荐（可变=四条各自的样子：天天写/教过程/练基本功/写作圈；不变=按证据排队，教过程最强；边界=只加量、不教法，不在有效清单上）
_A, _B, _C, _D = "天天写：每天一点点", "教过程：证据最强的一条", "练基本功、建写作圈", "边界：只加量，不在清单上"
SPEC_EW["W-08"] = [
    GEN("Write a little every day.", "第一条：天天写——每天写一点，手就不生", _A, "little-everyday", "W-08 mech『四条推荐排队』演示框", {"verb": "write"}, ["write", "little", "day"], ("write", "base", "write")),
    GEN("Three sentences today, three sentences tomorrow.", "量不用大：今天三句、明天三句，天天见面", _A, "three-sentences", "W-08 mech『四条推荐排队』演示框", {"obj": "sentence"}, ["sentence", "today", "tomorrow"]),
    GEN("A small page a day is enough.", "一页也行、小段也行：贵在天天有", _A, "small-page", "W-08 mech『四条推荐排队』演示框", {"obj": "page"}, ["page", "small", "day"]),
    GEN("First think, then write, then read it again.", "证据最强的是教过程：想—写—改的办法，要专门教", _B, "think-write-read", "W-08 quiz 过程框", {"verb": "think"}, ["think", "write", "read", "first", "again"], ("think", "base", "think")),
    GEN("The teacher shows us how to plan a story.", "老师把『怎么写』演给我们看：方法看得见，才学得会", _B, "teacher-shows", "W-08 quiz 过程框", {"verb": "show", "obj": "story"}, ["show", "teacher", "plan", "story"], ("show", "3sg", "shows")),
    GEN("We read our stories to friends. Friends ask questions.", "写作圈：写完读给同伴听，有人问、有人答", _C, "writing-circle", "W-08 mech『四条推荐排队』演示框", {"verb": "read", "obj": "story"}, ["read", "story", "friend", "ask", "question", "circle"], ("read", "base", "read")),
    GEN("We write the words again and again to make our hands fast.", "基本功：把字词写顺，手快了，脑子才有空", _C, "hands-fast", "W-08 mech『四条推荐排队』演示框", {"verb": "write", "obj": "word"}, ["write", "word", "hand", "fast", "again", "make"], ("write", "base", "write")),
    GEN("In our writing circle, we help each other.", "在圈子里互相帮：你读我的，我读你的", _C, "help-each", "W-08 mech『四条推荐排队』演示框", {"verb": "help"}, ["help", "circle", "each"], ("help", "base", "help")),
    GEN("Write for one hour, but no one shows you how. Does it help?", "只加时间、没人教方法：清单上没有这一条", _D, "one-hour", "W-08 对照框", {"verb": "write", "obj": "hour"}, ["write", "hour", "show", "help"], ("write", "base", "write")),
    GEN("More pages is not on the list. Better ways are.", "页数多不在清单上，上清单的是更好的办法", _D, "not-on-list", "W-08 对照框", {"obj": "page"}, ["page", "list"]),
]

# ---- W-09 策略排第一（可变=策略的环节：写之前/写的时候/写之后；不变=教一套办法胜过加量，策略在元分析里排第一；边界=多布置、多背范文，都排不上第一）
_A, _B, _C, _D = "写之前有办法", "写的时候有办法", "写之后有办法查", "边界：加量和背范文，排不上第一"
SPEC_EW["W-09"] = [
    GEN("Before I write, I think: who is it for?", "写之前先想：这篇是写给谁看的——策略从动笔前开始", _A, "who-for", "W-09 mech『有效素清单』演示框", {"verb": "write"}, ["write", "think"], ("write", "base", "write")),
    GEN("I make a small plan: first this, then that.", "先列个小计划：先写什么、再写什么，心里有了路", _A, "small-plan", "W-09 mech『有效素清单』演示框", {"verb": "make", "obj": "plan"}, ["make", "plan", "small", "first"], ("make", "base", "make")),
    GEN("A plan is a map for the pen.", "计划是笔的地图：有地图的笔，不乱走", _A, "map-pen", "W-09 mech『有效素清单』演示框", {"obj": "plan"}, ["plan", "pen"]),
    GEN("I write the easy parts first. The hard part can wait.", "先写容易的，难的放一放：写的时候也有策略", _B, "easy-parts", "W-09 mech『有效素清单』演示框", {"verb": "write", "obj": "part"}, ["write", "easy", "part", "first", "hard", "wait"], ("write", "base", "write")),
    GEN("When I stop, I read the last sentence again.", "卡住就回读上一句：这是写手自带的小办法", _B, "last-sentence", "W-09 mech『有效素清单』演示框", {"verb": "read", "obj": "sentence"}, ["read", "stop", "last", "sentence", "again"], ("read", "base", "read")),
    GEN("I say the sentence in my head, then I write it.", "先在脑子里说一遍，再落笔：句子稳当多了", _B, "in-my-head", "W-09 mech『有效素清单』演示框", {"verb": "say", "obj": "sentence"}, ["say", "sentence", "head", "write"], ("say", "base", "say")),
    GEN("After I write, I read it with new eyes.", "写完换一双眼睛读：像读别人的文章一样挑毛病", _C, "new-eyes", "W-09 mech『有效素清单』演示框", {"verb": "write"}, ["write", "read", "new"], ("write", "base", "write")),
    GEN("I ask: can my friend understand this?", "写后自查一问：我的朋友能看懂吗", _C, "friend-understand", "W-09 mech『有效素清单』演示框", {"verb": "ask"}, ["ask", "friend"], ("ask", "base", "ask")),
    GEN("Ten more pages do not teach you how.", "再加十页练习，也不会教你『怎么想』：量不是策略", _D, "ten-pages", "W-09 对照框", {"verb": "teach", "obj": "page"}, ["teach", "page"], ("teach", "base", "teach")),
    GEN("He reads many good stories. But no one shows him the way. His writing stays the same.", "范文读了一堆，没人教办法：写出来的还是老样子", _D, "stays-same", "W-09 对照框", {"verb": "stay", "obj": "story"}, ["stay", "read", "story", "show", "way"], ("stay", "3sg", "stays")),
]

# ---- W-10 支架要撤（可变=支架的种类：句框/范文/共构；不变=支架是临时拐杖，撤掉还能写才算学会；边界=一直扶着能写，不算学会）
_A, _B, _C, _D = "扶着写：句框托住句子", "慢慢松手：一句扶、一句放", "撤掉还能写：这才算学会", "边界：一直扶着，不算学会"
SPEC_EW["W-10"] = [
    O(0, _A),
    GEN("I like summer because I can swim.", "同一个句框换个季节：扶着写，先把句子写稳", _A, "summer-swim", "W-10 exs[0] 句框", {"verb": "swim"}, ["swim", "summer", "like"], ("swim", "base", "swim")),
    GEN("The teacher writes the first sentence with us. Then we write the next one.", "共构就是慢慢松手：老师写一句，我们接一句", _B, "teacher-with-us", "W-10 mech『临时拐杖』演示框", {"verb": "write", "obj": "sentence"}, ["write", "teacher", "first", "sentence"], ("write", "3sg", "writes")),
    GEN("Now I write with no help: I like winter because the snow is white.", "手松开了：没有扶着的词，句子自己站住了", _B, "no-help", "W-10 exs[1] 对照框", {"verb": "write"}, ["write", "help", "winter", "snow", "white", "like"], ("write", "base", "write")),
    O(1, _C),
    GEN("She writes about spring. Every word is her own.", "写春天不用看范文：每个词都是她自己的了", _C, "her-own", "W-10 exs[1] 撤框框", {"verb": "write", "obj": "spring"}, ["write", "spring", "word"], ("write", "3sg", "writes")),
    GEN("He writes a new story. No help, no book. Just his words.", "新故事、新说法，全靠自己：支架撤干净了", _C, "no-book", "W-10 mech『临时拐杖』演示框", {"verb": "write", "obj": "story"}, ["write", "new", "story", "help", "book", "word"], ("write", "3sg", "writes")),
    GEN("He holds the table. Then he lets go. He walks.", "像学走路：扶着桌子走几步，最后要松开手", _D, "holds-table", "W-10 kid 比方框", {"verb": "hold", "obj": "table"}, ["hold", "table", "let", "go", "walk"], ("hold", "3sg", "holds")),
    GEN("The words help him today. Tomorrow he must write alone.", "帮是暂时的：今天扶着写，明天要自己写", _D, "write-alone", "W-10 mech『有起有终的坡道』演示框", {"verb": "write", "obj": "word"}, ["write", "word", "help", "tomorrow", "alone"], ("write", "base", "write")),
    GEN("Still holding on is not walking.", "一直扶着不撒手，永远学不会走路：写也一样", _D, "still-holding", "W-10 kid 比方框", {"verb": "hold"}, ["hold", "walk"], ("hold", "ing", "holding")),
]

# ---- W-11 先撞缺口（可变=撞出的缺口与按缺口补的输入：范文/句型/词；不变=顺序不能反——先产出撞缺口，再按缺口给输入；边界=先讲满再动笔，学的用不上）
_A, _B, _C, _D = "先试着写：把本事亮出来", "撞见缺口：停的地方就是要学的", "按缺口给输入：来得正是时候", "边界：顺序反了，学了也用不上"
SPEC_EW["W-11"] = [
    GEN("Write first. Show us what you can do.", "课一开始先动笔：先看看你能写出什么", _A, "write-first", "W-11 quiz 顺序框", {"verb": "write"}, ["write", "first", "show"], ("write", "base", "write")),
    GEN("He writes three sentences. Then he stops.", "写着写着停了：停的地方，就是这节课的入口", _A, "three-sentences", "W-11 mech『先撞缺口』演示框", {"verb": "write", "obj": "sentence"}, ["write", "sentence", "stop"], ("write", "3sg", "writes")),
    GEN("Try to write about your day.", "题目就是写你的一天：难不难，写了才知道", _A, "try-day", "W-11 mech『先撞缺口』演示框", {"verb": "try", "obj": "day"}, ["try", "write", "day"], ("try", "base", "try")),
    GEN("He wants to say 'suddenly'. The word is not there.", "想说『突然』说不出来：缺口自己跳出来了", _B, "say-suddenly", "W-11 mech『先撞缺口』演示框", {"verb": "say", "obj": "word"}, ["say", "word"], ("say", "base", "say")),
    GEN("The stop tells the teacher: teach this next.", "学生卡在哪，老师就教哪：缺口是最好的备课单", _B, "stop-tells", "W-11 mech『按缺口给输入』演示框", {"verb": "tell", "obj": "stop"}, ["tell", "stop", "teacher", "teach", "next"], ("tell", "3sg", "tells")),
    GEN("Now the teacher gives us the words we need.", "这时候给词，给得正是时候：正缺它", _C, "gives-words", "W-11 mech『按缺口给输入』演示框", {"verb": "give", "obj": "word"}, ["give", "teacher", "word", "need"], ("give", "3sg", "gives")),
    GEN("We read a story with those words in it.", "范文挑带这些词的读：输入对准缺口来", _C, "story-words", "W-11 mech『按缺口给输入』演示框", {"verb": "read", "obj": "story"}, ["read", "story", "word"], ("read", "base", "read")),
    GEN("The help comes after the try. It comes just in time.", "帮助排在尝试后面：早一步是喂，晚一步是救", _C, "help-comes", "W-11 对照框", {"verb": "come", "obj": "help"}, ["come", "help", "after"], ("come", "3sg", "comes")),
    GEN("First the teacher talks and talks. Then we write. The words are gone.", "先讲满再动笔的下场：讲的时候都懂，写的时候全忘", _D, "talks-talks", "W-11 quiz 对照框", {"verb": "talk"}, ["talk", "teacher", "write", "word", "first"], ("talk", "3sg", "talks")),
    GEN("Learn first, use later — later never comes.", "先学后用的毛病：那个『后用』，常常永远不来", _D, "later-never", "W-11 对照框", {"verb": "learn"}, ["learn", "first", "come"], ("learn", "base", "learn")),
]

# ---- W-12 基本功堵脑（可变=堵的位置：拼字/想词/手慢；不变=写字拼词不自动化，就占满脑子，没余力想内容；边界=想得好不等于写得出，不先怪没想法）
_A, _B, _C, _D = "手顺的样子：写字不用想", "脑子腾出来，想故事", "被堵住的样子：一写就忘", "边界：不是没想法，是手太慢"
SPEC_EW["W-12"] = [
    O(0, _A), O(1, _A),
    GEN("I can write my name fast.", "名字写得飞快：这种句子，手自己就会", _A, "name-fast", "W-12 exs[0] 基本功框", {"verb": "write", "obj": "name"}, ["write", "name", "fast"], ("write", "base", "write")),
    GEN("Her hands know the words. Her head is free for the story.", "手熟了，脑子就空出来了：空出来的地方装故事", _B, "hands-know", "W-12 mech『脑子被堵住』演示框", {"verb": "know", "obj": "word"}, ["know", "hand", "word", "head", "free", "story"], ("know", "base", "know")),
    GEN("He writes and thinks at the same time.", "一边写一边想：手不抢脑子，故事才接得上", _B, "writes-thinks", "W-12 mech『脑子被堵住』演示框", {"verb": "write"}, ["write", "think", "time"], ("write", "3sg", "writes")),
    GEN("He thinks of a word. He stops. How do you spell it?", "每个词都要想怎么拼：写一句，停三次", _C, "how-spell", "W-12 exs[1] 对照框", {"verb": "think", "obj": "word"}, ["think", "word", "stop", "spell"], ("think", "3sg", "thinks")),
    GEN("The sentence was in his head. Now it is gone.", "想好的句子被拼字挤跑了：这就是脑子被堵住", _C, "sentence-gone", "W-12 mech『脑子被堵住』演示框", {"obj": "sentence"}, ["sentence", "head"]),
    GEN("Every word is a wall. He climbs and climbs.", "对他来说每个词都是一堵墙：爬墙的力气用完，故事就没力气了", _C, "word-wall", "W-12 mech『脑子被堵住』演示框", {"verb": "climb", "obj": "word"}, ["climb", "word", "wall"], ("climb", "3sg", "climbs")),
    GEN("His story is good in his head. His hand is too slow.", "先别怪他没想法：故事在脑子里好好的，是手跟不上", _D, "hand-slow", "W-12 prb 情景框", {"obj": "story"}, ["story", "good", "head", "hand", "slow"]),
    GEN("Write the small words again and again. Then write the big story.", "解法在练手：先把小词写顺，大故事才有地方想", _D, "small-words", "W-12 mech『先把手练顺』演示框", {"verb": "write", "obj": "word"}, ["write", "small", "word", "again", "big", "story"], ("write", "base", "write")),
]

# ---- W-13 句子合并（可变=合并的工具：修饰/并列扣合/从句嵌入；不变=意思不变，只换搭法，不背术语也能练；边界=意思改了不算合并，只会 and 一路连不算练全）
_A, _B, _C, _D = "工具一·修饰：把一句装进另一句", "工具二·并列：用小词扣住两句", "工具三·从句：把整句嵌进去", "边界：意思变了，就不算合并"
SPEC_EW["W-13"] = [
    O(0, _A),
    GEN("The cat is small. The cat is mine. → The small cat is mine.", "还是修饰：small 从第二句搬进第一句，意思没变", _A, "cat-mine", "W-13 exs[0] 合并框", {"obj": "cat"}, ["cat", "small"]),
    GEN("The cake is big. The cake is for me. → The big cake is for me.", "把 big 装进去：两句变一句，蛋糕还是那块蛋糕", _A, "cake-big", "W-13 exs[0] 合并框", {"obj": "cake"}, ["cake", "big"]),
    O(1, _B),
    GEN("I was hungry. I ate an apple. → I was hungry, so I ate an apple.", "用 so 扣住因果：两句成了一句，道理更清楚", _B, "hungry-apple", "W-13 exs[1] 合并框", {"verb": "eat", "obj": "apple"}, ["eat", "hungry", "apple"], ("eat", "past", "ate")),
    GEN("It was cold. We stayed at home. → It was cold, so we stayed at home.", "冷和待在家：so 把原因和结果扣在一起", _B, "cold-home", "W-13 exs[1] 合并框", {"verb": "stay"}, ["stay", "cold", "home"], ("stay", "past", "stayed")),
    O(2, _C),
    GEN("The boy has a dog. The dog can swim. → The boy has a dog that can swim.", "把『狗会游泳』整句嵌进第一句：从句工具", _C, "dog-swim", "W-13 exs[2] 合并框", {"verb": "have", "obj": "dog"}, ["have", "boy", "dog", "swim"], ("have", "3sg", "has")),
    GEN("The girl is happy. She won the game. → The girl is sad.", "标本：意思被改掉了——这不算合并，是另写一句", _D, "girl-sad", "W-13 对照框", {"obj": "girl"}, ["girl", "happy", "sad"]),
    GEN("He ran. He jumped. He swam. → He ran, jumped and swam.", "三个动作排成一队共用一个主语：这也是合并", _D, "ran-jumped", "W-13 exs[1] 并列框", {"verb": "run"}, ["run", "jump", "swim"], ("run", "past", "ran")),
    GEN("Two short sentences in, one long sentence out. The meaning stays.", "合并的口令：进去两句、出来一句，意思不许变", _D, "meaning-stays", "W-13 mech『攒句子』演示框", {"verb": "stay", "obj": "sentence"}, ["stay", "sentence"], ("stay", "3sg", "stays")),
]

# ---- W-14 路标词（可变=路标的种类：时序/因果/转折/让步；不变=路标必须对准真实的逻辑关系；边界=贴错比没有更糟，路标不是装饰、不是越多越好）
_A, _B, _C, _D = "时序路标：先做什么、再做什么", "因果路标：原因带着结果走", "转折与让步：话锋一转", "边界：路标贴错，比没有更糟"
SPEC_EW["W-14"] = [
    O(0, _A),
    GEN("First, I wash my face. Then I have breakfast.", "first 和 then 是给读者的先后牌：跟着牌子走不迷路", _A, "wash-face", "W-14 exs[0] 时序框", {"verb": "wash", "obj": "face"}, ["wash", "face", "first", "breakfast"], ("wash", "base", "wash")),
    GEN("First we read. Then we write.", "先读再写：时序路标管的是事情的先后", _A, "read-write", "W-14 exs[0] 时序框", {"verb": "read"}, ["read", "write", "first"], ("read", "base", "read")),
    GEN("It is raining, so we stay at home.", "下雨是因、待在家是果：so 把结果领出来", _B, "raining-so", "W-14 cases 因果框", {"verb": "stay"}, ["stay", "rain", "home"], ("stay", "base", "stay")),
    GEN("Because she was ill, she stayed at home.", "原因在前：because 领着原因句，后面直接跟结果", _B, "because-ill", "W-14 cases[3] 对照框", {"verb": "stay", "obj": "ill"}, ["stay", "because", "ill", "home"], ("stay", "past", "stayed")),
    O(1, _C),
    GEN("I like tea, but he likes coffee.", "but 是转弯牌：前面说我，后面拐到他", _C, "tea-coffee", "W-14 exs[1] 转折框", {"verb": "like", "obj": "tea"}, ["like", "tea", "coffee"], ("like", "base", "like")),
    GEN("Although it was cold, we played outside.", "although 是让步牌：天冷，可我们还是出去玩了", _C, "although-cold", "W-14 exs[1] 让步框", {"verb": "play"}, ["play", "although", "cold", "outside"], ("play", "past", "played")),
    GEN("Because it was cold, so we stayed at home.", "贴错的标本：because 和 so 一起上场——汉语成对，英语贴重了，读者被带偏", _D, "because-so", "W-14 cases[3].wrong 同型标本框", {"verb": "stay"}, ["stay", "because", "cold", "home"], ("stay", "past", "stayed")),
    GEN("More words do not help. The right word helps.", "路标不在多：对的那一个，才指路", _D, "right-word", "W-14 mech『路标对位』演示框", {"verb": "help", "obj": "word"}, ["help", "word", "right"], ("help", "3sg", "helps")),
]

# ---- W-15 没有保满分的公式（可变=话术的样子：保满分/万能公式/几天速成；不变=能涨分的只有策略、练习量与反馈的组合；边界=范文和句型不是话术——当支架用是正道，当保证卖就是话术）
_A, _B, _C, _D = "话术长这样：保证、万能、速成", "先问证据：研究支持吗", "真正有用的组合：方法、多写、反馈", "边界：支架是正道，保证是话术"
SPEC_EW["W-15"] = [
    GEN("'Learn this song, and your writing will be the best!'", "广告标本：把作文说成背首歌就会最好——保证越大，越要怀疑", _A, "learn-song", "W-15 mech『话术识别』演示框", {"verb": "learn", "obj": "song"}, ["learn", "song"], ("learn", "base", "learn")),
    GEN("'Three days to a full mark!' the man says.", "三天保满分：时间短、保证满——话术的两个记号都在", _A, "three-days", "W-15 mech『话术识别』演示框", {"verb": "say", "obj": "mark"}, ["say", "day", "full", "mark", "man"], ("say", "3sg", "says")),
    GEN("No book can give you a full mark.", "先把结论放这：没有任何一本书、一个公式能保证满分", _B, "no-book", "W-15 quiz 证据框", {"verb": "give", "obj": "book"}, ["give", "book", "full", "mark"], ("give", "base", "give")),
    GEN("Teachers ask: is it true? Where did they try it?", "听到保证先问两句：真的吗、在哪儿试过——证据拿出来再说", _B, "is-it-true", "W-15 mech『话术识别』演示框", {"verb": "ask"}, ["ask", "teacher", "true", "try"], ("ask", "base", "ask")),
    GEN("Learn a way. Write a lot. Ask a friend to read it.", "有用的组合就三样：学方法、多写、有人给你反馈", _C, "learn-a-way", "W-15 hl 组合框", {"verb": "learn", "obj": "way"}, ["learn", "way", "write", "friend", "read"], ("learn", "base", "learn")),
    GEN("A good teacher reads it and says: this part can be better.", "反馈长这样：指出哪一段能更好——不是打个分就完", _C, "teacher-reads", "W-15 hl 组合框", {"verb": "read"}, ["read", "teacher", "good", "say", "part"], ("read", "3sg", "reads")),
    GEN("Write every day. Read what you wrote. Make it better.", "练习量要天天有：写、回读、改好——慢功夫，没有捷径", _C, "every-day", "W-15 hl 组合框", {"verb": "write"}, ["write", "day", "read", "make"], ("write", "base", "write")),
    GEN("Some words can help you start. They cannot write the story for you.", "句型词是支架：能帮你起步，不能替你写——这样用它是正道", _D, "help-start", "W-15 对照框", {"verb": "help"}, ["help", "word", "start", "write", "story"], ("help", "base", "help")),
    GEN("Good writing comes from work, not from songs.", "好作文是练出来的，不是唱出来的：这句话没有保证，只有实话", _D, "from-work", "W-15 对照框", {"verb": "come", "obj": "song"}, ["come", "good", "work", "song"], ("come", "3sg", "comes")),
    GEN("A song can be a start. It is not the road.", "歌和口诀可以当起点：当成整条路来卖，就是话术", _D, "not-the-road", "W-15 对照框", {"obj": "song"}, ["song", "start", "road"]),
]

# ---- NE-01 地道是惯例（可变=对照的说法对：句式/搭配/长短；不变=合语法只是门槛，要学的是母语者惯例会选的那种；边界=地道随场合变，没有脱离场合的唯一答案）
_A, _B, _C, _D = "母语者会选的说法", "同样合语法，没人这么说", "日常说法：惯例选的就是这些", "边界：地道也要看场合"
SPEC_EW["NE-01"] = [
    O(0, _A), O(1, _B),
    GEN("She wants to marry him.", "换个人称，还是这句最自然：地道的说法经得起换人", _A, "she-wants", "NE-01 exs[0] 句框", {"verb": "want", "obj": "marry"}, ["want", "marry"], ("want", "3sg", "wants")),
    GEN("I want to go home.", "想回家就这么说：短、直、是大家天天说的那种", _A, "want-home", "NE-01 mech『学对味的那种』演示框", {"verb": "want"}, ["want", "go", "home"], ("want", "base", "want")),
    GEN("It is my wish to drink water at this moment.", "标本：每个词都对，可没人这么说话——绕、远、不像人话", _B, "wish-drink", "NE-01 exs[1] 对照框", {"verb": "drink", "obj": "wish"}, ["drink", "wish", "water"], ("drink", "base", "drink")),
    GEN("We say 'See you tomorrow.'", "告别就这一句：惯例选定的说法，学它就对了", _C, "see-you", "NE-01 mech『学对味的那种』演示框", {"verb": "say"}, ["say", "see", "tomorrow"], ("say", "base", "say")),
    GEN("We say 'Thanks a lot.'", "道谢的日常款：不长、不绕，人人这么说", _C, "thanks-lot", "NE-01 mech『学对味的那种』演示框", {"verb": "say"}, ["say", "thank", "lot"], ("say", "base", "say")),
    GEN("Can I have some water, please?", "要水喝的说法：母语者张口就是这一句", _C, "have-water", "NE-01 mech『学对味的那种』演示框", {"obj": "water"}, ["water"]),
    GEN("In a letter, we write 'Dear Mr Brown,'", "写信有写信的地道：正式场合换正式的说法", _D, "dear-brown", "NE-01 exc 语域说法演示框", {"verb": "write", "obj": "letter"}, ["write", "letter", "brown"], ("write", "base", "write")),
    GEN("At home, we just say 'Hi, Dad.'", "在家里又一套：地道跟着场合走，不是一句走天下", _D, "hi-dad", "NE-01 exc 语域说法演示框", {"verb": "say"}, ["say", "home", "dad"], ("say", "base", "say")),
    GEN("I want to marry you. People really say this.", "回到条目那句：它当选，不是因为短，是因为大家真的这么说", _A, "really-say", "NE-01 exs[0] 对照框", {"verb": "say", "obj": "marry"}, ["say", "marry", "people", "really"], ("say", "base", "say")),
]

# ---- NE-02 句干仓库（可变=句干的种类：整句现取/半固定带槽；不变=流利靠整存的句干现取现用，不靠现拼；边界=半固定不是死背，槽位一换就是新句）
_A, _B, _C, _D = "整句句干：张口就来", "半固定句干：留着槽位", "槽位一换，就是新句", "边界：句干不是死背，是活的"
SPEC_EW["NE-02"] = [
    O(0, _A), O(2, _A),
    GEN("How are you today?", "问候句干整存：见面张口就来，不用现想", _A, "how-today", "NE-02 exs[0] 句干框", {"obj": "today"}, ["today"]),
    O(1, _B),
    GEN("What about reading a book?", "还是 What about 的架子：槽里换上读书，整句就活了", _B, "about-reading", "NE-02 exs[1] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "ing", "reading")),
    GEN("Can I have a pen, please?", "请求句干换槽：water 换 pen，架子一点不动", _B, "have-pen", "NE-02 exs[0] 句框", {"obj": "pen"}, ["pen"]),
    GEN("What about going to the zoo this Sunday?", "时间和地点都进槽：半固定的句干，能装很多话", _C, "about-zoo", "NE-02 exs[1] 句框", {"verb": "go", "place": "zoo"}, ["go", "zoo", "Sunday"], ("go", "ing", "going")),
    GEN("Can I have some tea, please?", "茶也行、水也行：槽位就是留给变化的", _C, "have-tea", "NE-02 exs[0] 句框", {"obj": "tea"}, ["tea"]),
    GEN("Change one word, and the old sentence works again.", "换一个词，老句干就上新场合：这就是它活的地方", _D, "change-one", "NE-02 mech『半固定不是死背』演示框", {"verb": "change", "obj": "word"}, ["change", "word", "old", "sentence", "again"], ("change", "base", "change")),
    GEN("The words are old friends. The sentences are new.", "词是老朋友，句是新组合：句干仓库就是这样用的", _D, "old-friends", "NE-02 对照框", {"obj": "word"}, ["word", "old", "friend", "sentence", "new"]),
    GEN("He does not make the sentence word by word. He takes it out whole.", "流利的人不逐词拼：整块从仓库里拿出来就用", _D, "whole", "NE-02 mech『句干仓库』演示框", {"verb": "make", "obj": "sentence"}, ["make", "sentence", "word", "take", "whole"], ("make", "base", "make")),
]

# ---- NE-03 先囤整块（可变=囤的块：见面话/问答对/请求回应；不变=顺序——先整块用熟，再慢慢拆；边界=只囤不拆换场合就卡，只拆不囤慢而不地道）
_A, _B, _C, _D = "先整块用熟", "请求和回应，成套囤", "用熟了，再慢慢拆", "边界：只囤不拆、只拆不囤，都卡"
SPEC_EW["NE-03"] = [
    O(0, _A), O(1, _A),
    GEN("— Good afternoon! — Good afternoon!", "下午的问候也整块囤：先会用，别的以后再说", _A, "good-afternoon", "NE-03 exs[0] 整块框", {"obj": "afternoon"}, ["afternoon", "good"]),
    GEN("— What's this? — It's a pen.", "问答成对囤：一问一答一起进仓库", _A, "whats-this", "NE-03 exs[1] 整块框", {"obj": "pen"}, ["pen"]),
    O(2, _B),
    GEN("— Can I have some water, please? — Sure. Here you are.", "请求带回应整套存：用的时候整套出", _B, "water-sure", "NE-03 exs[2] 整块框", {"obj": "water"}, ["water"]),
    GEN("Now we see: 'Can I have' is the head. The tail can change.", "用熟以后回头拆：头是固定的，尾巴可以换", _C, "head-tail", "NE-03 mech『再慢慢拆』演示框", {"verb": "see"}, ["see", "head", "tail", "change"], ("see", "base", "see")),
    GEN("We look at the parts: Can / I / have / a / pen?", "拆开看零件：拆是为了以后换零件，不是为了背词", _C, "look-at-parts", "NE-03 mech『再慢慢拆』演示框", {"verb": "look", "obj": "pen"}, ["look", "part", "pen"], ("look", "base", "look")),
    GEN("He can say the words, but he can't change one word.", "只囤不拆的样子：背得滚瓜烂熟，换一个词就卡住", _D, "cant-change", "NE-03 exc 只囤不拆演示框", {"verb": "say", "obj": "word"}, ["say", "word", "change"], ("say", "base", "say")),
    GEN("She knows every word. She still speaks very slowly.", "只拆不囤的样子：词都认识，说起来还是一顿一顿", _D, "speaks-slowly", "NE-03 exc 只拆不囤演示框", {"verb": "know", "obj": "word"}, ["know", "word", "speak", "slowly"], ("know", "3sg", "knows")),
    GEN("First the whole cake, then one part at a time.", "比方收尾：先整块拿下，再一部分一部分看——顺序不能反", _D, "whole-cake", "NE-03 对照框", {"obj": "cake"}, ["cake", "whole", "first", "part"]),
]

# ---- NE-04 假规矩（可变=被验的规矩：句末介词/分裂不定式之类；不变=检验法——大作家守不守、守了别不别扭；边界=反假规矩不等于没标准，正式书面规范仍要教）
_A, _B, _C, _D = "拿真句子验规矩", "作家都不守的样子", "守了反而别扭", "边界：假规矩破了，真标准还在"
SPEC_EW["NE-04"] = [
    GEN("What are you looking at?", "验规矩的句子一：句末就是介词——英语人天天这么说", _A, "looking-at", "NE-04 mech『简易测试』演示框", {"verb": "look"}, ["look"], ("look", "ing", "looking")),
    GEN("She wants to quickly finish her homework.", "验规矩的句子二：to 和动词中间插了词——作家一直这样写", _A, "quickly-finish", "NE-04 mech『简易测试』演示框", {"verb": "finish", "obj": "homework"}, ["finish", "homework", "quickly", "want"], ("finish", "base", "finish")),
    GEN("A rule no one keeps is not a rule.", "先把验法说清：没人守的『规矩』，多半不是规矩", _A, "no-one-keeps", "NE-04 mech『零容忍神话』演示框", {"verb": "keep", "obj": "rule"}, ["keep", "rule"], ("keep", "3sg", "keeps")),
    GEN("Great writers write it this way, too.", "查证据：写书的大作家也这么写——这一条就够验了", _B, "great-writers", "NE-04 mech『简易测试』演示框", {"verb": "write"}, ["write", "great", "writer", "way"], ("write", "base", "write")),
    GEN("People say it every day. No one stops them.", "生活里人人这么说：没人觉得错，更没人改正", _B, "every-day", "NE-04 对照框", {"verb": "say"}, ["say", "people", "day", "stop"], ("say", "base", "say")),
    GEN("Say it the 'right' way. It sounds wrong.", "按假规矩改一遍：听起来反而别扭——别扭就是证据", _C, "sounds-wrong", "NE-04 mech『简易测试』演示框", {"verb": "say"}, ["say", "right", "wrong", "sound"], ("say", "base", "say")),
    GEN("He changes the sentence to keep the rule. Now it is long and hard.", "为了守一条假规矩，句子绕成长疙瘩：得不偿失", _C, "long-hard", "NE-04 对照框", {"verb": "change", "obj": "sentence"}, ["change", "sentence", "keep", "rule", "long", "hard"], ("change", "3sg", "changes")),
    GEN("In a test, we still write in the school way.", "边界在这：考试和正式写作有它的规范，那一套要照学", _D, "school-way", "NE-04 exc 书面规范演示框", {"verb": "write", "obj": "test"}, ["write", "test", "school", "way"], ("write", "base", "write")),
    GEN("Some rules are real. We keep them and use them.", "真的规矩要守：验过的，才留下", _D, "rules-real", "NE-04 exc 书面规范演示框", {"verb": "keep", "obj": "rule"}, ["keep", "rule", "real", "use"], ("keep", "base", "keep")),
    GEN("Don't put a word between 'to' and the verb? Writers do it all the time.", "有人拿这条吓唬人：去查作家——他们一直在这么用", _B, "writers-do", "NE-04 mech『简易测试』演示框", {"verb": "put", "obj": "word"}, ["put", "word", "verb", "writer", "time"], ("put", "base", "put")),
]

# ---- NE-05 假规矩的出生记录（可变=两条禁忌各自的自然用法；不变=查出生：英语生来没有，是照拉丁语硬定的；边界=守禁忌把话说别扭，别扭就是它假的证据）
_A, _B, _C = "句末放介词：自然得很", "分裂不定式：作家一直这样用", "边界：守它把话说别扭，就是证据"
SPEC_EW["NE-05"] = [
    O(0, _A),
    GEN("What are you waiting for?", "还是句末介词：等什么——问得又自然又清楚", _A, "waiting-for", "NE-05 exs[0] 句框", {"verb": "wait"}, ["wait"], ("wait", "ing", "waiting")),
    GEN("This is the book I told you about.", "介绍一本书，about 就落在句末：没人觉得不对", _A, "told-about", "NE-05 exs[0] 句框", {"verb": "tell", "obj": "book"}, ["tell", "book"], ("tell", "past", "told")),
    GEN("Who are you talking to?", "跟谁说话：to 在句末，是英语自己的样子", _A, "talking-to", "NE-05 exs[0] 句框", {"verb": "talk"}, ["talk"], ("talk", "ing", "talking")),
    O(1, _B),
    GEN("We want to really help them.", "really 就插在 to 和 help 中间：意思更清楚，谁也不别扭", _B, "really-help", "NE-05 exs[1] 句框", {"verb": "help"}, ["help", "want", "really"], ("help", "base", "help")),
    GEN("He ran to quickly open the door.", "跑去开门要快：quickly 插进来，节奏正好", _B, "quickly-open", "NE-05 exs[1] 句框", {"verb": "run", "obj": "door"}, ["run", "open", "door", "quickly"], ("run", "past", "ran")),
    GEN("I want to slowly drink my tea.", "慢慢喝茶：slowly 站在 to 后面，是几百年的用法", _B, "slowly-drink", "NE-05 exs[1] 句框", {"verb": "drink", "obj": "tea"}, ["drink", "want", "tea", "slowly"], ("drink", "base", "drink")),
    GEN("Say it in the round way. It sounds like a robot.", "为了躲介词把句子绕成圈：听起来像机器人说话——这就是别扭的证据", _C, "round-way", "NE-05 mech『简易测试』演示框", {"verb": "say"}, ["say", "round", "way", "sound", "robot"], ("say", "base", "say")),
    GEN("The way people say it is the way to learn.", "收尾：大家自然怎么说，就学着怎么说", _C, "way-to-learn", "NE-05 对照框", {"verb": "say"}, ["say", "way", "people", "learn"], ("say", "base", "say")),
    GEN("This rule is not from English. It came from another language, long ago.", "出生记录一句话：这条规矩不是英语自己的，是从别的语言那儿搬来的", _C, "not-from-english", "NE-05 mech『出生记录』演示框", {"verb": "come", "obj": "rule"}, ["come", "rule"], ("come", "past", "came")),
]

# ---- NE-06 英语是世界语（可变=说话的场合与对象：各国人之间；不变=目标是在国际场合被广泛听懂，不是装成母语者；边界=仍要选一两个参照口音学，不是不要标准）
_A, _B, _C, _D = "说英语的人，大多不是母语者", "目标：被全世界听懂", "各地的英语，都算数", "边界：参照还是要有"
SPEC_EW["NE-06"] = [
    GEN("A girl in China talks in English to a boy in London.", "中国小姑娘和伦敦小男孩用英语聊天：这就是英语现在的样子", _A, "girl-boy", "NE-06 mech『三圈地图』演示框", {"verb": "talk", "obj": "girl"}, ["talk", "girl", "boy"], ("talk", "3sg", "talks")),
    GEN("Most people who speak English learn it at school.", "全世界说英语的人，大多数是像我们这样在学校学的", _A, "most-people", "NE-06 mech『三圈地图』演示框", {"verb": "speak"}, ["speak", "people", "learn", "school"], ("speak", "base", "speak")),
    GEN("English is a world language now.", "英语是全世界的公用语：它不只属于英国和美国", _A, "world-language", "NE-06 mech『三圈地图』演示框", {"obj": "world"}, ["world"]),
    GEN("We learn English to talk to the world.", "学英语是去和全世界说话：目标先对准这里", _B, "talk-world", "NE-06 mech『目标转向』演示框", {"verb": "learn", "obj": "world"}, ["learn", "talk", "world"], ("learn", "base", "learn")),
    GEN("Say it clearly. People in many places can understand you.", "说得清楚最重要：各地的人能听懂，就是成功", _B, "say-clearly", "NE-06 mech『目标转向』演示框", {"verb": "say"}, ["say", "clearly", "people", "place", "understand"], ("say", "base", "say")),
    GEN("You don't have to sound like a London boy.", "不用装伦敦腔：你的声音可以就是你的声音", _B, "sound-like", "NE-06 对照框", {"verb": "sound"}, ["sound", "like", "boy"], ("sound", "base", "sound")),
    GEN("People in many countries speak English in their own ways.", "每个地方说英语都有自己的味儿：这很正常", _C, "own-ways", "NE-06 mech『三圈地图』演示框", {"verb": "speak", "obj": "country"}, ["speak", "people", "country", "own", "way"], ("speak", "base", "speak")),
    GEN("Her English is not London English. It is good English.", "不是伦敦味，不等于不好：清楚、地道于场合，就是好英语", _C, "good-english", "NE-06 对照框", {"obj": "good"}, ["good"]),
    GEN("We learn one good voice first. Then we listen to many.", "边界：先跟定一个好参照学，再慢慢听很多种——参照不是枷锁", _D, "one-voice", "NE-06 exc 参照说法演示框", {"verb": "learn", "obj": "voice"}, ["learn", "good", "voice", "first", "listen"], ("learn", "base", "learn")),
    GEN("A map is not the road, but we still need a map.", "比方收尾：参照口音是地图——不是目的地，可走路时还得有", _D, "map-road", "NE-06 exc 参照说法演示框", {"verb": "need", "obj": "map"}, ["need", "map", "road"], ("need", "base", "need")),
]

# ---- NE-07 受控释义（可变=被解释的词与释义的绕法；不变=释义只用已知的核心简单词，查词不再撞生词；边界=绕行有代价、精确度受限，大孩子还要普通词典补）
_A, _B, _C, _D = "词典释义标本：只用简单词", "查词不撞生词", "核心词是钥匙", "边界：绕行有代价"
SPEC_EW["NE-07"] = [
    O(0, _A), O(1, _A),
    GEN("dog — a small animal. Many people keep one at home.", "用最简单的词解释狗：animal、people、home 全是认识的词", _A, "dog-def", "NE-07 exs[0] 释义框", {"verb": "keep", "obj": "dog"}, ["keep", "dog", "animal", "people", "home"], ("keep", "base", "keep")),
    GEN("teacher — a person who helps you learn.", "解释老师也只用小词：person、help、learn——查词不卡壳", _A, "teacher-def", "NE-07 exs[1] 释义框", {"verb": "help", "obj": "teacher"}, ["help", "teacher", "person", "learn"], ("help", "3sg", "helps")),
    GEN("I look up 'panda'. I know every word in the answer.", "查熊猫，释义里每个词都认识：这本词典没给他设新障碍", _B, "look-up-panda", "NE-07 mech『受控释义』演示框", {"verb": "look", "obj": "panda"}, ["look", "panda", "know", "word", "answer"], ("look", "base", "look")),
    GEN("The words in the book are easy. I can read them all.", "释义的词都简单：查一个词，顺顺利利读完", _B, "words-easy", "NE-07 mech『受控释义』演示框", {"verb": "read", "obj": "word"}, ["read", "word", "book", "easy"], ("read", "base", "read")),
    GEN("Learn the small words first. They open every door.", "先学核心小词：它们是钥匙，能开所有难词的门", _C, "small-words", "NE-07 mech『核心先行』演示框", {"verb": "learn", "obj": "word"}, ["learn", "small", "word", "first", "open", "door"], ("learn", "base", "learn")),
    GEN("Three thousand small words can tell you all the big words.", "三千个小词能解释一切大词：先把钥匙串拿全", _C, "three-thousand", "NE-07 mech『核心先行』演示框", {"verb": "tell", "obj": "word"}, ["tell", "thousand", "small", "word", "big"], ("tell", "base", "tell")),
    GEN("A short answer can leave a little out.", "边界：只用小词绕着说，有时会漏掉一点意思——这是代价", _D, "leave-out", "NE-07 exc 精确度说法演示框", {"obj": "answer"}, ["answer", "short", "little"]),
    GEN("Big boys and girls use big dictionaries, too.", "长大了还要普通词典补精确：受控释义不是终点", _D, "big-dictionaries", "NE-07 exc 精确度说法演示框", {"verb": "use", "obj": "dictionary"}, ["use", "big", "boy", "girl", "dictionary"], ("use", "base", "use")),
    GEN("I look up 'happy'. The answer makes me smile.", "查到的释义自己就能逗人笑：简单词照样能把意思说到位", _B, "happy-smile", "NE-07 exs[1] 对照框", {"verb": "look"}, ["look", "happy", "answer", "make", "smile"], ("look", "base", "look")),
]

# ---- NE-08 动词是枢纽（可变=动词的接法：ask 人 to do、tell 人 to do、say to 人；不变=查动词要连它后面的接法一起查；边界=接法随义项变，仿错一个就全句错）
_A, _B, _C, _D = "ask 的接法：ask + 人 + to do", "别的动词，别的接法", "接法错了，词义对也白搭", "边界：查接法要按义项查"
SPEC_EW["NE-08"] = [
    O(0, _A),
    GEN("I asked her to help me.", "还是 ask 的接法：人先落位，再 to do——句型照着走", _A, "asked-her", "NE-08 exs[0] 句框", {"verb": "ask"}, ["ask", "help"], ("ask", "past", "asked")),
    GEN("The teacher asked us to open our books.", "老师请我们打开书：ask 的接法在教室里天天用", _A, "asked-us", "NE-08 exs[0] 句框", {"verb": "ask", "obj": "book"}, ["ask", "teacher", "open", "book"], ("ask", "past", "asked")),
    GEN("I told him to come.", "换 tell：接法看着像 ask，可它是 tell 自己的一套", _B, "told-him", "NE-08 mech『动词是枢纽』演示框", {"verb": "tell"}, ["tell", "come"], ("tell", "past", "told")),
    GEN("He said to me, 'Come here.'", "say 的接法不一样：话要先递给人，再说内容", _B, "said-to-me", "NE-08 mech『动词是枢纽』演示框", {"verb": "say"}, ["say", "come", "here"], ("say", "past", "said")),
    GEN("We want you to sing.", "want 也带人加 to do：每个动词的接法要单独记", _B, "want-sing", "NE-08 mech『动词是枢纽』演示框", {"verb": "want"}, ["want", "sing"], ("want", "base", "want")),
    GEN("The teacher asked us to read it again.", "再来一遍 ask：接法对了，句子自己就顺", _B, "asked-read", "NE-08 exs[0] 句框", {"verb": "ask"}, ["ask", "teacher", "read", "again"], ("ask", "past", "asked")),
    GEN("One verb can go there. The other verb can't.", "同一个位置：这个动词能进，那个不能进——接法是动词自己的脾气", _C, "one-verb", "NE-08 cases[0] 假类推演示框", {"verb": "go", "obj": "verb"}, ["go", "verb"], ("go", "base", "go")),
    GEN("He knows the word. He does not know its way.", "只背意思、不学接法的下场：词认识，句子还是搭错", _C, "not-know-way", "NE-08 cases[0] 假类推演示框", {"verb": "know", "obj": "word"}, ["know", "word", "way"], ("know", "3sg", "knows")),
    GEN("Look at the verb. Look at what comes after it.", "查词口令：先看动词，再看它后面跟着什么", _D, "look-verb", "NE-08 mech『动词是枢纽』演示框", {"verb": "look", "obj": "verb"}, ["look", "verb", "come"], ("look", "base", "look")),
    GEN("One verb can have two ways. Look them up one by one.", "边界：同一个动词换个意思，接法可能就换——要按意思一条条查", _D, "two-ways", "NE-08 exc 义项说法演示框", {"verb": "have", "obj": "verb"}, ["have", "verb", "way", "look"], ("have", "base", "have")),
]

# ---- NE-09 情景先行（可变=情景的种类：动物园/商店/教室/公园；不变=先有情景和意图，句型是办这件事的工具；边界=情景操练偏机械，只练不交际还差一步）
_A, _B, _C, _D = "情景先行的标本", "情景定了，意图就定", "句型是办事情的工具", "边界：只操练、不交际，还差一步"
SPEC_EW["NE-09"] = [
    O(0, _A), O(1, _A),
    GEN("In class: Please read after me.", "教室情景：老师领读的话，是在这个场合里长出来的", _A, "in-class", "NE-09 exs[0] 情景框", {"verb": "read"}, ["read", "class"], ("read", "base", "read")),
    GEN("In a restaurant: Can I have some noodles, please?", "饭馆情景：点面条的句子，先有这家店、这顿饭", _A, "in-restaurant", "NE-09 exs[1] 情景框", {"obj": "restaurant"}, ["restaurant", "noodles"]),
    GEN("At the park: Can I play on the grass?", "公园情景：想在草地上玩——先有地方，才有这句话", _B, "at-park", "NE-09 exs[0] 情景框", {"verb": "play", "place": "park"}, ["play", "park", "grass"], ("play", "base", "play")),
    GEN("At home: Mum, can I have some milk?", "在家要牛奶：对着妈妈说的话，和在商店里不一样", _B, "at-home", "NE-09 exs[1] 情景框", {"obj": "milk"}, ["home", "mum", "milk"]),
    GEN("We learn the words to do things: to ask, to buy, to play.", "学句型是为了办事：问路、买东西、玩耍，各有各的话", _C, "do-things", "NE-09 mech『情景先行』演示框", {"verb": "learn", "obj": "word"}, ["learn", "word", "ask", "buy", "play"], ("learn", "base", "learn")),
    GEN("First, who is here? Where are we? Then the words come.", "开口前先看场：谁在这儿、这是什么地方——句子随后就来", _C, "who-is-here", "NE-09 mech『情景先行』演示框", {"verb": "come", "obj": "word"}, ["come", "first", "word"], ("come", "base", "come")),
    GEN("Saying it in class is a start. Saying it to people is the test.", "边界：课上操练是起点——真对着人说出来，才算过关", _D, "saying-test", "NE-09 exc 操练说法演示框", {"verb": "say"}, ["say", "class", "people", "start", "test"], ("say", "ing", "saying")),
    GEN("Say it ten times. Now say it to a friend. It is not the same.", "自己念十遍和对朋友说一遍，不是一回事：交际那一步要单独迈", _D, "ten-times", "NE-09 exc 操练说法演示框", {"verb": "say"}, ["say", "time", "friend"], ("say", "base", "say")),
    GEN("At the zoo: Look! The monkeys are eating.", "还是动物园：情景一摆好，要说的话自己就冒出来了", _A, "at-zoo", "NE-09 exs[0] 情景框", {"verb": "eat", "obj": "monkey"}, ["eat", "zoo", "monkey", "look"], ("eat", "ing", "eating")),
]

# ---- NE-10 语调三决定（可变=调核的落点：落在哪个词上；不变=先切块、再选调核、再选调型，调核一移，意思就变；边界=三决定是描写框架，不穷尽语调的一切变化）
_A, _B, _C, _D = "同一句：调核落在不同词上", "第一决定：把话切成小块", "第三决定：声音上挑还是下掉", "边界：调核放错，意思就反了"
SPEC_EW["NE-10"] = [
    O(0, _A),
    GEN("I didn't say SHE took it. I said HE took it.", "喊重 SHE：否认的是『她』——不是她，是他拿的", _A, "she-took", "NE-10 exs[0] 调核框", {"verb": "take"}, ["say", "take"], ("take", "past", "took")),
    GEN("I didn't say she TOOK it. I said she SAW it.", "喊重 TOOK：否认的是『拿』——她是看见了，没拿", _A, "she-saw", "NE-10 exs[0] 调核框", {"verb": "see"}, ["say", "see", "take"], ("see", "past", "saw")),
    GEN("I didn't say she took IT. I said she took MY BOOK.", "喊重 IT：否认的是『那个东西』——她拿的是我的书", _A, "my-book", "NE-10 exs[0] 调核框", {"verb": "take", "obj": "book"}, ["say", "take", "book"], ("take", "past", "took")),
    GEN("First, cut the words into small parts.", "决定一：先把一句话切成一小块一小块", _B, "cut-parts", "NE-10 mech『三个决定』演示框", {"verb": "cut", "obj": "word"}, ["cut", "word", "small", "part", "first"], ("cut", "base", "cut")),
    GEN("One part, one big word: the word you say the loudest.", "决定二：每块里挑一个词喊得最重——那就是调核", _B, "loudest", "NE-10 mech『三个决定』演示框", {"verb": "say", "obj": "word"}, ["say", "part", "word", "big"], ("say", "base", "say")),
    GEN("Say it with the voice going down. You sound sure.", "决定三·下掉：声音往下走，听起来很肯定", _C, "voice-down", "NE-10 mech『三个决定』演示框", {"verb": "say", "obj": "voice"}, ["say", "voice", "go", "down", "sound", "sure"], ("say", "base", "say")),
    GEN("Say it with the voice going up. You are asking now.", "决定三·上挑：声音往上走，话就成了问句的味儿", _C, "voice-up", "NE-10 mech『三个决定』演示框", {"verb": "say", "obj": "voice"}, ["say", "voice", "go", "up", "ask"], ("say", "base", "say")),
    GEN("He puts the big voice on the wrong word. His friend hears the wrong thing.", "边界标本：重音放错词，朋友听岔了——调核放错，意思就反", _D, "wrong-word", "NE-10 mech『调核移位即改义』演示框", {"verb": "put", "obj": "voice"}, ["put", "voice", "wrong", "word", "friend", "hear"], ("put", "3sg", "puts")),
    GEN("The words are the same. The music is not. The meaning is not.", "收尾：词没变、调变了，意思就变了——这就是语调的活", _D, "music-not", "NE-10 对照框", {"obj": "word"}, ["word", "music"]),
    GEN("Listen again. Where does the big voice fall?", "练耳口令：再听一遍——最重的声音落在哪个词上", _B, "listen-again", "NE-10 prb 听辨框", {"verb": "listen", "obj": "voice"}, ["listen", "again", "big", "voice", "fall"], ("listen", "base", "listen")),
]

# ---- NE-11 口音是地图（可变=对照的词组：每一组词的读法；不变=口音是整组整组地系统变，是从哪儿来的标记，不是错误；边界=教学仍要选一个参照口音作基准）
_A, _B, _C, _D = "词组标本：一组一组地听", "整组一起变", "口音是身份：从哪儿来的标记", "边界：参照口音还是要选"
SPEC_EW["NE-11"] = [
    O(0, _A),
    GEN("Say the words in a group: dress, bath, goose.", "一组一组的词就是标本：谈口音，先把组里的词读出来对照", _A, "words-group", "NE-11 exs[0] 关键词框", {"verb": "say", "obj": "word"}, ["say", "word", "group", "dress", "bath", "goose"], ("say", "base", "say")),
    GEN("In one town, 'bath' sounds like this. In another town, it sounds like that.", "同一个 bath，两个地方两种读法：变得整整齐齐", _B, "bath-towns", "NE-11 mech『成系统的差异』演示框", {"verb": "sound", "obj": "bath"}, ["sound", "bath", "town", "like"], ("sound", "3sg", "sounds")),
    GEN("The words move together, like birds in the sky.", "一组词像一群鸟：要变一起变——这就叫系统", _B, "move-together", "NE-11 mech『成系统的差异』演示框", {"verb": "move", "obj": "word"}, ["move", "word", "together", "bird", "sky"], ("move", "base", "move")),
    GEN("One word can sound two ways in two towns.", "一个词两种声音：不是谁读错了，是地图不同", _B, "two-ways", "NE-11 mech『成系统的差异』演示框", {"verb": "sound", "obj": "word"}, ["sound", "word", "way", "town"], ("sound", "base", "sound")),
    GEN("His words tell you where he is from.", "听他的口音，就知道他从哪儿来：口音是身份牌", _C, "words-tell", "NE-11 mech『身份标记』演示框", {"verb": "tell", "obj": "word"}, ["tell", "word"], ("tell", "base", "tell")),
    GEN("She speaks like her mum and dad. That is her home in her voice.", "她说话像爸妈：家乡就住在她的声音里", _C, "like-mum-dad", "NE-11 mech『身份标记』演示框", {"verb": "speak", "obj": "voice"}, ["speak", "like", "mum", "dad", "home", "voice"], ("speak", "3sg", "speaks")),
    GEN("People know his home town from his words.", "老乡一听就认出来：口音把家乡写在了脸上", _C, "home-town", "NE-11 mech『身份标记』演示框", {"verb": "know", "obj": "word"}, ["know", "people", "home", "town", "word"], ("know", "base", "know")),
    GEN("We learn to hear many voices. We learn to speak in one clear way.", "边界：听，要听很多种；学，先跟定一种清楚的学", _D, "many-voices", "NE-11 exc 参照说法演示框", {"verb": "learn", "obj": "voice"}, ["learn", "hear", "voice", "speak", "clear", "way"], ("learn", "base", "learn")),
    GEN("Different is not wrong. Different is a map.", "收尾：读得不一样不是错——那是他从哪儿来的地图", _D, "not-wrong", "NE-11 对照框", {"obj": "map"}, ["map", "wrong"]),
    GEN("Say 'goose' in your way. Now hear it in her way.", "同屏对照：你读一遍、她读一遍——差的就是那一整组的差", _B, "goose-ways", "NE-11 exs[0] 对照框", {"verb": "say", "obj": "goose"}, ["say", "goose", "way", "hear"], ("say", "base", "say")),
]

# ---- NE-12 发音先练肌肉（可变=练的按钮：舌位/唇形/嗓子开关；不变=先用身体找到感觉，再听声音，顺序不能反；边界=单个音练对了，语流里的弱读连读还要另练）
_A, _B, _C, _D = "最小对：先摸身体，再听声音", "按钮各就各位：舌头和嘴", "手摸喉咙：分清浊", "边界：单个音对了，整句还要练"
SPEC_EW["NE-12"] = [
    O(0, _A), O(1, _A),
    GEN("Put your hand under your mouth. Feel it move.", "先摸：手放在嘴下，感受嘴在怎么动——身体先行", _A, "hand-mouth", "NE-12 exs[0] 肌肉框", {"verb": "put", "obj": "hand"}, ["put", "hand", "mouth", "feel", "move"], ("put", "base", "put")),
    GEN("Your tongue can go up. Your tongue can go down.", "按钮一：舌头——能上去，也能下来，位置决定声音", _B, "tongue-up", "NE-12 mech『四个按钮』演示框", {"verb": "go", "obj": "tongue"}, ["go", "tongue", "up", "down"], ("go", "base", "go")),
    GEN("Open your mouth a little. Now say 'sheep'.", "按钮二：嘴的开合——开一点点，sheep 就出来了", _B, "mouth-sheep", "NE-12 exs[0] 肌肉框", {"verb": "open", "obj": "mouth"}, ["open", "mouth", "little", "say", "sheep"], ("open", "base", "open")),
    GEN("Your mouth is round for 'goose'.", "读 goose 时嘴是圆的：嘴唇的形状也是按钮", _B, "mouth-round", "NE-12 mech『四个按钮』演示框", {"obj": "mouth"}, ["mouth", "round", "goose"]),
    GEN("Put your hand here. Say 'big'. You can feel it move.", "按钮三：嗓子——说 big 时手能摸到它在震", _C, "feel-big", "NE-12 exs[1] 清浊框", {"verb": "put", "obj": "hand"}, ["put", "hand", "say", "big", "feel", "move"], ("put", "base", "put")),
    GEN("Now say 'pig'. It does not move.", "换 pig：手下安安静静——清和浊，身体先知道", _C, "say-pig", "NE-12 exs[1] 清浊框", {"verb": "say"}, ["say", "pig", "move"], ("say", "base", "say")),
    GEN("One sound is right. A whole sentence is harder.", "边界：一个音练对了，整句话里的音还会变样——那是下一步的功课", _D, "whole-sentence", "NE-12 exc 语流说法演示框", {"obj": "sound"}, ["sound", "right", "sentence", "hard"]),
    GEN("In a song, the words run together. That is new work.", "歌里词连成一片：弱读连读是语流的活，要专门练", _D, "run-together", "NE-12 exc 语流说法演示框", {"verb": "run", "obj": "word"}, ["run", "word", "song", "together", "new", "work"], ("run", "base", "run")),
    GEN("Feel first, listen next. That is the way.", "顺序口令：先感受、后听音——反过来事倍功半", _B, "feel-first", "NE-12 mech『顺序倒转』演示框", {"verb": "feel"}, ["feel", "first", "listen"], ("feel", "base", "feel")),
]

# ---- NE-13 音标是地图（可变=在地图上找的音与它的邻居；不变=音的位置就是它的发音方法，地图是上手玩的工作台；边界=地图以一个参照口音为格架，换参照格数略有出入）
_A, _B, _C, _D = "点着地图找声音", "邻居格：住得近，声音也像", "地图是拿来玩的", "边界：地图有它的参照系"
SPEC_EW["NE-13"] = [
    O(0, _A), O(1, _A),
    GEN("Bus — the first sound lives at the front of the mouth.", "再找一个：bus 的第一个音也住在前面——用嘴唇发的音排前面", _A, "bus-front", "NE-13 exs[0] 地图框", {"obj": "bus"}, ["bus", "first", "sound", "front", "mouth"]),
    GEN("Red — the first sound lives in the middle of the map.", "再点一个：red 的第一个音住在地图中间一带", _A, "red-middle", "NE-13 exs[0] 地图框", {"obj": "red"}, ["red", "first", "sound", "map"]),
    GEN("Zoo — the first sound lives next door to a quiet one, with the voice on.", "邻居格：zoo 的第一个音和一个不出声的音住隔壁，只差嗓子开没开", _B, "zoo-next-door", "NE-13 exs[1] 邻居框", {"obj": "zoo"}, ["zoo", "first", "sound", "voice", "quiet"]),
    GEN("The sounds that live near each other sound near each other.", "地图的道理：住得近的声音，听起来也像", _B, "live-near", "NE-13 mech『地图不是考卷』演示框", {"verb": "live", "obj": "sound"}, ["live", "sound", "near"], ("live", "base", "live")),
    GEN("Point to a sound. Say a word with it.", "上手玩：指一个格子，说一个带这个音的词", _C, "point-sound", "NE-13 mech『地图不是考卷』演示框", {"verb": "point", "obj": "sound"}, ["point", "sound", "say", "word"], ("point", "base", "point")),
    GEN("Find /iː/ on the map. Now say 'see'.", "按图索音：找到 /iː/ 的格子，再把 see 说出来", _C, "find-map", "NE-13 mech『地图不是考卷』演示框", {"verb": "find", "obj": "map"}, ["find", "map", "say", "see"], ("find", "base", "find")),
    GEN("This map is for one voice. Other maps have a few more rooms.", "边界：这张图照一种口音画——换个参照，格子数会有点出入", _D, "one-voice", "NE-13 exc 参照系说法演示框", {"obj": "map"}, ["map", "voice", "room"]),
    GEN("A map is not the land. But it helps you walk.", "比方收尾：地图不是地面本身，可走路离不开它", _D, "map-land", "NE-13 对照框", {"verb": "help", "obj": "map"}, ["help", "map", "walk"], ("help", "3sg", "helps")),
    GEN("Say the sound. Find its home on the map.", "反着玩也行：先出声，再找它住在哪一格", _C, "find-home", "NE-13 mech『地图不是考卷』演示框", {"verb": "say", "obj": "sound"}, ["say", "sound", "find", "home"], ("say", "base", "say")),
]

# ---- NE-14 可懂度优先（可变=要保住的区别：哪一对词的最小对立；不变=目标是被全世界听懂，区别在，可懂就在，不必扮母语者；边界=有特殊目标的人可以另设母语式目标）
_A, _B, _C, _D = "区别在，就听得懂", "区别丢了，就出事", "不必扮母语者", "边界：特殊目标，可以另说"
SPEC_EW["NE-14"] = [
    O(0, _A),
    GEN("'Gate' and 'get' are not the same word.", "gate 和 get 就差一点：这一点在，意思就分得开", _A, "gate-get", "NE-14 exs[0] 对立框", {"obj": "gate"}, ["gate", "get", "word"]),
    GEN("Say 'safe' and 'save'. The last sounds are not the same.", "safe 和 save 最后一格不一样：守住它，听的人就不猜", _A, "safe-save", "NE-14 exs[0] 对立框", {"verb": "say"}, ["say", "safe", "save", "last", "sound"], ("say", "base", "say")),
    GEN("'Ship' and 'sheep' are two words. Keep the two sounds.", "船和羊只差一个音：两个音都守住，全世界都听得懂", _A, "ship-sheep", "NE-14 mech『保持区别』演示框", {"verb": "keep", "obj": "ship"}, ["keep", "ship", "sheep", "word", "sound"], ("keep", "base", "keep")),
    GEN("Two words, one small sound between them. Lose it, and the meaning is lost.", "两个词之间只隔一个小音：丢了它，意思就丢了", _B, "lose-it", "NE-14 mech『保持区别』演示框", {"verb": "lose", "obj": "word"}, ["lose", "word", "small", "sound"], ("lose", "base", "lose")),
    GEN("People hear the word you say, not the word you want.", "听的人只认你说出口的词：区别没了，他就懂成另一个", _B, "hear-you-say", "NE-14 cases[0] 情景框", {"verb": "hear", "obj": "word"}, ["hear", "people", "word", "say", "want"], ("hear", "base", "hear")),
    GEN("You can keep your own voice. Just keep the sounds clear.", "口音可以留着：要守的不是口音，是区别和清楚", _C, "own-voice", "NE-14 mech『可懂度优先』演示框", {"verb": "keep", "obj": "voice"}, ["keep", "own", "voice", "sound", "clear"], ("keep", "base", "keep")),
    GEN("A boy from China can speak clear English.", "中国孩子也能说清楚：清楚和口音是两回事", _C, "clear-english", "NE-14 mech『可懂度优先』演示框", {"verb": "speak", "obj": "boy"}, ["speak", "boy", "clear"], ("speak", "base", "speak")),
    GEN("Some people want more: to sound like the people there. That is their own road.", "边界：有人要去当地生活，想学得更像——那是他的目标，另设即可", _D, "own-road", "NE-14 exc 特殊目标演示框", {"verb": "want", "obj": "people"}, ["want", "people", "sound", "like", "own", "road"], ("want", "base", "want")),
    GEN("For us, clear is the first job.", "收尾：我们的目标先定在『清楚、能懂』，这不丢人", _D, "first-job", "NE-14 对照框", {"obj": "clear"}, ["clear", "first"]),
    GEN("Say it again, a little slower. Now we understand.", "听不懂就放慢、说清：可懂是两边一起做成的", _B, "say-again", "NE-14 mech『可懂度优先』演示框", {"verb": "say"}, ["say", "again", "little", "understand"], ("say", "base", "say")),
]

# ---- NE-15 手册也会错（可变=被验的主张：被动句之类；不变=规矩先过证据关——大作家真的这样写吗、手册自己前后一致吗；边界=文体建议可以留，语法论断要过证据关）
_A, _B, _C, _D = "先问证据", "手册认错的被动句", "手册还会自相矛盾", "边界：文体建议可留，语法要验"
SPEC_EW["NE-15"] = [
    GEN("A man writes a rule in a book. We ask: is it true?", "第一问：有人在书里写了条规矩——先别信，先问真假", _A, "man-writes", "NE-15 mech『先问证据』演示框", {"verb": "write", "obj": "rule"}, ["write", "man", "rule", "book", "ask", "true"], ("write", "3sg", "writes")),
    GEN("Show us the great writers. Do they write like that?", "第二问：把大作家的书拿来——他们真的这样写吗", _A, "great-writers", "NE-15 mech『先问证据』演示框", {"verb": "show", "obj": "writer"}, ["show", "great", "writer", "write"], ("show", "base", "show")),
    GEN("Rules must first pass the test of real writing.", "规矩上岗前先考试：过不了真文章这一关，就不算数", _A, "pass-test", "NE-15 mech『先问证据』演示框", {"verb": "pass", "obj": "rule"}, ["pass", "rule", "first", "test", "real", "write"], ("pass", "base", "pass")),
    GEN("'The cup was broken.' The small book says this is not good.", "被验的句子：杯子被打碎了——小册子说这句不好", _B, "cup-broken", "NE-15 mech『手册也会错』演示框", {"verb": "say", "obj": "cup"}, ["say", "cup", "book", "good"], ("say", "3sg", "says")),
    GEN("But great writers write sentences like that every day.", "证据来了：大作家天天写这样的被动句——小册子认错了", _B, "writers-like-that", "NE-15 mech『手册也会错』演示框", {"verb": "write", "obj": "sentence"}, ["write", "great", "writer", "sentence", "day", "like"], ("write", "base", "write")),
    GEN("'I was told to wait' is a good English sentence.", "再验一句被动：有人让我等着——好端端的英语句子", _B, "told-wait", "NE-15 mech『手册也会错』演示框", {"verb": "tell", "obj": "wait"}, ["tell", "wait", "good", "sentence"], ("tell", "past", "told")),
    GEN("On one page it says yes. On the next page it says no.", "矛盾标本：这页说行、下页说不行——手册自己跟自己打架", _C, "page-yes-no", "NE-15 mech『手册也会错』演示框", {"verb": "say", "obj": "page"}, ["say", "page"], ("say", "3sg", "says")),
    GEN("A book can be wrong. Ask for the words of great writers.", "书会错，证据不会：拿不出作家的真句子，规矩就先放一放", _C, "book-wrong", "NE-15 mech『先问证据』演示框", {"verb": "ask", "obj": "book"}, ["ask", "book", "wrong", "word", "great", "writer"], ("ask", "base", "ask")),
    GEN("Write short and clear. That part of the book is fine.", "边界：小册子教人写短、写清——这部分是好的建议，留着", _D, "short-clear", "NE-15 exc 文体建议演示框", {"verb": "write"}, ["write", "short", "clear", "book", "fine"], ("write", "base", "write")),
    GEN("Keep the good ideas. Test the rules about words and sentences.", "分家：好建议留下，语法论断一条条验——不整本信，也不整本扔", _D, "keep-ideas", "NE-15 exc 文体建议演示框", {"verb": "keep", "obj": "idea"}, ["keep", "good", "idea", "test", "rule", "word", "sentence"], ("keep", "base", "keep")),
]

# ---- NE-16 语法是选择（可变=选择的种类：镜头对人/对物、短句/长句；不变=多学一种形式，就多一条可选的路，选法不同、感受不同；边界=选择不等于没对错，准确性仍在）
_A, _B, _C, _D = "镜头对人：主动", "镜头对物：被动", "节奏之选：短句排队还是长句连绵", "边界：选择不是随便，错的还是错"
SPEC_EW["NE-16"] = [
    O(0, _A),
    GEN("The dog broke the cup.", "还是主动：这次镜头对着狗——谁干的，一清二楚", _A, "dog-broke", "NE-16 exs[0] 句框", {"verb": "break", "obj": "dog"}, ["break", "dog", "cup"], ("break", "past", "broke")),
    GEN("She opened the door.", "主动的句子：做事的人站在最前面", _A, "she-opened", "NE-16 mech『选择的仓库』演示框", {"verb": "open", "obj": "door"}, ["open", "door"], ("open", "past", "opened")),
    O(1, _B),
    GEN("The cup was broken by the dog.", "被动也能带出干事的：镜头还在杯子上，狗在后面露脸", _B, "broken-by-dog", "NE-16 exs[1] 句框", {"obj": "cup"}, ["cup", "dog"]),
    GEN("The door was opened.", "门被打开了：谁开的不重要，就不说——这也是选择", _B, "door-opened", "NE-16 exs[1] 句框", {"obj": "door"}, ["door", "open"]),
    O(2, _C),
    GEN("The rain came down hard. The wind blew all night. No one could sleep.", "换成长句连绵：同一个夜里，节奏慢下来，像风一样吹过去", _C, "rain-wind", "NE-16 exs[2] 对照框", {"verb": "come", "obj": "rain"}, ["come", "rain", "wind", "night", "sleep"], ("come", "past", "came")),
    GEN("Two ways to say it. Both are right. They do not feel the same.", "选择的道理：两种都对，可读起来不一样——选哪个，是写手的活", _D, "two-ways", "NE-16 mech『选择的仓库』演示框", {"verb": "say"}, ["say", "way", "right", "feel"], ("say", "base", "say")),
    GEN("A wrong word is still wrong. Choosing is not guessing.", "边界：有选择不等于没对错——选是在对的形式里挑，不是乱猜", _D, "not-guessing", "NE-16 exc 准确性说法演示框", {"obj": "word"}, ["word", "wrong"]),
    GEN("I broke the cup. The cup was broken. I say it two ways.", "同屏收尾：一件事、两种说法，轮流用才叫仓库里有货", _B, "two-ways-cup", "NE-16 exs[0]/exs[1] 对照框", {"verb": "say", "obj": "cup"}, ["say", "cup", "way"], ("say", "base", "say")),
]

# ---- NE-17 语法嵌在写作里（可变=当下连着的写作决定：节奏/镜头/长短；不变=语法点嵌在正要写的文章里教，才学得进、用得出；边界=效应有条件：弱生受益少，老师自己要讲得清）
_A, _B, _C, _D = "正写故事时，学短句", "同一场景，换长句", "每个语法点，连着一个写作决定", "边界：不是人人一样受益"
SPEC_EW["NE-17"] = [
    O(0, _A),
    GEN("The door opened. A cat ran out!", "接着学短句：门开、猫跑——紧张就靠一句一顿", _A, "cat-ran", "NE-17 exs[0] 嵌入框", {"verb": "run", "obj": "cat"}, ["run", "door", "cat"], ("run", "past", "ran")),
    GEN("Night came. The town was quiet.", "短句收尾造气氛：这些语法点，都是为这一段故事学的", _A, "night-town", "NE-17 exs[0] 嵌入框", {"verb": "come", "obj": "night"}, ["come", "night", "town", "quiet"], ("come", "past", "came")),
    O(1, _B),
    GEN("The cat was running in the rain, and the dog was waiting at the door.", "换成长句：猫在雨里跑、狗在门口等——画面连成一片", _B, "cat-running", "NE-17 exs[1] 嵌入框", {"verb": "run", "obj": "cat"}, ["run", "cat", "rain", "dog", "door"], ("run", "ing", "running")),
    GEN("I want it fast. I write short.", "决定在先：想要快，就写短——语法是为决定服务的", _C, "want-fast", "NE-17 mech『嵌在决定里』演示框", {"verb": "write"}, ["write", "want", "fast", "short"], ("write", "base", "write")),
    GEN("I want it slow. I write long, soft sentences.", "想要慢，就写长：先有想让读者怎么感受，再选句子", _C, "want-slow", "NE-17 mech『嵌在决定里』演示框", {"verb": "write", "obj": "sentence"}, ["write", "want", "slow", "long", "soft", "sentence"], ("write", "base", "write")),
    GEN("Short or long? The story tells you.", "选哪种，问故事：语法决定权在文章手里", _C, "story-tells", "NE-17 mech『嵌在决定里』演示框", {"verb": "tell", "obj": "story"}, ["tell", "short", "long", "story"], ("tell", "3sg", "tells")),
    GEN("The strong writers learn fast. The others need more help.", "边界：嵌着教也不是人人一样——写得弱的孩子，还要多扶一把", _D, "strong-writers", "NE-17 exc 受益差异演示框", {"verb": "learn", "obj": "writer"}, ["learn", "strong", "writer", "fast", "help"], ("learn", "base", "learn")),
    GEN("The teacher must say why this way is better.", "还有一关：老师自己要能说清『为什么这样写更好』，不然效应打折", _D, "teacher-say-why", "NE-17 exc 教师变量演示框", {"verb": "say"}, ["say", "teacher", "way"], ("say", "base", "say")),
    GEN("We learn the sentence because the story needs it now.", "收尾：不是为学句子而学句子——是故事正需要它", _C, "story-needs", "NE-17 对照框", {"verb": "learn", "obj": "sentence"}, ["learn", "sentence", "story", "need"], ("learn", "base", "learn")),
]

# ---- NE-18 语类台阶（可变=文本的种类：故事/报告/说明，各有各的台阶；不变=动笔前先看清这种文章的过关路线；边界=路线图是脚手架，不是模具）
_A, _B, _C, _D = "第一阶·铺垫：谁、何时、何地", "第二阶·出事：平静被打破", "第三阶·解决：问题收束", "边界：图是脚手架，不是模具"
SPEC_EW["NE-18"] = [
    O(0, _A),
    GEN("One day, a little cat lived in a small house near the river.", "还是铺垫：换只猫、换间房——先把谁和哪儿摆好", _A, "cat-house", "NE-18 exs[0] 阶段框", {"verb": "live", "obj": "cat"}, ["live", "cat", "house", "river", "day"], ("live", "past", "lived")),
    GEN("Every story starts by telling us who and where.", "铺垫的活就一件：让读者先站稳——谁、在哪儿", _A, "who-where", "NE-18 mech『过关路线』演示框", {"verb": "tell", "obj": "story"}, ["tell", "story", "start"], ("tell", "ing", "telling")),
    O(1, _B),
    GEN("Suddenly, the rain came down. The river ran fast.", "出事换成下雨涨水：平静的日子被打破，故事动起来", _B, "rain-river", "NE-18 exs[1] 阶段框", {"verb": "come", "obj": "rain"}, ["come", "rain", "river", "fast"], ("come", "past", "came")),
    GEN("Then the quiet day breaks. Something goes wrong.", "出事的记号：安静被打破、有事发生——读者就知道往下看了", _B, "day-breaks", "NE-18 exs[1] 阶段框", {"verb": "go", "obj": "day"}, ["go", "quiet", "day", "wrong"], ("go", "3sg", "goes")),
    O(2, _C),
    GEN("At last, the sun came out. The duck went home happy.", "解决换成雨过天晴：事完了，人物回家——故事收束", _C, "sun-out", "NE-18 exs[2] 阶段框", {"verb": "come", "obj": "sun"}, ["come", "sun", "duck", "home", "happy"], ("come", "past", "came")),
    GEN("Two stories, two roads. The map is not the story.", "边界：路线图一样，故事可以各走各的——图是帮忙的，不是模子", _D, "two-roads", "NE-18 exc 脚手架说法演示框", {"obj": "story"}, ["story", "road", "map"]),
    GEN("First see the road. Then walk it in your own way.", "用法：先看清路线，再用自己的走法走完它", _D, "see-the-road", "NE-18 mech『把地图摆上桌面』演示框", {"verb": "see", "obj": "road"}, ["see", "road", "first", "walk", "way"], ("see", "base", "see")),
    GEN("A report has other steps. A story has these.", "换种文章换路线：报告的台阶不是故事的台阶", _D, "report-steps", "NE-18 mech『过关路线』演示框", {"verb": "have", "obj": "report"}, ["have", "report", "step", "story"], ("have", "3sg", "has")),
]

# ---- NE-19 教学循环三步（可变=循环的环：拆范文/合写/独写；不变=扶持一环比一环少，顺序不能跳；边界=范文先要读得懂，EFL 的起点和母语课堂不同）
_A, _B, _C, _D = "第一环：全班一起拆范文", "第二环：全班一起合写", "第三环：自己独立写", "边界：不能把不会游泳的人推下水"
SPEC_EW["NE-19"] = [
    GEN("The teacher reads the story with us. We look at how it starts.", "第一环：老师带着把范文拆开看——先看它怎么开头", _A, "reads-with-us", "NE-19 mech『四环递减』演示框", {"verb": "read", "obj": "story"}, ["read", "teacher", "story", "look", "start"], ("read", "3sg", "reads")),
    GEN("We ask: who is in it? Where are we?", "拆的时候问两句：故事里有谁、发生在哪儿", _A, "who-in-it", "NE-19 mech『四环递减』演示框", {"verb": "ask"}, ["ask"], ("ask", "base", "ask")),
    GEN("We look at the story part by part.", "一部分一部分看：整篇拆开，台阶就露出来了", _A, "part-by-part", "NE-19 mech『四环递减』演示框", {"verb": "look", "obj": "story"}, ["look", "story", "part"], ("look", "base", "look")),
    GEN("Now we write a new one together. The teacher writes our words.", "第二环·合写：我们说、老师写——全班共写一篇新的", _B, "write-together", "NE-19 mech『共构是枢纽』演示框", {"verb": "write"}, ["write", "new", "together", "teacher", "word"], ("write", "base", "write")),
    GEN("I say a sentence. She writes it on the board.", "合写的样子：学生出主意，老师的手替大家落字", _B, "on-the-board", "NE-19 mech『共构是枢纽』演示框", {"verb": "say", "obj": "sentence"}, ["say", "sentence", "write", "board"], ("say", "base", "say")),
    GEN("Now I write my own story. No one helps me.", "第三环：轮到自己写——扶着的手撤完了", _C, "own-story", "NE-19 mech『四环递减』演示框", {"verb": "write", "obj": "story"}, ["write", "story", "help"], ("write", "base", "write")),
    GEN("My story starts like the first one. Then it goes my way.", "独写不是乱写：开头借着学过的路，后面走自己的", _C, "goes-my-way", "NE-19 mech『四环递减』演示框", {"verb": "go", "obj": "story"}, ["go", "story", "start", "way"], ("go", "3sg", "goes")),
    GEN("Her story is new. The road under it is the one we walked.", "她的故事是新的：脚下的路，是全班一起走过的那条", _C, "road-walked", "NE-19 对照框", {"verb": "walk", "obj": "story"}, ["walk", "story", "new", "road"], ("walk", "past", "walked")),
    GEN("No one learns to swim by being pushed into deep water.", "边界：不会游泳的人不是推下水教的——写作也一样，先扶后放", _D, "deep-water", "NE-19 kid 比方框", {"verb": "learn", "obj": "swim"}, ["learn", "swim", "water", "deep"], ("learn", "3sg", "learns")),
    GEN("Step by step: first with the teacher, then with friends, then alone.", "顺序口令：先和老师、再和同伴、最后自己——一步不能跳", _D, "step-by-step", "NE-19 mech『四环递减』演示框", {"obj": "step"}, ["step", "first", "teacher", "friend", "alone"]),
]

# ---- NE-20 难课文嚼碎（可变=嚼的层次：先整篇、再逐句、再回篇；不变=不给简单版降难度，而是把支架加厚，全班读同一篇难的；边界=对老师要求极高，支架不到位就会退化成老师讲、学生听）
_A, _B, _C, _D = "同一篇难课文，全班一起上", "一句一句嚼碎", "嚼透了，自己能写", "边界：支架不到位，就退化成听讲"
SPEC_EW["NE-20"] = [
    GEN("This story is hard. We all read the same one.", "第一条：再难也全班读同一篇——不给谁发简单版", _A, "same-one", "NE-20 mech『不降难度，加厚支架』演示框", {"verb": "read", "obj": "story"}, ["read", "story", "hard"], ("read", "base", "read")),
    GEN("No easy book for the slow readers. The teacher stays with us.", "读得慢的也不换书：老师陪着，一起把难的啃下来", _A, "no-easy-book", "NE-20 mech『不降难度，加厚支架』演示框", {"verb": "stay", "obj": "book"}, ["stay", "easy", "book", "slow", "reader", "teacher"], ("stay", "3sg", "stays")),
    GEN("Hard is good. Hard is where we grow.", "难不是坏事：长本事的地方，正是难的地方", _A, "hard-is-good", "NE-20 mech『不降难度，加厚支架』演示框", {"verb": "grow"}, ["grow", "hard", "good"], ("grow", "base", "grow")),
    GEN("We read one sentence. The teacher asks: who? Where?", "精细阅读：读一句、停一停——谁、在哪儿，先问清", _B, "one-sentence", "NE-20 mech『精细阅读三步』演示框", {"verb": "read", "obj": "sentence"}, ["read", "sentence", "teacher", "ask"], ("read", "base", "read")),
    GEN("We say the sentence in our own words.", "把难句换成自己的话说一遍：嚼碎，就是这么嚼", _B, "own-words", "NE-20 mech『精细阅读三步』演示框", {"verb": "say", "obj": "sentence"}, ["say", "sentence", "word", "own"], ("say", "base", "say")),
    GEN("The teacher gives us a word. We use it in the sentence.", "老师递一个词，我们马上用进句子：支架加在句子层", _B, "gives-a-word", "NE-20 mech『精细阅读三步』演示框", {"verb": "give", "obj": "word"}, ["give", "teacher", "word", "use", "sentence"], ("give", "3sg", "gives")),
    GEN("Now the hard words are our words.", "嚼透的记号：难词变成了自己的词", _C, "our-words", "NE-20 mech『精细阅读三步』演示框", {"obj": "word"}, ["word", "hard"]),
    GEN("We can write a sentence like the book's.", "读透了就能写：写出一句像课文那样的句子", _C, "like-the-books", "NE-20 mech『精细阅读三步』演示框", {"verb": "write", "obj": "sentence"}, ["write", "sentence", "book", "like"], ("write", "base", "write")),
    GEN("If the teacher only talks, we only listen. That is not it.", "边界：老师一个人讲、学生干听——支架退化成了讲授", _D, "only-talks", "NE-20 exc 退化说法演示框", {"verb": "talk", "obj": "teacher"}, ["talk", "teacher", "listen"], ("talk", "3sg", "talks")),
    GEN("The hard book is still hard when we read it alone.", "没人陪着嚼，难书还是难书：这条路对老师的要求最高", _D, "still-hard", "NE-20 exc 退化说法演示框", {"verb": "read", "obj": "book"}, ["read", "hard", "book", "alone"], ("read", "base", "read")),
]

# ---- NE-21 按活儿组织语法（可变=活儿的种类：说清事情/把意思连起来/跟人打交道/织成整篇；不变=备课先问这篇文本要干哪种活，再选语法；边界=功能术语和学校里的老术语不是一套，整套搬来会打架）
_A, _B, _C, _D = "先问活儿，再选语法", "四种活儿，各看一句", "跟人打交道也是一种活", "边界：术语别打架，一套一套来"
SPEC_EW["NE-21"] = [
    GEN("What job is this story doing? First ask that.", "备课第一问：这篇文章要干哪种活——先问活，再看词", _A, "what-job", "NE-21 mech『先问活儿，再选语法』演示框", {"verb": "ask", "obj": "job"}, ["ask", "job", "story", "first"], ("ask", "base", "ask")),
    GEN("Is it telling a story, or telling us how to make a cake?", "是讲故事，还是教做蛋糕：活儿不同，要学的语法就不同", _A, "telling-cake", "NE-21 mech『先问活儿，再选语法』演示框", {"verb": "tell", "obj": "story"}, ["tell", "story", "make", "cake"], ("tell", "ing", "telling")),
    GEN("A cake book and a story book do different jobs.", "食谱和故事书干的是两种活：不能用一把尺量", _A, "different-jobs", "NE-21 mech『四种活儿』演示框", {"verb": "do", "obj": "book"}, ["do", "cake", "book", "story", "job"], ("do", "base", "do")),
    GEN("The dog ran out of the house.", "活儿一·说清事情：谁、做了什么——狗跑出去了", _B, "dog-ran-out", "NE-21 mech『四种活儿』演示框", {"verb": "run", "obj": "dog"}, ["run", "dog", "house"], ("run", "past", "ran")),
    GEN("Words like 'first' and 'because' hold the parts together.", "活儿二·连接：first、because 这些词，把文章的零件扣在一起", _B, "hold-together", "NE-21 mech『四种活儿』演示框", {"verb": "hold", "obj": "word"}, ["hold", "word", "first", "because", "part", "together"], ("hold", "base", "hold")),
    GEN("It makes a picture of the whole thing, word by word.", "活儿四·织篇：一个词一个词，把整幅画织出来", _B, "makes-picture", "NE-21 mech『四种活儿』演示框", {"verb": "make", "obj": "picture"}, ["make", "picture", "whole", "thing", "word"], ("make", "3sg", "makes")),
    GEN("'Can I have some water, please?' These words are making friends.", "活儿三·打交道：这句话不光要水，还在和人好好相处", _C, "making-friends", "NE-21 mech『四种活儿』演示框", {"verb": "make", "obj": "word"}, ["make", "word", "water", "friend"], ("make", "ing", "making")),
    GEN("Words can ask, thank and say sorry. That is a job, too.", "问、谢、道歉都是活：语言不光说事，还处人", _C, "ask-thank-sorry", "NE-21 mech『四种活儿』演示框", {"verb": "ask", "obj": "word"}, ["ask", "word", "thank", "sorry", "job"], ("ask", "base", "ask")),
    GEN("We use the names we know. New names come one by one.", "边界：新术语一次来一套会打架——先用熟的，新的一批批来", _D, "names-we-know", "NE-21 exc 术语双轨演示框", {"verb": "use", "obj": "name"}, ["use", "name", "know", "new", "come"], ("use", "base", "use")),
    GEN("We learn the jobs first. The hard names can wait.", "顺序：先懂活儿，难名字慢慢来——别让术语挡住正事", _D, "jobs-first", "NE-21 exc 术语双轨演示框", {"verb": "learn", "obj": "job"}, ["learn", "job", "first", "name", "wait"], ("learn", "base", "learn")),
]

# ---- NE-22 书的规矩（可变=规矩的种类：从哪读/往哪读/词和画之别；不变=开始读书之前，先搞懂书是怎么运作的；边界=懂规矩不等于会读，它测的不是阅读能力本身）
_A, _B, _C, _D = "从哪儿开始、往哪儿读", "一个词是一个词", "字和画，不是一回事", "边界：懂规矩，不等于会读"
SPEC_EW["NE-22"] = [
    GEN("We start at the front. We read from left to right.", "规矩一：从书的前面开始，一个字挨一个字往右读", _A, "left-to-right", "NE-22 mech『书的规矩』演示框", {"verb": "start"}, ["start", "front", "read", "left", "right"], ("start", "base", "start")),
    GEN("Turn the page. The story goes on.", "翻一页，故事接着走：书是一页一页往后读的", _A, "turn-page", "NE-22 mech『书的规矩』演示框", {"verb": "turn", "obj": "page"}, ["turn", "page", "story", "go"], ("turn", "base", "turn")),
    GEN("The name of the book is on the front.", "书名住在封面上：找一本书，先看它的名字", _A, "name-front", "NE-22 mech『书的规矩』演示框", {"obj": "name"}, ["name", "book", "front"]),
    GEN("This is one word. That is another word.", "规矩二：词是一个一个分开的，中间有空当", _B, "one-word", "NE-22 mech『书的规矩』演示框", {"obj": "word"}, ["word"]),
    GEN("Point to each word as you read.", "练习法：读到哪儿，手指点到哪儿——词和声音对上号", _B, "point-word", "NE-22 mech『书的规矩』演示框", {"verb": "point", "obj": "word"}, ["point", "word", "read"], ("point", "base", "point")),
    GEN("The picture shows the dog. The words say 'dog'.", "规矩三：画是画、字是字——画给你看，字给你读", _C, "picture-words", "NE-22 mech『书的规矩』演示框", {"verb": "show", "obj": "picture"}, ["show", "picture", "dog", "word", "say"], ("show", "3sg", "shows")),
    GEN("We read the words, not the pictures.", "读书读的是字：看着画猜，不叫读书", _C, "read-words", "NE-22 mech『书的规矩』演示框", {"verb": "read", "obj": "word"}, ["read", "word", "picture"], ("read", "base", "read")),
    GEN("Letters make words. Pictures do not.", "字母拼成词：画再好看，也拼不出词来", _C, "letters-words", "NE-22 mech『书的规矩』演示框", {"verb": "make", "obj": "word"}, ["make", "word", "picture"], ("make", "base", "make")),
    GEN("He knows where to start. He still has to learn the words.", "边界：懂规矩只是过门——词还得一个个学，书还得一句句读", _D, "knows-start", "NE-22 exc 测评说法演示框", {"verb": "know"}, ["know", "start", "learn", "word"], ("know", "3sg", "knows")),
    GEN("The rules of the book are the door. Reading is the road after it.", "比方收尾：书的规矩是门，真正的阅读是门后的路", _D, "door-road", "NE-22 对照框", {"obj": "rule"}, ["rule", "book", "door", "read", "road"]),
]

# ---- NE-23 一对一小课（可变=事实的面：早开始/天天上/一对一；不变=短期有效有证据，长期效果专家还在争，两面都要说；边界=一对一太贵，在我们这儿更可能是小组化、短周期）
_A, _B, _C, _D = "小课的样子：早、密、一对一", "起步确实快", "长期效果，还在争", "边界：太贵，难照搬"
SPEC_EW["NE-23"] = [
    GEN("Every day, one child reads with one teacher for thirty minutes.", "小课的样子：每天三十分钟，一个孩子对一个老师", _A, "thirty-minutes", "NE-23 mech『早、密、个别化』演示框", {"verb": "read", "obj": "child"}, ["read", "day", "child", "teacher", "thirty", "minute"], ("read", "3sg", "reads")),
    GEN("The class is short, but it comes every day.", "课不长，胜在天天有：密，就是它的药引", _A, "short-every-day", "NE-23 mech『早、密、个别化』演示框", {"verb": "come", "obj": "class"}, ["come", "class", "short", "day"], ("come", "3sg", "comes")),
    GEN("The teacher watches one child read, and helps at once.", "老师只看一个孩子：错在哪儿，当场就扶", _A, "watches-one", "NE-23 mech『早、密、个别化』演示框", {"verb": "watch", "obj": "child"}, ["watch", "teacher", "child", "read", "help"], ("watch", "3sg", "watches")),
    GEN("The children read better after some weeks.", "几周下来，孩子们读得明显好了：短期有效，有据可查", _B, "after-weeks", "NE-23 mech『早、密、个别化』演示框", {"verb": "read", "obj": "child"}, ["read", "child", "week"], ("read", "base", "read")),
    GEN("At first, the new readers run fast.", "起步阶段进步最显眼：落后的孩子追上来一截", _B, "run-fast", "NE-23 对照框", {"verb": "run", "obj": "reader"}, ["run", "first", "new", "reader", "fast"], ("run", "base", "run")),
    GEN("Years later, are they still better? Not everyone says yes.", "几年之后呢：专家们还没吵出结果——这话要如实说", _C, "years-later", "NE-23 mech『早、密、个别化』演示框", {"verb": "say", "obj": "year"}, ["say", "year", "people"], ("say", "3sg", "says")),
    GEN("Some studies say yes. Some say not for long.", "有的研究说管用，有的说管不久：两边的话都要听", _C, "studies-say", "NE-23 对照框", {"verb": "say", "obj": "study"}, ["say", "study", "long"], ("say", "base", "say")),
    GEN("One teacher for one child is a lot of money and time.", "边界：一个老师只教一个孩子——钱和时间都太贵", _D, "money-time", "NE-23 exc 成本说法演示框", {"obj": "teacher"}, ["teacher", "child", "money", "time"]),
    GEN("In our schools, small groups may be the way.", "我们的对应办法：小班组、短周期——学它的法，不搬它的价", _D, "small-groups", "NE-23 exc 成本说法演示框", {"obj": "school"}, ["school", "small", "group", "way"]),
    GEN("A good idea is not always a road we can walk.", "收尾：好主意不等于走得通的路——先看条件，再学方法", _D, "good-idea", "NE-23 对照框", {"verb": "walk", "obj": "idea"}, ["walk", "good", "idea", "road"], ("walk", "base", "walk")),
]

# ---- NE-24 谈话三型（可变=谈话的型：争执/附和/探索；不变=只有探索型里思考是公开的——想法带理由、互相追问；边界=想探索却没词的时候，句框要先到位）
_A, _B, _C, _D = "争执型：谁也不听谁", "附和型：只点头、不检验", "探索型：想法带理由，互相追问", "边界：想探索没词，先给句框"
SPEC_EW["NE-24"] = [
    O(0, _A),
    GEN("— It is mine! — No, it is mine!", "还是争执型：抢东西、抢话头，谁也不问为什么", _A, "it-is-mine", "NE-24 exs[0] 三型框", {}, []),
    O(1, _B),
    GEN("— Good. — Yes, good. — Me too.", "附和型：你说好我说好——热闹是热闹，想法没动过", _B, "yes-good", "NE-24 exs[1] 三型框", {"obj": "good"}, ["good"]),
    O(2, _C),
    GEN("I think the dog is ill because it does not eat. Do you think so?", "探索型：想法、理由、邀请检验，三样都在一句里", _C, "dog-ill", "NE-24 exs[2] 探索框", {"verb": "think", "obj": "dog"}, ["think", "dog", "ill", "eat"], ("think", "base", "think")),
    GEN("Why do you think that? Tell me more.", "追问是探索型的记号：不光听，还要问出更多", _C, "tell-me-more", "NE-24 exs[2] 探索框", {"verb": "tell"}, ["tell", "think"], ("tell", "base", "tell")),
    GEN("I don't think so, because the plant is green.", "不同意也带理由：这才是探索，不是吵架", _C, "plant-green", "NE-24 exs[2] 探索框", {"verb": "think", "obj": "plant"}, ["think", "plant", "green"], ("think", "base", "think")),
    GEN("He wants to ask why. The English words are not there.", "边界：心里有问题，嘴里没词——探索先被语言卡住", _D, "words-not-there", "NE-24 exc 语言瓶颈演示框", {"verb": "want", "obj": "word"}, ["want", "ask", "word"], ("want", "3sg", "wants")),
    GEN("First the words we need, then the thinking talk.", "办法：先把问理由要用的词句给足，再放大家探索", _D, "words-we-need", "NE-24 exc 语言瓶颈演示框", {"obj": "word"}, ["word", "first", "think", "talk"]),
    GEN("We put our ideas on the table. We look at them together.", "探索型的画面：想法摆上桌，大家一起看、一起改", _C, "ideas-table", "NE-24 mech『谈话即思维』演示框", {"verb": "put", "obj": "idea"}, ["put", "idea", "table", "look", "together"], ("put", "base", "put")),
]

# ---- NE-25 先约法，后讨论（可变=规矩的条目：人人开口/说想法带理由/可以不同意/一起做决定；不变=规矩要全班谈出来、共同约定，不是老师定的贴墙上；边界=用英语守规矩需要句框支架，句框先到位规矩才不空转）
_A, _B, _C, _D = "约法要用的句框，先到位", "全班一起把规矩谈出来", "规矩用起来的样子", "边界：贴在墙上的规矩，不算数"
SPEC_EW["NE-25"] = [
    O(0, _A),
    GEN("I agree, because the dog is thirsty.", "句框装上内容：我同意，因为小狗渴了——主张带理由", _A, "i-agree", "NE-25 exs[0] 句框", {"verb": "agree", "obj": "dog"}, ["agree", "dog", "thirsty"], ("agree", "base", "agree")),
    GEN("I don't agree, because it rained yesterday.", "不同意也用同一个框：把理由说出来，不吵", _A, "dont-agree", "NE-25 exs[0] 句框", {"verb": "agree"}, ["agree", "rain", "yesterday"], ("agree", "base", "agree")),
    GEN("We make the rules together. All of us talk.", "约法的样子：规矩是全班你一言我一语谈出来的", _B, "make-rules", "NE-25 mech『先约法，后讨论』演示框", {"verb": "make", "obj": "rule"}, ["make", "rule", "together", "talk"], ("make", "base", "make")),
    GEN("The teacher asks: what rules do we need?", "老师只提问、不宣布：需要哪些规矩，孩子们自己说", _B, "teacher-asks", "NE-25 mech『先约法，后讨论』演示框", {"verb": "ask", "obj": "rule"}, ["ask", "teacher", "rule", "need"], ("ask", "3sg", "asks")),
    GEN("Say your idea. Say why.", "规矩一条：开口要带理由——为什么，三字不能省", _C, "say-why", "NE-25 mech『先约法，后讨论』演示框", {"verb": "say", "obj": "idea"}, ["say", "idea"], ("say", "base", "say")),
    GEN("We can say no, but we say it in a kind way.", "可以不同意：话要好好说——规矩管的是这个", _C, "say-no-kind", "NE-25 mech『先约法，后讨论』演示框", {"verb": "say"}, ["say", "kind", "way"], ("say", "base", "say")),
    GEN("At the end, we decide together.", "最后一起做决定：不是一个人说了算", _C, "decide-together", "NE-25 mech『先约法，后讨论』演示框", {"verb": "decide"}, ["decide", "end", "together"], ("decide", "base", "decide")),
    GEN("Rules on the wall do not talk. Rules we made do.", "边界：贴在墙上的规矩是死的——自己定的，才活在嘴里", _D, "rules-wall", "NE-25 对照框", {"verb": "talk", "obj": "rule"}, ["talk", "rule", "wall", "make"], ("talk", "base", "talk")),
    GEN("We made the rules. We keep them.", "自己约的法，自己守：这就是约法的意思", _D, "we-keep", "NE-25 对照框", {"verb": "keep", "obj": "rule"}, ["keep", "rule", "make"], ("keep", "base", "keep")),
]

# ---- NE-26 对话式教学五原则（可变=原则的面：集体/互惠/支持/累积/目的；不变=五样齐了才叫对话，缺了累积，热闹不是对话；边界=全英长链在我们这儿很难拉长，先保住短短的累积）
_A, _B, _C, _D = "集体与目的：一起对着一件事", "互惠与支持：互相听、说错不笑", "累积：在别人想法上接着搭", "边界：热闹不是对话"
SPEC_EW["NE-26"] = [
    GEN("We work on one thing together. We know what we are making.", "集体加目的：全班对着同一件事，心里知道要做成什么", _A, "work-together", "NE-26 mech『五原则检验尺』演示框", {"verb": "work", "obj": "thing"}, ["work", "thing", "together", "know", "make"], ("work", "base", "work")),
    GEN("Our talk has a job: to find why the plant is ill.", "谈话有目的地：这一回，是要弄明白植物为什么病了", _A, "talk-job", "NE-26 mech『五原则检验尺』演示框", {"verb": "find", "obj": "talk"}, ["find", "talk", "job", "plant", "ill"], ("find", "base", "find")),
    GEN("We are one class with one big question.", "一班人、一个大问题：集体就是这样", _A, "one-question", "NE-26 mech『五原则检验尺』演示框", {"obj": "class"}, ["class", "big", "question"]),
    GEN("I listen to her idea. She listens to mine.", "互惠：我听你的、你听我的，轮流来", _B, "listen-mine", "NE-26 mech『五原则检验尺』演示框", {"verb": "listen", "obj": "idea"}, ["listen", "idea"], ("listen", "base", "listen")),
    GEN("A wrong idea is safe here. We look at it together.", "支持：想法说错了没人笑——先一起看看它错在哪", _B, "safe-here", "NE-26 mech『五原则检验尺』演示框", {"verb": "look", "obj": "idea"}, ["look", "wrong", "idea", "safe", "together"], ("look", "base", "look")),
    GEN("You say one thing. I put my idea on yours.", "累积的样子：你的想法上面，搭上我的想法", _C, "put-on-yours", "NE-26 mech『累积』演示框", {"verb": "put", "obj": "idea"}, ["put", "say", "thing", "idea"], ("put", "base", "put")),
    GEN("Her words give me a new idea. The talk grows.", "谈话在长个：从她的话里，长出我的新想法", _C, "talk-grows", "NE-26 mech『累积』演示框", {"verb": "give", "obj": "word"}, ["give", "word", "new", "idea", "talk", "grow"], ("give", "base", "give")),
    GEN("We go back to his words and add one more.", "回到前面的话上再添一块：累积就是一趟趟往上垒", _C, "add-one-more", "NE-26 mech『累积』演示框", {"verb": "go", "obj": "word"}, ["go", "back", "word", "add"], ("go", "base", "go")),
    GEN("Many voices, no growing: that is noise, not talk.", "边界：声音很多、想法没长——那是热闹，不是对话", _D, "noise-not-talk", "NE-26 mech『五原则检验尺』演示框", {"obj": "voice"}, ["voice", "talk", "noise"]),
    GEN("Five checks, one question: did the talk grow?", "检验尺收尾：五条最后归成一问——谈话长个了没有", _D, "did-it-grow", "NE-26 mech『五原则检验尺』演示框", {"verb": "grow", "obj": "talk"}, ["grow", "check", "question", "talk"], ("grow", "base", "grow")),
]

# ---- NE-27 先模仿，后发明（可变=三段的动作：说熟范文/在骨架上换内容/独立写新的；不变=顺序——先有文本存量，再有个人创作；边界=模仿是带地图、带动作、带理解的内化，不是机械背诵）
_A, _B, _C, _D = "模仿段：把范文说熟", "创新段：骨架上换内容", "发明段：自己作曲", "边界：模仿不是死背"
SPEC_EW["NE-27"] = [
    O(0, _A),
    GEN("We say the story again and again. We know it by heart.", "模仿段的样子：说到不用想，故事住进心里", _A, "by-heart", "NE-27 exs[0] 模仿框", {"verb": "say", "obj": "story"}, ["say", "story", "again", "know", "heart"], ("say", "base", "say")),
    GEN("The teacher says it first. We say it after her.", "老师先说、我们跟说：一句一句把范文吃进去", _A, "teacher-first", "NE-27 exs[0] 模仿框", {"verb": "say"}, ["say", "teacher", "first"], ("say", "3sg", "says")),
    O(1, _B),
    GEN("One day, a small duck saw a frog in the river.", "创新段：猫换鸭、鱼换蛙——骨架不动，内容受控地换", _B, "duck-frog", "NE-27 exs[1] 创新框", {"verb": "see", "obj": "duck"}, ["see", "duck", "frog", "river"], ("see", "past", "saw")),
    GEN("One night, a small bird saw a star in the sky.", "再换一轮：白天换夜里，河边换天空", _B, "bird-star", "NE-27 exs[1] 创新框", {"verb": "see", "obj": "bird"}, ["see", "bird", "star", "sky", "night"], ("see", "past", "saw")),
    O(2, _C),
    GEN("One day, a baby bear found a red ball under a tree.", "发明段：新主角、新东西、新地方——曲子是自己的了", _C, "baby-bear", "NE-27 exs[2] 发明框", {"verb": "find", "obj": "bear"}, ["find", "baby", "bear", "red", "ball", "tree"], ("find", "past", "found")),
    GEN("We don't just say it. We say it with our hands and feet moving.", "边界：模仿要带着动作演——手脚都动起来，不是干背", _D, "hands-feet", "NE-27 exc 内化说法演示框", {"verb": "say"}, ["say", "hand", "feet"], ("say", "base", "say")),
    GEN("No stories in your head, no story from your pen.", "没存量就发明的下场：脑子里没歌，笔下没曲", _D, "no-stories", "NE-27 对照框", {"obj": "story"}, ["story", "head", "pen"]),
    GEN("First we sing their song. Then we write our own.", "三段口令：先把别人的歌唱熟，再写自己的歌", _D, "sing-then-write", "NE-27 mech『三段顺序』演示框", {"verb": "sing", "obj": "song"}, ["sing", "song", "first", "write", "own"], ("sing", "base", "sing")),
]

# ---- NE-28 故事地图（可变=地图上的站与配的动作：时序词各有全身动作；不变=地图就是结构——指着图、做着动作，嘴巴说得出整篇；边界=老师印好发下来的地图只剩装饰，地图要全班参与着做）
_A, _B, _C, _D = "连接词配全身动作", "指着地图，把故事说出来", "三路一起记：眼、手、嘴", "边界：印好的地图，只是装饰"
SPEC_EW["NE-28"] = [
    O(0, _A),
    GEN("First — hands up. Finally — hands down.", "动作锚点标本：first 举手、finally 放下——词和动作绑在一起", _A, "hands-up-down", "NE-28 exs[0] 动作框", {"obj": "hand"}, ["hand", "first", "up", "down"]),
    GEN("Suddenly — jump! The class jumps.", "suddenly 配一个跳：词一出来，身体先动，嘴就跟上了", _A, "suddenly-jump", "NE-28 exs[0] 动作框", {"verb": "jump", "obj": "class"}, ["jump", "suddenly", "class"], ("jump", "3sg", "jumps")),
    GEN("I point to the map. The words come.", "指着地图说：手指走到哪儿，词就跟到哪儿", _B, "point-map", "NE-28 mech『地图即结构』演示框", {"verb": "point", "obj": "map"}, ["point", "map", "word", "come"], ("point", "base", "point")),
    GEN("The map shows the road of the story.", "地图上画的是故事的路：先到哪儿、再到哪儿，一目了然", _B, "map-road", "NE-28 mech『地图即结构』演示框", {"verb": "show", "obj": "map"}, ["show", "map", "road", "story"], ("show", "3sg", "shows")),
    GEN("My hand walks the map, step by step.", "手在地图上走路：一站一站走完，故事就说完了", _B, "hand-walks", "NE-28 mech『地图即结构』演示框", {"verb": "walk", "obj": "map"}, ["walk", "hand", "map", "step"], ("walk", "3sg", "walks")),
    GEN("Eyes on the map, hands in the air, mouth telling the story.", "三路一起记：眼睛看图、手做动作、嘴说故事", _C, "eyes-hands-mouth", "NE-28 mech『三路编码』演示框", {"verb": "tell", "obj": "story"}, ["tell", "eye", "map", "hand", "air", "mouth", "story"], ("tell", "ing", "telling")),
    GEN("I forget a word. I look at the map. The word comes back.", "忘词了看一眼地图：走到哪一站，下一个词自己回来", _C, "word-comes-back", "NE-28 mech『三路编码』演示框", {"verb": "look", "obj": "word"}, ["look", "word", "map", "come", "back"], ("look", "base", "look")),
    GEN("A map from the teacher's book is just a picture. We must make our own.", "边界：印好发下来的地图只是张画——自己参与画的，才是结构", _D, "just-a-picture", "NE-28 exc 装饰说法演示框", {"verb": "make", "obj": "map"}, ["make", "map", "teacher", "book", "picture", "own"], ("make", "base", "make")),
    GEN("Draw the map with the class. Then it is yours.", "和全班一起画：画的过程，就是把故事装进脑子的过程", _D, "draw-map", "NE-28 exc 装饰说法演示框", {"verb": "draw", "obj": "map"}, ["draw", "map", "class"], ("draw", "base", "draw")),
    GEN("Say it with the map. Say it with your body. Say it by heart.", "收尾三连：指着说、演着说、最后合上图说", _C, "say-by-heart", "NE-28 对照框", {"verb": "say"}, ["say", "map", "body", "heart"], ("say", "base", "say")),
]

# ---- NE-29 支架是设计出来的（可变=支架的种类：句框/范文/先练关键词；不变=支架提前设计好、用完能撤掉，才算支架；边界=随口帮一句不是支架，直接给答案更不是）
_A, _B, _C, _D = "设计好的句框：先扶着说", "先一起说、先练关键词", "撤掉才算数", "边界：随口帮一句，不是支架"
SPEC_EW["NE-29"] = [
    O(0, _A), O(1, _A),
    GEN("I think reading is fun because I can go to many places.", "句框换内容：读书也好玩——架子一样，话是自己的", _A, "reading-fun", "NE-29 exs[0] 句框", {"verb": "read"}, ["read", "think", "fun", "go", "place"], ("read", "ing", "reading")),
    GEN("First we say it together. Then I say it alone.", "语言支架的用法：先合说，再独说——台阶一步步撤", _B, "say-together", "NE-29 mech『设计性支架』演示框", {"verb": "say"}, ["say", "first", "together", "alone"], ("say", "base", "say")),
    GEN("We learn the hard words first. Then the story is easy.", "先练关键词：难词提前扫清，整篇就顺了", _B, "hard-words-first", "NE-29 mech『设计性支架』演示框", {"verb": "learn", "obj": "word"}, ["learn", "hard", "word", "first", "story", "easy"], ("learn", "base", "learn")),
    GEN("The teacher gives us the first words. We make the rest of the sentence.", "老师给开头几个词：剩下的我们自己接——帮在点子上", _B, "first-words", "NE-29 mech『设计性支架』演示框", {"verb": "give", "obj": "word"}, ["give", "teacher", "word", "make", "sentence"], ("give", "3sg", "gives")),
    GEN("Now I say it with no help: Dogs are fun because they run with me.", "撤掉句框还能说：这才证明支架起了作用", _C, "no-help", "NE-29 exs[1] 对照框", {"verb": "say"}, ["say", "help", "dog", "fun", "run"], ("say", "base", "say")),
    GEN("The teacher takes one word away. We can still say it.", "一点一点撤：拿走一个词，我们还能说——撤得对", _C, "takes-away", "NE-29 mech『撤掉才算数』演示框", {"verb": "take", "obj": "word"}, ["take", "teacher", "word", "say"], ("take", "3sg", "takes")),
    GEN("'Just tell him the answer' is not help. It is the end of thinking.", "边界：直接给答案不叫帮——那是把思考掐断", _D, "not-help", "NE-29 mech『设计性支架』演示框", {"verb": "tell", "obj": "answer"}, ["tell", "answer", "help", "end", "think"], ("tell", "base", "tell")),
    GEN("Good help is ready before the class starts.", "设计性在这：好的支架是课前备好的，不是课上随口凑的", _D, "ready-before", "NE-29 mech『设计性支架』演示框", {"verb": "start", "obj": "help"}, ["start", "good", "help", "ready", "class"], ("start", "3sg", "starts")),
    GEN("Help me stand. Don't walk for me.", "支架的界线：扶我站起来可以，替我走路不行", _D, "stand-not-walk", "NE-29 对照框", {"verb": "help"}, ["help", "stand", "walk"], ("help", "base", "help")),
]


# ================================================================ 处理（沿用第二波 build_v 口径）
def build_ew(master):
    byid = {x["id"]: x for x in master}
    result = {}
    report = []
    for lid, entries in SPEC_EW.items():
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
                if fg.NOTE_SCAN.search(item.get("note", "")):
                    rw = NOTE_REWRITES.get((lid, e["idx"]))
                    if rw is None:
                        fail(f"{lid}: 原例注命中扫描表且无清洗登记：{item['note']}")
                    item["note"] = rw
                    mix["rewritten"] = mix.get("rewritten", 0) + 1
            elif e["kind"] == "own":
                s = e["s"]
                if norm(s) not in own_blob:
                    fail(f"{lid}: own 句未在该律自有材料中命中：{s}（出处 {e['ref']}）")
                fg.check_sentence(lid, s)
                fg.check_verb(lid, s, e.get("verb"))
                fg.check_note(lid, e["note"])
                item = {"s": s, "note": e["note"], "words": fg.chips_of(lid, e["chips"]),
                        "grp": grp, "src": {"k": "own", "ref": e["ref"]}}
            else:
                s = e["s"]
                fg.check_sentence(lid, s)
                fg.check_verb(lid, s, e.get("verb"))
                fg.check_note(lid, e["note"])
                item = {"s": s, "note": e["note"], "words": fg.chips_of(lid, e["chips"]),
                        "grp": grp, "src": {"k": "gen", "f": e["frame"], "from": e["from"],
                                            "slots": fg.slots_of(lid, e)}}
            key = norm(item["s"])
            if key in seen:
                fail(f"{lid}: 例句重复：{item['s']}")
            if key in wrongs:
                fail(f"{lid}: 例句与病例 wrong 句撞面：{item['s']}")
            seen.add(key)
            mix[e["kind"]] += 1
            new_exs.append(item)
        eff = fg.effective_count([x["s"] for x in new_exs])
        if eff < 10:
            fail(f"{lid}: 同构合并后有效例数 {eff} < 10（表面 {len(new_exs)}）")
        if len(grps) < 3:
            fail(f"{lid}: 分组仅 {len(grps)} 组")
        if not any("边界" in g for g in grps):
            fail(f"{lid}: 无边界组")
        # 组块连续化（LAW 渲染器顺序出组头）：按组首次出现序稳定排序，组内保持登记序
        new_exs.sort(key=lambda x: grps.index(x["grp"]))
        seen_g, last_g = set(), None
        for x in new_exs:
            if x["grp"] != last_g:
                if x["grp"] in seen_g:
                    fail(f"{lid}: 分组不连续")
                seen_g.add(x["grp"])
                last_g = x["grp"]
        # 借鉴面保护：王牌/天坑卡取 exs[0]——有原例的律首例必须仍是原首例
        if cur and new_exs[0]["s"] != cur[0]["s"]:
            fail(f"{lid}: 首例变更 {cur[0]['s']!r} -> {new_exs[0]['s']!r}（借鉴面 exs[0] 保护）")
        result[lid] = new_exs
        report.append((lid, len(cur), len(new_exs), eff, mix, len(grps)))
    return result, report


def main():
    apply = "--apply" in sys.argv
    master = json.loads(MASTER.read_text(encoding="utf-8"))
    result, report = build_ew(master)

    print("== EW（lawdata 通路）law  前 -> 表面/有效  orig own gen  组数")
    tot = [0, 0, 0]
    for lid, b, a, eff, mix, ng in report:
        for i, k in enumerate(("orig", "own", "gen")):
            tot[i] += mix[k]
        print(f"{lid}  {b:3d} -> {a:3d}/{eff:<3d}   {mix['orig']:4d} {mix['own']:3d} {mix['gen']:3d}   {ng}")
    print("EW 合计 orig/own/gen =", tot, " 总例数 =", sum(r[2] for r in report))

    text = MAIN.read_text(encoding="utf-8")
    text, log0 = fg.build_lawdata_mirror(text, result)
    print("LAWDATA 镜像构造成功：", len(log0), "律")
    if not apply:
        print("（--dry：未写回；加 --apply 写回）")
        return

    byid = {x["id"]: x for x in master}
    for lid, exs in result.items():
        byid[lid]["lawdata"]["exs"] = exs
    MASTER.write_text(json.dumps(master, ensure_ascii=False, indent=1), encoding="utf-8")
    print("已写回", MASTER)
    MAIN.write_text(text, encoding="utf-8")
    print("已同步主文件 LAWDATA 镜像：", len(log0), "律")
    print("下一步：python3 tools/gen_laws.py --write && python3 tools/check_all.py")


if __name__ == "__main__":
    main()
