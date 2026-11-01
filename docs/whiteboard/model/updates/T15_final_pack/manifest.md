# T15 最终回灌包 · manifest

- 生成时间（UTC）：2026-11-01T03:39:03.800317+00:00
- 条目总数：**149**（场景级差异 134 + 纯引擎换代 15）
- 未收录：字节完全相同 191 幕；仅 esbuild 压缩变量名噪声差异 209 幕（语义指纹三项全等，已剔除，清单见记录 T15_final_pack.done）
- 新引擎：`ceafddcd6cbccc15`（sha1(正文)[:16]；正文 1107015 字符；以 sharedNewBlobs 一次下发，全部条目统一钉此引擎）
- 前置包 T15_pack 的 93 条全部包含于本包（逐 elementId 对账，零丢失）。

## T15_final 增补（对 recipe.md 口径的补充）

1. **新引擎下发**：recipe §3 的「引擎钉死」在本批不适用——app 现行两台引擎（1602f4a3…/2d47bbdc…）均不含 T16 元素库，钉旧引擎会让元素场景运行时缺失 drawElement 等成员。本包改为：新引擎作为 sharedNewBlobs 随包下发，条目 payload 内引擎段钉新引擎 hash，回灌时先插入该 blob 再逐幕替换；未收录的 400 幕保持原载荷与原引擎不动。
2. **差异集口径**：全量 549 幕以现行管线重建，先按 old-pin 字节 sha 初筛，再以语义指纹（有序字符串字面量列表 + 数字字面量集 + 属性名集）复核——esbuild 压缩变量名在不同构建间漂移（内容同、字节异），指纹三项全等者判为噪声剔除（209 幕）。另有「换代集」：内容字节无差异、但必须跑新引擎的幕（poly 头图 BOOK 6 幕、auto 金句卡去重豁免受害 12 幕、场景脚本引用旧引擎缺失共享成员的幕），按记录清单强制收录。
3. **字体表**：构建新引擎前已用 gen_font_chars.py 再生 docs/whiteboard/v5/font_chars.txt（3383 字，补 T16 新字 铰/契/豁/🫖 等），新引擎字体子集据此生成，覆盖全部场景用字。该文件为工作区未提交改动，随本包记录在案。
4. **回灌执行**：双击 回灌.bat（或手动跑 回灌.ps1）→ 同目录定位主文件 → 时间戳备份 → 逐条 old-sha 校验（不符即中止并指名场景）→ 插入新引擎 blob → 逐幕替换 → 全量自检（549 载荷 gunzip、每条 mustContain/mustNotContain、DB 骨架字节一致、verb_form_of=58、wlPosMatch 词元口径）→ 全过才换入。

## 逐幕清单

| elementId | 场景 | 类别 | 变化摘要 |
|---|---|---|---|
| wb5html-bamboo_tree-0 | bamboo_tree_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['口诀：先立树干，再挂树枝。一句话只留一个谓语动词当国王。'] +['口诀：先立树干，再挂树枝。一个简单句（一个分句）只留一个谓语动词当国王；长句子可'] |
| wb5html-bamboo_tree-1 | bamboo_tree_2 | engine-repoint | auto.js 金句卡去重豁免：结尾口诀/系列名回归 |
| wb5html-bamboo_tree-2 | bamboo_tree_3 | engine-repoint | auto.js 金句卡去重豁免：结尾口诀/系列名回归 |
| wb5html-bamboo_tree-3 | bamboo_tree_4 | engine-repoint | auto.js 金句卡去重豁免：结尾口诀/系列名回归 |
| wb5html-five_patterns_p2-1 | five_patterns_p2_2 | scene | T16 定版重建（语义指纹差异）｜字符串: -['副词：-ly 结尾的词修饰动作，比如 sweetly（甜甜地）。系动词后面不能用'] +["副词是'加说明'的词：说明动作怎么做（run fast）、程度多深（very  |
| wb5html-fp_boundedness-0 | gen_boundedness_1 | scene | 场景脚本引用旧引擎缺失的共享成员: KNIFE, TEAPOT, assertBowlGeometry, assertFill, assertKnifeGeometry, assertPourWindow, drawEl |
| wb5html-fp_boundedness-1 | gen_boundedness_2 | scene | 场景脚本引用旧引擎缺失的共享成员: KNIFE, assertKnifeGeometry, drawElement |
| wb5html-fp_boundedness-2 | gen_boundedness_3 | scene | 场景脚本引用旧引擎缺失的共享成员: KNIFE, assertKnifeGeometry, drawElement |
| wb5html-fp_boundedness-3 | gen_boundedness_4 | scene | 场景脚本引用旧引擎缺失的共享成员: KNIFE, assertKnifeGeometry, drawElement |
| wb5html-fp_economy-0 | gen_phonology_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['声带从 /k/ 到 -s 一直静止 → /s/；bag 的 /ɡ/ 抖起来后一路', '前音不震尾不震，前音一震尾也震（清配清，浊配浊）', '⚙️ 第一性原理 · 经济 |
| wb5html-fp_economy-1 | gen_phonology_2 | scene | T16 定版重建（语义指纹差异）｜字符串: -['① 口腔省力同化律', '① 撞车', '声带'] +['n', '① 嘶嘶相撞插音', '① 嘶嘶相撞'] |
| wb5html-fp_economy-2 | gen_phonology_3 | scene | T16 定版重建（语义指纹差异）｜字符串: -['① 口腔省力同化律', '① 卡一下', '② 小桥 an'] +['n', 'w', '① 看音选 a/an · in- 变 im-'] |
| wb5html-fp_economy-3 | gen_phonology_4 | scene | T16 定版重建（语义指纹差异）｜字符串: -['① 口腔省力同化律', '① 音节房间', '② 门开了'] +['n', 'w', '① 双写拼写'] |
| wb5html-fp_economy_p2-0 | gen_phonology_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['还是那个喉咙剖面：worked 的 /k/ 声带不动，-ed 也不动 → /t/', 'played 的 -ed 跟着抖还是不抖？/t/ 还是 /d/？（后面再猜 do' |
| wb5html-fp_iconicity-0 | gen_letters_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['snake', '这一幕：把字母当成一幅画，帮你一次记住一串词。', 'cup'] +['n', '这一幕：字母最早真是画出来的！可有些画是查得到的真来历，有些只是我们编 |
| wb5html-fp_iconicity-1 | gen_letters_2 | scene | T16 定版重建（语义指纹差异）｜字符串: -['这一幕：fly、flag、flower 开头都是 fl-，是巧合吗？', 'w', 'fl- 飘 · gl- 亮 · sl- 滑'] +['@@B:dc9de4c2007 |
| wb5html-fp_iconicity-2 | gen_letters_3 | scene | T16 定版重建（语义指纹差异）｜字符串: -['这一幕：straight、street、strong、strict，一个画面记住', 'w', 'str- 绷直 · sp- 向外'] +['这一幕：str- 和 sp- |
| wb5html-fp_iconicity-3 | gen_letters_4 | scene | T16 定版重建（语义指纹差异）｜字符串: -['这一幕：为什么 12 是 twelve，20 是 twenty？', 'w', 'tw- 家族都等于 2'] +['n', '这一幕：为什么 12 是 twelve，20 |
| wb5html-fp_one_king-1 | gen_sentence_2 | scene | T16 定版重建（语义指纹差异）｜字符串: -['这一幕：王座上已经有国王了，第二个动词怎么办？', '第二个动词：穿马甲', '④ 一山不容二虎单核谓语律'] +['n', '这一幕：王座上已经有国王了，第二个动词怎么 |
| wb5html-fp_one_king-2 | gen_sentence_3 | scene | T16 定版重建（语义指纹差异）｜字符串: -['w', '令牌守恒定律', '④ 一山不容二虎单核谓语律'] +['n', '时态只标一次', '④ 单核谓语'] |
| wb5html-fp_one_king-3 | gen_sentence_4 | scene | T16 定版重建（语义指纹差异）｜字符串: -['④ 一山不容二虎单核谓语律', '✂️ 简化说法', '④ 双宾 · 补语'] +['n', 'w', '④ 单核谓语'] |
| wb5html-fp_vectors-0 | gen_spacetime_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['这一幕：为什么说 at 7:00、on Monday、in May？', 'at 点 · on 面 · in 体', '⑤ 三维几何向量时空律'] +['get up', |
| wb5html-fp_vectors-1 | gen_spacetime_2 | scene | T16 定版重建（语义指纹差异）｜字符串: -['take off', 'p', 'coat'] +['n', '\\u{1F9E5}', 'on 贴上 · off 离开'] |
| wb5html-fp_vectors-2 | gen_spacetime_3 | scene | T16 定版重建（语义指纹差异）｜字符串: -['n', 'w', '⑤ 三维几何向量时空律'] +['⑤ 介词看图猜', '\\u{1F4A1} 记法窍门', '① 公交 on']；数字字面量集变化 |
| wb5html-fp_vectors-3 | gen_spacetime_4 | scene | T16 定版重建（语义指纹差异）｜字符串: -['look for', 'look at', '这一幕：to、for、from，三个方向箭头。'] +['n', '这一幕：to、for、from，三个小词各管一段路。', |
| wb5html-fp_zoom_focus-1 | gen_viewpoint_2 | scene | T16 定版重建（语义指纹差异）｜字符串: -['焦点抢头条', '⑥ 焦点先行与镜头缩放律', '\\u{1F4A1} 记忆联想'] +['n', 'w', '疑问词站第一'] |
| wb5html-fp_zoom_focus-2 | gen_viewpoint_3 | scene | T16 定版重建（语义指纹差异）｜字符串: -['这一幕：写地址和时间，英语和中文的顺序为什么正好相反？', 'w', '镜头从小拉到大'] +['@@B:713b28c38cd5623d@@', 'n', '这一幕：写 |
| wb5html-fp_zoom_focus-3 | gen_viewpoint_4 | scene | T16 定版重建（语义指纹差异）｜字符串: -['这一幕：所有时态，都是「选时间 × 选拍法」。', '时间轴 × 镜头拍法', '⑥ 焦点先行与镜头缩放律'] +['n', '这一幕：现在完成时，到底在说什么？是「做完 |
| wb5html-hd_fr01-0 | hd_fr01_1 | scene | 场景脚本引用旧引擎缺失的共享成员: assertBookGeometry, drawHinged |
| wb5html-hd_fr01-1 | hd_fr01_2 | scene | 场景脚本引用旧引擎缺失的共享成员: assertBookGeometry, drawHinged |
| wb5html-hd_fr01-2 | hd_fr01_3 | scene | 场景脚本引用旧引擎缺失的共享成员: assertBookGeometry, drawHinged |
| wb5html-hd_fr01-3 | hd_fr01_4 | scene | 场景脚本引用旧引擎缺失的共享成员: assertBookGeometry, drawHinged |
| wb5html-hd_g03-0 | hd_g03_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['水（water）、牛奶（milk）、面包（bread，切分后还是面包）、米饭（r', '② 核心结构规律：① 必背不可数名词：液体（water, milk, juice' |
| wb5html-hd_g04-0 | hd_g04_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -["名词所有格 ('s 有生命 vs of 无生命) —— 表达“……的”：有生命加", '英语习惯把最重要的核心词（the legs 腿）放在最前面，再用 of the ' |
| wb5html-hd_g06-0 | hd_g06_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F3B5} 口诀：特指双知用定冠(the)，世上独一太阳蓝天(the s'] +['n', "第一次提，用 a：听的人还不知道是哪一个；两人都知道是哪一个，用  |
| wb5html-hd_g14-0 | hd_g14_1 | scene | 场景脚本引用旧引擎缺失的共享成员: assertBallGeometry, assertDoorGeometry, drawElement, drawHinged |
| wb5html-hd_g14-1 | hd_g14_2 | scene | T16 定版重建（语义指纹差异）｜字符串: -['介词专项：in / on / at 空间图式 ➔ 时间 ➔ 状态隐喻映射 —— '] +['介词专项：in / on / at 空间图式 ➔ 时间 ➔ 状态隐喻映射 —— |
| wb5html-hd_g14-2 | hd_g14_3 | scene | T16 定版重建（语义指纹差异）｜字符串: -['空间图式原封不动搬到状态上：包裹 → in，接触 / 在线上 → on，对准一个', '介词专项：in / on / at 空间图式 ➔ 时间 ➔ 状态隐喻映射 —— ' |
| wb5html-hd_g15-0 | hd_g15_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['② 核心结构规律：① and vs or 否定转换铁律：肯定句并列用 and；一'] +['② 核心结构规律：① and vs or 否定转换（默认规则，不是铁律）：肯定 |
| wb5html-hd_g18-0 | hd_g18_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_g19-0 | hd_g19_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['【英语为什么非要给三单动词加 -s？】复数主语名词自带了 -s（The boys'] +["它是一枚'单数第三人称'的小徽章。古英语的动词尾巴有很多，后来大多磨掉了，只剩 |
| wb5html-hd_g33-0 | hd_g33_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['【为什么祈使句没有主语，且第一个词永远用动词原形？】'] +["祈使句是说给'你'听的命令和请求，主语 you 常被省略，谓语用动词原形（Sta"] |
| wb5html-hd_g39-0 | hd_g39_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['【为什么最高级前面必须加 the？】因为全班最高的人是唯一锁定（特指）的冠军，自'] +["因为全班最高的那一个是唯一锁定的冠军，用 the 指明'就是那一个'（the  |
| wb5html-hd_g40-0 | hd_g40_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['② 核心结构规律：① 后接 V-ing：like / love / enjoy ', '\\u{1F3B5} 口诀：一山不容二虎，一句不站两原形！想要计划去未来，want |
| wb5html-hd_mindmap-0 | hd_mindmap_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['书，书本'] +['书，书本；预订（动词：book a ticket 预订票）'] |
| wb5html-hd_mindmap-1 | hd_mindmap_2 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-2 | hd_mindmap_3 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-3 | hd_mindmap_4 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-4 | hd_mindmap_5 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-5 | hd_mindmap_6 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-6 | hd_mindmap_7 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-7 | hd_mindmap_8 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-8 | hd_mindmap_9 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-9 | hd_mindmap_10 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-10 | hd_mindmap_11 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-11 | hd_mindmap_12 | scene | T16 定版重建（语义指纹差异）｜字符串: -['公园'] +['公园；停车（动词：park the car 停车）'] |
| wb5html-hd_mindmap-12 | hd_mindmap_13 | scene | T16 定版重建（语义指纹差异）｜字符串: -['观看，注视（电视、比赛等动态画面） / 手表（戴在手腕上随时“看”时间的工具）'] +['观看，注视（电视、比赛等动态画面） / 手表（戴在手腕上的计时工具；名字来自古英 |
| wb5html-hd_mindmap-13 | hd_mindmap_14 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-14 | hd_mindmap_15 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-15 | hd_mindmap_16 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-16 | hd_mindmap_17 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-17 | hd_mindmap_18 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-18 | hd_mindmap_19 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-19 | hd_mindmap_20 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-20 | hd_mindmap_21 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-21 | hd_mindmap_22 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-22 | hd_mindmap_23 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-23 | hd_mindmap_24 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_mindmap-24 | hd_mindmap_25 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +[]（仅顺序） |
| wb5html-hd_oral_sc02-1 | hd_oral_sc02_2 | scene | T16 定版重建（语义指纹差异）｜字符串: -["\\u{1F466} 角色 A：That's all right.", '没关系。', "That's all right."] +['\\u{1F466} 角色 A：T |
| wb5html-hd_oral_sc02-2 | hd_oral_sc02_3 | scene | T16 定版重建（语义指纹差异）｜字符串: -["\\u{1F9D2} 角色 A：That's all right.", '没关系。', "That's all right."] +['\\u{1F9D2} 角色 A：T |
| wb5html-hd_oral_sc02-3 | hd_oral_sc02_4 | scene | T16 定版重建（语义指纹差异）｜字符串: -["\\u{1F466} 角色 A：That's all right.", '没关系。', "That's all right."] +["\\u{1F466} 角色 A：Y |
| wb5html-hd_oral_sc02-4 | hd_oral_sc02_5 | scene | T16 定版重建（语义指纹差异）｜字符串: -["\\u{1F467} 角色 A：That's all right.", '没关系。', "That's all right."] +["\\u{1F467} 角色 A：Y |
| wb5html-hd_oral_sc04-0 | hd_oral_sc04_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F466} 角色 A：Nice to meet you, too!', '我也很高兴认识你！', 'Nice to meet you, too!'] +['\\ |
| wb5html-hd_oral_sc04-1 | hd_oral_sc04_2 | scene | T16 定版重建（语义指纹差异）｜字符串: -["\\u{1F466} 角色 B：I'm from Canada. What abo", '我来自加拿大。你呢？ — 我来自中国！', "I'm from Canada.  |
| wb5html-hd_oral_sc04-2 | hd_oral_sc04_3 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F466} 角色 A：Nice to meet you, too!', '我也很高兴认识你！', 'Nice to meet you, too!'] +['\\ |
| wb5html-hd_oral_sc04-3 | hd_oral_sc04_4 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F466} 角色 A：Nice to meet you, too!', '我也很高兴认识你！', 'Nice to meet you, too!'] +['\\ |
| wb5html-hd_oral_sc04-4 | hd_oral_sc04_5 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F466} 角色 A：Nice to meet you, too!', '我也很高兴认识你！', 'Nice to meet you, too!'] +['\\ |
| wb5html-hd_oral_sc04-5 | hd_oral_sc04_6 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F4A1} 交际得体度与母语负迁移提示：\\u{1F31F} 询问职业三大', '\\u{1F467} 角色 A：Nice to meet you, too!' |
| wb5html-hd_oral_sc04-6 | hd_oral_sc04_7 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F466} 角色 A：Nice to meet you, too!', '我也很高兴认识你！', 'Nice to meet you, too!'] +['\\ |
| wb5html-hd_oral_sc04-7 | hd_oral_sc04_8 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F466} 角色 A：Nice to meet you, too!', '我也很高兴认识你！', 'Nice to meet you, too!'] +["\\ |
| wb5html-hd_oral_sc04-8 | hd_oral_sc04_9 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F467} 角色 A：Nice to meet you, too!', '我也很高兴认识你！', 'Nice to meet you, too!'] +['\\ |
| wb5html-hd_oral_sc05-0 | hd_oral_sc05_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F9D2} 角色 A：Thank you for your help!', '谢谢你帮忙！', 'Thank you for your help!'] +['\ |
| wb5html-hd_oral_sc06-0 | hd_oral_sc06_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F4A1} 交际得体度与母语负迁移提示：\\u{1F31F} 点餐必考铁律', '\\u{1F468}\u200d\\u{1F373} 角色 A：Thank y |
| wb5html-hd_oral_sc06-2 | hd_oral_sc06_3 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F466} 角色 A：Thank you. It tastes good', '谢谢，真好吃。', 'Thank you. It tastes good.']  |
| wb5html-hd_oral_sc06-3 | hd_oral_sc06_4 | scene | T16 定版重建（语义指纹差异）｜字符串: -['w', 's', '对话第3轮'] +[] |
| wb5html-hd_oral_sc06-4 | hd_oral_sc06_5 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F467} 角色 A：Thank you. It tastes good', '谢谢，真好吃。', 'Thank you. It tastes good.']  |
| wb5html-hd_oral_sc06-6 | hd_oral_sc06_7 | scene | T16 定版重建（语义指纹差异）｜字符串: -['w', 's', '对话第3轮'] +[] |
| wb5html-hd_oral_sc06-7 | hd_oral_sc06_8 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F4A1} 交际得体度与母语负迁移提示：\\u{1F31F} 饮品量词黄金', '\\u{1F469}\u200d\\u{1F373} 角色 A：Thank y |
| wb5html-hd_oral_sc07-5 | hd_oral_sc07_6 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F4A1} 交际得体度与母语负迁移提示：\\u{1F31F} 语序防反口诀'] +['\\u{1F4A1} 交际得体度与母语负迁移提示：\\u{1F31F} s |
| wb5html-hd_oral_sc07-10 | hd_oral_sc07_11 | scene | T16 定版重建（语义指纹差异）｜字符串: -["\\u{1F469} 角色 B：Wow, half price! Let's bu", '哇，半价耶！我们买两盒吧！', "Wow, half price! Let's  |
| wb5html-hd_oral_sc08-2 | hd_oral_sc08_3 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F467} 角色 B：My home is near, so I usu', '我家很近，所以我通常步行来。你呢？ — 我坐公交车来！', 'My home i |
| wb5html-hd_oral_sc09-0 | hd_oral_sc09_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F4A1} 交际得体度与母语负迁移提示：\\u{1F31F} 三大同义高分', '\\u{1F467} 角色 B：Wow, sounds great! Have |
| wb5html-hd_oral_sc10-0 | hd_oral_sc10_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F467} 角色 A：Thank you! The same to yo', '谢谢！你也一样！', 'Thank you! The same to you!' |
| wb5html-hd_oral_sc10-1 | hd_oral_sc10_2 | scene | T16 定版重建（语义指纹差异）｜字符串: -['w', '\\u{1F4A1} 交际得体度与母语负迁移提示：\\u{1F31F} 共同节日回应', 's'] +['\\u{1F4A1} 交际得体度与母语负迁移提示：\\ |
| wb5html-hd_oral_sc10-2 | hd_oral_sc10_3 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F467} 角色 A：Thank you! The same to yo', '谢谢！你也一样！', 'Thank you! The same to you!' |
| wb5html-hd_oral_sc10-7 | hd_oral_sc10_8 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F4A1} 交际得体度与母语负迁移提示：回应节日或周末祝福。'] +['\\u{1F4A1} 交际得体度与母语负迁移提示：回应节日或周末祝福：对方的祝福若'] |
| wb5html-hd_oral_sc11-0 | hd_oral_sc11_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -["\\u{1F466} 角色 A：Thanks. I'll call later.", '谢谢，我稍后再打。', "Thanks. I'll call later."] + |
| wb5html-hd_oral_sc11-1 | hd_oral_sc11_2 | scene | T16 定版重建（语义指纹差异）｜字符串: -["\\u{1F466} 角色 A：Thanks. I'll call later.", '谢谢，我稍后再打。', "Thanks. I'll call later."] + |
| wb5html-hd_oral_sc11-2 | hd_oral_sc11_3 | scene | T16 定版重建（语义指纹差异）｜字符串: -["\\u{1F469} 角色 A：Thanks. I'll call later.", '谢谢，我稍后再打。', "Thanks. I'll call later."] + |
| wb5html-hd_oral_sc12-0 | hd_oral_sc12_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -["\\u{1F469}\u200d⚕️ 角色 A：Thank you. I'll have a", '谢谢，我会休息。', "Thank you. I'll have a  |
| wb5html-hd_oral_sc12-1 | hd_oral_sc12_2 | scene | T16 定版重建（语义指纹差异）｜字符串: -["\\u{1F469}\u200d⚕️ 角色 A：Thank you. I'll have a", '谢谢，我会休息。', "Thank you. I'll have a  |
| wb5html-hd_oral_sc12-2 | hd_oral_sc12_3 | scene | T16 定版重建（语义指纹差异）｜字符串: -["\\u{1F469} 角色 A：Thank you. I'll have a re", '谢谢，我会休息。', "Thank you. I'll have a rest. |
| wb5html-hd_oral_sc12-7 | hd_oral_sc12_8 | scene | T16 定版重建（语义指纹差异）｜字符串: -["\\u{1F466} 角色 A：Thank you. I'll have a re", '谢谢，我会休息。', "Thank you. I'll have a rest. |
| wb5html-hd_oral_sc12-8 | hd_oral_sc12_9 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F4A1} 交际得体度与母语负迁移提示：\\u{1F31F} 黄金问答锁死', "\\u{1F466} 角色 A：Thank you. I'll have a  |
| wb5html-hd_oral_sc14-3 | hd_oral_sc14_4 | scene | T16 定版重建（语义指纹差异）｜字符串: -["核心交际句：How tall are you? — I'm 1.6 metres", '\\u{1F4AC} 日常用语 · 爱好与运动 · How tall are yo |
| wb5html-hd_oral_sc15-3 | hd_oral_sc15_4 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F4A1} 交际得体度与母语负迁移提示：\\u{1F31F} 考场头号防坑', '\\u{1F468} 角色 A：OK. I will.', '好的，我会的。' |
| wb5html-hd_phonics-0 | hd_phonics_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['原理：闭音节里元音被辅音关在中间，a 永远发三指大嘴短音 /æ/！'] +["闭音节里的 a，多半读短音 /æ/（cat、bag、map）；有几个'变脸王'要"] |
| wb5html-hd_phonics-2 | hd_phonics_3 | scene | T16 定版重建（语义指纹差异）｜字符串: -['\\u{1F46F} 元音组合口诀：两个元音并排走，前面说话(读长音)后面静！'] +['两个元音并排走，多半第一个开口（rain、boat）；ea 是变脸王，有时读 / |
| wb5html-hd_poly_g1_002-0 | hd_poly_g1_002_1 | engine-repoint | poly 头图 BOOK 元素（引擎 poly.js） |
| wb5html-hd_poly_g1_002-1 | hd_poly_g1_002_2 | engine-repoint | poly 头图 BOOK 元素（引擎 poly.js） |
| wb5html-hd_poly_g1_002-2 | hd_poly_g1_002_3 | engine-repoint | poly 头图 BOOK 元素（引擎 poly.js） |
| wb5html-hd_poly_g4_157-0 | hd_poly_g4_157_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['核心意象纽带：明亮发光、没有沉重负担', '② 意象桥梁：明亮发光、没有沉重负担', '③ 引申新义：adj. 轻的（像光一样没有重量，反义词 heavy）'] +['' |
| wb5html-hd_poly_g4_157-1 | hd_poly_g4_157_2 | scene | T16 定版重建（语义指纹差异）｜字符串: -['核心意象纽带：明亮发光、没有沉重负担', '② 意象桥梁：明亮发光、没有沉重负担', '③ 引申新义：adj. 轻的（像光一样没有重量，反义词 heavy）'] +['' |
| wb5html-hd_poly_g4_157-2 | hd_poly_g4_157_3 | scene | T16 定版重建（语义指纹差异）｜字符串: -['核心意象纽带：明亮发光、没有沉重负担', '② 意象桥梁：明亮发光、没有沉重负担', '③ 引申新义：adj. 轻的（像光一样没有重量，反义词 heavy）'] +['' |
| wb5html-hd_poly_g4_174-0 | hd_poly_g4_174_1 | engine-repoint | poly 头图 BOOK 元素（引擎 poly.js） |
| wb5html-hd_poly_g4_174-1 | hd_poly_g4_174_2 | engine-repoint | poly 头图 BOOK 元素（引擎 poly.js） |
| wb5html-hd_poly_g4_174-2 | hd_poly_g4_174_3 | engine-repoint | poly 头图 BOOK 元素（引擎 poly.js） |
| wb5html-metaphor_code-3 | metaphor_code_4 | scene | T16 定版重建（语义指纹差异）｜字符串: -['@@B:25fb6deea4914712@@', '@@B:e3e98fe079f88ee7@@', '要小心：中文的「前」有时指过去，比如「以前」「前天」；英语的 fo |
| wb5html-past_clans-3 | past_clans_4 | scene | T16 定版重建（语义指纹差异）｜字符串: -['② 铁律', '黄金铁律：看原形里有没有字母 a：有 a 写 -aught，没有 a 写 -ou', '原形有 a → -aught'] +['② 小名单', '-aug |
| wb5html-pron_map-1 | pron_map_2 | engine-repoint | auto.js 金句卡去重豁免：结尾口诀/系列名回归 |
| wb5html-pron_map-2 | pron_map_3 | engine-repoint | auto.js 金句卡去重豁免：结尾口诀/系列名回归 |
| wb5html-tense_matrix-0 | tense_matrix_1 | scene | 场景脚本引用旧引擎缺失的共享成员: assertBallGeometry, drawElement |
| wb5html-tense_matrix-4 | tense_matrix_5 | scene | T16 定版重建（语义指纹差异）｜字符串: -['口诀：过去做完，结果留到现在 → have / has + 过去分词！', '口诀：过去做完，结果留到现在，就用 have / has + 过去分词！', '动作在过去做 |
| wb5html-tense_matrix_p2-0 | tense_matrix_p2_1 | scene | 场景脚本引用旧引擎缺失的共享成员: assertBallGeometry, drawElement |
| wb5html-tense_matrix_p3-0 | tense_matrix_p3_1 | scene | 场景脚本引用旧引擎缺失的共享成员: assertBallGeometry, drawElement |
| wb5html-tense_matrix_p4-0 | tense_matrix_p4_1 | scene | 场景脚本引用旧引擎缺失的共享成员: assertBallGeometry, drawElement |
| wb5html-vv_give_out-0 | vv_give_out_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['@@B:0394009a6e419120@@'] +['@@B:22f9ea2bfa262b7a@@'] |
| wb5html-vv_give_up-1 | vv_give_up_2 | scene | T16 定版重建（语义指纹差异）｜字符串: -['@@B:e7e45f3ad74e6bda@@'] +['@@B:fa474145622ef704@@']；数字字面量集变化 |
| wb5html-vv_look_down-0 | vv_look_down_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['@@B:25fb6deea4914712@@', '@@B:e3e98fe079f88ee7@@'] +['@@B:743af0d415e127eb@@', '@@B:3 |
| wb5html-vv_look_down-1 | vv_look_down_2 | scene | T16 定版重建（语义指纹差异）｜字符串: -['@@B:25fb6deea4914712@@', '@@B:e3e98fe079f88ee7@@'] +['@@B:743af0d415e127eb@@', '@@B:3 |
| wb5html-wo_europe-0 | wo_europe_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['欧元：Euro- 就是「欧洲」：欧洲很多国家一起用的钱，叫 euro（欧元），1', '1996 年起用这个名字'] +['欧元：Euro- 就是「欧洲」：欧洲很多国家一 |
| wb5html-wo_grimm-0 | wo_grimm_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['口诀：辅音挪一格：p 变 f，t 变 th，d 变 t，k 变 h；小词变了，大', '格林定律：辅音挪一格——p 变 f，t 变 th，d 变 t，k 变 h；小词变' |
| wb5html-wo_grimm_more-0 | wo_grimm_more_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['口诀：辅音挪一格：p 变 f，t 变 th，d 变 t，k 变 h；小词变了，大', 'p 变 f，t 变 th，d 变 t，k 变 h；', '小词变了，大词没变！'] |
| wb5html-wo_grimm_rows-0 | wo_grimm_rows_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['口诀：辅音挪一格：p 变 f，t 变 th，d 变 t，k 变 h；小词变了，大'] +['@@B:79e9ccbed1dffc86@@', '@@B:279e09089 |
| wb5html-wo_grimm_voiceless-0 | wo_grimm_voiceless_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -[] +['@@B:79e9ccbed1dffc86@@', '@@B:279e09089dff164a@@']；数字字面量集变化 |
| wb5html-wo_rule_assim-0 | wo_rule_assim_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['in 加在词前面表示「不」。可是 in 碰到 p、l、r 的时候，会变成和后面一'] +['in- 有两个：表示「不」的（incorrect）和表示「入」的（import |
| wb5html-wo_vowel_a-0 | wo_vowel_a_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['古英语：一千多年前的英语。那时想表示「好几个」，要在词尾加一个 -i。'] +['古英语：一千多年前的英语。那时有些词的词尾（后一个音节里）带着一个 -i，前面的'] |
| wb5html-writing_alchemist-0 | writing_alchemist_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['口诀：换掉老词加状语，感叹句和连接词一用，60 分秒变 100 分！'] +['口诀：换掉老词加状语，感叹句和连接词用得好，作文更出彩！（句式只是评分的一面：内'] |
| wb5html-ze_be-0 | gen_sentence_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['这一幕：为什么不能说 I am like apples？', '\\u{1F500}「是」≠ be（原理 ④ 一山不容二虎）', '一个句子，一个国王'] +['n',  |
| wb5html-ze_borrow-0 | ze_borrow_1 | engine-repoint | auto.js 金句卡去重豁免：结尾口诀/系列名回归 |
| wb5html-ze_link-0 | ze_link_1 | engine-repoint | auto.js 金句卡去重豁免：结尾口诀/系列名回归 |
| wb5html-ze_mark-0 | ze_mark_1 | scene | auto.js 金句卡去重豁免：结尾口诀/系列名回归 |
| wb5html-ze_modifier-0 | gen_viewpoint_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['这一幕：为什么英语的长修饰语要放在名词后面？', 'the boy', 'w'] +['这一幕：形容词站在名词前面还是后面？看它的「重量」。', 'a red apple |
| wb5html-ze_pronoun-0 | ze_pronoun_1 | engine-repoint | auto.js 金句卡去重豁免：结尾口诀/系列名回归 |
| wb5html-ze_same-0 | ze_same_1 | scene | T16 定版重建（语义指纹差异）｜字符串: -['口诀：谁做什么顺序同，颜色大小放前头，数字在前加个 s！', '谁做什么顺序同，', '数字在前加个 s！'] +['口诀：谁做什么顺序同，颜色大小放前头，数字站在名词前 |
| wb5html-ze_subject-0 | ze_subject_1 | scene | auto.js 金句卡去重豁免：结尾口诀/系列名回归 |
| wb5html-ze_wear-0 | ze_wear_1 | scene | auto.js 金句卡去重豁免：结尾口诀/系列名回归 |
| wb5html-ze_yesno-0 | ze_yesno_1 | engine-repoint | auto.js 金句卡去重豁免：结尾口诀/系列名回归 |
