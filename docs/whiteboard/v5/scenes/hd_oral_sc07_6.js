// 💬 日常用语 · 购物与问价 · What size are your shoes? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc07.js 案例 6；对照清单 lab/INVENTORY_HD_ORAL_SC07_6_V5.md
// 角色关键帧：sprites/hdo07_6.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo07_6.js';
const ACTS = {"*": ["l_piggy", "l_bag1", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '购物与问价'],
  ['w', '核心交际句：What size are your shoes? （你穿多大尺码的鞋？（买鞋与比较级必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 语序防反口诀：中文说“38码”，英文把名词放前面说 Size 38！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Mike, what size are your shoes?'],
  ['w', '迈克，你穿多大尺码的鞋呀？'],
  ['s', 'Mike, what size are your shoes?', '迈克，你穿多大尺码的鞋呀？'],
  ['w', '对话第2轮'],
  ['w', '🧒 角色 B：My shoes are size 38. Your feet are smaller than mine!'],
  ['w', '我的鞋是38码。你的脚比我的小哦！'],
  ['s', 'My shoes are size 38. Your feet are smaller than mine!', '我的鞋是38码。你的脚比我的小哦！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you.'],
  ['w', '谢谢。'],
  ['s', 'Thank you.', '谢谢。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 购物与问价 · What size are your shoes?', items: ITEMS, acts: ACTS }); }
