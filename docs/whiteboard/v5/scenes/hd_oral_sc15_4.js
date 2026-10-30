// 💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Turn on the light, please. —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc15.js 案例 4；对照清单 lab/INVENTORY_HD_ORAL_SC15_4_V5.md
// 角色关键帧：sprites/hdo15_4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo15_4.js';
const ACTS = {"*": ["m_tv", "l_put", "l_speak"]};
const ITEMS = [
  ['w', '居家与家务'],
  ['w', '核心交际句：Turn on the light, please. （请把灯打开。（家电开关必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 考场头号防坑：开灯、开电视、开风扇（凡是带电开关）必须用 Turn on / Turn off，绝不用 Open / Close！'],
  ['w', '对话第1轮'],
  ['w', '👨 角色 A：It\'s getting dark. Turn on the light, please.'],
  ['w', '天变黑了。请把电灯打开吧。'],
  ['s', 'It\'s getting dark. Turn on the light, please.', '天变黑了。请把电灯打开吧。'],
  ['w', '对话第2轮'],
  ['w', '👦 角色 B：OK, Dad! Now the study is bright.'],
  ['w', '好的，爸爸！现在书房亮堂堂的了。'],
  ['s', 'OK, Dad! Now the study is bright.', '好的，爸爸！现在书房亮堂堂的了。'],
  ['w', '对话第3轮'],
  ['w', '👨 角色 A：OK. I will.'],
  ['w', '好的，我会的。'],
  ['s', 'OK. I will.', '好的，我会的。']
];
export default function build() { return autoBuild(SP, { title: '💬 R1 零丢失）：日常用语小剧场 `hd_oral_sc15`（居家与家务 · Turn on the light, please.', items: ITEMS, acts: ACTS }); }
