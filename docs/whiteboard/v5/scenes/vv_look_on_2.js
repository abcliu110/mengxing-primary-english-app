// 🎬 万能动词 · look on ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_look_on.js 案例 2；对照清单 lab/INVENTORY_VV_LOOK_ON_2_V5.md
// 角色关键帧：sprites/vvlookon2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvlookon2.js';
const ACTS = {"*": ["m_drop", "l_hero1", "m_admire"]};
const ITEMS = [
  ['n', 'look on：旁观，观看；把…看作 (look on...as)'],
  ['w', 'Miss White'],
  ['w', 'look on … as ②'],
  ['w', '把…看作'],
  ['w', '看作…'],
  ['s', 'We look on Miss White as our good friend.', '我们把怀特老师看作我们的好朋友。'],
  ['w', '= good friend'],
  ['m', 'LOOK'],
  ['m', '看'],
  ['m', '贴到表面上'],
  ['m', '+'],
  ['w', 'We look on.'],
  ['m', '我们在旁边看。'],
  ['m', '目光 落在 场上'],
  ['w', 'Look on her as a friend.'],
  ['m', '把她看作朋友。'],
  ['m', '眼光 落在 她身上'],
  ['w', '共同点：ON = 目光落在表面上'],
  ['s', 'We look on Miss White as our good friend.', '我们把怀特老师看作我们的好朋友。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · look on ②', items: ITEMS, acts: ACTS }); }
