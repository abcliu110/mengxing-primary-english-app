// 📘 G02 底层原理 · 第1幕 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/hd_g02.js 案例 1；对照清单 lab/INVENTORY_HD_G02_1_V5.md
// 角色关键帧：sprites/hdg02_1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdg02_1.js';
const ACTS = {"*": ["l_books", "l_think", "l_point"]};
const ITEMS = [
  ['w', 'G02 底层原理'],
  ['w', '名词不规则复数变形记 (children / feet / sheep) —— 不按常理加 s 的 8 个高频“变身小精灵”'],
  ['w', '【为什么这几个词不加 -s？】它们是古英语里每天挂在嘴边的最高频词（人、孩子、脚、牙、羊、鱼、老鼠），保留了古老的“'],
  ['w', '🔬 G02 · 名词不规则复数变形记 (children / feet / sheep) 底层结构拆解与汉英思维对比'],
  ['w', '① 典型语境：Two men and three women are in the park.'],
  ['w', '两个男人和三个女人在公园里。五个孩子正在洗脚、刷牙。看！十只白绵羊和六条鱼！'],
  ['w', '② 核心结构规律：① 元音大变身：man ➔ men, woman ➔ women (/ˈwɪmɪn/),'],
  ['w', '③ 进阶要点：② 特殊变形：child（孩子）➔ children, mouse（老鼠）➔ mice'],
  ['w', 'G02 第1幕'],
  ['s', 'Two men and three women are in the park.', '男女脚牙鹅变 e（man→men, foot→feet, tooth→teeth）；老鼠 mouse 变 mice；孩子 child 变 children；绵羊 sheep 小鹿 deer 小鱼 fish 单复数长一样！']
];
export default function build() { return autoBuild(SP, { title: '📘 G02 底层原理 · 第1幕', items: ITEMS, acts: ACTS }); }
