// 🎬 万能动词 · give up ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_give_up.js 案例 2；对照清单 lab/INVENTORY_VV_GIVE_UP_2_V5.md
// 角色关键帧：sprites/vvgiveup2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgiveup2.js';
const ACTS = {"*": ["dad_candy", "dad_apple"]};
const ITEMS = [
  ['n', 'give up：放弃，投降（Don\'t give up 永不放弃！）'],
  ['m', 'Sweets'],
  ['m', 'give up ②'],
  ['m', '戒掉，放弃'],
  ['w', '彻底放手不要了'],
  ['s', 'He gave up sweets for his teeth.', '为了牙齿，他戒掉了糖果。'],
  ['w', 'Healthy teeth!'],
  ['m', 'GIVE'],
  ['m', '向上 / 填满'],
  ['m', '给、交出'],
  ['m', '+'],
  ['m', '双手 往上 一摊'],
  ['m', '永不放弃！'],
  ['w', 'He gave up sweets.'],
  ['m', '他戒掉了糖果。'],
  ['m', '彻底 放手'],
  ['w', '共同点：UP = 两手一摊，彻底交出去'],
  ['s', 'Never give up! You can do it!', '永远不要放弃！你能行的！']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · give up ②', items: ITEMS, acts: ACTS }); }
