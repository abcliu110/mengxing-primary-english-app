// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：（spec 自带内容，无家族模型）；改本幕台词/结构：model/specs/stock_vv_give_out_1.yaml；改编排：模板 vv_give_out_1.js（家族共用）。
// 判据/口诀来源：—。生成器 model/gen_scene.py（items 模式）。
// 🎬 万能动词 · give out ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_give_out.js 案例 1；对照清单 lab/INVENTORY_VV_GIVE_OUT_1_V5.md
// 角色关键帧：sprites/vvgiveout1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgiveout1.js';
const ACTS = {"*": ["missw_hold", "missw_give"]};
const ITEMS = [
  ['n', 'give out：从老师手里往外分发给全班同学'],
  ['w', 'give out ①'],
  ['w', '分发'],
  ['w', 'One for you!'],
  ['s', 'One for you!', '给你一个！'],
  ['m', 'OUT'],
  ['m', '从手里往外分发'],
  ['s', 'Can you help me give out the notebooks?', '你能帮我把笔记本分发给大家吗？'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · give out ①', items: ITEMS, acts: ACTS }); }
