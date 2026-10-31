// 💬 日常用语 · 爱好与运动 · Congratulations! We won! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc14.js 案例 7；对照清单 lab/INVENTORY_HD_ORAL_SC14_7_V5.md
// 角色关键帧：sprites/hdo14_7.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo14_7.js';
const ACTS = {"*": ["kick0", "kick1", "l_laugh"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '爱好与运动'],
  ['w', '核心交际句：Congratulations! We won! （祝贺你（们）！我们赢啦！（获胜欢呼））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 庆祝胜利必背：We won! (我们赢了) · Congratulations! (祝贺，永远带复数 -s) · I\'m proud of you! (为你骄傲)！'],
  ['w', '对话第1轮'],
  ['w', '👩‍🏫 角色 A：Hooray! Our team won the football match!'],
  ['w', '万岁！我们队赢下了这场足球比赛！'],
  ['s', 'Hooray! Our team won the football match!', '万岁！我们队赢下了这场足球比赛！'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Congratulations, boys and girls! I\'m so proud of you!'],
  ['w', '祝贺你们，孩子们！我真为你们感到骄傲！'],
  ['s', 'Congratulations, boys and girls! I\'m so proud of you!', '祝贺你们，孩子们！我真为你们感到骄傲！'],
  ['w', '对话第3轮'],
  ['w', '👩‍🏫 角色 A：OK! Let\'s try.'],
  ['w', '好，我们试试。'],
  ['s', 'OK! Let\'s try.', '好，我们试试。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 爱好与运动 · Congratulations! We won!', items: ITEMS, acts: ACTS }); }
