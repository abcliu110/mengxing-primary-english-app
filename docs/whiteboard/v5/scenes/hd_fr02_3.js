// 🎁 给予传递小剧场 · 视角 3 buy / make / cook sth for sb —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr02.js 案例 3；对照清单 lab/INVENTORY_HD_FR02_3_V5.md
// 角色关键帧：sprites/fr02_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr02_3.js';
const ACTS = {"*": ["m_cake"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🎁 给予传递小剧场 (Giving & Transfer) — 同一客观事件，切换主语视角即切换动词 (buy / make / cook sth for sb)'],
  ['w', '当前视角流向：给予者 ➔ 物品 ➔ for 受益者（为了某人制作/购买用 for） ｜ 句法结构公式：Giver + V + Theme + for + Recipient'],
  ['w', '🎬 视角 3 动态角色流向图：buy / make / cook sth for sb'],
  ['w', '⚡ buy / make / cook sth for sb'],
  ['w', '👧 朵朵 (Duoduo) ➡️'],
  ['w', '🗣️ Mum makes a big cake for Duoduo.'],
  ['w', '妈妈为朵朵做了一个大蛋糕。 （句型公式：Giver + V + Theme + for + Recipient）'],
  ['w', '视角 3·第1幕'],
  ['s', 'Mum makes a big cake for Duoduo.', '妈妈为朵朵做了一个大蛋糕。 ｜ Giver + V + Theme + for + Recipient']
];
export default function build() { return autoBuild(SP, { title: '🎁 给予传递小剧场 · 视角 3 buy / make / cook sth for sb', items: ITEMS, acts: ACTS }); }
