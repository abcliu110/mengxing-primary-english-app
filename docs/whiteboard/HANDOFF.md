# 交接文档：白板动画（竹节句 vs 树干句）

> 做法和规范见同目录 `SOP.md`。本文只记录**现在的状态、代码位置和下一步**。

## 1. 状态（2026-10-29）

| 页签 | 案例 | 状态 |
|---|---|---|
| ② 竹节句 vs 树干句手术台 `bamboo_tree` | ① 多动词连动病 | ✅ 完成（约 48s） |
| | ② 双王相撞病 | ✅ 完成（约 56s，两棵树 + and 桥） |
| | ③ 长定语压塌车头病 | ✅ 完成（约 47s） |
| | ④ 时空顺序颠倒病 | ✅ 完成（约 55s，do→did） |
| | ⑤ There be 双谓语病 | ✅ 完成（约 50s） |

- 这个页签原来的 Canvas 双人画面已换成白板播放器（暂停 / 重播 / 进度条），下面加了「📖 术语小词典」。
- 原来的两张文字卡（汉语直译 + 英语重构）保留不动。
- 旧的 Canvas 绘制分支（`startSuperLabCanvasLoop` 里 `tab === "bamboo_tree"`）还在，只是不会再走到，没有删。

## 2. 代码位置（主文件 `萌星小学英语_最终合并版.html`，按关键字搜索）

| 关键字 | 作用 |
|---|---|
| `// <<WB_ENGINE_START>>` … `// <<WB_ENGINE_END>>` | 白板引擎 `WB`、5 个案例 `WB_BAMBOO_CASES`、App 接线（`startWBLoop / wbToggle / wbReplay / wbSeekTo / curIdxTerms`）。**不要手改这一段**，改源文件后运行 `insert_wb.py` |
| `<!-- WB_STAGE -->` | 页签里的 `<svg id="wbStage" data-case=…>` 和控制条 |
| `<!-- WB_GLOSS -->` | 术语小词典 |
| `startWBLoop(wbStage)` | `startSuperLabCanvasLoop` 里的入口：有 `#wbStage` 就走白板 |
| `BAMBOO_TO_TREE_CASES` | 5 个案例的文字数据（动画里的句子和它一致） |

## 3. 源文件（`docs/whiteboard/src/`）

| 文件 | 作用 |
|---|---|
| `wb_engine.js` | 引擎：`kit(seed)` 绘制工具 + `mount(svg, build, seed)` 播放器 |
| `wb_cases.js` | 5 个案例的白板脚本和术语词条 |
| `insert_wb.py` | 写进主文件（可重复运行） |
| `preview.html` / `preview_shots.py` | 不进 App 直接预览和截图 |
| `appwb.py` | 在 App 里逐个打开案例截图，检查报错和 NaN |
| `../sample_case1_v1.html` | 用户确认风格时看的第一版样品（单文件） |

## 4. 验收记录（2026-10-29）

- `node --check` 通过。
- `appwb.py`：5 个案例都能挂载播放，页面无报错，SVG 里没有 NaN / undefined。
- `preview_shots.py`：5 个案例在 55% 和结尾截图检查，无遮挡、无出界。
- 回归：动词矩阵 `appshot.py 5 2` 正常。

## 5. 下一步（可选）

- 其他讲结构的王炸页签可以照搬这套引擎，比如 ④ 形容词排座次、五大句型、助动词变形；照 SOP 第 3 节，每个页签写一份 `xxx_cases.js`。
- 想加配音：字幕条的文字可以直接交给 `speakEnglishText` / 中文 TTS 按时间播放（目前还没做）。
- 环境提醒：沙箱重置后要重装 `pip install playwright && python3 -m playwright install chromium && sudo python3 -m playwright install-deps chromium`。
