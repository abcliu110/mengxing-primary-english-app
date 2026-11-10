// ⚙️ GENERATED — 由知识模型生成，禁止手改。改内容：model/viewpoint.yaml；改本幕台词/结构：model/specs/viewpoint_4.yaml；改编排：模板 fp_zoom_focus_4.js（家族共用）。
// 判据/口诀来源：vp-cl-perfect、vp-xc-perfect-yesterday。生成器 model/gen_scene.py（items 模式）。
// 🔍 联想工具箱 ⑥ 站位与顺序 · 4 —— v5.1 标准画法重画（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源（R1 零丢失）：src/cases/fp_zoom_focus.js 案例 4；对照清单 lab/INVENTORY_FP_ZOOM_FOCUS_4_V5.md
// 角色关键帧：sprites/fz4.js（人物先行帧库 cast/）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/fz4.js';
const ACTS = {};
const ITEMS = [
  ['n', '这一幕：现在完成时，到底在说什么？是「做完了」吗？'],
  ['w', '完成时：和现在有关系'],
  ['w', '⑥ 站位与顺序的四个小机关'],
  ['w', '💡 这一幕的机关'],
  ['w', '完成时：和现在有关系'],
  ['w', '⑥ 站位与顺序的四个小机关'],
  ['m', '💡 这一幕的机关'],
  ['m', '① 先破误会'],
  ['m', '② 结果支'],
  ['m', '③ 持续支'],
  ['m', '④ 例外'],
  ['m', '⑤ 口诀'],
  ['m', '🔮 预测'],
  ['n', '先破一个最有名的误会：有人说完成时就是「做完了」。先记住这句话，等下看它错在哪。'],
  ['w', '误会：完成时 = 做完了？'],
  ['n', '完成时的样子：have / has + 过去分词。它讲的是：过去发生的事，和现在有关系。'],
  ['m', '过去'],
  ['m', '现在'],
  ['w', 'have / has + 过去分词（done）'],
  ['n', '第一支——结果留到现在：I have lost my key。钥匙是过去丢的，可「没找到」这个结果，一直摆到现在。'],
  ['w', 'I have lost my key.'],
  ['w', '结果：钥匙现在还没找到'],
  ['s', 'I have lost my key.', '我把钥匙丢了（现在还没找到）。', 'have lost key'],
  ['n', '第二支——一直持续到现在：I have lived here for ten years。十年前搬来，现在还住在这儿。'],
  ['w', 'I have lived here for ten years.'],
  ['w', '现在还住在这儿：事情没做完！'],
  ['n', '看——这件事根本没「做完」，误会破了：完成时不是「做完了」，是「过去和现在有关系」。'],
  ['w', '完成时 ≠ 做完了'],
  ['s', 'I have lived here for ten years.', '我在这儿住了十年了（现在还住）。', 'have lived ten years'],
  ['n', '例外：完成时不能单独配 yesterday 这样的过去时间点——说昨天，要用一般过去时。'],
  ['w', '⚠️ yesterday → I went yesterday.（一般过去时）'],
  ['w', 'since yesterday 可以：那是「从昨天到现在」一整段'],
  ['s', 'I went yesterday. I have lived here since yesterday.', '我昨天去了。我从昨天起就住在这儿。', 'went yesterday since'],
  ['n', '口诀：过去发生，和现在有关系 → have、has 加过去分词！'],
  ['w', '口诀：过去发生，和现在有关系'],
  ['n', '预测：「我住在这儿五年了，现在还住在这儿。」这件事做完了吗？该用完成时吗？先想 3 秒！'],
  ['w', '🔮 住了五年、还住着 → 完成时？'],
  ['n', '揭晓：没做完，但和现在有关系——正好用完成时：I have lived here for five years。'],
  ['w', 'I have lived here for five years. —— 持续支'],
  ['s', 'I have lived here for five years.', '我在这儿住了五年了。', 'have lived five years'],
  ['w', '💡 一句话洞见'],
  ['w', '完成时讲过去与现在的关联：'],
  ['w', '结果留到现在，或一直持续到现在'],
  ['w', '🎵 口诀'],
  ['w', '口诀：过去发生，和现在有关系 → have、has 加过去分词！'],
  ['w', '📦 联想工具箱 ⑥ 站位与顺序'],
];
export default function build() { return autoBuild(SP, { title: '完成时：过去和现在有关系', items: ITEMS, acts: ACTS }); }
