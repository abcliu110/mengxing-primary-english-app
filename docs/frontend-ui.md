# 萌星英语 · 前端 UI 规范

适用范围：`laws-prototype/mengxing-prototype-v1.html` 及后续拆出的前端样式。改 UI、加页面、改模块皮肤时必须遵守本规范。

Figma 协作稿：以当前护眼鼠尾草绿方案为准；新画面先对齐 token，再写局部样式。

## 1. 设计原则

- 护眼优先：浅绿纸面 + 柔墨文字，降低蓝光与高饱和对比。
- 全页面一致：每个 `.view`（约 69 个）都走同一套 token 与断点，禁止只改首页。
- 儿童可读：字号偏大、触控目标 ≥ 44px、焦点环可见且不刺眼。
- 最小改动：模块可用局部 class，但颜色必须映射到全局 token，禁止再引入奶油纸 / 亮蓝紫作为主色。

## 2. 颜色 Token（`:root`）

| Token | 值 | 用途 |
|---|---|---|
| `--bg` | `#e4eedf` | 页外/桌面外圈背景 |
| `--app` | `#f2f6ee` | App 主表面 |
| `--card` | `#f8faf5` | 卡片、面板 |
| `--ink` | `#2c3328` | 正文 |
| `--muted` | `#4f5a4c` | 次要说明 |
| `--accent` | `#4a7a59` | 主强调 |
| `--accent-deep` | `#3d5a40` | 标题、选中、深按钮 |
| `--accent-soft` | `#d3e5d6` | 芯片、浅底、hover 软底 |
| `--line` | `#d5dfd0` | 描边 |
| `--leaf` | `#9ed0ad` | 轻装饰 |
| `--header-a` / `--header-b` | `#4a7a59` / `#6fa87d` | 顶栏渐变 |

禁止作为主色重新引入：`#F5F1E6` / `#FBF8EF`（奶油纸）、`#4f7cff` / `#eef2ff` / `#173a6b`（亮蓝紫系）。

纠错/警示可用柔和红棕（如 `#b85a52` / `#8A5A48`），不用高饱和纯红。插图 SVG 内填充也应对齐上述色系。

## 3. 模块作用域

模块可保留自己的前缀（`.phx`、`.pn-scope`、`.ar-scope`、`.cj-scope`、`.sp-scope`、`.et-scope`、`.vb`、`.tn`、`.gkmod`、`.pkmod` 等），但：

- 背景/卡片/描边/标题色必须落到全局 token，或在模块根上把 `--paper` / `--card` / `--ink` / `--line` 指回全局变量。
- 全站覆盖层：`#mx-eye-care-all-pages`、`#mx-eye-care-modules`（写在 `</head>` 前）。新增模块样式时，先复用这两层，再补差异。
- 不要用更高优先级的硬编码蓝紫覆盖护眼层。

## 4. 响应式断点

| 断点 | 行为 |
|---|---|
| 默认（手机） | 单列/双列卡片；`.app` `max-width: 760px` |
| `≥768px` 平板 | 页面左右 padding 加大；网格 `minmax(180px, 1fr)`；首页等多列更密 |
| `≥1024px` | 更大顶栏与网格；`.view` 左右 padding ≥ 28px |
| `≥1200px` 桌面 | `.app` 最大约 1440px 居中单栏；不设左侧栏（入口在首页面板；子页展示轻量 `#mx-topnav` 返回与回首页顶栏） |
| `≥1440px` | 首页等可再加一列卡片 |

> **2026-11-03 修订**：桌面取消左侧栏（原 `grid-template-columns: 220px 1fr` 左侧粘性导航 + 内容右栏方案作废）。桌面内容居中单栏呈现，各 `.view` 内部的多列网格规则不依赖侧栏、保持不变。
>
> **v2 导航与全站交互规范（现行定版）**：全站入口集中在 `#v-home`（首页面板：学段切换 + 全库即时检索 + 每日推荐 10 分钟入口 + 核心学习卡 + 可折叠全部馆藏抽屉）；不设左侧栏，也不在首页堆积多按钮顶栏，而是在进入任意子页后展示轻量悬浮/吸顶顶栏 `#mx-topnav`（「← 返回」/ 当前位置标题 /「🏠 首页」），通过 `history.pushState` / `popstate` 与区内部栈（`PN` / `AR` / `CJ` 等 `mx:viewchange`）联动。「成人层」开关（`#atgl`）、语速/口音设置与 `MXSTORE` JSON 导出/导入备份统一收敛在 `#v-settings`（设置页）与 `#v-parents` 入口。

## 5. 布局与组件约定

- 卡片：`background: var(--card); border: 1.5px solid var(--line); border-radius: 14–16px`。
- 入口：首页优先突出小学生日常学习动线（全库检索 / 学段筛选 / 今日推荐 / 核心功能），全部 15+ 馆藏分区收拢在可折叠抽屉中，所有高度与内边距沿用全局护眼 token。
- 导航与返回：子页顶部统一展示 `#mx-topnav`（「← 返回」+「🏠 首页」），区内置 `.back` 钮经由 `mxBackTo()` 返回上一级或首页，返回首页时自动刷新统计面板。
- 触控底线：`#mx-v2-core-style` 为全站交互控件（`.nbtn`、`.chip`、`.lz-say`、`.lz-chip`、`.mx-v2-segbtn`、`.mx-spell-tile`、`.sp-btn`、`.cjwb-btn` 等）统一保障 `min-height: 44px` 触控高度。
- 网格默认 `repeat(auto-fill, minmax(…))`，平板起抬高 minmax。
- `prefers-reduced-motion: reduce` 时关闭非必要过渡。
- 焦点：`outline: 3px solid var(--accent); outline-offset: 2px`。

## 6. 验收清单（改 UI 必过）

1. 手机（`390×844`）/ 平板（`≥768`）/ 桌面（`≥1200`）各看一遍首页与子页，确认零横向溢出（`scrollWidth <= innerWidth`）。
2. 无奶油纸、无亮蓝紫主色；标题与选中态为鼠尾草绿深色（对比度符合 WCAG AA）。
3. 桌面为居中单栏（无左侧栏；首页隐藏 `#mx-topnav`，子页显示 `#mx-topnav` 且「← 返回」与「🏠 首页」可用）；内容区不被压扁；卡片不无谓纵向拉伸。
4. 新模块与 v2 组件颜色已挂到全局 token 或护眼覆盖层，交互控件触控高度 ≥ 44px。
5. 提交前必须通过 `python laws-prototype/tools/check_all.py`（28 项全绿）及无控制台报错抽检。

## 7. 相关文件

- 主实现：`laws-prototype/mengxing-prototype-v1.html`
- Agent 规则：`.cursor/rules/frontend-ui.mdc`
