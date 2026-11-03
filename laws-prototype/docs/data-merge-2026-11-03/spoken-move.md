# 口语对话 + 拍手歌搬运报告（借鉴清单 A1/A3 执行）

日期：2026-11-03。依据：Stewart 裁定「先搬口语对话+拍手歌，B 类登记待办，然后删老 App」。
工作区：独立克隆 `/tmp/mengxing-spoken`（基线远端 master HEAD 91861d6），**未 commit、未 push**，待主会话合并验收。老 App 删除不在本任务内（搬运验收后由主会话执行）。

## 一、提取计数对账（全过，差异为零）

新建设实源 `laws-prototype/model/spoken_data.json`（140,823 字节），提取通道 `tools/extract_spoken.py`（可重跑、自带断言）：

| 资产 | 老 App 源 | 提取结果 | 对账 |
|---|---|---|---|
| DAILY_EXPRESSIONS_DB 对话 | 144 条 | dialogues 144 条逐条逐字段原文 | 深比一致 |
| 场景（scenario_id） | 16（SC01–SC16） | scenes 索引 16（标题/类型集/条数/ids） | 覆盖 144 条恰好一次 |
| ORAL_12_SCENES 场景问答 | 12 组 | scene_qa 12 组 | 深比一致 |
| GRAMMAR_CHANTS 拍手歌 | 8 首 | chants 8 首 | 深比一致 |

`extract_spoken.py --verify` 复跑 PASS（回读事实源与老 App 三处源字面量再做全量深比）。
**源数据一处实情**：SC02（感谢与道歉）8 条的 scene_type 在老 App 里 greeting / thanks_sorry 各 4 条、并不统一；对话原文逐字不动，索引层只登记类型集合（scene_types），不做一致性强断言。scenario_title 全场景一致，无此问题。

单一数据源登记：`DATA_SOURCE_SPEC.md` §1 登记表已新增「口语对话与拍手歌 → `model/spoken_data.json`」一行（按规范 §2.2 先登记后建数据）。

## 二、新增区结构（口语区，第十五区）

主文件 `mengxing-prototype-v1.html` 改动（+96,453 字符，其中数据字面量 86,536）：

- **导航 pill**「口语区」（data-v="spoken"），位于介词之后、表达写作区之前；
- **首页卡片**（data-go="spoken"，🗣️）位于介词卡之后、表达写作区卡之前；首页计数文案「十四区」→「十五区」；
- **区首页** `#v-spoken` + **详情页** `#v-spoken-detail`：静态头（回首页/标题/说明）+ `.sp-scope` 容器，作用域样式块紧邻 section（仿 CJ 放置法；含 `header.top` 作用域复位，全区未用裸 header 元素）；
- **IIFE**（新 script 块，置于连词区 IIFE 之后）：`window.SP = {go, qa, chants, back, say, sayItem, sayScene, sayQA, sayChant}`；首页渲染 16 张场景卡（按 scenario_id 序）+ 2 个入口卡（场景问答速练 / 双语拍手歌）；
- **场景页**：每条对话一张卡——主句（点读）、中文、用法提示、双人对话逐轮气泡（逐句点读）、「▶ 读这条对话」整条连读；页首「▶ 读整场对话」整场连读；
- **问答页**：12 组 Q/A 逐组呈现（点读 + 整组连读）；**拍手歌页**：8 首中英逐行对照（点行单听 + 整首连读英文）；
- **朗读**：复用 App 现行 TTS 机制（优先 LAW.say，否则 speechSynthesis en-GB / rate 0.85，与各区 say() 同参数；连读为 cancel 后多 utterance 入队），未新造通道；
- **数据生成**：IIFE 内 `var SP_DATA = …` 由 `tools/gen_spoken.py` 从事实源按紧凑 JSON 再生，带「勿手改」生成戳；`gen_spoken.py --check` 稳态逐字节 PASS。

figma-all 色板：`.sp-scope` 用 PN/AR/CJ 同族蓝色自有样式，未进 figma-all（与 PN/AR/CJ 集成之初先例状态相同），映射已登记进 B 类待办，未强行补。

## 三、B 类待办登记

`laws-prototype/docs/data-merge-2026-11-03/borrow-backlog.md` 已建，登记 9 项，每项一句现状 + 借鉴路径：A2 闯关玩法壳（只借壳、题从总表生成）、A4 总地图、B1 一页速查卡形态（内容从 laws_master 再生）、B2 决策树+天坑榜组织法、B3 可信度徽章 5 级体系、B4 词页字段位（**只借字段位不搬模板故事**，注明纪律）、B5 白板主题页（含口语白板约 152 页，整批搬=双轨播放器不推荐）、B6 my_study 错题本三分法、口语区 figma-all 色板映射。

## 四、验证（全过）

- 提取对账：144/16/12/8 + 逐条深比，零差异（见一）；
- `gen_spoken.py --check`：PASS（86,536 字符逐字节一致）；
- 既有校验不回归：gen_morph（逐字节一致）、check_morph_sync（三方一致）、gen_laws（PASS）、gen_phonics（PASS）、gen_words（PASS）；
- script 块 node --check：20 块（原 19 + SP 1）零语法错误；
- section 开合：65/65（原 63/63 + 口语区 2），平衡；
- DOM-stub 冒烟（jsdom，21 项断言全过）：首页 16 场景卡 + 2 入口卡、pill/首页卡片/「十五区」文案在位；SC01 场景页 7 条/21 轮、SC09 13 条；sayItem 入队 3 句、sayScene（SC02）入队 22 句、sayQA 2 句、sayChant 3 行、单句 say 正常；back 回首页正常。页面加载有 1 条 jsdom 固有报错（canvas 相关，源自既有语法白板初始化，与口语区无关，基线同源）；
- 防回退：复习池 buildPool 实测 **1200** 不变；etymology.json 2,278 条（1816 已核/462 待核）未动，diff 无 ET 区 hunk。

## 五、改动集清单（待主会话验收合并）

| 文件 | 变更 |
|---|---|
| `laws-prototype/model/spoken_data.json` | 新增（事实源） |
| `laws-prototype/tools/extract_spoken.py` | 新增（提取+对账） |
| `laws-prototype/tools/gen_spoken.py` | 新增（生成器） |
| `laws-prototype/mengxing-prototype-v1.html` | +147 行级 hunk×6（pill、计数文案、首页卡片、样式+2 section、SP 脚本块含生成字面量），主文件 +96,453 字符 |
| `laws-prototype/DATA_SOURCE_SPEC.md` | 登记表 +1 行 |
| `laws-prototype/docs/data-merge-2026-11-03/borrow-backlog.md` | 新增（B 类待办 9 项） |

备注：克隆为稀疏检出（跳过 imported/ 档案区，本任务无关），git status 干净无附带改动；/tmp 曾因双克隆占满，稀疏+浅克隆下本克隆占 115M。
