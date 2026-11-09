// 🎬 万能动词 · stand 核心义 —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json 动词核心义页（词库原义 G3_K12；六格总览：有引证 4/6）——单独 12 幕之一（2026-11-09 第二波定夺转正）；朗读句：OALD stand_1 义项 1（on feet/be vertical）（2026-11-09 第三波补，中文译文为本幕所加）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvstandcore1.js';
const ACTS = {};
const ITEMS = [
  ['n', 'stand：站，站立'],
  ['w', 'stand /stænd/'],
  ['w', '站，站立'],
  ['s', 'She was too weak to stand.', '她虚弱得站不起来。', 'stand'],
  ['w', '能说的搭配：'],
  ['m', 'stand up'],
  ['m', 'stand out'],
  ['m', 'stand down'],
  ['m', 'stand over'],
  ['w', '查过，没有的搭配：'],
  ['m', 'stand off'],
  ['m', 'stand on'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · stand 核心义', items: ITEMS, acts: ACTS }); }
