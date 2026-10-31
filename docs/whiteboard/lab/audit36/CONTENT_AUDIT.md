# 萌星小学英语 · 内容质量审计（只读，第 2 轮）

- 对象：`/workspace/work/mengxing-primary-english-app/萌星小学英语_最终合并版.html`（HEAD `e1c6b96`）。仓库文件一个都没改。
- 已在 `/workspace/work/audit/BIZ_AUDIT.md` 报过的问题（假音标、缺课标词、占位例句、a X 模板搭配、口语第 3 轮接不上、G05/G28/G15 等规则硬伤、空章节、英美拼写、伪原理）本文不再重复；只在动画里出现「同一错误被放大」时一句带过。
- 方法
  - 白板：用 `/workspace/work/audit2/extract.py` 从主文件解出全部 508 幕（`/workspace/work/audit2/html/<页签>-<幕>.html`，就是 App 里实际播放的版本，没有用 build.mjs 重打包）。用 `/workspace/work/audit2/snap.py` 在每幕时长内等距截 8 帧，联络表在 `/workspace/work/audit2/shots/<幕>.png`，时长和朗读点在同名 `.json`。
  - 场景文字：`/workspace/work/audit2/scene_items.json`，从 `v5/scenes/*.js` 的 ITEMS 解析而来，共 469 幕（手工幕 tense_matrix、past_clans、adj_order 和 25 幕思维导图不在其中，这些直接读源码或截图）。
  - 业务数据：沿用上一轮导出的 `/workspace/work/audit/globals.json`、`grammar_dump.md`。课标原文在 `/workspace/work/audit/kb.txt`（课标 2022 PDF 的 OCR 文本）。
- 抽查范围：43 幕。其中 15 幕逐张看了截图，其余核对了脚本文字和朗读点。

---

## 〇、最重要的 10 条

| # | 位置 | 问题 | 证据 | 建议 |
|---|---|---|---|---|
| 1 | 语法白板 hd_g19–g33 | **12 个语法点共用同一块「助动词能量吸收器」板**，和本课内容无关 | 下面这些幕的第二板都是「🧲 did / does / can / will 吸走过去时与三单！went➔go｜likes➔like」：hd_g19、g20、g21、g22、g23、g24、g25、g26、g27、g29、g30、g33。截图 `shots/hd_g24-0.png` t≈18–55 s：讲 be going to 的幕在画「did 吸走过去时」，讲规则 -ed 的 G21、讲祈使句的 G33 也一样 | 每个点按本课内容单独设计中段板。至少要换成本课的「结构公式 + 对比 + 常错」 |
| 2 | 语法白板 hd_g07–g10、g31/32/34、g35/36、g14 | **模板串课** | G09（指示代词）第 1 幕讲的是「主格 vs 宾格」；G10（some/any）三幕也全是代词矩阵板；G34（感叹句）第 1 幕讲的是「为什么有介词 like 必用 What」（`shots/hd_g34-0.png`）；G31 三幕和 G32 一样 | 一个点只放本点的板；共用的总论挪到「总结幕」里 |
| 3 | 语法白板 hd_g*（40 点、约 60 幕） | **只是文字搬上黑板，而且句子被截断、有 markdown 残留** | hd_g05-0 t≈10–30 s：「在中间垫一个鼻音 n 变成」「必考 an 清单：an apple, an egg, an elephant, an」，话说到一半就断了；按启发式统计，298 幕 HD 中约 89 幕有被截断的行；hd_g14、g27、g28、g30、g34、g37、g39 共 11 幕屏幕上直接露出 `**三维空间几何镜头**`（`shots/hd_g14-2.png` t≈12 s）；每幕 70–95 s，整幕只有结尾 1 个英文朗读点，中文讲解全靠小孩自己读顶栏小字 | 按 §2.9 一句一幕重做语法幕：一个例句加一个动作或图示，配 2–4 个朗读点；文字由脚本按语义拆行，不能按字数硬截；渲染前剥掉 `**` |
| 4 | G14 介词三幕 hd_g14-0/1/2 | **知识自相矛盾；三幕基本一样；「状态隐喻」没有内容** | 板上写「📦 IN (>1天长时段容器)：… in the morning」，可 morning 不到 1 天；同屏还有 at night、on Sunday morning，没有解释。第 3 幕标题是「状态隐喻」，内容和第 2 幕完全一样，没有 in love、on fire、at work；三幕结尾都是同一句「The ball is in the box, on the desk, at the door」，一个球同时在三个地方 | 把规则改成「一天之内的一段时间 in the morning/afternoon/evening；at night、at noon 是例外；具体某一天的上午用 on」；第 3 幕补状态隐喻，或者删掉；三个方位各配一句独立的例句 |
| 5 | 万能动词 vv_* 6×6 格 | **为了凑满格子造出不存在或很少用的搭配，还有误用** | 菜单里有 give down、look off、give on、look on、give in…。give down 格自己承认「give 没有常用的 down 搭配，换成 give back」；look off 换成 look away；vv_take_on-0 写「He takes on the heavy bag. 他把沉重的书包扛上肩」，这是误用：take on 的意思是承担、雇用、呈现，「扛上肩」不能用 take on | 6×6 改成「只放真实常用搭配」，格子空着也行；take on 换成 take on a job 或 take on more work，并注明是比喻义 |
| 6 | 万能动词：画面和句子对不上 | **动作没有演出来，或者演反了** | vv_look_off-0 t≈4–13 s：字幕是「Don't look away from the blackboard」，画面却是男孩被蜘蛛吓得捂眼，也就是正在 look away，黑板只有「A B C」三个字（`shots/vv_look_off-0.png`）。vv_turn_down-1 t≈27–32 s：念「Please turn down the TV」，画面是两个孩子拿着蛋糕，没有电视。vv_take_out-0：孩子一开始就举着书，没有从书包里「出」来的动作，方向词也没有在「跨过边界」时出现（§2.9 C③）。vv_put_off-0：只有 TODAY、TOMORROW 两个标签，没有把作业推到明天的时间轴 | 每格按 §2.9 四拍检查：要有容器或平面、动作、跨边界和方向词；句子里出现的物件（黑板、TV）必须画出来 |
| 7 | 框架语义 hd_fr01-0 | **角色和道具错了，框架里的核心元素也没画** | 字幕是「Taotao buys a storybook from the shop」，人物是「妈妈拿着裙子」（mom_dress）；没有卖家、没有钱、也没有「商品 → 买家」「钱 → 卖家」两条流向（`shots/hd_fr01-0.png`）。框架语义这一课讲的就是这四个角色 | 画出买家、卖家、商品、钱四个角色和两条箭头；切换 buy、sell、pay、cost 时只换主语和箭头的起点 |
| 8 | 节奏 | **单幕太长，信息太密，不适合小学生** | 实测时长：wo_port 361 s、wo_grimm 338 s、wo_time_week 321 s、aux_transformer 299 s、tense_matrix① 269 s、phrasal_key 238 s、five_patterns① 237 s、adj_order① 231 s、past_clans① 215 s；§2.9 的标准是「一句一幕，约 12 秒」。tense_matrix① 讲三单的时候，中途插了一段「A, e, i, o, u. A cat, an egg.」（a/an 规则，t≈157 s） | 拆成 60–90 s 的小节，每节一个知识点，节末留一道 3 秒预测题；删掉跑题的插段 |
| 9 | 格林定律 wo_grimm_voiceless-0 | **字幕高亮的词和朗读点不对；动作演错** | t≈100 s：字幕「Nod your head」橙色高亮的是 Nod，可内容稿里目标词是 head；这时板上在写 heart、hundred、horn，字幕比黑板慢了一拍。动作「Nod」对应的是 l_think（托腮想），不是点头；「Point to your foot」对应的 l_point 是手指朝上。wo_grimm-0 里「Dual means two」：dual 是英语词，用来对照应该写拉丁语 duo | 高亮改用内容稿第 4 列的目标词；动作换成点头、指脚；改成 duo means two |
| 10 | 全 App 收尾 | **缺总结层** | 语法 40 点里只有时态、句型两类有总表，「词法」15 点只有一张代词矩阵；口语 16 场景没有任何一页句型替换表；单词专项（拼读、构词、词语关系、单词身世）都没有一页纸总结；hd_g 白板幕结尾没有「一句话洞见」，fp 和句型幕有 | 见第三节：每组补「一页纸 + 对比表 + 5 题自测」 |

---

## 一、缺内容（逐区，按课标 2022 二级和主流教材 PEP、外研、译林的范围对照）

依据：课标表 16 二级语言技能要求（`kb.txt` 第 1160–1210 行）：「课外阅读量累计达到 4000～5000 词」「理解多模态语篇」「完整、连贯地朗读所学语篇……简单复述」「正确书写字母、单词和句子」「正确使用大小写字母和常见标点符号」。

### 1.1 单词
- **字母本身**：26 个字母的名称音和书写，包括四线三格、大小写对应、易混字母 b/d/p/q。课标二级要求「正确书写字母」，App 只有「字母本音」（拼读第 2 步），没有书写。
- **词块 / 短语**：教材是按词块教的（get up、go to school、have breakfast、by bus、on foot、take photos），App 的单词表里基本没有短语词条（上一轮统计缺 200+ 条）；动作小剧场也没有按「日常作息、交通、家务」成组。
- **话题词汇不够成套**：例如日常作息（get up → go to bed 的整条时间线）、身体部位加看病、方位，都只散在思维导图里，没有「词 + 句型」配套（What time do you get up? / I get up at 6:30.）。
- **数字的读法**：电话号码、年份（2026 = twenty twenty-six）、钟点（half past seven、a quarter to eight）、价钱，都没有单独讲。

### 1.2 语法（40 点之外缺的）
| 缺的知识点 | 教材出处（举例） | 现状 |
|---|---|---|
| 时间、日期的表达：What time is it? / It's half past seven. / What's the date? It's October 1st. | PEP 四下、五下 | G13 只讲了序数词的变形 |
| Would you like…? / I'd like…：礼貌请求和邀请 | PEP 五上 What would you like? | grammar_dump 里只出现 4 次，没有成为一个语法点 |
| 建议句：Let's… / Shall we…? / What about…? / Why not…? | 外研、译林 | G33 只讲了 Let's |
| How many 和 How much 的分工（可数和不可数、问价钱） | PEP 三下、四上 | 散在 G31 里，没有专门的对比 |
| have got / has got | 外研版主线句型 | 0 次 |
| also、too、either 的位置和否定 | 各版本 | either 0 次 |
| 动词 -ing 的拼写规则（双写、去 e）和三单、过去式放在一起的总表 | 各版本 | 只在 G20 里一句带过 |
| 连词 when 引导的时间状语（When I grow up, I want to be…） | 外研六上 | 没有 |
| 物主代词和 whose 的问答 | PEP 五下 | G08、G31 各占一半，没有连起来 |

（主谓一致、限定词系统、空间介词全集上一轮已经提过，这里不重复。）

### 1.3 口语（16 场景之外缺的）
- 课标里有、App 没有的交际功能：**邀请与接受 / 婉拒**（Would you like to come to my party? / Sorry, I can't.）、**提建议**、**同意与不同意**（I think so. / I don't think so.）、**表达喜好和原因**（I like… because…）、**描述人物外貌和性格**、**谈过去的经历**（What did you do last weekend?）、**谈计划和理想**（What are you going to do? / What do you want to be?）、**表达感受**（How do you feel?）、**祝贺**。
- **会话策略**：听不懂时怎么问（Pardon? / Can you say that again, please? / How do you spell it?）、接话（Really? Me too. / That sounds great!）、开始和结束对话。这些是小学生「接不上话」的根本原因，App 里一句都没有。
- **语篇复述**：课标要求「完整、连贯地朗读所学语篇……简单复述」，口语区只有 3 轮的小对话，没有 6–10 句的小短文朗读和复述。

### 1.4 底层原理
上一轮已列（主谓一致、限定词、语用、篇章），这里不重复。另外补一条：**「为什么要有助动词」的统一讲法**。现在 be、do、can、will 散在 G16、G23、G26、G25 和照妖镜里，「能量吸收器」板又被错挂到 12 个点上（见〇-1）。应该收成一个原理页：英语的疑问和否定都要靠一个「操作词」，句子里没有就请 do 出来。

### 1.5 练习与档案
- **题型单一**：自测和语法测验全部是选择题，fill 和 correct 实际上也是选项；唯一的产出型题是句子积木。缺这些题型：**拼写输入（听音写词、补全字母）**、**听音选图 / 排序**、**连词成句（键盘或拖拽）**、**看图说话 / 写句**、**短文阅读判断**、**书面表达（5 句小作文 + 自查清单）**。
- **阅读**：课标二级要求 4000–5000 词的课外阅读，App 里没有一篇分级短文。
- **错因分析**：错题本只记了对错，没有按「三单漏 s」「be 和 do 混用」「冠词」等错因归类，也没有推荐对应的语法点。

---

## 二、缺深度：最浅的 10 个页面和加深方法

| # | 页面 | 现在只有 | 怎样加深 |
|---|---|---|---|
| 1 | G18 一般现在时（规则 113 字） | 「三大用法」加「动词形式」各一句 | 加一组**和进行时对比**的图（I play / I am playing）；时间标志词放在时间圆环上；常见错误「He go / Does he goes」；**例外**：讲故事、体育解说也用一般现在时，小学阶段可以只标 💡；**迁移**：给一张作息图，让孩子说出 5 句 |
| 2 | G24 + G25 将来时（两页分开讲） | 各自只讲结构 | 合成一张**「will vs be going to」选择表**：临时决定和预测用 will（I'll get it! / It will rain），有计划、有迹象用 be going to（Look at the clouds! It's going to rain.）；补常见错误 will going to、will is；补一道情景选择迁移题 |
| 3 | G26 can（规则 85 字，全 App 最短） | 能力、许可各一句 | 加 can 和 be able to 的关系（标 💡）；加 Can I…? 和 May I…? 的礼貌差别；补回答方式 Yes, you can. / Sorry, you can't.；常见错误 can swims、Can you to swim；迁移练习：做「我能 / 我不能」技能表 |
| 4 | G27 must / should / may | 三行用法 | 做一张**「口气梯子」**：may → should → must → mustn't；单独讲 mustn't（禁止）和 don't have to（不必）的差别，这是经典易错点；用校规、交通标志的图片做迁移题 |
| 5 | G17 was / were | 变形对应加标志词 | 补一张**「be 的五种形式」表**（am/is/are/was/were），和 G16 连起来；补「There was / There were」；常见错误 I was go、Was you；补一篇过去小短文让孩子找 was、were |
| 6 | G35 / G36 There be 和 have | 两页各两条规则 | 合成一页**对比**；补 There be 的否定和疑问（Is there…? Yes, there is.）、How many… are there?；「就近原则」标 ✂️，说明口语里常听到 There's two…；迁移题：描述自己的房间 |
| 7 | G37 as…as（例句库只有 5 句） | 一个公式 | 和 G38、G39 一起做成**「比较三兄弟」一张图**（一样 / 更 / 最）；补 not as…as 等于「不如」的语义；补常见错误 as taller as；补「比一比班上同学」的迁移题 |
| 8 | 口语场景页（例如 SC01、SC05） | 一段 3 轮对话 + 一句提示 | 每个场景加：**句型替换表**（May I + borrow your pen / use your eraser / go out）、**不同对象的说法**（对老师、对同学）、**中式说法对比**（Teacher, I want to come in → May I come in?）、**扩展到 6–8 轮**并配一个「听不懂怎么办」的回合 |
| 9 | 万能动词单格（vv_*，每格 22–40 s，一句话） | 一句例句 + ON/OUT 标签 | 加**同一小品词的跨动词对比**（put on / turn on / get on：on 都是「接触、连通」）；加**本义 → 比喻义的链条**；补「宾语是代词时放中间」（turn it off，不说 turn off it），这是小学常考的易错点 |
| 10 | 主题思维导图（hd_mindmap，25 幕） | 单词按组排开，最后接一句模板搭配 | 每组配**一个核心句型**（What's in your schoolbag? / I have…）；加分类的理由（为什么 pen、pencil、crayon 是一组）；结尾做「遮住英文说中文」的 3 秒自测；把搭配模板换成真实搭配 |

另外这几页「只有罗列」：单词卡模板 wordcard_tpl（默认演示卡里就有「a apple / the apple / my apple」和跟 apple 无关的「giraffe 和 kangaroo 只加 -s」）、hd_phonics（一句「c-at → cat! cap → cape! sheep vs ship!」把三步塞在一个朗读点里）、wo_rule_norman 和 wo_rule_ablaut（全幕只有 1–2 个例句，没有让孩子自己推一个词的迁移题）。

---

## 三、缺总结

| 区 / 知识组 | 现有总结 | 缺什么 | 建议形式 |
|---|---|---|---|
| 单词 · 发音与拼读（拼读 9 步、五大坑、重音语调） | 没有 | 9 步走完没有一张「字母（组合）→ 音」总表 | **一页纸拼读总表**（按元音、辅音、组合分色）+ 一首 9 步口诀 + 20 词读音自测 |
| 单词 · 构词与变形（8 词尾、不规则复数、过去式门派、四大变形） | 没有 | 复数、三单、过去式、-ing、比较级都是「词尾变化」，却分散在 5 处 | **「词尾变化总对比表」**：一张表 5 列（-s / -es / -ies / -ves；-ed；-ing；-er / -est），每列写规则、例外、读音 |
| 单词 · 词语关系 | 没有 | 易混、反义、一词多义、框架、短语动词 5 页没有收尾 | **思维导图**（词和词之间的 5 种关系）+ 10 题辨析自测 |
| 单词 · 单词身世 | 「十五条规律速查」，但点进去显示的是旧内容（上一轮已报） | 格林定律 8 幕、规律 18 幕没有一张图 | **「词源地图」一页**（日耳曼本族 / 诺曼法语 / 拉丁希腊三条线 + 每条 3 个代表词）；格林定律 p→f、t→th、k→h 做成对照转盘 |
| 主题思维导图 25 组 | 每组有导图 | 各组导图之间没有串联 | **年级总导图**：25 个主题 → 核心句型 |
| 语法 · 词法 15 点 | 只有代词矩阵 | 名词（单复数、可数、所有格）、冠词、形容词副词、介词、数词都没有总表 | **3 张对比表**：①名词与限定词（a/an/the/零冠词/some/any）②形容词 vs 副词（位置 + 变化）③介词（时间、地点一张图）；每张配 5 题 |
| 语法 · 时态 12 点 | 时 × 体矩阵、助动词照妖镜 | 缺「标志词 → 时态」速查和「四种时态句式变换总表」（肯定、否定、一般疑问、特殊疑问 × 4 种时态） | **16 格句式变换表** + 一段 4 种时态混用的小短文自测 |
| 语法 · 句型 13 点 | 五大句型等 7 个页面 | 疑问句（一般、特殊、选择）没有一页总表 | **问句全家福**：问法 → 答法对照（怎么问就怎么答） |
| 语法 · 每个点 | 每个点有口诀（CHANT） | hd_g 白板幕结尾没有「一句话洞见 + 口诀」 | 照 fp 和 five_patterns 幕的结尾格式统一（💡 一句话 + 🎵 口诀 + 🔮 预测） |
| 口语 16 场景 | 交际句型地图（5 件事 × 3 句） | 场景没有收尾，功能也只覆盖 5 件 | 每个场景加一张**「必会 3 句 + 回应 3 句」卡**；全区做一张**「功能 → 句型」总表**（问候、请求、建议、邀请、道歉……12 项） |
| 底层原理 | 六原理速查表 | 中英对照 5 章、隐喻密码、竹节句 / 树干句没有统一结论 | 一页**「中英 7 大差异」对比表**（语序、形合意合、量词 vs 复数、时态标记……），每条配一对例句 |
| 练习与档案 | 我的学习（错题） | 没有阶段总结 | **周报式「本周学了什么 / 错在哪类 / 推荐复习」一页** |

---

## 四、动画表达抽查（43 幕）

截图是 `/workspace/work/audit2/shots/<幕>.png`，每幕 8 帧，帧上标了时间。下面「✓」表示内容和画面基本没问题。

### 4.1 语法（含时态、句型）
| 幕 | 时间点 | 问题 | 建议 |
|---|---|---|---|
| hd_g05-0 | 10–30 s | 句子被截断（「垫一个鼻音 n 变成」「an apple, an egg, an elephant, an」）；仍然在讲反了的 a/an 历史；底部字幕中文是整段口诀，不是这句英文的译文 | 拆句重排；改正史实或标 💡；字幕给译文 |
| hd_g14-0/1/2 | 12 s、≈40 s | 露出 `**`；「IN >1天」和 in the morning 矛盾；第 3 幕「状态隐喻」没有内容；三幕结尾同一句 | 见〇-4 |
| hd_g19-0 | 18–55 s | 讲三单的幕里放的是「did/does/can/will 吸收器」，有关联但不是三单本身；三单 -s 的读音 /s/ /z/ /ɪz/ 没有讲 | 中段改成「三单警报器」（DG01 已有素材） |
| hd_g21-0 | 18–55 s | 讲规则 -ed 的幕放的是「吸收器」板，和 -ed 的变形、读音无关 | 改成 -ed 四规则 + /t/ /d/ /ɪd/（可以直接引用 fp_economy 幕） |
| hd_g24-0 | 18–55 s | 讲 be going to 的幕放「went➔go｜likes➔like」 | 换成「计划 / 迹象」两张图，配 will 对比 |
| hd_g34-0 | 20–50 s | 讲感叹句的幕放的是 G32「like 必用 What」板 | 换成「遮住主谓看核心」（这块板现在被放在第 3 幕） |
| hd_g35-0 | ✓ | 内容对；但整幕是纯文字，没有画桌子和书 | 画出「某地有某物」的场景 |
| hd_g32-0 | ✓ | 原理正确（What…like / How）；信息密度太高，一屏 8 行 | 拆 2 幕 |
| tense_matrix-0 | 157 s；151 s、252 s | 讲三单时插了一段「A, e, i, o, u. A cat, an egg.」，是 a/an 规则，跑题；镜头裁掉了左边的字（「y mom」「去上学」只露一半）；全幕 269 s；朗读「Ch, sh, es.」TTS 会把字母逐个念出来，意义不明 | 删插段；修镜头的安全边距；拆成 3 节；改成「Watch → watches」直接念例词 |
| tense_matrix-3 | 97–106 s | 同一句「Leo is going to visit…」连念两遍，间隔不到 10 s；全幕 241 s | 去掉重复，缩短 |
| past_clans-0 | 全幕 | 「闭音节 + t/d 结尾，过去现在一模一样」是简化说法：hurt、read 是长元音，而且 want、need、visit、wait 都要加 -ed。全幕只有一个通用的 ✂️ 标签，没有点出反例 | 写明「只有少数老动词这样；want→wanted 等多数照常加 -ed」 |
| aux_transformer-0 | 93 s、87 s | 板上是「② 否定句」，朗读却是半句「Taking photos in the park now.」，听起来像病句；全幕 299 s | 朗读点只念完整的句子；拆成 5 小节（5 种句型各 1 节） |
| five_patterns-0 | ≈205 s | 字幕念「Subject, verb. Play with me!」，可 Play with me 是没有主语的祈使句，拿来当 SV 例句自相矛盾；开场 t≈15 s 先冒出「🔮 预测」标签，提纲标签（东、对象、黑板）散落在板上，看不出是什么 | 换成 Birds fly. / The baby is sleeping.；提纲标签不要上板 |
| adj_order-0 | ✓ | OSASCOMP 顺序正确；但对小学阶段偏深，231 s | 标「拓展」，压到 90 s |
| hd_sum_syntax-0 | ✓ | 正确；「长定语一律后置」说法太绝对，没标 ✂️ | 加 ✂️ |
| ze_be-0 | ✓ | be 和实义动词的对比正确；166 s 偏长 | — |

### 4.2 单词身世 / 格林定律 / 规律
| 幕 | 时间点 | 问题 | 建议 |
|---|---|---|---|
| wo_grimm_voiceless-0 | ≈100 s、33 s、166 s | 高亮错词（Nod 而不是 head）；字幕和黑板错拍（t=33 s 念 few，板上还在写 father）；Nod 对应「托腮想」、Point to your foot 手指朝上；结尾约 10 s 是空板 | 见〇-9 |
| wo_grimm-0 | 全幕 | 「Dual means two」应写 duo；全幕 338 s、18 个朗读点，一幕里讲了 6 对词 | 拆成 3 节 × 2 对 |
| wo_time_week-0 | 全幕 | 「后来罗马人在前面加了一月、二月」是简化说法（历法改革的过程更复杂），没有 ✂️；321 s | 加 ✂️；拆成「星期」「月份」两幕 |
| wo_port-0 | ≈157 s | 「trans- 穿过：船穿过大海，把货运到别的港口 → transport」把 portare（搬运）讲成了港口场景。脚本其他地方说清了 portus 和 portare「是亲戚、不是同一个词」，但这一句的画面会误导；361 s | 把 transport、export 的画面换成「搬运」（人扛箱子），不要用船 |
| wo_rule_gvs-0 | ✓ | 内容正确，有 ✂️ | 可加一道迁移题：bite、time 的 i 为什么读 /aɪ/ |
| wo_rule_ablaut-0 | ✓ | 正确（rīdan / rād / riden）；只有 2 个例句，58 s | 加 drink、swim 迁移 |
| wo_rule_norman-0 | ✓ | 正确；只有 1 个朗读点，动作是「站着」（l_stand），guard（守卫）没有演出来 | 画士兵守城门 |
| wo_vowel_a-0 | ✓ | foot/feet、goose/geese、food/feed、full/fill、blood/bleed 都是 i-变音，正确；248 s 偏长 | — |

### 4.3 第一性原理
| 幕 | 时间点 | 问题 | 建议 |
|---|---|---|---|
| fp_vectors-0 | 全幕 | 讲「点、面、体」，却**没有画点、平面、盒子**，只有文字标签（`shots/fp_vectors-0.png`）；「The cat is at the door, on the table, in the room」一只猫同时在三处；没有讲 in the morning、at night 这些例外 | 画三个图示，一个位置配一句；补例外 |
| fp_economy-0 | ✓ | /s/ /z/ 和 /t/ /d/ 的同化讲得对，有预测题，有口诀；是全 App 讲「为什么」最好的一幕，可以当样板 | — |
| fp_boundedness-0 | ≈114 s | 「two pieces of paper / two papers」并排写，没有说明 papers 是可数的另一个意思（报纸、试卷），也没有打 ✗，孩子分不清对错 | 标「papers = 报纸 / 试卷（另一个意思）」 |
| fp_iconicity-0 | 全幕 | M = 山 + 嘴唇、C = 弯手是记忆联想（上一轮已报）；「这是联想」的说明到 C 段才出现，M、S、B 三段没有 | 开头就标 💡 |

### 4.4 口语
| 幕 | 问题 | 建议 |
|---|---|---|
| hd_oral_sc01-0 | 对话两个角色（吴斌斌和 Sarah）只画了**同一个男孩**；没有两人面对面；Sarah 那一句也由男孩「说」 | 双角色站位，说话的人轮流高亮 |
| hd_oral_sc05-0 | 敲门、进门的动作没有演；第 3 轮接不上（上一轮已报） | 画门和敲门的 3 帧 |
| oral_func-0 | ✓ 礼貌阶梯 Give me → Would you mind… 顺序正确；应该加一句提示「Would you mind…? 同意时答 Not at all」，现在只念不讲 | — |

### 4.5 万能动词剧场 / 短语动词
| 幕 | 问题 |
|---|---|
| vv_take_out-0 | 没有「从书包里出来」的动作，书一开始就在手上 |
| vv_get_on-0 | ✓ 公交车和上车帧对；ON（车厢地板）只是文字标签，可以画一条地板线 |
| vv_look_off-0 | 动作和句子相反；没有黑板（见〇-6） |
| vv_give_down-0 | 格子名 give down 不存在，实际讲 give back，菜单会误导 |
| vv_turn_down-1 | 念 TV 那句时画面是蛋糕 |
| vv_put_off-0 | 没有时间轴推移动作 |
| vv_take_on-0 | 误用（「扛书包」） |
| phrasal_key-0 | ✓ 内容正确；238 s，一口气讲了 6 个小品词，建议拆开 |

### 4.6 单词卡模板 / 思维导图 / 其他
| 幕 | 问题 |
|---|---|
| wordcard_tpl-0（默认 apple） | 画面上出现「a apple」；「常用搭配动词」一栏放的是整句谚语；结尾讲 giraffe、kangaroo 的复数，和 apple 无关；ap-ple「a 像苹果带叶子」是伪拆分（模板错误被放大到每张卡） |
| hd_mindmap-0 | ✓ 分组清楚，70 s 合适；结尾「评价形容词：a bag / the bag / my bag」又是模板 |
| hd_fr01-0 | 角色、道具错了（见〇-7） |
| hd_phonics-0 | 三条规则塞在一个朗读点里；「a 永远发 /æ/」应写成「闭音节里通常」 |

### 4.7 横向问题
1. **朗读和字幕**：自动版面幕（gen_auto 生成的 148 幕 + HD 幕）中文讲解都不朗读，只在顶栏显示一行小字；hd_g 幕底部的中文字幕放的是口诀，不是译文。小学低年级读不完。建议给中文讲解配 TTS（zh-CN），或者把讲解压缩到 15 字以内。
2. **「动作必须演出来」（决策 19、R4v2）没有落到 HD 和自动幕**：ACTS 大多是讲解员姿势（l_think、l_point、l_speak、l_books），和句子里的动词无关。
3. **信息密度**：手工幕一屏 6–8 行字，提纲标签散在板上；§2.9 C 的「立场景 → 动词重音 → 运动 → 总结」四拍只有 v51 样板和 vv 部分做到了。

### 关键截图
- `/workspace/work/audit2/shots/hd_g24-0.png`：讲将来时的幕放了「能量吸收器」板
- `/workspace/work/audit2/shots/hd_g34-0.png`：讲感叹句的幕放了 like/What 板
- `/workspace/work/audit2/shots/hd_g05-0.png`：句子被截断
- `/workspace/work/audit2/shots/hd_g14-2.png`：`**` 残留，IN >1 天矛盾
- `/workspace/work/audit2/shots/vv_look_off-0.png`：动作和句子相反
- `/workspace/work/audit2/shots/combo1.png`：take out、put off、turn down 的动作问题
- `/workspace/work/audit2/shots/hd_fr01-0.png`：框架语义角色错
- `/workspace/work/audit2/shots/wo_grimm_voiceless-0.png`：高亮错词、动作不符
- `/workspace/work/audit2/shots/fp_vectors-0.png`：讲点、面、体却没有图示
- `/workspace/work/audit2/shots/hd_oral_sc01-0.png`：两个角色画成同一个男孩
- `/workspace/work/audit2/shots/five_patterns-0.png`、`tense_matrix-0.png`、`combo2.png`：节奏和信息密度
- `/workspace/work/audit2/shots/wordcard_tpl-0.png`：「a apple」进了动画
