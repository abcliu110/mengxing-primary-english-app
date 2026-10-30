// 🎁 给予传递小剧场 · 视角 1 give / send / pass / show sb sth —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr02.js 案例 1；对照清单 lab/INVENTORY_HD_FR02_1_V5.md
// 角色关键帧：sprites/fr02_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr02_1.js';
const ACTS = {"*": ["mom_gift"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🎁 给予传递小剧场 (Giving & Transfer) — 同一客观事件，切换主语视角即切换动词 (give / send / pass / show sb sth)'],
  ['w', '当前视角流向：给予者 ➔ 接收者 ➔ 物品（人在前不加介词） ｜ 句法结构公式：Giver + V + Recipient + Theme'],
  ['w', '🎬 视角 1 动态角色流向图：give / send / pass / show sb sth'],
  ['w', '⚡ give / send / pass / show sb sth'],
  ['w', '👧 朵朵 (Duoduo) ➡️'],
  ['w', '🗣️ Mum gives Duoduo a birthday gift.'],
  ['w', '妈妈给朵朵一份生日礼物。 （句型公式：Giver + V + Recipient + Theme）'],
  ['w', '视角 1·第1幕'],
  ['s', 'Mum gives Duoduo a birthday gift.', '妈妈给朵朵一份生日礼物。 ｜ Giver + V + Recipient + Theme']
];
export default function build() { return autoBuild(SP, { title: '🎁 给予传递小剧场 · 视角 1 give / send / pass / show sb sth', items: ITEMS, acts: ACTS }); }
