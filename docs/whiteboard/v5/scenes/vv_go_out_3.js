// 🎬 万能动词 · go out ③ —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「go out」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgoout3.js';
const ACTS = {};
const ITEMS = [
  ['n', 'go out：全格回顾'],
  ['w', 'go out ③'],
  ['w', 'Are you going out tonight?'],
  ['m', 'go out：出门（玩乐、吃饭等）'],
  ['w', 'Suddenly the candle went out.'],
  ['m', 'go out：（火、光）熄灭'],
  ['s', 'Suddenly the candle went out.', '突然，蜡烛灭了。', 'went out'],
  ['w', 'They\'ve been going out for two years now.'],
  ['m', 'go out (with somebody)：谈恋爱；交往'],
  ['s', "They've been going out for two years now.", '他们已经交往两年了。', 'going out'],
  ['w', 'Hats like that went out years ago.'],
  ['m', 'go out：不再流行；过时'],
  ['s', 'Hats like that went out years ago.', '那样的帽子多年前就过时了。', 'went out'],
  ['w', 'The magazine goes out to all members at the end of the month.'],
  ['m', 'go out：被寄出；被发出'],
  ['s', 'The magazine goes out to all members at the end of the month.', '这本杂志在月底寄给所有会员。', 'goes out'],
  ['w', '共同点：OUT = 从里面出来；往外'],
  ['s', 'Are you going out tonight?', '你今晚要出去玩吗？', 'go out'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · go out ③', items: ITEMS, acts: ACTS }); }
