// 📘 G19 底层原理 · 三单 -s —— 决策 38 ④ 啊哈重做（概念原语 lib/concept.js；啊哈卡 lab/audit38/aha/04_hd_g19.md）
// 内容来源：GRAMMAR_DB G19 + 旧版 src/cases/hd_g19.js 案例 1（清单 lab/INVENTORY_HD_G19_1_V5.md；旧板截断的 why_explanation / 口诀按 GRAMMAR_DB 补全）
// 角色：本幕不用人物（R4 修订：规则课不凑动作）；sprites/hdg19_1.js 为空包。
// 画面：-s 是一枚橙色勋章。The boys like → 勋章在主语身上；The boy like? → 先猜勋章去哪 → 飞到动词 likes；
//       主语轮换 I / you / he / she / it / they，勋章跟着飞上飞下；He go ✗ → goes；does 出场把勋章吸走 → like 回原形。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import * as SP from '../sprites/hdg19_1.js';
const ACTS = {};
export const KNOW = [
  'G19 底层原理',
  '一般现在时第三人称单数（三单小尾巴 -s/-es） —— 不是你(you)、不是我(I)、而且只有1个他/她/它——动词必须戴上 -s 小勋章！',
  '【英语为什么非要给三单动词加 -s？】复数主语名词自带了 -s（The boys like...），而单数第三人称主语没带 -s（The boy...），于是英语把 -s 勋章贴到动词上（The boy likes...），用来精密锁定主语是单数第三人称！',
  '🔬 三单警报器：主语是 he / she / it 或一个人、一样东西 → 动词加 -s',
  '公式：He / She / It + 动词-s（-es）',
  '加法：一般 +s（likes）；s、x、ch、sh、o 结尾 +es（watches, goes）；辅音字母 + y 变 y 为 i 加 es（studies）',
  '读音：清辅音后读 /s/（works）；浊辅音和元音后读 /z/（plays）；s、x、ch、sh 后读 /ɪz/（watches）',
  '对比：I like apples. → She likes apples.', 'She likes apples.', '她喜欢苹果。',
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
    see: '第一行 The boys like apples.：一枚橙色「s」勋章挂在主语 boy 身上；第二行 The boy like apples.：主语身上没有勋章',
    guess: '第二行的 -s 勋章跑到哪里去了？',
    reveal: '勋章从主语那里跳起来，落到动词上：like → likes。再换主语：I / you / they 来勋章飞走，he / she / it 来勋章又飞回；does 一出场把勋章吸进自己身上（do → does），likes 变回 like',
    rule: '三单警报器：主语是 he / she / it 或一个人、一样东西 → 动词加 -s；does / doesn\'t 后动词回原形',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  const say = (t, en, zh, key = []) => { const L = Math.max(sayLen(en), readT(zh) + 0.6); K.say(t, en, { zh, key, len: L }); return t + L + 0.5; };
  const BADGE = (x, y, from, extra = {}) => C.chip({ text: 's', x, y, size: 64, from, col: '#fff', bg: OR, bd: OR, bold: true, pad: 16, z: 6, ...extra });

  C.label('📘 G19 底层原理 · 三单 -s', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  let T = 0.3;
  T = narr('一般现在时第三人称单数（三单小尾巴 -s/-es） —— 不是你(you)、不是我(I)、而且只有1个他/她/它——动词必须戴上 -s 小勋章！', T, 4);

  // ---- 两行句子 ----
  const Y1 = 330, Y2 = 560, SX = 600, BXs = 790, VX = 1040, OX = 1360;
  const r1 = [C.chip({ text: 'The boy', x: SX, y: Y1, size: 80, from: 1.0 }), C.chip({ text: 'like', x: VX, y: Y1, size: 80, from: 1.3 }), C.chip({ text: 'apples.', x: OX, y: Y1, size: 80, from: 1.5 })];
  T = say(Math.max(T, 2.6), 'The boys like apples.', '男孩们喜欢苹果。', ['boys']);
  const s2 = C.chip({ text: 'The boy', x: SX, y: Y2, size: 80, from: T });
  const v2 = C.chip({ text: 'like', x: VX, y: Y2, size: 80, from: T + 0.3 });
  C.chip({ text: 'apples.', x: OX, y: Y2, size: 80, from: T + 0.5 });
  C.label('👦 一个', 250, Y2 + 16, { size: 40, col: BLUE, from: T });
  C.slot({ x: BXs, y: Y2, w: 90, h: 100, from: T + 0.8, until: T + 6.5 });
  T += 1.2;
  T = narr('一个男孩：主语身上没有 s 勋章了。', T, 2.6);
  T = C.predict(T, { q: '第二行的 -s 勋章跑到哪里去了？主语身上没有，那它在哪？', sec: 4 });
  // 揭晓：勋章在主语后跳出 → 飞到动词身上
  const REV = T + 0.2;
  const b2 = BADGE(BXs, Y2, REV, { path: [[REV + 0.7, BXs, Y2 - 90, 0.4], [REV + 1.1, VX + 70, Y2 - 60, 0.5], [REV + 1.6, VX + 70, Y2 - 14, 0.3, 'back']], out: REV + 2.2 });
  void b2;
  C.swap(v2, REV + 2.0, 'likes', OR, '#fff', OR);
  T = say(REV + 2.4, 'The boy likes apples.', '男孩喜欢苹果。', ['likes']);
  T = narr('【英语为什么非要给三单动词加 -s？】复数主语名词自带了 -s（The boys like...），而单数第三人称主语没带 -s（The boy...），于是英语把 -s 勋章贴到动词上（The boy likes...），用来精密锁定主语是单数第三人称！', T, 6);
  C.rule(T);
  T = narr('🔬 三单警报器：主语是 he / she / it 或一个人、一样东西 → 动词加 -s', T, 3.4);

  // ---- 主语轮换：勋章飞上飞下 ----
  const SUBJ = [['I', 0], ['You', 0], ['He', 1], ['She', 1], ['It', 1], ['They', 0]], STEP = 1.5;
  let on = true;
  SUBJ.forEach(([sj, third], k) => {
    const t = T + k * STEP;
    C.swap(s2, t, sj, third ? OR : INK, '#fff', third ? OR : INK);
    if (third !== on) {
      if (third) BADGE(VX + 300, Y2 - 120, t + 0.2, { path: [[t + 0.25, VX + 70, Y2 - 14, 0.45, 'back']], out: t + 0.75 });
      else BADGE(VX + 70, Y2 - 14, t + 0.2, { path: [[t + 0.25, VX + 300, Y2 - 140, 0.45]], out: t + 0.8 });
      C.swap(v2, t + 0.55, third ? 'likes' : 'like', third ? OR : INK, '#fff', third ? OR : INK);
      on = !!third;
    }
  });
  K.narr('公式：He / She / It + 动词-s（-es）', T, T + SUBJ.length * STEP);
  T += SUBJ.length * STEP + 0.3;
  C.swap(s2, T, 'She', OR, '#fff', OR); C.swap(v2, T, 'likes', OR, '#fff', OR);
  C.swap(r1[0], T, 'I', INK);   // 第一行改成 I like apples. 做对比
  BADGE(BXs, Y1, 2.2, { out: T - 0.2 }); C.label('👦👦 两个', 250, Y1 + 16, { size: 40, col: BLUE, from: 1.0, out: T - 0.2 }); C.label('🙋 我', 250, Y1 + 16, { size: 40, col: BLUE, from: T + 0.2 });
  T = narr('对比：I like apples. → She likes apples.', T, 3.0);
  T = say(T - 1.6, 'She likes apples.', '她喜欢苹果。', ['likes']);

  // ---- 常错 ----
  const Y3 = 770;
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
  C.move(dc, R2 + 2.4, 1100, Y3 + 95, 0.5);
  T = narr('否定、疑问请 does：does 吸走 -s，likes ➔ like（He doesn\'t like it. / Does he like it?）', R2 + 1.0, 5);
  T = say(T, 'He doesn\'t like milk. Does he like milk?', '他不喜欢牛奶。他喜欢牛奶吗？', ['doesn\'t', 'does', 'like']);

  // ---- 加法 + 读音（勋章三种样子）----
  const FX = [1730, 1730, 1730, 1730], FY = 0, ADD = [['works', 's'], ['watches', 'es'], ['goes', 'es'], ['studies', 'ies']];
  ADD.forEach(([w, e], i) => C.chip({ text: w, x: FX[i], y: 250 + i * 80, size: 44, from: T + i * 0.4, col: INK, bd: OR }));
  T = narr('加法：一般 +s（likes）；s、x、ch、sh、o 结尾 +es（watches, goes）；辅音字母 + y 变 y 为 i 加 es（studies）', T, 5);
  T = narr('读音：清辅音后读 /s/（works）；浊辅音和元音后读 /z/（plays）；s、x、ch、sh 后读 /ɪz/（watches）', T, 5);

  // ---- 语境 + 口诀 ----
  T = narr('🗣️ 语境实证：My father works in a hospital and goes to work by car.', T, 3.4);
  T = say(T - 3.0, 'My father works in a hospital and goes to work by car.', '我爸爸在医院工作，开车去上班。', ['works', 'goes']);
  T = narr('🎵 口诀：不是我(I)来不是你(you)，孤身一人他她它；一般现在肯定句，动词必加 s 小尾巴！have 变 has，辅音+y 变 ies，ch/sh/s/x/o 后加 es！does 一出场，动词回原形！', T, 6) + 1.0;
  K.end(T);
  return C.finish();
}
