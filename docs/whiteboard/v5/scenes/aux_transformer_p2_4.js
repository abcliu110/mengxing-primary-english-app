// 🪞 助动词照妖镜 · ④ 过去式照妖镜 did · 第 2 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 aux_transformer_4（355 s）的第 2 节（共 4 节，由 v5/split_auto.py 生成；App 白板下「第 2 节」按钮）
// 内容来源（R1 零丢失）：src/cases/aux_transformer.js 案例 4；对照清单 lab/INVENTORY_AUX_TRANSFORMER_4_V5.md
// 角色关键帧：sprites/at4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/at4.js';
const ACTS = {"went": ["l_goout"], "flew": ["plane"], "go": ["l_w0", "l_w1", "l_w2"]};
const ITEMS = [
  ['n', '否定句：照妖镜 didn\'t 出场，吸走过去时：went 瞬间变回 go。'],
  ['w', 'They did not (didn\'t) go to Sanya by plane last winter.'],
  ['s', 'They didn\'t go to Sanya by plane last winter.', '他们去年冬天没有坐飞机去三亚。', 'go'],
  ['w', '照妖镜 didn\'t 吸走过去时，went 打回原形 go'],
  ['w', '③ 一般疑问'],
  ['n', '一般疑问句：照妖镜 Did 站到句首，后面的 went 必须还原成 go。'],
  ['w', 'Did they go to Sanya by plane last winter?'],
  ['s', 'Did they go to Sanya by plane last winter?', '他们去年冬天坐飞机去三亚了吗？'],
  ['w', 'Did 站句首，went → go'],
  ['n', '回答也用 did：Yes, they did. / No, they didn\'t.'],
  ['w', '— Yes, they did. / No, they didn\'t.'],
  ['s', 'They did not go. Did they? Yes, they did. No, they didn\'t.', '他们没去。他们去了吗？是的，去了。不，没去。', 'They did not didn\'t Yes No'],
  ['w', '④ 特殊疑问'],
  ['n', '交通方式：坐什么去，比如 by plane（坐飞机）。问交通方式用 How（怎样）。'],
  ['w', 'How did they go to Sanya last winter?'],
  ['s', 'How did they go to Sanya last winter?', '他们去年冬天怎么去的三亚？'],
  ['w', '对交通方式提问'],
  ['w', 'by plane'],
];
export default function build() { return autoBuild(SP, { title: '🪞 助动词照妖镜 · ④ 过去式照妖镜 did · 第 2 节', items: ITEMS, acts: ACTS }); }
