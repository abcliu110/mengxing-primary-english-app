// 🎬 万能动词 · put up ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_put_up.js 案例 1；对照清单 lab/INVENTORY_VV_PUT_UP_1_V5.md
// 角色关键帧：sprites/vvputup1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvputup1.js';
const ACTS = {"*": ["l_hand0", "l_hand1", "l_hand2"]};
const ITEMS = [
  ['n', 'put up：把物体往高处举起或贴上墙面'],
  ['m', '2 + 3 = ?'],
  ['m', 'put up ①'],
  ['m', '举起（手）'],
  ['w', 'Who knows?'],
  ['s', 'Put up your hand!', '请举手！'],
  ['m', 'UP'],
  ['m', '手往上举'],
  ['w', 'Me! 5!']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · put up ①', items: ITEMS, acts: ACTS }); }
