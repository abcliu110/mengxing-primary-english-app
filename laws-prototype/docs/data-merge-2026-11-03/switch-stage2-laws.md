# 切换阶段 2 报告：规律数据生成化 + LAWDATA 降指针

日期：2026-11-03 ｜ 基线：HEAD `c70c588`（切换阶段 1）｜ 状态：**全部改动在工作区，未 commit、未 push**，待主会话验收
生成器：`laws-prototype/tools/gen_laws.py`（新增）｜ 受认可改路径新增一条：**改总表/ morph 事实源 → `gen_laws.py --write` → `gen_laws.py --check` + `check_morph_sync.py` 全绿**

## 改动集（git status）

| 文件 | 变化 |
|---|---|
| `laws-prototype/mengxing-prototype-v1.html` | 14,537,503 → 14,414,956 字符（**−122,547**，−0.84%） |
| `laws-prototype/morphology-prototype-v1.html` | 694,831 → 694,720 字节（−111；仅 DATA/LAWREG 两个生成字面量，与主文件逐字节同步） |
| `laws-prototype/model/morph_data.json` | 676,613 → 676,502 字节（−111；LAWREG 改号 + 两页 laws 引用） |
| `laws-prototype/tools/gen_laws.py` | 新增（生成器本体） |

主文件逐 script 块对比（HEAD vs 新）：19 块中仅 **3、11、16、18** 有变化；其余 15 块（含冠词区 block 17——重生成后与原文逐字节相同）全部逐字节一致；非 script 的 HTML 本体逐字节一致。

---

## 一、LAWDATA 消费者普查（2b 的设计前提）

| # | 消费者 | 位置 | 读 LAWDATA 的字段 | 降指针后的处置 |
|---|---|---|---|---|
| 1 | 解码区规律页渲染 `LAW.open/render/adultHtml` + 全局点击委托（`[data-law]`、`[data-say]`） | block 3 | 全部字段（g/zone/aud/hl/kid/mech/exs/exc/cases/quiz/prb/rel/cstmt/ctype/scope/srcs/cev/grade/bnd/disp/gate/pend/nocase/pterm） | `LAW.open` 在 `LAWFLAG` 检查之后、取条目之后新增 ptr 分支：按 `ptr.zone` 跳专区规律页（见下），不再渲染 LAWDATA 页 |
| 2 | 复习引擎 `buildPool()` | block 14（RV） | 每条：`aud`、`g`、`zone`、`mech[0].beat`、`quiz[{q,opts,a,h}]`、`prb[{id,mis,title,task,rubric,remedy}]`（跳过规则：aud=教师/设计层 或 g=PB 或 zone=parents） | **指针记录原样保留这 6 个字段** → 池构成逐项不变（验证见 §四） |
| 3 | 复习「回机制」按钮 | block 14 | 经 `LAW.open(id,'review')` | 走同一 ptr 分支跳专区页 |
| 4 | 词页规律芯片 `lawOk(id)` | block 0（VC） | 仅存在性（`LAWDATA[id] \|\| LAWFLAG[id]`） | 指针记录保留键 → 芯片照常显示，点击经全局委托走 ptr 分支 |
| 5 | 技巧区 `goLaw(id)` | block 12 | 仅存在性 + `LAW.open(id,'tech-detail')` | 同上 |
| 6 | 运行时合并者 `PHONLAWS`（block 4）、`SUPPDATA`（block 12） | 写方 | 向 LAWDATA 注入 S/SR/TM 系条目（与 67 条无交集，已核） | 不受影响 |
| 7 | 语法区等静态 `data-law` 芯片 | HTML 本体 | 经全局委托 → `LAW.open` | 同 1 |

`LAWFLAG`（V-33/V-40/GR-33/CO-17 深链）优先级不变：V-33 虽在 67 条内，仍先走 LAWFLAG 跳 `u-v33` 单元（冒烟已证）。

**指针记录形态**（67 条，键序固定）：
```json
{"id": "<id>", "ptr": {"zone": "pron|art|conj|morph", "id": "<专区条目id>"},
 "g": …, "zone": …, "aud": …, "mech": …, "quiz": …, "prb": …}
```
后六字段与原条目逐字深相等（生成器硬断言，对照总表 lawdata 分仓）。页面渲染字段（hl/kid/exs/cases/成人层等）下线，其内容已在总表 `lawdata` 分仓保全。

**`LAW.open` 新增分支**（block 3，锚定插入）：
```js
if(d.ptr){var zp=window[{pron:'PN',art:'AR',conj:'CJ',morph:'MZ'}[d.ptr.zone]];
  if(zp){if(d.ptr.zone==='morph')zp.openLaw(d.ptr.id);else zp.go(d.ptr.id)} return}
```
词根区原无 window 导出，block 11 IIFE 末尾补一行 `window.MZ={openLaw:renderLaw,openPage:openPage};`（与 PN/AR/CJ 同构；不影响 gen_morph 的字面量比对）。

---

## 二、2a 差异清单（有且仅有裁定引起的变化，共 92 条记录）

生成器在内存中构建并逐条断言：未受裁定条目与现行深相等、冠词区重生成逐字节相同、清单外差异即停。下列为生成器差异记录（86 条）+ morph 事实源差异（6 条，首轮运行产生、经对象级对账复核）。

### 代词区 PN（27 条）
- PR-12/13/14/15（原 NEW-P1–P4）各 6 条：`id` 改号、`cand` 删除、`formal` 去「（新拟条目，待与目录对账）」、`note` 首尾各 1 处转正（「新拟条目（NEW-Px）：」→「本条（PR-1x）：」；「编号…待与目录对账。」→「编号 PR-1x，2026-11-03 立条。」）、`claim` 尾句转正（「本条为原型新拟…编号待对账。」→「本条已于 2026-11-03 立条为 PR-1x。」；PR-14 保留 QI-02 互挂语）。
- PR-15 额外 1 条（pending_fix）：`quiz[0].ans`「B. anything——否定句里 any 上岗」→「B. anything——否定句里多半派 any 上岗（倾向，不是铁律）」。
- TOPIC.sub、GROUPS[5].sub 各 1 条状态文案转正；页脚 1 条（去「状态入模中 / 新拟待对账」，改注立条）。
- 代码字面量键改号 10 条：WB_SECTIONS 4 节 id、DEMOS 2 键、WB_CREDIT 4 键（NEW-Px → PR-1x）。
- **保留未动**：例句注里的「新拟例句」标记——那是例句出处（非语料、原型新配）的真实性标注，非候选状态，删之反而失真。
- PN_EXTRA（11）/ PN_ADULT（28）重生成与现行逐字节相同，0 差异。

### 冠词区 AR（0 条）
- LAWS（21）/ AR_EXTRA（20）/ AR_ADULT（20）全部由总表分仓重生成，**逐字节等于现行字面量**（生成器硬断言 + 写后 block 17 逐字节相同 + 21 条规律页渲染哈希全等）。零差异证明成立。

### 连词区 CJ（39 条）
- 改号立条：NEW-CJ02→GR-46（id、isNew 两条 + pending_fix 三处：「并列连词只有七个：」→「小学阶段常用的并列连词就这七个：」；beats[0].name「封闭集合，只有七个」→「小学阶段常用的，就这七个」；beats[0].text「不多不少就这七个」同口径）、NEW-CJ04→GR-47（id、isNew）。
- 合并立条 3 条：GR-48（CJ05+06，group 1）、GR-49（CJ10+11，group 3）、GR-50（CJ07+12，**group 取 CJ12 的 4**——主题锚在「身兼数职」组，内容顺序仍 CJ07 双连词在前）。合并为机械拼接：short 以「 · 」相连，desc/formal/kid 直接相连，beats/examples/errors/quiz/groups/adult 数组拼接，note 取非空拼接。已独立复算：每字段 == 两条原文拼接 + 下列指称/状态替换。
- 呈现位 3 条：NEW-CJ03/09（并入 GR-38）、NEW-CJ08（并入 GR-32）：isNew→false、加 `merged` 字段（id 不变——GR-38/GR-32 在本区已有正条，同 id 会撞 lawById/stepLaw，故保留槽位 id，与 LAWREG「呈现位挂靠」同理、因撞号而保留原号）。
- 区导引 1 条：NEW-CJ01：isNew→false、加 `guide:true`。
- 正文指称同步 5 条记录（共 15 处）：NEW-CJ04→GR-47 ×6、CJ05→GR-48 ×2、CJ06→GR-48 ×2、CJ07→GR-50 ×3、CJ12→GR-50 ×2（分布于各条 adult/note/beats 正文，含目录条 GR-11 自身的互挂语）。
- 成人层「状态：」段改写 9 条记录（共 12 段）：每条候选原有的「新拟规律，尚未与规律目录对账（待对账）…」按处置改写为立条/并入呈现位/转区导引文案（合并条含两段，一并改写）。
- TOPIC.sub 1 条（15 条新拟口径 → 12 条：定版 8 + 呈现位 3 + 导引 1）；EXTRA_TOP 路线细则 1 条（「细则见 NEW-CJ03、NEW-CJ09 与 GR-38。」→「细则见 GR-38（本区两页呈现：逗号加连词、分号公式）。」）；页脚 1 条。
- 渲染器代码 5 条：index 徽标、规律页徽标、正式说法标签、孩子版标签四处三元逻辑扩展（guide 显示「区导引」、merged 显示「并入 GR-xx · 呈现位」，isNew 语义不变）；FANBOYS 插图挂载条件 `NEW-CJ02`→`GR-46`（分号公式插图挂 NEW-CJ09，id 不变，无需改）。
- CJWB_SECTIONS 代码字面量手术 5 条：GR-46/GR-47 节改号；GR-48（5+4=9 场景）、GR-49（4+4=8）、GR-50（5+4=9）节合并（span 级手术，其余字节原样）。CJFILM 无候选令牌，未动。

### 词根区 LAWREG / morph DATA（6 条，经 morph 事实源 + gen_morph 同步两文件）
- NEW-C → **S-21**：id 改号、`_role` candidate→**presentation**（呈现位：渲染器只特判 candidate/frame，其余按正条呈现，无候选徽标）、boundary 删候选尾句「本条为候选新条，编号待与图鉴对账。」。
- NEW-T → **S-44**：id 改号、`_role` candidate→law、boundary 删同一尾句。
- DATA 页引用 2 条：if-past、if-plural 的 `laws` 数组 NEW-T→S-44（NEW-C 未被任何页引用）。
- 其余 14 条 LAWREG、其余全部 DATA 与现行逐字段相同（对象级对账证）。

### LAWDATA（1 条汇总记录）
- 67 条降指针（代词 29 / 冠词 21 / 词根 14 / 连词 3），157 条逐字段未动（对象级对账 157/157 相同、67/67 指针形态与池字段校验通过）。

### 代码编辑（7 条，已含在上述计数内单列说明）
LAW.open ptr 分支 1、window.MZ 导出 1、PN 页脚 1、CJ 页脚 1、CJ 渲染器 5（与 CJ 节重复计数口径：86 条 = LAWDATA 1 + PN 27 + CJ 39 + CJWB 5 + 代码 14；morph 6 条另计，总 92）。

---

## 三、生成器与受认可改路径

`tools/gen_laws.py`：输入 = `model/laws_master.json`（PN/AR/CJ/LAWDATA 的分仓 + 裁定表内置于脚本头部、逐条注明裁定出处）+ `model/morph_data.json`（LAWREG）。`--write` 流程：内存构建并全断言 → 写 morph_data.json → `gen_morph.py --write` 两文件 → 重定位跨度写主文件 → 写前自检（组装文本逐字面量复核）。`--check` 为稳态校验：现行文件与生成结果逐字节一致才 PASS。序列化格式均已证：各区字面量 = Python json 默认分隔符、LAWREG = compact（经 gen_morph）、morph_data.json = compact + 换行（生成器先做 round-trip 断言才肯重写）。

---

## 四、验证结果（逐项）

| # | 验证项 | 结果 |
|---|---|---|
| 1 | `gen_laws.py --check`（稳态：现行 == 生成） | **PASS**（含内嵌 `gen_morph --check`：两文件 DATA/LAWREG 逐字节一致） |
| 2 | `check_morph_sync.py`（总表 ↔ 两文件三方） | **PASS**（DATA/LAWREG 各三组比对全 PASS，结论「三方一致」） |
| 3 | 全 script 语法（node --check 逐块） | 主文件 19/19、词根页 1/1 通过（HEAD 同为全通过） |
| 4 | DOM 冒烟 · 复习池 | `buildPool()` 前后均为 **1200 题**（law 281 / probe 238 / ta 87 / gate 594），**题 key 集合与逐项构成（key/fam/law/zone/kind）完全相同** |
| 5 | DOM 冒烟 · LAW.open 全量 | 391 个运行时 id 全部打开无错误；**66/66 指针正确跳入专区详情页**（v-pron-detail / v-art-detail / v-conj-detail / v-morph-detail），V-33 仍走 LAWFLAG，其余 324 个 id 的落点与页面哈希与基线**逐一相同、零意外差异** |
| 6 | DOM 冒烟 · 代词区 | 29 条共有规律页渲染哈希全等；PR-12–PR-15 四页正常渲染（新编号）；首页哈希变化仅源于状态文案与改号（预期内） |
| 7 | DOM 冒烟 · 冠词区 | 21 条规律页渲染哈希**全等**；受控探针下首页与 HEAD **逐字节相同**（全量冒烟中首页哈希曾有出入，定性为接力短片帧计时伪影：同文件双跑稳定、HEAD/新文件同口径探针全等） |
| 8 | DOM 冒烟 · 连词区 | 12 条规律页全部渲染至 v-conj-detail；目录条 GR-32/GR-38 哈希不变，GR-11 哈希变化仅因其正文指称 NEW-CJ07→GR-50（裁定内）；合并条 GR-48/49/50 白板节经 CJWB_BY_ID 命中（页内含白板卡） |
| 9 | DOM 冒烟 · 词根区贯通 | 首页 126 张页面卡在位；点开 if-past 页：含 S-44、**不含 NEW-T / 任何 NEW-**；点 S-44 规律块 → 打开「屈折词尾三读」规律页，**无「待对账」徽标**；`MZ.openLaw('S-21')` 打开「拼写守词素」页，同样无候选徽标 |
| 10 | 防回退计数 | ET 载荷 **verified 1816 / pending 462**（block 1 逐字节未动）；拼读 **174 模式 / 11,375 对**（Σw = Σn = 11375，block 6 未动）；词卡相关块（VC block 0、FA block 15、ET bank）逐字节未动——WLIST 2,351 行、ET bank 2,278 条两口径均与 HEAD 相同；任务口径「词卡 2,499」（= 总表 words_master 2,486 + 13 例外功能词）所依的 words_master.json 本阶段未修改 |
| 11 | 结构平衡 | `<section>` 开/合 **63/63**（与 HEAD 相同）；非 script 本体逐字节一致 |
| 12 | 体积 | 主文件 −122,547 字符（指针降载为主）；词根页 −111 字节；morph_data.json −111 字节 |
| 13 | jsdom 环境报错 | 前后均为同 2 条（canvas getContext 未实现及其连带 gkMeasure 报错，语法区固有、与本次改动无关） |

## 五、设计决定备忘（供验收）

1. **指针保留池字段而非纯路由**：若只留 id+ptr，复习池将少 67 条的全部题目（281 条 law 题 + 238 条 probe 的大部）。保留 mech/quiz/prb 后池零变化，代价是降载幅度减小（主文件仅 −0.84%）；页面渲染仍走专区，单一事实源不受影响（池字段的事实源在总表 lawdata 分仓，指针内是生成副本，`gen_laws --check` 把关）。
2. **CJ 合并条单页呈现**：按总表 GR-48/49/50 的 merged_from+parts 模型落为单条规律页（机械拼接、零改写），白板节同理合并；GR-50 版位取 group 4。
3. **CJ 呈现位保留原 id**：与 LAWREG 改号（S-21/S-44 不撞号）的差别仅因撞号约束，处置性质相同（isNew 撤销 + merged 标记 + 状态段改写）。
4. **LAWREG 改号走 morph 事实源**：gen_laws 先改 morph_data.json 再调 gen_morph，使阶段 1 的受认可路径保持唯一；morphology-prototype-v1.html 的变化仅限两个生成字面量。
5. **「新拟例句」标注保留**（见 §二 PN）。

## 六、未做 / 已知事项

- 未 commit、未 push（按任务纪律，待主会话验收）。
- 390px 像素级复测仍受本机 headless chrome segfault 阻塞（exit 139），本阶段未声称任何像素级验证；本阶段验证为 jsdom DOM 级。
- 阶段 3（拼读卡内容与词页由总表生成、删除内容副本）未启动。
