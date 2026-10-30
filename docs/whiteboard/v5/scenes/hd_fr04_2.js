// 🧥 穿戴变化小剧场 · 视角 2 wear (穿着/戴着的持续状态) —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr04.js 案例 2；对照清单 lab/INVENTORY_HD_FR04_2_V5.md
// 角色关键帧：sprites/fr04_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr04_2.js';
const ACTS = {"*": ["mom_dress"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🧥 穿戴变化小剧场 (Wearing & Dressing) — 同一客观事件，切换主语视角即切换动词 (wear (穿着/戴着的持续状态))'],
  ['w', '当前视角流向：衣物已经穿戴在身上（持续一整天） ｜ 句法结构公式：Wearer + wear + Clothing'],
  ['w', '🎬 视角 2 动态角色流向图：wear (穿着/戴着的持续状态)'],
  ['w', '⚡ wear (穿着/戴着的持续状态)'],
  ['w', 'wear (穿着/戴着的持续状态) ⬅️'],
  ['w', '🗣️ Lily is wearing a red coat and glasses today.'],
  ['w', '莉莉今天穿着一件红大衣、戴着眼镜。 （句型公式：Wearer + wear + Clothing）'],
  ['w', '视角 2·第1幕'],
  ['s', 'Lily is wearing a red coat and glasses today.', '莉莉今天穿着一件红大衣、戴着眼镜。 ｜ Wearer + wear + Clothing']
];
export default function build() { return autoBuild(SP, { title: '🧥 穿戴变化小剧场 · 视角 2 wear (穿着/戴着的持续状态)', items: ITEMS, acts: ACTS }); }
