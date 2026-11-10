// 🎬 万能动词 · go off ③ —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「go off」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgooff3.js';
const ACTS = {};
const ITEMS = [
  ['n', 'go off：全格回顾'],
  ['w', 'go off ③'],
  ['w', 'He went off to work as usual.'],
  ['m', 'go off：离开（去做某事）'],
  ['w', 'Fireworks were going off all over the city.'],
  ['m', 'go off：爆炸；开火'],
  ['s', 'Fireworks were going off all over the city.', '烟花在全城各处炸响。', 'going off'],
  ['w', 'The thieves ran away when the alarm went off.'],
  ['m', 'go off：（警报、闹钟）响起'],
  ['s', 'The thieves ran away when the alarm went off.', '警报响起时，小偷们跑了。', 'went off'],
  ['w', 'Suddenly, all the lights went off.'],
  ['m', 'go off：（机器、灯）停止运转；熄灭'],
  ['s', 'Suddenly, all the lights went off.', '突然，所有的灯都灭了。', 'went off'],
  ['w', 'The milk\'s gone off.'],
  ['m', 'go off：（食物）变质（英式）'],
  ['s', "The milk's gone off.", '牛奶变质了。', "milk's gone off"],
  ['w', 'I\'d just gone off to sleep when the phone rang.'],
  ['m', 'go off：入睡'],
  ['s', "I'd just gone off to sleep when the phone rang.", '我刚睡着，电话就响了。', 'gone off'],
  ['w', '共同点：OFF = 离开表面'],
  ['s', 'He went off to work as usual.', '他像往常一样出门上班去了。', 'go off'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · go off ③', items: ITEMS, acts: ACTS }); }
