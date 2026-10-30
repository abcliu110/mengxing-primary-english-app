// 💬 日常用语 · 就餐与点菜 · Help yourself! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc06.js 案例 2；对照清单 lab/INVENTORY_HD_ORAL_SC06_2_V5.md
// 角色关键帧：sprites/hdo06_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo06_2.js';
const ACTS = {"*": ["m_offer", "l_nothanks", "m_like"]};
const ITEMS = [
  ['w', '就餐与点菜'],
  ['w', '核心交际句：Help yourself! （请随便吃！/ 别客气自己夹菜！（热情待客必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 防望文生义王牌：餐桌上的 Help yourself! 意思是“请随便吃，别客气”！'],
  ['w', '对话第1轮'],
  ['w', '👩 角色 A：Dinner\'s ready! Help yourself to some chicken and fruit!'],
  ['w', '晚饭准备好啦！请随便吃点鸡肉和水果，别客气！'],
  ['s', 'Dinner\'s ready! Help yourself to some chicken and fruit!', '晚饭准备好啦！请随便吃点鸡肉和水果，别客气！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Thank you! Everything looks so delicious!'],
  ['w', '谢谢阿姨！所有菜看起来都太美味了！'],
  ['s', 'Thank you! Everything looks so delicious!', '谢谢阿姨！所有菜看起来都太美味了！'],
  ['w', '对话第3轮'],
  ['w', '👩 角色 A：Thank you. It tastes good.'],
  ['w', '谢谢，真好吃。'],
  ['s', 'Thank you. It tastes good.', '谢谢，真好吃。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 就餐与点菜 · Help yourself!', items: ITEMS, acts: ACTS }); }
