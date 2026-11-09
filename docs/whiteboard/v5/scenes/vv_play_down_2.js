// 🎬 万能动词 · play down ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「play down」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvplaydown2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'play down：淡化；轻描淡写（合成）'],
  ['w', 'play down ②'],
  ['m', 'PLAY'],
  ['m', '向下'],
  ['w', 'play：玩耍；打（球）；弹奏（乐器）；戏剧'],
  ['m', '+'],
  ['w', 'Western diplomats have played down the significance of the reports.'],
  ['m', 'play something down：淡化；轻描淡写'],
  ['w', '共同点：DOWN = 向下'],
  ['s', 'Western diplomats have played down the significance of the reports.', '西方外交官淡化了这些报道的重要性。', 'play something down'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · play down ②', items: ITEMS, acts: ACTS }); }
