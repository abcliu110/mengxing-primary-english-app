// 🎬 万能动词 · turn on ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_turn_on.js 案例 2；对照清单 lab/INVENTORY_VV_TURN_ON_2_V5.md
// 角色关键帧：sprites/vvturnon2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvturnon2.js';
const ACTS = {"*": ["l_tap0", "l_tap1", "l_tap2"]};
const ITEMS = [
  ['n', 'turn on：打开（电灯、电视、电脑、水龙头）'],
  ['m', 'turn on ②'],
  ['m', '打开（水龙头）'],
  ['s', 'Turn on the tap and wash your hands.', '打开水龙头洗洗手。'],
  ['w', '水流接通'],
  ['m', 'TURN'],
  ['m', '贴到表面上'],
  ['m', '转动'],
  ['m', '+'],
  ['w', 'Turn on the light.'],
  ['m', '开灯。'],
  ['m', '触点 贴合 接通'],
  ['w', 'Turn on the tap.'],
  ['m', '打开水龙头。'],
  ['m', '水流 接通'],
  ['w', '共同点：ON = 拧到接通的状态'],
  ['s', 'Please turn on the light. It\'s dark.', '请把电灯打开，天黑了。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · turn on ②', items: ITEMS, acts: ACTS }); }
