# 桌面左侧栏去除（nav-fix）报告

- 日期：2026-11-03
- 缘起：Stewart 截图批示「不要左边的」——去掉 ≥1200 时出现的左侧 220px 固定导航栏。
- 工作克隆：`~/workspace/work-clones/nav-fix`（基线 b41cfaf，未 commit、未 push，待主会话验收）
- 改动共 3 文件：主文件（1 处 CSS 块改写）、`docs/frontend-ui.md`、`/.cursor/rules/frontend-ui.mdc`（仓库根 `AGENTS.md` 经核查未复述侧栏规则，不动）。

## 一、侧栏实现普查结论

**侧栏与顶部 pills 是同一个 DOM 元素，没有独立侧栏 DOM、没有侧栏专属 JS。**

- DOM（主文件 line ~696 起）：`.app > header` 之后是 `<div class="topbar"><div class="bar" id="nav">`（17 个 `<button class="nbtn" data-v="…">`）+ 兄弟 `.bar`（`.tgl` 开关）。全应用仅此一份导航。
- JS：全局 `show(go)` 切 `.view.on` 并以 `b.dataset.v===go` 同步 `.nbtn.on`；全局 click 委托处理 `.nbtn` 与 `[data-go]`。无任何按宽度/侧栏分支的代码，故本次零 JS 改动，pills 的 active 态同步不受影响。
- CSS 分层（以最终生效层为准）：
  - 基础层（style@7）：`.app{max-width:760px;margin:0 auto}`、`.bar` 横排 pills、`.nbtn`/`.nbtn.on` 药丸样式。
  - 规范重塑层（style@199）`@media (min-width:768px)`：`.topbar{display:flex;position:sticky;top:0;z-index:40}`、`#nav{flex:1;overflow-x:auto;flex-wrap:nowrap}` —— 顶部横排 pills 形态。
  - **侧栏的全部实现就是 style@199 的 `@media (min-width:1200px)` 一块**：`.app{display:grid;grid-template-columns:220px minmax(0,1fr)}`、`.topbar{grid-column:1;grid-row:2/span 20;flex-direction:column;height:calc(100vh - 120px);overflow:auto}`、`#nav{flex-direction:column}`、`.nbtn{width:100%}`、`.view{grid-column:2}`。把同一 `.topbar/#nav` 竖排成栏。
  - 文末护眼覆盖层（style@17158/17201/17349）：媒体查询只有 max-680 / min-768 / min-1024，无 ≥1200 规则、不含侧栏机制——style@199 是侧栏的最终生效层，改它即全应用生效。
  - 其余含 `220px` 的规则（style@398/564 的 `minmax(220px,1fr)` 卡片网格、@927 .vcmod 网格、@7601 range 宽度、@725 hm 横幅 flex-basis）均为 view 内部密度/尺寸，与侧栏无关，未动。

## 二、改动点清单（主文件 style@199 的 ≥1200 块，diff +1/−36 行）

删除：
- `.app` 的 `display:grid` + `grid-template-columns:220px minmax(0,1fr)` + `grid-template-rows`；
- `.app>header` 的 `grid-column:1 / -1`；
- `.topbar` 整个侧栏规则块（列定位/竖排/定高/自滚动/右边框）；
- `#nav` 竖排块、`#nav .nbtn{width:100%}`、`#nav+.bar` 及其 `.tgl` 块；
- `.view{grid-column:2}`（其 padding 28px 与 ≥1024 规则同值，删除无视觉差）。

保留/回落：
- `.app` 桌面容器本体保留：`max-width:1440px;margin:20px auto 36px;border-radius:24px;overflow:clip;box-shadow:…` → 居中单栏卡片式容器；
- `.topbar/#nav` 在 ≥1200 回落到 ≥768 规则：顶部 sticky 横排 pills（横滚、`.bar` 右置），全宽度可见、功能不变；
- 同块内 `#v-home .grid/.pain` 的 repeat(3) 密度规则原样保留（view 内部事项）；≥1440 加列规则（style@199 @1440 与 #hm-style）不依赖侧栏，未动；
- 块首加一行裁定注释（2026-11-03 桌面取消左侧栏）。
- <1200 各断点规则零改动。

首页桌面效果：`.app` 居中单栏后，#v-home 的大标题/深绿横幅/线描卡片网格（#hm-style 的 auto-fill 网格）全宽居中展开，即参考图形态；顶部 pills 在标题带下方横排。

## 三、规范同步修订

- `docs/frontend-ui.md` §4 断点表：`≥1200px` 行改为「`.app` 最大约 1440px 居中单栏；导航保持顶部 pills 横排（沿 ≥768 规则），不设左侧栏」；原「所有 .view 进入右栏 grid-column:2」一句替换为 **2026-11-03 修订注**（旧侧栏方案作废、view 内部多列规则不依赖侧栏保持不变）。§6 验收清单第 3 条：「桌面侧栏可滚动…」改为「桌面为居中单栏、顶部 pills 导航完整可见（2026-11-03 修订：无左侧栏）…」。
- `.cursor/rules/frontend-ui.mdc`：「1200 桌面侧栏 220px」改为「1200 桌面居中单栏（2026-11-03 修订：取消左侧栏，导航保持顶部 pills）」。
- 仓库根 `AGENTS.md`：仅索引指引、无侧栏表述，已核查，无需改。

## 四、验证结果

- **check_all 12/12 全绿**（未触碰任何数据/生成段；git diff 仅 3 文件）。
- **CSS 断言 + jsdom 冒烟 17/17 PASS**（脚本存 `navfix-verify/verify.js`、`diag.js`）：
  - 断言方法有效性自证：基线文件 ≥1200 壳层规则可检出 220px 侧栏栅格；改后壳层（.app/.topbar/#nav）规则中 220px、grid 列定义、grid-column 定位全无；≥768 sticky 顶栏与 #nav 横滚 pills 规则完好；view 内部 minmax(220px,1fr) 网格与基线同数（未误伤）；≥1440 断点仍在。
  - jsdom 实操：#nav 仍在 .topbar 内（同一元素）、导航按钮 17 个与基线一致；抽点 phon/vocab/grammar/verb/etym 五区，落点 view 与按钮 `.on` 同步全部正确。
  - 渲染快照：#v-home / #v-grammar / #v-review 三页 innerHTML 与基线逐字一致；`.app` 子结构（92 个子节点）与基线一致——DOM 零删除、内容零变化，差异只在 ≥1200 的 CSS 布局层。
- 两点如实登记（均非本次引入）：
  1. #v-grammar 快照首轮出现等长不等字，经双载基线自证：基线自身两次加载在同一位置（char 43323）即有 `.dchip` 相邻顺序差（big/red 互换，GK 拖拽 chip 既有非确定性，与首页波次登记的同一现象）；断言对该相邻 chip 对做顺序归一化后逐字一致。
  2. jsdom 报错：首轮 8 vs 13 系两侧操作序列不同（基线未点击）；统一操作序列后基线两载与改后均为 13 条且构成逐项相同（canvas getContext 未实现 ×1、font TypeError ×1、scrollTo 未实现 ×11），无新增报错。
- 未做真实浏览器像素级核查（本机 headless 限制同前）；布局结论基于最终生效 CSS 的解析断言。`.topbar` 在 ≥1200 的 sticky 依赖 `overflow:clip` 不建滚动容器这一 CSS 语义（与侧栏时代同一 .app 设定下顶栏行为一致），如 Stewart 在真实浏览器发现顶栏不吸顶，再单独处理。
