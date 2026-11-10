# app_check15.py 已废止（RETIRED，2026-11-11 left4/appcheck 线）

`docs/whiteboard/v5/app_check15.py`（决策 33 菜单去重回归：② 首页 5 入口卡与
实验室入口收编；③ 闯关厅收编与方法论教室；④ 语法大厅总结表/歌谣/纠偏
神器/微训练收编；⑤ 单词表 word_list 取代三列表；13 个实验室页签的新
入口、面包屑、页签条、「↩ 回到」；旧入口重定向；0 报错）已废止，
不再恢复、不再调用。不要按旧用法去跑它——仓库里没有这个文件
（git 历史可找回）。

## 原脚本查什么

进已删老 App：首页 `[data-home-entry]` 5 卡与第 5 卡三按钮；13 个实验室页签
从新位置（单词大厅/语法分类页/底层原理页）点入后页签对、面包屑是所属分区、
页签条只列同分区页签、「↩ 回到」回所属分区，旧入口 `navigateTo('super_lab_hub',
{ labTab })` 照常可用；`v6_hub` 各页签重定向到新家且 `d33Box` 内容块在；
`method_hub` 重定向到底层原理、6 个页签单页显示；语法大厅无总结/歌谣/纠偏
入口，4 张总结表、8 首歌谣、5 个纠偏神器、2 个微训练在对应语法点页签里；
单词表筛选数对、旧入口重定向、4 对重叠子主题合成筛选、闪认只练不规则词。

## 为什么废止

- **被查的 App 已删**：旧版写死的 `萌星小学英语_最终合并版.html`（仓库根目录
  老合并版）已由 `d1c946f` 删除；脚本启动即 `Page.goto:
  net::ERR_FILE_NOT_FOUND`（2026-11-10 底稿已实测同款报错，2026-11-11
  在本线工作树上用 app_check8.py 复现同款报错）。
- **被查的 UI 在现主文件里不存在**：现主文件
  `laws-prototype/mengxing-prototype-v1.html` 里 `data-home-entry` /
  `method_hub` / `grammar_summary_hub` / `grammar_chants` /
  `D33_GRAMMAR_EXTRAS` / `word_list` / `data-wl-count` / `data-lab-chip` /
  `labGroupOf` / `LAB_GROUPS` 均为 0 次（2026-11-11 grep；`v6_hub` 仅有的
  1 次命中是注释“借鉴老 App v6_hub”，不是页面）；全仓库没有任何 html
  文件含这些标识。首页入口卡、实验室页签条、方法论教室、单词表，全是
  老 App 独有，新 App 从未有过。
- **整表无一可跑**：脚本的每一腿都是老 App 页面跳转、重定向与筛选计数，
  是纯 UI 导航回归，没有可静态核查的事实源——与 app_check14 不同：
  check14 有 lab/GRAMMAR_EXAMPLES.json 可静态核查，本脚本没有任何对等
  的数据事实源。注意：歌谣数据本身在新主文件里活着（`GRAMMAR_CHANTS`，
  CH01–CH08），但那只是歌谣文本数据，不是“歌谣页签收编进语法点页”这个
  UI 结构，本脚本查的是后者。

## 替代验证方法

- 无。新 App 的导航与菜单结构是自己的页面与口径，不在本脚本的检查范围
  内；如将来要为新 App 的导航/菜单立回归，须按新口径重写检查，不复用
  本脚本。实验室幕本身由 `v5check.py` + `durcheck.py` + 打包探针覆盖
  （不含入口与面包屑）。

## 本线改了什么

- 删 `docs/whiteboard/v5/app_check15.py` 本体（git 历史可找回）。
- `docs/whiteboard/src/runall.py`：删快速档里对它的调用（菜单去重
  app_check15）与头注里的记述。
- runall 其余调用不受影响；`check_all.py` 28 项门禁不受影响（本脚本
  从未进 check_all）。
