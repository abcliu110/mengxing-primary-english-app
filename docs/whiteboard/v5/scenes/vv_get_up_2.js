// 🎬 万能动词 · get up ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_get_up.js 案例 2；对照清单 lab/INVENTORY_VV_GET_UP_2_V5.md
// 角色关键帧：sprites/vvgetup2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgetup2.js';
const ACTS = {"*": ["l_floor0", "l_floor1", "l_floor2"]};
const ITEMS = [
  ['n', 'get up：起床；起立，站起来'],
  ['m', 'get up ②'],
  ['m', '站起来'],
  ['m', 'Ouch!'],
  ['s', 'He falls down, but he gets up again.', '他摔倒了，但又自己站了起来。'],
  ['w', '从地上站起来'],
  ['w', 'I\'m OK!'],
  ['m', 'GET'],
  ['m', '到达 / 进入'],
  ['m', '向上 / 填满'],
  ['m', '+'],
  ['w', 'I get up at 6:30.'],
  ['m', '我六点半起床。'],
  ['m', '身体 从床上 升起'],
  ['w', 'He gets up again.'],
  ['m', '从 地上 站起来'],
  ['m', '他又站了起来。'],
  ['w', '共同点：UP = 身体从低处升起来'],
  ['s', 'I usually get up at 6:30 every morning.', '我每天早上通常六点半起床。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · get up ②', items: ITEMS, acts: ACTS }); }
