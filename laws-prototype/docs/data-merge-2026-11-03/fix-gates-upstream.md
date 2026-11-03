# 修复报告：问题 3（词源线门禁）+ 问题 4（上游对账）+ 规范登记纠正 + 生成标记落地

日期：2026-11-03。基线：远端 master `d1c946f`（fetch 核对 0 落后/0 未推）。改动留在 /tmp/mengxing2 工作区，未 commit、未 push。

## 问题 3：词源线补门禁

1. **refresh_et.py 迁回 tools/**：新建 `laws-prototype/tools/refresh_et.py`（仓库相对路径，以文件位置定位 laws-prototype/；委托 gen_et.py --write 并保留抽查打印）。归档区原件保留，文件头已加「归档副本，勿作正式通道」注记，指向 tools/ 正式版。
2. **新建 tools/gen_et.py**：payload 构造与原 refresh_et 完全一致（verified 全记录排序 / pending 只取 word+reason / bank 子集取 phonetic_gb 优先 / flagship 12 词断言 / 未收 ==195 断言 / `json.dumps(ensure_ascii=False)` + `</`→`<\/` 转义），数据源 etymology.json + wordbank.json。**再生结论：与现行载荷行逐字节一致（3,051,833 字符），--check 首跑即 PASS、稳态 PASS**；5 处计数文案（1816/462 派生形态）一并核对全对。零差异，无归因项。
3. **规范修正（DATA_SOURCE_SPEC.md）**：
   - §1 词源行：刷新通道改指 `tools/refresh_et.py` + 引擎 `tools/gen_et.py`，明注归档同名脚本不作通道（消除与 §5.2 的正面冲突）。
   - §1 动词、介词行：改登记真实状态——事实源在册，但主文件内嵌**尚未生成化**（无 gen_verb/gen_prep，Stewart 自有车道），不得再称「生成副本」。
   - §6：补统一入口 `tools/check_all.py` 与上游对账 `tools/check_upstream.py` 的定位说明。
   - §7：checkpoints addendum 基线分叉（2,287 vs 2,352 vs 现行 2,473）**正式销项登记**：已核对、分叉来源为两池新建时推导基数与旧覆盖对账口径不同基、非数据错误；48 站本体已按 167 站主线重算对齐；接受现状，addendum 注记保留作历史。

## 问题 4：上游对账 + 一键总检

4. **新建 tools/check_upstream.py**（只报告不写回）：五条链成员+内容双比，**实测未登记漂移 0 条**——
   - (a) YAML 428 条（8 文件，entries/顶层列表两种结构均适配）vs laws_master yaml 分仓：逐条深比全等；
   - (b) wordbank 2,473 条 vs words_master wordbank 分仓：全等；
   - (c) phonetic_gb 2,287 条 vs words_master phonetic_gb 分仓 + wordbank.phonetic_gb 字段 + 卡面音标（words_master 2,301 张 + phonics_master 2,301 张）：全合；
   - (d) wordsets 174 模式 vs phonics_master wordsets 分仓：全等；
   - (e) checkpoints 文件 vs phonics_master checkpoints.file 分仓深比全等；48 站与 embedded_spine 167 站按 key 对位（g/ph/pids/过关组词集）全合；addendum 基线分叉识别为已登记项（不计失败）。
   - 负测试已验：diff 引擎能真实报出篡改路径，非空转。
5. **新建 tools/check_all.py**：一键跑 8 项（gen_morph/gen_laws/gen_phonics/gen_words/gen_spoken/gen_et --check + check_morph_sync + check_upstream），汇总表输出，任一失败退出码非零。**实跑：8/8 PASS，退出码 0。**

## 生成标记（规范 §3.1 落地）

6. 六个生成器全部升级：--write 时在每段受管字面量前确保一行
   `/* GENERATED: tools/gen_<x>.py ← model/<源> · DO NOT EDIT */`（字面量跨度之外）；--check 不受标记影响（span 型生成器只比跨度；gen_laws 的全文重构比对改为两侧先剥标记行再比）。
   **覆盖段数 22**：主文件 20 段（LAWDATA + PN 5 + AR 3 + CJ 4 = gen_laws 13；morph DATA/LAWREG 2；拼读 DATA 1；WLIST/WPAGE 2；SP_DATA 1；ET 载荷 1）+ morphology 文件 2 段（DATA/LAWREG）。
   主文件 git diff 经逐行核：**非标记增删行 = 0**，只有 20 行标记新增。

## 验证（全过）

- `tools/check_all.py`：8/8 PASS（退出码 0）。
- git diff 范围：仅 DATA_SOURCE_SPEC.md、tools/（5 个生成器升级 + 4 个新文件）、imported 归档 refresh_et 文件头注记、主文件与 morphology 文件的标记行。
- jsdom 冒烟：RV.buildPool() 实跑 **1,200 题**；ET/MZ/RV/PN/AR/CJ/SP 命名空间齐全；唯一 stderr 为 jsdom canvas 测量固有伪影（基线同类，与本次改动无关）。
- 主文件 script 块 20 个 node --check 零错误；section 开/闭 65/65 不变；ET 1816 verified / 462 pending 不变（gen_et --check 实测）。
