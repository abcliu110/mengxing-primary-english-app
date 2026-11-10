// ✍️ 写作炼金术 · 2 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：本幕只留第 1 节（共 3 节，其余在 scenes/writing_alchemist_p2_2.js … 由 v5/split_auto.py 生成）
// 内容来源（R1 零丢失）：src/cases/writing_alchemist.js 案例 2；对照清单 lab/INVENTORY_WRITING_ALCHEMIST_2_V5.md
// 角色关键帧：sprites/wa2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wa2.js';
const ACTS = {"sweeping": ["m_sweep"], "helps": ["linda_help"]};
const ITEMS = [
  ['n', '为什么有的作文读起来像一盘散沙？因为句子和句子之间没有「路标」。'],
  ['w', '满分作文炼金炉'],
  ['w', '炼金术 ②  四大逻辑衔接词链'],
  ['n', '衔接词：连接句子、说明前后关系的词，比如 First of all、What\'s more。'],
  ['w', 'First of all,'],
  ['w', '第一棒：开头'],
  ['n', '逻辑路标：像路边的指示牌，告诉老师：现在讲第一点、在补充，还是要转折了。'],
  ['w', '普通'],
  ['w', 'First, I will do homework.'],
  ['n', 'First of all,：「首先」，放在句子开头，后面加逗号。也可以用 To begin with,。'],
  ['w', '高分'],
  ['w', 'First of all, / To begin with, I am going to finish my homework'],
  ['w', 'carefully.'],
  ['s', 'First of all, I am going to finish my homework carefully.', '首先，我要认真写完作业。'],
  ['n', 'Cohesion Chain：衔接链。每一句都用衔接词扣住上一句，像链子一环扣一环。'],
  ['w', 'What\'s more,'],
  ['w', '第二棒：递进'],
  ['w', '普通'],
  ['w', 'And I also help my mom.'],
  ['n', '递进：意思再往前进一步，「而且」。用 What\'s more, 或 Besides, 代替 And。'],
  ['w', '高分'],
  ['w', 'What\'s more, / Besides, I often help my parents do some'],
  ['w', 'housework, such as sweeping the floor.'],
  ['s', 'What\'s more, I often help my parents do some housework, such as sweeping the floor.', '而且，我常帮父母做家务，比如扫地。'],
];
export default function build() { return autoBuild(SP, { title: '✍️ 写作炼金术 · 2', items: ITEMS, acts: ACTS }); }
