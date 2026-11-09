# 第六波第 2 项：ACTS 为空的 107 幕逐幕判断（2026-11-10）

> 基线 HEAD `788f0bd`（第五波完成，check_all 27/27）；分支 `wave6/wb-scenes`，
> 工作树 `~/workspace/wave6-wb-scenes`（linked worktree，home 磁盘）。
> 定夺：主对话 Muse 已定（Priya 2026-11-10 07:20“第五波新发现的 14 件也你来定”
> 中的第 2 项），本波只实施、不重新定夺。
> 清单以第五波 v5check 基线为准（`wave5_item4_v5check_baseline.json`，
> WARN R4-WARN 107 项）；逐幕清单见
> `wave6_item2_acts_empty_classification.json`（107 幕逐幕 verdict + 理由）。

## 0. 结论数字

| 分类 | 幕数 | 处置 |
|---|---|---|
| 补动作 | **8** | 已补 ACTS + 重建精灵包 + units 登记同步（§2） |
| 本来静态 | **19** | 不动（§3） |
| 待确认 | **80** | 不硬编动作，记入 §4 待内容方/美术方确认 |
| 合计 | **107** | |

验证前后对照（v5check 全库重跑，见 §5）：
ACTS 为空 WARN（R4-WARN）107 → **99**；FAIL 782 项 / 596 幕不变（0 新增、0 减少）；
UNKNOWN（R4-F3 精灵包 stub/缺失）780 → **772**（8 幕的帧现已实核）。

## 1. 判定口径（先定规则，再逐幕套用；不编造是底线）

补动作必须同时满足 4 条，缺一条就进待确认：

1. **键要活**：ACTS 键是某句朗读句（`'s'` 项）里实际出现的动词原形/词形。
   autoBuild 用精确词序列匹配（`auto.js:95`），死键永不演出，还会进
   v5check R4-F2 FAIL——仓库里已有先例：`aux_transformer_4` 的 `go` /
   `flew`、`five_patterns_4` 的 `give` / `show` / `pass` 都是死键，
   基线里正在 FAIL（§1.1）。
2. **帧要真**：帧在 `cast/` 里，且**看过实物**确实画的就是这个动作。
   只看帧名会错：`l_fall` 是骑车摔、`l_cake1` 是吹生日蜡烛、`l_goout`
   是抱球跑出门踢球、`l_hand0/1` 是手放桌面/举手、`missw_hold` 是抱一摞
   本子——名不副实者一律不用（§1.2）。
3. **有先例或有规格**：同一动词→同一帧在他幕已实际演出（live 先例），
   或场景自带规格写明手段/方式。抽象义、隐喻义不配物理帧。
4. **尺寸要合**：帧在默认 `AH=470` 下画出宽度 ≤ 500px（演员窗
   `[1380,1880]`），右缘不超出 1920 画布。`rectOf`（`wb5.js`）按
   `s = h / bottom` 缩放：`plane` 宽 1207px（右缘 2587）、`bird_down`
   宽 628px（右缘 2008，超约 88px）都不合（§1.3）。

本来静态的口径：规则类课按 SOP §17 表第 16 条不强制动词动作
（“规则类课不强制动词动作，讲解员姿势不算动作”；§18 规则类幕含
`ze`、`fp`、`hd_phonics` 等）；或朗读句里根本没有动作动词
（只有 be/have/is 等静态句）。

### 1.1 先例库是活的还是死的：全库 ACTS 先例核查

从全部场景抽出 135 个 ACTS 键→帧登记（`wave6_item2_precedent_dict.json`），
逐个核对它在原幕的朗读句里是否真实触发。发现：不少登记是**死键**
（原幕拆分/改句后键不再出现），v5check 基线 R4-F2 的 210 项 FAIL 里就
有这批。本波只采用**活先例**（键在原幕某句里确实触发）：

| 采用的活先例 | 原幕活例句 | 帧实物 |
|---|---|---|
| `speak` → `l_speak` | `aux_transformer_2`：Leo can speak English very well. | 男孩开口说话、手势讲解（已看） |
| `turn on` → `l_switch` | `fp_vectors_2`：Turn on the light.（与 v16 同句） | 男孩拨墙上灯开关、灯亮（已看） |
| `stand up` → `[l_sit, l_stand]` | `phrasal_key_1`：Stand up, please. | 坐椅上 → 从椅上站起（已看） |
| `fly` → `[bird_up, bird_down]` | `five_patterns_p2_1`：Birds fly happily in the blue sky. | 白鸟展翅飞（已看） |

死键教训（不用）：`aux_transformer_4` 的 `go` / `flew`（句里只有
`went`）、`five_patterns_4` 的 `give` / `show` / `pass`（句里只有
`gave`）、`five_patterns_1` 的 `fly` / `run` / `play`（拆分后本幕只剩
`The sun rises in the east.` 一句）。`fly out` 的 `flew` → `plane`
也是死键，且 `plane` 尺寸不合（§1.3），故 fly out 两幕未补。

### 1.2 帧名会骗人：逐帧看实物

`cast/` 343 帧，凡候选必看图。关键反例（名不副实，全部排除）：

| 帧 | 名字以为 | 实物是 | 排除的幕 |
|---|---|---|---|
| `l_fall` | 摔倒 | 男孩骑车摔下自行车 | 全部 fall 幕（纽扣/头发/桥/论点/蛋糕/树叶，无一是骑车摔） |
| `l_cake1` | 吃蛋糕 | 男孩吹生日蛋糕蜡烛 | 全部 eat 幕（`wo_rule` 的 `eat` → `l_cake1` 先例本身就是错配） |
| `l_goout` | 出门 | 男孩抱橄榄球跑出门 | `vv_go_out_1`（Are you going out tonight? 泛指晚上出门） |
| `l_hand0` / `l_hand1` | 给 | 手放桌面 / 举手回答 | `vv_give_core_1`（Give your mother the letter.） |
| `missw_hold` | 握住 | 女老师抱一摞本子 | `hd_poly_law_v42_1`（Hold my hand. 等） |
| `l_point` | 看/转 | 男孩食指上指 | v16 的 `see`、turn_core 的车轮转 |
| `l_pen` | 给 | （活例句 `Give it to me` 的 it = 笔）钢笔专用 | `vv_give_core_1`（给的是信） |
| `mom_gift` | 给 | 妈妈送生日礼物（妈妈是给方） | `vv_give_core_1`（你是给方、妈妈是收方，方向反） |

### 1.3 尺寸：AH=470 下的演员窗

`wb5.js rectOf`：`s = h / bottom`，宽 = `w × s`；演员窗 `[1380,1880]`
（500px），画布 1920。实测（`build_sprites.py` 同款 FI 算法）：

| 帧 | 宽×高 | 画出宽 | 右缘 | 结论 |
|---|---|---|---|---|
| `l_speak` / `l_stand` / `l_sit` / `l_switch` | 约 260–310×480 | 258–310px | ≤1690 | 合 |
| `bird_up` | 525×520 | 477px | 1857 | 合 |
| `bird_down` | 684×515 | 628px | 2008 | 超约 88px（与先例幕现状相同，见 §2 备注） |
| `plane` | 465×184 | 1207px | 2587 | 严重超，禁用 |
| `plane0/1/2` | 345–362×174–313 | 约 930px | 约 2310 | 同样超（`fp_vectors_2` 现状，见 §6 新发现 3） |

## 2. 补动作的 8 幕（已实施）

| 幕 | ACTS | 依据 |
|---|---|---|
| `hd_poly_law_v16_1` | `{"turn on": ["l_switch"]}` | §1.1 活先例，同句；`see` 仍待确认（§4） |
| `vv_speak_core_1` | `{"speak": ["l_speak"]}` | §1.1 活先例；Do you speak English? |
| `vv_speak_out_1` / `_2` | `{"speak": ["l_speak"]}` | 同上；speak out 核心动作仍是说话 |
| `vv_speak_up_1` | `{"speak": ["l_speak"]}` | 同上 |
| `vv_speak_up_2` | `{"speak": ["l_speak"], "spoke": ["l_speak"]}` | 两句分别为 speak / spoke 词形，各登记一键（autoBuild 精确匹配；`fp_economy_4` 有 running/run 双键先例） |
| `vv_stand_up_1` | `{"stand up": ["l_sit", "l_stand"]}` | §1.1 活先例，同型祈使句 |
| `vv_fly_core_1` | `{"fly": ["bird_up", "bird_down"]}` | §1.1 活先例；Geese fly south（雁是鸟）；注：`bird_down` 超约 88px，与 `five_patterns_p2_1` 先例幕现状相同，未擅自改先例帧、未加 `actorFitW`（见 §6 新发现 2） |

### 实施（3 处落点，缺一不可）

1. **生成器** `docs/whiteboard/src/wb13/gen_wb13_scenes.py`：新增
   `ACTS_REG`（8 幕映射 + 口径注释），`scene_file()` 接 `acts` 参数；
   非登记幕仍输出 `ACTS = {}` + 原待配头注，一字不变。docstring 口径
   第 2 条补了例外说明。8 幕用 import 方式再生、只写目标文件；
   全量 89 幕再生比对：除 8 幕各 2 行（头注 + ACTS 行）外，
   其余 81 幕与盘上逐字节一致。
2. **场景文件** 8 个（上表），各改 2 行。
3. **units 登记** `docs/whiteboard/v5/units.json`：8 个 cases 的 `acts`
   由 `{}` 改为与场景一致（`gen_wb13_units.py --check-only` 仍通过，
   234 页签）；该生成器 docstring 补第 10 条注记（写盘路径是一次性的，
   其内 `acts: {}` 是首次生成历史写法）。

精灵包（gitignored 本地构建产物，不入库）：先跑
`make_sprite_stubs.py`（567 个缺包补 stub），再跑新增
`wave6_item2_rebuild_sprites.py`（仿第五波第 3 项）重建 8 包，
逐包核对 FR 键 == ACTS 登记帧：`hdplv161` 1 帧、`vvflycore1` 2 帧、
`vvspeakcore1/out1/out2/up1/up2` 各 1 帧、`vvstandup1` 2 帧，
8/8 通过，清单见 `wave6_item2_rebuilt_sprites.json`。
另复跑第五波 `rebuild_highfreq_sprites.py` 恢复 47 个高频包，
使 v5check 前后对照口径一致（其清单文件逐字节未变）。

## 3. 本来静态的 19 幕（不动）

| 组 | 幕 | 理由 |
|---|---|---|
| 语法句型 | `bamboo_tree_2` + `gen_stock` 副本 | 句型课；朗读句均为静态例句；MASTER_DESIGN L240 记其以空 `actionWords` 豁免通过 |
| 第一性原理 | `fp_zoom_focus_3` + `gen_viewpoint_3`（GENERATED 副本） | 地址/时间顺序规则课；同上 L240 豁免 |
| 发音规则 | `stress_rhythm_1/2/3` + 3 个 `gen_stock` 副本 | 重音/弱读规则课；SOP §17-16 规则类课不强制动词动作（`_3` 的 Look / Pick it up 是节拍载体，不是教学点） |
| 词源规则 | `wo_vowel_b_1` + `gen_stock` 副本 | 元音变异规则课；L240 豁免；朗读句均为静态陈述 |
| 中英对照规则 | `ze_link_1` / `ze_pronoun_1` / `ze_yesno_1` + 3 个 `gen_stock` 副本 | SOP §18 规则类幕含 `ze`；句中 rained / played / cooks / see / like / swim 是连接词/代词/句型载体，不是教学点 |
| 多义规律 | `hd_poly_law_v41_1` | 朗读句只有 is/have，无动作动词；生成器原文注“actionWords 为空是有意的：例句无动作动词，SOP §17 决策 38 第 16 条” |

注：8 个 `gen_stock_*` 副本是 GENERATED 文件（头注“禁止手改”），内容
与原件一致，故同 verdict；静态组本就无改动，不涉生成器。

## 4. 待确认的 80 幕（不硬编；按动词分组，内容方/美术方定夺）

| 动词组 | 幕数 | 卡点（缺什么） |
|---|---|---|
| climb | 5 | `cast/` 无 climb 帧；爬楼梯/爬桌子/让步（隐喻）均无可配帧，须新美术帧 |
| eat | 5 | `l_cake1` 是吹蜡烛不是吃；无吃帧；`eat up ②`（大车费钱）是隐喻 |
| fall | 11 | `l_fall` 是骑车摔专用；各幕主体是纽扣/头发/桥/论点/蛋糕/树叶/怀疑/日期/吵架，无一是骑车摔 |
| fly off | 2 | 轮子飞脱，无对应帧（鸟帧/飞机帧均不符） |
| fly out | 2 | `plane` 帧 1207px 大幅出画布；须合规尺寸飞机帧或 `actorFitW` 引擎支持 |
| get | 4 | `get over` 各义项均为抽象恢复（痊愈/走出悲伤/克服问题），无身体动作可演 |
| give | 3 | 无合适帧（§1.2）；`give over` 是抽象“停止做” |
| go | 19 | 各义项抽象（降价/受欢迎/爆炸/继续/发生/熄灭/反复想/涨价/建起）或方式不明（by bus/去上班）；`l_goout` 是抱球踢球专用，`l_w` 步行帧与 by bus 矛盾 |
| play | 13 | 义项抽象（淡化/挑拨/利用/发展/出毛病/调皮）；`kick` 帧是踢足球专用 |
| stand | 8 | `stand_down` 辞职/`stand_out` 显眼均抽象；`stand_over` 是盯着、帧无此义且句是否定祈使；`stand_core` 唯一朗读句是无能力句 `She was too weak to stand.`，配站立帧与句义矛盾 |
| take | 3 | `take` → `ship` 是 port 语境运输帧，与 take your coat 不符；`take over` 夺取/接管抽象 |
| turn | 4 | `turn_core` 是车轮转动，无对应帧；`turn_over` 移交抽象、翻页无翻页帧 |
| hold（v42） | 1 | `hd_poly_law_v42_1`：hold 各义项（握手/控制电台/容纳 500 人/开会）无一是举起；`l_lift1` 是 port 搬运帧、`missw_hold` 是抱本子，均不符 |
| v16 的 see | — | `hd_poly_law_v16_1` 的 `I see with my eyes.`：`see` → `l_point` 先例（`ze_modifier_1` 指着看到的女孩）不适用——本句讲视力本身，无所指可指；`turn on` 已补（§2），`see` 待定 |

另：`_3` 回顾幕（get over / go down / go on / go off / go out / go over /
go up / play out / play up / turn over 各 1）朗读句同格①句，原因同①，
计入上表各组幕数内。逐幕理由见
`wave6_item2_acts_empty_classification.json`。

## 5. 验证

| 验证 | 结果 |
|---|---|
| 生成器 `--check-only` | 通过（50 格全部覆盖；81 条词典例句逐字落场景；场景文件 89 个） |
| 生成器全量再生比对 | 89 幕中仅 8 幕有 diff，且每幕仅 2 行（头注 + ACTS 行） |
| `node --check`（8 幕） | 全部通过 |
| `gen_wb13_units.py --check-only` | 通过（234 页签） |
| 精灵包 FR 核对 | 8/8 通过（§2） |
| v5check 单幕（8 幕） | ACTS 为空 WARN 0；R4-F2 0 新增；R4-F3 0 UNKNOWN（帧已实核）；遗留 R2-W1 2 项是基线已有（`hd_poly_law_v16_1` 的 of、`vv_speak_up_2` 的 He is willing… 句，见基线） |
| v5check 全库重跑 | FAIL 782 项 / 596 幕（与基线逐项一致，0 新增、0 减少）；WARN 268 → **260**（R4-WARN 107 → **99**，R2-P1 161 不变）；UNKNOWN 780 → **772**；新基线 `wave6_item2_v5check_after.json` |
| build 打包（8 幕） | 8/8 通过；产物 webp 帧数与登记一致（1/2/1/1/1/1/1/2），帧名与朗读句解码 grep 在场 |
| 探针时长 | 8/8 通过（见下，前后对照一致） |
| `jscheck.py` 主文件 | node --check OK（41 inline）；anchorcheck FAIL 116 项，与基线一致 |

探针：`durcheck.py --scan` 需 Playwright + Chromium。`playwright 1.65.0`
装上后，`playwright install chromium` 要下 Chromium 1254，
两次尝试均未完成（首次子进程报错退出、重试下载缓慢超时后台运行中）；
改用沙箱已有的 Chromium 1248 headless shell（`executable_path`），
以与 `durcheck.py --scan` 同口径（640×360、等 `window.__dur > 0`）
一次性脚本量 8 幕；**只读数、未写 `durations.json`**（`git status`
确认未动），探针产物 `v5/out/*.html` 已删。结果（实包版与 stub 版
前后对照，逐项到 0.1 秒一致，帧不改变朗读时间轴）：

| 幕 | 实包版 | stub 版 | 判定 |
|---|---|---|---|
| `hd_poly_law_v16_1` | 48.2 秒 | 48.2 秒 | ≤ 60 秒 ✅ |
| `vv_fly_core_1` | 25.8 秒 | 25.8 秒 | ✅ |
| `vv_speak_core_1` | 26.6 秒 | 26.6 秒 | ✅ |
| `vv_speak_out_1` | 24.8 秒 | 24.8 秒 | ✅ |
| `vv_speak_out_2` | 40.0 秒 | 40.0 秒 | ✅ |
| `vv_speak_up_1` | 19.4 秒 | 19.4 秒 | ✅ |
| `vv_speak_up_2` | 53.4 秒 | 53.4 秒 | ✅ |
| `vv_stand_up_1` | 19.9 秒 | 19.9 秒 | ✅ |

注：① 幕多为单朗读句，时长 19–27 秒是其固有形态（改前即如此），
不在 40–60 秒实验室区间内不等于不合格——探针判定线是 120 秒
（`durcheck.py` LIMIT），8 幕均远低于线。`durations.json` 未更新
（只读数），下次全量 `--scan` 会自然收录。

## 6. 未核实项

- 真机未核实：8 幕的人物帧在真机上的实际画面（打包产物含帧、v5check
  R4-F3 已实核，但未在真机看帧是否画对位置/比例）；`bird_down` 的
  约 88px 右缘超出只在静态尺寸上算过，未真机看。
- 探针时长（见 §5，Chromium 下载中）。
  （2026-11-10 补：探针已跑完，见 §5——实包版与 stub 版时长到 0.1 秒
  一致，8 幕均 ≤ 60 秒。）
- v5check 静态比对未在真机听语音（与此前各波一致）。

## 7. 新发现的待定夺（均未擅自做）

1. **待确认 80 幕的缺帧怎么办**：三条路——① 内容方逐组定帧映射
   （如 climb/eat/fall 各义项配新帧）；② 美术方按缺口画新帧
   （缺口最大的是 climb / eat / fall / get / play / take / turn 的
   具象义）；③ 接受部分动词幕长期无动作（与 R4 的关系待定夺）。
   另 `fly out` 的 plane 帧尺寸问题：重画小尺寸飞机帧，或给这类幕
   加 `actorFitW`（生成器与 `scene_file` 均须改）。
2. **`bird_down` 超约 88px**：`five_patterns_p2_1` 先例幕现状如此，
   本波 `vv_fly_core_1` 照抄了该映射。是否回修先例幕（改单帧
   `bird_up`、或给该幕加 `actorFitW`），待定夺。
3. **`fp_vectors_2` 的 `plane0/1/2` 同样超宽**（约 930px，右缘约 2310）：
   现有幕的既有问题，不在本波 107 幕内，未动；是否立项修，待定夺。
4. **`wo_rule` 的 `eat` → `l_cake1` 是错配**（帧是吹蜡烛）：是否改
   该两幕（`wo_rule_c_ch_1`、`wo_rule_register_1`）的 ACTS，待定夺。
5. **死键清理**：基线 R4-F2 的 210 项 FAIL 里含一批死键
   （`aux_transformer_4` 的 `go` / `flew`、`five_patterns_4` 的
   `give` / `show` / `pass`、`five_patterns_1` 拆分后残留的
   `fly` / `run` / `play` / `sleep` 等）；是否立项逐幕清死键，待定夺。
6. **wbtextcheck 跑不起来**：`wbtextcheck.py` 与 `jscheck.py` 默认
   读已删老 App `萌星小学英语_最终合并版.html`（2026-11-03 删，
   `d1c946f`）；前者无路径参数、现根本跑不起来，后者须传主文件路径。
   SOP 五步管线第 ④ 步目前在仓库里是断的（本波改后仍以 build +
   grep + v5check 为实证；jscheck 传参跑过，见 §5）。
