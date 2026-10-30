// 🔬 规律 2 · 元音大转移：拼写为什么和读音对不上 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/wo_rule_gvs.js 案例 1；对照清单 lab/INVENTORY_WO_RULE_GVS_1_V5.md
// 角色关键帧：sprites/gvs1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/gvs1.js';
const ACTS = {"Look": ["l_point"]};
const ITEMS = [
  ['n', '你有没有奇怪过：name 里的 a 为什么读 /eɪ/，不读「啊」？答案是一场叫「元音大转移」的大搬家。'],
  ['w', '🔬 规律 2：元音大转移（Great Vowel Shift）'],
  ['w', '📜 有出处 ✂️ 简化说法'],
  ['n', '英语的拼写大多在搬家以前就定下来了。后来，长元音的读法整体挪了位，大约发生在 1400 年到 1700 年之间，可拼写没跟着改。'],
  ['w', '拼写定得早，读音后来整体挪位（约 1400–1700 年）'],
  ['s', 'Look at my house.', '看我的房子。', 'house'],
  ['w', 'house ← 古英语 hūs（当年读起来接近「胡斯」）'],
  ['s', 'What is your name?', '你叫什么名字？', 'name'],
  ['w', 'name ← 古英语 nama（a 当年读「啊」）'],
  ['s', 'Nice to meet you.', '很高兴认识你。', 'meet'],
  ['w', 'meet ← 古英语 mētan（ee 当年读长「诶」）'],
  ['n', '所以老拼写像一张旧照片：照片没变，人长大了，样子变了。'],
  ['w', '💡 拼写 = 旧照片；读音 = 长大以后的样子'],
  ['n', '这是简化说法：真实的变化分好几步，各地方言也不完全一样。'],
  ['w', '✂️ 真实过程分好几步，这里只讲结果'],
  ['n', '出处：古英语词形见 Etymonline、Wiktionary；时间和例词见 Wikipedia「Great Vowel Shift」。'],
  ['w', '出处：Etymonline · Wiktionary · Wikipedia']
];
export default function build() { return autoBuild(SP, { title: '🔬 规律 2 · 元音大转移：拼写为什么和读音对不上', items: ITEMS, acts: ACTS }); }
