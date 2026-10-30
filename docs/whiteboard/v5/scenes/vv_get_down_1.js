// 🎬 万能动词 · get down ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_get_down.js 案例 1；对照清单 lab/INVENTORY_VV_GET_DOWN_1_V5.md
// 角色关键帧：sprites/vvgetdown1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgetdown1.js';
const ACTS = {"*": ["tree0", "tree1", "tree2"]};
const ITEMS = [
  ['n', 'get down：身体从高处往低处俯身或下来'],
  ['w', 'get down ①'],
  ['m', '从高处下来'],
  ['m', '树上高处'],
  ['w', 'Come down!'],
  ['m', 'DOWN'],
  ['m', '从树上下来'],
  ['s', 'The cat got down from the tall tree.', '小猫从高树上爬了下来。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · get down ①', items: ITEMS, acts: ACTS }); }
