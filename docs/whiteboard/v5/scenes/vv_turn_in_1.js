// 🎬 万能动词 · turn in ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_turn_in.js 案例 1；对照清单 lab/INVENTORY_VV_TURN_IN_1_V5.md
// 角色关键帧：sprites/vvturnin1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvturnin1.js';
const ACTS = {"*": ["l_hwalk", "l_handin", "missw_stack"]};
const ITEMS = [
  ['n', 'turn in：把作业本往老师手里交进去'],
  ['w', 'Homework'],
  ['w', 'Homework 作业'],
  ['m', 'turn in ①'],
  ['m', '上交（作业）'],
  ['s', 'Please turn in your homework on time.', '请按时上交你们的家庭作业。'],
  ['m', 'IN'],
  ['m', '交进去'],
  ['w', 'On time!']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · turn in ①', items: ITEMS, acts: ACTS }); }
