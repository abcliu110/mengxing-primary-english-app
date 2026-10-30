// 🎬 万能动词 · get in ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_get_in.js 案例 2；对照清单 lab/INVENTORY_VV_GET_IN_2_V5.md
// 角色关键帧：sprites/vvgetin2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgetin2.js';
const ACTS = {"*": ["train", "l_wave"]};
const ITEMS = [
  ['n', 'get in：上车（小轿车/出租车）；进入，到达'],
  ['m', '9:00'],
  ['m', 'STATION'],
  ['m', 'get in ②'],
  ['m', '（火车）到站'],
  ['m', '车站 = 盒子'],
  ['w', '火车开进车站'],
  ['s', 'The train gets in at 9 o\'clock.', '火车九点进站。'],
  ['m', 'GET'],
  ['m', '到达 / 进入'],
  ['m', '进入里面'],
  ['m', '+'],
  ['w', 'Get in the car!'],
  ['m', '人 进入 小车车厢'],
  ['m', '快上车！'],
  ['w', 'The train gets in.'],
  ['m', '火车 进入 车站'],
  ['m', '火车进站了。'],
  ['w', '共同点：IN = 钻进盒子（小车用 in，大车用 on）'],
  ['s', 'Get in the car quickly! It\'s raining.', '快钻进小汽车里！下雨了。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · get in ②', items: ITEMS, acts: ACTS }); }
