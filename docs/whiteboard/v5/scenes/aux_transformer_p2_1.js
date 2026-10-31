// 🪞 助动词照妖镜 · ① be 动词护卫 · 第 2 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 aux_transformer_1（299 s）的第 2 节（共 4 节，由 v5/split_auto.py 生成；App 白板下「第 2 节」按钮）
// 内容来源（R1 零丢失）：src/cases/aux_transformer.js 案例 1；对照清单 lab/INVENTORY_AUX_TRANSFORMER_1_V5.md
// 角色关键帧：sprites/at1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/at1.js';
const ACTS = {"taking": ["m_photo"], "reading": ["l_read"]};
const ITEMS = [
  ['n', '否定句：说「不」的句子。not 直接贴在护卫 is 身后：is not = isn\'t。'],
  ['w', 'She is not (isn\'t) taking photos in the park now.'],
  ['s', 'She isn\'t taking photos in the park now.', '她现在没在公园里拍照。', 'isn\'t'],
  ['w', '直接在护卫 is 身后贴上 not（is not = isn\'t）'],
  ['s', 'Taking photos in the park now.', '现在在公园里拍照。', 'taking photos in the park now'],
  ['w', '③ 一般疑问'],
  ['n', '一般疑问句：能用 Yes / No 回答的问句。把护卫 Is 提到主语 she 前面。'],
  ['w', 'Is she taking photos in the park now?'],
  ['s', 'Is she taking photos in the park now?', '她现在正在公园里拍照吗？'],
  ['n', '主语：句子在说「谁」，这里是 she（她）。护卫跳过主语，站到句首。'],
  ['w', '护卫 Is 提到主语 she 前面'],
  ['n', '回答也请护卫出场：Yes, she is. / No, she isn\'t.'],
  ['w', '— Yes, she is. / No, she isn\'t.'],
  ['s', 'She is not taking photos. Is she in the park? Yes, she is. No, she isn\'t.', '她没在拍照。她在公园吗？是的，她在。不，她不在。', 'She is not Yes No'],
  ['w', '④ 特殊疑问'],
];
export default function build() { return autoBuild(SP, { title: '🪞 助动词照妖镜 · ① be 动词护卫 · 第 2 节', items: ITEMS, acts: ACTS }); }
