// 🎬 万能动词 · get up ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_get_up.js 案例 1；对照清单 lab/INVENTORY_VV_GET_UP_1_V5.md
// 角色关键帧：sprites/vvgetup1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgetup1.js';
const ACTS = {"*": ["l_bed0", "l_bed1", "l_bed2"]};
const ITEMS = [
  ['n', 'get up：身体从平躺向高处直立升起'],
  ['m', '6:30'],
  ['m', 'get up ①'],
  ['m', 'z'],
  ['m', '起床'],
  ['s', 'I usually get up at 6:30 every morning.', '我每天早上通常六点半起床。'],
  ['m', 'UP'],
  ['m', '身体从床上升起来'],
  ['w', 'Good morning!']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · get up ①', items: ITEMS, acts: ACTS }); }
