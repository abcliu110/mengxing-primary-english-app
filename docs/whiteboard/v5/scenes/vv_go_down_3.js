// 🎬 万能动词 · go down ③ —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「go down」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgodown3.js';
const ACTS = {};
const ITEMS = [
  ['n', 'go down：义项回顾（续）'],
  ['w', 'go down ③'],
  ['w', 'Ten men died when the ship went down.'],
  ['m', 'go down：（船）沉没'],
  ['s', 'Ten men died when the ship went down.', '十个人在船沉没时死了。', 'went down'],
  ['w', 'Your tyre\'s gone down.'],
  ['m', 'go down：（充气物）瘪掉；漏气变小'],
  ['s', "Your tyre's gone down.", '你的轮胎瘪了。', "tyre's gone down"],
  ['w', 'If one of the file servers goes down, you lose the whole network.'],
  ['m', 'go down：（电脑系统）瘫痪；停止工作'],
  ['s', 'If one of the file servers goes down, you lose the whole network.', '如果一台文件服务器瘫痪，你会失去整个网络。', 'goes down'],
  ['w', 'The lights went down and the curtain rose on an empty stage.'],
  ['m', 'go down：（灯光）变暗'],
  ['s', 'The lights went down and the curtain rose on an empty stage.', '灯光暗了下来，幕布在一个空荡荡的舞台上升起。', 'went down'],
  ['w', '共同点：DOWN = 向下'],
  ['s', 'Computers have gone down in price.', '电脑降价了。', 'go down'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · go down ③', items: ITEMS, acts: ACTS }); }
