// 🎁 给予传递小剧场 · 视角 2 give / send / pass / show sth to sb —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr02.js 案例 2；对照清单 lab/INVENTORY_HD_FR02_2_V5.md
// 角色关键帧：sprites/fr02_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr02_2.js';
const ACTS = {"*": ["m_pass"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🎁 给予传递小剧场 (Giving & Transfer) — 同一客观事件，切换主语视角即切换动词 (give / send / pass / show sth to sb)'],
  ['w', '当前视角流向：给予者 ➔ 物品 ➔ to 接收者（物在前加方向箭头 to） ｜ 句法结构公式：Giver + V + Theme + to + Recipient'],
  ['w', '🎬 视角 2 动态角色流向图：give / send / pass / show sth to sb'],
  ['w', '⚡ give / send / pass / show sth to sb'],
  ['w', '👧 朵朵 (Duoduo) ⬅️'],
  ['w', '🗣️ Mum gives a birthday gift to Duoduo.'],
  ['w', '妈妈把一份生日礼物递给朵朵。 （句型公式：Giver + V + Theme + to + Recipient）'],
  ['w', '视角 2·第1幕'],
  ['s', 'Mum gives a birthday gift to Duoduo.', '妈妈把一份生日礼物递给朵朵。 ｜ Giver + V + Theme + to + Recipient']
];
export default function build() { return autoBuild(SP, { title: '🎁 给予传递小剧场 · 视角 2 give / send / pass / show sth to sb', items: ITEMS, acts: ACTS }); }
