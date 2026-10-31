// 💬 日常用语 · 爱好与运动 · Look at me! I can swim fast! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc14.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC14_5_V5.md
// 角色关键帧：sprites/hdo14_5.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo14_5.js';
const ACTS = {"*": ["kick0", "kick1", "l_laugh"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '爱好与运动'],
  ['w', '核心交际句：Look at me! I can swim fast! （看我！我游得很快！（展示才艺必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 副词防坑王：fast（快地）和 high（高地：jump high）本身就是副词，后面绝对不能画蛇添足加 -ly！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Look at me, Sarah! I can swim like a fish!'],
  ['w', '萨拉，看我！我能像小鱼一样游泳！'],
  ['s', 'Look at me, Sarah! I can swim like a fish!', '萨拉，看我！我能像小鱼一样游泳！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Wow, cool! You can swim so fast!'],
  ['w', '哇，太酷了！你游得真快呀！'],
  ['s', 'Wow, cool! You can swim so fast!', '哇，太酷了！你游得真快呀！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：OK! Let\'s try.'],
  ['w', '好，我们试试。'],
  ['s', 'OK! Let\'s try.', '好，我们试试。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 爱好与运动 · Look at me! I can swim fast!', items: ITEMS, acts: ACTS }); }
