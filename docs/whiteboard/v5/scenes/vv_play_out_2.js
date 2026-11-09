// 🎬 万能动词 · play out ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「play out」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvplayout2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'play out：（事态）发展直至结束；自行了结'],
  ['w', 'play out ②'],
  ['w', '（事态）发展直至结束；自行了结'],
  ['s', 'We were forced to stand back and let the crisis play itself out.', '我们只好袖手旁观，让危机自行发展到结束。', 'play itself out'],
  ['m', 'PLAY'],
  ['m', '从里面出来；往外'],
  ['w', 'play：玩耍；打（球）；弹奏（乐器）；戏剧'],
  ['m', '+'],
  ['w', 'The debate will play out in the media over the next week or two.'],
  ['m', 'play out：（事态）发展；演变'],
  ['w', 'We were forced to stand back and let the crisis play itself out.'],
  ['m', 'play itself out：（事态）发展直至结束；自行了结'],
  ['w', '共同点：OUT = 从里面出来；往外'],
  ['s', 'The debate will play out in the media over the next week or two.', '这场辩论会在接下来一两周里通过媒体展开。', 'play out'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · play out ②', items: ITEMS, acts: ACTS }); }
