# app_check12.py 已废止（RETIRED，2026-11-11 left4/appcheck 线）

`docs/whiteboard/v5/app_check12.py`（重复内容合并第 3 步回归：① G07 白板固定播
相关一幕、G08/G09/G10 与代词全局原理照常三幕；② 知识点组内各页顶部「🔗
另见」条，当前页高亮，点了能跳，组外页面没有；③ 总地图多出语法课/总结页
节点，「按知识点」一节节点能跳转，进语法课记「看过」；0 报错）已废止，
不再恢复、不再调用。不要按旧用法去跑它——仓库里没有这个文件
（git 历史可找回）。

## 原脚本查什么

进已删老 App：`grammar_detail`（G07/G08/G09/G10/G02/G11/G16）、
`grammar_summary_hub`（pronouns）、`super_lab_hub`（aux_transformer）、
`zh_en_hub`（ze_pronoun）各页查 `#kpSeeBar`（`data-kp-key` /
`data-kp-node`）与白板固定播（`[data-wb5hd]` 的 `data-fixed`）；点「另见」
跳转；再查总地图 `app_map`（`[data-map-kp-node]` ≥ 25、语法课节点 40、
总结页节点 ≥ 3、看过标记）与地图跳转。

## 为什么废止

- **被查的 App 已删**：旧版写死的 `萌星小学英语_最终合并版.html`（仓库根目录
  老合并版）已由 `d1c946f` 删除；脚本启动即 `Page.goto:
  net::ERR_FILE_NOT_FOUND`（2026-11-10 底稿已实测同款报错，2026-11-11
  在本线工作树上用 app_check8.py 复现同款报错）。
- **被查的 UI 与数据在现主文件里不存在**：现主文件
  `laws-prototype/mengxing-prototype-v1.html` 里 `kpSeeBar` /
  `grammar_detail` / `appMapNodes` / `data-map-kp-node` 均为 0 次
  （2026-11-11 grep）；全仓库没有任何 html 文件含这些标识。
  知识点分组（DEDUP_C 的 gr:/sum:/lab:/ze: 分组表）在全仓库的
  json/yaml/py 里也没有任何事实源（`另见`仅在 model/laws/support.yaml
  等处有 2 处正文提及，不是分组表）。
- **整表无一可跑**：脚本的三腿全是老 App 实时 UI 行为（另见条渲染与跳转、
  白板固定播、总地图节点与看过标记），没有可静态核查的事实源——与
  app_check14 不同：check14 有 lab/GRAMMAR_EXAMPLES.json 可静态核查，
  本脚本没有对等的“知识点分组表”事实源。

## 替代验证方法

- 无。知识点互链作为 App 功能，在新 App 里没有对应呈现位与分组数据，
  目前没有活着的检查；如将来新 App 立知识点互链，须先立分组数据事实源
  再按新口径重写检查，不复用本脚本。语法课白板幕本身由 `v5check.py` +
  `durcheck.py` + 打包探针覆盖（不含固定播/另见）。

## 本线改了什么

- 删 `docs/whiteboard/v5/app_check12.py` 本体（git 历史可找回）。
- `docs/whiteboard/src/runall.py`：删快速档里对它的调用（模块互链
  app_check12）与头注里的记述。
- runall 其余调用不受影响；`check_all.py` 28 项门禁不受影响（本脚本
  从未进 check_all）。
