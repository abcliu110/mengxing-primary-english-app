// 🎬 万能动词 · give in ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_give_in.js 案例 1；对照清单 lab/INVENTORY_VV_GIVE_IN_1_V5.md
// 角色关键帧：sprites/vvgivein1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgivein1.js';
const ACTS = {"*": ["l_exam0", "l_exam1", "missw_paper"]};
const ITEMS = [
  ['n', 'give in：把考卷交进老师手里 / 让步'],
  ['m', '10:00'],
  ['m', 'Test 试卷'],
  ['m', 'give in ①'],
  ['m', '交上（考卷）'],
  ['w', 'Time\'s up!'],
  ['s', 'Please give in your test papers now.', '现在请把试卷交上来。'],
  ['m', 'IN'],
  ['m', '交进老师手里']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · give in ①', items: ITEMS, acts: ACTS }); }
