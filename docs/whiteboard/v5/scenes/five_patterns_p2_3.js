// 🧱 五大基本句型 · ③ SVO 一箭穿心型 · 第 2 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 five_patterns_3（242 s）的第 2 节（共 3 节，由 v5/split_auto.py 生成；App 白板下「第 2 节」按钮）
// 内容来源（R1 零丢失）：src/cases/five_patterns.js 案例 3；对照清单 lab/INVENTORY_FIVE_PATTERNS_3_V5.md
// 角色关键帧：sprites/fpat3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fpat3.js';
const ACTS = {"reading": ["l_read"], "planted": ["plant"], "go": ["l_w0", "l_w1", "l_w2"], "read": ["l_read"]};
const ITEMS = [
  ['n', '看金句：planted（种了）直接射中宾语 trees，中间什么都不加。'],
  ['w', 'We planted twenty young trees on Tree Planting Day.'],
  ['s', 'We planted twenty young trees on Tree Planting Day.', '植树节我们种了二十棵小树。'],
  ['w', 'S'],
  ['w', 'V'],
  ['w', 'O'],
  ['w', '时间挂件'],
  ['s', 'We planted twenty young trees on Tree Planting Day.', '植树节我们种了二十棵小树。', 'We planted twenty young trees on Tree Planting Day'],
  ['n', '画蛇添足：多此一举。及物动词后面乱加介词，就像给蛇画脚，反而画错了。'],
  ['w', '直接接宾语，不加介词：'],
  ['w', 'discuss the plan · marry her · enter the room'],
  ['s', 'Discuss the plan. Marry her. Enter the room.', '讨论计划。娶她。进入房间。', 'discuss the plan marry her enter room'],
  ['n', '宾语穿制服：两个动词连用时，第二个要换成 to do 或 doing，才能当宾语。'],
  ['w', 'I want to buy a dictionary, and I enjoy reading stories.'],
  ['s', 'I want to buy a dictionary, and I enjoy reading stories.', '我想买一本词典，我也喜欢读故事。'],
  ['w', 'S'],
  ['w', 'V'],
  ['w', 'O'],
  ['w', 'S'],
  ['w', 'V'],
  ['w', 'O'],
  ['s', 'I want to buy a dictionary, and I enjoy reading stories.', '我想买一本词典，我也喜欢读故事。', 'I want to buy a dictionary and enjoy'],
  ['n', 'to do：盼着将来去做的事用 to do，比如 want to do、hope to do。'],
  ['w', '将来想做 → want / plan / hope / decide + to do'],
  ['s', 'Want to do, hope to do, plan to do. I decide to go.', '想做、希望做、打算做。我决定去。', 'hope decide do want to do hope to do'],
];
export default function build() { return autoBuild(SP, { title: '🧱 五大基本句型 · ③ SVO 一箭穿心型 · 第 2 节', items: ITEMS, acts: ACTS }); }
