// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Put away your toys, please! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc15.js 案例 11；对照清单 lab/INVENTORY_HD_ORAL_SC15_11_V5.md
// 角色关键帧：sprites/hdo15_11.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo15_11.js';
const ACTS = {"*": ["m_sweep", "l_speak", "l_think"]};
const ITEMS = [
  ['w', '居家与家务'],
  ['w', '核心交际句：Put away your toys, please! （请把你的玩具收拾好！）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 收拾整理短语王：put away your toys/books（把玩具/书本收好放回原位）！'],
  ['w', '对话第1轮'],
  ['w', '👨 角色 A：Time for bed! Please put away your toys, Jim.'],
  ['w', '该睡觉啦！吉姆，请把你的玩具收拾好放回原处。'],
  ['s', 'Time for bed! Please put away your toys, Jim.', '该睡觉啦！吉姆，请把你的玩具收拾好放回原处。'],
  ['w', '对话第2轮'],
  ['w', '🧒 角色 B：OK, Dad! I\'ll put them in the toy box.'],
  ['w', '好的，爸爸！我这就把它们放进玩具箱里。'],
  ['s', 'OK, Dad! I\'ll put them in the toy box.', '好的，爸爸！我这就把它们放进玩具箱里。'],
  ['w', '对话第3轮'],
  ['w', '👨 角色 A：OK. I will.'],
  ['w', '好的，我会的。'],
  ['s', 'OK. I will.', '好的，我会的。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Put away your toys, please!', items: ITEMS, acts: ACTS }); }
