// 📘 G38 底层原理 · 比较级 —— 决策 38 ⑧ 啊哈重做（概念原语 lib/concept.js + scenes/cmp_lib.js 身高尺；啊哈卡 lab/audit38/aha/08_hd_g37_39.md）
// 内容来源：GRAMMAR_DB G38 + 旧版 src/cases/hd_g38.js 案例 1（清单 lab/INVENTORY_HD_G38_1_V5.md；截断句按 GRAMMAR_DB 补全、去 ** 与反引号）。角色：不用人物图。
// 画面：我 150 cm vs 弟弟 140 cm，我头顶冒出的那一截涂橙 = -er；than 是两根柱子中间的比较号。big→bigger（双写）、heavy→heavier（y 变 i）
//       先猜 interesting 接 -er 会怎样 → 「interestinger」舌头打结 💥 → more 站到前面。比较三兄弟第 2 幕。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import { ruler, person, readT, sayLen } from './cmp_lib.js';
import * as SP from '../sprites/hdg38_1.js';
const ACTS = {};
export const KNOW = [
  'G38 底层原理',
  '比较级：-er / more... + than（两者比高低） —— 两个人或事物PK比高下：短词尾加 -er，长词前加 more，后面紧跟标志词 than！',
  '【为什么短词加 -er，长词前加 more？】单音节短词加 -er 轻快（taller）；多音节长词（beautiful/interesting）在前面加独立的 more 避免拗口！',
  '🔬 G38 · 比较级：-er / more... + than（两者比高低） 底层结构拆解与汉英思维对比',
  'I am taller and stronger than my brother.', 'An elephant is bigger and heavier than a panda.', 'This storybook is more interesting than that one.',
  '我比弟弟更高更壮。大象比熊猫更大更重。这本故事书比那本更有趣。',
  '观察 bigger、heavier 和 more interesting 的比较级变形规律：',
  '重读闭音节 big 双写 g 加 er；辅音+y 结尾 heavy 变 i 加 er；多音节长词前加 more！',
  '① 规则变化：一般加 -er；以 e 结尾加 -r；双写五虎将（bigger, fatter, thinner, hotter, sadder）；辅音+y 变 i 加 -er（heavier, happier, funnier）；多音节前加 more（more beautiful/interesting）',
  '② 不规则：good/well ➔ better, bad ➔ worse, many/much ➔ more',
  '两者相比比高低，比较级配 than 字句；短词尾巴加 -er（去e/双写/变y为i），三音节长词加 more；好(good/well)变better，坏(bad)变worse，多变more，少变less！',
];
void ACTS;

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '身高尺上我 150 cm、弟弟 140 cm，我头顶多出的那一截涂成橙色，tall 尾巴上也长出一截橙色 -er；两根柱子之间立着 than',
    guess: 'interesting 这么长，尾巴上再接 -er 会怎样？',
    reveal: '「interestinger」一出来就舌头打结 💥，-er 被弹开，more 走到前面：more interesting',
    rule: '两者比：短词 + -er（去 e / 双写 / y 变 i），长词前加 more，后面跟 than；good→better、bad→worse、many/much→more',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  const say = (t, en, zh, key = []) => { const L = Math.max(sayLen(en), readT(zh) + 0.6); K.say(t, en, { zh, key, len: L }); return t + L + 0.5; };
  C.label('📘 G38 底层原理 · 比较级 -er / more', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  let T = 0.3;
  T = narr('比较级：-er / more... + than（两者比高低） —— 两个人或事物PK比高下：短词尾加 -er，长词前加 more，后面紧跟标志词 than！', T, 4);
  const BASE = 860, y = ruler(K, { x: 180, base: BASE, px: 4.2, lo: 60, hi: 170, from: 0.8 });
  const GAP0 = T;
  person(K, { x: 420, y0: y, base: BASE, emoji: '👦', name: 'I', cmAt: () => 150, col: BLUE, from: 1.2, extraAt: t => t >= GAP0 ? { px: (y(140) - y(150)) * Math.min(1, (t - GAP0) / 0.6) } : null });
  person(K, { x: 660, y0: y, base: BASE, emoji: '🧒', name: 'my brother', cmAt: () => 140, col: GREEN, from: 1.6 });
  K.at(GAP0).line(330, y(140), 760, y(140), { col: GREY, w: 4 });
  C.label('多出一截', 260, y(145) + 12, { size: 32, col: OR, from: GAP0 + 0.6 });
  C.chip({ text: 'than', x: 540, y: 560, size: 44, from: GAP0 + 1.2, col: OR, bd: OR, bold: true });
  const tall = C.chip({ text: 'tall', x: 1250, y: 330, size: 70, from: GAP0 + 0.4 });
  C.swap(tall, GAP0 + 1.6, 'taller', OR, '#fff', OR);
  const strong = C.chip({ text: 'strong', x: 1560, y: 330, size: 70, from: GAP0 + 0.8 });
  C.swap(strong, GAP0 + 2.2, 'stronger', OR, '#fff', OR);
  T = say(GAP0 + 2.6, 'I am taller and stronger than my brother.', '我比弟弟更高更壮。', ['taller', 'stronger', 'than']);
  // big / heavy
  const big = C.chip({ text: 'big', x: 1250, y: 480, size: 64, from: T }), heavy = C.chip({ text: 'heavy', x: 1560, y: 480, size: 64, from: T + 0.2 });
  C.pic({ emoji: '🐘', x: 1250, y: 610, size: 90, from: T + 0.3 }); C.pic({ emoji: '🐼', x: 1560, y: 610, size: 80, from: T + 0.4 });
  C.swap(big, T + 1.2, 'big+g+er', INK, '#fff', OR); C.swap(big, T + 2.4, 'bigger', OR, '#fff', OR);
  C.swap(heavy, T + 1.6, 'heav(y→i)er', INK, '#fff', OR); C.swap(heavy, T + 2.8, 'heavier', OR, '#fff', OR);
  T = say(T + 3.2, 'An elephant is bigger and heavier than a panda.', '大象比熊猫更大更重。', ['bigger', 'heavier', 'than']);
  T = narr('观察 bigger、heavier 和 more interesting 的比较级变形规律：', T, 3);
  T = narr('重读闭音节 big 双写 g 加 er；辅音+y 结尾 heavy 变 i 加 er；多音节长词前加 more！', T, 4);
  // 预测：interesting + er
  const IY = 760;
  const it = C.chip({ text: 'interesting', x: 1300, y: IY, size: 64, from: T, bd: RED });
  const er = C.chip({ text: '-er', x: 1680, y: IY, size: 56, from: T + 0.3, col: OR, bd: OR, bold: true });
  T = C.predict(T + 0.5, { q: 'interesting 这么长，尾巴再接 -er 会怎样？', sec: 4 });
  const R = T + 0.2;
  C.move(er, R, 1610, IY, 0.4); C.swap(it, R + 0.4, 'interestinger', RED, '#fff', RED);
  C.pic({ emoji: '💥', x: 1300, y: IY - 110, size: 80, from: R + 0.6, until: R + 2.4 });
  C.move(er, R + 1.6, 2150, IY + 120, 0.6);
  C.swap(it, R + 2.0, 'interesting', INK, '#fff', GREEN);
  const more = C.chip({ text: 'more', x: 900, y: IY + 160, size: 64, from: R + 2.0, col: OR, bd: OR, bold: true });
  C.drop(more, R + 2.3, 1045, IY);
  T = narr('「interestinger」舌头打结！长词不接尾巴，请 more 站到前面。', R + 0.4, 4);
  C.rule(T);
  T = say(T, 'This storybook is more interesting than that one.', '这本故事书比那本更有趣。', ['more', 'than']);
  T = narr('【为什么短词加 -er，长词前加 more？】单音节短词加 -er 轻快（taller）；多音节长词（beautiful/interesting）在前面加独立的 more 避免拗口！', T, 5);
  T = narr('🔬 G38 · 比较级：-er / more... + than（两者比高低） 底层结构拆解与汉英思维对比', T, 3);
  K.narr('我比弟弟更高更壮。大象比熊猫更大更重。这本故事书比那本更有趣。', T, T + 4.2); T += 4.4;
  T = narr('① 规则变化：一般加 -er；以 e 结尾加 -r；双写五虎将（bigger, fatter, thinner, hotter, sadder）；辅音+y 变 i 加 -er（heavier, happier, funnier）；多音节前加 more（more beautiful/interesting）', T, 6);
  T = narr('② 不规则：good/well ➔ better, bad ➔ worse, many/much ➔ more', T, 3.4);
  T = narr('两者相比比高低，比较级配 than 字句；短词尾巴加 -er（去e/双写/变y为i），三音节长词加 more；好(good/well)变better，坏(bad)变worse，多变more，少变less！', T, 6) + 1.0;
  K.end(T);
  return C.finish();
}
