# 白板认知动画系统升级设计规范与标准作业程序 (SOP)

> **文档路径**：`docs/whiteboard/SOP_COGNITIVE_UPGRADE.md`  
> **适用范围**：`v5/scenes/*.js` 场景开发、`v5/lib/concept.js` 引擎扩展、`src/*.py` 自动化生成与质检管线  
> **核心目标**：终结“静态贴图平移 + 文字卡片罗列”的流水线模式，全面转向**“高启发性（Aha! Moment）、强视觉隐喻（Concept Animation）、深知识纵深（Multi-Scene Deep-Dive）”**的认知可视化系统。

---

## 一、 核心设计原则与研发红线（Red Lines）

在任何新场景编写或旧场景重构（Patch）前，教研与研发人员必须严格遵守以下四条准入红线：

1. **严禁“有声 PPT / 单词卡堆砌”模式**：
   * 冻结 `wordcard_tpl.js` 与 `gen_auto.py` 的裸跑批量生成逻辑，将其降级为仅用于结尾总结页的底层排版辅助函数。
   * 单个场景（Scene）中，纯静态文字框（`wbtext`）独立出现的时长占比不得超过总时长的 $25\%$。
2. **严禁“无认知映射的贴图摆拍”**：
   * 调用 `v5/sprites/cast/*.webp`（如 `l_cake0~2`、`bus0~2`、`car_in0~2`、`l_bed0~2`）时，角色动作必须直接映射为**语法结构变形**或**空间意象图式（Image Schema）**，严禁为了画面热闹而让小人无意义地走位或切换静态帧。
3. **严禁“无冲突平铺直叙”**：
   * 废除“先抛语法术语/规则定义 $\rightarrow$ 再列举 $3$ 个例句”的教科书套路。所有脚本前 $5\sim 8\text{ s}$ 内必须建立**反直觉痛点**或**中英认知冲突**。
4. **严禁“单幕快餐化模块”**：
   * 除极个别独立冷知识彩蛋外，所有核心语法（`hd_g01`～`hd_g40`）、词源音变法则（`wo_rule_*`）、零基础中英对比（`ze_*`）专题，严禁仅停留在 `_1.js` 单幕状态，必须按本规范第四章扩充为 $3\sim 4$ 幕纵深序列。

---

## 二、 内容叙事 SOP：四步顿悟剧本法（4-Step "Aha!" Storyboard）

所有场景脚本的设计交接（`DESIGN_HANDOFF.md`）必须按以下四幕戏剧结构编写，缺一不可：

### 2.1 标准叙事时间轴与认知职能

| 叙事阶段 | 时长占比 | 核心认知职能 | 画面与台词强制规范 |
| :--- | :--- | :--- | :--- |
| **Step 1: 认知冲突 (The Hook)** | $15\%$ ($5\sim 8\text{ s}$) | 打破固有直觉，制造悬念痛点 | 严禁出现任何语法术语；必须通过中式英语翻车现场、字面意思与实际含义的荒诞反差、或词源历史谜题开场。 |
| **Step 2: 底层机制 (The Mechanism)** | $45\%$ ($18\sim 25\text{ s}$) | 揭示母语者心智模型与演变物理过程 | 必须调用 `concept.js` 动态矢量推演组件（空间向量、边界容器、时间轴缩放、字母裂变），将抽象规则转化为物理视觉运动。 |
| **Step 3: 跨域迁移 (The Transfer)** | $25\%$ ($10\sim 15\text{ s}$) | 一理通百理融，触发“顿悟时刻” | 保持画面中央的**同一个几何图式/底层模型不变**，快速切换 $3$ 个跨场景高频例句，证明无需死记硬背即可秒杀一串难点。 |
| **Step 4: 脑洞锚点 (The Punchline)** | $15\%$ ($5\sim 8\text{ s}$) | 互动反推与视觉记忆定格 | 给出一个趣味视觉残局或反推挑战，停顿 $2\text{ s}$ 引导学习者预判结果，并与课后测试（`gen_module_quiz.py`）形成闭环。 |

### 2.2 剧本重构正反例对照（以 `fp_boundedness` 名词可数性为例）

* **❌ 旧版劣质流水线写法（禁止通过）**：
  * **画面**：白板弹出标题“可数名词与不可数名词”，左边放一个苹果贴图，右边放一杯水贴图，下方罗列 `apple / water / coffee / work` 单词卡。
  * **台词**：“今天我们学习名词。苹果可以数，叫可数名词；水不能数，叫不可数名词。请大家背诵以下不可数名词表……”
* **✅ 新版 SOP 四步顿悟写法（强制标准）**：
  * **[Step 1: 冲突]** 画面左侧语法书上写着 `coffee = 不可数（打叉 -s）`，右侧咖啡馆里老外却对着店员比出两根手指：`Two coffees, please!` 画面中央弹出大问号：“语法书说 `coffee` 不可数，为什么老外天天加 `-s`？”
  * **[Step 2: 机制]** 咖啡壶倒出漫无边际的褐色流体（无界 Unbounded，无法计数 $\infty$）；此时天上掉下两个带发光激光边框的咖啡杯（容器赋予物理边界 Bounded），流体装入边框瞬间，杯子上方自动弹出一枚具象数字角标 `$1, 2$`。揭示核心心智：**可不可数不看物品本身，而看母语者脑中是否有“边界框”！**
  * **[Step 3: 迁移]** 保持屏幕中央的“激光边界框”组件不变：
    1. 漫天飘散的劳作汗水 = `work`（无界）；装进画框变成一件艺术品 = `a work of art`（有界）！
    2. 漫长流逝的岁月长河 = `time`（无界）；被快门切下的一次次闪光快照 = `three times`（有界）！
  * **[Step 4: 锚点]** 画面出现一整只完整的小鸡（有边界框）与一盘切碎的鸡肉块（无边界框），提问：“哪一个是 `a chicken`，哪一个是 `chicken`？”

---

## 三、 动画视觉与引擎开发规范：三层动态推演架构

为彻底解决“动画无深度”问题，`v5/scenes/*.js` 严禁只在一个平面上摆文字和静态小人。所有场景必须实现**“具象物理层 $\rightarrow$ 几何图式层 $\rightarrow$ 符号变形层”**的三层联动：

### 3.1 视觉分层映射表

```
+-----------------------------------------------------------------------+
| Layer 3: 语言符号变形层 (Linguistic Morphing Layer)                   |
|   - 字母路径裂变 (P -> F)、词缀磁吸拼装、句法卡槽排斥与降级齿轮       |
+-----------------------------------------------------------------------+
                                   ▲ 视觉演化映射
+-----------------------------------------------------------------------+
| Layer 2: 认知几何图式层 (Cognitive Image Schema Layer) [核心引擎层]   |
|   - 容器边界框 (Container)、力动力学箭头 (Force Vector)、时间轴缩放器 |
+-----------------------------------------------------------------------+
                                   ▲ 抽象提炼
+-----------------------------------------------------------------------+
| Layer 1: 具象物理情境层 (Concrete Physical Layer)                     |
|   - cast/*.webp 角色动作、物理碰撞、历史地图迁徙、发音器官气流剖面    |
+-----------------------------------------------------------------------+
```

### 3.2 `v5/lib/concept.js` 必选核心组件接口规范

开发人员在编写场景脚本时，必须优先调用以下 5 类标准化动态概念组件，严禁手写死板的静态 `wbtext` 替代：

1. **`concept.morphLetters(fromWord, toWord, ruleType, duration)`**
   * **用途**：词源音变（`wo_grimm_*`, `wo_rule_*`）与构词法（`hd_formation_*`）。
   * **效果**：支持发音部位气流冲击波动画，使源字母（如拉丁语 `pater` 的 `P`）发生 SVG 路径弯曲或断裂，平滑变形为目标字母（英语 `father` 的 `F`），并高亮保留不变的辅音骨架。
2. **`concept.schemaContainer(state, contentSprite, label)`**
   * **用途**：短语动词（`vv_in/out/off`）、介词空间网络、可数与不可数有界性（`fp_boundedness`）。
   * **效果**：绘制动态虚线/实线容器边界，支持 `enter`（刺入）、`exit`（突破边界弹出：`take out`）、`expand`（内部绽放显露：`come out`）、`deplete`（能量条归零耗尽：`run out`）四种连续物理形变状态。
3. **`concept.syntaxSlotMachine(mainTrack, subTrack, conflictMode)`**
   * **用途**：五大基本句型（`five_patterns`）、一山不容二虎（`fp_one_king`）、中英竹节与树状对比（`bamboo_tree` / `ze_*`）。
   * **效果**：将主句谓语槽设计为带唯一皇冠的供电卡槽；当第二个原形动词强行塞入时触发红色电弧排斥震动（`conflictMode: true`），随后演示通过加装 `to`（导向箭头挂钩）或 `-ing/-ed`（降级齿轮）平滑挂入从属分支轨道。
4. **`concept.timelineCamera(tenseType, focusWindow, distanceOffset)`**
   * **用途**：16 种时态演练（`hd_g*`）、视角缩放（`fp_zoom_focus`）、心理距离原则（`fp_distance`）。
   * **效果**：提供可推拉摇移的导演取景框。例如讲过去进行时，取景框推近放大（Zoom In）到过去某一秒内部，展示未闭合的流体波浪；讲一般过去时，取景框拉远（Zoom Out），将该事件压缩为一颗带封闭外壳的固态胶囊。
5. **`concept.contrastSplitScreen(leftConfig, rightConfig, diffHighlight)`**
   * **用途**：易混语法与词汇边界辨析（所有模块的 `*_3.js` 场景）。
   * **效果**：左右或上下同屏同步播放两个微差句型（如 `stop to smoke` vs `stop smoking`），自动在动作转折点高亮碰撞差异。

---

## 四、 模块纵深重构标准：从“单幕快餐”升级为“四幕剧结构”

针对当前仓库中 `hd_g01`～`hd_g40`（30 个单幕模块）、`wo_rule_*`（16 个单幕模块）、`ze_*`（11 个单幕模块）内容单薄的问题，强制推行**“四幕纵深扩充标准（4-Scene Deep-Dive Architecture）”**：

### 4.1 统一四幕文件命名与职责规范

| 幕次文件 | 场景定位 | 必须解决的深度问题 | 强制使用的视觉组件 |
| :--- | :--- | :--- | :--- |
| **`[module]_1.js`** | **破障篇：起源与中英冲突** | 为什么中文没有这个现象，而英语非要这样设计？或者它在历史上是怎么来的？ | 中英双思维轨道对比 / 历史地图演变 |
| **`[module]_2.js`** | **建模篇：核心公式动态推演** | 支配该语法/词源变化的唯一底层物理模型是什么？ | `syntaxSlotMachine` / `schemaContainer` / `morphLetters` |
| **`[module]_3.js`** | **边界篇：极易混淆点双屏辨析** | 换一个词或换一种时态，母语者脑海里的画面到底发生了什么微妙变化？ | `contrastSplitScreen` 双屏同步对比 |
| **`[module]_4.js`** | **炼金篇：真实交际与写作升格** | 在地道口语（`hd_oral`）和高分写作（`writing_alchemist`）中如何活学活用？ | 语境情绪温度计 / 句子复杂度折叠与展开动画 |

### 4.2 重点薄弱模块改造样板清单

1. **词源音变法则系列 (`wo_rule_*`，原 16 个单幕 $\rightarrow$ 扩充为 48～64 幕)**：
   * 以元音大推移 `wo_rule_gvs` 为例：
     * `wo_rule_gvs_1.js`：**拼写化石之谜**——为什么英语元音字母 `a, e, i, o, u` 的读音和欧洲大陆所有语言都对不上？（引出印刷术定型与发音偷偷跑偏的时间差冲突）。
     * `wo_rule_gvs_2.js`：**口腔多米诺骨牌**——动态口腔剖面图演示长元音舌位像多米诺骨牌一样集体向上推高，最高位的 `/iː/` 和 `/uː/` 无处可去，被迫裂变为双元音 `/aɪ/`（`bite`）和 `/aʊ/`（`house`）。
     * `wo_rule_gvs_3.js`：**同源词破案现场**——用大推移规律一键解释为什么 `divine`（`/aɪ/`）变成名词 `divinity`（`/ɪ/`）、`sane`（`/eɪ/`）变成 `sanity`（`/æ/`）时发音大变。
2. **短语动词矩阵 (`vv_*`，原机械 2 幕 $\rightarrow$ 升级为意象图式全网打通)**：
   * 改变过去按动词孤立切分的碎片化模式，新增以介副词空间向量为核心的总纲场景（`vv_schema_out.js`、`vv_schema_up.js`、`vv_schema_off.js`、`vv_schema_over.js`），将物理位移 $\rightarrow$ 视觉显隐 $\rightarrow$ 数量增减 $\rightarrow$ 状态完结四层隐喻链条一次性打通。

---

## 五、 专题内容扩充矩阵与路线图（Topic Expansion Matrix）

针对“相应专题内容太少”的短板，按以下四大工程包分阶段扩充题库与脚本：

### 5.1 【一词多义辐射网专题 `hd_poly_*`】从 17 个扩充至 64 个核心词条
废除原按年级零散编号（如 `g1_002`, `g2_080`）的做法，按**人类认知隐喻四大域**重构目录，每个词条必须绘制一张动态生长的**“树状/放射状多义辐射图（Radial Polysemy Map）”**：

* **Domain A：手部抓握与施力域（16 词）**：`hold`, `keep`, `catch`, `draw`, `take`, `put`, `set`, `lay`, `strike`, `hit`, `press`, `push`, `pull`, `bear`, `carry`, `pick`。
* **Domain B：空间运动与轨迹域（16 词）**：`run`, `pass`, `fall`, `drop`, `rise`, `raise`, `follow`, `lead`, `stand`, `sit`, `turn`, `roll`, `break`, `cut`, `cross`, `reach`。
* **Domain C：身体部位与感知域（16 词）**：`head`, `face`, `eye`, `hand`, `back`, `heart`, `foot`, `point`, `line`, `side`, `front`, `light`, `clear`, `sharp`, `heavy`, `hard`。
* **Domain D：社会契约与能量交换域（16 词）**：`charge`, `fine`, `board`, `flat`, `spare`, `mean`, `fair`, `right`, `order`, `term`, `issue`, `matter`, `count`, `match`, `suit`, `fit`。

### 5.2 【词源、神话与文明史专题 `wo_*`】从 5 个扩充至 30 个深度专题
* **A 组：十二大高频词根裂变剧场（12 专题 $\times$ 3 幕）**
  * `wo_root_spect`（看：占卜观鸟 `auspicious` $\rightarrow$ 透视 `perspective` $\rightarrow$ 幽灵 `specter`）
  * `wo_root_ject`（扔：物理抛射 `project` $\rightarrow$ 心理排斥 `reject` $\rightarrow$ 垂头丧气 `dejected`）
  * `wo_root_tract`（拉：拖拉机 `tractor` $\rightarrow$ 抽离具象 `abstract` $\rightarrow$ 合同契约 `contract`）
  * `wo_root_pend`（挂与称重：古罗马天平称金子付款 `spend/expensive` $\rightarrow$ 脑中反复权衡 `pensive`）
  * 以及 `dict`（说）、`duc`（引）、`fer`（拿）、`press`（压）、`pos`（放）、`cap`（抓）、`clud`（关）、`scrib`（写）。
* **B 组：跨学科文明与科学史词源（18 专题）**
  * **货币与贸易史**：`wo_civ_salary`（古罗马盐饷与生命之盐）、`wo_civ_pecuniary`（牛羊即财富与 `capital` 牛头计数）、`wo_civ_bankrupt`（文艺复兴佛罗伦萨被砸碎的钱庄长凳）。
  * **天文学与医学史**：`wo_sci_disaster`（占星术里背离星辰的灾祸）、`wo_sci_influenza`（星体神秘流体对人体的影响）、`wo_sci_vaccine`（詹纳医生与母牛 `vacca` 天花传奇）、`wo_sci_quarantine`（威尼斯黑死病隔离四十天 `quaranta`）。
  * **餐桌上的阶级史（深化诺曼征服）**：`wo_civ_norman_table`（盎格鲁农民养的 `pig/cow/sheep/deer` vs 诺曼贵族餐桌上的 `pork/beef/mutton/venison`）。

### 5.3 【第一性原理统领语法工程 `fp_*` $\rightarrow$ 挂载 `hd_g01~g40`】
在现有 6 个第一性原理基础上，新增 4 个核心心智模型，凑齐**“英语十大第一性原理”**，并在菜单配置（`patch_menu_grammar.py`）中将 `hd_g01`～`hd_g40` 全部重构为这十大原理的子应用节点：
1. `fp_boundedness`（有界与无界）$\rightarrow$ 统领名词可数性、冠词、完成时与进行时。
2. `fp_vectors`（空间向量图式）$\rightarrow$ 统领全部介词与短语动词 `vv_*`。
3. `fp_one_king`（单核驱动与降级）$\rightarrow$ 统领非谓语动词、三大从句、独立主格。
4. `fp_zoom_focus`（镜头缩放与取景）$\rightarrow$ 统领时态体貌（Aspect）差异。
5. `fp_iconicity`（象似性原则：距离即关系）$\rightarrow$ 统领多个形容词排序（OPSACOMP）、定语前置与后置。
6. `fp_economy`（省力与经济原则）$\rightarrow$ 统领省略句、代词指代、形式主语/形式宾语 `it`。
7. **[新增] `fp_distance`（心理距离映射原则）** $\rightarrow$ **時間距离 = 社交礼貌距离 = 现实真假距离**，一举打通一般过去时、情态动词委婉语（`Could/Would`）与全部虚拟语气！
8. **[新增] `fp_info_flow`（信息流追光灯：旧信息 $\rightarrow$ 新信息）** $\rightarrow$ 统领被动语态、`There be` 句型、强调句与完全倒装。
9. **[新增] `fp_force_dynamics`（力动力学：施力、阻力与使役）** $\rightarrow$ 统领情态动词推测梯度（`must/may/can`）与使役动词（`make/have/let/get`）。
10. **[新增] `fp_figure_ground`（图形与背景分离）** $\rightarrow$ 统领主从复合句的主次信息分配与状语从句逻辑。

### 5.4 【自然拼读与构词解码 `hd_phonics_*` & `hd_formation_*`】
* `hd_phonics_*` 从 4 幕扩充至 **16 幕完整进阶链**：涵盖短元音闭音节守门员、Magic E 跨栏赋能、元音团队（Vowel Teams）、Bossy R 变声控制、辅音二合字母（Digraphs）化学融合、音节切分四大刀法、弱读央元音（Schwa `/ə/`）减负规律。

---

## 六、 自动化质检门禁（CI/Audit Pipeline）与验收 Checklist

为防止修改后的代码再次退化为“应付指标的敷衍补丁”，需同步改造 `docs/whiteboard/src/` 下的自动化审查脚本：

### 6.1 自动化脚本拦截规则升级（`src/insightcheck.py` & `src/gatecheck.py`）

| 检查项 | 对应脚本 | 升级后强制通过阈值（Gate Threshold） | 未达标处置 |
| :--- | :--- | :--- | :--- |
| **动态推演占比 (Dynamic Ratio)** | `iconic.py` / `insightcheck.py` | 场景内调用 `concept.*` 动态矢量变形、位移、力场或分屏对比的时长占比必须 $\ge 60\%$；纯静态 `wbtext` 占比必须 $\le 25\%$。 | 判定为 `Grade D`，阻断构建 |
| **多幕纵深完整度 (Multi-Scene Gate)** | `gatecheck.py` | `hd_g*`、`wo_rule_*`、`ze_*` 每个专题目录下子场景数量必须 $\ge 3$ 个（含冲突、建模、辨析）。 | 触发 `IncompleteModuleError` |
| **四步顿悟结构锚点 (Aha! Structure)** | `insightcheck.py` | 脚本 AST 解析必须包含显式的阶段注释标记：`// @step1_hook`, `// @step2_mechanism`, `// @step3_transfer`, `// @step4_punchline`。 | 拒绝合入主分支 |
| **术语黑名单过滤 (Jargon Filter)** | `jargoncheck.py` | 在 `// @step1_hook` 与 `// @step2_mechanism` 前半段严禁直接裸露“非谓语、过去分词作状语、虚拟语气、定语从句”等生硬术语，必须先有视觉隐喻后给命名。 | 扣减 `scene_grades.csv` 评级 |

### 6.2 场景上线前人工/AI 联合走查表（Pre-Commit Checklist）

每次提交新场景或重构 PR 前，作者必须在描述中逐项打钩确认：

- [ ] **静音看懂测试（Mute Test）**：关掉声音或字幕只看白板动画，学习者能否仅凭画面里的箭头、边界框、字母变形和对比看懂核心逻辑？
- [ ] **前 5 秒抓人测试（5-Second Hook）**：开篇第一句话是否颠覆直觉或直击痛点？（严禁出现“今天我们来学习……”）。
- [ ] **唯一视觉隐喻贯穿（Single Schema Consistency）**：整幕动画是否围绕 1 个核心视觉模型展开，并在 Step 3 中用同一个模型连续解释了至少 3 个看似无关的语言现象？
- [ ] **例句真实与去重验证（Corpus & Dedup Check）**：所有例句是否已通过 `DUP_SENTENCES_REPORT` 查重，且全部来自真实高频口语或经典文化语境？
- [ ] **多幕承接连贯性（Scene Continuity）**：`_1.js` 到 `_4.js` 之间是否有清晰的认知递进，而非把同一套单词卡片拆成 4 页？