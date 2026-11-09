# 第二波第 8 项工作底稿：62 处硬编码 #6b7566 统一处理

日期：2026-11-09 · 实施：第二波实施员（第 8 项）· 仓库 HEAD（实施前）338f983（第 6 项已推送）

## 结论

- 主文件 `laws-prototype/mengxing-prototype-v1.html` 内 `#6b7566`（大小写不敏感）共 62 处，
  实施前复核总数仍为 62，与第一波 4.3 确认数一致，无差额。
- 62 处全部改完：46 处改 `var(--muted)`，16 处改字面量 `#4f5a4c`（var() 用不了的地方）。
- 改后逐处重算对比度：全部 ≥ 4.5:1，最低 5.50:1（落在 `#d3e5d6` 上的 4 处 SVG 文字）；
  无一处改后仍 < 4.5:1，无需总协调人定夺。
- 改后 grep：主文件 `#6b7566` 残留 0 处。

## 改法口径

- CSS 规则（`<style>` 内 `color:` / `background:`）与 JS 字符串里的内联 `style="color:..."` →
  `var(--muted)`（内联 style 支持 var()；`--muted` 在 `:root` 已是 `#4f5a4c`，见 L10）。
  含 2 处 `.gkmod{--grey:#6b7566}` 变量定义 → `--grey:var(--muted)`（自定义属性值可引用另一变量）。
- var() 用不了的地方 → 字面量 `#4f5a4c`：
  - SVG 呈现属性 `fill="#6b7566"`（15 处：PR-12 ×4、PR-14 ×4、season ×2、CJ 分号公式图 ×5）；
  - JS 常量 `MUT = '#6b7566'`（1 处，机制图式卡渲染器内联 SVG 的文字 fill 与描边 stroke 共用该常量）。
- 未批量 sed 一刀切：先逐处枚举并按上下文分类（干跑分类 46 var / 16 字面量 / 0 存疑），再按分类应用；
  应用后逐行复核 diff（52 行），并 grep 确认无 `fill="var(--muted)"` 误写。

## 对比度重算（WCAG 相对亮度公式；新值一律 #4f5a4c，即 var(--muted) 的现值）

| 背景 | 旧 #6b7566 | 新 #4f5a4c |
|---|---|---|
| `--app` #f2f6ee（页面底） | 4.40:1 | 6.62:1 |
| `--card` #f8faf5（卡片） | 4.58:1 | 6.89:1 |
| #ffffff（白底） | 4.81:1 | 7.24:1 |
| `--accent-soft` #d3e5d6（SVG 浅绿矩形） | 3.66:1 | 5.50:1 |
| #fff8e6（SVG 米黄矩形） | 4.54:1 | 6.84:1 |
| PALE #edf3e8（图式卡色带） | 4.26:1 | 6.41:1 |
| #f4eee0（.gkmod .hook.off 底） | 4.16:1 | 6.26:1 |
| 白字 #fff 在徽章底上（旧 #6b7566 → 新 #4f5a4c 作背景） | 4.81:1 | 7.24:1 |

背景判定方法：CSS 规则按元素所在层（区页顶层→页面底 `--app`；卡片内→`--card`）取保守值
（取两者中对比度较低的 `--app`）；SVG 文字按几何位置核对所落矩形填充色；
JS 内联样式按其渲染容器（律卡/动画盒均在 `.card` 内）取 `--card`。
唯一低于 4.5:1 的组合是新值落在 `#b7cbb8` 上（4.22:1），经核对无实际出现：
season 图里落在 `#b7cbb8` 矩形（x=80–170）上的文字是 "a season"（fill `#3d5a40`），
而 冬/夏（x=45/215）在该矩形之外、落在 `#d3e5d6` 上。

注：任务简述称「2 处 SVG 文字 3.66:1」，指第一波底稿记的 2 个 SVG 位置
（PR-12 左队、season 图）；按出现次数计为 4 处文字（下表 #37、#38、#50、#51），
改后均为 5.50:1。

## 62 处清单（行号为实施前、第 6 项提交后的行号）

| # | 位置 | 改法 | 背景 | 旧 → 新 |
|---|---|---|---|---|
| 01 | L492 `.gkmod{--grey:#6b7566}`（变量定义） | `--grey:var(--muted)` | 下游文字最暗底 #f4eee0 | 4.16 → 6.26 |
| 02 | L2921 `.pn-scope header.top p` color | `var(--muted)` | #f2f6ee | 4.40 → 6.62 |
| 03 | L2927 `.pn-scope .badge.grey` background | `var(--muted)` | 白字在其上 | 4.81 → 7.24 |
| 04 | L2929 `.pn-scope .gsub` color | `var(--muted)` | #f2f6ee | 4.40 → 6.62 |
| 05 | L2936 `.pn-scope .pending .tt` color | `var(--muted)` | #f2f6ee | 4.40 → 6.62 |
| 06 | L2940 `.pn-scope .arrow` color | `var(--muted)` | #f2f6ee | 4.40 → 6.62 |
| 07 | L2970 `.pn-scope .quiz .hint` color | `var(--muted)` | #f2f6ee | 4.40 → 6.62 |
| 08 | L3032 `.ar-scope header.top p` color | `var(--muted)` | #f2f6ee | 4.40 → 6.62 |
| 09 | L3038 `.ar-scope .badge.grey` background | `var(--muted)` | 白字在其上 | 4.81 → 7.24 |
| 10 | L3040 `.ar-scope .gsub` color | `var(--muted)` | #f2f6ee | 4.40 → 6.62 |
| 11 | L3047 `.ar-scope .pending .tt` color | `var(--muted)` | #f2f6ee | 4.40 → 6.62 |
| 12 | L3051 `.ar-scope .arrow` color | `var(--muted)` | #f2f6ee | 4.40 → 6.62 |
| 13 | L3081 `.ar-scope .quiz .hint` color | `var(--muted)` | #f2f6ee | 4.40 → 6.62 |
| 14 | L3163 `.cj-scope header.top p` color | `var(--muted)` | #f2f6ee | 4.40 → 6.62 |
| 15 | L3170 `.cj-scope .badge.grey` background | `var(--muted)` | 白字在其上 | 4.81 → 7.24 |
| 16 | L3172 `.cj-scope .gsub` color | `var(--muted)` | #f2f6ee | 4.40 → 6.62 |
| 17 | L3181 `.cj-scope .arrow` color | `var(--muted)` | #f2f6ee | 4.40 → 6.62 |
| 18 | L3210 `.cj-scope .quiz .hint` color | `var(--muted)` | #f2f6ee | 4.40 → 6.62 |
| 19 | L3223 `.cj-scope .adultbody` color | `var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 20 | L3246 `.cj-scope .cjilluscap` color | `var(--muted)` | #f2f6ee | 4.40 → 6.62 |
| 21 | L3700 `.gkmod{--grey:#6b7566}`（变量定义，同 #01） | `--grey:var(--muted)` | 下游文字最暗底 #f4eee0 | 4.16 → 6.26 |
| 22 | L7427 `.cx-note` color | `var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 23 | L7436 `.cx-miss` color | `var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 24 | L13957 `.mz .sub` color | `var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 25 | L13960 `.mz .meta` color | `var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 26 | L13980 `.mz .src` color | `var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 27 | L13989 `.mz .wc .parts` color | `var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 28 | L14012 `.mz .countline` color | `var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 29 | L14088 拆词题 `.qprog` 内联 style color（JS 字符串） | `color:var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 30 | L14986 `.mxp-row .mxp-pg` color | `var(--muted)` | #f2f6ee | 4.40 → 6.62 |
| 31 | L15774 机制图式卡渲染器 `MUT = '#6b7566'`（JS 常量） | `MUT = '#4f5a4c'` | 文字最暗底 #d3e5d6 色带 | 3.66 → 5.50 |
| 32 | L17152 PN 律渲染「出处」内联 style（JS 字符串） | `color:var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 33 | L17181 PN 律渲染「画面」内联 style（JS 字符串） | `color:var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 34 | L17191 PN 律渲染例句附注内联 style（JS 字符串） | `color:var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 35 | L17229 PN 律渲染探针说明内联 style（JS 字符串） | `color:var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 36 | L17314 代词动画短片说明内联 style（JS 字符串） | `color:var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 37 | L17338 PR-12 SVG「后面必须跟着东西」`fill`（JS 字符串） | `fill="#4f5a4c"` | #d3e5d6（左队矩形） | 3.66 → 5.50 |
| 38 | L17338 PR-12 SVG「my / your / her / their…」`fill` | `fill="#4f5a4c"` | #d3e5d6（左队矩形） | 3.66 → 5.50 |
| 39 | L17338 PR-12 SVG「The book is mine.」`fill` | `fill="#4f5a4c"` | #fff8e6（右队矩形） | 4.54 → 6.84 |
| 40 | L17338 PR-12 SVG「后面什么都不带」`fill` | `fill="#4f5a4c"` | #fff8e6（右队矩形） | 4.54 → 6.84 |
| 41 | L17339 PR-14 SVG「近 · 一个」`fill` | `fill="#4f5a4c"` | #f8faf5（SVG 透明底落卡片） | 4.58 → 6.89 |
| 42 | L17339 PR-14 SVG「近 · 一堆」`fill` | `fill="#4f5a4c"` | #f8faf5 | 4.58 → 6.89 |
| 43 | L17339 PR-14 SVG「远 · 一个」`fill` | `fill="#4f5a4c"` | #f8faf5 | 4.58 → 6.89 |
| 44 | L17339 PR-14 SVG「远 · 一堆」`fill` | `fill="#4f5a4c"` | #f8faf5 | 4.58 → 6.89 |
| 45 | L18629 AR EXTRA_TOP 路线图说明内联 style（JS 字符串） | `color:var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 46 | L18702 AR 律渲染「出处」内联 style（JS 字符串） | `color:var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 47 | L18730 AR 律渲染「画面」内联 style（JS 字符串） | `color:var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 48 | L18742 AR 律渲染例句附注内联 style（JS 字符串） | `color:var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 49 | L18779 AR 律渲染探针说明内联 style（JS 字符串） | `color:var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 50 | L18804 season 图「冬」`fill`（JS 字符串） | `fill="#4f5a4c"` | #d3e5d6（底矩形） | 3.66 → 5.50 |
| 51 | L18804 season 图「夏」`fill`（JS 字符串） | `fill="#4f5a4c"` | #d3e5d6（底矩形） | 3.66 → 5.50 |
| 52 | L18813 AR 接力链第 1 行括号说明内联 style（JS 字符串） | `color:var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 53 | L18813 AR 接力链第 2 行括号说明内联 style（JS 字符串） | `color:var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 54 | L18813 AR 接力链第 3 行括号说明内联 style（JS 字符串） | `color:var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 55 | L19794 CJ EXTRA_TOP 路线依据内联 style（JS 字符串） | `color:var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 56 | L19795 CJ EXTRA_BOTTOM 视频说明内联 style（JS 字符串） | `color:var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 57 | L19795 CJ EXTRA_BOTTOM 功能对应内联 style（JS 字符串） | `color:var(--muted)` | #f8faf5（卡片内） | 4.58 → 6.89 |
| 58 | L20000 CJ 分号公式图「It was raining」`fill`（JS 字符串） | `fill="#4f5a4c"` | #f8faf5（SVG 透明底落卡片） | 4.58 → 6.89 |
| 59 | L20003 CJ 分号公式图「桥墩」`fill` | `fill="#4f5a4c"` | #f8faf5 | 4.58 → 6.89 |
| 60 | L20006 CJ 分号公式图「连接副词」`fill` | `fill="#4f5a4c"` | #f8faf5 | 4.58 → 6.89 |
| 61 | L20009 CJ 分号公式图「别忘逗号」`fill` | `fill="#4f5a4c"` | #f8faf5 | 4.58 → 6.89 |
| 62 | L20012 CJ 分号公式图「we stayed home.」`fill` | `fill="#4f5a4c"` | #f8faf5 | 4.58 → 6.89 |

附带效果（未计入 62 处）：#01/#21 把 `--grey` 指回 `var(--muted)` 后，
`.gkmod` 内 10 处 `var(--grey)` 引用（`.topbar .sub`、`.note`、`.src`、`.hud .lab`、
`.lrow .rp`、`.lawcard .scenenote/.diag`、`.slot .placed:empty`、`.pile .cap`、`.hook.off`）
同步变深，无需逐处改；其中 `.hook.off` 在 #f4eee0 底上为 6.26:1，其余在卡片/页面底上 6.62–6.89:1。

## 验证

- 改后 `grep -o -i "#6b7566" 主文件 | wc -l`：0
- `python3 laws-prototype/tools/check_all.py`：24/24 全部通过
- `python3 docs/whiteboard/src/jscheck.py laws-prototype/mengxing-prototype-v1.html`：
  `node --check` OK（41 个内联脚本）；`anchorcheck` FAIL 116 项＝基线遗留（与起点一致，本项未引入新失败）
- jsdom 抽查（/tmp/domtest/item8_color_test.js，6 项 ALL PASS）：
  `:root --muted` 计算值为 `#4f5a4c`；静态 muted 文字（`.hm-sub`）计算色为 `rgb(79, 90, 76)`；
  机制图式卡渲染器输出含 `#4f5a4c`、不含 `#6b7566`；第 6 项旗舰卡回归仍为儿童层 5 条。
- 第 6 项 jsdom 逐格核对复跑：26 项 ALL PASS（第 8 项未破坏第 6 项）。

## 范围外遗留（未动，留总协调人定夺）

主文件之外仓库仍有 `#6b7566`，不在本项 62 处范围内，未改：

- `docs/frontend-ui.md:22` 的 `--muted` 取值表仍写 `#6b7566`，与代码 `:root` 已改的 `#4f5a4c` 不一致
  （第一波 4.3 改 token 时未同步文档）；`.cursor/rules/frontend-ui.mdc:11` 同表亦然。
- `docs/work-2026-11-09/apply_a11y_4.2_4.3.py` 与 `a11y_4.2_4.3_note.md`：第一波工作脚本与底稿，
  内含旧值作历史记录与对照，不宜改。

## 未核实项

- 真实浏览器里 62 处改动点的视觉效果（jsdom 只验了计算色与渲染器输出字符串，未逐点目视）；
  建议按 `docs/frontend-ui.md` 验收清单抽查 2–3 个非首页模块（PN/AR/CJ 区、辨析页、机制图式卡）。
