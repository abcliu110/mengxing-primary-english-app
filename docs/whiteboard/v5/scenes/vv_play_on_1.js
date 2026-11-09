// 🎬 万能动词 · play on ① —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「play on」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvplayon1.js';
const ACTS = {};
const ITEMS = [
  ['n', 'play on：利用（别人的恐惧、弱点、感情）'],
  ['w', 'play on ①'],
  ['w', '利用（别人的恐惧、弱点、感情）'],
  ['s', 'I felt guilty saying that, playing on her generosity.', '我那样说是在利用她的慷慨，心里很过意不去。', 'play on something'],
  ['m', 'ON'],
  ['m', '在……上面（有接触）'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · play on ①', items: ITEMS, acts: ACTS }); }
