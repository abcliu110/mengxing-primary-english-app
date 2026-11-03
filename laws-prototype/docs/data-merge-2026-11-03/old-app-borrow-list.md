# 老 App 借鉴清单（盘点整理）

盘点日期：2026-11-03。对象：老 App = 仓库根目录 `萌星小学英语_最终合并版.html`（v5.1 壳 + v6 扩展）；新 App = `laws-prototype/mengxing-prototype-v1.html`（十四区）。本文只做盘点与建议，不含任何改动；删除与否请 Stewart 拍板。

---

## 一、老 App 普查总表（全部实测）

**文件构成**：总 17,575,968 字符（约 18.4MB）。其中——

| 组成 | 体量 | 说明 |
|---|---|---|
| webp 插图块 | 375 块 / 10,045,609 字符（57%） | 白板与词卡的配图，逐块以 wb5blob 数据块存放 |
| gzip 数据包 | 3 块 / 2,890,761 字符 | 白板动画/模块数据的压缩包 |
| 白板页（wb5html） | 549 块 / 1,791,412 字符 | 约 50 个主题的白板分页（见下） |
| 主 JS 块 | 1,380,801 字符 | VOCAB_DB + 全部具名数据库 + App 代码 |
| JSON 数据块 | 6 块 / 约 1,268,000 字符 | VOCAB_HEAVY 949,739；GRAMMAR_EX 190,397；ETYM_DB 76,362；MORPH_DB 33,850；AFFIX_WORDS 12,592；lab 映射 4,722 |
| 其余 | wbmod 懒加载块 334,986 字符、R37 补丁 3 个（Markdown 过滤/吸顶栏/对比度守卫）、样式等 | |

**功能结构**：静态 HTML 仅 4,061 字符，全部界面由 JS 渲染。导航目的地实测 27 个：

- 词汇线：vocab_hall（主题/高频 sight/拼读/构词 formation/框架 frames/关系 relations/词表 word_list）
- 语法线：grammar_hall / grammar_cat / grammar_detail / grammar_playground（游乐场）/ grammar_summary_hub（总结）
- 口语线：oral_hall / oral_scenario / oral_func_map（功能图）
- 词源线：word_origins_hub
- 方法线：method_hub（页签：matrix 总结矩阵 / trumps 王牌速查 / engine 考场引擎 / oral 句法火车）、super_lab_hub（实验室：隐喻密码/竹节句/短语钥匙等）、first_principles_hub（六大第一性原理）、principles_hub、zh_en_hub（中英对照）
- 练习线：practice_hub / v6_hub（闯关游戏）/ self_test（综合自测）/ my_study（我的学习）
- 全局：app_map（总地图）、首页门户（12 张 hub 菜单卡）

**内容资产（具名数据库，实测条数）**：

| 资产 | 条数/体量 | 备注 |
|---|---|---|
| VOCAB_DB | 1,567 词 / 494,286 字符 | 词表主体（id/词/音标/音节/词性…） |
| VOCAB_HEAVY_JSON | 1,567 词 / 949,739 字符 | 逐词重字段：senses 释义例句、etymology 巧记故事（填 1,476)、memory_tip（1,466)、affix_root（1,042)、syntax_contrast 中英句法对比（1,006)、visual_scene（987)；collocations 几乎全空、polysemy_data 仅 17 |
| GRAMMAR_DB / GRAMMAR_EX_JSON | 40 专题 / 74,223 字符；例句 40 组约 3,619 句 / 190,397 字符 | 与白板 g01–g40 一一对应 |
| 白板页库 | 549 页 | 口语场景 sc01–16 约 152 页；语法 g01–g40；fr01–fr10；一词多义约 17 词×3 页；五大句型、时态矩阵、过去式家族、形容词序、助动词变形各 4–5 页；第一性原理 6 主题×4 页；词源 wo 章节+音变规则约 30 页；中英 ze 11 页；短语动词 vv（take/put/get/turn/look/give × 7 小词）约 84 页；语音 pron_map/stress_rhythm/intonation_map；思维导图 25 页；总结 sum 系列约 20 页；wordcard 模板 |
| DAILY_EXPRESSIONS_DB | 144 条对话 / 79,661 字符 | 16 个场景（问候、购物、看病、问路、课堂、打电话…），每条含双人对话、用法提示、角色/道具 emoji |
| ORAL_12_SCENES | 12 场景问答 / 1,492 字符 | 场景问答速练 |
| GRAMMAR_CHANTS | 8 首 / 2,281 字符 | 双语拍手歌（如「be 动词三剑客拍手歌」），en/zh 逐行对照 |
| ROYAL_TRUMPS_DB | 15 张卡 / 12,246 字符 | 「一页看完（可打印）」规律速查卡：拼读口诀、代词矩阵、介词坐标轴、时态速查、疑问词雷达等 |
| PITFALLS_DB + 决策树 | 十大天坑 / 2,179 字符 + 三棵决策树 | method_hub engine 页签，配「防坑闪电战」 |
| WORD_FORMATION_DB 等 | 5 大类 / 10,815 字符 + MORPH_DB 33,850 + AFFIX_WORDS 12,592 | 旧构词模块（已知过时，butterfly 口径已被裁定推翻） |
| ETYM_DB_JSON | 约 800 词轻记录 / 76,362 字符 | 词源链简表 |
| HOMOPHONES_DB / MINIMAL_PAIRS_DB / ANTONYMS_LIST / HOMOPHONES_LIST | 12 组 / 4 组 / 24 对 / 16 条 | 体量极小 |
| PHONICS_CURRICULUM | 9 大类 / 17,123 字符 | 旧拼读课纲 |
| ESSAY_TEMPLATES | 约 1,874 字符 | 作文母题模板（如《My Last Weekend》满分模板） |
| 其他小库 | FRAME_SEMANTICS 10、WORD_RELATIONS 5、METAPHOR_CODES、STRESS_AND_SCHWA、TENSE_ASPECT_MATRIX、FIVE_SENTENCE_PATTERNS、WRITING_ALCHEMIST、INTERROGATIVE_RADAR、ZH_EN_SYNTAX_CONTRAST、FIRST_PRINCIPLES（29,724)、VERB_VECTOR_COMBINATIONS、IRREGULAR_PAST_CLANS、AUX_TRANSFORMER_CASES、SENTENCE_TRAINS、PRONOUN_FULL_MATRIX 等 | 多为白板页的配套数据 |

**机制（实测提及/实现）**：

- 可信度徽章 5 级（WB.BADGES，全 App 通用）：📜真实词源 / 💡记忆联想 / ✂️简化说法 / ⚠️有例外 / ❓有争议，含配色与释义
- my_study：错题本 / 学习中 / 已掌握 三分合一入口；self_test 综合自测可「只测错题本」
- 闯关游戏（v6_hub）：单词闪电战 · 感叹句快刀手 · 考场捉虫大侦探；另有连对 combo 计分（主块 8 处）、防坑闪电战
- app_map 总地图：全部模块一张图，学过的点亮
- 朗读：speechSynthesis 18 处；设置仅 wbSfx/wbVoice（白板音效/语音开关，localStorage 仅此 2 键——老 App 几乎不存进度，进度类状态主要在会话内）
- 无语音识别/录音（SpeechRecognition、MediaRecorder 均为 0）

---

## 二、A 类借鉴候选（新 App 完全没有）

### A1. 口语场景对话成套资产 —— 推荐借鉴（本清单价值最高的一项）
- **是什么**：成套的情景口语内容：DAILY_EXPRESSIONS_DB 144 条双人对话（16 场景，含用法提示）、ORAL_12_SCENES 12 场景问答、oral_hall/oral_scenario/oral_func_map 三个目的地，以及口语场景白板 16 个场景约 152 页。
- **新 App 对照**：十四区无口语区；全文检索无 dialogue 数据结构（`"dialogue"` 键 0 次），「口语」269 次均为规律文本内提及。表达写作区是句型表达与写作，不含场景对话。
- **借鉴要动什么**：对话数据结构完整（scenario_id/dialogue/usage_note/emoji)，可整批搬入数据层（约 80K 字符），在新 App 新建口语区或并入表达区，用现行渲染与朗读即可；152 页白板是旧 WB5 格式，搬运需连旧播放器或逐页重制，**建议只搬数据、不搬旧白板页**。
- **价值判断**：听说整类是新 App 唯一成建制缺失的内容域，且数据是现成成品。借鉴。

### A2. 闯关游戏玩法壳（限时游戏三件套） —— 推荐借鉴（壳，不搬题）
- **是什么**：v6_hub 三个限时游戏（单词闪电战、感叹句快刀手、考场捉虫大侦探）+ engine 的防坑闪电战 + 连对 combo 计分。
- **新 App 对照**：「闯关」0 次；新 App 只有规律 quiz 与复习池刷题，无任何限时/游戏模式（全 App 审计的学习闭环线也点过游戏化弱）。
- **借鉴要动什么**：只借鉴玩法壳与计分节奏，题目从现行总表（laws_master 的 quiz/errors、words_master）实时生成，不搬旧题（旧题口径是 v6 旧说法）。
- **价值判断**：中高。游戏化是新 App 明确短板，且壳可复用现有题源。借鉴。

### A3. GRAMMAR_CHANTS 8 首双语拍手歌 —— 推荐借鉴
- **是什么**：8 首中英逐行对照的语法拍手歌（be 动词、时态等），2,281 字符。
- **新 App 对照**：「拍手歌」0 次；新 App 的 chant 仅指不规则动词家族朗读法，不是成首歌谣。
- **借鉴要动什么**：数据极小，整批搬入，挂到对应规律页或语法区首页即可，零结构改动。
- **价值判断**：中。低龄段记忆利器，成本几乎为零。借鉴。

### A4. 总地图 app_map（学过点亮） —— 推荐借鉴（机制）
- **是什么**：全部模块一张图、已学节点点亮的总览页。
- **新 App 对照**：无全局地图、无跨区进度（审计 H5/H6 已登记）；十四区各自为政，家长角的学情只覆盖动词。
- **借鉴要动什么**：机制借鉴——给十四区建节点映射，点亮状态读现有进度数据；新 App 的进度键目前只有 5 个，点亮粒度先做到区/规律组级即可。
- **价值判断**：中。是跨区进度层的最轻量落点。借鉴（机制）。

---

## 三、B 类借鉴候选（新 App 有对应，老版有独有增量）

### B1. 「一页看完」速查卡形态（皇家王牌 15 张，可打印） —— 推荐借鉴（形态，内容再生）
- **是什么**：每主题一页的凝缩规律卡（口诀+要点+例句），带打印用途。
- **新 App 对照**：15 张卡的主题（拼读、代词、介词、时态、疑问词…）全部被新 App 规律覆盖，但新 App 规律页是完整长页，没有「一页凝缩卡+打印」的形态（「王牌」0 次）。
- **借鉴要动什么**：内容不搬旧文案（v6 旧口径），改为从 laws_master 按主题生成一页卡 + 打印样式。数据全现成。
- **价值判断**：中高。考前速查/贴墙卡是刚需形态，生成成本低。借鉴。

### B2. 考场引擎的组织法：三棵决策树 + 十大天坑榜 —— 推荐借鉴（组织法）
- **是什么**：按「题目条件→分支→选答案」的决策树页 + 十大天坑榜单页（拼写双胞胎、哑巴字母、the 生死线、because/so、its/it's 等）。
- **新 App 对照**：天坑 10 条的内容全部已在新 App 规律的 errors 里（内容不缺）；但「决策树」形态仅 1 处提及、「天坑」0 次——新 App 的易错点散在各规律页，没有横向汇编的决策树与榜单。
- **借鉴要动什么**：用 laws_master 的 errors/判定字段组装决策树与天坑榜，数据现成，只写组装与渲染。
- **价值判断**：中。借鉴。

### B3. 可信度徽章 5 级体系 —— 推荐借鉴（机制）
- **是什么**：📜真实词源 / 💡记忆联想 / ✂️简化说法 / ⚠️有例外 / ❓有争议，全 App 统一打在词源说法与规律主张上，含配色与小词典。
- **新 App 对照**：有局部等价物——词源区已核 1,816/待核 462 的状态、规律页「新拟·待对账」标记、候选转正流程；但没有统一的五级徽章覆盖词页与全部规律主张（「可信度」新 App 仅 1 次）。
- **借鉴要动什么**：机制借鉴——把五级映射到现行状态字段（ET 词源状态、规律的已核/新拟、简化口径标记）统一渲染，不搬数据。
- **价值判断**：中。与现行「有出处才说、联想须标明」的核查纪律同向，是把纪律显性
...[truncated 4977 chars]