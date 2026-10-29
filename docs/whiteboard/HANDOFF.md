# 交接文档（HANDOFF）· 白板动画与新模块

> 更新：2026-10-29 18:35 JST　｜　接手先读：`MASTER_DESIGN.md`（总设计，19 条决策）→ `SOP.md`（v2.0 标准流程 + 验收清单）→ 本文。
> 用户规矩：直接提交推送 `master`，不新建分支；做完一个单元就提交；发现 bug 直接修；每写完一个文档也立即提交。
> **当前阶段：文档阶段（用户 18:27 指令：先写设计文档和 SOP，暂停一切新功能代码）。下一步写代码前，以 MASTER_DESIGN §4 阶段 1 为起点。**

---

## 1. 当前状态

### 1.1 已上线（提交 `db13720`，2026-10-29）
- **骨架最小集**（通用引擎工具，见 §5）：可信度徽章 `k.badges / k.badge`（📜 💡 ✂️ ⚠️ ❓）+ 页面版 `wbBadgeHtml / wbBadgeLegendHtml`；🥚 彩蛋词 `k.egg`、`say({egg})`、`wbEggHtml`；沿折线移动 `k.path`；5 步溯源幕模板与道具 `cases/wo_props.js`。
- **📖 单词身世总枢**：首页横幅（在第一性原理总枢横幅正下方）→ `word_origins_hub` 页面：手绘世界地图 + 时间线（罗马 → 维京 → 诺曼 → 大航海 → 现代）、徽章图例、白板舞台、章节列表（欧洲文化密码 + 10 个方向，未上线显示「即将上线」）。源文件 `src/wo_hub.js`，登记表 `insert_wb.py` 的 `WO_READY`，验收 `src/appwo.py`。
- **示范幕 port**（`cases/wo_port.js`）：7 个镜头约 132 秒，9 句朗读；出处 `word_origins/SOURCES.md`（11 条 📜，etymonline）。
- 验收：`node --check` 通过；`appwo.py` mounted True、无报错、无 NaN；回归 `appwb.py bamboo_tree`、`appfp.py 0` 通过。

### 1.2 文档阶段提交（本轮）
| 提交 | 内容 |
|---|---|
| `12048d4` | 新增 `MASTER_DESIGN.md`（决策 1–17 落地设计、合并删旧总表、实施阶段） |
| `a3eb7e8` | MASTER_DESIGN §2.5 视觉标准 V1–V8（决策 18） |
| `dc26a82` | MASTER_DESIGN 硬规则 R4 + §2.6 人物动作库（决策 19） |
| `9ce7219` | `SOP.md` v2.0 |
| （本次） | 本交接文档 |

### 1.3 已知不足（按新规则复查 port 幕，阶段 1 要补）
- **R2 朗读**：opportunity 没有例句；Rome、Mediterranean 以外的专有名词和词块（medi、terra、ob、im、ex、trans、re、pass、air、sup）没有单独朗读。
- **R4 动作**：搬运、进出城、过关卡是「箱子 / 卷轴自己移动」+ 火柴人平移，人没有做搬、拿、走的动作；support 没有人托。
- **视觉标准**：配色超出新调色板、只有一种缓动、镜头间是淡出不是擦除、白板上的词不随朗读高亮、没有小人、没有音效。
- 欧洲（Europe）幕的出处已查（etymonline「Europe」：名字来源**不确定**，常被解释为「宽脸」，传统上联系神话公主 Europa；维基百科：腓尼基公主、宙斯化白牛、驮到克里特；中文「欧洲」= 利玛窦《坤舆万国全图》里的「欧罗巴洲」缩写）——**还没写进 SOURCES.md、没写代码**；做的时候名字来源必须标 ❓。

---

## 2. 19 条决策摘要（详见 MASTER_DESIGN §2）

| # | 决策 | 一句话 |
|---|---|---|
| 1 | 格林定律 | 真格林定律放单词身世；原 `vowel_shift` 全部并入为「元音变异」，删旧页签。总规则：重复就删旧并入新 |
| 2 | 中英对照总枢 | 新开；第一性原理里重复的幕搬过去（清单待用户看） |
| 3 | 时间与度量 | 数字 + 星期月份 + 大数换算合成单词身世一章 |
| 4 | 短语动词总钥匙 | 小品词 + 核心义动词合成实验室新页签；`verb_matrix` 并入后删页签，36 个 VV 动画保留 |
| 5 | 实验室三新页签 | 8 个词尾、发音五大坑 + 48 音标口腔地图、语调地图；`stress_rhythm` 重叠部分并入 |
| 6 | 五个新模块 | 拼写潜规则、空间隐喻、合成词重音、不规则复数、交际句型；吸收重叠旧内容后删旧 |
| 7 | 词汇大数据 | 虚词覆盖率 + 80/20 + 来源比例合成一个可视化页 |
| 8 | 家长指南 / 英美对照 / 大写标点 | 都做白板动画；后两个加小测 |
| 9 | 欧洲 6 章 + 美国篇 | 全做 |
| 10 | 懂欧美 ↔ 讲中国 | 双向入口放单词身世总枢 |
| 11 | 溯源幕两边放 | 总枢集中 + 词卡 📖 身世标签跳转 |
| 12 | 身世标签 | 只给有可靠出处 / 故事的词（约一两百个） |
| 13 | 按需加载 | 现在做；点到哪个模块才载入；仍双击即用 |
| 14 | 练习闭环 + 总地图 | 新模块做到一半再加 |
| 15 | 纠错与简化 | 错的直接改；故意简化的标 💡 / ✂️ / ⚠️ |
| 16 | 讲解员小人 | 白板同风格简笔线条小人；形象先给用户看 |
| 17 | **硬规则 R2** | **每个英文词都要有例句，词和句都要朗读**；验收逐幕检查，缺一不可 |
| 18 | 视觉标准 | V1–V8 商业级白板；先用 port 做升级前后对比给用户看 |
| 19 | **硬规则 R4** | **动作词必须由小人或角色演出来**，和朗读同步；人物动作库可复用可扩展 |

---

## 3. 下一步待办（按 MASTER_DESIGN §4 顺序）

**阶段 1 · 骨架补齐**（用户放行写代码后开始）
1. 写朗读覆盖检查脚本（R2）：抽每幕画面上的英文词，对照 `say` 登记，缺的报错；接进 `appwb.py / appfp.py / appwo.py`。
2. 写动作覆盖检查（R4）：分镜动作词清单 ↔ `k.act` 登记。
3. 讲解员小人设计稿（几种姿态一张图）→ **给用户确认**。
4. 人物动作库 v1（走、跑、搬、拿、放、指、举、跳、转身、挥手）+ 视觉标准 V1–V8，**先只升级 port 一幕**，出升级前 / 后对比截图 → **给用户确认**。
5. port 幕补齐 R2、R4（见 §1.3）。
6. 按需加载（`<script type="text/plain">` + 首次进入时执行；首屏耗时对比）。

**阶段 2 起**：Europe、Bluetooth 示范幕 → 身世标签 + 词卡跳转 → 格林定律章（删 `vowel_shift`）→ 时间与度量 → 中英对照总枢（清单确认后）→ 实验室新页签（删 `verb_matrix`）→ 中点加练习闭环和总地图 → 新模块 → 文化各章与家长指南。

**持续**：旧的王炸实验室 39 案例、第一性原理 24 幕按 R2（补朗读）、R4（补动作）、视觉标准逐步升级；先列清单再动手。

## 4. 待用户确认

1. ✅ **中英对照搬迁清单已确认**（2026-10-29）：搬 ④-1（I am like）、⑥-1（先立树干）；⑥-2、⑥-3、③-1、③-4 留在第一性原理。**内容零丢失**：先导出原幕内容清单，逐条对照，新位置验收通过后才删原幕，原位置留跳转入口。
2. **讲解员小人形象**：阶段 1 出设计稿后确认。
3. **port 视觉升级效果**：升级前后对比图确认后再铺开。
4. 决策 6 五个新模块的**具体位置**（MASTER_DESIGN 表里是建议）。
5. 重叠内容的处理（只列出、未删除）：
   - `VOCAB_DB` 里 11 个词的 port 家族 `affix_root`（port、airport、passport、import、export、transport、report、reporter、support、important、sport），airport 的 `etymology` / `memory_tip`；
   - `WORD_FORMATION_DB.roots` 的 port 卡（把港口、搬运写成一个词根，应改成「两条亲戚线」）；
   - 术语「词源」在 `fp_iconicity` 和 `wo_port` 各一条；
   - 第一性原理 ② 字母象形「M 像山」将来和「字母身世」并排（💡 vs 📜）。

## 5. 引擎通用新工具登记（2026-10-29，db13720）
- `k.badges(["📜","💡"], {x,y})`、`k.badge(key, x, y, {label})`；`WB.BADGES` 徽章表；HTML：`wbBadgeHtml(keys)`、`wbBadgeLegendHtml()`。
- `k.egg(x, y, {word, note})`；`k.say(en, { egg: [...] })`；HTML：`wbEggHtml(word)`。
- `k.path(组, 开始, 时长, [[dx,dy],…], {linear})`；`k.arc` 第 5 参数 `{linear}`。
- `header()` 记录 `S.hdrEnd`（徽章排版用）。
- `preview_shots.py` 时间点可写秒数（`18s`）。
- 单词身世道具 `cases/wo_props.js`：`scene / step / shot / sub / back / wipe / map / boat / wind / plane / tower / pier / city / crate / scroll / person / stamp / morph / snap / chipW / hold / finish`。
- 回归：这些改动不调用随机数，旧案例画面不变。

---

# 附录 A：王炸实验室白板（历史进度与代码位置）

> **新模块设计阶段（单词身世 / 格林定律 / 路线图）的交接见 `DESIGN_HANDOFF.md`。**
> 以下是王炸实验室阶段的原交接内容（进度、代码位置、分镜要点、数据问题），保留备查。
> 用户要求（2026-10-29）：把十二大王炸里还没做完的页签全部按「竹节句 vs 树干句」的样子做成白板动画；直接提交推送 `master`，不新建分支，不反复确认。

## A1. 进度

| # | 页签 `labTab` | 序号变量 | 数据数组 | 案例数 | 状态 |
|---|---|---|---|---|---|
| ① | `verb_matrix` | vIdx/pIdx | `VERB_VECTOR_COMBINATIONS` | 36 | VV 卡通动画，不改 |
| ② | `bamboo_tree` | btIdx | `BAMBOO_TO_TREE_CASES` | 5 | ✅ 白板完成（样板） |
| ③ | `vowel_shift` | grimmIdx | `GRIMM_VOWEL_LAWS` | 3 | ✅ 白板完成（3 案例 · 55/55/59 秒） |
| ④ | `adj_order` | adjExIdx | `ADJ_ORDER_EXAMPLES`（+ `ADJ_ORDER_CARRIAGES`） | 4 | ✅ 白板完成（4 案例 · 56–60 秒） |
| ⑤ | `past_clans` | clanIdx | `IRREGULAR_PAST_CLANS` | 4 | ✅ 白板完成（4 案例 · 56–60 秒） |
| ⑥ | `stress_rhythm` | stressIdx | `STRESS_AND_SCHWA_DB` | 3 | ✅ 白板完成（3 案例 · 45–56 秒） |
| ⑦ | `metaphor_code` | metaIdx | `METAPHOR_CODES_DB` | 3 | ✅ 白板完成（3 案例 · 53–58 秒） |
| ⑧ | 单词卡光透视仪 | — | 全词库 1000+ 卡 | — | 不在本轮范围：卡片弹窗，非实验室页签，1000+ 张不能逐个手写脚本 |
| ⑨ | `tense_matrix` | tenseIdx | `TENSE_ASPECT_MATRIX_DB` | 5 | ✅ 白板完成（5 案例 · 58–60 秒） |
| ⑩ | `aux_transformer` | auxIdx | `AUX_TRANSFORMER_CASES` | 4 | ✅ 白板完成（4 案例 · 43–48 秒） |
| ⑪ | `five_patterns` | patIdx | `FIVE_SENTENCE_PATTERNS_DB` | 5 | ✅ 白板完成（5 案例 · 42–51 秒） |
| ⑫ | `writing_alchemist` | writeIdx | `WRITING_ALCHEMIST_DB` | 3 | ✅ 白板完成（3 案例 · 52–55 秒） |

合计 9 个页签、34 个案例，**已全部完成**（2026-10-29）；做完一个，就把页签名加进 `insert_wb.py` 的 `READY` 列表。

## A2. 代码位置

**主文件 `萌星小学英语_最终合并版.html`**（按关键字搜索，行号会变）：

| 关键字 | 作用 |
|---|---|
| `// <<WB_ENGINE_START>>` … `// <<WB_ENGINE_END>>` | 引擎 `WB` + 全部 `WB_LAB.<页签>` 案例 + App 接线。**不要手改**，改源文件后运行 `insert_wb.py` |
| `<!-- WB_STAGE:<页签> -->${wbStageHtml(...)}` | 每个页签的动画位置。页签登记了案例就出白板 + 术语小词典，没登记就出旧 Canvas |
| `startWBLoop(wbStage)` | `startSuperLabCanvasLoop` 里的入口 |
| 旧 Canvas 绘制分支 | `startSuperLabCanvasLoop` 里各 `tab === ...` 分支仍保留，页签换成白板后不会再走到 |

**源文件 `docs/whiteboard/src/`**：

| 文件 | 作用 |
|---|---|
| `wb_engine.js` | 引擎：`kit()` 绘制工具、`mount()` 播放器、`WB_LAB` 登记表 |
| `cases/<页签>.js` | 每个页签一个文件：`WB_LAB.<页签> = [ {build, terms}, ... ]` |
| `wb_app.js` | App 接线：`wbStageHtml / wbGlossHtml / wbTerms / startWBLoop / wbToggle / wbReplay / wbSeekTo` |
| `insert_wb.py` | 把以上全部写进主文件（可重复运行） |
| `preview.html` / `preview_shots.py` | 不进 App 直接预览、截图：`preview_shots.py <页签> <输出目录> 0.3,0.6,1.0` |
| `appwb.py` | App 内验收：`appwb.py <页签> <输出目录>` |
| `wo_hub.js` / `cases/wo_props.js` / `cases/wo_*.js` / `appwo.py` | 📖 单词身世总枢（页面、溯源幕道具和模板、场景、App 验收）；进度见 `DESIGN_HANDOFF.md` |

## A3. 各页签分镜要点（做之前先看页面原文）

- **③ 格林音变 `vowel_shift`**：写单词 → 圈出变化的字母 → 箭头变形成另一个词（foot→feet、food→feed、safe→save）。术语：元音、辅音、前元音/后元音、清辅音/浊辅音、音标、复数、名词变动词。
- **④ 形容词排座次 `adj_order`**：画一列 8 节车厢（`ADJ_ORDER_CARRIAGES` 的顺序），把例句的形容词一个个放进对应车厢，空的车厢打「—」，最后连成短语；讲「离本质越近越贴名词」。术语：形容词、观点、材质、来源、用途、名词。
- **⑤ 过去式四大门派 `past_clans`**：门派旗子 + 秘诀 → 每个成员「原形 → 过去式」，标出变化的字母；挑 3–4 个成员画完整，其余列表。术语：过去式、规则动词/不规则动词、原形、闭音节、爆破音。
- **⑥ 重音与弱读 `stress_rhythm`**：把单词切成音节方块，重读音节画大圆点，弱读音节写 /ə/；名前动后：同一个词画两次（名词前重、动词后重）。术语：音节、重音、名词、动词、弱读、/ə/、连读、节拍。
- **⑦ 隐喻密码 `metaphor_code`**：简笔画（山脚 foot、钟面 face、河口 mouth、蓝色心情 blue……）+ 字面意思 → 比喻意思。术语：隐喻、字面意思、比喻意思、习语。
- **⑨ 时态矩阵 `tense_matrix`**：画时间轴（过去/现在/将来）+ 「镜头」（快照/录像/留存），标出动作点或线段；写公式和信号词；主语切换 he → plays。术语：时态、时间轴、一般体、进行体、完成体、单三、信号词。
- **⑩ 助动词照妖镜 `aux_transformer`**：写肯定句 → 标出「护卫」→ 否定（not 贴在护卫后）→ 一般疑问（护卫跳到主语前，画弧线箭头）→ 特殊疑问（换疑问词 + 擦掉被问的部分）→ 感叹句。术语：助动词、be 动词、情态动词、肯定句、否定句、一般疑问句、特殊疑问句、感叹句、原形。
- **⑪ 五大句型 `five_patterns`**：骨架方块 S / V / O / P / C 依次搭起来，再把金句的每个词放进骨架。术语：主语、谓语、宾语、表语、补语、及物/不及物动词、系动词、双宾语、介词挂钩。
- **⑫ 作文炼金炉 `writing_alchemist`**：左边 60 分句子 → 进炼金炉（画一个炉子，标出用了哪个公式）→ 右边 100 分句子，把升级的词用颜色圈出来。术语：基础句、高级句型、感叹句、状语、连接词。

## A4. 待确认 / 已知问题

### 数据里发现的问题（2026-10-29 用户要求：发现 bug 立即修。标 ✔ 的已修）
- ③ `vowel_shift`：✔ essence 改为「名词/形容词变动词」。未改：「格林音变律」名字不准（格林定律讲的是辅音变化，foot→feet 属于元音变异）；blood /blʌd/ 并不是 oo /uː/ 音；full→fill 是形容词变动词，essence 里只写了名词变动词；life→live、bath→bathe 的元音也变了。
- ④ `adj_order`：✔ 第④节改为「新旧/形状 (Age/Shape)」；✔ 例 ③ 标题补上「漂亮的」。说明：页面写「黄金7节车厢」，OSASCOMP 是 8 类（形状/新旧、材质/用途各合一节）；第④节叫 Shape/Age，但 OSASCOMP 里 Age 在 Shape 前；例 ③ 标题漏了「漂亮的」。
- ⑤ `past_clans`：✔ 门派三标题改为「词尾多加 -t」；✔「四大护法」改为「六大护法」。未改（属于讲法简化）：门派一说全部是短促闭音节，hurt 是长元音；秘诀里提到的 set 不在成员里。门派二 i→a→u「张开度三级跳」不准（/ʌ/ 比 /æ/ 开口小），sit/give、run/come 不符合 i→a→u。门派三写「清音 -t/-d」，/d/ 是浊音；feed→fed 没有加 -t。门派四叫「四大护法」，实际有 6 个成员。
- ⑥ `stress_rhythm`：✔ `sta-ˈTION` 改为 `ˈSTA-tion`。未改：标题写 -ee/-ese/-eer，但没有 -ee 的例子；desert、export 的例句只用了一种词性。
- ⑦ `metaphor_code`：✔「Time is gold!」改为「Time is money!」。例句没有中文翻译，动画里的中文是自己写的。
- ⑨ `tense_matrix`：✔ 例 5 改为「have already finished the homework」；✔ 数组注释「四大」改为「五大」。未改：「将来体」不是真正的体；卡片写 3×3，但只有 5 格有数据；数组上方注释写「四大」，实际 5 项。
- ⑩ `aux_transformer`：✔ 例 2 中文改为「里奥能把英语说得非常好。」；「五大句型变形」（肯定→感叹五种句式）容易和 ⑪「五大基本句型」混淆，术语表已说明。
- ⑪ `five_patterns`：✔ show(看) 改为 show(展示)；skeletonParts 里的 emoji 在白板里省略了。
- ⑫ `writing_alchemist`：✔ 公式 2 说明改为 We were very happy；✔ What's more 释义改为「而且/此外」；✔ 母题三骨架改为 First/What's more/Finally。未改：「五感法则」只用了 3 种感官。

- ⑧ 单词卡光透视仪不在本轮（见进度表），需要用户决定是否要做一个「通用模板」自动生成。
- 环境：沙箱重置后需要重装 Playwright：`pip install playwright && python3 -m playwright install chromium && python3 -m playwright install-deps chromium`。


## 讲解员小人定稿（2026-10-29）
用户选定 v3a 马尾女老师（docs/whiteboard/narrator/narrator_v3a_ponytail.png）：高马尾+星星发夹，绿外套、橙领巾、藏青长裤，星星笔帽马克笔，不戴眼镜。代码阶段按此稿用 SVG 骨架重画，详见 narrator/README.md。
