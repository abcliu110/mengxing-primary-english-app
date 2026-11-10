// ✍️ 写作炼金术 · 3 · 第 3 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 writing_alchemist_3（299 s）的第 3 节（共 3 节，由 v5/split_auto.py 生成；App 白板下「第 3 节」按钮）
// 内容来源（R1 零丢失）：src/cases/writing_alchemist.js 案例 3；对照清单 lab/INVENTORY_WRITING_ALCHEMIST_3_V5.md
// 角色关键帧：sprites/wa3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wa3.js';
const ACTS = {"piano": ["linda_piano"], "strawberries": ["m_berry"], "sheep": ["l_sheep"], "helps": ["linda_help"]};
const ITEMS = [
  ['n', 'be going to：母题三写计划：be going to「打算做……」，再换着用 will、plan to。'],
  ['s', 'With, be good at. She is good at playing the piano.', '带有、擅长。她擅长弹钢琴。', 'with be good at playing the piano good at playing the piano ing'],
  ['s', 'Linda is a tall and outgoing girl with big bright eyes.', '琳达是个高个子、性格外向的女孩，有一双明亮的大眼睛。', 'Linda is a tall and outgoing girl big bright eyes'],
  ['s', 'Not only is she polite and helpful, but she is also good at playing the piano.', '她不仅有礼貌、乐于助人，还擅长弹钢琴。', 'Not only she polite helpful but also Not only is she'],
  ['s', 'Whenever I have trouble with English, she always helps me patiently.', '每当我英语遇到困难，她总是耐心地帮我。', 'Whenever have trouble English always helps me patiently'],
  ['s', 'Last Sunday, the weather was sunny and warm.', '上周日，天气晴朗温暖。', 'Last Sunday weather was sunny warm'],
  ['s', 'I went to the countryside with my family by car.', '我和家人坐车去了乡下。', 'went to countryside my family by car'],
  ['s', 'In the morning, we picked fresh strawberries and fed the cute sheep.', '上午，我们摘了新鲜的草莓，喂了可爱的小羊。', 'In morning we picked fresh strawberries fed cute sheep'],
  ['s', 'In the afternoon, we took many beautiful photos by the lake.', '下午，我们在湖边拍了很多漂亮的照片。', 'afternoon took many beautiful photos lake'],
  ['s', 'Tired as we were, what a fantastic day we had!', '虽然我们很累，但这一天多棒啊！', 'Tired as were what fantastic day had Tired as we were'],
  ['s', 'Was, went, picked, fed, took, had. Go, take.', '是、去了、摘了、喂了、拍了、有了。去、拍。', 'was went picked fed took had go take'],
  ['s', 'Be going to, will, plan to. First, what\'s more, finally. I look forward to it!', '打算、将会、计划。首先、而且、最后。我很期待！', 'be going to will plan going First What\'s more Finally look forward look forward to I'],
  ['w', '母题三 · 计划篇积木：打算总起(be going to) + 三项计划(First/What\'s more/Finally) + 期待收尾'],
  ['w', '口诀：写人抓外貌·性格·爱好；写经历锁定过去式；写计划用 be going to / will / plan to / look forward to！'],
  ['n', '口诀：写人抓外貌性格爱好，写经历锁定过去式，写计划要换着用将来的说法！']
];
export default function build() { return autoBuild(SP, { title: '✍️ 写作炼金术 · 3 · 第 3 节', items: ITEMS, acts: ACTS }); }
