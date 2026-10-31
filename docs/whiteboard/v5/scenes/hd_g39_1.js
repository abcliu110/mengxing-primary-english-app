// 📘 G39 底层原理 · 最高级 —— 决策 38 ⑧ 啊哈重做（概念原语 lib/concept.js + scenes/cmp_lib.js 身高尺；啊哈卡 lab/audit38/aha/08_hd_g37_39.md）
// 内容来源：GRAMMAR_DB G39 + 旧版 src/cases/hd_g39.js 案例 1（清单 lab/INVENTORY_HD_G39_1_V5.md；截断句按 GRAMMAR_DB 补全、去 ** 与反引号）。角色：不用人物图。
// 画面：先两根柱子（比较级 taller than）→ 再来第三根、第四根：一群里选冠军 → 先猜冠军头上戴什么 → 王冠「the」落下 + -est；
//       范围框 in the zoo / of the four 把一群圈起来。比较三兄弟第 3 幕。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import { ruler, person, readT, sayLen } from './cmp_lib.js';
import * as SP from '../sprites/hdg39_1.js';
const ACTS = {};
export const KNOW = [
  'G39 底层原理',
  '最高级：the + -est / most...（三者及以上夺冠） —— 在三个或一群对象里选出“最……的冠军”——形容词最高级前必戴定冠词 the 王冠！',
  '【为什么最高级前面必须加 the？】因为全班最高的人是唯一锁定（特指）的冠军，自然要戴上定冠词王冠 the（the tallest / the biggest）！',
  '🔬 G39 · 最高级：the + -est / most...（三者及以上夺冠） 底层结构拆解与汉英思维对比',
  'The giraffe is the tallest animal in the zoo.', 'Blue whales are the biggest animals in the world.', 'Spring is the best season of the four.',
  '长颈鹿是动物园里最高的动物。蓝鲸是世上最大的动物。春天是四季中最好的季节。',
  '什么时候用比较级（-er），什么时候用最高级（the -est）？',
  '两者（2个）比较用比较级；三者及以上（≥3个）且常带 in/of 范围时用 the + 最高级！',
  '① 构成：tall ➔ the tallest, big ➔ the biggest, heavy ➔ the heaviest, interesting ➔ the most interesting；good/well ➔ the best, bad ➔ the worst',
  '② 范围词：in + 空间范围（in our class / in the world）；of + 同类群体（of the three / of all）',
  '三者以上选冠军，最高级前戴 the 冠；短词尾巴加 -est，长词前面 the most 站；同类群体用 of all，空间地点用 in the class！',
];
void ACTS;

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '身高尺上先只有斑马和大象两根柱子（两个比 → taller than）；接着熊猫、长颈鹿也站上来，长颈鹿一下子比所有人都高，范围框「in the zoo」把四个圈起来',
    guess: '一群里只有一个最高的冠军——他头上要戴什么？tall 尾巴又要接什么？',
    reveal: '王冠「the」落到长颈鹿头上，tall 长出 -est：the tallest；只有一个冠军 = 特指 → 戴 the',
    rule: '两者用比较级；三者及以上选冠军用 the + -est / the most，常带 in（地方）/ of（一群）',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  const say = (t, en, zh, key = []) => { const L = Math.max(sayLen(en), readT(zh) + 0.6); K.say(t, en, { zh, key, len: L }); return t + L + 0.5; };
  C.label('📘 G39 底层原理 · 最高级 the -est', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  let T = 0.3;
  T = narr('最高级：the + -est / most...（三者及以上夺冠） —— 在三个或一群对象里选出“最……的冠军”——形容词最高级前必戴定冠词 the 王冠！', T, 4);
  const BASE = 880, y = ruler(K, { x: 160, base: BASE, px: 1.5, lo: 0, hi: 400, step: 50, from: 0.8 });
  const A = [['🦓', 'zebra', 150, 360, GREEN, 1.2], ['🐘', 'elephant', 300, 580, BLUE, 1.6]];
  A.forEach(([e, n, cm, x, col, f]) => person(K, { x, y0: y, base: BASE, emoji: e, name: n, cmAt: () => cm, col, from: f, w: 130 }));
  // 两个比：比较级
  const c1 = C.chip({ text: 'taller', x: 1400, y: 300, size: 60, from: T, col: OR, bd: OR });
  T = narr('先只有两个：大象比斑马高 → taller than（比较级）。', T, 3.4);
  // 第三、四个上场
  const T3 = T;
  person(K, { x: 800, y0: y, base: BASE, emoji: '🐼', name: 'panda', cmAt: () => 120, col: GREY, from: T3, w: 130 });
  person(K, { x: 1020, y0: y, base: BASE, emoji: '🦒', name: 'giraffe', cmAt: () => 380, col: OR, from: T3 + 0.6, w: 130 });
  K.at(T3 + 1.4).rect(250, 170, 900, 760, { col: GREY, w: 4 });
  C.label('in the zoo', 380, 225, { size: 40, col: GREY, from: T3 + 2.0, bold: true });
  T = narr('什么时候用比较级（-er），什么时候用最高级（the -est）？', T3 + 0.4, 3.4);
  T = C.predict(T, { q: '一群里只有一个最高的冠军——它头上要戴什么？tall 尾巴又接什么？', sec: 4 });
  const R = T + 0.2, crownTop = y(380) - 120;
  const the = C.chip({ text: '👑 the', x: 1020, y: 120, size: 56, from: R, col: OR, bd: OR, bold: true, z: 7 });
  C.drop(the, R + 0.2, 1020, crownTop - 10);
  C.swap(c1, R + 0.9, 'the tallest', OR, '#fff', OR);
  C.label('只有 1 个冠军 = 特指 → the', 1460, 400, { size: 36, col: OR, from: R + 1.2 });
  T = say(R + 1.4, 'The giraffe is the tallest animal in the zoo.', '长颈鹿是动物园里最高的动物。', ['the', 'tallest', 'in']);
  T = narr('两者（2个）比较用比较级；三者及以上（≥3个）且常带 in/of 范围时用 the + 最高级！', T, 4);
  C.rule(T);
  T = narr('【为什么最高级前面必须加 the？】因为全班最高的人是唯一锁定（特指）的冠军，自然要戴上定冠词王冠 the（the tallest / the biggest）！', T, 5);
  // 变化卡
  const RX = 1480, RY = 500;
  [['big', 'the biggest'], ['heavy', 'the heaviest'], ['interesting', 'the most interesting'], ['good', 'the best']].forEach(([a, b], i) => {
    const c = C.chip({ text: a, x: RX, y: RY + i * 90, size: 44, from: T + i * 0.6 }); C.swap(c, T + i * 0.6 + 0.8, b, OR, '#fff', OR);
  });
  T = narr('① 构成：tall ➔ the tallest, big ➔ the biggest, heavy ➔ the heaviest, interesting ➔ the most interesting；good/well ➔ the best, bad ➔ the worst', T, 6);
  T = say(T, 'Blue whales are the biggest animals in the world.', '蓝鲸是世上最大的动物。', ['the', 'biggest', 'in']);
  T = say(T, 'Spring is the best season of the four.', '春天是四季中最好的季节。', ['the', 'best', 'of']);
  T = narr('② 范围词：in + 空间范围（in our class / in the world）；of + 同类群体（of the three / of all）', T, 4.4);
  T = narr('🔬 G39 · 最高级：the + -est / most...（三者及以上夺冠） 底层结构拆解与汉英思维对比', T, 3);
  K.narr('长颈鹿是动物园里最高的动物。蓝鲸是世上最大的动物。春天是四季中最好的季节。', T, T + 4.4); T += 4.6;
  T = narr('三者以上选冠军，最高级前戴 the 冠；短词尾巴加 -est，长词前面 the most 站；同类群体用 of all，空间地点用 in the class！', T, 6) + 1.0;
  K.end(T);
  return C.finish();
}
