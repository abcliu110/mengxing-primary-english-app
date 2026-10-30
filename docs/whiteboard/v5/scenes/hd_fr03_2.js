// 🧭 位移方向小剧场 · 视角 2 go & take (离开说话人) —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr03.js 案例 2；对照清单 lab/INVENTORY_HD_FR03_2_V5.md
// 角色关键帧：sprites/fr03_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr03_2.js';
const ACTS = {"*": ["l_goout"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🧭 位移方向小剧场 (Directed Motion) — 同一客观事件，切换主语视角即切换动词 (go & take (离开说话人))'],
  ['w', '当前视角流向：从说话人这里 ➔ 去往远方 ｜ 句法结构公式：go there / take sth there'],
  ['w', '🎬 视角 2 动态角色流向图：go & take (离开说话人)'],
  ['w', '⚡ go & take (离开说话人)'],
  ['w', '👦 小明 & 📓 作业本 ⬅️'],
  ['w', '🗣️ Go to the playground and take the ball with you.'],
  ['w', '去操场吧，把球随身带走。 （句型公式：go there / take sth there）'],
  ['w', '视角 2·第1幕'],
  ['s', 'Go to the playground and take the ball with you.', '去操场吧，把球随身带走。 ｜ go there / take sth there']
];
export default function build() { return autoBuild(SP, { title: '🧭 位移方向小剧场 · 视角 2 go & take (离开说话人)', items: ITEMS, acts: ACTS }); }
