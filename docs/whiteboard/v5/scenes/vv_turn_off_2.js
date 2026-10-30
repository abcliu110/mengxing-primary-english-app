// 🎬 万能动词 · turn off ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_turn_off.js 案例 2；对照清单 lab/INVENTORY_VV_TURN_OFF_2_V5.md
// 角色关键帧：sprites/vvturnoff2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvturnoff2.js';
const ACTS = {"*": ["l_tapoff0", "l_tapoff1", "l_tapoff2"]};
const ITEMS = [
  ['n', 'turn off：关掉（电灯、电视、电脑、水龙头）'],
  ['w', 'turn off ②'],
  ['w', '关掉（水龙头）'],
  ['s', 'Turn off the tap. Save water!', '关掉水龙头，节约用水！'],
  ['w', '水流断开'],
  ['w', 'Save water!'],
  ['m', 'TURN'],
  ['m', '离开表面'],
  ['m', '转动'],
  ['m', '+'],
  ['w', 'Turn off the TV.'],
  ['m', '关电视。'],
  ['m', '触点 脱离 断开'],
  ['w', 'Turn off the tap.'],
  ['m', '关水龙头。'],
  ['m', '水流 断开'],
  ['w', '共同点：OFF = 拧到断开的状态'],
  ['s', 'Remember to turn off the TV before bed.', '睡前记得把电视关掉。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · turn off ②', items: ITEMS, acts: ACTS }); }
