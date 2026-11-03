#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
fill_v_examples.py — 学习改善·阶段 2 第二波：V 家族（词汇规律 V-01…V-45）例句全量。

执行口径：laws-prototype/docs/variation-spec.md（每律先定变式表；例句 ≥10 有效例
（同构合并后计数）；分组呈现且组名说破在变什么；每律 ≥1 边界组；来源三通道逐句
登记 src；note 只许孩子白话）。引擎与校验全部沿用首波 tools/fill_grta_examples.py。

范围与落位：
  LAW 通路 33 律（V-01…V-14、V-16…V-19、V-22…V-25、V-27…V-29、V-31、V-39…V-45）：
    事实源 = model/laws_master.json 的 lawdata 分仓 exs；写回后由本脚本同值写入
    主文件 LAWDATA 镜像（gen_laws 的 JD 序列化 + 稳态自检，与首波 build_lawdata_mirror
    同一实现），再跑 tools/gen_laws.py --write 对账。
  指针律 12 条（V-15、V-20、V-21、V-26、V-30、V-32…V-38）：LAWDATA 为指向词根区
    （morph）的指针条目，页面渲染不走 LAW 通路——本波只登记不强改（见波次报告）。

V 族特点（与 GR/TA 的差异）：
  - 原例多为词级片段（如「Unhappy.」），逐字保留计入例数；新组句一律是完整句，
    围绕该律自带成员词（原例 words / mech 登记词表）展开，槽位词只许词库真词与
    动词五形式表词形，不许生造词。
  - own 通道材料以病例 right 句为主（V-40 两条）；逐字命中该律总表条目全文才准用。

校验（任一失败即停，不写回，沿用首波同名函数）：
  - orig 与现行数据逐字一致（比 s/note/words）；原例注命中 NOTE_SCAN 且无清洗登记即停；
  - own 逐字命中自有材料；gen 逐 token 过词表 + 动词形态一致 + chips 锚词逐字取词库；
  - 每律句面不重复、不与病例 wrong 撞面；同构合并后有效例数 ≥10；分组 ≥3 且组块连续；
  - 每律至少 1 个组名含「边界」的组；每例必有 note 与 grp；note 行话扫描命中即停。

用法：
  python3 tools/fill_v_examples.py --dry     # 只校验并打印产出
  python3 tools/fill_v_examples.py --apply   # 校验全过后写回（之后跑 gen_laws --write + check_all）
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

# 原例注命中 NOTE_SCAN 时的清洗登记（首波同口径：英文句逐字不动，仅注改写）。
# 本波预扫：V 族 66 条原例注 NOTE_SCAN（登记|纲领|coreView|源：|裁定|口径）命中 0，
# 故此表为空；build 时若有命中且无登记将直接拦截。
NOTE_REWRITES = {}

SPEC_V = {}

# ---- V-01 词的三面（可变=演示哪一面：形/义/用；不变=三面都建才算真会；边界=只建一面就在那面出错）
_A, _B, _C, _D, _E = "先看全貌：一个词有好几面", "形这一面：读得出、拼得出、写得出", "义这一面：知道它在说什么", "用这一面：和谁搭、怎么用", "边界：只建一面，就在那一面出错"
SPEC_V["V-01"] = [
    O(0, _A),
    GEN("She can spell the word.", "形这一面：能把这个词拼出来", _B, "spell", "V-01 mech『三面格子』演示框", {"verb": "spell", "obj": "word"}, ["spell", "word"], ("spell", "base", "spell")),
    GEN("He writes the word on the book.", "形这一面：能把词写下来——写的是词的样子", _B, "write", "V-01 mech『三面格子』演示框", {"verb": "write", "obj": "word"}, ["write", "word"], ("write", "3sg", "writes")),
    GEN("This book is about a dog.", "义这一面：这本书讲的是一只狗——说的是内容", _C, "about", "V-01 exs[0] 句框", {"obj": "dog"}, ["book", "dog"]),
    GEN("The book is about my dog.", "还是义这一面：换成我的狗，讲的还是内容", _C, "about-my", "V-01 exs[0] 句框", {"obj": "dog"}, ["book", "dog"]),
    O(1, _D),
    GEN("Do your homework.", "用这一面：homework 的伙伴是 do，不是 make", _D, "do-partner", "V-01 exs[1] 对照框", {"verb": "do", "obj": "homework"}, ["do", "homework"], ("do", "base", "do")),
    GEN("Take a photo.", "用这一面：photo 的伙伴是 take——搭配要整对记", _D, "take-partner", "V-01 exs[1] 对照框", {"verb": "take", "obj": "photo"}, ["take", "photo"], ("take", "base", "take")),
    GEN("He can read the word, but he can't use it.", "只建了形和义，用这一面是空的——开口就卡住", _E, "one-face", "V-01 mech『缺面即错面』演示框", {"verb": "read", "obj": "word"}, ["read", "word"], ("read", "base", "read")),
    GEN("She knows the word, but she can't spell it.", "意思知道、拼写没建好：形这一面缺了，写的时候就出错", _E, "one-face2", "V-01 mech『缺面即错面』演示框", {"verb": "know", "obj": "word"}, ["know", "word"], ("know", "3sg", "knows")),
]

# ---- V-02 词频幂律（可变=露脸次数高低/按家数；不变=先学高频回报最大；边界=老词表漏新高频词）
_A, _B, _C, _D = "劳模词：一遍又一遍露脸", "一家人：学一个，顺带认一串", "只露一次脸的词：先放一放", "边界：老词表会漏掉新劳模"
SPEC_V["V-02"] = [
    O(0, _A),
    GEN("I read a book every day.", "book 天天露脸：先认它，回报最大", _A, "everyday", "V-02 exs[0] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "base", "read")),
    GEN("We see the dog at school.", "dog 也是劳模：在学校、绘本里到处见", _A, "see-dog", "V-02 exs[0] 句框", {"verb": "see", "obj": "dog"}, ["see", "dog"]),
    GEN("Happy and unhappy are in one family.", "数词按『家』数：happy 一家，学会一个顺带认一个", _B, "family", "V-02 mech『词族口径』演示框", {}, ["happy", "unhappy", "family"]),
    GEN("She reads books and stories.", "books、stories 都是常露脸的词：先学它们，书就好读", _B, "books-stories", "V-02 exs[0] 句框", {"verb": "read"}, ["read", "book", "story"], ("read", "3sg", "reads")),
    GEN("This word is new. I see it one time.", "只露一次脸的生词：先放一放，别先背它", _C, "one-time", "V-02 mech『幂律分布』演示框", {"obj": "word"}, ["word", "new"]),
    GEN("A new word is in the book.", "书里只出现一次的词，回报最小，排最后学", _C, "new-in-book", "V-02 exs[0] 对照框", {"obj": "word"}, ["word", "book"]),
    O(1, _D),
    GEN("I use a computer every day.", "computer 现在天天露脸：新劳模要补进词表", _D, "computer-now", "V-02 exs[1] 对照框", {"verb": "use", "obj": "computer"}, ["use", "computer"]),
    GEN("Phones are in many homes.", "phone 也是后来才常露脸的词：词表要跟着时代更新", _D, "phone-now", "V-02 exs[1] 对照框", {"noun": "phone"}, ["phone", "home"]),
]

# ---- V-03 生词密度（可变=一页里生词的多少；不变=熟词锚点够才能猜；边界=话题熟可补一点）
_A, _B, _C, _D = "全是熟词：读得顺", "只留一两个生词：靠熟词猜", "生词太多：拼图缺了太多块", "边界：话题熟，能补回一点"
SPEC_V["V-03"] = [
    O(0, _A),
    GEN("We play in the park.", "全是认识的词：读起来不用停", _A, "all-known", "V-03 exs[0] 句框", {"verb": "play", "place": "park"}, ["play", "park"]),
    GEN("I read a book with my mother.", "每个词都认识：这样的页读得最顺", _A, "all-known2", "V-03 exs[0] 句框", {"verb": "read", "obj": "book"}, ["read", "book", "mother"], ("read", "base", "read")),
    O(1, _B),
    GEN("I see one new word in the book.", "一页只有一个生词：旁边的熟词全是帮手", _B, "one-new", "V-03 exs[1] 句框", {"obj": "word"}, ["word", "book"]),
    GEN("The new word is on this page.", "生词就一个：先猜，再查，都来得及", _B, "one-new2", "V-03 exs[1] 句框", {"obj": "word", "place": "page"}, ["word", "page"]),
    GEN("Too many new words are on the page.", "生词占了半页：帮手都不在，猜也猜不动", _C, "too-many", "V-03 mech『锚点』演示框", {"obj": "word", "place": "page"}, ["word", "page"]),
    GEN("I can't read this page.", "生词太多时读不下去：不是你笨，是这页太难", _C, "cant-read", "V-03 mech『锚点』演示框", {"verb": "read", "obj": "page"}, ["read", "page"], ("read", "base", "read")),
    GEN("This book is too hard for me.", "整本都是生词：硬猜没用，先换一本生词少的", _C, "too-hard", "V-03 mech『锚点』演示框", {"obj": "book"}, ["book", "hard"]),
    GEN("I love dogs. This dog book is easy for me.", "我本来就懂狗：有一两个生词，熟话题也能补回来", _D, "topic-help", "V-03 exc 补偿说法演示框", {"verb": "love", "obj": "dog"}, ["love", "dog", "book", "easy"], ("love", "base", "love")),
]

# ---- V-04 四种学习条件（可变=哪一股当班；不变=四股均衡才完整；边界=只背单词表只占一股）
_A, _B, _C, _D, _E = "输入股：听和读，遇见词", "输出股：说和写，用出来", "研究股：把词看仔细", "流利股：反复用，用到熟", "边界：只背单词表，只占一股"
SPEC_V["V-04"] = [
    O(0, _A),
    GEN("I read a book every day.", "输入股：天天读，词就天天来打招呼", _A, "read-daily", "V-04 exs[0] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "base", "read")),
    O(1, _B),
    GEN("She writes a sentence in class.", "输出股：把词写进句子里用出来", _B, "write-sentence", "V-04 exs[1] 句框", {"verb": "write", "obj": "sentence"}, ["write", "sentence", "class"], ("write", "3sg", "writes")),
    GEN("I say the new words with my friends.", "输出股：新词要开口说出来，用给别人听", _B, "say-words", "V-04 exs[1] 句框", {"verb": "say", "obj": "word"}, ["say", "word", "friend"], ("say", "base", "say")),
    GEN("I look at the new word.", "研究股：把生词看仔细——它长什么样、和谁搭", _C, "look-at", "V-04 mech『四股分工』演示框", {"verb": "look", "obj": "word"}, ["look", "word"]),
    GEN("We spell the word and say it.", "研究股：拼一拼、说一说，把词看透", _C, "spell-say", "V-04 mech『四股分工』演示框", {"verb": "spell", "obj": "word"}, ["spell", "word"], ("spell", "base", "spell")),
    GEN("I use the word again and again.", "流利股：一个词用很多遍，用到不用想", _D, "again-again", "V-04 mech『四股分工』演示框", {"verb": "use", "obj": "word"}, ["use", "word"]),
    GEN("He says the word fast now.", "流利股：说得快、说得顺，就是练熟了", _D, "fast-now", "V-04 mech『四股分工』演示框", {"verb": "say", "obj": "word"}, ["say", "word"], ("say", "3sg", "says")),
    GEN("He reads the word list. He doesn't speak.", "只背表、只读词：占了一股，其余三股全空着", _E, "list-only", "V-04 对照框", {"verb": "read", "obj": "list"}, ["read", "list"], ("read", "3sg", "reads")),
]

# ---- V-05 整块取用（可变=块的种类：搭配块/句框块；不变=整存整取；边界=整块也能换零件）
_A, _B, _C = "搭配块：整块记住，整块用", "句框块：整句话的架子", "边界：整块不是死的，零件能换"
SPEC_V["V-05"] = [
    O(0, _A), O(1, _A),
    GEN("Make a cake.", "又一个整块：make a cake 整个记，不用现拼", _A, "make-cake", "V-05 exs[0] 句框", {"verb": "make", "obj": "cake"}, ["make", "cake"], ("make", "base", "make")),
    GEN("Do your homework.", "do your homework 也是整块：拿来就用", _A, "do-homework", "V-05 exs[1] 句框", {"verb": "do", "obj": "homework"}, ["do", "homework"], ("do", "base", "do")),
    GEN("This is my book.", "This is ___ 是整句架子：空里填什么都顺", _B, "this-is", "V-05 mech『整块取用』演示框", {"obj": "book"}, ["book"]),
    GEN("How are you? — I am fine.", "问候也是整块：整句问、整句答", _B, "how-are-you", "V-05 mech『整块取用』演示框", {}, ["fine"]),
    GEN("Can I have a pen, please?", "Can I have ___ 也是架子：换个零件就能用", _B, "can-i-have", "V-05 mech『整块取用』演示框", {"obj": "pen"}, ["pen"]),
    GEN("What is this? — It is a pen.", "问和答都是整块：不用现拼，整对拿出来", _B, "what-this", "V-05 mech『整块取用』演示框", {"obj": "pen"}, ["pen"]),
    GEN("Take a photo of my dog.", "整块也能加零件：of my dog 是加上去的", _C, "chunk-plus", "V-05 exs[1] 对照框", {"verb": "take", "obj": "photo"}, ["take", "photo", "dog"], ("take", "base", "take")),
    GEN("Make a big cake.", "块里的零件能换：big cake 还是那个整块", _C, "chunk-swap", "V-05 exs[0] 对照框", {"verb": "make", "obj": "cake"}, ["make", "cake", "big"], ("make", "base", "make")),
]

# ---- V-06 多规格仓库（可变=块的尺寸：整句/词块/单词；不变=先抓大件省力；边界=没拆过的块换场合就卡）
_A, _B, _C, _D = "整句大件：一口气说出", "词块中件：成串取用", "词和零件：小件也在库里", "边界：整块没拆过，换个场合就卡住"
SPEC_V["V-06"] = [
    O(1, _A),
    GEN("How are you?", "整句大件：不用拼，张口就来", _A, "how-are-you", "V-06 exs[1] 句框", {}, []),
    GEN("This is a cat.", "整句架子换零件：This is a ___ 里换成 cat", _A, "this-is-cat", "V-06 exs[1] 句框", {"obj": "cat"}, ["cat"]),
    O(0, _B),
    GEN("In the morning, I read a book.", "in the morning 是成串的中件，后面再接自己的话", _B, "in-the-morning", "V-06 exs[0] 句框", {"verb": "read", "obj": "book"}, ["read", "book", "morning"], ("read", "base", "read")),
    GEN("Make a decision.", "make a decision 是中件：一串一起拿出来", _B, "make-decision", "V-06 exs[0] 句框", {"verb": "make", "obj": "decision"}, ["make", "decision"], ("make", "base", "make")),
    GEN("At school, I say 'good morning'.", "good morning 也是中件：成串取用，不用现拼", _B, "good-morning", "V-06 exs[0] 句框", {"verb": "say"}, ["say", "good", "morning", "school"], ("say", "base", "say")),
    GEN("I see a butterfly.", "小件也有：单个词 butterfly，从库里单个拿", _C, "one-word", "V-06 mech『双通道』演示框", {"verb": "see", "obj": "butterfly"}, ["see", "butterfly"]),
    GEN("Say the word 'dog'.", "说单个词：仓库里最小的件就是一个词", _C, "say-word", "V-06 mech『双通道』演示框", {"verb": "say", "obj": "dog"}, ["say", "dog", "word"], ("say", "base", "say")),
    GEN("She can say 'take a photo', but she can't say 'take a bus'.", "整块没拆开过：换个场合（bus）就接不上——块要拆开看过才灵活", _D, "fossil", "V-06 exc 化石化说法演示框", {"verb": "say"}, ["say", "take", "photo", "bus"], ("say", "base", "say")),
]

# ---- V-07 搭配约定（可变=哪个词的伙伴名单；不变=搭配是约定、没道理可猜；边界=名单只能记下来）
_A, _B, _C, _D = "make 的名单：decision 在上面", "take 的名单：shower、photo 在上面", "do 的名单：homework 在上面", "边界：名单没道理，只能记下来"
SPEC_V["V-07"] = [
    O(0, _A),
    GEN("We make a decision in class.", "还是 make 配 decision：人换了，伙伴不换", _A, "make-decision-class", "V-07 exs[0] 句框", {"verb": "make", "obj": "decision"}, ["make", "decision", "class"], ("make", "base", "make")),
    O(1, _B),
    GEN("Take a photo.", "take 的名单上还有 photo", _B, "take-photo", "V-07 exs[1] 句框", {"verb": "take", "obj": "photo"}, ["take", "photo"], ("take", "base", "take")),
    GEN("She takes the bus.", "坐车也找 take：名单上的一员", _B, "take-bus", "V-07 exs[1] 句框", {"verb": "take", "obj": "bus"}, ["take", "bus"], ("take", "3sg", "takes")),
    GEN("Do your homework.", "homework 的伙伴是 do：换了一张名单", _C, "do-homework", "V-07 对照框", {"verb": "do", "obj": "homework"}, ["do", "homework"], ("do", "base", "do")),
    GEN("He does his homework every day.", "第三个人称也一样：does 配 homework", _C, "does-homework", "V-07 对照框", {"verb": "do", "obj": "homework"}, ["do", "homework"], ("do", "3sg", "does")),
    GEN("I make a cake and do my homework.", "一句话两张名单：make 管 cake，do 管 homework——各找各的伙伴", _D, "two-lists", "V-07 mech『伙伴名单』演示框", {"verb": "make", "obj": "cake"}, ["make", "cake", "do", "homework"], ("make", "base", "make")),
    GEN("Take a shower and make a decision.", "洗澡找 take、做决定找 make：猜不出来，全靠平时把名单记下来", _D, "no-guess", "V-07 mech『伙伴名单』演示框", {"verb": "take", "obj": "shower"}, ["take", "shower", "make", "decision"], ("take", "base", "take")),
    GEN("Take a bus to school.", "上学坐车也找 take：名单就是这样一条一条记满的", _B, "take-bus-school", "V-07 exs[1] 句框", {"verb": "take", "obj": "bus"}, ["take", "bus", "school"], ("take", "base", "take")),
]

# ---- V-08 词源场景（可变=来历的可信等级；不变=来历必须是真的；边界=编的假来历再好记也不许用）
_A, _B, _C, _D = "有据可查的来历：tea 出海", "只能说『也许』的来历：butterfly", "故事挂上词：多一条路想起它", "边界：编的假来历，再好记也不许用"
SPEC_V["V-08"] = [
    O(0, _A),
    GEN("Tea is from China.", "tea 的来历查得到：从中国福建出海（故事见 V-27）", _A, "tea-from-china", "V-08 exs[0] 句框", {"obj": "tea"}, ["tea"]),
    GEN("She drinks tea in the morning.", "每天喝的 tea，背后有一条查得清的路", _A, "drinks-tea", "V-08 exs[0] 句框", {"verb": "drink", "obj": "tea"}, ["drink", "tea", "morning"], ("drink", "3sg", "drinks")),
    O(1, _B),
    GEN("A butterfly is in the garden.", "butterfly 的名字来历只能讲『也许』：讲的时候要带上这两个字", _B, "butterfly-garden", "V-08 exs[1] 句框", {"obj": "butterfly", "place": "garden"}, ["butterfly", "garden"]),
    GEN("I drink tea and think of the sea.", "想起 tea，就想起它坐船过海的来历：多一条路，就多记一分", _C, "tea-sea", "V-08 mech『双重编码』演示框", {"verb": "drink", "obj": "tea"}, ["drink", "tea", "think", "sea"], ("drink", "base", "drink")),
    GEN("First we guess the story, then we check it.", "先自己猜来历，再去查对不对：猜过的记得更牢", _C, "guess-then-check", "V-08 mech『双重编码』演示框", {"verb": "guess", "obj": "story"}, ["guess", "story"], ("guess", "base", "guess")),
    GEN("This word has no story. We learn it as it is.", "有的词查不到来历：老实学它本身，不许编故事", _D, "no-story", "V-08 exc 假词源禁令演示框", {"obj": "word"}, ["word", "story"]),
    GEN("We ask: is the story true?", "故事先问一句：是真的吗？查不到据的，只能算猜测", _D, "ask-true", "V-08 对照框", {}, ["story", "true"]),
    GEN("The word 'tea' has a true story.", "tea 这个词挂着一张真照片：它的来历故事是查得到的", _C, "tea-true-story", "V-08 exs[0] 句框", {"obj": "tea"}, ["tea", "story", "true"]),
]

# ---- V-09 投入量（可变=任务点亮的成分多少；不变=真需要+自己查+比较取舍记得最牢；边界=遍数也独立起作用）
_A, _B, _C, _D = "低投入：只读、只抄", "高投入：自己查、自己造句", "要比较、要取舍：脑子动真格", "边界：遍数也算数，不只拼投入"
SPEC_V["V-09"] = [
    O(0, _A),
    GEN("I read the word again.", "只读一遍又一遍：眼睛过了，脑子没动", _A, "read-again", "V-09 exs[0] 句框", {"verb": "read", "obj": "word"}, ["read", "word"], ("read", "base", "read")),
    GEN("He writes the word in his book.", "抄在书上：手在动，词没进脑子", _A, "write-word", "V-09 exs[0] 句框", {"verb": "write", "obj": "word"}, ["write", "word", "book"], ("write", "3sg", "writes")),
    O(1, _B),
    GEN("I look up the word and use it in a sentence.", "自己查、自己用：需要和评估都点亮了", _B, "look-up-use", "V-09 exs[1] 句框", {"verb": "look", "obj": "word"}, ["look", "word", "sentence"], ("look", "base", "look")),
    GEN("She makes a new sentence with 'happy'.", "用新学的词造新句子：造句时词才真的长进脑子", _B, "make-sentence", "V-09 exs[1] 句框", {"verb": "make", "obj": "sentence"}, ["make", "sentence", "happy"], ("make", "3sg", "makes")),
    GEN("Two words are in my book. I pick the right one.", "两个词比一比，选一个用：比较取舍就是评估那一步", _C, "pick-right", "V-09 mech『三成分』演示框", {"verb": "pick"}, ["pick", "right", "word", "book"], ("pick", "base", "pick")),
    GEN("I pick 'happy', not 'sad', for my sentence.", "选词时要想：哪个更合这句话——想过的才记得牢", _C, "pick-happy", "V-09 mech『三成分』演示框", {"verb": "pick"}, ["pick", "happy", "sad", "sentence"], ("pick", "base", "pick")),
    GEN("I see the word in three books.", "遍数也算数：同一个词在三本书里遇见，也会记住", _D, "three-books", "V-09 exc 演示框", {"verb": "see", "obj": "word"}, ["see", "word", "book"], ("see", "base", "see")),
    GEN("I need the word, so I look it up.", "先有『真需要』（need），才会自己去查：三成分点亮两个", _B, "need-look", "V-09 exs[1] 句框", {"verb": "need", "obj": "word"}, ["need", "word", "look"], ("need", "base", "need")),
]

# ---- V-10 假朋友（可变=假朋友的类型：形近/多义熟义/假拆；不变=眼熟先停一拍查核；边界=停一拍就是解法）
_A, _B, _C, _D = "形近词：差一点点，意思差很远", "多义词：只记得一个意思会误认", "假拆分：看着能拆，其实拆错", "边界：眼熟不可怕，抢答才可怕"
SPEC_V["V-10"] = [
    O(0, _A),
    GEN("The prize is a book.", "prize 是奖品：一本书当奖品——和 price（价格）只差一个字母", _A, "prize-book", "V-10 exs[0] 句框", {"obj": "prize"}, ["prize", "book"]),
    GEN("I win a prize at school.", "win a prize 是赢得奖品：读到 prize 先想想它是不是价格", _A, "win-prize", "V-10 exs[0] 句框", {"verb": "win", "obj": "prize"}, ["win", "prize", "school"], ("win", "base", "win")),
    O(1, _B),
    GEN("This bag is light.", "light 在这里是『轻的』：只记得『光』，这句就读错了", _B, "light-bag", "V-10 exs[1] 句框", {}, ["bag", "light"]),
    GEN("The light is on. The bag is light.", "同一个 light，两句话两个意思：多看一眼才分得清", _B, "light-two", "V-10 exs[1] 对照框", {}, ["light", "bag"]),
    GEN("Please define the word for me.", "define 看着有 de-，其实拆不开：de- 在这里不是前缀", _C, "define", "V-10 mech『自动误认』演示框", {"verb": "define", "obj": "word"}, ["define", "word"], ("define", "base", "define")),
    GEN("Read the word again. Is it 'prize' or 'price'?", "对付假朋友的办法就一句：停一拍，再看一眼", _D, "stop-look", "V-10 mech『自动误认』演示框", {"verb": "read", "obj": "word"}, ["read", "word", "prize", "price"], ("read", "base", "read")),
    GEN("He reads fast and gets it wrong.", "读得快、抢着答：错就错在没停那一拍", _D, "too-fast", "V-10 对照框", {"verb": "read"}, ["read", "fast", "wrong"], ("read", "3sg", "reads")),
    GEN("The word 'detail' can't break, too.", "detail 也一样：看着有 de-，其实是一个整词", _C, "detail", "V-10 mech『自动误认』演示框", {"obj": "detail"}, ["detail", "word"]),
]

# ---- V-11 提取固化（可变=提取的方式：看图说/合书复述/写出来；不变=调出来用才固化；边界=提取要配反馈纠错）
_A, _B, _C, _D = "看图说词：把词调出来", "合上书：凭记忆复述", "写出来：也是提取", "边界：调错了马上纠，错才不会长住"
SPEC_V["V-11"] = [
    O(0, _A),
    GEN("What is it? — It is a dog.", "换一张图再提取：调出来一次，路就深一分", _A, "what-dog", "V-11 exs[0] 句框", {"obj": "dog"}, ["dog"]),
    GEN("What is this? — This is a cat.", "指着实物说：眼睛看着图，嘴里调出词", _A, "what-cat", "V-11 exs[0] 句框", {"obj": "cat"}, ["cat"]),
    O(1, _B),
    GEN("Close the book. Say the word.", "合上书说：没有图帮你，全靠自己调", _B, "close-say", "V-11 exs[1] 句框", {"verb": "say", "obj": "word"}, ["say", "word", "book"], ("say", "base", "say")),
    GEN("I say the words from my head.", "词从脑子里调出来：这一次提取，顶看三遍", _B, "from-head", "V-11 exs[1] 句框", {"verb": "say", "obj": "word"}, ["say", "word", "head"], ("say", "base", "say")),
    GEN("Write the word from your head.", "写也是提取：手写出来，记忆再固化一次", _C, "write-head", "V-11 mech『提取固化』演示框", {"verb": "write", "obj": "word"}, ["write", "word", "head"], ("write", "base", "write")),
    GEN("She writes a sentence with the new word.", "用新词写句子：提取加运用，一次顶多次看", _C, "write-sentence", "V-11 mech『提取固化』演示框", {"verb": "write", "obj": "sentence"}, ["write", "sentence", "word"], ("write", "3sg", "writes")),
    GEN("Say it again. This time it is right.", "调错了，当场改对再说一次：纠过的才算提取成功", _D, "say-again-right", "V-11 exc 反馈说法演示框", {"verb": "say"}, ["say", "right"], ("say", "base", "say")),
    GEN("He writes the words from his head.", "他把词从脑子里写出来：提取不分你的我的，人人都要练", _C, "he-writes-head", "V-11 mech『提取固化』演示框", {"verb": "write", "obj": "word"}, ["write", "word", "head"], ("write", "3sg", "writes")),
]

# ---- V-12 猜义三堵墙（可变=猜的成败条件：覆盖/线索/验没验；不变=猜后必须验；边界=看着透明的词猜了也会错）
_A, _B, _C, _D = "线索够：熟词多，猜得动", "猜完要验：查字典、回读", "线索太少：老实查，不硬猜", "边界：看着透明的词，猜了也会错"
SPEC_V["V-12"] = [
    O(0, _A),
    GEN("I play with my dog in the park.", "全是熟词的句子：生词放在这里，线索用不完", _A, "all-known", "V-12 exs[0] 句框", {"verb": "play", "obj": "dog"}, ["play", "dog", "park"]),
    GEN("She reads a book about dogs.", "话题熟、熟词多：猜词的练习场就长这样", _A, "book-dogs", "V-12 exs[0] 句框", {"verb": "read", "obj": "book"}, ["read", "book", "dog"], ("read", "3sg", "reads")),
    O(1, _B),
    GEN("Guess the word, then look it up.", "口令第二遍：猜完去查——查这一步不能省", _B, "guess-look", "V-12 exs[1] 句框", {"verb": "guess", "obj": "word"}, ["guess", "word", "look"], ("guess", "base", "guess")),
    GEN("I guess, and then I check in the book.", "先猜后查：猜想对不对，书说了算", _B, "guess-check", "V-12 exs[1] 句框", {"verb": "guess"}, ["guess", "book"], ("guess", "base", "guess")),
    GEN("Too many new words. I can't guess.", "生词占了大半页：线索断了，硬猜只会全猜错", _C, "too-many", "V-12 mech『约束求解』演示框", {"obj": "word"}, ["word"]),
    GEN("I don't know this word. I ask my teacher.", "猜不动就问、就查：这不丢人，是对的做法", _C, "ask-teacher", "V-12 mech『约束求解』演示框", {"verb": "ask"}, ["ask", "teacher", "word"], ("ask", "base", "ask")),
    GEN("He guesses 'prize' and reads on. Now the story is wrong.", "把 prize 猜成价格还往下读：整段都跟着错——猜完不验的代价", _D, "guess-wrong", "V-12 cases 同案演示框", {"verb": "guess", "obj": "prize"}, ["guess", "prize", "story", "wrong"], ("guess", "3sg", "guesses")),
    GEN("The story is about a dog. I know all the words in it.", "整篇都是熟词：这样的故事里冒出生词，线索才够猜", _A, "story-dog", "V-12 exs[0] 句框", {"obj": "story"}, ["story", "dog", "know", "word"], ("know", "base", "know")),
]

# ---- V-13 场景框架（可变=机位：买/卖/钱/标价；不变=一幕戏换机位；边界=四个词各站各位不能乱换）
_A, _B, _C, _D = "对着买的人：buy", "对着卖的人：sell", "对着钱和标价：pay 与 cost", "边界：一幕戏里，四个词各站各位"
SPEC_V["V-13"] = [
    O(0, _A),
    GEN("I buy a pen.", "还是 buy：对着掏钱买东西的人说", _A, "buy-pen", "V-13 exs[0] 句框", {"verb": "buy", "obj": "pen"}, ["buy", "pen"], ("buy", "base", "buy")),
    GEN("They buy books for school.", "买的人变多，机位不变：还是 buy", _A, "buy-books", "V-13 exs[0] 句框", {"verb": "buy", "obj": "book"}, ["buy", "book", "school"], ("buy", "base", "buy")),
    GEN("She sells flowers in the shop.", "镜头转到卖的人：sell 说的是她", _B, "sell-flowers", "V-13 exs[0] 句框", {"verb": "sell", "obj": "flower"}, ["sell", "flower", "shop"], ("sell", "3sg", "sells")),
    GEN("The man sells books.", "卖书的人站在 sell 的机位上", _B, "sell-books", "V-13 exs[0] 句框", {"verb": "sell", "obj": "book"}, ["sell", "book", "man"], ("sell", "3sg", "sells")),
    O(1, _C),
    GEN("I pay for the book.", "钱从我手里出去：对着钱说 pay", _C, "pay-for", "V-13 exs[1] 句框", {"verb": "pay", "obj": "book"}, ["pay", "book"], ("pay", "base", "pay")),
    GEN("The book costs a lot.", "对着书的标价说 cost：这本书可不便宜", _C, "costs-lot", "V-13 exs[1] 句框", {"verb": "cost", "obj": "book"}, ["cost", "book", "lot"], ("cost", "3sg", "costs")),
    GEN("I buy the book from her. She sells it to me.", "一幕戏两个机位同屏：我 buy、她 sell，各说各的位置", _D, "two-cameras", "V-13 mech『一幕戏四个机位』演示框", {"verb": "buy", "obj": "book"}, ["buy", "sell", "book"], ("buy", "base", "buy")),
    GEN("She pays for the books.", "她来付钱：pay 的机位对着付钱的人和钱", _C, "she-pays", "V-13 exs[1] 句框", {"verb": "pay", "obj": "book"}, ["pay", "book"], ("pay", "3sg", "pays")),
]

# ---- V-14 场景成组（可变=住进哪个场景；不变=按场景角色分组、互相提供支点；边界=长得像的词不扎堆）
_A, _B, _C, _D = "同一幕戏的邻居：角色不同，互相帮", "同一个地方的邻居", "同一件事的邻居", "边界：长得像的词不扎堆"
SPEC_V["V-14"] = [
    O(0, _A),
    GEN("I buy a book in the shop.", "shop 这条街上的邻居：buy 住在这里", _A, "buy-shop", "V-14 exs[0] 句框", {"verb": "buy", "obj": "book"}, ["buy", "book", "shop"], ("buy", "base", "buy")),
    GEN("She sells books in the shop.", "同一个场景里 sell 和 buy 是邻居：想起一个，想起一串", _A, "sell-shop", "V-14 exs[0] 句框", {"verb": "sell", "obj": "book"}, ["sell", "book", "shop"], ("sell", "3sg", "sells")),
    O(1, _B),
    GEN("We play in the park.", "park 这条街上住着 play：场景词互相预热", _B, "play-park", "V-14 exs[1] 句框", {"verb": "play", "place": "park"}, ["play", "park"]),
    GEN("The dog is in the park, too.", "dog 也住在 park 这条街：一起学，互相帮着记", _B, "dog-park", "V-14 exs[1] 句框", {"obj": "dog", "place": "park"}, ["dog", "park"]),
    GEN("In the morning, I get up and read.", "早晨这件事的邻居：get up 和 read 住在一起", _C, "morning", "V-14 mech『邻居互助』演示框", {"verb": "read"}, ["read", "morning"], ("read", "base", "read")),
    GEN("I wash my face and have breakfast.", "洗脸、吃早饭是早晨的邻居：一串一起记", _C, "morning2", "V-14 mech『邻居互助』演示框", {"verb": "wash", "obj": "face"}, ["wash", "face", "breakfast"], ("wash", "base", "wash")),
    GEN("'Prize' and 'win' are friends. 'Price' is not in this group.", "和 prize 做邻居的是 win，不是长得像的 price：形近扎堆只会互相干扰", _D, "prize-friends", "V-14 exc 形近干扰演示框", {"obj": "prize"}, ["prize", "win", "price", "friend"]),
    GEN("We have breakfast in the morning.", "breakfast 和 morning 也是邻居：一件事里的词一起出现、一起记", _C, "breakfast-morning", "V-14 mech『邻居互助』演示框", {"obj": "breakfast"}, ["breakfast", "morning"]),
]

# ---- V-16 多义网络（可变=义项离树干的远近；不变=先教中心义再教分支；边界=同形异源是两棵树、推不出注明约定俗成）
_A, _B, _C, _D = "树干：最中心的意思先学", "树枝：从树干长出来的意思", "两棵树：同形异源，分别记", "边界：推不出的义项，明说约定俗成"
SPEC_V["V-16"] = [
    GEN("I open my eyes in the morning.", "eye 的树干是『眼睛』：先学这个", _A, "eye-trunk", "V-16 exs[1] 句框", {"verb": "open", "obj": "eye"}, ["open", "eye", "morning"], ("open", "base", "open")),
    GEN("The dog has two eyes.", "还是树干：狗的眼睛——中心义先站稳", _A, "dog-eyes", "V-16 exs[1] 句框", {"obj": "eye"}, ["dog", "eye"]),
    GEN("My eyes are big.", "眼睛还是树干义：树干站稳了，树枝才有地方长", _A, "eyes-big", "V-16 exs[1] 句框", {"obj": "eye"}, ["eye", "big"]),
    O(1, _B),
    GEN("The needle has a small eye.", "针眼是树枝：形状和用处都像眼睛的小孔", _B, "needle-eye", "V-16 exs[1] 句框", {"obj": "needle"}, ["needle", "eye", "small"]),
    O(0, _C),
    GEN("This box is light.", "light『轻』自成一棵树：和『光』那棵没有亲缘", _C, "light-box", "V-16 exs[0] 句框", {}, ["box", "light"]),
    GEN("Turn off the light.", "light『光』这一棵：关灯的 light", _C, "light-off", "V-16 exs[0] 句框", {"verb": "turn", "obj": "light"}, ["light"]),
    GEN("Some words have no family story. We just learn them.", "有的意思推不出亲缘：明说约定俗成，不硬编一家", _D, "no-story", "V-16 exc 演示框", {"obj": "word"}, ["word", "family", "story"]),
    GEN("Eyes and needle eyes are family.", "眼睛和针眼是一家：一个树干，长到两个地方", _B, "eyes-family", "V-16 exs[1] 句框", {"obj": "eye"}, ["eye", "needle", "family"]),
]

# ---- V-17 输出照缺口（可变=输出的形式：说/写；不变=一用就照出缺口；边界=没人纠的错会被练熟）
_A, _B, _C, _D = "开口说：缺口马上现形", "动笔写：搭配缺口现形", "听懂读懂，不等于会用", "边界：没人纠的错，会被练熟"
SPEC_V["V-17"] = [
    O(0, _A),
    GEN("Say the word, please.", "把词说出来：说不出的地方就是缺口", _A, "say-word", "V-17 exs[0] 句框", {"verb": "say", "obj": "word"}, ["say", "word"], ("say", "base", "say")),
    GEN("I say the sentence. One word is hard for me.", "说到难词就卡住：卡住的地方，正是没真学会的地方", _A, "say-stuck", "V-17 exs[0] 句框", {"verb": "say", "obj": "sentence"}, ["say", "sentence", "word", "hard"], ("say", "base", "say")),
    O(1, _B),
    GEN("Write a sentence with 'make'.", "换个词写：写不出搭配，缺口就在纸上", _B, "write-make", "V-17 exs[1] 句框", {"verb": "write", "obj": "sentence"}, ["write", "sentence", "make"], ("write", "base", "write")),
    GEN("She writes, and now she sees the hard word.", "写着写着，难词自己跳出来：这就是探照灯", _B, "write-see", "V-17 exs[1] 句框", {"verb": "write"}, ["write", "see", "word"], ("write", "3sg", "writes")),
    GEN("I can read it, but I can't say it.", "读得懂、说不出，是两回事：输出才验得出", _C, "read-not-say", "V-17 mech『缺口探照灯』演示框", {"verb": "read"}, ["read", "say"], ("read", "base", "read")),
    GEN("He reads the word, but he can't write it.", "还是这个理：听读过关，不代表写得出来", _C, "read-not-write", "V-17 mech『缺口探照灯』演示框", {"verb": "read", "obj": "word"}, ["read", "word", "write"], ("read", "3sg", "reads")),
    GEN("Say it, check it, say it again.", "说完有人纠、正过来再说：错误就不会被练熟", _D, "say-check-say", "V-17 exc 反馈说法演示框", {"verb": "say"}, ["say"], ("say", "base", "say")),
    GEN("My teacher hears me and helps me.", "有耳朵听着、纠着说：这才是带反馈的输出", _D, "teacher-hears", "V-17 exc 反馈说法演示框", {"verb": "hear"}, ["hear", "teacher", "help"], ("hear", "3sg", "hears")),
]

# ---- V-18 错误地图（可变=摔在哪个区：词形/搭配/缺词赘词；不变=坑集中在三处；边界=只借地图不借数字、先对地图再逐个查）
_A, _B, _C, _D = "搭配区：动词和名词搭错", "缺词赘词区：小词漏掉或多出来", "词形区：拼写和构词出问题", "边界：先对地图，再逐个查"
SPEC_V["V-18"] = [
    O(0, _A),
    GEN("Take a photo.", "搭配区样本：photo 的伙伴是 take，抓错伙伴就摔在这里", _A, "take-photo", "V-18 exs[0] 句框", {"verb": "take", "obj": "photo"}, ["take", "photo"], ("take", "base", "take")),
    GEN("Do your homework.", "搭配区样本：homework 找 do——动名搭配是高发带", _A, "do-homework", "V-18 exs[0] 句框", {"verb": "do", "obj": "homework"}, ["do", "homework"], ("do", "base", "do")),
    O(1, _B),
    GEN("I see a cat and an orange.", "a 和 an 是最容易漏的小词：一个东西配一个", _B, "cat-orange", "V-18 exs[1] 句框", {"verb": "see"}, ["see", "cat", "orange"], ("see", "base", "see")),
    GEN("We go home.", "这句没有 to：go home 本来就不带——多加就是赘词", _B, "go-home", "V-18 exs[1] 对照框", {"verb": "go"}, ["go", "home"]),
    GEN("She is unhappy.", "词形区样本：unhappy 是零件拼出来的，零件错位就写错", _C, "unhappy-form", "V-18 mech『错误地图』演示框", {}, ["unhappy", "happy"]),
    GEN("The word 'happiness' is a long word.", "词形区样本：长词靠零件拼——happiness 是 happy 变来的", _C, "happiness-form", "V-18 mech『错误地图』演示框", {"obj": "happiness"}, ["happiness", "word", "long"]),
    GEN("Check the word, its friend, and the small words.", "自查口令：先看词形、再看搭配、最后看小词——三区逐个过", _D, "check-three", "V-18 mech『错误地图』演示框", {"verb": "check"}, ["check", "word", "friend"], ("check", "base", "check")),
    GEN("I have a book and a pen.", "还是一：一件东西配一个 a，漏了就摔进缺词区", _B, "book-pen-a", "V-18 exs[1] 句框", {"verb": "have", "obj": "book"}, ["have", "book", "pen"], ("have", "base", "have")),
]

# ---- V-19 词汇三地层（可变=词的老家层位；不变=老家定场合；边界=三连不是调档、有的已专化）
_A, _B, _C, _D = "本村层：老家的词，随口说", "法语层：穿正装的词", "同屏对照：活物用本村词，上桌用法语词", "边界：三连不是调档，interrogate 已专化成审讯"
SPEC_V["V-19"] = [
    GEN("I ask my mother.", "ask 是本村词：天天说、随口说", _A, "ask-mother", "V-19 exs[0] 句框", {"verb": "ask"}, ["ask", "mother"], ("ask", "base", "ask")),
    GEN("The cow eats grass.", "cow 也是本村词：在田里吃草的就是它", _A, "cow-grass", "V-19 exs[1] 句框", {"obj": "cow"}, ["cow", "grass"]),
    GEN("Ask me, please.", "问问题先用 ask：本村词最自然", _A, "ask-me", "V-19 exs[0] 句框", {"verb": "ask"}, ["ask"], ("ask", "base", "ask")),
    O(0, _B),
    GEN("The question is hard.", "question 是法语层：比 ask 正经一格", _B, "question-hard", "V-19 exs[0] 句框", {"obj": "question"}, ["question", "hard"]),
    GEN("Beef is on the table.", "beef 穿正装：肉上了桌，就换法语词", _B, "beef-table", "V-19 exs[1] 句框", {"obj": "beef"}, ["beef", "table"]),
    O(1, _C),
    GEN("I see a cow in the field.", "还是那头牛：在田里就叫 cow——和条目句同屏对照", _C, "cow-field", "V-19 exs[1] 句框", {"verb": "see", "obj": "cow"}, ["see", "cow", "field"], ("see", "base", "see")),
    GEN("We ask the teacher in class.", "向老师提问用 ask，不用『审讯』那个词：它已经是审问专用的了", _D, "ask-teacher", "V-19 exc 义项分化演示框", {"verb": "ask"}, ["ask", "teacher", "class"], ("ask", "base", "ask")),
    GEN("I have a question.", "我有一个问题：question 穿着正装来上班了", _B, "have-question", "V-19 exs[0] 句框", {"verb": "have", "obj": "question"}, ["have", "question"], ("have", "base", "have")),
]

# ---- V-22 词义漂移四方向（可变=搬法：缩小/涨大/升格/跌格；不变=一小步一小步挪；边界=老意思管不住今天）
_A, _B, _C, _D, _E = "搬法一：地盘缩小（meat）", "搬法二：地盘涨大（dog）", "搬法三：坏话变好话（nice）", "搬法四：好话变坏话（silly）", "边界：今天的意思，以今天为准"
SPEC_V["V-22"] = [
    O(0, _A),
    GEN("Meat is on the table.", "今天的 meat 只指桌上这盘肉：面包苹果都不算", _A, "meat-table", "V-22 exs[0] 句框", {"obj": "meat"}, ["meat", "table"]),
    GEN("I eat meat, not bread.", "吃肉说 meat，吃面包说 bread：地盘缩小后各管各的", _A, "meat-bread", "V-22 exs[0] 句框", {"verb": "eat", "obj": "meat"}, ["eat", "meat", "bread"], ("eat", "base", "eat")),
    GEN("A dog can be big or small.", "今天的 dog 大狗小狗都算：地盘涨大了", _B, "dog-big-small", "V-22 exs[0] 句框", {"obj": "dog"}, ["dog", "big", "small"]),
    GEN("All dogs are animals.", "所有的狗都进 dog 的地盘：这就是涨大", _B, "all-dogs", "V-22 exs[0] 句框", {"noun": "dog"}, ["dog", "animal"]),
    O(1, _C),
    GEN("She is a nice teacher.", "nice 今天是夸人的：说老师好，就用它", _C, "nice-teacher", "V-22 exs[1] 句框", {}, ["nice", "teacher"]),
    GEN("It is a nice day.", "天气好也说 nice：夸人夸天都行", _C, "nice-day", "V-22 exs[1] 句框", {}, ["nice", "day"]),
    GEN("Don't be silly.", "silly 今天是『傻乎乎』：它从『有福』一路滑到了坏话", _D, "silly", "V-22 mech『四种搬家』演示框", {}, ["silly"]),
    GEN("Today, 'nice' is a good word. We say it to friends.", "以今天为准：nice 现在是好话，放心夸朋友", _E, "today-nice", "V-22 bnd 演示框", {}, ["nice", "good", "word", "friend"]),
]

# ---- V-23 同源对与三连（可变=入境路线：本土/亲族/法语两路/拉丁；不变=路线差留下语域差；边界=同根只说明像，不能互换）
_A, _B, _C, _D = "同源对：一个词走了两条路", "同根扩组：ward 与 guard", "三兄弟：越排越正式", "边界：同根，只说明为什么像，不能互换"
SPEC_V["V-23"] = [
    O(0, _A),
    GEN("My shirt is blue.", "shirt 走的是老家路：上身穿的", _A, "shirt-blue", "V-23 exs[0] 句框", {"obj": "shirt"}, ["shirt", "blue"]),
    GEN("Her skirt is red.", "skirt 走的是亲戚家路：下身穿的——一家分两路，各穿各的", _A, "skirt-red", "V-23 exs[0] 句框", {"obj": "skirt"}, ["skirt", "red"]),
    O(1, _B),
    GEN("The guard is at the door.", "guard 还在门口值班：和 ward 是同根", _B, "guard-door", "V-23 exs[1] 句框", {"obj": "guard"}, ["guard", "door"]),
    GEN("A guard stands at the gate.", "站岗的样子：guard 一家都管『守』", _B, "guard-stands", "V-23 exs[1] 句框", {"obj": "guard"}, ["guard", "gate"], ("stand", "3sg", "stands")),
    GEN("The king has a guard.", "王身边的守卫是 guard：越正式的场合，越用走远路来的词", _C, "king-guard", "V-23 mech『两条入境路』演示框", {"obj": "guard"}, ["king", "guard"]),
    GEN("He wears a shirt, not a skirt.", "同根也不能对调：shirt 是 shirt，skirt 是 skirt", _D, "not-swap", "V-23 exc 同源对说法演示框", {"verb": "wear"}, ["wear", "shirt", "skirt"], ("wear", "3sg", "wears")),
    GEN("A skirt is not a shirt.", "长得像、是一家，也不能互换着穿", _D, "skirt-not-shirt", "V-23 exc 同源对说法演示框", {}, ["skirt", "shirt"]),
    GEN("The guard is for the king.", "守着王的 guard：正式场合的词，走的是远路", _C, "guard-for-king", "V-23 mech『两条入境路』演示框", {"obj": "guard"}, ["guard", "king"]),
]

# ---- V-24 民间词源（可变=找补的类型：民间听错/学者误靠；不变=听不懂的一截被音近熟词顶上；边界=改定的词形即标准）
_A, _B, _C = "听错加找补：crayfish 的 fish 是顶上的", "学者版误靠：island 的 s 是硬加的", "边界：改定的样子就是今天的标准"
SPEC_V["V-24"] = [
    O(0, _A),
    GEN("I see a fish in the river.", "fish 本尊在河里：crayfish 里的 fish 是借它来顶上的", _A, "fish-river", "V-24 exs[0] 句框", {"verb": "see", "obj": "fish"}, ["see", "fish", "river"], ("see", "base", "see")),
    GEN("This fish is small.", "真鱼在这儿：和 crayfish 对照着看", _A, "fish-small", "V-24 exs[0] 句框", {"obj": "fish"}, ["fish", "small"]),
    GEN("A fish can swim.", "鱼会游泳：crayfish 可不会因为名字里有 fish 就变成鱼", _A, "fish-swim", "V-24 exs[0] 对照框", {"obj": "fish"}, ["fish", "swim"], ("swim", "base", "swim")),
    O(1, _B),
    GEN("The island is in the sea.", "island 的 s 不出声：它是学者硬加上去的", _B, "island-sea", "V-24 exs[1] 句框", {"obj": "island"}, ["island", "sea"]),
    GEN("We live on an island.", "住在岛上说 island：s 照写不误，它已经是标准拼法", _B, "live-island", "V-24 exs[1] 句框", {"verb": "live", "obj": "island"}, ["live", "island"], ("live", "base", "live")),
    GEN("One letter in 'island' makes no sound.", "多出来的那个字母不出声：找补和误靠，都会在词形上留下痕迹", _C, "letter-quiet", "V-24 bnd 演示框", {"obj": "letter"}, ["letter", "island", "sound"], ("make", "3sg", "makes")),
    GEN("We say the word as it is today.", "词被改成今天这样，就按今天这样用：不许拨回老样子", _C, "as-it-is", "V-24 bnd 演示框", {"verb": "say", "obj": "word"}, ["say", "word"], ("say", "base", "say")),
    GEN("Fish live in the river.", "真鱼住在河里：fish 本尊再和 crayfish 对照一次", _A, "fish-live", "V-24 exs[0] 句框", {"verb": "live", "obj": "fish"}, ["live", "fish", "river"], ("live", "base", "live")),
]

# ---- V-25 词源谬误（可变=侦探查什么：年代/实物；不变=今义归今人管；边界=辟谣的产物是存疑、不是新答案）
_A, _B, _C, _D = "今义归今人管：nice 的古义判不了今天", "侦探第一招：查年代对不对", "侦探第二招：查有没有真东西留下", "边界：查不到，就老实写『存疑』"
SPEC_V["V-25"] = [
    O(0, _A),
    GEN("She is nice to her friends.", "今天说 nice 是夸人：没人会把它听成『傻』", _A, "nice-friends", "V-25 exs[0] 句框", {}, ["nice", "friend"]),
    GEN("The teacher is nice.", "老师好，我们说 nice：意思归现在用它的人管", _A, "nice-teacher", "V-25 exs[0] 句框", {}, ["nice", "teacher"]),
    O(1, _B),
    GEN("We check the dates first.", "查故事先看年代：那个年代的人，用不用这种造词法", _B, "check-dates", "V-25 exs[1] 句框", {"verb": "check", "obj": "date"}, ["check", "date"], ("check", "base", "check")),
    GEN("This word is old. Is the story old, too?", "词老、故事新：年代对不上，故事多半是后来编的", _B, "old-word", "V-25 mech『侦探两件套』演示框", {"obj": "word"}, ["word", "story", "old"]),
    GEN("We look for the ticket in old books.", "第二招查实物：船票、报纸、老书——找到一样才算数", _C, "look-ticket", "V-25 mech『侦探两件套』演示框", {"verb": "look", "obj": "ticket"}, ["look", "ticket", "book"], ("look", "base", "look")),
    GEN("No ticket, no book, no story.", "什么实物都没有：再好听的故事，也只能先放进『存疑』筐", _C, "no-ticket", "V-25 mech『侦探两件套』演示框", {}, ["ticket", "book", "story"]),
    GEN("The answer is: we don't know.", "查不到就说不知道：辟谣的产物是存疑，不是新故事", _D, "dont-know", "V-25 bnd 演示框", {}, ["know"]),
    GEN("No old book has the ticket.", "老书里也没有那张票：实物这一招查空了，故事就站不住", _C, "no-book-ticket", "V-25 mech『侦探两件套』演示框", {"obj": "ticket"}, ["book", "ticket", "old"]),
]

# ---- V-27 汉英借词（可变=通道：搬声音/搬拼法，方向：出境/入境；不变=方向画的是贸易路线；边界=tea 是荷兰人转手的）
_A, _B, _C, _D = "搬声音·出境：茶坐船去欧洲", "搬声音·入境：sofa 坐船来中国", "搬拼法：一个词一个词对着译", "边界：tea 是荷兰人转手的，英语只是中转站"
SPEC_V["V-27"] = [
    O(0, _A),
    GEN("I drink tea.", "最短的茶句：tea 就是福建话『茶』的声音变的", _A, "drink-tea", "V-27 exs[0] 句框", {"verb": "drink", "obj": "tea"}, ["drink", "tea"], ("drink", "base", "drink")),
    GEN("Tea goes to many homes.", "茶坐着商船去了一家又一家：声音先到，词就住下了", _A, "tea-goes", "V-27 exs[0] 句框", {"obj": "tea"}, ["tea", "home"], ("go", "3sg", "goes")),
    GEN("The sofa is in my home.", "sofa 搬着声音进了中国话，变成『沙发』", _B, "sofa-home", "V-27 mech『两条通道』演示框", {"obj": "sofa"}, ["sofa", "home"]),
    GEN("I sit on the sofa.", "我坐的沙发，名字是坐船来的：这条通道搬的是声音", _B, "sit-sofa", "V-27 mech『两条通道』演示框", {"verb": "sit", "obj": "sofa"}, ["sit", "sofa"], ("sit", "base", "sit")),
    O(1, _C),
    GEN("We say 'add oil' in class.", "上课给同学喊 add oil：一个词对一个词，搬的是拼法", _C, "add-oil-class", "V-27 exs[1] 句框", {"verb": "say"}, ["say", "add", "oil", "class"], ("say", "base", "say")),
    GEN("Add oil! We can do it.", "给同伴喊加油：这个直译词已经住进英语词典了", _C, "add-oil-can", "V-27 exs[1] 句框", {}, ["add", "oil"]),
    GEN("Tea came by ship.", "茶是坐船来的：带它来的是荷兰商船，它不是英国本土词", _D, "tea-ship", "V-27 exc 演示框", {"obj": "tea"}, ["tea", "ship"], ("come", "past", "came")),
    GEN("Coffee came by ship, too.", "咖啡也是坐船旅行的词：港口城市先学会它们", _D, "coffee-ship", "V-27 exc 演示框", {"obj": "coffee"}, ["coffee", "ship"], ("come", "past", "came")),
]

# ---- V-28 拆词解题引擎（可变=词的来源：背过的/拆出来的；不变=零件越熟拆得越多；边界=拆不动的词根词单独学）
_A, _B, _C = "访谈原案：由 piglet 类推 treelet", "零件帮忙：认识的部分推全词", "边界：拆不动的，老实单独学"
SPEC_V["V-28"] = [
    O(0, _A), O(1, _A),
    GEN("A helper helps us.", "help 加 -er 是 helper：零件认识，整词当场懂", _B, "helper", "V-28 mech『解题引擎』演示框", {"verb": "help"}, ["help"], ("help", "3sg", "helps")),
    GEN("A farmer is on the farm.", "farmer 是 farm 的亲戚：站在农场上的人，不用背就懂", _B, "farmer", "V-28 mech『解题引擎』演示框", {"obj": "farm"}, ["farm"]),
    GEN("A teacher teaches in a school.", "teach 加 -er 是 teacher：拆词解题的日常版", _B, "teacher", "V-28 mech『解题引擎』演示框", {"verb": "teach"}, ["teach", "teacher", "school"], ("teach", "3sg", "teaches")),
    GEN("A singer sings a song.", "sing 加 -er：又一个当场能懂的亲戚词", _B, "singer", "V-28 mech『解题引擎』演示框", {"verb": "sing", "obj": "song"}, ["sing", "song"], ("sing", "3sg", "sings")),
    GEN("I know 'happy', so 'unhappy' is easy.", "认识 happy，unhappy 当场解出：零件越熟，词长得越快", _B, "know-happy", "V-28 mech『解题引擎』演示框", {"verb": "know"}, ["know", "happy", "unhappy", "easy"], ("know", "base", "know")),
    GEN("She can break the long word into small words.", "把长词拆成小词：这就是解题引擎在干活", _B, "break-long", "V-28 mech『解题引擎』演示框", {"verb": "break", "obj": "word"}, ["break", "word", "long", "small"], ("break", "base", "break")),
    GEN("Some words can't break. We learn them as they are.", "有的词拆不动：老实单独学，不硬拆", _C, "cant-break", "V-28 bnd 演示框", {"obj": "word"}, ["word"]),
    GEN("Workers help in the shop.", "worker 是 work 的亲戚：干活的人——拆开就懂", _B, "workers", "V-28 mech『解题引擎』演示框", {"verb": "help"}, ["work", "shop", "help"], ("help", "base", "help")),
]

# ---- V-29 词族杠杆（可变=亲戚的透明度；不变=能当场算出的不另算；边界=数字要连口径、红利在中低频）
_A, _B, _C = "透明亲戚：学会一个，白送一串", "不透明亲戚：根不认识，要另学", "边界：数词要连口径，红利在中低频"
SPEC_V["V-29"] = [
    O(0, _A),
    GEN("I am happy. She is unhappy.", "一家人两种心情：happy 学会，unhappy 当场算出", _A, "happy-unhappy", "V-29 exs[0] 句框", {}, ["happy", "unhappy"]),
    GEN("We sing a happy song.", "happy 的亲戚里还有 happiness：都从 happy 长出来", _A, "happy-song", "V-29 exs[0] 句框", {"verb": "sing", "obj": "song"}, ["sing", "song", "happy", "happiness"], ("sing", "base", "sing")),
    GEN("A singer sings songs.", "singer 是 sing 的透明亲戚：不用另背", _A, "singer", "V-29 mech『透明就不另算』演示框", {"verb": "sing"}, ["sing", "song"], ("sing", "3sg", "sings")),
    GEN("He teaches. He is a teacher.", "teacher 也是透明亲戚：teach 会了，它白送", _A, "teacher", "V-29 mech『透明就不另算』演示框", {"verb": "teach"}, ["teach", "teacher"], ("teach", "3sg", "teaches")),
    O(1, _B),
    GEN("Some family words are hard. We learn them one by one.", "根不认识的亲戚不透明：只能一个一个老实学", _B, "hard-family", "V-29 exs[1] 句框", {"obj": "word"}, ["word", "family", "hard"]),
    GEN("We count families, not just words.", "算负担要按家数：报大数字的时候，要连『怎么数的』一起说", _C, "count-families", "V-29 bnd 演示框", {"verb": "count"}, ["count", "family", "word"], ("count", "base", "count")),
    GEN("One family can have many words.", "一家有好几个词：学会词头，亲戚排队来", _C, "one-family", "V-29 bnd 演示框", {}, ["family", "word"]),
    GEN("Play and player are family, too.", "player 是 play 的亲戚：玩的人——又白送一个", _A, "player", "V-29 mech『透明就不另算』演示框", {}, ["play", "player", "family"]),
]

# ---- V-31 词根教学元分析（可变=离教学的距离：近圈/中圈/远圈；不变=效应随距离衰减；边界=工具不能代替读书、效应量不可直接比）
_A, _B, _C, _D = "近圈：认词、拼词马上变好", "中圈：猜生词变好", "远圈：整篇理解靠多读", "边界：工具再好，也不能代替读书"
SPEC_V["V-31"] = [
    O(0, _A),
    GEN("I can break 'unhappy' into two parts.", "拆词课最近的产出：长词能拆开看了", _A, "break-parts", "V-31 exs[0] 句框", {"verb": "break", "obj": "unhappy"}, ["break", "unhappy"], ("break", "base", "break")),
    GEN("She can spell the long word now.", "拼写是近圈：拆过零件，长词拼得出", _A, "spell-long", "V-31 exs[0] 句框", {"verb": "spell", "obj": "word"}, ["spell", "word", "long"], ("spell", "base", "spell")),
    GEN("I see a new word. I break it and guess it.", "中圈：碰到生词，先拆再猜——工具用上了", _B, "break-guess", "V-31 mech『距离衰减』演示框", {"verb": "see", "obj": "word"}, ["see", "word", "break", "guess"], ("see", "base", "see")),
    GEN("He guesses the new word from its parts.", "靠零件猜词：这也是拆词课的红利", _B, "guess-parts", "V-31 mech『距离衰减』演示框", {"verb": "guess", "obj": "word"}, ["guess", "word"], ("guess", "3sg", "guesses")),
    O(1, _C),
    GEN("We read books every day.", "远圈靠量：天天读书，理解才跟上", _C, "read-daily", "V-31 exs[1] 句框", {"verb": "read", "obj": "book"}, ["read", "book"], ("read", "base", "read")),
    GEN("Reading books helps me with stories.", "故事读得多，读新故事就越来越顺", _C, "reading-helps", "V-31 exs[1] 句框", {"verb": "help"}, ["read", "book", "help", "story"], ("help", "3sg", "helps")),
    GEN("The parts are not the house. We need books, too.", "零件是工具，书才是房子：工具课不能代替读书本身", _D, "parts-house", "V-31 mech『距离衰减』演示框", {}, ["part", "house", "book"]),
    GEN("I read a story about dogs.", "远圈的燃料就是一篇篇故事：读得越多，理解越稳", _C, "read-story", "V-31 exs[1] 句框", {"verb": "read", "obj": "story"}, ["read", "story", "dog"], ("read", "base", "read")),
]

# ---- V-39 词缀教学六课（可变=课序的环节：辨假/义项分课/语境猜词；不变=先概念后义项、和语境一起教；边界=红利在解新词、不在课本词）
_A, _B, _C, _D = "第一课：先分清真假前缀", "义项分课：一个意思单独一课", "学完就用：到句子里猜生词", "边界：红利在解新词，不在课本词背得快"
SPEC_V["V-39"] = [
    O(0, _A),
    GEN("'Unhappy' can break. 'Uncle' can't.", "unhappy 拆得开，uncle 拆不开：第一课先练这个眼力", _A, "can-break", "V-39 exs[0] 句框", {}, ["unhappy", "uncle", "break"]),
    GEN("Uncle is one word. Do not break it.", "uncle 是一个整词：看见 un 开头，先停一拍", _A, "one-word", "V-39 exs[0] 句框", {}, ["uncle", "word"]),
    O(1, _B),
    GEN("Incorrect means 'not correct'.", "否定 in- 单独一课：incorrect 就是 not correct", _B, "incorrect-not", "V-39 exs[1] 句框", {"verb": "mean", "obj": "incorrect"}, ["mean", "incorrect", "correct"], ("mean", "3sg", "means")),
    GEN("Input has 'in' and 'put' in it.", "向内的 in- 是另一课：input 里住着 in 和 put", _B, "input-in-put", "V-39 exs[1] 对照框", {"obj": "input"}, ["input", "put"]),
    GEN("I see 'unhappy' in the story. I can guess it.", "学过的零件马上用：故事里碰到 unhappy，当场猜出", _C, "see-unhappy", "V-39 mech『六课课序』演示框", {"verb": "see", "obj": "unhappy"}, ["see", "unhappy", "story", "guess"], ("see", "base", "see")),
    GEN("She reads the story and guesses the new words.", "词缀要和语境一起学：在故事里猜，才是真本事", _C, "reads-guesses", "V-39 mech『六课课序』演示框", {"verb": "read"}, ["read", "story", "guess", "word"], ("read", "3sg", "reads")),
    GEN("This word is not in our book. I can break it and guess.", "课本里没有的词才是红利所在：拆得开、猜得出", _D, "not-in-book", "V-39 exc 演示框", {"verb": "break", "obj": "word"}, ["break", "word", "book", "guess"], ("break", "base", "break")),
    GEN("In the story, 'incorrect' is easy now.", "分课学过的义项，回到故事里就认得出：这才是学词缀的用法", _C, "incorrect-in-story", "V-39 mech『六课课序』演示框", {"obj": "incorrect"}, ["incorrect", "story", "easy"]),
]

# ---- V-40 打包法（可变=打包的方向：汉→英专用按钮/英→汉 take 万能管；不变=先看事情在干什么再挑动词；边界=对齐对子同屏、不是处处错位）
_A, _B, _C, _D = "对齐先行：开门、关门两边一个样", "专用按钮：灯和电视用 turn on", "take 的万能管：吃药、坐车、拍照", "边界：不是处处错位，对齐的对子也不少"
SPEC_V["V-40"] = [
    O(0, _A),
    GEN("Open the window.", "开窗也是 open：对齐的对子先站稳", _A, "open-window", "V-40 exs[0] 句框", {"verb": "open", "obj": "window"}, ["open", "window"], ("open", "base", "open")),
    GEN("Close the door.", "关门用 close：汉语『关』和英语 close 在这里对齐", _A, "close-door", "V-40 exc 对齐说法演示框", {"verb": "close", "obj": "door"}, ["close", "door"], ("close", "base", "close")),
    OWN("Turn on the light.", "开灯不用 open：灯的按钮是 turn on", _B, "lawdata cases[0].right", ["light"]),
    GEN("Turn off the TV.", "关电视也找 turn：turn on 和 turn off 是一对专用按钮", _B, "turn-off-tv", "V-40 cases[0].right 句框", {"verb": "turn"}, []),
    GEN("Turn on the light, please.", "还是开灯：事情看清了（让灯亮），按钮就挑对了", _B, "turn-on-please", "V-40 cases[0].right 句框", {"verb": "turn", "obj": "light"}, ["light"]),
    O(1, _C),
    OWN("Take medicine.", "吃药不说 eat：服药这件事打包给 take", _C, "lawdata cases[1].right", ["take", "medicine"], ("take", "base", "take")),
    GEN("Take a photo.", "拍照也归 take 管：它的万能管里还有这一件", _C, "take-photo", "V-40 exs[1] 句框", {"verb": "take", "obj": "photo"}, ["take", "photo"], ("take", "base", "take")),
    GEN("Open the book and read.", "开书用 open：这件事和开门一样，两边对齐", _D, "open-book", "V-40 exc 对齐说法演示框", {"verb": "open", "obj": "book"}, ["open", "book", "read"], ("open", "base", "open")),
]

# ---- V-41 多义与同形异义（可变=两堆意思的关系：亲戚/撞脸；不变=验亲靠合句与词源两把尺；边界=测试会打架、义项数不许背）
_A, _B, _C, _D = "撞脸组：两个 bank 不是一家", "亲戚组：eye 一家", "义项是切出来的：run 的两本书", "边界：验亲也会打架，别背义项数"
SPEC_V["V-41"] = [
    O(0, _A),
    GEN("The bank is near the river.", "河边的 bank 是河岸：和钱那家不是一家", _A, "bank-river", "V-41 exs[0] 句框", {"obj": "bank"}, ["bank", "river"]),
    GEN("My money is in the bank.", "钱放的 bank 是银行：同名不同家", _A, "bank-money", "V-41 exs[0] 句框", {"obj": "bank"}, ["bank", "money"]),
    O(1, _B),
    GEN("I see with my eyes.", "eye 一家先认树干：眼睛", _B, "see-eyes", "V-41 exs[1] 句框", {"verb": "see", "obj": "eye"}, ["see", "eye"], ("see", "base", "see")),
    GEN("An eye can see.", "还是眼睛本尊：亲戚组先站稳本义", _B, "eye-see", "V-41 exs[1] 句框", {"obj": "eye"}, ["eye", "see"]),
    GEN("I run in the park.", "run 在儿童书里的样子：跑——一本书一个切法", _C, "run-park", "V-41 quiz 材料句框", {"verb": "run"}, ["run", "park"], ("run", "base", "run")),
    GEN("They run a shop.", "run 换一个场子：开店的『经营』——义项随书而变", _C, "run-shop", "V-41 quiz 材料句框", {"verb": "run", "obj": "shop"}, ["run", "shop"], ("run", "base", "run")),
    GEN("Some words are hard to tell: family or not?", "有的词两把尺打架：先放进『连续带』，不硬塞抽屉", _D, "hard-to-tell", "V-41 exc 演示框", {"verb": "tell"}, ["tell", "word", "family", "hard"], ("tell", "base", "tell")),
    GEN("One book says 'run' has many, many faces.", "一本书一个切法：run 的义项数随书而变，不许背死数", _C, "run-faces", "V-41 quiz 材料句框", {"obj": "run"}, ["run", "book", "face"]),
]

# ---- V-42 隐喻滚雪球（可变=hold 滚到的站：手抓/容纳/举行；不变=顺着滚的路猜新义；边界=滚不到的意思老实逐个记）
_A, _B, _C, _D = "起点：手抓住东西", "滚一站：装得下", "滚二站：把时间抓在一起（举行）", "边界：滚不到的意思，老实一个个记"
SPEC_V["V-42"] = [
    O(0, _A),
    GEN("Hold the book with two hands.", "手抓牢一本书：hold 的起点就是这个画面", _A, "hold-book", "V-42 exs[0] 句框", {"verb": "hold", "obj": "book"}, ["hold", "book", "hand"], ("hold", "base", "hold")),
    GEN("She holds a cup.", "她手里抓着杯子：还是起点义", _A, "holds-cup", "V-42 exs[0] 句框", {"verb": "hold", "obj": "cup"}, ["hold", "cup"], ("hold", "3sg", "holds")),
    O(1, _B),
    GEN("The box holds ten books.", "盒子『抓』得住十本书：这就是装得下", _B, "box-holds", "V-42 exs[1] 句框", {"verb": "hold", "obj": "book"}, ["hold", "book", "box"], ("hold", "3sg", "holds")),
    GEN("This bag holds two books.", "包能装两本书：从『握住』滚到『容纳』", _B, "bag-holds", "V-42 exs[1] 句框", {"verb": "hold", "obj": "bag"}, ["hold", "bag", "book"], ("hold", "3sg", "holds")),
    GEN("We hold a party in the garden.", "把大家的时间抓在一起玩：这就是『举行』", _C, "hold-party", "V-42 mech『滚雪球地图』演示框", {"verb": "hold", "obj": "party"}, ["hold", "party", "garden"], ("hold", "base", "hold")),
    GEN("We hold a meeting in class.", "开会也是 hold：抓住大家的时间开会", _C, "hold-meeting", "V-42 mech『滚雪球地图』演示框", {"verb": "hold", "obj": "meeting"}, ["hold", "meeting", "class"], ("hold", "base", "hold")),
    GEN("Some uses don't come from 'hold'. We learn them one by one.", "有的用法不是从『抓住』滚出来的：不硬猜，一个个记下来", _D, "dont-roll", "V-42 bnd 演示框", {}, ["use"]),
    GEN("My bag holds my books and my cup.", "我的包『抓』着书和杯子：容纳这一站，东西越多越看得清", _B, "bag-holds-all", "V-42 exs[1] 句框", {"verb": "hold", "obj": "bag"}, ["hold", "bag", "book", "cup"], ("hold", "3sg", "holds")),
]

# ---- V-43 语义韵（可变=搭配的天气：坏/好；不变=学词顺便看它跟谁玩；边界=天气是倾向不是禁令）
_A, _B, _C, _D = "cause 的坏天气：只跟麻烦一起出现", "provide 的好天气：跟帮助、服务一起", "换对动词：好事用 bring about", "边界：天气是倾向，不是禁令"
SPEC_V["V-43"] = [
    O(0, _A),
    GEN("Fire can cause a lot of trouble.", "火带来的多半是麻烦：cause 的宾语还是坏事", _A, "fire-cause", "V-43 exs[0] 句框", {"verb": "cause", "obj": "trouble"}, ["cause", "trouble", "fire"], ("cause", "base", "cause")),
    GEN("The rain can cause trouble, too.", "雨也能带来麻烦：cause 后面跟的还是坏事", _A, "rain-cause", "V-43 exs[0] 句框", {"verb": "cause", "obj": "trouble"}, ["cause", "trouble", "rain"], ("cause", "base", "cause")),
    O(1, _B),
    GEN("They provide books and help for schools.", "provide 后面跟书和帮助：好天气的词，跟好事玩", _B, "provide-books", "V-43 exs[1] 句框", {"verb": "provide", "obj": "book"}, ["provide", "book", "help", "school"], ("provide", "base", "provide")),
    GEN("She provides help for the class.", "她提供帮助：provide 一出场，天气就是晴的", _B, "provides-help", "V-43 exs[1] 句框", {"verb": "provide", "obj": "help"}, ["provide", "help", "class"], ("provide", "3sg", "provides")),
    GEN("The new teacher brings about a happy class.", "好事不用 cause：bring about 带来的，是进步和快乐", _C, "brings-about", "V-43 cases[0].right 句框", {"verb": "bring", "obj": "class"}, ["bring", "class", "happy"], ("bring", "3sg", "brings")),
    GEN("Good teachers bring about good changes.", "带来好变化用 bring about：动词选对，味儿才对", _C, "bring-about", "V-43 cases[0].right 句框", {"verb": "bring"}, ["bring", "teacher", "good"], ("bring", "base", "bring")),
    GEN("Cause is not a bad word. Its friends are just bad.", "cause 本身不是坏词：是它的朋友多半是坏事——这叫倾向，不是禁令", _D, "tendency", "V-43 bnd 演示框", {"verb": "cause"}, ["cause", "good", "story"], ("cause", "base", "cause")),
    GEN("The fire causes trouble in the forest.", "森林里的火带来的还是麻烦：cause 走到哪儿，坏天气跟到哪儿", _A, "fire-forest", "V-43 exs[0] 句框", {"verb": "cause", "obj": "trouble"}, ["cause", "trouble", "fire", "forest"], ("cause", "3sg", "causes")),
]

# ---- V-44 同音异形（可变=对子成员：their/there/they're 与 two/to/too；不变=靠位置和意义选字；边界=先立对子后读绘本）
_A, _B, _C, _D = "their 与 there：后跟东西 vs 指地方", "they're：they are 捏成一个", "三胞胎：two、to、too", "边界：先把对子立稳，再读绘本笑话"
SPEC_V["V-44"] = [
    O(0, _A),
    GEN("Their books are on the desk.", "their 后面跟 books：『他们的』后面永远跟东西", _A, "their-books", "V-44 exs[0] 句框", {"obj": "book"}, ["their", "book", "desk"]),
    GEN("The dog is there, not here.", "there 指地方：狗在那里，不在这里", _A, "there-not-here", "V-44 exs[0] 句框", {"obj": "dog"}, ["dog", "there", "here"]),
    GEN("They are happy.", "they are 是两个词的料：捏起来写，就是 they're", _B, "they-are", "V-44 mech『耳朵下班脑子接管』演示框", {}, ["happy"]),
    GEN("They are there with their dog.", "一句里三个词同场：they are（他们是）、there（那里）、their（他们的）——靠位置分", _B, "three-in-one", "V-44 exs[0] 对照框", {"obj": "dog"}, ["dog", "their", "there"]),
    O(1, _C),
    GEN("Two cats run to the garden.", "two 是数、to 是去向：一句里各就各位", _C, "two-to", "V-44 exs[1] 句框", {"obj": "cat"}, ["cat", "garden"]),
    GEN("I like the cat, too.", "too 是『也』：站在句尾，说『我也喜欢』", _C, "too-end", "V-44 exs[1] 句框", {"verb": "like", "obj": "cat"}, ["like", "cat"], ("like", "base", "like")),
    GEN("First learn the two words. Then read the funny book.", "先立对子再读绘本：顺序反了，笑话会把错的钉住", _D, "first-then", "V-44 exc 演示框", {"verb": "read", "obj": "book"}, ["read", "book", "funny", "word"], ("read", "base", "read")),
    GEN("We read the book and laugh.", "绘本里的笑话就是消歧练习：笑一次，记一对", _D, "read-laugh", "V-44 mech『耳朵下班脑子接管』演示框", {"verb": "read", "obj": "book"}, ["read", "book", "laugh"], ("read", "base", "read")),
]

# ---- V-45 两把尺（可变=数票的场子：儿童场/商务场；不变=中心义与频率是两把尺；边界=频率数字必带来源、切分影响票数）
_A, _B, _C, _D = "儿童场：两把尺给出同一个答案", "商务场：频率榜首换人", "中心义不换人：老大还是跑", "边界：数票先问场子，再看数字"
SPEC_V["V-45"] = [
    O(0, _A),
    GEN("I run with my dog.", "绘本里 run 还是跑：和小狗一起跑", _A, "run-dog", "V-45 exs[0] 句框", {"verb": "run", "obj": "dog"}, ["run", "dog"], ("run", "base", "run")),
    GEN("The dog runs fast in the park.", "狗跑得快：儿童场里 run 的出镜王就是跑", _A, "dog-runs", "V-45 exs[0] 句框", {"verb": "run", "obj": "dog"}, ["run", "dog", "park", "fast"], ("run", "3sg", "runs")),
    GEN("Children run at school every day.", "小学生的场子里，run 天天以『跑』出镜", _A, "children-run", "V-45 exs[0] 句框", {"verb": "run"}, ["run", "school"], ("run", "base", "run")),
    O(1, _B),
    GEN("She runs a company.", "换她来经营：商务场里 run 的榜首是『经营』", _B, "she-runs-company", "V-45 exs[1] 句框", {"verb": "run", "obj": "company"}, ["run", "company"], ("run", "3sg", "runs")),
    GEN("They run a big shop.", "开店也是 run：大人文章里，这个意思出镜最多", _B, "run-shop", "V-45 exs[1] 句框", {"verb": "run", "obj": "shop"}, ["run", "shop", "big"], ("run", "base", "run")),
    GEN("A company can't run in the park.", "公司不能在公园里跑：『经营』是从『跑』长出来的分支，老大还是跑", _C, "company-cant-run", "V-45 mech『两把尺』演示框", {"verb": "run", "obj": "company"}, ["run", "company", "park"], ("run", "base", "run")),
    GEN("'Run' is one word with many jobs.", "run 一个词干很多活：活多，不等于老大换人", _C, "many-jobs", "V-45 mech『两把尺』演示框", {}, ["run"]),
    GEN("In our books, 'run' is about legs.", "在我们的书里数票：run 说的是腿——场子决定票数", _D, "our-books", "V-45 bnd 演示框", {}, ["run", "book"]),
]


# ================================================================ 处理（沿用首波 build_gr 口径）
def build_v(master):
    byid = {x["id"]: x for x in master}
    result = {}
    report = []
    for lid, entries in SPEC_V.items():
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
        result[lid] = new_exs
        report.append((lid, len(cur), len(new_exs), eff, mix, len(grps)))
    return result, report


def main():
    apply = "--apply" in sys.argv
    master = json.loads(MASTER.read_text(encoding="utf-8"))
    result, report = build_v(master)

    print("== V（lawdata 通路）law  前 -> 表面/有效  orig own gen  组数")
    tot = [0, 0, 0]
    for lid, b, a, eff, mix, ng in report:
        for i, k in enumerate(("orig", "own", "gen")):
            tot[i] += mix[k]
        print(f"{lid}  {b:3d} -> {a:3d}/{eff:<3d}   {mix['orig']:4d} {mix['own']:3d} {mix['gen']:3d}   {ng}")
    print("V 合计 orig/own/gen =", tot, " 总例数 =", sum(r[2] for r in report))

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
