// 🎬 万能动词 · turn up ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_turn_up.js 案例 2；对照清单 lab/INVENTORY_VV_TURN_UP_2_V5.md
// 角色关键帧：sprites/vvturnup2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvturnup2.js';
const ACTS = {"*": ["party_wait", "party_door", "party_cheer"]};
const ITEMS = [
  ['n', 'turn up：调大（音量/热度）；出现，露面'],
  ['m', 'Party!'],
  ['m', 'turn up ②'],
  ['m', '出现，露面'],
  ['s', 'Tom turned up at the party at last!', '汤姆终于在派对上露面了！'],
  ['w', '冒出来'],
  ['w', 'Tom is here!'],
  ['m', 'TURN'],
  ['m', '向上 / 填满'],
  ['m', '转动'],
  ['m', '+'],
  ['w', 'Turn up the music.'],
  ['m', '把音乐调大。'],
  ['m', '音量 往上 拧'],
  ['w', 'Tom turned up.'],
  ['m', '人 冒出来'],
  ['m', '汤姆露面了。'],
  ['w', '共同点：UP = 往上冒、变大'],
  ['s', 'Turn up the music! Let\'s dance!', '把音乐声音调大一点！我们跳舞吧！']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · turn up ②', items: ITEMS, acts: ACTS }); }
