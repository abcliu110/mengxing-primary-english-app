// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc06`（就餐与点菜 · Would you like some more? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc06.js 案例 4；对照清单 lab/INVENTORY_HD_ORAL_SC06_4_V5.md
// 角色关键帧：sprites/hdo06_4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo06_4.js';
const ACTS = {"*": ["m_offer", "l_nothanks", "m_like"]};
const ITEMS = [
  ['w', '就餐与点菜'],
  ['w', '核心交际句：Would you like some more? （还要再来一点吗？— 不用了谢谢，我吃饱了。）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 礼貌婉拒金句：Would you like...? 想要说 Yes, please；不要说 No, thank you!'],
  ['w', '对话第1轮'],
  ['w', '👵 角色 A：Would you like some more soup and rice, Sam?'],
  ['w', '山姆，你还要再来点汤和米饭吗？'],
  ['s', 'Would you like some more soup and rice, Sam?', '山姆，你还要再来点汤和米饭吗？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：No, thank you, Grandma! I\'m full. It tastes delicious!'],
  ['w', '不用了，谢谢奶奶！我吃饱啦。饭菜太美味了！'],
  ['s', 'No, thank you, Grandma! I\'m full. It tastes delicious!', '不用了，谢谢奶奶！我吃饱啦。饭菜太美味了！'],
  ['w', '对话第3轮'],
  ['w', '👵 角色 A：Thank you. It tastes good.'],
  ['w', '谢谢，真好吃。'],
  ['s', 'Thank you. It tastes good.', '谢谢，真好吃。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc06`（就餐与点菜 · Would you like some more?', items: ITEMS, acts: ACTS }); }
