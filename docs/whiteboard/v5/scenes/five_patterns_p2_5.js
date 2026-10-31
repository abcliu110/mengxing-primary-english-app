// 🧱 五大基本句型 · ⑤ SVOC 魔法赋能型 · 第 2 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 five_patterns_5（249 s）的第 2 节（共 3 节，由 v5/split_auto.py 生成；App 白板下「第 2 节」按钮）
// 内容来源（R1 零丢失）：src/cases/five_patterns.js 案例 5；对照清单 lab/INVENTORY_FIVE_PATTERNS_5_V5.md
// 角色关键帧：sprites/fpat5.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fpat5.js';
const ACTS = {"reading": ["m_aloud"], "read": ["m_aloud"], "play": ["kick0", "kick1", "kick2"], "go": ["l_w0", "l_w1", "l_w2"], "laugh": ["l_laugh"]};
const ITEMS = [
  ['n', '形容词作宾补：make / keep + 宾语 + 形容词，不能写成 -ly 的 happily。'],
  ['w', 'makes me happily'],
  ['s', 'Happily, ly. They play happily.', '快乐地（-ly 副词）。他们玩得很开心。', 'happily ly'],
  ['n', '使役动词：make、let、have，意思是「让某人做某事」。后面的动词要脱掉 to。'],
  ['w', 'Our teacher asks us to read aloud, and she lets us play games!'],
  ['s', 'Our teacher asks us to read aloud, and she lets us play games!', '老师让我们大声朗读，还让我们玩游戏！'],
  ['w', 'V'],
  ['w', 'O'],
  ['w', 'OC'],
  ['w', 'V'],
  ['w', 'O'],
  ['w', 'OC'],
  ['s', 'Our teacher asks us to read aloud, and she lets us play games!', '老师让我们大声朗读，还让我们玩游戏！', 'Our teacher asks to read aloud she lets play games ask us to read'],
  ['n', '动词原形：动词本来的样子，不加 to、-s、-ed、-ing，比如 play、laugh。'],
  ['s', 'Played, playing. Ed, ing.', '玩了、正在玩。-ed、-ing。', 'ed ing'],
];
export default function build() { return autoBuild(SP, { title: '🧱 五大基本句型 · ⑤ SVOC 魔法赋能型 · 第 2 节', items: ITEMS, acts: ACTS }); }
