# 事实表 · gen_stock_ze_mark_1（生成器导出，逻辑审查对照）

- **book / books**（单词）：本幕对照：一本书 a book，三本书 three books，名词加 -s；预测题锚点 I read two books yesterday.
- **go / went**（单词）：本幕对照：go 的过去式为 went；例句 I went to school yesterday.
- **like / likes**（单词）：本幕对照：She likes cats. 中三单动词 like 加 -s，与 I like cats. 对照
- **child / children**（单词）：本幕不规则例：child → children；例句 One child, two children.
- **read**（单词）：本幕同形例：过去式拼法不变，读音变成 /red/（预测题揭晓台词）

不变量：
- 名词复数默认在词尾加 -s（grammar.yaml g01-plural-default；本幕判据『多了加 s』）
- 不规则复数单独记：child → children 属特殊变形组（grammar.yaml g02-irregular-groups；本幕判据同口径）
- 三单动词加 -s：主语是单个他、她、它时动词加 -s 或 -es（grammar.yaml g19-third-s；本幕例 like → likes）
- 过去式分两路：规则动词加 -ed（grammar.yaml g21-ed），高频老词无总规律分组记，如 go → went、read 拼写不变读音变 /red/（grammar.yaml g22-irregular-past）

审查清单：守恒 / 同一 / 因果 / 指称 / 时序，五项逐帧过截图。