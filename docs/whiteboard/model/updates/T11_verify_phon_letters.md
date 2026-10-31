# T11 验证报告 · ①语音（phonology）+ ②字母（letters）八幕

- 验证人：T11 验证子代理（只验证；未写场景、未提交、未推送、未改 runbook、未动模型本体与主 HTML）
- 验证对象（当前 HEAD）：`e3ec3a7`（T11d 审查提交，内含 phonology 返修）
- 模型（只读引用）：`docs/whiteboard/model/phonology.yaml`、`letters.yaml`
- 规格：`docs/whiteboard/model/specs/phonology_1–4.yaml`、`letters_1–4.yaml`
- 生成产物：`docs/whiteboard/v5/scenes/gen_phonology_1–4.js`、`gen_letters_1–4.js`
- 构建产物：`~/workspace/your_files/gen-phonology-1–4.html`、`gen-letters-1–4.html`

## ⚠️ 版本说明（必读：本报告数字全部是第二轮复验结果）

验证中途共享工作区推进了 4 个提交（32 → 36 commits ahead of origin），其中
`e3ec3a7`（05:34 JST）内含 T11a 审查返修：phonology 四幕规格与生成 JS、构建 HTML
全部被改写（phonology_1 由 `fp_economy_1.js` 两节制改为 `fp_economy_1_v2.js`
单幕完结版；其余三幕为小幅文字调整）。第一轮验证（旧版：phonology_1 75.5s）
因此作废；以下所有命令与数字均在**当前 HEAD 重新跑过**。letters 四幕在两轮间
未变，但同样重跑以保证同一基线。

T11a 审查原结论（`63bb707`）：“家族暂不通过（第 1 幕步骤条失效 + -ed 无演示，
两中六低），返修已派”——本轮复验确认这两项中问题均已在 v2 修复（见 §4）。

## 1. 语法与构建对应

### 1.1 `node --check`：8/8 通过

```
node --check docs/whiteboard/v5/scenes/gen_phonology_{1,2,3,4}.js  # 全部 OK
node --check docs/whiteboard/v5/scenes/gen_letters_{1,2,3,4}.js    # 全部 OK
```

### 1.2 构建产物与生成 JS 对应：8/8 逐字节一致

方法：在 `v5/` 下以 `WB_FONTS=$HOME/workspace/wb-fonts PATH=$HOME/workspace/bin:$PATH`
（runbook 口径）用 `node build.mjs scenes/<gen>.js /tmp/rb2_<gen>.html "<原 HTML 标题>"`
重建，再与 `your_files` 交付 HTML 做 `cmp`。8 幕全部 IDENTICAL（标题差异是唯一
变量：第一次误传 stem 作标题时差 3–30 字节，改传原标题后全部一致）。

| 幕 | 构建 HTML 标题 | 重建比对 |
|---|---|---|
| gen_phonology_1 | 三种读音：尾巴跟着前音走 | IDENTICAL |
| gen_phonology_2 | 嘶嘶相撞插音 | IDENTICAL |
| gen_phonology_3 | 看音选冠词 · 前缀同化 | IDENTICAL |
| gen_phonology_4 | 双写拼写 | IDENTICAL |
| gen_letters_1 | 字母的画：真来历，还是钩子？ | IDENTICAL |
| gen_letters_2 | fl-、gl-、sl-：多半是这样 | IDENTICAL |
| gen_letters_3 | str- 与 sp-：联想归纳，先猜再查 | IDENTICAL |
| gen_letters_4 | tw- 家族：查得到的真同源 | IDENTICAL |

时间戳一致性：生成 JS（10-31 20:19–20:33）→ 构建 HTML（10-31 20:19–20:33），
HTML 不早于对应 JS，符合构建顺序。

## 2. insightcheck

### 2.1 官方工具原样跑（强制口径）：不合格 0

工具未改动。`~/workspace/tools/run_insightcheck.py` 硬编码 `--only=fp_boundedness_1_v2`
且默认字体目录 `/workspace/work/fonts` 在本机不存在（首轮因此打包失败）；
按任务要求用 `/tmp` 副本参数化（`/tmp/run_ic_t11.py`，仅改 `--only` 入参，
另补 `WB_FONTS` 环境变量），原工具与 P1 行为 untouched。命令：

```
cd ~/workspace/mengxing-work
WB_FONTS=$HOME/workspace/wb-fonts PATH=$HOME/workspace/bin:$PATH \
  ~/workspace/pwenv/bin/python /tmp/run_ic_t11.py \
  "gen_phonology_1,gen_phonology_2,gen_phonology_3,gen_phonology_4,gen_letters_1,gen_letters_2,gen_letters_3,gen_letters_4"
```

输出（全文见 `/tmp/ic_t11_official2.log`）：

```
✅ gen_phonology_1  125.7s  预测 2 个  规则 110.7  文字 14%  动态 3% 静态字 83% 分段 0%/0%/0%/0%
   （决策 39 提示：C.step 四段不齐；动态时长 3% < 60%；静态字时长 83% > 25%）
强制检查 1 幕（v6 / 决策 38；口语 oral.js 幕为抽样），其余场景文件只报告不拦
insightcheck 不合格 0
```

**为什么只查 1 幕：** 工具的强制对象定义为“源码直接 `import '../lib/concept.js'` 的幕”。
8 幕中只有 gen_phonology_1 直接 import concept.js；其余 7 幕走 `autoBuild`
（`v5/scenes/auto.js`），按工具定义不在强制范围——这是工具口径，不是本验证
漏查（见 2.2 补查）。

### 2.2 同款四项检查直量 8 个交付 HTML（补查，判断逻辑与原版一致）

方法：复制 `insightcheck.py` 到 `/tmp/ic_built_base.py`（仅去掉末尾自动跑 `main()`，
改由自定义入口直接量已交付 HTML，不再重新打包；`HOOK`/`measure`/`judge`/`d39`
原文不动）。命令与输出（全文见 `/tmp/ic_t11_built2.log`）：

| 幕 | 时长 | 预测 | 规则命名 | 板上文字 | 页面报错 | 结果 |
|---|---|---|---|---|---|---|
| gen-phonology-1 | 125.7s | 2 个 | 110.7s | 14% | 无 | PASS（决策38四项全过） |
| gen-phonology-2 | 163.0s | 0（无数据） | 无 | 13% | 无 | FAIL：没有 `__WB5_INSIGHT__`（场景没调 `C.finish()`） |
| gen-phonology-3 | 187.4s | 0（无数据） | 无 | 13% | 无 | FAIL：同上 |
| gen-phonology-4 | 188.3s | 0（无数据） | 无 | 14% | 无 | FAIL：同上 |
| gen-letters-1 | 184.3s | 0（无数据） | 无 | 11% | 无 | FAIL：同上 |
| gen-letters-2 | 144.4s | 0（无数据） | 无 | 11% | 无 | FAIL：同上 |
| gen-letters-3 | 120.6s | 0（无数据） | 无 | 12% | 无 | FAIL：同上 |
| gen-letters-4 | 134.1s | 0（无数据） | 无 | 9% | 无 | FAIL：同上 |
| **built-HTML insightcheck 不合格 7** | | | | | | |

**根因（模板层，非内容层）：** `auto.js:246` 为 `return ODD ? C.finish() : K.done();`，
只有带 `D.odd` 的“找不同”开场幕才调 `C.finish()`；本批 7 幕均无 `D.odd`，
故从不产生 `__WB5_INSIGHT__`。内容上 7 幕都有“预测题 → 揭晓题”结构
（每幕预测行均在揭晓行之前，见 §4 时序），但 autoBuild 没有 `C.predict` 计时停顿
与 `C.finish` 数据上报，所以决策 38 的“≥3 秒预测停顿 / 规则命名时刻”**无法从
数据验证**——不是“内容缺预测”，是“测量缺口”。文字面积 9–14% 全部 ≤40%，
8 幕页面零报错。

**判定口径说明：**
- 按官方工具强制口径：**不合格 0，通过**。
- 按任务“每幕不合格 0”字面目标：**7 幕未达标，唯一原因就是上述 instrumentation
  缺口**。是否接受（autoBuild 幕本就不在决策 38 强制范围），或立项给 autoBuild
  接 `C.aha/C.predict/C.rule/C.finish`，需主代理 / 用户拍板——本验证不替决策。
- 决策 39（⑤–⑦）对 8 幕全部只是“提示”而非强制（均无 `// @step1_hook` 标记）：
  phonology_1 提示动态 3% / 静态字 83% / 四段不齐；若将来把该家族升为决策 39
  强制幕，需补 `C.step(1..4)` 与动态窗口，否则 ⑤–⑦ 不过。

## 3. 台词溯源抽查（每幕 ≥5 条关键句 → 模型记录）

### 3.1 规格 → 生成 JS 全量比对：8/8 零缺失

脚本逐条检查规格 `items`/`know` 全部字符串是否出现在对应生成 JS
（含 `\'` 转义归一化后复核；初版 3 条“缺失”均为 `It's/Don't` 的 JS 转义假阳性，
复核后全部存在）。`replace` 新旧对：旧串零残留、新串全部到位。

### 3.2 关键句 → 模型记录（逐幕 ≥5 条，全部找到）

| 幕 | 关键句 / 口诀 / 判据 | 模型记录 |
|---|---|---|
| phonology_1 | 口诀“清跟清，浊跟浊，尾巴跟着前音走。” | `ph-cl-voicing.say`（逐字） |
| |  chant“清跟清来浊跟浊，尾巴跟着前音走” | `ph-ch-voicing`（逐字） |
| | books /s/、bags /z/ | `ph-ex-books-bags` |
| | worked /t/、played /d/（新 v2：stop+ed /t/、play+ed /d/ 过喉咙演示） | `ph-ex-stopped-played` |
| | wanted /ɪd/、needed /ɪd/ | `ph-ex-wanted-needed` |
| | ⚠️ aged / learned 作形容词读 /ɪd/（v2 新增上屏） | `ph-xc-aged-learned`（逐字，含“习惯保留”注） |
| | 收尾 dogs → /z/ | `ph-cl-voicing` 规则 + `ph-ex-cats-dogs` 同类例证 |
| phonology_2 | 口诀“嘶嘶相撞，插 /ɪ/ 分开站。” | `ph-cl-sibilant-chant` / `ph-ch-sibilant`（逐字） |
| | kiss→kisses、watch→watches | `ph-ex-kisses-watches` |
| | bus→buses、box→boxes | `ph-ex-buses-boxes` |
| | 嘶嘶音清单 /s/ /z/ /ʃ/ /tʃ/ /dʒ/ | `ph-cl-sibilant` 规则陈述（含 /dʒ/） |
| | want/need → wanted /ˈwɒntɪd/、needed /ˈniːdɪd/，-ed → /ɪd/ | `ph-ex-wanted-needed`、`ph-cl-voicing`（与插音同理） |
| | goes、potatoes 拼 -es 却读 /z/ | `ph-xc-goes-potatoes`（逐字） |
| phonology_3 | 口诀一“看音不看字母，元音音前用 an。” | `ph-cl-a-an.say`（逐字） |
| | 口诀二“不字头碰到唇音，换成 m 更顺口。” | `ph-cl-neg-prefix.say`（逐字） |
| | in- 有两职（“不” vs “入、向里”） | `ph-cl-in-two`（逐字覆盖） |
| | an hour、an apple / a house、a useful book | `ph-ex-an-hour-apple`、`ph-ex-a-house-useful` |
| | impossible（in + polite → im-） | `ph-ex-impossible-impatient`（impossible 侧） |
| | inborn、input 不变 | `ph-xc-inborn-input`（inborn、input 侧；inbox 未入幕，见 §5 O3） |
| phonology_4 | 口诀“辅元辅加后缀，多半双写保短音。” | `ph-cl-doubling.say`（逐字） |
| | 双岗哨（两个 n 守住短元音） | `ph-cl-doubling-picture`（逐字机制） |
| | run→running、swim/big/hot/stop 双写例证 | `ph-ex-run-hop`（run 侧） |
| | visit、open 重音不在末音节 → 不双写 | `ph-xc-doubling-unstressed`（逐字） |
| | fix、snow，w、x、y 结尾 → 不双写 | `ph-xc-doubling-wxy`（逐字） |
| | 双写是拼写记号，不改变读音本身 | `ph-cl-doubling` 规则 boundary（逐字义） |
| letters_1 | 口诀“M 是水波纹，B 是小房子，C 是骆驼峰，S 是小牙齿——这四个画的都是真历史！” | `lt-ch-true`（逐字） |
| | 七真源：mem 水 / bet 房屋 / gimel 骆驼 / kaph 手掌 / ayin 眼睛 / shin 牙齿 / aleph 牛头 | `lt-cl-true-origins` 规则陈述（逐字覆盖全部七个） |
| | “画面只是钩子，来历要查真源。” | `lt-cl-memory-pictures.say`（逐字） |
| | X 想成剪刀（自编，标明不是来历） | `lt-cl-memory-pictures`（逐字例证） |
| | “「手」不是 C 的来历！”“「手」是 K 的真来历” | `lt-cl-true-origins`（“手归 K，不归 C”逐字） |
| letters_2 | 口诀“fl 多半在飞，gl 多半在发光，sl 多半往下滑——是多半，不是全部” | `lt-cl-flglsl.say`（逐字） |
| | fly/flow、glow/gleam、slide/slip | `lt-ex-fly-flow`、`lt-ex-glow-gleam`、`lt-ex-slide-slip` |
| | flame/flag 不飞、glove/glue 不发光、sleep/slow 不滑 | `lt-xc-cluster-counters`（逐字） |
| | flu 是 influenza 缩略、floor 与飞无关 | `lt-xc-flu-floor`（逐字） |
| | 揭晓“感觉对上 ≠ 词源，要查词典” | `lt-cl-flglsl` boundary（逐字义） |
| letters_3 | 口诀“str 多是拉紧的线，sp 有时是往外冒——先猜，再查” | `lt-cl-strsp.say`（逐字义；模型 say 为“是找亲戚的线索，不是人人都是”，场景口诀为其同义改写，见注） |
| | string/straight/strong；spray/spill/spit/spread | `lt-ex-string-straight`、`lt-ex-spray-spill` |
| | street 来自拉丁语 strata“铺过的路” | `lt-xc-street`（逐字） |
| | speak/space/sport/spring 不是 sp 一家 | `lt-xc-sp-false-members`（逐字） |
| | “这是联想归纳，不是词源考证” | `lt-cl-strsp` 类型 tendency + boundary（逐字义） |
| letters_4 | 口诀“tw- 常和『二』是一家，twinkle、twirl 不算它” | `lt-ch-tw`（逐字） |
| | two/twin/twice/twelve/twenty/between 同源于 *dwóh₁“二” | `lt-cl-tw-etym`（逐字） |
| | twelve = 古英语 twalif“十之外还剩二”（附“勿讲死”式处理 + 伸手指头只是数数办法） | `lt-cl-tw-etym` note（逐字义） |
| | twinkle、twirl 与“二”无关 | `lt-xc-twinkle-twirl`（逐字） |
| | “tw- 常和『二』是一家，但不是个个都是” | `lt-cl-tw-tendency`（逐字义） |

**存疑结论：关键台词 / 口诀 / 判据句在模型文件中全部找到记录，存疑 0 条。**
注：letters_3 场景口诀“先猜，再查”与模型 `lt-cl-strsp.say`（“是找亲戚的线索，
不是人人都是”）是同义改写而非逐字——但模型 chant `lt-ch-strsp` 本身就是
“str 多是拉紧的线，sp 有时是往外冒——先猜，再查”，故仍算逐字溯源到 chant 记录。

### 3.3 规格层补充句（未在模型逐字登记，但不与模型矛盾——如实列出，不冒充溯源）

- phonology_1：“声带：喉咙里的两片小肉……”等器官定义脚手架（规格 KNOW 层）。
- phonology_3：“冠词：放在名词前面的小词……”通用定义（规格层）。
- phonology_4：“tap 不双写，就读成 tape 的 /eɪ/”类比（见 §5 O2）。
- letters_4：between = be-（在旁）+ tween（古英语“两个两个”）的分解细节
  （模型只登记 between 在同源名单内；分解本身符合模型口径，旧式 be+twain
  拼合已按规格 invariant 排除）。

## 4. 逻辑抽查（守恒 / 同一 / 因果 / 指称 / 时序，轻量版）

### 4.1 两项重点（任务指定）

**（a）letters 家族旧错误词源：清零。**
- 生成 JS 与交付 HTML 中“`M 是山` / `S 是蛇` / `B 是包` / `C 来抓`”**零命中**；
  letters 交付 HTML 中“第一性原理 / 象似性 / 同源簇”**零命中**（招牌降格落实）。
- “手”只归 K：`C 来自 gimel 骆驼` + `「手」不是 C 的来历！` + `K 来自 kaph 手掌`
  三处一致；“C 像一只手在抓东西”仅作为预测题中的**被拆穿钩子**出场，
  揭晓即否定（“是钩子！C 的真来历是骆驼”），符合规格 invariant
  （“只可作被拆穿的钩子在预测题出场”）。

**（b）phonology 家族 -s / -ed 三变体：齐全，/ɪz/ 与 /ɪd/ 均未缺失。**
- phonology_1（v2）：开场钩子 `books /s/、bags /z/、buses /ɪz/` 与
  `worked /t/、played /d/、wanted /ɪd/` 六项齐全；正文 -s 演示（book/bag）
  与 -ed 演示（stop+ed /t/、play+ed /d/）对等；全文 /ɪz/ 2 处、/ɪd/ 6 处。
- phonology_2：-s 侧 /ɪz/ 7 处（buses、watches、boxes、kisses），
  -ed 侧 /ɪd/ 2 处（wanted、needed）+ 屏上 `-ed → /ɪd/`；无缺失。

### 4.2 五点逐幕

| 幕 | 守恒 | 同一 | 因果 | 指称 | 时序 |
|---|---|---|---|---|---|
| phonology_1 | 声带两态与发音同步；-ed 与 -s 对等演示，无“变出/变没” | “尾巴”全幕 = 词尾 -s/-ed，无漂移 | 前音清浊 → 尾巴清浊，方向正确；不设“省力”统一律（交付 HTML“省力/同化律”零命中） | “尾巴”“声带震/不震”均在开场定义 | C.predict（book）→ C.rule（110.7s）→ C.predict（dogs 收尾）；规则不早于首个预测结束，工具判定通过；步骤条 stepAt[0..5] 六步全赋时（见 4.3） |
| phonology_2 | 插音“多了一个 /ɪ/”，明确“一个音都没吞”，音节只增不减 | “嘶嘶音”名单与模型一致（s、z、sh、ch、/dʒ/） | 插音因 = 两个嘶声挤成一团听不出（为听得清），非“吞音”；“吞音”仅作误解出场+驳斥 | “它们”= 两个嘶声，指称明确 | 预测（kiss）→ 揭晓，顺序正确（内容层；无 C.predict 计时数据，见 §2.2） |
| phonology_3 | —（无物体变换） | in- 两职先分后套；inborn/input 的“入”职不套同化 | 唇音前嘴唇已合上 → n 顺成 m，因果链完整；il-/ir- 不作例证（符合模型“留待后续”） | “看音”= 第一个音（非字母），hour/useful 两例锚定 | 预测（elephant）→ 揭晓，顺序正确 |
| phonology_4 | 双写“只改拼写、不改读音”，短元音守恒 | “双岗哨”= 双写辅音，全幕同一隐喻 | 双写因 = 保短元音（拼写记号），非改读音 | “辅元辅”“没人守”均有定义 | 预测（sit）→ 揭晓 sitting，顺序正确 |
| letters_1 | — | 手归 K 不归 C；真源七字母名单不顺推其他字母 | 真源因 = 腓尼基字母名本义；钩子因 = 帮记（非历史），两因分开 | “钩子”“真源”开场即分栏定义 | 预测（C 的“手”）→ 揭晓（是钩子），顺序正确 |
| letters_2 | — | 成员名单限 fly/flow、glow/gleam、slide/slip；flag/flower/glass/glad 不作正例 | 倾向表述为“多半”，不作因果断言；反例与缩略词并置 | “多半”贯穿口诀与判据 | 预测（glide）→ 揭晓（线索 ≠ 词源），顺序正确 |
| letters_3 | — | street、speak/space/sport/spring 只作非成员 | 全幕口径为联想归纳，无词源/同源断言 | “拉紧的线”“往外冒”标注为联想 | 预测（strong vs street）→ 揭晓，顺序正确 |
| letters_4 | — | 同源断言只限六词名单；twinkle/twirl 只作例外 | 同源因 = 共同祖先 *dwóh₁“二”；口诀用“常”不用“个个” | “一家”= 同源名单成员，指称有界 | 预测（twins 几人）→ 揭晓（两个），顺序正确 |

### 4.3 T11a 审查两中问题复验（v2 是否修好）

- **第 1 幕步骤条失效 → 已修复。** 新 `gen_phonology_1.js` 中 `stepAt[0]`（126 行）、
  `[1]`（136 行）、`[2]`（162 行）、`[3]` -ed 段起点（185 行）、`[4]` 与口诀旁白同刻
  （206 行）、`[5]` 收尾 dogs 预测起点（210 行）六步全赋时；旧 v1 只赋 `[0..2]`。
- **-ed 无演示 → 已修复。** 新增 ④ 过去式段：stop+ed → /t/、play+ed → /d/
  均过喉咙剖面演示（188/194 行 chip），另补 aged/learned 例外上屏（200–201 行）
  与收尾 dogs 预测（214 行）。时长 75.5s → 125.7s 与此增量一致。
- 另：旧 v1 的“答案指示时序矛盾”类隐患在 v2 规格中已立为 invariant
  （“音注出现『→ /z/』不早于答案卡 swap 时刻”）；本验证未做逐帧时序测量，
  只确认 invariant 已写入规格，建议后续截图复核时抽查该帧。

## 5. 问题清单（全部问题，无遗漏口径）

### 有问题（影响“每幕不合格 0”字面目标，需拍板）

- **V1 — 7 幕缺 insight 数据（phonology_2–4、letters_1–4）。**
  原因：autoBuild 模板（`auto.js:246`）无 `D.odd` 时走 `K.done()`，从不调
  `C.finish()`，故 `__WB5_INSIGHT__` 缺失，决策 38 四项无法验证。
  内容本身有预测→揭晓结构、文字面积与零报错均过关；缺的是数据上报。
  处理选项（二选一，需主代理拍板）：(i) 接受——autoBuild 幕本就不在决策 38
  强制范围，官方口径不合格 0 已通过；(ii) 立项给 autoBuild 接
  `C.aha/C.predict/C.rule/C.finish`，再重验 7 幕。

### 观察（不阻塞通过，仅记录）

- **O1 — phonology_2：need 的 /d/+/d/ 碰撞未展开叙述。**
  want 侧讲清了“两个 /t/ 挤成一团 → 插 /ɪ/”，need→needed 只以词形件出现，
  未讲 /d/+/d/ 同理。类比可推，不构成错误。
- **O2 — phonology_4：hopping/hoping 对照未入幕。**
  模型例证 `ph-ex-stop-hopping` 的 hoping 对照词未出现在场景中；
  场景改用“tap 不双写，就读成 tape 的 /eɪ/”作类比——该类比借用了静音 e
  机制，与双写机制不同，虽能说明“元音变长”但严格讲是跨机制类比。
  主线“双写是拼写记号，不改变读音本身”表述正确，建议后续复核时确认
  是否补回 hopping/hoping 正面对照。
- **O3 — phonology_3：模型例证词未全量入幕。**
  `impatient`（`ph-ex-impossible-impatient` 侧）、`inbox`
  （`ph-xc-inborn-input` 三词之一）未出现在场景中；场景用了 impossible
  与 inborn/input，已覆盖规则与例外，属例证取舍非错误。
- **O4 — phonology_1 决策 39 提示（非强制）。**
  动态 3% / 静态字 83% / 四段不齐——因该幕无 `// @step1_hook` 标记，
  工具仅作提示。若未来升为决策 39 强制幕，需补四段与动态窗口。
- **O5 — phonology_1 规则卡在收尾预测之前。**
  `C.rule`（110.7s）在首个预测之后、收尾 dogs 预测之前；工具判定通过
  （只要求不早于首个预测结束），教学上收尾预测属于“学后应用型预测”，
  非“发现型预测”，不构成时序错误，特此说明。

### 存疑（模型中找不到记录的台词）

- **无。** 关键台词 / 口诀 / 判据句全部找到模型记录（§3.2）；仅 §3.3 所列
  4 组规格层补充句未在模型逐字登记，均不与模型矛盾。

## 6. 逐幕状态

| 幕 | 内容正确性 | 溯源 | insightcheck | 状态 |
|---|---|---|---|---|
| gen_phonology_1 | 通过（v2 两中问题已修复） | 通过（7 组关键句全溯源） | 官方 ✅ / 交付 HTML ✅ | **通过** |
| gen_phonology_2 | 通过（O1 观察） | 通过（6 组全溯源） | 官方口径外 / 交付 HTML 缺 insight 数据（V1） | **有问题（仅 V1）** |
| gen_phonology_3 | 通过（O3 观察） | 通过（6 组全溯源） | 官方口径外 / 交付 HTML 缺 insight 数据（V1） | **有问题（仅 V1）** |
| gen_phonology_4 | 通过（O2 观察） | 通过（6 组全溯源） | 官方口径外 / 交付 HTML 缺 insight 数据（V1） | **有问题（仅 V1）** |
| gen_letters_1 | 通过（旧钩子清零） | 通过（5 组全溯源） | 官方口径外 / 交付 HTML 缺 insight 数据（V1） | **有问题（仅 V1）** |
| gen_letters_2 | 通过 | 通过（5 组全溯源） | 官方口径外 / 交付 HTML 缺 insight 数据（V1） | **有问题（仅 V1）** |
| gen_letters_3 | 通过 | 通过（5 组全溯源） | 官方口径外 / 交付 HTML 缺 insight 数据（V1） | **有问题（仅 V1）** |
| gen_letters_4 | 通过 | 通过（5 组全溯源） | 官方口径外 / 交付 HTML 缺 insight 数据（V1） | **有问题（仅 V1）** |

**总判定：内容与溯源 8/8 通过；insightcheck 官方强制口径不合格 0；
按“每幕不合格 0”字面目标，7 幕因 V1（autoBuild 无 insight 上报）未达标，
需主代理就 V1 处理选项拍板。**

## 附录：实际命令与日志

- `node --check` ×8：全部 OK（§1.1）。
- 重建比对：`WB_FONTS=$HOME/workspace/wb-fonts PATH=$HOME/workspace/bin:$PATH node build.mjs scenes/<gen>.js /tmp/rb2_<gen>.html "<标题>"` → `cmp` 8/8 IDENTICAL。
- 官方 insightcheck：`/tmp/run_ic_t11.py "<8 幕逗号表>"`（`/tmp` 副本，仅参数化
  `--only`；原工具未改）→ `insightcheck 不合格 0`（日志 `/tmp/ic_t11_official2.log`）。
- 交付 HTML 直量：`/tmp/ic_built_base.py <8 个 your_files HTML>`（`/tmp` 副本，
  判断逻辑原文不动）→ `built-HTML insightcheck 不合格 7`（日志 `/tmp/ic_t11_built2.log`）。
- 规格→生成全量比对：Python + PyYAML 脚本（规格 `items`/`know` 逐条查生成 JS，
  含转义归一化）→ 8/8 零缺失、`replace` 零残留。
- 本报告外未改动任何文件；未 git commit，未推送，未改 runbook。
