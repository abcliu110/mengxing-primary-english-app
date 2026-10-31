// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：（spec 自带内容，无家族模型）；改本幕台词/结构：model/specs/stock_vv_take_off_1.yaml；改编排：模板 vv_take_off_1.js（家族共用）。
// 判据/口诀来源：—。生成器 model/gen_scene.py（items 模式）。
// 🎬 万能动词 · take off ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_take_off.js 案例 1；对照清单 lab/INVENTORY_VV_TAKE_OFF_1_V5.md
// 角色关键帧：sprites/vvtakeoff1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvtakeoff1.js';
const ACTS = {"*": ["l_coff0", "l_coff1", "l_coff2"]};
const ITEMS = [
  ['n', 'take off：拿走并脱离身体表面 / 脱离地面跑道'],
  ['w', '32°C'],
  ['w', 'take off ①'],
  ['w', '脱下（衣物）'],
  ['w', 'So hot!'],
  ['s', 'He takes off his jacket.', '他脱下了外套。'],
  ['w', '身体表面'],
  ['m', 'OFF'],
  ['m', '外套离开身体'],
  ['w', 'Ahh~'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · take off ①', items: ITEMS, acts: ACTS }); }
