// 🪞 助动词照妖镜 · ④ 过去式照妖镜 did · 第 3 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 aux_transformer_4（355 s）的第 3 节（共 4 节，由 v5/split_auto.py 生成；App 白板下「第 3 节」按钮）
// 内容来源（R1 零丢失）：src/cases/aux_transformer.js 案例 4；对照清单 lab/INVENTORY_AUX_TRANSFORMER_4_V5.md
// 角色关键帧：sprites/at4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/at4.js';
const ACTS = {"went": ["l_goout"], "flew": ["plane"], "go": ["l_w0", "l_w1", "l_w2"]};
const ITEMS = [
  ['n', '黄金三步：换 How → 提过去助动词 did → 主语后 went 还原为 go。'],
  ['w', '① 交通方式用 How ➔ ② 提过去助动词 did ➔ ③ 主语后 went 还原为 go'],
  ['s', 'To Sanya, by plane, last winter.', '去三亚，坐飞机，去年冬天。', 'to Sanya by plane last winter'],
  ['w', '⑤ 感叹句'],
  ['n', '感叹句：名词 trip 用 What a wonderful trip；副词 fast 用 How fast。'],
  ['w', 'What a wonderful trip they had last winter! / How fast the plane flew!'],
  ['s', 'What a wonderful trip they had last winter!', '他们去年冬天的旅行多棒啊！'],
  ['s', 'How fast the plane flew!', '飞机飞得多快啊！', 'How fast the flew'],
  ['n', '感叹句里本来就是过去的事，所以 had、flew 保持过去式，不用 did。'],
  ['w', '名词 trip 用 What a wonderful trip；副词 fast 用 How fast！'],
  ['s', 'What a wonderful trip they had!', '他们的旅行多棒啊！', 'What a wonderful trip had'],
  ['w', '① They went to Sanya by plane last winter.'],
  ['w', '② They did not (didn\'t) go to Sanya by plane last winter.'],
  ['w', '③ Did they go to Sanya by plane last winter?'],
  ['w', '④ How did they go to Sanya last winter?'],
  ['w', '过去请 did：过去时被照妖镜吸走，went 打回原形 go！'],
  ['n', '口诀：看到 did / didn\'t，后面动词一律打回原形！'],
];
export default function build() { return autoBuild(SP, { title: '🪞 助动词照妖镜 · ④ 过去式照妖镜 did · 第 3 节', items: ITEMS, acts: ACTS }); }
