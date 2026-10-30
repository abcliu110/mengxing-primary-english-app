// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Wash your hands before meals! —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc15.js 案例 6；对照清单 lab/INVENTORY_HD_ORAL_SC15_6_V5.md
// 角色关键帧：sprites/hdo15_6.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo15_6.js';
const ACTS = {"*": ["m_tv", "l_put", "l_speak"]};
const ITEMS = [
  ['w', '居家与家务'],
  ['w', '核心交际句：Wash your hands before meals! （饭前要洗手！（卫生好习惯））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 时间先后介词对：before meals (饭前) ↔ after school (放学后)'],
  ['w', '对话第1轮'],
  ['w', '👩 角色 A：Dinner is ready! Wash your hands before meals, Sam.'],
  ['w', '晚饭好啦！山姆，饭前要先洗手哦。'],
  ['s', 'Dinner is ready! Wash your hands before meals, Sam.', '晚饭好啦！山姆，饭前要先洗手哦。'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：Look, Mum! My hands are clean now!'],
  ['w', '看，妈妈！我的双手现在洗干净啦！'],
  ['s', 'Look, Mum! My hands are clean now!', '看，妈妈！我的双手现在洗干净啦！'],
  ['w', '对话第3轮'],
  ['w', '👩 角色 A：OK. I will.'],
  ['w', '好的，我会的。'],
  ['s', 'OK. I will.', '好的，我会的。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Wash your hands before meals!', items: ITEMS, acts: ACTS }); }
