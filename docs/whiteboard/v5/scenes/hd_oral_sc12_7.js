// 💬 日常用语 · 看病与身体不适 · Don't be afraid! I'm here with you. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc12.js 案例 7；对照清单 lab/INVENTORY_HD_ORAL_SC12_7_V5.md
// 角色关键帧：sprites/hdo12_7.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo12_7.js';
const ACTS = {"*": ["l_plaster", "l_breath", "l_think"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '看病与身体不适'],
  ['w', '核心交际句：Don\'t be afraid! I\'m here with you. （别害怕！有我陪着你呢。）'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 考场必考易错点：afraid / sad / angry / worried 都是形容词，说“别害怕/别难过”必须加 be：Don\'t be afraid/sad!'],
  ['w', '对话第1轮'],
  ['w', '👩 角色 A：Listen to the thunder! I\'m a little afraid, Mum.'],
  ['w', '听那雷声！妈妈，我有点害怕。'],
  ['s', 'Listen to the thunder! I\'m a little afraid, Mum.', '听那雷声！妈妈，我有点害怕。'],
  ['w', '对话第2轮'],
  ['w', '🧒 角色 B：Don\'t be afraid! I\'m right here with you.'],
  ['w', '别害怕！妈妈一直在这儿陪着你呢。'],
  ['s', 'Don\'t be afraid! I\'m right here with you.', '别害怕！妈妈一直在这儿陪着你呢。'],
  ['w', '对话第3轮'],
  ['w', '👩 角色 A：Thank you. I\'ll have a rest.'],
  ['w', '谢谢，我会休息。'],
  ['s', 'Thank you. I\'ll have a rest.', '谢谢，我会休息。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 看病与身体不适 · Don\'t be afraid! I\'m here with you.', items: ITEMS, acts: ACTS }); }
