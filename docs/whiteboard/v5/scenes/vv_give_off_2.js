// 🎬 万能动词 · give off ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_give_off.js 案例 2；对照清单 lab/INVENTORY_VV_GIVE_OFF_2_V5.md
// 角色关键帧：sprites/vvgiveoff2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgiveoff2.js';
const ACTS = {"*": ["l_fire"]};
const ITEMS = [
  ['n', 'give off：发出，散发出（香味、光、热）'],
  ['w', 'give off ②'],
  ['w', '散发（热量）'],
  ['w', '热量散发出来'],
  ['s', 'The campfire gives off heat.', '篝火散发出热量。'],
  ['m', 'GIVE'],
  ['m', '离开表面'],
  ['m', '给、交出'],
  ['m', '+'],
  ['w', 'Flowers give off a smell.'],
  ['m', '花散发香味。'],
  ['m', '香味 离开 花朵'],
  ['w', 'The fire gives off heat.'],
  ['m', '火散发热量。'],
  ['m', '热量 离开 火堆'],
  ['w', '共同点：OFF = 从源头散发出去'],
  ['s', 'The flowers give off a sweet smell.', '花朵散发出甜美的香气。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · give off ②', items: ITEMS, acts: ACTS }); }
