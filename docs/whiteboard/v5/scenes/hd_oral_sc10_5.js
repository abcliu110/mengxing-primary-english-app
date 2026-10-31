// 💬 日常用语 · 节日与祝福 · Happy New Year! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc10.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC10_5_V5.md
// 角色关键帧：sprites/hdo10_5.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo10_5.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '节日与祝福'],
  ['w', '核心交际句：Happy New Year! （新年快乐！）'],
  ['w', '💡 交际得体度与母语负迁移提示：新年问候。'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Happy New Year, Grandma!'],
  ['w', '奶奶，新年快乐！'],
  ['s', 'Happy New Year, Grandma!', '奶奶，新年快乐！'],
  ['w', '对话第2轮'],
  ['w', '👵 角色 B：Happy New Year, dear!'],
  ['w', '新年快乐宝贝！'],
  ['s', 'Happy New Year, dear!', '新年快乐宝贝！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you!'],
  ['w', '谢谢！'],
  ['s', 'Thank you!', '谢谢！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 节日与祝福 · Happy New Year!', items: ITEMS, acts: ACTS }); }
