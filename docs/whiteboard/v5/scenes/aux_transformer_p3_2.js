// 🪞 助动词照妖镜 · ② 情态动词大将军 · 第 3 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 aux_transformer_2（267 s）的第 3 节（共 3 节，由 v5/split_auto.py 生成；App 白板下「第 3 节」按钮）
// 内容来源（R1 零丢失）：src/cases/aux_transformer.js 案例 2；对照清单 lab/INVENTORY_AUX_TRANSFORMER_2_V5.md
// 角色关键帧：sprites/at2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/at2.js';
const ACTS = {"speak": ["l_speak"], "read": ["l_read"], "jump": ["l_jc", "l_ja"]};
const ITEMS = [
  ['n', '副词：说明动作「怎么样」的词，比如 well（好）。感叹副词要用 How。'],
  ['w', 'How well Leo can speak English!'],
  ['s', 'How well Leo can speak English!', '里奥英语说得多好啊！'],
  ['n', '感叹句：How well + 主语 Leo + 谓语 can speak，主语在前，不用倒过来！'],
  ['w', 'How well + 主语 Leo + 谓语 can speak！'],
  ['w', '① Leo can speak English very well.'],
  ['w', '② Leo cannot (can\'t) speak English very well.'],
  ['w', '③ Can Leo speak English very well?'],
  ['w', '④ What can Leo speak very well? / How well can Leo speak English?'],
  ['s', 'Leo can speak English very well.', '里奥英语说得非常好。', 'Leo can speak English very well How'],
  ['w', '情态大将军：not 贴身后，提问跳句首，后面动词永远原形！'],
  ['n', '口诀：大将军自己会变形：加 not、跳句首，后面动词永远原形。'],
  ['n', '预测：「她能跳得很高」变成一般疑问句：大将军 can 该站到哪里？jump 要不要变？先想 3 秒！'],
  ['w', '🔮 她能跳得很高。She can jump high.'],
  ['w', '→  ___ she jump high?'],
  ['s', 'She can jump high.', '她能跳得很高。', 'she jump high'],
  ['n', '揭晓：大将军 Can 跳到句首，jump 还是原形：Can she jump high?'],
  ['w', 'Can she jump high?'],
  ['s', 'Can she jump high?', '她能跳得很高吗？', 'can she jump high'],
  ['w', '💡 一句话洞见'],
  ['w', '情态动词是大将军：自己会变形，'],
  ['w', '后面的动词永远用原形'],
  ['w', '🎵 口诀'],
  ['w', '口诀：情态大将军：not 贴身后，'],
  ['w', '提问跳句首，后面动词永远原形！'],
  ['w', '🪞 助动词照妖镜 · 第二类 情态动词大将军']
];
export default function build() { return autoBuild(SP, { title: '🪞 助动词照妖镜 · ② 情态动词大将军 · 第 3 节', items: ITEMS, acts: ACTS }); }
