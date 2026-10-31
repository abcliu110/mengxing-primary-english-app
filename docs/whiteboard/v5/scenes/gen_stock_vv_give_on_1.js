// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：（spec 自带内容，无家族模型）；改本幕台词/结构：model/specs/stock_vv_give_on_1.yaml；改编排：模板 vv_give_on_1.js（家族共用）。
// 判据/口诀来源：—。生成器 model/gen_scene.py（items 模式）。
// 🎬 万能动词 · give on ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_give_on.js 案例 1；对照清单 lab/INVENTORY_VV_GIVE_ON_1_V5.md
// 角色关键帧：sprites/vvgiveon1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgiveon1.js';
const ACTS = {"*": ["l_shutter"]};
const ITEMS = [
  ['n', 'give on (onto)：门窗的视线面正对着外面的风景'],
  ['m', 'give on ①'],
  ['m', '（门窗）朝向'],
  ['m', 'ON'],
  ['m', '窗户正对着公园'],
  ['s', 'The window gives on the green park.', '这扇窗户朝向绿色的公园。'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · give on ①', items: ITEMS, acts: ACTS }); }
