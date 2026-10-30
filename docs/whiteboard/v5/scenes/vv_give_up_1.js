// 🎬 万能动词 · give up ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_give_up.js 案例 1；对照清单 lab/INVENTORY_VV_GIVE_UP_1_V5.md
// 角色关键帧：sprites/vvgiveup1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgiveup1.js';
const ACTS = {"*": ["l_lift0", "l_lift1", "l_lift2"]};
const ITEMS = [
  ['n', 'give up：双手向上一摊不再抓握'],
  ['m', 'give up ①'],
  ['m', '放弃'],
  ['w', 'I give up…'],
  ['m', 'UP'],
  ['m', '双手往上一摊'],
  ['s', 'Never give up! You can do it!', '永远不要放弃！你能行的！'],
  ['w', 'Never give up!'],
  ['w', 'I did it!']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · give up ①', items: ITEMS, acts: ACTS }); }
