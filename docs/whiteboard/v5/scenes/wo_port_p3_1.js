// 📖 单词身世 · port · 1 · 第 3 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 wo_port_1（361 s）的第 3 节（共 5 节，由 v5/split_auto.py 生成；App 白板下「第 3 节」按钮）
// 内容来源（R1 零丢失）：src/cases/wo_port.js 案例 1；对照清单 lab/INVENTORY_WO_PORT_1_V5.md
// 角色关键帧：sprites/wop1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wop1.js';
const ACTS = {"takes": ["ship"], "carry": ["porter"], "import": ["porter"], "export": ["porter"], "transport": ["porter"], "report": ["l_report"], "reports": ["l_report"], "pass": ["l_passport"], "take": ["ship"], "hold": ["l_lift1"], "support": ["dad_strong"]};
const ITEMS = [
  ['n', 'ex- 出：货箱从城里搬出去、装上船 → export（出口）。'],
  ['w', 'port'],
  ['w', 'ex'],
  ['w', '= export 出口'],
  ['s', 'Export means to carry things out.', 'export = 把东西搬出去。', 'ex'],
  ['s', 'We import fruit and export tea.', '我们进口水果，出口茶叶。', 'import export'],
  ['n', 'trans- 穿过：船穿过大海，把货运到别的港口 → transport（运输）。'],
  ['w', 'port'],
  ['w', 'trans'],
  ['w', '= transport 运输'],
  ['s', 'Transport means to carry things across.', 'transport = 把东西运过去。', 'trans'],
  ['s', 'Ships transport food across the sea.', '船把食物运过大海。', 'transport'],
  ['n', 're- 回：别的港口发生了什么？把消息带回城里 → report（报告）。'],
  ['w', 'port'],
  ['w', 're'],
  ['w', '= report 报告'],
  ['s', 'Report means to carry news back.', 'report = 把消息带回来。', 're'],
  ['s', 'He reports the news to the city.', '他把消息报告给城里。', 'report'],
  ['n', '词根 port 一直不变，变的只是前面表示方向的小块。'],
  ['w', '词根不变，方向前缀一换，就是一个新词'],
  ['n', '关卡：旅客要从港口出入国境，得先拿文书给守卫看、盖个章。'],
  ['w', '港口关卡'],
  ['s', 'Show me your passport, please.', '请出示你的护照。', 'passport'],
];
export default function build() { return autoBuild(SP, { title: '📖 单词身世 · port · 1 · 第 3 节', items: ITEMS, acts: ACTS }); }
