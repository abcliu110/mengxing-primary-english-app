# 事实表 · gen_stock_stress_rhythm_3（生成器导出，逻辑审查对照）

- **can 与 can't 对照句 I can swim. 与 I can't swim.**（例句）：肯定句中 can 弱读成 /kən/、重音给 swim；否定句 can't 重读并张大嘴，本幕标 /ˈkɑːnt/
- **a cup of tea 与 lots of、kind of**（词表）：of 弱读只剩 /ə/：a cup of tea 连起来听像 cuppa tea，lots of 读 /ˈlɒtsə/、kind of 读 /ˈkaɪndə/
- **缩读 wanna 与 gonna**（词表）：want to 缩为 wanna、going to 缩为 gonna；例行 I'm gonna visit my grandpa tomorrow. 中 to 弱读为 /tə/
- **连读例 look at it、put it on、an apple、pick it up**（词表）：前词尾巴辅音粘上后词开头元音连成一口气：look at it 读 /ˈlʊ-kæ-tɪt/、put it on 读 /ˈpʊ-tɪ-tɒn/

不变量：
- 实词重读拉长、虚词弱读成 /ə/：虚词 to、for、of、and、can 常常压成懒元音 /ə/，即弱读（本幕判据；模型记录 dom-phonetics 与 frameworks_fixes STRESS_AND_SCHWA_DB 法则C）
- 节奏差异在模型裁定中是连续统而非二分定论：汉语的音节用力比较均匀、英语把重音拉得更开，是『重音突显程度』不同，本幕机关枪与打鼓只是听感比喻（frameworks_fixes STRESS_AND_SCHWA_DB 法则C；dom-phonetics）
- can't 的读音须并注口音：英式 /ˈkɑːnt/、美式 /kænt/，can 的弱读 /kən/ 两式相同；本幕只标英式（frameworks_fixes STRESS_AND_SCHWA_DB 法则C 音标口径）
- 连读条件恒定：前一个词以辅音结尾、后一个词以元音开头，就粘成一个音节读（本幕判据与口诀：辅音元音手拉手）

审查清单：守恒 / 同一 / 因果 / 指称 / 时序，五项逐帧过截图。