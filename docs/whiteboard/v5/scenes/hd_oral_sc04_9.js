// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · Keep in touch! Write to me soon! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc04.js 案例 9；对照清单 lab/INVENTORY_HD_ORAL_SC04_9_V5.md
// 角色关键帧：sprites/hdo04_9.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo04_9.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"]};
const ITEMS = [
  ['w', '自我介绍'],
  ['w', '核心交际句：Keep in touch! Write to me soon! （保持联系！尽快给我写信哦！（毕业与离别））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 毕业赠言三金句：Keep in touch! (保持联系) · Best wishes! (最美好的祝愿) · Good luck! (祝你好运)'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：We are going to middle school soon. Keep in touch!'],
  ['w', '我们马上就要上初中了。保持联系哦！'],
  ['s', 'We are going to middle school soon. Keep in touch!', '我们马上就要上初中了。保持联系哦！'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Sure! I will write to you and call you often!'],
  ['w', '一定会的！我会经常给你写信、打电话的！'],
  ['s', 'Sure! I will write to you and call you often!', '一定会的！我会经常给你写信、打电话的！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：Nice to meet you, too!'],
  ['w', '我也很高兴认识你！'],
  ['s', 'Nice to meet you, too!', '我也很高兴认识你！']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc04`（自我介绍 · Keep in touch! Write to me soon!', items: ITEMS, acts: ACTS }); }
