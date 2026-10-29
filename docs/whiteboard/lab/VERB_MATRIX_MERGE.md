# 合并记录（R1 零丢失）：`verb_matrix` → 「🔑 短语动词总钥匙」`phrasal_key`

> 2026-10-29（MASTER_DESIGN 决策 4）。旧页签「① 万能动词 × 向量转盘」并入新页签的「🎬 组合区」，36 个 VV 卡通动画保留原样，不改成白板。

## 新页签结构

- 顶部切换条：「📖 白板课」（默认）｜「🎬 组合区」。
- 📖 白板课：`cases/phrasal_key.js` 两幕（v2 + 讲解员）——① 小品词方向义 up / down / out / back / on / off；② 核心动词 get / take / make / put + 方向 = 短语，结尾引导去组合区。
- 🎬 组合区：原 `verb_matrix` 页签正文**逐字原样**（6 动词按钮、6 方向按钮、VV 舞台与重播 / 本义 / 第二义 / 合成 / 暂停按钮、没有 VV 时的 Canvas 回落、碰撞结果卡、朗读按钮、「× 6 大空间向量全景派生表」）。

## 逐项对照

| ☐ | 原内容 | 新位置 | 核对方式 |
|---|---|---|---|
| ✅ | `verb_matrix` 页签正文（`bodyHtml` 整段） | 组合区（`pkView === "vv"`），只在前面拼了切换条 `pkBar` | 脚本比对：原文去掉开头一行后逐字出现在新文件 |
| ✅ | `CORE_VERBS_WHEEL`（6 动词） | 原样不动 | 逐字比对 |
| ✅ | `SPATIAL_VECTORS_WHEEL`（6 方向） | 原样不动 | 逐字比对 |
| ✅ | `VERB_VECTOR_COMBINATIONS`（36 组：短语、本义推导、意思、例句、中文） | 原样不动 | 逐字比对 |
| ✅ | 36 个 VV 动画（`wbmod-vv` 按需加载、`VV_ASSETS_B64`） | 原样不动 | App 冒烟：36 组逐个切换，`vvStage` 全部挂载 |
| ✅ | Canvas 回落画面（`superLabCanvas` 的 `tab === "verb_matrix"` 分支） | 改成 `tab === "phrasal_key"`，内容不变 | 代码比对 |
| ✅ | 首页卡片「王炸 ① 万能小动词 × 空间向量转盘」 | 改成「短语动词总钥匙（含万能小动词 × 空间向量转盘）」，原描述文字保留并补一句白板课内容 | — |
| ✅ | 实验室页签按钮「⚙️ ① 万能动词×向量」、`tabTitles` | 改成「🔑 ① 短语动词总钥匙」（标题保留「含万能动词×向量转盘」） | — |
| ✅ | 旧入口 `labTab: 'verb_matrix'` | 自动打开 `phrasal_key` 的组合区 | App 冒烟 |
| ✅ | `measure_load.py` 的 `enter_vv` | 改为 `labTab:'phrasal_key', pkView:'vv'` | — |

## 结论

- ❌ 丢失 0。旧页签只剩一条兼容跳转（`labTab === "verb_matrix"` → 组合区）。
- 顺手修了一个旧 bug：`renderSuperLabHubView` 每次重绘都用入口参数 `labTab` 覆盖当前页签，从首页卡片进入后点页签按钮切不过去；现在入口参数只用一次。
