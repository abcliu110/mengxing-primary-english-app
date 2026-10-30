// 🎬 万能动词 · turn down ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_turn_down.js 案例 2；对照清单 lab/INVENTORY_VV_TURN_DOWN_2_V5.md
// 角色关键帧：sprites/vvturndown2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvturndown2.js';
const ACTS = {"*": ["m_offer", "l_nothanks", "offer_ok"]};
const ITEMS = [
  ['n', 'turn down：调小（音量）；婉言拒绝'],
  ['w', 'turn down ②'],
  ['w', '婉言拒绝'],
  ['w', 'No, thanks. I\'m full.'],
  ['s', 'He turned down the cake politely.', '他礼貌地拒绝了蛋糕。'],
  ['w', '把提议压回去'],
  ['m', 'TURN'],
  ['m', '向下落定'],
  ['m', '转动'],
  ['m', '+'],
  ['w', 'Turn down the TV.'],
  ['m', '把电视调小。'],
  ['m', '音量 往下 拧'],
  ['w', 'He turned it down.'],
  ['m', '他拒绝了。'],
  ['m', '提议 压回去'],
  ['w', '共同点：DOWN = 往下压、变小'],
  ['s', 'Please turn down the TV. Baby is sleeping.', '请把电视声音调小点，宝宝在睡觉。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · turn down ②', items: ITEMS, acts: ACTS }); }
