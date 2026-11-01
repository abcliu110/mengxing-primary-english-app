# FIX 词性分类子串误配（2026-11-01，用户截图报告）

## 现象
单词大世界/单词表的「动词」分类里出现 tomorrow（n./adv.）、tonight（adv./n.）等非动词（用户红框截图，第 2/9 页）。

## 根因（代码，非数据）
VOCAB_DB 的 pos 字段本身标注正确（tomorrow 就是 n./adv.，全库 1567 条 pos 取值规范、无畸形串）。错在分类匹配用**子串包含**代替**词元匹配**：
- `"adv."` 里藏着 `"v."` → 凡 pos 含 adv. 的词全部误入「动词」；
- `"pron."` 里藏着 `"n."` → 全部代词误入「名词」。

## 影响面（全库实测，旧匹配器 vs 词元真值）
- 动词：旧 379 词，真值 283，**误入 96**（整个副词类：today/yesterday/always/never/very/too/…）；
- 名词：旧 1007 词，真值 953，**误入 54**（全部代词：I/you/he/she/what/who/this/…）；
- 其余六类（adj./adv./pron./prep./num./conj.）子串与词元恰好等价，无误配；漏掉 0。

## 病灶位置（主 HTML 内共 3 处，已全修）
1. `wlPosMatch`（单词表在用筛选器，line 9188 一带）——截图页面即此路径；
2. `renderVocabPosView` 的 filter（旧词性视图，已被 MENU_WORDS_V5 重定向屏蔽，同修防埋雷，改为转调 wlPosMatch）；
3. 词卡洞察生成器三处 includes（line 6625/6631/6633）：代词曾吃名词「可数/不可数」洞察、纯副词曾吃动词「谓语国王三单穿制服」洞察；改用同一词元集合 `__posT` 判断，v. 分支兼收 `modal v.`。

## 修法
子串 → 按 `/` 切分词元精确匹配；conj. 类保持既有设计（conj./interj./art. 三词元任一命中）；v. 类兼收单值词元 `modal v.`（情态动词 7 条，旧匹配靠子串误打误撞收对，词元化后显式保留）。

## 验证
- 补丁 diff 仅 3 处、其余字节不动（备份 content-audit/main_html_backup_pre_posfix.html；文件 17,253,215 → 17,253,258 B）；
- Node 抽取补丁后 wlPosMatch 对全库 × 8 类逐类比对词元真值：**全 MATCH**（n. 953 / v. 283 / adj. 234 / adv. 96 / pron. 54 / prep. 34 / num. 43 / conj. 16）；tomorrow/tonight 不再入动词、I 不再入名词，定点复核通过。
