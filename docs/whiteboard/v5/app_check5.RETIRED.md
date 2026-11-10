# app_check5.py 已废止（RETIRED，2026-11-11 left4/appcheck 线）

`docs/whiteboard/v5/app_check5.py`（普通单词卡换成通用白板模板后的 App 回归：
抽样开卡 → 模板 iframe 已挂载、注入的是这个词、旧 canvas 不在 → 切 ①②③
三幕 → 揭示释义重渲染 → 下一张 → 关闭；多义词仍走 hd_poly_*；0 报错）
已废止，不再恢复、不再调用。不要按旧用法去跑它——仓库里没有这个文件
（git 历史可找回）。

## 原脚本查什么

进已删老 App，按 `VOCAB_DB` 抽样（每个子主题第 1 个非多义词 + 随机 30 词，
共约 55 词）：`openWordCardModal` 开卡，查 `[data-wb5tpl]` 模板 iframe
挂载、注入词条 `__WB5_WORD__`、三幕按钮、旧 `wordModalCanvas` 不在；
前 6 词切三幕 + 揭示重渲染；再抽 1 个多义词确认仍走 `hd_poly_*`。

## 为什么废止

- **被查的 App 已删**：旧版写死的 `萌星小学英语_最终合并版.html`（仓库根目录
  老合并版）已由 `d1c946f` 删除；脚本启动即 `Page.goto:
  net::ERR_FILE_NOT_FOUND`（2026-11-10 底稿已实测同款报错，2026-11-11
  在本线工作树上用 app_check8.py 复现同款报错）。
- **被查的 UI 在现主文件里不存在**：现主文件
  `laws-prototype/mengxing-prototype-v1.html` 里 `VOCAB_DB` /
  `openWordCardModal` / `data-wb5tpl` / `wb5Frame` 均为 0 次（2026-11-11
  grep）；全仓库没有任何 html 文件含这些标识。单词卡弹窗与模板 iframe，
  全是老 App 独有，新 App 从未有过。
- **整表无一可跑**：脚本的每一腿都是老 App 实时 UI 行为。词库抽样框本身
  （theme_sub / has_polysemy / is_function_word）在新词库
  model/wordbank.json 里虽有对应字段，但“模板逐词渲染是否正确”没有可
  静态核查的事实源——那是模板逐词离线验收的活，不属于本脚本的 App 回归。

## 替代验证方法（现行管线，已在用）与缺口

- 模板幕本身由 `v5check.py`（全库场景检查）+ `durcheck.py`（时长门禁）+
  打包探针覆盖。
- **缺口（本线未动，待另行定夺）**：单词卡模板的逐词离线验收本有专职脚本
  `docs/whiteboard/v5/check_wordcard_tpl.py`（DESIGN_MINDMAP_WORDCARD.md
  §2.4：全部普通词 × 3 幕知识点不丢 + 无头浏览器逐词排版 + 截图抽样），
  但它同样写死已删老 App（`APP = ROOT / '萌星小学英语_最终合并版.html'`）
  而启动即死，不在本线 16 个脚本之列，本线未擅自改它。模板逐词验收
  目前没有活着的检查；要恢复须另立项，按新 App 口径重写，不复用本脚本。

## 本线改了什么

- 删 `docs/whiteboard/v5/app_check5.py` 本体（git 历史可找回）。
- `docs/whiteboard/src/runall.py`：删完整档（`--full`）里对它的调用（单词卡
  模板 app_check5）与头注里的记述。
- runall 其余调用不受影响；`check_all.py` 28 项门禁不受影响（本脚本
  从未进 check_all）。
