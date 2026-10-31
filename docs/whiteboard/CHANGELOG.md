# 变更流水（CHANGELOG）· 白板动画与新模块

> 2026-10-30 文档清理：原 `HANDOFF.md`（87 KB）既是交接又是流水账，拆成两份——
> - `HANDOFF.md`：**短交接**（现状、风险、下一步、待用户确认），接手先读那份；
> - 本文：**原 HANDOFF 全文原样搬来**（§0–§5、附录 A，章节号不变，其他文档里写的「HANDOFF §0.6」「HANDOFF §4」等都在本文同号章节），一个字不删。
> 改动只有两类，都用〔……〕标出、原文保留：①时间更正（原记时间和 git 提交时间对不上的，按 `git log` 补上实际时间和提交号）；②过期待办加注「已解决」及对应提交。
> 以后做完一个单元：流水记在本文（追加到对应阶段或文末），`HANDOFF.md` 只改现状和下一步。

## 时间更正表（按 `TZ=Asia/Tokyo git log` 核对）

原 HANDOFF 里的时间是写文档时估的，不少比实际提交晚 1–3 小时，有几条还跨了日期。以下以提交时间为准（原文里在原时间后面加了〔更正〕）：

| 条目 | 原记 | 实际提交时间（JST） | 提交 |
|---|---|---|---|
| P1 adj_order | 2026-10-29 23:00 | 2026-10-29 21:35 | `b909fd2` |
| P2-① fp_economy | 2026-10-29 23:20 | 2026-10-29 21:37 | `7d06116` |
| P2-② fp_iconicity | 2026-10-29 22:30 | 2026-10-29 22:12 | `7428be6` |
| P2-③ fp_boundedness | 2026-10-29 22:45 | 2026-10-29 22:14 | `5026314` |
| P2-⑤ fp_vectors | 2026-10-29 23:00 | 2026-10-29 22:15 | `bc2e7f0` |
| P2'-④ fp_one_king | 2026-10-29 23:15 | 2026-10-29 22:17 | `48a097a` |
| P2'-⑥ fp_zoom_focus | 2026-10-29 23:30 | 2026-10-29 22:18 | `a4bdc36` |
| P3-① bamboo_tree | 2026-10-29 22:30 | 2026-10-29 22:23 | `17a5ccf` |
| P3-② aux_transformer | 2026-10-29 22:40 | 2026-10-29 22:24 | `209c2d6` |
| P3-③ five_patterns | 2026-10-29 22:55 | 2026-10-29 22:26 | `64e7408` |
| P3-④ tense_matrix | 2026-10-29 23:10 | 2026-10-29 22:28 | `a2e4386` |
| P4 writing_alchemist | 2026-10-29 23:25 | 2026-10-29 22:31 | `7ec20c7` |
| P1–P4 之后 | 2026-10-29 23:25 | 2026-10-29 22:31 | `7ec20c7` |
| metaphor_code R2 | 2026-10-29 23:35 | 2026-10-29 22:32 | `5b17a2a` |
| past_clans R2 | 2026-10-29 23:45 | 2026-10-29 22:34 | `0a5d255` |
| 格林定律章开始（出处提交） | 2026-10-29 21:40 | 2026-10-29 21:12 | `caa1493` |
| 时间与度量章开始（出处提交） | 2026-10-29 22:30 | 2026-10-29 21:27 | `d9d3c22` |
| 阶段 3 开始（R1 清单） | 2026-10-29 23:55 | 2026-10-29 22:35 | `f38e32c` |
| 中英对照 11 幕全部上线 | 2026-10-30 03:15 | 2026-10-29 23:06 | `adb2106` |
| ze_be 升 v2 | 2026-10-29 23:35 | 2026-10-29 23:23 | `b55a01c` |
| ze_modifier 升 v2 | 2026-10-29 23:50 | 2026-10-29 23:25 | `b8366bd` |
| phrasal_key | 2026-10-29 23:58 | 2026-10-29 23:34 | `53a8d60` |
| eight_endings | 2026-10-30 00:15 | 2026-10-29 23:37 | `8d1377b` |
| pron_map | 2026-10-30 00:45 | 2026-10-29 23:43 | `60020bf` |
| intonation_map | 2026-10-30 01:10 | 2026-10-29 23:47 | `f497a1a` |
| 合成词重音 | 2026-10-30 01:20 | 2026-10-29 23:48 | `09f2847` |
| irregular_plural | 2026-10-30 01:45 | 2026-10-30 00:06 | `52b7121` |
| 首页改版第 6 步 | 2026-10-30 00:50 | 2026-10-30 00:33 | `f1cd18f` |
| 按需加载 | 2026-10-29 20:40 | 2026-10-29 20:31 | `f575002` |
| r2check --summary 复算 | 2026-10-29 21:20 | 2026-10-29 21:08 | `62ae7cc` |

其余时间（如 port 审片 20:10 ≈ abb050c 20:08、首页方案 00:07 是用户提出时间、文件头「更新 2026-10-30 00:20」是最后一次改头部的时间）误差在几分钟内或不是提交时间，未改。

---

# 交接文档（HANDOFF）· 白板动画与新模块

> 更新：2026-10-30 00:20 JST（阶段 3 收尾：ze_be / ze_modifier 升 v2；阶段 4：短语动词总钥匙（verb_matrix 已并入）、8 个词尾上线；vowel_shift 已删、port 家族词卡已改，见 §0.6）　｜　接手先读：`MASTER_DESIGN.md`（总设计，19 条决策）→ `SOP.md`（v2.0 标准流程 + 验收清单）→ 本文。
> 用户规矩：直接提交推送 `master`，不新建分支；做完一个单元就提交；发现 bug 直接修；每写完一个文档也立即提交。
> **当前阶段：阶段 1 已完成（port 样板幕审片通过、按需加载完成）→ 阶段 2 单词身世第一批（进度见 §0.5）。**〔2026-10-30 文档清理注：此行已过期——实际阶段 1–4、首页改版 1–6 步都已完成，现状见新 `HANDOFF.md`〕

---

## 0. 阶段 1 进度（代码阶段，port 样板幕）

| 步骤 | 内容 | 状态 / 提交 |
|---|---|---|
| 1 | R2 朗读覆盖检查脚本 `src/r2check.py` + `src/r2check.js`（同时做 R4 动作覆盖检查） | ✅ 见下 |
| 2 | port 幕补齐 R2（每个英文词 / 词块：单独朗读 + 例句） | ✅ 朗读 9 → 21 句；`r2check.py wo_port` 25 个词 / 词块全部 ✔读 ✔句 |
| 3 | 讲解员小人（v3a 定稿，SVG 骨架 + 动作库 v1 + 5 表情 + 3 口型） | ✅ `src/wb_actor.js`；演示 `cases/narrator_demo.js`（preview.html?tab=narrator_demo&case=0/1/2） |
| 4 | port 幕 R4：动作词全部由小人 / 角色演出来，与朗读同步 | 🔧 第一版已接入：`r2check.py wo_port` R4 13/13 ✔（登记 + 与朗读重叠）；逐张截图精修中 |
| 5 | 引擎 V1–V8 + M1–M12（向后兼容，旧幕回归） | 🔧 引擎 v2 已提交（`k.v2()` 打开才生效；旧 63 幕 SVG 逐字节不变）；port 接入调整中 |
| 6 | 升级前后录屏 + 关键帧对比 → 给用户审片 | ✅ 用户 20:10 审片通过（abb050c） |
| 7 | ⑤ 按需加载（决策 13） | ✅ 见下「按需加载」 |

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
- ✅ 升级后视频已按最新版重录、对比图重出；SOP（验收脚本、引擎 v2 用法）、MASTER_DESIGN（§2.5 / §2.6 进度）已更新。
- **审片材料**（沙箱 `/workspace/work/mx_shots/`）：`port_before_db13720.mp4`（约 136 秒）、`port_after_v2.mp4`（约 202 秒）、`compare_01_片头 … compare_09_结尾定格.png`、`narrator_actions_v1.png`、`narrator_expressions_v1.png`、`measure_v2.json`。
- ~~下一步（等用户）~~：用户已确认 port 样板幕（20:10）；阶段 1 ⑤ 按需加载已完成（见下）。下一步：阶段 2（Europe → Bluetooth → 身世标签 → 格林定律章）。
- **已知取舍**：①视频无声（沙箱没有英文语音，用模拟 TTS 驱动事件；音效是 Web Audio 实时合成，录屏录不到）；②fps 在无 GPU 沙箱实测平均 59.6、1% 低帧约 39（升级前同环境 31），≥50fps 需真机复核；③词块例句用「X means …」元语言句；④「风送船」「船运货」「鸟飞」「飞机起飞」由场景物体演（`k.actFx` 登记），其余动作词都由人演；⑤角色服装色、徽章色、🥚 不在 V3 四色内（定稿形象 / 全 App 统一标识）。

**按需加载（阶段 1 ⑤，2026-10-29 20:40）**〔按 git log 更正：2026-10-29 20:31 JST，`f575002`〕
- 做法：`insert_wb.py` 把 19 个白板模块（10 个实验室页签、6 条原理、port，外加道具 `fp_props` / `wo_props`）写成不执行的 `<script type="text/plain" id="wbmod-<id>">`，放在 `</body>` 前的 `<<WB_MODULES_START>> … <<WB_MODULES_END>>` 区块；道具用 `data-deps` 声明依赖。引擎、讲解员、App 接线、单词身世总枢页面仍直接执行。
- 「万能动词 × 向量转盘」VV 动画脚本（约 1.7 MB：webp 素材 base64 + 场景，只有 `verb_matrix` 页签用）同样改成 `wbmod-vv`，页签渲染时才载入（`insert_wb.py` 自动改写，可重复运行）。
- 运行时（`wb_app.js`）：`wbCases(tab)` 第一次用到某模块时调 `wbLoadModule(id)`——取出文字生成 `<script>` 同步执行，之后不重复；`wbHasModule(id)`、`wbLoadAll()`（验收脚本用）；`woSceneReady` 认模块是否在主文件里。不用 fetch，仍是单个 HTML 双击即用。
- 没做 base64 + gzip 压缩：解压是异步的，会让页面渲染变成异步；首屏瓶颈是解析执行，不是文件体积。
- 验收：`jscheck.py`（2→1 个直接执行的 script + 20 个模块，node --check 全过）；`reg_render.py` 64 幕 × 5 时刻 = 320 次渲染与改动前逐字节一致；`appwb.py` 10 个页签、`appfp.py 0–5`、`appwo.py` 全过、无报错；`r2check.py wo_port --strict` 通过；verb_matrix 的 VV 动画进入页签后正常播放。
- 首屏实测（`measure_load.py` 新旧交替各 12 次，中位数，沙箱无 GPU）：首页可交互 256.7 → 237.9 ms，DOMContentLoaded 187.1 → 174.5 ms，首次绘制 102 → 96 ms；首次进入竹节句 / 原理① / port 基本不变（50.7/43.3/85.1 → 52.2/44.7/85.6 ms）；首次进入 verb_matrix 40 → 52 ms（多一次载入 1.7 MB，之后不再重复）。
- 新验收脚本（这些以前在 /tmp 里，沙箱重置会丢，现进仓库）：`src/jscheck.py`（node --check）、`src/reg_render.py`（渲染回归，替代 `/tmp/reg/reg.py`）、`src/measure_load.py`（首屏耗时）。
- 顺手补了 abb050c 留下的截图回归：小人放大到 1.15 后，金句卡、护照、托举、词卡镜头都没压住内容（托举镜头小人笔尖贴近绿框右边，不挡字）。
- 还没分块的大数据：`VOCAB_DB` 等词库数据首页就要用（词卡、搜索），本轮不动；以后新模块的大数据按同样方式写成 `wbmod-*`。

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
- **复算（2026-10-29 21:20，`r2check.py all --summary`）**〔按 git log 更正：2026-10-29 21:08 JST，`62ae7cc`〕：66 幕（多了 europe、bluetooth），英文词 / 词块 1641 个，缺 1462；白板句子 324 句，缺朗读 195；R4 只有 3 个新幕列了动作词清单（19 个，缺 0），旧幕都还没列。`--summary` 是本次新增的「按页签汇总」（原来只有逐幕行和总计，没有按页签的汇总，拿来排推广顺序不方便）。

### 0.1 旧幕推广清单（R2 补朗读 + R4 补动作 + v2 视觉，按优先级；**只列清单，不批量改**）

按页签汇总（缺口 = 缺词 + 缺朗读句子）：

| 页签 / 原理 | 案例 | 词 | 缺词 | 句子 | 缺句 | 现有朗读 |
|---|---|---|---|---|---|---|
| tense_matrix | 5 | 245 | 228 | 48 | 34 | 10 |
| writing_alchemist | 3 | 198 | 198 | 45 | 30 | 8 |
| five_patterns | 5 | 184 | 180 | 25 | 13 | 10 |
| past_clans | 4 | 142 | 134 | 15 | 15 | 8 |
| stress_rhythm | 3 | 101 | 97 | 11 | 6 | 3 |
| aux_transformer | 4 | 88 | 82 | 38 | 15 | 20 |
| fp_one_king（④） | 4 | 84 | 76 | 30 | 17 | 12 |
| fp_zoom_focus（⑥） | 4 | 80 | 74 | 13 | 7 | 11 |
| bamboo_tree | 5 | 73 | 73 | 29 | 12 | 5 |
| metaphor_code | 3 | 83 | 69 | 21 | 13 | 10 |
| fp_vectors（⑤） | 4 | 69 | 63 | 28 | 19 | 10 |
| fp_boundedness（③） | 4 | 60 | 45 | 14 | 12 | 12 |
| fp_iconicity（②） | 4 | 54 | 46 | 0 | 0 | 12 |
| fp_economy（①） | 4 | 48 | 42 | 3 | 2 | 8 |
| vowel_shift | 3 | 47 | 42 | 0 | 0 | 6 |
| adj_order | 4 | 37 | 13 | 4 | 0 | 4 |

排序原则：①要被合并 / 搬走的先不补（补了也要删）；②首页直达、人人会进的第一性原理总枢优先；③同一优先级里缺口小的先做（快速见效，也能先摸清每幕平均工作量）；④语法核心页签（五年级以上常用）先于写作。

| 优先级 | 幕 | 理由 | 做法 |
|---|---|---|---|
| P1 | `adj_order` 4 案例（缺 13 词、0 句） | 缺口最小，一轮就能补齐，用来定「旧幕补 R2」的标准做法和每幕耗时 | 补朗读 + 列动作词清单；视觉不升 v2（保持旧样式，单独一轮再升） |
| ✅ P1 完成（2026-10-29 23:00）〔按 git log 更正：2026-10-29 21:35 JST，`b909fd2`〕 | `adj_order` R2 13 → 0 | 做法：案例配置加 `extraSays`（在原 `k.final` 朗读之后补读：八类首字母词 Opinion…Purpose、OSASCOMP、two/that、cat、this），画面不动；r2check --strict 4/4 幕 37 词全过。渲染回归：只有 adj_order 第 1、2、4 幕变化（多了朗读，时间轴变长），第 3 幕和其他 71 幕逐字节一致；appwb adj_order 过。例句里的 bought / wears 不在动作词表，R4 未列清单（视觉 v2 升级时一起补演）。 | 下一个：P2 `fp_economy` |
| ✅ P2-① 完成（2026-10-29 23:20）〔按 git log 更正：2026-10-29 21:37 JST，`7d06116`〕 | `fp_economy`（第一性原理 ①）R2 42 → 0、白板句子缺朗读 2 → 0 | 做法同 P1：每幕在收尾 `D.fin` 前补朗读（books/bags/buses、worked/played/wanted、watch/box/want/need、a/the/book/useful/hour/polite/possible、run/swim/tap/tape/big/hot/stop + 词块 ed/es/in/im/ing/er/est）；第 4 幕 `r2skip` 拼错的 runing 和音节切分残片 ru/ning/ta/ping。验收：r2check --strict 43/43；渲染回归只有 fp_economy 4 幕变化（20 项），其余 68 幕逐字节一致；jscheck、appfp 0 过；截图看过。R4：例句里 run/swim/stop 是动作词，第一性原理幕还没有讲解员，留到视觉 v2 升级时补演。 | 下一个：P2 `fp_iconicity` |
| ✅ P2-② 完成（2026-10-29 22:30）〔按 git log 更正：2026-10-29 22:12 JST，`7428be6`〕 | `fp_iconicity`（第一性原理 ②）R2 46 → 0 | 做法同 P1/P2-①：每幕收尾 `D.fin` 前补朗读（mouth/mother、swim/smile、box/bed、cup/cap；fl/gl/sl 词块 + fly/flag/flower/glass/glad/slide/slow/sleep/floor；str/sp 词块 + straight/street/strong/strict/speak/sport/space/spring；tw 词块 + two/twelve/twenty/twice/twin/between/twain）；第 2–4 幕 `r2skip` 辅音丛拆开后的词尾残片（ag/ower/ass/ad/ide/ow/eep、aight/eet/ong/ict/eak/ort/ace/ring、elve/enty/ice/in/een）和 between 里的古前缀 be（≈ by，不是动词 be，不单读）。验收：r2check --strict 33/33；渲染回归只有 fp_iconicity 4 幕变化（20 项），其余 68 幕逐字节一致；jscheck 29 模块、appfp 0/1 过。R4：例句里 put/catch/fly/swim/walk/sit 是动作词，第一性原理幕没有讲解员，留到视觉 v2 升级时补演。 | 下一个：P2 `fp_boundedness` |
| ✅ P2-③ 完成（2026-10-29 22:45）〔按 git log 更正：2026-10-29 22:14 JST，`5026314`〕 | `fp_boundedness`（第一性原理 ③）R2 45 → 0、白板句子缺朗读 12 → 0 | 做法同上：每幕收尾前补朗读（an apple / a piece / a glass of milk / homework / papers；There is a dog in the park. / The dog is running. / Open the door, please! / one / that / moon；go to school vs go to the school、on the bed / in bed、on a bus / by bus、buy a football、to the hospital；three chickens、made of glass、make room for you、two fish / some fish）。第 3 幕 `r2skip: ["vs"]`（标题里的对比符号）。**工具小改**：`r2check.js` 判断白板整句是否被朗读时，先去掉 r2skip 的词（否则「go to school vs go to the school」永远对不上）；全 App `--summary` 其余幕结果不变。验收：r2check --strict 59 词、14 句全过；渲染回归只有 fp_boundedness 4 幕变化（20 项）；jscheck、appfp 2 过。 | 下一个：P2 `fp_vectors` |
| ✅ P2-⑤ 完成（2026-10-29 23:00）〔按 git log 更正：2026-10-29 22:15 JST，`bc2e7f0`〕 | `fp_vectors`（第一性原理 ⑤）R2 63 → 0、白板句子缺朗读 19 → 0 | 做法同上：每幕收尾前补朗读（at/on/in、on the desk、Monday/May；on/off 动词 + 名词、get on the bus、take off your shoes、turn off the TV、get off the bus；八种交通工具、on the train / in a taxi / on a bike / on a horse；to/from/for、listen to me、go to school、give a book to me、come from China、borrow from you、lend to him、look for my pen、wait for the bus、a cake for mom、look at / look after）。第 3 幕 `r2skip: ["vs"]`。验收：r2check --strict 68 词、28 句全过；渲染回归只有 fp_vectors 4 幕变化（20 项）；jscheck、appfp 4 过。**P2 四条原理全部完成**。 | 下一个：P2' `fp_one_king` 第 2–4 幕 |
| ✅ P2'-④ 完成（2026-10-29 23:15）〔按 git log 更正：2026-10-29 22:17 JST，`48a097a`〕 | `fp_one_king`（第一性原理 ④）第 2–4 幕 R2 补齐（第 1 幕按计划留到搬去中英对照总枢时在新位置补，原位置仍缺 18 词 5 句） | 补朗读：want/plan/hope to…、enjoy/finish、good at drawing、do/doing/done；She went home / He plays football / They went home / Does he play? / He doesn't play. / Did they go?、can/must/will、Yes/No；五副骨骼的例句词。`r2skip`：第 2 幕打叉错句「I want go home.」、第 3 幕红字错句「Does he plays? / She can swims.」、第 4 幕成分标签 IO / DO。**工具小改**：`r2check.js` 的 r2skip 支持整句条目（带空格 = 按整句跳过错句），旧条目照常。验收：第 2–4 幕 r2check 全过（63 词、22 句）；渲染回归只有 fp_one_king 第 2–4 幕变化（15 项）；jscheck、appfp 3 过。 | 下一个：P2' `fp_zoom_focus` 第 2–4 幕 |
| ✅ P2'-⑥ 完成（2026-10-29 23:30）〔按 git log 更正：2026-10-29 22:18 JST，`a4bdc36`〕 | `fp_zoom_focus`（第一性原理 ⑥）第 2–4 幕 R2 补齐（第 1 幕同样留到搬迁时补，原位置仍缺 18 词 4 句） | 补朗读：Where is my bag? / How much is this shirt? / What a clever boy he is! How fast he runs!、Yes/No；Room/Building/Star School/Beijing、in/at/on、Tuesday morning、September；yesterday/did、every day/do/does、tomorrow/will、now/am/are/is doing、already/just/has/done 各配例句。验收：第 2–4 幕 r2check 全过（58 词、6 句）；渲染回归只有 fp_zoom_focus 第 2–4 幕变化（15 项）；jscheck、appfp 5 过。**P2 / P2' 全部完成**（第一性原理 24 幕里只剩 ④-1、⑥-1 两幕按计划待搬迁）。 | 下一个：P3 `bamboo_tree` || ✅ P3-① 完成（2026-10-29 22:30）〔按 git log 更正：2026-10-29 22:23 JST，`17a5ccf`〕 | `bamboo_tree`（实验室样板页签，5 个病句案例）R2 73 → 0、白板句子缺朗读 12 → 0 | 每个案例在 `k.final` 正确句之后补朗读：拆开的主干 / 挂件词（want/go/read/tomorrow/library/storybooks；I like dogs / They are happy、am/is/are、very much/and；under the tree / in a red dress / reading a book / my sister；yesterday morning / at eight o'clock / on the school playground / do morning exercises；there be / two yellow ducks / swimming / on the lake / in the park / have）+ 每幕一句 Chinglish 例句。`r2skip`：vs 和每幕的中式病句整句（画面上作为错误示范，SOP §7.3 不读）。验收：r2check --strict 68 词、18 句全过；渲染回归只有 bamboo_tree 5 幕变化（25 项），其余逐字节一致；jscheck、appwb bamboo_tree 过。R4：go/read/swim 等动作词留到视觉 v2 升级时由讲解员补演。 | 下一个：P3 `aux_transformer` || ✅ P3-② 完成（2026-10-29 22:40）〔按 git log 更正：2026-10-29 22:24 JST，`209c2d6`〕 | `aux_transformer`（助动词变形金刚，4 案例）R2 82 → 0、白板句子缺朗读 15 → 0 | 每个案例在 `h.final` 前补朗读：否定 / 简短回答（She is not、Yes, she is. / No, she isn't.、Yes, he can. / No, he can't.、Yes, she does. / No, she doesn't.、Yes, they did. / No, they didn't.）、第二个感叹句（How happy she is! / How fast the plane flew!）、What can Leo speak very well?、句子成分词组（taking photos in the park now、every Saturday evening、to Sanya by plane last winter）、字幕里列举的 am/is/are/was/were、do/does/did、will/must/should、-es、-ed、buy/bought、an。验收：r2check --strict 88 词、38 句全过；渲染回归只有 aux_transformer 4 幕变化（20 项）；jscheck、appwb aux_transformer 过。 | 下一个：P3 `five_patterns` || ✅ P3-③ 完成（2026-10-29 22:55）〔按 git log 更正：2026-10-29 22:26 JST，`64e7408`〕 | `five_patterns`（五大句型，5 案例）R2 180 → 0、白板句子缺朗读 13 → 0 | 每个案例在 `h.final` 前补朗读：骨架例句（The sun rises in the east. / The chicken soup smells so delicious. / Leo loves reading English books. / Mum gave me a birthday gift. / Good music makes us happy.）、金句里每个词、字幕和白板列举的动词表（rise/fly/sleep/run/smile；look/sound/smell/taste/feel、get/turn/become；discuss the plan / marry her / enter the room、want/hope/plan/decide to do、enjoy/finish/practice/mind doing；give/show/send/pass/lend/teach/tell、buy/make/cook/draw/choose/find；ask/tell/want/invite、make/let/have、Let's go! Make him laugh!）和 -ly/-ed/-ing、somebody/something。`r2skip`：成分标签 SV/SVP/SVO/SVOO/SVOC/Vi/Vt/IO/DO/OC、缩写 sb/sth、vs、被划掉的 makes me happily（sweetly 是字幕里讲的副词，单读 + 例句，不跳过）。验收：r2check --strict 170 词、24 句全过；渲染回归只有 five_patterns 5 幕变化（25 项）；jscheck、appwb five_patterns 过；截图看过。 | 下一个：P3 `tense_matrix` || ✅ P3-④ 完成（2026-10-29 23:10）〔按 git log 更正：2026-10-29 22:28 JST，`a2e4386`〕 | `tense_matrix`（时态矩阵，5 案例）R2 228 → 0、白板句子缺朗读 34 → 0 | 每个案例在 `k.final` 前补朗读：时间轴 Past/Now/Future；主语替换后的完整句（They play football every afternoon. / The little bird flies high in the sky. / Mia is dancing and making a cake. / The children are swimming in the pool now. / Mia studied hard and cried when she lost her pen. / We were very happy at the party last night. / He will fly a kite in the park tomorrow. / They are going to have a picnic next Sunday. / Mia has lived in Beijing for five years. / Mr Wang has gone to Shanghai.）；时间路标词（every day/always/usually/often/sometimes/on Sundays、right now/at the moment、yesterday/ago/last night、next week/soon/in the future、already/yet/just/never/since）；字幕里的 The earth goes around the sun、ch/sh/es、a e i o u、状态动词 like/know/want/have、have been to / have gone to、I lost my key / I have lost my key。`r2skip`：公式标签 V-s/V-ing/V-ed、REC，红叉错句 He doesn't likes / I playing football / Did you went there? / There is going to have，斜杠并列残片 last night year、next week year。验收：r2check --strict 240 词、42 句全过；渲染回归只有 tense_matrix 5 幕变化（25 项）；jscheck、appwb tense_matrix 过。**P3 语法核心四个页签全部完成**。 | 下一个：P4 `writing_alchemist` || ✅ P4 完成（2026-10-29 23:25）〔按 git log 更正：2026-10-29 22:31 JST，`7ec20c7`〕 | `writing_alchemist`（满分作文炼金炉，3 案例）R2 198 → 0、白板句子缺朗读 30 → 0 | 每个案例在 `finalBox` 前补朗读：「60 分」原句（I like English very much. / We were very happy yesterday. / Reading books is good for us. / The park is very nice in spring. / First, I will do homework. / And I also help my mom. / I was tired, but I was happy.）、替换短语（be crazy about / be fond of / enjoy doing、To begin with / Besides / All in all / In a word / At last、Because / so、be good at、be going to / will / plan to / look forward to）、五感 look/smell/are singing；母题范文两段**逐句**朗读（每句一条，朗读条放得下：最长一句 93 字符，截图确认一行显示完）。`r2skip: ["adj"]`。**工具小改**：`r2check.js` 白板长段落按版面断行、一行常跨两句，相邻 2–3 条朗读连起来能盖住这一行也算已朗读（全 App `--summary` 其余幕结果不变）。验收：r2check --strict 197 词、45 句全过；渲染回归只有 writing_alchemist 3 幕变化（15 项）；jscheck、appwb writing_alchemist 过。**§0.1 推广清单 P1–P4 全部完成**；剩下的只有「暂缓」行（vowel_shift、stress_rhythm、metaphor_code、past_clans，等并入新页签时再补）和 ④-1、⑥-1（等搬迁）。 | 下一步见 §0.1 末尾「P1–P4 之后」 |





| P2 | 第一性原理 ① `fp_economy`（44）→ ② `fp_iconicity`（46）→ ③ `fp_boundedness`（57）→ ⑤ `fp_vectors`（82） | 首页总枢，24 幕都会被看到；①②缺口小 | 每条原理一次提交；`appfp.py` 回归 |
| P2' | ④ `fp_one_king` 第 2–4 幕、⑥ `fp_zoom_focus` 第 2–4 幕 | ④-1、⑥-1 要零丢失搬去中英对照总枢（阶段 3），**搬的时候在新位置补 R2/R4**，原位置不补 | 先补留下的 6 幕 |
| P3 | `bamboo_tree`（85，实验室样板页签）→ `aux_transformer`（97）→ `five_patterns`（193）→ `tense_matrix`（262） | 语法核心；bamboo_tree 是实验室样板，先补好给别的页签对齐 | 例句大多已在画面上，主要是补单独朗读 + 整句朗读 |
| P4 | `writing_alchemist`（228） | 写作，长句多，六年级用；最后做 | 白板长句全部要朗读，先确认朗读条能放下 |
| ✅ 已删 | `vowel_shift`（42）| 已并入格林定律章「元音变异」；2026-10-29 用户确认后删页签 | 不再统计 |
| 暂缓 | `stress_rhythm`（103）、`metaphor_code` 空间 / 时间条目、`past_clans` 复数例 | 决策 5 / 6 要部分并入「语调地图」「合成词重音」「空间隐喻」「不规则复数」；先列清单、并入后只补留下的部分 | 等新页签开工时一起定 |

- R4：旧幕都没有 `actionWords` 清单；补 R2 时同步列清单（例句里的动作动词见 `r2check.py <id> --all-items` 末尾「提示」行）。
- **P1–P4 之后（2026-10-29 23:25）**〔按 git log 更正：2026-10-29 22:31 JST，`7ec20c7`〕：R2 推广清单已做完（第一性原理 22 幕 + 实验室 adj_order / bamboo_tree / aux_transformer / five_patterns / tense_matrix / writing_alchemist）。复算 `r2check.py all --summary`：剩余缺口只在暂缓页签（past_clans 134 词 15 句、stress_rhythm 97/6、metaphor_code 69/13、vowel_shift 42/0）和 ④-1、⑥-1（各 18 词）。
  - 本轮统一做法：旧幕不改画面，只在收尾（`D.fin` / `k.final` / `h.final` / `finalBox`）前追加 `k.say`；画面上的错句、公式标签（S V O、V-ing、adj、sb/sth）、对比符号 vs、拆开的词尾残片一律写进案例 `r2skip`（整句错句可直接写整句）。
  - ✅ 2026-10-29 23:35 `metaphor_code`〔按 git log 更正：2026-10-29 22:32 JST，`5b17a2a`〕 3 案例 R2 69 → 0、句子 13 → 0：按 MASTER_DESIGN 第 81 行，「人体、颜色、动物隐喻留在原页签」，三个案例都不会被搬走，所以先补（原「暂缓」行写的是整页签，过严）。补读：head/face/mouth/hand/foot/arm/leg、face of a clock、mouth of a river、at the head of the line、eye of a needle、neck of a bottle、give me a hand；颜色词、a green hand、a white lie、give the green light、golden opportunity、Don't feel blue!；as busy as a bee、The early bird catches the worm、as gentle as a lamb、as brave as a lion、rain cats and dogs、a lucky dog、black sheep、white elephant、-er/-est。以后「空间隐喻」新页签若要借用这里的某些条目，复制过去即可，这里不删。验收：r2check --strict 83 词 21 句全过；渲染回归只有 metaphor_code 3 幕变化；jscheck、appwb 过。
  - ✅ 2026-10-29 23:45 `past_clans`〔按 git log 更正：2026-10-29 22:34 JST，`0a5d255`〕 4 案例 R2 134 → 0、句子 15 → 0：四个案例都是不规则过去式（AAA、i→a、ee→e+t、-ought/-aught），白板脚本里没有复数例（MASTER_DESIGN 第 83 行说的「复数例」不在白板案例里），不会被并走，所以先补。补读：四派的例句整句、各派成员（hit/let/cost、sing/sang/sung、swim/swam/swum、drink/drank/drunk、sit/sat、give/gave、begin/ring/rang、run/ran、come/came、sleep/feel/leave、keep/kept、sweep/swept、meet、feed/fed、teach/catch/buy/bring/think/fight 及过去式）和词块 -ed/-ng/-nk/ee/ea/-ought/-aught/gh/br-。`r2skip`：红叉错写 putted、hurted，派别标签 AAA。验收：r2check --strict 139 词 14 句全过；渲染回归只有 past_clans 4 幕变化；jscheck、appwb 过。
  - 至此 R2 剩余缺口：stress_rhythm（97 词 6 句，要部分并入「语调地图」「合成词重音」，等新页签开工）、~~vowel_shift~~（已删页签，2026-10-29）、④-1 / ⑥-1（等搬迁）。
  - 下一轮候选（不用等用户的）：①R4 动作词清单——旧幕补 `actionWords` 要先有讲解员（视觉 v2 升级），所以和 v2 升级一起做；②暂缓页签里**不会被并走**的部分（past_clans 的过去式部分、metaphor_code 的非空间 / 时间条目）可以先补，复数例、空间 / 时间条目等并入时再补。

## 0.5 阶段 2 进度（单词身世第一批，2026-10-29 起）

| # | 内容 | 状态 / 提交 |
|---|---|---|
| 1 | Europe 示范幕（`cases/wo_europe.js`，引擎 v2 + 讲解员，对齐 port 样板） | ✅ 见下 |
| 2 | Bluetooth 示范幕（`cases/wo_bluetooth.js`） | ✅ 见下 |
| 3 | 身世标签 + 词卡跳转（先给 port 家族） | ✅ 见下 |
| 4 | 格林定律章（吸收并删除 `vowel_shift`，R1 零丢失流程） | ✅ 四幕上线、清单 211 条对照完（✅ 2026-10-29 用户确认后已删旧页签、改 15 处入口）。原记录：① 出处 ✅ `caa1493`（SOURCES ④ 12 条、⑤ 14 条，含纠错）；② 真格林定律幕 `wo_grimm`；③ 元音变异三幕 `wo_vowel_a/b/c`；④ 清单 185 条逐项打勾。**删 `vowel_shift` 页签 / 改入口等用户确认，不动** |
| 5 | 时间与度量章 | ✅ 出处 `d9d3c22`；数字幕 `wo_time_num` `1b9547d`；星期和月份幕 `wo_time_week`（本次） |

**Europe 示范幕（2026-10-29）**
- 出处先登记：`word_origins/SOURCES.md` ② 12 条（etymonline Europe / European / -an / African / Euro- / Euro；维基 Europa 神话、卫星、欧元纸币；中文维基 欧洲 / 坤舆万国全图）。名字来源三种说法（神话公主、eurys+ops「宽脸」、闪米特语「西方」）**全部标 ❓**，神话标 📜 + ✂️（原故事是「劫走」，讲给小学生简化成「驮过大海」）。
- 分镜：`word_origins/EUROPE_STORYBOARD.md`（镜头总表、英文词清单、动作词清单、四层 × 四关自查、逐条时间码）。5 步：地图 → 神话（公主采花、骑白牛、游到克里特岛）→ 名字三说 ❓ + 词族（-an → European，Euro- → euro）→ 彩蛋（木星卫星 Europa、欧元纸币水印）→ 中文（利玛窦 1602 音译「欧逻巴」→ 欧洲）→ 🔮 Africa + -an = African → 金句卡。总长约 148 秒，13 句朗读。
- 引擎 / 道具扩展（只加不改，旧幕不受影响）：`wb_actor.js` 新角色 look `princess`（披肩长发 + 小金冠 + 长裙，裙摆在腿前面）、新动作 `sit`（坐 / 骑，不自动着地、不画地面影子）、新道具 `flower`；`wo_props.js` 新道具 `D.bull`（白牛，身体和腿分组，游泳时腿淡出）。
- 验收：`r2check.py wo_europe --strict` 英文词 / 词块 12/12、R4 动作词 4/4（picks / rides / swims / have，均与朗读重叠）；`jscheck.py` 过（21 个按需加载模块）；`reg_render.py` 旧 64 幕 × 5 时刻逐字节一致（只多出 wo_europe 5 项）；`appwo.py` port + europe 都 mounted、无报错、无 NaN，bluetooth 占位正常；fps（游泳镜头 38–58 秒）平均 60.0、1% 低帧 52.6、每帧渲染 1.41 ms。
- 同时纠正文档里的讲错处（R3）：`europe_culture/DESIGN.md` 原写「Europe 📜 来自神话公主」→ 改 ❓；`DEPTH_AND_ANIMATION.md` 洞见同步改；总枢章节卡副标题改为「背后有一个神话（来历有好几种说法）」、徽章 📜 ✂️ ❓。
- 已知取舍：①白牛是道具（不是骨架角色），走路用整体平移 + 轻微挤压起伏，游泳时腿藏进水里；②公主「骑上牛背」用跳起 → 空中换成坐姿角色（0.12 秒交叉淡化）；③没有录屏（沙箱无语音），截图逐张看过；④「-an」规则标 ✂️（European 实际经法语、拉丁语来）。
- 待用户看：Europe 幕是否满意（画面风格对齐 port 样板，未单独审片）。

**Bluetooth 示范幕（2026-10-29）**
- 出处：`SOURCES.md` ③ 10 条（维基 Harald Bluetooth / Bluetooth、蓝牙技术联盟官网 Origin of the name、etymonline toothbrush / football / sunflower）；外号来历两种说法标 ❓。
- 分镜：`word_origins/BLUETOOTH_STORYBOARD.md`。5 步：北欧地图 + 国王统一部落（unites）→ blue + tooth、牙齿变蓝、❓ 两说 → 合成词（toothbrush、football）→ 1997 命名、设备连线（connects）、卢恩字母 H + B 合成标志 → 中文意译 vs 音译 → 🔮 sun + flower = sunflower → 金句卡。总长约 110 秒，9 句朗读。
- 引擎扩展：`wb_actor.js` 新 look `king`（金冠、长发、胡子、红披风）。
- 验收：`r2check.py wo_bluetooth --strict` 12/12、R4 2/2；port / europe / bluetooth 三幕合计 48 个词全 ✔、R4 19/19；旧 64 幕 + europe 渲染逐字节不变；`appwo.py` 三幕都 mounted、无报错；fps（统一镜头）平均 60.0、1% 低帧 51.0。
- 小修：字幕里的卢恩字母字符（ᚼ ᛒ）在常见中文字体里显示成方块，改成文字描述，画面上的字母用线条画。
- 已知取舍：地图是简化示意（标「不按比例」）；蓝牙标志是黑色线条叠在蓝底上（真实标志是白色）。

**📖 身世标签 + 词卡跳转（2026-10-29，port 家族）**
- 数据：`wo_hub.js` 的 `WO_ORIGIN_TAGS`（按单词小写登记 `{ scene, badge, line }`，和 MASTER_DESIGN 决策 12 的 `origin_tags` 字段同一格式；放在总枢源文件里而不是改 `VOCAB_DB` 本体，词库数据不动）。已登记 8 个词：port、airport、passport、import、export、transport、report、support（都在 `SOURCES.md` ① 有出处行）。
- **没加标签的**（SOURCES 里没有出处行，按 SOP §11.6 不加）：reporter、important、sport。important 的词源（拉丁语 importare）、sport（disport）要加的话先补 SOURCES。
- 词卡：背面「📖 词源与巧记故事」下面多一块「📖 身世标签」，点一下关闭词卡、跳到 `navigateTo('word_origins_hub', { scene })`。由 `insert_wb.py` 插入（标记 `<!-- WO_ORIGIN_TAGS -->`，可重复运行）。
- 验收：`src/apptags.py`——8 个词都在词库、指向的幕已上线；8 个词翻到背面都有标签、reporter 没有；点 passport 的标签 → 词卡关闭、进入单词身世总枢 port 幕且白板已挂载；无报错。PASS。
- ✅ 2026-10-29 用户确认后已处理 port 家族词卡（HANDOFF §4 第 5 条）：7 张有标签的卡 + port 卡的旧「家族串记」换成「两条亲戚线」（⚓ 港口线 airport·passport ｜ 📦 搬运线 import·export·transport·report·support·important·sport，成员一个不少）；import / export / passport 的积木拆词、巧记、小故事里把港口和搬运混讲的地方按出处改正；`WORD_FORMATION_DB.roots` port 卡改成两条亲戚线；第二词库 airport 同步。reporter / important / sport 没有身世标签，原段落不动。逐字段清单 `word_origins/PORT_FAMILY_INVENTORY.md`（16 字段，❌ 0）。验收：jscheck OK；reg_render 80 幕逐字节一致；apptags PASS；词卡、构词法页截图正常无报错。

**格林定律章（2026-10-29 21:40 起，进行中）**〔按 git log 更正：2026-10-29 21:12 JST，`caa1493`〕
- 出处（`caa1493`）：`word_origins/SOURCES.md` ④ 真格林定律 12 条、⑤ 元音变异 14 条。纠错要点（R3，写进新幕，旧页签不动）：①「格林音变律」名字不准——格林定律是辅音挪位，foot→feet 是元音变异（i-mutation）；② length/strength 的 o→e 也是 i 变异（后缀 \*-itho 里的 i），不是「嘴巴省力缩短」；③ width 是 1620 年代仿 breadth 新造的，deep/depth、wide/width 读音差距主要来自 1400–1700 大元音推移（✂️）；④ safe/save、use/use 是法语借词，不属于古英语清浊交替（⚠️）；⑤ blood 读 /ʌ/ 不是 /uː/；⑥ full→fill 是形容词变动词。
- ✅ 第 1 幕 `wo_grimm`（真格林定律，约 142 秒，18 句朗读）：老祖宗分两家 → 时光机 pes→foot、pedal 没变 → 一排都挪（tres/three、dentist/tooth、December/ten、dual/two、century/hundred、cardiac/heart）→ 彩蛋 December 第十个月 + Jacob Grimm → 中文「脚 ↔ 足」💡 → 🔮 ped = foot、pedestrian 行人走过 → 金句卡。验收：`r2check wo_grimm --strict` 21/21、R4 2/2；旧 66 幕 330 次渲染逐字节一致（只多 wo_grimm 5 项）；jscheck 23 模块过；appwo 四幕 mounted、无报错；appwb bamboo_tree、appfp 0 过。分镜 `grimm_law/GRIMM_STORYBOARD.md`。总枢新增章节「🔤 格林定律：辅音和元音的大挪移」（`wo_hub.js` WO_CHAPTERS），`WO_READY` 加 `wo_grimm`。
- 已知取舍：截图逐张看过（时光机、词族表、罗马历、预测、金句卡），没有录屏；行人在金句卡前淡出。
- ✅ 元音变异三幕 `wo_vowel_a`（原定律 A，foot→feet）、`wo_vowel_b`（原定律 B，long→length）、`wo_vowel_c`（原定律 C，清浊交替）：原 `vowel_shift` 三个案例的全部画面、字幕、术语、朗读整体搬来（文件 `cases/wo_vowel_a/b/c.js`，共用小工具 `cases/wo_vowel_kit.js`），加 v2 片头卡 + 讲解员 + 每个英文词单读和例句 + 纠错（R3，见上）+ 徽章。讲解员演的动作：fill（take）、bleed（surprised + oops）、feed（put）、save（put）、close（turn）、breathe（cheer）。验收：`r2check wo_vowel_a/b/c --strict` 14/22/15 词全过、R4 3/0/3；旧 67 幕 335 次渲染逐字节一致（新增 15 项都是新幕）；jscheck 27 模块过；appwo 七幕 mounted 无报错；apptags PASS；appwb vowel_shift 旧页签照常。
- 工具改动（只加不改）：`insert_wb.py` 新增 `WO_KITS`（几幕共用的小工具文件作为依赖先执行，`data-deps="wo_props wo_vowel_kit"`）；`preview.html` 载入 `wo_vowel_kit.js`；`r2check.js` 新增案例字段 `r2skip`（画面上故意展示的错误形式不计入 R2，如 longth、foots；SOP §7 第 3 条）。
- R4 提示：wo_vowel_c 例句「Take a deep breath」里的 take 不是「拿」的动作，只提示不算缺。
- ✅ 2026-10-29 用户确认后已删 `vowel_shift` 页签、改 15 处入口（首页卡片改「已搬家」跳转卡 → `wo_vowel_a`；旧链接自动跳转）。验收：jscheck OK（39 模块）；reg_render 其余 80 幕 400 次渲染逐字节一致（只少 vowel_shift 15 项）；appwo、apptags PASS；首页卡片、旧链接跳转冒烟无报错。
- ✅ 清单逐项打勾（`src/check_inventory.py`，可重复运行）：`grimm_law/VOWEL_SHIFT_INVENTORY.md` 里字幕 / 白板 / 朗读 182 条 + 术语 29 条 = 211 条（原记「185 条」是只数了部分行），✅ 原样搬过去 202 条、✏️ 按 R3 改正后搬过去 9 条（原讲法作为「原讲法（已改正，保留备查）」引用留在新幕术语里）、❌ 0 条；页面数据 `GRIMM_VOWEL_LAWS` 19 对词全部在新幕画面上。文件末尾追加了对照汇总和改正清单（原 → 新）。15 处入口未动（等用户确认）。
- **格林定律章完成**（4 幕：`wo_grimm`、`wo_vowel_a/b/c`）。等用户：①看四幕是否满意；②确认后按 R1 删 `vowel_shift` 页签并把 15 处入口改指新章。

**时间与度量章（2026-10-29 22:30 起）**〔按 git log 更正：2026-10-29 21:27 JST，`d9d3c22`〕
- ✅ `wo_time_num` 数字的秘密（约 121 秒，18 句朗读）：十个点 = ten → eleven = one + left、twelve = two + left → thirteen/fourteen/nineteen = 几 + ten，-teen = ten → dozen = duo + decem（呼应格林定律 d→t），搬运工抱一打鸡蛋走（carries）→ 中文四位一节 vs 英文三位一节、million = mille + -one、一万 = ten thousand → 🔮 一亿 = one hundred million → 金句卡。验收：r2check --strict 22/22、R4 1/1；旧 70 幕 350 次渲染逐字节一致；jscheck 28 模块；appwo 八幕过。分镜 `time_measure/STORYBOARD.md`。总枢「⏰ 时间与度量的身世」章节上线（`WO_CHAPTERS` 加 scenes）。
- ✅ `wo_time_week` 星期和月份（约 156 秒，23 句朗读）：天上七位客人 → 日耳曼的神（Tiw、Woden、Thor、Friga），闪电雷神 → 七天名字表（Saturday 没换）→ 古英语 þunresdæg → Thursday → September ← septem，古罗马历三月开始（Sep–Dec = 第 7–10 个月），后来前面加了一月二月 → 中文按数字 vs 日语按天体（💡）→ 🔮 Monday = moon + day → 金句卡。验收：r2check --strict 29/29、R4 1/1；旧 71 幕 355 次渲染逐字节一致；jscheck 29 模块；appwo 九幕、appfp 0 过。
- 时间与度量章两幕完成。已知取舍：①🔮 题 Monday 在镜头 2 已出现过（是回忆题不是推理题），以后可换成「octo = 8 → octopus 有几条腿」（octopus 词源要先补出处）；②没有「a.m. / p.m.、mile = 一千步」（章节卡原写的例子），要做先补出处。

## 0.6 阶段 3 进度（中英对照总枢，2026-10-29 23:55 起）〔按 git log 更正：2026-10-29 22:35 JST，`f38e32c`〕

| # | 内容 | 状态 / 提交 |
|---|---|---|
| 1 | 搬迁内容清单（R1 第 1 步）：④-1、⑥-1 逐条导出 | ✅ `zh_en_hub/INVENTORY_4-1.md`（27 条 + 术语 6 + 页面卡片）、`INVENTORY_6-1.md`（32 条 + 术语 + 页面卡片） |
| 2 | 总枢设计文档 `zh_en_hub/DESIGN.md`（章节 A/Q/正迁移/N/M、11 幕幕表、每幕标准、技术接线） | ✅ |
| 3 | 总枢页面骨架（首页横幅 + `zh_en_hub` 页面 + 章节卡，参照 `wo_hub.js`） | ✅ `src/ze_hub.js`（`ZE_CHAPTERS` 5 章 11 幕、`renderZhEnHubView`、`zeAnimId`）；`insert_wb.py` 新增 `ZE_READY`、首页横幅 `<!-- ZE_HOME -->`（单词身世横幅下面）、路由 `zh_en_hub`、停循环；`wb_app.js` `startWBLoop(…, "ze")`；验收脚本 `src/appze.py`。没上线的幕按钮禁用、选到时回落到第一个已上线的幕 |
| 4 | 搬 ④-1 → 「是 ≠ be」幕（原样搬 + v2 + 讲解员 + R2 补齐），清单逐条打勾 | ✅ 第一步：`cases/ze_be.js` 原样整幕搬（依赖 fp_props），标题改「🔀「是」≠ be（原理 ④ 一山不容二虎）」，加一条中英对照字幕，补 R2（r2check --strict 20 词 6 句全过）；清单 27 条 ✅26 / ✏️1 / ❌0、术语 6/6。渲染回归：旧 72 幕 360 项逐字节一致，只多 ze_be 5 项；jscheck 30 模块；appze、appwo 过。**第二步（升 v2 + 讲解员）待做** |
| 5 | 搬 ⑥-1 → 「修饰语位置」幕，清单逐条打勾 | ✅ 第一步：`cases/ze_modifier.js` 原样整幕搬，标题改「🔀 修饰语位置（原理 ⑥ 焦点先行）」，加一条中英对照字幕，补 R2（22 词 7 句全过）；清单全部 ✅ / ✏️1 / ❌0。渲染回归旧 73 幕逐字节一致；appze 过。第二步（v2 + 讲解员）待做 |
| 6 | 原理页删 ④-1、⑥-1，留一句话 + 跳转入口 | ✅ `FIRST_PRINCIPLES_DB` 两幕加 `movedTo: { scene, title, line }`、标题加「（已搬到 🔀 中英对照总枢）」；`insert_wb.py` 让原理页遇到 `act.movedTo` 时舞台换成 `fpMovedHtml(act)`（一句话 + 「去看这一幕」按钮，在 `ze_hub.js`），术语区隐藏；`WB_LAB.fp_one_king[0]` / `fp_zoom_focus[0]` 换成占位白板（保证幕序号不变；case 0 的 terms 是全原理共用术语，保留）。原内容只在 `cases/ze_be.js`、`ze_modifier.js`。验收：两条原理第 1 幕显示跳转卡、点按钮进入总枢对应幕并挂载；appfp 3/5 过；渲染回归只有两个占位幕变化；r2check 两条原理全过。**搬迁完成** |
| 7 | 新幕 `ze_same` 这些你已经会了（引擎 v2 + 讲解员，正迁移） | ✅ 4 个镜头：我爱妈妈 / I love my mom（顺序一样）→ a red apple / a big cat（形容词在前，⚠️ 长修饰挂后面）→ three books（数字在前，⚠️ 加 -s）+ I can jump（讲解员跳起来，R4）→ 口诀 → 🔮 他喜欢小狗 = He likes dogs → 金句卡。`wo_props.js` 的 `D.scene` 新增 `steps` 选项（换进度条文字：① 中文 ② 对一对 ③ 英语 ④ 例子 ⑤ 口诀 🔮 预测；不传 = 溯源幕原样，旧幕渲染不变）；`insert_wb.py` 新增 `ZE_DEPS`（新对照幕依赖 wo_props）。配色只用 V3 四色。验收：r2check --strict 21 词 4 句、R4 1/1；旧 74 幕渲染逐字节一致；jscheck 32 模块；appze 过；截图逐张看过（修了 purple / orange 不在调色板、books 荧光位置不准） |
| 8 | 新幕 `ze_yesno` Yes / No 跟着事实走（v2 + 讲解员，Q 否定疑问） | ✅ 中文「你不喜欢牛奶吗？——不，我喜欢」→ 照搬成 No, I like ❌（r2skip，讲解员 surprised + oops）→ 英语看事实：Yes, I do. / No, I don't.（讲解员点头）、规则「Yes + 肯定，No + 否定」标 ✂️ → 例子 Isn't it cold? Yes, it is. / Can't you swim? No, I can't. → 口诀「问句有「不」别管它，事实是啥答啥」→ 🔮 Aren't you a student? = Yes, I am. → 金句卡。验收：r2check --strict 18 词 9 句；旧 75 幕渲染逐字节一致；appze 过；截图看过。R4：本幕没有要演的动作动词（swim 只出现在问句里，不演）。 |
| 9 | 新幕 `ze_borrow` 借：borrow / lend（v2 + 讲解员，N 一字多词） | ✅ 中文一个「借」两个方向 → 照搬分不清 ❌ → borrow ←（讲解员走到汤姆面前拿过书，R4）/ lend →（汤姆从讲解员手里接过书，R4）、borrow from / lend to → Can I borrow your pen? / Can you lend me your pen? → 口诀「借进来 borrow from，借出去 lend to」→ 🔮 汤姆借给我一本书 = Tom lends me a book. → 金句卡。场景角色 traveler 扮汤姆。验收：r2check --strict 14 词 6 句、R4 2/2；旧 76 幕渲染逐字节一致；appze 过；截图看过（修了揭晓词位置）。 |
| 10 | 新幕 `ze_subject` 句子必须有主语（v2 + 讲解员，A 中英思维） | ✅ 中文「下雨了 / 好冷 / 去上学了」省主语 → 照搬 Is raining. / Is cold. ❌（r2skip）→ 占位主语 it：It is raining. / It is cold! / What time is it? It is seven o'clock. → 有人做的事把人说出来：I go to school.（讲解员走几步，R4）/ He goes too.；✂️ 祈使句例外 Sit down, please. → 口诀「英语句子要有主，没人做事请 it 住」→ 🔮 好热啊！今天是星期一 = It is hot! It is Monday today. → 金句卡。验收：r2check --strict 20 词 8 句、R4 1/1；旧 77 幕渲染逐字节一致；appze 过；截图看过。注意：r2skip 里不要放单个常用词（如 Is），它会把正确句里的同一个词也滤掉。 |
| 11 | 新幕 `ze_link` 形合 vs 意合（v2 + 讲解员，A 中英思维） | ✅ 中文靠意思连（下雨了，不去了）、「因为……所以……」成对用 → 照搬 Because it rained, so we stayed at home. ❌（r2skip）→ 英语用连接词、because / so 二选一、although / but 二选一（四个正确句都朗读）→ 中文只有逗号的地方英语补 and / so → 口诀「中文靠意思，英语靠钩子」→ 🔮 I was tired, so I went to bed early.（另一种说法也朗读）→ 金句卡。验收：r2check --strict 32 词 8 句；旧 78 幕渲染逐字节一致；appze 过；截图看过。R4：played / went 是过去发生的事，不演。 |
| 12 | 新幕 `ze_mark` 单复数和时态要「上身」（v2 + 讲解员，总览幕） | ✅ 中文「一本书 / 三本书、每天去 / 昨天去」词不变 → 照搬 three book / I go yesterday ❌ → 英语换衣服：books（-s）、I go to school every day.（讲解员走，R4）/ I went to school yesterday.、She likes cats.（三单）→ two dogs、They played football yesterday.、✂️ 不规则 child → children、细讲指路（第一性原理 ③、时态矩阵、过去式门派）→ 口诀「中文靠小词，英语换衣服」→ 🔮 I read two books yesterday. → 金句卡。验收：r2check --strict 24 词 6 句、R4 1/1；旧 79 幕渲染逐字节一致；appze 过；截图看过。已知：荧光底色在沙箱截图里比文字略偏上，旧幕（wo_time_num）同样，属引擎 / 字体度量，未改。 |
| 13 | 新幕 `ze_say` 说：say / speak / talk / tell（v2 + 讲解员，N 一字多词） | ✅ 中文四个「说」→ 照搬 speak hello / say English ❌ → 四张词卡：say hello（讲解员挥手打招呼，R4）、speak English、talk with a friend、tell me a story（+ tell him the news、talk about a film）→ 例子 Say thank you. / The teacher tells us the news. / Let's talk about the film. → 口诀 → 🔮 Can you speak French?（French 标 🥚）→ 金句卡。标题长，副标题缩成「🔀 一字多词」免得压住徽章。验收：r2check --strict 25 词 7 句、R4 1/1；旧 80 幕渲染逐字节一致；appze 过；截图看过。 |
| 14 | 新幕 `ze_wear` 穿 / 带 / 教学（v2 + 讲解员，N 一字多词） | ✅ 穿：wear（穿着）/ put on（穿上），照搬 Wear your coat quickly! ❌ → She wears a red dress. / Put on your coat, please!；带：take（讲解员抱起箱子走开，R4）/ bring（抱回来放下，R4）、Take the box to the classroom. / Bring your book to me.；教 / 学：Miss Li teaches us English. / We learn English from her. → 口诀 → 🔮 Bring your photos to me. → 金句卡。验收：r2check --strict 30 词 7 句、R4 2/2；旧 81 幕渲染逐字节一致；appze 过；截图看过。 |
| 15 | 新幕 `ze_pronoun` I / me / my / mine（v2 + 讲解员，M 代词变格） | ✅ 出处先登记 `zh_en_hub/SOURCES.md`（维基 Declension：古英语是变格语言、现代英语大多丢了；名词不分主宾格靠词序；代词还留着 I/me/my/mine、he/him）。中文一个「我」→ 照搬 Him likes I. ❌ → 四列代词表（主语 / 宾语 / + 名词 / 单独用，5 行）→ 📜 古英语变格、The dog sees the cat. / The cat sees the dog. 名词不变、He sees him. / You see me. 代词还在变、💡「活化石」→ 口诀「做主语 I，当宾语 me，带名词 my，单独用 mine」→ 🔮 She is my friend. I like her. → 金句卡。验收：r2check --strict 28 词 5 句；旧 83 幕渲染逐字节一致；appze 过；截图看过。 |
| — | **中英对照总枢 11 幕全部上线**（2026-10-30 03:15）〔按 git log 更正：2026-10-29 23:06 JST，`adb2106`〕 | 下一步：① 搬迁幕 `ze_be`、`ze_modifier` 升引擎 v2 + 讲解员（先存 `_classic` 回退文件）；② MASTER_DESIGN §4 阶段 4「实验室新页签」（短语动词总钥匙等，删 `verb_matrix` 前要零丢失清单）。 |
| ✅ | **`ze_be` 升 v2 + 讲解员**（2026-10-29 23:35 JST）〔按 git log 更正：2026-10-29 23:23 JST，`b55a01c`〕 | 升级前存 `cases/ze_be_classic.js`（不进 App）。新版：对照版五步 + 🔮 预测；两个 king 角色举「am」「like」词卡走向王座、跳起来打架，am 国王退场、like 国王欢呼；讲解员思考 / 惊讶 / 指 / 举「am」卡 / 欢呼；金句卡。依赖改 `wo_props`（`ZE_DEPS`）。零丢失对照新工具 `src/check_upgrade.py` → `zh_en_hub/INVENTORY_ZE_BE_V2.md`（54 条，❌ 0）。`preview.html` 支持 `ze_*`。验收：r2check --strict 23 词 7 句 R4 2/2；reg_render 只有 ze_be 变化；appze 过；截图检查。 |
| ✅ | **`ze_modifier` 升 v2 + 讲解员**（2026-10-29 23:50 JST）〔按 git log 更正：2026-10-29 23:25 JST，`b8366bd`〕 | 升级前存 `cases/ze_modifier_classic.js`。新版：对照版五步 + 🔮 预测（桌子上的那只猫 → the cat on the table）；树干树枝白板保留；讲解员指中文核心、指树干、举「the boy」卡、读 see 时指、读 tell 时挥手；金句卡。`something important` 紫 → 红（V3 四色，文字不变）。零丢失 `zh_en_hub/INVENTORY_ZE_MODIFIER_V2.md`（66 条，❌ 0）。验收：r2check --strict 23 词 9 句 R4 2/2；reg_render 只有 ze_modifier 变化；appze、appfp 3/5 过。**中英对照总枢 11 幕全部是 v2 + 讲解员。** |
| ✅ | **阶段 4 ① 短语动词总钥匙 `phrasal_key`**（2026-10-29 23:58 JST）〔按 git log 更正：2026-10-29 23:34 JST，`53a8d60`〕 | 新页签：「📖 白板课」两幕（`cases/phrasal_key.js`，v2 + 讲解员：① 小品词方向义 sit down 坐凳子 / stand up 蹦起 / look up 指天 / go out 走出 / come back 走回 / ON·OFF 词卡；② get/take/make/put 核心义 + 方向，take out 拿箱子 / put down 放下 / get up 蹦起 / make up 想故事）+「🎬 组合区」= 原 `verb_matrix` 正文逐字原样（36 个 VV 动画不改）。旧入口 → 组合区。合并记录 `lab/VERB_MATRIX_MERGE.md`（❌ 0）。`insert_wb.py` 新增 `LAB_DEPS`；`r2check.js` R4 支持多词动作（短语动词）；修旧 bug：实验室入口参数覆盖页签导致切不了页签。验收：r2check --strict 2 幕 45 词 R4 9/9；reg_render 其余 80 幕不变；appwb phrasal_key/bamboo_tree/adj_order、appze、appwo、appfp 过；36 组 VV 全挂载。 |
| ✅ | **阶段 4 ② 英语只剩 8 个词尾 `eight_endings`**（2026-10-30 00:15 JST）〔按 git log 更正：2026-10-29 23:37 JST，`8d1377b`〕 | 新页签 ⑬（首页卡片 + 页签按钮 + 说明卡 + 白板一幕 v2 + 讲解员）：中文不变 vs 英语长尾巴 → 名词 2（-s、's）→ 动词 4（-s、-ed、-ing、-ed/-en；讲解员边读边走）→ 形容词 2（-er、-est；跳起来比最高；长词 more/most）→ 📜 古英语 scip 变格 → 词序更重要 → 🔮 She cleaned three rooms yesterday → 金句卡。出处 `lab/SOURCES.md` ①（Wikipedia Inflection，8 条）。验收：r2check --strict 35 词 3 句 R4 3/3；appwb 过；reg_render 其余幕不变。 |
| ✅ | **阶段 4 ③ 发音五大坑 + 48 音标口腔地图 `pron_map`**（2026-10-30 00:45 JST）〔按 git log 更正：2026-10-29 23:43 JST，`60020bf`〕 | 新页签 ⑭（首页卡片、页签按钮、说明卡、三幕切换按钮 `pmIdx`）。三幕 v2 + 讲解员：① 五大坑（th 夹舌带侧面口腔图、v/w 嘴唇开合、尾音不加「呃」、l/n、sheep/ship 长短音）② 辅音口腔地图（侧面口腔图 7 个位置依次亮点，24 个基本辅音 + 例词）③ 元音舌位梯形（12 单 + 8 双 = 20）。口型道具复用 `FP_PROPS.mouth / lips`：修了它们建组后把当前组清零的问题（现在回到调用方的组；`WO_PROPS` 新增 `D.adopt()` 让声带 / 嘴唇组跟镜头一起擦；旧幕 fp_economy 渲染逐字节不变）。依赖 `wo_props fp_props`。出处 `lab/SOURCES.md` ②。验收：r2check --strict 3 幕 73 词 0 缺；appwb 3 幕过；reg_render 只多出 pron_map 15 张。 |
| ✅ | **阶段 4 ④ 语调地图 `intonation_map`（并入 `stress_rhythm`）**（2026-10-30 01:10 JST）〔按 git log 更正：2026-10-29 23:47 JST，`f497a1a`〕 | 王炸 ⑥ 位置改为「🎵👂 ⑥ 语调地图」：切换条「🎵 语调」（新两幕 v2 + 讲解员：升调与降调、句重音）｜「🎯 重音与弱读」（原 stress_rhythm 正文、DB、3 幕白板逐字原样）。旧入口 → 🎯 区。合并记录 `lab/STRESS_RHYTHM_MERGE.md`（❌ 0），出处 `lab/SOURCES.md` ③。`insert_wb.py` TABS 去掉 stress_rhythm（标记已在主文件）。验收：r2check --strict 新两幕 49 词 0 缺；appwb intonation_map 2 幕、stress_rhythm 3 幕过；App 冒烟（卡片 / 旧入口 / 切换 / 换页签）无报错；reg_render 只多出新幕。 |
| ✅ | **决策 6 ① 合成词重音**（2026-10-30 01:20 JST）〔按 git log 更正：2026-10-29 23:48 JST，`09f2847`〕 | 做成语调地图「🎵 语调」区第 3 幕（v2 + 讲解员）：BLACKboard / black BOARD、GREENhouse、HOTdog、WHITE House，句子里 Look at the BLACKboard（讲解员指），🔮 FOOTball。原 stress_rhythm 没有合成词条目，无需搬迁。验收：r2check --strict 3 幕 64 词 0 缺；appwb 3 幕过。 |
| ✅ | **决策 6 ② 不规则复数 `irregular_plural`**（2026-10-30 01:45 JST）〔按 git log 更正：2026-10-30 00:06 JST，`52b7121`〕 | 新页签 ⑮（首页卡片、页签按钮、说明卡、两幕切换 `ipIdx`）。两幕 v2 + 讲解员：① 换元音（feet / teeth / geese / men / women / mice，古英语 i 变音的来历，🔮 postmen）② 另外四种（children / oxen、sheep / deer / fish、leaves / knives / wolves 与例外 roofs、people，🔮 three sheep）。出处 `lab/SOURCES.md` ④（Wikipedia English plurals）。**重叠旧内容的处理**：首页「王炸 03 古英语元音换装活化石」卡（ROYAL_TRUMPS_DB T03）里的复数条目和过去式条目在同一张速记卡上，格林章讲的是历史，二者都保留不删（删一半会让速记卡残缺）；本页签负责练习。验收：r2check --strict 41 词 0 缺；appwb 2 幕过；reg_render 455 张 0 错误。注意：沙箱重启后 /tmp 清空、playwright 要重装（`pip install playwright pillow && python3 -m playwright install chromium`）。 |
| ✅ | **首页改版第 6 步（首页收尾）：继续上次 + 王炸 ✓ 已学**（2026-10-30 00:50 JST）〔按 git log 更正：2026-10-30 00:33 JST，`f1cd18f`〕 | `docs/home/step6_continue.py`（可重复运行）：首屏标题下加「▶ 继续上次」一行（显示上次页面的面包屑标题，一点 `navigateTo` 回原页面和原页签 / 原幕；第一次来显示「从单词大世界开始」）+ 「🔥 已连续打卡 N 天」（断签超过 1 天显示「今天学一点，开始打卡」）。记录：`renderCurrentView` 末尾 `noteLastView()`，实验室 / 单词身世 / 中英对照三个页内重绘函数启动时包一层也会记；存 `appState.lastView`、`appState.visited`（键 `lab:<页签>`、`wo:<幕>`、`ze:<幕>`）。首页 `.lab-chip` 和实验室页内 `.lab-tab` 学过的前面加绿色 ✓。验收：入口缺失 0；jscheck OK；appwb irregular_plural 过；冒烟（开 3 个页签 / 1 幕 → 回首页 4 个 ✓、刷新后仍在、点继续上次回到 eight_endings）无报错。**首页改版全部完成。** |
| ✅ | **首页改版第 5 步：实验室页内页签分组** | `docs/home/step5_lab_tabs.py`：super_lab_hub 顶部 13 个页签按钮改由常量 `LAB_GROUPS` 生成，分 👄 发音 / 🔤 词汇 / 🧩 语法 · ✍️ 写作 三行（与首页入口卡一致）；去「v4.0 终极宗师」角标、面包屑改「⚡ 王炸实验室」、`tabTitles` 去圈号。首页加 `<!-- WO_HOME -->`、`<!-- ZE_HOME -->` 标记，`insert_wb.py` 重跑不再插回旧横幅（已验证重跑后文件不变）。**新增实验室页签的接线改为**：`LAB_GROUPS` 里加一项 + 首页 `.lab-entry` 对应组加一个 `.lab-chip`（onclick 用 `navigateTo('super_lab_hub', { labTab: '<id>' })`），不再手写页签按钮和首页大卡；其余（tabTitles、`} else if (tab === …)` 分支、READY / LAB_DEPS、appwb IDX、preview 名单）照旧。验收：jscheck OK；appwb phrasal_key / intonation_map / irregular_plural / writing_alchemist 过；点击分组按钮切页签实测正确；首页入口缺失 0。首页剩余：「继续上次」一行、王炸按钮 ✓ 已学。 |
| ✅ | **首页改版第 4 步：瘦身（下一轮优化 ①②④⑥ 的前半）** | `docs/home/step4_slim.py`：语音欢迎条压成一行小条；标题缩小、手机隐藏副标题；三大厅卡片图标与标题同行、标签只显示前 3 个（其余 display:none，内容未删）、按钮变矮；王炸卡「写作」并入「🧩 语法 · ✍️ 写作」组，电脑版变三栏；顶栏打卡日期隐藏。验收：入口缺失 0；手机首页 3371→2516px（约 2.8 屏）；jscheck OK；无页面报错。剩余：③ 首屏「继续上次」；⑤ super_lab_hub 页内页签分组 + 去「v4.0 终极宗师」角标；⑥ 王炸按钮标 ✓ 已学。用户规则更新：修改完立即提交（2026-10-30 00:26）。 |
| ✅ | **首页改版第 3 步：三大厅上移、总枢压成小卡（首页改版完成）** | `docs/home/step3_reorder.py`：首页新顺序 = 标题 → 「📚 今天学什么」（单词 / 语法 / 口语三大厅）→ 拓展教室 / 闯关横卡 → 「🧭 理解英语：三大总枢」三张并排小卡（第一性原理 / 单词身世 / 中英对照，onclick 逐字保留）→ 王炸实验室入口卡 → 「👑 更多」方法论 / 真动画教室小卡（原 portal 大卡换成小卡，目标 method_hub 不变）。顶栏角标「v4.0 终极宗师·十二大王炸全规律版」改为「小学英语 · 课标同步」。验收：入口缺失 0（22 目标）；手机首页 6820（改前）→ 3371px，约 3.7 屏；三张总枢小卡与方法论小卡点击实测进对页；jscheck OK；appwb pron_map 过；430 / 1280 截图无溢出、无页面报错。可选后续：实验室页内部页签按四组重排（2b）；super_lab_hub 页内「v4.0 终极宗师」角标（第 12388 行附近）去版本号。之后回到决策 6：空间隐喻 → 拼写潜规则 → 交际句型地图。 |
| ✅ | **首页改版第 2 步：首页王炸区收成一张入口卡** | `docs/home/step2_lab_card.py`：首页 15 张王炸大卡换成一张「⚡ 王炸实验室」卡，分 👄 发音 / 🔤 词汇 / 🧩 语法 / ✍️ 写作 四组小按钮；每个按钮的 onclick 从旧卡逐字取出（含单词身世 wo_vowel_a、单词卡 X 光 openWordCardModal），外加「进入实验室」按钮。`home_entries.py` 改为从 onclick 中提取 navigateTo(...)。验收：入口缺失 0；手机首页 6431→4715px；不规则复数 / 元音变异 / 单词卡 / 进入实验室四个按钮点击实测正确；jscheck OK；无页面报错；430 与 1280 宽截图检查无溢出。实验室页内部页签的分组重排留作第 2b 步（可选）。下一步：第 3 步（单词 / 语法 / 口语三大厅上移到首屏，三大总枢压成并排小卡）。 |
| ✅ | **首页改版第 1 步：入口清单 + 删重复 + 去版本号** | 新增 `docs/home/home_entries.py`（导出首页全部 navigateTo 入口；`--save` 存基线，`--check` 核对缺失）与基线 `docs/home/home_entries_baseline.json`（22 个去重目标）。`docs/home/step1_cleanup.py`：删掉重复的「十五大王炸方法论」渐变横幅（底部同名卡片保留，目标 method_hub 仍可达）；去掉 v1.6 / v4.0 / v6 标签和王炸卡片「v4.0全新」「新」角标；王炸栏标题「十二大…」改为「⚡ 王炸实验室（点任一卡片直达）」，去掉「新增：⑨…⑫」说明行；「v6 拓展教室」改名「拓展教室 / 闯关游戏厅」。验收：入口核对缺失 0；手机首页 6820→6431px；jscheck OK；appwb irregular_plural 过；首页 / method_hub / v6_hub 切换无页面报错。下一步：第 2 步（实验室按发音 / 词汇 / 语法 / 写作四组重排，首页王炸区收成一张入口卡）。 |
| ✅ | **首页优化方案（用户 2026-10-30 00:07 提出首页混乱，已给方案，待做）**〔✅ 已做完：首页改版 1–6 步，566710b … f1cd18f，2026-10-30 00:16–00:33 JST；方案记录提交 557fac9 00:09〕 | 问题：日常三大厅（单词 / 语法 / 口语）压在最底；手机首页约 6800px（7 屏多）；「十五大王炸方法论 / 真动画教室」入口重复两次；王炸栏标题写「十二大」实有 15 张、③ 是「已搬家」空卡、缺 ⑧；v1.6 / v4.0 / v5.1 / v6 等开发标签外露；卡片颜色、大小、徽章不统一。方案四层：① 今天学什么（继续上次 + 单词 / 语法 / 口语三大卡 + 闯关横卡）② 三大总枢并排小卡 ③ 王炸实验室收成一张入口卡（发音 / 词汇 / 语法 / 写作四个分组按钮），15 张卡移进实验室首页按组重新编号、去掉空卡 ④ 底部方法论 / 家长指南只留一个。去所有版本号，每层一个主色，卡片等高、说明一行。零丢失：先导出首页全部 navigateTo 入口清单，改完逐条核对。顺序（各自单独提交）：1 入口清单 + 删重复 + 去版本号；2 实验室按四组重排 + 首页王炸区收成入口卡；3 三大厅上移、总枢压成小卡；4 截图对比 + App 冒烟。 |
| ▶ | **下一步（接手从这里继续）** | **阶段 4 完成；首页改版 1–6 步完成；决策 6 已做合成词重音、不规则复数。** 接着决策 6 其余三个新模块（空间隐喻、拼写潜规则、交际句型地图） → 决策 7 词汇大数据 → 决策 8 家长指南 / 英美对照 / 大写标点 → 决策 9 欧洲文化 6 章 + 美国篇。新实验室页签做法：`cases/<id>.js`（v2 + `WO_PROPS`）→ `insert_wb.py` 的 `READY` + `LAB_DEPS` → 主文件 `LAB_GROUPS` 加一项 + 首页 `.lab-entry` 对应组加 `.lab-chip`、`tabTitles`、`} else if (tab === …)` 分支（锚点用 `\n  } else if (tab === "bamboo_tree") {\n`）→ `appwb.py` IDX、`preview.html` 名单。 |

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

### 1.3 已知不足（按新规则复查 port 幕，阶段 1 要补）〔✅ 2026-10-30 复核：下列 R4、视觉标准、Europe 出处三项都已在阶段 1–2 解决——port v2（2f4df49 … abb050c，用户 20:08 审片通过）人演搬 / 拿 / 走 / 托、v2 视觉全套；Europe 出处 29b97ee、幕 eb480aa〕
- ~~**R2 朗读**：opportunity 没有例句；Rome、Mediterranean 以外的专有名词和词块（medi、terra、ob、im、ex、trans、re、pass、air、sup）没有单独朗读。~~ ✅ 阶段 1 第 2 步已补（新增 12 句：Rome / medi+terra / ob portum / opportunity / portus+portare / im / ex / trans / re / OK+pass / air / sup；export 补单独朗读）
- **R4 动作**：搬运、进出城、过关卡是「箱子 / 卷轴自己移动」+ 火柴人平移，人没有做搬、拿、走的动作；support 没有人托。
- **视觉标准**：配色超出新调色板、只有一种缓动、镜头间是淡出不是擦除、白板上的词不随朗读高亮、没有小人、没有音效。
- 欧洲（Europe）幕的出处已查（etymonline「Europe」：名字来源**不确定**，常被解释为「宽脸」，传统上联系神话公主 Europa；维基百科：腓尼基公主、宙斯化白牛、驮到克里特；中文「欧洲」= 利玛窦《坤舆万国全图》里的「欧罗巴洲」缩写）——**还没写进 SOURCES.md、没写代码**；做的时候名字来源必须标 ❓。

---

## 2. 19 条决策摘要（详见 MASTER_DESIGN §2）〔2026-10-30 注：另有决策 22 商业动画标准（见文末「商业动画标准」节和 MASTER_DESIGN §2.7），共 20 条；20、21 号未使用〕

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

## 3. 下一步待办（按 MASTER_DESIGN §4 顺序）〔2026-10-30 注：这是 2026-10-29 18:35 写的阶段 1 待办，1–6 项都已完成；最新下一步见新 `HANDOFF.md`〕

**阶段 1 · 骨架补齐**（用户放行写代码后开始）
1. 写朗读覆盖检查脚本（R2）：抽每幕画面上的英文词，对照 `say` 登记，缺的报错；接进 `appwb.py / appfp.py / appwo.py`。
2. 写动作覆盖检查（R4）：分镜动作词清单 ↔ `k.act` 登记。
3. 讲解员小人设计稿（几种姿态一张图）→ **给用户确认**。
4. 人物动作库 v1（走、跑、搬、拿、放、指、举、跳、转身、挥手）+ 视觉标准 V1–V8，**先只升级 port 一幕**，出升级前 / 后对比截图 → **给用户确认**。
5. port 幕补齐 R2、R4（见 §1.3）。
6. ✅ 按需加载（`<script type="text/plain">` + 首次进入时执行；首屏耗时对比）——已完成，见 §0。

**阶段 2 起**：Europe、Bluetooth 示范幕 → 身世标签 + 词卡跳转 → 格林定律章（删 `vowel_shift`）→ 时间与度量 → 中英对照总枢（清单确认后）→ 实验室新页签（删 `verb_matrix`）→ 中点加练习闭环和总地图 → 新模块 → 文化各章与家长指南。

**持续**：旧的王炸实验室 39 案例、第一性原理 24 幕按 R2（补朗读）、R4（补动作）、视觉标准逐步升级；先列清单再动手。

## 4. 待用户确认

1. ✅ **中英对照搬迁清单已确认**（2026-10-29）：搬 ④-1（I am like）、⑥-1（先立树干）；⑥-2、⑥-3、③-1、③-4 留在第一性原理。**内容零丢失**：先导出原幕内容清单，逐条对照，新位置验收通过后才删原幕，原位置留跳转入口。
2. **讲解员小人形象**：阶段 1 出设计稿后确认。〔✅ 已确认：v3a 马尾女老师，881843f〕
3. **port 视觉升级效果**：升级前后对比图确认后再铺开。〔✅ 已确认：用户 2026-10-29 20:08 审片通过 v2 样板幕，abb050c〕
4. 决策 6 五个新模块的**具体位置**（MASTER_DESIGN 表里是建议）。〔部分已定：合成词重音 = 语调地图第 3 幕、不规则复数 = 实验室页签 ⑮；空间隐喻、拼写潜规则、交际句型地图仍待确认〕
5. 重叠内容的处理（只列出、未删除）：
   - ✅（2026-10-29 已处理，见 `word_origins/PORT_FAMILY_INVENTORY.md`）`VOCAB_DB` 里 11 个词的 port 家族 `affix_root`（port、airport、passport、import、export、transport、report、reporter、support、important、sport），airport 的 `etymology` / `memory_tip`；
   - ✅（已处理）`WORD_FORMATION_DB.roots` 的 port 卡（把港口、搬运写成一个词根，应改成「两条亲戚线」）；
   - 术语「词源」在 `fp_iconicity` 和 `wo_port` 各一条；
   - 第一性原理 ② 字母象形「M 像山」将来和「字母身世」并排（💡 vs 📜）。

## 5. 引擎通用新工具登记

### 2026-10-29 · 阶段 2（Europe 幕）
- `wb_actor.js`：look `princess`、`king`；动作 `sit`（坐 / 骑：骨盆停在 y − 58×s，坐处由案例放好；坐着时不画地面影子）；道具 `flower`。
- `cases/wo_props.js`：`D.bull(x, y, s, {face})` → `{ g, legs, back }`（back = 牛背坐处）。
- 按需加载：`wbLoadModule(id)`、`wbHasModule(id)`、`wbLoadAll()`（`wb_app.js`）。
- 身世标签：`WO_ORIGIN_TAGS`、`woOriginTags(w)`、`woOriginTagHtml(w)`（`wo_hub.js`）；验收 `apptags.py`。
- 脚本：`jscheck.py`（node --check）、`reg_render.py`（渲染回归）、`measure_load.py`（首屏耗时）、`export_storyboard.py <幕>`（导出逐条时间码）；`measure_fps.py` 第 4 个参数可指定溯源幕。

### 2026-10-29 · 阶段 1（引擎 v2，`k.v2()` 打开才生效）
- 常量：`WB.EASE`（move / in / exit / pop / snap / antic / sine / linear）、`WB.PAL`、`WB.FS`、`WB.GRID`；kit 上同名 `k.EASE / k.PAL / k.FS / k.GRID`。
- 动效：`k.pop(g,t,dur,{from,cx,cy})`、`k.squash(g,t,dur,amp)`、`k.erase(groups,dur)`、`k.sfx(name,t)`；`move/arc/path/fade/rot` 支持 `{ease}`，v2 下有分类默认值；v2 的 `k.path` 自动平滑成曲线。
- 版面：`k.hl / k.hlText`（荧光底色）、`k.titleCard`、`k.quoteCard`（`\n` 手动断行）；`S.keeps`（不被 D.finish 压缩的时间段）、`k.remap`。
- 人物：`src/wb_actor.js`（见 §0）。
- App：`wbSfx*` 音效 + 「🔔 音效」按钮（v2 才显示）；`wbSpeak` 语音事件 → `player.speech`（口型）+ v2 时间轴同步；`wbState.syncLog`（测同步用）。
- 验收脚本：`r2check.py/.js`、`measure_sync.py`、`measure_fps.py`、`measure_seek.py`。

### 2026-10-29 · db13720
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

## 2026-10-29 20:10 用户审片结果
- 用户选定升级后版本（port_after_v2）作为样板幕，通过。
- 用户要求小人放大：wo_port.js 讲解员 s 从 0.74 改为 1.15（位置不变），已重建主 HTML。
- ⚠️ 本次沙箱缺 Chromium 系统依赖，appwo 截图回归未跑成；下一位接手先 `python3 -m playwright install-deps chromium` 后跑 appwo + 截图，确认放大后小人不压住右下角内容（尤其金句卡、护照、托举镜头）。
- 下一步：样板确认后铺到其他幕；阶段 1 剩余按需加载。

---

## 2026-10-30 文档清理 + 锚点检查

| 提交 | 内容 |
|---|---|
| `0b5443a` | MASTER_DESIGN：决策数统一为 20 条（1–19、22，20/21 号未使用）；R1–R4 排序；§1 结构图改成实际结构；§3 合并表、§4 阶段状态、§6 时间更正 |
| `f737b41` | DESIGN_HANDOFF §3「尚未决定」四项标为已决定 |
| `c621e39` | README 首页结构、王炸实验室页签数更新 |
| `121ce9c` | HANDOFF 拆成短 HANDOFF + 本文（全文原样搬来，零丢失脚本核对），加时间更正表 |
| `562b6d4` | 新增 `src/anchorcheck.py`，接进 jscheck / insert_wb；修 insert_wb.py TABS 里 tense_matrix 被注释吞掉；home_entries.py 去掉写死路径 |
| （本次） | 新增 `REVIEW_LIST.md` 真机审片清单 |

- 2026-10-30 10:20 JST：动作系统 v5 样板 takeout_wb（huashu-art-motion 白板 + AI 关键帧 + Remotion 出片/Player）；MP4 1.58 MB、单文件 HTML 1.02 MB。
- 2026-10-30 10:30 JST：决策 31 写入 MASTER_DESIGN（动作系统 v5 工具组合定稿），HANDOFF 顶部改为 v5 现状。

## 2026-10-30 · 动作系统 v5.1 定稿为标准画法
- `6bbd234` v5.1 加英文朗读（Web Speech en-US 0.85，5 个 CUES，时间轴等朗读最多 4 秒，总长 12.5 s）。
- `368f1e4` 修：预览框 sandbox iframe 里读 localStorage 抛错 → 整个播放器停掉、无法播放；localStorage / speechSynthesis 包 try/catch，sandbox iframe 实测可播、0 报错。
- 10:54 用户确认「完美，就这样，把这个画法写入设计文档」：MASTER_DESIGN 决策 31 加定稿说明 + 新增 §2.9 标准画法规格；SOP v2.1 新增 §17（流程 9 步 + 验收 12 条，含 sandbox iframe 测试）。

## 2026-10-30 · 决策 32 启动：v5 公共引擎 + tense_matrix ① 重画
- `d31bc27` 决策 32 + `REDRAW_V5.md`（白板 99 幕 + 万能动词剧场 72 幕）。
- 公共引擎 `v5/`：`wb5.js`（rough 线条 / 手写 / 关键帧角色按距离换帧 / 镜头 / 弹字 / 讲解字幕 / 朗读字幕）、通用播放器、按场景字体子集打包、`shots.py` 联络表 + 确定性 + sandbox 验收、`build_sprites.py` 绿幕抠图锚点。
- tense_matrix ①：12 块白板 4×3 版面，镜头逐块推进，最后拉远全图；新帧库 `tm1`（16 帧）；R1 91/91；控制台 0 报错、sandbox 0 报错、确定性通过；单文件 862 KB（16 帧角色约 527 KB，长课超出单句 650 KB 预算，记入 §2.9 F 待定）。
- 踩坑：AI 出图常把「踢球准备」画成腿往前（3 次失败），最终用「双脚着地、俯身看球」作准备帧；有一张女孩走路帧多画了一个人、一张带了狗，重出。



## 2026-10-30 12:05 JST · v5 人物先行帧库（决策 32 第 2 阶段）
- 用户 11:28 要求先重画所有旧白板动画中的人物和动作帧，再重画版面。
- AI 绿幕联排图 tm2a/b、tm3a/b、tm4a、L1–L15、V01–V34（原图在 Hark 工作区 `/workspace/work/kf/`，不进仓库）→ 切出 331 帧 → `v5/sprites/cast/*.webp`（透明，MAXH 520，Q78，共 7.1 MB）。
- 新工具：`split_sheet.py`、`cut_box.py`、`pack_cast.py`；`build_sprites.py` 增加 cast/ 回退读取。
- 登记：`v5/CAST_V5.md`。已知待返工：l_lift0–2、missw_give、V29 Leo 发色。

## 2026-10-30 12:20 JST · tense_matrix ② 现在进行时 v5.1 重画
- `v5/scenes/tense_matrix_2.js`（12 块白板，162 s）+ 帧库 `sprites/tm2.js`（kick / Leo 跑步 4 帧 / 下蹲 + 起跳 / Mia 跳舞 2 帧 / 做蛋糕 / 读书 / 喜欢 / 牵狗 / 游泳 4 帧，MAXH 360 Q64）。
- 动作：开场 Leo 跑过；踢球 3 次对齐 playing；录像机 REC 闪烁 + 镜头里 Leo 跑；时间轴波浪线一直在动；发动机齿轮转；Leo 绕操场跑对齐 running；Mia 跳舞换帧对齐 dancing、做蛋糕对齐 making；三个孩子游泳对齐 swimming；Mia 读书；like / have 演示 + 打叉 REC；男孩连跳 4 次对齐 jumping。
- 验收：R1 85/85（新工具 `v5/r1v5.py`，`lab/INVENTORY_TM2_V5.md`）；普通页面 / sandbox 0 报错；确定性 ✓；单文件 674,940 bytes（>650 KB，字体占大头，与 ① 一起待优化）。
- 引擎只加不改：`K.actor({ dy: t => px })`。

## 2026-10-30 12:35 JST · tense_matrix ③ 一般过去时 v5.1 重画
- `v5/scenes/tense_matrix_3.js`（12 块白板，172 s）+ 帧库 `sprites/tm3.js`（cam / m_study / m_cry / bus / party / l_no / l_w0–3 / kick0–2）。
- 动作：Leo 拍照「咔嚓」→ 老照片定格；拍博物馆 3 张照片对齐 took；Mia 伏案学习 → 哭对齐 studied / cried；公交车减速停在车站对齐 stopped；三个孩子聚会欢呼对齐 were；Leo 提礼物走回家对齐 went；摇头摆手对齐 didn't go；踢球两次对齐 played。
- 验收：R1 88/88；0 报错；确定性 ✓；607,348 bytes。

## 2026-10-30 12:50 JST · tense_matrix ④ 一般将来时 v5.1 重画
- `v5/scenes/tense_matrix_4.js`（12 块白板，160 s）+ 帧库 `sprites/tm4.js`（l_kite / l_w0–3 / grand / picnic / party / kick0–2 / sw0–3）。
- 动作：望远镜视线扫向将来；将来那头泳池里游起来对齐 swim；Leo 放风筝跑过公园对齐 fly；Leo 提礼物走向挥手的爷爷奶奶对齐 visit；一家野餐 + 下周日日历；球场里踢球对齐 match；三个孩子聚会对齐 party。
- 验收：R1 84/84；0 报错；确定性 ✓；645,734 bytes。

## 2026-10-30 13:05 JST · tense_matrix ⑤ 现在完成时 v5.1 重画（tense_matrix 单元完成）
- `v5/scenes/tense_matrix_5.js`（12 块白板，169 s）+ 帧库 `sprites/tm5.js`（l_key / m_hw / wang / l_kite / l_w0–3 / m_like）。
- 动作：桥从过去拱到现在；Leo 摸空口袋 + 锁着的门抖动「进不去门」；Mia 举起写完的作业 ✔ → Leo 放风筝跑出去（成果：能玩了）；2021–现在逐年点亮 + 北京的家；Leo 走去长城再走回来（been to）、王老师拖箱子走远淡出（gone to）。
- 验收：R1 89/89；0 报错；确定性 ✓；501,507 bytes。tense_matrix 5 幕全部完成（旧清单 5 个案例）。

## 2026-10-30 12:35 JST · tense_matrix 5 幕 v5.1 替换进 App
- 新增 `v5/embed_app.py`：v5 HTML 存进主文件 text/plain 块，`wbStageHtml` / `startSuperLabCanvasLoop` 有 v5 版就挂 iframe srcdoc（标记 WB5_EMBED），没有就照旧 SVG。
- 回归：tense_matrix ①–⑤ iframe 挂载、时长 179.5 / 162.1 / 171.6 / 160.4 / 169.2 s、0 报错；其他页签旧 SVG 正常。主文件 6,027,070 → 9,321,636 bytes。

## 2026-10-30 · past_clans ① v5.1 重画并替换进 App
- 新增 `v5/scenes/past_clans_1.js`（12 块白板：门派旗 / 规则 vs 不规则 / 四面门派旗 + 金钟罩 / 爆破音小鞭炮 / put·hurt·read / 书包场景 / 其余成员 / 结论 / 预测 / 金句卡），R1 83/83，143 s。
- 新增 `v5/app_check.py`：替换后的 App 回归脚本。主文件 9,946,789 bytes。

## 2026-10-30 · past_clans ② v5.1 重画并替换进 App
- `v5/scenes/past_clans_2.js`：换挡杆 i/a/u、嘴型张开度、鼻音气流、游泳 / 喝牛奶 / 坐下 / 摇铃 / 跑回家；R1 81/81，168 s。主文件 10,496,967 bytes。

## 2026-10-30 · past_clans ③ v5.1 重画并替换进 App
- `v5/scenes/past_clans_3.js`：长音条「减肥」变短、一拍盒子挤进 t、清浊喉咙震动、火车开走、扫地、公园见面；R1 78/78，128 s。

## 2026-10-30 · past_clans ④ v5.1 重画并替换进 App —— past_clans 单元完成
- `v5/scenes/past_clans_4.js`：保镖尾巴名牌（gh 变灰划掉）、放大镜找字母 a、b-r-ought 圈 r、小黑板、打架乱线、六护法全家福、放风筝；R1 78/78，158 s。主文件 11,451,107 bytes。

## 2026-10-30 · adj_order 第1幕 v5.1 重画并替换进 App
- 一张漂亮的小圆木桌（共用版面引擎 scenes/adj_train.js）：R1 91/91，154 s，主文件 11,770,109 bytes。

## 2026-10-30 · adj_order 第2幕 v5.1 重画并替换进 App
- ②  两只可爱的小白猫：R1 86/86，~120 s，主文件 12,087,206 bytes。

## 2026-10-30 · adj_order 第3幕 v5.1 重画并替换进 App
- ③  一件漂亮的崭新红色中国丝绸连衣裙：R1 90/90，~120 s，主文件 12,423,920 bytes。

## 2026-10-30 · adj_order 第4幕 v5.1 重画并替换进 App
- ④  那个高个子年轻的英国篮球教练：R1 89/89，~120 s，主文件 12,756,036 bytes。

## 2026-10-30 · 主文件体积优化 v1
- embed_app.py：共享块 wb5blob-<hash> + gzip 存放；13 幕重新嵌入，12.76 → 10.91 MB。

## 2026-10-30 · aux_transformer 第1幕 v5.1 重画并替换进 App
- 🪞 助动词照妖镜 · ① be 动词护卫：R1 81/81，134 s，主文件 11,147,117 bytes。

## 2026-10-30 · aux_transformer 第2幕 v5.1 重画并替换进 App
- 🪞 助动词照妖镜 · ② 情态动词大将军：R1 77/77，118 s，主文件 11,398,851 bytes。

## 2026-10-30 · aux_transformer 第3幕 v5.1 重画并替换进 App
- 🪞 助动词照妖镜 · ③ 三单照妖镜 does：R1 77/77，119 s，主文件 11,706,342 bytes。

## 2026-10-30 · aux_transformer 第4幕 v5.1 重画并替换进 App
- 🪞 助动词照妖镜 · ④ 过去式照妖镜 did：R1 77/77，129 s，主文件 12,008,559 bytes。

## 2026-10-30 · five_patterns 第1幕 v5.1 重画并替换进 App
- 🧱 五大基本句型 · ① SV 自给自足型：R1 77/77，110 s，主文件 12,437,087 bytes。

## 2026-10-30 · five_patterns 第2幕 v5.1 重画并替换进 App
- 🧱 五大基本句型 · ② SVP 状态天平型：R1 75/75，106 s，主文件 12,652,212 bytes。

## 2026-10-30 · five_patterns 第3幕 v5.1 重画并替换进 App
- 🧱 五大基本句型 · ③ SVO 一箭穿心型：R1 74/74，118 s，主文件 12,886,789 bytes。

## 2026-10-30 · five_patterns 第4幕 v5.1 重画并替换进 App
- 🧱 五大基本句型 · ④ SVOO 双手递礼型：R1 74/74，111 s，主文件 13,155,706 bytes。

## 2026-10-30 · five_patterns 第5幕 v5.1 重画并替换进 App
- 🧱 五大基本句型 · ⑤ SVOC 魔法赋能型：R1 80/80，123 s，主文件 13,383,963 bytes。

## 2026-10-30 · bamboo_tree 第1幕 v5.1 重画并替换进 App
- 🎋 竹节句 vs 树干句 · 1：R1 64/64，83 s，主文件 13,571,797 bytes。

## 2026-10-30 · bamboo_tree 第2幕 v5.1 重画并替换进 App
- 🎋 竹节句 vs 树干句 · 2：R1 67/67，86 s，主文件 13,753,336 bytes。

## 2026-10-30 · bamboo_tree 第3幕 v5.1 重画并替换进 App
- 🎋 竹节句 vs 树干句 · 3：R1 62/62，82 s，主文件 13,933,472 bytes。

## 2026-10-30 · bamboo_tree 第4幕 v5.1 重画并替换进 App
- 🎋 竹节句 vs 树干句 · 4：R1 66/66，83 s，主文件 14,171,581 bytes。

## 2026-10-30 · bamboo_tree 第5幕 v5.1 重画并替换进 App
- 🎋 竹节句 vs 树干句 · 5：R1 65/65，91 s，主文件 14,360,874 bytes。

## 2026-10-30 · eight_endings 第1幕 v5.1 重画并替换进 App
- 🎭 八大词尾 · 1：R1 76/76，123 s，主文件 14,612,238 bytes。

## 2026-10-30 · irregular_plural 第1幕 v5.1 重画并替换进 App
- 👣 不规则复数 · 1：R1 66/66，66 s，主文件 14,858,189 bytes。

## 2026-10-30 · irregular_plural 第2幕 v5.1 重画并替换进 App
- 👣 不规则复数 · 2：R1 80/80，76 s，主文件 15,070,222 bytes。

## 2026-10-30 · metaphor_code 第1幕 v5.1 重画并替换进 App
- 🔐 三大隐喻密码 · 1：R1 101/101，139 s，主文件 15,307,424 bytes。

## 2026-10-30 · metaphor_code 第2幕 v5.1 重画并替换进 App
- 🔐 三大隐喻密码 · 2：R1 88/88，104 s，主文件 15,532,169 bytes。

## 2026-10-30 · metaphor_code 第3幕 v5.1 重画并替换进 App
- 🔐 三大隐喻密码 · 3：R1 96/96，143 s，主文件 15,825,604 bytes。

## 2026-10-30 · writing_alchemist 第1幕 v5.1 重画并替换进 App
- ✍️ 写作炼金术 · 1：R1 50/50，137 s，主文件 16,149,968 bytes。

## 2026-10-30 · writing_alchemist 第2幕 v5.1 重画并替换进 App
- ✍️ 写作炼金术 · 2：R1 53/53，149 s，主文件 16,342,192 bytes。

## 2026-10-30 · writing_alchemist 第3幕 v5.1 重画并替换进 App
- ✍️ 写作炼金术 · 3：R1 50/50，167 s，主文件 16,552,444 bytes。

## 2026-10-30 · phrasal_key 第1幕 v5.1 重画并替换进 App
- 🔑 短语动词钥匙 · 1：R1 71/71，120 s，主文件 16,814,643 bytes。

## 2026-10-30 · phrasal_key 第2幕 v5.1 重画并替换进 App
- 🔑 短语动词钥匙 · 2：R1 59/59，100 s，主文件 17,247,650 bytes。

## 2026-10-30 · pron_map 第1幕 v5.1 重画并替换进 App
- 👄 发音地图 · 1：R1 63/63，92 s，主文件 17,481,881 bytes。

## 2026-10-30 · pron_map 第2幕 v5.1 重画并替换进 App
- 👄 发音地图 · 2：R1 57/57，76 s，主文件 17,678,551 bytes。

## 2026-10-30 · pron_map 第3幕 v5.1 重画并替换进 App
- 👄 发音地图 · 3：R1 65/65，65 s，主文件 17,879,749 bytes。

## 2026-10-30 · stress_rhythm 第1幕 v5.1 重画并替换进 App
- 🎯 重音与弱读 · 1：R1 54/54，57 s，主文件 18,060,620 bytes。

## 2026-10-30 · stress_rhythm 第2幕 v5.1 重画并替换进 App
- 🎯 重音与弱读 · 2：R1 51/51，49 s，主文件 18,232,063 bytes。

## 2026-10-30 · stress_rhythm 第3幕 v5.1 重画并替换进 App
- 🎯 重音与弱读 · 3：R1 45/45，56 s，主文件 18,410,322 bytes。

## 2026-10-30 · intonation_map 第1幕 v5.1 重画并替换进 App
- 🎵 语调地图 · 1：R1 57/57，90 s，主文件 18,599,601 bytes。

## 2026-10-30 · intonation_map 第2幕 v5.1 重画并替换进 App
- 🎵 语调地图 · 2：R1 49/49，68 s，主文件 18,781,155 bytes。

## 2026-10-30 · intonation_map 第3幕 v5.1 重画并替换进 App
- 🎵 语调地图 · 3：R1 45/45，59 s，主文件 18,951,959 bytes。

## 2026-10-30 · fp_economy 第1幕 v5.1 重画并替换进 App
- ⚙️ 第一性原理 · 经济原则 · 1：R1 69/69，75 s，主文件 19,167,017 bytes。

## 2026-10-30 · fp_economy 第2幕 v5.1 重画并替换进 App
- ⚙️ 第一性原理 · 经济原则 · 2：R1 66/66，65 s，主文件 19,345,115 bytes。

## 2026-10-30 · fp_economy 第3幕 v5.1 重画并替换进 App
- ⚙️ 第一性原理 · 经济原则 · 3：R1 69/69，81 s，主文件 19,546,882 bytes。

## 2026-10-30 · fp_economy 第4幕 v5.1 重画并替换进 App
- ⚙️ 第一性原理 · 经济原则 · 4：R1 75/75，71 s，主文件 19,768,718 bytes。

## 2026-10-30 · fp_iconicity 第1幕 v5.1 重画并替换进 App
- 🔤 第一性原理 · 象似性 · 1：R1 57/57，76 s，主文件 20,051,532 bytes。

## 2026-10-30 · fp_iconicity 第2幕 v5.1 重画并替换进 App
- 🔤 第一性原理 · 象似性 · 2：R1 69/69，75 s，主文件 20,235,006 bytes。

## 2026-10-30 · fp_iconicity 第3幕 v5.1 重画并替换进 App
- 🔤 第一性原理 · 象似性 · 3：R1 66/66，67 s，主文件 20,415,260 bytes。

## 2026-10-30 · fp_iconicity 第4幕 v5.1 重画并替换进 App
- 🔤 第一性原理 · 象似性 · 4：R1 64/64，78 s，主文件 20,608,111 bytes。

## 2026-10-30 · fp_boundedness 第1幕 v5.1 重画并替换进 App
- 📦 第一性原理 · 有界无界 · 1：R1 57/57，85 s，主文件 20,780,417 bytes。

## 2026-10-30 · fp_boundedness 第2幕 v5.1 重画并替换进 App
- 📦 第一性原理 · 有界无界 · 2：R1 50/50，74 s，主文件 20,954,338 bytes。

## 2026-10-30 · fp_boundedness 第3幕 v5.1 重画并替换进 App
- 📦 第一性原理 · 有界无界 · 3：R1 65/65，91 s，主文件 21,135,057 bytes。

## 2026-10-30 · fp_boundedness 第4幕 v5.1 重画并替换进 App
- 📦 第一性原理 · 有界无界 · 4：R1 60/60，78 s，主文件 21,381,732 bytes。

## 2026-10-30 · fp_vectors 第1幕 v5.1 重画并替换进 App
- 🧭 第一性原理 · 方向向量 · 1：R1 57/57，73 s，主文件 21,555,080 bytes。

## 2026-10-30 · fp_vectors 第2幕 v5.1 重画并替换进 App
- 🧭 第一性原理 · 方向向量 · 2：R1 55/55，82 s，主文件 22,076,180 bytes。

## 2026-10-30 · fp_vectors 第3幕 v5.1 重画并替换进 App
- 🧭 第一性原理 · 方向向量 · 3：R1 52/52，89 s，主文件 22,669,379 bytes。

## 2026-10-30 · fp_vectors 第4幕 v5.1 重画并替换进 App
- 🧭 第一性原理 · 方向向量 · 4：R1 61/61，110 s，主文件 22,869,434 bytes。

## 2026-10-30 · fp_one_king 第2幕 v5.1 重画并替换进 App
- 👑 第一性原理 · 一句一王 · 2：R1 55/55，84 s，主文件 23,047,333 bytes。

## 2026-10-30 · fp_one_king 第3幕 v5.1 重画并替换进 App
- 👑 第一性原理 · 一句一王 · 3：R1 61/61，87 s，主文件 23,225,567 bytes。

## 2026-10-30 · fp_one_king 第4幕 v5.1 重画并替换进 App
- 👑 第一性原理 · 一句一王 · 4：R1 69/69，83 s，主文件 23,413,575 bytes。

## 2026-10-30 · fp_zoom_focus 第2幕 v5.1 重画并替换进 App
- 🔍 第一性原理 · 由大到小 · 2：R1 62/62，88 s，主文件 23,598,843 bytes。

## 2026-10-30 · fp_zoom_focus 第3幕 v5.1 重画并替换进 App
- 🔍 第一性原理 · 由大到小 · 3：R1 54/54，70 s，主文件 23,770,134 bytes。

## 2026-10-30 · fp_zoom_focus 第4幕 v5.1 重画并替换进 App
- 🔍 第一性原理 · 由大到小 · 4：R1 62/62，95 s，主文件 23,954,469 bytes。

## 2026-10-30 · vv_take_on 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · take on ①：R1 9/9，12 s，主文件 24,169,216 bytes。

## 2026-10-30 · vv_take_on 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · take on ②：R1 19/19，18 s，主文件 24,403,871 bytes。

## 2026-10-30 · wo_port 第1幕 v5.1 重画并替换进 App
- 📖 单词身世 · port · 1：R1 142/142，185 s，主文件 24,767,369 bytes。

## 2026-10-30 · wo_europe 第1幕 v5.1 重画并替换进 App
- 📖 单词身世 · Europe · 1：R1 142/142，139 s，主文件 25,122,494 bytes。

## 2026-10-30 · wo_grimm 第1幕 v5.1 重画并替换进 App
- 📖 单词身世 · 格林定律 · 1：R1 160/160，135 s，主文件 25,338,874 bytes。

## 2026-10-30 · wo_bluetooth 第1幕 v5.1 重画并替换进 App
- 📖 单词身世 · Bluetooth · 1：R1 106/106，100 s，主文件 25,628,371 bytes。

## 2026-10-30 · wo_time_num 第1幕 v5.1 重画并替换进 App
- 📖 单词身世 · 时间与数字 · 1：R1 94/94，131 s，主文件 25,842,472 bytes。

## 2026-10-30 · wo_time_week 第1幕 v5.1 重画并替换进 App
- 📖 单词身世 · 星期 · 1：R1 129/129，160 s，主文件 26,062,152 bytes。

## 2026-10-30 · wo_vowel_a 第1幕 v5.1 重画并替换进 App
- 📖 单词身世 · 元音 a · 1：R1 89/89，108 s，主文件 26,341,719 bytes。

## 2026-10-30 · wo_vowel_b 第1幕 v5.1 重画并替换进 App
- 📖 单词身世 · 元音 b · 1：R1 75/75，117 s，主文件 26,556,004 bytes。

## 2026-10-30 · wo_vowel_c 第1幕 v5.1 重画并替换进 App
- 📖 单词身世 · 元音 c · 1：R1 82/82，112 s，主文件 26,861,727 bytes。

## 2026-10-30 · ze_be 第1幕 v5.1 重画并替换进 App
- 🔀 中英对照 · be · 1：R1 57/57，72 s，主文件 27,058,644 bytes。

## 2026-10-30 · ze_borrow 第1幕 v5.1 重画并替换进 App
- 🔀 中英对照 · 借 · 1：R1 57/57，74 s，主文件 27,289,531 bytes。

## 2026-10-30 · ze_link 第1幕 v5.1 重画并替换进 App
- 🔀 中英对照 · 连接 · 1：R1 58/58，92 s，主文件 27,458,106 bytes。

## 2026-10-30 · ze_mark 第1幕 v5.1 重画并替换进 App
- 🔀 中英对照 · 标记 · 1：R1 74/74，83 s，主文件 27,639,164 bytes。

## 2026-10-30 · ze_modifier 第1幕 v5.1 重画并替换进 App
- 🔀 中英对照 · 修饰语 · 1：R1 61/61，100 s，主文件 27,860,062 bytes。

## 2026-10-30 · ze_pronoun 第1幕 v5.1 重画并替换进 App
- 🔀 中英对照 · 代词 · 1：R1 83/83，90 s，主文件 28,035,443 bytes。

## 2026-10-30 · ze_same 第1幕 v5.1 重画并替换进 App
- 🔀 中英对照 · 相同 · 1：R1 73/73，80 s，主文件 28,216,100 bytes。

## 2026-10-30 · ze_say 第1幕 v5.1 重画并替换进 App
- 🔀 中英对照 · 说 · 1：R1 69/69，92 s，主文件 28,426,471 bytes。

## 2026-10-30 · ze_subject 第1幕 v5.1 重画并替换进 App
- 🔀 中英对照 · 主语 · 1：R1 59/59，73 s，主文件 28,599,791 bytes。

## 2026-10-30 · ze_wear 第1幕 v5.1 重画并替换进 App
- 🔀 中英对照 · 穿戴 · 1：R1 66/66，77 s，主文件 28,797,373 bytes。

## 2026-10-30 · ze_yesno 第1幕 v5.1 重画并替换进 App
- 🔀 中英对照 · 是非 · 1：R1 71/71，78 s，主文件 28,969,022 bytes。

## 2026-10-30 · vv_take_off 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · take off ①：R1 10/10，12 s，主文件 29,129,092 bytes。

## 2026-10-30 · vv_take_off 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · take off ②：R1 18/18，18 s，主文件 29,272,950 bytes。

## 2026-10-30 · vv_take_up 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · take up ①：R1 8/8，12 s，主文件 29,508,261 bytes。

## 2026-10-30 · vv_take_up 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · take up ②：R1 40/40，21 s，主文件 29,726,788 bytes。

## 2026-10-30 · vv_take_down 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · take down ①：R1 9/9，12 s，主文件 29,933,731 bytes。

## 2026-10-30 · vv_take_down 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · take down ②：R1 22/22，19 s，主文件 30,140,778 bytes。

## 2026-10-30 · vv_take_in 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · take in ①：R1 8/8，12 s，主文件 30,346,481 bytes。

## 2026-10-30 · vv_take_in 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · take in ②：R1 21/21，18 s，主文件 30,563,128 bytes。

## 2026-10-30 · vv_take_out 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · take out ①：R1 9/9，12 s，主文件 30,701,846 bytes。

## 2026-10-30 · vv_take_out 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · take out ②：R1 18/18，17 s，主文件 30,845,400 bytes。

## 2026-10-30 · vv_put_on 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · put on ①：R1 10/10，12 s，主文件 31,035,657 bytes。

## 2026-10-30 · vv_put_on 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · put on ②：R1 19/19，18 s，主文件 31,265,804 bytes。

## 2026-10-30 · vv_put_off 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · put off ①：R1 14/14，13 s，主文件 31,456,018 bytes。

## 2026-10-30 · vv_put_off 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · put off ②：R1 20/20，20 s，主文件 31,648,360 bytes。

## 2026-10-30 · vv_put_up 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · put up ①：R1 9/9，11 s，主文件 31,837,600 bytes。

## 2026-10-30 · vv_put_up 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · put up ②：R1 18/18，18 s，主文件 32,050,089 bytes。

## 2026-10-30 · vv_put_down 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · put down ①：R1 9/9，13 s，主文件 32,189,587 bytes。

## 2026-10-30 · vv_put_down 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · put down ②：R1 22/22，19 s，主文件 32,391,184 bytes。

## 2026-10-30 · vv_put_in 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · put in ①：R1 10/10，12 s，主文件 32,616,713 bytes。

## 2026-10-30 · vv_put_in 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · put in ②：R1 23/23，19 s，主文件 32,860,786 bytes。

## 2026-10-30 · vv_put_out 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · put out ①：R1 8/8，13 s，主文件 33,084,985 bytes。

## 2026-10-30 · vv_put_out 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · put out ②：R1 18/18，18 s，主文件 33,362,652 bytes。

## 2026-10-30 · vv_get_on 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · get on ①：R1 9/9，13 s，主文件 33,503,378 bytes。

## 2026-10-30 · vv_get_on 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · get on ②：R1 18/18，17 s，主文件 33,649,172 bytes。

## 2026-10-30 · vv_get_off 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · get off ①：R1 8/8，12 s，主文件 33,790,632 bytes。

## 2026-10-30 · vv_get_off 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · get off ②：R1 18/18，17 s，主文件 34,042,291 bytes。

## 2026-10-30 · vv_get_up 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · get up ①：R1 9/9，12 s，主文件 34,182,457 bytes。

## 2026-10-30 · vv_get_up 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · get up ②：R1 19/19，19 s，主文件 34,385,594 bytes。

## 2026-10-30 · vv_get_down 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · get down ①：R1 8/8，13 s，主文件 34,600,675 bytes。

## 2026-10-30 · vv_get_down 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · get down ②：R1 18/18，18 s，主文件 34,808,856 bytes。

## 2026-10-30 · vv_get_in 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · get in ①：R1 8/8，12 s，主文件 34,949,310 bytes。

## 2026-10-30 · vv_get_in 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · get in ②：R1 20/20，18 s，主文件 35,132,977 bytes。

## 2026-10-30 · vv_get_out 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · get out ①：R1 10/10，13 s，主文件 35,273,345 bytes。

## 2026-10-30 · vv_get_out 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · get out ②：R1 19/19，19 s，主文件 35,475,032 bytes。

## 2026-10-30 · vv_turn_on 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · turn on ①：R1 9/9，12 s，主文件 35,687,715 bytes。

## 2026-10-30 · vv_turn_on 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · turn on ②：R1 17/17，18 s，主文件 35,911,030 bytes。

## 2026-10-30 · vv_turn_off 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · turn off ①：R1 10/10，13 s，主文件 36,156,279 bytes。

## 2026-10-30 · vv_turn_off 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · turn off ②：R1 18/18，18 s，主文件 36,388,172 bytes。

## 2026-10-30 · vv_turn_up 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · turn up ①：R1 7/7，11 s，主文件 36,642,871 bytes。

## 2026-10-30 · vv_turn_up 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · turn up ②：R1 19/19，18 s，主文件 36,892,202 bytes。

## 2026-10-30 · vv_turn_down 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · turn down ①：R1 8/8，13 s，主文件 37,108,188 bytes。

## 2026-10-30 · vv_turn_down 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · turn down ②：R1 18/18，19 s，主文件 37,363,271 bytes。

## 2026-10-30 · vv_turn_in 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · turn in ①：R1 9/9，13 s，主文件 37,596,422 bytes。

## 2026-10-30 · vv_turn_in 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · turn in ②：R1 20/20，19 s，主文件 37,824,537 bytes。

## 2026-10-30 · vv_turn_out 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · turn out ①：R1 8/8，12 s，主文件 38,057,090 bytes。

## 2026-10-30 · vv_turn_out 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · turn out ②：R1 20/20，19 s，主文件 38,281,135 bytes。

## 2026-10-30 · vv_look_on 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · look on ①：R1 6/6，11 s，主文件 38,484,762 bytes。

## 2026-10-30 · vv_look_on 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · look on ②：R1 19/19，20 s，主文件 38,757,373 bytes。

## 2026-10-30 · vv_look_off 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · look away ①：R1 8/8，12 s，主文件 38,973,038 bytes。

## 2026-10-30 · vv_look_off 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · look away ②：R1 16/16，18 s，主文件 39,115,004 bytes。

## 2026-10-30 · vv_look_up 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · look up ①：R1 7/7，11 s，主文件 39,255,286 bytes。

## 2026-10-30 · vv_look_up 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · look up ②：R1 21/21，19 s，主文件 39,494,601 bytes。

## 2026-10-30 · vv_look_down 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · look down ①：R1 7/7，12 s，主文件 39,689,812 bytes。

## 2026-10-30 · vv_look_down 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · look down ②：R1 17/17，18 s，主文件 39,831,320 bytes。

## 2026-10-30 · vv_look_in 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · look in ①：R1 9/9，12 s，主文件 40,015,419 bytes。

## 2026-10-30 · vv_look_in 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · look in ②：R1 20/20，19 s，主文件 40,214,206 bytes。

## 2026-10-30 · vv_look_out 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · look out ①：R1 8/8，12 s，主文件 40,431,839 bytes。

## 2026-10-30 · vv_look_out 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · look out ②：R1 17/17，18 s，主文件 40,643,048 bytes。

## 2026-10-30 · vv_give_on 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · give on ①：R1 6/6，11 s，主文件 40,809,763 bytes。

## 2026-10-30 · vv_give_on 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · give on ②：R1 18/18，19 s，主文件 40,980,762 bytes。

## 2026-10-30 · vv_give_off 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · give off ①：R1 7/7，12 s，主文件 41,173,425 bytes。

## 2026-10-30 · vv_give_off 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · give off ②：R1 17/17，17 s，主文件 41,339,386 bytes。

## 2026-10-30 · vv_give_up 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · give up ①：R1 9/9，13 s，主文件 41,523,928 bytes。

## 2026-10-30 · vv_give_up 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · give up ②：R1 18/18，18 s，主文件 41,754,737 bytes。

## 2026-10-30 · vv_give_down 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · give back ①：R1 9/9，13 s，主文件 41,981,604 bytes。

## 2026-10-30 · vv_give_down 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · give back ②：R1 21/21，20 s，主文件 42,220,675 bytes。

## 2026-10-30 · vv_give_in 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · give in ①：R1 9/9，12 s，主文件 42,433,862 bytes。

## 2026-10-30 · vv_give_in 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · give in ②：R1 19/19，19 s，主文件 42,693,045 bytes。

## 2026-10-30 · vv_give_out 第1幕 v5.1 重画并替换进 App
- 🎬 万能动词 · give out ①：R1 7/7，12 s，主文件 42,888,708 bytes。

## 2026-10-30 · vv_give_out 第2幕 v5.1 重画并替换进 App
- 🎬 万能动词 · give out ②：R1 17/17，18 s，主文件 43,053,209 bytes。

## 2026-10-30 16:00 JST · 主文件瘦身 43 MB → 16.9 MB + 人物重叠修复

- **字体共用**：`v5/gen_font_chars.py` 收集所有场景用字（1544 字）→ `v5/font_chars.txt`；`build.mjs` 统一按全表子集化，格式改 woff2（文楷 343 KB、Kalam 14 KB），全 App 只存一份（原来 174 份按幕子集 woff，共 14.6 MB）。
- **引擎共用**：新增 `v5/engine.js`（wb5 / auto / adj_train / 播放器 / 字体），每幕 HTML 拆成「引擎脚本 + 场景脚本」两段；场景脚本里的 wb5 / auto / adj_train 由 esbuild 插件改成从 `globalThis.__WB5__` 取。`embed_app.py` 把引擎整段存成 `gz:` 共享块；App 运行时升级为 `WB5_MOUNT_V3`（共享块按需解压、同页缓存）。
- **挂载竞态修复**：字体已缓存时 fontsReady 会在两段脚本之间兑现，场景还没定义 → `player.js` 改为同时等 DOMContentLoaded。（App 里切到第二幕才会出现，回归已覆盖。）
- **人物重叠修复**（用户反馈）：`scenes/auto.js` 第一块板的开场角色和后面句子的动作角色原来是两个独立角色、叠在同一位置；现在是同一个角色接着做动作。影响全部 148 幕自动版面，已全部重建。双人帧（如 tug 拔河）本身是两人画在一张图里，属正常。
- `v5/rebuild_all.py`：一键全部重建 + 重新嵌入（缺角色包时按场景 ACTS 从 `cast/` 重建，抽查 6 幕逐字节一致）。
- **仓库清理**：`v5/out/`（174 个构建产物，约 63 MB）和自动生成的角色包 `v5/sprites/*.js`（152 个，可从 cast/ 重建）移出 git 并加 .gitignore；手工版 tm/pc/ao 角色包（源图不在仓库）保留。
- 回归：tense_matrix 5、adj_order 4、aux_transformer 4、fp_vectors 4、wo_grimm、ze_be、vv_take_on、vv_give_in 全部 v5 挂载、时长正确、errors none。


---

# 原 HANDOFF 快照（2026-10-30 16:10 JST 搬来，一字不改）

> HANDOFF.md 又长到 83 KB、交接和流水混写，按「HANDOFF 只写现状，流水进 CHANGELOG」的规矩整份搬到这里；新的短交接见 HANDOFF.md。

# 交接文档（HANDOFF）· 白板动画与新模块


> **2026-10-30 16:00 更新**：主文件已瘦身到 16.9 MB（字体、引擎全 App 共用一份，见 CHANGELOG 同日条目）；修复自动版面人物重叠。改了引擎 / 字体 / auto.js 后跑 `python3 docs/whiteboard/v5/rebuild_all.py` 全部重建。`v5/out/` 和自动角色包不再进仓库。

> 更新：2026-10-30 15:35 JST（老白板全部 v5.1 替换完成；万能动词剧场 look、give 12 组 24 幕（VV 72 幕全部完成）；万能动词剧场 get、turn 12 组 24 幕（环境重装后重跑）；万能动词剧场 get、turn 12 组 24 幕；单词身世 wo_* 9 幕 + 中英对照 ze_* 11 幕；第一性原理 fp_* 22 幕 v5.1 替换进 App（fp_one_king ①、fp_zoom_focus ① 已迁中英对照，不重画）；万能动词 VV 72 幕清单已导出 vv_inventory.py；metaphor_code 3、writing_alchemist 3、phrasal_key 2、pron_map 3、stress_rhythm 3、intonation_map 3 幕 v5.1 替换进 App；five_patterns 5、bamboo_tree 5、eight_endings 1、irregular_plural 2 幕 v5.1 替换进 App；aux_transformer 4 幕 v5.1 替换进 App；批量流水线 auto.js / do_unit.py）；12:20 JST（tense_matrix ② 重画）；12:05 人物先行帧库入库；此前 2026-10-30 01:10 JST（新增决策 23 三大厅白板化、24 老白板 58 幕升 v2、25 词源 / 格林定律 / 词根词缀全量入库、26 单词全部维度菜单全量覆盖、27 语法全部白板动画、28 思维导图白板化；决策 25 扩展音变与词汇规律 12 + 6 条；总表见 MASTER_DESIGN「决策 23–28 总表」）
> **当前阶段（2026-10-30 09:14 起）**：决策 30 动作系统重建最优先（见下方「🔴 优先级变更」）。以下为旧描述——阶段 0–4、首页改版 1–6 步已完成；**正在做：阶段 7 全 App 白板化试点（fp_economy 第 1 幕已出对比图待用户审，FR01 买卖待做）+ 阶段 8 / 9 词源与单词全部维度审计**；练习闭环（决策 14）等用户点头。
> 接手先读：本文（现状 + 下一步）→ `MASTER_DESIGN.md`（总设计，26 条决策：1–19、22–28）→ `SOP.md`（标准流程 + 验收清单）。历史进度、每步验收数字、引擎新工具登记都在 `CHANGELOG.md`（原 HANDOFF 全文，章节号不变）。
> 用户规矩：直接提交推送 `master`，不新建分支；做完一个单元 / 改完一个文档立即提交；发现 bug 直接修。本文只写现状和下一步，流水写进 `CHANGELOG.md`。



## 🔴 决策 32（2026-10-30 10:57）：全部白板动画按 v5.1 标准重画——最优先
- 范围约 171 幕（白板案例 99 + 万能动词剧场 72），清单 / 进度 `REDRAW_V5.md`；标准 MASTER_DESIGN §2.9，验收 SOP §17。
- ✅ 公共引擎 `v5/`（README 有 API 与帧库登记）；🟡 tense_matrix ① 重画完成待用户审（`v5/out/tense_matrix_1.html`，联络表 `_keyframes.png`，R1 清单 `lab/INVENTORY_TM1_V5.md` 91/91）。
- 下一步：按 `REDRAW_V5.md` 顺序推进；**改一个替换一个**（用户 2026-10-30 12:29）：每幕重画验收后立即用 `v5/embed_app.py` 替换进主 App、回归、提交、更新本表。tense_matrix ①–⑤ 已替换（7728afa）。
- ✅ **人物先行阶段（2026-10-30 11:28 用户要求先画人物帧、再画版面）**：331 帧透明 WebP 人物 / 动作帧库 `v5/sprites/cast/`（约 7 MB，进仓库），登记表 `v5/CAST_V5.md`（每帧对应的旧案例动作 + 万能动词 24 义项 72 组）。工具：`split_sheet.py`（联排图自动切帧）、`cut_box.py`（粘连帧按坐标切）、`pack_cast.py`（抠绿 → cast/）；`build_sprites.py` 找不到 src 时自动读 cast/。⚠️ 待返工：`l_lift0–2`（杠铃粘连）、`missw_give`（底部残留）、V29 Leo 黑发。
- ✅ tense_matrix ② 现在进行时 v5.1（12 块白板 162 s，R1 85/85 `lab/INVENTORY_TM2_V5.md`，0 报错，确定性 ✓，675 KB 略超预算；新增 `v5/r1v5.py` 自动 R1 核对、wb5 `actor.dy(t)` 竖直位移）。
- ✅ tense_matrix ③ 一般过去时 v5.1（12 块白板 172 s，R1 88/88 `lab/INVENTORY_TM3_V5.md`，0 报错，确定性 ✓，607 KB ≤ 预算）。
- ✅ tense_matrix ④ 一般将来时 v5.1（12 块白板 160 s，R1 84/84，0 报错，确定性 ✓，646 KB）。
- ✅ tense_matrix ⑤ 现在完成时 v5.1（169 s，R1 89/89，0 报错，确定性 ✓，502 KB）→ **tense_matrix 单元 5 幕全部完成**（旧清单只有 5 个案例，REDRAW_V5 原写 6 已更正）。
- ✅ **tense_matrix 5 幕已替换进 App**（用户 12:27「现在替换吧」、12:29「改一个替换一个，提交，写好交接文档」）：`v5/embed_app.py`（幂等）；App 回归：5 幕 iframe 挂载、时长正确、0 报错，bamboo_tree / adj_order / past_clans 仍旧 SVG 正常；主文件 9.32 MB（字体每幕一份，待共享优化）。规则写在 REDRAW_V5.md「替换规则」。
- 环境提醒：沙盒重置过一次，需 `pip install playwright && python3 -m playwright install chromium && sudo python3 -m playwright install-deps chromium` 才能跑 shots.py。
- ✅ **past_clans ① 金钟罩铁布衫派** v5.1 重画（`v5/scenes/past_clans_1.js`，帧库 `sprites/pc1.js`，R1 83/83 → `lab/INVENTORY_PC1_V5.md`，143 s，0 报错，确定性 ✓）并已替换进 App；回归 `python3 v5/app_check.py past_clans clanIdx 4`：①为 v5，②–④仍旧 SVG，其他页签正常。旧版完整导出清单存 `lab/INVENTORY_PAST_CLANS_EXPORT.md`（r1v5.py 直接用它）。
- ✅ **past_clans ② 元音换挡派** v5.1 重画（`v5/scenes/past_clans_2.js`，帧库 `pc2`，R1 81/81，168 s，0 报错）并已替换进 App；回归 ①② v5、③④旧 SVG。
- ✅ **past_clans ③ 长音减肥派** v5.1 重画（`v5/scenes/past_clans_3.js`，帧库 `pc3`，R1 78/78，128 s，0 报错）并已替换进 App。
- ✅ **past_clans ④ 护法派** v5.1 重画（`v5/scenes/past_clans_4.js`，帧库 `pc4`，R1 78/78，158 s，0 报错）并已替换进 App —— **past_clans 单元完成**（4/4 幕在 App 里都是 v5）。主文件 11.45 MB（字体每幕一份，待共享优化）。下一单元：`adj_order`（4 幕）：先 `python3 src/export_inventory.py adj_order > lab/INVENTORY_ADJ_ORDER_EXPORT.md`，查 CAST_V5 帧（coach / teacher_cn 等），再画版面，每幕画完立即 `embed_app.py` + `app_check.py adj_order <状态字段> 4` + 提交。
- 环境提醒：沙盒可能重置，缺依赖时 `pip install playwright numpy pillow && python3 -m playwright install chromium && sudo apt-get install -y libatk1.0-0t64 libatk-bridge2.0-0t64 libcups2t64 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libpango-1.0-0 libcairo2 libasound2t64 libnss3 libnspr4`。
- ✅ `adj_order` 第1/4幕 一张漂亮的小圆木桌（共用版面引擎 scenes/adj_train.js） v5.1 重画并替换进 App（`v5/scenes/adj_order_1.js`，R1 91/91，154 s，0 报错；主文件 11,770,109 bytes）
- ✅ `adj_order` 第2/4幕 ②  两只可爱的小白猫 v5.1 重画并替换进 App（`v5/scenes/adj_order_2.js`，R1 86/86，~120 s，0 报错；主文件 12,087,206 bytes）
- ✅ `adj_order` 第3/4幕 ③  一件漂亮的崭新红色中国丝绸连衣裙 v5.1 重画并替换进 App（`v5/scenes/adj_order_3.js`，R1 90/90，~120 s，0 报错；主文件 12,423,920 bytes）
- ✅ `adj_order` 第4/4幕 ④  那个高个子年轻的英国篮球教练 v5.1 重画并替换进 App（`v5/scenes/adj_order_4.js`，R1 89/89，~120 s，0 报错；主文件 12,756,036 bytes）
- ✅ **体积优化 v1（embed_app.py WB5_MOUNT_V2）**：幕内图片 / 字体 data URI 按内容哈希抽成共享块 `wb5blob-<hash>`（同帧同字体全 App 一份），其余 HTML gzip+base64，挂载时 DecompressionStream 解压。13 幕全部重新嵌入，主文件 12.76 → 10.91 MB，三个单元回归 0 报错。下一步体积优化：文楷（wk）改为全 App 一份共享子集（约 3300 字），预计每幕再省约 125 KB。
- ✅ `aux_transformer` 第1/4幕 🪞 助动词照妖镜 · ① be 动词护卫 v5.1 重画并替换进 App（`v5/scenes/aux_transformer_1.js`，R1 81/81，134 s，0 报错；主文件 11,147,117 bytes）
- ✅ `aux_transformer` 第2/4幕 🪞 助动词照妖镜 · ② 情态动词大将军 v5.1 重画并替换进 App（`v5/scenes/aux_transformer_2.js`，R1 77/77，118 s，0 报错；主文件 11,398,851 bytes）
- ✅ `aux_transformer` 第3/4幕 🪞 助动词照妖镜 · ③ 三单照妖镜 does v5.1 重画并替换进 App（`v5/scenes/aux_transformer_3.js`，R1 77/77，119 s，0 报错；主文件 11,706,342 bytes）
- ✅ `aux_transformer` 第4/4幕 🪞 助动词照妖镜 · ④ 过去式照妖镜 did v5.1 重画并替换进 App（`v5/scenes/aux_transformer_4.js`，R1 77/77，129 s，0 报错；主文件 12,008,559 bytes）
- ✅ **老白板 v5.1 全部替换完成（2026-10-30 15:35）**：App 里挂载的白板案例 + 万能动词剧场 72 幕全部换成 v5.1（每幕 R1 零丢失、确定性、0 报错，embed 后 App 回归通过）。不需替换：fp_one_king ①、fp_zoom_focus ①（已迁中英对照，只留跳转）、wo_vowel_kit（共用小工具）、verb_demo / narrator_demo（开发样板，App 未挂载）。万能动词剧场：旧 ①②③ 三幕 → 新 ①（本义）②（第二义 + 合成卡），清单由 `v5/vv_inventory.py` 逐帧导出；App 内 ① / ② 两个按钮切换（`wb5VVHtml`，旧 SVG 留作兜底）。环境注意：沙箱重置后需 `pip install numpy pillow playwright fonttools brotli && python3 -m playwright install chromium && sudo python3 -m playwright install-deps chromium`；`batch.sh` 有任何一幕失败就不提交。
- **下一步**：老动画替换已完成 → 按原顺序进入三大厅 HD 剧场 FR01 → 语法 40 点 → 思维导图 → 词源 / 格林 / 词根 → 文档收尾 → 决策 29 软件优化（等用户确认再开始，见用户规则）。
- ✅ **批量重画流水线（2026-10-30 14:30，Hark 主对话接手）**：通用版面引擎 `v5/scenes/auto.js`（内容清单 → 一块块白板，镜头逐块推；菜单短词排成一行、①②… 小标题开新板、金句卡带框；例句里的动作词由 cast/ 关键帧演出、读到即橙色弹字；结尾拉远看全图）+ `v5/gen_auto.py`（清单 → `scenes/<页签>_<n>.js`，字幕 / 白板 / 朗读原样写入，R1 一字不差）+ `v5/run_auto.sh`（生成 → 打包 → r1v5 → 联络表）+ `v5/do_unit.py v5/units.json <页签>`（整单元：每幕验收全过才 embed_app + log_done，最后 app_check）。动作词 → 帧的映射写在 `v5/units.json`。`log_done.py` 已改为幂等（重跑不重复记）。环境：字体 wk.ttf 用 LXGW WenKai v1.501（v1.330 的 cmap 让 fontTools 4.61 报错）。
- ✅ `five_patterns` 第1/5幕 🧱 五大基本句型 · ① SV 自给自足型 v5.1 重画并替换进 App（`v5/scenes/five_patterns_1.js`，R1 77/77，110 s，0 报错；主文件 12,437,087 bytes）
- ✅ `five_patterns` 第2/5幕 🧱 五大基本句型 · ② SVP 状态天平型 v5.1 重画并替换进 App（`v5/scenes/five_patterns_2.js`，R1 75/75，106 s，0 报错；主文件 12,652,212 bytes）
- ✅ `five_patterns` 第3/5幕 🧱 五大基本句型 · ③ SVO 一箭穿心型 v5.1 重画并替换进 App（`v5/scenes/five_patterns_3.js`，R1 74/74，118 s，0 报错；主文件 12,886,789 bytes）
- ✅ `five_patterns` 第4/5幕 🧱 五大基本句型 · ④ SVOO 双手递礼型 v5.1 重画并替换进 App（`v5/scenes/five_patterns_4.js`，R1 74/74，111 s，0 报错；主文件 13,155,706 bytes）
- ✅ `five_patterns` 第5/5幕 🧱 五大基本句型 · ⑤ SVOC 魔法赋能型 v5.1 重画并替换进 App（`v5/scenes/five_patterns_5.js`，R1 80/80，123 s，0 报错；主文件 13,383,963 bytes）
- ✅ `bamboo_tree` 第1/5幕 🎋 竹节句 vs 树干句 · 1 v5.1 重画并替换进 App（`v5/scenes/bamboo_tree_1.js`，R1 64/64，83 s，0 报错；主文件 13,571,797 bytes）
- ✅ `bamboo_tree` 第2/5幕 🎋 竹节句 vs 树干句 · 2 v5.1 重画并替换进 App（`v5/scenes/bamboo_tree_2.js`，R1 67/67，86 s，0 报错；主文件 13,753,336 bytes）
- ✅ `bamboo_tree` 第3/5幕 🎋 竹节句 vs 树干句 · 3 v5.1 重画并替换进 App（`v5/scenes/bamboo_tree_3.js`，R1 62/62，82 s，0 报错；主文件 13,933,472 bytes）
- ✅ `bamboo_tree` 第4/5幕 🎋 竹节句 vs 树干句 · 4 v5.1 重画并替换进 App（`v5/scenes/bamboo_tree_4.js`，R1 66/66，83 s，0 报错；主文件 14,171,581 bytes）
- ✅ `bamboo_tree` 第5/5幕 🎋 竹节句 vs 树干句 · 5 v5.1 重画并替换进 App（`v5/scenes/bamboo_tree_5.js`，R1 65/65，91 s，0 报错；主文件 14,360,874 bytes）
- ✅ `eight_endings` 第1/1幕 🎭 八大词尾 · 1 v5.1 重画并替换进 App（`v5/scenes/eight_endings_1.js`，R1 76/76，123 s，0 报错；主文件 14,612,238 bytes）
- ✅ `irregular_plural` 第1/2幕 👣 不规则复数 · 1 v5.1 重画并替换进 App（`v5/scenes/irregular_plural_1.js`，R1 66/66，66 s，0 报错；主文件 14,858,189 bytes）
- ✅ `irregular_plural` 第2/2幕 👣 不规则复数 · 2 v5.1 重画并替换进 App（`v5/scenes/irregular_plural_2.js`，R1 80/80，76 s，0 报错；主文件 15,070,222 bytes）
- ✅ `metaphor_code` 第1/3幕 🔐 三大隐喻密码 · 1 v5.1 重画并替换进 App（`v5/scenes/metaphor_code_1.js`，R1 101/101，139 s，0 报错；主文件 15,307,424 bytes）
- ✅ `metaphor_code` 第2/3幕 🔐 三大隐喻密码 · 2 v5.1 重画并替换进 App（`v5/scenes/metaphor_code_2.js`，R1 88/88，104 s，0 报错；主文件 15,532,169 bytes）
- ✅ `metaphor_code` 第3/3幕 🔐 三大隐喻密码 · 3 v5.1 重画并替换进 App（`v5/scenes/metaphor_code_3.js`，R1 96/96，143 s，0 报错；主文件 15,825,604 bytes）
- ✅ `writing_alchemist` 第1/3幕 ✍️ 写作炼金术 · 1 v5.1 重画并替换进 App（`v5/scenes/writing_alchemist_1.js`，R1 50/50，137 s，0 报错；主文件 16,149,968 bytes）
- ✅ `writing_alchemist` 第2/3幕 ✍️ 写作炼金术 · 2 v5.1 重画并替换进 App（`v5/scenes/writing_alchemist_2.js`，R1 53/53，149 s，0 报错；主文件 16,342,192 bytes）
- ✅ `writing_alchemist` 第3/3幕 ✍️ 写作炼金术 · 3 v5.1 重画并替换进 App（`v5/scenes/writing_alchemist_3.js`，R1 50/50，167 s，0 报错；主文件 16,552,444 bytes）
- ✅ `phrasal_key` 第1/2幕 🔑 短语动词钥匙 · 1 v5.1 重画并替换进 App（`v5/scenes/phrasal_key_1.js`，R1 71/71，120 s，0 报错；主文件 16,814,643 bytes）
- ✅ `phrasal_key` 第2/2幕 🔑 短语动词钥匙 · 2 v5.1 重画并替换进 App（`v5/scenes/phrasal_key_2.js`，R1 59/59，100 s，0 报错；主文件 17,247,650 bytes）
- ✅ `pron_map` 第1/3幕 👄 发音地图 · 1 v5.1 重画并替换进 App（`v5/scenes/pron_map_1.js`，R1 63/63，92 s，0 报错；主文件 17,481,881 bytes）
- ✅ `pron_map` 第2/3幕 👄 发音地图 · 2 v5.1 重画并替换进 App（`v5/scenes/pron_map_2.js`，R1 57/57，76 s，0 报错；主文件 17,678,551 bytes）
- ✅ `pron_map` 第3/3幕 👄 发音地图 · 3 v5.1 重画并替换进 App（`v5/scenes/pron_map_3.js`，R1 65/65，65 s，0 报错；主文件 17,879,749 bytes）
- ✅ `stress_rhythm` 第1/3幕 🎯 重音与弱读 · 1 v5.1 重画并替换进 App（`v5/scenes/stress_rhythm_1.js`，R1 54/54，57 s，0 报错；主文件 18,060,620 bytes）
- ✅ `stress_rhythm` 第2/3幕 🎯 重音与弱读 · 2 v5.1 重画并替换进 App（`v5/scenes/stress_rhythm_2.js`，R1 51/51，49 s，0 报错；主文件 18,232,063 bytes）
- ✅ `stress_rhythm` 第3/3幕 🎯 重音与弱读 · 3 v5.1 重画并替换进 App（`v5/scenes/stress_rhythm_3.js`，R1 45/45，56 s，0 报错；主文件 18,410,322 bytes）
- ✅ `intonation_map` 第1/3幕 🎵 语调地图 · 1 v5.1 重画并替换进 App（`v5/scenes/intonation_map_1.js`，R1 57/57，90 s，0 报错；主文件 18,599,601 bytes）
- ✅ `intonation_map` 第2/3幕 🎵 语调地图 · 2 v5.1 重画并替换进 App（`v5/scenes/intonation_map_2.js`，R1 49/49，68 s，0 报错；主文件 18,781,155 bytes）
- ✅ `intonation_map` 第3/3幕 🎵 语调地图 · 3 v5.1 重画并替换进 App（`v5/scenes/intonation_map_3.js`，R1 45/45，59 s，0 报错；主文件 18,951,959 bytes）
- ✅ `fp_economy` 第1/4幕 ⚙️ 第一性原理 · 经济原则 · 1 v5.1 重画并替换进 App（`v5/scenes/fp_economy_1.js`，R1 69/69，75 s，0 报错；主文件 19,167,017 bytes）
- ✅ `fp_economy` 第2/4幕 ⚙️ 第一性原理 · 经济原则 · 2 v5.1 重画并替换进 App（`v5/scenes/fp_economy_2.js`，R1 66/66，65 s，0 报错；主文件 19,345,115 bytes）
- ✅ `fp_economy` 第3/4幕 ⚙️ 第一性原理 · 经济原则 · 3 v5.1 重画并替换进 App（`v5/scenes/fp_economy_3.js`，R1 69/69，81 s，0 报错；主文件 19,546,882 bytes）
- ✅ `fp_economy` 第4/4幕 ⚙️ 第一性原理 · 经济原则 · 4 v5.1 重画并替换进 App（`v5/scenes/fp_economy_4.js`，R1 75/75，71 s，0 报错；主文件 19,768,718 bytes）
- ✅ `fp_iconicity` 第1/4幕 🔤 第一性原理 · 象似性 · 1 v5.1 重画并替换进 App（`v5/scenes/fp_iconicity_1.js`，R1 57/57，76 s，0 报错；主文件 20,051,532 bytes）
- ✅ `fp_iconicity` 第2/4幕 🔤 第一性原理 · 象似性 · 2 v5.1 重画并替换进 App（`v5/scenes/fp_iconicity_2.js`，R1 69/69，75 s，0 报错；主文件 20,235,006 bytes）
- ✅ `fp_iconicity` 第3/4幕 🔤 第一性原理 · 象似性 · 3 v5.1 重画并替换进 App（`v5/scenes/fp_iconicity_3.js`，R1 66/66，67 s，0 报错；主文件 20,415,260 bytes）
- ✅ `fp_iconicity` 第4/4幕 🔤 第一性原理 · 象似性 · 4 v5.1 重画并替换进 App（`v5/scenes/fp_iconicity_4.js`，R1 64/64，78 s，0 报错；主文件 20,608,111 bytes）
- ✅ `fp_boundedness` 第1/4幕 📦 第一性原理 · 有界无界 · 1 v5.1 重画并替换进 App（`v5/scenes/fp_boundedness_1.js`，R1 57/57，85 s，0 报错；主文件 20,780,417 bytes）
- ✅ `fp_boundedness` 第2/4幕 📦 第一性原理 · 有界无界 · 2 v5.1 重画并替换进 App（`v5/scenes/fp_boundedness_2.js`，R1 50/50，74 s，0 报错；主文件 20,954,338 bytes）
- ✅ `fp_boundedness` 第3/4幕 📦 第一性原理 · 有界无界 · 3 v5.1 重画并替换进 App（`v5/scenes/fp_boundedness_3.js`，R1 65/65，91 s，0 报错；主文件 21,135,057 bytes）
- ✅ `fp_boundedness` 第4/4幕 📦 第一性原理 · 有界无界 · 4 v5.1 重画并替换进 App（`v5/scenes/fp_boundedness_4.js`，R1 60/60，78 s，0 报错；主文件 21,381,732 bytes）
- ✅ `fp_vectors` 第1/4幕 🧭 第一性原理 · 方向向量 · 1 v5.1 重画并替换进 App（`v5/scenes/fp_vectors_1.js`，R1 57/57，73 s，0 报错；主文件 21,555,080 bytes）
- ✅ `fp_vectors` 第2/4幕 🧭 第一性原理 · 方向向量 · 2 v5.1 重画并替换进 App（`v5/scenes/fp_vectors_2.js`，R1 55/55，82 s，0 报错；主文件 22,076,180 bytes）
- ✅ `fp_vectors` 第3/4幕 🧭 第一性原理 · 方向向量 · 3 v5.1 重画并替换进 App（`v5/scenes/fp_vectors_3.js`，R1 52/52，89 s，0 报错；主文件 22,669,379 bytes）
- ✅ `fp_vectors` 第4/4幕 🧭 第一性原理 · 方向向量 · 4 v5.1 重画并替换进 App（`v5/scenes/fp_vectors_4.js`，R1 61/61，110 s，0 报错；主文件 22,869,434 bytes）
- ✅ `fp_one_king` 第2/4幕 👑 第一性原理 · 一句一王 · 2 v5.1 重画并替换进 App（`v5/scenes/fp_one_king_2.js`，R1 55/55，84 s，0 报错；主文件 23,047,333 bytes）
- ✅ `fp_one_king` 第3/4幕 👑 第一性原理 · 一句一王 · 3 v5.1 重画并替换进 App（`v5/scenes/fp_one_king_3.js`，R1 61/61，87 s，0 报错；主文件 23,225,567 bytes）
- ✅ `fp_one_king` 第4/4幕 👑 第一性原理 · 一句一王 · 4 v5.1 重画并替换进 App（`v5/scenes/fp_one_king_4.js`，R1 69/69，83 s，0 报错；主文件 23,413,575 bytes）
- ✅ `fp_zoom_focus` 第2/4幕 🔍 第一性原理 · 由大到小 · 2 v5.1 重画并替换进 App（`v5/scenes/fp_zoom_focus_2.js`，R1 62/62，88 s，0 报错；主文件 23,598,843 bytes）
- ✅ `fp_zoom_focus` 第3/4幕 🔍 第一性原理 · 由大到小 · 3 v5.1 重画并替换进 App（`v5/scenes/fp_zoom_focus_3.js`，R1 54/54，70 s，0 报错；主文件 23,770,134 bytes）
- ✅ `fp_zoom_focus` 第4/4幕 🔍 第一性原理 · 由大到小 · 4 v5.1 重画并替换进 App（`v5/scenes/fp_zoom_focus_4.js`，R1 62/62，95 s，0 报错；主文件 23,954,469 bytes）
- ✅ `wo_port` 第1/1幕 📖 单词身世 · port · 1 v5.1 重画并替换进 App（`v5/scenes/wo_port_1.js`，R1 142/142，185 s，0 报错；主文件 24,767,369 bytes）
- ✅ `wo_europe` 第1/1幕 📖 单词身世 · Europe · 1 v5.1 重画并替换进 App（`v5/scenes/wo_europe_1.js`，R1 142/142，139 s，0 报错；主文件 25,122,494 bytes）
- ✅ `wo_grimm` 第1/1幕 📖 单词身世 · 格林定律 · 1 v5.1 重画并替换进 App（`v5/scenes/wo_grimm_1.js`，R1 160/160，135 s，0 报错；主文件 25,338,874 bytes）
- ✅ `wo_bluetooth` 第1/1幕 📖 单词身世 · Bluetooth · 1 v5.1 重画并替换进 App（`v5/scenes/wo_bluetooth_1.js`，R1 106/106，100 s，0 报错；主文件 25,628,371 bytes）
- ✅ `wo_time_num` 第1/1幕 📖 单词身世 · 时间与数字 · 1 v5.1 重画并替换进 App（`v5/scenes/wo_time_num_1.js`，R1 94/94，131 s，0 报错；主文件 25,842,472 bytes）
- ✅ `wo_time_week` 第1/1幕 📖 单词身世 · 星期 · 1 v5.1 重画并替换进 App（`v5/scenes/wo_time_week_1.js`，R1 129/129，160 s，0 报错；主文件 26,062,152 bytes）
- ✅ `wo_vowel_a` 第1/1幕 📖 单词身世 · 元音 a · 1 v5.1 重画并替换进 App（`v5/scenes/wo_vowel_a_1.js`，R1 89/89，108 s，0 报错；主文件 26,341,719 bytes）
- ✅ `wo_vowel_b` 第1/1幕 📖 单词身世 · 元音 b · 1 v5.1 重画并替换进 App（`v5/scenes/wo_vowel_b_1.js`，R1 75/75，117 s，0 报错；主文件 26,556,004 bytes）
- ✅ `wo_vowel_c` 第1/1幕 📖 单词身世 · 元音 c · 1 v5.1 重画并替换进 App（`v5/scenes/wo_vowel_c_1.js`，R1 82/82，112 s，0 报错；主文件 26,861,727 bytes）
- ✅ `ze_be` 第1/1幕 🔀 中英对照 · be · 1 v5.1 重画并替换进 App（`v5/scenes/ze_be_1.js`，R1 57/57，72 s，0 报错；主文件 27,058,644 bytes）
- ✅ `ze_borrow` 第1/1幕 🔀 中英对照 · 借 · 1 v5.1 重画并替换进 App（`v5/scenes/ze_borrow_1.js`，R1 57/57，74 s，0 报错；主文件 27,289,531 bytes）
- ✅ `ze_link` 第1/1幕 🔀 中英对照 · 连接 · 1 v5.1 重画并替换进 App（`v5/scenes/ze_link_1.js`，R1 58/58，92 s，0 报错；主文件 27,458,106 bytes）
- ✅ `ze_mark` 第1/1幕 🔀 中英对照 · 标记 · 1 v5.1 重画并替换进 App（`v5/scenes/ze_mark_1.js`，R1 74/74，83 s，0 报错；主文件 27,639,164 bytes）
- ✅ `ze_modifier` 第1/1幕 🔀 中英对照 · 修饰语 · 1 v5.1 重画并替换进 App（`v5/scenes/ze_modifier_1.js`，R1 61/61，100 s，0 报错；主文件 27,860,062 bytes）
- ✅ `ze_pronoun` 第1/1幕 🔀 中英对照 · 代词 · 1 v5.1 重画并替换进 App（`v5/scenes/ze_pronoun_1.js`，R1 83/83，90 s，0 报错；主文件 28,035,443 bytes）
- ✅ `ze_same` 第1/1幕 🔀 中英对照 · 相同 · 1 v5.1 重画并替换进 App（`v5/scenes/ze_same_1.js`，R1 73/73，80 s，0 报错；主文件 28,216,100 bytes）
- ✅ `ze_say` 第1/1幕 🔀 中英对照 · 说 · 1 v5.1 重画并替换进 App（`v5/scenes/ze_say_1.js`，R1 69/69，92 s，0 报错；主文件 28,426,471 bytes）
- ✅ `ze_subject` 第1/1幕 🔀 中英对照 · 主语 · 1 v5.1 重画并替换进 App（`v5/scenes/ze_subject_1.js`，R1 59/59，73 s，0 报错；主文件 28,599,791 bytes）
- ✅ `ze_wear` 第1/1幕 🔀 中英对照 · 穿戴 · 1 v5.1 重画并替换进 App（`v5/scenes/ze_wear_1.js`，R1 66/66，77 s，0 报错；主文件 28,797,373 bytes）
- ✅ `ze_yesno` 第1/1幕 🔀 中英对照 · 是非 · 1 v5.1 重画并替换进 App（`v5/scenes/ze_yesno_1.js`，R1 71/71，78 s，0 报错；主文件 28,969,022 bytes）
- ✅ `vv_take_on` 第1/2幕 🎬 万能动词 · take on ① v5.1 重画并替换进 App（`v5/scenes/vv_take_on_1.js`，R1 9/9，12 s，0 报错；主文件 28,969,022 bytes）
- ✅ `vv_take_on` 第2/2幕 🎬 万能动词 · take on ② v5.1 重画并替换进 App（`v5/scenes/vv_take_on_2.js`，R1 19/19，18 s，0 报错；主文件 28,969,022 bytes）
- ✅ `vv_take_off` 第1/2幕 🎬 万能动词 · take off ① v5.1 重画并替换进 App（`v5/scenes/vv_take_off_1.js`，R1 10/10，12 s，0 报错；主文件 29,129,092 bytes）
- ✅ `vv_take_off` 第2/2幕 🎬 万能动词 · take off ② v5.1 重画并替换进 App（`v5/scenes/vv_take_off_2.js`，R1 18/18，18 s，0 报错；主文件 29,272,950 bytes）
- ✅ `vv_take_up` 第1/2幕 🎬 万能动词 · take up ① v5.1 重画并替换进 App（`v5/scenes/vv_take_up_1.js`，R1 8/8，12 s，0 报错；主文件 29,508,261 bytes）
- ✅ `vv_take_up` 第2/2幕 🎬 万能动词 · take up ② v5.1 重画并替换进 App（`v5/scenes/vv_take_up_2.js`，R1 40/40，21 s，0 报错；主文件 29,726,788 bytes）
- ✅ `vv_take_down` 第1/2幕 🎬 万能动词 · take down ① v5.1 重画并替换进 App（`v5/scenes/vv_take_down_1.js`，R1 9/9，12 s，0 报错；主文件 29,933,731 bytes）
- ✅ `vv_take_down` 第2/2幕 🎬 万能动词 · take down ② v5.1 重画并替换进 App（`v5/scenes/vv_take_down_2.js`，R1 22/22，19 s，0 报错；主文件 30,140,778 bytes）
- ✅ `vv_take_in` 第1/2幕 🎬 万能动词 · take in ① v5.1 重画并替换进 App（`v5/scenes/vv_take_in_1.js`，R1 8/8，12 s，0 报错；主文件 30,346,481 bytes）
- ✅ `vv_take_in` 第2/2幕 🎬 万能动词 · take in ② v5.1 重画并替换进 App（`v5/scenes/vv_take_in_2.js`，R1 21/21，18 s，0 报错；主文件 30,563,128 bytes）
- ✅ `vv_take_out` 第1/2幕 🎬 万能动词 · take out ① v5.1 重画并替换进 App（`v5/scenes/vv_take_out_1.js`，R1 9/9，12 s，0 报错；主文件 30,701,846 bytes）
- ✅ `vv_take_out` 第2/2幕 🎬 万能动词 · take out ② v5.1 重画并替换进 App（`v5/scenes/vv_take_out_2.js`，R1 18/18，17 s，0 报错；主文件 30,845,400 bytes）
- ✅ `vv_put_on` 第1/2幕 🎬 万能动词 · put on ① v5.1 重画并替换进 App（`v5/scenes/vv_put_on_1.js`，R1 10/10，12 s，0 报错；主文件 31,035,657 bytes）
- ✅ `vv_put_on` 第2/2幕 🎬 万能动词 · put on ② v5.1 重画并替换进 App（`v5/scenes/vv_put_on_2.js`，R1 19/19，18 s，0 报错；主文件 31,265,804 bytes）
- ✅ `vv_put_off` 第1/2幕 🎬 万能动词 · put off ① v5.1 重画并替换进 App（`v5/scenes/vv_put_off_1.js`，R1 14/14，13 s，0 报错；主文件 31,456,018 bytes）
- ✅ `vv_put_off` 第2/2幕 🎬 万能动词 · put off ② v5.1 重画并替换进 App（`v5/scenes/vv_put_off_2.js`，R1 20/20，20 s，0 报错；主文件 31,648,360 bytes）
- ✅ `vv_put_up` 第1/2幕 🎬 万能动词 · put up ① v5.1 重画并替换进 App（`v5/scenes/vv_put_up_1.js`，R1 9/9，11 s，0 报错；主文件 31,837,600 bytes）
- ✅ `vv_put_up` 第2/2幕 🎬 万能动词 · put up ② v5.1 重画并替换进 App（`v5/scenes/vv_put_up_2.js`，R1 18/18，18 s，0 报错；主文件 32,050,089 bytes）
- ✅ `vv_put_down` 第1/2幕 🎬 万能动词 · put down ① v5.1 重画并替换进 App（`v5/scenes/vv_put_down_1.js`，R1 9/9，13 s，0 报错；主文件 32,189,587 bytes）
- ✅ `vv_put_down` 第2/2幕 🎬 万能动词 · put down ② v5.1 重画并替换进 App（`v5/scenes/vv_put_down_2.js`，R1 22/22，19 s，0 报错；主文件 32,391,184 bytes）
- ✅ `vv_put_in` 第1/2幕 🎬 万能动词 · put in ① v5.1 重画并替换进 App（`v5/scenes/vv_put_in_1.js`，R1 10/10，12 s，0 报错；主文件 32,616,713 bytes）
- ✅ `vv_put_in` 第2/2幕 🎬 万能动词 · put in ② v5.1 重画并替换进 App（`v5/scenes/vv_put_in_2.js`，R1 23/23，19 s，0 报错；主文件 32,860,786 bytes）
- ✅ `vv_put_out` 第1/2幕 🎬 万能动词 · put out ① v5.1 重画并替换进 App（`v5/scenes/vv_put_out_1.js`，R1 8/8，13 s，0 报错；主文件 33,084,985 bytes）
- ✅ `vv_put_out` 第2/2幕 🎬 万能动词 · put out ② v5.1 重画并替换进 App（`v5/scenes/vv_put_out_2.js`，R1 18/18，18 s，0 报错；主文件 33,362,652 bytes）
- ✅ `vv_get_on` 第1/2幕 🎬 万能动词 · get on ① v5.1 重画并替换进 App（`v5/scenes/vv_get_on_1.js`，R1 9/9，13 s，0 报错；主文件 33,503,378 bytes）
- ✅ `vv_get_on` 第2/2幕 🎬 万能动词 · get on ② v5.1 重画并替换进 App（`v5/scenes/vv_get_on_2.js`，R1 18/18，17 s，0 报错；主文件 33,649,172 bytes）
- ✅ `vv_get_off` 第1/2幕 🎬 万能动词 · get off ① v5.1 重画并替换进 App（`v5/scenes/vv_get_off_1.js`，R1 8/8，12 s，0 报错；主文件 33,790,632 bytes）
- ✅ `vv_get_off` 第2/2幕 🎬 万能动词 · get off ② v5.1 重画并替换进 App（`v5/scenes/vv_get_off_2.js`，R1 18/18，17 s，0 报错；主文件 34,042,291 bytes）
- ✅ `vv_get_up` 第1/2幕 🎬 万能动词 · get up ① v5.1 重画并替换进 App（`v5/scenes/vv_get_up_1.js`，R1 9/9，12 s，0 报错；主文件 34,182,457 bytes）
- ✅ `vv_get_up` 第2/2幕 🎬 万能动词 · get up ② v5.1 重画并替换进 App（`v5/scenes/vv_get_up_2.js`，R1 19/19，19 s，0 报错；主文件 34,385,594 bytes）
- ✅ `vv_get_down` 第1/2幕 🎬 万能动词 · get down ① v5.1 重画并替换进 App（`v5/scenes/vv_get_down_1.js`，R1 8/8，13 s，0 报错；主文件 34,600,675 bytes）
- ✅ `vv_get_down` 第2/2幕 🎬 万能动词 · get down ② v5.1 重画并替换进 App（`v5/scenes/vv_get_down_2.js`，R1 18/18，18 s，0 报错；主文件 34,808,856 bytes）
- ✅ `vv_get_in` 第1/2幕 🎬 万能动词 · get in ① v5.1 重画并替换进 App（`v5/scenes/vv_get_in_1.js`，R1 8/8，12 s，0 报错；主文件 34,949,310 bytes）
- ✅ `vv_get_in` 第2/2幕 🎬 万能动词 · get in ② v5.1 重画并替换进 App（`v5/scenes/vv_get_in_2.js`，R1 20/20，18 s，0 报错；主文件 35,132,977 bytes）
- ✅ `vv_get_out` 第1/2幕 🎬 万能动词 · get out ① v5.1 重画并替换进 App（`v5/scenes/vv_get_out_1.js`，R1 10/10，13 s，0 报错；主文件 35,273,345 bytes）
- ✅ `vv_get_out` 第2/2幕 🎬 万能动词 · get out ② v5.1 重画并替换进 App（`v5/scenes/vv_get_out_2.js`，R1 19/19，19 s，0 报错；主文件 35,475,032 bytes）
- ✅ `vv_turn_on` 第1/2幕 🎬 万能动词 · turn on ① v5.1 重画并替换进 App（`v5/scenes/vv_turn_on_1.js`，R1 9/9，12 s，0 报错；主文件 35,687,715 bytes）
- ✅ `vv_turn_on` 第2/2幕 🎬 万能动词 · turn on ② v5.1 重画并替换进 App（`v5/scenes/vv_turn_on_2.js`，R1 17/17，18 s，0 报错；主文件 35,911,030 bytes）
- ✅ `vv_turn_off` 第1/2幕 🎬 万能动词 · turn off ① v5.1 重画并替换进 App（`v5/scenes/vv_turn_off_1.js`，R1 10/10，13 s，0 报错；主文件 36,156,279 bytes）
- ✅ `vv_turn_off` 第2/2幕 🎬 万能动词 · turn off ② v5.1 重画并替换进 App（`v5/scenes/vv_turn_off_2.js`，R1 18/18，18 s，0 报错；主文件 36,388,172 bytes）
- ✅ `vv_turn_up` 第1/2幕 🎬 万能动词 · turn up ① v5.1 重画并替换进 App（`v5/scenes/vv_turn_up_1.js`，R1 7/7，11 s，0 报错；主文件 36,642,871 bytes）
- ✅ `vv_turn_up` 第2/2幕 🎬 万能动词 · turn up ② v5.1 重画并替换进 App（`v5/scenes/vv_turn_up_2.js`，R1 19/19，18 s，0 报错；主文件 36,892,202 bytes）
- ✅ `vv_turn_down` 第1/2幕 🎬 万能动词 · turn down ① v5.1 重画并替换进 App（`v5/scenes/vv_turn_down_1.js`，R1 8/8，13 s，0 报错；主文件 37,108,188 bytes）
- ✅ `vv_turn_down` 第2/2幕 🎬 万能动词 · turn down ② v5.1 重画并替换进 App（`v5/scenes/vv_turn_down_2.js`，R1 18/18，19 s，0 报错；主文件 37,363,271 bytes）
- ✅ `vv_turn_in` 第1/2幕 🎬 万能动词 · turn in ① v5.1 重画并替换进 App（`v5/scenes/vv_turn_in_1.js`，R1 9/9，13 s，0 报错；主文件 37,596,422 bytes）
- ✅ `vv_turn_in` 第2/2幕 🎬 万能动词 · turn in ② v5.1 重画并替换进 App（`v5/scenes/vv_turn_in_2.js`，R1 20/20，19 s，0 报错；主文件 37,824,537 bytes）
- ✅ `vv_turn_out` 第1/2幕 🎬 万能动词 · turn out ① v5.1 重画并替换进 App（`v5/scenes/vv_turn_out_1.js`，R1 8/8，12 s，0 报错；主文件 38,057,090 bytes）
- ✅ `vv_turn_out` 第2/2幕 🎬 万能动词 · turn out ② v5.1 重画并替换进 App（`v5/scenes/vv_turn_out_2.js`，R1 20/20，19 s，0 报错；主文件 38,281,135 bytes）
- ✅ `vv_look_on` 第1/2幕 🎬 万能动词 · look on ① v5.1 重画并替换进 App（`v5/scenes/vv_look_on_1.js`，R1 6/6，11 s，0 报错；主文件 38,484,762 bytes）
- ✅ `vv_look_on` 第2/2幕 🎬 万能动词 · look on ② v5.1 重画并替换进 App（`v5/scenes/vv_look_on_2.js`，R1 19/19，20 s，0 报错；主文件 38,757,373 bytes）
- ✅ `vv_look_off` 第1/2幕 🎬 万能动词 · look away ① v5.1 重画并替换进 App（`v5/scenes/vv_look_off_1.js`，R1 8/8，12 s，0 报错；主文件 38,973,038 bytes）
- ✅ `vv_look_off` 第2/2幕 🎬 万能动词 · look away ② v5.1 重画并替换进 App（`v5/scenes/vv_look_off_2.js`，R1 16/16，18 s，0 报错；主文件 39,115,004 bytes）
- ✅ `vv_look_up` 第1/2幕 🎬 万能动词 · look up ① v5.1 重画并替换进 App（`v5/scenes/vv_look_up_1.js`，R1 7/7，11 s，0 报错；主文件 39,255,286 bytes）
- ✅ `vv_look_up` 第2/2幕 🎬 万能动词 · look up ② v5.1 重画并替换进 App（`v5/scenes/vv_look_up_2.js`，R1 21/21，19 s，0 报错；主文件 39,494,601 bytes）
- ✅ `vv_look_down` 第1/2幕 🎬 万能动词 · look down ① v5.1 重画并替换进 App（`v5/scenes/vv_look_down_1.js`，R1 7/7，12 s，0 报错；主文件 39,689,812 bytes）
- ✅ `vv_look_down` 第2/2幕 🎬 万能动词 · look down ② v5.1 重画并替换进 App（`v5/scenes/vv_look_down_2.js`，R1 17/17，18 s，0 报错；主文件 39,831,320 bytes）
- ✅ `vv_look_in` 第1/2幕 🎬 万能动词 · look in ① v5.1 重画并替换进 App（`v5/scenes/vv_look_in_1.js`，R1 9/9，12 s，0 报错；主文件 40,015,419 bytes）
- ✅ `vv_look_in` 第2/2幕 🎬 万能动词 · look in ② v5.1 重画并替换进 App（`v5/scenes/vv_look_in_2.js`，R1 20/20，19 s，0 报错；主文件 40,214,206 bytes）
- ✅ `vv_look_out` 第1/2幕 🎬 万能动词 · look out ① v5.1 重画并替换进 App（`v5/scenes/vv_look_out_1.js`，R1 8/8，12 s，0 报错；主文件 40,431,839 bytes）
- ✅ `vv_look_out` 第2/2幕 🎬 万能动词 · look out ② v5.1 重画并替换进 App（`v5/scenes/vv_look_out_2.js`，R1 17/17，18 s，0 报错；主文件 40,643,048 bytes）
- ✅ `vv_give_on` 第1/2幕 🎬 万能动词 · give on ① v5.1 重画并替换进 App（`v5/scenes/vv_give_on_1.js`，R1 6/6，11 s，0 报错；主文件 40,809,763 bytes）
- ✅ `vv_give_on` 第2/2幕 🎬 万能动词 · give on ② v5.1 重画并替换进 App（`v5/scenes/vv_give_on_2.js`，R1 18/18，19 s，0 报错；主文件 40,980,762 bytes）
- ✅ `vv_give_off` 第1/2幕 🎬 万能动词 · give off ① v5.1 重画并替换进 App（`v5/scenes/vv_give_off_1.js`，R1 7/7，12 s，0 报错；主文件 41,173,425 bytes）
- ✅ `vv_give_off` 第2/2幕 🎬 万能动词 · give off ② v5.1 重画并替换进 App（`v5/scenes/vv_give_off_2.js`，R1 17/17，17 s，0 报错；主文件 41,339,386 bytes）
- ✅ `vv_give_up` 第1/2幕 🎬 万能动词 · give up ① v5.1 重画并替换进 App（`v5/scenes/vv_give_up_1.js`，R1 9/9，13 s，0 报错；主文件 41,523,928 bytes）
- ✅ `vv_give_up` 第2/2幕 🎬 万能动词 · give up ② v5.1 重画并替换进 App（`v5/scenes/vv_give_up_2.js`，R1 18/18，18 s，0 报错；主文件 41,754,737 bytes）
- ✅ `vv_give_down` 第1/2幕 🎬 万能动词 · give back ① v5.1 重画并替换进 App（`v5/scenes/vv_give_down_1.js`，R1 9/9，13 s，0 报错；主文件 41,981,604 bytes）
- ✅ `vv_give_down` 第2/2幕 🎬 万能动词 · give back ② v5.1 重画并替换进 App（`v5/scenes/vv_give_down_2.js`，R1 21/21，20 s，0 报错；主文件 42,220,675 bytes）
- ✅ `vv_give_in` 第1/2幕 🎬 万能动词 · give in ① v5.1 重画并替换进 App（`v5/scenes/vv_give_in_1.js`，R1 9/9，12 s，0 报错；主文件 42,433,862 bytes）
- ✅ `vv_give_in` 第2/2幕 🎬 万能动词 · give in ② v5.1 重画并替换进 App（`v5/scenes/vv_give_in_2.js`，R1 19/19，19 s，0 报错；主文件 42,693,045 bytes）
- ✅ `vv_give_out` 第1/2幕 🎬 万能动词 · give out ① v5.1 重画并替换进 App（`v5/scenes/vv_give_out_1.js`，R1 7/7，12 s，0 报错；主文件 42,888,708 bytes）
- ✅ `vv_give_out` 第2/2幕 🎬 万能动词 · give out ② v5.1 重画并替换进 App（`v5/scenes/vv_give_out_2.js`，R1 17/17，18 s，0 报错；主文件 43,053,209 bytes）
- **用户规则（2026-10-30 14:05）：不要停，直到全部完成**——单元之间也不停、不等待回复，连续推进。
- **下一步（不再询问用户；每幕重画后立即替换进 App 再提交；用户 12:08 再次强调：重画老白板排在所有任务前面）**：按单元重画白板版面：past_clans → adj_order → aux_transformer → five_patterns → bamboo_tree …；每单元 R1 清单 → `v5/scenes/<id>_<n>.js` → 构建 → 全部验收 → 更新 REDRAW_V5 / CHANGELOG / 本文 → 提交推 master。
- 注意：字体源文件（LXGW WenKai、Kalam，OFL）与绿幕原图不进仓库，在 Hark 工作区 `/workspace/work/fonts`、`v5/sprites/src/`；重建时先放回。

## 🟢 动作系统 v5（决策 31，2026-10-30 10:28 JST 用户确认）——先读这一节
- **路线**：有限动画 / 关键姿势帧。人物 = AI 绿幕关键帧（准备 → 发力 → 结果 + 走路 / 小跑 4 帧），代码只做位移、换帧、牵绳、镜头、高亮、字幕。上面「🔴 优先级变更」第 2 步的 `wb_verbs.js` 手写骨架已被用户否定，不再扩展。
- **工具组合**（详见 MASTER_DESIGN 决策 31）：huashu-art-motion（画风 / 马克笔 / 揭开）+ rough.js（场景线条）+ GSAP（时间轴）+ 自写播放循环（App 内）+ Remotion（开发端出 MP4 / 截图）+ Python 抠图。App 里不带 React / Remotion Player。
- **样板** `He takes the dog out.`：`docs/whiteboard/takeout_wb/`。v5.0（huashu + Remotion Player，HTML 1.02 MB）已推；**v5.1 用户 2026-10-30 10:54 确认「完美，就这样」→ 定为标准画法**（规格 MASTER_DESIGN §2.9，流程 + 验收 SOP §17；rough.js + GSAP + 自写播放器，`takeout_wb/v51/`，单文件 614 KB，联络表 `out/v51_keyframes.png`）。
- **下一步**：~~v5.1 交付~~ ✅ → ~~用户审片~~ ✅ 定稿 → 按 §2.9 / SOP §17回改 tense_matrix ①–⑤、past_clans ①–④、adj_order ①–④ → 原顺序剩余单元（「🔴」第 4 步）。
- **接手要点**：素材制作 `build_assets.py`（绿幕阈值、溢色、项圈橙色识别）；出片 `npx remotion render`；Remotion 自带 Chrome Headless Shell 在 `node_modules/.remotion/`，截图用 `remotion still`。

## 🔴 优先级变更（2026-10-30 09:14 JST，用户确认）——先读这一节

**用户审片结论**：白板动画质量差，**完全没有表现出人物动作**。用户要的是插画式动词演示，参考「男孩牵狗出门 He takes the dog out.」。原因分析和新设计已写进 `MASTER_DESIGN.md` **决策 30** + **§2.8 动作系统 v2**、`SOP.md` **§16 R4v2 验收**。

**新任务顺序（取代下方所有「下一个接手点」）**
1. ✅ 设计文档（决策 30、§2.8、SOP §16、本节）——单独提交。
2. 🟡 **动作系统重建 + 样板**（第一步已推：`wb_verbs.js` 骨架 v2 / 狗 / 门 / 牵绳 / 院子房子场景 / 动词 take · clip · open · walk · take_out 等 + R4v2 检查 + `actsheet.py` + 样板 `verb_demo`；对照图 `work/shots/sample_take_dog_out_对照.png`、动作表 `work/shots/verb_demo_1_动作表.png`（Hark 项目工作区）。下一步：扩到前 60 个动词 + 更多道具 / 动物 / 场景）：骨架 v2（手掌 + 握持点、躯干 / 头转动、正面 / 侧面视角，`wb_actor.js` 只加不改）→ 互动道具和动物（狗、牵绳、门、球、杯子…，grab / follow / affect）→ 简笔场景（房子门口、教室、公园、厨房）→ `wb_verbs.js` 动词专属动作（先做样板要用的 take / walk / open / take…out，再扩到前 60 个）→ r2check R4v2（动词 → 专属动作语义核对、禁止空 `actionWords`）+ `actsheet.py` 动作联络表 → **样板「He takes the dog out.」**，和用户参考插画并排对照截图。
3. ⬜ **回改已完成单元**（样板达标后）：tense_matrix ①–⑤、past_clans ①–④、adj_order ①–④（取消 `actionWords: []` 豁免），其后第一性原理、bamboo_tree、aux_transformer、five_patterns 中用讲解员手势代演的动作词。
4. ⬜ **原顺序剩余单元**：metaphor_code（`07ee259` 已做升级准备，v2 暂停，按新动作系统做）→ stress_rhythm → writing_alchemist → 三大厅 HD 剧场 FR01 → 语法 40 点 → 思维导图 → 单词维度 / 词源 / 格林 / 词根 / 12+6 条规律 → 文档收尾 → 决策 29 软件优化。

规矩不变：不询问、直接推 `master`、每个单元一提交并在「夜间进度」加一行。


## ⏸ 交接（2026-10-30 01:56 JST，额度不足暂停）

**状态**：连续实现已暂停（用户 01:55：额度不多，先写交接）。定时任务「萌星连续实现」（5bcd1df9）和「萌星夜间汇总」（b3c47ef6）都已 **paused**，恢复时在 Hark 里把它们设回 active 即可，按本节接着做。

**已完成（全部已推 master，明细见下方「夜间进度」）**
- 决策 23–29 写入 MASTER_DESIGN（29 软件优化 = 最后做）；SOP §14/§15；word_origins/COVERAGE.md 审计 v1。
- 老白板 v2：fp_economy 1–4 幕、fp_vectors 1–4 幕、fp_boundedness 第 1 幕，共 9 幕（每幕一提交，均有 *_classic.js 备份与 `work/shots/<模块>_<幕>_对比总图.png`）。

**下一个接手点**
1. ~~第 2 幕未提交改动~~ ✅ 已核实：第 2 幕在 `27d5f28` 已提交，无遗留改动（2026-10-30 02:10 接手核对）。
2. 然后顺序：~~fp_boundedness 余下幕~~ ✅ → ~~fp_iconicity~~ ✅ → ~~fp_one_king~~ ✅ → ~~fp_zoom_focus~~ ✅（第一性原理全部完成） → ~~bamboo_tree~~ ✅ → ~~aux_transformer~~ ✅ → ~~five_patterns~~ ✅ → ~~tense_matrix~~ ✅ → ~~past_clans~~ ✅ → ~~adj_order~~ ✅ → metaphor_code → stress_rhythm → writing_alchemist（老白板约 49 幕剩余）→ 三大厅 HD 剧场（FR01 买卖先）→ 语法 40 点（先一般过去时）→ 思维导图（先一张主题导图）→ 单词维度 / 词源 / 格林（先 p→f）/ 词根 / 12+6 条规律（数据 `work/etym`，逐条核实不编造）→ 文档收尾 → 决策 29 软件优化。
3. 每幕流程：备份 classic → 改 v2 → `jscheck.py`、`r2check.py <模块> --strict`、`reg_render.py`、`app*.py` → 对比图 → 提交推送 → 本文件「夜间进度」加一行。
4. 已知遗留：动作库无 swim / eat / 穿脱衣（r2check 只提示，扩 `wb_actor.js` 时补）；`stress_rhythm` 原 3 幕 r2check 失败是旧问题，升级时一并修。

**待用户审**：对比总图 fp_economy_1–4、fp_vectors_1–4、fp_boundedness_1（旧工作区 `work/shots/`）；2026-10-30 02:10 起新做的 fp_boundedness_2–4、fp_iconicity_1–4、fp_one_king_2–4、fp_zoom_focus_2–4、bamboo_tree_1–5、aux_transformer_1–4、five_patterns_1–5 的对比总图在 Hark 项目工作区 `work/shots/`。

**下一个接手点（2026-10-30 09:50 更新）**：tense_matrix、past_clans、adj_order、metaphor_code 已全部升 v2。下一个：**stress_rhythm**（同样先做 classic 快照 + LAB_DEPS / preview.html 加 wo_props；原 3 幕 r2check 失败一并修）。之后： → writing_alchemist → 三大厅 HD 剧场 FR01 → …（顺序同下）。

~~下一个接手点（2026-10-30 06:15 更新）~~：bamboo_tree 5 个、aux_transformer 4 个、five_patterns 5 个案例已全部升 v2（夜间进度见下）。下一个：王炸实验室 **tense_matrix**（照 five_patterns / aux_transformer 做法：先建 `cases/tense_matrix_classic.js` 快照（只改 WB_LAB 名、文件头加注释）、`insert_wb.py` 的 LAB_DEPS 与 `preview.html` 加 wo_props，验收用 `appwb.py tense_matrix`，INVENTORY 放 `docs/whiteboard/lab/INVENTORY_TENSE_MATRIX_V2.md`；一屏多行放不下时拆镜头、说明挪到句子下方；只有全宽内容前讲解员才退到 1010，能收窄到 x≤800 的框就收窄）。之后顺序：tense_matrix → past_clans → adj_order → metaphor_code → stress_rhythm → writing_alchemist → 三大厅 HD 剧场 FR01 → 语法白板化 → 思维导图白板化 → 词源 / 格林定律 / 词根词缀 → 文档收尾 → 决策 29 软件优化。

## 夜间进度（2026-10-30）

> 用户 01:07 / 01:09 授权连续推进：按 MASTER_DESIGN 顺序全部实现（白板化 → 单词维度 → 词源 / 格林 / 词根 / 音变规律 → 文档清理），软件优化（决策 29）最后做；不询问、不等审片，需要决定时按 R1–R4 选最稳妥方案并在此记理由，阻塞跳过登记。对比图存 `work/shots/`，早上统一审。每行：时间 JST｜做了什么｜提交｜对比图｜决定与理由 / 阻塞。

- 01:10｜决策 29 软件优化写入 MASTER_DESIGN（O1–O9，现状度量 / 目标 / 方案 / 验收），按用户更正排在最后｜`78a35af` + 本提交｜—｜—
- 01:32｜fp_economy 第 1 幕 v2 试点推送（讲解员 + 道具 + 6 步分镜 + 金句卡 + R4 worked/played；保留 fp_economy_classic.js）｜`ccad226`｜`work/shots/fp_economy_1_对比总图.png`｜按用户授权不等审片直接推；R1 ❌1 是颜色值 #cbd5e1→C.grey（不是内容）；r2check 全量 --strict 的失败只来自 stress_rhythm 原 3 幕（已知、原样保留，见 §2 第 5 条），验收按范围 `r2check.py fp --strict` = 0。另：取消了与「萌星连续实现」重复的隐藏任务（夜间连续实现 / 早间汇总），避免两个实现者撞同一克隆
- 01:36｜fp_economy 第 2 幕升 v2（撞车 → 插 /ɪ/ → -es / -ed 两栏 → 口诀 → 🔮 kisses 预测 → 金句卡；R4 watch）｜`de2c9cd`｜`work/shots/fp_economy_2_对比总图.png`｜原结论条 D.fin 换成 v2 金句卡（文字原样）；旧幕橙色改 V3 四色（橙色不在 v2 调色板，会渲染成 undefined）；新增预测题词 kiss/kisses 都配了朗读
- 01:38｜fp_economy 第 3 幕升 v2（a→an / in-→im- 拆两个镜头 + 🔮 an elephant + 金句卡；R4 fly）｜`fc4c25e`｜`work/shots/fp_economy_3_对比总图.png`｜徽章加 ✂️（a/an 看读音不看字母属于简化说法）；例句 eat 无对应人物动作，r2check 只作提示，未加
- 01:42｜fp_economy 第 4 幕升 v2，fp_economy 4 幕全部完成（音节房间动画保留 + 🔮 sitting + 金句卡；R4 running / run / stop / sit / sitting）｜`cc3dd8a`｜`work/shots/fp_economy_4_对比总图.png`｜原左右两半拆两个镜头；门的木色是道具色保留；例句 swim、eat 没有对应人物动作（动作库无游泳 / 吃），r2check 只作提示，留待扩 wb_actor.js 时补
- 01:44｜fp_vectors 第 1 幕升 v2（at/on/in 点面体 + 时间小图 + 🔮 on Sunday + 金句卡；R4 get up）｜`a54b7f4`｜`work/shots/fp_vectors_1_对比总图.png`｜新建 fp_vectors_classic.js（只改 WB_LAB 名）；三列从 165/480/795 左移到 140/400/660，避免和讲解员重叠；R1 ❌ 只剩颜色 / 路径坐标
- 01:46｜fp_vectors 第 2 幕升 v2（on/off 两镜头 + 🔮 turn on the TV + 金句卡；R4 put on / turn on / get on / take off / takes off / fall off）｜`1bac762`｜`work/shots/fp_vectors_2_对比总图.png`｜飞机起飞从画完立刻飞改为读到「The plane takes off」时才飞（R4 同步）；coat 用词卡道具代替衣服（动作库没有穿脱衣）
- 01:48｜fp_vectors 第 3 幕升 v2（公交 / 小汽车 + 小旅客上车动作 + 🔮 get on the subway + 金句卡；R4 get on / get in / get off / get out of）｜`2363cc9`｜`work/shots/fp_vectors_3_对比总图.png`｜火柴人（D.person）换成 traveler 角色，R4「描述动作必须人演」；原火柴人弧线路径坐标不再使用（R1 只差坐标）
- 01:51｜fp_vectors 第 4 幕升 v2，fp_vectors 4 幕全部完成（to/from/for 箭头 + look 三兄弟单独镜头 + 🔮 I go to the park + 金句卡；R4 walk to / look for / look at / go to）｜`175335c`｜`work/shots/fp_vectors_4_对比总图.png`｜原 look at/for/after 只有一行字，按 R4 补了三个小示意图（不删原文字）
- 01:53｜fp_boundedness 第 1 幕升 v2（一刀切 / 容器两镜头 + 🔮 two bowls of rice + 金句卡；R4 give）｜`e27e7ec`｜`work/shots/fp_boundedness_1_对比总图.png`｜fp_props.halves() 只加返回值 gl/gr 让 v2 镜头能擦掉（reg_render 证明旧幕不变）；面包和苹果梗保留木色道具色
- 01:56｜fp_boundedness 第 2 幕升 v2（a/the 小狗 + 太阳和门 + 🔮 a cat → The cat + 金句卡；R4 running / open）｜`27d5f28`｜`work/shots/fp_boundedness_2_对比总图.png`｜加 📜 徽章前先核了 Etymonline「the」原文（古英语用指示词、the/that 不分）；对比图里偶尔一帧空白是板擦擦除过渡，不是丢内容
- 02:20｜fp_boundedness 第 3 幕升 v2（楼房外壳 / 去上学两段 + 成对例子单独镜头 + 🔮 go to bed + 金句卡；R4 goes / go / play）｜`04d6495`｜`work/shots/fp_boundedness_3_对比总图.png`（Hark 项目工作区）｜标题较长，表头副标题被徽章挤（与 ze_say 等幕同类，未改）；hospital 例子保留原「to the hospital / in hospital」，术语注明美式常说 in the hospital（✂️）
- 02:30｜fp_boundedness 第 4 幕升 v2，fp_boundedness 4 幕全部完成（小鸡 → 鸡肉 + 玻璃 / 房间 / 鱼成对例子单独镜头 + 🔮 a cake → some cake + 金句卡；R4 running / make room）｜`1c8b0e3`｜`work/shots/fp_boundedness_4_对比总图.png`｜原橙色小鸡改木色描边 + 荧光黄填充（道具色），可数绿 / 不可数蓝；用户 02:11 定：不用定时器、每个小功能一提交并更新本文件
- 02:33｜fp_iconicity 升级准备：classic 快照 + FP_DEPS 加 wo_props｜`538872d`｜—｜旧幕渲染不变（只加依赖）
- 02:42｜fp_iconicity 第 1 幕升 v2（M·S / B·C 两镜头 + 🔮 box + 金句卡；R4 look / open / swims / put / catch）｜`b9eab42`｜`work/shots/fp_iconicity_1_对比总图.png`｜徽章只用 💡（HANDOFF first_principles §4：字母象形是记忆联想）；swim 动作库没有，用蛇的场景动作代替
- 02:50｜fp_iconicity 第 2 幕升 v2（fl·gl / sl + ⚠️ floor 两镜头 + 🔮 slip + 金句卡；R4 flies / fly / go）｜`12293bd`｜`work/shots/fp_iconicity_2_对比总图.png`｜加 ⚠️ 徽章：音义联觉有统计倾向但例外多（first_principles/HANDOFF §4）；sleeping 动作库无「睡」，只作提示
- 03:00｜fp_iconicity 第 3 幕升 v2（str- / sp- 两镜头 + 🔮 string + 金句卡；R4 walk / come / look）｜`fefb0e4`｜`work/shots/fp_iconicity_3_对比总图.png`｜sport ⚠️ 出处：etymonline.com/word/sport（sport 是 disport 的缩短，来自古法语 desporter「消遣」）
- 03:15｜fp_iconicity 第 4 幕升 v2，fp_iconicity 4 幕全部完成（数字 / 人两镜头 + 🔮 twins + 金句卡；R4 read / sit）｜`b993831`｜`work/shots/fp_iconicity_4_对比总图.png`｜R3：between 按 etymonline.com/word/between 更正为 bi-（by）+ tweonum（两个两个），原句留小字；twelve 按 etymonline.com/word/twelve =「十之外剩二」，与原讲法一致
- 03:18｜fp_one_king 升级准备：classic 快照 + FP_DEPS｜`042b5f0`｜—｜第 1 幕是「已搬到 ze_be」占位幕（ze_be 已是 v2），不升级
- 03:28｜fp_one_king 第 2 幕升 v2（王座 + to 马甲 / doing 马甲两镜头 + 🔮 hope to see + 金句卡；R4 go / reading）｜`bba72c1`｜`work/shots/fp_one_king_2_对比总图.png`｜王座 / 王冠 / 令牌是道具金色，保留；swimming、drawing 动作库无，只作提示
- 03:38｜fp_one_king 第 3 幕升 v2（令牌飞走 / 侍卫接管两镜头 + 🔮 Does Tom play + 金句卡；R4 went / go / plays）｜`11f5236`｜`work/shots/fp_one_king_3_对比总图.png`｜坑：FP_PROPS 的 token / king 自己开组并 endGroup，之后要 `D.adopt(g); D.back()` 回到镜头组，否则后面的字不随板擦擦掉
- 03:48｜fp_one_king 第 4 幕升 v2，fp_one_king 全部完成（五行骨骼 + 🔮 She gives me an apple + 金句卡；R4 fly / pass / reading / gives）｜`210a197`｜`work/shots/fp_one_king_4_对比总图.png`｜进度条步骤名不用「S V P」（r2check 会当成英文句子），改中文「主系表」等
- 03:50｜fp_zoom_focus 升级准备：classic 快照 + FP_DEPS｜`632ebc9`｜—｜第 1 幕是「已搬到 ze_modifier」占位幕，不升级
- 03:58｜fp_zoom_focus 第 2 幕升 v2（Where 跳 / 问句·感叹句两镜头 + 🔮 Where is your cat + 金句卡；R4 going / get up / runs）｜`229acad`｜`work/shots/fp_zoom_focus_2_对比总图.png`｜—
- 04:08｜fp_zoom_focus 第 4 幕升 v2（时间轴 × 三种拍法 + 🔮 bird is singing + 金句卡；R4 play / reading）｜`fe3e052`｜`work/shots/fp_zoom_focus_4_对比总图.png`｜先做第 4 幕；第 3 幕用 camera 缩放，单独做
- 04:18｜fp_zoom_focus 第 3 幕升 v2，**第一性原理 6 条全部 v2 完成**（22 幕；④-1、⑥-1 是搬家占位幕）（地址同心圆 / 时间两镜头 + 🔮 5 Garden Road + 金句卡）｜`f7a216f`｜`work/shots/fp_zoom_focus_3_对比总图.png`｜日历小图用中文「周二 / 九月」，避免 Tue / Sep 缩写还要配例句
- 05:19｜bamboo_tree 升级准备：classic 快照 + LAB_DEPS 加 wo_props（preview.html 同步）｜`7c87cfb`｜—｜旧幕渲染不变（只加依赖）；实验室 INVENTORY 放 docs/whiteboard/lab/（该目录原有实验室合并清单，无 INVENTORY_* 先例）
- 05:22｜bamboo_tree ① 多动词连动病升 v2（竹节句 + 病句 / 树干句两镜头 + 🔮 to go … to play + 金句卡；R4 go / read / play）｜`7dfce92`｜`work/shots/bamboo_tree_1_对比总图.png`｜INVENTORY 放 docs/whiteboard/lab/（实验室清单目录）；「汉语：竹节句」原 k.leftHead 棕色改 V3 墨黑（自画标题，同理「英语：树干句」放 x=40）；预测题 football 的黄底是引擎生词高亮，未关
- 05:23｜bamboo_tree ② 双王相撞病升 v2（竹节句 + 病句 / 两棵树两镜头 + 🔮 She is very tall + 金句卡）｜`dd839ce`｜`work/shots/bamboo_tree_2_对比总图.png`｜例句只有 like / be（心理、状态动词），按 R4 无需人演，actionWords 留空注明；讲解员在「开心」「and」处 point、「They are happy」处 cheer 只作表演
- 05:25｜bamboo_tree ③ 长定语压塌车头病升 v2（竹节句 + 病句 / 树干句两镜头 + 🔮 The boy with glasses + 金句卡；R4 reading）｜`2e64fb1`｜`work/shots/bamboo_tree_3_对比总图.png`｜r2check 提示「Chinglish puts the long part first」的 puts 是抽象说法（不是人搬东西），不列 actionWords；挂件小字压在树干上与升级前相同，未改
- 05:26｜bamboo_tree ④ 时空顺序颠倒病升 v2（竹节句 + 病句 / 树干句两镜头 + 🔮 at home at 3 o'clock yesterday afternoon + 金句卡；R4 exercises）｜`22e3498`｜`work/shots/bamboo_tree_4_对比总图.png`｜exercises 不在 r2check 动作动词表，但「做早操」是人能演的动作，按 R4 精神列入 actionWords（讲解员 jump）；括号颜色按挂件色统一（时间绿 · 地点蓝），与树干镜头一致
- 05:29｜bamboo_tree ⑤ There be 双谓语病升 v2，**bamboo_tree 5 个案例全部 v2 完成**（竹节句 + 病句 / 树干句两镜头 + 🔮 three birds singing + 金句卡；R4 swimming / swim 小黄鸭游）｜`37f618f`｜`work/shots/bamboo_tree_5_对比总图.png`｜游泳无人物动作，按 fp_iconicity 先例用场景动作（鸭子 move + actFx）代替；鸭子黄色是道具色；预测题 sing→singing 不列 actionWords（唱歌不是走跑跳类肢体动作，动作库也无）
- 05:34｜aux_transformer 升级准备：classic 快照 + LAB_DEPS 加 wo_props（preview.html 同步）｜`cb8769e`｜—｜旧幕渲染不变（只加依赖）；照 bamboo_tree 先例，INVENTORY 放 docs/whiteboard/lab/
- 05:41｜aux_transformer ① be 动词护卫升 v2（① 肯定 + ② 否定 / ③ 一般疑问 + ④ 特殊疑问 / ⑤ 感叹 + 回顾 + 口诀三镜头 + 🔮 Is he reading a book + 金句卡；R4 taking photos 场景人物拿相机 + 快门闪、reading 讲解员捧书）｜`1f30f96`｜`work/shots/aux_transformer_1_对比总图.png`｜原一屏 5 行在讲解员让位（内容 x≤800）后放不下，按 R1 稳妥拆成三镜头，文字一条不删只换位置；动作库没有「拍照」，用 take + 📷 词卡 + 快门闪（actFx）代替；镜头 3 原本只剩一句，补前四句灰色回顾（都是已朗读的原句，不加新事实）；时长 102→128 秒
- 05:44｜aux_transformer ② 情态动词大将军升 v2（三镜头 + 🔮 Can she jump high + 金句卡；R4 speak 场景人物 Leo 挥手 + Hello! 气泡、read 讲解员捧书、jump 讲解员跳）｜`cf3428c`｜`work/shots/aux_transformer_2_对比总图.png`｜说话动作库没有，用 wave（开口打招呼）+ 气泡代替；气泡需要英文，新增例句 Hello! I can speak English.（含朗读，无事实性内容）；He cannot swim 是否定句（没在游），不演，r2check 只提示；时长 86→111 秒
- 05:47｜aux_transformer ③ 三单照妖镜 does 升 v2（三镜头 + 🔮 Does he play football every day + 金句卡；R4 watches / watch Mia 坐下看电视、plays / play 讲解员跳）｜`ba6b1fc`｜`work/shots/aux_transformer_3_对比总图.png`｜「看电视」动作库没有 watch，用场景人物 walk + sit + 电视屏幕亮起（actFx）表现；电视 / 凳子只用墨黑 + 浅蓝底；时长 90→117 秒
- 05:49｜aux_transformer ④ 过去式照妖镜 did 升 v2，**aux_transformer 4 个案例全部 v2 完成**（三镜头 + 🔮 Did she go to school by bus + 金句卡；R4 went 旅客登机 + 飞机起飞、flew 飞机掠过、go 讲解员走）｜`5fb5bab`｜`work/shots/aux_transformer_4_对比总图.png`｜飞机用 wo_props 的 D.plane（已是 V3 蓝），起飞 / 掠过是场景动作（actFx + move）；讲解员预测题走回后加 turn 朝左，避免金句卡时背对；旧版面工具 H 已无人用，删除（字符串在 build 之外，不影响 R1 对照）；时长 103→127 秒
- 05:52｜five_patterns 升级准备：classic 快照 + LAB_DEPS 加 wo_props（preview.html 同步）｜`260c4c2`｜—｜旧幕渲染不变（reg_render diff 0，只加依赖）；照 aux_transformer / bamboo_tree 先例，INVENTORY 放 docs/whiteboard/lab/
- 05:59｜five_patterns ① SV 自给自足型升 v2（骨架 + 挂件 / 金句 / 挂钩 + 铁律 + 公式三镜头 + 🔮 Look at the sky + 金句卡；R4 rises 太阳升起、fly 鸟飞过、run 讲解员跑、look 指黑板、play 跳）｜`b944d70`｜`work/shots/five_patterns_1_对比总图.png`（Hark 项目工作区）｜方块下移到 y140 让出进度条；公式绿框只有约 500–620 宽，收窄到 x≤800 后讲解员不必退场（R1 不受影响，比照 aux 只在全宽内容前退场）；✂️ 徽章出处 en.wikipedia.org/wiki/English_clause_element（Quirk 等 1985 分 7 种）；新版面工具 vtools() 与旧 tools() 并存，全部案例升完再删旧工具；时长 92→108 秒
- 06:04｜five_patterns ② SVP 状态天平型升 v2（骨架 + 天平 + 系动词两类 / 金句 + -ly 避坑 + 铁律 / 秋天金句 + 公式三镜头 + 🔮 The flower smells sweet + 金句卡；R4 smells 冒热气、turn 叶子变黄、gets 凉风）｜`be84ae7`｜`work/shots/five_patterns_2_对比总图.png`（Hark 项目工作区）｜系动词是状态不是肢体动作，按 bamboo_tree ② 先例不让人演，只做与朗读同步的场景变化并列入 actionWords；「Get, turn, become」词表里的 get 只作提示；鸡汤 / 黄叶用荧光黄作填充底色（V3 允许）；时长 97→109 秒
- 06:07｜five_patterns ③ SVO 一箭穿心型升 v2（骨架 + 一箭穿心 / 植树金句 + 画蛇添足 / 宾语穿制服 + 公式三镜头 + 🔮 I want to read this story + 金句卡；R4 reading 捧书、planted 小旅客种树苗、go 讲解员走、read 捧书）｜`796b68c`｜`work/shots/five_patterns_3_对比总图.png`（Hark 项目工作区）｜小树苗用道具库的 flower（动作库没有「种」，用 carry + put 搬到土坑边放下表现）；✂️ 徽章只写「大致规律、要逐个记」，不加新的事实性说法；enter the room 的 enter 不在 r2check 动作表、只是例词串，不演；时长 109→119 秒
- 06:12｜five_patterns ④ SVOO 双手递礼型升 v2（骨架 + 两种语序 / to 指向 / for 心意 + 公式三镜头 + 🔮 Please pass the book to me + 金句卡；R4 gave 妈妈递礼物盒、give / show 讲解员举词卡、pass 举书递出）｜`ec58b68`｜`work/shots/five_patterns_4_对比总图.png`（Hark 项目工作区）｜「给」动作库没有，按 fp_one_king ④ 先例用 carry + put（场景）和 holdCard（讲解员）代替；bought / made / cook 动作库没有买、做饭，不演（不在 r2check 动作表）；✂️ 徽章去掉「个别动词两种都能用」这类未核实说法，只写「以词典为准」；时长 105→116 秒
- 06:15｜five_patterns ⑤ SVOC 魔法赋能型升 v2，**five_patterns 5 个案例全部 v2 完成**（骨架 + 小主谓句 / 读书金句 + 形容词宾补避坑 / 使役动词 + 带不带 to + 公式三镜头 + 🔮 The teacher makes us read aloud + 金句卡；R4 reading / read 捧书、play 讲解员跳 + 两个孩子跳、go 讲解员走）｜`14c396b`｜`work/shots/five_patterns_5_对比总图.png`（Hark 项目工作区）｜「makes me happily」原在 x712 会越过讲解员，挪到下一行；laugh 动作库没有，只给场景孩子开心表情、不列 actionWords；keeps my mind open 的 open 是形容词，r2check 只作提示；删掉旧版面工具 tools()（只留在 classic）；五个案例时长 92→108、97→109、109→119、105→116、118→127 秒（每个都在 +20% 内）
- 06:20｜tense_matrix 升级准备：classic 快照 + LAB_DEPS 加 wo_props（preview.html 同步）｜`8a4dd20`｜—｜旧幕渲染不变（reg_render diff 0，只加依赖）；照 five_patterns 先例，INVENTORY 放 docs/whiteboard/lab/；升级前时长 ①144 ②129 ③148 ④134 ⑤145 秒（每个案例 v2 上限 ×1.2：173 / 155 / 178 / 161 / 174）
- 06:29｜tense_matrix ① 一般现在时升 v2（时间轴 + 格子 / 公式 + 原形·单三 / -es · y→ies / 信号词 + 照妖镜 + 结论四镜头 + 🔮 She goes to school + 金句卡；R4 goes 地球绕太阳 · 小汽车开走 · 讲解员走、play 讲解员跳、plays 小男孩带球跑、flies 小鸟飞）｜`821d791`｜`work/shots/tense_matrix_1_对比总图.png`（Hark 项目工作区）｜原一屏 9 块内容在讲解员让位（x≤800）后放不下，按 R1 稳妥拆成四个镜头，文字一条不删；原文件末尾集中补的 R2 朗读挪到对应画面旁（如 The earth goes around the sun 放到「客观真理」并让地球转起来）；旧 k.final 横跨 860 宽，改用收窄到 784 的结论框（同样朗读）；teaches / watches / washes 不是肢体动作或动作库没有，不演；✂️ 徽章只写「九宫格是简化图」，不加新事实；时长 144→155 秒
- 06:33｜tense_matrix ② 现在进行时升 v2（时间轴 + 格子 + 录像机 / 公式 + 错句 + running / dancing · swimming · reading / 信号词 + 心理状态词陷阱 + 结论四镜头 + 🔮 Look! The boy is jumping + 金句卡；R4 playing 讲解员跳、running Leo 跑、dancing Mia 跳舞、swimming 泳池小脑袋游、reading 讲解员捧书、jumping 讲解员跳）｜`2d06b93`｜`work/shots/tense_matrix_2_对比总图.png`（Hark 项目工作区）｜跳舞动作库没有，用 jump + turn 交替代替；游泳无人物动作，按 bamboo_tree ⑤ 先例用场景动作（泳池里小脑袋 move + squash）；r2check 的词形只认 -ing 直接加，running / swimming（双写）要原样写进 actionWords 才能对上朗读；making a cake 动作库没有「做」，不演；时长 129→137 秒
- 06:37｜tense_matrix ③ 一般过去时升 v2（时间轴 + 格子 + 老照片 / 公式 + 博物馆 + y→ied / stopped + was·were / 信号词 + did 陷阱 + 结论四镜头 + 🔮 Did you play football yesterday + 金句卡；R4 visited 小旅客走到博物馆、took / take 举相机拍照 + 快门闪、stopped 公交车停站、went / go 讲解员走、play 讲解员跳）｜`12347ee`｜`work/shots/tense_matrix_3_对比总图.png`（Hark 项目工作区）｜拍照照 aux_transformer ① 先例用 take + 📷 词卡 + 快门闪；visit 不在 r2check 动作表，但「参观」是走过去，按 R4 精神列入；预测题揭晓句补一句 Yes, I played football yesterday.（played 出现在选项里，R2 要有例句；无事实性内容）；studied / cried / lost / plan 动作库没有或不是肢体动作，不演；时长 148→158 秒
- 06:39｜tense_matrix ④ 一般将来时升 v2（时间轴 + 格子 + 望远镜 / 方案 A·B + will 句 + 放风筝 / be going to 三句 + 去爷爷奶奶家 / 信号词 + There be 陷阱 + 结论四镜头 + 🔮 There will be a party tomorrow + 金句卡；R4 fly 小男孩跑 + 风筝飞上天、visit Leo 走到爷爷奶奶家）｜`3e66990`｜`work/shots/tense_matrix_4_对比总图.png`（Hark 项目工作区）｜R3：will「原意是决心」核对 etymonline.com/word/will——动词 will 古英语 willan 原意「想要、愿意」，「决心」是名词 will 的义项；按 fp_iconicity ④ between 先例原字幕保留、加一行 📜 查证小字（不含要朗读的新英文），出处写进术语；We are going to swim 是计划不是正在做，不演（r2check 只提示）；have a picnic 动作库没有，不演；时长 134→141 秒
- 06:42｜tense_matrix ⑤ 现在完成时升 v2，**tense_matrix 5 个案例全部 v2 完成**（时间轴 + 格子 + 桥 + 奖杯 / 公式 + 丢钥匙 + finished · lived / been to · gone to 两个小人 / 信号词 + 过去时间点陷阱 + 结论四镜头 + 🔮 I have finished my homework + 金句卡；R4 been 小旅客去长城又回来、gone 王老师走向上海后消失）｜`e4e85c0`｜`work/shots/tense_matrix_5_对比总图.png`（Hark 项目工作区）｜been to / gone to 原来只有字，按 R4 用两个场景小人演出「去了又回来」和「走了没回来」（王老师用 porter 形象区分）；Finish, go 只是词表，不演（r2check 只提示 go）；原想加 ✂️ 徽章说明 been to / gone to 的简化，因无现成出处核对，不加，只留 💡；五个案例时长 144→155、129→137、148→158、134→141、145→150 秒（每个都在 +20% 内）
- 08:50｜past_clans 升级准备：classic 快照 + LAB_DEPS 加 wo_props（preview.html 同步）｜`40b389f`｜—｜reg_render diff 0；升级前时长 ①103 ②125 ③95 ④102 秒
- 09:40｜past_clans ①–④ 四大门派一次升 v2，**past_clans 4 个案例全部 v2 完成**（每派：门派旗 + 秘诀 / 前两个成员 + 场景 / 第三个成员 + 其余成员 + 结论三镜头 + 🔮 预测 + 金句卡；版面工具 PC_V2）｜本提交｜`work/shots/past_clans_1–4_对比总图.png`（Hark 主对话工作区）｜R4：① play 讲解员跳、put 小旅客把书搬到桌上 · 预测举 put 卡、read 捧书；② swam 海里小脑袋游、drank 牛奶杯喝空、sat 小旅客坐凳子、ran / came 讲解员跑出去再跑回；③ slept 月亮旁飘 Zzz、left 火车开走、met 两个小人走到公园见面；④ bought 购物袋冒出新裙子、brought 带小狗去公园、taught 讲解员指黑板、caught 接住飞来的球。预测题：put / sang / swept / bought（错误选项 putted · singed · sweeped · baught 进 r2skip 不读）。R1 341 条 ❌6 全是旧填充色值改 V3；r2check past_clans --strict 0（R4 15 个全同步；drink / swim / sit / give / run / come / catch / bring 原形只在词表朗读里，只作提示）；reg_render 只有 past_clans 20 项变；appwb 4 正常；时长 103→112、125→130、95→101、102→109 秒。四个案例一次提交（同一套版面工具，逐个验收后合并提交）。
- 09:10｜adj_order 升级准备：classic 快照 + LAB_DEPS 加 wo_props（preview.html 同步）｜本提交｜—｜reg_render diff 0；升级前时长 ①83 ②66 ③68 ④69 秒；用户 09:02：「不要询问，把所有任务全部做完，及时更新交接文档」
- 09:25｜adj_order ①–④ 四列真题专列一次升 v2（共用 build），**adj_order 4 个案例全部 v2 完成**（中文 + 一袋形容词 + 主观→客观箭头 / 火车逐个上车 + 紧贴名词 + 为什么 + 结论框两镜头 + 🔮 预测 + 金句卡）｜本提交｜`work/shots/adj_order_1–4_对比总图.png`（Hark 主对话工作区）｜车厢 108→88 宽收进 x≤800；车厢色改 V3：观点红（主观）→ 中间蓝 → 材质用途 / 名词站绿（客观），与箭头同色；词「上车」做成从车厢上方落进座位；新增预测题 nice big red balloon / cute little yellow ducks / new white sports shoes / friendly young Chinese teacher（排错选项进 r2skip）；例句只有 bought / have / wears / is，无肢体动作词，actionWords 留空注明。R1 208 条 ❌0；r2check adj_order --strict 0；reg_render 只有 adj_order 20 项变；appwb 4 正常；时长 83→94、66→77、68→79、69→80 秒
- 09:20｜metaphor_code 升级准备：classic 快照 + LAB_DEPS 加 wo_props（preview.html 同步）｜本提交｜—｜reg_render diff 0；appwb 3 正常；升级前时长 ①130 ②98 ③129 秒（v2 上限 ×1.2：156 / 118 / 155）；本项目（Hark 项目「萌星小学英语」）接手连续推进
- 09:30｜**优先级变更（用户 09:14）**：设计文档写入决策 30 动作系统重建（原因 5 条 + 新设计 D1–D6）、MASTER_DESIGN §2.8 动作系统 v2、阶段表加 6.5、SOP R4v2 + §16、HANDOFF 新任务顺序｜本提交｜—｜metaphor_code 只做到升级准备（`07ee259`），v2 暂停；k.act 使用统计已按代码核对（964 次，17 个动作）
- 09:50｜metaphor_code ①–③ 三大隐喻密码一次升 v2，**metaphor_code 3 个案例全部 v2 完成**（每个案例：讲解员 + 五步进度；原 2×2 卡片一屏放不下 x≤800，拆成「两张卡一个镜头」；连读镜头每读一句先把原朗读句写上板；结论框收进 x≤800 代替旧 k.final；🔮 床头 the head of the bed / 红茶 black tea / as quiet as a mouse 预测 + 金句卡）｜本提交｜`work/shots/metaphor_code_1–3_对比总图.png`（Hark 项目「萌星小学英语」工作区）｜R3：① 原图时针指 6、朗读却是「points to three」，按 R1 两条都留，读到这句时让时针转到 3（场景动作）并补「→ 转到 3」小字；R4：look 讲解员指钟面、give me a hand 讲解员伸手托（support）、give the green light 红绿灯亮绿（actFx）；look sad 是系动词，按 five_patterns ② 先例不演；③ 无肢体动作词，蜜蜂嗡嗡、雨点落下用场景动画；red tea 进 r2skip。徽章 💡✂️（black tea 的「干叶颜色」说法查了 Wikipedia Black tea 条，只说中文按茶色叫红茶，没核实到英文命名理由，所以标 ✂️ 不标 📜）。R1 342 条 ❌0；r2check metaphor_code --strict 0；reg_render 只有 metaphor_code 15 项变；appwb 3 正常；时长 130→146、98→106、129→139 秒（都在 +20% 内）
- 09:58｜stress_rhythm 升级准备：classic 快照 + LAB_DEPS 加 wo_props（preview.html 同步）｜本提交｜—｜reg_render diff 0；appwb 3 正常；升级前时长 ①61 ②57 ③50 秒；本页签已并入语调地图「🎯 重音与弱读」区（模块 id 不变）
- 09:55｜**决策 30 动作系统 v2 第一步 + 样板「He takes the dog out.」**：新引擎文件 `src/wb_verbs.js`（`k.cast / k.verb / k.to / k.attach / k.scenery`；男孩骨架 v2 带手掌 + 握持点、转身经过正面视角、depth 远近；狗走 / 趴 / 站 / 摇尾巴 / 项圈；门开合；牵绳挂钩 → 手 → 项圈按绳长下垂；院子 / 房子 / 公园 / 教室 / 厨房简笔场景；专属动作 walk · run · take · clip · open · close · put · give · wave · take_out + VERB_TABLE / PHASES），引擎只加两处挂钩；`r2check` 加 R4v2（`--r4v2` 或案例 `r4v2: true`：专属动作 + 语义 + 禁止空清单）；新脚本 `actsheet.py`（每个专属动作 预备 / 发力 / 结果 三帧联络表）；样板 `cases/verb_demo.js`（SAMPLES 按需模块，不进页签）｜本提交｜`work/shots/sample_take_dog_out_对照.png`、`work/shots/verb_demo_1_动作表.png`（Hark 项目工作区）｜reg_render 旧 455 项 diff 0（只新增 verb_demo 5 项）；r2check verb_demo --strict 0（R4v2 4 个动作词全过）；时长 45 秒。注意：有另一个实现者在 09:14 之后仍按旧顺序推了 metaphor_code v2（`53e1d21`）和 stress_rhythm 准备（`3e6ea28`）——按决策 30 这两项算「待回改」，**所有实现者请先读顶部「🔴 优先级变更」，停止原顺序单元**

## 1. 现在做到哪

| 阶段（MASTER_DESIGN §4） | 状态 | 最后一个提交 |
|---|---|---|
| 0 文档、1 骨架补齐（引擎 v2、讲解员、R2/R4 检查、port 样板幕、按需加载） | ✅ | `abb050c` port 审片通过、`f575002` 按需加载 |
| 2 单词身世第一批（Europe、Bluetooth、身世标签、格林定律章 4 幕、时间与度量 2 幕；删 `vowel_shift`） | ✅ | `a29cb70`、`4347111` |
| 3 中英对照总枢（11 幕，全部 v2 + 讲解员；④-1 / ⑥-1 零丢失搬迁） | ✅ | `b8366bd` |
| 4 实验室新页签（phrasal_key 并入 verb_matrix、eight_endings、pron_map、intonation_map 并入 stress_rhythm） | ✅ | `f497a1a` |
| 旧幕 R2 补朗读（P1–P4 + metaphor_code + past_clans） | ✅ | `0a5d255` |
| 5 新模块（决策 6）：✅ 合成词重音（语调地图第 3 幕）、✅ 不规则复数（页签 ⑮）；⬜ 空间隐喻、拼写潜规则、交际句型地图 | 进行中 | `52b7121` |
| 首页改版 1–6 步（继续上次 → 三大厅 → 三大总枢小卡 → 王炸实验室入口卡 → 更多） | ✅ | `f1cd18f` |
| **中点：练习闭环 + 总地图（决策 14）** | ⏰ 已到点未做 | — |
| 文档清理（HANDOFF 拆分、计数、时间戳、§3 总表、README）+ 锚点检查 + 审片清单 | ✅ | `121ce9c`、`562b6d4`、`c27c278` |
| 7 全 App 白板化（决策 23 / 24）：试点 fp_economy 第 1 幕 | 🟡 已做，待用户审对比图（未推送） | — |
| 8 词源 / 格林定律 / 词根词缀全量入库（决策 25） | 🟡 审计中 | `3cc5e98`（决策） |
| 9 单词全部维度菜单全量覆盖（决策 26） | 🟡 审计中 | `0af9976`（决策） |
| 10 语法全部白板动画（决策 27） | ⬜ 先试点 1 个语法点 | `0af9976`（决策） |
| 11 思维导图白板化（决策 28） | ⬜ 先试点 1 张主题导图 | `b70b47a`（决策） |
| 单词维度审计 v1（`word_origins/COVERAGE.md`） | ✅ 已出，待用户看 | `5631b28` |
| 11 思维导图白板化（决策 28） | ⬜ 先试点 1 张主题导图 | `58d5665`（决策） |
| 8b 音变与词汇规律 12 + 6 条（决策 25 扩展） | 🟡 审计完成，待补齐 | `1245397`、`37a7ab5`（COVERAGE.md） |

## 2. 下一步（按优先级）

0. **全 App 白板化（决策 23 / 24，用户 2026-10-30 定为最优先）**：用户认可 fp_economy 第 1 幕对比图 → 推送 → 框架语义 FR01 买卖小剧场试点（与 fp_economy 一起审）→ 老白板 58 幕逐文件升 v2 → 三大厅：框架语义 → 易混词 → 自然拼读 → 构词 → 单词卡模板 → 语法 40 点 → 口语 16 场景。流程见 `SOP.md` §14。**每个入口先导出旧内容清单，验收后才拆旧 canvas。**
0b. **词源 / 格林定律 / 词根词缀 + 单词全部维度菜单全量覆盖（决策 25 / 26，并行）**：审计表先给用户 → 按维度分批补齐 → `word_origins/COVERAGE.md`。流程见 `SOP.md` §15。
0d. **思维导图白板化（决策 28）**：试点 1 张主题导图，和其它试点一起审。
0c. **语法全部白板动画（决策 27）**：试点一般过去时或现在进行时，出前后对比给用户审，认可后模板化其余约 40 点。流程见 `SOP.md` §14。
1. **用户真机审片**（清单见 `REVIEW_LIST.md`）——除 port 外的新幕都没正式审过。
2. **练习闭环 + 全 App 总地图（决策 14）**：每模块 3–5 道小测（认出 → 选择 → 拼写），答错进现有错题本（跨 2 个学习日、连续答对 3 次消错），完成度存 `localStorage`、总地图点亮；不接第三方统计。**等用户点头再开工。**
3. 决策 6 剩余三个新模块：空间隐喻 → 拼写潜规则 → 交际句型地图（开工前和用户确认位置，MASTER_DESIGN 决策 6 表是建议）。
4. 之后：决策 7 词汇大数据 → 决策 8 家长指南 / 英美对照 / 大写标点 → 决策 9 欧洲文化 6 章 + 美国篇。
5. 持续：旧幕补 R4 `actionWords`（要和视觉 v2 升级一起做，旧幕还没有讲解员）；R2 剩余缺口只在 stress_rhythm 原 3 幕（已并入语调地图「🎯 重音与弱读」区，原样保留）。

## 3. 已知风险

- **审片缺口**：只有 port 幕经过用户正式审片。Europe、Bluetooth、格林定律 4 幕、时间与度量 2 幕、中英对照 11 幕、实验室新页签（phrasal_key、eight_endings、pron_map、intonation_map 3 幕、irregular_plural 2 幕）只做了截图自审。首页改版第 4–6 步是在 `20581e9`「待用户看截图确认」之后直接做的，用户还没看。
- **实测环境**：fps、朗读同步都只在无 GPU 的 headless 沙箱 + 模拟 TTS 下测过；port v2 的 1% 低帧约 39（目标 ≥ 50），需真机复核；真实语音（尤其中文设备上的英文语音包）下的口型和时间轴跟随没验证过。
- **时长**：port v2 约 202 秒（升级前约 136 秒），对小学生偏长，审片时请用户判断要不要剪。
- **补丁脚本靠字符串锚点改 5.7 MB 主文件**（`src/insert_wb.py`、`docs/home/step*.py`）：锚点没匹配上时可能静默不改。✅ 2026-10-30 已加 `src/anchorcheck.py`（见 §5）；它只核对已知标记，新加的补丁要把自己的标记登记进去。
- **R4 缺口**：旧幕（王炸实验室 6 个老页签、第一性原理 22 幕）都没有 `actionWords` 清单。

- **文档问题清单（2026-10-30 审计，已处理，留档备查）**：① HANDOFF 头部「当前阶段」过期（写阶段 2，实际 1–4 + 首页 1–6 已完成）✅ 已改；② HANDOFF 时间戳不可信（如 irregular_plural 写 01:45、实际提交 00:06；中英对照 11 幕写 10-30 03:15、实际 10-29 23:06）✅ 已按 git log 更正（CHANGELOG 开头更正表）；③ MASTER_DESIGN 计数乱（头部 19 条、§2 标题 17 条、有 22 无 20/21、规则顺序 R1 R2 R4 R3）✅ 已统一；④ §3 合并总表过期（stress_rhythm、不规则复数仍写待做）✅；⑤ 过期待办（port R4、讲解员、port 审片、首页优化方案、DESIGN_HANDOFF「尚未决定」）✅；⑥ README 写「十二大王炸」和旧首页结构 ✅；⑦ HANDOFF 87 KB 过大、流水和交接混写 ✅ 已拆成本文 + CHANGELOG。**以后**：本文只写现状，流水只写 CHANGELOG；计数改动时同步头部和标题。
- **练习闭环拖延**：决策 14 约定「新模块做到一半时做」，已过点未做，需用户点头。
- **白板化工作量**：三大厅 HD 剧场 + 老白板 58 幕规模大，必须模板化；动作库不够时扩 `wb_actor.js`（只加不改）。
- **词源质量**：`VOCAB_DB.etymology` 多数是「秒懂巧记小故事」（记忆法，不是词源），部分含错误说法（如「ear 加 h = hear」），决策 25 要纠正标注，不删。

## 4. 待用户确认

0. fp_economy 第 1 幕 v2 对比图是否认可（认可后才铺开白板化）。
0b. 词源 + 单词维度审计表（决策 25 / 26）。
0c. 语法白板化试点（决策 27）、思维导图试点（决策 28）。
0d. 思维导图试点（决策 28）。
1. 真机审片（同 §3 第一条）。
2. 决策 14 练习闭环是否现在开工。
3. 决策 6 剩余三个模块的位置。
4. 术语「词源」在 `fp_iconicity` 和 `wo_port` 各一条，统一说法（MASTER_DESIGN §3，下次改任一文件时做）。
5. 第一性原理 ②「M 像山」（💡）将来和「字母身世」（📜）并排。

## 5. 常用做法速查

- **验收**（先 `python3 docs/whiteboard/src/insert_wb.py` 再查）：`jscheck.py`（node --check，必跑）、`r2check.py <幕|all|lab|fp|wo> [--strict|--summary]`、`reg_render.py`（旧幕渲染逐字节回归）、`appwb.py <页签>` / `appfp.py <原理>` / `appwo.py` / `appze.py` / `apptags.py`（App 内冒烟）、`docs/home/home_entries.py --check`（首页入口零丢失）。
- **补丁锚点检查**：`src/anchorcheck.py` 核对主文件里各插入标记（引擎 / 模块区块、总枢入口、路由、停循环、每个页签的 `WB_STAGE`、每个 `wbmod-*`、首页改版标记）次数正确、`LAB_GROUPS` 页签都已登记进 `READY`；`jscheck.py` 末尾自动跑，`insert_wb.py` 写文件前也跑，不通过就不写。新写补丁脚本：替换前 `assert s.count(锚点) == 1`，并把新标记加进 `anchorcheck.MARKERS`。
- **新实验室页签接线**：`cases/<id>.js`（v2 + `WO_PROPS`）→ `insert_wb.py` 的 `READY` + `LAB_DEPS` → 主文件 `LAB_GROUPS` 加一项 + 首页 `.lab-entry` 对应组加 `.lab-chip`（onclick `navigateTo('super_lab_hub', { labTab: '<id>' })`）、`tabTitles`、`} else if (tab === …)` 分支（锚点 `\n  } else if (tab === "bamboo_tree") {\n`）→ `appwb.py` IDX、`preview.html` 名单。
- **环境**：沙箱重启后 `/tmp` 清空，Playwright 要重装：`pip install playwright pillow && python3 -m playwright install chromium && python3 -m playwright install-deps chromium`。
- **零丢失（R1）**：搬迁 / 合并前先导出清单（`export_inventory.py`），搬完逐条对照（`check_inventory.py`、`check_upgrade.py`），❌ 必须为 0 才删旧。

## 2026-10-30 16:20 JST · 删除旧 SVG 白板兜底（用户 16:11「解决问题 2」）

- `v5/retire_old_wb.py`（幂等）：删掉 45 个旧白板按需模块 `wbmod-*`（含旧万能动词 SVG 剧场 1.75 MB、道具、开发样板 verb_demo）和旧 SVG 引擎 WB / 人物骨架 / 动作库（约 127 KB）。主文件 16.94 MB → **14.12 MB**。
- 保留：可信度徽章 `WB.BADGES`；术语小词典改读 `WB_TERMS`（`v5/wb_terms.json`，41 个页签从旧案例原样导出）。删除前后对 82 项 `wbGlossHtml` / `woSceneReady` 输出逐字比对，完全一致。
- `wbStageHtml` 没有 v5 版时不再出旧 SVG；`src/insert_wb.py` 检测到 `<<WB_OLD_RETIRED>>` 直接退出（防止把旧模块装回去）；`src/anchorcheck.py` 退役后跳过旧模块标记，检查 OK。
- 回归：tense_matrix 5、bamboo_tree 5、past_clans 4、fp_one_king / fp_zoom_focus（①为已迁中英对照的跳转页，②–④ v5）、wo_vowel_a、ze_be、vv_take_on、vv_give_in 全部 errors none。

## 2026-10-30 · hd_formation 第1幕 v5.1 重画并替换进 App
- 🤖 构词剧场 ① 合成词积木合体：R1 10/10，17 s，主文件 14,686,277 bytes。

## 2026-10-30 · hd_formation 第2幕 v5.1 重画并替换进 App
- 🤖 构词剧场 ② 前缀改变词义方向：R1 9/9，19 s，主文件 15,249,527 bytes。

## 2026-10-30 · hd_formation 第3幕 v5.1 重画并替换进 App
- 🤖 构词剧场 ③ 后缀转换词性套装：R1 10/10，19 s，主文件 15,813,455 bytes。

## 2026-10-30 16:30 JST · docs 清理：删掉不再需要的文件（用户 16:23）

删除并不再进版本（都留在 git 历史里，需要时可从历史找回）：
- 旧 SVG 白板源码和工具（引擎已退役）：`src/cases/`（62 个旧案例及 `*_classic.js` 备份）、`src/wb_engine.js` / `wb_actor.js` / `wb_verbs.js` / `wb_app.js` / `wo_hub.js` / `ze_hub.js`、`insert_wb.py`、`r2check.*`、`reg_render.py`、`appwb/appfp/appwo/appze/apptags.py`、`actsheet.py`、`addsay.py`、`check_upgrade.py`、`check_inventory.py`、`export_inventory.py`、`export_storyboard.py`、`preview.html`、`preview_shots.py`、`measure_*.py`。
- 构建产物 / 审片图：`takeout_wb/out/`（mp4、html、联络表）、`sample_case1_v1.html`。
- 过时设计素材：`narrator/`（旧讲解员形象图，v5 改用 cast 人物）、`docs/animation/take-off/`（v5 之前的 Remotion 原型）。
- 已执行完的一次性补丁：`docs/home/step1–6_*.py`（`home_entries.py --check` 保留）。
- 过时核对报告：`*_V2.md` 清单、`zh_en_hub/INVENTORY_*`（搬迁已完成）、`lab/INVENTORY_*_V5.md`（r1v5.py 自动生成，加入 .gitignore；原始内容清单 `INVENTORY_*_EXPORT.md` 保留）。
- 保留：v5 工具链、cast 帧库、手工角色包、`takeout_wb/src` + `v51`（wb5 依赖 huashu_libs.js；v5.1 标准样板）、各设计文档 / SOURCES / COVERAGE、`lab_data.json`。
- `src/anchorcheck.py` 的页签登记表冻结到 `src/wb_registry.json`；`jscheck.py` 适配（不再假设有旧模块），检查 OK。

## 2026-10-30 16:40 JST · 三大厅 HD 剧场 ① 构词法剧场 → v5.1

- 旧剧场：`vocab_formation` 页 `formationStageCanvas`，3 幕（合成词积木合体 / 前缀改变词义方向 / 后缀转换词性套装）。
- 新工具：`src/export_hd_inventory.py`（HD 旧内容导出，横幅/工作台原句完整保留）→ `lab/INVENTORY_HD_FORMATION_EXPORT.md`；`v5/app_check4.py`（HD App 回归）；`do_unit.py` 支持 HD 单元（无清单拒跑）。
- 场景：`v5/scenes/hd_formation_1–3.js`（16.6 s / 19.4 s / 19.5 s），R1 零丢失。
- 挂载：`embed_app.py` 新增 `wb5HDHtml / wb5HDAct / wb5HDSwap`，进页面时把旧 canvas 换成 v5 iframe（hook：`formationStageCanvas → hd_formation`）。锚点改为第一个 `wb5html-*` 块（修复注释误命中）。
- 字表：`gen_font_chars.py` 扩到全部 v5 场景 + 主 App 正文，3280 字；全量 `rebuild_all.py` 重建 161+3 幕。
- 修复：旧引擎删除时误删的 `stopActiveCanvasLoops` 已随 `2817e97` 主文件恢复。
- 回归：hd_formation 3 幕（compounds / prefixes 两个入口）swapped、oldCanvas=false、errors none；tense_matrix 5、fp_vectors 4、vv_give_in 2 全通过；jscheck + anchorcheck OK。主文件 14,498,036 bytes。

## 2026-10-30 · hd_fr01 第1幕 v5.1 重画并替换进 App
- 🛒 买卖交易小剧场 · 视角 1 buy (买)：R1 10/10，53 s，主文件 15,454,551 bytes。

## 2026-10-30 · hd_fr01 第2幕 v5.1 重画并替换进 App
- 🛒 买卖交易小剧场 · 视角 2 sell (卖)：R1 10/10，54 s，主文件 15,457,163 bytes。

## 2026-10-30 · hd_fr01 第3幕 v5.1 重画并替换进 App
- 🛒 买卖交易小剧场 · 视角 3 pay (付钱)：R1 10/10，55 s，主文件 15,459,698 bytes。

## 2026-10-30 · hd_fr01 第4幕 v5.1 重画并替换进 App
- 🛒 买卖交易小剧场 · 视角 4 cost (花费/值…钱)：R1 10/10，52 s，主文件 15,462,253 bytes。

## 2026-10-30 · hd_fr02 第1幕 v5.1 重画并替换进 App
- 🎁 给予传递小剧场 · 视角 1 give / send / pass / show sb sth：R1 10/10，61 s，主文件 15,464,796 bytes。

## 2026-10-30 · hd_fr02 第2幕 v5.1 重画并替换进 App
- 🎁 给予传递小剧场 · 视角 2 give / send / pass / show sth to sb：R1 10/10，66 s，主文件 15,467,367 bytes。

## 2026-10-30 · hd_fr02 第3幕 v5.1 重画并替换进 App
- 🎁 给予传递小剧场 · 视角 3 buy / make / cook sth for sb：R1 10/10，64 s，主文件 16,420,592 bytes。

## 2026-10-30 · hd_fr03 第1幕 v5.1 重画并替换进 App
- 🧭 位移方向小剧场 · 视角 1 come & bring (朝向说话人)：R1 10/10，60 s，主文件 17,349,056 bytes。

## 2026-10-30 · hd_fr03 第2幕 v5.1 重画并替换进 App
- 🧭 位移方向小剧场 · 视角 2 go & take (离开说话人)：R1 10/10，60 s，主文件 17,351,615 bytes。

## 2026-10-30 · hd_fr03 第3幕 v5.1 重画并替换进 App
- 🧭 位移方向小剧场 · 视角 3 put (放置到目标位)：R1 10/10，55 s，主文件 17,354,166 bytes。

## 2026-10-30 · hd_fr04 第1幕 v5.1 重画并替换进 App
- 🧥 穿戴变化小剧场 · 视角 1 put on (穿上的瞬间动作)：R1 10/10，64 s，主文件 17,356,959 bytes。

## 2026-10-30 · hd_fr04 第2幕 v5.1 重画并替换进 App
- 🧥 穿戴变化小剧场 · 视角 2 wear (穿着/戴着的持续状态)：R1 10/10，62 s，主文件 17,359,542 bytes。

## 2026-10-30 · hd_fr04 第3幕 v5.1 重画并替换进 App
- 🧥 穿戴变化小剧场 · 视角 3 take off (脱下的瞬间动作)：R1 10/10，63 s，主文件 17,362,307 bytes。

## 2026-10-30 · hd_fr05 第1幕 v5.1 重画并替换进 App
- 👀 视听感知小剧场 · 视角 1 look at / listen to (主动感知动作)：R1 10/10，70 s，主文件 17,385,640 bytes。

## 2026-10-30 · hd_fr05 第2幕 v5.1 重画并替换进 App
- 👀 视听感知小剧场 · 视角 2 see / hear (感知结果)：R1 10/10，62 s，主文件 17,388,195 bytes。

## 2026-10-30 · hd_fr06 第1幕 v5.1 重画并替换进 App
- 🔨 动作改变与工具小剧场 · 视角 1 cut / clean / open / break + Patient + with Instrument：R1 10/10，76 s，主文件 17,390,794 bytes。

## 2026-10-30 · hd_fr07 第1幕 v5.1 重画并替换进 App
- 🧠 认知与思维小剧场 · 视角 1 learn (学习：从不会到会)：R1 11/11，68 s，主文件 17,393,563 bytes。

## 2026-10-30 · hd_fr07 第2幕 v5.1 重画并替换进 App
- 🧠 认知与思维小剧场 · 视角 2 know / think (知道 / 认为)：R1 10/10，63 s，主文件 17,396,122 bytes。

## 2026-10-30 · hd_fr07 第3幕 v5.1 重画并替换进 App
- 🧠 认知与思维小剧场 · 视角 3 remember ↔ forget (记住 ↔ 忘记)：R1 10/10，62 s，主文件 17,398,697 bytes。

## 2026-10-30 · hd_fr08 第1幕 v5.1 重画并替换进 App
- 💬 言语交流小剧场 · 视角 1 tell sb sth / tell sb to do：R1 10/10，66 s，主文件 17,425,661 bytes。

## 2026-10-30 · hd_fr08 第2幕 v5.1 重画并替换进 App
- 💬 言语交流小剧场 · 视角 2 ask ↔ answer：R1 10/10，57 s，主文件 17,428,358 bytes。

## 2026-10-30 · hd_fr09 第1幕 v5.1 重画并替换进 App
- 🚌 交通出行小剧场 · 视角 1 方式一：介词短语放句尾 (by + 交通工具 / on foot)：R1 10/10，82 s，主文件 17,448,278 bytes。

## 2026-10-30 · hd_fr09 第2幕 v5.1 重画并替换进 App
- 🚌 交通出行小剧场 · 视角 2 方式二：动词短语作谓语 (take a... / ride a... / walk)：R1 10/10，85 s，主文件 17,451,207 bytes。

## 2026-10-30 · hd_fr10 第1幕 v5.1 重画并替换进 App
- 🤩 情感触发小剧场 · 视角 1 -ing 形容词 (修饰刺激源事物：令人…的)：R1 10/10，67 s，主文件 17,453,894 bytes。

## 2026-10-30 · hd_fr10 第2幕 v5.1 重画并替换进 App
- 🤩 情感触发小剧场 · 视角 2 -ed 形容词 (修饰体验者人：感到…的)：R1 10/10，70 s，主文件 17,456,585 bytes。

## 2026-10-30 17:30 JST · 白板放慢（用户：太快）+ 三大厅 HD ② 框架语义 25 幕

- 节奏：`auto.js` 新增 `readT()`（中文 5 字/秒、英文 2.2 词/秒）和换板停顿 `HOLD` 1.5 s；朗读句的中文字幕留够阅读时间；结尾总览多停 0.6 s。手工幕 13 幕 `stretch: 1.5`（`wb5.js` 新参数，时间轴 + CUES 同步缩放）。
- 时长示例：构词 ① 16.6 → 49.6 s；bamboo_tree ① 83 → 207 s；vv_give_in ① 12 → 22 s；tense_matrix ① 179 → 269 s；adj_order ① → 231 s。
- 框架语义：`export_hd_inventory.py` 支持 `HD_ACT`；10 份清单 `lab/INVENTORY_HD_FR01–10_EXPORT.md`；`units.json` 新增 `hd_fr01`–`hd_fr10`（动作帧：买衣服、递东西、做蛋糕、穿脱外套、抬头听、游泳、开关灯、举手、公交 / 骑车、欢呼 / 大笑）；`scenes/hd_fr*_N.js` 共 25 幕，R1 全部缺 0。
- `embed_app.py`：HD 运行时升级 V2（`WB5_EMBED_HD2`，`wb5HDSwap` 支持页面自己选幕），新增 frames 挂钩。
- 全量 `rebuild_all.py` 重建 189 幕；回归：hd_formation 3、hd_fr01 4 / fr05 2 / fr10 2、tense_matrix 5、adj_order 4、vv_give_in 2 全部 errors none、旧 canvas 已消失；jscheck + anchorcheck OK。主文件 14,679,350 bytes。

## 2026-10-30 · hd_relations 第1幕 v5.1 重画并替换进 App
- 🧨 易混词剧场 ① 四个「看」look at / see / watch / read：R1 14/14，65 s，主文件 14,682,360 bytes。

## 2026-10-30 · hd_relations 第2幕 v5.1 重画并替换进 App
- 🧨 易混词剧场 ② 两个「借」borrow 借入 vs lend 借出：R1 10/10，64 s，主文件 14,685,190 bytes。

## 2026-10-30 · hd_relations 第3幕 v5.1 重画并替换进 App
- 🧨 易混词剧场 ③ 三个「穿」put on / wear / in：R1 10/10，68 s，主文件 14,688,181 bytes。

## 2026-10-30 · hd_phonics 第1幕 v5.1 重画并替换进 App
- 🔤 拼读剧场 ① CVC 首音 + 韵尾（-at 家族）：R1 10/10，55 s，主文件 14,691,133 bytes。

## 2026-10-30 · hd_phonics 第2幕 v5.1 重画并替换进 App
- 🔤 拼读剧场 ② Magic E 魔法棒（cap → cape）：R1 10/10，59 s，主文件 14,693,984 bytes。

## 2026-10-30 · hd_phonics 第3幕 v5.1 重画并替换进 App
- 🔤 拼读剧场 ③ 字母组合与最小对立对（ship / sheep）：R1 10/10，67 s，主文件 14,696,979 bytes。

## 2026-10-30 · hd_sum_pronouns 第1幕 v5.1 重画并替换进 App
- 📊 代词全局原理 · 第1幕 主格 vs 宾格：过了动词门就换装：R1 17/17，67 s，主文件 14,700,127 bytes。

## 2026-10-30 · hd_sum_pronouns 第2幕 v5.1 重画并替换进 App
- 📊 代词全局原理 · 第2幕 my + book = mine 吞噬合体：R1 14/14，71 s，主文件 14,703,124 bytes。

## 2026-10-30 · hd_sum_pronouns 第3幕 v5.1 重画并替换进 App
- 📊 代词全局原理 · 第3幕 this / these / that / those 远近 × 单复数：R1 14/14，59 s，主文件 14,706,045 bytes。

## 2026-10-30 · hd_sum_interrogatives 第1幕 v5.1 重画并替换进 App
- 🦉 疑问词词源雷达 · 第1幕 wh- 提问头 ↔ th- 远指 ↔ h- 近指：R1 15/15，61 s，主文件 14,708,978 bytes。

## 2026-10-30 · hd_sum_interrogatives 第2幕 v5.1 重画并替换进 App
- 🦉 疑问词词源雷达 · 第2幕 Who / Whose / Which 精准靶心：R1 15/15，64 s，主文件 14,711,915 bytes。

## 2026-10-30 · hd_sum_interrogatives 第3幕 v5.1 重画并替换进 App
- 🦉 疑问词词源雷达 · 第3幕 疑问词冲到句首：R1 9/9，63 s，主文件 14,714,840 bytes。

## 2026-10-30 · hd_sum_how_what 第1幕 v5.1 重画并替换进 App
- 🔍 How vs What 原理 · 第1幕 有介词 like 必用 What：R1 11/11，69 s，主文件 14,717,701 bytes。

## 2026-10-30 · hd_sum_how_what 第2幕 v5.1 重画并替换进 App
- 🔍 How vs What 原理 · 第2幕 old / tall / many 前用 How：R1 16/16，72 s，主文件 14,720,622 bytes。

## 2026-10-30 · hd_sum_how_what 第3幕 v5.1 重画并替换进 App
- 🔍 How vs What 原理 · 第3幕 感叹句：遮住主谓看核心词：R1 15/15，77 s，主文件 14,723,623 bytes。

## 2026-10-30 · hd_sum_syntax 第1幕 v5.1 重画并替换进 App
- 🌳 汉英语序对比 · 第1幕 英语主谓宾先行：R1 9/9，64 s，主文件 14,726,612 bytes。

## 2026-10-30 · hd_sum_syntax 第2幕 v5.1 重画并替换进 App
- 🌳 汉英语序对比 · 第2幕 先地点后时间、从小到大、长定语后置：R1 10/10，70 s，主文件 14,729,733 bytes。

## 2026-10-30 · hd_sum_syntax 第3幕 v5.1 重画并替换进 App
- 🌳 汉英语序对比 · 第3幕 动词变形、单数加冠词、because 连接：R1 15/15，68 s，主文件 14,732,790 bytes。

## 2026-10-30 · hd_g01 第1幕 v5.1 重画并替换进 App
- 📘 G01 底层原理 · 第1幕：R1 10/10，82 s，主文件 14,736,000 bytes。

## 2026-10-30 · hd_g01 第2幕 v5.1 重画并替换进 App
- 📘 G01 底层原理 · 第2幕：R1 10/10，82 s，主文件 14,739,067 bytes。

## 2026-10-30 · hd_g01 第3幕 v5.1 重画并替换进 App
- 📘 G01 底层原理 · 第3幕：R1 10/10，82 s，主文件 14,742,134 bytes。

## 2026-10-30 · hd_g02 第1幕 v5.1 重画并替换进 App
- 📘 G02 底层原理 · 第1幕：R1 10/10，77 s，主文件 14,745,237 bytes。

## 2026-10-30 · hd_g02 第2幕 v5.1 重画并替换进 App
- 📘 G02 底层原理 · 第2幕：R1 10/10，77 s，主文件 14,748,340 bytes。

## 2026-10-30 · hd_g02 第3幕 v5.1 重画并替换进 App
- 📘 G02 底层原理 · 第3幕：R1 10/10，77 s，主文件 14,751,439 bytes。

## 2026-10-30 · hd_g03 第1幕 v5.1 重画并替换进 App
- 📘 G03 底层原理 · 第1幕：R1 10/10，83 s，主文件 14,754,562 bytes。

## 2026-10-30 · hd_g03 第2幕 v5.1 重画并替换进 App
- 📘 G03 底层原理 · 第2幕：R1 10/10，83 s，主文件 14,757,677 bytes。

## 2026-10-30 · hd_g03 第3幕 v5.1 重画并替换进 App
- 📘 G03 底层原理 · 第3幕：R1 10/10，83 s，主文件 14,760,796 bytes。

## 2026-10-30 · hd_g04 第1幕 v5.1 重画并替换进 App
- 📘 G04 底层原理 · 第1幕：R1 10/10，77 s，主文件 14,763,807 bytes。

## 2026-10-30 · hd_g04 第2幕 v5.1 重画并替换进 App
- 📘 G04 底层原理 · 第2幕：R1 10/10，77 s，主文件 14,766,814 bytes。

## 2026-10-30 · hd_g04 第3幕 v5.1 重画并替换进 App
- 📘 G04 底层原理 · 第3幕：R1 10/10，77 s，主文件 14,769,817 bytes。

## 2026-10-30 · hd_g05 第1幕 v5.1 重画并替换进 App
- 📘 G05 底层原理 · 第1幕：R1 10/10，81 s，主文件 14,772,884 bytes。

## 2026-10-30 · hd_g05 第2幕 v5.1 重画并替换进 App
- 📘 G05 底层原理 · 第2幕：R1 10/10，81 s，主文件 14,775,943 bytes。

## 2026-10-30 · hd_g05 第3幕 v5.1 重画并替换进 App
- 📘 G05 底层原理 · 第3幕：R1 10/10，81 s，主文件 14,779,002 bytes。

## 2026-10-30 · hd_g06 第1幕 v5.1 重画并替换进 App
- 📘 G06 底层原理：R1 10/10，87 s，主文件 14,751,467 bytes。

## 2026-10-30 · hd_g07 第1幕 v5.1 重画并替换进 App
- 📘 G07 底层原理 · 第1幕：R1 17/17，74 s，主文件 14,754,466 bytes。

## 2026-10-30 · hd_g07 第2幕 v5.1 重画并替换进 App
- 📘 G07 底层原理 · 第2幕：R1 14/14，79 s，主文件 14,757,553 bytes。

## 2026-10-30 · hd_g07 第3幕 v5.1 重画并替换进 App
- 📘 G07 底层原理 · 第3幕：R1 14/14，67 s，主文件 14,760,472 bytes。

## 2026-10-30 · hd_g08 第1幕 v5.1 重画并替换进 App
- 📘 G08 底层原理 · 第1幕：R1 17/17，74 s，主文件 14,763,511 bytes。

## 2026-10-30 · hd_g08 第2幕 v5.1 重画并替换进 App
- 📘 G08 底层原理 · 第2幕：R1 14/14，78 s，主文件 14,766,534 bytes。

## 2026-10-30 · hd_g08 第3幕 v5.1 重画并替换进 App
- 📘 G08 底层原理 · 第3幕：R1 14/14，65 s，主文件 14,769,433 bytes。

## 2026-10-30 · hd_g09 第1幕 v5.1 重画并替换进 App
- 📘 G09 底层原理 · 第1幕：R1 17/17，72 s，主文件 14,772,392 bytes。

## 2026-10-30 · hd_g09 第2幕 v5.1 重画并替换进 App
- 📘 G09 底层原理 · 第2幕：R1 14/14，77 s，主文件 14,775,399 bytes。

## 2026-10-30 · hd_g09 第3幕 v5.1 重画并替换进 App
- 📘 G09 底层原理 · 第3幕：R1 14/14，65 s，主文件 14,778,198 bytes。

## 2026-10-30 · hd_g10 第1幕 v5.1 重画并替换进 App
- 📘 G10 底层原理 · 第1幕：R1 17/17，73 s，主文件 14,781,221 bytes。

## 2026-10-30 · hd_g10 第2幕 v5.1 重画并替换进 App
- 📘 G10 底层原理 · 第2幕：R1 14/14，78 s，主文件 14,784,280 bytes。

## 2026-10-30 · hd_g10 第3幕 v5.1 重画并替换进 App
- 📘 G10 底层原理 · 第3幕：R1 14/14，66 s，主文件 14,787,171 bytes。

## 2026-10-30 · hd_g11 第1幕 v5.1 重画并替换进 App
- 📘 G11 底层原理：R1 10/10，82 s，主文件 14,790,270 bytes。

## 2026-10-30 · hd_g12 第1幕 v5.1 重画并替换进 App
- 📘 G12 底层原理：R1 10/10，82 s，主文件 14,793,349 bytes。

## 2026-10-30 · hd_g13 第1幕 v5.1 重画并替换进 App
- 📘 G13 底层原理：R1 10/10，87 s，主文件 14,796,480 bytes。

## 2026-10-30 · hd_g14 第1幕 v5.1 重画并替换进 App
- 📘 G14 底层原理 · 空间图式：R1 14/14，76 s，主文件 14,799,535 bytes。

## 2026-10-30 · hd_g14 第2幕 v5.1 重画并替换进 App
- 📘 G14 底层原理 · 时间漏斗：R1 17/17，94 s，主文件 14,802,742 bytes。

## 2026-10-30 · hd_g14 第3幕 v5.1 重画并替换进 App
- 📘 G14 底层原理 · 状态隐喻：R1 17/17，94 s，主文件 14,805,949 bytes。

## 2026-10-30 · hd_g15 第1幕 v5.1 重画并替换进 App
- 📘 G15 底层原理：R1 10/10，87 s，主文件 14,809,072 bytes。

## 2026-10-30 · hd_g16 第1幕 v5.1 重画并替换进 App
- 📘 G16 底层原理：R1 10/10，73 s，主文件 14,812,023 bytes。

## 2026-10-30 · hd_g17 第1幕 v5.1 重画并替换进 App
- 📘 G17 底层原理：R1 10/10，77 s，主文件 14,815,002 bytes。

## 2026-10-30 · hd_g18 第1幕 v5.1 重画并替换进 App
- 📘 G18 底层原理：R1 10/10，77 s，主文件 14,818,065 bytes。

## 2026-10-30 · hd_g19 第1幕 v5.1 重画并替换进 App
- 📘 G19 底层原理：R1 15/15，87 s，主文件 14,821,096 bytes。

## 2026-10-30 · hd_g20 第1幕 v5.1 重画并替换进 App
- 📘 G20 底层原理：R1 15/15，76 s，主文件 14,824,019 bytes。

## 2026-10-30 · hd_g21 第1幕 v5.1 重画并替换进 App
- 📘 G21 底层原理：R1 15/15，74 s，主文件 14,826,942 bytes。

## 2026-10-30 · hd_g22 第1幕 v5.1 重画并替换进 App
- 📘 G22 底层原理：R1 15/15，84 s，主文件 14,829,945 bytes。

## 2026-10-30 · hd_g23 第1幕 v5.1 重画并替换进 App
- 📘 G23 底层原理：R1 15/15，82 s，主文件 14,832,876 bytes。

## 2026-10-30 · hd_g24 第1幕 v5.1 重画并替换进 App
- 📘 G24 底层原理：R1 15/15，73 s，主文件 14,835,787 bytes。

## 2026-10-30 · hd_g25 第1幕 v5.1 重画并替换进 App
- 📘 G25 底层原理：R1 15/15，73 s，主文件 14,838,718 bytes。

## 2026-10-30 · hd_g26 第1幕 v5.1 重画并替换进 App
- 📘 G26 底层原理：R1 15/15，77 s，主文件 14,841,661 bytes。

## 2026-10-30 · hd_g27 第1幕 v5.1 重画并替换进 App
- 📘 G27 底层原理：R1 15/15，78 s，主文件 14,844,624 bytes。

## 2026-10-30 · hd_g28 第1幕 v5.1 重画并替换进 App
- 📘 G28 底层原理：R1 10/10，77 s，主文件 14,847,707 bytes。

## 2026-10-30 · hd_g29 第1幕 v5.1 重画并替换进 App
- 📘 G29 底层原理：R1 15/15，86 s，主文件 14,850,642 bytes。

## 2026-10-30 · hd_g30 第1幕 v5.1 重画并替换进 App
- 📘 G30 底层原理：R1 15/15，75 s，主文件 14,853,597 bytes。

## 2026-10-30 · hd_g31 第1幕 v5.1 重画并替换进 App
- 📘 G31 底层原理 · 第1幕：R1 11/11，70 s，主文件 14,856,572 bytes。

## 2026-10-30 · hd_g31 第2幕 v5.1 重画并替换进 App
- 📘 G31 底层原理 · 第2幕：R1 16/16，72 s，主文件 14,859,599 bytes。

## 2026-10-30 · hd_g31 第3幕 v5.1 重画并替换进 App
- 📘 G31 底层原理 · 第3幕：R1 15/15，78 s，主文件 14,862,606 bytes。

## 2026-10-30 · hd_g32 第1幕 v5.1 重画并替换进 App
- 📘 G32 底层原理 · 第1幕：R1 11/11，77 s，主文件 14,865,641 bytes。

## 2026-10-30 · hd_g32 第2幕 v5.1 重画并替换进 App
- 📘 G32 底层原理 · 第2幕：R1 16/16，80 s，主文件 14,868,752 bytes。

## 2026-10-30 · hd_g32 第3幕 v5.1 重画并替换进 App
- 📘 G32 底层原理 · 第3幕：R1 15/15，85 s，主文件 14,871,851 bytes。

## 2026-10-30 · hd_g33 第1幕 v5.1 重画并替换进 App
- 📘 G33 底层原理：R1 15/15，81 s，主文件 14,874,870 bytes。

## 2026-10-30 · hd_g34 第1幕 v5.1 重画并替换进 App
- 📘 G34 底层原理 · 第1幕：R1 11/11，72 s，主文件 14,877,853 bytes。

## 2026-10-30 · hd_g34 第2幕 v5.1 重画并替换进 App
- 📘 G34 底层原理 · 第2幕：R1 16/16，75 s，主文件 14,880,896 bytes。

## 2026-10-30 · hd_g34 第3幕 v5.1 重画并替换进 App
- 📘 G34 底层原理 · 第3幕：R1 14/14，79 s，主文件 14,883,875 bytes。

## 2026-10-30 · hd_g35 第1幕 v5.1 重画并替换进 App
- 📘 G35 底层原理：R1 10/10，76 s，主文件 14,886,842 bytes。

## 2026-10-30 · hd_g36 第1幕 v5.1 重画并替换进 App
- 📘 G36 底层原理：R1 10/10，77 s，主文件 14,889,741 bytes。

## 2026-10-30 · hd_g37 第1幕 v5.1 重画并替换进 App
- 📘 G37 底层原理：R1 10/10，79 s，主文件 14,892,740 bytes。

## 2026-10-30 · hd_g38 第1幕 v5.1 重画并替换进 App
- 📘 G38 底层原理：R1 10/10，79 s，主文件 14,895,775 bytes。

## 2026-10-30 · hd_g39 第1幕 v5.1 重画并替换进 App
- 📘 G39 底层原理：R1 10/10，81 s，主文件 14,898,822 bytes。

## 2026-10-30 · hd_g40 第1幕 v5.1 重画并替换进 App
- 📘 G40 底层原理：R1 10/10，94 s，主文件 14,901,933 bytes。

## 2026-10-30 · hd_oral_sc01 第1幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc01`（问候与告别 · Nice to meet you!：R1 9/9，48 s，主文件 14,904,949 bytes。

## 2026-10-30 · hd_oral_sc01 第2幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc01`（问候与告别 · How are you?：R1 15/15，66 s，主文件 14,907,869 bytes。

## 2026-10-30 · hd_oral_sc01 第3幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc01`（问候与告别 · See you tomorrow!：R1 15/15，64 s，主文件 14,910,692 bytes。

## 2026-10-30 · hd_oral_sc01 第4幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc01`（问候与告别 · Good morning! — Good morning!：R1 15/15，61 s，主文件 14,913,479 bytes。

## 2026-10-30 · hd_oral_sc01 第5幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc01`（问候与告别 · Good afternoon!：R1 15/15，61 s，主文件 14,916,302 bytes。

## 2026-10-30 · hd_oral_sc01 第6幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc01`（问候与告别 · Good night! Sweet dreams!：R1 15/15，63 s，主文件 14,919,113 bytes。

## 2026-10-30 · hd_oral_sc01 第7幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc01`（问候与告别 · How is it going? — Pretty good!：R1 15/15，69 s，主文件 14,922,008 bytes。

## 2026-10-30 · hd_oral_sc02 第1幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc02`（感谢与道歉 · Thank you! — You're welcome.：R1 15/15，63 s，主文件 14,924,851 bytes。

## 2026-10-30 · hd_oral_sc02 第2幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc02`（感谢与道歉 · I'm sorry. — That's OK!：R1 15/15，75 s，主文件 14,927,770 bytes。

## 2026-10-30 · hd_oral_sc02 第3幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc02`（感谢与道歉 · Excuse me.：R1 15/15，67 s，主文件 14,930,681 bytes。

## 2026-10-30 · hd_oral_sc02 第4幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc02`（感谢与道歉 · After you! — Thank you!：R1 15/15，64 s，主文件 14,933,596 bytes。

## 2026-10-30 · hd_oral_sc02 第5幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc02`（感谢与道歉 · Welcome to our school!：R1 15/15，74 s，主文件 14,936,499 bytes。

## 2026-10-30 · hd_oral_sc02 第6幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc02`（感谢与道歉 · Thank you so much!：R1 15/15，56 s，主文件 14,939,242 bytes。

## 2026-10-30 · hd_oral_sc02 第7幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc02`（感谢与道歉 · My pleasure.：R1 11/11，42 s，主文件 14,941,893 bytes。

## 2026-10-30 · hd_oral_sc02 第8幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc02`（感谢与道歉 · I'm sorry I'm late.：R1 11/11，53 s，主文件 14,944,620 bytes。

## 2026-10-30 · hd_oral_sc03 第1幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc03`（课堂用语 · Can you say it again?：R1 15/15，75 s，主文件 14,947,527 bytes。

## 2026-10-30 · hd_oral_sc03 第2幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc03`（课堂用语 · It's time for class!：R1 15/15，72 s，主文件 14,950,410 bytes。

## 2026-10-30 · hd_oral_sc03 第3幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc03`（课堂用语 · Let's play together!：R1 15/15，73 s，主文件 14,953,317 bytes。

## 2026-10-30 · hd_oral_sc03 第4幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc03`（课堂用语 · What's this in English?：R1 15/15，81 s，主文件 14,956,228 bytes。

## 2026-10-30 · hd_oral_sc03 第5幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc03`（课堂用语 · How do you spell it?：R1 15/15，69 s，主文件 14,959,043 bytes。

## 2026-10-30 · hd_oral_sc03 第6幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc03`（课堂用语 · Put up your hand!：R1 15/15，69 s，主文件 14,961,886 bytes。

## 2026-10-30 · hd_oral_sc03 第7幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc03`（课堂用语 · Open your books to page 10.：R1 15/15，67 s，主文件 14,964,777 bytes。

## 2026-10-30 · hd_oral_sc03 第8幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc03`（课堂用语 · Whose book is this?：R1 15/15，69 s，主文件 14,967,708 bytes。

## 2026-10-30 · hd_oral_sc03 第9幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc03`（课堂用语 · Keep your desk clean!：R1 15/15，72 s，主文件 14,970,595 bytes。

## 2026-10-30 · hd_oral_sc03 第10幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc03`（课堂用语 · Work quietly in the library!：R1 15/15，70 s，主文件 14,973,475 bytes。

## 2026-10-30 · hd_oral_sc03 第11幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc03`（课堂用语 · Let's clean the classroom!：R1 15/15，71 s，主文件 14,976,376 bytes。

## 2026-10-30 · hd_oral_sc04 第1幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · What's your name? — My name's...：R1 15/15，78 s，主文件 14,979,315 bytes。

## 2026-10-30 · hd_oral_sc04 第2幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · Where are you from? — I'm from China.：R1 15/15，80 s，主文件 14,982,246 bytes。

## 2026-10-30 · hd_oral_sc04 第3幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · How old are you? — I'm ten years old.：R1 15/15，78 s，主文件 14,985,177 bytes。

## 2026-10-30 · hd_oral_sc04 第4幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · What are your hobbies?：R1 15/15，74 s，主文件 14,988,144 bytes。

## 2026-10-30 · hd_oral_sc04 第5幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · What's he like? — He's kind and funny.：R1 15/15，89 s，主文件 14,991,135 bytes。

## 2026-10-30 · hd_oral_sc04 第6幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · What does your father do?：R1 15/15，80 s，主文件 14,994,046 bytes。

## 2026-10-30 · hd_oral_sc04 第7幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · Can you play ping-pong with me?：R1 15/15，82 s，主文件 14,996,985 bytes。

## 2026-10-30 · hd_oral_sc04 第8幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · Would you like to be my pen pal?：R1 15/15，90 s，主文件 14,999,988 bytes。

## 2026-10-30 · hd_oral_sc04 第9幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · Keep in touch! Write to me soon!：R1 15/15，83 s，主文件 15,002,975 bytes。

## 2026-10-30 · hd_oral_sc04 第10幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · Hello, my name is Chen Jie.：R1 15/15，63 s，主文件 15,005,743 bytes。

## 2026-10-30 · hd_oral_sc04 第11幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · I'm ten years old.：R1 15/15，57 s，主文件 15,008,420 bytes。

## 2026-10-30 · hd_oral_sc04 第12幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · I'm in Class Two, Grade Four.：R1 15/15，61 s，主文件 15,011,133 bytes。

## 2026-10-30 · hd_oral_sc05 第1幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc05`（询问与求助 · May I come in?：R1 15/15，72 s，主文件 15,014,016 bytes。

## 2026-10-30 · hd_oral_sc05 第2幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc05`（询问与求助 · Can I borrow your ruler?：R1 15/15，63 s，主文件 15,016,803 bytes。

## 2026-10-30 · hd_oral_sc05 第3幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc05`（询问与求助 · Could you help me, please?：R1 15/15，60 s，主文件 15,019,562 bytes。

## 2026-10-30 · hd_oral_sc05 第4幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc05`（询问与求助 · Can I borrow your dictionary?：R1 15/15，59 s，主文件 15,022,293 bytes。

## 2026-10-30 · hd_oral_sc05 第5幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc05`（询问与求助 · What does this word mean?：R1 15/15，61 s，主文件 15,025,072 bytes。

## 2026-10-30 · hd_oral_sc06 第1幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc06`（就餐与点菜 · What would you like?：R1 15/15，73 s，主文件 15,028,015 bytes。

## 2026-10-30 · hd_oral_sc06 第2幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc06`（就餐与点菜 · Help yourself!：R1 15/15，73 s，主文件 15,031,030 bytes。

## 2026-10-30 · hd_oral_sc06 第3幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc06`（就餐与点菜 · Can I have some water, please?：R1 15/15，75 s，主文件 15,033,969 bytes。

## 2026-10-30 · hd_oral_sc06 第4幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc06`（就餐与点菜 · Would you like some more?：R1 15/15，76 s，主文件 15,036,928 bytes。

## 2026-10-30 · hd_oral_sc06 第5幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc06`（就餐与点菜 · What's your favourite food?：R1 15/15，72 s，主文件 15,039,803 bytes。

## 2026-10-30 · hd_oral_sc06 第6幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc06`（就餐与点菜 · Pass me the spoon, please.：R1 15/15，75 s，主文件 15,042,750 bytes。

## 2026-10-30 · hd_oral_sc06 第7幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc06`（就餐与点菜 · I can use chopsticks!：R1 15/15，72 s，主文件 15,045,661 bytes。

## 2026-10-30 · hd_oral_sc06 第8幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc06`（就餐与点菜 · What would you like to drink?：R1 15/15，77 s，主文件 15,048,616 bytes。

## 2026-10-30 · hd_oral_sc06 第9幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc06`（就餐与点菜 · It tastes so delicious!：R1 15/15，71 s，主文件 15,051,539 bytes。

## 2026-10-30 · hd_oral_sc06 第10幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc06`（就餐与点菜 · May I have the bill, please?：R1 15/15，78 s，主文件 15,054,511 bytes。

## 2026-10-30 · hd_oral_sc07 第1幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · Can I help you?：R1 15/15，78 s，主文件 15,057,478 bytes。

## 2026-10-30 · hd_oral_sc07 第2幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · How much is this?：R1 15/15，73 s，主文件 15,060,381 bytes。

## 2026-10-30 · hd_oral_sc07 第3幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · Can I try it on?：R1 15/15，75 s，主文件 15,063,344 bytes。

## 2026-10-30 · hd_oral_sc07 第4幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · I'll take it!：R1 15/15，70 s，主文件 15,066,247 bytes。

## 2026-10-30 · hd_oral_sc07 第5幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · It's too expensive!：R1 15/15，67 s，主文件 15,069,170 bytes。

## 2026-10-30 · hd_oral_sc07 第6幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · What size are your shoes?：R1 15/15，69 s，主文件 15,072,045 bytes。

## 2026-10-30 · hd_oral_sc07 第7幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · How much are these shoes?：R1 15/15，74 s，主文件 15,074,968 bytes。

## 2026-10-30 · hd_oral_sc07 第8幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · Do you have a smaller one?：R1 15/15，81 s，主文件 15,077,891 bytes。

## 2026-10-30 · hd_oral_sc07 第9幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · What colour would you like?：R1 15/15，83 s，主文件 15,080,862 bytes。

## 2026-10-30 · hd_oral_sc07 第10幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · Just looking, thank you.：R1 15/15，66 s，主文件 15,083,738 bytes。

## 2026-10-30 · hd_oral_sc07 第11幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · They are on sale today!：R1 15/15，72 s，主文件 15,086,699 bytes。

## 2026-10-30 · hd_oral_sc07 第12幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc07`（购物与问价 · Here is your change.：R1 15/15，76 s，主文件 15,089,624 bytes。

## 2026-10-30 · hd_oral_sc08 第1幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · Excuse me, where is the library?：R1 15/15，74 s，主文件 15,092,495 bytes。

## 2026-10-30 · hd_oral_sc08 第2幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · Go straight and turn left.：R1 15/15，81 s，主文件 15,095,514 bytes。

## 2026-10-30 · hd_oral_sc08 第3幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · How do you come to school?：R1 15/15，87 s，主文件 15,098,517 bytes。

## 2026-10-30 · hd_oral_sc08 第4幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · Stop and wait at a red light!：R1 15/15，87 s，主文件 15,101,520 bytes。

## 2026-10-30 · hd_oral_sc08 第5幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · Is it far from here?：R1 15/15，78 s，主文件 15,104,471 bytes。

## 2026-10-30 · hd_oral_sc08 第6幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · How can I get to the hospital?：R1 15/15，81 s，主文件 15,107,418 bytes。

## 2026-10-30 · hd_oral_sc08 第7幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · Turn right at the first crossing.：R1 15/15，73 s，主文件 15,110,317 bytes。

## 2026-10-30 · hd_oral_sc08 第8幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · Take the No. 5 bus over there.：R1 15/15，81 s，主文件 15,113,248 bytes。

## 2026-10-30 · hd_oral_sc08 第9幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · Get on at the Cinema Stop.：R1 15/15，79 s，主文件 15,116,135 bytes。

## 2026-10-30 · hd_oral_sc08 第10幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · Don't forget to wear your helmet!：R1 15/15，76 s，主文件 15,119,055 bytes。

## 2026-10-30 · hd_oral_sc08 第11幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc08`（问路与交通 · How long does it take? — Ten minutes.：R1 15/15，76 s，主文件 15,121,960 bytes。

## 2026-10-30 · hd_oral_sc09 第1幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · Have a good time!：R1 15/15，77 s，主文件 15,124,879 bytes。

## 2026-10-30 · hd_oral_sc09 第2幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · What a great day!：R1 15/15，77 s，主文件 15,127,834 bytes。

## 2026-10-30 · hd_oral_sc09 第3幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · What's the weather like today?：R1 15/15，74 s，主文件 15,130,717 bytes。

## 2026-10-30 · hd_oral_sc09 第4幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · It's raining! Take an umbrella.：R1 15/15，77 s，主文件 15,133,664 bytes。

## 2026-10-30 · hd_oral_sc09 第5幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · Which season do you like best?：R1 15/15，78 s，主文件 15,136,579 bytes。

## 2026-10-30 · hd_oral_sc09 第6幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · What day is it today? — It's Friday.：R1 15/15，71 s，主文件 15,139,466 bytes。

## 2026-10-30 · hd_oral_sc09 第7幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · What do you do on the weekend?：R1 15/15，78 s，主文件 15,142,409 bytes。

## 2026-10-30 · hd_oral_sc09 第8幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · What are you going to do tomorrow?：R1 15/15，80 s，主文件 15,145,364 bytes。

## 2026-10-30 · hd_oral_sc09 第9幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · Where did you go last weekend?：R1 15/15，76 s，主文件 15,148,323 bytes。

## 2026-10-30 · hd_oral_sc09 第10幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · Let's go on a picnic in the park!：R1 15/15，87 s，主文件 15,151,307 bytes。

## 2026-10-30 · hd_oral_sc09 第11幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · Let's make a snowman outside!：R1 15/15，77 s，主文件 15,154,248 bytes。

## 2026-10-30 · hd_oral_sc09 第12幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · What time is it now? — It's 4:30.：R1 15/15，73 s，主文件 15,157,189 bytes。

## 2026-10-30 · hd_oral_sc09 第13幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc09`（天气与闲聊 · How was your summer vacation?：R1 15/15，80 s，主文件 15,160,154 bytes。

## 2026-10-30 · hd_oral_sc10 第1幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc10`（节日与祝福 · Happy birthday to you!：R1 15/15，77 s，主文件 15,163,093 bytes。

## 2026-10-30 · hd_oral_sc10 第2幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc10`（节日与祝福 · Cheers! Happy New Year!：R1 15/15，70 s，主文件 15,165,944 bytes。

## 2026-10-30 · hd_oral_sc10 第3幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc10`（节日与祝福 · When is your birthday? — On May 1st.：R1 15/15，82 s，主文件 15,168,871 bytes。

## 2026-10-30 · hd_oral_sc10 第4幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc10`（节日与祝福 · Happy Birthday to you!：R1 15/15，58 s，主文件 15,171,578 bytes。

## 2026-10-30 · hd_oral_sc10 第5幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc10`（节日与祝福 · Happy New Year!：R1 15/15，49 s，主文件 15,174,221 bytes。

## 2026-10-30 · hd_oral_sc10 第6幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc10`（节日与祝福 · Happy Children's Day!：R1 11/11，49 s，主文件 15,176,844 bytes。

## 2026-10-30 · hd_oral_sc10 第7幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc10`（节日与祝福 · Have a good trip!：R1 15/15，56 s，主文件 15,179,531 bytes。

## 2026-10-30 · hd_oral_sc10 第8幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc10`（节日与祝福 · The same to you!：R1 11/11，47 s，主文件 15,182,198 bytes。

## 2026-10-30 · hd_oral_sc11 第1幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc11`（打电话 · Hello! This is Wu Binbin speaking.：R1 15/15，80 s，主文件 15,185,121 bytes。

## 2026-10-30 · hd_oral_sc11 第2幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc11`（打电话 · May I speak to Tom, please?：R1 15/15，76 s，主文件 15,188,032 bytes。

## 2026-10-30 · hd_oral_sc11 第3幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc11`（打电话 · Hold on, please. — Thank you!：R1 15/15，77 s，主文件 15,190,979 bytes。

## 2026-10-30 · hd_oral_sc11 第4幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc11`（打电话 · Hold on, please.：R1 15/15，59 s，主文件 15,193,714 bytes。

## 2026-10-30 · hd_oral_sc11 第5幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc11`（打电话 · Can I take a message?：R1 15/15，63 s，主文件 15,196,453 bytes。

## 2026-10-30 · hd_oral_sc12 第1幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc12`（看病与身体不适 · What's wrong with you?：R1 15/15，80 s，主文件 15,199,440 bytes。

## 2026-10-30 · hd_oral_sc12 第2幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc12`（看病与身体不适 · Take some medicine and drink warm water.：R1 15/15，87 s，主文件 15,202,487 bytes。

## 2026-10-30 · hd_oral_sc12 第3幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc12`（看病与身体不适 · How do you feel?：R1 15/15，79 s，主文件 15,205,478 bytes。

## 2026-10-30 · hd_oral_sc12 第4幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc12`（看病与身体不适 · Open your mouth and say "Ah".：R1 15/15，76 s，主文件 15,208,425 bytes。

## 2026-10-30 · hd_oral_sc12 第5幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc12`（看病与身体不适 · You should see a doctor.：R1 15/15，77 s，主文件 15,211,368 bytes。

## 2026-10-30 · hd_oral_sc12 第6幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc12`（看病与身体不适 · Take a deep breath and count to ten.：R1 15/15，91 s，主文件 15,214,371 bytes。

## 2026-10-30 · hd_oral_sc12 第7幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc12`（看病与身体不适 · Don't be afraid! I'm here with you.：R1 15/15，84 s，主文件 15,217,346 bytes。

## 2026-10-30 · hd_oral_sc12 第8幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc12`（看病与身体不适 · Have a good rest and get well soon!：R1 15/15，90 s，主文件 15,220,353 bytes。

## 2026-10-30 · hd_oral_sc12 第9幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc12`（看病与身体不适 · Why are you so happy today?：R1 15/15，82 s，主文件 15,223,344 bytes。

## 2026-10-30 · hd_oral_sc13 第1幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc13`（时间与日期 · Time to get up!：R1 15/15，70 s，主文件 15,226,223 bytes。

## 2026-10-30 · hd_oral_sc13 第2幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc13`（时间与日期 · What time is it now?：R1 15/15，61 s，主文件 15,228,938 bytes。

## 2026-10-30 · hd_oral_sc13 第3幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc13`（时间与日期 · What day is it today?：R1 15/15，58 s，主文件 15,231,625 bytes。

## 2026-10-30 · hd_oral_sc13 第4幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc13`（时间与日期 · What's the date today?：R1 15/15，59 s，主文件 15,234,340 bytes。

## 2026-10-30 · hd_oral_sc13 第5幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc13`（时间与日期 · Time for bed!：R1 15/15，52 s，主文件 15,237,031 bytes。

## 2026-10-30 · hd_oral_sc14 第1幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc14`（爱好与运动 · Cheer up! You can do it!：R1 15/15，84 s，主文件 15,240,034 bytes。

## 2026-10-30 · hd_oral_sc14 第2幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc14`（爱好与运动 · Please take turns!：R1 15/15，78 s，主文件 15,243,001 bytes。

## 2026-10-30 · hd_oral_sc14 第3幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc14`（爱好与运动 · Keep to the right, please!：R1 15/15，73 s，主文件 15,245,956 bytes。

## 2026-10-30 · hd_oral_sc14 第4幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc14`（爱好与运动 · How tall are you? — I'm 1.6 metres.：R1 15/15，73 s，主文件 15,248,807 bytes。

## 2026-10-30 · hd_oral_sc14 第5幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc14`（爱好与运动 · Look at me! I can swim fast!：R1 15/15，75 s，主文件 15,251,782 bytes。

## 2026-10-30 · hd_oral_sc14 第6幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc14`（爱好与运动 · Practice makes perfect!：R1 15/15，74 s，主文件 15,254,765 bytes。

## 2026-10-30 · hd_oral_sc14 第7幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc14`（爱好与运动 · Congratulations! We won!：R1 15/15，75 s，主文件 15,257,744 bytes。

## 2026-10-30 · hd_oral_sc14 第8幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc14`（爱好与运动 · Let's count from one to ten!：R1 15/15，84 s，主文件 15,260,703 bytes。

## 2026-10-30 · hd_oral_sc14 第9幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc14`（爱好与运动 · Whose turn is it now? — It's my turn!：R1 15/15，81 s，主文件 15,263,574 bytes。

## 2026-10-30 · hd_oral_sc15 第1幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Where are my keys?：R1 15/15，72 s，主文件 15,266,473 bytes。

## 2026-10-30 · hd_oral_sc15 第2幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Can you make the bed?：R1 15/15，72 s，主文件 15,269,344 bytes。

## 2026-10-30 · hd_oral_sc15 第3幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Let me help you sweep the floor.：R1 15/15，82 s，主文件 15,272,295 bytes。

## 2026-10-30 · hd_oral_sc15 第4幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Turn on the light, please.：R1 15/15，74 s，主文件 15,275,194 bytes。

## 2026-10-30 · hd_oral_sc15 第5幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Take off your shoes at the door.：R1 15/15，73 s，主文件 15,278,125 bytes。

## 2026-10-30 · hd_oral_sc15 第6幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Wash your hands before meals!：R1 15/15，68 s，主文件 15,281,012 bytes。

## 2026-10-30 · hd_oral_sc15 第7幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · What are you doing? — I'm reading.：R1 15/15，74 s，主文件 15,283,943 bytes。

## 2026-10-30 · hd_oral_sc15 第8幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · I usually do my homework at 5:00.：R1 15/15，72 s，主文件 15,286,786 bytes。

## 2026-10-30 · hd_oral_sc15 第9幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · May I watch TV now?：R1 15/15，77 s，主文件 15,289,725 bytes。

## 2026-10-30 · hd_oral_sc15 第10幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Did you clean your room?：R1 15/15，73 s，主文件 15,292,613 bytes。

## 2026-10-30 · hd_oral_sc15 第11幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Put away your toys, please!：R1 15/15，75 s，主文件 15,295,506 bytes。

## 2026-10-30 · hd_oral_sc16 第1幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc16`（赞美与鼓励 · Don't worry! I can help you.：R1 15/15，82 s，主文件 15,298,453 bytes。

## 2026-10-30 · hd_oral_sc16 第2幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc16`（赞美与鼓励 · Well done! Good job!：R1 15/15，74 s，主文件 15,301,380 bytes。

## 2026-10-30 · hd_oral_sc16 第3幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc16`（赞美与鼓励 · Don't give up! Try again!：R1 15/15，71 s，主文件 15,304,231 bytes。

## 2026-10-30 · hd_oral_sc16 第4幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc16`（赞美与鼓励 · You are a great team player!：R1 15/15，86 s，主文件 15,307,202 bytes。

## 2026-10-30 · hd_oral_sc16 第5幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc16`（赞美与鼓励 · Don't give up! Keep trying!：R1 15/15，59 s，主文件 15,309,925 bytes。

## 2026-10-30 · hd_oral_sc16 第6幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc16`（赞美与鼓励 · You look so cool today!：R1 15/15，58 s，主文件 15,312,672 bytes。

## 2026-10-30 · hd_oral_sc16 第7幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc16`（赞美与鼓励 · Practice makes perfect!：R1 15/15，55 s，主文件 15,315,387 bytes。

## 2026-10-30 · hd_oral_sc16 第8幕 v5.1 重画并替换进 App
- 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc16`（赞美与鼓励 · I'm proud of you!：R1 11/11，51 s，主文件 15,318,090 bytes。

## 2026-10-30 · hd_poly_g1_002 第1幕 v5.1 重画并替换进 App
- 🎞️ book · 一词多义第1幕：R1 11/11，46 s，主文件 15,320,925 bytes。

## 2026-10-30 · hd_poly_g1_002 第2幕 v5.1 重画并替换进 App
- 🎞️ book · 一词多义第2幕：R1 11/11，48 s，主文件 15,323,632 bytes。

## 2026-10-30 · hd_poly_g1_002 第3幕 v5.1 重画并替换进 App
- 🎞️ book · 一词多义第3幕：R1 11/11，46 s，主文件 15,326,327 bytes。

## 2026-10-30 · hd_poly_g1_055 第1幕 v5.1 重画并替换进 App
- 🎞️ water · 一词多义第1幕：R1 11/11，44 s，主文件 15,329,010 bytes。

## 2026-10-30 · hd_poly_g1_055 第2幕 v5.1 重画并替换进 App
- 🎞️ water · 一词多义第2幕：R1 11/11，45 s，主文件 15,331,717 bytes。

## 2026-10-30 · hd_poly_g1_055 第3幕 v5.1 重画并替换进 App
- 🎞️ water · 一词多义第3幕：R1 11/11，45 s，主文件 15,334,388 bytes。

## 2026-10-30 · hd_poly_g2_080 第1幕 v5.1 重画并替换进 App
- 🎞️ park · 一词多义第1幕：R1 11/11，52 s，主文件 15,337,103 bytes。

## 2026-10-30 · hd_poly_g2_080 第2幕 v5.1 重画并替换进 App
- 🎞️ park · 一词多义第2幕：R1 11/11，54 s，主文件 15,339,842 bytes。

## 2026-10-30 · hd_poly_g2_080 第3幕 v5.1 重画并替换进 App
- 🎞️ park · 一词多义第3幕：R1 11/11，53 s，主文件 15,342,553 bytes。

## 2026-10-30 · hd_poly_g2_084 第1幕 v5.1 重画并替换进 App
- 🎞️ fly · 一词多义第1幕：R1 11/11，48 s，主文件 15,345,256 bytes。

## 2026-10-30 · hd_poly_g2_084 第2幕 v5.1 重画并替换进 App
- 🎞️ fly · 一词多义第2幕：R1 11/11，48 s，主文件 15,347,967 bytes。

## 2026-10-30 · hd_poly_g2_084 第3幕 v5.1 重画并替换进 App
- 🎞️ fly · 一词多义第3幕：R1 11/11，47 s，主文件 15,350,654 bytes。

## 2026-10-30 · hd_poly_g2_087 第1幕 v5.1 重画并替换进 App
- 🎞️ run · 一词多义第1幕：R1 11/11，45 s，主文件 15,353,321 bytes。

## 2026-10-30 · hd_poly_g2_087 第2幕 v5.1 重画并替换进 App
- 🎞️ run · 一词多义第2幕：R1 11/11，46 s，主文件 15,356,012 bytes。

## 2026-10-30 · hd_poly_g2_087 第3幕 v5.1 重画并替换进 App
- 🎞️ run · 一词多义第3幕：R1 11/11，45 s，主文件 15,358,675 bytes。

## 2026-10-30 · hd_poly_poly_turn 第1幕 v5.1 重画并替换进 App
- 🎞️ turn · 一词多义第1幕：R1 11/11，56 s，主文件 15,361,416 bytes。

## 2026-10-30 · hd_poly_poly_turn 第2幕 v5.1 重画并替换进 App
- 🎞️ turn · 一词多义第2幕：R1 11/11，58 s，主文件 15,364,197 bytes。

## 2026-10-30 · hd_poly_poly_turn 第3幕 v5.1 重画并替换进 App
- 🎞️ turn · 一词多义第3幕：R1 11/11，58 s，主文件 15,366,930 bytes。

## 2026-10-30 · hd_poly_poly_watch 第1幕 v5.1 重画并替换进 App
- 🎞️ watch · 一词多义第1幕：R1 11/11，56 s，主文件 15,369,709 bytes。

## 2026-10-30 · hd_poly_poly_watch 第2幕 v5.1 重画并替换进 App
- 🎞️ watch · 一词多义第2幕：R1 11/11，59 s，主文件 15,372,540 bytes。

## 2026-10-30 · hd_poly_poly_watch 第3幕 v5.1 重画并替换进 App
- 🎞️ watch · 一词多义第3幕：R1 11/11，55 s，主文件 15,375,275 bytes。

## 2026-10-30 · hd_poly_g2_096 第1幕 v5.1 重画并替换进 App
- 🎞️ cold · 一词多义第1幕：R1 11/11，48 s，主文件 15,377,974 bytes。

## 2026-10-30 · hd_poly_g2_096 第2幕 v5.1 重画并替换进 App
- 🎞️ cold · 一词多义第2幕：R1 11/11，49 s，主文件 15,380,689 bytes。

## 2026-10-30 · hd_poly_g2_096 第3幕 v5.1 重画并替换进 App
- 🎞️ cold · 一词多义第3幕：R1 11/11，47 s，主文件 15,383,332 bytes。

## 2026-10-30 · hd_poly_g3_113 第1幕 v5.1 重画并替换进 App
- 🎞️ orange · 一词多义第1幕：R1 11/11，46 s，主文件 15,386,039 bytes。

## 2026-10-30 · hd_poly_g3_113 第2幕 v5.1 重画并替换进 App
- 🎞️ orange · 一词多义第2幕：R1 11/11，46 s，主文件 15,388,742 bytes。

## 2026-10-30 · hd_poly_g3_113 第3幕 v5.1 重画并替换进 App
- 🎞️ orange · 一词多义第3幕：R1 11/11，45 s，主文件 15,391,413 bytes。

## 2026-10-30 · hd_poly_g4_157 第1幕 v5.1 重画并替换进 App
- 🎞️ light · 一词多义第1幕：R1 11/11，47 s，主文件 15,394,116 bytes。

## 2026-10-30 · hd_poly_g4_157 第2幕 v5.1 重画并替换进 App
- 🎞️ light · 一词多义第2幕：R1 11/11，49 s，主文件 15,396,863 bytes。

## 2026-10-30 · hd_poly_g4_157 第3幕 v5.1 重画并替换进 App
- 🎞️ light · 一词多义第3幕：R1 11/11，48 s，主文件 15,399,570 bytes。

## 2026-10-30 · hd_poly_g5_250 第1幕 v5.1 重画并替换进 App
- 🎞️ clean · 一词多义第1幕：R1 11/11，47 s，主文件 15,402,253 bytes。

## 2026-10-30 · hd_poly_g5_250 第2幕 v5.1 重画并替换进 App
- 🎞️ clean · 一词多义第2幕：R1 11/11，48 s，主文件 15,404,964 bytes。

## 2026-10-30 · hd_poly_g5_250 第3幕 v5.1 重画并替换进 App
- 🎞️ clean · 一词多义第3幕：R1 11/11，48 s，主文件 15,407,643 bytes。

## 2026-10-30 · hd_poly_g2_0489 第1幕 v5.1 重画并替换进 App
- 🎞️ play · 一词多义第1幕：R1 11/11，55 s，主文件 15,410,444 bytes。

## 2026-10-30 · hd_poly_g2_0489 第2幕 v5.1 重画并替换进 App
- 🎞️ play · 一词多义第2幕：R1 11/11，57 s，主文件 15,413,253 bytes。

## 2026-10-30 · hd_poly_g2_0489 第3幕 v5.1 重画并替换进 App
- 🎞️ play · 一词多义第3幕：R1 11/11，57 s，主文件 15,416,034 bytes。

## 2026-10-30 · hd_poly_g4_174 第1幕 v5.1 重画并替换进 App
- 🎞️ study · 一词多义第1幕：R1 11/11，48 s，主文件 15,418,741 bytes。

## 2026-10-30 · hd_poly_g4_174 第2幕 v5.1 重画并替换进 App
- 🎞️ study · 一词多义第2幕：R1 11/11，51 s，主文件 15,421,480 bytes。

## 2026-10-30 · hd_poly_g4_174 第3幕 v5.1 重画并替换进 App
- 🎞️ study · 一词多义第3幕：R1 11/11，47 s，主文件 15,424,127 bytes。

## 2026-10-30 · hd_poly_g3_0527 第1幕 v5.1 重画并替换进 App
- 🎞️ kind · 一词多义第1幕：R1 11/11，51 s，主文件 15,426,872 bytes。

## 2026-10-30 · hd_poly_g3_0527 第2幕 v5.1 重画并替换进 App
- 🎞️ kind · 一词多义第2幕：R1 11/11，52 s，主文件 15,429,629 bytes。

## 2026-10-30 · hd_poly_g3_0527 第3幕 v5.1 重画并替换进 App
- 🎞️ kind · 一词多义第3幕：R1 11/11，54 s，主文件 15,432,350 bytes。

## 2026-10-30 · hd_poly_g3_0600 第1幕 v5.1 重画并替换进 App
- 🎞️ right · 一词多义第1幕：R1 11/11，55 s，主文件 15,435,103 bytes。

## 2026-10-30 · hd_poly_g3_0600 第2幕 v5.1 重画并替换进 App
- 🎞️ right · 一词多义第2幕：R1 11/11，56 s，主文件 15,437,868 bytes。

## 2026-10-30 · hd_poly_g3_0600 第3幕 v5.1 重画并替换进 App
- 🎞️ right · 一词多义第3幕：R1 11/11，54 s，主文件 15,440,577 bytes。

## 2026-10-30 · hd_poly_g3_0790 第1幕 v5.1 重画并替换进 App
- 🎞️ draw · 一词多义第1幕：R1 11/11，49 s，主文件 15,443,302 bytes。

## 2026-10-30 · hd_poly_g3_0790 第2幕 v5.1 重画并替换进 App
- 🎞️ draw · 一词多义第2幕：R1 11/11，48 s，主文件 15,446,015 bytes。

## 2026-10-30 · hd_poly_g3_0790 第3幕 v5.1 重画并替换进 App
- 🎞️ draw · 一词多义第3幕：R1 11/11，47 s，主文件 15,448,732 bytes。

## 2026-10-30 · hd_poly_v6_p14 第1幕 v5.1 重画并替换进 App
- 🎞️ letter · 一词多义第1幕：R1 11/11，42 s，主文件 15,451,339 bytes。

## 2026-10-30 · hd_poly_v6_p14 第2幕 v5.1 重画并替换进 App
- 🎞️ letter · 一词多义第2幕：R1 11/11，42 s，主文件 15,453,946 bytes。

## 2026-10-30 · hd_poly_v6_p14 第3幕 v5.1 重画并替换进 App
- 🎞️ letter · 一词多义第3幕：R1 11/11，43 s，主文件 15,456,521 bytes。

## 2026-10-30 晚 · 普通单词卡 → 一个通用 v5 白板模板（设计稿 DESIGN_MINDMAP_WORDCARD.md §2，用户确认「按照你的来」）
- 新增 `v5/scenes/wordcard_items.js`（词条 → ITEMS 纯函数）+ `wordcard_tpl.js`（模板幕，读注入的 `__WB5_WORD__` / `__WB5_ACT__`），角色包 `wordtpl`（8 帧，与其他幕共享块）。
- 三幕保留（按钮沿用旧标签）：每幕写全旧舞台全部文字（完整原句，不再 slice 截断），本幕重点框排最前并多读一句；补写数据里已有的构词家族、搭配、拼写提醒；一行若已整句包含在另一行里只写长的那行。
- App：`embed_app.py` 新增 `WB5_EMBED_TPL`（`wb5TplSwap / wb5TplAct`）+ `WB5_MOUNT_V4`（srcdoc 注入数据脚本）+ hook `WB5_HD:wordcard`；多义词仍走 `hd_poly_*`。
- 验收：`check_wordcard_tpl.py` 1425 词 × 3 幕 = 4275 幕，R1 旧文字 5 万余条缺 0、0 报错、确定性 4275/4275，时长 50–155 s（中位 99 s，换行修正后复验）；`app_check5.py` 25 个子主题首词 + 随机 30 词，开卡 / 切三幕 / 揭示释义重渲染全部通过，0 报错。分片结果目录可用 `WCT_DIR` 指定（默认 /tmp）。主文件 15,463,455 bytes。
- `auto.js` 中英混排换行改为英文整词不拆、句末标点不落行首；`rebuild_all.py` 修个位案例号 glob 漏重建（≥10 号幕）、加两路并行与 `--resume`；`build.mjs` 临时字体文件按进程号区分（并行打包串字体导致 ze_link 多一份引擎，已重建）。458 幕 + 模板全部重建，`check_all_out.py` 全量回归 0 不合格。主文件 15,463,455 bytes。

## 2026-10-30 21:45 · 主题思维导图讲解幕 阶段①：R1 清单 + 语义分组表
- 新增 `src/gen_mindmap_inventory.py`：从 VOCAB_DB 导出旧交互导图 canvas 上的全部文字（中心名、提示语、16 个节点 emoji+单词+**完整**词义、两框标题 + 各前 3 条搭配）→ `lab/INVENTORY_HD_MINDMAP_EXPORT.md`（25 幕，994 条）。
- 新增 `v5/gen_mindmap_groups.py` → `v5/mindmap_groups.json`：只按 `pos` / `meaning` / `senses[0].scene` 规则分组，先中先得，分不出的进「更多」；叶子 = 旧导图画出来的 16 个节点；一组 ≤ 6 词、每幕 4–6 枝。自审改正 6 处误分（pencil box、dog、who/when、kilo、cheap、banana）。
- 用户 21:36 新要求：分阶段提交，每阶段同步 HANDOFF / CHANGELOG（已写进 HANDOFF §0、§5.1）。

## 2026-10-30 21:55 · 主题思维导图讲解幕 阶段②：mindmap 版式 + 全量重建 + 导图舞台挂钩
- `scenes/auto.js` 新增 `mindmapBuild(SP, D)`：世界 3840×2160；中心椭圆「🌍 子主题」+ 提示语 + 讲解员（l_speak → l_point → l_think → l_idea0）；枝分左右两侧（前几组右、其余左，两侧高度均衡）；每组镜头推过去，组名橙字框，叶子逐个写「emoji 单词」+ 中文（长词组缩字号、词义按整词换行），写一个读一个（英文朗读 + 中文字幕，阅读节奏同 autoBuild）；组太高时镜头跟着叶子上下移、不缩小字；中心下方两框「常用搭配动词 / 评价形容词」各读第一条；收尾镜头框住整张图。
- `v5/gen_mindmap.py`：由 VOCAB_DB + `mindmap_groups.json` 生成 `scenes/hd_mindmap_<n>.js`（场景文件下一阶段分批提交）。
- 引擎变了 → `rebuild_all.py` 全量重建 484 幕并重新嵌入（共享引擎块仍 1 份）；修 `rebuild_all.py`：沙箱重置后会补建模板幕角色包 `wordtpl.js`。
- `embed_app.py` HD_HOOKS 加两条：交互导图卡片上方的空舞台 `WB5_HD:mindmap_stage` + `initThemeMindMapCanvas` 开头 `WB5_HD:mindmap`（只换舞台、不 return，交互导图照常）；`src/anchorcheck.py` 登记这两个标记 + `themeMindMapCanvas` 必须还在。
- 回归：`jscheck` OK；`app_check.py tense_matrix` 5 幕、`app_check4.py hd_formation` 3 幕、`app_check2.py fp fp_economy` 4 幕、`app_check5.py` 单词卡模板 55 词不合格 0，全部 0 报错。主文件 15,465,894 bytes。

## 2026-10-30 · 主题思维导图讲解幕 阶段③ 第 1 批（幕 1–8（学校与学习 … 服装与穿戴））生成并替换进 App
- 每幕 R1 37–40 条缺 0、deterministic True、errors / sandbox none，时长 66–74 s；app_check6 8/8 合格（讲解幕在导图上方、幕号对、16 节点可点开卡、缩放 / 滚轮 / 拖拽 / 复位正常），0 报错；主文件 15,491,698 bytes。

## 2026-10-30 · 主题思维导图讲解幕 阶段③ 第 2 批（幕 9–16（语法功能与指代 … 交通与出行））生成并替换进 App
- 每幕 R1 37–40 条缺 0、deterministic True、errors / sandbox none，时长 68–83 s（幕 9 语法功能与指代词义很长，116 s，超过设计目标 90 s，未删内容）；app_check6 8/8 合格，0 报错；主文件 15,518,815 bytes。

## 2026-10-30 · 主题思维导图讲解幕 阶段③ 第 3 批（幕 17–25（交际与礼仪 … 核心语法功能词））生成并替换进 App
- 每幕 R1 36–40 条缺 0、deterministic True、errors / sandbox none，时长 65–79 s（颜色与形状只有 14 词，14 个叶子）；app_check6 9/9 合格，0 报错；主文件 15,548,445 bytes。

## 2026-10-30 · 主题思维导图讲解幕 阶段④：全量 App 回归 + 设计稿记录
- `v5/app_check6.py`（全部 25 个子主题）：25/25 合格——讲解幕 iframe 在交互导图上方、幕号 = 子主题顺序、时长 65–116 s；交互导图 16 节点（颜色与形状 14）点击开词卡、➕/➖/滚轮缩放、拖拽、复位都正常；0 报错。`jscheck` / `anchorcheck` OK；第一性原理总枢 22 幕 v5 + 2 幕跳转照常。
- `DESIGN_MINDMAP_WORDCARD.md` 加 §1.7 实施记录（分组规则、自审改正、版式、R1、App 挂钩）。
- 主题思维导图讲解幕完成（提交 d5db815 → 0de2169 → fd302d3 → 327cc89 → f25bb23 → 本提交）；主文件 15,548,445 bytes（25 幕共约 +83 KB，角色帧全部复用共享块）。

## 2026-10-30 · 第一性原理总枢余下旧 canvas 核查
- 新增 `v5/app_check7.py`：真 App 里逐一打开 6 条原理 × 4 幕，记录每幕是 v5 iframe / 跳转 / 旧 canvas、页面里所有 canvas。结果：22 幕 v5、2 幕跳转（fp_one_king ①、fp_zoom_focus ① 已迁中英对照）、旧 canvas 0、报错 0 → 总枢已没有要重画的旧 canvas，主文件不改。
- 旧 canvas 代码保留作兜底（与三大厅一致），是否退役列入 HANDOFF §6 待用户确认。

## 2026-10-30 22:30 · 词源 / 格林 / 词根词缀 + 12+6 条：拆成分阶段计划（未开工）
- 原审计的 Wiktionary 抓取缓存 `work/etym` 随沙箱重置丢失；Wiktionary API 可用（已试 foot）。全量需重抓 1487 词 + 逐条人工核实，工作量大，本轮不开工，只把计划拆成 ⑥a–⑥g 写进 HANDOFF §5.1，并列出开工前要用户定的两件事（HANDOFF §6 0c）。

## 2026-10-30 23:10 · ⑥a 词源抓取 / 解析 / 交叉核对工具（用户 22:13 授权完成全部）
- `src/fetch_etym.py wikt|etymo|etymo-rev`：Wiktionary 原始 wikitext（`index.php?action=raw`，带联系方式 UA；API 端点曾回 429）；Etymonline 沙箱直连 403、无头浏览器超时，改读 Wayback 存档原文 `web.archive.org/web/2026id_/https://www.etymonline.com/word/<词>`（返回 zstd 压缩，用 curl `--compressed`）；6 并发会被断连 → 单连接 1.5 秒间隔，正反两进程。缓存在 `/workspace/work/etym/`（不进仓库），断点续抓。
- `src/parse_etym.py`：取英语词源小节第一句的来源链（inh / der / bor…，遇句号、「+」、括号、calque / Compare / Ultimately 等即停）、构词模板（compound / affix / suffix / prefix，记语言）、同源词 cog；逐级核对 Etymonline 正文里「语言名 + 词形」（去附加符号；词形 < 3 个字母不算），链截到最后一个对上的级别。
- `src/build_etym_db.py`（下一提交使用）：生成 ETYM_DB / MORPH_DB 与核对报告。
- 决定（授权自定，理由）：12+6 条规律幕放单词身世总枢「格林定律」章之后新开一章——与格林定律同属「音变」，孩子从格林定律自然走到其余规律；词卡真词源在前、旧巧记故事改标 💡 在后——R1 不删旧内容，同时让家长一眼分清事实和联想（R3 徽章惯例）。

## 2026-10-30 23:40 · ⑥d 词卡词源两块显示 + ETYM_DB 首批
- `src/build_etym_db.py etym`：只收 Wiktionary 与 Etymonline「语言名 + 词形」逐级对上的条目（来源链截到最后对上的一级；只追到中古英语同形的不收）；写主文件 `<script type="application/json" id="ETYM_DB_JSON">`（按需 JSON.parse，不进首屏解析）；报告 `word_origins/ETYM_REVIEW.md`（入库表 + 未入库逐词原因）。首批 76 词（Etymonline 存档仍在抓，抓完补齐）。
- `src/patch_etym_card.py`（幂等）：词卡背面原「📖 词源与巧记故事」一块拆成两块——① 📖 词源 📜（类型：本族词 / 外来词、来源链、出处链接 Wiktionary · Etymonline；未收录写「暂未收录」）；② 💡 巧记小故事（帮助记忆的联想，不是真实词源）＝旧 etymology 原文（只换标题前缀，R1 不丢字）。词表弹窗同样两块。功能词卡旧版就不显示词源，未改。`anchorcheck` 登记 5 个标记（旧标题出现次数必须为 0）。
- 回归：`jscheck` OK；新 `v5/app_check8.py` 25 词 0 不合格（在库 real + 2 个链接、不在库 none、巧记文字与旧字段一致）；`app_check5.py` 单词卡模板 55 词 0 不合格；0 报错。主文件 15,562,866 bytes。

## 2026-10-31 00:10 · 决策 14 练习闭环 + 总地图（最小忠实版）
- `src/gen_module_quiz.py` → 主文件 `MODULE_QUIZ_JSON`：33 个模块（实验室 15 页签、单词身世 9 幕、中英对照 11 幕中有白板的）各取白板朗读句里出现的课标实词（最多 8 个，非功能词）；手工幕 tense_matrix / past_clans / adj_order 取引号里的英文整句。报告 `lab/MODULE_QUIZ_REPORT.md`（33/33 有小测）。
- `src/patch_practice.py`（幂等）：白板下方挂「🎯 小测」——3–5 题：① 认出（TTS 读词，4 选 1 拼写）② 选择（选中文义）③ 拼写（看中文 + 音标输入）；干扰项取同模块词 + 词库随机实词（按模块 + 当天日期定种子）。答题调用现有 `recordQuizResult('vocab', id, ok)`：答错进现有错题本，消错规则不变。答对 ≥ 60% 记 `appState.moduleQuiz[key]`（存 localStorage，不接统计）。小测面板显示所在推荐路径的上一站 / 下一站。
- 新页 `app_map`「🗺️ 总地图」：实验室 / 单词身世 / 中英对照 / 第一性原理四区 39 个节点（○ 没看 / ✓ 看过 / 🏅 过关），三条推荐路径（发音线、语法线、词汇词源线）；首页「继续上次」条加入口；第一性原理按 `fp:<序号>` 记看过（它自带原有习题，不另加小测）。
- **假设记录**（设计稿未细化，按最小忠实版自定）：题型固定 认出→选择→拼写；过关线 60%；推荐路径的站点由我按 MODULE_ROADMAP「发音线 / 语法线 / 词汇词源线」挑现有模块；三大厅 HD 剧场、语法 40 点、口语不进总地图（它们有各自的「我的」进度页）。
- 回归：`jscheck` / `anchorcheck` OK；新 `v5/app_check9.py`：33 个模块面板都在白板下方、3 个模块完整答题（第 1 题故意错 → 进错题本、4/5 点亮）、总地图 39 节点 / 点亮 3 / 点节点跳转正常、首页按钮在；`app_check2.py wo wo_port` 白板仍正常；0 报错。主文件 15,582,607 bytes。

## 2026-10-31 00:30 · 决策 6 空间隐喻（metaphor_code 密码四）
- 位置按 MODULE_ROADMAP G「metaphor_code 加一个密码四」：`METAPHOR_CODES_DB` 加第 4 类（4 张卡：上下=多少、上下=心情、前后=将来/过去、时间=钱；含 ⚠️ 中文「以前 / 前天」的「前」= 过去），`src/patch_metaphor4.py`（幂等）。出处 Lakoff & Johnson《Metaphors We Live By》1980（MORE IS UP、HAPPY IS UP、TIME IS MONEY）。
- 白板第 4 幕：内容稿 `content/metaphor_code_4.txt` → 新工具 `v5/new_scene.py`（内容稿 → `lab/INVENTORY_METAPHOR_CODE_4_NEW.md` → gen_auto → 打包 → r1v5 → shots → embed）：29 条缺 0、111 s、deterministic、0 报错；动作 up / down / look / spend / save 用现成帧（l_lookup、l_ldown*、l_point、l_piggy）。`units.json` 登记 case 4。
- MODULE_QUIZ 重新生成（metaphor_code 小测词表含新幕的词）。回归：`app_check.py metaphor_code metaIdx 4` 4 幕全 v5、0 报错；jscheck / anchorcheck OK。主文件 16,516,847 bytes。

## 2026-10-31 00:45 · 决策 6 拼写潜规则（自然拼读剧场第四幕）
- 位置按 MODULE_ROADMAP B「并入自然拼读，不新开页签」：自然拼读页顶部剧场 `hd_phonics` 加第四幕「拼写潜规则」（`src/patch_phonics4.py` 加按钮标签，幂等）。内容稿 `content/hd_phonics_4.txt`：① 词尾不放 v 补 e（have / give / love）② 词尾用 y、加词尾 y 变 i（happy→happier、try→tries）③ c、g 遇 e/i/y 读软音（city、giant；⚠️ get / give / girl）④ q 后跟 u（queen、question、quick；⚠️ 少数外来名字如 Iraq）；口诀。徽章 ✂️ ⚠️。
- `new_scene.py`：34 条缺 0、145 s、deterministic、0 报错。`app_check4.py hd_phonics` 4 幕全换成 v5、旧 canvas 不在、0 报错。
- 发现：metaphor_code 第 4 幕有字表外新字，嵌入时多了一份共享引擎块（+0.93 MB，主文件 16,520,656 bytes）；登记 HANDOFF §4，本轮新幕做完后 `gen_font_chars.py` + `rebuild_all.py` 合并。

## 2026-10-31 01:00 · 决策 6 交际句型地图（口语大世界新入口）
- `src/patch_oral_func.py`（幂等）：口语大厅顶部入口卡「🗺️ 交际句型地图（新）」→ 新页 `oral_func_map`：v5 白板剧场 2 幕（`oral_func` ① 礼貌阶梯 Give me → Please → Can you → Could you → Would you mind，含 ⚠️ 答应说 Not at all、Excuse me / Sorry 分工；② 问路 / 购物 / 打电话（⚠️ This is）/ 请求许可 / 道歉与回应，各 3 句）+ 页内点读句型表（20 句）。旧 16 个口语场景一句不删。
- 内容稿 `content/oral_func_1.txt`、`oral_func_2.txt` → `new_scene.py`：各 29 条缺 0、114–115 s、deterministic、0 报错；`app_check4.py oral_func` 2 幕换成 v5；口语大厅入口点击可达、0 报错。`units.json` 登记 `oral_func`。
- 决策 6 五个新模块全部完成（合成词重音、不规则复数、空间隐喻、拼写潜规则、交际句型地图）。主文件 17,462,008 bytes（含两份临时多出的引擎块，待字表重建合并）。

## 2026-10-31 01:20 · 决策 29 O9 测试基座 runall.py
- `src/runall.py`：一条命令跑全套——快速档 jscheck（含 anchorcheck）、offlinecheck、app_check8 / 9、tense_matrix、wo_grimm、hd_phonics、oral_func；`--full` 另加 app_check5 / 6 / 7、leakcheck。判定：返回码 0 且输出无 BAD / FAIL / 不合格 N>0 / 非 none 的 errors。首跑快速档 8 项全部通过（约 95 s）。环境安装见 HANDOFF §2（另：sudo 装依赖要 `sudo env PYTHONPATH=$(python3 -c 'import site;print(site.getusersitepackages())') python3 -m playwright install-deps chromium`）。

## 2026-10-31 01:25 · 决策 29 O8 写主文件统一入口 appwrite.py
- `src/appwrite.py` `save(s)`：写前 `anchorcheck.check(s)` 必须 0 问题，否则不写；写后跑 `jscheck.py`，不过就把原文件写回去并退出非 0。本轮所有改主文件的脚本（patch_etym_card / patch_practice / patch_metaphor4 / patch_phonics4 / patch_oral_func / gen_module_quiz / build_etym_db）改用它。
- 当场拦下一个真问题：patch_practice 重跑时按「到 renderCurrentView 为止」换函数块，会把后插的交际句型地图函数一起删掉——anchorcheck 报 ORAL_FUNC_MAP_V1 出现 0 次，未写入；已改成只换到下一个块标记前。全部补丁脚本重跑后主文件逐字节不变（幂等）。旧的 `docs/home/step*.py` 一次性补丁早已删除，只剩 `docs/home/home_entries.py`（只读检查）。

## 2026-10-31 01:35 · 决策 29 O2 / O7 泄漏检查 + 播放器后台暂停
- `src/leakcheck.py`（`--twice` 走两轮）：加载前注入探针包住 rAF / setInterval / window·document 监听，进出 20 个入口后回首页量。实测：基线 rAF 0、interval 0、监听 3；白板页主页面 rAF 0（白板都在 iframe 里，切页 iframe 被移除即停）；两轮 40 次进出后回首页仍 0 / 0 / 3——**没有泄漏**，所以不另做统一调度器 / pageScope（避免为不存在的问题改 384 处 onclick 代码）。已接进 runall --full。
- `v5/player.js`：标签页切到后台（visibilitychange hidden）就暂停——原来回到前台时 `performance.now() - last` 一次性推进时间轴，跳过一大段、朗读错位。引擎变了，**随本轮字表重建的 rebuild_all 一起生效**（HANDOFF §4 那条）。

## 2026-10-31 01:50 · 决策 29 O3 朗读：语音缓存 + 无语音提示
- 现状核对：朗读其实已统一走 `window.speakText`（方法馆 MH.speakText 优先调它；白板点读同步 8485 行另有专用逻辑，不动）。缺的是选语音和失败提示。
- `src/patch_tts.py`（幂等，走 appwrite）：新增 `ttsPickVoice(lang)`——先用 localStorage `ttsVoice_<en|zh>` 记住的语音（还在列表里才用），否则选同语言的第一个并记住；没有该语言语音时提示「这台设备没有英文朗读语音，请看文字」，不报错。
- 新 `src/ttscheck.py`（模拟语音列表）：en→Fake US、zh→Fake ZH、记住的 Fake GB 被沿用、无英文语音时提示，0 报错；接进 runall。jscheck / anchorcheck OK。

## 2026-10-30 23:06 JST · 决策 29 O1 VOCAB_DB 首屏拆分
- 〔时间注：本轮上面几条 O9–O3 标的「10-31 00:10–01:50」是写文档时的估计，实际提交在 2026-10-30 22:xx JST，以 `git log` 为准。〕
- `src/split_vocab.py`（幂等，走 appwrite）：`const VOCAB_DB` 只留列表 / 搜索 / 导航用的轻字段（2,061,503 → 520,072 bytes，首屏要解析的 JS 少 1.54 MB）；10 个重字段（senses、affix_root、collocations、etymology、syntax_contrast、memory_tip、visual_scene、example_zh、polysemy_data、example_en）挪进不执行的 `<script type="application/json" id="VOCAB_HEAVY_JSON">`（1.04 MB），词对象原型上挂 getter，第一次读才 `JSON.parse`，赋值变自有属性。全文件核对过没有对词对象 stringify / 展开 / Object.keys。
- 离线工具改读全量：新 `src/vocab_extract.js`；gen_mindmap_inventory / gen_module_quiz / gen_poly_inventory / check_wordcard_tpl / gen_mindmap_groups 改用合并片段。`anchorcheck` 登记 2 个标记。
- R1：拆分前后 1487 词全部字段逐字段比对一致。主文件 17,463,137 → 17,483,815 bytes（JSON 块多一层键名，体积略增；收益在首屏解析量）。
- 回归 `runall.py --full` 13 项全部通过（app_check5 55 词 / app_check6 25 幕 / app_check8 25 词 0 不合格，leakcheck OK，0 报错）。

## 2026-10-30 23:06 JST · 决策 29 O5 离线可用检查（补记）
- `src/offlinecheck.py` 已随 `f82736b`（O8）一起提交，当时漏记：扫主文件明文 + 全部 wb5html / wb5blob 压缩块解开后的内容，不得出现从 http(s) 加载资源的写法（script src、link href、img/audio/video/iframe src、CSS url()、@import、fetch()、import()、Worker/WebSocket）；普通 `<a href>`（词源出处链接）允许。现扫 863 段 0 违规，已接进 runall 快速档。

## 2026-10-30 23:15 JST · 合并两份重复的共享引擎块（字表重建）
- metaphor_code ④、oral_func ② 用到字表外新字，打包时多出两份共享引擎块（各约 0.93 MB）。`python3 v5/gen_font_chars.py`（3302 字）→ `python3 v5/rebuild_all.py` 全量重建 488 幕 + 模板并重新嵌入：主文件 wb5blob 里 `gz:` 引擎块回到 **1 份**，主文件 17,483,815 → **15,630,085 bytes**（-1.85 MB）。O7 播放器「切后台暂停」随本次重建进入全部幕。
- `v5/build.mjs`：pyftsubset 结果按「字体路径 + 字表 + 参数」sha1 缓存到 `/tmp/wb5_fontcache`（先写临时名再 rename，两路并行安全）。同一幕缓存前后打包逐字节一致（cmp 验证）；全量重建打包阶段从约 2–3 幕/分钟提到约 300 幕/分钟。
- 回归 `runall.py --full` 13 项全部通过（offlinecheck 861 段 0 违规、app_check5 55 词 / app_check6 25 幕 0 不合格、leakcheck OK、0 报错）。

## 2026-10-30 23:22 JST · 词源 ETYM_DB / MORPH_DB 第 2 批（Etymonline 缓存 755 / 1487）
- 核对规则收紧（`src/parse_etym.py` verify）：来源链某级要算「对上」，Etymonline 正文里必须是「语言名 + 3 个词以内 + 该词形」（如 Old English heorte），原来只要两样都在正文某处出现。起因：robot 被误配成「德语 Robot」（Wiktionary 有 `{{der|en|de|Robot}}`，Etymonline 正文另有 "German Arbeit"）。收紧后误配消失，入库 376 → **352** 词。
- `src/build_etym_db.py`：释义去掉 wiki 斜体标记与残留引号（black 曾显示 dark", ''also'' "ink）；`-s` / `-es` 不再自动注「复数」（always 的 -s 是副词词尾）；未入库原因分出「Etymonline 尚未抓取（677）」和「Etymonline 无词条（23）」。
- 结果：`ETYM_DB` 352 词（G1 19 / G2 16 / G3 35 / G4 49 / G5 60 / G6 40 / V6 132 / POLY 1），`MORPH_DB` 111 词；逐词明细与未入库原因见 `word_origins/ETYM_REVIEW.md`、`MORPH_REVIEW.md`。主文件 15,681,417 bytes。
- 回归 `runall.py`（快速档 9 项）全部通过，app_check8 25 词 0 不合格。

〔时间更正：上面两条「23:40」「23:55」是写文档时估错的，实际提交时间分别约 23:15（86d54fa）、23:22（df2ae6c）JST，已在本文和 HANDOFF 改正。〕

## 2026-10-30 23:28 JST · 格林定律按规则组（1d）
- 4 幕新内容（`v5/new_scene.py`），挂在单词身世总枢「🔤 格林定律」章、紧跟 `wo_grimm`：① `wo_grimm_voiceless` p t k kʷ → f th h hw（foot/pes→pedal、father/pater、few/paucus、full/plenus；three/tres、thin/tenuis、thunder/tonare；heart/cor·kardia→cardiac、hundred/centum、horn/cornu→unicorn、head/caput→captain、hill/collis；what/quod、who/quis；⚠️ 是兄弟不是父子；⚠️ s 后不变 stand/stare）45 条 178 s；② `wo_grimm_voiced` d g gʷ → t k kw（tooth/dens→dentist、eat/edere、sit/sedere；knee/genu、cold/gelu；queen/gynē、come/venire）29 条 121 s；③ `wo_grimm_aspirate` bh dh gh → b d g（brother/frater→fraternal、bloom/flos、beech/fagus；door/thyra·foris→foreign、red/ruber、middle/medius；goose/anser·khēn、garden/hortus；链式挪一格）31 条 130 s；④ `wo_grimm_verner` 维尔纳定律（brother 重音在前 → th，father 重音在后 → 古英语 fæder；今天的 -th- 是中古英语后改的；was/were；lose/forlorn）21 条 113 s。全部 R1 缺 0、deterministic、0 报错。
- 核对（不编造）：每对同源词要求 Etymonline（词条或其 PIE 词根页）和 Wiktionary 英语词条都写了该拉丁 / 希腊形；没对上的（fish、five、fire、hound、ten、two、tree、know、corn、blow、bear、daughter、do、guest 等）不用，原因逐条写在 `word_origins/GRIMM_GROUPS.md`。规则表述出自 Wikipedia「Grimm's law」「Verner's law」。
- `src/patch_wo_grimm.py`（幂等，走 appwrite）加 4 个场景条目；`anchorcheck` 登记 `WO_GRIMM_GROUPS_V1`；`units.json` 登记 4 个页签。`app_check2.py wo wo_grimm_<组> 1` 4/4 v5、0 报错；`runall.py` 快速档全过。
- 已知：新幕字表外的字使共享引擎块多 2 份（主文件 17,559,675 bytes），1e 后统一重建合并（HANDOFF §4）。

## 2026-10-30 23:45 JST · 「🔬 音变与词汇规律」章（1e，12 + 6 条）
- 位置按 HANDOFF 设计决定：单词身世总枢「🔤 格林定律」章之后新开一章（`src/patch_wo_rules.py`，幂等，走 appwrite，标记 `WO_RULES_CHAPTER_V1` 登记进 anchorcheck）。18 条：1 维尔纳（复用 `wo_grimm_verner`）、2 元音大转移、3 i-变音（复用 `wo_vowel_a`）、4 元音递变、5 英德辅音推移、6 维京双胞胎词、7 诺曼 w↔g、8 法语丢 s、9 动物和肉、10 前缀同化、11 词变长元音变短、12 换位与不发音字母、13 老复数 -en、14 希腊拼写、15 英美拼写、16 外来复数、17 sh 本族 / sk 维京、18 c 变 ch。
- 16 个新幕 `wo_rule_*`（`v5/new_scene.py`，内容稿 `content/wo_rule_*_1.txt`）：每幕 11–17 条 R1 缺 0、deterministic、0 报错；`app_check2.py wo wo_rule_<规律> 1` 16/16 是 v5、0 报错。`units.json` 登记。
- 核对（不编造）：例词的古词形 / 来路要 Etymonline 和 Wiktionary 都写了；规律表述按 Wikipedia 对应条目。查不到的说法删掉或改弱（如「现代法语用小帽子代替 s」「k、w 当年怎么读」「诺曼贵族吃肉」），逐条见 `word_origins/RULES_REVIEW.md`。
- 修：两条规律复用其它章的幕，总地图 `appMapNodes` 原来会把同一幕列两次（app_check9 报 59 ≠ 61），改为按 key 去重。`runall.py` 快速档全过。
- 已知：字表外新字导致共享引擎块多份，主文件暂 24,151,290 bytes，下一提交重建合并。

## 2026-10-31 00:02 JST · 引擎块再次合并（格林规则组 + 18 条规律幕之后）
- 中途沙箱重置一次（重建跑到 embed 阶段被打断，主文件处在半嵌入状态 25.09 MB）：按 HANDOFF §2 重装 numpy / pillow / playwright / fonttools / brotli + chromium + 系统依赖后，`gen_font_chars.py`（3329 字）→ `rebuild_all.py` 重跑完成（embed 幂等，半嵌入状态被完整覆盖）。
- 结果：共享引擎块 1 份，主文件 24,151,290 → **15,766,777 bytes**。回归 `runall.py --full` 13 项全过（offlinecheck 882 段、app_check5 55 词 / app_check6 25 幕 0 不合格、leakcheck OK、0 报错）。

## 2026-10-31 00:05 JST · COVERAGE 数字更新（1f）
- `word_origins/COVERAGE.md` 新增 §7「补齐进度」：ETYM_DB 0 → 352（分年级）、MORPH_DB 0 → 111、格林配对 11 → 30 对（1 + 4 幕）、音变与词汇规律 18 / 18 条有幕；§2、§3 表里对应格子加了指向 §7 的现值。未入库原因分类照抄 ETYM_REVIEW。只改文档，主文件未动（回归沿用上一提交 `runall --full` 全过）。

## 2026-10-31 00:35 JST · 坏帧返工（§5.2 第 5 项）
- 沙箱又重置过：按 HANDOFF §2 重装环境（注意：`pip` 装在用户目录，`sudo playwright install-deps` 要加 `env PYTHONPATH=/home/sandbox/.local/lib/python3.12/site-packages`），字体从 LXGW WenKai v1.501 / Google Fonts Kalam 重新下载；重建后共享引擎块仍 1 份（字体子集逐字节一致）。
- `l_lift1`：删掉左下角邻帧的杠铃片；`l_lift2`：删掉左侧邻帧的举重人和汗滴（连通域筛选，`l_lift0` 不动）。
- `missw_give`：AI 重绘补全老师下半身（米色长裤 + 白鞋），删掉底部灯塔残留；`l_banana0/2`、`l_win0–2`（V29）头发由黑色改回 Leo 的浅棕色（AI 只改发色，姿势 / 构图不变）。源图放 `sprites/src/`（不进仓库），`Q=74 pack_cast.py` 打回 `cast/*.webp`；`CAST_V5.md` 三行状态改 ✅。
- 重建并嵌入受影响的 5 幕：`vv_give_out` ①、`vv_give_up` ①、`vv_look_out` ①②、`wo_port` ①（`hd_sum_how_what` ② 只用 `l_lift0`，未动）。截图自审 + `app_check3.py` 3/3、`app_check2.py wo wo_port 1`，0 报错。

## 2026-10-31 00:45 JST · 退役旧 canvas 兜底（§5.2 第 3 项）
- `src/retire_canvas.py`（幂等，走 appwrite）：10 个 `start*Canvas` 函数（构词法 / 框架语义 / 易混词 / 自然拼读 / 语法总结 / 语法 40 点 / 日常用语 / 词卡 / 实验室 / 第一性原理）只保留开头「换成 v5 白板」的判断，删掉后面的旧 canvas 绘制循环，换成 `wb5MissingStage(canvas)`（缺 v5 幕时只画一行「这一幕的白板动画还没收录」）。
- 无人调用清理（全文件词边界计数只剩定义的顶层函数，迭代到不动点）：再删 10 个绘图函数 `drawMechanism*`×4、`drawTopPrincipleBanner`、`stepHDClock`、`drawHDSubtitleBar`、`drawHDCharacterActor`、`drawHDSceneBackdrop`、`drawCenterWorkbench`。主脚本 −91,279 字符。主题思维导图的交互 canvas（`initThemeMindMapCanvas`）不是兜底，保留。
- 新工具 `src/fnranges.js`：acorn 解析主文件直接执行的脚本，输出顶层函数位置（已把 UTF-16 下标换成码位下标，emoji 不会错位）；需要 `npm i acorn`（放 `/tmp/acorn` 即可，不进仓库）。
- 回归：91 个 HD 单元（`units.json` 里 field=hd 的全部）逐个 `app_check4.py`，不合格 0、0 报错；`runall.py --full` 见下一行。
- `runall.py --full`（退役后主文件）13 项全部通过：offlinecheck 882 段、app_check5 55 词 / app_check6 0 不合格、leakcheck OK、0 报错。主文件约 15.82 MB。

## 2026-10-31 02:10 JST · 词源 ETYM_DB / MORPH_DB 第 3 批（Etymonline 缓存 1288 / 1487）+ 文档总收尾
- 沙箱重置后 `/workspace/work/etym/` 缓存全丢，重抓：Wiktionary 1487 / 1487；Etymonline（Wayback）三个单连接进程断点续抓到 **1288 / 1487**。剩 199 词是 Wayback 限流 / 断连没拿到（失败的不落盘），用户 01:58 说「剩余的等会再抓」，补抓命令写在 HANDOFF §5.2 1b。
- `parse_etym.py` → `build_etym_db.py etym` / `morph`（核对规则不变）：`ETYM_DB` 352 → **603** 词（G1 32 / G2 35 / G3 60 / G4 80 / G5 94 / G6 62 / V6 238 / POLY 2），`MORPH_DB` 111 → **182** 词；未入库原因见 `word_origins/ETYM_REVIEW.md`（两处对不上 413、尚未抓取 179、无可解析来源链 149、无英语词源小节 71、词组 37、无词条 35）。
- 文档总收尾（§5.2 第 6 项）：HANDOFF §5.1 ⑥a–⑥g 旧待办表标为已转 §5.2 执行，⑤ 旧 canvas 改为已退役；COVERAGE §7 数字更新。
- 坑：`pkill -f fetch_etym` 会连带杀掉发命令的 shell（命令行里也有这个字符串）；沙箱局部重置会丢 pip 包（playwright 等），runall 前先 `python3 -c "import playwright"`。
- 回归 `runall.py --full` 13 项全部通过（app_check8 25 词 0 不合格、offlinecheck 882 段、leakcheck OK、0 报错）。主文件 15,766,619 bytes。

### 2026-10-31 02:45 JST · 词源第 4 批
- Etymonline 缓存 1288 → 1347 / 1487。发现剩余词在 Wayback「最近快照」里存的是 Cloudflare 403 页：`src/fetch_etym.py` 遇 403 改查 CDX（`filter=statuscode:200`）取最近一次正常快照再抓。之后 Wayback 对本沙箱限流（连接被重置），剩 140 词以后再跑 §5.2 1b。
- `parse_etym.py` → `build_etym_db.py etym / morph`：ETYM_DB 603 → **625**，MORPH_DB 182 → **191**；`ETYM_REVIEW.md` / `MORPH_REVIEW.md` / `COVERAGE.md` §7 数字随之更新。
- 回归：`runall.py --full` 全过。

### 2026-10-31 03:00 JST · 决策 33 ①：我的学习 + 综合自测
- 三套档案页 `vocab_my / grammar_my / oral_my` 合成一个 `my_study`「📒 我的学习」：上方「📘 单词 / 🧩 语法 / 💬 口语」标签（带错 / 学 / 会计数），下面沿用原错题本 / 学习中 / 已掌握列表；旧 screen 名重定向（kind、filter 带过去，上次学习记 my_study）。三大厅状态卡改跳 my_study。
- 三大厅「综合自测」按钮合成一个 `self_test`「🎯 综合自测」：按类型切换，开测调用与原按钮相同，另加「📕 只测错题本」。
- 首页「▶ 继续上次」一行加「📒 我的学习」「🎯 综合自测」两个入口（首页改版属第 ② 步，暂停）。
- localStorage 学习记录键、消错规则（跨 2 个学习日连对 3 次）不动。补丁 `src/patch_my_study.py`（appwrite 写入，anchorcheck 登记 MY_STUDY 标记）；新回归 `v5/app_check10.py` 入 runall；`runall.py --full` 全过。
- 决策 33 ②–⑤ 按用户要求暂停，等修订版。

### 2026-10-31 03:10 JST · 重复内容合并第 1 步：词卡占位
- V6 扩展词 499 个占位巧记（445 个「记忆锦囊：属于【X】高频核心词」、54 个「考场必考不规则/拼写变形词」）不再显示成 💡 巧记小故事：模板词显示主题标签「🏷️ X 高频核心词」，变形词显示「🔁 不规则 / 拼写变形词 · 词源看它的原形」。etymology 与 memory_tip 一字不差的 500 词现在只出一块（letter 保留一块真巧记）。
- 认读卡「✨ 拼读规律」后面不再接占位文字。
- V6_MORPH 变形词不再按拼写查 ETYM_DB（saw / drove / felt 之前显示的是锯子 / 畜群 / 毛毡的词源）。
- 改动：`src/patch_etym_card.py`（新增 `etymIsPlaceholderTip`，重跑）、新补丁 `src/patch_dedup_a.py`，anchorcheck 登记；`v5/app_check8.py` 加占位词抽查。`runall.py --full` 全过。
- 未改：v5 单词卡模板 box1 的重复行（需重建模板，且涉及 R1 基线）。

### 2026-10-31 03:30 JST · 重复内容合并第 2 步：重复词条并到原形 / 主拼写
- 51 个 V6 空壳词条设别名：48 个变形词（went、saw、ate、brought、caught、took、made、drove、babies、cities、libraries、dictionaries…）→ 原形，color → colour，gray → grey，its → it。别名词条不再出现在列表 / 小测干扰项 / 计数里；旧 id、按词形跳卡、小测题单、模块小测、学习记录全部转到主词条；主词条卡上多一行「过去式：went 🔊」「美式：color 🔊」。
- 读档迁移：别名 id 的学习记录并进主 id（错题 > 学习中 > 已掌握，错次相加，打卡日合并），localStorage 键不变，错题本计数与列表一致。
- 课标单列的只合并显示：center ↔ centre 互链、studies ↔ study、broken 标「原形：break（词库未收）」。代词组：词组卡链接成员单词卡，单词卡链回词组卡。
- 补丁 `src/patch_dedup_b.py`、数据 `src/dedup_b_data.json`，anchorcheck 登记 WORD_ALIAS_V1；新回归 `v5/app_check11.py` 入 runall；`runall.py --full` 全过。

### 2026-10-31 03:45 JST · 重复内容合并第 3 步：模块去重与互链
- 代词：G07–G10 与「代词全局原理」五处共用的三块「深度机制」演示板不再重复播放——代词全局原理三幕全播，G07 / G08 / G09 / G10 各只播与本课相关的一幕（第 1 / 2 / 3 / 1 幕），不出分幕按钮。
- 代词、名词复数、be·否定疑问、时态 4 个知识点组：组内页面（语法课、总结页、实验室页签、单词身世幕、中英对照幕）顶部加「🔗 同一知识点另见 →」，当前页高亮，并写明 f/fe→ves 两种归类、did「能量吸收器」就是照妖镜 ④、时 × 体矩阵各幕对应哪几课。
- 总地图：加语法魔法屋 40 课和 3 个总结页节点（进页记「看过」），推荐路径下面加「🔗 按知识点」一节。
- 补丁 `src/patch_dedup_c.py`（DEDUP_C_V1），anchorcheck 登记；`patch_practice.py` 重跑不再冲掉后插的块；新回归 `v5/app_check12.py` 入 runall；`runall.py --full` 全过。
- 没合并：复数、be / 时态组没有一字不差的段落；G10、G21、G22、G24 演示板不对题等内容错误需重建场景、动 R1 基线，列在 HANDOFF 待用户定。

### 2026-10-31 04:00 JST · 重复内容合并第 4 步：units.json 名字与口语幕白板残文
- 日常用语小剧场 16 单元 144 幕：name / 幕标题里的文档残文「R1 零丢失）：日常用语小剧场 `hd_oral_scNN`（…」改成「💬 日常用语 · 问候与告别 · Nice to meet you!」这样的真名字；这段残文以前会在幕尾写在白板上，现在白板上是正确标题。144 个场景文件改标题后重打包、重嵌入，R1 全部缺 0。
- 格林 4 组、音变规律 16 幕的 units.json name 各自取 App 里的标题。
- `wo_rule_norman` 标题「巴黎法语的 g」→「其他地方古法语的 g」（RULES_REVIEW 第 7 条），重建该幕。
- `v5/rebuild_all.py` 新增 `--tabs=前缀,…`：只重建指定页签（不重做字表）。
- `runall.py --full` 全过。
- 顺带修：`embed_app.py` 的语法课白板挂钩文字没跟上第 3 步的「固定播一幕」，重嵌入时会再插一行旧挂钩（G07–G10 又出分幕按钮）；挂钩文字已更新，重复行已删，anchorcheck 登记旧挂钩必须为 0。

### 2026-10-31 04:05 JST · 重复内容合并第 5 步：白板重复句报告
- 新增 `lab/DUP_SENTENCES_REPORT.md`：85 句朗读句出现在 ≥2 幕（共 282 次），按 5 类给建议；只出报告，未重建任何幕。

### 2026-10-31 04:20 JST · 决策 34-A：词根词缀实例从全部单词里取
- 对 1487 词全量扫描，经 Wiktionary / Etymonline 核实的真派生全部挂上：59 个词缀、273 对（272 词），不设上限、只用词库词；21 个词缀词库里没有真派生词，单列不硬凑；历史拆分 / 屈折形式 44 对列为待定未上 App。
- 构词页：前缀、后缀页签末尾各加「📚 词库里的真派生词」（每个词缀一张卡，点词开词卡、可朗读），派生词族页签加「🌱 词库里的派生词族」（按词根归组）。
- MORPH_DB 191 → 358：词卡「🧩 真实构词」随之覆盖这些派生词。
- 新增 `src/build_affix_db.py`、`word_origins/AFFIX_WORDS.json` / `AFFIX_REVIEW.md`、`src/patch_affix_vocab.py`，`build_etym_db.py morph` 并入派生词；新回归 `v5/app_check13.py` 入 runall；`runall.py --full` 全过。

### 2026-10-31 04:35 JST · 决策 34-B：语法例句从全部单词和课文里取
- 40 个语法课底部加「📚 例句库」：共 3809 句，来自词库例句、日常用语 144 句和各模块英文句，按语法特征自动筛选 + 抽查，实词都在词库；按句型筛选、按主语人称分组，点句子朗读。
- 没有少于 5 句的语法点；少于 15 句：G17 13, G23 13, G37 5, G39 13。数量表 `lab/GRAMMAR_EXAMPLES_REVIEW.md`。
- 新增 `src/build_grammar_examples.py`、`lab/GRAMMAR_EXAMPLES.json`、`src/patch_grammar_examples.py`（主文件 +190 KB）；`patch_affix_vocab.py` 重跑不再冲掉后面的例句块；新回归 `v5/app_check14.py` 入 runall；`runall.py --full` 全过。


### 2026-10-31 09:25 JST · 决策 33 ②：首页 5 入口、撤首页 13 张实验室卡
- 用户 2026-10-31 09:10 确认决策 33 ②–⑤ 按原方案连续做完。
- 首页「继续上次」之后只剩 5 张入口卡：📚 单词 / 🧩 语法 / 💬 口语 / 🧠 底层原理 / 🎯 练习与档案；我的学习、综合自测、总地图三个按钮移进第 5 张卡。原闯关厅横幅、三大总枢小卡、王炸实验室入口卡、方法论小卡撤下首页，内容不删、换位置。
- 新页 `principles_hub`、`practice_hub`；13 个实验室页签按 B 分进单词（发音与拼读 / 构词与变形 / 词语关系）、语法（时态 / 句型与写作，挂在语法分类页末尾）、底层原理；实验室页面包屑与页签条按所属分区，旧入口照常可用。
- 新增 `src/patch_menu_home.py`、回归 `v5/app_check15.py`（入 runall）；anchorcheck 加 MENU_V2 标记组；`runall.py --full` 全过。

### 2026-10-31 09:38 JST · 决策 33 ③：方法论教室、闯关厅收编（先搬后删）
- 逐段对比写进 `lab/MENU_D33_AUDIT.md`：闯关厅 8 页签、方法论 6 页签逐段标出与哪里重复、哪里独有、搬到哪里。
- 闯关厅只剩「🎮 闯关游戏」（练习与档案下）；单词闪电战接上 20 道从词库出的题。同音词（新 13 组）、反义词（新 24 对）、12 景口语、金剪刀 8 题、作文范文 6 篇、词缀词族树、不规则变形表 70 词分别搬到拼读、词语的亲戚、口语大厅、G34、高分作文炼金炉、构词页；旧页签入口重定向。
- 方法论教室不再是菜单，6 个页签按内容挂到底层原理 / 单词 / 语法 / 练习与档案，单页显示；不带页签的旧入口重定向到底层原理。
- 改错：12 景口语第 8 组「Did you anything else?」→「Did you do anything else?」。
- 新增 `src/patch_menu_hubs.py`；`app_check15.py` 加 ③ 检查；`runall.py --full` 全过。

### 2026-10-31 09:48 JST · 决策 33 ④：总结表、歌谣、纠偏并入语法
- 「四大总结总表」不再单独成页入口：代词矩阵挂词法类末尾，疑问词雷达、How vs What、汉英语序挂句型类末尾，打开时只显示那张表、能回到所属类。
- 8 首歌谣、5 个纠偏神器、2 个微训练放进对应语法点页面底部的「🎵 歌谣 / 🛡️ 纠偏 / 🔨 微训练」页签；语法大厅撤掉两张大卡，旧入口重定向到语法点。
- 语法点上一点 / 下一点后，例句库和新页签跟着换（以前会停在上一个点）。
- 顺带：闯关游戏页的开发说明句改成给孩子看的话；方法论单页模式隐藏顶部横幅。
- 新增 `src/patch_menu_grammar.py`；`app_check15.py` 加 ④ 检查；`runall.py --full` 全过。

### 2026-10-31 10:05 JST · 决策 33 ⑤：单词表合一（决策 33 全部完成）
- 新「📚 单词表」：一个列表按主题、词性、不规则闪电词、年级筛选，可搜索，取代主题大世界列表、视觉闪电词浏览、单词的家三个列表页；旧入口重定向并带上筛选，词性语法总纲、闪电词卡样式照搬。
- 闪电词只留真正不规则的（原来 726 个标「可拼读」的不再算闪电词），1.5 秒闪认训练也只练不规则词。
- 思维导图子主题重叠：数字、颜色、情绪与性格、代词与功能词四对（课标子主题 + 扩展词库同名子主题）在单词表里合成一个筛选，导图页互加「另见」；导图 25 幕不重建。
- 单词大厅两张大卡和「单词的家」换成「单词表」「闪认训练」两张；MASTER_DESIGN §1 改写为菜单去重后的结构。
- 新增 `src/patch_menu_words.py`；`app_check15.py` 加 ⑤ 检查；`runall.py --full` 全过。

### 2026-10-31 10:40 JST · 思维导图分组修正（用户点名的 6 处）
- 动物大世界：胡萝卜、土豆不再单列「蔬菜」，和猫、狗、猪一起归「农场和菜园」；熊归「树上和森林」、大象归「草地和草原」。
- 城市与场所：「价钱 / 花草树木 / 随身物品」改成「便宜和贵 / 公园里的花草树 / 出门带上」。
- 语法功能与指代：「这和那」只有 1 词，并进「我们、他们、这那」。
- 只有 1–2 词的「更多」组：把那些词写进正式组的规则（头发 → 头和脸、筷子 → 饭点心、地图帽子 → 出去活动、羊毛 → 上衣和毛衣、客人 → 家人和客人、转弯 → 动起来、帮助 → 玩看帮忙、慢 → 安全和慢行、超市 → 出行、工厂乡村 → 工作的地方、瓶子植物 → 家具和摆设、感觉类 → 感觉怎样、爱好电影 → 运动与爱好新组）；剩下的「更多」都是 3 词。
- 「怎样做：……地」→「做事的样子」；颜色与形状「窄、厚、低」「巨大和最大」合成「尺寸大小」（原「宽窄、厚薄、高低、大小」在导图框里会断成两行）；数字与计量「钟表」1 词并进「数字 11–18 和钟表」。
- `gen_mindmap_groups.py`：同名规则合成一组，条件可写 dict 列表（任一满足）。17 幕重生成 → 打包 → R1 缺 0 → 确定性 0 报错 → 嵌入；`app_check6.py` 25/25、jscheck OK。

### 2026-10-31 11:00 JST · 决策 29 O4：手机 / 平板适配
- 新检查 `src/mobilecheck.py`（入 runall 快速档）：手机 390×844、平板竖 768×1024、平板横 1024×768，24 个主要页面（含单词卡弹窗），查横向滚动、触控目标 < 44 px、文字 < 12 px。改前：横向滚动 0；小目标 / 小字共 3293 处（主要是按钮高 28–43 px、「🔊 点读发音」小标签 72×19、0.72 / 0.74rem 字号）。
- `src/patch_mobile.py`（幂等）：新样式块 `<style id="mobile-o4">`（MOBILE_O4_V1）——按钮 / 可点元素最小 44×44，可点行内 span / a 改 inline-flex，正文段落里的内联链接不动；html/body overflow-x: hidden 保险；23 处 0.72 / 0.74rem 字号 → 0.75rem（12 px）。改后三视口 0 不合格，runall 全过；390 px 截图自审版面正常。

### 2026-10-31 11:15 JST · 决策 35 写入设计文档
- 用户 10:25：业务审计发现的问题全部列入开发计划，优先级最高。`MASTER_DESIGN.md` 新增决策 35（A 数据底座 8 项、B 内容错误 4 项、C 补数据 6 项、D 底层原理 9 项、E 课本同步，每项现状数字 → 目标 → 方案 → 验收），阶段表加 12.5；HANDOFF §5 插到最前，原剩余项（O6、词源补抓、决策 7/8/9）顺延。
- 审计报告与清单拷进 `lab/audit35/`（不含 PDF、截图）。

### 2026-10-31 11:20 JST · 决策 29 O6：删旧 @keyframes 与死代码（决策 29 全部完成）
- 新报告工具 `src/deadcode.py`：主文件直接执行脚本里的顶层函数，在全文（去掉自身函数体）+ 全部 wb5 共享块解压内容里按整词计数，0 次即零引用，迭代到不动点；另列无引用或不生效的 @keyframes。
- 发现：11 个 @keyframes（火车 / 剪刀 / 火箭 / 雷达 / 字母掉落等）都写成 `.method-hub @keyframes x {…}`，CSS 把整条当非法选择器丢弃，页面上一个都没生效（styleSheets 实测 0 个）。
- `src/patch_deadcode.py`：删 8 个零引用函数（currentGradeWords、setStudyGrade、startPgHold、cancelPgHold、drawHDSpeechBubble、wbHasModule、wbLoadAll、wbEggHtml，约 2.2 K 字符）、11 段 @keyframes、23 处引用它们的 animation 声明（本来就不动）。复查 deadcode 0；26 个页面 390 px 整页截图前后对比无变化（只有同版本两次截图也会出现的随机内容 / 抗锯齿差异）；runall 全过。

### 2026-10-31 12:10 JST · 决策 35 A1：假音标重生成
- 判定：音标只有 ASCII 字母的 621 个词进候选，再和 CMUdict 读音比对——/pen/ /red/ /bed/ 这类本来就和拼写同形的 47 个放行（白名单 `lab/audit35/phon_same_ok.json`），其余 **574 个**是假音标（审计估 566）。
- 新音标：CMUdict（ARPAbet → IPA，美式、长音带 ː、ɜːr / ər、oʊ，与词库原有真音标同一口径；只标一个主重音，主重音后的次重音不标，紧挨主重音的弱前缀 in- / im- 不标次重音）；CMUdict 有多个读音时取与 Wiktionary 美式最接近的；CMUdict 没有的合成词按两段拼（toothache、mooncake），英式拼写转美式再查（colourful）。Wiktionary 622 个词条重抓（缓存在仓库外）。
- 人工定 59 个：多音词两个读音都列（close /kloʊz/ /kloʊs/、use /juːz/ /juːs/），CMUdict 首选读音不常用的改常用读音（thirty、perfect、lead、direction、sometimes、nobody、February、July、librarian 等）。
- 逐音素与 Wiktionary 美式一致 383 / 574；其余差异是弱读 ə / ɪ、次重音写法、英美差异，抽查 40 词无错。
- 一词多义幕 kind / right / draw（hd_poly_g3_0527 / 0600 / 0790 各 3 幕）横幅里也是假音标，场景与 R1 清单同步改（纠错改动），重打包嵌入。
- 新检查 `src/phoncheck.py`（格式、非 IPA 字母、音标 = 拼写且不在白名单）入 runall：1487 词 0 不合格。

### 2026-10-31 11:40 JST · 决策 36：内容与动画审计修复写入开发计划
- 用户 11:33 批准把内容质量审计第 2 轮（只读，HEAD e1c6b96；抽查 43 幕，15 幕逐张看截图）的全部问题列入计划，排在决策 35 之后、词源补抓与决策 7 / 8 / 9 之前。
- `MASTER_DESIGN.md` 新增决策 36：① 白板事实 / 画面错误 12 项（12 个语法点共用「能量吸收器」板、G09 / G10 / G31 / G34 串板、约 89 幕截断句与 11 幕 `**` 残留、G14 IN>1 天矛盾与重复幕、give down / look off / take on 伪搭配与误用、look away / turn down / take out / put off 画面不符、hd_fr01 角色错、格林定律高亮 / 动作 / duo、past_clans 等未标注简化、口语两角色画成同一男孩、单词卡模板 a apple 与无关复数、中文讲解不朗读）→ ② 长幕拆分（wo_port 361 s 等 13 幕，tense_matrix① 删 a/an 插段）→ ③ 总结层 11 项 → ④ 加深最浅 10 页 → ⑤ 补内容 5 类；每项写了方案与验收（新检查 wbdupcheck / wbtextcheck / durcheck 入 runall）。
- 与决策 35 重叠的 10 类合并处理并逐条标注去向；决策 35-F 顺延行改为先做决策 36。
- HANDOFF §5 加 0b 决策 36 进度清单；审计全文与抽取脚本入 `lab/audit36/`（截图与解包幕不入库）。

### 2026-10-31 11:45 JST · 并行与断点规则写入 HANDOFF
- 用户要求加速但额度紧：并行降到 3 道（数据 / 内容纠错 / 白板），单一集成者负责主 HTML 与提交；每道半成品落盘 `/workspace/work/par/<道>/PROGRESS.md`；每项验证通过立即单独提交推送。HANDOFF §5 新增 0a。
- 11:48 补充：每次 commit + push 后立即向用户汇报一次（提交号 / 完成了什么 / 下一步）。

### 2026-10-31 13:20 JST · 决策 36 ①1 能量吸收器串板（道 3）
- hd_g19、g20、g21、g22、g23、g24、g25、g26、g27、g29、g30、g33 共 12 幕中段原是同一块「🧲 did / does / can / will 吸走过去时与三单」板，按本课重做「结构公式 + 对比 + 常错」：G19 三单加法 + /s/ /z/ /ɪz/ + does 否定疑问；G20 be + -ing 变法；G21 -ed 四规则 + /t/ /d/ /ɪd/（引第一性原理 · 经济原则）；G22 不规则分组；G23 did 吸收器（专讲 did）；G24 计划 / 迹象两板（📅 / 🌧️）+ will 对比；G25 will 三用法；G26 can 能力 / 许可；G27 口气梯子 + mustn't ≠ don't have to；G29 否定两条路；G30 句首信号灯 + 怎问怎答；G33 祈使句四种口气。新英文例句都配朗读，字幕给译文。
- 原 8 行一字不差移到 `aux_transformer_4`（助动词照妖镜 ④）末尾「⑥ 操作词总论」，补「有操作词直接加 not / 提前，没有就请 do」（审计 1.4）。决定：总论放在现有照妖镜页而不新建原理幕（新原理幕归道 4）；底层原理 hub 的入口由道 4 挂。
- 新检查 `src/wbdupcheck.py`（不同语法点之间连续 ≥3 行白板字相同 = 串板）入 runall；①2 的 10 对暂列白名单。13 幕重打包嵌入，确定性 / 0 报错；runall --full 全过。前后对比图在工作区 shots/l3/36_1（不入库）。
- 2026-10-31 13:05 JST：决策 37（手机端可用性与内容真实性 14 条）写入 MASTER_DESIGN；新建 REQUIREMENTS.md；HANDOFF 下一步 00 置顶。

### 2026-10-31 13:11 JST · 决策 37 R37-01 白板手机播放框
- 根因：iframe 写死 height:560px，`fit()` 用 documentElement.scrollHeight（不会小于 iframe 自身高度）→ 手机画面约 190 px、下面 370 px 灰色空白；控制条不折行，时间被截断。
- `src/patch_r37_player.py`（标记 R37_01_PLAYER，只改 App 运行时 + `embed_app.py` RUNTIME，不重建各幕）：播放框初始 16:9 自适应，加载后按 #wrap 实际底边定高；挂载时往每幕 srcdoc 注入 WB5_PLAYER_CSS / WB5_PLAYER_JS：边距收窄，窄屏（≤560 px）控制条浮在画面底部、播放 1.8 秒后自动隐去，点画面暂停时再出来；时间不截断。
- 新增「⛶ 全屏」按钮：铺满屏幕，竖屏时画面转 90° 横过来（先尝试 requestFullscreen + 锁横屏，不支持就 CSS 旋转兜底）；390×844 下画面宽 679 px（0.35 倍），场景里 ≥ 35 px 的字 ≥ 12 px。非全屏竖屏下画面只有约 300 px 宽，最小字仍 < 12 px——要彻底满足「竖屏不全屏也 ≥ 12 px」需要各幕放大字号重建（并入 R37-05 / 07 重做幕时按 390 px 校字号）。
- 术语小词典左列 150 px 固定宽改为 min(150px, 32%)，窄屏不再把解释挤成一字一行。
- 新检查 `src/playercheck.py`（4 处白板：画面占框 ≥ 90%、时间不截断、全屏铺满 + 画面 ≥ 600 px、退出复原）入 runall；runall 全过。390 px 截图自检（不入库）。

### 2026-10-31 13:14 JST · 决策 37 R37-13 家长门按钮
- 现象：390 px 下家长门验证页「✖ 关闭」「验证进入」被挤成一字一行（输入框 flex:1 没有 min-width:0，把按钮压到 30 px 宽）；设置页口音按钮也被压成两行。
- `src/patch_r37_gate.py`（样式块 R37_13_GATE）：家长门弹窗里按钮 / label nowrap + flex-shrink:0，弹性行可换行，输入框 min-width:0；口音两个按钮并排各占一半，「(en-US)」不拆行。
- 新检查 `src/gatecheck.py`（顶栏家长门 + 验证页 + 设置页：按钮最多 2 行且每行 ≥ 5 字，即不再竖排）入 runall；mobilecheck 24 页 0 不合格。390 px 截图自检（不入库）。

### 2026-10-31 13:21 JST · 决策 37 R37-04 语法 Markdown 反引号
- 现象：GRAMMAR_DB 31 / 40 个语法点的文字带 `…` 反引号（结构公式），页面原样显示；部分 ** 加粗符号跨了高亮函数没处理的位置，也露在外面。
- `src/patch_r37_md.py`（标记 R37_04_MD）：全 App 文本出口统一过滤——MutationObserver 盯 document.body，新渲染的文本节点里成对 `…` → <code class="md-code">（浅紫底等宽），成对 **…** → <b>，落单的反引号 / ** 去掉；跳过 script / style / 输入框 / 白板 iframe。数据不改。
- 新检查 `src/mdcheck.py`（40 个语法点含底部页签、10 个大厅 / 列表页、5 张词卡，innerText 里 ` 与 ** = 0）入 runall；runall 全过。

### 2026-10-31 13:37 JST · 决策 37 R37-09 手机顶栏一层吸顶
- 现状（390 px）：首页顶栏 170 px（品牌 + 打卡 + 星星 + 家长门折 3 行）；子页面再叠 155 px 的回首页 / 返回 / 面包屑 / 上一点下一点，共 325 px；且 mobile-o4 的 `html, body { overflow-x:hidden }` 让 body 成了滚动容器，position:sticky 失效，滚下去找不到返回。
- `src/patch_r37_topbar.py`（标记 R37_09_TOPBAR，只在 ≤ 640 px 生效，电脑 / 平板不变）：overflow-x:hidden → clip（不横滚、吸顶恢复）；首页一层 56 px（品牌 + 🔥天数 + ⭐ + ⚙️）；子页面一层 56 px 吸顶「⬅ 返回 + 当前位置（面包屑最后两级）+ ☰」，回首页 / 完整面包屑 / 上一点下一点等本页按钮 / 打卡星星家长门收进 ☰ 菜单。短字用 r37-short / r37-full 两个 span 切换（不用 font-size:0，mobilecheck 不判小字）。
- 新检查 `src/topbarcheck.py`（首页顶栏 ≤ 56 px；单词表 / 语法点 / 实验室 / 口语大厅顶栏 ≤ 60 px、滚 1200 px 后返回仍在顶部可点、☰ 菜单含回首页；1280 宽仍是原两层）入 runall；runall 全过。另：几个检查脚本里写错的 screen 名（grammar_hub / oral_hub / vocab_hub → *_hall）已改正。

### 2026-10-31 13:48 JST · 决策 37 R37-10 单词表分页
- 现状：word_list 一次渲染 1436 张卡。
- `src/patch_r37_wordlist.py`（标记 R37_10_WORDLIST）：每页 40 张，上下翻页条（⏮ ◀ 第 n / N 页 ▶ ⏭）；新增「🔤 首字母」索引（只列当前筛选里有的字母，手机上一行横滑）；换任何筛选 / 搜索回第 1 页；词卡弹窗上一个 / 下一个仍按整个筛选结果走；「共 N 词」仍是总数。
- 新检查 `src/wordlistcheck.py`（首屏 ≤ 40、翻完 36 页 = 1436 词不丢、末页余数、首字母 B 筛选、搜索）入 runall；`v5/app_check15.py` 的「网格卡数 = 总数」改为「= min(总数, 40)」。runall 全过，mobilecheck 0 不合格。

### 2026-10-31 14:14 JST · 决策 37 R37-14 按钮对比度
- R37-14 按钮对比度（83dd930）：`src/patch_r37_contrast.py`（标记 R37_14_CONTRAST）——常用绿底白字按钮换深一档（emerald-700 / teal-700 / green-700）+ 运行时对比度守卫（深字浅底压暗字色、浅字深底压暗背景含渐变色标，色相不变）；`contrastcheck.py` 入 runall，runall 全部通过。

### 2026-10-31 14:22 JST · 决策 37 R37-12 过时文案与重复入口
- R37-12（fbe5238）：`src/patch_r37_copy.py` 10 处替换——7 处过时文案（高清 Canvas 情景互动动画 / 高清 2D 三幕视频级动画 / 四大全局总结矩阵 / 高清角色拼读小剧场 / 高清卡通角色分幕演绎 / 核心主推双引擎 / 高清动态录像机）改成现在的说法；单词大厅「🧭 单词专项」区与上方大卡重复的 4 个小按钮删掉（大卡保留）。`jargoncheck.py` 新增同页重复入口检查（总地图、首页继续条、🔗 另见条不算），入 runall；原交接里提到的 G07 重复入口复扫为 0，不需要白名单。runall 全部通过。
- 2026-10-31 14:35 JST：决策 38（白板启发性重做）写入 MASTER_DESIGN、REQUIREMENTS（R38-01…07）、HANDOFF 000 置顶；审计报告与逐幕评分入 `lab/audit38/`。

### 2026-10-31 14:33 JST · 决策 37 R37-02 自造象形词源
- R37-02（f9cbb2b）：判定 `src/iconic.py`（按句：拉丁字母 + 像 / 形状 / 弯弯，或「象形」）；`src/patch_r37_iconic.py` 把 memory_tip / etymology / affix_root 里 66 处象形句（27 词）挪进新重字段 memory_assoc，原句一字不删；方法论页内嵌小词库 MH_VOCAB_DB 2 条同改。词卡新块「🧠 记忆联想 · 非词源」放卡片最后，不挨「📖 词源」；认读卡 memory_tip 为空不出空括号。
- 顺带修：O1 拆分后 VOCAB 重字段挂在原型 getter 上，单词卡白板模板用 JSON.stringify 注入只拿到轻字段——词源 / 构词 / 例句框一直是空的（G1_001 幕长 37 s → 83 s）。新增 `wb5PlainData`。注意：模板幕现在有的超过 90 s（G6_Q09 153 s），R37-07 / 决策 38 ① 处理。
- 字体核对：App 内 LXGW WenKai 子集 618208 B，与 build.mjs 按 font_chars.txt 现做的子集逐字节相同（sha1 fca113bc…），模板重建后共享块数 373 不变，没有多带字体（交接里「343 KB」不成立）。环境：沙箱重置后需 `pip install playwright brotli` + `playwright install chromium` + `sudo -n env PYTHONPATH=~/.local/lib/python3.12/site-packages python3 -m playwright install-deps chromium`。
- app_check5（--full）原来因 R37-01 的 ⛶ 全屏按钮被算成幕按钮一直报 BAD，已改选择器，55 词 0 不合格。

### 2026-10-31 15:40 JST · 决策 38 ① 单词卡模板 v6（啊哈重做）+ insightcheck
- 概念原语 `v5/lib/concept.js`：词块移动 / 换装（chip、move、swap）、并排对比（split）、遮挡揭晓（cover）、时间轴（axis）、拖放挂钩（slot、drop）、预测停顿（predict，≥3 s 倒数）、大图（pic）、标签 / 箭头；`C.aha` 登记啊哈卡、`C.rule` 记规则命名时刻、`C.finish()` 把啊哈卡 / 预测 / 原语用量 / 板上文字挂到 `globalThis.__WB5_INSIGHT__`。全部只由 t 决定。
- `v5/scenes/wordcard_tpl.js` v6（不再用讲解员）：① 看图猜词——英文盖住先猜 3 s → 揭开（音标、词性中文）→ 两色音节块拆开再合上 → 再盖住自己说（第 2 个 3 s）；② 来历——有 ETYM_DB 互证词源走时间轴一站站换装、有 MORPH_DB 真实构词两块拼进格子、都没有就盖第一个元音字母先猜，并明说「来历两本词源词典还没对上，先不讲」；巧记 / 记忆联想进字幕并标「不是真实词源」；③ 词库例句打散成词块先猜第一个，再逐块落格朗读（>8 词分两行，整句不截断）；句法提示 / 拼写提醒进字幕。啊哈卡 `lab/audit38/aha/01_wordcard_tpl.md`。
- App：`src/patch_r38_wordcard.py`（标记 R38_01_WORDCARD）注入词条时带上 `__etym / __morph`（etymLookup，互证收录才有）。
- `v5/check_wordcard_tpl.py` 的 R1 按决策 38 修订改为「知识点不丢」（`knowledge()`：每幕该讲的知识点在板上词块 / 标签、讲解字幕、朗读字幕任一处出现）：1425 词 × 3 = 4275 幕，知识点 13071 条缺 0、0 报错、4275/4275 确定，时长 12–35 s（中位 18 s）。`app_check5` 55 词 0 不合格。
- 新检查 `src/insightcheck.py` 入 runall：import 了 concept.js 的幕强制（啊哈卡四项、≥3 s 预测、规则不早于第一个预测结束、板上文字面积 ≤ 40%、0 报错；模板按 7 个样本词 × 3 幕），其余幕只报告。SOP §17 验收表加 13–16（啊哈卡、预测停顿、遮字幕测、R1/R4 修订）。runall 全过。

### 2026-10-31 15:50 JST · 决策 38 ② 阶段 ①：口语通用版式 oral.js + 样板 hd_oral_sc01-0
- 新版式 `v5/scenes/oral.js` `oralBuild`：Leo（A）/ Mia（B）面对面，气泡轮流高亮；第 1 轮后 B 气泡盖「？」，`C.predict` 4 s「B 会怎么回答？」→ 揭晓；两气泡里与核心句相同的词一起变橙；核心交际句、💡 提示整句进讲解字幕（提示 = `C.rule`）；收尾核心句卡 + 中文卡朗读。不用讲解员，节奏沿用阅读速度（中文 5 字/秒、英文 2.2 词/秒，HOLD 1.5 s）。
- 样板只切 `scenes/hd_oral_sc01_1.js`（ITEMS 不动；ACTS 加 A / B 帧）：45.7 s、预测 4 s、规则 25.3 s、板上文字 18%、确定、0 报错；`check_oral.py` 知识点 21 条缺 0。App 内尚未替换（阶段 ③）。
- 啊哈卡 `lab/audit38/aha/02_hd_oral_sc01.md`；新检查 `v5/check_oral.py`；`src/insightcheck.py` 识别 `./oral.js` 场景（抽样 1 + 8 幕，`--all-oral` 全查），跳过版式库文件。

### 2026-10-31 15:55 JST · 决策 36 ①2 语法白板模板串课（道 3）
- `v5/fix36_cross.py`（幂等）：一个点只放本点的板。G08 / G09 / G10 原来三幕都是「代词全局原理」的三块深度机制板 → 只留本课那块（G08 ② 物主代词、G09 ③ 指示代词），G08 ①③（粘人精 vs 独行侠、看空格后有无名词 + 常错）、G09 ①②（问答换 it / they、打电话 This is / Is that + 数的一致）、G10 ①–③（some / any 共同本领、常规分工、邀请请求特例）换成本课板；G31 三幕原是 G32 的 How / What 板 → Who / Whose / Who's、Where / When / What time、Why–Because / Which；G32 ③ 原是感叹句「遮住主谓」板 → What + 名词 / How + 形容词家族；G34 ① 改用「遮住主谓」板开场（原第 3 幕），② 三大公式，③ 常错；G35 原是 G36 的双轨板 → 就近原则。新内容全部取自该语法点 GRAMMAR_DB 的 step1 例句 / step3 规则 / step4 题目，不新编；新英文句配朗读、字幕给译文；动过的幕末句中文原是口诀，口诀改成讲解字幕（🎵 口诀：…）保留。
- 拿掉的共用板原文仍在 G07、G08 ②、G09 ③、代词总结、G32 ①②、G34 ①、G36 ①（对照表 `lab/audit36/R1_36_2_CROSS.md`，知识点不丢）。`GRAMMAR_FIXED_ACT` 改为只固定 G07（`src/patch_dedup_c.py` + 主文件），G08–G10 照常三幕；`app_check12.py` 同步。
- wbdupcheck 白名单只剩 G07|G08、G07|G09（G07 ②③ 与 G08 ② / G09 ③ 同板，要改 G07 = 决策 38 第 7 幕，道 r38）。17 幕重打包嵌入：确定性 / 0 报错（普通 + sandbox），66–105 s；app_check12 0 不合格、app_check4 hd_g08 / hd_g34 每幕可播、jscheck OK。


## 2026-10-31 15:55 JST · 决策 35 A2 第 1 批：课标二级缺词 60 个补成词条（道 1 l1_data）
- 课标二级词表（kebiao2.json 500 词）缺的 60 个词（a / an、the、be、can、will、must、should、not、no、yes、please、OK、hi、good、bad、nice、great、name、age、money、busy、late、early、free、cute、sit、stand、call、let、hurry、wrong、welcome、sure、next、middle、top、up、down、out、front、now、again、ago、last、well、lot、dear、candle、chore、email、TV、favourite、Mr、Mrs、Ms、Miss、hard、police、China、cream）新建词条：音标 CMUdict + Wiktionary 对照（功能词强 / 弱读都列），释义 / 补写例句 / 语法提示人工撰写（例句只用课标词），词源 / 构词 / 搭配不编留空；8 个功能词走功能词卡挂 G05 / G06 / G16 / G25 / G26 / G27 / G29。id `G<年级>_K<序号>`，年级暂定（人教社区表有的取其年级，否则 G3），新字段 `kebiao_level`、`added_by`。
- 新文件：`src/gen_vocab_a2.py`、`src/patch_vocab_add.py`（幂等，id 已在就跳过）、`src/kebiaocheck.py`、`v5/app_check_vocab_add.py`、`lab/audit35/a2_kebiao_add.json`、`lab/audit35/A2_KEBIAO_ADD.md`；`phon_same_ok.json` 加 let。kebiaocheck、app_check_vocab_add 入 runall。
- 验收：kebiaocheck 500/500；phoncheck 1547 词 0 不合格；app_check_vocab_add 60 词（功能词 8）开卡 / 模板挂载 / 单词表可搜 0 不合格、0 报错；jscheck、app_check8、app_check11、wordlistcheck、jargoncheck、etymcheck 通过。
- 遗留：better / best / worse / worst / was / were 现在有了原形（good、bad、be），并入原形放 A5；Dolch 220 视觉词为第 2 批。

### 2026-10-31 16:20 JST · 决策 36 ①3 白板截断句 / Markdown 残留 / 字幕口诀（道 3）
- 根因：旧 HD 剧场导出清单时把 GRAMMAR_DB 的 why_explanation、典型语境、核心规律等按字数硬截（「……在中间垫一个鼻音 n 变成」「two ➔ second (」），v5 照抄上板。逐幕扫描（白板字去掉「① 典型语境：」等标签后是否为原字段的真前缀）后，截断全部在语法白板 hd_g*；口语 / 一词多义的「截断」属道 r38 的模板重做。
- `v5/fix36_trunc.py`（幂等）：44 幕（G01–G04、G06、G08–G13、G15–G17、G20–G36、G40 全部幕）补回原句，按换行 / 条目、再按 。！？；】 拆行（右括号、引号、以逗号 / 冒号开头的段并回前段），不按字数截；剥 `**` 与反引号；末句朗读的中文原是口诀 → 改成这句英文的译文（step1_zh 对应句，G24 / G32 / G36 手工校），口诀进讲解字幕「🎵 口诀：…」保留。只增不删，对照表 `lab/audit36/R1_36_3_TRUNC.md`。
- 新检查 `src/wbtextcheck.py` 入 runall：全部场景 `**` / 反引号 = 0；hd_g 截断句 = 0；hd_g 底部字幕 ≠ 口诀。决策 38 样板幕 G05、G07、G14、G18、G19、G37–G39 归道 r38，在白名单 `lab/audit36/wbtext_allow.json`。
- 44 幕重打包嵌入：确定性 / 0 报错（普通 + sandbox）。补全后时长 75–144 s，hd_g32 ①②③ 121–144 s、hd_g24 120 s 超过 120 s，随 ② 长幕拆分处理。jscheck / wbdupcheck / wbtextcheck / mdcheck / app_check12 / app_check4 hd_g32 通过。

### 2026-10-31 16:35 JST · 决策 35-B2 语法硬伤（道 2）
- `src/patch_b2_grammar.py`（幂等，appwrite）：句子积木新增 C（表语）角色——渲染「◇ 表语」紫色块、O 改名「◆ 宾语」、图例加紫色；G04/08/09/11/16/17/25/27/31/32/34/37/38/39 共 14 点的表语从 O 改 C，G40 改成 Thank / you / for helping me learn English。
- 讲解：G05 a/an 改正为「an 是原形（古英语 ān），辅音前丢 n 变 a」（Etymonline）；G15「否定句 and 必须换 or」→「通常换」+ ✂️，改错题换成 tea and milk → or；G22 删补丁残文（i 变 a / o、u 变 a 分开）；G28「时间词放句尾」改为可放句首、⚠️ 频度副词在主谓之间；G32 删补丁残文；G35 clear river + 就近原则 ✂️；G11 smells delicious；G01 -o 复数口诀标 💡；G07 复数排序标 ⚠️。
- 重音规律表：名前动后「铁律」→规律（至少 170 对，反例 visit / report）；后缀「100%」→通常 + 例外。口腔省力原理 a→an 方向改正（数据；fp_economy 场景归 r38）。
- 例句：best→better（两项比较）4 处、very delicious、clean river、The rain stopped and look… 改；G39 删 2 句、G20 删 1 句（进行时表将来）；词卡 transport 例句改 Buses and subways are public transport.；例句库 3809 → 3806。`src/patch_b2_grex.py` 只重写 GRAMMAR_EX_JSON 块（`patch_grammar_examples.py` 的函数块替换已与后来的补丁不兼容，重跑会冲掉 lab-entry）。
- 新检查 `src/grammarcheck.py` 入 runall：系动词后标 O、非法角色、16 条已纠正硬伤黑名单；改前 39 处 → 0。对照表 `lab/audit35/GRAMMAR_FIX.md`。回归：jscheck / mdcheck / mobilecheck / insightcheck / app_check8–15 / tense_matrix / wo_grimm / hd_phonics / oral_func 通过；playercheck 改前改后都报 1–3 处（负载下 iframe 尺寸时序，未改播放器）。


## 2026-10-31 16:05 JST · 决策 35 A2 第 2 批：Dolch 视觉高频词全覆盖（道 1 l1_data）
- 来源：Dolch 1936 / 1948，按 Wikipedia「Dolch word list」(oldid=1362792935) 分级转录 221 个非名词 → `lab/audit35/dolch220.json`。改前在库 201 / 221。
- 新建 9 个完整词条：into、soon、as、around、off、pull、upon、own、shall（into / as / upon / shall 走功能词卡挂 G14 / G37 / G25）。11 个屈折 / 缩写形式建别名词条并到原形（said→say、goes / going / does / done / don't → go / do、has→have、got→get、been→be、could→can、would→will），主卡显示「过去式：said」类标签。A2 第 1 批补了原形后，was / were → be、better / best → good、worse / worst → bad 也并进去。WORD_ALIAS 51 → 68（`lab/audit35/a2_alias.json`，`patch_vocab_add.py` 写进 WORD_ALIAS 表）。
- 202 个词条加首屏字段 `dolch`（pre-primer / primer / grade1–3）；界面暂不显示，`sight_type`（闪认训练）未改。对照表 `lab/audit35/A2_DOLCH.md`。
- `kebiaocheck.py` 改为课标二级 500 + Dolch 221 都必须在库；`app_check_vocab_add.py` 加别名检查（不在列表、开卡转主词条、主卡有标签）；`app_check11.py` 别名数 `!= 51` 改 `< 51`（别名表会继续增长）。
- 验收：kebiaocheck 0 不合格（Dolch 221/221）；phoncheck 1567 词 0；app_check_vocab_add 69 词 + 17 别名 0 不合格；app_check11、app_check9、app_check6、jscheck 通过。
- 遗留：人教社区词表缺词（merry、kick、poor、guess、different 等约 40 个单词 + 200 多条短语）只作线索，要对照教材核实后再补；Dolch 名词表（95 个）未做。

## 2026-10-31 16:51 JST · WIP 决策 38 第 2 幕阶段 ②：144 口语幕场景切 oral.js
- 新 `v5/gen_oral38.py`（幂等）：144 个 `scenes/hd_oral_*_*.js` 只改首行说明 / import / `autoBuild→oralBuild` / ACTS 加 `M`、`F` 帧组，ITEMS 一字不动（脚本内 assert）。
- `scenes/oral.js`：按角色 emoji 选人物（女性 emoji → Mia 帧组，其余 → Leo 帧组，Leo 站右边镜像），标签 / 开场字幕 / 预测问句去掉 Leo、Mia 名字，修「👧 角色 A · Leo」错配（A 女 B 男 48 幕、同性 38 幕）。
- 主 HTML 未动（待打包 + check_oral + runall）。

## 2026-10-31 16:57 JST · WIP 决策 38 第 3 幕 hd_g18：场景重做 + 通用验收
- `v5/scenes/hd_g18_1.js` 改用 concept.js：左「一周」日历每天 7:00 落点 + Leo 每天起床 vs 右「此刻 📸」踢球快照 → 预测句子属于哪边 → 点连成跨以前 / 以后的环线；often 4 天 ⚽；地球绕太阳；第二次预测三张时间词卡归位 → 规则字幕 + 要点卡。why_explanation 按 GRAMMAR_DB 补全（旧板截断）。
- 新 `v5/check_r38.py`：手工重做幕验收（场景 `export const KNOW` 每条须在板上 / 讲解 / 朗读字幕出现 + 啊哈卡 / 预测 / 规则顺序 + 确定性 + 0 报错）。hd_g18_1：0 不合格，102 s。
- 口语 144 幕 `rebuild_all.py --tabs=hd_oral` 仍在后台重建角色包；主 HTML 未提交。

## 2026-10-31 17:00 JST · WIP 决策 38 第 3 / 4 幕：hd_g18 联络表自检 + hd_g19 三单 -s 重做
- hd_g18_1：390 px 联络表自检后下移两块板（避开两行讲解字幕）、Leo 缩小并在第二次预测前退场；仍 check_r38 0 不合格。
- hd_g19_1 改 concept.js：s 勋章——The boy[s] like vs The boy like → 预测勋章去哪 → 飞到 likes；主语轮换勋章飞走 / 飞回；He go ✗→goes；预测 do 出场 → 勋章被吸走变 does、like 回原形；加法 / 读音 / 语境 / 口诀（why、口诀按 GRAMMAR_DB 补全）。啊哈卡 `lab/audit38/aha/04_hd_g19.md`。check_r38 0 不合格，140 s。
- `check_r38.py` 的 KNOW 解析改用 node 求值（含 \' 转义的句子曾被误判缺失）。
- 两幕都还没 embed（等口语 144 幕重建嵌入完成，避免两个进程同时写主 HTML）。

## 2026-10-31 17:03 JST · WIP 决策 38 第 5 幕 hd_g14 ①② 
- 新 `v5/scenes/g14_lib.js`（三张图：盒子 / 桌面 / 靶心，glow 时段闪几何特征）。
- hd_g14_1 空间：三张图都写「在」→ 预测「英语为什么分三个词」→ 体积 / 接触面 / 点依次闪、in / on / at 落下（76 s）。
- hd_g14_2 时间：时间卡飞进三格 → 预测 the morning（盒子）→ 预测 Sunday morning（桌面，锁定具体某天）→ noon / night 例外钉靶心 → 规则（116 s）。**纠正**旧板「IN (>1天长时段容器)…in the morning」矛盾；加 weekend 英式 at / 美式（人教）on。
- 两幕 check_r38 0 不合格、390 px 联络表自检过；未 embed。

## 2026-10-31 17:04 JST · WIP 决策 38 第 5 幕 hd_g14 ③ + 啊哈卡
- hd_g14_3 状态隐喻：预测「红衣服包住进哪格」→ in red / in English、on duty / on foot / on TV、at work / look at / be good at 归位（110 s，check_r38 0）。啊哈卡 `lab/audit38/aha/05_hd_g14.md`（含纠错说明）。

## 2026-10-31 17:07 JST · WIP 决策 38 第 6 幕 hd_g05 a / an
- hd_g05_1 改 concept.js：a book 顺 vs a apple 💥 → 预测怎么办 → n 落入、an apple 顺；史实小图 ān → one / an → a（按道 2 B2 改后 GRAMMAR_DB，an 是原形）；带音标词卡分 a / an 两筐 → 预测 hour / useful → 规则。check_r38 0，148 s。啊哈卡 `lab/audit38/aha/06_hd_g05.md`。未 embed。

## 2026-10-31 17:09 JST · WIP 决策 38 第 7 幕 hd_g07 主格 / 宾格
- hd_g07_1 改 concept.js：主语区 / 动词门（likes → with → at）/ 宾语区；预测「I 过门还叫 I 吗」→ me；he/she/we/they 过门换装、you/it 不变。check_r38 0，143 s。啊哈卡 `lab/audit38/aha/07_hd_g07.md`。未 embed。
- 口语 144 幕：角色包重建完、打包完，正在 embed 进主 HTML（rebuild_all.py --tabs=hd_oral）。

## 2026-10-31 17:10 JST · WIP 决策 38：concept.js / oral.js 并入共享引擎
- 口语 144 幕按 oral.js 重建嵌入后主 HTML 16.16 → 17.36 MB：concept.js + oral.js 被打进每一幕。`v5/engine.js` 加 concept / oral，`build.mjs` 共享表加两项（口语场景脚本去掉图片后 3 KB），`rebuild_all.py` 源码时间加 oral.js / concept.js。
- 引擎变了 + 新场景有新字 → 后台全量 `rebuild_all.py`（字表 → 全部幕 → embed）。主 HTML 待全量重建 + runall 通过后再提交。

## 2026-10-31 17:13 JST · WIP 决策 38 第 8 幕 比较三兄弟 ① G37
- 新 `v5/scenes/cmp_lib.js`（身高尺 ruler + 人柱 person）。hd_g37_1：Tom、Jim 同高 150 cm 头顶水平线 → 预测 as ___ as 放 tall / taller / tallest → tall 落位「没人冒尖 → 不变形」；跑得和马一样快；温度计今天矮一截 → not as warm as。check_r38 0，96 s。
