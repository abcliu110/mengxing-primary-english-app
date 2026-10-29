# 交接文档：王炸实验室白板动画

> **新模块设计阶段（单词身世 / 格林定律 / 路线图）的交接见 `DESIGN_HANDOFF.md`。**
> 做法和规范见同目录 `SOP.md`。本文只记录**进度、代码位置和每个页签的分镜要点**。
> 用户要求（2026-10-29）：把十二大王炸里还没做完的页签全部按「竹节句 vs 树干句」的样子做成白板动画；直接提交推送 `master`，不新建分支，不反复确认。

## 1. 进度

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

## 2. 代码位置

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

### 引擎通用新工具（2026-10-29，单词身世骨架，经用户同意新增，全 App 可用）
- `k.badges(["📜","💡"], {x,y})`：可信度徽章，默认排在 `header` 副标题后面同一行；`k.badge(key, x, y)` 单个胶囊（可放在卡片、词旁边）。徽章表 `WB.BADGES`：📜 真实词源 / 💡 记忆联想 / ✂️ 简化说法 / ⚠️ 有例外或流行错误说法 / ❓ 有争议。HTML 版：`wbBadgeHtml(keys)`、`wbBadgeLegendHtml()`（在 `wo_hub.js`）。
- `k.egg(x, y, {word, note})`：🥚 彩蛋词标记（手绘小鸡蛋；`note: true` 加一行「彩蛋词：知道就好，不用背」）。HTML 版 `wbEggHtml(word)`。
- `k.say(en, { egg: ["opportunity"] })`：朗读条上在这些词后面显示 🥚（只影响显示，不影响朗读）。
- `k.path(组, 开始, 时长, [[dx,dy], …], {linear})`：沿折线移动（`k.arc` 也新增了第 5 个参数 `{linear}`）。
- `header()` 会记下副标题结束位置 `S.hdrEnd`，给徽章排版用。
- `preview_shots.py` 的时间点可以写秒数：`preview_shots.py wo_port /tmp/out 18s,35s,1.0`。
- 回归：`appwb.py bamboo_tree`、`appfp.py 0` 通过（这些改动不调用随机数，旧案例画面不变）。

## 3. 各页签分镜要点（做之前先看页面原文）

- **③ 格林音变 `vowel_shift`**：写单词 → 圈出变化的字母 → 箭头变形成另一个词（foot→feet、food→feed、safe→save）。术语：元音、辅音、前元音/后元音、清辅音/浊辅音、音标、复数、名词变动词。
- **④ 形容词排座次 `adj_order`**：画一列 8 节车厢（`ADJ_ORDER_CARRIAGES` 的顺序），把例句的形容词一个个放进对应车厢，空的车厢打「—」，最后连成短语；讲「离本质越近越贴名词」。术语：形容词、观点、材质、来源、用途、名词。
- **⑤ 过去式四大门派 `past_clans`**：门派旗子 + 秘诀 → 每个成员「原形 → 过去式」，标出变化的字母；挑 3–4 个成员画完整，其余列表。术语：过去式、规则动词/不规则动词、原形、闭音节、爆破音。
- **⑥ 重音与弱读 `stress_rhythm`**：把单词切成音节方块，重读音节画大圆点，弱读音节写 /ə/；名前动后：同一个词画两次（名词前重、动词后重）。术语：音节、重音、名词、动词、弱读、/ə/、连读、节拍。
- **⑦ 隐喻密码 `metaphor_code`**：简笔画（山脚 foot、钟面 face、河口 mouth、蓝色心情 blue……）+ 字面意思 → 比喻意思。术语：隐喻、字面意思、比喻意思、习语。
- **⑨ 时态矩阵 `tense_matrix`**：画时间轴（过去/现在/将来）+ 「镜头」（快照/录像/留存），标出动作点或线段；写公式和信号词；主语切换 he → plays。术语：时态、时间轴、一般体、进行体、完成体、单三、信号词。
- **⑩ 助动词照妖镜 `aux_transformer`**：写肯定句 → 标出「护卫」→ 否定（not 贴在护卫后）→ 一般疑问（护卫跳到主语前，画弧线箭头）→ 特殊疑问（换疑问词 + 擦掉被问的部分）→ 感叹句。术语：助动词、be 动词、情态动词、肯定句、否定句、一般疑问句、特殊疑问句、感叹句、原形。
- **⑪ 五大句型 `five_patterns`**：骨架方块 S / V / O / P / C 依次搭起来，再把金句的每个词放进骨架。术语：主语、谓语、宾语、表语、补语、及物/不及物动词、系动词、双宾语、介词挂钩。
- **⑫ 作文炼金炉 `writing_alchemist`**：左边 60 分句子 → 进炼金炉（画一个炉子，标出用了哪个公式）→ 右边 100 分句子，把升级的词用颜色圈出来。术语：基础句、高级句型、感叹句、状语、连接词。

## 4. 待确认 / 已知问题

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
