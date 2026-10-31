// 🪞 助动词照妖镜 · ② 情态动词大将军 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：本幕只留第 1 节（共 3 节，其余在 scenes/aux_transformer_p2_2.js … 由 v5/split_auto.py 生成）
// 内容来源（R1 零丢失）：src/cases/aux_transformer.js 案例 2；对照清单 lab/INVENTORY_AUX_TRANSFORMER_2_V5.md
// 角色关键帧：sprites/at2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/at2.js';
const ACTS = {"speak": ["l_speak"], "read": ["l_read"], "jump": ["l_jc", "l_ja"]};
const ITEMS = [
  ['n', '这一类句子里住着一位「大将军」，变形全靠它一个人。'],
  ['w', '助动词照妖镜'],
  ['w', '第二类：情态动词大将军'],
  ['w', '💡 记忆联想'],
  ['w', '✂️ 简化说法'],
  ['w', '助动词照妖镜'],
  ['w', '第二类：情态动词大将军'],
  ['w', '💡 记忆联想'],
  ['m', '✂️ 简化说法'],
  ['m', '① 肯定'],
  ['m', '② 否定'],
  ['m', '③ 一般疑问'],
  ['m', '④ 特殊疑问'],
  ['m', '⑤ 感叹·口诀'],
  ['m', '🔮 预测'],
  ['w', '① 肯定句'],
  ['n', '肯定句：Leo can speak English very well. 里奥能把英语说得非常好。'],
  ['w', 'Leo can speak English very well.'],
  ['w', 'Hello!'],
  ['s', 'Leo can speak English very well.', '里奥英语说得非常好。'],
  ['s', 'Hello! I can speak English.', '你好！我会说英语。', 'hello'],
  ['w', '里奥能把英语说得非常好。'],
  ['n', '情态动词：can 能、will 将要、must 必须、should 应该，表示能力、打算或要求。'],
  ['w', '大将军'],
  ['m', 'can'],
  ['m', '情态大将军'],
  ['n', '免死金牌：不管主语是谁，情态动词后面的动词永远用原形：can speak。'],
  ['s', 'Will, must, should. You should read every day.', '将会、必须、应该。你应该每天读书。', 'will must should'],
  ['w', '② 否定句'],
  ['n', '否定句：大将军 can 后面直接加 not，写成 cannot 或 can\'t。'],
  ['w', 'Leo cannot (can\'t) speak English very well.'],
  ['s', 'Leo can\'t speak English very well.', '里奥英语说得不太好。', 'can\'t'],
];
export default function build() { return autoBuild(SP, { title: '🪞 助动词照妖镜 · ② 情态动词大将军', items: ITEMS, acts: ACTS }); }
