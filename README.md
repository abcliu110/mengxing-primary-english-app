# 萌星小学英语

面向 1—6 年级小学生的英语学习网页应用。整个应用是一个单文件 HTML，样式、脚本和词库数据都内联在文件里，不依赖服务器、构建工具或外部资源。

## 主文件

`萌星小学英语_最终合并版.html`：当前维护的版本。

仓库里的其他 HTML（v2 主题大世界、v3 Argon 重写版、v3.7、“- 副本”）是历史或并行版本，未在本次维护范围内。`code_artifact*.md` 是教研设计文档。

## 怎么运行

- 直接用浏览器（推荐 Chrome、Edge、Safari 最新版）双击打开 `萌星小学英语_最终合并版.html`。
- 或在仓库目录起一个静态服务器后访问，例如 `python3 -m http.server 8000`，再打开 `http://localhost:8000/萌星小学英语_最终合并版.html`。
- 点读使用浏览器自带的语音合成（Web Speech API）。首次进入需点一下“开启语音”；设备没有英文语音包时会提示改看文字。

## 页面结构

首页进入各模块，顶部有返回首页、返回上一步和面包屑：

- 第一性原理总枢、📖 单词身世总枢（`word_origins_hub`，溯源幕白板动画，源文件见 `docs/whiteboard/src/wo_hub.js`）、十二大王炸实验室、方法总枢、v6 拓展教室
- 单词大世界：主题、高频视觉词、自然拼读、构词、词性、词汇关系、框架语义、我的单词本
- 语法大世界：分类、语法详情、语法游乐场、拍手口诀、语法总结、我的语法本
- 口语大世界：16 个交际场景、我的口语本
- 测验引擎、家长门（设置、导出/导入学习数据）

## 数据

文件里以 `const` 常量内联，主要有：

- `VOCAB_DB`：词库（单词、音标、释义、例句、搭配等）
- `GRAMMAR_DB`：语法点
- `SCENARIO_DEFINITIONS`、`DAILY_EXPRESSIONS_DB`：口语场景与句子
- `PHONICS_CURRICULUM`、`HOMOPHONES_DB`、`MINIMAL_PAIRS_DB`、`WORD_FORMATION_DB`、`WORD_RELATIONS_DB`、`FRAME_SEMANTICS_DB` 等

学习进度保存在浏览器 `localStorage` 的 `mengxing_v1_1_state` 键里，换浏览器或清除站点数据会丢失，可在家长门里导出备份。

## 修改注意

- 在 HTML 模板里给 `onclick` 传文本时，用 `attrEscape(JSON.stringify(文本))`，或改用 `data-speak="${attrEscape(文本)}"`，否则句子里的撇号或双引号会让按钮报错。
- 改完可用 `node --check` 检查抽出的内联脚本语法。
- 白板动画（王炸实验室、第一性原理总枢、单词身世总枢）不要直接改主文件，改 `docs/whiteboard/src/` 下的源文件后运行 `python3 docs/whiteboard/src/insert_wb.py`；做法见 `docs/whiteboard/SOP.md`。
