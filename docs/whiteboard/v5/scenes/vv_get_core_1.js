// 🎬 万能动词 · get 核心义 —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json 动词核心义页（词库原义 V6_日常_0；六格总览：有引证 6/6）——单独 12 幕之一（2026-11-09 第二波定夺转正）；朗读句：OALD get 义项 1（receive/obtain）（2026-11-09 第三波补，中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgetcore1.js';
const ACTS = {};
const ITEMS = [
  ['n', 'get：得到/变得(get up起床)'],
  ['w', 'get /ɡet/'],
  ['w', '得到/变得(get up起床)'],
  ['s', 'What did you get for your birthday?', '你生日收到了什么礼物？', 'get'],
  ['w', '能说的搭配：'],
  ['m', 'get up'],
  ['m', 'get out'],
  ['m', 'get off'],
  ['m', 'get down'],
  ['m', 'get over'],
  ['m', 'get on'],
  ['s', 'Get up!', '起床！'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · get 核心义', items: ITEMS, acts: ACTS }); }
