// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：（spec 自带内容，无家族模型）；改本幕台词/结构：model/specs/stock_vv_take_in_1.yaml；改编排：模板 vv_take_in_1.js（家族共用）。
// 判据/口诀来源：—。生成器 model/gen_scene.py（items 模式）。
// 🎬 万能动词 · take in ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_take_in.js 案例 1；对照清单 lab/INVENTORY_VV_TAKE_IN_1_V5.md
// 角色关键帧：sprites/vvtakein1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvtakein1.js';
const ACTS = {"*": ["l_air0", "l_air1", "l_air2"]};
const ITEMS = [
  ['n', 'take in：从外面拿进身体或大脑容器里'],
  ['m', 'take in ①'],
  ['m', '吸入（空气）'],
  ['s', 'Open the window and take in fresh air!', '打开窗户吸入新鲜空气！'],
  ['w', '身体 = 容器'],
  ['m', 'IN'],
  ['m', '空气进入身体'],
  ['w', 'Ahh~'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · take in ①', items: ITEMS, acts: ACTS }); }
