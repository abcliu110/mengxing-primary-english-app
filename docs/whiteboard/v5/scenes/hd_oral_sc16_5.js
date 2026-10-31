// 💬 日常用语 · 赞美与鼓励 · Don't give up! Keep trying! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc16.js 案例 5；对照清单 lab/INVENTORY_HD_ORAL_SC16_5_V5.md
// 角色关键帧：sprites/hdo16_5.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo16_5.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '赞美与鼓励'],
  ['w', '核心交际句：Don\'t give up! Keep trying! （别放弃！继续加油试一试！）'],
  ['w', '💡 交际得体度与母语负迁移提示：鼓励遇到困难的伙伴。'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：I can\'t ride this bike well.'],
  ['w', '我骑不好自行车。'],
  ['s', 'I can\'t ride this bike well.', '我骑不好自行车。'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Don\'t give up! Keep trying!'],
  ['w', '别放弃！继续试一试！'],
  ['s', 'Don\'t give up! Keep trying!', '别放弃！继续试一试！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you!'],
  ['w', '谢谢！'],
  ['s', 'Thank you!', '谢谢！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 赞美与鼓励 · Don\'t give up! Keep trying!', items: ITEMS, acts: ACTS }); }
