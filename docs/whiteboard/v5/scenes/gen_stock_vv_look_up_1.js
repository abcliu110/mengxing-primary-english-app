// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：（spec 自带内容，无家族模型）；改本幕台词/结构：model/specs/stock_vv_look_up_1.yaml；改编排：模板 vv_look_up_1.js（家族共用）。
// 判据/口诀来源：—。生成器 model/gen_scene.py（items 模式）。
// 🎬 万能动词 · look up ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_look_up.js 案例 1；对照清单 lab/INVENTORY_VV_LOOK_UP_1_V5.md
// 角色关键帧：sprites/vvlookup1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvlookup1.js';
const ACTS = {"*": ["l_lookup"]};
const ITEMS = [
  ['n', 'look up：抬起头向上看 / 在厚词典里让信息浮现出来'],
  ['m', 'look up ①'],
  ['m', '抬头向上看'],
  ['m', 'UP'],
  ['m', '抬头往上看'],
  ['s', 'Look up! A shooting star!', '抬头看！一颗流星！'],
  ['w', 'Wow, look!'],
  ['s', 'Wow, look!', '哇，快看！'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · look up ①', items: ITEMS, acts: ACTS }); }
