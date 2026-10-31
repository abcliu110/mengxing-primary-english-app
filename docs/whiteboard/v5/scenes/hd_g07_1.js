// 📘 G07 底层原理 · 主格与宾格 —— 决策 38 ⑦ 啊哈重做 · 第 1 节（决策 36-② 拆分：介词门 + 总结在第 2 节 hd_g07_p2_1，App 白板下「第 2 节」按钮；概念原语 lib/concept.js；啊哈卡 lab/audit38/aha/07_hd_g07.md）
// 内容来源：GRAMMAR_DB G07 + 旧版 src/cases/hd_g07.js 案例 1（清单 lab/INVENTORY_HD_G07_1_V5.md；旧板截断的 why_explanation 按 GRAMMAR_DB 补全）。
// App 里 G07 只播本幕（GRAMMAR_FIXED_ACT G07: 0）；旧 ②（名物代）③（指示代词）是代词全局原理的板，不在 G07 播放，本次不动。角色：不用人物。
// 画面：左「句首主语区」、中间一扇「动词 / 介词门」、右「动介后宾语区」。代词卡从左边走进门——先猜出门后还叫不叫 I——出门变 me；
//       he / she / we / they 依次过门换装，you / it 过门不变；门牌换成 with / at 照样换。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import * as SP from '../sprites/hdg07_1.js';
const ACTS = {};
export const KNOW = [
  "G07 底层原理",
  "人称代词主格与宾格 (I vs me / he vs him) —— 动词前作主语用“主格”，动词和介词后面作宾语必须换“宾格”！",
  "【为什么汉语都是“我”，英语却要分 I 和 me？】英语给代词穿上了“位置制服”：站在句首指挥动作的主人穿“主格礼服”（I / he / she / we / they），站在动词或介词后面接受动作的对象必须换上“宾格工作服”（me / him / her / us / them）！",
  "🔬 深度机制 1：为什么『我/他』在动词前后要换衣服？（主格 vs 宾格）",
  "👑 句首主语区",
  "I / he / she / they",
  "(动作发起人穿主格)",
  "⚡ 动词/介词转换门",
  "穿过此门强制换宾格!",
  "🎯 动介后宾语区",
  "me / him / her / them",
  "(承受动作穿宾格)",
  "主格 He",
  "变宾格 him!",
  "I like Miss White, and she likes me too.",
];
void ACTS;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '左边「句首主语区」站着代词卡 I，中间一扇写着 likes 的门，右边是「动介后宾语区」；she 站在门前当主语，I 朝门走去',
    guess: 'I 穿过 likes 这扇门、站到后面——还叫 I 吗？',
    reveal: '一出门就翻成 me：she likes me。接着 he→him、she→her、we→us、they→them 过门都换装，you 和 it 过门长相不变',
    rule: '动词前作主语用主格；动词或介词后作宾语用宾格',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  const say = (t, en, zh, key = []) => { const L = Math.max(sayLen(en), readT(zh) + 0.6); K.say(t, en, { zh, key, len: L }); return t + L + 0.5; };
  C.label('📘 G07 底层原理 · 主格与宾格', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  let T = 0.3;
  T = narr('人称代词主格与宾格 (I vs me / he vs him) —— 动词前作主语用“主格”，动词和介词后面作宾语必须换“宾格”！', T, 4);
  T = narr('🔬 深度机制 1：为什么『我/他』在动词前后要换衣服？（主格 vs 宾格）', T, 3.2);

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
  // 主语 she 在门前
  const sh = C.chip({ text: 'she', x: LX, y: PY - 140, size: 70, from: 2.0, col: BLUE, bd: BLUE });
  void sh;
  // I 从主语区走向门
  const I = C.chip({ text: 'I', x: LX, y: PY, size: 80, from: 2.2, col: BLUE, bd: BLUE, z: 5 });
  T = Math.max(T, 2.6);
  T = say(T, 'I like Miss White, and she likes me too.', '我喜欢怀特老师，她也喜欢我。', ['I', 'she', 'me']);
  C.move(I, T, DX - 170, PY, 1.2);
  T += 1.3;
  T = C.predict(T, { q: 'I 穿过 likes 这扇门、站到后面——还叫 I 吗？', sec: 4 });
  const R = T + 0.2;
  C.move(I, R, RX, PY, 0.9); passes.push(R + 0.35); C.swap(I, R + 0.4, 'me', GREEN, '#fff', GREEN);
  C.label('she likes me', DX, 870, { size: 48, col: INK, from: R + 1.0, out: R + 4 });
  T = say(R + 1.0, 'she likes me', '她喜欢我', ['me']);
  T = narr('【为什么汉语都是“我”，英语却要分 I 和 me？】英语给代词穿上了“位置制服”：站在句首指挥动作的主人穿“主格礼服”（I / he / she / we / they），站在动词或介词后面接受动作的对象必须换上“宾格工作服”（me / him / her / us / them）！', T, 7);
  C.rule(T);
  // ---- 依次过门 ----
  C.label('I / he / she / they', LX, 790, { size: 40, col: BLUE, from: T });
  C.label('(动作发起人穿主格)', LX, 840, { size: 32, col: GREY, from: T });
  C.label('me / him / her / them', RX, 790, { size: 40, col: GREEN, from: T });
  C.label('(承受动作穿宾格)', RX, 840, { size: 32, col: GREY, from: T });
  C.move(I, T, RX, PY - 140, 0.6);
  const SEQ = [['he', 'him'], ['she', 'her'], ['we', 'us'], ['they', 'them'], ['you', 'you'], ['it', 'it']];
  const STEP = 2.0, t0 = T + 0.3;
  SEQ.forEach(([a, b], k) => {
    const t = t0 + k * STEP, same = a === b;
    const c = C.chip({ text: a, x: LX, y: PY, size: 70, from: t, col: BLUE, bd: BLUE, z: 5, out: t + STEP + 0.3 });
    c.keys.push([t + 0.3, [RX, PY], 1.2, 'io']); passes.push(t + 0.85);
    C.swap(c, t + 0.9, b, same ? GREY : GREEN, '#fff', same ? GREY : GREEN);
    if (same) C.label('不变', RX + 150, PY + 10, { size: 36, col: GREY, from: t + 1.0, out: t + STEP });
  });
  K.narr('主格 He', t0, t0 + STEP - 0.2); K.narr('变宾格 him!', t0 + 0.9, t0 + STEP);
  K.narr('穿过此门强制换宾格!', t0 + STEP, t0 + 4 * STEP);
  K.narr('只有 you 和 it 过门长相不变。', t0 + 4 * STEP, t0 + 6 * STEP);
  T = t0 + SEQ.length * STEP + 0.4;
  T += 1.0;
  K.end(T);
  return C.finish();
}
