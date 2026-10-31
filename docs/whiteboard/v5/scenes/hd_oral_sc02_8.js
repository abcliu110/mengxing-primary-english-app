// 💬 日常用语 · 感谢与道歉 · I'm sorry I'm late. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc02.js 案例 8；对照清单 lab/INVENTORY_HD_ORAL_SC02_8_V5.md
// 角色关键帧：sprites/hdo02_8.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo02_8.js';
const ACTS = {"*": ["l_wave", "l_laugh", "hello"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '感谢与道歉'],
  ['w', '核心交际句：I\'m sorry I\'m late. （对不起，我迟到了。）'],
  ['w', '💡 交际得体度与母语负迁移提示：进教室迟到时的致歉语。'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：I\'m sorry I\'m late, Miss White.'],
  ['w', '对不起怀特老师，我迟到了。'],
  ['s', 'I\'m sorry I\'m late, Miss White.', '对不起怀特老师，我迟到了。'],
  ['w', '对话第2轮'],
  ['w', '👩‍🏫 角色 B：That\'s all right. Come in, please.'],
  ['w', '没关系，请进。'],
  ['s', 'That\'s all right. Come in, please.', '没关系，请进。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 感谢与道歉 · I\'m sorry I\'m late.', items: ITEMS, acts: ACTS }); }
