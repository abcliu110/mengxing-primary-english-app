# 第六波第 1 项 (c) 底稿：R2-W1 补缺第 1 批（2026-11-10）

> 起点：豁免后基线 FAIL 526 / 498 幕（R2-W1 486、R4-F2 40；
> `wave6_item1_v5check_baseline.json`，已按第 4 项 checker 修正订正
> WARN 135）。本批只做 R2-W1（最大组），R4-F2 40 项未动。
> 工作树 `~/workspace/wave6-wb-check`，分支 `wave6/wb-check`。

## 0. 结果总表

| 口径 | 数字 |
|---|---|
| 补前 R2-W1（豁免后基线） | 486 项 / 486 幕（手写 297 / 生成 189） |
| 本批补掉 | **87 项**（86 幕编辑补缺：手写 45 + 生成 41；另 1 幕 metaphor_code_4 由 r2skip 豁免清掉，见 §3。R2-W1 按幕计项，一幕多词同算 1 项） |
| 补后 R2-W1 | **399 项** |
| FAIL 总数 | 526 → **439**（411 幕）；R4-F2 40 项未变；WARN 113 未变；UNKNOWN 780 未变 |
| 新增 FAIL | 0 项（逐项比对基线 fails 列表） |
| 豁免跳过 | 746 → 748 处（+2：lakoff / johnson，见 §3） |

## 1. 方法（只补“板上已有、可直接读”的缺口）

补缺分三类，本批只做前两类；凡需新编例句的，一律不编，记入 §4：

1. **读板上短语（本批主力，34 幕 vv + 8 幕非 vv）**：未覆盖词恰好组成
   板上已有的短语/句子（`Time's up!`、`Good morning!`、`Look up at the
   sky.`、`It gives out light.` 等），就在该 `'w'` 行后加一句 `'s'`，
   英文逐字照抄板上原文，中文用相邻 `'m'` 行的现成译文（如
   `它发出光。`、`低头看鞋子。`），无现成译文的用固定短语的标准译法
   （`Time's up!`→`时间到！`、`Happy birthday!`→`生日快乐！`）。
   新增 `'s'` 紧贴它所读的 `'w'` 行，排在金色回顾卡之前。
2. **先读词表补词块（3 幕）**：`oo`/`ee`（irregular_plural_1，口诀
   `oo 变 ee`，读进 `Foot, feet…` 句的先读词表）、`port`
   （wo_port_p3_1，读进 `Show me your passport, please.` 的先读词表，
   `port ⊂ passport`；wo_port_1 无含 port 的句子，改读词根本身
   `Port.`，见下）。
3. **本幕自有模板的平行补句（4 幕）**：`Thursday is Thor's day.`
   （wo_time_week_p2_1：本幕其余六天都有 `X is Y's day.` 句式，唯独
   星期四缺一句，板上有 `= Thor's day`）；`The chicken soup tastes
   so delicious.`（five_patterns_2：与本幕金句 `smells so delicious`
   仅动词不同，`tastes` 是板上并列的感官系动词）；`Leo cannot speak
   English very well.`（aux_transformer_2：板上同时写了 `cannot` 与
   `can't` 两种形式，本幕只读了缩写形）；`Eleven, twelve.`
   （wo_time_num_p2_1 / p3_1：板上 `eleven、twelve` 两词无句可读，
   读成数数短句）；`Port.`（wo_port_1：词根单独读一遍，SOP §7.1）；
   `Get up!` / `Take turns!`（vv_get_core_1 / vv_turn_core_1 /
   vv_turn_over_2：板上搭配 `get up` / `take turns` 读成课堂祈使句）。
   以上 4 类补句均已在底稿逐条标明来源（板上原文 / 本幕自有句式），
   无一处凭空编例句。

生成幕一律走 spec 改 + `gen_scene.py` 再生（41 幕），禁止手改生成幕；
再生 diff 逐份核对：38 份 +1 行、2 份先读词表 ±1 行
（irregular_plural_1、wo_port_p3_1）、1 份 +2/−1
（gen_stock_wo_time_week_p2_1，含第 4 项 Saturn 先读词改动）；
factsheets 零改动（facts 未动，生成器输出与旧版逐字节一致）。

## 2. 本批补掉的 86 幕（手写 45 + 生成 41）

手写幕（45）：vv_give_in_1、vv_give_in_2、vv_give_off_1、
vv_give_off_2、vv_give_out_1、vv_give_out_2、vv_give_up_2、
vv_go_down_2、vv_get_core_1、vv_get_down_1、vv_get_in_1、
vv_get_off_2、vv_get_on_1、vv_get_out_1、vv_get_up_1、vv_get_up_2、
vv_look_down_1、vv_look_down_2、vv_look_in_1、vv_look_on_2、
vv_look_up_1、vv_look_up_2、vv_put_down_1、vv_put_in_1、vv_put_on_1、
vv_put_out_1、vv_put_up_2、vv_take_in_1、vv_take_out_1、vv_take_up_1、
vv_take_up_2、vv_turn_core_1、vv_turn_down_1、vv_turn_in_2、
vv_turn_off_1、vv_turn_over_2、vv_turn_up_2、aux_transformer_2、
five_patterns_2、wo_time_num_p2_1、wo_time_num_p3_1、
wo_time_week_p2_1、wo_port_1、irregular_plural_1、wo_port_p3_1。

生成幕（41）：上述 37 幕 vv 的生成版（gen_stock_vv_* 31 幕 +
gen_b6pilot_vv_give_off_2、gen_b6pilot_vv_put_on_1；vv_go_down_2、
vv_get_core_1、vv_turn_core_1、vv_turn_over_2 无生成版）+
gen_stock_aux_transformer_2、gen_stock_five_patterns_2、
gen_stock_wo_time_num_p2_1、gen_stock_wo_time_num_p3_1、
gen_stock_wo_time_week_p2_1、gen_stock_wo_port_1、
gen_stock_wo_port_p3_1、gen_stock_irregular_plural_1。

## 3. r2skip 追加（出处作者名）

`metaphor_code_4.js` 的 `lakoff` / `johnson`（2 处）只出现在
`['w', '出处：Lakoff & Johnson, 1980']` 这一行，全库无别处出现
（grep 全库核对），与 etymonline / wiktionary / wikipedia 同类——
出处标注，不是教学内容，不读。已追加进 `r2skip.json`
`source_names`（`['etymonline', 'wiktionary', 'wikipedia', 'lakoff',
'johnson']`），理由写进该类 reason；豁免跳过 746 → 748。

## 4. 本批未补、留待定夺（4 幕，5 项）

| 场景 | 词 | 未补的理由 |
|---|---|---|
| vv_get_in_2.js / gen_stock_vv_get_in_2.js | `on` | 只出现在中文讲解句 `共同点：IN = 钻进盒子（小车用 in，大车用 on）` 里，无句可读；补句需新编例句 |
| vv_look_off_2.js / gen_stock_vv_look_off_2.js | `off` | 只出现在 `共同点：AWAY / OFF = 目光离开原来的目标` 的粒子标签里，无句可读；补句需新编例句 |
| five_patterns_p2_5.js | `makes`、`me` | 只出现在**错误示范** `makes me happily` 里（本幕教的是不能写 `-ly`）；直接读会教错。正确句 `It makes me happy.` 不在板上，是否补，需内容方定夺 |
| ze_wear_1.js | `quickly` | 只出现在**错误示范** `Wear your coat quickly!` 里（本幕教的是「快穿上」要用 `put on` 而非 `wear`）；直接读会教错。正确句 `Put on your coat quickly!` 不在板上，是否补，需内容方定夺 |

另：`fp_iconicity_4.js` 的 `tween`（古英语词根 `be- + tween`）、
`aux_transformer_4.js` 的 `did`（标签 `过去式照妖镜 did`）、
`five_patterns_p3_1.js` 的 `in`（介词表 `arrive IN(AT)`）等，
均属“标签/公式里的词、无句可读”——与 §4 同类，留待内容方定夺
（豁免、补句、或改板）。

## 5. 剩余 R2-W1（399 项）的构成（供下一批排期）

- 生成幕 189 → **148 项**（本批补掉 41 幕）；手写幕 297 → **251 项**
  （本批补掉 46 幕：编辑 45 幕 + 豁免 1 幕 metaphor_code_4）。
  按 builder：auto 304 / oral 89 / poly 6。
- 未动的大组：oral 89 项（对话幕，补句须改对话结构，另议）、
  poly 6 项（polyBuild 只读最后一句，须改 sayEn/例句，另议）、
  其余手写 auto 幕多为“词在中文讲解/公式/标签里、无句可读”
  （如 hd_fr* 框架公式里的动词表、hd_g* 讲解句里的词），须逐幕
  判断是补句、豁免还是改板，不可批量套用本批的“读板上短语”法。
- R4-F2 40 项未动（本批新增朗读句均未命中 ACTS 键；vv 幕 ACTS 键
  多为角色包名 `l_*`，writing_alchemist 的 `postmen` / `piano` /
  `strawberries` / `sheep` 等名词键删或补，仍待定夺——见第 1 项
  底稿 §8）。

## 6. 验证

| 验证 | 结果 |
|---|---|
| `python3 docs/whiteboard/src/v5check.py` 全库 | FAIL 526 → **439**（R2-W1 486 → **399**，R4-F2 40 不变）；WARN 113 不变（R2-P1 6）；UNKNOWN 780 不变；与豁免后基线 fails 列表逐项比对：清掉 87 项，**新增 0 项**；86 幕补后全部无 R2-W1 残留 |
| `node --check` | 手写 45 幕 + 再生 41 幕全部通过 |
| `build.mjs` 打包抽查 | 4 幕全部 exit 0：vv_give_in_1（1,190,797 B）、vv_go_down_2（1,116,698 B）、wo_port_1（1,118,359 B）、gen_stock_vv_give_out_2（1,136,051 B）。注：`build.mjs` 第 1 参数是场景文件路径（非幕名），且工作树须有 `v5/node_modules`（从主仓库软链，gitignored，提交前移除） |
| 探针时长 | **已核实（2026-11-10）**：`python3 -m playwright install chromium` 下载失败（Chrome for Testing 158.0.8127.18，code=1），改用本机已装的 chromium_headless_shell-1248（`executable_path` 直指该二进制）实测 `window.__dur`：vv_give_in_1 **24.7s**（旧值 22.2s，+2.5s = 新增一句 `Time's up!`）、vv_go_down_2 **44.0s**（无旧值）、wo_port_1 **78.9s**（旧值 76.5s，+2.4s = 新增一句 `Port.`）、gen_stock_vv_give_out_2 **41.7s**（无旧值）。4 幕均 <120s 线；wo_port_1 78.9s 超 60s 目标但属该幕原有体量（旧值 76.5s），本次只 +2.4s |
| `git show` 逐行核对 | （提交前做） |
