# 事实表 · gen_stock_metaphor_code_2（生成器导出，逻辑审查对照）

- **feel blue 与例句 I feel blue today.**（例句）：字面为变成蓝色，比喻义为心情低落，即 feel sad；收束例句为 Don't feel blue! Everything will be fine.
- **a green hand 与 give the green light**（词表）：green hand 字面为绿色的手，比喻义为新手、菜鸟，锚例句 He is a green hand.；green light 为亮绿灯即批准、同意
- **black tea 与例句 I like black tea.**（例句）：义为红茶：英语按乌黑的干茶叶命名，中文按泡出的红色茶水命名；预测揭晓点红茶须说 black tea，另有锚例句 I like black tea with milk.
- **a white lie 与 golden opportunity**（词表）：white lie 字面为白色的谎言，比喻义为不伤人的善意的谎言；golden 因金子最宝贵而指千载难逢的黄金良机

不变量：
- 颜色词背后藏着文化潜台词，翻译前先想它在那个文化里让人想到什么、再翻译，不能只按字面译（本幕一句话洞见）
- black tea 是中英命名视角差异：照中文硬翻成 red tea 属本幕所称中式错译（本幕判据）
- black tea、white lie、green hand 在模型中归文化习语一类：约定俗成、不可推导，须整卡当作背下来的存货，不能用一套解码律硬推（模型记录 dom-metaphor；frameworks_fixes METAPHOR_CODES_DB 库级三类标注）
- 口诀映射在本幕内封闭：蓝是忧，绿是新，黑茶是红茶，白谎是善意，金子最宝贵（本幕口诀）

审查清单：守恒 / 同一 / 因果 / 指称 / 时序，五项逐帧过截图。