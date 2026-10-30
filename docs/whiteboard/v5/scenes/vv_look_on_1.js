// 🎬 万能动词 · look on ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_look_on.js 案例 1；对照清单 lab/INVENTORY_VV_LOOK_ON_1_V5.md
// 角色关键帧：sprites/vvlookon1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvlookon1.js';
const ACTS = {"*": ["l_bench0", "l_bench1", "l_bench2"]};
const ITEMS = [
  ['n', 'look on：目光落在舞台表面旁观'],
  ['m', 'look on ①'],
  ['m', '旁观，观看'],
  ['m', 'ON'],
  ['m', '目光落在场上'],
  ['s', 'We look on as they play football.', '我们在一旁看他们踢足球。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · look on ①', items: ITEMS, acts: ACTS }); }
