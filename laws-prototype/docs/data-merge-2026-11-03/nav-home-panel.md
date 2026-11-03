# 导航改版二期：去掉顶部 pills 导航栏，入口收进首页面板

- 日期：2026-11-03（Stewart 同日批示「这些也不要」「全部放在下面的面板上」）
- 实施位置：主克隆 `~/workspace/work-clones/mengxing2` 工作区，叠加在未提交的去左侧栏改动之上（基线 b41cfaf + 去左侧栏改动）。**未 commit、未 push**，待 Stewart 预览后由主会话提交。
- 改动文件 3 个：`laws-prototype/mengxing-prototype-v1.html`、`docs/frontend-ui.md`、`.cursor/rules/frontend-ui.mdc`（与去左侧栏合并后总 diff：14 insertions / 72 deletions）。

## 1. 十七个导航目标 ↔ 首页面板入口对账（17/17，零补卡）

普查 `#v-home` 静态标记内全部 `data-go` 目标，与原 `.nbtn[data-v]` 17 个目标逐一对账：

| # | 导航目标 | 区名 | 首页面板入口 | 所在组 |
|---|---|---|---|---|
| 1 | home | 首页 | 面板本身（目录页） | — |
| 2 | phon | 拼读区 | ✓ 卡 | 区卡网格 |
| 3 | vocab | 词汇解码区 | ✓ 卡 | 区卡网格 |
| 4 | morph | 词根词缀 | ✓ 卡 | 区卡网格 |
| 5 | etym | 词源区 | ✓ 卡 | 区卡网格 |
| 6 | grammar | 语法区 | ✓ 卡 | 区卡网格 |
| 7 | verb | 动词区 | ✓ 卡 | 区卡网格 |
| 8 | pron | 代词区 | ✓ 卡 | 区卡网格 |
| 9 | art | 冠词区 | ✓ 卡 | 区卡网格 |
| 10 | conj | 连词区 | ✓ 卡 | 区卡网格 |
| 11 | prep | 介词 | ✓ 卡 | 区卡网格 |
| 12 | spoken | 口语区 | ✓ 卡 | 区卡网格 |
| 13 | expr | 表达写作区 | ✓ 卡 | 区卡网格 |
| 14 | tech | 技巧区 | ✓ 卡 | 区卡网格 |
| 15 | review | 复习区 | ✓ 卡 | 区卡网格 |
| 16 | parents | 家长角 | ✓ 卡 | 更多组 |
| 17 | settings | 设置 | ✓ 卡 | 更多组 |

另：学习工具卡 6 个（map/rush/wrong/trump/decide/wbindex）与痛点/旗舰单元入口（u-*）均非导航目标、原样保留。**结论：17 个目标全部已有面板入口，未新增任何卡片。**（巧合印证：首页设置卡原文即写「成人层开关与显示选项」，与本次 atgl 迁入设置页正好对上。）

## 2. tgl 控件去向

`.topbar` 的兄弟 `.bar` 里只有**一个**控件：`#atgl`「成人层：关/开」开关（`role="switch"`），绑定在主脚本：点击切换 `body.adult` 类（`.adult` 成人层内容随之显隐）+ 文案与 `aria-checked` 同步，另有 Enter/Space 键盘绑定。

**处置：不删除，整元素迁入设置页** `#v-settings`，置于页首说明之后、裁定 A 之前，新增一节「显示 · 成人层开关（原顶部导航栏开关，2026-11-03 随导航改版迁入本页）」，附一行说明（只改呈现不改数据）。元素 id/class/role/初始文案一字未改，主脚本 `getElementById('atgl')` 绑定不断。冒烟实测：点击切换 `body.adult` ✓、文案 开/关 ✓、`aria-checked` 同步 ✓、Enter 键切换 ✓。

## 3. show() 与 .nbtn/.topbar 的 JS 引用点登记（删 DOM 前逐点核过）

| 引用点 | 形态 | 删后安全性 |
|---|---|---|
| `show()` 内 `querySelectorAll('.nbtn').forEach(toggle 'on')` | 空集 forEach | ✓ 天然空安全，未改 show() 一行 |
| 全局点击委托 `closest('[data-go]')` 优先、其次 `closest('.nbtn')` | closest 返回 null 即跳过 | ✓ data-go 通道不受影响 |
| 复习渲染钩子 `closest('[data-go="review"],.nbtn[data-v="review"]')` | 选择器含 data-go 分支 | ✓ 首页复习卡点击照常触发重渲染 |
| 拼读/词根/词汇三处跨区助手（`.nbtn[data-v="phon"/"morph"/"vocab"]` 的 `pill.click()`） | 全部带 `if(pill)…else if(window.show) show(…)` 兜底 | ✓ 冒烟实测 `PHXSPINE.go(0)` 走 show() 兜底、无抛错、正确落到 v-phon-spine |
| 拼读模块尾监听 `.nbtn[data-v="phon"]` 点击时置 `PHX_VIEW='phon'` | 模块内部 home()/openGroup() 等包装函数各自维护 PHX_VIEW | ✓ 该监听只是旧 pills 入口的附加簿记；新唯一入口（首页卡）此前本就不经此监听，行为与现状一致 |
| `getElementById('nav')` / `querySelector('#nav')` | 全文件检索 | 不存在（断言过） |

## 4. 改动清单

主文件仅 3 处：
1. **整段删除** `<div class="topbar">…</div>`（`#nav` 17 钮 + atgl 所在 `.bar`，共 1,014 字符）；顶栏渐变 header（App 名）保留，`</header>` 后直接接首页样式块。
2. **atgl 迁入设置页**（见 §2）。
3. ≥1200 媒体块注释更新为新导航模型（去左侧栏那次留下的「导航保持顶部 pills」注释已作废改写）。

各层样式里残留的 `.topbar` / `#nav` / `.nbtn` CSS 规则未删：元素已不存在、规则全部惰性无命中（其中 `.nbtn,.tgl` 合写规则里的 `.tgl` 仍是活的——设置页开关靠它保 44px 触控）。文件内现存 `topbar` 字样只剩模块自有 `.vc-topbar` / `.gk-topbar` / `.gkmod .topbar`（词汇/语法模块内部栏，非全站导航，未动）。

规范同步：
- `docs/frontend-ui.md`：§4 断点表 ≥1200 行改写；第一次修订注尾句改指第二次修订；**新增「2026-11-03 第二次修订（同日，定版）」注**——导航模型定为「首页面板目录 + 页内返回首页钮」，无顶部导航栏、无左侧栏，与第一次修订冲突处以第二次为准；§5「导航按钮 .nbtn」条改为「入口只在首页面板 + 区页顶部统一『← 回首页』」；§6 验收清单第 3 条改写。
- `.cursor/rules/frontend-ui.mdc`：断点摘要行同步两次修订表述。

## 5.
...[truncated 2247 chars]