// 🎬 万能动词 · give back ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_give_down.js 案例 1；对照清单 lab/INVENTORY_VV_GIVE_DOWN_1_V5.md
// 角色关键帧：sprites/vvgivedown1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgivedown1.js';
const ACTS = {"*": ["l_pencil", "m_lost", "pencil_back"]};
const ITEMS = [
  ['n', 'give back：give 没有常用的 down 搭配，这一格换成 give back：把东西递回原主手里'],
  ['w', 'Amy'],
  ['w', 'give back ①'],
  ['w', '归还'],
  ['s', 'Please give back my ruler after class.', '下课后请把尺子还给我。'],
  ['m', 'BACK'],
  ['m', '还回去'],
  ['w', '回到原主那里'],
  ['w', 'Thanks!']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · give back ①', items: ITEMS, acts: ACTS }); }
