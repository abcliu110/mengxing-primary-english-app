// 🎬 万能动词 · get down ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_get_down.js 案例 2；对照清单 lab/INVENTORY_VV_GET_DOWN_2_V5.md
// 角色关键帧：sprites/vvgetdown2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgetdown2.js';
const ACTS = {"*": ["l_crouch0", "l_crouch1", "l_crouch2"]};
const ITEMS = [
  ['n', 'get down：从高处下来；蹲下；开始认真做'],
  ['w', 'get down ②'],
  ['m', '下来；蹲下'],
  ['m', '高处'],
  ['s', 'Get down from the chair, please.', '请从椅子上下来。'],
  ['w', '下来、蹲低'],
  ['m', 'GET'],
  ['m', '到达 / 进入'],
  ['m', '向下落定'],
  ['m', '+'],
  ['w', 'The cat got down.'],
  ['m', '从 树上 到地面'],
  ['m', '小猫下来了。'],
  ['w', 'Get down, please.'],
  ['m', '从 椅子上 到地面'],
  ['m', '请下来。'],
  ['w', '共同点：DOWN = 从高处到低处'],
  ['s', 'The cat got down from the tall tree.', '小猫从高树上爬了下来。']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · get down ②', items: ITEMS, acts: ACTS }); }
