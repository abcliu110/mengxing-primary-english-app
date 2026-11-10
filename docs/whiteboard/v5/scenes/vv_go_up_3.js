// 🎬 万能动词 · go up ③ —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「go up」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgoup3.js';
const ACTS = {};
const ITEMS = [
  ['n', 'go up：全格回顾'],
  ['w', 'go up ③'],
  ['w', 'Train fares have gone up.'],
  ['m', 'go up：上升；上涨'],
  ['w', 'It was a lovely place before all these new houses went up.'],
  ['m', 'go up：（建筑、标志）被建起；竖立'],
  ['s', 'It was a lovely place before all these new houses went up.', '在这些新房子盖起来之前，那是个可爱的地方。', 'went up'],
  ['w', 'The whole building went up in flames.'],
  ['m', 'go up：爆炸；起火烧毁'],
  ['s', 'The whole building went up in flames.', '整栋楼都烧了起来。', 'went up'],
  ['w', 'A great cheer went up from the audience.'],
  ['m', 'go up：（喊声、欢呼声）响起'],
  ['s', 'A great cheer went up from the audience.', '观众席上爆发出一阵热烈的欢呼。', 'went up'],
  ['w', 'We\'re going up to Scotland next weekend.'],
  ['m', 'go up：去（北方、城镇）（英式）'],
  ['s', "We're going up to Scotland next weekend.", '我们下周末要去苏格兰。', 'going up'],
  ['w', '共同点：UP = 向上'],
  ['s', 'Train fares have gone up.', '火车票涨价了。', 'go up'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · go up ③', items: ITEMS, acts: ACTS }); }
