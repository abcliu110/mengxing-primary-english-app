# 萌星小学英语 · 业务缺陷审计（只读）

- 审计对象：`/workspace/work/mengxing-primary-english-app/萌星小学英语_最终合并版.html`（16,061,043 字节，HEAD `e9d02bc`，决策 33 ⑤ 之后）
- 方法：`node docs/whiteboard/src/vocab_extract.js` 取 VOCAB_DB 全量（1487 条，界面上显示 1436 条，因为有 51 条别名）；Playwright 在 390×844 视口走了 34 个 screen，打开词卡，点了总地图全部 153 个入口；在页面里取 GRAMMAR_DB / DAILY_EXPRESSIONS_DB 等全局数据；对照两份外部词表：
  - **课标**：《义务教育英语课程标准（2022 年版）》附录 3 二级词汇表（505 词）。来源是出版社 PDF https://www.esph.com.cn/docs/2025-10/705da262a6e74b088ac658bfe2d757ba.pdf （教育部原件 http://www.moe.gov.cn/srcsite/A26/s8001/202204/W020220420582349487953.pdf ）。PDF 是 OCR 文本，我手工纠了 13 处 OCR 错，最后比对了约 500 / 505 词；数词、月份、星期在课标里单独列出，没有参与比对。
  - **教材**：GitHub 社区整理的人教版 1–6 年级词表，900 条，版本没有标明，看起来像一年级起点版（https://github.com/billyjr/pep-english-vocabulary ，`public/data/pep_english_vocabulary_full.csv`）。它只当参考，不算权威。
- 仓库文件一个都没改。中间数据都在 `/workspace/work/audit/`：`vocab.json`、`globals.json`、`screens.json`、`kebiao2.json`（课标二级）、`kebiao_missing.json`、`pep_missing.json`、`fake_phon.json`（假音标清单）、`grammar_dump.md`、`json_*.json`、`shots/*.png`。

---

## 〇、最严重的 10 个问题

| # | 位置 | 问题 | 证据 | 建议 |
|---|---|---|---|---|
| 1 | VOCAB_DB.phonetic，词卡正面 | **约 566 词（38%）的「音标」其实是把拼写原样套上斜杠** | `phone /phone/`、`flag /flag/`、`win /win/`、`goat /goat/`、`carry /carry/`、`February /February/`。分年级看：G5 216/296（73%）、G4 134/206、G6 134/204、G3 61/130。词卡上显示的就是「☎️ phone /phone/」。此外 `close` 动词和形容词读音不同，数据里也没有区分 | 从 CMUdict / Wiktionary IPA 批量重生成，人工抽查；统一英式或美式；多音词分开标；在 runall 里加一条「音标≠拼写」检查 |
| 2 | VOCAB_DB 收词 | **课标二级 505 词里大约 60 个高频词没有独立词条** | 缺：a/an、the、be(am/is/are)、can、will、must、should、not、no、yes、please、OK、hi、good、bad、nice、great、name、age、money、busy、late、early、free、cute、sit、stand、call、let、hurry、wrong、welcome、sure、next、middle、top、now、again、ago、last、well、lot、dear、candle、chore、email、TV、favourite、Mr/Mrs/Ms/Miss、up/down/out（hard、front、police 只出现在 hard-working / in front of / police station 里）。人教社区词表另外还缺 merry、soon、kick、poor、different、guess、poem、habit、volunteer、amazing 等约 50 个单词 | 先补齐课标 505 词（这是底线），再补人教版单元词；功能词也要有词卡和发音 |
| 3 | V6 扩展 500 词 | **445 个例句是占位句** | `example_en` = `Let's learn and use "yogurt" in a sentence!`，`example_zh` = `核心考点词【yogurt】：酸奶。`。词卡背面把它显示成「🔗 常用搭配动词：Let's learn and use "yogurt" in a sentence!」。另外 500 个 `visual_scene` 为空，445 个构词栏写的是「课标关联：yogurt (酸奶)」这种占位 | 按决策 26/R2 给每个词写一句真实例句（课标词范围内的短句）；补好之前不要显示这一栏 |
| 4 | collocations.adjs，词卡「形容词：」 | **881 词的「形容词搭配」是用模板生成的「a X / the X / my X」** | 元音开头的 77 词出现 `a ear / a apple / a elephant`；不可数的 27 词出现 `a water / a information / a homework`（同一张卡上面还写着「不可数」）；专有名词 32 个出现 `a Monday / a English`；非名词 21 个出现 `a my / my my / a much / a put on`；`advice` 被标成「可数」；`happy` 的「形容词」栏显示的是一整句话 | 删掉这一模板。名词换成真实的形容词搭配（来源可以是 Oxford Collocations），没有就不显示；可数性单独做一个字段，人工核对 |
| 5 | 年级标注，单词大厅文案 | **「课标词」「课标同步」与实际不符；年级标注混乱** | G1–G6 共 985 词，只有约 297 个在课标二级表里；G5 只有 20/296，G6 只有 10/204（其余是 dictate、predict、geography、transform、export 这类三级词或课标外的词）。大厅写着「共收录 1436 个课标核心词」，首页写「课标同步」。happy / sad / angry 标 G6，unhappy 却标 G4；when 标 G5；hospital、supermarket 标 G6（人教词表里都是低年级）。约 30 个屈折形式单独成了词条：heavier、cleaned、studies、climbing、turns 等。和人教词表比，年级相差 2 级以上的有 87 词 | 加一个字段 `kebiao_level`（二级 / 三级 / 课标外）；按教材版本重排年级；屈折形式并到原形；改掉「课标核心词」这种虚标说法 |
| 6 | DAILY_EXPRESSIONS_DB 对话 | **对话第 3 句是按场景套的模板，很多接不上** | 319 个对话句里，「Thank you for telling me.」用了 11 次，「OK. I will.」11 次，「Thank you. It tastes good.」10 次，「…I'll have a rest.」9 次。例子：结账说 bill → 「Thank you. It tastes good.」；「妈妈给我买了小狗」→「I'll have a rest.」；找钥匙 →「OK. I will.」。12 话题里还有一句：「It's sunny and warm. Put on your jacket!」 | 逐句人工重写第 3 轮（约 55 句），HANDOFF 里已有的 DUP 报告直接拿来当修改清单 |
| 7 | GRAMMAR_DB 与例句库 | **语法讲解和例句有硬伤** | 句子积木把表语标成宾语 O：G04/08/09/11/16/17/25/27/31/32/34/37/38/39，共 14 点；G40 拆成「for helping me = A，learn English = O」，拆错了。G35 用 a clean river 译「清澈」（应为 clear）。G05 说「a 在元音前垫个 n 变 an」，历史事实正好相反（an 是原形，a 是它在辅音前的弱化形）。G28「时间词放句尾 / 绝不能插在主谓之间」，和 G21 自己的例句 Yesterday I cleaned… 冲突。G15「否定句 and 必须换 or」说得太绝对，也没标 ✂️。G22 规则①里残留了自相矛盾的补丁文字；G32 规则③也有残句。例句库里有「Which season do you like best, spring or autumn?」（只有两项却用 best，和 G39 自己的测验矛盾）、「The rain stopped and look at the big rainbow!」、「smells very delicious」 | 逐点人工审读；积木增加 C（表语）角色；按 R3 补 ✂️/⚠️ 标注；例句库人工过一遍 |
| 8 | 单词身世，旧页面 | **空章节，旧命名残留** | 单词身世 13 章里有 9 章没有幕（「即将上线」）：辟谣角、维京人与诺曼人、字母身世、词义漂移等。「📜 十五条规律速查」点进去显示的是「维度三：十五大王炸全规律实验室…在原十二大王炸基础上…王炸 01」。面包屑还是旧名「📘 单词大世界 / 🧩 语法魔法屋 / 💬 日常用语小剧场」。首页写「从单词大世界开始」。首页和原理页写「三大隐喻密码」，实际是 4 个密码。大厅宣传语「高清 2D 卡通角色三幕视频级动画」「高清 Canvas 情景互动动画」都已经过时 | 空章节先隐藏或合并（cow/beef 已经在规律 9 里讲过）；全局替换旧名、旧数字；宣传语改成如实描述 |
| 9 | 全库拼写 | **英美拼写混在一起，没有规则** | 同时收了 colour/color、grey/gray、centre/center、maths/math、mum/mom；traveller、neighbour 用英式，woolen 用美式；音标全部是美式（/oʊ/、卷舌 r），拼写却以英式为主（课标用英式拼写）；还有「Mr Wang teaches us math.」这种英式头衔配美式词；G14 教 at the weekend，口语里 on the weekend 用了 13 次（人教版用 on）；favourite 在 VOCAB 里根本没有 | 定一个主体（建议跟课标用英式拼写，同时注明美式），另一套作为 alias 显示「🇺🇸」；音标和拼写对应起来 |
| 10 | 词缀、词源、原理 | **词缀结论和自己的词库矛盾；伪原理没有标注** | AFFIX 报告说 ex- / pre- / co(m)- / -ure「词库里没有真派生词」，可词库里就有 export、predict、collection、computer、comfortable、nature、picture，port 家族还是 App 的样板幕。748 条 etymology 的标题写「秒懂**造词**小故事」，其中有 ear→hear→pear。词卡上的原理②写「M 象形连绵山峰与双唇（mountain/mouth/mother）」，没有 💡。「名前动后」被称为「铁律」，配的是「名词重心稳、动词能量冲向词尾」这种伪物理解释 | 重跑词缀匹配（拉丁 / 法语借词也要算）；把「造词」改成「巧记」；伪原理一律标 💡 / ⚠️ 并写清例外 |

---

## 一、词是否全

### 1.1 总量与构成
- 一共 1487 条：G1 66、G2 83、G3 130、G4 206、G5 296、G6 204、V6 扩展 500、POLY 2。界面显示 1436 条（51 条别名已合并）。
- 和课标二级表的重合情况：G1 53/66、G2 69/83、G3 74/130、G4 71/206、G5 20/296、G6 10/204、V6 152/500 在二级表里，其余是三级词或课标外的词（复合词、派生词在课标里本来就不单列，所以「课标外」里有一部分只是统计口径造成的，不全是错）。
- 中国主流教材（新人教 PEP）从三年级起点；课标的一级对应 3–4 年级。App 有 G1、G2 两个年级（149 词），和三年级起点的教材对不上，需要说明这里的「年级」指什么。

### 1.2 缺失的高频词
- 课标二级缺的（约 60 个，完整清单在 `kebiao_missing.json`）：a/an, the, be, can, will, must, should, not, no, yes, please, OK, hi, good, bad, nice, great, name, age, money, busy, late, early, free, cute, sit, stand, call, let, hurry, wrong, welcome, sure, next, middle, top, now, again, ago, last, well, lot, dear, candle, chore, email, TV, favourite, Mr, Mrs, Ms, Miss, up, down, out（hard / front / police 只出现在短语里）。
- 人教社区词表缺的单词（单词形式 110 个，减去和上面重复的，`pep_missing.json`）：merry, playtime, bite, kick, soon, poor, step, thing, ski, different, crossroads, grocery, bark, curly, slim, guess, fantastic, mark, into, temple, silk, spicy, president, mammal, reptile, trunk, tusk, scared, poem, poet, university, wardrobe, stadium, habit, less, volunteer, squirrel, amazing，另有国家和城市名（Canada、Australia、London…）。短语有 200 多条（by bus、go to bed、take photos…），词库里基本没有。
- 视觉高频词（Sight Words）：「真正不规则」的只有 19 个（eye, eight, four, one, two, water, shoes, what, where, whose, friend, woman, there, minute, write, some/any, talk, know, live），而 Dolch 表是 220 个。the、was、said、of、you、have 这些最典型的视觉词都没有。

### 1.3 重复、并列词条
- 代词有两套：G1_P01「I / me / my / mine」和 V6_核心_0–26 的 I、me、my… 一共 31 个词形重复（who、how、some、any 也重复）。
- 同一个词的英美两种拼写都单独成条：colour/color、grey/gray、centre/center、maths/math、mum/mom、phone/telephone、bike/bicycle、airplane/plane。
- 屈折形式单独成条（约 30 个）：feet, teeth, children, men, women, mice, climbing, drinking, sleeping, turns, studies, heavier, stronger, taller, younger, shorter, older, bigger, smaller, faster, cleaned, slept, stayed, washed, watched, bought, rode, sang, swam, drank。
- 「how old / how tall / how heavy」作为一个「词」，音标写成 3 段。

### 1.4 词性、释义、音标
- 音标：约 566 个是假的（清单在 `fake_phon.json`）。真音标全部是美式；词库里没有一个 /əʊ/，却有 77 个 /oʊ/。
- 多音、多义没有区分：close（动词 /kləʊz/、形容词 /kləʊs/）、present（名词 / 动词）、live（动词 / 形容词）、read 的过去式只放在语法里。
- 词性体系不一致：POS_CATEGORIES 只有 8 类，词库却用了 det.（27 词）、interj.、phr.；这些词在「按词性」的 UI 里没有按钮（参数能筛到）。
- 释义总体可用。抽查 70 词（随机种子 7，见上文命令），中文释义没有发现明显错误；问题集中在例句、搭配、音标。例句和释义不符的：win 的例句用的是 won；「how old…」的例句里没有词头；「The dog is climbing the mountain」（释义是「攀登」，画面不合理）；`May` 被标成 `is_function_word`，释义混了情态动词「可以」，搭配却给了「a May / my May」。

### 1.5 抽样核对（约 70 词，人工核对）
- 真音标抽了 50 词：keep、fifteen、boy、water、tall、destroy、aunt、dinner、car、pretty、know、brother、tomato、foot、cap、helmet、scientist、whose、minute、winter、pupil、cousin、grandfather、doctor、penguin、mushroom、newspaper、popular 等。都是美式标音，本身正确（例如 /ˈwɔːtər/、/ˈpɑːpjələr/）。
- 假音标抽中了 4 词：goat、flag、hat、win。
- 有问题的例句：「Subway is a fast public transport.」（缺冠词，transport 用法也不对）、「Practice the dialogue…」（美式动词拼写，和 Colour it orange 混在一起）。

---

## 二、各菜单数据量（390px 实测 + 数据计数）

| 菜单 / 页签 | 条目数 | 判断 |
|---|---|---|
| 单词表 word_list | 1436 词；25 个子主题。最小的几个：颜色与形状 14、情感与性格 18、交际与礼仪 21、运动与爱好 23、数字与数量 25（课标子主题和 V6 同名子主题已经合并筛选，但「数字与计量 45」和「数字与数量 25」、「色彩与空间方位」和「颜色与形状」仍然是两组） | 交际与礼仪只有 21 词，please / sorry / excuse me 都不在词库里 |
| ⚡ 1.5 秒闪认 | 19 词 | **太少**（Dolch 220） |
| 自然拼读 | 9 步 | 够用 |
| 最小对立体 MINIMAL_PAIRS_DB | 4 组、15 对（ɪ/iː、æ/e、æ/ʌ、θ/s） | **太少**：缺 v/w、l/n、r/l、ʃ/s、ð/z、ʊ/uː、词尾辅音 |
| 同音词 | 12 组 + 新增 13 组 | 尚可 |
| 词语关系 | 反义 24 + 24、近义 11、易混 8、分类 10、部分整体 10 | 近义、易混偏少 |
| 构词 | 合成 25、前缀 20、后缀 12、词族 10、词根 6；词缀实例 59 个词缀共 273 对 | 词根 6 个偏少 |
| 一词多义 | 17 词（POLY 正式词条只有 2 个） | 偏少（get、take、have、make、run、light、right 这些都应该有） |
| 框架语义 | 10 个剧场；视角数 4/3/3/3/2/1/3/2/2/2 | FR06 只有 1 个视角 |
| 单词身世 | 13 章，**9 章 0 幕**；有幕的：欧洲 3、格林 8、规律 18、时间 2 | 空章节太多 |
| 语法 40 点 | 每点：故事 2–4 句、规则 2–5 条、探究 1 题、测验 3 题 + 积木 1 个 | 每点只有 3 道测验题，**题量少** |
| 语法例句库 | 3809 句；最少的：G37 **5**、G17 13、G23 13、G39 13、G25 17、G28 18、G08 19、G24 19 | 同级比较、过去 be、did 疑问、最高级这几点偏少；G16 有 487 句（be 现在时），分布很不均 |
| 歌谣 / 纠偏图 / 微训练 | 8 / 5 / 2 | 40 点里只有少数有 |
| 口语 16 场景 | 144 句。最少：询问与求助 **5**、时间与日期 **5**、打电话 **5**、问候与告别 7 | 求助、时间、打电话是最常用的场景，反而最少 |
| 交际句型地图 | 5 件事 × 3 句 | 少 |
| 12 话题快问快答 | 12 问答 | 一般 |
| 综合自测 | 单词 30 题；语法 40 点；口语 30 句 | 尚可（题目都取自已有数据） |
| 闯关游戏 | 单词闪电战 25 关；感叹句快刀手 **4 关**；考场捉虫 **4 关** | **太少**（HANDOFF 也提到手写题没有接入题库） |
| 模块小测 | 33 个模块，每个 8 词 | 只考单词，不考模块讲的规律 |
| 六大第一性原理 | 6 × 4 幕 | — |
| 中英对照 | 5 章 11 幕；正迁移、Q、M 各 1 幕 | — |
| 三大隐喻密码 | 实际有 4 个密码 | 名字没跟着改 |
| 总地图 | 153 个入口，全部点过：0 报错、0 空页 | ✅ |

没有坏跳转：34 个 screen 加 153 个总地图入口，Playwright 下 0 pageerror，也没有横向溢出（scrollWidth = 390）。只有 `navigateTo('quiz_engine')` 在不带参数时会抛 `Cannot read properties of null (reading 'prompt')`，正常入口都会带参数，风险低。

---

## 三、数据错误明细

### 3.1 语法规则表述
- G05：「a 在元音前垫一个鼻音 n 变成 an」。历史上是 an（< ān「一」）在辅音前弱化成 a，方向说反了。要么改正，要么标 💡。
- G01 ⑤：用「有生命加 -es / 无生命加 -s」解释 -o 结尾的复数。这是民间口诀，例外很多（radios、kangaroos、zoos）；解析里还写了「tomato 有生命的 o」「kangaroo 只加 s」，不知所云。应标 💡 / ⚠️。
- G15：「否定句并列必须换成 or」说得太绝对，没标 ✂️。
- G28：「绝不能把时间地点插在主谓之间」「时间词放句尾！」：频度副词要放在主谓之间，时间状语放句首也很常见，App 自己的 G17、G21 例句就是这样。
- G07：「复数按 we, you and they」是国内教辅的说法，应标 ⚠️。
- G11：示范句「smells very delicious」。delicious 一般不加 very，小学阶段最好避开。
- G14：教 at the weekend（英式），和口语里的 on the weekend（13 处）、人教教材都不一致。
- G22 规则①标题是「i 变 a」，下面却列了 come→came、run→ran，后面还跟着补丁句「注意：come→came、run→ran 不是 i 变 a」，读起来自相矛盾。
- G32 规则③有补丁残句：「（问外貌性格或天气，What 问事物，How 问程度。How do you like 是对的）」。
- 句子积木：14 个点把表语标成 O；G31、G32、G34 把疑问词或感叹成分标成 O；G40 拆错（thank sb for doing 的结构被拆成 A + O）。
- STRESS「名前动后铁律」「后缀重音磁铁定律」用伪物理理由解释，而且是绝对化表述。

### 3.2 例句语法 / 语义错误（举例）
- 「Which season do you like best, spring or autumn?」「…spring or summer?」两项比较应该用 better。
- 「The rain stopped and look at the big rainbow!」（这句同时出现在例句库和口语）。
- 「Subway is a fast public transport.」
- 「It's sunny and warm. Put on your jacket!」
- 「Monday is the second day of a week.」（应为 the week）。
- 口语第 3 轮模板错配约 25 处（见〇-6）。
- 例句库归类有误：G20（进行时）里收了「We are going to the supermarket tonight.」，是用进行时表将来，没有说明，容易和 G24 的 be going to 混。

### 3.3 英美拼写
见〇-9。另外 HTML 全文里 Mum 出现 44 次、Mom 48 次，maths 11 次、math 15 次，neighbour 36 次、neighbor 9 次。

### 3.4 词源、格林定律、词缀
- AFFIX：ex-、pre-、co-/com-、-ure 被判「词库无真派生词」，但词库有 export、import（im-）、predict、collection、competition、computer、comfortable、nature、picture。-ish 有 English 可用。
- MORPH：grandma = grand- + ma、alive = a- + life 可以保留，但要标历史说明。
- 词卡上的 etymology：748 条叫「造词小故事」，包括 ear→hear、p+ear=pear、g+love=glove 这类拆分，按决策 25 属于伪拆分，要标 R3 纠正。现在只是第二块标题改成了「巧记」，正文里仍写「就变成了」。
- 格林定律：已收的 30 对核对没有问题（foot/pes、three/tres、heart/cor、tooth/dens、brother/frater、door/foris…）。但因为「两处都要写到」的口径太严，**two/duo、ten/decem、fish/piscis、five/pente** 这些课堂上最经典的例子被排除了，主要是因为 Etymonline 缓存缺页，不是证据不足。建议对缺页的词换一个来源复核。
- 原理②「首字母象形（M = 山峰 + 双唇）」直接出现在每张 M 开头的词卡上，没有 💡。
- 词卡原理③的可数性判断有误：advice、fruit、hair、paper 被判「可数」，卡片随后又给出「a water」。

### 3.5 残留文案、空页签
- 「十五大王炸全规律实验室」「在原十二大王炸基础上…王炸 13/14/15」：点「📜 十五条规律速查」可以看到。
- 旧名：「单词大世界」9 处、「语法魔法屋」6 处、「日常用语小剧场」4 处（面包屑、大厅标题），首页还有「从单词大世界开始」。
- 「4合1闯关厅」「原闯关厅…」的说明文案（v6 标签、新增同音 / 反义的标题）。
- 「三大隐喻密码」实际是 4 个。
- 宣传语和现状不符：「高清 2D 卡通角色三幕视频级动画」「高清 Canvas 情景互动动画」「四大全局总结矩阵」（现在已经是 v5 白板）。
- 空章节：单词身世 9 章「即将上线」。方法论「维度八 情景交际 8 大母题」只有标题（HANDOFF 已登记）。
- 「📖 我的单词学习档案」还留在单词大厅（决策 33 说三套档案已经合一）。

---

## 四、底层原理覆盖

| 小学阶段需要的底层知识 | 现有覆盖 | 缺口 |
|---|---|---|
| 音形对应（字母、字母组合 → 音） | 拼读 9 步、拼写潜规则幕、发音五大坑 + 口腔地图、原理①口腔省力 | 视觉词只有 19 个；最小对立体只有 4 组；**音标数据 38% 是假的，口腔地图讲的东西和词卡对不上** |
| 音节与重音 | 语调地图、名前动后、合成词重音、弱读 | 没有讲开音节 / 闭音节、音节划分；249 个三音节以上的词 `syllables` 没有切分；假音标的词没有重音标记 |
| 可数 / 不可数 | 原理③物理边界、G03、词卡原理③ | 可数性数据有错（见 3.4），和「a water」模板互相打架 |
| 时态的时间轴与体 | 时 × 体矩阵 5 项、G16–25 | 现在完成时没有放在拓展里；「时间标志词 → 时态」只有规则，练习不多 |
| 主谓一致 | 分散在 G16、G19、G35（就近原则）、G03 | **没有一个统一的「主谓一致」原理页**（A and B、every-/no- 代词、不可数、集体名词 family） |
| 限定词 | G05、06、08、10 | **没有统一的限定词系统**（「一个名词前只能有一个限定词」：my the book ✗；a/the/this/my/some/every/no 怎么分工）；词性分类里没有 det. |
| 语序 | G28、中英对照、竹节 / 树干、原理⑥、汉英语序、形容词排序、句法火车 | 覆盖过度，同一个点讲了 6–7 遍；疑问句、否定句的语序变换已在 G29、G30 |
| 介词空间隐喻 | G14、原理⑤、密码四、短语动词钥匙 | 只深挖了 in/on/at；over/under/above/below、in front of/behind、into/out of、across/through、to/from 没有系统的空间图 |
| 构词 | 构词页、8 个词尾、词缀实例、不规则复数、过去式门派 | 词缀结论有错（见 3.4）；词根只有 6 个 |
| 语用与礼貌 | 交际句型地图（礼貌阶梯 5 项） | **偏弱**：please、sorry、excuse me 不在词库；没有讲中英语用差异（「去哪儿？」「吃了吗？」、回应夸奖、称呼 Miss / Mr + 姓）；口语对话里有不得体的模板句 |
| 书写、大写、标点 | 没有（决策 8 计划做，未做） | 首字母大写、I 永远大写、专有名词、句号和问号、撇号 |
| 数字、时间、日期、钱的表达 | 时间与度量身世 2 幕、G13 | 几点几分、日期读写（October 1st）、价钱（yuan）没有成体系 |
| 一词多义、核心义 | 17 词 + 框架语义 + 短语动词 | 偏少 |
| 英美差异 | 没有（决策 8 计划做） | 数据本身也混用（见〇-9） |
| 篇章与衔接（代词指代、first/then/finally） | 作文炼金炉（3 条） | 小学高年级写作需要的连接词、段落结构缺失 |

---

## 五、建议新增（按对小学生和家长的价值排序）

1. **课本同步单元**（人教 PEP、外研、译林等，按册和单元选词、句型、对话）：家长最常问的是「和学校教的对得上吗」。现在的「课标同步」说不上是真同步。〔设计文档里没有〕
2. **数据底座修复包**（补齐课标 505 词、重生成真音标、给 445 个 V6 词写真例句、删掉模板搭配）：这是所有功能的前提，不修好的话，后面加什么都会放大错误。〔决策 25/26 覆盖了一部分（维度全量、模板充数），但没有点名「音标假数据」和「缺核心词」〕
3. **高质量发音**（预录真人或神经 TTS 音频内嵌，英美两套）：现在依赖设备上的 Web Speech，安卓上常常没有英文语音或音质很差，发音模块（口腔地图、最小对立体）因此打折。〔设计文档里没有；决策 29 O3 只做了 TTS 兜底〕
4. **每日间隔复习队列**（基于 SM-2 / Leitner，每天 10 分钟）：现在只有「跨 2 天连对 3 次消错」，没有主动推送的复习。〔决策 8「家长指南」讲到间隔重复（计划中）；决策 14 的错题本只做了一部分〕
5. **听力和跟读打分**（录音回放 + 浏览器语音识别或离线评分，先做单词和短句）：小学考试有听力，家长也需要孩子开口练。〔设计文档里没有〕
6. **分年级学习路线 + 家长周报**（每周学了什么、错在哪、下周学什么）：现在总地图只有「发音线」等 3 条推荐路径，不分年级。〔决策 8 家长指南（计划）；决策 14 总地图（已做）〕
7. **分级绘本 / 短文阅读**（用词库里的词，点词就能开卡、朗读）：可理解输入。〔决策 8 提到「可理解输入」，但只是讲给家长听，没有阅读内容〕
8. **书写、大小写与标点 + 英美对照小课**：正好补第四节的缺口。〔决策 8 已列入，未做〕

另外建议**减少重复**：语序讲了 6–7 遍、代词讲了 5 遍。把这些精力挪到上面第 1–5 项上。
