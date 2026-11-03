# 复习池统一题源接口（v2 建议第 1 件）实施报告

基线：远端 master df082c2；改动在独立克隆 `~/workspace/work-clones/review-pool`，未 commit/push。
改动文件 2 个：`laws-prototype/mengxing-prototype-v1.html`（+80/−23 行）、新增 `laws-prototype/tools/extract_review_data.py`。

## 一、题源普查（逐源实测）

| 题源 | 题量 | 题型结构 | 池题型映射 | 备注 |
|---|---|---|---|---|
| LAWDATA quiz/prb（旧） | 281+238 | quiz{q,opts?,a,h} / prb{id,title,task,mis,rubric,remedy} | 原样 | 含运行时 overlay 合并后的 390 条 |
| RV_TA 时态站（旧） | 87 | {id,prompt,options/build,answer,reason,...} | 原样 | |
| RV_SPINE 拼读过关（旧） | 594 | gate{word,ph,mn,em} | 原样 | |
| **代词区 PN LAWS.quiz** | **66** | {q, ans, hint}（无选项，自答自核） | kind=reveal：q→q，ans→a，hint→h | 33 条规律×2 |
| **冠词区 AR LAWS.quiz** | **42** | 同上 | 同上 | 21 条规律×2 |
| **连词区 CJ LAWS.quiz** | **30** | 同上 | 同上 | 12 条规律 |
| **词根区 morph DATA.pages[].quiz** | **280** | {stem, options, answer=下标, hint} | kind=choice：stem→q，options→opts，options[answer]→a，hint→h | 91 页有题（共 126 页） |
| **介词区 V7 卷宗 quiz** | **144** | {type:prep/sense, q, opts, ans, full, head, sense} | kind=choice：填空型题干加「选一个词填进去：」、义项型加「这句话里，它是哪个意思？」前缀（与原 pvQuizCard 呈现一致）；full+sense+head 拼入 reason | 43 卷宗全有；其中填空 112、义项 32 |
| **介词区 V7 卷宗 maze** | **34** | {q, opts, ans, full, head} | kind=choice，同上 | 14 卷宗；关卡题面本身自足，抽为独立选择题不丢信息 |
| LAWREG（16 条） | 0 | 无 quiz 字段 | — | 其页面练习经 morph 页入池（下行） |
| S-44 的题 | 10 | 在 morph 页 if-past（5）+ if-plural（5），两页 laws 均含 S-44 | 随词根源入池 | -ed 三读 / -s 三读 |
| 词源区 ET | 0 | 2,278 条记录无 quiz 结构 | **跳过登记**：该区本无练习集 | |
| 口语区 SP | 0 | SP_DATA 无 quiz | **跳过登记**：该区无测验数据 | |
| 动词 VB | — | 有独立 SRS（mx_vb_srs 等专属键） | **不动**：不在本单范围，维持双轨现状（v2 已登记） | |

专区题面进入复习引擎的通道：PN/AR/CJ 的 LAWS 在各自 IIFE 内、morph DATA 与 V7 亦然，复习 IIFE 运行时不可见。沿用 RV_TA/RV_SPINE 的「build time 自本文件模块逐字提取」先例，但补上生成纪律：新增 `tools/extract_review_data.py`（--check/--write），把三处题面逐字提取为 `RV_ZONE/RV_MORPH/RV_PREP` 三个字面量（带 GENERATED 标记），插在 RV_TA/RV_SPINE 数据块之后。题面一字未改；提取器 --check 逐字节 PASS。

## 二、统一接口（适配器架构）

`buildPool` 改为六个题源适配器 + 汇总去重：`SOURCES=[srcLAWDATA, srcTA, srcSpine, srcZone, srcMorph, srcPrep]`，每源一个函数把本区题规范化为池题型（key/题干/选项/答案/解析/回链目标）后 push，buildPool 只负责汇总、按 key 去重（先到者胜、冲突记入 DUPKEYS，RV.dups() 可查）与建 BYKEY。旧三源的循环体逐字保留、字段与赋值顺序不变，仅 `items.push` 改走 push 并补 `famk`（家族键）一字段。

家族（FAMS 标签页）：删 `system 🧭 小系统`；新增 `pron 👥 代词`、`art 🧢 冠词`、`conj 🔗 连词`、`morph 🌱 词根`、`prep 📍 介词`。famMatch 改为 `it.famk===f`，旧题 famk 由显示区等价表导出，与旧 famMatch 逐项等价（已用队列 key 列表实测证明，见四）。账本统计行新增专区/词根/介词三类计数。

回链（「回机制」按钮分发）：ta→VB.openTA（原样）；pn/ar/cj→对应专区 go(规律id)；mz→MZ.openPage(页id)；pk→全局 show('prep') + PK.show('w-'+slug)（介词卷宗是 #v-prep 内的 pkview 子视图，须两步）；其余→LAW.open（原样）。错题本的回机制按钮同步带 zsrc/page/slug 属性。

## 三、新规律 10 条入池（此前为 0）

| 规律 | 题数 | 来源 |
|---|---|---|
| PR-12 / PR-13 / PR-14 / PR-15 | 各 2，共 8 | PN 专区 quiz |
| GR-46 / GR-47 | 各 2 | CJ 专区 quiz |
| GR-48 / GR-49 / GR-50 | 各 4 | CJ 专区 quiz（合并立条各含两条候选的题） |
| S-44 | 10 | 词根区 if-past 5 + if-plural 5（页 laws 含 S-44） |
| 合计 | **34** | 10 条规律全部有题进池 |

## 四、前后对账（jsdom 实跑 buildPool）

| 项 | 改前 | 改后 |
|---|---|---|
| 池题总数 | 1,200 | **1,796**（+596 = 专区 138 + 词根 280 + 介词 178） |
| 构成 law/probe/ta/gate | 281/238/87/594 | 281/238/87/594（不变）+ zone 138 / morph 280 / prep 178 |
| 旧 1,200 key | — | **全保留、相对顺序不变、字段逐项深比零差异**（仅新增 famk 字段；56 题 zone 改名见五） |
| 旧家族队列（vocab/grammar/ta/expr/phon） | — | buildQueue 返回 key 列表**逐项相同** |
| 今日队列 | 20 题 | 構成随新题加入更新（到期题仍优先；各人进度按 key 存储，不受影响） |
| key 冲突丢弃（DUPKEYS） | — | **0**（1,796 唯一 key = 1,796 题） |

## 五、小系统僵尸族 56 题去向（题不丢、key 不动、只改归属）

FAMS 已删「🧭 小系统」。56 题按其 LAWDATA 指针记录的现行户口（ptr.zone）重新归族：

| 新归属 | law 题 | probe 题 | 小计 | 规律 |
|---|---|---|---|---|
| 冠词（art） | 20 | 15 | 35 | C-01~C-20 |
| 代词（pron） | 11 | 10 | 21 | PR-01~PR-11 |
| 合计 | 31 | 25 | **56** | 与 v2 实测（law 31 + probe 25）吻合 |

这些题的显示区同步由「小系统」改为「冠词」/「代词」（字段深比中仅此 56 题的 zone 有差异，其余旧题零差异）。

## 六、去重与重复规则（实测）

- **同 key 冲突**：先到者胜、后到丢弃并计数。本次实测冲突 0。
- **同题干不同 key**：保留全部（归属不同即不同题）。新题中同题干组 45 组/95 题：44 组为跨页重复（如「refer 应该怎么拆？」同时出现在 pf-re 与 rt-fer 页——前缀页与词根页从不同零件考同一词，属设计）；1 组为同页系列题共用题干模板（gl-main 五道「下面哪个拆法是假拆？」选项各不相同）。无真重复。

## 七、SRS 兼容与会话冒烟（jsdom 实测）

- 预置旧版 mxReviewV1 存档（items/wrong/fixed）加载正常，旧 key 盒位原样保留（LQ:PR-01:0 b=3）。
- 新题三类各抽一题走完「错题本点练→作答→升盒出本」：PN:PR-12:0（reveal 型）、MZ:if-past:0（choice 型）、PK:in:0（choice 型），答对后均 b=2、错题本清除。
- 回链三路实点：PN 题→#v-pron-detail 可见；MZ 题→#v-morph-detail 可见；PK 题→#v-prep + #pkv-w-in 均激活且卷宗内容已建。
- check_all.py **8/8 PASS**（含 gen_et：ET 载荷 3,051,833 字符逐字节一致，verified 1816 / pending 462 不变）；extract_review_data.py --check PASS。
- section 计数：改前/改后 `<section` 均 65/65（script 块 20→21，为新增提取数据块）。

## 八、过程事故一条（请主会话留意）

初版改动使 `gen_laws --check` 报错：gen_laws 的 find_block 按签名「window.PN」取**首个**命中块，我在复习引擎里写的 `window.PN&&...` 让靠前的复习块顶掉了真正的 PN 块。已改：回链分发改为动态访问 `window[zsrc.toUpperCase()]`，复习引擎内不再出现该字面量；提取器签名同步收紧为 `window.PN = {` 等精确形。**遗留脆弱性**：今后任何在专区块之前新增的、含 `window.PN/AR/CJ` 字面量的代码都会再次顶掉 gen_laws 的块定位——这是 gen_laws 签名过松的既有隐患，本单未动 gen_laws（不在授权面），登记在此供后续处理。

## 回报四数

- **前后池题数与构成**：1,200 → 1,796；旧构成 281/238/87/594 不变，新增 zone 138 / morph 280 / prep 178。
- **新入池逐源数**：PN 66、AR 42、CJ 30、词根 280、介词 178（quiz 144 + maze 34）；新规律 10 条合计 34 题（此前 0）。
- **僵尸族 56 题去向**：冠词 35（C-01~20）+ 代词 21（PR-01~11），题与 key 全保留。
- **key 兼容结论**：旧 1,200 key 全保留、顺序与字段不变（除新增 famk 与 56 题归属改名），mxReviewV1 存档加载与升降盒实测正常——**用户既有复习进度零损失**。
