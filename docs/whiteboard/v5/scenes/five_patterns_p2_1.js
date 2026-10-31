// 🧱 五大基本句型 · ① SV 自给自足型 · 第 2 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 five_patterns_1（237 s）的第 2 节（共 3 节，由 v5/split_auto.py 生成；App 白板下「第 2 节」按钮）
// 内容来源（R1 零丢失）：src/cases/five_patterns.js 案例 1；对照清单 lab/INVENTORY_FIVE_PATTERNS_1_V5.md
// 角色关键帧：sprites/fpat1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fpat1.js';
const ACTS = {"rises": ["sunny"], "run": ["l_r0", "l_r1", "l_r2"], "fly": ["bird_up", "bird_down"], "look": ["l_point"], "play": ["kick0", "kick1", "kick2"], "sleep": ["baby"]};
const ITEMS = [
  ['n', '不及物动词 Vi：主语自己就能完成的动作，力气不用传给别人，后面不用接对象。'],
  ['w', '自己就能完成：rise 升起 · fly 飞 · sleep 睡 · run 跑 · smile 笑'],
  ['s', 'Rise, fly, sleep, run, smile. Babies sleep. Kids run and smile.', '升起、飞、睡、跑、笑。宝宝睡觉。孩子们跑着、笑着。', 'rise fly sleep run smile'],
  ['n', '看金句：Birds fly 就是骨架，后面的部分全是挂件。'],
  ['w', 'Birds fly happily in the blue sky.'],
  ['s', 'Birds fly happily in the blue sky.', '鸟儿在蓝天里快乐地飞翔。'],
  ['w', 'S'],
  ['w', 'V'],
  ['n', '副词：说明动作「怎么样」的词，常以 -ly 结尾，比如 happily（快乐地）。'],
  ['w', '副词挂件'],
  ['w', '地点挂件'],
  ['s', 'Birds fly happily in the blue sky.', '鸟儿在蓝天里快乐地飞翔。', 'Birds happily blue sky ly'],
  ['n', '宾语：动作的对象，就是「对谁、对什么」。不及物动词不能直接接宾语。'],
  ['w', 'Please listen to the teacher and look at the blackboard!'],
  ['s', 'Please listen to the teacher and look at the blackboard!', '请听老师讲，看黑板！', 'listen to'],
  ['n', '介词挂钩：to、at、for、with 这类小词像钩子，挂在不及物动词后面，才能接上对象。'],
  ['w', 'V'],
  ['w', '对象'],
  ['w', 'V'],
  ['w', '对象'],
];
export default function build() { return autoBuild(SP, { title: '🧱 五大基本句型 · ① SV 自给自足型 · 第 2 节', items: ITEMS, acts: ACTS }); }
