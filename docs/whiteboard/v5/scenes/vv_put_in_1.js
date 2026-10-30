// 🎬 万能动词 · put in ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_put_in.js 案例 1；对照清单 lab/INVENTORY_VV_PUT_IN_1_V5.md
// 角色关键帧：sprites/vvputin1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvputin1.js';
const ACTS = {"*": ["l_toy0", "l_toy1", "l_toy2"]};
const ITEMS = [
  ['n', 'put in：把东西安放到容器内部'],
  ['m', 'A'],
  ['m', 'TOYS'],
  ['m', 'put in ①'],
  ['m', '放进'],
  ['w', '箱子里面'],
  ['s', 'Put your toys in the toy box.', '把你的玩具放进玩具箱里。'],
  ['m', 'IN'],
  ['m', '放进箱子'],
  ['w', 'All clean!']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · put in ①', items: ITEMS, acts: ACTS }); }
