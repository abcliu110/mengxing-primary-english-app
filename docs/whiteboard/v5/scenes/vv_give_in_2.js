// 🎬 万能动词 · give in ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_give_in.js 案例 2；对照清单 lab/INVENTORY_VV_GIVE_IN_2_V5.md
// 角色关键帧：sprites/vvgivein2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgivein2.js';
const ACTS = {"*": ["tug0", "tug1", "tug2"]};
const ITEMS = [
  ['n', 'give in：交上（考卷）；让步，妥协'],
  ['m', 'give in ②'],
  ['m', '→ 对方在拉'],
  ['m', '让步，屈服'],
  ['s', 'He was tired, so he gave in.', '他累了，就认输了。'],
  ['w', 'OK, you win!'],
  ['w', '让步，服输'],
  ['m', 'GIVE'],
  ['m', '给、交出'],
  ['m', '进入里面'],
  ['m', '+'],
  ['w', 'Give in your papers.'],
  ['w', '交上试卷。'],
  ['w', '试卷 交进 老师手里'],
  ['w', 'He gave in.'],
  ['w', '他认输了。'],
  ['w', '力气 收进来 不再争'],
  ['w', '共同点：IN = 交进去、退让进来'],
  ['s', 'Please give in your test papers now.', '现在请把试卷交上来。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · give in ②', items: ITEMS, acts: ACTS }); }
