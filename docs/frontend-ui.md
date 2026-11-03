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
| `--muted` | `#6b7566` | 次要说明 |
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
| `≥1200px` 桌面 | `.app` 最大约 1440px；`grid-template-columns: 220px 1fr` 左侧粘性导航；内容在右栏 |
| `≥1440px` | 首页等可再加一列卡片 |

所有 `.view` 在桌面都必须进入右栏（`grid-column: 2`），不要只给 `#v-home` 做桌面布局。

## 5. 布局与组件约定

- 卡片：`background: var(--card); border: 1.5px solid var(--line); border-radius: 14–16px`。
- 导航按钮 `.nbtn`：默认浅底；`.on` 用 `--accent-deep` + 白字。
- 返回链：`--accent-deep`，勿用亮蓝链接色。
- 网格默认 `repeat(auto-fill, minmax(…))`，平板起抬高 minmax。
- `prefers-reduced-motion: reduce` 时关闭非必要过渡。
- 焦点：`outline: 3px solid var(--accent); outline-offset: 2px`。

## 6. 验收清单（改 UI 必过）

1. 手机 / 平板（≥768）/ 桌面（≥1200）各看一遍目标页，不只首页。
2. 无奶油纸、无亮蓝紫主色；标题与选中态为鼠尾草绿深色。
3. 桌面侧栏可滚动且内容区不被压扁；卡片不无谓纵向拉伸（Grid 子项注意 `align-self`）。
4. 新模块颜色已挂到 token 或护眼覆盖层。
5. 单文件体积大：用脚本改样式时只动 `<style>`，避免误伤 JS 数据；提交前目视抽查 2–3 个非首页模块。

## 7. 相关文件

- 主实现：`laws-prototype/mengxing-prototype-v1.html`
- Agent 规则：`.cursor/rules/frontend-ui.mdc`
