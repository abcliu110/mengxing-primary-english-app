// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：（spec 自带内容，无家族模型）；改本幕台词/结构：model/specs/stock_vv_get_down_1.yaml；改编排：模板 vv_get_down_1.js（家族共用）。
// 判据/口诀来源：—。生成器 model/gen_scene.py（items 模式）。
// 🎬 万能动词 · get down ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_get_down.js 案例 1；对照清单 lab/INVENTORY_VV_GET_DOWN_1_V5.md
// 角色关键帧：sprites/vvgetdown1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgetdown1.js';
const ACTS = {"*": ["tree0", "tree1", "tree2"]};
const ITEMS = [
  ['n', 'get down：身体从高处往低处俯身或下来'],
  ['w', 'get down ①'],
  ['m', '从高处下来'],
  ['m', '树上高处'],
  ['w', 'Come down!'],
  ['s', 'Come down!', '下来！'],
  ['m', 'DOWN'],
  ['m', '从树上下来'],
  ['s', 'The cat got down from the tall tree.', '小猫从高树上爬了下来。'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · get down ①', items: ITEMS, acts: ACTS }); }
