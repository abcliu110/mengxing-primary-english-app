// 👀 视听感知小剧场 · 视角 1 look at / listen to (主动感知动作) —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr05.js 案例 1；对照清单 lab/INVENTORY_HD_FR05_1_V5.md
// 角色关键帧：sprites/fr05_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr05_1.js';
const ACTS = {"*": ["l_lookup", "l_ear"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '👀 视听感知小剧场 (Active Perception vs Result) — 同一客观事件，切换主语视角即切换动词 (look at / listen to (主动感知动作))'],
  ['w', '当前视角流向：转动眼睛/竖起耳朵去寻找（未必看到/听到） ｜ 句法结构公式：look at + 目标 / listen to + 声源'],
  ['w', '🎬 视角 1 动态角色流向图：look at / listen to (主动感知动作)'],
  ['w', '⚡ look at / listen to (主动感知动作)'],
  ['w', 'look at / listen to (主动感知动作) ➡️'],
  ['w', '🗣️ Mike looks at the tree and listens to the bird.'],
  ['w', '迈克看着大树，倾听小鸟唱歌。 （句型公式：look at + 目标 / listen to + 声源）'],
  ['w', '视角 1·第1幕'],
  ['s', 'Mike looks at the tree and listens to the bird.', '迈克看着大树，倾听小鸟唱歌。 ｜ look at + 目标 / listen to + 声源']
];
export default function build() { return autoBuild(SP, { title: '👀 视听感知小剧场 · 视角 1 look at / listen to (主动感知动作)', items: ITEMS, acts: ACTS }); }
