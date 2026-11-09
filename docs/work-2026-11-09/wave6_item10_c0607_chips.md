# 第六波第 10 项工作底稿：C-06/C-07 芯片短标题过短，修呈现（2026-11-10）

> 定夺（主对话 Muse 已定，不重新定夺）：芯片只剩 `a` / `the`，孩子看不
> 懂指什么；但截断逻辑是全局的，不能为两条改全局。只让这两条的芯片显示
> 完整可读的标题。

## 一、根因（实测）

- 先修芯片标签由 `preBarHTML → preShortTitle(full)` 生成；
  `preShortTitle` 遇 `：`/`——` 即截断（`s.search(/[：——]/)`）。
- C-06/C-07 在运行时 LAWDATA 里无 `hl`，`preLawTitle` 回落取
  ROSTER[0]：C-06「a：认出是哪一类就行」、C-07「the：就是那一个」——
  冒号恰在第 1 / 3 字，截后只剩 `a` / `the`。
- `preShortTitle` 唯一调用点是 `preBarHTML`（另两处先修呈现
  `preMarkHTML` / `relSectionHTML` 只列编号，不经短标题）；`.linkgo-chip`
  无 max-width/省略样式，全标题可完整显示。

## 二、实施：补全标题，限于这两条

主文件 `laws-prototype/mengxing-prototype-v1.html`（LINKGO 块）：

1. `preShortTitle(hl)` → `preShortTitle(hl, id)`：`id` 为 C-06/C-07
   时返回全标题（跳过冒号截断）；其余律仍按冒号/破折号截断与 12 字
   截断，全局截断逻辑一字未动。
2. 调用点 `preBarHTML`：`preShortTitle(full)` → `preShortTitle(full, t)`
  （`t` 为先修目标的解析后 id）。
3. §2.2 头注释 +1 句登记例外（“C-06/C-07 例外见 preShortTitle（全标题
   不过短）”），函数内亦有注释。

全标题 C-06「a：认出是哪一类就行」（11 字）、C-07「the：就是那一个」
（8 字），均 ≤12 字，本就不会触发长度截断；改动只是跳过冒号截断。
例外按 id 判定（不是按标题文本），ROSTER 标题改了也不会误伤他律；
反之若将来 C-06/C-07 改编号，例外随之失效回落为旧截断，需重审。

## 三、前后数字对照（jsdom 运行时实测，全部 453 条先修条）

| | 改前 | 改后 |
|---|---|---|
| `preBarHTML` 总条数 | 453 | 453 |
| 变化的条 | — | **4 条**：C-08、C-09、C-14、C-19 |
| 不变的条 | — | **449 条** |
| 仍显示裸 `《C-06 a》`/`《C-07 the》`的条 | 4 条 | **0 条** |
| 显示全标题芯片的条 | 0 条 | 4 条 |

4 条变化逐条核对（只变芯片可见文本，`onclick` 与 `title` 全标题属性
一字未动）：

| 条 | 改前芯片 | 改后芯片 |
|---|---|---|
| C-08、C-09 | 《C-07 the》 | 《C-07 the：就是那一个》 |
| C-14 | 《C-06 a》 | 《C-06 a：认出是哪一类就行》 |
| C-19 | 《C-06 a》、《C-07 the》 | 《C-06 a：认出是哪一类就行》、《C-07 the：就是那一个》 |

## 四、验证结果

- jsdom（`/tmp/wave6a/prebar_dump.js`，改前 `/tmp/wave6a/prebar_before.json`、
  改后 `/tmp/wave6a/prebar_after.json`）：453 条逐条 diff，变化 4 条、
  不变 449 条；变化的 4 条逐条人工核对为芯片文本补全，无已有标题被改、
  无 `title` 属性丢失、无文案变化。
- `python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html`：
  **node --check OK**（41 inline + 0 modules）；anchorcheck FAIL **116 项**，
  为基线遗留（见第五波第 10 项清查），非本项引入。
- `python3 laws-prototype/tools/check_badge_erridx.py`：**PASS**（300 行，
  本项未动索引行，门禁不受影响）。
- `git diff` 核对：主文件 +6/-3 行（注释 1 句、函数签名 + 例外 4 行、
  调用点 1 行），落点仅 LINKGO 块，无他处改动。

## 五、改动文件与提交

- `laws-prototype/mengxing-prototype-v1.html`：preShortTitle 例外 + 调用点
  + 注释（单独 commit）。
- `docs/work-2026-11-09/apply_wave6_item10_c0607_chips.py`：带断言手术
  脚本（默认演练，`--apply` 写回；断言 preShortTitle 出现 2 次、已实施后
  拒绝重复写回）。
- 本文件 `docs/work-2026-11-09/wave6_item10_c0607_chips.md`。

提交：分支 `wave6/main-a` 上 `Content：第六波第 10 项——C-06/C-07 先修芯片
显示完整标题`（基于 e74b6fd）。

## 六、未核实项

- 真机未核实：jsdom 只验 `preBarHTML` 返回的 HTML 字符串；未在真实
  浏览器看 C-08/C-09/C-14/C-19 四站顶部先修条的实际呈现（芯片换行、
  长芯片在窄屏是否拥挤）。`.linkgo-chip` 无省略样式，理论上完整显示，
  视觉效果待真机确认。
- 附注：jsdom 探针脚本未入仓（`/tmp/wave6a/prebar_dump.js` 及其前后
  JSON，工作树外临时脚本）；复核时按 §三所列断言重跑即可。
