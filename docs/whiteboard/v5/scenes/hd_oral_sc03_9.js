// 💬 日常用语 · 课堂用语 · Keep your desk clean! —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc03.js 案例 9；对照清单 lab/INVENTORY_HD_ORAL_SC03_9_V5.md
// 角色关键帧：sprites/hdo03_9.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo03_9.js';
const ACTS = {"*": ["missw", "l_hand0", "l_books"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '课堂用语'],
  ['w', '核心交际句：Keep your desk clean! （保持你的课桌整洁！（班规礼仪））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 祈使句黄金结构：Keep + 名词 + 形容词（Keep your desk clean / Keep the room quiet）！'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Please keep your desk clean and tidy, Tom.'],
  ['w', '汤姆，请保持你的课桌干净整洁。'],
  ['s', 'Please keep your desk clean and tidy, Tom.', '汤姆，请保持你的课桌干净整洁。'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：OK! I will put my books in my schoolbag now.'],
  ['w', '好的！我现在就把书放进书包里。'],
  ['s', 'OK! I will put my books in my schoolbag now.', '好的！我现在就把书放进书包里。'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：OK. I understand.'],
  ['w', '好的，我明白了。'],
  ['s', 'OK. I understand.', '好的，我明白了。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 课堂用语 · Keep your desk clean!', items: ITEMS, acts: ACTS }); }
