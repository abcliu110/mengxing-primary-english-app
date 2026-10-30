// 🎬 万能动词 · look in ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_look_in.js 案例 1；对照清单 lab/INVENTORY_VV_LOOK_IN_1_V5.md
// 角色关键帧：sprites/vvlookin1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvlookin1.js';
const ACTS = {"*": ["l_boxwalk", "box_lid", "l_peek"]};
const ITEMS = [
  ['n', 'look in / into：把目光投射进盒子或房间内部'],
  ['m', '?'],
  ['m', 'look in ①'],
  ['m', '往里面看'],
  ['m', 'IN'],
  ['m', '目光投进盒子里'],
  ['s', 'Look in the box! What\'s inside?', '往盒子里看！里面有什么？'],
  ['w', 'What\'s inside?'],
  ['w', 'A puppy!']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · look in ①', items: ITEMS, acts: ACTS }); }
