# 构建报告 · T11 sentence 家族（原理④ 单核谓语）4 幕

- 构建方：sentence 家族子代理（本轮）；模型本体未动（`model/sentence.yaml` 无改动，主 HTML 未动，runbook 未动，未推送）。
- 先行状态说明：本家族在上一轮 T11 中已由模型生成并通过独立审查（`updates/T11c.review.md`：sentence 4 幕全部通过，高 0 / 中 0 / 低 3）。
  本轮不是从零重建，而是在已审通过的版本上补齐本轮标准缺口：spec 头纲领声明、语义标签 + 构建期断言、
  T11c 低问题 L1/L3 的文案修复，并重新生成、重新打包、重新量测取证。
  本轮改动随并行会话的提交 `6514186` 入库（非本子代理提交；本代理未执行 commit/push）。

## 逐幕状态

| 幕 | 机制 | 模板（旧模板改写） | spec | 生成产物 | HTML | 状态 |
|---|---|---|---|---|---|---|
| 1 一个分句一个王（旗舰幕） | 4-1 单核谓语 | `ze_be_1.js`（见模板说明） | `model/specs/sentence_1.yaml`（63 条 items） | `v5/scenes/gen_sentence_1.js` | `your_files/gen-sentence-1.html`（1,060,983 bytes） | ✅ 通过 |
| 2 第二个动词跟谁走 | 4-2 动词决定搭配 | `fp_one_king_2.js` | `model/specs/sentence_2.yaml`（65 条） | `v5/scenes/gen_sentence_2.js` | `your_files/gen-sentence-2.html`（1,146,639 bytes） | ✅ 通过 |
| 3 时态只标一次 | 4-3 do-support | `fp_one_king_3.js` | `model/specs/sentence_3.yaml`（55 条） | `v5/scenes/gen_sentence_3.js` | `your_files/gen-sentence-3.html`（1,227,414 bytes） | ✅ 通过 |
| 4 五副骨架搭句子 | 4-4 五大句型骨架 | `fp_one_king_4.js` | `model/specs/sentence_4.yaml`（68 条） | `v5/scenes/gen_sentence_4.js` | `your_files/gen-sentence-4.html`（1,212,260 bytes） | ✅ 通过 |

- 模板说明（第 1 幕）：任务列出的候选含 `fp_one_king_2/3/4` 与 `five_patterns_1–5`；第 1 幕沿用 T11 已审通过的
  `ze_be_1.js`，因原 `fp_one_king` 案例 1 已迁入中英对照枢纽（spec 头注明的 INVENTORY  lineage），且该骨架的
  be/中文照搬前置段正是 T11c 审查通过的版本。本轮未改动其内容结构，仅补纲领头与断言；是否改回
  `fp_one_king_2` 骨架，请父代理裁定（改动成本：ITEMS 全量重排 + 重新审查）。
- 模板说明（第 2–4 幕）：与机制一一对应：`fp_one_king_2`（第二个动词穿马甲）→ 4-2；
  `fp_one_king_3`（徽章/侍卫）→ 4-3；`fp_one_king_4`（五副骨骼）→ 4-4。`fp_one_king_1` 仓库缺失，未使用。
- 精灵库补齐：旧模板引用的 `sprites/fk2.js`、`fk3.js`、`fk4.js` 在仓库中缺失（仅被引用，无文件），
  直接打包会失败。本轮用 `sprites/build_sprites.py` 从 `sprites/cast/` 现成帧重建：
  fk2（l_w0/l_w1/l_w2/l_read）、fk3（+l_goout/kick0-2）、fk4（bird_up/bird_down/m_pass/l_read/mom_gift）。
  该目录 `*.js` 被 `.gitignore` 忽略，故文件存在于工作区但不入库；后续全量重建需先确认精灵库在位。
- 生成器：`model/gen_scene.py` 未改动（items 模式已支持本轮全部需求：ITEMS 替换、autoBuild 标题替换、replace 对齐）。

## 本轮改动清单（相对 T11c 已审版）

1. 4 份 spec 头补纲领声明：`insight.domain = dom-constructions`；
   `coManaged = dom-grammar（g40：一个分句一个限定动词；动词后接形式）`；各幕机制 4-1～4-4。
2. 4 份 spec 补 `tags`（语义标签）+ `assertions`（构建期断言）；新增检查器
   `model/check_sentence_assertions.py`（断言只引用标签，不认裸坐标；另验 teaches 记录 ID 存在于模型）。
3. T11c 低问题修复：L1——第 2 幕板书「马甲 2：doing」→「doing：enjoy 一家」（消除 to/doing 系列编号暗示）；
   L3——第 4 幕议程条「④ 双宾 · 宾补」→「④ 双宾 · ⑤ 宾补」（与板书编号粒度一致）。
   L2（旁白横幅英文断字）属引擎模板层，未在本轮动引擎，列为 P2 观察项。
4. 其余台词、例句、口诀、预测题一字未动（生成产物 diff 仅上述 2 行）。

## 验证证据

### 模型校验与生成

```
cd docs/whiteboard/model && python3 validate.py
# ✓ 全部校验通过（sentence.yaml：4 概念 / 9 主张 / 15 例证 / 1 例外 / 3 口诀）
for n in 1 2 3 4; do python3 gen_scene.py specs/sentence_$n.yaml; done
# ✓ 生成 gen_sentence_1.js（63 条）/ _2（65 条）/ _3（55 条）/ _4（68 条）；事实表 factsheets/gen_sentence_N.md 同步导出
python3 check_sentence_assertions.py
# ✅ gen_sentence_1：断言全过 / ✅ _2：断言全过 / ✅ _3：断言全过 / ✅ _4：断言全过
```

断言覆盖（每幕）：旧措辞零残留（「一个句子一个王」「一山不容二虎」「想做穿 to，在做穿 -ing」
「侍卫拿令牌」「令牌守恒定律」「三件马甲」「先搭骨架再挂花」「be 和 do 不同堂」在生成产物中零命中）；
口诀/判据逐字在屏；第 1 幕预测在揭晓之前；第 2 幕 used-to 例外、was broken / have washed 双格在屏；
第 3 幕 be 边界与否定错误示范在屏；第 4 幕五副模型例句逐字在屏、第六种/there be 仅作覆盖提醒。

### 打包（build.mjs）

```
cd docs/whiteboard/v5
WB_FONTS=$HOME/workspace/wb-fonts PATH=$HOME/workspace/bin:$PATH node build.mjs scenes/gen_sentence_1.js ~/workspace/your_files/gen-sentence-1.html "👑 一个分句一个王 · 1"
WB_FONTS=$HOME/workspace/wb-fonts PATH=$HOME/workspace/bin:$PATH node build.mjs scenes/gen_sentence_2.js ~/workspace/your_files/gen-sentence-2.html "👑 第二个动词跟谁走 · 2"
WB_FONTS=$HOME/workspace/wb-fonts PATH=$HOME/workspace/bin:$PATH node build.mjs scenes/gen_sentence_3.js ~/workspace/your_files/gen-sentence-3.html "👑 时态只标一次 · 3"
WB_FONTS=$HOME/workspace/wb-fonts PATH=$HOME/workspace/bin:$PATH node build.mjs scenes/gen_sentence_4.js ~/workspace/your_files/gen-sentence-4.html "👑 五副骨架搭句子 · 4"
# 4 幕全部打包成功（字节数见上表；HTML <title> 用带编号的标题，幕内标题板用 spec 原标题）
```

### insightcheck（官方口径 + 直接量测）

官方命令（`tools/run_insightcheck_gen.py` 改 `--only` 为四幕后运行）：

```
强制检查 0 幕（v6 / 决策 38；口语 oral.js 幕为抽样），其余场景文件只报告不拦
insightcheck 不合格 0
```

**诚实说明：这个 0 是空集的 0，不是通过。**官方强制集只含直接 import `../lib/concept.js` 或 `./oral.js`
的幕；autoBuild 幕 import 的是 `./auto.js`，不在强制集内，`--only` 也筛不到它们（`run_insightcheck.py`
硬编码 boundedness 的问题同理：参数化后仍筛不到 autoBuild 幕）。因此本轮另用同口径直接量测脚本
`~/workspace/tools/measure_sentence.py`（页面报错、时长、24 帧文字面积，文字口径与 insightcheck 相同）：

| 幕 | 时长 | 文字面积最大（≤40% 为限） | 页面报错 |
|---|---|---|---|
| gen-sentence-1 | 189.4s | 13% | 0 |
| gen-sentence-2 | 212.9s | 13% | 0 |
| gen-sentence-3 | 175.5s | 12% | 0 |
| gen-sentence-4 | 160.4s | 14% | 0 |

结论：四幕 0 报错、文字面积远低于 40% 上限；但 autoBuild 幕无 `__WB5_INSIGHT__`（啊哈卡/预测停顿
机器指标不适用），预测停顿的存在性由人工核对 items 顺序保证（每幕预测题在揭晓之前，见断言 order 项）。

### 关键帧截图结论（/tmp/shots_sentence/，每幕 6 帧，共 24 帧）

抽查目视帧：S1 f25（王座/两个核心打架板）、S1 f65（She likes / I know / 并列句三例同板 + 朗读字幕）、
S1 f97（洞见金句卡）、S2 f45（doing：enjoy 一家板，L1 修复在屏）、S3 f65（不能说错误式 + be 边界 + 踢球角色）、
S4 f25（SV 板 S/V 方块）、S4 f85（预测揭晓第 ④ 副 + 送礼角色）。结论：无文字重叠、无溢出、无角色缺失；
S2 f45 的写字笔为进行中动画笔触，非缺陷。其余 17 帧未逐帧目视，仅确认截图生成成功与量测值正常。
截图存于 /tmp（临时证据，不随仓库入库）；如需基线入库，请父代理指定位置后重拍归档。

## 存疑项与缺口

- 模型存疑项：`sentence.yaml` 内无存疑标记项；唯一例外 `st-xc-used-to` 已在第 2 幕双通道上屏（旁白 + ⚠️ 板书）。
- Q4 未展开项：带必备状语的第六种（主谓宾状）仅在第 4 幕覆盖提醒行登记（旁白 + ⚠️ 板书各一次），
  未展开新讲法；there be 存现句同样仅作提醒。五副名单内无第六副。
- 口径说明（需父代理知晓的三处判断，均未藏匿）：
  1. 第 1 幕 be/中文照搬前置段属 ze_be 枢纽域既有内容，不在 `sentence.yaml` 内；核心判据（单核条、树干画面、口诀）
     逐字引模型记录。本轮保留 T11c 已审版，未改写。
  2. 第 2 幕 want 一家的例示含 plan、hope（模型未逐词枚举，属规则例示而非新主张）；hope 预测题沿用 T11c 已审版。
  3. 第 3 幕预测题 `Does Tom play football?`、第 4 幕预测题 `She gives me an apple.` 为模型例证句式的派生应用
     （换主语/动词、gave→gives），已在 spec 头明示，不引入新主张。
- 物理动作审查：四幕均为语法讲解，无切分/倒水/装杯/撕纸类物理动作，`model/refcards/`（pour/cut/fill_cup/tear）
  不适用；无因果道具断言项。角色动作仅为 cast 姿态帧（走/踢/送礼），无流体与守恒类断言需求。
- 未完成项：① 第 1 幕儿童误读探针试看未执行（需试看者，见下）；② 本轮改动的独立逻辑审查签字未做
  （改动仅 2 处文案 + 元数据，T11c 审查针对上一版，建议复审时抽查）；③ L2 横幅断字为模板层观察项。

## 第 1 幕（旗舰幕）儿童误读探针（REWRITE_TECH_PLAN §6 第 7 项）

探针已编写，未执行试看；通过后入库为回归探针，后续改动复跑。执行方式：试看者（目标年龄段儿童；
无条件时由未参与编写的成人按儿童视角复述）看完一遍后复述判据并回答；复述说反或任一探针答错即不通过。

- 复述判据题：「用自己的话说：一个句子里什么时候可以有两个动词国王？」
  通过标准：答出「先数分句」——两个动词分属两个分句时可以（如 I know he likes it.）；只说「一句一位」即不通过。
- P1（分句计数）：「I know he likes it. 里面有几位国王？为什么一句里能有两位？」
  期望：两位；know 管主句，likes 管宾语从句——两个分句各一位。
- P2（并列句迁移）：「I like apples and she likes pears. 这是几个分句、几位国王？」
  期望：两个分句、两位国王；and 两边各一个分句。
- P3（误解驳斥）：「有人说『一个句子只能有一个动词』，对吗？举个例子说明。」
  期望：不对；I know he likes it. 就有两个限定动词 know 和 likes。
- 已知误解点来源：模型 `conflicts`（旧「一个句子一个王」计量错位）+ 审查观察（儿童易把国王数等同于句子数）。

## 续接点

1. 父代理裁定：第 1 幕是否保留 `ze_be_1.js` 骨架（本轮建议保留，理由见模板说明）。
2. 安排第 1 幕误读探针试看（探针已备好，见上）；通过后探针入库，方可算旗舰幕验收通过。
3. 本轮 2 处文案改动的独立逻辑审查抽查（或与下一家族审查合并）。
4. 用户验收本家族后，进入下一家族；P2 模板层事项（L2 横幅断字、insightcheck 对 autoBuild 幕的覆盖）
   不阻塞本家族交付。
5. 注意：本轮文件已随并行会话提交 `6514186` 入库；后续改动请按正常流程提交，不再视为本代理的未提交物。
