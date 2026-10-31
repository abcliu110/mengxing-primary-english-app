// 📖 单词身世 · 时间与数字 · 1 · 第 2 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 wo_time_num_1（256 s）的第 2 节（共 3 节，由 v5/split_auto.py 生成；App 白板下「第 2 节」按钮）
// 内容来源（R1 零丢失）：src/cases/wo_time_num.js 案例 1；对照清单 lab/INVENTORY_WO_TIME_NUM_1_V5.md
// 角色关键帧：sprites/won1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/won1.js';
const ACTS = {"carries": ["m_eggs"]};
const ITEMS = [
  ['n', '十几：从 13 开始换了办法：thirteen = three（三）+ teen（十），一直到 nineteen。'],
  ['m', '13'],
  ['m', 'thirteen'],
  ['w', '= three + ten'],
  ['m', '14'],
  ['m', 'fourteen'],
  ['w', '= four + ten'],
  ['m', '19'],
  ['m', 'nineteen'],
  ['w', '= nine + ten'],
  ['w', '📜 真实词源'],
  ['s', 'Thirteen is three and ten.', '十三是三加十。', 'thirteen three'],
  ['s', 'Fourteen is four and ten.', '十四是四加十。', 'fourteen four'],
  ['s', 'Nineteen is nine and ten.', '十九是九加十。', 'nineteen nine'],
  ['n', '-teen：-teen 就是 ten 的另一个样子，意思是「再加十」。'],
  ['w', '-teen = ten（再加十）'],
  ['s', 'Thirteen ends with teen.', 'thirteen 以 teen 结尾。', 'teen'],
  ['n', '✂️ 小秘密：eleven、twelve 本来应该是「十几」家族的头两个，只是长得不一样。'],
  ['w', 'eleven、twelve：本该是十几家族的老大、老二'],
  ['w', '✂️ 简化说法'],
  ['n', 'dozen：一打（12 个）叫 dozen。它来自拉丁语 duodecim：duo（二）+ decem（十）。'],
  ['w', 'dozen（一打 = 12 个）'],
  ['w', '← 法语 ← 拉丁语 duodecim = duo（二）+ decem（十）'],
  ['w', '📜 真实词源'],
  ['s', 'A dozen is twelve.', '一打是十二个。', 'a dozen'],
  ['s', 'Duo means two. Decem means ten.', 'duo 是二，decem 是十。', 'duo decem'],
  ['s', 'Duodecim means twelve.', 'duodecim 的意思是十二。', 'duodecim'],
  ['n', '格林定律：还记得吗？拉丁语 d → 英语 t：duo ↔ two，decem ↔ ten！'],
  ['w', 'duo ↔ two　decem ↔ ten（d → t，格林定律）'],
  ['s', 'She carries a dozen eggs.', '她抱着一打鸡蛋。', 'dozen'],
  ['w', '12 个 = a dozen'],
  ['n', '12 进位的影子：英语里还藏着「12 进位」：一打 12 个，一英尺 12 英寸。'],
  ['w', '还有：1 英尺 = 12 英寸'],
];
export default function build() { return autoBuild(SP, { title: '📖 单词身世 · 时间与数字 · 1 · 第 2 节', items: ITEMS, acts: ACTS }); }
