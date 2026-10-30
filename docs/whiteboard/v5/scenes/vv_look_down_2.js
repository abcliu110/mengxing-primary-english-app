// 🎬 万能动词 · look down ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_look_down.js 案例 2；对照清单 lab/INVENTORY_VV_LOOK_DOWN_2_V5.md
// 角色关键帧：sprites/vvlookdown2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvlookdown2.js';
const ACTS = {"*": ["l_ldown0", "l_ldown1", "l_ldown2"]};
const ITEMS = [
  ['n', 'look down：低头往下看'],
  ['w', 'look down ②'],
  ['w', '低头看脚下'],
  ['w', '鞋带松了!'],
  ['s', 'Look down! Your shoelace is loose.', '低头看！你的鞋带松了。'],
  ['m', 'LOOK'],
  ['m', '向下落定'],
  ['m', '看'],
  ['m', '+'],
  ['w', 'Look down from the top.'],
  ['m', '从山顶往下看。'],
  ['m', '目光 往下'],
  ['w', 'Look down at your shoes.'],
  ['m', '低头看鞋子。'],
  ['m', '目光 落到 脚下'],
  ['w', '共同点：DOWN = 目光往下落'],
  ['s', 'Look down from the top of the mountain!', '从山顶往下看！']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · look down ②', items: ITEMS, acts: ACTS }); }
