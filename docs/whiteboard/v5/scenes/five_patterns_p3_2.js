// 🧱 五大基本句型 · ② SVP 状态天平型 · 第 3 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 five_patterns_2（217 s）的第 3 节（共 3 节，由 v5/split_auto.py 生成；App 白板下「第 3 节」按钮）
// 内容来源（R1 零丢失）：src/cases/five_patterns.js 案例 2；对照清单 lab/INVENTORY_FIVE_PATTERNS_2_V5.md
// 角色关键帧：sprites/fpat2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fpat2.js';
const ACTS = {"smells": ["m_smell"]};
const ITEMS = [
  ['n', 'turn 管颜色变化（树叶变黄），get 管天气变化（天气变凉）。'],
  ['w', 'In autumn, the leaves turn yellow and the weather gets cool.'],
  ['s', 'In autumn, the leaves turn yellow and the weather gets cool.', '秋天，树叶变黄，天气变凉。'],
  ['w', '时间挂件'],
  ['w', 'S'],
  ['w', 'V'],
  ['w', 'P'],
  ['w', 'S'],
  ['w', 'V'],
  ['w', 'P'],
  ['s', 'In autumn, the leaves turn yellow and the weather gets cool.', '秋天，树叶变黄，天气变凉。', 'In autumn leaves yellow and weather gets cool'],
  ['w', 'S（主语）+ 系动词（=）+ P（表语：名词 / 形容词 / 介词短语）'],
  ['w', '那个主意听起来太棒了！蛋糕尝起来很甜。  系动词是等号！'],
  ['n', '口诀：系动词是等号，后面跟形容词，千万别跟 -ly。'],
  ['n', '预测：「这朵花闻起来很香」：smells 是系动词，后面用 sweet 还是 sweetly？先想 3 秒！'],
  ['w', '🔮 这朵花闻起来很香。'],
  ['w', '→  The flower smells ___.  ( sweet / sweetly )'],
  ['n', '揭晓：系动词后面跟形容词 sweet：The flower smells sweet.'],
  ['w', 'The flower smells sweet.'],
  ['s', 'The flower smells sweet.', '这朵花闻起来很香。', 'flower smells sweet'],
  ['w', '💡 一句话洞见'],
  ['w', '系动词不是动作，是一个等号：'],
  ['w', '主语 = 后面的状态'],
  ['w', '🎵 口诀'],
  ['w', '口诀：系动词是等号，后面跟形容词，'],
  ['w', '千万别跟 -ly。'],
  ['w', '🦴 五大基本句型 · 句型 ② SVP']
];
export default function build() { return autoBuild(SP, { title: '🧱 五大基本句型 · ② SVP 状态天平型 · 第 3 节', items: ITEMS, acts: ACTS }); }
