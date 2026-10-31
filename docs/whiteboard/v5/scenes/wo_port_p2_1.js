// 📖 单词身世 · port · 1 · 第 2 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 wo_port_1（361 s）的第 2 节（共 5 节，由 v5/split_auto.py 生成；App 白板下「第 2 节」按钮）
// 内容来源（R1 零丢失）：src/cases/wo_port.js 案例 1；对照清单 lab/INVENTORY_WO_PORT_1_V5.md
// 角色关键帧：sprites/wop1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wop1.js';
const ACTS = {"takes": ["ship"], "carry": ["porter"], "import": ["porter"], "export": ["porter"], "transport": ["porter"], "report": ["l_report"], "reports": ["l_report"], "pass": ["l_passport"], "take": ["ship"], "hold": ["l_lift1"], "support": ["dad_strong"]};
const ITEMS = [
  ['n', '四周都是陆地，船从哪儿都能到 → 港口就特别重要。'],
  ['w', '四周都是陆地 → 船来船往 → 港口最重要'],
  ['n', '场景：一艘罗马商船在海上，岸边是港口小城。'],
  ['w', '港口小城'],
  ['m', 'port'],
  ['m', '港口'],
  ['n', '风：顺风从后面推着船，一路把船吹进港口。'],
  ['s', 'The wind takes the ship into the port.', '风把船送进港口。', 'port'],
  ['n', '机会：拉丁语 ob portum = 「朝着港口（吹）」——顺风进港，就是好时机。'],
  ['w', 'port'],
  ['w', 'ob'],
  ['w', '= opportunity'],
  ['w', '原来指「朝着港口吹的顺风」→ 好时机、机会'],
  ['w', '📜 真实词源'],
  ['s', 'Ob portum means toward the port.', 'ob portum（拉丁语）= 朝着港口。', 'ob portum'],
  ['s', 'This is a good opportunity.', '这是一个好机会。', 'opportunity'],
  ['n', '搬运：港口天天在搬货。拉丁语 portare = 搬运，和 portus（港口）是亲戚。'],
  ['w', '城里'],
  ['w', '别的港口'],
  ['w', '拉丁语 portare = 搬运'],
  ['w', '📜 真实词源'],
  ['s', 'Portus means port, and portare means carry.', 'portus = 港口，portare = 搬运（拉丁语）。', 'portus portare'],
  ['n', 'im- 进：货箱从船上搬进城里 → import（进口）。'],
  ['w', 'port'],
  ['w', 'im'],
  ['w', '= import 进口'],
  ['s', 'Import means to carry things in.', 'import = 把东西搬进来。', 'im'],
];
export default function build() { return autoBuild(SP, { title: '📖 单词身世 · port · 1 · 第 2 节', items: ITEMS, acts: ACTS }); }
