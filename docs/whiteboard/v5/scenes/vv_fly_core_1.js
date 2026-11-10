// 🎬 万能动词 · fly 核心义 —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_phrasal.json 动词核心义页（词库原义 G2_084；六格总览：有引证 2/6）——单独 12 幕之一（2026-11-09 第二波定夺转正）；朗读句：OALD fly_1 义项 1（of bird/insect）（2026-11-09 第三波补，中文译文为本幕所加）
// 角色关键帧：sprites/vvflycore1.js（fly → bird_up, bird_down；第六波 2026-11-10 补，依据见 docs/work-2026-11-09/wave6_item2_acts_empty.md）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvflycore1.js';
const ACTS = {"fly": ["bird_up", "bird_down"]};
const ITEMS = [
  ['n', 'fly：飞；放飞（风筝）'],
  ['w', 'fly /flaɪ/'],
  ['w', '飞；放飞（风筝）'],
  ['s', 'Geese fly south in the fall.', '大雁秋天往南飞。', 'fly'],
  ['w', '能说的搭配：'],
  ['m', 'fly out'],
  ['m', 'fly off'],
  ['w', '查过，没有的搭配：'],
  ['m', 'fly up'],
  ['m', 'fly down'],
  ['m', 'fly over'],
  ['m', 'fly on'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · fly 核心义', items: ITEMS, acts: ACTS, actorFitW: 500 }); }
