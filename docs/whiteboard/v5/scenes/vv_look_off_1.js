// 🎬 万能动词 · look away ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_look_off.js 案例 1；对照清单 lab/INVENTORY_VV_LOOK_OFF_1_V5.md
// 角色关键帧：sprites/vvlookoff1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvlookoff1.js';
const ACTS = {"*": ["l_spider0", "l_spider1", "l_spider2"]};
const ITEMS = [
  ['n', 'look away / off：把目光从目标表面移开'],
  ['w', 'A B C'],
  ['w', 'look away ①'],
  ['w', '把视线移开'],
  ['s', 'Don\'t look away from the blackboard.', '视线不要离开黑板。'],
  ['m', 'AWAY'],
  ['m', '目光离开黑板'],
  ['w', 'Don\'t look away!']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · look away ①', items: ITEMS, acts: ACTS }); }
