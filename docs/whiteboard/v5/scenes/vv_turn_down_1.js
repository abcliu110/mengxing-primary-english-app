// 🎬 万能动词 · turn down ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_turn_down.js 案例 1；对照清单 lab/INVENTORY_VV_TURN_DOWN_1_V5.md
// 角色关键帧：sprites/vvturndown1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvturndown1.js';
const ACTS = {"*": ["mom_loud", "l_knob", "l_shh"]};
const ITEMS = [
  ['n', 'turn down：把音量旋钮往低处拧 / 把提议往下压回'],
  ['w', 'turn down ①'],
  ['w', '调小（音量）'],
  ['w', 'Waa!'],
  ['s', 'Please turn down the TV. Baby is sleeping.', '请把电视声音调小点，宝宝在睡觉。'],
  ['m', 'DOWN'],
  ['m', '音量往下拧'],
  ['w', 'z']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · turn down ①', items: ITEMS, acts: ACTS }); }
