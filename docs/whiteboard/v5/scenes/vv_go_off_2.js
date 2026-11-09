// 🎬 万能动词 · go off ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「go off」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgooff2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'go off：爆炸；开火'],
  ['w', 'go off ②'],
  ['w', '爆炸；开火'],
  ['s', 'Fireworks were going off all over the city.', '全城到处都在放烟花。', 'go off'],
  ['m', 'GO'],
  ['m', '离开表面'],
  ['w', 'go：去(过去式went)'],
  ['m', '+'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · go off ②', items: ITEMS, acts: ACTS }); }
