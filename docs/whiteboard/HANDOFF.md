# 交接文档（HANDOFF）· 白板动画与新模块

> 更新：2026-10-29 18:35 JST　｜　接手先读：`MASTER_DESIGN.md`（总设计，19 条决策）→ `SOP.md`（v2.0 标准流程 + 验收清单）→ 本文。
> 用户规矩：直接提交推送 `master`，不新建分支；做完一个单元就提交；发现 bug 直接修；每写完一个文档也立即提交。
> **当前阶段：代码阶段 · 阶段 1（用户「开始做」，2026-10-29 19:00 起）——只做 port 一幕作为「样板幕」，其他幕等用户审片确认后再铺开。** 阶段 1 进度见 §0。

---

## 0. 阶段 1 进度（代码阶段，port 样板幕）

| 步骤 | 内容 | 状态 / 提交 |
|---|---|---|
| 1 | R2 朗读覆盖检查脚本 `src/r2check.py` + `src/r2check.js`（同时做 R4 动作覆盖检查） | ✅ 见下 |
| 2 | port 幕补齐 R2（每个英文词 / 词块：单独朗读 + 例句） | ✅ 朗读 9 → 21 句；`r2check.py wo_port` 25 个词 / 词块全部 ✔读 ✔句 |
| 3 | 讲解员小人（v3a 定稿，SVG 骨架 + 动作库 v1 + 5 表情 + 3 口型） | ✅ `src/wb_actor.js`；演示 `cases/narrator_demo.js`（preview.html?tab=narrator_demo&case=0/1/2） |
| 4 | port 幕 R4：动作词全部由小人 / 角色演出来，与朗读同步 | 🔧 第一版已接入：`r2check.py wo_port` R4 13/13 ✔（登记 + 与朗读重叠）；逐张截图精修中 |
| 5 | 引擎 V1–V8 + M1–M12（向后兼容，旧幕回归） | 🔧 引擎 v2 已提交（`k.v2()` 打开才生效；旧 63 幕 SVG 逐字节不变）；port 接入调整中 |
| 6 | 升级前后录屏 + 关键帧对比 → 给用户审片 | 待做 |

**当前做到哪 / 下一步（19:20 更新）**
- ✅ 引擎 v2（`wb_engine.js`，opt-in）：分类缓动库 `EASE`（move/in/exit/pop/snap/antic/sine）、统一调色板 `PAL`、字号 `FS`、网格 `GRID`；`k.v2()`、`k.pop`（弹入 + 挤压拉伸）、`k.squash`（落地压扁回弹）、`k.hl / k.hlText`（荧光笔底色）、`k.erase`（板擦擦除转场）、`k.titleCard`（统一片头）、`k.quoteCard`（统一收尾金句卡）、`k.sfx`（音效事件）、`k.remap`（节奏压缩时一起改所有时间登记）；v2 渲染：粗细笔触（中段加粗线）、手的位置是时间纯函数（弧线移动、空闲滑出画面）、读到哪个词白板上同一个词亮荧光底色、`prefers-reduced-motion` 降级；DOM 只在值变化时写入（旧幕也受益，输出不变）。
- ✅ `wb_app.js`：语音事件驱动口型（onstart / onboundary / onend）；v2 时间轴跟着语音走（落后 4 倍速追、超前停住等下一个 onboundary）；音效 Web Audio 现场合成 + 「🔔 音效」一键静音（和朗读分开，朗读时自动压低）。
- 回归：`/tmp/reg/reg.py` 新旧引擎同时渲染 63 个旧幕 5 个时刻 → 0 差异；`appwb bamboo_tree`、`appfp 0–5`、`appwo` 全过；`node --check` 过。
- ✅ 小人（`wb_actor.js`，engine 在 kit / mount 里自动挂上；`insert_wb.py`、`preview.html` 已引入）：
  - 骨架：骨盆 → 躯干 → 头；肩 → 上臂 → 前臂 → 手；髋 → 大腿 → 小腿 → 脚；正向运动学 + 自动着地（最低的脚踩地 → 走路自然起伏）；手臂比躯干晚 0.05/0.09 秒（重叠动作 M3）；马尾、领巾做阻尼弹簧余摆（对头部加速度卷积，纯函数，拖进度条也对）。
  - 动作库 v1：idle（呼吸 + 3–5 秒随机眨眼）、wave、point（自动算指向角、头转向）、surprised、holdCard、read、walk、run、carry（弯腰抱起 → 走 → 放下）、take、put、jump（蓄力挤压 → 腾空拉伸 → 落地挤压）、turn；另有 think、cheer、support、nod。动作之间按权重做姿态插值。
  - 5 表情（happy / think / surprised / proud / oops）+ 3 口型（闭 / 半开 / 全开）；有语音事件时口型跟 onstart/onboundary/onend，没有语音（静音、无英文语音）时按朗读时间段估算。
  - 道具：box / card（带字）/ book / doc（可盖章 stampAt）/ scroll；拿起、抱着、举着、放下都是事件，位置是时间纯函数。场景角色 look：porter 搬运工、traveler 旅客。
  - 用法：`k.actor(look,{x,y,s,f,g,hidden})`、`k.act(a, 动作, t, dur, {to, prop, put, at, words})`、`k.expr`、`k.look`、`k.actorFade`、`k.prop`、`k.actFx(words,t,dur,描述)`（场景物体演的动作，只登记给 R4 检查）。
  - 审图：`/workspace/work/mx_shots/narrator_actions_v1.png`（13 个动作定格）、`narrator_expressions_v1.png`（5 表情）。
- ✅ `cases/wo_props.js` v2 分支（只在 `k.v2()` 时生效）：配色收进 PAL；`D.wipe` → 板擦擦除；`D.scene` → 先出统一片头卡；`D.snap` → 预备后撤 + 贴上压扁回弹 + 「啵」；`D.stamp` → 预备上提、加速砸下、压扁；`D.finish` 不压缩人物动作和片头（`S.keeps`），并通过 `k.remap` 一起改人物 / 擦除 / 音效时间。
- ✅ R1 零丢失：升级前（已补齐 R2）的 port 原样保存为 `cases/wo_port_classic.js`（`WB_LAB.wo_port_classic`，不进 App，可随时回退）；`r2check.js` 也扫描道具上的文字（词卡）。
- 🔧 port v2 第一版（`cases/wo_port.js`，已写进主文件）：片头卡 + 小人走进来挥手；地图镜头小人指地中海 / 罗马、恍然大悟；进港镜头船在读 takes 时被风推进港、小人翻词典读 ob portum；搬运镜头两个搬运工演 carry/import/export（弯腰抱起 → 走 → 放下 / 走进城门）、船载货 transport 往返、信使拿卷轴跑回城 report、在城门举卷轴 reports；关卡镜头旅客走来、举护照 show、盖章、拿着护照走过关卡 pass；穿越镜头小人转身、变身时跳起来、鸟飞 fly、旅客登机飞机起飞 take；总结镜头小人举「port」词卡；预测镜头小人思考 → 欢呼，托举箱子 hold/support，两个朋友一起托 support；收尾金句卡 + 小人得意点头。分镜动作词清单写在案例 `actionWords`。
- 截图自审已修：场景角色 / 道具改为镜头开始时淡入；被拿着的道具在人淡出后隐藏；中段加粗线的圆头小点；片头卡、板擦擦除不被节奏压缩（擦除 1.15 秒）；金句卡的遮罩盖住全部旧内容；朋友们在金句卡前退场；旅客过关后停在 820；标题不参与朗读高亮。
- ✅ 分镜文档 `word_origins/PORT_STORYBOARD_V2.md`（镜头总表 + 从实际时间轴导出的逐条时间码）。
- ✅ 实测（沙箱无 GPU 的 headless Chromium，偏保守）：
  - 朗读同步（`src/measure_sync.py`，模拟 TTS 随机时序）：36 个 onboundary 事件，白板时间轴到达该词的误差平均 0.035 秒、最大 0.129 秒，36/36 ≤ 0.2 秒。
  - fps（`src/measure_fps.py`，同一环境前 30 秒）：升级后平均 59.6、1% 低帧 38.9、每帧 JS 渲染 1.56 ms（p99 8.4 ms）；升级前 db13720 平均 58.4、1% 低帧 31.2、2.29 ms。搬运镜头（最重）平均 59.3。1% 低帧受沙箱软件渲染限制，真机待用户确认。
  - 拖动 / 重播（`src/measure_seek.py`）：14 个时刻 × 3 种到达方式，DOM 状态一致，截图只有个别抗锯齿像素差。
  - 减少动态（`prefers-reduced-motion`）：降级为淡入、不画手、镜头直接到位，无报错。
- 性能：去掉荧光底色的 mix-blend-mode（荧光带本来就在文字下面）。道具放回原处时插回固定位置（图层顺序与播放路径无关）。
- ✅ 录屏和对比图（`/workspace/work/mx_shots/`，不进仓库）：升级前 `port_before_db13720.mp4`、升级后 `port_after_v2.mp4`（Playwright 实时录屏，分段录再拼接，模拟 TTS 驱动语音事件；视频无声），关键帧对比 `compare_01…09_*.png`（两边按同一句朗读对齐）。
- 抽帧自审又修：飞机起飞不再飞进右上角进度条；金句卡洞见手动断行、卡片左移给小人留位置；护照放大 1.5 倍看得清印章；托举结束后箱子收起；半透明海浪线不叠加粗线。
- 下一步：重录升级后视频的后两段、重出对比图 → 更新 SOP / MASTER_DESIGN → 给用户审片（用户确认前不铺开到其他幕）。

**朗读覆盖检查用法**（主文件里有全部词库数据，所以先 `insert_wb.py` 再查）：
```
python3 docs/whiteboard/src/r2check.py wo_port            # 只列缺的项
python3 docs/whiteboard/src/r2check.py wo_port --all-items # 列出这一幕全部英文词 / 词块 / 句子 / 动作词
python3 docs/whiteboard/src/r2check.py all|lab|fp|wo [--strict] [--json out.json]
```
- 抽取范围：白板文字（`T`，含 chip、mono、final 等）+ 讲解字幕（`N`）；音标 `/…/` 和单字母标签（S V O）不算。
- 每个词：✔读 = 出现在某句 `say` 的 `word` 里（或整句只读这个词）；✔句 = 某句 `say` 英文里有这个词（-s/-es/-ed/-ing 算）。词块（`im-`、`-ed` 这类带连字符的，或 `say(…, { blocks: ["medi"] })` 登记过的）出现在例句某个词里面也算有例句。
- 白板上连续 ≥3 个英文词的句子必须被朗读。
- R4：案例对象写 `actionWords: [{ word: "import", act: "carry" }, …]`（分镜动作词清单），脚本逐个对照 `k.act(…, { words: ["import"] })` 登记，并检查动作时间和含这个词的朗读重叠；例句里出现常见动作动词但没列进清单的，只提示。
- `--strict` 有缺项返回 1（验收用）。
- **全 App 基线（2026-10-29，升级前）**：64 幕，英文词 / 词块 1618 个，缺 1479；白板句子 324 句，缺朗读 195。旧幕按「持续」待办逐步补，本阶段只补 port。

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
- ~~**R2 朗读**：opportunity 没有例句；Rome、Mediterranean 以外的专有名词和词块（medi、terra、ob、im、ex、trans、re、pass、air、sup）没有单独朗读。~~ ✅ 阶段 1 第 2 步已补（新增 12 句：Rome / medi+terra / ob portum / opportunity / portus+portare / im / ex / trans / re / OK+pass / air / sup；export 补单独朗读）
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


## 商业动画标准（决策 22，2026-10-29）
用户要求白板动画达到商业动画标准。已写入 MASTER_DESIGN §2.7（动画十二法则 M1–M12 落地表、60fps 等技术硬指标、分镜→样片→精修→录屏审片→用户审片流程、不通过典型）和 SOP 验收清单。port 一幕作为样板幕，用户认可后其他幕对齐。
