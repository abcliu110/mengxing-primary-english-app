// 🔨 动作改变与工具小剧场 · 视角 1 cut / clean / open / break + Patient + with Instrument —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_fr06.js 案例 1；对照清单 lab/INVENTORY_HD_FR06_1_V5.md
// 角色关键帧：sprites/fr06_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fr06_1.js';
const ACTS = {"*": ["l_point"]};
const ITEMS = [
  ['w', '框架语义学原理'],
  ['w', '🔨 动作改变与工具小剧场 (Cause Change & Instrument) — 同一客观事件，切换主语视角即切换动词 (cut / clean / open / break + Patient + with Instrument)'],
  ['w', '当前视角流向：谁 + 改变了什么 + 用什么工具 (with) ｜ 句法结构公式：Agent + V + Patient + with + Instrument'],
  ['w', '🎬 视角 1 动态角色流向图：cut / clean / open / break + Patient + with Instrument'],
  ['w', '⚡ cut / clean / open / break + Patient + with Instrument'],
  ['w', '🔪 水果刀 (with a knife) ➡️'],
  ['w', '🗣️ The cook cuts the apple with a knife.'],
  ['w', '厨师用刀切开苹果。（注意英语把“用刀 with a knife”放在句尾！） （句型公式：Agent + V + Patient + with + Instrument）'],
  ['w', '视角 1·第1幕'],
  ['s', 'The cook cuts the apple with a knife.', '厨师用刀切开苹果。（注意英语把“用刀 with a knife”放在句尾！） ｜ Agent + V + Patient + with + Instrument']
];
export default function build() { return autoBuild(SP, { title: '🔨 动作改变与工具小剧场 · 视角 1 cut / clean / open / break + Patient + with Instrument', items: ITEMS, acts: ACTS }); }
