// 📘 G19 底层原理 · 三单 -s ② —— 决策 38 ④ 啊哈重做 · 第 2 幕（决策 36-② 长幕拆分：常错 + does 吸走勋章 + 加法读音 + 口诀；第 1 幕 hd_g19_1）（概念原语 lib/concept.js；啊哈卡 lab/audit38/aha/04_hd_g19.md）
// 内容来源：GRAMMAR_DB G19 + 旧版 src/cases/hd_g19.js 案例 1（清单 lab/INVENTORY_HD_G19_1_V5.md；旧板截断的 why_explanation / 口诀按 GRAMMAR_DB 补全）
// 角色：本幕不用人物（R4 修订：规则课不凑动作）；sprites/hdg19_2.js 为空包。
// 画面：-s 是一枚橙色勋章。The boys like → 勋章在主语身上；The boy like? → 先猜勋章去哪 → 飞到动词 likes；
//       主语轮换 I / you / he / she / it / they，勋章跟着飞上飞下；He go ✗ → goes；does 出场把勋章吸走 → like 回原形。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import * as SP from '../sprites/hdg19_2.js';
const ACTS = {};
export const KNOW = [
  'G19 底层原理',
  '加法：一般 +s（likes）；s、x、ch、sh、o 结尾 +es（watches, goes）；辅音字母 + y 变 y 为 i 加 es（studies）',
  '读音：清辅音后读 /s/（works）；浊辅音和元音后读 /z/（plays）；s、x、ch、sh 后读 /ɪz/（watches）',
  '常错：He go to school. ✗ → He goes to school. ✓',
  '否定、疑问请 does：does 吸走 -s，likes ➔ like（He doesn\'t like it. / Does he like it?）',
  'He doesn\'t like milk. Does he like milk?', '他不喜欢牛奶。他喜欢牛奶吗？',
  '🗣️ 语境实证：My father works in a hospital and goes to work by car.',
  'My father works in a hospital and goes to work by car.',
  '不是我(I)来不是你(you)，孤身一人他她它；一般现在肯定句，动词必加 s 小尾巴！have 变 has，辅音+y 变 ies，ch/sh/s/x/o 后加 es！does 一出场，动词回原形！',
];
void ACTS;
const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '勋章复习：He go to school. 被红叉划掉 → 勋章落到 go 上变 goes；He likes milk. 旁边站着一个蓝色的 do',
    guess: 'do 一出场，likes 身上的 s 勋章会怎样？',
    reveal: '勋章从 likes 上飞走、落到 do 身上：do → does，likes 变回 like → He doesn\'t like milk. / Does he like milk?',
    rule: 'does / doesn\'t 一出场，-s 被吸走，动词回原形',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  const say = (t, en, zh, key = []) => { const L = Math.max(sayLen(en), readT(zh) + 0.6); K.say(t, en, { zh, key, len: L }); return t + L + 0.5; };
  const BADGE = (x, y, from, extra = {}) => C.chip({ text: 's', x, y, size: 64, from, col: '#fff', bg: OR, bd: OR, bold: true, pad: 16, z: 6, ...extra });
  C.label('📘 G19 底层原理 · 三单 -s ②', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  let T = 0.6;
  // ---- 常错 ----
  const Y3 = 460;
  const e1 = C.chip({ text: 'He go to school.', x: 960, y: Y3, size: 64, from: T, bd: RED });
  K.at(T + 0.8).cross(700, Y3 + 50, 1220, Y3 - 50, { col: RED, w: 7, fade: [T + 2.0, T + 2.4] });
  C.swap(e1, T + 2.2, 'He goes to school.', INK, '#ecfdf5', GREEN);
  T = narr('常错：He go to school. ✗ → He goes to school. ✓', T, 4.0);

  // ---- 第二次预测：does 吸走勋章 ----
  C.swap(e1, T, 'He likes milk.', INK, '#fff', INK);
  const DX = 1560;
  const dc = C.chip({ text: 'do', x: DX, y: Y3, size: 64, from: T + 0.4, col: BLUE, bd: BLUE, bold: true });
  T = narr('否定、疑问要请 do 来帮忙。可主语是 he……', T + 0.2, 3.0);
  T = C.predict(T, { q: 'do 一出场，likes 身上的 s 勋章会怎样？', sec: 4 });
  const R2 = T + 0.2;
  BADGE(1100, Y3 - 60, R2, { path: [[R2 + 0.3, DX + 60, Y3 - 70, 0.6], [R2 + 0.9, DX + 50, Y3, 0.2]], out: R2 + 1.2 });
  C.swap(e1, R2 + 0.3, 'He like milk.', INK, '#fff', INK);
  C.swap(dc, R2 + 1.1, 'does', OR, '#fff', OR);
  C.move(dc, R2 + 1.8, DX, Y3 - 110, 0.5);
  C.swap(e1, R2 + 2.4, 'He doesn\'t like milk.', INK, '#fff', BLUE);
  C.swap(dc, R2 + 2.4, 'Does he like milk?', INK, '#fff', BLUE);
  C.move(dc, R2 + 2.4, 1100, Y3 + 125, 0.5);
  C.rule(R2 + 1.0);
  T = narr('否定、疑问请 does：does 吸走 -s，likes ➔ like（He doesn\'t like it. / Does he like it?）', R2 + 1.0, 5);
  T = say(T, 'He doesn\'t like milk. Does he like milk?', '他不喜欢牛奶。他喜欢牛奶吗？', ['doesn\'t', 'does', 'like']);

  // ---- 加法 + 读音（勋章三种样子）----
  const FX = [560, 860, 1160, 1460], FY = 0, ADD = [['works', 's'], ['watches', 'es'], ['goes', 'es'], ['studies', 'ies']];
  ADD.forEach(([w, e], i) => C.chip({ text: w, x: FX[i], y: 800, size: 44, from: T + i * 0.4, col: INK, bd: OR }));
  T = narr('加法：一般 +s（likes）；s、x、ch、sh、o 结尾 +es（watches, goes）；辅音字母 + y 变 y 为 i 加 es（studies）', T, 5);
  T = narr('读音：清辅音后读 /s/（works）；浊辅音和元音后读 /z/（plays）；s、x、ch、sh 后读 /ɪz/（watches）', T, 5);

  // ---- 语境 + 口诀 ----
  T = narr('🗣️ 语境实证：My father works in a hospital and goes to work by car.', T, 3.4);
  T = say(T - 3.0, 'My father works in a hospital and goes to work by car.', '我爸爸在医院工作，开车去上班。', ['works', 'goes']);
  T = narr('🎵 口诀：不是我(I)来不是你(you)，孤身一人他她它；一般现在肯定句，动词必加 s 小尾巴！have 变 has，辅音+y 变 ies，ch/sh/s/x/o 后加 es！does 一出场，动词回原形！', T, 6) + 1.0;
  K.end(T);
  return C.finish();
}
