// 💬 日常用语 · 打电话 · Can I take a message? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc11.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC11_5_V5.md
// 角色关键帧：sprites/hdo11_5.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo11_5.js';
const ACTS = {"*": ["l_speak", "l_ear", "l_think"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '打电话'],
  ['w', '核心交际句：Can I take a message? （需要我捎个口信吗？）'],
  ['w', '💡 交际得体度与母语负迁移提示：电话留言礼貌用语。'],
  ['w', '对话第1轮'],
  ['w', '👩 角色 A：Sorry, he isn\'t at home. Can I take a message?'],
  ['w', '抱歉他不在家，要留口信吗？'],
  ['s', 'Sorry, he isn\'t at home. Can I take a message?', '抱歉他不在家，要留口信吗？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Yes, please tell him to call me back.'],
  ['w', '请让他给我回电话。'],
  ['s', 'Yes, please tell him to call me back.', '请让他给我回电话。'],
  ['w', '对话第3轮'],
  ['w', '👩 角色 A：Sure!'],
  ['w', '好的！'],
  ['s', 'Sure!', '好的！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 打电话 · Can I take a message?', items: ITEMS, acts: ACTS }); }
