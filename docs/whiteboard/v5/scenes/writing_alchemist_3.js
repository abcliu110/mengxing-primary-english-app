// ✍️ 写作炼金术 · 3 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：本幕只留第 1 节（共 3 节，其余在 scenes/writing_alchemist_p2_3.js … 由 v5/split_auto.py 生成）
// 内容来源（R1 零丢失）：src/cases/writing_alchemist.js 案例 3；对照清单 lab/INVENTORY_WRITING_ALCHEMIST_3_V5.md
// 角色关键帧：sprites/wa3.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wa3.js';
const ACTS = {"piano": ["linda_piano"], "strawberries": ["m_berry"], "sheep": ["l_sheep"], "helps": ["linda_help"]};
const ITEMS = [
  ['n', '小学考场作文，95% 都逃不出三大母题：写人、写过去的经历、写计划。'],
  ['w', '满分作文炼金炉'],
  ['w', '炼金术 ③  三大必考母题'],
  ['n', '母题：最常考的作文题型，像「妈妈题」，很多作文题都是它变出来的。'],
  ['w', '母题一：写人篇'],
  ['n', '范文积木：把满分范文拆成几块积木，也叫骨架。按顺序搭起来，就是一篇好文章。'],
  ['w', '外貌 with短语'],
  ['w', '+'],
  ['w', '性格 adj'],
  ['w', '+'],
  ['w', '爱好 be good at'],
  ['w', '+'],
  ['w', '榜样力量'],
  ['w', 'Linda is a tall and outgoing girl with big bright eyes. Not only is she polite and helpful,'],
  ['w', 'but she is also good at playing the piano. Whenever I have trouble with English, she always'],
  ['w', 'helps me patiently.'],
  ['s', 'Linda is a tall and outgoing girl with big bright eyes.', '琳达是个高个子、性格外向的女孩，有一双明亮的大眼睛。'],
  ['n', '后置定语：放在名词后面修饰它。with big bright eyes 挂在 girl 后面，省掉一句话。'],
  ['n', '性格品质：用形容词写脾气：outgoing 外向，polite 有礼貌，helpful 乐于助人。'],
  ['n', 'Not only is she…：「她不仅……」。Not only 放在句首时，is 要跑到 she 前面。'],
  ['n', 'be good at：擅长……，后面动词加 ing：good at playing the piano（擅长弹钢琴）。'],
];
export default function build() { return autoBuild(SP, { title: '✍️ 写作炼金术 · 3', items: ITEMS, acts: ACTS }); }
