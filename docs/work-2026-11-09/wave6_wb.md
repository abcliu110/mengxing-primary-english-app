# 第六波白板线总底稿（2026-11-10）

> 起点 HEAD `788f0bd`（第五波完成，check_all 27/27）；分支 `wave6/wb-scenes`，
> 工作树 `~/workspace/wave6-wb-scenes`（linked worktree，home 磁盘）。
> 定夺：主对话 Muse 已定（Priya 2026-11-10 07:20“第五波新发现的 14 件
> 也你来定”中的白板线第 2、5 项），本波只实施、不重新定夺。
> 不要 push 到 origin（总协调人统一合并），不要 force-push。

## 0. 提交清单（`788f0bd..HEAD`，线性历史，无 force-push）

| 提交 | 内容 |
|---|---|
| `414f80a` | Content：第 2 项 ACTS 为空 107 幕逐幕判断（8 幕补动作） |
| `97b2a12` | Docs：第 5 项 MASTER_DESIGN r2check 引用改写 |
| （本提交） | Docs：本总底稿 |

## 1. 第 2 项：ACTS 为空的 107 幕逐幕判断 ✅

详见 `wave6_item2_acts_empty.md`（逐幕清单
`wave6_item2_acts_empty_classification.json`）。

- 分类：**补动作 8 / 本来静态 19 / 待确认 80**，合计 107。
- 补动作的 8 幕：`hd_poly_law_v16_1`（turn on → l_switch）、
  `vv_speak_core_1` / `vv_speak_out_1` / `vv_speak_out_2` /
  `vv_speak_up_1` / `vv_speak_up_2`（speak/spoke → l_speak）、
  `vv_stand_up_1`（stand up → l_sit, l_stand）、
  `vv_fly_core_1`（fly → bird_up, bird_down）。
  判定口径：键要在朗读句里真实触发（autoBuild 精确匹配）、帧须看过实物
  确实画该动作、须有活先例或场景自带规格、帧在 AH=470 下不超画布。
  反例：`l_fall` 是骑车摔、`l_cake1` 是吹蜡烛、`l_goout` 是抱球踢球、
  `plane` 宽 1207px 出画布——名不副实者一律不用。
- 落点 3 处：生成器 `gen_wb13_scenes.py` 新增 `ACTS_REG`（再生单幕以
  它为准，全量 89 幕再生比对仅 8 幕各 2 行不同）；8 个场景文件；
  `units.json` 8 个 cases 的 `acts` 同步。
- 精灵包：`wave6_item2_rebuild_sprites.py` 重建 8 包，FR 键核对 8/8 通过。
- 验证：v5check 全库重跑 FAIL 782 项 / 596 幕（与基线逐项一致，
  0 新增、0 减少）；ACTS 为空 WARN 107 → **99**；UNKNOWN 780 → **772**；
  build 打包 8/8 通过（帧数与朗读句解码 grep 在场）；`node --check` 通过；
  `jscheck.py` 主文件 node --check OK（41 inline），anchorcheck FAIL
  116 项与基线一致；探针时长（见 §3）。

## 2. 第 5 项：MASTER_DESIGN / DESIGN_HANDOFF / HANDOFF 里的 r2check 引用改写 ✅

详见 `wave6_item5_r2check.md`。

- MASTER_DESIGN.md 8 处：改写 **5** 处验收行/用法块
  （L152、L157、L225、L247、L612）为 v5check + 现行五步验证管线，
  每处留废止注记；留原样 **3** 处历史行（L240、L672、L877，
  2026-10-29/30 的 dated 诊断与进度记录，一字未动，注记记在底稿）。
- DESIGN_HANDOFF.md / HANDOFF.md：大小写不敏感 grep 均为 0 行，无改动。
- 验证：改后 grep，剩余 r2check 行 = 5 处新注记行 + 3 处历史行。

## 3. 验证总表

| 验证 | 结果 |
|---|---|
| 第 2 项生成器 `--check-only` + 全量再生比对 | 通过（50 格；89 幕仅 8 幕各 2 行不同） |
| 第 2 项 node --check（8 幕）+ py_compile（生成器/脚本） | 通过 |
| 第 2 项 `gen_wb13_units.py --check-only` | 通过（234 页签） |
| 第 2 项精灵包 FR 核对 + 高频包复跑 | 8/8；47 高频包清单逐字节未变 |
| 第 2 项 v5check 全库重跑 | FAIL 782/596 不变；R4-WARN 107 → 99；UNKNOWN 780 → 772 |
| 第 2 项 build 打包 + 解码 grep 产物 | 8/8 通过 |
| 第 2 项探针时长 | 8/8 通过，实包版与 stub 版到 0.1 秒一致（hd_poly_law_v16_1 48.2、vv_fly_core_1 25.8、vv_speak_core_1 26.6、vv_speak_out_1 24.8、vv_speak_out_2 40.0、vv_speak_up_1 19.4、vv_speak_up_2 53.4、vv_stand_up_1 19.9 秒；均 ≤ 60 秒） |
| 第 2 项 `jscheck.py` 主文件 | node --check OK（41 inline）；anchorcheck 116 项与基线一致 |
| 第 5 项 grep 三文档 | 通过（见 §2） |

## 4. 未核实项

- 真机未核实：8 幕人物帧实际画面；`bird_down` 约 88px 右缘超出只在
  静态尺寸上算过，未真机看；v5check 静态比对未在真机听语音。
- 探针时长已完成（见 §3 表）。
- wbtextcheck 跑不起来（见 §5 第 6 条），故五步管线第 ④ 步未实测。

## 5. 新发现的待定夺（均未擅自做）

1. 待确认 80 幕的缺帧怎么办（内容方定映射 / 美术方画新帧 / 接受长期无动作）。
2. `bird_down` 超约 88px 是否回修先例幕（`five_patterns_p2_1`）。
3. `fp_vectors_2` 的 `plane0/1/2` 同样超宽（约 930px），是否立项修。
4. `wo_rule` 的 `eat` → `l_cake1` 是错配（帧是吹蜡烛），是否改该两幕 ACTS。
5. 死键清理（基线 R4-F2 210 项 FAIL 里含一批死键）是否立项。
6. **wbtextcheck 跑不起来**：`wbtextcheck.py` 与 `jscheck.py` 默认读已删老
   App（2026-11-03 删）；前者无路径参数、现根本跑不起来。SOP 五步管线
   第 ④ 步在仓库里是断的；是否修脚本或换检查，待定夺。
7. `fly out` 的 plane 帧尺寸问题：重画小尺寸飞机帧，或加 `actorFitW`。

## 6. 工作底稿（`docs/work-2026-11-09/`）

- 本总底稿 `wave6_wb.md`；第 2 项 `wave6_item2_acts_empty.md` +
  `wave6_item2_acts_empty_classification.json` +
  `wave6_item2_acts_empty_list.json` +
  `wave6_item2_acts_empty_detail.json` +
  `wave6_item2_precedent_dict.json` +
  `wave6_item2_rebuild_sprites.py` +
  `wave6_item2_rebuilt_sprites.json` +
  `wave6_item2_v5check_after.json`；第 5 项 `wave6_item5_r2check.md`。
- 精灵包（stub 与重建的真实包）均为 gitignored 本地构建产物；
  新检出需先跑 `make_sprite_stubs.py`，再跑
  `rebuild_highfreq_sprites.py`（47 高频包）与
  `wave6_item2_rebuild_sprites.py`（8 包）复现。
