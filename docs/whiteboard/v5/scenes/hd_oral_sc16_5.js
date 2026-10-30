// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc16`（赞美与鼓励 · Don't give up! Keep trying! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc16.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC16_5_V5.md
// 角色关键帧：sprites/hdo16_5.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo16_5.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"]};
const ITEMS = [
  ['w', '赞美与鼓励'],
  ['w', '核心交际句：Don\'t give up! Keep trying! （别放弃！继续加油试一试！）'],
  ['w', '💡 交际得体度与母语负迁移提示：鼓励遇到困难的伙伴。'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：I can\'t ride this bike well.'],
  ['w', '我骑不好自行车。'],
  ['s', 'I can\'t ride this bike well.', '我骑不好自行车。'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Don\'t give up! Keep trying!'],
  ['w', '别放弃！继续试一试！'],
  ['s', 'Don\'t give up! Keep trying!', '别放弃！继续试一试！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you!'],
  ['w', '谢谢！'],
  ['s', 'Thank you!', '谢谢！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc16`（赞美与鼓励 · Don\'t give up! Keep trying!', items: ITEMS, acts: ACTS }); }
