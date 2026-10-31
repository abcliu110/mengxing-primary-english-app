// 📖 单词身世 · 时间与数字 · 1 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：本幕只留第 1 节（共 3 节，其余在 scenes/wo_time_num_p2_1.js … 由 v5/split_auto.py 生成）
// 内容来源（R1 零丢失）：src/cases/wo_time_num.js 案例 1；对照清单 lab/INVENTORY_WO_TIME_NUM_1_V5.md
// 角色关键帧：sprites/won1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/won1.js';
const ACTS = {"carries": ["m_eggs"]};
const ITEMS = [
  ['n', '这一幕：eleven、twelve 为什么不叫 oneteen、twoteen？一万、一亿用英语怎么说？'],
  ['w', '数字的秘密'],
  ['w', '单词身世 · 时间与度量'],
  ['w', '📜 真实词源'],
  ['w', '✂️ 简化说法'],
  ['w', '💡 记忆联想'],
  ['w', '数字的秘密'],
  ['w', '单词身世 · 时间与度量'],
  ['w', '📜 真实词源'],
  ['w', '✂️ 简化说法'],
  ['m', '💡 记忆联想'],
  ['m', '① 地图'],
  ['m', '② 场景'],
  ['m', '③ 词族'],
  ['m', '④ 彩蛋'],
  ['m', '⑤ 中文'],
  ['m', '🔮 预测'],
  ['n', '可信度徽章：📜 = 查得到出处；✂️ = 简化说法；💡 = 中文对照 / 换算练习，不是词源。'],
  ['n', '数到十：古人用十根手指数数。数到十，两只手都用完了——再来一个怎么办？'],
  ['w', 'ten（十）：两只手用完'],
  ['s', 'I have ten fingers.', '我有十根手指。', 'ten'],
  ['n', 'eleven：十个之外，还「剩下一个」——古英语就叫它「一 + 剩下」，后来变成 eleven！'],
  ['w', '剩下 1 个'],
  ['w', 'eleven = one + left（剩下）'],
  ['w', '📜 真实词源'],
  ['s', 'I have eleven pencils.', '我有十一支铅笔。', 'eleven'],
  ['s', 'Ten are in the box. One is left.', '十支在盒子里，还剩一支。', 'one left'],
  ['n', 'twelve：twelve 就是「二 + 剩下」：十个之外剩下两个。'],
  ['w', 'twelve = two + left'],
  ['s', 'Twelve is two more than ten.', '十二比十多二。', 'twelve two'],
];
export default function build() { return autoBuild(SP, { title: '📖 单词身世 · 时间与数字 · 1', items: ITEMS, acts: ACTS }); }
