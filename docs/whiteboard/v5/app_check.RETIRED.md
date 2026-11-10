# app_check.py 已废止（RETIRED，2026-11-11 left4/appcheck 线）

`docs/whiteboard/v5/app_check.py`（实验室页签 super_lab_hub 逐幕回归：v5 iframe
挂载 / 时长 / 0 报错，其他页签仍走旧 SVG）已废止，不再恢复、不再调用。
不要按旧用法去跑它——仓库里没有这个文件（git 历史可找回）。

## 原脚本查什么

`python3 v5/app_check.py <页签> <状态字段> <幕数>`：进已删老 App 的
super_lab_hub 页，逐幕切换（`navigateTo('super_lab_hub', …)` /
`superLabState.<field>` / `renderSuperLabHubView()`），查每幕的
`wb5Frame` iframe 挂载、时长 `__dur`、0 报错；再抽另 3 个页签确认
旧 SVG 舞台仍在。runall 快速档曾调它查 `tense_matrix`（tenseIdx，5 幕）。

## 为什么废止

- **被查的 App 已删**：旧版写死的 `萌星小学英语_最终合并版.html`（仓库根目录
  老合并版）已由 `d1c946f` 删除；脚本启动即 `Page.goto:
  net::ERR_FILE_NOT_FOUND`（2026-11-10 底稿已实测同款报错，2026-11-11
  在本线工作树上用 app_check8.py 复现同款报错）。
- **被查的 UI 在现主文件里不存在**：现主文件
  `laws-prototype/mengxing-prototype-v1.html` 里 `navigateTo` /
  `super_lab_hub` / `wb5Frame` / `VOCAB_DB` 均为 0 次（2026-11-11 grep）；
  全仓库没有任何 html 文件含这些标识。super_lab_hub 页、旧 SVG 舞台
  `wbStage`、实验室页签状态机，全是老 App 独有，新 App 从未有过。
- **整表无一可跑**：脚本的每一腿（逐幕切换、iframe 挂载、时长、旧 SVG
  对照）都是老 App 实时 UI 行为，没有可静态核查的事实源——与 app_check14
  不同：check14 有 lab/GRAMMAR_EXAMPLES.json 可静态核查，本脚本没有
  对等的“实验室页签 ↔ 幕”事实源（幕源文件与 durations 的对应关系由
  v5check / durcheck 全库覆盖，不必另立单幕抽查脚本）。

## 替代验证方法（现行管线，已在用）

- 白板幕本身（tense_matrix 等 9 幕，含分节子幕）由 `v5check.py`（全库场景
  检查）+ `durcheck.py`（时长门禁）+ 打包探针覆盖；长幕分节结构另有修后
  的 `app_check_parts.py`（静态）覆盖。
- 白板线已定 C（白板独立、不嵌入新 App），“替换进主 App 后的回归”这个
  检查目标本身已不存在；如将来新 App 立实验室呈现位，须按新口径重写
  检查，不复用本脚本。

## 本线改了什么

- 删 `docs/whiteboard/v5/app_check.py` 本体（git 历史可找回）。
- `docs/whiteboard/src/runall.py`：删快速档里对它的调用（实验室
  tense_matrix 一步）与头注里的记述。
- runall 其余调用不受影响；`check_all.py` 28 项门禁不受影响（本脚本
  从未进 check_all）。
