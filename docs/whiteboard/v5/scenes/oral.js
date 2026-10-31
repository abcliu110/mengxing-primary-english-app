// 口语 144 幕通用版式 v6（决策 38 ② 啊哈重做；旧版 v5 = auto.js「逐行写字 + 讲解员」）。
// 啊哈卡 / 分镜：docs/whiteboard/lab/audit38/aha/02_hd_oral_sc01.md
// 用法：scenes/hd_oral_scNN_n.js 里 `oralBuild(SP, { title, items: ITEMS, acts: ACTS })`，ITEMS 原样不动（知识点不丢）。
// 解析 ITEMS：['w','<场景名>'] / ['w','核心交际句：EN （中文）'] / ['w','💡 <提示名>：<提示>'] / ['w','对话第n轮']
//            / ['w','<emoji> 角色 A|B：EN'] / ['w','中文'] / ['s', EN, 中文]。
// 画面：A = Leo（左）、B = Mia（右）面对面；每轮一个气泡，说话的人气泡橙框高亮、另一个人在听；
//   第 1 轮 A 说完 → B 的气泡盖着「？」→ C.predict「B 会怎么回答？」（≥3 s）→ 揭开、Mia 回答 →
//   两个气泡里和核心句相同的词一起变橙（孩子自己看出「回答在照着问句说」）→ 💡 提示进讲解字幕 = 规则（C.rule）→ 后面几轮 → 收尾核心句卡。
// 不用讲解员；画面只由 t 决定。节奏沿用放慢后的阅读速度（中文 5 字/秒、英文 2.2 词/秒，HOLD 1.5 s）。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, FONT, HI } from '../lib/concept.js';

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const easeBack = q => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(q - 1, 3) + c1 * Math.pow(q - 1, 2); };
const norm = s => s.toLowerCase().replace(/[^a-z0-9']/g, '');
const HOLD = 1.5;
const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;
// 默认帧（场景 ACTS 的 A / B 优先）：A 说 / 听 / 开场，B 说 / 想 / 开场
const FA = { speak: 'l_speak', listen: 'l_ear', open: 'l_wave' }, FB = { speak: 'm_story', listen: 'm_admire', open: 'm_admire' };

export function parseOral(items) {
  const D = { scene: '', coreEn: '', coreZh: '', coreRaw: '', tipName: '', tip: '', tipRaw: '', turns: [] };
  let cur = null;
  for (const [k, a, b] of items) {
    if (k === 's') { if (cur) { cur.en = a; cur.zh = b; } continue; }
    let m;
    if ((m = a.match(/^核心交际句：(.*?) （(.*)）$/))) { D.coreEn = m[1]; D.coreZh = m[2]; D.coreRaw = a; }
    else if ((m = a.match(/^(💡 [^：]*)：(.*)$/))) { D.tipName = m[1]; D.tip = m[2]; D.tipRaw = a; }
    else if ((m = a.match(/^对话第(\d+)轮$/))) { cur = { n: +m[1], label: a, who: 'A', emoji: '', en: '', zh: '', line: '' }; D.turns.push(cur); }
    else if (cur && (m = a.match(/^(\S+) 角色 ([AB])：(.*)$/))) { cur.emoji = m[1]; cur.who = m[2]; cur.line = m[3]; cur.roleRaw = a; }
    else if (cur && !cur.zhRaw && /[\u3400-\u9fff]/.test(a)) cur.zhRaw = a;
    else if (!D.scene) D.scene = a;
  }
  D.turns.forEach(t => { if (!t.en) t.en = t.line; if (!t.zh) t.zh = t.zhRaw || ''; });
  return D;
}

export function oralBuild(SP, Dsrc) {
  const K = scene({ sprites: SP }), C = concept(K), D = parseOral(Dsrc.items);
  const acts = Dsrc.acts || {}, fa = { ...FA }, fb = { ...FB };
  if (acts.A) [fa.speak, fa.listen, fa.open] = acts.A; if (acts.B) [fb.speak, fb.listen, fb.open] = acts.B;
  const has = f => SP.FI && SP.FI[f];
  const turns = D.turns, A1 = turns[0], B1 = turns.find(t => t.who !== (A1 && A1.who)) || turns[1];
  const roleOf = w => (turns.find(t => t.who === w) || {}).emoji || (w === 'A' ? '👦' : '👧');

  C.aha({
    see: `Leo（${roleOf('A')} 角色 A）和 Mia（${roleOf('B')} 角色 B）面对面，A 先说：「${A1 ? A1.en : D.coreEn}」，B 的气泡被「？」盖着`,
    guess: 'B 会怎么回答？',
    reveal: `揭开是「${B1 ? B1.en : ''}」；两个气泡里和核心句「${D.coreEn}」一样的词一起变橙——回答在接着问句说`,
    rule: D.tip ? `${D.tipName}：${D.tip}` : `核心交际句 ${D.coreEn}`,
  });

  // ---- 版面：气泡（中间一列，从上往下）----
  const BX = 960, BWID = 1040, ENW = 980, Y0 = 160, YMAX = 880, GAP = 26;
  const wrapEn = (s, size) => { const out = []; let line = ''; for (const w of s.split(/\s+/)) { const tryL = line ? line + ' ' + w : w; if (line && K.measure(tryL, size) > ENW) { out.push(line); line = w; } else line = tryL; } if (line) out.push(line); return out; };
  const wrapZh = (s, size) => { const out = []; let line = ''; for (const ch of s) { if (line && K.measure(line + ch, size) > ENW) { out.push(line); line = ch; } else line += ch; } if (line) out.push(line); return out; };
  let EN = 60, ZH = 36, lay;
  for (;;) {
    lay = turns.map(t => { const el = wrapEn(t.en, EN), zl = wrapZh(t.zh, ZH); return { el, zl, h: el.length * EN * 1.22 + zl.length * ZH * 1.35 + 44 }; });
    const tot = lay.reduce((s, b) => s + b.h, 0) + GAP * (lay.length - 1);
    if (tot <= YMAX - Y0 || EN <= 34) break; EN -= 3; ZH = Math.max(26, ZH - 2);
  }
  { const tot = lay.reduce((s, b) => s + b.h, 0) + GAP * (lay.length - 1); let y = Y0 + Math.max(0, (YMAX - Y0 - tot) / 2 - 40); lay.forEach(b => { b.y = y; y += b.h + GAP; }); }
  // 核心句的词（连续 ≥2 个词一致，或核心句只有 1 个词）在气泡里标橙
  const coreTok = D.coreEn.split(/\s+/).map(norm).filter(Boolean);
  const markCore = words => {
    const n = words.map(norm), on = n.map(() => false);
    for (let i = 0; i < n.length; i++) for (let j = 0; j < coreTok.length; j++) {
      let L = 0; while (i + L < n.length && j + L < coreTok.length && n[i + L] && n[i + L] === coreTok[j + L]) L++;
      if (L >= Math.min(2, coreTok.length)) for (let q = 0; q < L; q++) on[i + q] = true;
    }
    return on;
  };

  // ---- 角色 ----
  const AX = 250, BXP = 1670, GROUND = 1078, AH = 560;
  const ka = [[0, has(fa.open) ? fa.open : fa.speak]], kb = [[0, has(fb.open) ? fb.open : fb.listen]];
  K.actor({ keys: ka, x: AX, ground: GROUND, h: AH, reveal: 0.3 });
  K.actor({ keys: kb, x: BXP, ground: GROUND, h: AH, reveal: 0.5 });
  const key = (arr, t, f) => { if (has(f)) arr.push([Math.max(t, arr[arr.length - 1][0] + 0.01), f]); };
  C.label(`${roleOf('A')} 角色 A · Leo`, AX, 470, { size: 40, col: GREY, from: 0.6 });
  C.label(`${roleOf('B')} 角色 B · Mia`, BXP, 470, { size: 40, col: GREY, from: 0.8 });
  C.label(`💬 ${D.scene}`, 60, 70, { size: 40, col: GREY, from: 0.2, align: 'left' });

  // 气泡：from 出现；active=[[t0,t1]] 高亮；coreAt 起核心词变橙；dimAt 起变淡
  const RULE_T = { v: 1e9 }, DIM_T = { v: 1e9 };
  const bubble = (i, from, act) => {
    const t = turns[i], b = lay[i], left = t.who === 'A', words = t.en.split(/\s+/), on = markCore(words);
    C.TEXTS.push(t.en, t.zh, `${t.label} · ${t.who}`);
    K.prop((g, tt) => {
      if (tt < from) return;
      const pop = easeBack(clamp((tt - from) / 0.45)), live = tt >= act[0] && tt < act[1];
      const dim = tt >= DIM_T.v ? 0.15 + 0.85 * (1 - clamp((tt - DIM_T.v) / 0.5)) : (live || tt < act[0] ? 1 : 0.62);
      const x0 = BX - BWID / 2, y0 = b.y;
      g.save(); g.globalAlpha = dim; g.translate(left ? x0 : x0 + BWID, y0 + b.h / 2); g.scale(pop, pop); g.translate(-(left ? x0 : x0 + BWID), -(y0 + b.h / 2));
      if (live) { g.fillStyle = HI; g.beginPath(); g.roundRect(x0 - 12, y0 - 10, BWID + 24, b.h + 20, 30); g.fill(); }
      g.fillStyle = '#fff'; g.strokeStyle = live ? OR : '#9a9a96'; g.lineWidth = live ? 6 : 4;
      g.beginPath(); g.roundRect(x0, y0, BWID, b.h, 26); g.fill(); g.stroke();
      // 尾巴指向说话人
      const ty = y0 + Math.min(b.h - 30, 60), tx = left ? x0 : x0 + BWID, tip = left ? AX + 120 : BXP - 120;
      g.beginPath(); g.moveTo(tx, ty - 22); g.lineTo(tip, Math.max(ty + 40, 520)); g.lineTo(tx, ty + 22); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#fff'; g.fillRect(tx - (left ? 2 : 6), ty - 18, 8, 36);
      // 轮次小标
      g.font = FONT(30); g.fillStyle = live ? OR : GREY; g.textAlign = left ? 'left' : 'right'; g.textBaseline = 'alphabetic';
      g.fillText(`${t.label} · ${t.who}`, left ? x0 + 24 : x0 + BWID - 24, y0 + 32);
      // 英文（核心词在 coreAt 之后变橙）
      g.font = FONT(EN); g.textAlign = 'left'; let wi = 0;
      b.el.forEach((ln, li) => {
        let x = BX - K.measure(ln, EN) / 2; const y = y0 + 40 + (li + 0.85) * EN * 1.22 - 6;
        for (const w of ln.split(' ')) { g.fillStyle = tt >= RULE_T.v && on[wi] ? OR : INK; g.fillText(w, x, y); x += K.measure(w + ' ', EN); wi++; }
      });
      g.font = FONT(ZH); g.fillStyle = GREY; g.textAlign = 'center';
      b.zl.forEach((ln, li) => g.fillText(ln, BX, y0 + 40 + b.el.length * EN * 1.22 + (li + 0.9) * ZH * 1.35));
      g.restore();
    }, { from, z: 3 });
  };

  // ---- 时间轴 ----
  let T = 1.0;
  const nIntro = `${D.scene}：${roleOf('A')} A（Leo）和 ${roleOf('B')} B（Mia）面对面说话。`;
  K.narr(nIntro, 0.3, 0.3 + Math.max(2.6, readT(nIntro) + 0.6));
  T = 0.3 + Math.max(2.6, readT(nIntro) + 0.6) - 0.4;
  const bi = turns.indexOf(B1);
  const speak = (i, t) => {   // 第 i 轮：说话人说、另一人听；返回结束时刻
    const tr = turns[i], L = Math.max(sayLen(tr.en), readT(tr.zh) + 0.8);
    if (tr.who === 'A') { key(ka, t, fa.speak); key(kb, t, fb.listen); } else { key(kb, t, fb.speak); key(ka, t, fa.listen); }
    K.say(t, tr.en, { zh: tr.zh, len: L, key: tr.en.split(/\s+/).filter((w, k, ws) => markCore(ws)[k]).map(norm) });
    return t + L + 0.8;
  };
  const ends = [];
  // 第 1 轮
  if (turns.length) { const e = speak(0, T + 0.3); bubble(0, T, [T, e]); ends[0] = e; T = e; }
  // 预测：B 的气泡盖着「？」
  if (bi > 0) {
    const b = lay[bi], t0 = T;
    key(kb, t0, fb.listen); key(ka, t0, fa.listen);
    T = C.predict(t0 + 0.4, { q: `${roleOf('B')} B（Mia）会怎么回答？先在心里说一说！`, sec: 4 });
    C.cover({ x: BX, y: b.y + b.h / 2, w: BWID + 8, h: b.h + 8, from: t0, open: T + 0.1, label: '？' });
    const e = speak(bi, T + 0.5); bubble(bi, t0, [T + 0.5, e]); ends[bi] = e; T = e;
    for (let i = 1; i < bi; i++) { const e2 = speak(i, T); bubble(i, T - 0.3, [T, e2]); T = e2; }
  }
  // 揭晓之后：核心词一起变橙 + 核心句 + 💡 提示（规则）
  RULE_T.v = T;
  const nCore = D.coreRaw;
  const dc = Math.max(3.4, readT(nCore) + 1.2); K.narr(nCore, T, T + dc);
  C.rule(T + dc);
  if (D.tip) { const dt = Math.max(3.6, readT(D.tipRaw) + 1.2); K.narr(D.tipRaw, T + dc, T + dc + dt); T = T + dc + dt + 0.3; } else T += dc + 0.3;
  // 后面几轮
  for (let i = Math.max(1, bi + 1); i < turns.length; i++) { const e = speak(i, T + 0.3); bubble(i, T, [T + 0.3, e]); T = e; }
  T += HOLD;
  // 收尾：气泡变淡，中间亮出核心句卡（看着核心句再读一遍）
  DIM_T.v = T;
  const card = C.chip({ text: D.coreEn, x: BX, y: 520, size: Math.min(80, Math.floor(80 * 1100 / Math.max(1100, K.measure(D.coreEn, 80)))), from: T + 0.3, col: OR, bd: OR, bold: true, z: 7 });
  C.chip({ text: D.coreZh, x: BX, y: 660, size: 40, from: T + 0.6, col: INK, bd: '#fff', z: 7 });
  key(ka, T, fa.open); key(kb, T, fb.speak);
  K.say(T + 0.8, D.coreEn, { zh: D.coreZh, key: coreTok, len: Math.max(sayLen(D.coreEn), readT(D.coreZh) + 0.8) });
  T += 0.8 + Math.max(sayLen(D.coreEn), readT(D.coreZh) + 0.8) + HOLD;
  void card;
  K.end(T + 0.6);
  return C.finish();
}
