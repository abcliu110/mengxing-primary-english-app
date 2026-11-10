// ✍️ 写作炼金术 · 2 · 第 2 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 writing_alchemist_2（268 s）的第 2 节（共 3 节，由 v5/split_auto.py 生成；App 白板下「第 2 节」按钮）
// 内容来源（R1 零丢失）：src/cases/writing_alchemist.js 案例 2；对照清单 lab/INVENTORY_WRITING_ALCHEMIST_2_V5.md
// 角色关键帧：sprites/wa2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wa2.js';
const ACTS = {"sweeping": ["m_sweep"], "helps": ["linda_help"]};
const ITEMS = [
  ['n', 'such as：「比如」，后面举例子：such as sweeping the floor（比如扫地）。'],
  ['w', 'Although'],
  ['w', '第三棒：转折'],
  ['n', '转折：前后意思相反，比如「虽然很累，但是很开心」。'],
  ['w', '普通'],
  ['w', 'I was tired, but I was happy.'],
  ['w', '高分'],
  ['w', 'Although I felt a little tired after the trip, I learned a lot'],
  ['w', 'and had a great time!'],
  ['s', 'Although I felt a little tired after the trip, I learned a lot and had a great time!', '虽然旅行后有点累，但我学到很多，玩得很开心！'],
  ['n', '黄金铁律：英语里 Although（虽然）和 but（但是）不能出现在同一个句子里！'],
  ['w', 'Although + but'],
  ['w', '不能同句！'],
  ['n', 'Because（因为）和 so（所以）也一样，二选一，不能一起用！'],
  ['w', 'Because + so'],
  ['w', '也不能同句！'],
];
export default function build() { return autoBuild(SP, { title: '✍️ 写作炼金术 · 2 · 第 2 节', items: ITEMS, acts: ACTS }); }
