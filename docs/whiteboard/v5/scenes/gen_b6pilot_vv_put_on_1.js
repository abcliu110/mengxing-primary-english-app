// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：（spec 自带内容，无家族模型）；改本幕台词/结构：model/specs/b6pilot_vv_put_on_1.yaml；改编排：模板 vv_put_on_1.js（家族共用）。
// 判据/口诀来源：—。生成器 model/gen_scene.py（items 模式）。
// 🎬 万能动词 · put on ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_put_on.js 案例 1；对照清单 lab/INVENTORY_VV_PUT_ON_1_V5.md
// 角色关键帧：sprites/vvputon1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvputon1.js';
const ACTS = {"*": ["l_cap0", "l_cap1", "l_cap2"]};
const ITEMS = [
  ['n', 'put on：把衣物放到身体表面贴合'],
  ['m', '-5°C'],
  ['m', 'put on ①'],
  ['m', '穿上，戴上'],
  ['s', 'Put on your warm hat and gloves!', '戴上你的暖和帽子和手套！'],
  ['m', '头顶'],
  ['m', 'ON'],
  ['m', '贴合在身体表面'],
  ['w', '双手'],
  ['w', 'So warm!'],
  ['s', 'So warm!', '真暖和！'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · put on ①', items: ITEMS, acts: ACTS }); }
