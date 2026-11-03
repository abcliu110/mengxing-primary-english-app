# Wave 2 对账报告：词根数据单一事实源建成（2026-11-03）

基线：`/tmp/mengxing2` HEAD `57e2544`（Wave 1 规律总表提交）。本波只新建文件，未改主文件 HTML、未动任何现有数据、未 commit（待主会话验收）。

## 产物

| 文件 | 内容 |
|---|---|
| `laws-prototype/model/morph_data.json` | 事实源总表 `{data, lawreg}`，自 `mengxing-prototype-v1.html` 的 morph IIFE 抽取，键序/内容原样 |
| `laws-prototype/tools/check_morph_sync.py` | 校验脚本（规范 §6 校验门第一件），见下 |

抽取方法：锚点定位 `const DATA = `（以字面量首键 `"groups"` 过滤，排除拼读/动词模块的同名常量）与 `const LAWREG = `，定界扫描截取完整字面量后用 node 求值。字面量长度与数据治理审计的 MD5 测量逐字吻合：DATA 493,525 字符、LAWREG 19,987 字符（两文件同值）。

## 抽取计数（与已知口径对照）

| 项 | 实测 | 已知口径 | 判定 |
|---|---|---|---|
| words 总数 | **2,473** | 2,473 | ✓ |
| morph_class：split | **926** | 926 | ✓ 双证：`DATA.stats.splits` 与逐词统计「split 字段非空」均为 926 |
| morph_class：whole / nosplit / form | **1,199 / 230 / 118** | 1,199 / 230 / 118 | ✓ 取自 `DATA.stats` 自述（其 recon 文案同值）；注：DATA.words 条目本身不带 morph_class 字段，逐词分类的事实源在 wordbank.json，本表 stats 层与之同口径 |
| pages 数 | **126** | 简报口径 102 | 见下方说明，不凑数 |
| LAWREG 条数 | **16** | 16 | ✓ 键序：V-33, V-35, V-36, V-37, V-26, V-21, V-32, GR-29, GR-28, V-34, V-20, V-38, V-15, V-30, NEW-C, NEW-T |

**关于 pages 126 与 102 的口径差**：`DATA.pages` 实有 126 页，`DATA.stats.pages` 自述亦为 126，数据内部自洽。126 的构成：前缀 pf 21 + 后缀 sf 26 + 词根 rt 45 + 组合 cb 11 + 屈折 if 8 + 其余小类（wh/ns/as/cp/gl/mx/fm）15。简报里的 102 是早前注册表波次「词缀谓词页」的旧计数，现行 pages 已含词根页与屈折页等全部页型——属口径演进，非数据缺失或多出，本波按实测 126 登记。

**关于 LAWREG 的结构**：LAWREG 在两个源文件里都是 **id 键控对象**（`{"V-33": {...}, ...}`），不是数组。按「键序/内容原样保留、不做字段增删改」纪律，总表以对象原样入 `lawreg` 字段，未转数组；如需数组形态，应作为生成视图在切换波次另行派生，不在事实源层改形。

## 三方深比对结果

校验脚本正向运行（对 morph_data.json ↔ 主文件 ↔ morphology 文件，DATA/LAWREG 分开两两比，规范化序列化后深比较），6/6 全过，退出码 0：

```
PASS DATA: morph_data.json == mengxing-prototype-v1.html
PASS DATA: morph_data.json == morphology-prototype-v1.html
PASS DATA: mengxing-prototype-v1.html == morphology-prototype-v1.html
PASS LAWREG: morph_data.json == mengxing-prototype-v1.html
PASS LAWREG: morph_data.json == morphology-prototype-v1.html
PASS LAWREG: mengxing-prototype-v1.html == morphology-prototype-v1.html
结论: 三方一致
```

负向验证（证明校验门能拦）：在临时副本中篡改一词释义后重跑，脚本报 `FAIL` 并精确定位 `$.words.G4_0457.mean`，退出码 1；两 HTML 之间仍 PASS，说明定位无误报。

## 校验脚本

- 路径：`laws-prototype/tools/check_morph_sync.py`
- 用法：`python3 laws-prototype/tools/check_morph_sync.py`（路径相对脚本位置解析，可在任意目录调用）
- 行为：只读不改；全部一致退出 0，任一不一致退出 1 并打印差异路径（最多 20 处）；依赖 python3 + node。

## 纪律核对

- git status 仅两个新路径（`model/morph_data.json`、`tools/`），现有文件零改动。
- 未 commit，待主会话验收后提交。
