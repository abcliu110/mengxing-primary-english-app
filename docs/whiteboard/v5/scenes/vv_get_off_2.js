// 🎬 万能动词 · get off ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_get_off.js 案例 2；对照清单 lab/INVENTORY_VV_GET_OFF_2_V5.md
// 角色关键帧：sprites/vvgetoff2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgetoff2.js';
const ACTS = {"*": ["l_boff0", "l_boff1", "l_boff2"]};
const ITEMS = [
  ['n', 'get off：下车（公交/火车/飞机/马）'],
  ['m', 'get off ②'],
  ['m', '下（自行车）'],
  ['w', 'Stop!'],
  ['s', 'He gets off his bike.', '他从自行车上下来。'],
  ['w', '离开车座'],
  ['m', 'GET'],
  ['m', '到达 / 进入'],
  ['m', '离开表面'],
  ['m', '+'],
  ['w', 'Get off the bus.'],
  ['m', '下公交车。'],
  ['m', '脚 离开 车厢地板'],
  ['w', 'Get off the bike.'],
  ['m', '人 离开 车座'],
  ['m', '从自行车上下来。'],
  ['w', '共同点：OFF = 离开车的平面'],
  ['s', 'Get off the bus at the hospital.', '在医院那一站下公交车。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · get off ②', items: ITEMS, acts: ACTS }); }
