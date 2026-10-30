// 🎬 万能动词 · get out ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_get_out.js 案例 2；对照清单 lab/INVENTORY_VV_GET_OUT_2_V5.md
// 角色关键帧：sprites/vvgetout2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgetout2.js';
const ACTS = {"*": ["box0", "box1", "box2"]};
const ITEMS = [
  ['n', 'get out：出来；从小汽车里下来 (get out of)'],
  ['m', 'get out ②'],
  ['m', '出来'],
  ['m', '蛋壳 = 盒子'],
  ['s', 'The chick gets out of the egg.', '小鸡从蛋壳里钻了出来。'],
  ['m', '从蛋壳里出来'],
  ['m', 'Wow!'],
  ['m', 'GET'],
  ['m', '从里面出来'],
  ['m', '到达 / 进入'],
  ['m', '+'],
  ['w', 'He got out of the taxi.'],
  ['m', '人 离开 车厢'],
  ['m', '他下了出租车。'],
  ['w', 'The chick gets out.'],
  ['m', '小鸡 离开 蛋壳'],
  ['m', '小鸡钻出来了。'],
  ['w', '共同点：OUT = 从盒子里出来'],
  ['s', 'He got out of the taxi at the gate.', '他在大门口下了出租车。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · get out ②', items: ITEMS, acts: ACTS }); }
