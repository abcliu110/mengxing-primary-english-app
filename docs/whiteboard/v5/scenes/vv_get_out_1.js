// 🎬 万能动词 · get out ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_get_out.js 案例 1；对照清单 lab/INVENTORY_VV_GET_OUT_1_V5.md
// 角色关键帧：sprites/vvgetout1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgetout1.js';
const ACTS = {"*": ["car_out0", "car_out1", "car_out2"]};
const ITEMS = [
  ['n', 'get out：从封闭盒子或房间里向外走出来'],
  ['m', 'GATE'],
  ['m', 'TAXI'],
  ['m', 'get out ①'],
  ['m', '下（小汽车）'],
  ['w', '车厢 = 盒子'],
  ['s', 'He got out of the taxi at the gate.', '他在大门口下了出租车。'],
  ['m', 'OUT'],
  ['m', '从车厢里出来'],
  ['w', 'Thank you!']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · get out ①', items: ITEMS, acts: ACTS }); }
