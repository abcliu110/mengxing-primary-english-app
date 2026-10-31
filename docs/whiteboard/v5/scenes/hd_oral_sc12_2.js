// 💬 日常用语 · 看病与身体不适 · Take some medicine and drink warm water. —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc12.js 案例 2；对照清单 lab/INVENTORY_HD_ORAL_SC12_2_V5.md
// 角色关键帧：sprites/hdo12_2.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo12_2.js';
const ACTS = {"*": ["l_plaster", "l_speak", "l_breath"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '看病与身体不适'],
  ['w', '核心交际句：Take some medicine and drink warm water. （吃点药，多喝温水。（医嘱与健康建议必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 考场防错金律：“吃药”在英语里必须说 take medicine，千万别说 eat medicine！'],
  ['w', '对话第1轮'],
  ['w', '👩‍⚕️ 角色 A：You have a cold. Take some medicine, drink warm water and have a good rest!'],
  ['w', '你感冒了。吃点药、多喝温水，再好好休息一下！'],
  ['s', 'You have a cold. Take some medicine, drink warm water and have a good rest!', '你感冒了。吃点药、多喝温水，再好好休息一下！'],
  ['w', '对话第2轮'],
  ['w', '👧 角色 B：OK, I will. Thank you very much, Doctor!'],
  ['w', '好的，我会的。非常感谢您，医生！'],
  ['s', 'OK, I will. Thank you very much, Doctor!', '好的，我会的。非常感谢您，医生！'],
  ['w', '对话第3轮'],
  ['w', '👩‍⚕️ 角色 A：Thank you. I\'ll have a rest.'],
  ['w', '谢谢，我会休息。'],
  ['s', 'Thank you. I\'ll have a rest.', '谢谢，我会休息。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 看病与身体不适 · Take some medicine and drink warm water.', items: ITEMS, acts: ACTS }); }
