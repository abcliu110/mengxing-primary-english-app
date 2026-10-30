// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc11`（打电话 · May I speak to Tom, please? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc11.js 案例 2；对照清单 lab/INVENTORY_HD_ORAL_SC11_2_V5.md
// 角色关键帧：sprites/hdo11_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo11_2.js';
const ACTS = {"*": ["l_ear", "l_laugh", "l_speak"]};
const ITEMS = [
  ['w', '打电话'],
  ['w', '核心交际句：May I speak to Tom, please? （请问我可以找汤姆接电话吗？）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 打电话找人三步曲：May I speak to...? ➔ Hold on, please (请稍等) ➔ This is... speaking (我就是)！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Hello, Auntie! May I speak to Tom, please?'],
  ['w', '阿姨您好！请问我可以和汤姆通电话吗？'],
  ['s', 'Hello, Auntie! May I speak to Tom, please?', '阿姨您好！请问我可以和汤姆通电话吗？'],
  ['w', '对话第2轮'],
  ['w', '👩 角色 B：Sure! Hold on, please. He is in his bedroom.'],
  ['w', '当然可以！请稍等别挂断，他在卧室里呢。'],
  ['s', 'Sure! Hold on, please. He is in his bedroom.', '当然可以！请稍等别挂断，他在卧室里呢。'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thanks. I\'ll call later.'],
  ['w', '谢谢，我稍后再打。'],
  ['s', 'Thanks. I\'ll call later.', '谢谢，我稍后再打。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc11`（打电话 · May I speak to Tom, please?', items: ITEMS, acts: ACTS }); }
