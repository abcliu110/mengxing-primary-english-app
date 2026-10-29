# 交接文档（HANDOFF）· 白板动画与新模块

> 更新：2026-10-30 01:55 JST（阶段 3：ze_subject 上线，已上线 6/11 幕，见 §0.6）　｜　接手先读：`MASTER_DESIGN.md`（总设计，19 条决策）→ `SOP.md`（v2.0 标准流程 + 验收清单）→ 本文。
> 用户规矩：直接提交推送 `master`，不新建分支；做完一个单元就提交；发现 bug 直接修；每写完一个文档也立即提交。
> **当前阶段：阶段 1 已完成（port 样板幕审片通过、按需加载完成）→ 阶段 2 单词身世第一批（进度见 §0.5）。**

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

**按需加载（阶段 1 ⑤，2026-10-29 20:40）**
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
- **复算（2026-10-29 21:20，`r2check.py all --summary`）**：66 幕（多了 europe、bluetooth），英文词 / 词块 1641 个，缺 1462；白板句子 324 句，缺朗读 195；R4 只有 3 个新幕列了动作词清单（19 个，缺 0），旧幕都还没列。`--summary` 是本次新增的「按页签汇总」（原来只有逐幕行和总计，没有按页签的汇总，拿来排推广顺序不方便）。

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
| ✅ P1 完成（2026-10-29 23:00） | `adj_order` R2 13 → 0 | 做法：案例配置加 `extraSays`（在原 `k.final` 朗读之后补读：八类首字母词 Opinion…Purpose、OSASCOMP、two/that、cat、this），画面不动；r2check --strict 4/4 幕 37 词全过。渲染回归：只有 adj_order 第 1、2、4 幕变化（多了朗读，时间轴变长），第 3 幕和其他 71 幕逐字节一致；appwb adj_order 过。例句里的 bought / wears 不在动作词表，R4 未列清单（视觉 v2 升级时一起补演）。 | 下一个：P2 `fp_economy` |
| ✅ P2-① 完成（2026-10-29 23:20） | `fp_economy`（第一性原理 ①）R2 42 → 0、白板句子缺朗读 2 → 0 | 做法同 P1：每幕在收尾 `D.fin` 前补朗读（books/bags/buses、worked/played/wanted、watch/box/want/need、a/the/book/useful/hour/polite/possible、run/swim/tap/tape/big/hot/stop + 词块 ed/es/in/im/ing/er/est）；第 4 幕 `r2skip` 拼错的 runing 和音节切分残片 ru/ning/ta/ping。验收：r2check --strict 43/43；渲染回归只有 fp_economy 4 幕变化（20 项），其余 68 幕逐字节一致；jscheck、appfp 0 过；截图看过。R4：例句里 run/swim/stop 是动作词，第一性原理幕还没有讲解员，留到视觉 v2 升级时补演。 | 下一个：P2 `fp_iconicity` |
| ✅ P2-② 完成（2026-10-29 22:30） | `fp_iconicity`（第一性原理 ②）R2 46 → 0 | 做法同 P1/P2-①：每幕收尾 `D.fin` 前补朗读（mouth/mother、swim/smile、box/bed、cup/cap；fl/gl/sl 词块 + fly/flag/flower/glass/glad/slide/slow/sleep/floor；str/sp 词块 + straight/street/strong/strict/speak/sport/space/spring；tw 词块 + two/twelve/twenty/twice/twin/between/twain）；第 2–4 幕 `r2skip` 辅音丛拆开后的词尾残片（ag/ower/ass/ad/ide/ow/eep、aight/eet/ong/ict/eak/ort/ace/ring、elve/enty/ice/in/een）和 between 里的古前缀 be（≈ by，不是动词 be，不单读）。验收：r2check --strict 33/33；渲染回归只有 fp_iconicity 4 幕变化（20 项），其余 68 幕逐字节一致；jscheck 29 模块、appfp 0/1 过。R4：例句里 put/catch/fly/swim/walk/sit 是动作词，第一性原理幕没有讲解员，留到视觉 v2 升级时补演。 | 下一个：P2 `fp_boundedness` |
| ✅ P2-③ 完成（2026-10-29 22:45） | `fp_boundedness`（第一性原理 ③）R2 45 → 0、白板句子缺朗读 12 → 0 | 做法同上：每幕收尾前补朗读（an apple / a piece / a glass of milk / homework / papers；There is a dog in the park. / The dog is running. / Open the door, please! / one / that / moon；go to school vs go to the school、on the bed / in bed、on a bus / by bus、buy a football、to the hospital；three chickens、made of glass、make room for you、two fish / some fish）。第 3 幕 `r2skip: ["vs"]`（标题里的对比符号）。**工具小改**：`r2check.js` 判断白板整句是否被朗读时，先去掉 r2skip 的词（否则「go to school vs go to the school」永远对不上）；全 App `--summary` 其余幕结果不变。验收：r2check --strict 59 词、14 句全过；渲染回归只有 fp_boundedness 4 幕变化（20 项）；jscheck、appfp 2 过。 | 下一个：P2 `fp_vectors` |
| ✅ P2-⑤ 完成（2026-10-29 23:00） | `fp_vectors`（第一性原理 ⑤）R2 63 → 0、白板句子缺朗读 19 → 0 | 做法同上：每幕收尾前补朗读（at/on/in、on the desk、Monday/May；on/off 动词 + 名词、get on the bus、take off your shoes、turn off the TV、get off the bus；八种交通工具、on the train / in a taxi / on a bike / on a horse；to/from/for、listen to me、go to school、give a book to me、come from China、borrow from you、lend to him、look for my pen、wait for the bus、a cake for mom、look at / look after）。第 3 幕 `r2skip: ["vs"]`。验收：r2check --strict 68 词、28 句全过；渲染回归只有 fp_vectors 4 幕变化（20 项）；jscheck、appfp 4 过。**P2 四条原理全部完成**。 | 下一个：P2' `fp_one_king` 第 2–4 幕 |
| ✅ P2'-④ 完成（2026-10-29 23:15） | `fp_one_king`（第一性原理 ④）第 2–4 幕 R2 补齐（第 1 幕按计划留到搬去中英对照总枢时在新位置补，原位置仍缺 18 词 5 句） | 补朗读：want/plan/hope to…、enjoy/finish、good at drawing、do/doing/done；She went home / He plays football / They went home / Does he play? / He doesn't play. / Did they go?、can/must/will、Yes/No；五副骨骼的例句词。`r2skip`：第 2 幕打叉错句「I want go home.」、第 3 幕红字错句「Does he plays? / She can swims.」、第 4 幕成分标签 IO / DO。**工具小改**：`r2check.js` 的 r2skip 支持整句条目（带空格 = 按整句跳过错句），旧条目照常。验收：第 2–4 幕 r2check 全过（63 词、22 句）；渲染回归只有 fp_one_king 第 2–4 幕变化（15 项）；jscheck、appfp 3 过。 | 下一个：P2' `fp_zoom_focus` 第 2–4 幕 |
| ✅ P2'-⑥ 完成（2026-10-29 23:30） | `fp_zoom_focus`（第一性原理 ⑥）第 2–4 幕 R2 补齐（第 1 幕同样留到搬迁时补，原位置仍缺 18 词 4 句） | 补朗读：Where is my bag? / How much is this shirt? / What a clever boy he is! How fast he runs!、Yes/No；Room/Building/Star School/Beijing、in/at/on、Tuesday morning、September；yesterday/did、every day/do/does、tomorrow/will、now/am/are/is doing、already/just/has/done 各配例句。验收：第 2–4 幕 r2check 全过（58 词、6 句）；渲染回归只有 fp_zoom_focus 第 2–4 幕变化（15 项）；jscheck、appfp 5 过。**P2 / P2' 全部完成**（第一性原理 24 幕里只剩 ④-1、⑥-1 两幕按计划待搬迁）。 | 下一个：P3 `bamboo_tree` || ✅ P3-① 完成（2026-10-29 22:30） | `bamboo_tree`（实验室样板页签，5 个病句案例）R2 73 → 0、白板句子缺朗读 12 → 0 | 每个案例在 `k.final` 正确句之后补朗读：拆开的主干 / 挂件词（want/go/read/tomorrow/library/storybooks；I like dogs / They are happy、am/is/are、very much/and；under the tree / in a red dress / reading a book / my sister；yesterday morning / at eight o'clock / on the school playground / do morning exercises；there be / two yellow ducks / swimming / on the lake / in the park / have）+ 每幕一句 Chinglish 例句。`r2skip`：vs 和每幕的中式病句整句（画面上作为错误示范，SOP §7.3 不读）。验收：r2check --strict 68 词、18 句全过；渲染回归只有 bamboo_tree 5 幕变化（25 项），其余逐字节一致；jscheck、appwb bamboo_tree 过。R4：go/read/swim 等动作词留到视觉 v2 升级时由讲解员补演。 | 下一个：P3 `aux_transformer` || ✅ P3-② 完成（2026-10-29 22:40） | `aux_transformer`（助动词变形金刚，4 案例）R2 82 → 0、白板句子缺朗读 15 → 0 | 每个案例在 `h.final` 前补朗读：否定 / 简短回答（She is not、Yes, she is. / No, she isn't.、Yes, he can. / No, he can't.、Yes, she does. / No, she doesn't.、Yes, they did. / No, they didn't.）、第二个感叹句（How happy she is! / How fast the plane flew!）、What can Leo speak very well?、句子成分词组（taking photos in the park now、every Saturday evening、to Sanya by plane last winter）、字幕里列举的 am/is/are/was/were、do/does/did、will/must/should、-es、-ed、buy/bought、an。验收：r2check --strict 88 词、38 句全过；渲染回归只有 aux_transformer 4 幕变化（20 项）；jscheck、appwb aux_transformer 过。 | 下一个：P3 `five_patterns` || ✅ P3-③ 完成（2026-10-29 22:55） | `five_patterns`（五大句型，5 案例）R2 180 → 0、白板句子缺朗读 13 → 0 | 每个案例在 `h.final` 前补朗读：骨架例句（The sun rises in the east. / The chicken soup smells so delicious. / Leo loves reading English books. / Mum gave me a birthday gift. / Good music makes us happy.）、金句里每个词、字幕和白板列举的动词表（rise/fly/sleep/run/smile；look/sound/smell/taste/feel、get/turn/become；discuss the plan / marry her / enter the room、want/hope/plan/decide to do、enjoy/finish/practice/mind doing；give/show/send/pass/lend/teach/tell、buy/make/cook/draw/choose/find；ask/tell/want/invite、make/let/have、Let's go! Make him laugh!）和 -ly/-ed/-ing、somebody/something。`r2skip`：成分标签 SV/SVP/SVO/SVOO/SVOC/Vi/Vt/IO/DO/OC、缩写 sb/sth、vs、被划掉的 makes me happily（sweetly 是字幕里讲的副词，单读 + 例句，不跳过）。验收：r2check --strict 170 词、24 句全过；渲染回归只有 five_patterns 5 幕变化（25 项）；jscheck、appwb five_patterns 过；截图看过。 | 下一个：P3 `tense_matrix` || ✅ P3-④ 完成（2026-10-29 23:10） | `tense_matrix`（时态矩阵，5 案例）R2 228 → 0、白板句子缺朗读 34 → 0 | 每个案例在 `k.final` 前补朗读：时间轴 Past/Now/Future；主语替换后的完整句（They play football every afternoon. / The little bird flies high in the sky. / Mia is dancing and making a cake. / The children are swimming in the pool now. / Mia studied hard and cried when she lost her pen. / We were very happy at the party last night. / He will fly a kite in the park tomorrow. / They are going to have a picnic next Sunday. / Mia has lived in Beijing for five years. / Mr Wang has gone to Shanghai.）；时间路标词（every day/always/usually/often/sometimes/on Sundays、right now/at the moment、yesterday/ago/last night、next week/soon/in the future、already/yet/just/never/since）；字幕里的 The earth goes around the sun、ch/sh/es、a e i o u、状态动词 like/know/want/have、have been to / have gone to、I lost my key / I have lost my key。`r2skip`：公式标签 V-s/V-ing/V-ed、REC，红叉错句 He doesn't likes / I playing football / Did you went there? / There is going to have，斜杠并列残片 last night year、next week year。验收：r2check --strict 240 词、42 句全过；渲染回归只有 tense_matrix 5 幕变化（25 项）；jscheck、appwb tense_matrix 过。**P3 语法核心四个页签全部完成**。 | 下一个：P4 `writing_alchemist` || ✅ P4 完成（2026-10-29 23:25） | `writing_alchemist`（满分作文炼金炉，3 案例）R2 198 → 0、白板句子缺朗读 30 → 0 | 每个案例在 `finalBox` 前补朗读：「60 分」原句（I like English very much. / We were very happy yesterday. / Reading books is good for us. / The park is very nice in spring. / First, I will do homework. / And I also help my mom. / I was tired, but I was happy.）、替换短语（be crazy about / be fond of / enjoy doing、To begin with / Besides / All in all / In a word / At last、Because / so、be good at、be going to / will / plan to / look forward to）、五感 look/smell/are singing；母题范文两段**逐句**朗读（每句一条，朗读条放得下：最长一句 93 字符，截图确认一行显示完）。`r2skip: ["adj"]`。**工具小改**：`r2check.js` 白板长段落按版面断行、一行常跨两句，相邻 2–3 条朗读连起来能盖住这一行也算已朗读（全 App `--summary` 其余幕结果不变）。验收：r2check --strict 197 词、45 句全过；渲染回归只有 writing_alchemist 3 幕变化（15 项）；jscheck、appwb writing_alchemist 过。**§0.1 推广清单 P1–P4 全部完成**；剩下的只有「暂缓」行（vowel_shift、stress_rhythm、metaphor_code、past_clans，等并入新页签时再补）和 ④-1、⑥-1（等搬迁）。 | 下一步见 §0.1 末尾「P1–P4 之后」 |





| P2 | 第一性原理 ① `fp_economy`（44）→ ② `fp_iconicity`（46）→ ③ `fp_boundedness`（57）→ ⑤ `fp_vectors`（82） | 首页总枢，24 幕都会被看到；①②缺口小 | 每条原理一次提交；`appfp.py` 回归 |
| P2' | ④ `fp_one_king` 第 2–4 幕、⑥ `fp_zoom_focus` 第 2–4 幕 | ④-1、⑥-1 要零丢失搬去中英对照总枢（阶段 3），**搬的时候在新位置补 R2/R4**，原位置不补 | 先补留下的 6 幕 |
| P3 | `bamboo_tree`（85，实验室样板页签）→ `aux_transformer`（97）→ `five_patterns`（193）→ `tense_matrix`（262） | 语法核心；bamboo_tree 是实验室样板，先补好给别的页签对齐 | 例句大多已在画面上，主要是补单独朗读 + 整句朗读 |
| P4 | `writing_alchemist`（228） | 写作，长句多，六年级用；最后做 | 白板长句全部要朗读，先确认朗读条能放下 |
| 暂缓 | `vowel_shift`（42）| 正在被格林定律章「元音变异」吸收（新位置按 R2 补齐）；删页签等用户确认 | 不补 |
| 暂缓 | `stress_rhythm`（103）、`metaphor_code` 空间 / 时间条目、`past_clans` 复数例 | 决策 5 / 6 要部分并入「语调地图」「合成词重音」「空间隐喻」「不规则复数」；先列清单、并入后只补留下的部分 | 等新页签开工时一起定 |

- R4：旧幕都没有 `actionWords` 清单；补 R2 时同步列清单（例句里的动作动词见 `r2check.py <id> --all-items` 末尾「提示」行）。
- **P1–P4 之后（2026-10-29 23:25）**：R2 推广清单已做完（第一性原理 22 幕 + 实验室 adj_order / bamboo_tree / aux_transformer / five_patterns / tense_matrix / writing_alchemist）。复算 `r2check.py all --summary`：剩余缺口只在暂缓页签（past_clans 134 词 15 句、stress_rhythm 97/6、metaphor_code 69/13、vowel_shift 42/0）和 ④-1、⑥-1（各 18 词）。
  - 本轮统一做法：旧幕不改画面，只在收尾（`D.fin` / `k.final` / `h.final` / `finalBox`）前追加 `k.say`；画面上的错句、公式标签（S V O、V-ing、adj、sb/sth）、对比符号 vs、拆开的词尾残片一律写进案例 `r2skip`（整句错句可直接写整句）。
  - ✅ 2026-10-29 23:35 `metaphor_code` 3 案例 R2 69 → 0、句子 13 → 0：按 MASTER_DESIGN 第 81 行，「人体、颜色、动物隐喻留在原页签」，三个案例都不会被搬走，所以先补（原「暂缓」行写的是整页签，过严）。补读：head/face/mouth/hand/foot/arm/leg、face of a clock、mouth of a river、at the head of the line、eye of a needle、neck of a bottle、give me a hand；颜色词、a green hand、a white lie、give the green light、golden opportunity、Don't feel blue!；as busy as a bee、The early bird catches the worm、as gentle as a lamb、as brave as a lion、rain cats and dogs、a lucky dog、black sheep、white elephant、-er/-est。以后「空间隐喻」新页签若要借用这里的某些条目，复制过去即可，这里不删。验收：r2check --strict 83 词 21 句全过；渲染回归只有 metaphor_code 3 幕变化；jscheck、appwb 过。
  - ✅ 2026-10-29 23:45 `past_clans` 4 案例 R2 134 → 0、句子 15 → 0：四个案例都是不规则过去式（AAA、i→a、ee→e+t、-ought/-aught），白板脚本里没有复数例（MASTER_DESIGN 第 83 行说的「复数例」不在白板案例里），不会被并走，所以先补。补读：四派的例句整句、各派成员（hit/let/cost、sing/sang/sung、swim/swam/swum、drink/drank/drunk、sit/sat、give/gave、begin/ring/rang、run/ran、come/came、sleep/feel/leave、keep/kept、sweep/swept、meet、feed/fed、teach/catch/buy/bring/think/fight 及过去式）和词块 -ed/-ng/-nk/ee/ea/-ought/-aught/gh/br-。`r2skip`：红叉错写 putted、hurted，派别标签 AAA。验收：r2check --strict 139 词 14 句全过；渲染回归只有 past_clans 4 幕变化；jscheck、appwb 过。
  - 至此 R2 剩余缺口：stress_rhythm（97 词 6 句，要部分并入「语调地图」「合成词重音」，等新页签开工）、vowel_shift（42 词，等用户确认删页签）、④-1 / ⑥-1（等搬迁）。
  - 下一轮候选（不用等用户的）：①R4 动作词清单——旧幕补 `actionWords` 要先有讲解员（视觉 v2 升级），所以和 v2 升级一起做；②暂缓页签里**不会被并走**的部分（past_clans 的过去式部分、metaphor_code 的非空间 / 时间条目）可以先补，复数例、空间 / 时间条目等并入时再补。

## 0.5 阶段 2 进度（单词身世第一批，2026-10-29 起）

| # | 内容 | 状态 / 提交 |
|---|---|---|
| 1 | Europe 示范幕（`cases/wo_europe.js`，引擎 v2 + 讲解员，对齐 port 样板） | ✅ 见下 |
| 2 | Bluetooth 示范幕（`cases/wo_bluetooth.js`） | ✅ 见下 |
| 3 | 身世标签 + 词卡跳转（先给 port 家族） | ✅ 见下 |
| 4 | 格林定律章（吸收并删除 `vowel_shift`，R1 零丢失流程） | ✅ 四幕上线、清单 211 条对照完（删旧页签等用户确认）。原记录：① 出处 ✅ `caa1493`（SOURCES ④ 12 条、⑤ 14 条，含纠错）；② 真格林定律幕 `wo_grimm`；③ 元音变异三幕 `wo_vowel_a/b/c`；④ 清单 185 条逐项打勾。**删 `vowel_shift` 页签 / 改入口等用户确认，不动** |
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
- **没做（等用户确认，HANDOFF §4 第 5 条）**：词卡里原有的 port 家族长段落（`affix_root`「家族串记」、import 的「运进我们的港口」讲法把港口和搬运混成一个词根）按 R1 应改成一句话 + 身世标签——涉及删改词库原文，清单在 §4，等用户点头再动。

**格林定律章（2026-10-29 21:40 起，进行中）**
- 出处（`caa1493`）：`word_origins/SOURCES.md` ④ 真格林定律 12 条、⑤ 元音变异 14 条。纠错要点（R3，写进新幕，旧页签不动）：①「格林音变律」名字不准——格林定律是辅音挪位，foot→feet 是元音变异（i-mutation）；② length/strength 的 o→e 也是 i 变异（后缀 \*-itho 里的 i），不是「嘴巴省力缩短」；③ width 是 1620 年代仿 breadth 新造的，deep/depth、wide/width 读音差距主要来自 1400–1700 大元音推移（✂️）；④ safe/save、use/use 是法语借词，不属于古英语清浊交替（⚠️）；⑤ blood 读 /ʌ/ 不是 /uː/；⑥ full→fill 是形容词变动词。
- ✅ 第 1 幕 `wo_grimm`（真格林定律，约 142 秒，18 句朗读）：老祖宗分两家 → 时光机 pes→foot、pedal 没变 → 一排都挪（tres/three、dentist/tooth、December/ten、dual/two、century/hundred、cardiac/heart）→ 彩蛋 December 第十个月 + Jacob Grimm → 中文「脚 ↔ 足」💡 → 🔮 ped = foot、pedestrian 行人走过 → 金句卡。验收：`r2check wo_grimm --strict` 21/21、R4 2/2；旧 66 幕 330 次渲染逐字节一致（只多 wo_grimm 5 项）；jscheck 23 模块过；appwo 四幕 mounted、无报错；appwb bamboo_tree、appfp 0 过。分镜 `grimm_law/GRIMM_STORYBOARD.md`。总枢新增章节「🔤 格林定律：辅音和元音的大挪移」（`wo_hub.js` WO_CHAPTERS），`WO_READY` 加 `wo_grimm`。
- 已知取舍：截图逐张看过（时光机、词族表、罗马历、预测、金句卡），没有录屏；行人在金句卡前淡出。
- ✅ 元音变异三幕 `wo_vowel_a`（原定律 A，foot→feet）、`wo_vowel_b`（原定律 B，long→length）、`wo_vowel_c`（原定律 C，清浊交替）：原 `vowel_shift` 三个案例的全部画面、字幕、术语、朗读整体搬来（文件 `cases/wo_vowel_a/b/c.js`，共用小工具 `cases/wo_vowel_kit.js`），加 v2 片头卡 + 讲解员 + 每个英文词单读和例句 + 纠错（R3，见上）+ 徽章。讲解员演的动作：fill（take）、bleed（surprised + oops）、feed（put）、save（put）、close（turn）、breathe（cheer）。验收：`r2check wo_vowel_a/b/c --strict` 14/22/15 词全过、R4 3/0/3；旧 67 幕 335 次渲染逐字节一致（新增 15 项都是新幕）；jscheck 27 模块过；appwo 七幕 mounted 无报错；apptags PASS；appwb vowel_shift 旧页签照常。
- 工具改动（只加不改）：`insert_wb.py` 新增 `WO_KITS`（几幕共用的小工具文件作为依赖先执行，`data-deps="wo_props wo_vowel_kit"`）；`preview.html` 载入 `wo_vowel_kit.js`；`r2check.js` 新增案例字段 `r2skip`（画面上故意展示的错误形式不计入 R2，如 longth、foots；SOP §7 第 3 条）。
- R4 提示：wo_vowel_c 例句「Take a deep breath」里的 take 不是「拿」的动作，只提示不算缺。
- **没做（等用户确认）**：删 `vowel_shift` 页签、改实验室里 15 处入口指向新章（清单在 `grimm_law/VOWEL_SHIFT_INVENTORY.md` 末尾）。
- ✅ 清单逐项打勾（`src/check_inventory.py`，可重复运行）：`grimm_law/VOWEL_SHIFT_INVENTORY.md` 里字幕 / 白板 / 朗读 182 条 + 术语 29 条 = 211 条（原记「185 条」是只数了部分行），✅ 原样搬过去 202 条、✏️ 按 R3 改正后搬过去 9 条（原讲法作为「原讲法（已改正，保留备查）」引用留在新幕术语里）、❌ 0 条；页面数据 `GRIMM_VOWEL_LAWS` 19 对词全部在新幕画面上。文件末尾追加了对照汇总和改正清单（原 → 新）。15 处入口未动（等用户确认）。
- **格林定律章完成**（4 幕：`wo_grimm`、`wo_vowel_a/b/c`）。等用户：①看四幕是否满意；②确认后按 R1 删 `vowel_shift` 页签并把 15 处入口改指新章。

**时间与度量章（2026-10-29 22:30 起）**
- ✅ `wo_time_num` 数字的秘密（约 121 秒，18 句朗读）：十个点 = ten → eleven = one + left、twelve = two + left → thirteen/fourteen/nineteen = 几 + ten，-teen = ten → dozen = duo + decem（呼应格林定律 d→t），搬运工抱一打鸡蛋走（carries）→ 中文四位一节 vs 英文三位一节、million = mille + -one、一万 = ten thousand → 🔮 一亿 = one hundred million → 金句卡。验收：r2check --strict 22/22、R4 1/1；旧 70 幕 350 次渲染逐字节一致；jscheck 28 模块；appwo 八幕过。分镜 `time_measure/STORYBOARD.md`。总枢「⏰ 时间与度量的身世」章节上线（`WO_CHAPTERS` 加 scenes）。
- ✅ `wo_time_week` 星期和月份（约 156 秒，23 句朗读）：天上七位客人 → 日耳曼的神（Tiw、Woden、Thor、Friga），闪电雷神 → 七天名字表（Saturday 没换）→ 古英语 þunresdæg → Thursday → September ← septem，古罗马历三月开始（Sep–Dec = 第 7–10 个月），后来前面加了一月二月 → 中文按数字 vs 日语按天体（💡）→ 🔮 Monday = moon + day → 金句卡。验收：r2check --strict 29/29、R4 1/1；旧 71 幕 355 次渲染逐字节一致；jscheck 29 模块；appwo 九幕、appfp 0 过。
- 时间与度量章两幕完成。已知取舍：①🔮 题 Monday 在镜头 2 已出现过（是回忆题不是推理题），以后可换成「octo = 8 → octopus 有几条腿」（octopus 词源要先补出处）；②没有「a.m. / p.m.、mile = 一千步」（章节卡原写的例子），要做先补出处。

## 0.6 阶段 3 进度（中英对照总枢，2026-10-29 23:55 起）

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
6. ✅ 按需加载（`<script type="text/plain">` + 首次进入时执行；首屏耗时对比）——已完成，见 §0。

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
