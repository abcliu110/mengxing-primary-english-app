// 🎬 万能动词 · look up ② —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/vv_look_up.js 案例 2；对照清单 lab/INVENTORY_VV_LOOK_UP_2_V5.md
// 角色关键帧：sprites/vvlookup2.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/vvlookup2.js';
const ACTS = {"*": ["l_dict0", "l_dict1", "l_dict2"]};
const ITEMS = [
  ['n', 'look up：抬头向上看；（在词典/网上）查阅单词'],
  ['m', 'look up ②'],
  ['m', '查阅（单词）'],
  ['m', 'giraffe ?'],
  ['w', '/dʒəˈrɑːf/'],
  ['m', 'giraffe'],
  ['m', '长颈鹿'],
  ['s', 'Look up the new word in the dictionary!', '在词典里查一查这个新单词！'],
  ['w', '信息浮现出来'],
  ['m', 'LOOK'],
  ['m', '向上 / 填满'],
  ['m', '看'],
  ['m', '+'],
  ['w', 'Look up at the sky.'],
  ['m', '抬头看天空。'],
  ['m', '目光 往上'],
  ['w', 'Look up the word.'],
  ['m', '查单词。'],
  ['m', '答案 浮现 上来'],
  ['w', '共同点：UP = 往上看，让信息浮上来'],
  ['s', 'Look up the new word in the dictionary!', '在词典里查一查这个新单词！']
];
export default function build() { return autoBuild(SP, { title: '🎬 万能动词 · look up ②', items: ITEMS, acts: ACTS }); }
