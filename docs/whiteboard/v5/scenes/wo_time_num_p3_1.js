// 📖 单词身世 · 时间与数字 · 1 · 第 3 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 wo_time_num_1（256 s）的第 3 节（共 3 节，由 v5/split_auto.py 生成；App 白板下「第 3 节」按钮）
// 内容来源（R1 零丢失）：src/cases/wo_time_num.js 案例 1；对照清单 lab/INVENTORY_WO_TIME_NUM_1_V5.md
// 角色关键帧：sprites/won1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/won1.js';
const ACTS = {"carries": ["m_eggs"]};
const ITEMS = [
  ['n', '大数：中文四位一节：万、亿。英文三位一节：thousand（千）、million（百万）。'],
  ['w', '中文：四位一节'],
  ['w', '1,0000 万　1,0000,0000 亿'],
  ['w', '英文：三位一节'],
  ['w', '1,000 thousand　1,000,000 million'],
  ['w', '📜 真实词源'],
  ['s', 'A thousand is ten hundreds.', '一千是十个一百。', 'thousand hundred'],
  ['n', 'million：million 来自意大利语：mille（一千）加一个「大」尾巴 = 大大的一千，就是一千个一千！'],
  ['w', 'million = mille（千）+ -one（大）= 一千个一千'],
  ['s', 'Mille means a thousand.', 'mille 的意思是一千。', 'mille'],
  ['s', 'A million is a thousand thousands.', '一百万是一千个一千。', 'million'],
  ['n', '换算：一万 = ten thousand（十个千）；一百万 = one million。'],
  ['w', '一万 = ten thousand　　一百万 = one million'],
  ['w', '💡 换算练习'],
  ['s', 'Ten thousand people are here.', '这里有一万人。', 'thousand'],
  ['n', '预测：考考你：一亿 = 一万个一万。英语怎么说？先想 3 秒！（提示：一亿 = 100,000,000）'],
  ['w', '🔮 一亿 = 100,000,000 = ？'],
  ['w', '？'],
  ['n', '揭晓：100,000,000 = 100 个 million = one hundred million！'],
  ['w', 'one hundred million'],
  ['w', '（100 个 million）'],
  ['s', 'One hundred million is a very big number.', '一亿是一个很大的数。', 'million'],
  ['n', '口诀：十个之外剩一个，eleven；十几都是几加十；中文四位一节，英文三位一节！'],
  ['w', '💡 一句话洞见'],
  ['w', 'eleven、twelve =「十个之外剩下一个、两个」，'],
  ['w', '十几都是「几 + 十」；'],
  ['w', '中文四位一节，英文三位一节。'],
  ['w', '🎵 口诀'],
  ['w', '十个之外剩一个，eleven；'],
  ['w', '十几都是几加十！'],
  ['w', '📖 单词身世 · 时间与度量 · 数字']
];
export default function build() { return autoBuild(SP, { title: '📖 单词身世 · 时间与数字 · 1 · 第 3 节', items: ITEMS, acts: ACTS }); }
