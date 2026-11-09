// 🎬 万能动词 · climb down ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「climb down」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvclimbdown2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'climb down：让步；认输；收回（立场）'],
  ['w', 'climb down ②'],
  ['w', '让步；认输；收回（立场）'],
  ['s', 'If Lafontaine is forced to climb down, he may wish to reconsider his position.', '如果拉方丹被迫让步，他也许会重新考虑自己的立场。', 'climb down'],
  ['m', 'CLIMB'],
  ['m', '向下'],
  ['w', 'climb：爬，攀登，攀爬（末尾b不发音）'],
  ['m', '+'],
  ['w', 'When Charles saw it he started to climb down from the table.'],
  ['m', 'climb down：爬下来'],
  ['w', 'If Lafontaine is forced to climb down, he may wish to reconsider his position.'],
  ['m', 'climb down：让步；认输；收回（立场）'],
  ['w', '共同点：DOWN = 向下'],
  ['s', 'When Charles saw it he started to climb down from the table.', '查尔斯看见它，就开始从桌子上爬下来。', 'climb down'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · climb down ②', items: ITEMS, acts: ACTS }); }
