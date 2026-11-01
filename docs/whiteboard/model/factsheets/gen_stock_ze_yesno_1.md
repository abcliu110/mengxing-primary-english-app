# 事实表 · gen_stock_ze_yesno_1（生成器导出，逻辑审查对照）

- **例句 Don't you like milk?**（例句）：本幕主问句：你不喜欢牛奶吗；事实喜欢时答 Yes, I do.，事实不喜欢时答 No, I don't.
- **例句 Isn't it cold? Yes, it is.**（例句）：本幕锚例：事实是冷，故答 Yes, it is.
- **例句 Can't you swim? No, I can't.**（例句）：本幕锚例：事实是不会游泳，故答 No, I can't.
- **例句 Aren't you a student? Yes, I am.**（例句）：本幕预测题锚例：事实是学生，故答 Yes, I am.

不变量：
- 答否定疑问恒看事实不看问句里的『不』：事实是就 Yes，事实不是就 No（本幕判据，口诀『问句有不别管它，事实是啥答啥』）
- Yes 后面恒跟肯定，No 后面恒跟否定：Yes 配 do，No 配 don't，不得打架（本幕判据，规则台词）
- 简短回答与问句用同一个助动词（grammar.yaml g30-yesno；本幕例 Yes, I do.、No, I can't.、Yes, I am. 同口径）

审查清单：守恒 / 同一 / 因果 / 指称 / 时序，五项逐帧过截图。