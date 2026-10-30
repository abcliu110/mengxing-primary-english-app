// 👀 视听感知小剧场 · 视角 2 see / hear (感知结果) —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr05.js 案例 2；对照清单 lab/INVENTORY_HD_FR05_2_V5.md
// 角色关键帧：sprites/fr05_2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr05_2.js';
const ACTS = {"*": ["l_point"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '👀 视听感知小剧场 (Active Perception vs Result) — 同一客观事件，切换主语视角即切换动词 (see / hear (感知结果))'],
  ['w', '当前视角流向：画面进入眼睛 / 声音传入耳朵 ｜ 句法结构公式：see + 画面 / hear + 声音'],
  ['w', '🎬 视角 2 动态角色流向图：see / hear (感知结果)'],
  ['w', '⚡ see / hear (感知结果)'],
  ['w', 'see / hear (感知结果) ⬅️'],
  ['w', '🗣️ He sees a blue bird and hears a sweet song!'],
  ['w', '他看见了一只蓝鸟，听到了甜美的歌声！ （句型公式：see + 画面 / hear + 声音）'],
  ['w', '视角 2·第1幕'],
  ['s', 'He sees a blue bird and hears a sweet song!', '他看见了一只蓝鸟，听到了甜美的歌声！ ｜ see + 画面 / hear + 声音']
];
export default function build() { return autoBuild(SP, { title: '👀 视听感知小剧场 · 视角 2 see / hear (感知结果)', items: ITEMS, acts: ACTS }); }
