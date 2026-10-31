// 🪞 助动词照妖镜 · ① be 动词护卫 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 决策 36-② 长幕拆分：本幕只留第 1 节（共 4 节，其余在 scenes/aux_transformer_p2_1.js … 由 v5/split_auto.py 生成）
// 内容来源（R1 零丢失）：src/cases/aux_transformer.js 案例 1；对照清单 lab/INVENTORY_AUX_TRANSFORMER_1_V5.md
// 角色关键帧：sprites/at1.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/at1.js';
const ACTS = {"taking": ["m_photo"], "reading": ["l_read"]};
const ITEMS = [
  ['n', '这节课：一句话怎么一键变成否定句、疑问句、感叹句？秘密在「护卫」身上。'],
  ['p', '📷'],
  ['w', '助动词照妖镜'],
  ['w', '第一类：be 动词护卫'],
  ['w', '💡 记忆联想'],
  ['w', '✂️ 简化说法'],
  ['w', '助动词照妖镜'],
  ['w', '第一类：be 动词护卫'],
  ['w', '💡 记忆联想'],
  ['m', '✂️ 简化说法'],
  ['m', '① 肯定'],
  ['m', '② 否定'],
  ['m', '③ 一般疑问'],
  ['m', '④ 特殊疑问'],
  ['m', '⑤ 感叹·口诀'],
  ['m', '🔮 预测'],
  ['n', '五大句型变形：同一句话变出 5 种样子：肯定、否定、一般疑问、特殊疑问、感叹。'],
  ['w', '① 肯定句'],
  ['n', '肯定句：正面说一件事的句子：她现在正在公园里拍照。'],
  ['w', 'She is taking photos in the park now.'],
  ['s', 'She is taking photos in the park now.', '她现在正在公园里拍照。'],
  ['w', '她现在正在公园里拍照。'],
  ['n', 'be 动词：am / is / are / was / were，意思是「是、在」。这句里的 is 就是。'],
  ['w', '护卫'],
  ['n', '护卫词：be 动词、情态动词、助动词。只有护卫能背 not，能跳到主语前面提问。'],
  ['m', 'is'],
  ['m', 'be 护卫'],
  ['s', 'Be: am, is, are, was, were. I am ten. They were happy.', 'be 动词：am、is、are、was、were。我十岁。他们以前很开心。', 'be am is are was were'],
  ['w', '② 否定句'],
];
export default function build() { return autoBuild(SP, { title: '🪞 助动词照妖镜 · ① be 动词护卫', items: ITEMS, acts: ACTS }); }
