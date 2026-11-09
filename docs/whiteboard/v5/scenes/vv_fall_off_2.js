// 🎬 万能动词 · fall off ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「fall off」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvfalloff2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'fall off：（数量、比率、质量）下降，减少'],
  ['w', 'fall off ②'],
  ['w', '（数量、比率、质量）下降，减少'],
  ['s', 'Audience figures fell off during the second series of the programme.', '第二季播出时，观众人数下降了。', 'fall off'],
  ['m', 'FALL'],
  ['m', '离开表面'],
  ['w', 'fall：秋天(美)/落下'],
  ['m', '+'],
  ['w', 'A button had fallen off her jacket.'],
  ['m', 'fall off (something)：（部件）脱落；掉下'],
  ['w', 'Audience figures fell off during the second series of the programme.'],
  ['m', 'fall off：（数量、比率、质量）下降，减少'],
  ['w', '共同点：OFF = 离开表面'],
  ['s', 'A button had fallen off her jacket.', '她夹克上掉了一颗扣子。', 'fall off (something)'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · fall off ②', items: ITEMS, acts: ACTS }); }
