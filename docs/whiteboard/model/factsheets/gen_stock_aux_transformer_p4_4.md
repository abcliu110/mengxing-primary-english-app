# 事实表 · gen_stock_aux_transformer_p4_4（生成器导出，逻辑审查对照）

- **预测句 She went to school by bus. → Did she go to school by bus?**（例句）：本幕预测：照妖镜 Did 站句首，went 打回原形 go
- **操作词词表**（词表）：本幕总论点名 be / can / will 与 do / does / did：句子里有操作词就直接加 not、直接提到句首；没有就请 do / does / did 出来当操作词
- **实验例 He likes milk. → He doesn't like milk. / Does he like milk?**（例句）：本幕『能量吸收器』实验例：does 吸走三单，likes 变回 like

不变量：
- 英语变否定、变疑问全靠一个『操作词』：有操作词直接加 not、提句首；没有就请 do / does / did，动词回原形（本幕总论判据；模型主张 g29-two-tracks、g30-yesno、st-cl-do-support）
- 时态与三单标记只标一次，落在操作词上：did / does 吸走过去时与三单，动词 100% 回原形，如 went → go、likes → like（本幕上屏实验；模型主张 st-cl-do-support）
- 过去请 did：过去时被照妖镜吸走，went 打回原形 go（本幕口诀；模型主张 g23-did）

审查清单：守恒 / 同一 / 因果 / 指称 / 时序，五项逐帧过截图。