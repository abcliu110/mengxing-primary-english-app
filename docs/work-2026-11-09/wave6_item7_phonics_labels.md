# 第六波第 7 项工作底稿：拼读区 49 行标注“索引有、律页无”（2026-11-10）

> 定夺（主对话 Muse 已定，不重新定夺）：49 行分叉是数据模型区别，不是
> 缺内容——拼读区徽标的“病例”指本律 PHONLAWS 条目自身的 cases（规律页
> 实际呈现的病例），ERRIDX 含 yaml/zone 病例，索引有、律页无；补齐律页
> cases 须先定 phonics 律页病例的内容口径，本波不补、不写新病例内容。
> 实施：只在孩子看得见的拼读索引上把分叉标出来，不再是悄悄漂移。

## 一、49 行集合（脚本实时算出，非手抄名单）

口径：PHONLAWS cases == 0 且再生 ERRIDX > 0（`gen_errors.build` 再生，
与 `gen_errors --check` 同口径）。实测 49 行，ERRIDX 合计 56 条：

| 行 | ERRIDX |
|---|---|
| S-01/02/04/05/06/07/08/09/10/11/12/13/15/16/17/18/19/20/21/22/23/24/25/26/27/28/29/30/31/32/34/35/36/37/38/39/40/41（41 行） | 各 1 |
| S-03、S-33、S-42 | 各 2 |
| SR-01、SR-02、SR-07、SR-08 | 各 2 |
| SR-03、SR-05、SR-06、SR-09 | 各 1 |

未标注 3 行（cases > 0 且 ERRIDX == cases，分叉不存在）：
S-14（cases 2 / ERRIDX 2）、S-43（7 / 7）、SR-04（1 / 1）。
ERRIDX == 0 的 S/SR 行：0 行（52 行全有索引病例）。

## 二、实施：三处改动，只做标注

主文件 `laws-prototype/mengxing-prototype-v1.html`：

1. **49 行各 +1 个标注 span**，紧跟在徽标 span 之后（行内标题与徽标
   文本一字未动）：
   `<span class="ph-note" title="错句索引里有这条的病例，规律页上还没放进来">索引有 · 律页无</span>`
   标注不用 `st` class：徽标门禁（`check_badge_erridx.py`）每行只数
   `st` span，标注不进徽标计数、不改徽标判定；门禁仍按 299 行对账。
2. **区首说明**：`#v-phon-laws` 的 `<p class="sub">` 末尾 +1 句：
   “标「索引有 · 律页无」的行：错句索引里有这条的病例，规律页上还没
   放进来。”（只陈述现状，不承诺补齐时间）。
3. **样式 +1 条**（`.st.wait` 行之后）：
   `.urow .ph-note{...background:#fffdf4;color:#8a6a1f;border:1px dashed #d9b96a}`——
   虚线边框小 pill，与实心徽标（`.st.ok/.st.part`）一眼区分；配色沿用
   `.lz-pre` 的暖金（#f7ecd2 系），未引新色。

不改：PHONLAWS cases、ERRIDX、徽标文本与 class、律页渲染器
（`LAW.render` 未动——标注点选在索引，律页仍如实呈现本律 cases）。

## 三、前后数字对照

| | 改前（788f0bd） | 改后 |
|---|---|---|
| 拼读索引行 | 52 行 | 52 行（行数不变） |
| 带“索引有 · 律页无”标注的行 | 0 | **49 行** |
| 未标注行 | — | 3 行（S-14、S-43、SR-04） |
| 徽标门禁行数 | 299 行 | 299 行（标注不进门禁计数） |

## 四、验证结果

- jsdom（`/tmp/wave6a/jsdom_item7.js`，脚本见底稿附注）：拼读区 52 行
  中标注 49 行，集合与实时算出的 49 行名单逐项一致；未标注行恰为
  S-14/S-43/SR-04；49 行标注文本与 `title` 逐行一致；49 行每行仍恰
  有 1 个 `.st` 徽标；区首说明句在位。示例 S-01 行：
  `…<span class="st part">还没有病例 · 还没有理解探针</span><span class="ph-note" …>索引有 · 律页无</span>`。
- `python3 laws-prototype/tools/check_badge_erridx.py`：**PASS**（299 行，
  与改前一致——标注未扰动门禁）。
- `python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html`：
  **node --check OK**（41 inline + 0 modules）；anchorcheck FAIL **116 项**，
  为 e97aaec 起的基线遗留（见第五波第 10 项清查），非本项引入。
- `git show` 逐行核对：主文件 diff 仅 7 行（多行同行排布），落点为
  49 行标注 + 区首 1 句 + 样式 1 条，无他处改动。

## 五、改动文件与提交

- `laws-prototype/mengxing-prototype-v1.html`：49 处标注 + 区首 1 句 +
  样式 1 条（单独 commit）。
- `docs/work-2026-11-09/apply_wave6_item7_phonics_labels.py`：带断言手术
  脚本（默认演练，`--apply` 写回；49 行集合实时算出，徽标逐行核对，
  已实施后拒绝重复写回）。
- 本文件 `docs/work-2026-11-09/wave6_item7_phonics_labels.md`。

## 六、未核实项与待定夺

- 真机未核实：jsdom 只验 DOM 结构与文本；未在真实浏览器看 49 处标注
  的实际呈现（虚线 pill 是否与徽标拥挤、小屏换行）。
- **补齐须先定 phonics 律页病例口径**（定夺原文，本波只记录）：49 行
  律页 cases 仍为 0、ERRIDX 56 条仍只在索引里；是否把这 56 条（或其中
  一部分）收进拼读律页、按什么口径收（yaml/zone 病例是否直接呈现、
  呈现形式与律页既有 cases 是否同款），待 Priya / 总协调人定夺。
  在口径定下来之前，标注保持原样，不擅自补病例、不改徽标口径。
- 附注：jsdom 探针脚本未入仓（`/tmp/wave6a/jsdom_item7.js`，工作树外
  临时脚本）；复核时按 §四所列断言重跑即可，探针逻辑见本稿 §四。
