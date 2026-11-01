# 事实表 · gen_stock_hd_poly_poly_watch_3（生成器导出，逻辑审查对照）

- **目标词 watch /wɑːtʃ/**（单词）：总卡义项清单：【v./n.】观看，注视（电视、比赛等动态画面）/ 手表；本幕为多义第3幕，立引申新义『手表』
- **义项③：手表**（义项）：本幕讲解对象（台词讲法）：n. 手表，台词表述为 watch 从动词『观看』引申为名词『手表』，并举 a nice watch；该引申讲法已被模型裁定订正，见 invariants
- **例句 My father has a new watch.**（例句）：本幕锚例句：watch 取名词『手表』义，对应第三幕【引申新义·手表】；例句人物为 My father
- **义项①：观看，注视**（义项）：本义回顾：v. 观看，注视（电视、比赛等动态画面）；锚例句为 We watch TV on Sunday.，本幕仅作对照列名

不变量：
- 同一拼写 watch 的义项分野恒以词性与例句语境为准：We watch TV on Sunday. 取动词『观看』，My father has a new watch. 取名词『手表』（本幕两例句对照；名词义项本身经模型裁定保留，仅得名讲法订正，vocab_fixes.yaml VF-002 corrected）
- 本幕台词把手表义讲成『随时看时间的工具』，与模型裁定冲突：手表义须经『守夜』中转，不得由『注视观看』直接引申（vocab_fixes.yaml VF-001、VF-002；frameworks_fixes.yaml T07）
- 手表义的正确得名恒为：名字来自古英语『守夜、唤醒』，最早的手表是能叫醒人的小闹钟（vocab_fixes.yaml VF-002 corrected）

审查清单：守恒 / 同一 / 因果 / 指称 / 时序，五项逐帧过截图。