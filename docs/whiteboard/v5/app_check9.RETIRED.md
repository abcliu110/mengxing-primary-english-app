# app_check9.py 已废止（RETIRED，2026-11-11 left4/appcheck 线）

`docs/whiteboard/v5/app_check9.py`（决策 14 练习闭环 + 总地图 App 回归：
① 每个有小测的模块进小测面板；② 3 个模块完整答一遍（错词进错题本、
成绩页、≥60% 点亮）；③ 总地图节点数/点亮数/跳转；首页「🗺️ 总地图」
按钮；0 报错）已废止，不再恢复、不再调用。不要按旧用法去跑它——
仓库里没有这个文件（git 历史可找回）。

## 原脚本查什么

进已删老 App：按 `MODULE_QUIZ_JSON` 全部 key 逐模块查小测面板挂在白板
下方、key 对、白板 iframe 仍在；前 3 个模块完整答 5 题（第 1 题故意答错）
查错题本 `status=mistake`、成绩页、点亮规则、拼写题输入框；再查总地图
`app_map`（节点数 = 四大区模块数、点亮数一致、点节点跳转）与首页
`[data-home-map]` 按钮。

## 为什么废止

- **被查的 App 已删**：旧版写死的 `萌星小学英语_最终合并版.html`（仓库根目录
  老合并版）已由 `d1c946f` 删除；脚本启动即 `Page.goto:
  net::ERR_FILE_NOT_FOUND`（2026-11-10 底稿已实测同款报错，2026-11-11
  在本线工作树上用 app_check8.py 复现同款报错）。
- **被查的 UI 与数据在现主文件里不存在**：现主文件
  `laws-prototype/mengxing-prototype-v1.html` 里 `MODULE_QUIZ_JSON` /
  `navigateTo` / `appMapNodes` / `mqPanel` / `data-home-map` 均为 0 次
  （2026-11-11 grep；`app_map` 仅有的 2 次命中是注释“借鉴老 App 总地图”，
  不是页面）；全仓库没有任何 html 文件含这些标识。`MODULE_QUIZ_JSON`
  在全仓库的 json/yaml/py 里也没有任何事实源（除本脚本与第五波底稿快照
  外无任何引用）。小测面板、错题本、总地图，全是老 App 独有。
- **整表无一可跑**：脚本的三腿全是老 App 实时 UI 与 localStorage 状态机
  行为，没有可静态核查的事实源——与 app_check14 不同：check14 有
  lab/GRAMMAR_EXAMPLES.json 可静态核查，本脚本没有对等的“模块 ↔ 小测”
  事实源。

## 替代验证方法（现行管线，已在用）

- 练习题数据本身活在新模型里：规律/题库由 `gen_laws.py` / `gen_questions.py`
  等生成器 + `check_all.py` 门禁覆盖（题库再生比对、roster、覆盖率）；
  拼读 quiz 由新增的 `gen_phonlaws.py --check`（check_all 第 28 项）覆盖。
  但“模块小测闭环（答错进错题本、点亮）”与“总地图”作为 App 功能，
  在新 App 里没有对应呈现位，目前没有活着的检查；如将来新 App 立练习
  闭环与总地图，须按新口径重写检查，不复用本脚本。

## 本线改了什么

- 删 `docs/whiteboard/v5/app_check9.py` 本体（git 历史可找回）。
- `docs/whiteboard/src/runall.py`：删快速档里对它的调用（练习闭环
  app_check9）与头注里的记述。
- runall 其余调用不受影响；`check_all.py` 28 项门禁不受影响（本脚本
  从未进 check_all）。
