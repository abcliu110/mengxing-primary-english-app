# anchorcheck 已废止（RETIRED，2026-11-09 第六波第 9 项）

`docs/whiteboard/src/anchorcheck.py`（补丁锚点 / 插入标记检查）已废止，
不再恢复、不再调用。不要按 `docs/whiteboard/SOP.md` §83/§227、
`docs/whiteboard/HANDOFF.md`、`docs/whiteboard/MASTER_DESIGN.md` 或
`docs/whiteboard/CHANGELOG.md` 里写的用法去跑它——那些白板线共享文档
里仍有把它当作现行检查的记述，本项未动共享规约文档，改写与否待总协调人
定夺（与第四波 r2check 废止时的做法一致）。

## 为什么废止

第五波第 10 项清查（底稿 `docs/work-2026-11-09/wave5_anchorcheck_triage.md`，
116 项原文快照 `docs/work-2026-11-09/wave5_anchorcheck_triage.json`）结论：

| 类 | 项数 |
|---|---|
| A. 已删旧文件 / 旧白板的残留锚 | **116** |
| B. 现文件真实缺失的锚 | **0** |
| C. 其他 | **0** |

- 116 = 标记类 60（白板引擎/舞台 12、WO/ZE 总枢 9、首页改版+HD 导图 8、
  词源卡 5、练习闭环+总地图 5、口语功能地图 3、词汇拆分 2、词缀词汇 3、
  语法例句 4、去重 3、别名词条 3、决策 6 空间隐喻/拼读剧场 3）
  + 按需加载模块 43 + 实验室页签舞台 13。
- 它守护的写入工具（`insert_wb.py`、`docs/home/step*.py`）均已删除/停用，
  被守护的主文件（仓库根目录老合并版 `萌星小学英语_最终合并版.html`，
  约 18MB）已于 2026-11-03 由 `d1c946f` 删除；现行主文件
  `laws-prototype/mengxing-prototype-v1.html` 从未含这些锚点字符串
  （`git log -S` 在现行主文件路径上无任何提交；现行主文件 `wbmod-` /
  `WB_STAGE` / `LAB_GROUPS` 等皆 0 次）。
- 登记表 `docs/whiteboard/src/wb_registry.json` 自 `7f7ecce` 起冻结，
  不再随白板研发线（现 234 页签 / 578 幕）更新；白板嵌入已定为 C
  （白板线独立、不嵌入新 App，第三波定夺）。
- 基线一致性：e97aaec 版与 d698a3c 版的 116 项逐项集合比对完全一致；
  本波废止前在基线 HEAD 788f0bd 上重跑，116 项与第五波快照逐项一致
  （排序后 diff 无差异）——它是冻结基线，不是新增缺失。
- 因此 anchorcheck 在现行主文件上永远报 116 项失败，与内容对错无关，
  无拦截价值，且会误导后人以为“主文件缺了 116 处东西”。

## 本波改了什么（第六波第 9 项，基线 788f0bd）

- `docs/whiteboard/src/jscheck.py`：不再调用 anchorcheck，退出码只由
  `node --check` 决定（41 inline + 0 modules）；末尾留注记指向本标记。
  `jscheck.py` 直接跑现为退出码 0（改前因 anchorcheck 116 项失败退出码 1）。
- `laws-prototype/tools/check_js_syntax.py`（check_all 的 node --check 门禁
  wrapper）：逻辑未动（仍只取 `node --check:` 汇总行定通过与否；jscheck
  不再输出 anchorcheck 行，忽略分支成防御性代码）；docstring 与通过注记
  改写为“anchorcheck 已废止”。`check_all.py` 的 jscheck 行 docstring 同步
  改写。check_all 项数不变（27 项）。
- `anchorcheck.py` 本体**第六波时保留、未删除**：当时 `docs/whiteboard/src/appwrite.py`
  的 `save()` 仍 `import anchorcheck`（见下）；删文件会让该 import 报错，
  故只立标记、不删文件。**2026-11-10 第八波第 22 项已删本体**（appwrite.py
  已于第七波删除，import 障碍已消失；git 历史可找回）。
- 不补锚点、不改期望值、不列入门禁（第五波第 10 项推荐处置的①②③皆不做）。

## 仍调用 / 仍提及 anchorcheck 的残留（本项未动）

- `docs/whiteboard/src/appwrite.py`：`save()` 写前仍调
  `anchorcheck.check(s)`，不过就不写。但 appwrite 已是退役管线的一部分：
  它的 `APP` 指向已被删除的老合并版文件（工作树与 HEAD 里都不存在），
  它的调用者（约 30 个 `patch_*.py`、`build_etym_db.py`、
  `gen_module_quiz.py`、`split_vocab.py`、`retire_canvas.py`）全是已执行过的
  一次性补丁脚本；`check_all.py`、`runall.py`、`SOP.md` 均无任何对
  appwrite / 这些补丁脚本的现行引用。也就是说该调用在任何现行流程里都
  不会触发——它随 appwrite 一起是死代码。是否连同 appwrite.py 与
  `patch_*.py` 一并退役清理，待总协调人定夺，本项未动。
- 白板线共享文档里的记述（`SOP.md` §83/§88/§227、`HANDOFF.md`、
  `MASTER_DESIGN.md`、`CHANGELOG.md` 的历史条目、`runall.py` 头注
  “jscheck（node --check + anchorcheck）”）：仍把 anchorcheck 写成现行
  检查，本项未改写。`CHANGELOG.md` 的历史条目是历史记录，本就不应改写；
  其余现行记述的改写待总协调人定夺。

## 替代验证方法（现行管线，已在用）

白板线如将来需要锚点检查，应针对现行文件的新锚点重写，不复用冻结的
`wb_registry.json`。现行替代管线（见第五波第 10 项底稿 §四）：build 打包
+ grep 打包产物 + 探针时长（`durcheck.py`）+ `wbtextcheck.py` +
`jscheck.py` 的 `node --check`（已进 check_all 第 27 项）。

底稿：`docs/work-2026-11-09/wave5_anchorcheck_triage.md` §四；
本波实施底稿：`docs/work-2026-11-09/wave6_item9_anchorcheck_retire.md`。
