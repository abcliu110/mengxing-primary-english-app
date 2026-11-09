// 🎬 万能动词 · go down ① —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「go down」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgodown1.js';
const ACTS = {};
const ITEMS = [
  ['n', 'go down：下降；降低'],
  ['w', 'go down ①'],
  ['w', '下降；降低'],
  ['s', 'Computers have gone down in price.', '电脑降价了。', 'go down'],
  ['m', 'DOWN'],
  ['m', '向下'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · go down ①', items: ITEMS, acts: ACTS }); }
