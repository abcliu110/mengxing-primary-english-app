# 格林定律模块 · 设计文档（讨论稿 v0.1）

> 状态：讨论中，尚未开工。日期：2026-10-29
> 关联：`王炸 ③ 格林音变律`（tab `vowel_shift`）、第一性原理总枢 `fp_economy` / `fp_iconicity`

---

## 0. 背景与问题

现有页签「王炸 ③ · 格林音变律」（`vowel_shift`，白板标题「格林音变破译机」）讲三条规律：

- 定律 A：元音前移
- 定律 B：形容词 → 名词（元音变短，再加 th）
- 定律 C：清辅音 ↔ 浊辅音（清名浊动）

它的词汇表里已经写明：**只是借用格林的名字**，讲的不是真正的格林定律（Grimm's Law）。
新模块要讲**真正的格林定律**，所以先要解决命名冲突。

## 1. 真正的格林定律是什么

原始印欧语分化成日耳曼语时，一组辅音整体「挪了一格」。
英语的本土词经历过这次变化；从拉丁语、希腊语、法语借来的词没有经历过，还保留着旧的辅音。
所以，同一个词根常常会成对出现：**简单本土词 ↔ 借来的大词**。

| 变化 | 借来的大词（保留旧音） | 英语本土词（已变） |
|---|---|---|
| p → f | pedal 踏板、paternal 父亲的、Pisces 双鱼座 | foot、father、fish |
| t → th | triple 三倍、trio 三重奏 | three |
| k → h | century 世纪、cent 分、canine 犬的、cardiac 心脏的（希腊语） | hundred、hound、heart |
| d → t | dentist 牙医、dual 双的、December（原第十月）、decade 十年（希腊语） | tooth、two、ten |
| g → k | genuflect 屈膝、grain 谷粒 | knee、corn |
| bh → b | fraternal 兄弟的（拉丁语把 bh 读成 f） | brother |
| dh → d | （希腊语 thygatēr） | daughter |
| gh → g | host 主人（拉丁语 hostis） | guest |

**教学定位**：这是**真实词源**，不是记忆联想；要和 `fp_iconicity` 里「M 像山」那类联想明确区分。
**目标年级**：小学五、六年级到初一（借来的大词超出低年级词汇量）。
**核心收益**：认识 foot 就能猜到 pedal；认识 tooth 就能猜到 dentist。用简单词撬动大词。

### 简化与严谨边界
- 只讲 p/t/k→f/th/h、d/g→t/k，再加 bh/dh/gh 三个补充；b→p 的例子太冷门，不讲。
- Verner 定律等例外不展开。father 的 th 读 /ð/ 不细究，只标注「音变不是 100% 整齐」。
- 每个配对都要能在 etymonline 查到；查不到或有争议的例子不用（参照 `fp_iconicity` 删掉 glow 的做法）。
- k → h 的例子里，kn- 不发音（knee）是另一件事，注明即可，不混讲。

## 2. 和现有页签的分工（待定）

- **方案 A（推荐）**：现有 `vowel_shift` 页签改名为「音变破译机（元音前移 · 清名浊动）」，删掉「格林」字样；新开「王炸 · 格林定律」页签，两个页签互相加「延伸阅读」链接。
- **方案 B**：在 `vowel_shift` 里加「定律 D：格林辅音推移」。改动小，但元音、辅音、本土、借词四件事挤在一页里。

## 3. 位置（待定）

- **选项 1（推荐）**：放进王炸实验室，做一个新页签，复用 `WB_LAB` 白板管线和 `insert_wb.py`。
- **选项 2**：作为第一性原理总枢的第 ⑦ 条原理。不推荐：它是一个专题，不是统摄全局的原理。

## 4. 分镜草案（4 幕，引擎 v2）

1. **时光机：辅音挪一格**
   左边写拉丁词，右边写英语词。中间一台「时光机」，字母从左边进去，用 `move`/`arc` 走到右边，同时 `fade` 变身：p→f、t→th、k→h。
   结尾三条变身轨迹并排，组成一张「挪一格」总表。
2. **身体家族**
   复用 `fp_props.person`：脚、牙、心、膝依次高亮，每个部位两边挂标签：foot↔pedal、tooth↔dentist、heart↔cardiac、knee↔genuflect。
3. **数字家族**
   two↔dual、three↔triple、ten↔December/decade、hundred↔century/cent。
   彩蛋：December 是「第十月」（古罗马历以三月开头）。可以和 `fp_iconicity` 的 tw- = two 互相链接。
4. **破译游戏**
   先出大词（pedestrian、dental、canine、paternal），停顿一下，再让简单词 `fade` 浮现，配一句「你其实早就认识它」。
   第二阶段可以改成可点击的小测。

**新道具（候选）**：`timeMachine`（时光机通道）、`pair`（大词 ↔ 小词连线标签）。

## 5. 验收

- 沿用 `appfp.py` / `appwb.py` 思路：每幕都 mounted，无 NaN、undefined 或页面错误。
- 旧页签 `vowel_shift` 和 `bamboo_tree` 截图回归。
- 每个词对都附词源出处，记在 `docs/whiteboard/grimm_law/SOURCES.md`。

---

## 6. 其他候选模块（路线图草案）

| 序 | 模块 | 一句话 | 与现有内容的关系 |
|---|---|---|---|
| 1 | 连读与弱读 | an_apple、can 弱读成 /kən/ | 承接 ① 口腔省力律，可配朗读 |
| 2 | 大元音推移 | 为什么 name、bite 的拼写和读音对不上 | 和格林定律是姐妹篇（元音 vs 辅音） |
| 3 | 英语词汇三层楼 | ask · question · interrogate；cow · beef | 和格林定律共用「本土 vs 借词」 |
| 4 | 不规则复数的来历 | foot→feet、mouse→mice、child→children | 补 `past_clans` 的名词版 |
| 5 | 自然拼读总规则 | magic e、ai/ee/oa、软硬 c/g | 需先确认现有页签有没有覆盖 |
| 6 | 语调地图 | 一般疑问句升调、特殊疑问句降调、列举先升后降 | 等第二阶段朗读开关一起做 |

建议顺序：格林定律（方案 A）→ 连读弱读 → 大元音推移 → 词汇三层楼。

## 7. 待讨论问题

1. 选方案 A 还是方案 B？
2. 放实验室还是放总枢？
3. 目标年级定在五、六年级吗？要不要给低年级做一个只讲 foot/tooth/two 的「轻量版」？
4. 第 4 幕先做纯动画，还是直接做成可点击的小测？
5. 路线图顺序是否认可？
