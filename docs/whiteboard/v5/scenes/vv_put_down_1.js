// 🎬 万能动词 · put down ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_put_down.js 案例 1；对照清单 lab/INVENTORY_VV_PUT_DOWN_1_V5.md
// 角色关键帧：sprites/vvputdown1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvputdown1.js';
const ACTS = {"*": ["l_heavy0", "l_heavy1", "l_heavy2"]};
const ITEMS = [
  ['n', 'put down：把手里举着的东西往下放到桌面'],
  ['w', 'Look at me!'],
  ['w', 'put down ①'],
  ['w', '放下（东西）'],
  ['w', '桌面'],
  ['s', 'Put down your pencil and look at me.', '放下铅笔看着我。'],
  ['m', 'DOWN'],
  ['m', '放到桌面上'],
  ['w', 'Good!']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · put down ①', items: ITEMS, acts: ACTS }); }
