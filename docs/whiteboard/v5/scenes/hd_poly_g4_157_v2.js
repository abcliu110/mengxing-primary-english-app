// 🎞️ light 同形异源三幕专用版式（T12-B1b 裁定 (b)：按 fp_economy_1_v2 先例从 poly.js 剥离的模板变体；共享 poly.js 一字不动，其余 48 幕 poly 不受影响）。
//   缘由：scene_fixes.yaml sf-003/004/005 裁定——light（光）与 light（轻）是同形异源的两个词
//   （「光」< *leuk- 发光；「轻」< *legʷʰ- 轻；古英语起即是两词），不存在意象纽带与义项引申。
//   poly 版式整套视觉隐喻都建立在旧叙事上（意象桥、桥身写纽带、predict 问「顺着桥走过去」、右卡硬编码标题「③ 引申新义」、emoji 顺桥滑过），
//   把订正文案塞回去只会自相矛盾（且 parsePoly 只认「核心意象纽带：」前缀，订正后啊哈卡 rule 为空直接抛错，见 T12b1.done）。
//   本变体改为双栏并置：左栏「① 本义具象」= light（光）一家；右栏「③ 另一个 light」= light（轻）一家；
//   中间竖隔断 + 「同名不同源」徽记（不是桥，没有任何东西从左栏「走」到右栏）；emoji 只留在左栏，不滑移。
//   文案：三幕 ITEMS 中 sf-003/004/005 三行已逐字替换为定稿；本文件自产的连接文案（啊哈卡 see/guess、predict 问句）只用定稿内句子拼装，不自编新断言。
//   与 poly 的数据契约差异（有意为之）：
//     1) 核心行认「核心提醒：」前缀（sf-003 定稿）；若数据仍是旧「核心意象纽带：」行，core 解析为空、C.aha 抛「啊哈卡缺 rule」拒收——防旧数据混入本版式。
//     2) ITEMS 里「核心动作/形状迁移」一行是旧桥叙事的机制名，新版式不设槽位、不上演（数据保留在 ITEMS 中，R1 不删）。
//     3) 's' 行的本幕画面说明（sayZh）不再作开场旁白：2/3 幕原文带旧叙事（「场景变形·光一样无重量」「引申新义·轻的 & 浅色的」），
//        与裁定冲突；改以 sf-003 定稿「核心提醒」作开场框架。sayEn 朗读句与两条例句收尾照旧朗读。sayZh 数据保留在 ITEMS 中。
//        （「浅色的」义项不在 sf-003/004/005 定稿内，本批未上屏，待后续裁定补讲——它与「光」同源、应挂左栏，见 T12b1b.done。）
//   用法：scenes/hd_poly_g4_157_<n>.js 里 `lightTwinsBuild(SP, { title, items: ITEMS, acts: ACTS })`。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED, FONT } from '../lib/concept.js';
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;

export function parseTwins(items) {
  const D = { kicker: '', head: '', emoji: '', word: '', core: '', coreRaw: '', s1: '', ex1: '', bridge: '', s2: '', ex2: '', actTag: '', sayEn: '', sayZh: '' };
  let last = '';
  for (const [k, a, b] of items) {
    if (k === 's') { D.sayEn = a; D.sayZh = b; continue; }
    let m;
    if (!D.kicker) { D.kicker = a; continue; }
    if (!D.head) { D.head = a; m = a.match(/^(\S+)\s+([A-Za-z' -]+?)\s+\//); if (m) { D.emoji = m[1]; D.word = m[2]; } continue; }
    if ((m = a.match(/^核心提醒：(.*)$/))) { D.core = m[1]; D.coreRaw = a; last = 'core'; }
    else if (/^① /.test(a)) { D.s1 = a; last = 's1'; }
    else if (/^② /.test(a)) { D.bridge = a; last = 'br'; }
    else if (/^③ /.test(a)) { D.s2 = a; last = 's2'; }
    else if (/^多义第\d+幕$/.test(a)) D.actTag = a;
    else if (last === 's1' && !D.ex1) D.ex1 = a;
    else if (last === 's2' && !D.ex2) D.ex2 = a;
    // 其余行（如「核心动作/形状迁移」旧桥机制名）：新版式无槽位，落空忽略
  }
  return D;
}

export function lightTwinsBuild(SP, Dsrc) {
  const K = scene({ sprites: SP }), C = concept(K), D = parseTwins(Dsrc.items);
  const fr = ((Dsrc.acts || {})['*'] || []).filter(f => SP.FI && SP.FI[f]);
  const s1 = D.s1.replace(/^① 本义具象：/, ''), s2 = D.s2.replace(/^③ /, '');
  const GUESS = '右边还藏着另一个 light——它会是什么意思？';
  C.aha({
    see: `左边「① 本义」卡：${D.emoji} ${s1}（${D.ex1}）；中间隔着「同名不同源」的标记；右边的卡被「？」盖着`,
    guess: GUESS,
    reveal: `${s2}（${D.ex2}）；两个 light 中间隔着「同名不同源」的标记，谁也不走过去`,
    rule: D.coreRaw || D.core,   // = sf-003 定稿整行（核心提醒：……两个不同的词，只是长得一模一样。）
  });
  const narr = (s, t, min = 2.6) => { const d = Math.max(min, readT(s) + 0.8); K.narr(s, t, t + d); return t + d; };
  C.label(`🎞️ ${D.word} · ${D.actTag}`, 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left' });
  const L = [470, 470], Rr = [1450, 470], CW = 640, CH = 440;
  const wrap = (s, size, w) => { const out = []; let line = ''; for (const ch of s) { if (line && K.measure(line + ch, size) > w) { out.push(line); line = ch; } else line += ch; } if (line) out.push(line); return out; };
  const card = (cx, cy, title, lines, ex, col, from, z = 3) => {
    C.TEXTS.push(title, ...lines, ex);
    K.prop((g, t) => {
      const q = clamp((t - from) / 0.5); if (q <= 0) return;
      g.save(); g.globalAlpha = q; g.fillStyle = '#fff'; g.strokeStyle = col; g.lineWidth = 6; g.beginPath(); g.roundRect(cx - CW / 2, cy - CH / 2, CW, CH, 28); g.fill(); g.stroke();
      g.font = FONT(34, true); g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'alphabetic'; g.fillText(title, cx, cy - CH / 2 + 50);
      g.font = FONT(34); g.fillStyle = INK; lines.forEach((ln, i) => g.fillText(ln, cx, cy + 40 + i * 44));
      g.font = FONT(36); g.fillStyle = col; const el = wrap(ex, 36, CW - 60); el.forEach((ln, i) => g.fillText(ln, cx, cy + CH / 2 - 30 - (el.length - 1 - i) * 44));
      g.restore();
    }, { from, z });
  };
  let T = 0.3;
  T = narr(D.kicker + '：' + D.head, T, 3.6);
  // ① 本义卡（左栏：light（光）一家）+ emoji 只留在左栏，不滑移
  card(L[0], L[1], '① 本义具象', wrap(s1, 34, CW - 60).slice(0, 2), D.ex1, BLUE, 1.0);
  const emo = { x: L[0], y: L[1] - 70 };
  K.prop((g, t) => {
    const q = clamp((t - 0.8) / 0.4); if (q <= 0) return;
    g.save(); g.globalAlpha = q; g.font = '120px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(D.emoji || '📌', emo.x, emo.y); g.restore();
  }, { from: 0.8, z: 4 });
  // 中间隔断 + 「同名不同源」徽记：核心提醒旁白开始时出现（不是桥——竖线断开，中间放徽记，谁也不通过）
  const B0 = T + 0.2;
  K.prop((g, t) => {
    const q = clamp((t - B0) / 0.8); if (q <= 0) return;
    g.save(); g.globalAlpha = q;
    g.strokeStyle = OR; g.lineWidth = 6; g.setLineDash([18, 14]);
    g.beginPath(); g.moveTo(960, 285); g.lineTo(960, 425); g.moveTo(960, 515); g.lineTo(960, 655); g.stroke(); g.setLineDash([]);
    g.font = FONT(32, true); const label = '同名不同源'; const w = g.measureText(label).width + 48;
    g.fillStyle = '#fff'; g.strokeStyle = RED; g.lineWidth = 5; g.beginPath(); g.roundRect(960 - w / 2, 470 - 31, w, 62, 31); g.fill(); g.stroke();
    g.fillStyle = RED; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(label, 960, 473);
    g.restore();
  }, { from: B0, z: 2 });
  C.TEXTS.push('同名不同源', D.coreRaw, D.bridge);
  T = narr(D.coreRaw, T, 3.4);   // 开场框架 = sf-003 定稿（核心提醒）整行朗读
  T = Math.max(T, B0 + 1.2);
  // ③ 另一个 light 卡（右栏：light（轻）一家；先盖住）
  //   卡面只放定稿要点行（整句在揭晓时由旁白完整朗读）：首句 + 「同形不同源」+ 末句，均逐字截自 sf-005 定稿
  const s2body = D.s2.replace(/^③ 另一个 light：/, '');
  const sents = s2body.split('。').filter(Boolean);
  const frags = [sents[0], (sents[1] || '').split('：')[0], (sents[1] || '').split('，').pop()].filter(Boolean);
  const s2title = (D.s2.match(/^③ [^：]+/) || ['③ 另一个 light'])[0];
  card(Rr[0], Rr[1], s2title, frags, D.ex2, GREEN, T);
  const qT = T + 0.4;
  T = C.predict(qT, { q: GUESS, sec: 4 });
  C.cover({ x: Rr[0], y: Rr[1], w: CW + 12, h: CH + 12, from: qT - 0.4, open: T + 0.1, label: '？' });
  const R = T + 0.2;
  T = narr(D.s2, R + 0.3, 3.4);   // 揭晓：sf-005 定稿整行朗读（词根 *leuk- / *legʷʰ- 在此完整出现）
  T = narr(D.bridge, T, 3.2);     // 联想桥梁：sf-004 定稿——真来历讲完之后，联想才以「记忆钩子」身份出场并自带边界
  C.rule(T);
  void fr;   // 与 poly 同：规则课不凑动作，不放人物
  T = narr(D.s1, T, 3); T = narr(D.coreRaw, T, 3.4);   // 复述：左栏本义 + 规则（核心提醒）
  const key = D.word ? [D.word.toLowerCase()] : [];
  if (D.sayEn) { const Ls = Math.max(sayLen(D.sayEn), 2.6); K.say(T, D.sayEn, { zh: '', key, len: Ls }); T += Ls + 0.6; }
  const other = D.sayEn === D.ex1 ? D.ex2 : D.ex1;
  if (other) { const Ls = Math.max(sayLen(other), 2.6); K.say(T, other, { zh: '', key, len: Ls }); T += Ls + 0.6; }
  K.end(T + 1.2);
  return C.finish();
}
