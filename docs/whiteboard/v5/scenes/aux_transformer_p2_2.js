// 🪞 助动词照妖镜 · ② 情态动词大将军 · 第 2 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 aux_transformer_2（267 s）的第 2 节（共 3 节，由 v5/split_auto.py 生成；App 白板下「第 2 节」按钮）
// 内容来源（R1 零丢失）：src/cases/aux_transformer.js 案例 2；对照清单 lab/INVENTORY_AUX_TRANSFORMER_2_V5.md
// 角色关键帧：sprites/at2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/at2.js';
const ACTS = {"speak": ["l_speak"], "read": ["l_read"], "jump": ["l_jc", "l_ja"]};
const ITEMS = [
  ['n', '注意 can + not 要连写成 cannot。后面的 speak 还是原形。'],
  ['w', '直接在大将军 can 后加 not（cannot / can\'t），后面 speak 保持原形'],
  ['s', 'Cannot. He cannot swim. Not now.', '不能。他不会游泳。现在不行。', 'cannot not'],
  ['w', '③ 一般疑问'],
  ['n', '一般疑问句：把大将军 Can 直接提到主语 Leo 前面，句末换成问号。'],
  ['w', 'Can Leo speak English very well?'],
  ['s', 'Can Leo speak English very well?', '里奥英语说得很好吗？'],
  ['w', '大将军 Can 提到主语 Leo 前面'],
  ['n', '回答也用 can：Yes, he can. / No, he can\'t.'],
  ['w', '— Yes, he can. / No, he can\'t.'],
  ['s', 'Yes, he can. No, he can\'t.', '是的，他会。不，他不会。', 'Yes he No'],
  ['w', '④ 特殊疑问'],
  ['n', '特殊疑问句：问「说什么」用 What；问「说得多好」用 How well。'],
  ['w', 'What can Leo speak very well? / How well can Leo speak English?'],
  ['s', 'How well can Leo speak English?', '里奥英语说得怎么样？'],
  ['s', 'What can Leo speak very well?', '里奥什么说得很好？', 'What'],
  ['n', '三步：换疑问词 → 提大将军 can → 后面跟主语 + 动词原形。'],
  ['w', '① 换疑问词 What ➔ ② 提大将军 can ➔ ③ 后面主语 + 动词原形'],
  ['w', '⑤ 感叹句'],
];
export default function build() { return autoBuild(SP, { title: '🪞 助动词照妖镜 · ② 情态动词大将军 · 第 2 节', items: ITEMS, acts: ACTS }); }
