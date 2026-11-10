# app_check3.py 已废止（RETIRED，2026-11-11 left4/appcheck 线）

`docs/whiteboard/v5/app_check3.py`（万能动词剧场替换进 App 后的回归：
①② 两幕 iframe 挂载、时长、0 报错）已废止，不再恢复、不再调用。
不要按旧用法去跑它——仓库里没有这个文件（git 历史可找回）。

## 原脚本查什么

`python3 v5/app_check3.py <vv_词组>`：进已删老 App 的 super_lab_hub
`verb_matrix` 页签，按 `CORE_VERBS_WHEEL` / `SPATIAL_VECTORS_WHEEL`
定位动词与空间向量，查 ①② 两幕的 `wb5Frame` iframe 挂载、时长
`__dur`、0 报错。本脚本不在 runall 调用之列。

## 为什么废止

- **被查的 App 已删**：旧版写死的 `萌星小学英语_最终合并版.html`（仓库根目录
  老合并版）已由 `d1c946f` 删除；脚本启动即 `Page.goto:
  net::ERR_FILE_NOT_FOUND`（2026-11-10 底稿已实测同款报错，2026-11-11
  在本线工作树上用 app_check8.py 复现同款报错）。
- **被查的 UI 与数据在现主文件里不存在**：现主文件
  `laws-prototype/mengxing-prototype-v1.html` 里 `navigateTo` /
  `super_lab_hub` / `wb5Frame` / `CORE_VERBS_WHEEL` /
  `SPATIAL_VECTORS_WHEEL` 均为 0 次（2026-11-11 grep）；全仓库没有任何
  html 文件含这些标识。verb_matrix 页签与动词轮盘，全是老 App 独有。
- **整表无一可跑**：脚本的每一腿都是老 App 实时 UI 行为，没有可静态核查
  的事实源——与 app_check14 不同：check14 有 lab/GRAMMAR_EXAMPLES.json
  可静态核查，本脚本没有对等的“动词 × 向量 ↔ 幕”事实源。

## 替代验证方法（现行管线，已在用）

- 万能动词剧场幕本身（vv_* 158 幕，含分节子幕）由 `v5check.py`（全库场景
  检查）+ `durcheck.py`（时长门禁）+ 打包探针覆盖；长幕分节结构另有修后
  的 `app_check_parts.py`（静态）覆盖。
- 白板线已定 C（白板独立、不嵌入新 App），“替换进主 App 后的回归”这个
  检查目标本身已不存在；如将来新 App 立动词剧场呈现位，须按新口径重写
  检查，不复用本脚本。

## 本线改了什么

- 删 `docs/whiteboard/v5/app_check3.py` 本体（git 历史可找回）。
- runall 本就不调用它，无需改 runall；`check_all.py` 28 项门禁不受影响
  （本脚本从未进 check_all）。
