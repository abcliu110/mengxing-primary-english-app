# 交接文档：新模块设计阶段（单词身世 / 格林定律 / 路线图）

> 日期：2026-10-29　｜　阶段：**开始制作**：骨架最小集 + 单词身世总枢 + 示范幕 port 已完成（见 §8）
> 上一阶段（第一性原理总枢 24 幕）见 `first_principles/HANDOFF.md`，已全部完成。

## 1. 文档清单

| 文件 | 内容 | 版本 |
|---|---|---|
| `docs/whiteboard/MODULE_ROADMAP.md` | 全部候选模块 A–Y、骨架、去重、建议顺序 | v0.3 + 决策 |
| `docs/whiteboard/grimm_law/DESIGN.md` | 真正的格林定律：词对表、方案 A / B、4 幕分镜 | v0.1 |
| `docs/whiteboard/europe_culture/DESIGN.md` | 欧洲文化密码：气候、地理、饮食、宗教、神话、历史；词根文化溯源幕；port 示范分镜；品牌和航天里的神话；文化载体五层 | v0.2 |
| `docs/whiteboard/word_origins/DEPTH_AND_ANIMATION.md` | **深度和广度标准、一句话洞见、动作语法、四道验收关、port 逐层对照** | v0.1 |
| `docs/whiteboard/word_origins/DESIGN.md` | 单词身世 10 个方向：借词地图、地名人名、动植物画面、辟谣角、维京与诺曼、字母身世…… | v0.1 |

## 2. 已定决策（用户确认）

1. **合并成「📖 单词身世」大总枢**：欧洲文化密码是其中一章，其余章节是 word_origins 的 10 个方向。首页放世界地图和时间线。
2. **首批示范幕**：port（港口）→ Europe（欧罗巴）→ Bluetooth（蓝牙），按 5 步溯源幕做：地图定位 → 场景还原 → 词族生长 → 现代彩蛋 → 中文对照。
3. **品牌只用文字和自绘简笔**，不使用官方 logo 图片。
4. **不分年级**：小学课标词本来就少。超出课标的词统一标 **🥚 彩蛋词**（知道就好，不用背）。
5. **不专门强化**马来语、闽南语借词，它们按普通借词处理。
6. **骨架最小集**：只先做可信度徽章、🥚 彩蛋词标记、5 步溯源幕模板。练习闭环、按需加载、总地图暂缓（用户说骨架「等会再改」）。
7. **入口放首页**，和第一性原理总枢并列；身世图标不用 🌍（已被「三大主题思维导图」占用）。
8. **用户最关心**：内容的深度和广度、动画怎么实现、能否完美表达深刻含义。标准见 DEPTH_AND_ANIMATION.md（四层：是什么 / 为什么 / 怎么推 / 我会用；四关：静音 / 一句话 / 预测 / 严谨）。
9. **用户的内容理念**：很多英语词和欧洲的气候、地理、宗教、神话有关，解析词根时要讲出背后的场景，并用动画演示。

## 3. 尚未决定

- 格林定律：方案 A（现有 `vowel_shift` 页签改名，去掉「格林」，另开真格林页签）还是方案 B（在原页签加定律 D）？放实验室，还是放进单词身世总枢？
- 路线图总顺序（中英思维对照、小品词 + 核心义动词等）。
- 「欧洲文化 · 美国篇」做不做。
- `origin_tags` / `culture_scene` 字段：给全词库批量补，还是只给有故事的词补？

## 4. 复核 App 现状时的发现（避免重复造轮子）

- 自然拼读**已有**：「王炸 01：自然拼读五大黄金发音法则」「9 步自然拼读阶梯」。拼写潜规则（B）并入它们。
- `stress_rhythm` 法则 C **已覆盖** /ə/ 弱读和连读，所以「连读弱读」模块已取消。
- `confusables` 已有 look / see / watch、borrow 类辨析；`metaphor_code` 已有人体、颜色、动物隐喻；`past_clans` 已有过去式四大门派。
- App **已用** `speechSynthesis`（可以复用到白板朗读开关）和错题本（消错规则：跨 2 个学习日、连续答对 3 次）。
- 词库的 `affix_root` 字段已经有「port (港/运)」家族串记，airport、passport、import、export、important、report、support、transport、sport 都在，方向正确。
- 主 HTML 约 5 MB。大量加新模块之前，要考虑按需加载。

## 5. 严谨性规矩（制作时必须遵守）

- 徽章：📜 真实词源　💡 记忆联想　✂️ 简化说法　⚠️ 有例外 / 流行的错误说法　❓ 有争议
- 每个 📜 条目都要核对 etymonline 或 Oxford，出处记到对应目录的 `SOURCES.md`。
- port：拉丁语 portus（港口）和 portare（搬运）是同源亲戚，不是同一个词。用港口场景串联时，要标 📜 + 💡。
- 宗教内容只作为文化背景讲，口吻中立。
- 和 `fp_iconicity` 并存时，「M 像山」是 💡 联想，「M 来自水波纹」是 📜 历史，两者并排展示。

## 6. 下一步建议

1. 骨架最小集：在白板引擎或 header 加徽章组件和 🥚 标记，再写 5 步溯源幕模板（`fp_props` 风格的共用道具：map、boat、wind 等）。
2. 示范幕 port，接着 Europe、Bluetooth。每做完一幕就提交、推送 `master`，并更新本文档。
3. 单词身世总枢的入口和页面骨架（世界地图加时间线）。

## 7. 本阶段提交

e881d52 → 87edb37 → 151965e → 5415921 → b7272c8 → 085651e → 8d6ddf9 → 1c623ca → 3cae24c → 22efac7 → （本次）


## 英文例句朗读（2026-10-29 完成）

- 规范：`docs/whiteboard/SOP.md` 第 7 节；`word_origins/DEPTH_AND_ANIMATION.md` 6.5 节。
- 引擎：`k.say(en, { zh, word })`；`k.final(text, crown, zhLine, { say, zh, word, noSay })` 自动朗读。舞台下方加 🔊 朗读条（逐词高亮 + 中文字幕，点一下重听），画布变成 960×650。
- App：`wb_app.js` 读到 say 时间点调用 speechSynthesis（语速 0.85），读的时候时间轴停住，最多多等 4 秒；拖动/重播/离开页面会停止朗读；控制条 🔊/🔇 开关（localStorage `wbVoice`）；设备没有声音时按时间估算高亮。
- 覆盖：王炸 10 个页签 39 个案例 + 第一性原理 24 幕，每幕 ≥1 句，共约 150 句；只读正确英文。
- 批量加句子工具：`src/addsay.py <case.js> <spec.json>`（anchor 前加 `>` 表示插在该行之后）。
- 回归：appwb.py 10 个页签、appfp.py 0–5 全部通过，无报错、无 NaN/undefined。
- 待用户真机听：语音选择（en-US）、停顿长度是否合适；bamboo_tree、stress_rhythm、adj_order 每幕目前只有 1 句，可以再补。


## 8. 制作进度（2026-10-29）

| 步骤 | 内容 | 状态 |
|---|---|---|
| 1a | 可信度徽章组件 `k.badges / k.badge`（白板）+ `wbBadgeHtml / wbBadgeLegendHtml`（页面卡片） | ✅ 通用引擎工具，记在 `HANDOFF.md`「引擎通用新工具」 |
| 1b | 🥚 彩蛋词标记 `k.egg`、朗读条 `say({egg})`、`wbEggHtml` | ✅ |
| 1c | 5 步溯源幕模板 + 共用道具 `cases/wo_props.js`：`scene / step`（标题 + 徽章 + ①地图 ②场景 ③词族 ④彩蛋 ⑤中文 🔮预测 进度条）、`shot / sub / back / wipe`（一个镜头一组，结束擦掉）、`map`（手绘地中海，三块大陆分组可动）、`boat / wind / plane / tower / pier / city / crate / scroll / person`、`stamp`（盖章）、`morph`（抖一下 → 交叉淡化变身）、`snap`（前缀飞过来吸附到词根）、`k.path`（沿折线移动，引擎通用）、`hold / finish`（画线整体加速、朗读和思考停顿保持原长、字幕至少停 2.2 秒） | ✅ |
| 2 | 首页入口「📖 单词身世总枢」（在第一性原理总枢横幅下面）+ 总枢页面：世界地图 + 时间线、徽章图例、白板舞台、章节列表（欧洲文化密码 + 10 个方向，未上线的显示「即将上线」） | ✅ `word_origins_hub`；源文件 `src/wo_hub.js`；登记表 `insert_wb.py` 的 `WO_READY`；验收 `src/appwo.py` |
| 3 | 示范幕 port | ✅ 7 个镜头，约 132 秒（画面约 85 秒 + 9 句朗读约 37 秒 + 预测停 3 秒）；出处 `word_origins/SOURCES.md` |
| 4 | 示范幕 Europe、Bluetooth | 见下方「待办」 |

### 新增文件
- `src/cases/wo_props.js`、`src/cases/wo_port.js`、`src/wo_hub.js`、`src/appwo.py`、`word_origins/SOURCES.md`

### port 幕：四层 × 四关自查表（DEPTH_AND_ANIMATION §1、§5、§8）

| 镜头 | 动作 | 深度层 | 朗读 |
|---|---|---|---|
| 1 地图 | 手绘地中海；三块大陆往中间挤一下；medi + terra 吸附 | L2 | The Mediterranean🥚 Sea is in the middle of the land. |
| 2 进港 | 风线推着船沿折线进港；ob + port 吸附 → opportunity🥚 | L1 + L2 | The wind takes the ship into the port. |
| 3 搬运 | 货箱进城 im-、出城 ex-、过海 trans-、信件带回 re-；词根 port 每列位置不变 | **L3** | We import fruit and export tea. / Ships transport food across the sea. / He reports the news to the city. |
| 4 关卡 | 盖章（印记跟着文书走）；旅客穿过关卡；pass + port 吸附 | L1 + L2 | Show me your passport, please. |
| 5 穿越 | 镜头特写 → 帆船抖一下淡成飞机、码头淡成塔台 → 镜头拉远；air + port 吸附 | L3 | We take a plane at the airport. |
| 6 定格 | 中间 port，左港口线 📜、右搬运线 📜，💡「亲戚，不是同一个词」；🀄 港口·进口·出口·口岸（标明对照，不是同源） | **L4** | A port is a door to the world. |
| 7 预测 | sup + port = ？停 3 秒 → support；总结图里的「？」同时换成答案 | **L4** | My friends support me. |

| 关 | 结果 | 说明 |
|---|---|---|
| 🔇 静音关 | ✅ | 货箱往城里走 = import、往船上走 = export、过海 = transport、信件回城 = report；船变飞机 = airport |
| 🗣️ 一句话关 | ✅ | 总结镜头字幕就是洞见句：「港口是罗马世界的大门；一个 port 长出了进、出、穿越、带回、机会」 |
| 🔮 预测关 | ✅ | sup + port = support（停 3 秒再揭晓） |
| 📜 严谨关 | ✅ | 11 条 📜 都在 SOURCES.md 有 etymonline 网址；portus / portare 标 📜 + 💡；中文「口」标明是对照 |
| 🔊 听读关 | ✅ | 9 句，只读正确英文；课标外的词（Mediterranean、opportunity）标 🥚 |

**课标词判断**：以词库 `VOCAB_DB`（G1–G6 + V6 课标关联）里有没有这个词为准。port、airport、passport、import、export、transport、report、support、important、sea、ship、wind、plane 都在；Mediterranean、opportunity、porter、portable 不在 → 🥚。

### 和现有内容重叠的地方（用户 2026-10-29 规则：重复的内容以后要删旧并入新模块；本次**只列出，不删**）
1. `VOCAB_DB` 里 11 个词的 `affix_root`（「👨‍👩‍👧 家族串记：port (港/运) ➔ airport · passport · important · report · sport」）：port、airport、passport、import、export、transport、report、reporter、support、important、sport。airport 的 `etymology` 和 `memory_tip` 也讲了「空中海港」。
2. `WORD_FORMATION_DB.roots` 里的 port 词根卡（构词 → 词根）：写成「拿，运送，港口」一个词根，origin「拉丁词根：把货物运进运出港口」。按 etymonline，港口（portus）和搬运（portare）是两个亲戚词，合并时建议改成「两条线」并加 📜 + 💡。
3. 术语「词源」在 `fp_iconicity` 的术语表里也有一条，说法相近。
4. 第一性原理 ② 字母象形（`fp_iconicity`）里「M 像山」和 word_origins 方向 6「字母的真实身世」（M 来自水波纹）将来会并排出现（§5 已有规定）。
5. ⑤ 向量律（`fp_vectors`）讲 to / from / for 的方向箭头；port 幕里 im- / ex- / trans- / re- 的方向前缀动作和它相通，目前只是画法相近，没有重复文字。
- 另：用户已确认 `vowel_shift`（格林音变律）以后删掉、内容并入新的真格林定律模块；本次没有动。

### 待办 / 不确定
- Europe、Bluetooth 示范幕：见本节下方（做完会更新）。
- port 幕约 132 秒，比 §6 预算的 85 秒长，多出来的主要是 9 句朗读（读的时候画面停住）。如果嫌长，可以去掉镜头 3 的第 3 句或镜头 6 的一句。
- 总枢首页世界地图是简化示意（不按比例），只标了 3 个溯源幕的位置。
- 首页入口做成和第一性原理总枢同宽的横幅，放在它正下方（「并列」理解为上下相邻）。
