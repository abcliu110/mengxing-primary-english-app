# 切换阶段 3 报告：拼读卡面与词页数据生成化（最后一阶段）

日期：2026-11-03 ｜ 基线：HEAD `7b1425e`（切换阶段 2）｜ 状态：**全部改动在工作区，未 commit、未 push**，待主会话验收
生成器：`laws-prototype/tools/gen_phonics.py`、`laws-prototype/tools/gen_words.py`（均新增）
受认可改路径新增两条：**改总表 → `gen_phonics.py --write` / `gen_words.py --write` → 两脚本 `--check` + `gen_morph` / `gen_laws` / `check_morph_sync` 全绿**

## 改动集（git status）

| 文件 | 变化 |
|---|---|
| `laws-prototype/mengxing-prototype-v1.html` | 14,414,956 → 14,414,546 字符（**−410**）；字节 18,449,124 → 18,448,350（−774）；git diff 为 **1 个 hunk**（block 6 的 DATA 字面量整行替换），其余 18 个 script 块与全部非 script 本体逐字节未动 |
| `laws-prototype/tools/gen_phonics.py` | 新增 |
| `laws-prototype/tools/gen_words.py` | 新增 |

---

## 一、内嵌位置普查

### 拼读（block 6，IIFE，无 window 导出，委托点击导航）

| 字面量 | 规模 | 处置 |
|---|---|---|
| `const DATA = {patterns[174], bank{2499}, groups{5}, gorder[5]}` | 582,180 字符 | **gen_phonics 生成目标**（锚 `const DATA = ` + 字面量以 `{"patterns"` 开头过滤，全文件 3 处同名锚过滤后命中 1） |
| `const X2 = {drill, chains, hearts, heartPending, heartDecodable, spine}` | 208,816 字符 | 呈现层练习 + 脊柱/检查点——Wave 4 已登记不属总表四源，**不在本阶段范围，未动**（脊柱/checkpoints 登记性差异按任务要求不处理） |
| `PHX_PROBES` / `PHX_PROBES_NOSURFACE` | 9,609 / 13,408 字符 | 理解探针呈现数据，不在总表范围，未动 |

DATA.bank 的消费者只有 block 6 自身（28 处引用：wordCard / 练习 / 拼词回补等）；`DATA.patterns` 经 `PATS` 索引与 `grp` 过滤渲染组页。模式页即组页：`patternPage(id) = openGroup(GKEY(p), id)`，按 `data-grp="g|ph"` 委托点击进入。

### 词页 VC（block 0，`window.VC` 导出）

| 字面量 | 规模 | 处置 |
|---|---|---|
| `var WLIST = [[...]]`（2,351 行 × 22 列） | 819,750 字符 | **gen_words 生成目标**（锚 `var WLIST=`，全文件命中 1） |
| `var WPAGE = {"<行号>": {...}}`（2,204 条） | 426,976 字符 | **gen_words 生成目标**（锚 `var WPAGE=`，命中 1） |
| `GROUPS`（主题分组 idxs 索引） | 14,688 字符 | WLIST 的派生索引，非 Wave 3 登记源，未动（WLIST 内容不变，索引自洽） |
| `PHG`（拼读落点分组，含 pid + 词形表） | 142,374 字符 | 派生呈现索引（由模式成员 × 词形拼装），两总表均无此分仓，**不在本阶段范围，登记备查**，未动 |
| `MZLAND` / `MZPAGE`（词根落点） | 26,531 / 6,694 字符 | 词根域数据（阶段 1/2 域），未动 |
| `EXAMPLES` / `QUIZZES` | 手写 JS（非纯 JSON） | 旗舰手写内容，未动 |

WLIST/WPAGE 的消费者只有 block 0 自身（WLIST 14 处、WPAGE 3 处引用）。

### 序列化格式实测（与任务简报的一处出入）

简报称「复用阶段 1 紧凑 JSON 结论」——**实测本文件这两块不是紧凑格式**：DATA / WLIST / WPAGE 三段均为 Python json **默认分隔符**（`", "` / `": "`）、`ensure_ascii=False`、UTF-8 原样。判据：三段字面量解析后以默认分隔符 `json.dumps` 可**逐字节复现**（紧凑格式长度明显不符：DATA 紧凑 518,022 vs 现行 582,180）。两生成器按实测格式实现，报告以字节为准。

### 顺序口径（两处「内容以总表为准、顺序以现行文件为模板」）

- **patterns 顺序**：现行文件是按 `gorder` 分组编排的展示序（组内渲染保序，顺序即 UI 顺序）；总表 patterns 序 = wordsets 登记序（后登记的 7 个模式追加在末尾、跨组交错，如 GP-o-ʌ 在登记序第 168 位、在展示序第 54 位且居短元音组第 6）。总表未存展示序，生成器以现行顺序为模板、逐 id 取总表内容，并硬断言 id 集合全等——未来总表增删模式会使 `--check` 立即失败而非静默重排。**登记建议**（不裁定）：若日后要让顺序也归总表管辖，需给总表 patterns 增设展示序字段，属后续波次议题。
- **WPAGE 键序**：键为整数型字符串，JS 对象迭代恒按数值序，文本序无语义；总表未存文本序，同上以现行文件为模板。
- bank 键序可由总表 cards 分仓顺序完全导出（与现行实测全等，生成器硬断言），不需模板。

---

## 二、gen_phonics 差异清单（57 处，全部已判，逐条见附录）

构建规则：patterns 内容取总表 `embedded` 分仓（`w` 以 `members` 正本为准，两者硬断言全等；wordsets 描述字段按映射逐项对账，173 模式全等、仅 GP-o-ʌ menu 例外）；bank 卡面取 words_master `phonics_cards` 分仓并与总表 snapshot 分仓逐卡断言一致；groups/gorder 取 `embedded_groups`（与现行断言全等）。

| 类 | 处数 | 内容 |
|---|---|---|
| 模式字段（已判） | 1 | GP-o-ʌ `menu`: `''` → `'短元音'`（Wave 4 已判从 wordsets 源头） |
| 卡面释义·简写补全（49 条已判之卡面侧） | 25 | 卡面「X 的过去式」→ 词库正本「X 的过去式/过去分词」，如 said/got/heard/bought 等不规则动词卡 |
| 卡面释义·整族口径（31 条已判） | 31 | 代词词族 30 张卡：整族合并释义 → 词库逐词释义（如 I 家族四卡分别改为「我（主格·永远大写）」「我（宾格·放动介后）」等）；left 1 张：单义「左/左边」→ 词库全义「左/左边；leave 的过去式/过去分词」。整族合并释义只保全在总表分仓与冲突记录中，不再作卡面释义（Stewart 2026-11-03 裁定） |
| 四张音标修正卡（57a9bb5） | 0（零差异验证） | heard /hɜːd/、gas /ɡæs/、toy /tɔɪ/、math /mæθ/：生成器对四卡音标逐卡断言与现行一致 |

生成器硬断言（任一失败即停）：每张受裁定卡的现行卡面 == 冲突记录 `other`、生成值 == `canonical` == 该词 `wordbank.meaning`、裁定卡恰 56 张；清单外差异（模式字段、卡面其余三元、键集合/键序、groups/gorder）零容忍——写前 `--check` 以「差异路径集合 == 已判集合」全等判定放行。

## 三、gen_words 差异清单（0 处）

WLIST 由 vc 分仓按 `wlist_index`（0..2350 连续唯一、行宽 22、第 21 列 == wordbank_id 逐行断言）重建、WPAGE 由 vc.wpage 按现行键序重建，两段与现行**逐字节全等**，`--write` 为无操作（稳态）。任务所列允许差异逐项核查结论：

- ① 49 条简写：morph 侧 24 词全部无 VC 在册（动词屈折形，Wave 3 已登记）；卡面侧 25 条只存在于拼读 bank（已由 gen_phonics 处理）。VC 在册的冲突词共 32 项 canonical 逐条断言：其 WLIST 释义列**全为词库正本、无一为简写 other**。
- ② 31 条整族口径：同上断言覆盖（31 词 WLIST 释义全为逐词版）；逐词断言其 WPAGE 序列化文本不含整族/简写 other——零命中。
- ③ 四卡音标：gas/toy/math 的 WLIST 音标列与词库 phonetic 断言一致（heard 无 WLIST 行）。

即：VC 内嵌在 Wave 3 对账时已与词库全等，本阶段为纯生成化落盘（把既成事实变成可再生+可校验），无内容变更。

---

## 四、验证结果（逐项）

| # | 验证项 | 结果 |
|---|---|---|
| 1 | `gen_phonics.py --check` 写后复跑 | **PASS**（逐字节一致，退出码 0；写前为退出码 2 + 57 处已判差异清单） |
| 2 | `gen_words.py --check` / `--write` | **PASS**（两段逐字节一致；--write 无操作） |
| 3 | `gen_morph.py --check` | **PASS**（两文件 DATA/LAWREG 四段逐字节一致） |
| 4 | `check_morph_sync.py` | **PASS**（三方一致） |
| 5 | `gen_laws.py --check` | **PASS**（稳态：现行文件 == 生成结果） |
| 6 | script 语法（node --check 逐块） | **19/19 通过**；且与基线逐块对比**仅 block 6 不同**，其余 18 块逐字节相同 |
| 7 | 结构平衡 | `<section>` 开/合 **63/63**（与基线同） |
| 8 | 防回退计数 | ET **verified 1816 / pending 462**；拼读 **174 模式、Σn = Σw = 11,375 对**；**词卡 2,499 键**；GP-o-ʌ menu 已为「短元音」 |
| 9 | DOM 冒烟 · 复习池 | `buildPool()` 前后均 **1200 题**（law 281 / probe 238 / ta 87 / gate 594），**全部题项 key/fam/law/zone/kind 逐项相同** |
| 10 | DOM 冒烟 · 拼读首页 | 哈希与基线**全等**（menu 不在首页露出） |
| 11 | DOM 冒烟 · 拼读组页（167 页全量点击） | 120 页哈希全等；**47 页变化**，逐节 token 级归因：48 个变化的模式节（恰为含 56 张受裁定卡的 48 个模式）内共 203 处非等值操作，**全部**为已判释义替换（199 处整串替换 + 4 处规律页小测题干内嵌释义替换，逐条可归因于单一裁定）；同页未受影响模式节逐节全等 |
| 12 | DOM 冒烟 · 拼读其余表面 | 心脏词索引 + 心脏词页 **91/91 全等**、脊柱页全等、拼读规律页（v-phon-laws）全等 |
| 13 | DOM 冒烟 · VC 词页抽样 | **61 页**（含全部在册冲突词 35 页、修正卡 gas/toy/math、每 97 行系统抽样）哈希**逐页全等** |
| 14 | jsdom 环境报错 | 前后同为 2 条（canvas getContext 未实现及其连带，基线固有，与本次改动无关） |

## 五、需要主会话/Stewart 知悉的一处渲染副作用（未擅自处理）

GP-o-ʌ 的组页（`o|/ʌ/`，该组仅此 1 个模式）副标题模板为 `'… · 长音 ' + menu + ' 的一条路'`（模板预设 menu 只用于长音菜单）。menu 按裁定填「短元音」后，该页副标题渲染为：

> o 读 /ʌ/ **· 长音 短元音 的一条路**

数据无误（裁定原文），是呈现模板与新数据口径的措辞冲突。修法是模板侧一处小改（如按 menu 值决定前缀或去掉硬编码「长音」），属代码改动、不在本阶段数据生成范围，**已停在此处登记**，请主会话决定是否另行处理。除此页外，全站再无任何页面因 menu 变化而改变（首页、脊柱、心脏、规律页均全等）。

## 六、范围与纪律备忘

- checkpoints 与 X2.spine 的登记性差异（文件 meta 160 站时代口径、addendum 基线 2,287/2,352/2,473 三数并存）按任务要求**只登记未处理**，总表 `checkpoints`/`notes` 已在案，本阶段未动 X2 与 PHREG（block 7）任何字节。
- 未改任何事实源迁就内嵌：两总表文件本阶段零改动；已判项一律以总表裁定值生成。
- 未 commit、未 push（按任务纪律，待主会话验收）。390px 像素级复测仍受本机 headless 环境限制，本阶段验证为 jsdom DOM 级，与前两阶段口径一致。

## 附录：57 处已判差异逐条清单

| # | 类 | 位置 | 旧值 | 新值 | 判据 |
|---|---|---|---|---|---|
| 1 | 模式字段 | GP-o-ʌ.menu | '' | '短元音' | GP-o-ʌ menu 已判从 wordsets |
| 2 | 卡面释义（简写补全） | bank.G6_294（bought） | 买，购买（buy的过去式） | 买，购买（buy的过去式/过去分词） | words_master conflicts 裁定 canonical=wordbank.meaning |
| 3 | 卡面释义（简写补全） | bank.V6_MORPH_30（brought） | bring的过去式(带来了) | bring的过去式/过去分词(带来了) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 4 | 卡面释义（简写补全） | bank.V6_MORPH_53（built） | build的过去式(建造了) | build的过去式/过去分词(建造了) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 5 | 卡面释义（简写补全） | bank.V6_MORPH_32（caught） | catch的过去式(抓住了) | catch的过去式/过去分词(抓住了) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 6 | 卡面释义（简写补全） | bank.V6_MORPH_54（found） | find的过去式(找到了) | find的过去式/过去分词(找到了) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 7 | 卡面释义（简写补全） | bank.V6_MORPH_25（had） | have/has的过去式(有/吃了) | have/has的过去式/过去分词(有/吃了) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 8 | 卡面释义（简写补全） | bank.V6_MORPH_59（heard） | hear的过去式(听见了) | hear的过去式/过去分词(听见了) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 9 | 卡面释义（简写补全） | bank.V6_MORPH_34（made） | make的过去式(制作了) | make的过去式/过去分词(制作了) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 10 | 卡面释义（简写补全） | bank.G3_KA01（said） | say 的过去式（说了） | say 的过去式/过去分词（说了） | words_master conflicts 裁定 canonical=wordbank.meaning |
| 11 | 卡面释义（简写补全） | bank.V6_MORPH_56（sold） | sell的过去式(卖了) | sell的过去式/过去分词(卖了) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 12 | 卡面释义（简写补全） | bank.V6_MORPH_55（told） | tell的过去式(告诉了) | tell的过去式/过去分词(告诉了) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 13 | 卡面释义（简写补全） | bank.V6_MORPH_48（felt） | feel的过去式(感觉) | feel的过去式/过去分词(感觉) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 14 | 卡面释义（简写补全） | bank.ADD_0110（fought） | fight 的过去式（打斗了） | fight 的过去式/过去分词（打斗了） | words_master conflicts 裁定 canonical=wordbank.meaning |
| 15 | 卡面释义（简写补全） | bank.V6_交通_42（left） | 左/左边 | 左/左边；leave的过去式/过去分词 | words_master conflicts 裁定 canonical=wordbank.meaning |
| 16 | 卡面释义（简写补全） | bank.G3_KA08（got） | get 的过去式 | get 的过去式/过去分词 | words_master conflicts 裁定 canonical=wordbank.meaning |
| 17 | 卡面释义（整族口径/left） | bank.G2_P03#0（he） | 他(主格) / 他(宾格) / 他的(形物与名物同形) | 他(主格) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 18 | 卡面释义（整族口径/left） | bank.G2_P04#1（her） | 她(主格) / 她(宾格) & 她的(形物) / 她的(名物) | 她(宾格)/她的(形物) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 19 | 卡面释义（整族口径/left） | bank.G2_P04#2（hers） | 她(主格) / 她(宾格) & 她的(形物) / 她的(名物) | 她的东西(名物) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 20 | 卡面释义（整族口径/left） | bank.G2_P03#1（him） | 他(主格) / 他(宾格) / 他的(形物与名物同形) | 他(宾格) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 21 | 卡面释义（整族口径/left） | bank.G2_P03#2（his） | 他(主格) / 他(宾格) / 他的(形物与名物同形) | 他的(形物名物同形) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 22 | 卡面释义（整族口径/left） | bank.G3_Q08#0（how） | 怎样，如何 / 多少(问可数复数) / 多少，多少钱(问不可数或价格) | 怎样/如何(问方式/身体) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 23 | 卡面释义（整族口径/left） | bank.G3_Q02#0（who） | 谁（询问人物身份与关系：who主格 / whom宾格） | 谁(问人) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 24 | 卡面释义（简写补全） | bank.V6_MORPH_46（kept） | keep的过去式(保持了) | keep的过去式/过去分词(保持了) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 25 | 卡面释义（简写补全） | bank.V6_MORPH_58（lost） | lose的过去式(丢失/输了) | lose的过去式/过去分词(丢失/输了) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 26 | 卡面释义（简写补全） | bank.G6_290（slept） | 睡觉（sleep的过去式） | 睡觉（sleep的过去式/过去分词） | words_master conflicts 裁定 canonical=wordbank.meaning |
| 27 | 卡面释义（整族口径/left） | bank.G1_P01#1（me） | 我(主格) / 我(宾格) / 我的(形物) / 我的(名物) | 我(宾格·放动介后) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 28 | 卡面释义（简写补全） | bank.V6_MORPH_50（met） | meet的过去式(遇见了) | meet的过去式/过去分词(遇见了) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 29 | 卡面释义（整族口径/left） | bank.G1_P01#3（mine） | 我(主格) / 我(宾格) / 我的(形物) / 我的(名物) | 我的东西(名物·后不接名词) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 30 | 卡面释义（整族口径/left） | bank.G1_P01#2（my） | 我(主格) / 我(宾格) / 我的(形物) / 我的(名物) | 我的(形物·后必接名词) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 31 | 卡面释义（整族口径/left） | bank.G4_P09#0（some） | 一些，某些（肯定句用some，否定和疑问句用any） | 一些(肯定句/礼貌请求) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 32 | 卡面释义（整族口径/left） | bank.G3_P07#1（them） | 他们/她们/它们(主格/宾格) / 他们的(形物/名物) | 他/她/它们(宾格) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 33 | 卡面释义（整族口径/left） | bank.G4_P09#1（any） | 一些，某些（肯定句用some，否定和疑问句用any） | 任何/一些(否定疑问句) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 34 | 卡面释义（简写补全） | bank.V6_MORPH_51（sent） | send的过去式(寄了) | send的过去式/过去分词(寄了) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 35 | 卡面释义（简写补全） | bank.V6_MORPH_52（spent） | spend的过去式(度过/花费) | spend的过去式/过去分词(度过/花费) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 36 | 卡面释义（简写补全） | bank.V6_MORPH_57（won） | win的过去式(赢了·同音one) | win的过去式/过去分词(赢了·同音one) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 37 | 卡面释义（简写补全） | bank.V6_MORPH_47（swept） | sweep的过去式(扫了) | sweep的过去式/过去分词(扫了) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 38 | 卡面释义（整族口径/left） | bank.G3_P06#2（our） | 我们(主格) / 我们(宾格) / 我们的(形物/名物) | 我们的(形物) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 39 | 卡面释义（整族口径/left） | bank.G3_P06#3（ours） | 我们(主格) / 我们(宾格) / 我们的(形物/名物) | 我们的(名物) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 40 | 卡面释义（整族口径/left） | bank.G3_P07#2（their） | 他们/她们/它们(主格/宾格) / 他们的(形物/名物) | 他们的(形物·同音there) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 41 | 卡面释义（整族口径/left） | bank.G3_P07#3（theirs） | 他们/她们/它们(主格/宾格) / 他们的(形物/名物) | 他们的(名物) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 42 | 卡面释义（整族口径/left） | bank.G1_P02#1（your） | 你，你们(主/宾格) / 你的，你们的(形物/名物) | 你的/你们的(形物) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 43 | 卡面释义（整族口径/left） | bank.G1_P02#2（yours） | 你，你们(主/宾格) / 你的，你们的(形物/名物) | 你的/你们的(名物) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 44 | 卡面释义（整族口径/left） | bank.G2_P05#1（its） | 它(主/宾格) / 它的(形物/名物) / 它自己 | 它的(注意无撇号!) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 45 | 卡面释义（简写补全） | bank.ADD_0631（sat） | sit 的过去式（坐） | sit 的过去式/过去分词（坐） | words_master conflicts 裁定 canonical=wordbank.meaning |
| 46 | 卡面释义（整族口径/left） | bank.G3_P08#0（this） | 这，这个 / 那，那个 / 这些 / 那些（指示代词） | 这/这个(近指单数) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 47 | 卡面释义（整族口径/left） | bank.G3_P06#1（us） | 我们(主格) / 我们(宾格) / 我们的(形物/名物) | 我们(宾格·Let's=Let us) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 48 | 卡面释义（整族口径/left） | bank.G3_P08#2（these） | 这，这个 / 那，那个 / 这些 / 那些（指示代词） | 这些(this的复数) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 49 | 卡面释义（整族口径/left） | bank.G3_P08#3（those） | 这，这个 / 那，那个 / 这些 / 那些（指示代词） | 那些(that的复数) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 50 | 卡面释义（整族口径/left） | bank.G2_P04#0（she） | 她(主格) / 她(宾格) & 她的(形物) / 她的(名物) | 她(主格) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 51 | 卡面释义（整族口径/left） | bank.G2_P05#0（it） | 它(主/宾格) / 它的(形物/名物) / 它自己 | 它(主宾同形) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 52 | 卡面释义（简写补全） | bank.V6_MORPH_29（taught） | teach的过去式(教了) | teach的过去式/过去分词(教了) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 53 | 卡面释义（整族口径/left） | bank.G3_P08#1（that） | 这，这个 / 那，那个 / 这些 / 那些（指示代词） | 那/那个(远指单数) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 54 | 卡面释义（简写补全） | bank.G6_0632（thought） | 想法，念头；think的过去式 | 想法，念头；think的过去式/过去分词 | words_master conflicts 裁定 canonical=wordbank.meaning |
| 55 | 卡面释义（整族口径/left） | bank.G3_P07#0（they） | 他们/她们/它们(主格/宾格) / 他们的(形物/名物) | 他/她/它们(主格) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 56 | 卡面释义（整族口径/left） | bank.G3_P06#0（we） | 我们(主格) / 我们(宾格) / 我们的(形物/名物) | 我们(主格) | words_master conflicts 裁定 canonical=wordbank.meaning |
| 57 | 卡面释义（整族口径/left） | bank.G1_P01#0（I） | 我(主格) / 我(宾格) / 我的(形物) / 我的(名物) | 我(主格·永远大写) | words_master conflicts 裁定 canonical=wordbank.meaning |
