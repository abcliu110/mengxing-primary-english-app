// 🎬 万能动词 · turn on ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_turn_on.js 案例 1；对照清单 lab/INVENTORY_VV_TURN_ON_1_V5.md
// 角色关键帧：sprites/vvturnon1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvturnon1.js';
const ACTS = {"*": ["l_light0", "l_light1", "l_light2"]};
const ITEMS = [
  ['n', 'turn on：旋转或拨动开关，让电路触点『贴合接通』'],
  ['m', 'turn on ①'],
  ['m', '打开（电灯）'],
  ['w', 'It\'s dark!'],
  ['w', '触点分开'],
  ['s', 'Please turn on the light. It\'s dark.', '请把电灯打开，天黑了。'],
  ['m', '触点贴合'],
  ['m', 'ON'],
  ['m', '电路接通']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · turn on ①', items: ITEMS, acts: ACTS }); }
