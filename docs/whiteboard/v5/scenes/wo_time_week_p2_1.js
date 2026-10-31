// 📖 单词身世 · 星期 · 1 · 第 2 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 wo_time_week_1（321 s）的第 2 节（共 4 节，由 v5/split_auto.py 生成；App 白板下「第 2 节」按钮）
// 内容来源（R1 零丢失）：src/cases/wo_time_week.js 案例 1；对照清单 lab/INVENTORY_WO_TIME_WEEK_1_V5.md
// 角色关键帧：sprites/wow1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wow1.js';
const ACTS = {"go": ["l_w0", "l_w1", "l_w2"]};
const ITEMS = [
  ['n', '名字：看！七天的名字都是「谁的日子」：sun 的日子、moon 的日子……'],
  ['w', 'Sunday'],
  ['w', '= sun + day'],
  ['w', '太阳的日子'],
  ['s', 'The sun is hot on Sunday.', '星期天太阳很热。', 'Sunday sun'],
  ['w', 'Monday'],
  ['w', '= moon + day'],
  ['w', '月亮的日子'],
  ['s', 'We go to school on Monday.', '我们星期一上学。', 'Monday moon'],
  ['w', 'Tuesday'],
  ['w', '= Tiw\'s day'],
  ['w', '提尔的日子'],
  ['s', 'I have art on Tuesday.', '我星期二有美术课。', 'Tuesday'],
  ['w', 'Wednesday'],
  ['w', '= Woden\'s day'],
  ['w', '沃登的日子'],
  ['s', 'Wednesday is in the middle of the week.', '星期三在一周的中间。', 'Wednesday'],
  ['w', 'Thursday'],
  ['w', '= Thor\'s day'],
  ['w', '雷神的日子'],
  ['s', 'Thursday is after Wednesday.', '星期四在星期三后面。', 'Thursday'],
  ['w', 'Friday'],
  ['w', '= Friga\'s day'],
  ['w', '弗丽嘉的日子'],
  ['s', 'Friday is my favourite day.', '星期五是我最喜欢的一天。', 'Friday'],
  ['w', 'Saturday'],
  ['w', '= Saturn\'s day'],
  ['w', '土星的日子'],
  ['s', 'Saturn is a big planet.', '土星是一颗大行星。', 'Saturday Saturn'],
  ['s', 'I sleep late on Saturday.', '星期六我睡懒觉。', 'Saturday'],
  ['s', 'Tuesday is Tiw\'s day. Wednesday is Woden\'s day.', '星期二是提尔的日子，星期三是沃登的日子。', 'Tiw\'s Woden\'s'],
  ['s', 'Friday is Friga\'s day. Saturday is Saturn\'s day.', '星期五是弗丽嘉的日子，星期六是土星的日子。', 'Friga\'s Saturn\'s'],
  ['s', 'A week has seven days.', '一星期有七天。', 'day week'],
  ['w', '📜 真实词源'],
];
export default function build() { return autoBuild(SP, { title: '📖 单词身世 · 星期 · 1 · 第 2 节', items: ITEMS, acts: ACTS }); }
