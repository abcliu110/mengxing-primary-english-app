// 🎬 万能动词 · look down ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_look_down.js 案例 1；对照清单 lab/INVENTORY_VV_LOOK_DOWN_1_V5.md
// 角色关键帧：sprites/vvlookdown1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvlookdown1.js';
const ACTS = {"*": ["l_ldown0", "l_ldown1", "l_ldown2"]};
const ITEMS = [
  ['n', 'look down：低头往地面看'],
  ['w', 'look down ①'],
  ['w', '低头往下看'],
  ['m', 'DOWN'],
  ['m', '往下看'],
  ['s', 'Look down from the top of the mountain!', '从山顶往下看！'],
  ['w', 'So high!']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · look down ①', items: ITEMS, acts: ACTS }); }
