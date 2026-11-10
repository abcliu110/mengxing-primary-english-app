// ✍️ 写作炼金术 · 1 · 第 2 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 writing_alchemist_1（252 s）的第 2 节（共 3 节，由 v5/split_auto.py 生成；App 白板下「第 2 节」按钮）
// 内容来源（R1 零丢失）：src/cases/writing_alchemist.js 案例 1；对照清单 lab/INVENTORY_WRITING_ALCHEMIST_1_V5.md
// 角色关键帧：sprites/wa1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wa1.js';
const ACTS = {};
const ITEMS = [
  ['n', '第二条公式：写开心的事，别只会说 very happy。'],
  ['w', 'What a ...!'],
  ['w', 'How ...!'],
  ['w', '60分'],
  ['w', 'We were very happy yesterday.'],
  ['n', '感叹句：表达强烈感情的句子，用 What 或 How 开头，句末用感叹号「!」。'],
  ['w', '100分'],
  ['w', 'What a wonderful and unforgettable day we had!'],
  ['w', 'How excited we were!'],
  ['s', 'What a wonderful and unforgettable day we had! How excited we were!', '那天真美好、真难忘！我们多兴奋啊！', 'unforgettable had'],
  ['n', 'What a + 形容词 + 名词：多么美好的一天！What a wonderful … day，后面跟 we had。'],
  ['n', 'How + 形容词：How excited we were! 我们多么激动啊！形容词紧跟在 How 后面。'],
  ['n', '第三条公式：说读书有好处，别只写 is good for us。'],
  ['w', 'not only'],
  ['w', 'but also'],
  ['w', '60分'],
  ['w', 'Reading books is good for us.'],
  ['n', '连接词：把句子连起来的词。not only… but also… 意思是「不仅……而且……」。'],
  ['w', '100分'],
  ['w', 'Reading books is not only good for our study, but also'],
  ['w', 'opens a window to the world for us!'],
  ['s', 'Reading books is not only good for our study, but also opens a window to the world for us!', '读书不仅对学习有益，还为我们打开一扇看世界的窗！', 'books not only our study but also'],
];
export default function build() { return autoBuild(SP, { title: '✍️ 写作炼金术 · 1 · 第 2 节', items: ITEMS, acts: ACTS }); }
