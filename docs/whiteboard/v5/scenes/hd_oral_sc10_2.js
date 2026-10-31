// 💬 日常用语 · 节日与祝福 · Cheers! Happy New Year! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc10.js 案例 2；对照清单 lab/INVENTORY_HD_ORAL_SC10_2_V5.md
// 角色关键帧：sprites/hdo10_2.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo10_2.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '节日与祝福'],
  ['w', '核心交际句：Cheers! Happy New Year! （干杯！新年快乐！（节日聚餐祝福））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 共同节日回应王牌：新年、中秋、周末等大家都过的节日，可用 The same to you!（同乐/也同样祝你）回应！'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：Cheers! Happy New Year, everyone!'],
  ['w', '干杯！祝大家新年快乐！'],
  ['s', 'Cheers! Happy New Year, everyone!', '干杯！祝大家新年快乐！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：Cheers! The same to you!'],
  ['w', '干杯！也同样祝福你（同乐）！'],
  ['s', 'Cheers! The same to you!', '干杯！也同样祝福你（同乐）！'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you! The same to you!'],
  ['w', '谢谢！你也一样！'],
  ['s', 'Thank you! The same to you!', '谢谢！你也一样！']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 节日与祝福 · Cheers! Happy New Year!', items: ITEMS, acts: ACTS }); }
