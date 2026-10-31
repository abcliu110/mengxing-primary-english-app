# T11 · ⑤ 时空家族（spacetime）四幕构建报告

> 任务：只做 spacetime 家族 4 幕；不提交、不改 runbook、不推送、不动模型本体与主 HTML。
> 本报告的构建动作 = 在已提交的 T11d 成果（commit 902cbda、审查 e3ec3a7）之上做的一次
> **按本任务红线复核 + 一处删改 + 全量重验**，不是从零重建。生成器未改（`model/gen_scene.py` 零改动）；
> 模型本体 `spacetime.yaml` 零改动；共享 lib / 引擎零改动；主 HTML 零改动；本子代理无任何 git commit / push。
> 事后状态注（2026-11-01 05:42 JST 核查时发现）：本轮对 specs/gen_spacetime_1.js/factsheet 的
> 未提交改动，被并行会话的 T12 提交 65bad9e（“T12 阶段一完成”）顺带收录——非本子代理提交；
> 本报告文件本身仍为未提交（untracked）状态。工作树另有 sentence_*/hd_phonics_1.js 改动，
> 属并行会话，与本家族无关，本子代理未触碰。

## 0. 本轮相对 T11d 的改动（共 2 类，均未提交）

1. **第 1 幕删除时长定介词旧说法（实质改动 1 行）**：
   T11d 曾把旧说法以“误解出场 + 当场驳斥”身份保留在幕内
   （`有人编了个分法：时间长用 in、一天用 on、时间短用 at。……`）。
   本任务红线为“按时长大小分 in/on/at 的旧说法已被模型废止，**不得进入场景**”
   （模型 superseded 裁决亦为“整段删除”），故将该行整行删除。
   删除后例外段仍完整：`夜很长，却说 at night；早上不长，却说 in the morning。长短推不出来：
   约定单记`——其中“长短推不出来”是否定式表述，取自模型例外注记原意
   （sp-xc-at-night / sp-xc-in-morning 注记“维度长短推不出”），不是映射规则本身。
   如主会话更倾向 T11d 的驳斥式讲法，回退方法见 §7（1 行可逆）。
2. **四幕 spec 头补纲领声明（注释-only，零产物影响）**：
   每幕 spec 头新增一行 `纲领：dom-prepositions（spacetime.yaml insight.domain）`；
   第 1 幕另注明旗舰幕身份与“时长旧说法整段删除”的口径。
   重新生成后 diff 验证：`gen_spacetime_2/3/4.js` 字节零变化，
   仅 `gen_spacetime_1.js` 少 1 行、`factsheets/gen_spacetime_1.md` 1 行措辞同步。
   第 1 幕时长由 T11d 的 203.4s → **195.0s**（删行约 −8.4s，与该行朗读时长一致）。

## 1. 逐幕状态

| 幕 | 标题 | 模型记录（主张 / 例证 / 例外 / 口诀） | 模板 | 时长 | 状态 |
|---|---|---|---|---|---|
| gen_spacetime_1 空间三图式与时间借用（旗舰） | in、on、at：先看图猜一猜 | sp-cl-space-schema、sp-cl-time-borrow；sp-ex-box-table-door、sp-ex-in-room-on-wall、sp-ex-in-2020、sp-ex-on-monday、sp-ex-at-seven；sp-xc-on-foot、sp-xc-at-night、sp-xc-in-morning、sp-xc-tuesday-morning；sp-ch-space、sp-ch-time | fp_vectors_1.js（ACTS get up，精灵 fv1） | 195.0s | ✅ 构建 + 等效校验通过；探针题目已入库（§5），实测待安排 |
| gen_spacetime_2 on/off 贴离主线 | on 贴上 · off 离开 | sp-cl-on-off；sp-ex-put-turn-on、sp-ex-take-turn-off；sp-xc-go-off（硬反例）、sp-xc-off-others；sp-ch-on-off | fp_vectors_2.js（ACTS put on / turn on / take off / takes off / fall off，精灵 fv2） | 164.5s | ✅ 全过 |
| gen_spacetime_3 交通工具记法窍门 | 上车：能站着走用 on | sp-cl-transport；sp-ex-on-bus-train、sp-ex-in-car-taxi；sp-xc-transport-edge；sp-ch-transport | fp_vectors_3.js（ACTS get on / get in / get off / get out of，精灵 fv3） | 147.1s | ✅ 全过（车辆精灵溢出为已知引擎问题，见 §6） |
| gen_spacetime_4 to/from + for 三站 | to、from 与 for 的三站 | sp-cl-for（三站）；sp-ex-gift-for-you、sp-ex-leave-for-beijing、sp-ex-for-two-hours；sp-xc-for-other；sp-ch-for；to/from 两支按模型 superseded 注记保留为上下文 | fp_vectors_4.js（ACTS walk to / go to 等，精灵 fv4） | 166.6s | ✅ 全过 |

红线核查（逐项，见静态断言 A1–A6，脚本 `~/workspace/tools/check_spacetime.py`）：

- **Q1 · for 三站（最重要）**：第 4 幕讲解句、菜单、口诀、金句卡四处均为三站全量
  （“为了谁，奔着哪儿，持续多久”），无两站/一站表述；旧口诀“for 心里想着它”零命中。
- **Q5 · 交通边缘**：第 3 幕只登记“电梯、小船这些不常见的情形，不硬套这个窍门——遇到时
  按习惯说法单独记”，**未断言任何电梯/小船的具体介词形式**（断言 A6 扫描 on a boat / in a lift 等零命中）。
- **旧说法**：时长定介词映射句（本轮删除后）零命中；“原封不动”“同一个道理”
  “第一性原理 / 三维几何向量时空律”“当成平面 / 当成盒子”在四幕产物中零命中。
- **原型图定性**：全幕只称“第一猜测”；第 1 幕金句卡“原型图只管第一猜测，约定俗成的说法单记”。
- **日子锚点判据**：第 1 幕旁白 + 板书 + 预测揭晓三处一致——morning 单独用 in，
  带具体日子改从 day 的 on（on Tuesday morning）。
- **go off 硬例外**：第 2 幕以“和断开正好相反”身份上屏入词，口诀自带“go off 响起来单记”尾巴。
- **五条口诀逐字**：sp-ch-space / sp-ch-time / sp-ch-on-off / sp-ch-transport / sp-ch-for
  与模型原文比对一致（断言 A3）。

## 2. 构建与验证命令（本轮实跑）

```bash
# 模型校验（model 目录）
python3 validate.py spacetime.yaml
# → spacetime: concepts=5 claims=5 examples=12 exceptions=8 chants=5；✓ 全部校验通过

# 生成（model 目录；生成器 items 模式，未改）
for n in 1 2 3 4; do python3 gen_scene.py specs/spacetime_$n.yaml; done
# → gen_spacetime_1.js（54 条）/ _2（52 条）/ _3（41 条）/ _4（54 条）+ factsheets/gen_spacetime_*.md

# 打包（v5 目录）
WB_FONTS=$HOME/workspace/wb-fonts PATH=$HOME/workspace/bin:$PATH node build.mjs \
  scenes/gen_spacetime_N.js ~/workspace/your_files/gen-spacetime-N.html "标题"
# 标题：1“in、on、at：先看图猜一猜” 2“on 贴上 · off 离开”
#       3“上车：能站着走用 on” 4“to、from 与 for 的三站”

# 官方 insightcheck（autoBuild 家族不在强制集内，见下）
python3 ~/workspace/tools/run_ic_spacetime_official.py
# → 强制检查 0 幕 / insightcheck 不合格 0（此 0 为覆盖缺口所致，非实质通过，见 §6）

# 等效校验（复用 insightcheck.py 官方 HOOK 文字面积采样 + 静态断言 A1–A6 + 截图）
python3 ~/workspace/tools/check_spacetime.py
```

## 3. insightcheck 逐幕结果

| 幕 | 官方 insightcheck | 等效校验（页面报错 / 文字峰值 / 时长） |
|---|---|---|
| gen_spacetime_1 | 强制集外，不合格 0（空集） | 0 报错 / 13%（门槛 40%）/ 195.0s ✅ |
| gen_spacetime_2 | 强制集外，不合格 0（空集） | 0 报错 / 15% / 164.5s ✅ |
| gen_spacetime_3 | 强制集外，不合格 0（空集） | 0 报错 / 11% / 147.1s ✅ |
| gen_spacetime_4 | 强制集外，不合格 0（空集） | 0 报错 / 11% / 166.6s ✅ |

等效校验总结果：**不合格 0**。时长均在 40–240s 参考区间内。
环境注：本机默认 Python 原无 playwright，本轮以 `pip3 install --user --break-system-packages playwright`
安装后方能运行浏览器校验（复用磁盘已有 `~/workspace/chrome/chrome-linux64/chrome`，未另下载浏览器）；
此为环境准备动作，未改动仓库。

## 4. 关键帧截图结论（20 帧，`~/workspace/shots_gen/SP{n}_{15,45,70,88,97}.png`）

- **收尾金句卡（97% 帧）四幕齐全**：洞见 + 口诀 + “📦 联想工具箱 ⑤ 介词看图猜”家族标均正确上屏；
  第 1 幕两条口诀、第 2 幕 go off 尾巴口诀、第 3 幕交通口诀、第 4 幕 for 三站口诀与模型逐字一致。
- **第 1 幕 70% 帧**：例外板（on Tuesday morning / on Sunday morning / on foot = 步行（固定习语））清晰；
  同帧可见 autoBuild 引擎固有现象“换板时下一板文字先行书写”（铅笔在写口诀行），
  与 T11b 未决 3 同源，文字本身可读、无遮挡，非本幕引入。
- **第 3 幕 45% 帧**：on 组（bus / train / plane）与 in 组（car / taxi）对照板清晰；
  同帧可见 T11d 已登记的车辆精灵溢出（bus 右部出框），文字不受影响，属模板/引擎层问题（见 §6）。
- 其余帧：无文字遮挡、无出框（除上述车辆精灵外）、演员帧与 ACTS 触发词一致。

## 5. 第 1 幕儿童误读探针（旗舰幕验收，§6 第 7 项）——题目入库，实测待安排

> 判读标准：试看者（目标年龄段儿童；无条件时由未参与编写的成人按儿童视角复述）
> 看完一遍后先复述判据，再答下列探针。复述把判据说反、或任一探针答错，即不通过，
> 归因到台词/画面后修正再测；通过的探针即为本幕回归探针，后续改动复跑。
> 本轮子代理无试看者可调配，故**题目已入库、实测未执行**——旗舰门禁的最后一道手续
> 待主会话安排试看者后闭合，不得以“题目已写”冒充“探针已通过”。

复述判据（应复述出三句，缺“约定单记”即不通过）：
“里面 in，面上 on，点上 at；时间是借空间的图来猜；图猜不出的约定说法，要单独记。”

- **P1 · 日子锚点**（针对 sp-xc-tuesday-morning）：
  “Tuesday morning 前面用 in 还是 on？为什么？”
  通过答案：on；因为前面有了具体日子 Tuesday，要从 day 的 on。
  不通过：答 in（套用 in the morning），或只答 on 说不出“有了具体日子”。
- **P2 · 时长误解**（针对 sp-xc-at-night / sp-xc-in-morning）：
  “夜很长，早上也不短——那 at night 和 in the morning 是不是按长短分的？”
  通过答案：不是；长短推不出来，是大家约好的说法，单独记。
  不通过：用“夜长所以 at / 早上短所以 in”之类长短理由解释。
- **P3 · 第一猜测边界**（针对 sp-xc-on-foot）：
  “on foot 是脚踩在面上，所以 on 是按图推出来的，对吗？”
  通过答案：不对；on foot 是固定习语，图推不出来，背下来就行。
  不通过：以“脚踩面”为理由肯定图式推导。
- **P4 · 借用非映射**（针对 sp-cl-time-borrow 边界）：
  “时间是不是和空间完全一个道理，图怎么画、时间就怎么说？”
  通过答案：不是；时间只是借图，是第一猜测，约定例外要单记。
  不通过：答“完全一样”或“图能决定所有介词”。

## 6. 存疑项与缺口（诚实清单）

1. **主张级例证（非模型例证原文）**：下列台词有主张级依据、但不在模型例证名单内，
   已在 spec 注释与本条登记，主会话若要求“例证逐字”口径则需删改：
   第 1 幕开场 in May（sp-cl-time-borrow  scope 内的时间段实例，类比 in 2020）；
   第 2 幕 The plane takes off / fall off the bike（sp-cl-on-off“离开”主线实例）；
   第 3 幕 get on the subway 预测题（sp-cl-transport“能站着走 → on”的规则应用，非例证词）；
   第 3 幕 get off the bus / get out of the car（T11d 已标明：原模板 ACTS 演出搭档句，非主张台词）。
2. **第 4 幕 to/from 上下文**：to 到终点 / from 离起点无 spacetime  claims 记录，
   依据为模型 superseded 注记“to、from 两支原说法成立，保留于本幕其他行”；for 三站仍为本幕主张。
3. **insightcheck 覆盖缺口**（与 T11b/T11d 相同）：官方强制集只收 import concept.js/oral.js 的幕，
   autoBuild 家族不在其中；本报告“不合格 0”的实质部分来自等效校验（§3），官方 0 为空集结果。
   等效脚本已常驻化为 `~/workspace/tools/check_spacetime.py`（含静态断言 A1–A6），
   建议 P2 与 letters 版合并为通用 autoBuild 校验。
4. **车辆精灵溢出**（承 T11d 未决 1）：第 3 幕 bus 精灵宽于 autoBuild 演员槽位，右部出框，
   车头一角可漏进下一板边缘；不遮挡文字，原幕同款行为，P2 模式层统一处理车辆类宽精灵缩放/槽位。
5. **换板文字先行**（承 T11b 未决 3）：autoBuild 引擎固有行为，新板文字在镜头滑行途中已开写；
   本轮截图复现，属引擎层清单，非本家族引入。
6. **物理动作参照审查不适用**：四幕均无倒水/切分/装杯/撕纸动作，
   故 `model/refcards/`（pour/cut/fill_cup/tear）无适用对象，未做参照对比审查；
   §4 语义标签与 §6 断言在本家族的落地形式为：spec 事实表 + 静态断言 A1–A6
   （引用模型记录与语义标签，不引用坐标；像素级断言如“液柱距出口 ≤10px”无适用对象，特此说明）。
7. **第 1 幕时长 195.0s** 为家族最长（双主张 + 4 条例外上屏）；未设家族时长上限，
   若要压缩建议 P2 模式层处理（如例外分流到卡片视图），本轮不删模型内容。
8. **探针未实测**（见 §5）：题目入库但无试看者执行，旗舰门禁待主会话闭合。

## 7. 续接点

- **首要**：安排第 1 幕误读探针实测（§5 四题 + 复述判据）；任一题不通过则按判读标准回炉台词/画面，
  通过后探针转为回归探针。
- **可逆回退**（仅当主会话更倾向 T11d 驳斥式讲法时）：向 `specs/spacetime_1.yaml` 恢复 1 行
  `  - [n, "有人编了个分法：时间长用 in、一天用 on、时间短用 at。听起来很顺——可惜，长短根本分不出来。"]`
  于 `⚠️ 有例外`行之前，并同步恢复 facts 旧措辞，随后重跑 §2 生成 + 打包命令。
- **P2 模式层**：车辆宽精灵槽位、换板文字先行、autoBuild 家族纳入强制检查清单（与 T11b/T11d 相同清单）。
- **模型扩条后可补拍**：第 3 幕 bike / horse 骑乘、第 4 幕 look 三兄弟均系模型未登记而删除，
  待模型扩条后再补（承 T11d）。

## 8. 交付文件（均未提交）

- `docs/whiteboard/model/specs/spacetime_1–4.yaml`（本轮改动：4 份 spec 头纲领声明；第 1 幕删 1 行 + facts 措辞同步）
- `docs/whiteboard/v5/scenes/gen_spacetime_1–4.js`（本轮改动：仅第 1 幕少 1 行；其余三幕重生成字节一致）
- `~/workspace/your_files/gen-spacetime-1–4.html`（本轮全部重打）
- `docs/whiteboard/model/factsheets/gen_spacetime_1–4.md`（生成器附产物；本轮仅第 1 幕措辞同步）
- 本报告 `docs/whiteboard/model/updates/T11_spacetime_build.md`
- 校验脚本 `~/workspace/tools/check_spacetime.py`（仓库外常驻）；截图 `~/workspace/shots_gen/SP{n}_{15,45,70,88,97}.png`

未动（本子代理）：`docs/whiteboard/model/spacetime.yaml`、runbook、主 HTML、共享 lib/引擎、生成器；
本子代理无 git commit、无 push（specs 与 gen_spacetime_1.js 改动事后被并行会话 T12 提交 65bad9e 收录，见文首注）。
