// 🎬 万能动词 · turn over ③ —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「turn over」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvturnover3.js';
const ACTS = {};
const ITEMS = [
  ['n', 'turn over：全格回顾'],
  ['w', 'turn over ③'],
  ['w', 'He\'ll turn the shop over to his son when he retires.'],
  ['m', 'turn something over to somebody：移交；让（某人）接管'],
  ['w', 'Turn over and look at the next page.'],
  ['m', 'turn over：翻（页）（英式）'],
  ['w', 'You may turn over your exam papers now.'],
  ['m', 'turn something over：把……翻到另一面'],
  ['w', '共同点：OVER = 在……正上方 / 越过 / 结束'],
  ['s', 'He\'ll turn the shop over to his son when he retires.', '他退休后会把店交给儿子接管。', 'turn something over to somebody'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · turn over ③', items: ITEMS, acts: ACTS }); }
