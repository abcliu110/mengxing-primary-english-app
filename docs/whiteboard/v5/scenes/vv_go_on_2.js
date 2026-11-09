// 🎬 万能动词 · go on ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「go on」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgoon2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'go on：发生'],
  ['w', 'go on ②'],
  ['w', '发生'],
  ['s', 'I don\'t know what\'s going on.', '我不知道发生了什么。', 'go on'],
  ['m', 'GO'],
  ['m', '在……上面（有接触）'],
  ['w', 'go：去(过去式went)'],
  ['m', '+'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · go on ②', items: ITEMS, acts: ACTS }); }
