// 词的意思像滚雪球：hold —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_poly_laws.json（laws_master V-16/V-41/V-42 headline_kid / mechanism / examples 全文照录，未另编例句）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdplv421.js';
const ACTS = {};
const ITEMS = [
  ['n', '一个词的意思怎么越滚越多？'],
  ['w', 'hold'],
  ['s', 'Hold my hand.', '握住我的手。', 'hold'],
  ['w', '控制住'],
  ['s', 'The rebels held the radio station.', '反抗军控制了广播电台。', 'hold'],
  ['w', '装得下'],
  ['s', 'The hall holds 500 people.', '这个大厅能容纳 500 人。', 'hold'],
  ['w', 'hold a meeting'],
  ['s', 'Each month she holds a meeting with her entire staff.', '她每个月和全体员工开一次会。', 'hold'],
  ['n', '去 P-10 看介词版。'],
  ['n', '新意思不是天上掉下来的，是从老意思滚出来的。手里抓住（hold）→ 心里控制住 → 肚子里装得下 → 把大家的时间抓在一起开会。顺着滚的路走，新意思猜得到。'],
  ['w', '顺路能猜出大半'],
  ['w', '滚不到、推不出的部分仍要逐个记'],
  ['w', '💡 一句话洞见'],
  ['w', '词的意思像滚雪球：hold 先是『手抓住东西』，然后滚成『控制住』『装得下』『举行』。知道雪球怎么滚的人，碰到没学过的新意思也能猜出大半'],
];
export default function build() { return autoBuild(SP, { title: '词的意思像滚雪球：hold', items: ITEMS, acts: ACTS }); }
