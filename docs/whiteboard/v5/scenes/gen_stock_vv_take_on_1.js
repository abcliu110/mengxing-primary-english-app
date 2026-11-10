// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：（spec 自带内容，无家族模型）；改本幕台词/结构：model/specs/stock_vv_take_on_1.yaml；改编排：模板 vv_take_on_1.js（家族共用）。
// 判据/口诀来源：—。生成器 model/gen_scene.py（items 模式）。
// 🎬 万能动词 · take on ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_take_on.js 案例 1；对照清单 lab/INVENTORY_VV_TAKE_ON_1_V5.md
// 角色关键帧：sprites/vvtakeon1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvtakeon1.js';
const ACTS = {"*": ["l_sack0", "l_sack1", "l_sack2"]};
const ITEMS = [
  ['n', 'take on：把担子拿到肩膀平面上'],
  ['m', 'take on ①'],
  ['m', '拿上肩 → 承担'],
  ['w', 'So heavy!'],
  ['s', 'So heavy!', '好重！'],
  ['s', 'He takes on the heavy bag.', '他把沉重的书包扛上肩。'],
  ['w', '肩膀表面'],
  ['m', 'ON'],
  ['m', '书包贴在肩上'],
  ['w', 'Ready!'],
  ['s', 'Ready!', '准备好了！'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · take on ①', items: ITEMS, acts: ACTS }); }
