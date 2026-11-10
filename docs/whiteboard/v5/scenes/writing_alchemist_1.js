// ✍️ 写作炼金术 · 1 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：本幕只留第 1 节（共 3 节，其余在 scenes/writing_alchemist_p2_1.js … 由 v5/split_auto.py 生成）
// 内容来源（R1 零丢失）：src/cases/writing_alchemist.js 案例 1；对照清单 lab/INVENTORY_WRITING_ALCHEMIST_1_V5.md
// 角色关键帧：sprites/wa1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wa1.js';
const ACTS = {};
const ITEMS = [
  ['n', '这节课：同一个意思，怎样把 60 分的大白话，炼成 100 分的作文句？'],
  ['w', '满分作文炼金炉'],
  ['w', '炼金术 ①  60分 → 100分'],
  ['n', '炼金炉：传说能把普通铁块炼成金子。这里把平淡的句子炼成满分好句。'],
  ['w', 'be crazy about'],
  ['w', 'enjoy doing'],
  ['n', '基础句：意思对、但很平淡的句子，只能拿 60 分。比如 I like English very much.'],
  ['w', '60分'],
  ['w', 'I like English very much.'],
  ['n', '阅卷老师一天看几百个 I like，早就看腻了！要换个说法。'],
  ['n', '高级句型：更生动、更有变化的说法。be crazy about 意思是「对……着迷」。'],
  ['w', '100分'],
  ['w', 'I am crazy about English, and I really enjoy reading English'],
  ['w', 'stories in my free time!'],
  ['s', 'I am crazy about English, and I really enjoy reading English stories in my free time!', '我超爱英语，空闲时特别喜欢读英语故事！', 'am and really stories'],
  ['n', 'enjoy doing：喜欢做某事，后面动词加 ing：enjoy reading。也可以用 be fond of。'],
  ['n', '时间状语：说明「什么时候」的词组。in my free time 就是「在我的空闲时间」。'],
];
export default function build() { return autoBuild(SP, { title: '✍️ 写作炼金术 · 1', items: ITEMS, acts: ACTS }); }
