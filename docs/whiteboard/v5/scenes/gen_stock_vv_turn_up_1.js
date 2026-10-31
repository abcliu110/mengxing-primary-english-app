// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：（spec 自带内容，无家族模型）；改本幕台词/结构：model/specs/stock_vv_turn_up_1.yaml；改编排：模板 vv_turn_up_1.js（家族共用）。
// 判据/口诀来源：—。生成器 model/gen_scene.py（items 模式）。
// 🎬 万能动词 · turn up ① —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_turn_up.js 案例 1；对照清单 lab/INVENTORY_VV_TURN_UP_1_V5.md
// 角色关键帧：sprites/vvturnup1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvturnup1.js';
const ACTS = {"*": ["l_radio0", "l_radio1", "l_radio2"]};
const ITEMS = [
  ['n', 'turn up：把音量旋钮往高处拧 / 人突然冒头出现'],
  ['m', 'turn up ①'],
  ['m', '♪'],
  ['m', '调大（音量）'],
  ['m', 'UP'],
  ['m', '音量往上拧'],
  ['s', 'Turn up the music! Let\'s dance!', '把音乐声音调大一点！我们跳舞吧！'],
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · turn up ①', items: ITEMS, acts: ACTS }); }
