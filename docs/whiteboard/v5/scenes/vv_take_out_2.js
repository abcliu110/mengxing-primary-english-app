// 🎬 万能动词 · take out ② —— 决策 38 ⑫ 啊哈重做「out 一列」（概念原语 lib/concept.js；啊哈卡 lab/audit38/aha/12_vv_out.md）
// 内容来源：旧版 src/cases/vv_take_out.js 案例 2（清单 lab/INVENTORY_VV_TAKE_OUT_2_V5.md）全部文字 + 同列 get / look / put / give out 第 1 幕的例句（vv_*_out_1.js）。
// 画面：左边一个大框 = 里面，中间一条橙色门线，右边 = 外面。五个 out 动词一行一个，东西都跨过门线出去：
//   书出书包（take out）、人出出租车（get out）→ 先猜 give out 的本子会往哪走 → 本子散开跨出去 → look out 目光探出窗、put out 火苗「出去」= 灭 →
//   孩子自己说出 OUT = 从里面到外面。角色：不用人物帧。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED } from '../lib/concept.js';
import * as SP from '../sprites/vvtakeout2.js';
const ACTS = {};
export const KNOW = [
  'take out：拿出，取出；带…出去', 'take out ②', '带…出去', '家里', '带出门', 'He takes the dog out.', '他带小狗出去散步。',
  'TAKE', '从里面出来', '拿、取', 'Take out your book.', '书 离开 书包', '拿出你的书。', 'Take the dog out.', '人和狗 离开 家', '带小狗出去。',
  '共同点：OUT = 从里面到外面', 'Please take out your English book.', '请把你们的英语书从书包里拿出来。',
];
void ACTS;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '左边大框 = 里面，中间一条橙色门线，右边 = 外面；书从书包里跨出门线（take out），小狗跟人从家里出门（take the dog out），人从出租车里出来（get out）',
    guess: 'give out 分发本子——本子会往哪儿走？',
    reveal: '一摞本子散开，一本本跨过门线到外面每个人手里；look out 目光探出窗外、put out 火苗「出去」就灭了——五行全都是从里面到外面',
    rule: '共同点：OUT = 从里面到外面',
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  const say = (t, en, zh, key = ['out']) => { const L = Math.max(sayLen(en), readT(zh) + 0.6); K.say(t, en, { zh, key, len: L }); return t + L + 0.5; };
  C.label('🎬 万能动词 · take out ② · out 一列', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  let T = 0.3;
  T = narr('take out：拿出，取出；带…出去', T, 3);
  // 舞台
  const DX = 820, X0 = 110;
  K.at(0.6).rect(X0, 200, DX - X0, 700, { col: BLUE, w: 5, speed: 6000 });
  K.at(1.0).line(DX, 180, DX, 920, { col: OR, w: 8 });
  C.label('里面', (X0 + DX) / 2, 250, { size: 40, col: BLUE, from: 1.0, bold: true });
  C.label('外面 OUT', 1060, 250, { size: 40, col: OR, from: 1.2, bold: true });
  const ROWS = [300, 420, 540, 660, 780], VX = 1400;
  const verb = (i, text, zh, from) => { C.chip({ text, x: VX, y: ROWS[i] + 10, size: 46, from, col: OR, bd: OR, bold: true }); C.label(zh, VX + 150, ROWS[i] + 22, { size: 30, col: GREY, from: from + 0.2, align: 'left' }); };
  const fly = (emoji, i, t, { x0 = 560, x1 = 1060, size = 80, gone = false, arc = 60 } = {}) => K.prop((g, tt) => {
    if (tt < t - 0.6) return; const p = clamp((tt - t) / 1.2), e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    const x = x0 + (x1 - x0) * e, y = ROWS[i] + 20 - arc * Math.sin(Math.PI * e);
    g.save(); g.globalAlpha = Math.min(clamp((tt - t + 0.6) / 0.4), gone ? 1 - clamp((tt - t - 1.0) / 0.5) : 1); g.font = `${size}px sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(emoji, x, y); g.restore();
  }, { from: t - 0.6, z: 3 });
  // ① take out：书出书包
  let t1 = Math.max(T, 2.0);
  C.pic({ emoji: '🎒', x: 420, y: ROWS[0] + 20, size: 90, from: t1 - 0.5 }); C.label('书 离开 书包', 1060, ROWS[0] + 80, { size: 28, col: GREY, from: t1 + 1.2 });
  fly('📘', 0, t1); verb(0, 'take out', '拿出你的书。', t1 + 0.8);
  K.narr('TAKE', t1, t1 + 1.2); K.narr('拿、取', t1 + 1.2, t1 + 2.4);
  T = say(t1 + 1.4, 'Take out your book.', '拿出你的书。');
  // ② take the dog out：人和狗离开家
  C.pic({ emoji: '🏠', x: 420, y: ROWS[1] + 20, size: 90, from: T - 0.5 }); C.label('家里', 260, ROWS[1] + 30, { size: 30, col: GREY, from: T - 0.5 });
  fly('🧒🐕', 1, T, { size: 70 }); verb(1, 'take … out', '带…出去', T + 0.8);
  C.label('人和狗 离开 家', 1060, ROWS[1] + 80, { size: 28, col: GREY, from: T + 1.2 });
  T = narr('带出门', T, 2.2);
  T = say(T, 'Take the dog out.', '带小狗出去。'); T = say(T, 'He takes the dog out.', '他带小狗出去散步。');
  // ③ get out：人出出租车
  C.pic({ emoji: '🚕', x: 420, y: ROWS[2] + 20, size: 90, from: T - 0.5 });
  fly('🧍', 2, T); verb(2, 'get out', '下车、出来', T + 0.8);
  T = say(T + 0.8, 'He got out of the taxi at the gate.', '他在大门口下了出租车。');
  K.narr('从里面出来', T - 2.0, T);
  // ④ 预测：give out
  C.pic({ emoji: '📚', x: 420, y: ROWS[3] + 20, size: 90, from: T });
  C.chip({ text: 'give out', x: VX, y: ROWS[3] + 10, size: 46, from: T + 0.2, col: INK, bd: RED });
  T = C.predict(T + 0.6, { q: 'give out 分发本子——本子会往哪儿走？', sec: 4 });
  const R = T + 0.2;
  [0, 1, 2].forEach(k => fly('📒', 3, R + k * 0.3, { x1: 980 + k * 110, arc: 40 + k * 30, size: 64 }));
  C.label('分发给大家', VX + 150, ROWS[3] + 22, { size: 30, col: GREY, from: R + 1.0, align: 'left' });
  T = say(R + 1.4, 'Can you help me give out the notebooks?', '你能帮我把笔记本分发给大家吗？');
  // ⑤ look out / put out
  C.pic({ emoji: '🪟', x: 420, y: ROWS[4] + 20, size: 80, from: T - 0.3 });
  fly('👀', 4, T, { x0: 460, x1: 980, size: 64, arc: 20 }); verb(4, 'look out', '当心！往外看', T + 0.6);
  T = say(T + 0.6, 'Look out! A fast bike is coming!', '当心！一辆快车过来了！');
  C.pic({ emoji: '🎂', x: 640, y: ROWS[4] + 20, size: 80, from: T - 0.3 });
  fly('🔥', 4, T, { x0: 640, x1: 1240, size: 56, gone: true, arc: 90 });
  C.chip({ text: 'put out', x: VX, y: ROWS[4] + 90, size: 40, from: T + 0.6, col: OR, bd: OR, bold: true });
  C.label('火苗出去 = 灭', VX + 150, ROWS[4] + 100, { size: 28, col: GREY, from: T + 0.8, align: 'left' });
  T = say(T + 0.8, 'Put out the candles and make a wish!', '吹灭蜡烛，许个愿吧！');
  // 规则
  C.rule(T);
  K.prop((g, tt) => { const q = clamp((tt - T) / 0.6); if (q <= 0) return; g.save(); g.globalAlpha = 0.5 * q; g.strokeStyle = OR; g.lineWidth = 10; g.beginPath(); g.roundRect(VX - 120, ROWS[0] - 40, 240, ROWS[4] + 130 - ROWS[0], 30); g.stroke(); g.restore(); }, { from: T, z: 2 });
  T = narr('共同点：OUT = 从里面到外面', T, 3.4);
  T = say(T, 'Please take out your English book.', '请把你们的英语书从书包里拿出来。');
  T = narr('take out ②', T, 1.6) + 1.0;
  K.end(T);
  return C.finish();
}
