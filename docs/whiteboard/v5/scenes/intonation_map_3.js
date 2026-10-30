// 🎵 语调地图 · 3 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/intonation_map.js 案例 3；对照清单 lab/INVENTORY_INTONATION_MAP_3_V5.md
// 角色关键帧：sprites/im3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/im3.js';
const ACTS = {"jump": ["l_jc", "l_ja"], "look": ["l_point"]};
const ITEMS = [
  ['n', '这一幕：blackboard 和 black board，写法差一个空格，重音一换，意思就变了！'],
  ['w', '合成词重音'],
  ['w', '🎵 语调地图 ③'],
  ['w', '✂️ 简化说法'],
  ['w', '💡 记忆联想'],
  ['w', '合成词重音'],
  ['w', '🎵 语调地图 ③'],
  ['w', '✂️ 简化说法'],
  ['m', '💡 记忆联想'],
  ['m', '① 对比'],
  ['m', '② 规律'],
  ['m', '③ 更多例子'],
  ['m', '④ 句子里'],
  ['m', '⑤ 口诀'],
  ['m', '🔮 预测'],
  ['n', '合成词：两个词拼成一个新词，表示一样新东西，比如 blackboard（黑板）。'],
  ['w', 'BLACKboard　黑板（教室里写字的板）'],
  ['w', 'black BOARD　一块黑色的木板'],
  ['s', 'Blackboard. A black board.', '黑板。一块黑色的板。', 'blackboard black board a'],
  ['n', '✂️ 规律：合成名词重音多在前面一个词；「形容词 + 名词」的普通短语，重音落在后面的名词上。'],
  ['w', '合成名词：重音在前　　形容词 + 名词：重音在后'],
  ['w', '✂️ 大多数'],
  ['n', '更多例子：greenhouse 温室 / green house 绿色的房子；hotdog 热狗 / hot dog 很热的狗。'],
  ['w', 'GREENhouse 温室　·　green HOUSE 绿房子'],
  ['w', 'HOTdog 热狗　·　hot DOG 很热的狗'],
  ['w', 'WHITE House 白宫　·　white HOUSE 白色的房子'],
  ['s', 'Greenhouse, green house. Hotdog, hot dog.', '温室，绿色的房子。热狗，很热的狗。', 'greenhouse green house hotdog hot dog'],
  ['s', 'The White House is a white house.', '白宫是一座白色的房子。', 'white house the is'],
  ['n', '句子里：读对重音，别人才知道你说的是哪一个。'],
  ['w', 'Look at the BLACKboard, please.'],
  ['s', 'Look at the blackboard, please.', '请看黑板。', 'look at please'],
  ['n', '口诀：合成名词前面重，普通短语后面重。'],
  ['w', '合成名词前面重，普通短语后面重。'],
  ['n', '预测：football（足球）的重音在哪儿？先想 3 秒！'],
  ['w', '🔮 football 足球：重音在前还是在后？'],
  ['n', '揭晓：合成名词，重音在前：FOOTball。'],
  ['w', 'FOOTball（合成名词，前面重）'],
  ['s', 'Football. I play football.', '足球。我踢足球。', 'football I play'],
  ['w', '💡 一句话洞见'],
  ['w', '两个词拼成新东西（合成名词）：重音在前；'],
  ['w', '形容词 + 名词：重音在后。'],
  ['w', '🎵 口诀'],
  ['w', '合成名词前面重，'],
  ['w', '普通短语后面重！'],
  ['w', '🎵 语调地图 · 合成词重音']
];
export default function build() { return autoBuild(SP, { title: '🎵 语调地图 · 3', items: ITEMS, acts: ACTS }); }
