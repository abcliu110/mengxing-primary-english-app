// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：（spec 自带内容，无家族模型）；改本幕台词/结构：model/specs/stock_vv_give_on_2.yaml；改编排：模板 vv_give_on_2.js（家族共用）。
// 判据/口诀来源：—。生成器 model/gen_scene.py（items 模式）。
// 🎬 万能动词 · give on ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_give_on.js 案例 2；对照清单 lab/INVENTORY_VV_GIVE_ON_2_V5.md
// 角色关键帧：sprites/vvgiveon2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvgiveon2.js';
const ACTS = {"*": ["l_gdoor"]};
const ITEMS = [
  ['n', 'give on (onto)：（门窗）朝向，通向'],
  ['w', 'Back Door 后门'],
  ['w', 'give onto ②'],
  ['w', '通向'],
  ['w', '通向花园'],
  ['s', 'The back door gives onto the garden.', '后门通向花园。'],
  ['m', 'GIVE'],
  ['m', '给、交出'],
  ['m', '贴到表面上'],
  ['m', '+'],
  ['w', 'The window gives on the park.'],
  ['m', '窗户 正对 公园'],
  ['m', '窗户朝向公园。'],
  ['w', 'The door gives onto the garden.'],
  ['m', '门 通向 花园'],
  ['m', '门通向花园。'],
  ['w', '共同点：ON = 正对着、通到那一面'],
  ['s', 'The window gives on the green park.', '这扇窗户朝向绿色的公园。'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · give on ②', items: ITEMS, acts: ACTS }); }
