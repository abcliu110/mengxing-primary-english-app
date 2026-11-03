# 借鉴落地：机制三项（闯关壳 A2 / 总地图 A4 / 错题本三分法 B6）

执行：Stewart 2026-11-03 下令；独立克隆 `~/workspace/work-clones/borrow-mech`，基线远端 master `df082c2`；**未 commit、未 push**，等主会话验收。
改动面：仅 `laws-prototype/mengxing-prototype-v1.html` 一个文件，**+441 行 / −0 行**（全部为新增，含 RV `finalize` 内一行挂点）。老 App 原件从 git 历史 `70198e1` 树取读（删除于 `d1c946f`），只读实现与数据结构，未整段复制代码，全部按现行 App 的 section/show()/作用域规矩重写。

## 1. 闯关玩法壳（A2）→ `⚡ 闯关模式 · 闪电战`（新视图 `#v-rush`，`window.MXR`）

- **入口**：复习区顶部 chips 行「⚡ 闯关模式 · 闪电战」。
- **形态借鉴**：老 App v6_hub 三件套的快问快答 + 即时判分 + 逐题推进节奏；题面不再用老题库（GAME_BANKS），按任务规约只调现行 `RV.buildPool()`，抽其中 `kind==='choice'` 的题（实测 225 道可选），每局 10 道随机。
- **规则**：每题限时 15 秒（进度条 + 秒数，超时自动判错）；答对 +10 分，连对 combo 加成 = 第 n 连对多 +(n−1)×2；答错/超时 combo 清零、题目收进错题本；10 题答对 ≥7 过关，结算页给得分/答对数/最高连对/是否过关。
- **判答汇合**：每题判答同时走 `RV.answer()`（盒子进度与复习区一致）与 `MXW.record()`（错题本收录），不改 buildPool 本体；统一题源接口（另一路）扩容后自动受益。
- **存储**：新键 **`mxRushBestV1`** = {best, bestCombo, plays, wins, lastScore, lastRight}。
- **计时器清理**：MutationObserver 监听 `#v-rush` 的 class，离场即清 interval/timeout 并作废对局（仿 PN/AR 先例）。

## 2. 总地图（A4）→ `🗺️ 学习地图`（新视图 `#v-map`，`window.MXM`）

- **入口**：首页卡片（复习区卡后）+ 复习区 chips 行。
- **形态借鉴**：老 App app_map 的三态节点（○ 还没练 / ✓ 练过了 / 🏅 已点亮）+ 分区成组 + 页头汇总；点亮口径本地化定义：节点内 ≥60% 的题在 mxReviewV1 里升到第 3 盒以上 = 🏅。
- **只读聚合，不造数据**。进度可读覆盖（3 个存储源）：
  - **拼读区**：`mxReviewV1` gate 题 → 脊柱 130 站中**有过关词的站逐站成 chip**（分母 = 该站过关词数），另有拼读规律题计入全体口径；
  - **规律练习五区**：`mxReviewV1` 题池按 zone 分组——词汇解码 / 语法 / 小系统 / 表达写作 / 时态站（分母 = 该区题池题量）；
  - **动词区**：`mx_vb_srs_v1`（form/fam/hosp/ta 四池已练数）+ `mx_vb_loop_v1`（今日一课完成/看过站数）——VB SRS 无现成总题数分母，**只报已练数、不编造分母**。
- **未接入如实留灰（8 区）**：词根词缀、词源、代词、冠词、连词、介词、口语、技巧——全 App 只有 5 个 localStorage 键，这些区没有任何会落盘的练习记录，地图标「未接入进度记录」，点 chip 仍可跳进该区。
- 节点点击经 `data-go` 跳对应区。

## 3. 错题本三分法（B6）→ `📒 错题本 · 三分法`（新视图 `#v-wrong`，`window.MXW`）

- **老 App 规则原文**（my_study / recordQuizResult / markCardSelfRating）：每题一条记录 {status, streak, streakDays, wrongCount}；答错 → mistake 且 streak 清零；答对时 streak **按学习日计（同一天多次只 +1）**；mistake 毕业条件 = **streak ≥ 3 且 streakDays ≥ 2**（「跨 2 个学习日连对 3 次消错」）；self_test 可「只测错题本」。
- **本 App 三格**：📕 错题本（答错、连对 0）/ 📗 学习中（订正中、连对 ≥1 未毕业）/ 📘 已掌握（达到跨 2 日连对 3 次，消错毕业）；已掌握再答错回错题本。
- **收录挂点（最小侵入）**：复习引擎判答统一出口 `RV.finalize()` 内加一行 `if(window.MXW) MXW.record(it, ok)`——复习队列、单题练习、回机制再练全部自动覆盖；闯关判答同点汇合。各专区（PN/AR/CJ）页内小测的判答在各区模块内部，未挂（与复习池 H2 的现状一致，如实登记）。
- **存储**：新键 **`mxWrongBookV1`** = {recs: {题key: {st, streak, days[], wrong, first, last, lastDay, law, zone, cause, fam, kind, label}}}。
- **与 mxReviewV1 的关系（不双写冲突）**：mxReviewV1 记 SRS 盒子/到期与它自己的 `wrong` 子账（答对即出本）；本本只记三分状态与消错进度，**从不写 mxReviewV1**；没错过的题答对不收录（那是复习账本的账）。两边只在判答点汇合：在本本里重练时判答照常调 `RV.answer()`，盒子进度照常升降。本本带独立「清空错题本」（只清 mxWrongBookV1）。
- **呈现与重练**：三格页签 + 计数；格内按病因（规律 + 机制 beat）分组，条目带「错 n 次 · 连对 s/3 · 跨日 d/2 天」进度；每条有「练这道」（本视图内重练卡，choice 自动判、build 拼句点选校验、probe/gate/reveal 看答案自评，判答走 RV.answer + MXW 流转）与「↩ 回规律页」（LAW.open / VB.openTA，与复习区回机制同路由）；每格有「▶ 重练这一格」整格会话（对应老 App「只测错题本」）。

## 验证（基线 df082c2 + 本改动）

| 项 | 结果 |
|---|---|
| `tools/check_all.py` | **8/8 全绿**（六 gen --check + morph_sync + upstream) |
| script 块 | 21 个（原 20 + 本模块 1)，`node --check` 语法错误 0 |
| section 开合 | 65/65 → **68/68**（新增 v-rush / v-wrong / v-map) |
| `RV.buildPool()` | **仍 1200**（law 281 / probe 238 / ta 87 / gate 594)，复习队列渲染 20 卡不变 |
| DOM-stub 冒烟 | **45 条断言全过**（明细下表） |

冒烟明细（jsdom，脚本在 /tmp/smoke-env/smoke-borrow.js + smoke-kinds.js）:
- 错题本 A 组 13 条：复习答错 → 自动收录 mistake（wrong=1）且 mxReviewV1.wrong 同步；进错题本视图计数对位；「练这道」订正答对 → 连对 1/跨日 1、流转学习中；伪造 2 个历史日 + 连对 2 后再对 1 次 → 毕业已掌握；已掌握再错 → 回错题本；没错过的题答对不收录。
- 闯关 B 组 16 条：10 题全对跑完一局，combo ×3 时点正确，**结算得分恰为 190**（10×10 + Σ(n−1)×2 = 100+90)、答对 10/10、过关；`mxRushBestV1` 落盘 best=190/bestCombo=10/plays=1/wins=1；全对局错题本零新增。
- 闯关 B2 组 4 条：15 秒超时自动判错出反馈、题目收进错题本、离场后计时器停、回首页正常。
- 地图 C 组 5 条：注入假进度（某站 3/4 过关词且强题占比 75% → 🏅 gold；语法/词汇解码各 1 题；VB SRS 1 项 + loop 完成 1 站）→ 站点 chip 文案、动词节点、未接入留灰、页头汇总逐项对位。
- 题型补测 7 条：错题本重练卡对 build（按 answer_order 点选拼对 → 连对 1）与 probe（看判读要点后自评「做到了」→ 连对 1）均正确判答流转。

注：冒烟中的 `TypeError: Cannot set properties of null (setting 'font')` 为基线既有的 jsdom canvas 伪影（语法图量测代码），与本次改动无关。
