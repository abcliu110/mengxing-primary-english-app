// 🪞 助动词照妖镜 · ① be 动词护卫 · 第 4 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 aux_transformer_1（299 s）的第 4 节（共 4 节，由 v5/split_auto.py 生成；App 白板下「第 4 节」按钮）
// 内容来源（R1 零丢失）：src/cases/aux_transformer.js 案例 1；对照清单 lab/INVENTORY_AUX_TRANSFORMER_1_V5.md
// 角色关键帧：sprites/at1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/at1.js';
const ACTS = {"taking": ["m_photo"], "reading": ["l_read"]};
const ITEMS = [
  ['n', '五种句子都变出来了！be 动词自己就是护卫，不用请外援 do / does / did。'],
  ['w', '① She is taking photos in the park now.'],
  ['w', '② She is not (isn\'t) taking photos in the park now.'],
  ['w', '③ Is she taking photos in the park now?'],
  ['w', '④ Where is she taking photos now?'],
  ['s', 'Do, does, did. Do you like it?', 'do、does、did。你喜欢它吗？', 'do does did'],
  ['w', '有 be 就用 be：not 贴身后，提问跳句首，不请 do / does / did！'],
  ['n', '口诀：有 be 就用 be：not 贴在身后，提问跳到句首。'],
  ['n', '预测：「他正在看书」变成一般疑问句：护卫是谁？它该跳到哪里？先想 3 秒！'],
  ['w', '🔮 他正在看书。He is reading a book.'],
  ['w', '→  ___ he reading a book?'],
  ['s', 'He is reading a book.', '他正在看书。', 'he reading book'],
  ['n', '揭晓：护卫 is 跳到主语 he 前面，句首大写：Is he reading a book?'],
  ['w', 'Is he reading a book?'],
  ['s', 'Is he reading a book?', '他正在看书吗？', 'is he reading a book'],
  ['w', '💡 一句话洞见'],
  ['w', 'be 动词自己就是护卫：'],
  ['w', '变否定贴 not，变疑问跳句首，不用请外援'],
  ['w', '🎵 口诀'],
  ['w', '口诀：有 be 就用 be：not 贴身后，'],
  ['w', '提问跳句首，不请 do / does / did！'],
  ['w', '🪞 助动词照妖镜 · 第一类 be 动词护卫']
];
export default function build() { return autoBuild(SP, { title: '🪞 助动词照妖镜 · ① be 动词护卫 · 第 4 节', items: ITEMS, acts: ACTS }); }
