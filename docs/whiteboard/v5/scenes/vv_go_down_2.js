// 🎬 万能动词 · go down ② —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json「go down」格（词典引证逐字照录；中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgodown2.js';
const ACTS = {};
const ITEMS = [
  ['n', 'go down：受到（好/坏的）反应；受欢迎（程度）'],
  ['w', 'go down ②'],
  ['w', '受到（好/坏的）反应；受欢迎（程度）'],
  ['s', 'The movie went down very well in America.', '这部电影在美国很受欢迎。', 'go down well/badly'],
  ['m', 'GO'],
  ['m', '向下'],
  ['w', 'go：去(过去式went)'],
  ['m', '+'],
  ['w', 'Computers have gone down in price.'],
  ['m', 'go down：下降；降低'],
  ['w', 'The movie went down very well in America.'],
  ['m', 'go down well/badly：受到（好/坏的）反应；受欢迎（程度）'],
  ['w', 'Ten men died when the ship went down.'],
  ['m', 'go down：（船）沉没'],
  ['w', 'Your tyre\'s gone down.'],
  ['m', 'go down：（充气物）瘪掉；漏气变小'],
  ['w', 'If one of the file servers goes down, you lose the whole network.'],
  ['m', 'go down：（电脑系统）瘫痪；停止工作'],
  ['w', 'The lights went down and the curtain rose on an empty stage.'],
  ['m', 'go down：（灯光）变暗'],
  ['w', '共同点：DOWN = 向下'],
  ['s', 'Computers have gone down in price.', '电脑降价了。', 'go down'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · go down ②', items: ITEMS, acts: ACTS }); }
