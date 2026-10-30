// 🧥 穿戴变化小剧场 · 视角 3 take off (脱下的瞬间动作) —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr04.js 案例 3；对照清单 lab/INVENTORY_HD_FR04_3_V5.md
// 角色关键帧：sprites/fr04_3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr04_3.js';
const ACTS = {"*": ["l_coff0", "l_coff1", "l_coff2"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🧥 穿戴变化小剧场 (Wearing & Dressing) — 同一客观事件，切换主语视角即切换动词 (take off (脱下的瞬间动作))'],
  ['w', '当前视角流向：从身上 ➔ 脱下来（put on 的反义词） ｜ 句法结构公式：Wearer + take off + Clothing'],
  ['w', '🎬 视角 3 动态角色流向图：take off (脱下的瞬间动作)'],
  ['w', '⚡ take off (脱下的瞬间动作)'],
  ['w', 'take off (脱下的瞬间动作) ➡️'],
  ['w', '🗣️ It\'s warm in the room. Take off your coat.'],
  ['w', '屋里很暖和，把外套脱了吧。 （句型公式：Wearer + take off + Clothing）'],
  ['w', '视角 3·第1幕'],
  ['s', 'It\'s warm in the room. Take off your coat.', '屋里很暖和，把外套脱了吧。 ｜ Wearer + take off + Clothing']
];
export default function build() { return autoBuild(SP, { title: '🧥 穿戴变化小剧场 · 视角 3 take off (脱下的瞬间动作)', items: ITEMS, acts: ACTS }); }
