# r2check 已废止（RETIRED，2026-11-09 第四波第 4(c) 项）

`docs/whiteboard/src/r2check.py` + `src/r2check.js`（R2 朗读覆盖 + R4 动作覆盖检查）
已废止，不再恢复为原脚本。不要按 `docs/whiteboard/SOP.md` §7/§8/§16 或
`docs/whiteboard/CHANGELOG.md` §0 里写的用法去找它——仓库里没有这个文件。

## 为什么废止

1. **文件从未进仓库**：`git log --all` 查 `docs/whiteboard/src/r2check.py`、
   `r2check.js`、`insert_wb.py` 均无任何提交记录；`docs/whiteboard/src/` 全历史
   文件名里也没有 `r2` / `insert` 字样。它只活在旧开发机本地，随沙箱重置丢失。
2. **依赖已死**：它先跑 `insert_wb.py` 把白板模块嵌进旧主文件再查。
   `insert_wb.py` 已于 2026-10-30 停用（`docs/whiteboard/HANDOFF.md:62`；
   `docs/whiteboard/v5/retire_old_wb.py`，提交 `92ea6e3` 删旧 SVG 白板兜底）；
   旧主文件（`萌星小学英语_最终合并版.html`）也不在仓库里。旧白板
   `cases/`、`wb_actor.js`、`wb_app.js`、`preview.html` 同样不在仓库里。
3. **改造成本过大**：按 v5 重写等于新写一个工具——要解析 v5 场景格式
   （`ITEMS` 的 `w`/`s`/`m`/`n` 项、`ACTS`、精灵 `FI` 帧表），还要定义
   v5 下 R2/R4 的判定口径；且 v5 里 `s` 项朗读是结构性的（见下），
   原脚本的逐幕 `say` 登记对照已无对应物。

## v5 下 R2 的现状（实测）

- `scenes/auto.js` 的 `autoBuild`：每个 `s` 项（英文句）必发一次
  `K.say(...)`（`auto.js:104`），即**句子朗读是结构保证**，不用逐幕再查。
- `w` 项（白板词）不单独发 `K.say`，只在某条 `s` 句里作为先读词（`word:`）
  或句中词出现时才被读到；**词级“每个词都被读”在 v5 里没有结构保证**。
- 629 幕用 `autoBuild`，330 幕手写（不走 `autoBuild`），手写幕连句子朗读
  都没有结构保证。见底稿 `docs/work-2026-11-09/wave4_item4_tooling_gaps.md` §4(c)。

## 替代验证方法（现行管线，第三波先例）

R2/R4 逐幕覆盖检查改用以下三步（第三波底稿 `wave3_item7a_core_readaloud.md` §70
同款做法；本项实测见底稿 §4(c)）：

1. **打包**：`WB_FONTS=~/workspace/wbfonts node docs/whiteboard/v5/build.mjs docs/whiteboard/v5/scenes/<幕>.js <out.html> "<标题>"`
   （字体在 `~/workspace/wbfonts/`；`pyftsubset` 在 `~/workspace/wbfonts/bin/`，跑打包
   前 `PATH` 里要有它，否则未命中字体缓存的幕会报 `spawnSync pyftsubset ENOENT`。）
   通过 = 该幕全部 import（含精灵包）可解析、esbuild 打包成功。
2. **grep 打包产物**：在 `<out.html>` 里 grep 预期内容逐字命中，如每幕的 `s` 项英文句、
   关键例句。例：12 幕核心义共 12 条 `s` 项，`grep -c` 合计 12 条。
3. **探针时长**：`python3 docs/whiteboard/src/durcheck.py --scan <幕前缀>`
   （Playwright 读打包 `out/` 的 `window.__dur`，写
   `docs/whiteboard/lab/audit36/durations.json`；`>120 秒`且不在
   `dur_allow.json` 白名单 → 不合格）。另有 `docs/whiteboard/src/wbtextcheck.py`
   查场景 `ITEMS` 文字（Markdown 残留、截断句、字幕错位）。

## 不再覆盖的缺口（待定夺）

- 词级 R2（每个英文 `w` 词都被某句 `s` 读到）与 R4（动作词演出 + 与朗读重叠）
  在 v5 下**目前无自动化检查**。如需补，建议新写一个 v5 原生静态检查
  （解析 `ITEMS` + `ACTS` + 精灵 `FI`），而不是复活 r2check。
- `SOP.md` / `CHANGELOG.md` 里 `r2check.py ... --strict` 的验收行仍指向已废止的
  脚本，待总协调人定是否改写（本项未动共享规约文档）。

底稿：`docs/work-2026-11-09/wave4_item4_tooling_gaps.md` §4(c)。
