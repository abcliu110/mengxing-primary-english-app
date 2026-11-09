// 🎬 万能动词 · play on ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「play on」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvplayon2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'play on：利用（别人的恐惧、弱点、感情）（合成）'],
  ['w', 'play on ②'],
  ['m', 'PLAY'],
  ['m', '在……上面（有接触）'],
  ['w', 'play：玩耍；打（球）；弹奏（乐器）；戏剧'],
  ['m', '+'],
  ['w', 'I felt guilty saying that, playing on her generosity.'],
  ['m', 'play on something：利用（别人的恐惧、弱点、感情）'],
  ['w', '共同点：ON = 在……上面（有接触）'],
  ['s', 'I felt guilty saying that, playing on her generosity.', '我那样说是在利用她的慷慨，心里很过意不去。', 'play on something'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · play on ②', items: ITEMS, acts: ACTS }); }
