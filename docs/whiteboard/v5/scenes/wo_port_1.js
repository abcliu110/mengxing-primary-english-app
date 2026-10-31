// 📖 单词身世 · port · 1 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：本幕只留第 1 节（共 5 节，其余在 scenes/wo_port_p2_1.js … 由 v5/split_auto.py 生成）
// 内容来源（R1 零丢失）：src/cases/wo_port.js 案例 1；对照清单 lab/INVENTORY_WO_PORT_1_V5.md
// 角色关键帧：sprites/wop1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wop1.js';
const ACTS = {"takes": ["ship"], "carry": ["porter"], "import": ["porter"], "export": ["porter"], "transport": ["porter"], "report": ["l_report"], "reports": ["l_report"], "pass": ["l_passport"], "take": ["ship"], "hold": ["l_lift1"], "support": ["dad_strong"]};
const ITEMS = [
  ['n', '这一幕：一个小小的 port（港口），怎么长出一整家单词？'],
  ['p', 'port'],
  ['w', 'port 港口'],
  ['w', '单词身世 · 欧洲文化密码'],
  ['w', '📜 真实词源'],
  ['w', '💡 记忆联想'],
  ['w', 'port 港口'],
  ['w', '单词身世 · 欧洲文化密码'],
  ['w', '📜 真实词源'],
  ['m', '💡 记忆联想'],
  ['m', '① 地图'],
  ['m', '② 场景'],
  ['m', '③ 词族'],
  ['m', '④ 彩蛋'],
  ['m', '⑤ 中文'],
  ['m', '🔮 预测'],
  ['n', '可信度徽章：📜 = 查得到出处的真实词源；💡 = 帮你记的联想画面，不是历史。'],
  ['n', '地图：这是欧洲、非洲、亚洲三块大陆，中间围着一片海。'],
  ['m', '欧洲'],
  ['m', '非洲'],
  ['m', '亚洲'],
  ['m', '地中海'],
  ['n', '三块大陆一起往中间靠：这片海被陆地包在中间。'],
  ['n', '罗马：罗马城就在地中海边，罗马人靠船把四周连在一起。'],
  ['w', '罗马 Rome'],
  ['s', 'Rome is an old city in Italy.', '罗马是意大利的一座古城。', 'Rome'],
  ['w', 'Mediterranean'],
  ['n', '拆开看：Mediterranean = medi（中间）+ terra（陆地）。'],
  ['w', 'terra'],
  ['w', 'medi'],
  ['m', '中间'],
  ['m', '陆地'],
  ['w', '= 陆地中间的海'],
  ['w', '📜 真实词源'],
  ['w', '彩蛋词：知道就好，不用背'],
  ['s', 'Medi means middle, and terra means land.', 'medi 是「中间」，terra 是「陆地」。', 'medi terra'],
  ['s', 'The Mediterranean Sea is in the middle of the land.', '地中海在陆地的中间。', 'Mediterranean'],
];
export default function build() { return autoBuild(SP, { title: '📖 单词身世 · port · 1', items: ITEMS, acts: ACTS }); }
