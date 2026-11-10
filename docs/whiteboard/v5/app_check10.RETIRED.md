# app_check10.py 已废止（RETIRED，2026-11-11 left4/appcheck 线）

`docs/whiteboard/v5/app_check10.py`（决策 33 ① 回归：我的学习 my_study +
综合自测 self_test。① 旧 screen 名重定向到 my_study；② 3 个类型标签、
错题本/学习中/已掌握切换；三大厅状态卡跳 my_study；③ 综合自测 3 类切换、
开测进 quiz_engine、「只测错题本」；首页两个入口按钮；0 报错）已废止，
不再恢复、不再调用。不要按旧用法去跑它——仓库里没有这个文件
（git 历史可找回）。

## 原脚本查什么

进已删老 App：`vocab_my` / `grammar_my` / `oral_my` 重定向到 `my_study`
（kind、filter 带过去，lastView 记 my_study）；`[data-my-study]` 3 标签
切换不丢外壳；三大厅状态卡跳 my_study；`self_test` 3 类切换、开测进
`quiz_engine`、有错题时「只测错题本」且只测错题；首页 `[data-home-my]` /
`[data-home-test]` 两个入口；错题本列表 2 条。

## 为什么废止

- **被查的 App 已删**：旧版写死的 `萌星小学英语_最终合并版.html`（仓库根目录
  老合并版）已由 `d1c946f` 删除；脚本启动即 `Page.goto:
  net::ERR_FILE_NOT_FOUND`（2026-11-10 底稿已实测同款报错，2026-11-11
  在本线工作树上用 app_check8.py 复现同款报错）。
- **被查的 UI 在现主文件里不存在**：现主文件
  `laws-prototype/mengxing-prototype-v1.html` 里 `self_test` /
  `quiz_engine` / `data-my-study` / `data-home-my` / `data-home-test`
  均为 0 次（2026-11-11 grep；`my_study` 仅有的命中是注释“借鉴老 App
  my_study：错题本 / 学习中 / 已掌握”，不是页面）；全仓库没有任何 html
  文件含这些标识。我的学习、综合自测、quiz_engine，全是老 App 独有，
  新 App 从未有过。
- **整表无一可跑**：脚本的每一腿都是老 App 页面跳转与 localStorage 读档
  行为，是纯 UI 导航回归，没有可静态核查的事实源——与 app_check14
  不同：check14 有 lab/GRAMMAR_EXAMPLES.json 可静态核查，本脚本没有任何
  对等的数据事实源（错题本/学习记录只活在老 App 的 localStorage 里，
  无仓库内事实源）。

## 替代验证方法

- 无。现主文件里确有“错题本 · 三分法（借鉴老 App my_study）”与“学习地图
  （借鉴老 App 总地图）”两节注释，说明新 App 在自己的呈现位上重写了
  三分法与学习地图，但那是新 App 自己的页面与口径，不在本脚本的检查
  范围内；如将来要为新 App 的错题本/自测立回归，须按新口径重写检查，
  不复用本脚本。

## 本线改了什么

- 删 `docs/whiteboard/v5/app_check10.py` 本体（git 历史可找回）。
- `docs/whiteboard/src/runall.py`：删快速档里对它的调用（我的学习 +
  综合自测 app_check10）与头注里的记述。
- runall 其余调用不受影响；`check_all.py` 28 项门禁不受影响（本脚本
  从未进 check_all）。
