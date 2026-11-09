# 第五波总底稿——13 项定夺全部落地

> 日期：2026-11-09 · 总协调人：第五波总协调 · 起点 HEAD d698a3c · 落点 HEAD（见收尾提交）
> 两线并行：主文件线 `wave5/main-line`（7 提交，8665060）+ 白板线 `wave5/wb-line`（6 提交，rebase 后合入）；线性历史，无 force-push。

## 定夺来源

第四波汇报新发现 13 件，Priya 2026-11-09 20:16 说“这 13 件新的也你来定”。定夺原文见主对话；本底稿只记实施结果。

## 白板线（6 项）

| # | 定夺 | 结果 |
|---|---|---|
| 1 | wb13_phrasal.json 不补 give on 记录 | 文件 0 改动；记录在 wave5_wb.md §1（与 give back 并列） |
| 2 | give back ② 末尾残留句改写 | `vv_give_back_2.js:28` 一行：删“（give 没有常用的 down）” |
| 3 | 470 精灵包只重建高频幕 | 高频包 62 个；ACTS 有帧且 cast/ 齐全 47 个 → 重建（129 帧）；ACTS 为空 15 个留 stub；cast/ 缺帧的高频包 0 个；仍为 stub 427 个（470−43） |
| 4 | v5 原生 R2/R4 轻量静态检查 | 新脚本 `docs/whiteboard/src/v5check.py`；基线覆盖 870 幕，FAIL 782 项 / 596 幕（R2-W1 572、R4-F2 210）；未进 check_all（进则立刻变红），作 SOP 逐幕验收步骤 |
| 5 | SOP/CHANGELOG r2check 验收行改写 | 改为五步管线（build 打包、grep 产物、探针时长、wbtextcheck、jscheck）+ v5check；留废止注记；2026-10-29 历史记录未动 |
| 6 | build.mjs lib 只走 node --check | 无 `export default` → 只走 node --check；新扫测 `sweep_scenes.py`：967 文件 = 957 打包通过 + 10 lib 语法通过 + 0 FAIL |

实施中修好的真问题：build.mjs 每幕在 /tmp 留 ~1.2MB 子集化 woff2 从不删除，967 幕全量跑必写满 512M tmpfs；已修为产物进内存后立即删临时文件（字体缓存 `/tmp/wb5_fontcache` 保留）。

注意：精灵包（stub 与重建的真实包）均为 gitignored 本地产物；新检出需先跑 `make_sprite_stubs.py` 再跑 `rebuild_highfreq_sprites.py` 复现。

## 主文件线（5 项）

| # | 定夺 | 结果 |
|---|---|---|
| 7 | 14 个 ptr 条目补先修标题 | `preLawTitle` 按 hl 值回落；jsdom 全量 453 条：29 条变、424 条不变 |
| 8 | 其余区静态徽标扩面扫 | 扫 299 行，修 41 行（V 19、CO 11、QI 11）；拼读区 52 行口径不同不硬套、家长区 114 行 0 不符；门禁 59 → 299 行 |
| 9 | lawdata.cases 与 ERRIDX 口径写进《数据源规范》 | DATA_SOURCE_SPEC.md §1 + §6；ERRIDX 是病例数唯一权威源 |
| 10 | anchorcheck 116 项清查分类，不修 | A 类已删旧文件残留锚 116 / B 类 0 / C 类 0；清查底稿 wave5_anchorcheck_triage.md + .json；推荐处置：正式废止 anchorcheck（立 RETIRED 标记，参照 r2check 前例） |
| 11 | LAWDATA 对账检查 | 新 `tools/check_lawdata_roster.py`；224 + 52 + 114 = 390；hl == ROSTER[0] 323/323；check_all 26→27 项 |

## 承接（2 项，只记一笔）

| # | 定夺 | 结果 |
|---|---|---|
| 12 | P-* 56 + CO-17 3 条不回滚 | 记录在 wave5_item12_pstar_decision.md；不改数据 |
| 13 | 完整 JS 外置留上线前 | 确认上线待办记录仍在（TODO 文档第 87 行“上线时必须做资源外置”、第 150 行“23MB 资源外置 \| 上线前必做”）；不改代码 |

## 验证（合并后总协调人重跑）

- `check_all.py`：27/27“结论：全部通过”（含新增 `check_lawdata_roster`；徽标门禁扩面未新增项）。
- `jscheck.py` 主文件：node --check OK（41 inline）；anchorcheck FAIL 116 项，与 e97aaec 基线逐项一致。
- `gen_wb13_scenes.py --check-only` / `gen_wb13_units.py --check-only`：通过（50/50 格；页签 234）。
- `v5check.py`：基线 870 幕 / FAIL 782 项（已知缺口，未进 check_all）。

## 未核实项

- 真机未核实：29 站先修条与 V/CO/QI 徽标视觉呈现；重建 47 包人物帧实际画面；v5check 静态比对未在真机听语音；stub 幕画面同前；全新机器首次全量打包扫测耗时。
- C-06/C-07 芯片短标题只剩 `a` / `the` 的呈现效果。

## 新发现的待定夺（两线汇报汇总，均未擅自做）

**白板线（wave5_wb.md §9）：**
1. v5check 基线 782 项 FAIL / 596 幕是否立项补；'vs'、'adj' 标签、etymonline/wiktionary 出处名这类板上有字但不应读的词，是否要 v5 版 r2skip 豁免机制。
2. ACTS 为空的 107 幕哪些本应有动作，需内容方逐幕判断。
3. 427 个仍为 stub 的包是否继续重建（cast/ 帧库只覆盖高频包）。
4. R2-P1 的 161 项先读词提醒（如 give vs gave）是否统一口径。
5. MASTER_DESIGN/DESIGN_HANDOFF/HANDOFF 里的 r2check 引用是否也改写。
6. v5check 基线将来是否进 check_all（现 596 幕 FAIL，进则立刻变红）。

**主文件线（wave5_main.md）：**
7. 拼读区 ERRIDX 与律页 cases 口径分叉（49 行）：补齐律页 cases，还是标注“索引有、律页无”。
8. CO-17（无 LAWDATA 条目、无独立规律页）是否补独立规律页或 data-law 行。
9. anchorcheck 是否正式废止（须白板线/总协调人定夺）。
10. C-06/C-07 短标题过短是否另改截断规则。
11. v-tech 区数百 `data-tec` 行未纳入本次徽标对账。
12. 《数据源规范》§8 规定修订须经 Stewart 确认——第 9 项修订的确认仍待安排。
13. 第四波“其余区 ok 39 处、part 53 处”与本次逐行实测不符（实测 ok 30 处 + 各变体），本次以逐行实测为准。
14. 基础设施：/tmp 512M tmpfs 本波中途多次写满（另一边白板 agent 的大文件所致）；建议后续大波次把工作树放 home 磁盘而非 /tmp。

## 分底稿

- 白板线：wave5_wb.md；wave5_item3_highfreq_sprites.json；wave5_item4_v5check_baseline.json；rebuild_highfreq_sprites.py。
- 主文件线：wave5_main.md；wave5_item7_ptr_titles.md；wave5_item8_other_badges.md；wave5_item9_datasource_spec.md；wave5_anchorcheck_triage.md + .json；wave5_item11_lawdata_roster.md。
- 承接：wave5_item12_pstar_decision.md。
