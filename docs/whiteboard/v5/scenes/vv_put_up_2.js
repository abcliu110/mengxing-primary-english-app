// 🎬 万能动词 · put up ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_put_up.js 案例 2；对照清单 lab/INVENTORY_VV_PUT_UP_2_V5.md
// 角色关键帧：sprites/vvputup2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvputup2.js';
const ACTS = {"*": ["tent0", "tent1", "tent2"]};
const ITEMS = [
  ['n', 'put up：举起（手）；张贴（海报）；搭起（帐篷）'],
  ['m', 'put up ②'],
  ['m', '搭起（帐篷）'],
  ['w', '帐篷立起来'],
  ['s', 'Let\'s put up a tent!', '我们来搭帐篷吧！'],
  ['w', 'Hooray!'],
  ['m', 'PUT'],
  ['m', '向上 / 填满'],
  ['m', '放、摆'],
  ['m', '+'],
  ['w', 'Put up your hand.'],
  ['m', '举手。'],
  ['m', '手 往上 举'],
  ['w', 'Put up a tent.'],
  ['m', '帐篷 往上 立'],
  ['m', '搭帐篷。'],
  ['w', '共同点：UP = 往上举起来、立起来'],
  ['s', 'Put up your hand! Let\'s put up a tent!', '请举手！我们来搭起帐篷吧！']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · put up ②', items: ITEMS, acts: ACTS }); }
