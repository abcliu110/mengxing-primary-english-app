// 🪞 助动词照妖镜 · ① be 动词护卫 · 第 3 节 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：原 aux_transformer_1（299 s）的第 3 节（共 4 节，由 v5/split_auto.py 生成；App 白板下「第 3 节」按钮）
// 内容来源（R1 零丢失）：src/cases/aux_transformer.js 案例 1；对照清单 lab/INVENTORY_AUX_TRANSFORMER_1_V5.md
// 角色关键帧：sprites/at1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/at1.js';
const ACTS = {"taking": ["m_photo"], "reading": ["l_read"]};
const ITEMS = [
  ['n', '特殊疑问句：用疑问词开头、问具体信息的问句，不能只答 Yes / No。'],
  ['w', 'Where is she taking photos now?'],
  ['s', 'Where is she taking photos now?', '她现在在哪里拍照？'],
  ['n', '疑问词：Where 问地点。三步：换 Where → 提护卫 is → 擦掉 in the park。'],
  ['w', '对地点提问 → 擦掉'],
  ['w', 'in the park'],
  ['w', '① 换疑问词 Where ➔ ② 提护卫 is ➔ ③ 擦掉被提问的 in the park'],
  ['w', '⑤ 感叹句'],
  ['n', '感叹句：表达「多么……啊！」的句子，句末用感叹号。'],
  ['w', 'What beautiful photos she is taking! / How happy she is!'],
  ['s', 'What beautiful photos she is taking!', '她拍的照片多漂亮啊！'],
  ['n', 'What 和 How：感叹名词（photos）用 What 开头；感叹形容词（happy）用 How 开头。'],
  ['w', 'What + 形容词 + 名词 + 主谓！   How + 形容词 + 主谓！'],
  ['s', 'How happy she is!', '她多开心啊！', 'How happy'],
  ['s', 'Where? What? Beautiful!', '哪里？什么？真漂亮！', 'Where What beautiful'],
];
export default function build() { return autoBuild(SP, { title: '🪞 助动词照妖镜 · ① be 动词护卫 · 第 3 节', items: ITEMS, acts: ACTS }); }
