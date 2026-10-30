// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Where are my keys? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc15.js 案例 1；对照清单 lab/INVENTORY_HD_ORAL_SC15_1_V5.md
// 角色关键帧：sprites/hdo15_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo15_1.js';
const ACTS = {"*": ["m_sweep", "l_speak", "l_think"]};
const ITEMS = [
  ['w', '居家与家务'],
  ['w', '核心交际句：Where are my keys? （我的钥匙在哪里？（找东西必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 单复数严格一致：keys / shoes / glasses 是复数，提问必须用 Where are...，回答用 They are...！'],
  ['w', '对话第1轮'],
  ['w', '👩 角色 A：Where are my keys? Are they on the table?'],
  ['w', '我的钥匙在哪里？它们在桌子上吗？'],
  ['s', 'Where are my keys? Are they on the table?', '我的钥匙在哪里？它们在桌子上吗？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：No, they aren\'t. Look! They are on the fridge!'],
  ['w', '不，不在。看！它们在冰箱上面呢！'],
  ['s', 'No, they aren\'t. Look! They are on the fridge!', '不，不在。看！它们在冰箱上面呢！'],
  ['w', '对话第3轮'],
  ['w', '👩 角色 A：OK. I will.'],
  ['w', '好的，我会的。'],
  ['s', 'OK. I will.', '好的，我会的。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Where are my keys?', items: ITEMS, acts: ACTS }); }
