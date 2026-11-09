// 🎬 万能动词 · fall over ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「fall over」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvfallover2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'fall over：（物）倒下；翻倒'],
  ['w', 'fall over ②'],
  ['w', '（物）倒下；翻倒'],
  ['s', 'If you make the cake too high, it\'ll fall over.', '蛋糕做得太高会倒下来。', 'fall over'],
  ['m', 'FALL'],
  ['m', '在……正上方 / 越过 / 结束'],
  ['w', 'fall：秋天(美)/落下'],
  ['m', '+'],
  ['w', 'She tripped and fell over.'],
  ['m', 'fall over：跌倒；摔倒'],
  ['w', 'If you make the cake too high, it\'ll fall over.'],
  ['m', 'fall over：（物）倒下；翻倒'],
  ['w', '共同点：OVER = 在……正上方 / 越过 / 结束'],
  ['s', 'She tripped and fell over.', '她绊了一下，摔倒了。', 'fall over'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · fall over ②', items: ITEMS, acts: ACTS }); }
