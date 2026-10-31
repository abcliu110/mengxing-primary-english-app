// 📖 单词身世 · port · 1 · 第 5 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 wo_port_1（361 s）的第 5 节（共 5 节，由 v5/split_auto.py 生成；App 白板下「第 5 节」按钮）
// 内容来源（R1 零丢失）：src/cases/wo_port.js 案例 1；对照清单 lab/INVENTORY_WO_PORT_1_V5.md
// 角色关键帧：sprites/wop1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wop1.js';
const ACTS = {"takes": ["ship"], "carry": ["porter"], "import": ["porter"], "export": ["porter"], "transport": ["porter"], "report": ["l_report"], "reports": ["l_report"], "pass": ["l_passport"], "take": ["ship"], "hold": ["l_lift1"], "support": ["dad_strong"]};
const ITEMS = [
  ['n', '亲戚词：portus 和 portare 是同一个古老词根长出的亲戚，不是同一个词。'],
  ['w', '💡 记忆联想'],
  ['w', '两条线是亲戚（同一个古老词根），不是同一个词；动画用港口场景把它们串起来记'],
  ['n', '中文对照：中文也用一个「口」字串起来：港口、进口、出口、口岸。'],
  ['w', '🀄 中文也用一个「口」串起来：港口 · 进口 · 出口 · 口岸'],
  ['w', '（这是对照，不是同源）'],
  ['s', 'A port is a door to the world.', '港口是通向世界的大门。', 'port'],
  ['n', '预测：考考你：sup（从下面）+ port（扛、搬）= ？先想 3 秒！'],
  ['w', '🔮 sup（从下面）+ port（扛、搬）='],
  ['w', '？'],
  ['n', '揭晓：support = 从下面把东西托住 → 支持。'],
  ['w', 'support 支持'],
  ['w', 'sup + port = support 支持 ✔'],
  ['w', '从下面托住 → 支持、帮助'],
  ['w', '📜 真实词源'],
  ['s', 'Support means to hold something up from below.', 'support = 从下面把东西托住。', 'sup'],
  ['s', 'My friends support me.', '我的朋友们支持我。', 'support'],
  ['n', '口诀：港口一扇门，进出穿回都靠 port；sup 托住就是 support！'],
  ['w', '💡 一句话洞见'],
  ['w', '港口是罗马世界的大门：'],
  ['w', '一个 port，长出了进、出、穿越、带回、机会。'],
  ['w', '🎵 口诀'],
  ['w', '港口一扇门，进出穿回都靠 port；sup 托住就是 support！'],
  ['w', '📖 单词身世 · port 港口']
];
export default function build() { return autoBuild(SP, { title: '📖 单词身世 · port · 1 · 第 5 节', items: ITEMS, acts: ACTS }); }
