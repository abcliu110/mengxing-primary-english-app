// ✍️ 写作炼金术 · 2 · 第 3 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 writing_alchemist_2（268 s）的第 3 节（共 3 节，由 v5/split_auto.py 生成；App 白板下「第 3 节」按钮）
// 内容来源（R1 零丢失）：src/cases/writing_alchemist.js 案例 2；对照清单 lab/INVENTORY_WRITING_ALCHEMIST_2_V5.md
// 角色关键帧：sprites/wa2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wa2.js';
const ACTS = {"sweeping": ["m_sweep"], "helps": ["linda_help"]};
const ITEMS = [
  ['n', '总结：最后一棒收尾：All in all,（总而言之）或 In a word,（总之），代替 At last。'],
  ['s', 'First, I will do homework. And I also help my mom.', '首先，我要写作业。我还帮妈妈。', 'First I will do homework And also help my mom'],
  ['s', 'First of all, to begin with, I am going to finish my homework carefully.', '首先，一开始，我要认真写完作业。', 'First of all To begin with am going finish my carefully To begin with'],
  ['s', 'What\'s more, besides, I often help my parents do some housework, such as sweeping the floor.', '而且，另外，我常帮父母做家务，比如扫地。', 'What\'s more Besides often parents some housework such as sweeping the floor'],
  ['s', 'I was tired, but I was happy.', '我很累，但我很开心。', 'was tired but happy is'],
  ['s', 'Although I felt a little tired after the trip, I learned a lot and had a great time!', '虽然旅行后有点累，但我学到很多，玩得很开心！', 'Although felt a little after trip learned lot had great time'],
  ['s', 'Because it rained, we stayed at home. It rained, so we stayed at home.', '因为下雨，我们待在家里。下雨了，所以我们待在家里。', 'Because so'],
  ['s', 'All in all, in a word, my weekend is busy but meaningful. I can\'t wait for it!', '总而言之，总之，我的周末忙碌但有意义。我等不及了！', 'All in all In a word weekend busy meaningful can\'t wait for it busy but meaningful'],
  ['s', 'At last. Cohesion chain.', '最后。衔接链。', 'At last Cohesion Chain'],
  ['w', '第四棒 · 收尾：All in all, / In a word, my weekend is busy but meaningful. I can\'t wait for it!'],
  ['w', '口诀：首先 First of all，而且 What\'s more，虽然 Although 不配 but，总之 All in all！'],
  ['n', 'busy but meaningful：「忙碌但有意义」。这句只有 but、没有 Although，所以没问题。'],
  ['n', '口诀：首先 First of all，而且 What\'s more，虽然不配 but，总之 All in all！']
];
export default function build() { return autoBuild(SP, { title: '✍️ 写作炼金术 · 2 · 第 3 节', items: ITEMS, acts: ACTS }); }
