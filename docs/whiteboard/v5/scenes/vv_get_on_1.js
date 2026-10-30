// 🎬 万能动词 · get on ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_get_on.js 案例 1；对照清单 lab/INVENTORY_VV_GET_ON_1_V5.md
// 角色关键帧：sprites/vvgeton1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgeton1.js';
const ACTS = {"*": ["bus2", "bus1", "bus0"]};
const ITEMS = [
  ['n', 'get on：双脚踏上大巴/火车/飞机的甲板平面'],
  ['m', 'BUS 8'],
  ['m', 'get on ①'],
  ['m', '上（公交车）'],
  ['s', 'Let\'s get on the bus at the next stop.', '我们在下一站上公交车吧。'],
  ['w', '车厢地板'],
  ['m', 'ON'],
  ['m', '站上车厢地板'],
  ['w', 'Bye-bye!']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · get on ①', items: ITEMS, acts: ACTS }); }
