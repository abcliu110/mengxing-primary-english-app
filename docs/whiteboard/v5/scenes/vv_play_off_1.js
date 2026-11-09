// 🎬 万能动词 · play off ① —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「play off」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvplayoff1.js';
const ACTS = {};
const ITEMS = [
  ['n', 'play off：挑拨（两人）相争（以坐收渔利）'],
  ['w', 'play off ①'],
  ['w', '挑拨（两人）相争（以坐收渔利）'],
  ['s', 'The children could usually get what they wanted by playing one parent off against the other', '孩子们常常挑拨父母一方去对付另一方，借此得到想要的东西。', 'play somebody off against somebody'],
  ['m', 'OFF'],
  ['m', '离开表面'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · play off ①', items: ITEMS, acts: ACTS }); }
