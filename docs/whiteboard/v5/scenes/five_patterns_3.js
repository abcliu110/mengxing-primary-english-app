// 🧱 五大基本句型 · ③ SVO 一箭穿心型 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：本幕只留第 1 节（共 3 节，其余在 scenes/five_patterns_p2_3.js … 由 v5/split_auto.py 生成）
// 内容来源（R1 零丢失）：src/cases/five_patterns.js 案例 3；对照清单 lab/INVENTORY_FIVE_PATTERNS_3_V5.md
// 角色关键帧：sprites/fpat3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fpat3.js';
const ACTS = {"reading": ["l_read"], "planted": ["plant"], "go": ["l_w0", "l_w1", "l_w2"], "read": ["l_read"]};
const ITEMS = [
  ['n', '句型 ③：最常见的句型！动作像射出去的箭，一定要射中一个目标。'],
  ['w', '句型 ③ SVO'],
  ['w', '一箭穿心型 · 动作击中靶心'],
  ['w', '💡 记忆联想'],
  ['w', '✂️ 简化说法'],
  ['w', '句型 ③ SVO'],
  ['w', '一箭穿心型 · 动作击中靶心'],
  ['w', '💡 记忆联想'],
  ['m', '✂️ 简化说法'],
  ['m', '① 骨架'],
  ['m', '② 射箭'],
  ['m', '③ 金句'],
  ['m', '④ 画蛇添足'],
  ['m', '⑤ 穿制服·公式'],
  ['m', '🔮 预测'],
  ['n', '主语 S：Leo，射箭的人。'],
  ['w', 'S 主语'],
  ['m', '射箭的人'],
  ['m', 'Leo'],
  ['n', '及物动词 Vt：动作要落到对象身上，后面必须接宾语。英语里约 80% 的动词都是它。'],
  ['m', '+'],
  ['m', 'V 及物谓语'],
  ['w', '弓箭'],
  ['w', 'loves / enjoys'],
  ['n', '宾语靶心 O：箭射中的目标，也就是动作的对象：reading English books。'],
  ['w', 'O 宾语靶心'],
  ['w', '被射中的靶心'],
  ['w', 'reading English books'],
  ['n', '箭从 loves 出发，直接射中宾语 reading English books。'],
  ['s', 'Leo loves reading English books. He enjoys stories.', '里奥喜欢读英文书。他喜欢故事。', 'Leo loves enjoys reading English books stories'],
];
export default function build() { return autoBuild(SP, { title: '🧱 五大基本句型 · ③ SVO 一箭穿心型', items: ITEMS, acts: ACTS }); }
