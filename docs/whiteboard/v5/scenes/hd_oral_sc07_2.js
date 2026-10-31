// 💬 日常用语 · 购物与问价 · How much is this? —— 决策 38 ② 啊哈重做（口语通用版式 scenes/oral.js；啊哈卡 lab/audit38/aha/02_hd_oral_sc01.md）
// 内容来源（R1 零丢失）：src/cases/hd_oral_sc07.js 案例 2；对照清单 lab/INVENTORY_HD_ORAL_SC07_2_V5.md
// 角色关键帧：sprites/hdo07_2.js（人物先行帧库 cast/）
import { oralBuild } from './oral.js';
import * as SP from '../sprites/hdo07_2.js';
const ACTS = {"*": ["l_piggy", "l_bag1", "l_speak"], "M": ["l_speak", "l_ear", "l_wave"], "F": ["m_story", "m_admire", "m_admire"]};
const ITEMS = [
  ['w', '购物与问价'],
  ['w', '核心交际句：How much is this? （这个多少钱？（询问价格必会））'],
  ['w', '💡 交际得体度与母语负迁移提示：🌟 问价铁律：单数 How much is it? (It\'s...)；复数 How much are they? (They\'re...)'],
  ['w', '对话第1轮'],
  ['w', '👦 角色 A：I like this blue schoolbag! How much is it?'],
  ['w', '我喜欢这个蓝色的书包！它多少钱呀？'],
  ['s', 'I like this blue schoolbag! How much is it?', '我喜欢这个蓝色的书包！它多少钱呀？'],
  ['w', '对话第2轮'],
  ['w', '👩‍💼 角色 B：It\'s on sale today! It\'s only thirty-five yuan.'],
  ['w', '今天正在特价促销！只要三十五元。'],
  ['s', 'It\'s on sale today! It\'s only thirty-five yuan.', '今天正在特价促销！只要三十五元。'],
  ['w', '对话第3轮'],
  ['w', '👦 角色 A：Thank you.'],
  ['w', '谢谢。'],
  ['s', 'Thank you.', '谢谢。']
];
export default function build() { return oralBuild(SP, { title: '💬 日常用语 · 购物与问价 · How much is this?', items: ITEMS, acts: ACTS }); }
