// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc12`（看病与身体不适 · Why are you so happy today? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc12.js 案例 9；对照清单 lab/INVENTORY_HD_ORAL_SC12_9_V5.md
// 角色关键帧：sprites/hdo12_9.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo12_9.js';
const ACTS = {"*": ["l_plaster", "l_breath", "l_think"]};
const ITEMS = [
  ['w', '看病与身体不适'],
  ['w', '核心交际句：Why are you so happy today? （你今天为什么这么开心呀？）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 黄金问答锁死：听到 Why...? 提问，回答第一句永远是 Because...!'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Why are you so happy today, Chen Jie?'],
  ['w', '陈杰，你今天为什么这么开心呀？'],
  ['s', 'Why are you so happy today, Chen Jie?', '陈杰，你今天为什么这么开心呀？'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Because my mum bought me a cute puppy! And my birthday is coming!'],
  ['w', '因为我妈妈给我买了一只可爱的小狗！而且我的生日快到啦！'],
  ['s', 'Because my mum bought me a cute puppy! And my birthday is coming!', '因为我妈妈给我买了一只可爱的小狗！而且我的生日快到啦！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you. I\'ll have a rest.'],
  ['w', '谢谢，我会休息。'],
  ['s', 'Thank you. I\'ll have a rest.', '谢谢，我会休息。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc12`（看病与身体不适 · Why are you so happy today?', items: ITEMS, acts: ACTS }); }
