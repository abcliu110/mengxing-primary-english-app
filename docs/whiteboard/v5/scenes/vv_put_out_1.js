// 🎬 万能动词 · put out ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_put_out.js 案例 1；对照清单 lab/INVENTORY_VV_PUT_OUT_1_V5.md
// 角色关键帧：sprites/vvputout1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvputout1.js';
const ACTS = {"*": ["l_cake0", "l_cake1", "l_cake2"]};
const ITEMS = [
  ['n', 'put out：把火苗的能量向外扑灭驱散'],
  ['m', 'put out ①'],
  ['m', '吹灭（蜡烛）'],
  ['w', 'Make a wish!'],
  ['s', 'Put out the candles and make a wish!', '吹灭蜡烛，许个愿吧！'],
  ['m', 'OUT'],
  ['m', '火苗熄灭了'],
  ['w', 'Happy birthday!']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · put out ①', items: ITEMS, acts: ACTS }); }
