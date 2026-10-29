# 交接文档：六大第一性原理总枢 · 白板动画

> 规范：同目录 `SOP.md`（+ 上级 `docs/whiteboard/SOP.md`）。分镜：同目录 `STORYBOARD.md`。
> 用户要求（2026-10-29）：把首页「英语『大道至简』六大第一性原理总枢」动画化；方案定为**白板 + 会动的演示道具**；先写 SOP、分镜和交接文档。直接提交推送 `master`，不新建分支；发现 bug 立即修。

## 1. 进度

| 步骤 | 内容 | 状态 |
|---|---|---|
| 0 | SOP / 分镜 / 交接文档 | ✅ 2026-10-29 |
| 1 | 引擎 v2 动效：`group / move / arc / buzz / fade / rot / camera`（SOP §4），回归旧 34 案例 | ✅ 2026-10-29（旧案例截图逐像素一致；`camera` 用法：`k.camera(0,0,x,y,z)` 开场特写，再 `k.camera(go(2),2,480,272,1)` 拉远（**回到 z=1 时中心必须是 480,272**，否则整块白板会偏移）；`hide(g)` 让组开始时隐藏） |
| 2 | App 接线：`wbStageHtml` 第 4 参数 svg id、`startFirstPrinciplesCanvasLoop` 走白板、`fpAnimId`、`appfp.py`（SOP §5） | ✅ 2026-10-29（`insert_wb.py` 里 `FP_READY` 列表登记做完的原理；没登记的原理保持旧 Canvas） |
| 3 | `fp_props.js` 道具（SOP §3） | 🔶 已有：`token`（金色令牌组）、`throne`（王座）、`king`（戴王冠的词牌组）、`knife`（刀切下去再淡出）、`halves`（左右两半分开）、`person`（火柴人组，`bend` 弯腰）、`lips`（正面嘴唇，`close/open` 开合）、`mouth`（口腔侧面 + 声带组 + 波纹 + 发音位置亮点）、`tag`、`parts`（分段上色，**只用于 ASCII**：音标字符 ʌ ɪ ʃ ˈ ː 不在 Courier New 里，宽度不是 0.6×字号，整段音标要单独一个 `T`）、`fin` |
| 4 | 样板：① `fp_economy` 1-1（声带道具 + buzz 动效） | ✅ 2026-10-29（50 秒）；用户要求做一个提交一个，不停下来等 |
| 5 | 6 条原理 × 4 幕 | 见下表 |
| 6 | 朗读开关（可选，SOP §6） | ⬜ 等用户看完画面再定 |

| # | 原理 id | 中文 | 幕数 | 主要道具 | 状态 |
|---|---|---|---|---|---|
| ① | `fp_economy` | 口腔省力同化律 | 4 | mouth、gate | ✅ 4/4（1-1 声带 buzz · 1-2 撞车 move · 1-3 嘴唇开合 · 1-4 守门员开关门 rot；每幕 45–55 秒） |
| ② | `fp_iconicity` | 字母象形与音义同源簇 | 4 | letterMorph | ⬜ |
| ③ | `fp_boundedness` | 物理边界感统摄律 | 4 | knife、ring/target、building | ✅ 4/4（3-1 刀切苹果/面包 + 杯子装牛奶 · 3-2 小狗圈一只 a → 靶心 the · 3-3 楼房外壳 → 书本功能 · 3-4 小鸡 → 鸡肉，边界虚线消失；每幕 38–50 秒） |
| ④ | `fp_one_king` | 一山不容二虎单核谓语律 | 4 | throne、token | ✅ 4/4（4-1 am/like 抢王座 · 4-2 to 马甲 / doing 循环 · 4-3 令牌 arc 飞到 Does/Did · 4-4 五副骨骼方块 + 彩色下划线；每幕 40–50 秒） |
| ⑤ | `fp_vectors` | 三维几何向量时空律 | 4 | dims、vec、vehicle | ✅ 4/4（5-1 点/面/盒 + 小球落下 · 5-2 贴上/弹开、开关灯、飞机 arc 起飞 · 5-3 火柴人上公交 / 钻小车 · 5-4 to/from/for 三条箭头小球；每幕 45–55 秒） |
| ⑥ | `fp_zoom_focus` | 焦点先行与镜头缩放律 | 4 | xmasTree、spotlight、zoom、timeGrid | ✅ 4/4（6-1 树干 + 挂件短语 · 6-2 Where 弧线跳句首 · 6-3 camera 同心圆拉远 · 6-4 时间轴红点移动 + 快照/录像/结算；每幕 40–50 秒） |

建议顺序：① → ⑤ → ③ → ④ → ⑥ → ②（道具难度从高到低，先把最难的引擎动效验证掉）。

## 2. 代码位置

**主文件 `萌星小学英语_最终合并版.html`**（搜关键字，行号会变）：

| 关键字 | 作用 |
|---|---|
| `const FIRST_PRINCIPLES_DB` | 6 条原理的数据：`id / num / shortTitle / fullTitle / badge / themeColor / coreEssence / mentalFormula / unifiesList / acts[4] / quiz` |
| `function renderFirstPrinciplesHubView` | 总枢页面；`<canvas id="firstPrinciplesCanvas">` 就是要替换成白板的位置 |
| `function startFirstPrinciplesCanvasLoop` | 旧 Canvas 动画（背景 + 两个卡通人物 + 中间推导卡片）；白板接好后作为没做完原理的后备 |
| `let fpState` / `var fpAnimId` | 当前原理、当前幕；动画帧 id |
| `switchFirstPrincipleLaw` / `switchFirstPrincipleAct` | 切原理 / 切幕（会重新 render 页面） |
| `navigateTo('first_principles_hub', { lawIdx, actIdx })` | 入口：首页横幅、导航按钮、实验室里 3 处跳转（lawIdx 0/1/3） |

**一幕一幕地做**：`wbStageHtml(..., "fpWbStage")` 在这一幕没有白板案例时输出旧 Canvas，所以原理可以先登记进 `FP_READY`，再逐幕补案例。`preview.html?tab=fp_xxx` 会自动先加载 `fp_props.js`。

**源文件**：沿用 `docs/whiteboard/src/`；新增 `cases/fp_props.js`、`cases/fp_<原理>.js` ×6、`appfp.py`。

## 3. 和王炸实验室重叠的内容

- ④-4 五副骨骼 ↔ 实验室 ⑪ `five_patterns`；⑥-4 时态坐标 ↔ 实验室 ⑨ `tense_matrix`；④-3 令牌 ↔ 实验室 ⑩ `aux_transformer`；⑥-1 先立树干 ↔ 实验室 ② `bamboo_tree`。
- 做法：总枢这几幕只做**总览**（每类 1 个例句），结尾字幕提示去对应实验室看详细版。画法可以从对应 `cases/*.js` **复制**小函数过来，不要跨文件引用。

## 4. 待确认 / 已知问题

### 已修（2026-10-29，写分镜时发现，按「发现 bug 立即修」直接改主文件数据）
- ✔ ③-3 卡片里混入俄文：`ходите to the hospital` → `go to the hospital`。
- ✔ ①-4 卡片：`ru-ning (变成长音 /juː/)` → `/uː/`（run 里 u 前是 r，长音读 /uː/）。
- ✔ ②-1 卡片标题乱码：`🎒 B (包裹肚腹) &  cupped C` → `🎒 B (包裹肚腹) & 🥤 C`。
- ✔ ③-4 卡片：`two fishes` → `two fish`（小学教材按 fish 单复同形教）。

### 未改，需要用户决定（属于讲法问题，不是错字）
- ② 字母象形：M=山/嘴、S=蛇、B=包、C=抓 主要是**记忆联想**，不是严格词源（字母确实来自腓尼基象形字，但 mountain、snake、bag 这些词和字母形状没有历史关系）。fl-/gl-/sl-/str-/sp-「音义同源簇」是语言学里的「音义联觉」现象，有统计倾向但很多例外（如 floor、flower 的 fl- 没有「飞」的来源，sport 来自 disport）。分镜里字幕用「可以想成…」措辞，不改数据。tw- = two 是真词源，可以直接说。
- ③-2「a/an 在古英语里就是 one」：准确说是从古英语 ān（one）演变来的；不影响小学讲法。
- ④-2 topBanner 写了三件马甲（to do / doing / done），卡片只有两件；分镜只讲两件，done 一句带过。
- ⑥-4 subZh「不用孤立背4大时态」，实验室 ⑨ 是 5 格；不冲突（讲法不同），未改。
- 原页面 Canvas 里的两个卡通人物（`drawHDCharacterActor`）换成白板后不再出现；如果用户想保留人物，可以在白板左下角画一个手绘小人当讲解员。

### 环境
- 沙箱重置后重装 Playwright：`pip install playwright && python3 -m playwright install chromium && python3 -m playwright install-deps chromium`。
