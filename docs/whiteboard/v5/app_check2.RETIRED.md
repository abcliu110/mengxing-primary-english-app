# app_check2.py 已废止（RETIRED，2026-11-11 left4/appcheck 线）

`docs/whiteboard/v5/app_check2.py`（第一性原理 / 单词身世 / 中英对照三总枢
替换进 App 后的回归：逐幕检查 v5 iframe 挂载、时长、0 报错）已废止，
不再恢复、不再调用。不要按旧用法去跑它——仓库里没有这个文件
（git 历史可找回）。

## 原脚本查什么

`python3 v5/app_check2.py <fp|wo|ze> <幕 id> <幕数>`：进已删老 App 的
`first_principles_hub` / `word_origins_hub` / `zh_en_hub`（
`navigateTo` + `woSelectScene` / `zeSelectScene`），逐幕查 `wb5Frame`
iframe 挂载、时长 `__dur`、0 报错。runall 快速档曾调它查
`wo_grimm`（wo，1 幕）。

## 为什么废止

- **被查的 App 已删**：旧版写死的 `萌星小学英语_最终合并版.html`（仓库根目录
  老合并版）已由 `d1c946f` 删除；脚本启动即 `Page.goto:
  net::ERR_FILE_NOT_FOUND`（2026-11-10 底稿已实测同款报错，2026-11-11
  在本线工作树上用 app_check8.py 复现同款报错）。
- **被查的 UI 在现主文件里不存在**：现主文件
  `laws-prototype/mengxing-prototype-v1.html` 里 `navigateTo` /
  `word_origins_hub` / `zh_en_hub` / `first_principles_hub` / `wb5Frame`
  均为 0 次（2026-11-11 grep）；全仓库没有任何 html 文件含这些标识。
  三总枢页与选幕函数，全是老 App 独有，新 App 从未有过。
- **整表无一可跑**：脚本的每一腿都是老 App 实时 UI 行为，没有可静态核查
  的事实源——与 app_check14 不同：check14 有 lab/GRAMMAR_EXAMPLES.json
  可静态核查，本脚本没有对等的“三总枢 ↔ 幕”事实源。第一性原理 6×4
  的分镜事实源（wb13_fp.json）已由修后的 `app_check7.py`（静态）覆盖；
  单词身世 / 中英对照没有对等的分镜表，只有幕源文件本身。

## 替代验证方法（现行管线，已在用）

- 白板幕本身（wo_* 40 幕、ze_* 11 幕、fp_* 幕）由 `v5check.py`（全库场景
  检查）+ `durcheck.py`（时长门禁）+ 打包探针覆盖；第一性原理分镜结构
  另有修后的 `app_check7.py`（静态）覆盖。
- 白板线已定 C（白板独立、不嵌入新 App），“替换进主 App 后的回归”这个
  检查目标本身已不存在；如将来新 App 立总枢呈现位，须按新口径重写
  检查，不复用本脚本。

## 本线改了什么

- 删 `docs/whiteboard/v5/app_check2.py` 本体（git 历史可找回）。
- `docs/whiteboard/src/runall.py`：删快速档里对它的调用（单词身世
  wo_grimm 一步）与头注里的记述。
- runall 其余调用不受影响；`check_all.py` 28 项门禁不受影响（本脚本
  从未进 check_all）。
