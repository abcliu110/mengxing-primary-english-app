# 第七波白板线场景底稿——第 3、6、7、8、9、11、12 项（`wave7/wbscenes`）

> 日期：2026-11-10 · 执行：第七波白板线场景实施员 · 基线 `8e278f2`（master，已与远端同步）
> 范围：只动下面 7 项；未改 SOP.md、v5check.py、主文件、DATA_SOURCE_SPEC.md；未 push（总协调人合并后统一推）
> 工作树：`~/workspace/wave7-wbscenes`（分支 `wave7/wbscenes`，home 磁盘）
> 探针：Chromium 1254 仍未装上（下载断连，同第六波）；一律用本机 chromium_headless_shell-1248（`executablePath` 直指二进制）+ hanzi-app 的 node playwright 1.64.1；口径同 `durcheck.py --scan`（640×360，等 `window.__dur > 0`）
> 精灵包与 node_modules 是 gitignored 本地产物：为打包/探针从主树复制（580 包）+ 7 包从 cast/ 重建（见第 7/8 项），均不入库、不进提交

## 按项汇报

### 第 3 项：writing_alchemist_1 拆节（260s → 3 节）✅

**做法**：`python3 docs/whiteboard/v5/split_auto.py writing_alchemist_1`（决策 36-② 既定工具，`--max 90` 默认值；先 `--dry` 再实跑）。
原 50 条 ITEMS 按讲解段（只在 `'n'` 前下刀）切 3 节，R1 零丢失已验：三节 17/22/11 条，拼回与原 50 条逐条相等。

| 节 | 文件 | 内容 | 估计 | 实测探针 |
|---|---|---|---|---|
| 第 1 节 | `writing_alchemist_1.js`（原文件只留本节） | 开场 + 公式① be crazy about / enjoy doing | 82s | **76.7s** |
| 第 2 节 | `writing_alchemist_p2_1.js`（新） | 公式② What a…! / How…! + 公式③ not only… but also… | 87s | **90.7s** |
| 第 3 节 | `writing_alchemist_p3_1.js`（新） | 隐喻 + 五感法则 + 6 句复述 + 口诀 | 83s | **98.7s** |

- 拆前：`durations.json` 252.2s；第六波探针实测 260.1s。三节实测合计 266.1s（+6.0s = 每节独立的结尾卡/拉远开销，机制固有）。
- 对 60–90s 目标：第 1 节 ✅；第 2 节 +0.7s；第 3 节 +8.7s。三节全部 ≤120s durcheck 门限 ✅。
- 4 节替代方案已试并否决：`--max 80 --dry` 估计 [63, 59, 71, 58]，但下刀在「基础句 / 高级句型 / enjoy doing」，把公式①劈成三截（开场一节、60→100 分一节、enjoy doing 讲解一节），教学上不如 3 节按公式整切。见「新发现 3」。
- 未加「节末 3 秒预测题」：36-② 原文有这句，但 `split_auto.py` 与全部先例拆分（five_patterns、hd_g07 等）都不加；新编预测题是新内容，按不编造规则未加。见「新发现 2」。
- **units 登记**：`units.json` 一字未动。先例：全部 `_p2_/_p3_` 场景都不在 units 口径内（`grep _p2 units.json` = 0 行；`gen_wb13_units.py` docstring 第 7 条明写 `fp_economy_p2_1` 为 parts 机制幕、不在 units 口径内）；三节 ACTS 与原幕逐字相同，case 1 登记已覆盖。`gen_wb13_units.py --check-only` 仍 234 页签通过。头注里「App 白板下「第 N 节」按钮」是 split_auto.py 沿用先例的措辞，指已随老 App 退役的 `patch_wb5_parts.py` 机制；三节现均可经 `build.mjs` 独立播放，接线进现主文件是另立项（主文件本波不碰）。见「新发现 1」。
- v5check（逐幕 + 全库）：三节各 FAIL 6，共 18；拆前基线该幕 5 项。全库重跑 **452 项 / 413 幕（R2-W1 402、R4-F2 50），对第六波基线 439 项（399/40）为 +13**，构成已逐项核对：R4-F2 5→15（名词死键 piano/sweeping/strawberries/sheep/helps 被 `split_auto.py` 原样抄进三节，按幕计 3 次；死键本身是基线已有、删键还是补句是另一线第 4 项的待定夺，本线未动）；R2-W1 0→3（doing/like/very/much、very/happy/yesterday、not/only/but/also——每节的词只在另一节的朗读句里读到，跨节产物；同类项先例 `five_patterns_p3_1` 的 in×1 已在基线里）。WARN 105 不变。基线 JSON 未重写（重定基线 439→452 由总协调人定，见「新发现 4」）。
- `durations.json` 未改（第六波惯例：探针只读数、不写该文件）；三节新值（76.7/90.7/98.7）待总协调人跑 `durcheck.py --scan` 刷新，见「新发现 5」。
- `writing_alchemist_2`（267.8s）、`_3`（298.6s）未动，不在本项范围。见「新发现 10」。

### 第 6 项：待确认 80 幕缺帧——接受长期无动作（只记一笔）✅

80 幕缺帧接受长期无动作，待内容方定映射、美术方画新帧。与第六波分类并列（`wave6_item2_acts_empty_classification.json`：补动作 8 / 本来静态 19 / 待确认 80）。未改代码。

### 第 7 项：bird_down 超宽——回修先例幕 five_patterns_p2_1 ✅

**根因（实测）**：`bird_down` 帧 FI 684×515（bottom 512，ax 335.34；重建包与 tracked 的 `tm1.js` 一致，与第六波 §1.3 表一致）。`AH=470` 下画出 628px 宽，演员窗 [1380,1880] 只有 500px，右缘 2008，超画布 88px。

**做法**：`autoBuild` 加 `actorFitW: 500`（引擎既定机制，`auto.js` P2 分镜收界；先例 `fp_vectors_3.js`、`gen_spacetime_3.js` 同值）。按幕内最宽帧统一收高 AH，不改内容、不改帧。

| 幕 | 飞键是否活 | 修前右缘（静态/浏览器） | 修后 AH | 修后右缘（静态/浏览器） |
|---|---|---|---|---|
| `five_patterns_p2_1` | fly 活 | 2008 / 1918（触右缘） | 374.3 | 1880 / **1853** |
| `fp_economy_3` | fly 活 | 2008 / — | 374.3 | 1880 / **1878** |
| `fp_iconicity_2` | flies/fly 活 | 2008 / — | 374.3 | 1880 / **1878** |
| `fp_one_king_4` | fly 活 | 2008 / — | 374.3 | 1880 / **1853** |
| `vv_fly_core_1` | fly 活 | 2008 / — | 374.3 | 1880 / **1878** |

- 静态复核：`wave7_wbscenes_actorfit_check.py`（逐动作复算 `auto.js` 的 AX 钳制；修前与第六波数字逐项一致：bird_down 2008）。浏览器实测：`wave7_wbscenes_geom_probe.mjs`（`__seek` 跳到飞句，读 1920×1080 canvas 最右非底色像素；修后截图已看，整只鸟完整入窗）。
- 范围说明（同缺陷扫面，键须活才修）：`five_patterns_1`（fly 死键，拆分后本幕只剩 `The sun rises in the east.`，从不渲染）、`five_patterns_p3_1`（fly 死键）不修；`gen_letters_2` / `gen_phonology_3` / `gen_sentence_4` / `gen_stock_five_patterns_*` 是 GENERATED（头注「禁止手改」）不修，需 `gen_scene.py` 支持 actorFitW（见「新发现 6」）；`tense_matrix_1` 是手写 `K.actor`（h=210，画出约 280px）不超，不修。
- 代价：这 5 幕的演员高 470→374（80%）。时长不变（`fp_economy_3` 173.4s 与第六波探针逐项一致；`vv_fly_core_1` 25.8s 一致）。`fp_economy_3` / `fp_iconicity_2`（152.7s）/ `fp_one_king_4`（162.1s）仍 >120s，是旧长幕账，不属本项。

### 第 8 项：fp_vectors_2 的 plane0/1/2 超宽 ✅

**根因（实测）**：plane0/1/2 FI 349×178 / 366×317 / 351×238（bottom 175/314/235）。`AH=470` 下逐动作 AX 真值右缘 **2436（超 516px）**——比第六波单帧估算的「约 930px / 右缘约 2310」更糟：三帧共用一个演员 x，`plane2` 的左钳制把 x 推到 1930.7，`plane0` 右缘随之到 2436。浏览器实测：起飞句（`The plane takes off! Don't fall off the bike.`，cue 101.5s）最右像素 x=1919 触右缘，截图机头被裁掉一半。

**关键发现——先例值 500 修不好这幕**：`actorFitW=500` → AH=250.7，三帧 AX 区间仍无交集，右缘 1943（仍超 23px）。三帧相容要求 AH≤222.6，即 actorFitW≤444（绑定对：`plane2` 左钳制 vs `plane0` 右钳制）。故本项取 **`actorFitW: 440`**（AH=220.6，右缘 1876，左缘 1380）。

| 幕 | 键是否活 | 修前右缘（静态/浏览器） | 修后 AH | 修后右缘（静态/浏览器） |
|---|---|---|---|---|
| `fp_vectors_2` | takes off 活 | 2436 / 1919（机头被裁） | 220.6 | 1876 / **1834** |
| `vv_take_off_2` | `*` 通配活 | 2436 / — | 220.6 | 1876 / **1873** |

- `vv_take_off_2` 同修：同一组帧、同一缺陷（`*` 通配每句都触发），手写幕。修后截图已看，整架飞机完整可见。
- 未修：`gen_spacetime_2` / `gen_stock_vv_take_off_2`（GENERATED，禁止手改；见「新发现 6」）；`aux_transformer_4` 的 `flew → plane` 是死键（句里只有 `went`），从不渲染，不修。
- 代价：这两幕的演员高 470→221（47%）。时长不变（`vv_take_off_2` 39.4s）。另：`Take off your coat. The plane takes off.` 一句里 `take off` 排在 `takes off` 前，`hit[0]` 取脱外套动作、飞机不出现——引擎既定行为，未动。

### 第 9 项：wo_rule 的 eat → l_cake1 错配（无帧可改，只记一笔）✅

**未改代码。** 第一手核实：
- `l_cake1` 实物已看图：男孩吹生日蛋糕蜡烛，确不是吃。
- 两幕的 eat 句：`wo_rule_c_ch_1`「I like to eat cheese.」（吃奶酪）、`wo_rule_register_1`「We eat beef and pork.」（吃牛肉和猪肉）。
- 盘上候选帧已看图：`m_bread` 是女孩抱着一条面包（没吃；且是面包不是奶酪/牛肉猪肉）；`dad_apple` 是男人把苹果举到脸旁（没吃；且是苹果，别处作 give 道具）。cast/ 343 帧无一张是「人正在吃东西」的动作帧（与第六波「无吃帧」结论一致）。
- 故按任务口径「无则记入底稿，不编造帧」：`eat → l_cake1` 的错配仍留在两幕，待美术方画通用吃帧，或内容方决定删 eat 键（删键是内容决定，本线未擅自做）。`vv_put_out_1` 的 `l_cake0/1/2` 是生日蛋糕幕本身，吹蜡烛是对的，未动。

### 第 11 项：wbtextcheck.py 修好 ✅

**修前**：启动即 `FileNotFoundError`——写死的 `萌星小学英语_最终合并版.html` 已于 2026-11-04 删除；SOP 五步管线第 ④ 步是断的。
**修法**（`docs/whiteboard/src/wbtextcheck.py`，只改此文件；SOP.md 只读未动）：
- 接受路径参数 `python3 wbtextcheck.py [APP.html]`，缺省为现主文件 `laws-prototype/mengxing-prototype-v1.html`；不再读已删老 App。SOP 第 ④ 步原调用（无参数）恢复可执行。
- ② 截断句 / ③ 底部字幕是口诀 需 `GRAMMAR_DB`，但该表只存在于已删老 App：全仓库核实——主文件 `GRAMMAR_DB` 0 处、`why_explanation` 0 处；故给现主文件时只跑 ① Markdown 残留，②③ 打印一行跳过说明、不静默。②③ 若要恢复，须先定新事实源（如从 LAWDATA 重定口径），另立项，本脚本不自行补数据。
- 其余逻辑一字未动（① 全幕扫描、白名单、输出格式与退出码）。

**验证**：
- 缺省跑：`wbtextcheck 幕 875（白名单跳过 0），不合格 0`，退出码 0。
- ②③ 分支验证（/tmp 假 GRAMMAR_DB，覆盖 40 个 G 号，不入库）：`幕 875，不合格 0`，退出码 0，分支能跑通。
- 反向自证：合成含 `**` 与反引号的 ITEMS，① 报出 2/2。

### 第 12 项：fly out 的 plane 帧加 actorFitW ✅（参数已加，当前 dormant）

**先说清前提**：`vv_fly_out_1.js` / `vv_fly_out_2.js` 的 `ACTS = {}`——两幕现在根本没有映射任何 plane 帧（第六波未补：候选 `flew → plane` 是死键——句里只有 `He is scheduled to fly out on Friday.`，无 `flew`——且 plane 尺寸不合）。所以「给 plane 帧加 actorFitW」按字面没有可附着的帧。
**安全部分已做**：两幕 `autoBuild` 各加 `actorFitW: 440`（取飞机动作安全值，与第 8 项同值；见第 8 项「500 修不好三帧飞机动作」的推导）。`ACTS={}` 时引擎循环取不到帧，AH 保持 470，当前是 dormant、无视觉变化；将来一旦登记 plane0/1/2，参数即生效。
**验证**：node --check 2/2；打包 2/2；探针 `vv_fly_out_1` 22.1s / `vv_fly_out_2` 33.0s，0 报错；v5check FAIL 0（WARN 1 + UNKNOWN 1 各 1，ACTS 为空类，修前已有）；静态复核脚本明示 dormant。
**未做**：未补 ACTS 映射。真要让飞机出现，须定夺活键映射（如 `fly out → plane0/1/2`；活先例：`takes off → plane0/1/2`、` * → plane0/1/2`；`flew → plane` 是死键先例，不能用）。见「新发现 7」。

## 验证总表

| 检查 | 结果 |
|---|---|
| 改动场景 node --check（12 幕：拆节 3 + 鸟 5 + 飞机 2 + fly out 2） | 全部通过 |
| 打包 `build.mjs`（12 幕，WB_FONTS 实包） | 12/12 通过；打包产物 grep 预期朗读句逐字命中（§3 三节各句、复述句均在场） |
| 探针时长 + 0 报错（12 幕） | 76.7 / 90.7 / 98.7 / 173.4 / 152.7 / 162.1 / 25.8 / 39.4 / 22.1 / 33.0s 等，0 报错；actorFitW 不改时间轴（两幕与第六波探针到 0.1 秒一致） |
| 几何探针（7 幕，浏览器实测） | 鸟 1853/1878/1878/1853/1878、飞机 1834/1873，全部 ≤1880、在窗内；修后截图已看（飞机整机、鸟整翅可见） |
| `gen_wb13_scenes.py --check-only` | 通过（50 格，89 场景） |
| `gen_wb13_units.py --check-only` | 通过（234 页签；拆节未新增页签） |
| `check_all.py` | **27/27，结论：全部通过**（含 jscheck 41 inline） |
| `wbtextcheck.py`（SOP 第 ④ 步） | 875 幕，不合格 0，退出码 0 |
| `v5check.py` 全库 | **FAIL 452 项 / 413 幕（R2-W1 402、R4-F2 50）**；第六波基线 439（399/40），+13 全是第 3 项拆节产物（见上）；WARN 105 不变；UNKNOWN 855（见注） |

注：UNKNOWN 855 vs 第六波 870（-15）是本工作树本地环境所致：为几何验证从 cast/ 重建了 7 个真实精灵包（fpat1/fe3/fi2/fk4/vvflycore1/fv2/vvtakeoff2），R4-F3 由「未知」变「已知」；包是 gitignored 本地产物，不入库、不进提交；只含 stub 的树上 UNKNOWN 仍为 870。

## 未核实项

- 真机画面：全部几何只在 headless Chromium 1248 + 截图上核实，未在真机/平板/孩子面前看过；TTS 语音未听。
- `writing_alchemist` 三节的实际课堂连播（第 1 节播完是否自动出现「第 2 节」入口，取决于已退役的老 App 机制；现主文件无此接线，见新发现 1）。
- 演员缩小后的观感（鸟 80%、飞机 47% 高）只在截图上看过，未请孩子/老师评。

## 新发现的待定夺（只列出，不实施）

1. 拆节的「第 N 节」按钮接线：新节头注沿用先例写法「App 白板下「第 N 节」按钮」，但该机制（`patch_wb5_parts.py`）随老 App 退役，现主文件无接线；三节目前只能经 `build.mjs` 独立播放。是否在现主文件里接「第 N 节」切换，另立项。
2. 36-②「节末 3 秒预测题」：全部先例拆分都不加；要加须新编题目（内容决定），或接受现状。
3. `writing_alchemist_1` 第 3 节 98.7s，超 90s 目标 8.7s：接受，或换 4 节切法（会劈开公式①，见第 3 项）。
4. v5check 基线重定：接受拆分则基线 439→452（R2-W1 399→402、R4-F2 40→50）；或给 13 项拆节产物立 r2skip 豁免。
5. `durations.json` 待 `--scan` 刷新：`writing_alchemist_1` 76.7s、新 `writing_alchemist_p2_1` 90.7s、`writing_alchemist_p3_1` 98.7s（旧 252.2s 已失效）。
6. 生成幕同缺陷未修：`gen_spacetime_2`（飞机）、`gen_letters_2` / `gen_phonology_3` / `gen_sentence_4` / `gen_stock_five_patterns_*`（鸟）均为 GENERATED、禁止手改；要修须 `gen_scene.py` 支持 actorFitW（生成器改动）。
7. fly out 飞机映射未定：`fly out → plane0/1/2` 是否登记（actorFitW 已预埋 440）；或维持 ACTS 为空。
8. wo_rule 的 eat 映射仍错（`eat → l_cake1` 吹蜡烛）：美术方画通用吃帧，或内容方删 eat 键。
9. `grammarcheck.py` 与修前的 wbtextcheck 同病：写死已删老 App（`GRAMMAR_DB`），同样跑不起来；修不修另立项（本波只修了 wbtextcheck）。
10. `writing_alchemist_2`（267.8s）、`_3`（298.6s）仍是长幕，未拆（不在本波范围）。
11. `fp_economy_3`（173.4s）、`fp_iconicity_2`（152.7s）、`fp_one_king_4`（162.1s）仍 >120s，是旧长幕账，未拆（本波只修宽度）。
12. actorFitW 的视觉代价：飞机演员缩到 47% 高、鸟到 80%；若嫌小，另一条路是第六波提过的「重画小尺寸飞机帧」（美术方），本波未走。
13. Chromium 1254 仍未装上；下次 `durcheck.py` 默认启动仍会失败，继续用 1248 `executable_path` 方式或另行下载。
14. 第 6 项：80 幕缺帧接受长期无动作（见上）——内容方定映射、美术方画新帧后才有下一步。

## 改动文件清单

- 第 3 项：`docs/whiteboard/v5/scenes/writing_alchemist_1.js`（改）、`writing_alchemist_p2_1.js` / `writing_alchemist_p3_1.js`（新）
- 第 7 项：`five_patterns_p2_1.js`、`fp_economy_3.js`、`fp_iconicity_2.js`、`fp_one_king_4.js`、`vv_fly_core_1.js`（各 +`actorFitW: 500`）
- 第 8 项：`fp_vectors_2.js`、`vv_take_off_2.js`（各 +`actorFitW: 440`）
- 第 12 项：`vv_fly_out_1.js`、`vv_fly_out_2.js`（各 +`actorFitW: 440`，dormant）
- 第 11 项：`docs/whiteboard/src/wbtextcheck.py`（修）
- 底稿与验证脚本（本文件同目录）：`wave7_wbscenes_main.md`（本文件）、`wave7_wbscenes_probe.mjs`（时长探针）、`wave7_wbscenes_geom_probe.mjs`（几何探针）、`wave7_wbscenes_actorfit_check.py`（静态尺寸复核）
- 未改：`units.json`（拆节不新增页签）、`durations.json`（待重扫）、`v5check.py`、SOP.md、主文件、DATA_SOURCE_SPEC.md
