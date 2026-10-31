// 📖 单词身世 · port · 1 · 第 4 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 wo_port_1（361 s）的第 4 节（共 5 节，由 v5/split_auto.py 生成；App 白板下「第 4 节」按钮）
// 内容来源（R1 零丢失）：src/cases/wo_port.js 案例 1；对照清单 lab/INVENTORY_WO_PORT_1_V5.md
// 角色关键帧：sprites/wop1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wop1.js';
const ACTS = {"takes": ["ship"], "carry": ["porter"], "import": ["porter"], "export": ["porter"], "transport": ["porter"], "report": ["l_report"], "reports": ["l_report"], "pass": ["l_passport"], "take": ["ship"], "hold": ["l_lift1"], "support": ["dad_strong"]};
const ITEMS = [
  ['n', '盖章：啪！章盖上了：可以通过港口了。'],
  ['s', 'OK! You can pass now.', '好了！你现在可以通过了。', 'OK pass'],
  ['n', 'pass + port：pass（通过）+ port（港口）= 通过港口的许可 → passport（护照）。'],
  ['w', 'port'],
  ['w', 'pass'],
  ['w', '= passport 护照'],
  ['w', '通过港口、出入国境的许可'],
  ['w', '📜 真实词源'],
  ['n', '穿越：镜头拉近：古代的海港，一艘帆船靠岸。'],
  ['w', '古代：港口'],
  ['w', '今天：机场'],
  ['n', '变身：帆船变成飞机，海港变成机场：古今是同一个道理。'],
  ['n', 'air + port：air（空中）+ port（港口）= 空中的港口 → airport（机场）。'],
  ['w', 'port'],
  ['w', 'air'],
  ['w', '= airport 机场（空中的港口）'],
  ['w', '📜 真实词源'],
  ['s', 'Birds fly in the air.', '鸟儿在空中飞。', 'air'],
  ['s', 'We take a plane at the airport.', '我们在机场坐飞机。', 'airport'],
  ['n', '总结：港口是罗马世界的大门；一个 port 长出了进、出、穿越、带回、机会。'],
  ['w', 'port'],
  ['w', '港口线：portus（港口）'],
  ['w', '📜 真实词源'],
  ['w', 'port 港口 · airport 机场'],
  ['w', 'passport 护照'],
  ['w', 'opportunity 机会'],
  ['w', '搬运线：portare（搬运）'],
  ['w', '📜 真实词源'],
  ['w', 'import 进口 · export 出口'],
  ['w', 'transport 运输 · report 报告'],
  ['w', 'sup + port = ？（考考你）'],
];
export default function build() { return autoBuild(SP, { title: '📖 单词身世 · port · 1 · 第 4 节', items: ITEMS, acts: ACTS }); }
