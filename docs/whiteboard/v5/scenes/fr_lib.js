// 框架语义 · 买卖交易（hd_fr01 四个视角）共用版式（决策 38 ⑨；啊哈卡 lab/audit38/aha/09_hd_fr01.md）。不是场景（无 export default）。
// 同一件事：书从卖家流向买家（上弧），钱从买家流向卖家（下弧）。每个视角给一个「聚光灯」（谁当主语 + 哪条流），
// 先猜四张动词贴纸里哪张贴上来 → 揭晓 → 句子按角色上色拼出来 → 公式进字幕。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED, FONT } from '../lib/concept.js';
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;
const ROLE = { Buyer: ['买家', BLUE], Seller: ['卖家', GREEN], Goods: ['商品', OR], Money: ['钱款', RED] };
const POS = { Buyer: [360, 450], Seller: [1560, 450], Goods: [960, 225], Money: [960, 675] };
const VERBS = ['buy', 'sell', 'pay', 'cost'];

// V = { verb, zhVerb, idx, subject, flow:'goods'|'money', q, parts:[[词, 角色|null]…], en, zh, formula, flowLine, items:{…原文} }
export function frBuild(SP, V) {
  const K = scene({ sprites: SP }), C = concept(K);
  const subj = ROLE[V.subject];
  C.aha({
    see: `淘淘（买家）和店员（卖家）两边站好，书从卖家飞向买家、钱从买家飞向卖家——同一件事；聚光灯照在「${subj[0]}」和${V.flow === 'goods' ? '书' : '钱'}那条流上`,
    guess: V.q,
    reveal: `「${V.verb}」贴纸飞上聚光灯，句子按角色拼出来：${V.en}`,
    rule: V.formula,
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  C.label(`🛒 买卖交易 · 视角 ${V.idx} ${V.verb}`, 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  let T = 0.3;
  T = narr('框架语义学原理', T, 2.0);
  T = narr(V.items.head, T, 4);
  // 角色
  C.pic({ emoji: '👦', x: POS.Buyer[0], y: POS.Buyer[1], size: 200, from: 0.8 });
  C.pic({ emoji: '🧑‍💼', x: POS.Seller[0], y: POS.Seller[1], size: 200, from: 1.0 });
  C.label('Taotao · Buyer 买家', POS.Buyer[0], POS.Buyer[1] + 140, { size: 38, col: BLUE, from: 1.2, bold: true });
  C.label('shop · Seller 卖家', POS.Seller[0], POS.Seller[1] + 140, { size: 38, col: GREEN, from: 1.4, bold: true });
  // 两条流：书（上弧，卖家→买家）、钱（下弧，买家→卖家），循环流动
  const F0 = Math.max(2.0, T - 1.5);
  const spot = { t: 1e9 };
  K.prop((g, t) => {
    if (t < F0) return;
    const arc = (x0, x1, yc, dy, p) => { const x = x0 + (x1 - x0) * p, y = yc - dy * Math.sin(Math.PI * p); return [x, y]; };
    const hiG = t >= spot.t && V.flow === 'goods', hiM = t >= spot.t && V.flow === 'money';
    g.save(); g.lineWidth = hiG ? 8 : 4; g.setLineDash([14, 12]); g.strokeStyle = hiG ? OR : '#c9c7c2';
    g.beginPath(); for (let p = 0; p <= 1.001; p += 0.05) { const [x, y] = arc(1460, 460, 345, 120, p); p ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
    g.lineWidth = hiM ? 8 : 4; g.strokeStyle = hiM ? RED : '#c9c7c2';
    g.beginPath(); for (let p = 0; p <= 1.001; p += 0.05) { const [x, y] = arc(460, 1460, 555, -120, p); p ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.setLineDash([]);
    const p = ((t - F0) / 3.2) % 1; g.font = '80px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.globalAlpha = t >= spot.t && V.flow !== 'goods' ? 0.35 : 1; { const [x, y] = arc(1460, 460, 345, 120, p); g.fillText('📘', x, y); }
    g.globalAlpha = t >= spot.t && V.flow !== 'money' ? 0.35 : 1; { const [x, y] = arc(460, 1460, 555, -120, p); g.fillText('💴', x, y); }
    g.restore();
  }, { from: F0, z: 2 });
  C.label('📘 a storybook · Goods 商品', 960, 192, { size: 34, col: OR, from: F0 + 0.3 });
  C.label('💴 20 yuan · Money 钱款', 960, 752, { size: 34, col: RED, from: F0 + 0.5 });
  T = Math.max(T, F0 + 1.0);
  T = narr('同一件事：书从店里到了淘淘手上，钱从淘淘到了店里。', T, 3.4);
  // 聚光灯：照在主语角色
  spot.t = T;
  const [sx, sy] = POS[V.subject];
  K.prop((g, t) => { const q = clamp((t - spot.t) / 0.5); if (q <= 0) return; g.save(); g.globalAlpha = 0.35 * q; g.fillStyle = 'rgba(253,224,71,1)'; g.beginPath(); g.arc(sx, sy, 130, 0, 7); g.fill(); g.restore(); }, { from: spot.t, z: 1 });
  T = narr(V.items.cam, T, 3.4);
  // 动词贴纸
  const st = VERBS.map((w, i) => C.chip({ text: w, x: 1700, y: 180 + i * 90, size: 52, from: T + i * 0.15, bd: GREY, z: 6 }));
  T += 0.8;
  T = C.predict(T, { q: V.q, sec: 4 });
  const R = T + 0.2, k = VERBS.indexOf(V.verb);
  st.forEach((c, i) => { if (i !== k) C.swap(c, R, VERBS[i], '#bbb', '#f5f5f4', '#ddd'); });
  C.drop(st[k], R + 0.3, sx + (V.subject === 'Goods' || V.subject === 'Money' ? 230 : 0), sy - (V.subject === 'Goods' || V.subject === 'Money' ? 0 : 170)); C.swap(st[k], R + 1.0, V.verb, OR, '#fff', OR);
  K.narr(V.items.verbTag, R + 0.3, R + 2.4);
  // 句子按角色上色
  const parts = V.parts; let x = 960 - parts.reduce((a, [w]) => a + K.measure(w, 50) + 70, 0) / 2;
  const SY = 850;
  parts.forEach(([w, role], i) => {
    const wd = K.measure(w, 50) + 44, cx = x + wd / 2, col = role ? ROLE[role][1] : INK;
    C.chip({ text: w, x: cx, y: SY - 30, size: 50, from: R + 1.4 + i * 0.25, col, bd: role ? col : '#fff', z: 6 });
    if (role) C.label(role, cx, SY + 30, { size: 26, col, from: R + 1.6 + i * 0.25 });
    x += wd + 26;
  });
  T = R + 1.6 + parts.length * 0.25 + 0.6;
  K.say(T, V.en, { zh: V.zh, key: [V.en.split(' ').find(w => w.toLowerCase().startsWith(V.verb.slice(0, 3)))].filter(Boolean).map(s => s.toLowerCase()), len: Math.max(sayLen(V.en), readT(V.zh) + 0.6) });
  K.narr(V.items.say, T, T + Math.max(3.4, readT(V.items.say) + 0.6));
  T += Math.max(3.6, readT(V.items.say) + 0.8);
  C.rule(T);
  T = narr(V.items.flowLine, T, 4);
  T = narr(V.items.zhLine, T, 4);
  T = narr(V.items.title, T, 2.6) + 1.2;
  K.end(T);
  return C.finish();
}
