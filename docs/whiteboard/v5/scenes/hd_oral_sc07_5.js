// 💬 日常用语 · 购物与问价 · It's too expensive! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc07.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC07_5_V5.md
// 角色关键帧：sprites/hdo07_5.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo07_5.js';
const ACTS = {"*": ["l_bag0", "m_offer", "l_point"]};
const ITEMS = [
  ['w', '购物与问价'],
  ['w', '核心交际句：It\'s too expensive! （这太贵了！（评价价格与砍价必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 一词多义巧区分：too 放句尾是“也”，放形容词前是“太…”（too expensive 太贵了）！'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：How much is this red scarf?'],
  ['w', '这条红围巾多少钱？'],
  ['s', 'How much is this red scarf?', '这条红围巾多少钱？'],
  ['w', '对话第2轮'],
  ['w', '👩‍💼 角色 B：It\'s two hundred yuan.'],
  ['w', '两百元。'],
  ['s', 'It\'s two hundred yuan.', '两百元。'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：That\'s too expensive. How about the blue one?'],
  ['w', '那太贵了。蓝色的那条呢？'],
  ['s', 'That\'s too expensive. How about the blue one?', '那太贵了。蓝色的那条呢？']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 购物与问价 · It\'s too expensive!', items: ITEMS, acts: ACTS }); }
