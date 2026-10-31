// 💬 日常用语 · 居家与家务 · I usually do my homework at 5:00. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc15.js 案例 8；对照清单 lab/INVENTORY_HD_ORAL_SC15_8_V5.md
// 角色关键帧：sprites/hdo15_8.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo15_8.js';
const ACTS = {"*": ["m_tv", "l_put", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '居家与家务'],
  ['w', '核心交际句：I usually do my homework at 5:00. （我通常五点钟做家庭作业。）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 做作业固定搭配：do my homework（homework 是不可数名词，绝不能加 a 或 s）！'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：When do you do your homework after school?'],
  ['w', '放学后你什么时候做家庭作业呀？'],
  ['s', 'When do you do your homework after school?', '放学后你什么时候做家庭作业呀？'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：I usually do my homework at five o\'clock.'],
  ['w', '我通常在五点钟做家庭作业。'],
  ['s', 'I usually do my homework at five o\'clock.', '我通常在五点钟做家庭作业。'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：OK. I will.'],
  ['w', '好的，我会的。'],
  ['s', 'OK. I will.', '好的，我会的。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 居家与家务 · I usually do my homework at 5:00.', items: ITEMS, acts: ACTS }); }
