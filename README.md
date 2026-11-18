# 萌星小学英语（v2）

面向 1–6 年级小学生的英语学习网页应用。主体为零构建静态前端（`laws-prototype/mengxing-prototype-v1.html`）配 `laws-prototype/assets/` 静态资源与按需加载数据，支持本地双击 `file://` 直接使用或静态 HTTP 服务运行。

## 主文件与配套资产

- `laws-prototype/mengxing-prototype-v1.html`：当前维护的主前端（v2 演进分支；十五大规律/词汇/拼读/语法/口语/复习/设置专区）；配套事实源与生成工具在 `laws-prototype/model/` 与 `laws-prototype/tools/`，数据源规矩见 [`laws-prototype/DATA_SOURCE_SPEC.md`](laws-prototype/DATA_SOURCE_SPEC.md)。
- `laws-prototype/assets/`：配套图文媒体与外置按需数据（含 v2 外置词源数据集 `laws-prototype/assets/data/et_data.js`，由 `tools/gen_et.py` 生成，首屏不解析 2.9 MB 词源 JSON，进入词源区时通过 `<script>` 按需加载）。
- 设计与白板文档：`code_artifact2.md`（教研设计）、[`docs/frontend-ui.md`](docs/frontend-ui.md)（护眼色板与全页面响应式规范）、`docs/whiteboard/`（白板模块源码与 SOP，接手先读 `docs/whiteboard/HANDOFF.md` 与 `docs/whiteboard/SOP.md`）。

## 怎么运行

- 直接用浏览器（推荐 Chrome、Edge、Safari 最新版）双击打开 `laws-prototype/mengxing-prototype-v1.html`。
- 或在仓库目录起静态服务器访问，例如 `python3 -m http.server 8000`，打开 `http://localhost:8000/laws-prototype/mengxing-prototype-v1.html`。
- 文件夹须完整保留，分享或备份须包含 `laws-prototype/assets/` 目录，仅复制 HTML 会缺失媒体与词源外置数据。

## v2 核心架构与功能

- **小学生优先首页（`#v-home`）**：年级/学段筛选（全年级 / 1–2 / 3–4 / 5–6 年级）、全库即时搜索（词汇 `WLIST` / 规律 `ROSTER` & `LAWDATA` / 错句 `ERRIDX` / 口语 `SP_DATA`）、今日 10 分钟推荐路径、核心 5 大功能卡与可折叠「全部学习馆藏」抽屉；内部研发备注与待核清单默认仅在家长「成人层」展示。
- **全站轻量导航与跨区同步**：全站顶栏 `#mx-topnav`（「← 返回」/ 当前位置 /「🏠 首页」）与浏览器 `history.pushState` / `popstate` 联动，切回时自动弹出 `PN` / `AR` / `CJ` 等区内部栈并通过 `mx:viewchange` 刷新复习与首页统计。
- **统一语音与跟读/拼写交互（`MX_SETTINGS` / `MX_SPEECH` / `MX_REC` / `MX_SPELL`）**：
  - 设置页（`#v-settings`，可从首页或家长导航进入）支持切换英音/美音（`en-GB` / `en-US`）与 3 档语速，同步作用于单词、口语连读与白板解说（中文解说独立使用中文声音并限制舒适语速）；连读支持当前句高亮追踪与底部「⏹ 停读」控制条。
  - 全站统一跟读测评 `MX_REC`（SpeechRecognition → MediaRecorder 回放 → 口头三遍打卡降级）已接入动词区 `VB`、口语区 `SP`（对话/问答/拍手歌）及复习/错题 `gate` 卡。
  - 交互听写拼写练习 `MX_SPELL`（字母输入 + 乱序字母块）已接入词汇卡 `VC.openCard`（「✍️ 默写考一考」）与复习/错题 `gate` 过关卡（「✍️ 听写拼写」）。
- **数据备份与学段自适应队列**：学习记录分键存储于浏览器 `localStorage` 并经由 `MXSTORE` 统一读写；设置页支持整包 JSON 导出与导入恢复；每日复习队列 `RV.buildQueueToday()` 按所选学段优先排序单词卡片。
- **白板播放器复用**：`CJ` 连词区白板播放器已并入共享 `makeWbCore(S, C)` 工厂，与 `PN` / `AR` 同源共享绘制、分段、CUT 选版及卡拉 OK 字幕高亮。

## 前端 UI 规范

护眼色板（鼠尾草绿）、全页面响应式断点、全站 44px 触控底线与组件规范见 **`docs/frontend-ui.md`**（Agent 规则：`.cursor/rules/frontend-ui.mdc`）。

## 修改与校验纪律

- 生成副本（主文件中由 `tools/gen_*.py` 生成的数据块及 `assets/data/et_data.js`）严禁手工编辑；改数据须改 `laws-prototype/model/` 下的事实源后重跑对应生成器。详见 `laws-prototype/DATA_SOURCE_SPEC.md`。
- 修改白板源码须在 `docs/whiteboard/src/` 进行并用 `insert_wb.py` 写入；做法见 `docs/whiteboard/SOP.md`。
- 提交前必须运行 **`python laws-prototype/tools/check_all.py`**，28 项全绿方可提交；如修改外置 JS 须同步用 `node --check` 校验。
