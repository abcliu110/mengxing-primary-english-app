// 🪞 助动词照妖镜 · ④ 过去式照妖镜 did —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：本幕只留第 1 节（共 4 节，其余在 scenes/aux_transformer_p2_4.js … 由 v5/split_auto.py 生成）
// 内容来源（R1 零丢失）：src/cases/aux_transformer.js 案例 4；对照清单 lab/INVENTORY_AUX_TRANSFORMER_4_V5.md
// 角色关键帧：sprites/at4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/at4.js';
const ACTS = {"went": ["l_goout"], "flew": ["plane"], "go": ["l_w0", "l_w1", "l_w2"]};
const ITEMS = [
  ['n', '这一句也没有护卫，动词还是过去式，要请过去式照妖镜 did。'],
  ['w', '助动词照妖镜'],
  ['w', '第四类：过去式照妖镜 did'],
  ['w', '💡 记忆联想'],
  ['w', '✂️ 简化说法'],
  ['w', '助动词照妖镜'],
  ['w', '第四类：过去式照妖镜 did'],
  ['w', '💡 记忆联想'],
  ['m', '✂️ 简化说法'],
  ['m', '① 肯定'],
  ['m', '② 否定'],
  ['m', '③ 一般疑问'],
  ['m', '④ 特殊疑问'],
  ['m', '⑤ 感叹·口诀'],
  ['m', '🔮 预测'],
  ['w', '① 肯定句'],
  ['n', '肯定句：They went to Sanya by plane last winter. 他们去年冬天坐飞机去了三亚。'],
  ['w', 'They went to Sanya by plane last winter.'],
  ['s', 'They went to Sanya by plane last winter.', '他们去年冬天坐飞机去了三亚。', 'went'],
  ['w', '他们去年冬天坐飞机去了三亚。'],
  ['n', '过去式：表示已经发生的事，动词要变样。went 是 go 的过去式。'],
  ['n', '不规则过去式：不是加 -ed，而是整个词变了样，比如 go → went、buy → bought。'],
  ['w', '过去式（原形 go）'],
  ['s', 'Played, ed. Buy, bought. I bought a book.', '玩了（加 -ed）。买，买了。我买了一本书。', 'ed buy bought'],
  ['n', '照妖镜 did：did 自己带着「过去」的标记，照到 went，它就打回原形 go。'],
  ['m', 'did'],
  ['m', '照妖镜 did'],
  ['w', '② 否定句'],
];
export default function build() { return autoBuild(SP, { title: '🪞 助动词照妖镜 · ④ 过去式照妖镜 did', items: ITEMS, acts: ACTS }); }
