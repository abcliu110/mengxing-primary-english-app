// 💬 日常用语 · 课堂用语 · What's this in English? —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc03.js 案例 4；对照清单 lab/INVENTORY_HD_ORAL_SC03_4_V5.md
// 角色关键帧：sprites/hdo03_4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdo03_4.js';
const ACTS = {"*": ["l_hand1", "l_think", "l_speak"]};
const ITEMS = [
  ['w', '课堂用语'],
  ['w', '核心交际句：What\'s this in English? （这个用英语怎么说？（随时学新词必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 答句防错口诀：问句用 What\'s this/that，答句一律用 It\'s a/an...！'],
  ['w', '对话第1轮'],
  ['w', '👧 角色 A：Excuse me, Miss White. What\'s this in English?'],
  ['w', '打扰一下，怀特老师。这个用英语怎么说呀？'],
  ['s', 'Excuse me, Miss White. What\'s this in English?', '打扰一下，怀特老师。这个用英语怎么说呀？'],
  ['w', '对话第2轮'],
  ['w', '👩‍🏫 角色 B：It\'s a notebook. N-O-T-E-B-O-O-K, notebook!'],
  ['w', '它是一个笔记本。N-O-T-E-B-O-O-K，笔记本！'],
  ['s', 'It\'s a notebook. N-O-T-E-B-O-O-K, notebook!', '它是一个笔记本。N-O-T-E-B-O-O-K，笔记本！'],
  ['w', '对话第3轮'],
  ['w', '👧 角色 A：OK. I understand.'],
  ['w', '好的，我明白了。'],
  ['s', 'OK. I understand.', '好的，我明白了。']
];
export default function build() { return autoBuild(SP, { title: '💬 日常用语 · 课堂用语 · What\'s this in English?', items: ITEMS, acts: ACTS }); }
