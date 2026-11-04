# 级别化源表快照（2026-11-04 登记为事实源）

本目录是 `tools/gen_levels.py`（统一级别字段 WORD_LEVELS）的源表资产，2026-11-04
「全部修改」第三波 A 登记为名单/标准事实源（见 `laws-prototype/DATA_SOURCE_SPEC.md`
§1「统一级别」行）。归档区纪律例外同 `wordlist-snapshots-2026-11-03` 先例：经
§1 登记的快照可作生成源，未登记者不参与生成。

## kebiao_level2_505.txt / kebiao_level3_new.txt

《义务教育英语课程标准（2022 年版）》附录 3 词汇表：

- 二级表（小学阶段）505 条；三级表「新增词」（初中阶段新学词）1,095 条。
- 来源链：教育部官方扫描版 PDF（GitHub 镜像 kntism/China-Curriculum-Standards
  所收，PDF 元数据 Author=中华人民共和国教育部，纯扫描无文本层）→ 300DPI
  渲染 + OCR → 字母序/行距审计 + 三级表星标复打交叉核对 + 各 30 词随机抽查
  原页裁图 30/30 相符。文件头注保留了完整核验记录。
- 口径：A–Z 主表；数词/月份/星期/地理/节日等分表单独立出，不并入主表计数
  （数词在 gen_levels 中按闭集单独处理并注明）。
- 工作区原件：`~/workspace/laws-merge-2026-11-03/expert-research/kebiao-505.txt`
  与 `kebiao-level3-new.txt`（2026-11-04 迁入本目录，内容逐字相同）。

## ecdict_freq_extract.json

- 内容：`{小写词形: [bnc, frq]}`，bnc = BNC（英国国家语料库）词频序、
  frq = COCA（美国当代英语语料库）词频序，0 表示该语料库无此序位。
- 来源：ECDICT 开源英汉词典数据库（skywind3000/ECDICT）标准 csv
  （770,612 行）的 bnc/frq 两列；原表在工作区
  `~/workspace/laws-merge-2026-11-03/wordfill-scratch/ecdict.csv`。
- 提取范围：词库 2,942 词派生的全部候选查表形（词面原形、斜杠分拆形、
  空格/连字符成分形、verb_form_of 基形、morphemes 词根形），共 3,173 形，
  其中 2,855 形在 ECDICT 中有至少一列词频序。本文件只收有词频序的形；
  查不到 = 无词频数据（与「不在 ECDICT」不区分，定级口径上同等对待）。
- 用途限定：仅作 gen_levels 第四层「词频推导」的分档依据，标签一律标
  「推导」，不冒充任何官方级别。
