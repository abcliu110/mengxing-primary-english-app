// 🎬 万能动词 · speak 核心义 —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json 动词核心义页（词库原义 G3_0619；六格总览：有引证 2/6）——单独 12 幕之一（2026-11-09 第二波定夺转正）；朗读句：OALD American speak_1 义项 4（a language）（2026-11-09 第三波补，中文译文为本幕所加）
// 角色关键帧：sprites/vvspeakcore1.js（speak → l_speak；第六波 2026-11-10 补，依据见 docs/work-2026-11-09/wave6_item2_acts_empty.md）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvspeakcore1.js';
const ACTS = {"speak": ["l_speak"]};
const ITEMS = [
  ['n', 'speak：说（某种语言）；发言，讲话'],
  ['w', 'speak /spiːk/'],
  ['w', '说（某种语言）；发言，讲话'],
  ['s', 'Do you speak English?', '你会说英语吗？', 'speak'],
  ['w', '能说的搭配：'],
  ['m', 'speak up'],
  ['m', 'speak out'],
  ['w', '查过，没有的搭配：'],
  ['m', 'speak off'],
  ['m', 'speak down'],
  ['m', 'speak over'],
  ['m', 'speak on'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · speak 核心义', items: ITEMS, acts: ACTS }); }
