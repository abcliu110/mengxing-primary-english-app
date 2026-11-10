# app_check4.py 已废止（RETIRED，2026-11-11 left4/appcheck 线）

`docs/whiteboard/v5/app_check4.py`（三大厅 HD 剧场换成 v5 后的 App 回归：
剧场框已换成 v5 iframe、每一幕都能切换挂载、时长正确、0 报错）已废止，
不再恢复、不再调用。不要按旧用法去跑它——仓库里没有这个文件
（git 历史可找回）。

## 原脚本查什么

`python3 v5/app_check4.py <hd_页签> "<进入页面的 JS>"`：进已删老 App 的
三大厅 HD 页签（`wb5El` / `wb5HDAct` 逐幕切换），查剧场框已换成 v5
iframe（`[data-wb5hd]` / `wb5Frame`）、每幕挂载与时长 `__dur`、旧
canvas 不在、0 报错。runall 快速档曾调它查 `hd_phonics`（自然拼读剧场）
与 `oral_func`（交际句型地图）。

## 为什么废止

- **被查的 App 已删**：旧版写死的 `萌星小学英语_最终合并版.html`（仓库根目录
  老合并版）已由 `d1c946f` 删除；脚本启动即 `Page.goto:
  net::ERR_FILE_NOT_FOUND`（2026-11-10 底稿已实测同款报错，2026-11-11
  在本线工作树上用 app_check8.py 复现同款报错）。
- **被查的 UI 在现主文件里不存在**：现主文件
  `laws-prototype/mengxing-prototype-v1.html` 里 `navigateTo` /
  `wb5Frame` / `wb5El` / `wb5HDAct` / `hd_phonics` / `oral_func` 均为
  0 次（2026-11-11 grep）；全仓库没有任何 html 文件含这些标识。三大厅
  HD 页签与剧场框，全是老 App 独有，新 App 从未有过。
- **整表无一可跑**：脚本的每一腿都是老 App 实时 UI 行为，没有可静态核查
  的事实源——与 app_check14 不同：check14 有 lab/GRAMMAR_EXAMPLES.json
  可静态核查，本脚本没有对等的“HD 页签 ↔ 幕”事实源。

## 替代验证方法（现行管线，已在用）

- HD 剧场幕本身（hd_phonics 4 幕、oral_func 2 幕等）由 `v5check.py`
  （全库场景检查）+ `durcheck.py`（时长门禁）+ 打包探针覆盖。
- 白板线已定 C（白板独立、不嵌入新 App），“HD 剧场换成 v5 后的 App 回归”
  这个检查目标本身已不存在；如将来新 App 立剧场呈现位，须按新口径重写
  检查，不复用本脚本。

## 本线改了什么

- 删 `docs/whiteboard/v5/app_check4.py` 本体（git 历史可找回）。
- `docs/whiteboard/src/runall.py`：删快速档里对它的两处调用（自然拼读剧场
  hd_phonics、交际句型地图 oral_func）与头注里的记述。
- runall 其余调用不受影响；`check_all.py` 28 项门禁不受影响（本脚本
  从未进 check_all）。
