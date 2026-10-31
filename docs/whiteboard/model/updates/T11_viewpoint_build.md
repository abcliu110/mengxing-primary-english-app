# T11 · viewpoint 家族（⑥ 站位与顺序的四个小机关）四幕构建报告

> 本文件为本次 T11 viewpoint 子任务的构建报告。前置说明：specs/viewpoint_1–4.yaml、
> scenes/gen_viewpoint_1–4.js、your_files/gen-viewpoint-1–4.html、factsheets 与精灵库
> 由 T11c 先行建成（见 updates/T11c.done）；本次会话在该基础上补齐本任务点名的三项缺口
> 后重新生成、重建并重验：① 每幕 spec 头声明所属纲领（域）；② 第 2 幕清除两处模型外说法
> （助动词跟随叙述、“疑问词 + 一般疑问句”公式）；③ 本报告 + 第 1 幕儿童误读探针。
> 生成器未改动（gen_scene.py items 模式现成可用）。未 git commit、未推送、未改 runbook、
> 未动模型本体（viewpoint.yaml）与主 HTML。

## 管线

```
viewpoint.yaml（唯一内容源，4 概念 / 6 主张 / 12 例证 / 5 例外 / 4 口诀，validate 已过）
  → model/specs/viewpoint_N.yaml
  → model/gen_scene.py（items 模式，未改）
  → v5/scenes/gen_viewpoint_N.js（产物，禁止手改）
  → v5/build.mjs → ~/workspace/your_files/gen-viewpoint-N.html
```

生成命令（N = 1–4）：

```
cd docs/whiteboard/model && python3 gen_scene.py specs/viewpoint_N.yaml
```

构建命令（N = 1–4，标题见下表）：

```
cd docs/whiteboard/v5
WB_FONTS=$HOME/workspace/wb-fonts PATH=$HOME/workspace/bin:$PATH \
  node build.mjs scenes/gen_viewpoint_N.js ~/workspace/your_files/gen-viewpoint-N.html "标题"
```

## 纲领声明（全家族）

viewpoint.yaml 明确声明“无单一纲领：四幕按内容分挂三域（dom-grammar /
dom-questions-info / dom-tense-aspect），不硬挂一条统一纲领”。每幕 spec 头已写
`domain` + `domainNote` 字段（生成器忽略，仅作审计声明）；四幕屏上家族标统一为
“📦 联想工具箱 ⑥ 站位与顺序”，并收束“各讲各的，不是一条律”。
旧总纲“焦点先行思维”标签已废止：四幕互不解释，不存在统一机制。

## 逐幕状态

| 幕 | 标题 | 域 | 模板（旧幕改写） | 模型记录 | 时长 | 构建 | 校验 |
|---|---|---|---|---|---|---|---|
| 1（旗舰） | 形容词站哪边 | dom-grammar | ze_modifier_1.js（6-1 内容现行版面；fp_zoom_focus_1 已迁入中英对照枢纽，见下“模板抉择”） | vp-cl-adj-position、vp-cl-hyphen-pack、vp-xc-people-present、vp-ch-adj | 149.2s | gen-viewpoint-1.html ✓ | 等效校验 ✅（文字峰值 12%） |
| 2 | 疑问词站第一 | dom-questions-info | fp_zoom_focus_2.js | vp-cl-wh-fronting、vp-xc-echo、vp-xc-embedded、vp-ch-wh | 148.7s（T11c 时 154.7s；本次删 are-跟随句与公式句，缩短约 6s） | gen-viewpoint-2.html ✓ | 等效校验 ✅（文字峰值 16%） |
| 3 | 写地址从小到大 | dom-grammar（见“存疑项与缺口”e） | fp_zoom_focus_3.js（精灵 fz3 已生成，ACTS 为空） | vp-cl-address-order、vp-cl-time-anchor、vp-xc-date-us、vp-ch-address | 139.7s | gen-viewpoint-3.html ✓ | 等效校验 ✅（文字峰值 11%） |
| 4 | 完成时：过去和现在有关系 | dom-tense-aspect | fp_zoom_focus_4.js（精灵 fz4 已生成，kick0–2/l_read） | vp-cl-perfect、vp-xc-perfect-yesterday、vp-ch-perfect | 160.1s | gen-viewpoint-4.html ✓ | 等效校验 ✅（文字峰值 14%） |

### 各幕模型口径落实点

- **第 1 幕**：判据为“一般 + 重量倾向”（轻的前置、重的后置），开场先破
  “一个词放前、两个词以上一律放后”的误会；打包条（five-year-old / two-hour）与
  people present 例外双向反例齐上屏；口诀逐字用 vp-ch-adj。
- **第 2 幕**：汉语疑问词只说“留在原地”，不说“在最后”（旧 DB 表述错误已废止）；
  回声问句（You bought what?）、从句居中（Tell me what you want.）两例外上屏，
  口诀带“不硬套”；旧幕感叹句段已删（不在模型边界内：只管主句特殊疑问句）。
  本次修正：删“are 也跟上来，紧贴在它后面”叙述与“are 紧跟其后”芯片（主谓倒装
  不在 viewpoint 模型内）；删“公式：疑问词 + 一般疑问句”（Who came? 无助动词，
  该公式会被反例推翻），改为通用术语定义句。
- **第 3 幕**：地址条明标“只管写地址这一件事”；旧幕“时间也从小到大”的统一推论
  整段删除；morning 日子锚点单独成条（in the morning ↔ on Tuesday morning /
  on Sunday morning）；日期以例外出场（美式 September 9 = 月→日→年，不硬套地址顺序）。
- **第 4 幕**：按模型口径讲“过去的事、和现在有关系 / 结果留到现在”，不讲成时间轴
  上的点；“做完了”只以被驳斥的误会出场（开场设问 → lived ten years 反例驳斥 →
  预测再驳），不作判据或口诀；结果支（I have lost my key）与持续支
  （I have lived here for ten years）并置；yesterday 例外与 since yesterday 时段注记
  上屏；经历、刚发生两格按模型边界不展开（中学补全）；旧幕 3×3“选时间 × 选拍法”
  总览与“结算”拍法名全部删除。

### 模板抉择（记录在案）

- 第 1 幕**未用** adj_order_1.js：其 buildAdj 引擎硬编码 7 节车厢 + 名词终点站，
  车厢位即 OSASCOMP 顺序（观点/大小/新旧/形状/颜色/来源/材质）——该顺序不在
  viewpoint.yaml 内；且该引擎名词居末、无名词后位，装不下后置短语
  （a man afraid of dogs）。复用它会把未建模内容带进场景，故弃用，改用
  ze_modifier_1.js（6-1 内容在 v5 的现行版面）+ autoBuild ITEMS 全量替换。
- 第 2–4 幕直接用 fp_zoom_focus_2–4.js（autoBuild/ITEMS 引擎，内容全量替换，
  屏上零旧内容残留；旧标题行由 spec replace 降格为“联想工具箱 ⑥ 站位与顺序 · N”）。

## insightcheck 结果与命令

官方检查器（autoBuild 家族不在强制集内，见覆盖缺口说明）：

```
# /tmp/run_ic_vp.py（与 ~/workspace/tools/run_insightcheck_gen.py 同款 playwright 补丁，
# 仅把 --only 换成四幕）：insightcheck.py --only=gen_viewpoint_1,gen_viewpoint_2,gen_viewpoint_3,gen_viewpoint_4
强制检查 0 幕（v6 / 决策 38；口语 oral.js 幕为抽样），其余场景文件只报告不拦
insightcheck 不合格 0
```

等效校验（复用 insightcheck.py 官方 HOOK 文字面积采样 + 页面报错 + 时长区间，
脚本 ~/workspace/tools/ic_gen8.py，T11b/T11c 先例）：

```
python3 ~/workspace/tools/ic_gen8.py gen-viewpoint-1 gen-viewpoint-2 gen-viewpoint-3 gen-viewpoint-4
✅ gen-viewpoint-1  149.2s  文字峰值 12%
✅ gen-viewpoint-2  148.7s  文字峰值 16%
✅ gen-viewpoint-3  139.7s  文字峰值 11%
✅ gen-viewpoint-4  160.1s  文字峰值 14%
等效校验不合格 0
```

判定口径：页面零报错、板上文字面积峰值 ≤40%、时长在 40–240s 参考区间内，四幕全过。

**覆盖缺口（必须明说）**：官方“不合格 0”不是实质通过——insightcheck 强制集只收
import concept.js / oral.js 的幕，autoBuild 家族不在其中。本次实质证据是等效校验
+ 下述截图抽查；建议 P2 把 autoBuild 家族纳入强制检查清单（同 T11b 第 4 项、T11c
未决问题 2）。

模型校验：`python3 docs/whiteboard/model/validate.py` → “✓ 全部校验通过”
（本次未改模型，校验仅作回归确认）。

## 关键帧截图结论

新截图（本次重建后实采，存 ~/workspace/shots_gen/VP{1–4}_*.png；T11c 旧帧
gen-viewpoint-*_*.png 仍在同目录）：

- **V1**：115.0s 揭晓横幅“on the table 是短语，算「重」的，挂在后面——
  the cat on the table。”（揭晓在预测之后，时序正确）；132.0s 金句卡起写
  “💡 一句话洞见 / 形容词的位置看重量：轻的前置，”；145.0s 金句卡完整
  （洞见 + 口诀“轻的前置，重的后置，打包的也能站前面” + 📦 联想工具箱 ⑥
  站位与顺序），无遮挡、无出框。115.0s 帧换板瞬间旧板“？”芯片残留一枚，
  系 autoBuild 引擎既有换板行为（letters 家族同类观察），非内容错误。
- **V2**：145.0s 金句卡完整（“英语主句疑问词移至句首；汉语疑问词留在原地，
  不移位” + 口诀“疑问词站第一，回声、从句不硬套。” + 家族标），无“在最后”、
  无“焦点”残留。
- **V3**：133.0s 金句卡完整（“写地址：英语从小到大，中文从大到小；日期写法
  各国不同，另学” + 口诀 + 家族标），无“时间也从小到大”推广。
- **V4**：145.0s 金句卡起写洞见两支，155.0s 金句卡完整（“完成时讲过去与现在的
  关联：结果留到现在，或一直持续到现在” + 口诀“过去发生，和现在有关系 →
  have、has 加过去分词！” + 家族标），无时间轴、结算、快照、录像残留。

禁用文案扫描（对 v5/scenes/gen_viewpoint_1–4.js）：

```
焦点先行 / 第一性原理 / 镜头缩放 / 焦点先出场 / 结算 / 先选时间 / 时间轴 / 快照 / 录像 /
在最后 / 拉镜头 / 只有 1 个词 → 全部零命中
一律 → 仅 1 处，且在否定语境：“不是「一个词放前、两个词以上一律放后」”
做完了 → 仅第 4 幕，且只以被驳斥的误会 / 预测问句出场（见上），不作判据或口诀
```

## 存疑项与缺口（诚实登记：以下均未冒充模型记录）

1. **模型中无存疑标记项**：grep viewpoint.yaml “存疑”零命中；本次未把任何存疑
   说法写进场景。
2. **非模型例证的台词（规则应用 / 演示对照，非新主张）**：
   - V1 预测 the cat on the table（重量倾向的应用题）；V2 预测 Where is your cat?
     （移位规则的应用题，承旧幕）；V2 陈述句对照 You are going to the park this
     weekend.（移位演示的底本句）；V3 预测 5 Garden Road, Shanghai（地址顺序的
     应用题，承旧幕）；V3 的 See you on Tuesday morning.（模型例证 on Tuesday
     morning 的句子框）；V4 预测 I have lived here for five years（lived-ten-years
     的数字替换应用）。以上均只套用已建模规则，未引入新规则。
   - V2 “特殊疑问句”术语定义（通用术语，模型未给定义；已删可能被反例推翻的公式句）。
3. **域指派缺口**：viewpoint.yaml 只列三域、未逐幕映射；V3（地址与日期书写惯例）
   挂 dom-grammar 是 spec 层指派（书写惯例归语法域），非模型原文，特此声明。
4. **中文例句的位置巧合**：你买了什么？/ 你周末打算去哪里？中疑问词恰处宾语位
   （视觉上在句末），旁白一律说“留在原地”不说“在最后”，与模型例证口径一致；
   但儿童测试时仍需留意是否诱发“在最后”误读（见探针 P4 追加建议）。
5. **物理动作与参照审查**：四幕均为纯语言位置演示，无倒水 / 切分 / 装杯 / 撕纸
   动作——refcards（pour / cut / fill_cup / tear）已核对，不适用；无因果修复，
   故无新增语义标签与构建期不变量断言（断言门适用于有因果道具的幕）。
   各 spec 的 facts.invariants 仍登记了本幕的机制边界（倾向关键词、例外位置、
   不跨幕解释）作为审查对照。
6. **时长**：四幕 139.7–160.1s，较旧幕（约 90s 量级）偏长，系订正内容密度上升；
   再砍只能删模型内容或拆幕，属模式层决策，未动。
7. **ACTS 触发未全中**：V4 的 play / reading 触发词不在模型例词内，未强行塞词；
   演员以 ACTS 首帧默认形象出场（同 T11c 未决问题 3）。如需全触发，须在模型层
   补例词后再回 spec。

## 第 1 幕儿童误读探针（旗舰幕门禁，REWRITE_TECH_PLAN §6 第 7 项）

探针均由模型例外 / 主张直接生成；**尚未对真实儿童实测**（本子代理无儿童测试
渠道，属续接点，需主会话安排）。探针题、捕获的误读与通过标准如下：

| 编号 | 探针问题（儿童作答） | 捕获的误读 | 正确答案（模型依据） | 通过标准 |
|---|---|---|---|---|
| P0（幕内预测，已在场景内） | “桌子上的那只猫”，on the table 放 cat 前面还是后面？ | 按中文语序直译放前面；或只看词数机械判断 | 后面：on the table 是短语，算“重”的（vp-cl-adj-position） | 答“后面”并说出“短语/重”理由 |
| P1 | a five-year-old boy 里，five-year-old 这么长，为什么能站前面？ | “长的都站后面”（长度决定论） | 连字符打包成了一个形容词，打包的站前面（vp-cl-hyphen-pack） | 答出“打包成一个词” |
| P2 | people present 里，present 只有一个词，为什么站后面？ | “一个词都站前面”（词数决定论） | 后置单形容词是例外，逐个记；倾向只说“一般”（vp-xc-people-present） | 答出“例外/逐个记”，不坚持“一个词必前置” |
| P3（迁移） | students interested in science 里，interested 一串站哪边？ | 套用“长的能打包前置”到未打包短语 | 后面：没打包的长短语仍按重量倾向后置（vp-cl-adj-position 边界） | 答“后面”并区分“打包/没打包” |
| P4（追加建议，测“在最后”误读） | 汉语“你买了什么？”里，“什么”是在最后，还是留在原地？ | 把“原地”误解为“句末”（旧 DB 错误表述回潮） | 留在原地：它就是宾语的位置，不是被移到最后（vp-cl-wh-fronting） | 答“留在原地”；答“在最后”即判误读未除 |

**门禁判定**：P0 + P1 答对为通过（核心机制成立）；P2 答对为优秀（例外意识）；
任一回答中出现“焦点先行 / 一条律 / 一律”表述，即判统一律误读未除，需回炉。
探针通过后，按 §6 第 7 项应将通过的探针登记为回归探针（后续改版复测）。

## 续接点

1. 儿童误读探针实测（上表 P0–P4）+ 通过探针登记为回归探针。
2. insightcheck 覆盖缺口：P2 把 autoBuild 家族纳入强制检查清单。
3. 用户验收本家族后，方可进入 P2（其余五原理家族 + 参照图库建设）；本家族
   不依赖 P2 模板层改动。
4. git 状态：本次改动 = specs/viewpoint_1–4.yaml、scenes/gen_viewpoint_1–4.js
   （factsheets 内容与再生前一致，无变动）、updates/T11_viewpoint_build.md（本文件，
   新增）及 your_files/gen-viewpoint-1–4.html（仓库外产物）；**未提交、未推送**，
   留给主会话。工作区内 spacetime 家族的改动属并行会话，与本任务无关，未动。
