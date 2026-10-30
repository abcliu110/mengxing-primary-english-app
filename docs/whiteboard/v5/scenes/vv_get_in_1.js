// 🎬 万能动词 · get in ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_get_in.js 案例 1；对照清单 lab/INVENTORY_VV_GET_IN_1_V5.md
// 角色关键帧：sprites/vvgetin1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgetin1.js';
const ACTS = {"*": ["car_in0", "car_in1", "car_in2"]};
const ITEMS = [
  ['n', 'get in：弯腰钻进小汽车或房间的三维盒子里'],
  ['m', 'get in ①'],
  ['m', '上（小汽车）'],
  ['s', 'Get in the car quickly! It\'s raining.', '快钻进小汽车里！下雨了。'],
  ['w', '车厢 = 盒子'],
  ['m', 'IN'],
  ['m', '钻进车厢'],
  ['w', 'Beep!']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · get in ①', items: ITEMS, acts: ACTS }); }
