// 🧱 五大基本句型 · ② SVP 状态天平型 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：本幕只留第 1 节（共 3 节，其余在 scenes/five_patterns_p2_2.js … 由 v5/split_auto.py 生成）
// 内容来源（R1 零丢失）：src/cases/five_patterns.js 案例 2；对照清单 lab/INVENTORY_FIVE_PATTERNS_2_V5.md
// 角色关键帧：sprites/fpat2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fpat2.js';
const ACTS = {"smells": ["m_smell"]};
const ITEMS = [
  ['n', '句型 ②：有一种动词不是动作，而像数学里的等号「=」。'],
  ['w', '句型 ② SVP'],
  ['w', '状态天平型 · 绝不用副词'],
  ['w', '💡 记忆联想'],
  ['w', '句型 ② SVP'],
  ['w', '状态天平型 · 绝不用副词'],
  ['m', '💡 记忆联想'],
  ['m', '① 骨架'],
  ['m', '② 天平'],
  ['m', '③ 金句'],
  ['m', '④ 避坑'],
  ['m', '⑤ 变化·公式'],
  ['m', '🔮 预测'],
  ['n', '主语 S：The chicken soup（鸡汤），这句话在说它。'],
  ['w', 'S 主语'],
  ['w', 'The chicken soup'],
  ['n', '系动词：不表示动作，像一座「等号桥」，把后面的状态交给主语。'],
  ['m', '+'],
  ['m', 'V 感官系动词 ='],
  ['w', 'smells / tastes'],
  ['n', '表语 P：系动词后面的部分，说主语「是什么、怎么样」，常用形容词。'],
  ['w', '+'],
  ['w', 'P 形容词表语'],
  ['w', 'so delicious!'],
  ['n', '形容词：描述样子、味道、心情的词，比如 delicious（美味的）、sweet（甜的）。'],
  ['s', 'The chicken soup smells so delicious.', '鸡汤闻起来太香了。', 'The chicken soup smells so delicious'],
  ['n', '状态天平：系动词两边一样重：鸡汤 = 很好吃，说的是同一个东西。'],
  ['w', '鸡汤 = 很好吃（两边平衡）'],
];
export default function build() { return autoBuild(SP, { title: '🧱 五大基本句型 · ② SVP 状态天平型', items: ITEMS, acts: ACTS }); }
