// 📘 G07 底层原理 · 主格与宾格 · 第 2 节 —— 决策 38 ⑦ 啊哈重做 · 第 2 节（决策 36-② 从 hd_g07_1 拆出；概念原语 lib/concept.js；啊哈卡 lab/audit38/aha/07_hd_g07.md）
// 内容来源：GRAMMAR_DB G07 + 旧版 src/cases/hd_g07.js 案例 1（清单 lab/INVENTORY_HD_G07_1_V5.md；旧板截断的 why_explanation 按 GRAMMAR_DB 补全）。
// App 里 G07 只播本幕（GRAMMAR_FIXED_ACT G07: 0）；旧 ②（名物代）③（指示代词）是代词全局原理的板，不在 G07 播放，本次不动。角色：不用人物。
// 画面：左「句首主语区」、中间一扇「动词 / 介词门」、右「动介后宾语区」。代词卡从左边走进门——先猜出门后还叫不叫 I——出门变 me；
//       he / she / we / they 依次过门换装，you / it 过门不变；门牌换成 with / at 照样换。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import * as SP from '../sprites/hdg07p2_1.js';
const ACTS = {};
export const KNOW = [
  "G07 底层原理",
  "⚡ 动词/介词转换门",
  "👑 句首主语区",
  "🎯 动介后宾语区",
  "help / give / to / with",
  "We often help him, and he plays with us.",
  "Look at them! They are singing.",
  "我喜欢怀特老师，她也喜欢我。我们经常帮助他，他和我们一起玩。看他们！他们正在唱歌。",
  "观察 I/me、he/him、we/us、they/them 在句子中的位置：什么时候用主格，什么时候用宾格？",
  "在动词前面当主语用主格（I/he/we/they），在动词或介词（at/with/to/for）后面当宾语用宾格（me/him/us/them）",
  "① 主格（站动词前作主语）：I, you, he, she, it, we, they",
  "② 宾格（站动词或介词后作宾语）：me, you, him, her, it, us, them（Let us go / Look at me / play with her）",
  "③ 礼貌排序：几个人并列时把自己放最后，单数常说 你、他、我 (you, he and I)。⚠️ 复数「we, you and they」是国内教辅的口诀，英语里并没有这样固定的规定",
  "动前主格动后宾，介词后面也用宾！I变me，we变us，he变him，she变her，they变them要记准，只有you和it主宾长相不改变！",
];
void ACTS;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '还是那扇门，门牌从 likes 换成了 with（介词）；we 站在左边主语区',
    guess: '门牌换成介词 with，we 过门还会换装吗？',
    reveal: 'we 一出门照样翻成 us：he plays with us；门牌换成 at，they 过门变 them：Look at them!',
    rule: '介词后面也用宾格：I→me、we→us、he→him、she→her、they→them，只有 you 和 it 不变',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  const say = (t, en, zh, key = []) => { const L = Math.max(sayLen(en), readT(zh) + 0.6); K.say(t, en, { zh, key, len: L }); return t + L + 0.5; };
  C.label('📘 G07 底层原理 · 主格与宾格 · 第 2 节', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  let T = 2.4;
  // ---- 舞台：两区 + 一扇门 ----
  const DX = 960, DY0 = 300, DY1 = 730, DW = 200, LX = 450, RX = 1470, PY = 560;
  K.at(0.8).rect(DX - DW / 2, DY0, DW, DY1 - DY0, { col: OR, w: 7, speed: 4000 });
  C.label('👑 句首主语区', LX, 260, { size: 44, col: BLUE, from: 1.2, bold: true });
  C.label('🎯 动介后宾语区', RX, 260, { size: 44, col: GREEN, from: 1.4, bold: true });
  C.label('⚡ 动词/介词转换门', DX, 800, { size: 36, col: OR, from: 1.6 });
  const sign = C.chip({ text: 'likes', x: DX, y: DY0 + 60, size: 56, from: 1.6, col: OR, bd: OR, bold: true });
  // 门的「换装」闪光：passes 里每个时刻闪一下
  const passes = [];
  K.prop((g, t) => {
    for (const p of passes) { const q = (t - p) / 0.5; if (q < 0 || q > 1) continue;
      g.save(); g.globalAlpha = 0.6 * (1 - q); g.fillStyle = 'rgba(253,224,71,.9)'; g.fillRect(DX - DW / 2 + 6, DY0 + 6, DW - 12, DY1 - DY0 - 12); g.restore(); }
  }, { from: 0, z: 2 });
  // ---- 门牌换成介词 ----
  C.swap(sign, T, 'with', OR, '#fff', OR);
  K.narr('help / give / to / with', T, T + 2.4);
  const we = C.chip({ text: 'we', x: LX, y: PY + 130, size: 70, from: T + 0.4, col: BLUE, bd: BLUE, z: 5 });
  T = C.predict(T + 2.6, { q: '门牌换成介词 with，we 过门还会换装吗？', sec: 4 }) - 0.8;
  we.keys.push([T + 0.8, [RX, PY + 130], 1.2, 'io']); passes.push(T + 1.35); C.swap(we, T + 1.4, 'us', GREEN, '#fff', GREEN);
  C.rule(T + 1.4);
  T = say(T + 2.2, 'We often help him, and he plays with us.', '我们经常帮助他，他和我们一起玩。', ['him', 'us']);
  C.swap(sign, T, 'at', OR, '#fff', OR);
  const th = C.chip({ text: 'they', x: LX, y: PY, size: 70, from: T + 0.3, col: BLUE, bd: BLUE, z: 5 });
  th.keys.push([T + 0.7, [RX, PY], 1.2, 'io']); passes.push(T + 1.25); C.swap(th, T + 1.3, 'them', GREEN, '#fff', GREEN);
  T = say(T + 2.0, 'Look at them! They are singing.', '看他们！他们正在唱歌。', ['them', 'they']);
  K.narr('我喜欢怀特老师，她也喜欢我。我们经常帮助他，他和我们一起玩。看他们！他们正在唱歌。', T, T + 4.6); T += 4.8;
  T = narr('观察 I/me、he/him、we/us、they/them 在句子中的位置：什么时候用主格，什么时候用宾格？', T, 3.6);
  T = narr('在动词前面当主语用主格（I/he/we/they），在动词或介词（at/with/to/for）后面当宾语用宾格（me/him/us/them）', T, 4.4);
  T = narr('① 主格（站动词前作主语）：I, you, he, she, it, we, they', T, 3.2);
  T = narr('② 宾格（站动词或介词后作宾语）：me, you, him, her, it, us, them（Let us go / Look at me / play with her）', T, 4.2);
  T = narr('③ 礼貌排序：几个人并列时把自己放最后，单数常说 你、他、我 (you, he and I)。⚠️ 复数「we, you and they」是国内教辅的口诀，英语里并没有这样固定的规定', T, 5);
  T = narr('动前主格动后宾，介词后面也用宾！I变me，we变us，he变him，she变her，they变them要记准，只有you和it主宾长相不改变！', T, 6) + 1.0;
  K.end(T);
  return C.finish();
}
