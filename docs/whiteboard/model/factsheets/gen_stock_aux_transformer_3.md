# 事实表 · gen_stock_aux_transformer_3（生成器导出，逻辑审查对照）

- **例句 Mia watches TV every Saturday evening.**（例句）：本幕肯定式：主语 Mia 为第三人称单数，动词 watches 带 -es；本幕依次变出否定、一般疑问、特殊疑问、感叹四式，变形对象恒为本句
- **does / doesn't（照妖镜）**（语法对象）：本幕请来的助动词：句子没有护卫、实义动词不能自己跑到主语前面时请它帮忙；它吸走 -es，动词打回原形 watch
- **特殊疑问句 When does Mia watch TV?**（句型）：本幕④式：When 问时间，所问成分是 every Saturday evening；同幕感叹式为 What a relaxing Saturday evening Mia has!

不变量：
- 单三请 does：看到 does / doesn't，后面动词立刻打回原形，别再加 -es（本幕口诀；模型主张 xc-g19-does、st-cl-do-support）
- 一般疑问句请 Does 站句首，简短回答与问句恒用同一助动词 does：Yes, she does. / No, she doesn't.（本幕台词；模型主张 g30-yesno）
- 特殊疑问黄金三步恒为：换疑问词 → 提助动词 does → 主语后的动词打回原形（本幕黄金三步；模型主张 g31-wh-words）
- 感叹句公式恒为 What a + 形容词 + 单数名词 + 主谓（本幕公式；模型主张 g34-exclamatory）

审查清单：守恒 / 同一 / 因果 / 指称 / 时序，五项逐帧过截图。