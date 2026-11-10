// ✍️ 写作炼金术 · 3 · 第 2 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 writing_alchemist_3（299 s）的第 2 节（共 3 节，由 v5/split_auto.py 生成；独立播放页「第 2 节」跳转（build.mjs 产物模板））
// 内容来源（R1 零丢失）：src/cases/writing_alchemist.js 案例 3；对照清单 lab/INVENTORY_WRITING_ALCHEMIST_3_V5.md
// 角色关键帧：sprites/wa3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wa3.js';
const ACTS = {"piano": ["linda_piano"], "strawberries": ["m_berry"], "sheep": ["l_sheep"], "helps": ["linda_help"]};
const ITEMS = [
  ['n', 'Whenever… always…：「每当……她总是……」，写出朋友帮助我的小细节，这就是榜样力量。'],
  ['w', '母题二：过去经历篇'],
  ['w', '时间·天气·交通'],
  ['w', '+'],
  ['w', '上午·下午活动'],
  ['w', '+'],
  ['w', '感受·感叹'],
  ['w', 'Last Sunday, the weather was sunny and warm. I went to the countryside with my family by'],
  ['w', 'car. In the morning, we picked fresh strawberries and fed the cute sheep. In the afternoon,'],
  ['w', 'we took many beautiful photos by the lake. Tired as we were, what a fantastic day we had!'],
  ['s', 'Last Sunday, I went to the countryside with my family by car.', '上周日，我和家人坐车去了乡下。'],
  ['n', '过去式：已经发生的事，动词要变样：is→was，go→went，take→took。'],
  ['n', '全文动词都锁定过去式：was, went, picked, fed, took, had，一个都不能漏！'],
  ['n', 'Tired as we were：「虽然我们很累」。结尾再用感叹句，像画龙点睛，一下子亮起来。'],
];
export default function build() { return autoBuild(SP, { title: '✍️ 写作炼金术 · 3 · 第 2 节', items: ITEMS, acts: ACTS }); }
