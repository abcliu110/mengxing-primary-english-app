// 💬 日常用语 · 就餐与点菜 · Can I have some water, please? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc06.js 案例 3；对照清单 lab/INVENTORY_HD_ORAL_SC06_3_V5.md
// 角色关键帧：sprites/hdo06_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo06_3.js';
const ACTS = {"*": ["m_bread", "m_cake", "l_speak"]};
const ITEMS = [
  ['w', '就餐与点菜'],
  ['w', '核心交际句：Can I have some water, please? （请给我一些水好吗？（礼貌索要食物饮品））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 语法必考细节：Can I have some...? 和 Would you like some...? 疑问句也用 some！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Mum, I\'m thirsty. Can I have some water, please?'],
  ['w', '妈妈，我口渴了。请给我一些水喝好吗？'],
  ['s', 'Mum, I\'m thirsty. Can I have some water, please?', '妈妈，我口渴了。请给我一些水喝好吗？'],
  ['w', '对话第2轮'],
  ['w', '👩 角色 B：Of course! Here you are. Drink slowly.'],
  ['w', '当然可以！给你。慢点喝哦。'],
  ['s', 'Of course! Here you are. Drink slowly.', '当然可以！给你。慢点喝哦。'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you. It tastes good.'],
  ['w', '谢谢，真好吃。'],
  ['s', 'Thank you. It tastes good.', '谢谢，真好吃。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 就餐与点菜 · Can I have some water, please?', items: ITEMS, acts: ACTS }); }
