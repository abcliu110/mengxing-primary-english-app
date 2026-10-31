// 📖 单词身世 · 星期 · 1 · 第 3 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 wo_time_week_1（321 s）的第 3 节（共 4 节，由 v5/split_auto.py 生成；App 白板下「第 3 节」按钮）
// 内容来源（R1 零丢失）：src/cases/wo_time_week.js 案例 1；对照清单 lab/INVENTORY_WO_TIME_WEEK_1_V5.md
// 角色关键帧：sprites/wow1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wow1.js';
const ACTS = {"go": ["l_w0", "l_w1", "l_w2"]};
const ITEMS = [
  ['n', '只有一个没换：Saturday 还是罗马的土星（Saturn），没换成日耳曼的神。'],
  ['w', 'Saturday 没换：还是罗马的土星'],
  ['n', '老样子：一千多年前，Thursday 写作 þunresdæg：雷神（Thunor）的日子。'],
  ['w', '古英语：þunresdæg'],
  ['w', '= 雷神（Thunor / Thor）+ 日子'],
  ['w', '📜 真实词源'],
  ['w', '→ Thuresday → Thursday'],
  ['s', 'Thursday is Thor\'s day.', '星期四是雷神的日子。', 'Thursday Thor\'s'],
  ['s', 'Thunor is the old English name of Thor.', 'Thunor 是 Thor 在古英语里的名字。', 'Thunor'],
  ['n', '月份：September 里藏着拉丁语 septem（七），可它是 9 月？'],
  ['w', 'September ← septem（七）'],
  ['s', 'My birthday is in September.', '我的生日在九月。', 'September'],
  ['s', 'Septem means seven.', 'septem 的意思是七。', 'septem seven'],
  ['n', '古罗马历：最古老的罗马历从三月开始：三月第一，September 正好第七！后面三个也一样。'],
  ['w', '古罗马历（三月开始）'],
  ['m', '今天'],
  ['m', 'September'],
  ['m', 'septem 七'],
  ['m', '第 7 个月'],
  ['m', '9 月'],
  ['m', 'October'],
  ['m', 'octo 八'],
  ['m', '第 8 个月'],
  ['m', '10 月'],
  ['m', 'November'],
  ['m', 'novem 九'],
  ['m', '第 9 个月'],
  ['m', '11 月'],
  ['m', 'December'],
  ['m', 'decem 十'],
  ['m', '第 10 个月'],
  ['m', '12 月'],
  ['w', '📜 真实词源'],
  ['s', 'October is after September.', '十月在九月后面。', 'October'],
  ['s', 'Octo means eight. Novem means nine.', 'octo 是八，novem 是九。', 'octo novem'],
  ['s', 'November is cold.', '十一月很冷。', 'November'],
  ['s', 'December is the last month.', '十二月是最后一个月。', 'December'],
  ['s', 'Decem means ten.', 'decem 的意思是十。', 'decem'],
];
export default function build() { return autoBuild(SP, { title: '📖 单词身世 · 星期 · 1 · 第 3 节', items: ITEMS, acts: ACTS }); }
