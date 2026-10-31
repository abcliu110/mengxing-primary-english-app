// 🧱 五大基本句型 · ② SVP 状态天平型 · 第 2 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 five_patterns_2（217 s）的第 2 节（共 3 节，由 v5/split_auto.py 生成；App 白板下「第 2 节」按钮）
// 内容来源（R1 零丢失）：src/cases/five_patterns.js 案例 2；对照清单 lab/INVENTORY_FIVE_PATTERNS_2_V5.md
// 角色关键帧：sprites/fpat2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fpat2.js';
const ACTS = {"smells": ["m_smell"]};
const ITEMS = [
  ['n', '感官系动词：看、听、闻、尝、摸五种感觉：look、sound、smell、taste、feel。'],
  ['w', '感官：look · sound · smell · taste · feel'],
  ['s', 'Look, sound, smell, taste, feel. You look happy. I feel good.', '看、听、闻、尝、摸。你看起来很开心。我感觉很好。', 'look sound smell taste feel'],
  ['n', '变化系动词：get、turn、become，意思都是「变得」。'],
  ['w', '变化：get · turn · become'],
  ['s', 'Get, turn, become. He becomes tall.', '变得。他长高了。', 'get turn become'],
  ['n', '看金句：sounds、tastes 是等号，后面 great、sweet 都是形容词。'],
  ['w', 'That idea sounds great! The cake tastes sweet.'],
  ['s', 'That idea sounds great! The cake tastes sweet.', '这个主意听起来很棒！蛋糕尝起来很甜。'],
  ['w', 'S'],
  ['w', 'V'],
  ['w', 'P'],
  ['w', 'S'],
  ['w', 'V'],
  ['w', 'P'],
  ['s', 'That idea sounds great! The cake tastes sweet.', '这个主意听起来很棒！蛋糕尝起来很甜。', 'That idea sounds great cake tastes sweet'],
  ['n', '副词：-ly 结尾的词修饰动作，比如 sweetly（甜甜地）。系动词后面不能用它！'],
  ['w', 'tastes sweetly'],
  ['s', 'Sweetly, ly. She sings sweetly.', '甜甜地（-ly 副词）。她唱得很甜。', 'sweetly ly'],
  ['w', '铁律：系动词 + 形容词（对）    系动词 + -ly 副词（错）'],
];
export default function build() { return autoBuild(SP, { title: '🧱 五大基本句型 · ② SVP 状态天平型 · 第 2 节', items: ITEMS, acts: ACTS }); }
