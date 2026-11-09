// 🎬 万能动词 · take over ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「take over」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvtakeover2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'take over：接手；接管（工作、职责）'],
  ['w', 'take over ②'],
  ['w', '接手；接管（工作、职责）'],
  ['s', 'His widow has taken over the running of his empire, including six London theatres.', '他的遗孀接手了他的产业，包括伦敦的六家剧院。', 'take over'],
  ['m', 'TAKE'],
  ['m', '在……正上方 / 越过 / 结束'],
  ['w', 'take：带走/乘坐(过去took)'],
  ['m', '+'],
  ['w', 'The parliament was taken over by civil guards.'],
  ['m', 'take over something：（以武力等）夺取；接管（控制）'],
  ['w', 'His widow has taken over the running of his empire, including six London theatres.'],
  ['m', 'take over：接手；接管（工作、职责）'],
  ['w', '共同点：OVER = 在……正上方 / 越过 / 结束'],
  ['s', 'The parliament was taken over by civil guards.', '议会被民防卫队占领了。', 'take over something'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · take over ②', items: ITEMS, acts: ACTS }); }
