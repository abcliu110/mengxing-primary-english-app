// 🎬 万能动词 · get on ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_get_on.js 案例 2；对照清单 lab/INVENTORY_VV_GET_ON_2_V5.md
// 角色关键帧：sprites/vvgeton2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgeton2.js';
const ACTS = {"*": ["l_bike0", "l_bike1", "l_bike2"]};
const ITEMS = [
  ['n', 'get on：上车（公交/火车/飞机/自行车）；相处融洽'],
  ['m', 'get on ②'],
  ['m', '骑上（自行车）'],
  ['w', '坐上车座'],
  ['s', 'Get on your bike!', '骑上你的自行车！'],
  ['w', '车座'],
  ['m', 'GET'],
  ['m', '到达 / 进入'],
  ['m', '贴到表面上'],
  ['m', '+'],
  ['w', 'Get on the bus.'],
  ['m', '上公交车。'],
  ['m', '脚 站上 车厢地板'],
  ['w', 'Get on your bike.'],
  ['m', '人 坐上 车座'],
  ['m', '骑上自行车。'],
  ['w', '共同点：ON = 站上（坐上）车的平面'],
  ['s', 'Let\'s get on the bus at the next stop.', '我们在下一站上公交车吧。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · get on ②', items: ITEMS, acts: ACTS }); }
