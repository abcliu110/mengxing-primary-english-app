// 🧱 五大基本句型 · ④ SVOO 双手递礼型 · 第 3 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 five_patterns_4（226 s）的第 3 节（共 3 节，由 v5/split_auto.py 生成；App 白板下「第 3 节」按钮）
// 内容来源（R1 零丢失）：src/cases/five_patterns.js 案例 4；对照清单 lab/INVENTORY_FIVE_PATTERNS_4_V5.md
// 角色关键帧：sprites/fpat4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fpat4.js';
const ACTS = {"gave": ["mom_gift"], "give": ["l_pen"], "show": ["l_pen"], "pass": ["m_pass"]};
const ITEMS = [
  ['n', 'for 心意：花心思替别人买、做、准备，像送出一颗爱心，就用 for。'],
  ['w', 'Dad bought me a new bike. = Dad bought a new bike FOR me.'],
  ['s', 'Dad bought me a new bike. Dad bought a new bike for me.', '爸爸给我买了一辆新自行车。', 'bought'],
  ['w', 'IO'],
  ['w', 'DO'],
  ['w', 'DO'],
  ['w', 'for + 人'],
  ['w', 'for 派：buy / make / cook / draw / choose / find'],
  ['s', 'Dad bought me a new bike. He made a cake for me.', '爸爸给我买了一辆新自行车。他给我做了蛋糕。', 'Dad new bike for'],
  ['s', 'Buy, make, cook, draw, choose, find. Mum cooks dinner for us.', '买、做、煮、画、挑选、找到。妈妈给我们做晚饭。', 'buy make cook draw choose find'],
  ['w', 'S + V + 人 + 物    或    S + V + 物 + to / for + 人'],
  ['w', '妈妈送了我一份生日礼物。  递过去用 to，花心思用 for！'],
  ['n', '口诀：现成东西递过去用 to，花心思替人准备用 for。'],
  ['n', '预测：「请把书递给我」：书是现成的，递过去用 to 还是 for？先想 3 秒！'],
  ['w', '🔮 请把书递给我。'],
  ['w', '→  Please pass the book ___ me.  ( to / for )'],
  ['n', '揭晓：现成的书递过去，用 to：Please pass the book to me.'],
  ['w', 'Please pass the book to me.'],
  ['s', 'Please pass the book to me.', '请把书递给我。', 'please pass the book to me'],
  ['w', '💡 一句话洞见'],
  ['w', '双宾动词把东西交给人：先人后物；'],
  ['w', '物放前面时，人前面加 to 或 for'],
  ['w', '🎵 口诀'],
  ['w', '口诀：现成东西递过去用 to，'],
  ['w', '花心思替人准备用 for。'],
  ['w', '🦴 五大基本句型 · 句型 ④ SVOO']
];
export default function build() { return autoBuild(SP, { title: '🧱 五大基本句型 · ④ SVOO 双手递礼型 · 第 3 节', items: ITEMS, acts: ACTS }); }
