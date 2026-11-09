// 🎬 万能动词 · play up ③ —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「play up」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvplayup3.js';
const ACTS = {};
const ITEMS = [
  ['n', 'play up：全格回顾'],
  ['w', 'play up ③'],
  ['w', 'Her back is playing up again.'],
  ['m', 'play up / play somebody up：（机器、身体部位）出毛病；不对劲（英式，非正式）'],
  ['w', 'Patrick often plays up when he knows I\'m in a hurry.'],
  ['m', 'play up：（孩子）调皮捣乱；折腾人（英式，非正式）'],
  ['w', 'The schools are playing up their science programs'],
  ['m', 'play something up：强调；渲染（重要性）'],
  ['w', '共同点：UP = 向上'],
  ['s', 'Her back is playing up again.', '她的背又出毛病了。', 'play up / play somebody up'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · play up ③', items: ITEMS, acts: ACTS }); }
