// v5.1 通用版面引擎（决策 32 批量重画）：把旧案例的内容清单（字幕 / 白板 / 朗读 / 道具，R1 一字不差）
// 自动排进一块块白板，镜头逐块推过去；例句里的动作词由人物先行帧库 cast/ 的关键帧演出（准备 → 发力 → 结果），
// 读到动作词那一刻橙色弹字；结尾金句卡 + 拉远看全图。画面只由 t 决定。
// 用法：scenes/<tab>_<n>.js 由 v5/gen_auto.py 生成：autoBuild(SP, { title, items, acts })
//   items：['n', 字幕] / ['w', 白板字] / ['p', 道具] / ['s', 英文, 中文, 先读词]
//   acts：{ 动作词: [帧, 帧, 帧] }（1–3 帧：准备 / 发力 / 结果；词形原样写，如 running、took）
import { scene, OR, OR2, INK, GREY } from '../wb5.js';

export function autoBuild(SP, D) {
  const K = scene({ sprites: SP });
  const COLS = 4, BW = 2100, BH = 1250;
  const REG = i => [(i % COLS) * BW, Math.floor(i / COLS) * BH];
  const norm = x => x.toLowerCase().replace(/[^a-z']/g, '');
  const hasActs = Object.keys(D.acts || {}).length > 0;
  const X0 = 140, XMAX = hasActs ? 1330 : 1780, Y0 = 240, YMAX = 880;
  const isEn = s => (s.match(/[A-Za-z]/g) || []).length > s.length * 0.5;
  const isHead = s => /^[①②③④⑤⑥⑦⑧⑨⑩🔮]/u.test(s) && s.length <= 12;
  const isGold = s => /^💡 一句话洞见/.test(s);
  const isKey = s => /^(口诀|结论|秘诀|💡|🎵|铁律)/.test(s) || /➔/.test(s);
  const wrapLines = (s, size, maxW) => {
    const out = []; let line = '';
    // 中英混排（2026-10-30）：英文单词整词换行，不在词中间断开；句末标点不放到行首
    const toks = isEn(s) ? s.split(/(\s+)/) : (s.match(/[A-Za-z0-9'’\-]+|\s+|[\s\S]/gu) || []);
    for (const tk of toks) { if (K.measure(line + tk, size) > maxW && line.trim() && !/^[，。、；：！？）】」』”’,.!?;:)]$/.test(tk)) { out.push(line.trimEnd()); line = tk.trimStart(); } else line += tk; }
    if (line.trim()) out.push(line.trimEnd()); return out;
  };

  let T = 0.1, bi = -1, ox = 0, oy = 0, y = Y0, actor = null, gold = false, row = null, lastW = -9, actN = 0;
  const seen = new Set();
  const AX = fr => { let x = 1600; for (const f of fr) { const I = SP.FI[f]; if (!I) continue; const sc = 470 / I.bottom; x = Math.min(x, 1880 - (I.w - I.ax) * sc); x = Math.max(x, 1380 + I.ax * sc); } return x; };
  const board = (t, isGoldCard = false) => {
    bi++; [ox, oy] = REG(bi); y = Y0; actor = null; row = null; gold = isGoldCard;
    if (bi === 0) K.camSet(ox + 960, oy + 540, 1); else K.cam(Math.max(0, t - 0.3), { x: ox + 960, y: oy + 540, z: 1, d: 0.9, ease: 'power2.inOut' });
    if (isGoldCard) { K.at(t).rect(ox + 120, oy + 170, hasActs ? 1680 : 1680, 800, { w: 6, rough: 1.2 }); y = oy * 0 + 280; }
  };
  const need = (h, t) => { if (bi < 0 || y + h > YMAX) { if (bi >= 0) T += HOLD; board(T); } };
  const wordT = (t, en, word, w) => t + (word ? 0.45 + word.split(/\s+/).length * 0.42 : 0) + Math.max(0, en.split(/\s+/).findIndex(x => norm(x) === w)) * 0.36;
  // 阅读节奏（2026-10-30 用户：白板太快）：每段写完按小学生阅读速度留时间——中文约 5 字/秒、英文约 2.2 词/秒；换板前多停 HOLD 秒
  const HOLD = 1.5;
  const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
  const sayLen = (en, word) => (word ? 0.45 + word.split(/\s+/).length * 0.42 : 0) + en.split(/\s+/).length * 0.36 + 0.9;

  board(T);
  if (hasActs) { const f0 = Object.values(D.acts)[0]; actor = K.actor({ keys: [[0, f0[f0.length - 1]]], x: AX(f0), ground: 1110, h: 470, reveal: 1.0 }); actor.board = 0; actor.last = 0; }   // 第一块板的开场角色就是后面动作的同一个人（不再另起一个叠在原地）
  D.items.forEach((it, idx) => {
    const [k, a, b, c] = it;
    if (k === 'n') {
      const d = Math.max(3.2, readT(a) + 1.0); K.narr(a, T, T + d); if (!(bi === 0 && y === Y0)) T += d - 0.6; lastW = -9; return;
    }
    if (k === 'm') {
      if (seen.has(a)) return; seen.add(a);
      const w = K.measure(a, 44) + 40;
      if (!row || idx !== lastW + 1 || row.x + w > ox + XMAX) { need(110, T); row = { x: ox + X0, y: y + 52 }; y += 110; }
      K.at(T).rect(row.x, oy + row.y - 56, w, 76, { w: 3, rough: 1.2, col: GREY, min: 0.08 }).text(a, row.x + 20, oy + row.y, 44, { col: GREY, rate: 30 });
      row.x += w + 22; lastW = idx; T += 0.3 + readT(a) * 0.7; return;
    }
    if (k === 'p') { K.at(T).text(a, ox + 1600, oy + 360, 110); return; }
    if (k === 'w') {
      if (seen.has(a)) return; seen.add(a);
      if (isGold(a)) { if (bi >= 0) T += HOLD; board(T + 0.4, true); T += 0.6; K.at(T).text(a, ox + 200, oy + y, 56, { col: OR }); y += 96; T += 0.5; return; }
      if (gold) {
        const sz = 54, ls = wrapLines(a, sz, 1500);
        if (y + ls.length * 84 > 960) { T += HOLD; board(T + 0.3, true); T += 0.5; }
        ls.forEach(l => { K.at(T).text(l, ox + 200, oy + y, sz, { col: /^🎵|^💡/.test(a) ? OR : (/^🪞|^⚔️|·/.test(a) && a.length < 30 ? GREY : INK), rate: 30 }); y += 84; T += 0.3 + readT(l); });
        return;
      }
      const short = [...a].length <= 9 && !isEn(a) && !(bi === 0 && y === Y0);
      // 连续出现的短词（菜单 / 标签）横着排成一行
      if (short && !isHead(a) && row && idx === lastW + 1 && row.x + K.measure(a, 44) + 70 < ox + XMAX) {
        const w = K.measure(a, 44) + 40; K.at(T).rect(row.x, oy + row.y - 56, w, 76, { w: 3, rough: 1.2, col: GREY, min: 0.08 }).text(a, row.x + 20, oy + row.y, 44, { col: GREY, rate: 30 });
        row.x += w + 22; lastW = idx; T += 0.3 + readT(a) * 0.7; return;
      }
      if (isHead(a)) { if (bi === 0 && y === Y0) {} else { T += HOLD; board(T + 0.3); } T += bi ? 0.5 : 0; K.at(T).text(a, ox + X0, oy + y, 76, { col: OR }); y += 120; row = null; lastW = idx; T += 0.4 + readT(a); return; }
      if (short && !isKey(a)) {
        need(110, T); const w = K.measure(a, 44) + 40;
        K.at(T).rect(ox + X0, oy + y - 4, w, 76, { w: 3, rough: 1.2, col: GREY, min: 0.08 }).text(a, ox + X0 + 20, oy + y + 52, 44, { col: GREY, rate: 30 });
        row = { x: ox + X0 + w + 22, y: y + 52 }; y += 110; lastW = idx; T += 0.3 + readT(a) * 0.7; return;
      }
      const sz = bi === 0 && y === Y0 ? 86 : (isEn(a) ? 64 : 56), lh = Math.round(sz * 1.45);
      const ls = wrapLines(a, sz, XMAX - X0); need(ls.length * lh + 20, T);
      const col = bi === 0 && y === Y0 ? INK : isKey(a) ? OR : INK;
      ls.forEach(l => { K.at(T).text(l, ox + X0, oy + y + sz, sz, { col, rate: sz >= 80 ? 12 : 26 }); y += lh; T += 0.3 + readT(l); });
      y += 18; row = null; lastW = idx; return;
    }
    if (k === 's') {
      const en = a, zh = b, w = c || null; const st = T;
      const toks = ' ' + en.split(/\s+/).map(norm).join(' ') + ' '; const hit = Object.keys(D.acts || {}).filter(x => toks.includes(' ' + x.split(/\s+/).map(norm).join(' ') + ' ')); if (!hit.length && D.acts && D.acts['*']) hit.push('*');
      if (hit.length && !gold) {
        const fr = D.acts[hit[0]], wt = hit[0] === '*' ? st + 1.2 : wordT(st, en, w, norm(hit[0].split(/\s+/)[0]));
        const keys = fr.length === 1 ? [[0, fr[0]]] : fr.length === 2 ? [[0, fr[0]], [wt, fr[1]]] : [[0, fr[0]], [wt - 0.5, fr[1]], [wt + 0.5, fr[2]]];
        if (actor && actor.board === bi) { const base = Math.max(st - 0.3, actor.last + 0.01); keys.forEach(([kt, kk], j) => actor.keys.push([j ? Math.max(kt, base + 0.01 * j) : base, kk])); actor.last = Math.max(...actor.keys.map(q => q[0])); }
        else { actor = K.actor({ keys: keys.map(([kt, kk], j) => [j ? kt : 0, kk]), x: ox + AX(fr), ground: oy + 1110, h: 470, reveal: Math.max(0, st - 0.6) }); actor.board = bi; actor.last = Math.max(...keys.map(q => q[0])); }
        hit.filter(h => h !== '*').forEach((hw, hj) => { const t2 = wordT(st, en, w, norm(hw.split(/\s+/)[0])); K.pop(t2, hw, ox + 1600, oy + 470 + hj * 110, 84, { out: t2 + 2.2 }); });
      }
      const L = Math.max(sayLen(en, w), readT(zh) + 0.8);   // 中文字幕要读完
      K.say(st, en, { word: w, key: hit.flatMap(h => h.split(/\s+/).map(norm)), zh, len: L });
      T = st + L + 0.8; return;
    }
  });
  if (!gold) { T += HOLD; board(T + 0.3); T += 0.6; K.at(T).text(D.title, ox + 200, oy + 460, 70, { col: OR }); T += 1.5 + readT(D.title); }
  T = Math.max(T, K.cur) + 2.0;
  const cols = Math.min(COLS, bi + 1), rows = Math.floor(bi / COLS) + 1;
  K.cam(T, { x: (cols * BW - (BW - 1920)) / 2, y: (rows * BH - (BH - 1080)) / 2, z: Math.min(1920 / (cols * BW), 1080 / (rows * BH)) * 0.98, d: 1.6 });
  K.shade(T + 2.0);
  K.end(T + 3.4);
  return K.done();
}

// ---- 主题思维导图讲解幕（DESIGN_MINDMAP_WORDCARD.md §1.3，2026-10-30）----
// mindmapBuild(SP, D)：中央手写圆圈 + 「🌍 子主题」→ 4–6 条粗枝（语义小组，v5/mindmap_groups.json）→ 每组叶子逐个写上去（emoji 单词 + 中文，写一个读一个）
// → 下方两框「常用搭配动词」「评价形容词」各读一句 → 拉远看整张导图。世界 3840×2160，镜头逐组推过去；画面只由 t 决定。
//   D：{ title, center, hint, groups:[{ name, leaves:[[emoji+单词, 中文词义, 朗读英文]] }], vTitle, verbs:[], aTitle, adjs:[], intro, outro,
//        frames:{ speak, point, think, idea } }
export function mindmapBuild(SP, D) {
  const K = scene({ sprites: SP });
  const WW = 3840, WH = 2160, CX = 1920, CY = 620, EW = 640, EH = 280, HOLD = 1.2;
  const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
  const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;
  const wrap = (s, size, maxW) => {   // 英文整词不拆、句末标点不落行首（同 autoBuild）
    const out = []; let line = '';
    for (const tk of (String(s).match(/[A-Za-z0-9'’\-]+|\s+|[\s\S]/gu) || [])) { if (K.measure(line + tk, size) > maxW && line.trim() && !/^[，。、；：！？）】」』”’,.!?;:)]$/.test(tk)) { out.push(line.trimEnd()); line = tk.trimStart(); } else line += tk; }
    if (line.trim()) out.push(line.trimEnd()); return out;
  };
  // ---- 版面（纯计算）----
  const WS = 58, MS = 40, MLH = 52, LW = 660, NS = 54, NMAX = 400, GAP = 56;
  const G = D.groups.map(g => {
    const leaves = g.leaves.map(([wd, zh, en]) => { const ml = wrap(zh, MS, LW); return { wd, zh, en, ml, h: 74 + ml.length * MLH + 30 }; });
    const nl = wrap(g.name, NS, NMAX), nw = Math.max(...nl.map(l => K.measure(l, NS))) + 64, nh = nl.length * 70 + 34;
    return { name: g.name, leaves, nl, nw, nh, h: Math.max(nh + 40, leaves.reduce((a, l) => a + l.h, 0)) };
  });
  const tot = G.reduce((a, g) => a + g.h, 0); let acc = 0;
  G.forEach((g, i) => { g.side = i === 0 || acc + g.h / 2 <= tot / 2 ? 1 : -1; acc += g.h; });   // 前几组放右边（从上到下），其余放左边；两边高度大致相等
  if (!G.some(g => g.side === -1) && G.length > 1) G[G.length - 1].side = -1;
  for (const sd of [1, -1]) {
    const gs = G.filter(g => g.side === sd), H = gs.reduce((a, g) => a + g.h, 0) + GAP * (gs.length - 1);
    let y = Math.max(90, (WH - H) / 2);
    gs.forEach(g => { g.y0 = y; g.y1 = y + g.h; g.gy = y + g.h / 2; g.gx = CX + sd * 900; y += g.h + GAP; });
  }
  const P = D.frames || {};
  // ---- 开场 ----
  let T = 0.1;
  K.camSet(CX, 700, 1);
  const actor = K.actor({ keys: [[0, P.speak]], x: CX, ground: 1135, h: 360, reveal: 0.6 });
  const key = (t, f) => { if (f && SP.FI[f]) actor.keys.push([Math.max(t, actor.keys[actor.keys.length - 1][0] + 0.01), f]); };
  K.at(T).ellipse(CX, CY, EW, EH, { w: 7, rough: 1.3 });
  K.text(D.center, CX, CY + 12, 72, { align: 'center', rate: 9 });
  K.text(D.hint, CX, CY + 84, 36, { align: 'center', col: GREY, rate: 18 });
  const d0 = Math.max(3.2, readT(D.intro) + 1.0); K.narr(D.intro, 0.4, 0.4 + d0); T = Math.max(K.cur, 0.4 + d0) + 0.3;
  // ---- 每一组：镜头推过去 → 粗枝 → 组名 → 叶子 ----
  G.forEach((g, gi) => {
    const sd = g.side, ex = CX + sd * EW / 2, ne = g.gx - sd * g.nw / 2;
    const lx = g.gx + sd * (g.nw / 2 + 90), rx0 = Math.min(ne, lx + (sd > 0 ? 0 : -LW)), rx1 = Math.max(ne, lx + (sd > 0 ? LW : 0));
    // 镜头：一组放得下就整组一个镜头；组太高（长词义）就不缩小字，改成跟着正在写的叶子上下移（字始终够大）
    const zFit = Math.min(1.15, 780 / (g.y1 - g.y0 + 60), 1800 / (rx1 - rx0 + 160)), tall = zFit < 0.85;
    const z = tall ? Math.min(0.95, 1800 / (rx1 - rx0 + 160)) : zFit, camX = (rx0 + rx1) / 2 - sd * 60;
    const camY = y => Math.max(g.y0 + 390 / z, Math.min(g.y1 - 390 / z, y));
    T += 0.3; K.cam(T, { x: camX, y: tall ? camY(g.gy) : (g.y0 + g.y1) / 2 + 30 / z, z, d: 0.9, ease: 'power2.inOut' }); T += 0.8;
    if (gi === 0) key(T, P.point);
    const nar = `第 ${gi + 1} 组：${g.name}`; K.narr(nar, T, T + Math.max(2.4, readT(nar) + 1.2));
    const dx = ne - ex, dy = g.gy - CY;
    K.at(T).curve([[ex, CY], [ex + dx * 0.6, CY + dy * 0.08], [ne - dx * 0.08, CY + dy * 0.7], [ne, g.gy]], { w: 7, rough: 1.2, bow: 1.4 });
    K.rect(g.gx - g.nw / 2, g.gy - g.nh / 2, g.nw, g.nh, { w: 5, rough: 1.3 });
    g.nl.forEach((l, j) => K.text(l, g.gx, g.gy - g.nh / 2 + 17 + 56 + j * 70, NS, { align: 'center', col: OR, rate: 12 }));
    T = K.cur + 0.4;
    let ly = g.y0 + (g.h - g.leaves.reduce((a, l) => a + l.h, 0)) / 2;
    g.leaves.forEach(l => {
      if (tall) { K.cam(T, { x: camX, y: camY(ly + l.h / 2 + 30 / z), z, d: 0.6, ease: 'power2.inOut' }); T += 0.5; }
      const st = T, cy = ly + 48;
      K.at(T).curve([[g.gx + sd * g.nw / 2, g.gy], [g.gx + sd * (g.nw / 2 + 50), (g.gy + cy) / 2], [lx - sd * 18, cy]], { w: 4, rough: 1.0, col: GREY, min: 0.15 });
      const wsz = Math.min(WS, Math.floor(WS * LW * 0.85 / K.measure(l.wd, WS))), ww = K.measure(l.wd, wsz);   // 长词组（如 they / them / their / theirs）缩字号，不出版面
      K.text(l.wd, sd > 0 ? lx : lx - ww, ly + 66, wsz, { rate: 14 });
      l.ml.forEach((m, j) => { const mw = K.measure(m, MS); K.text(m, sd > 0 ? lx : lx - mw, ly + 74 + (j + 1) * MLH - 6, MS, { col: GREY, rate: 22 }); });
      const L = Math.max(sayLen(l.en), readT(l.zh) + 0.8);
      K.say(st, l.en, { key: l.en.split(/\s+/).map(x => x.toLowerCase().replace(/[^a-z'\-]/g, '')), zh: l.zh, len: L });
      T = Math.max(K.cur, st + L) + 0.25; ly += l.h;
    });
    T += HOLD;
  });
  // ---- 常用搭配：中心下方两个手绘框 ----
  const BW = 600, BX = [CX - 20 - BW, CX + 20], BY = 1200;
  const boxes = [[D.vTitle, D.verbs], [D.aTitle, D.adjs]].map(([tt, xs]) => { const ls = xs.map(x => wrap(x, 40, BW - 60)); return { tt, xs, ls, h: 110 + ls.reduce((a, l) => a + l.length * 52 + 14, 0) + 20 }; });
  const bh = Math.max(...boxes.map(b => b.h));
  T += 0.2; K.cam(T, { x: CX, y: Math.min(BY + bh / 2 + 10, 1480), z: Math.min(1, 760 / (bh + 120)), d: 1.0, ease: 'power2.inOut' }); T += 0.9;
  key(T, P.think);
  K.narr('常用搭配：配着这些词一起用', T, T + 3.2);
  boxes.forEach((b, i) => {
    K.at(T).rect(BX[i], BY, BW, b.h, { w: 5, rough: 1.3 });
    K.text(b.tt, BX[i] + 30, BY + 70, 46, { col: OR, rate: 12 });
    let y = BY + 110; const st = K.cur;
    b.ls.forEach(ls => { ls.forEach(l => { K.text(l, BX[i] + 30, y + 40, 40, { rate: 20 }); y += 52; }); y += 14; });
    if (b.xs.length) { const L = sayLen(b.xs[0]); K.say(st, b.xs[0], { len: L }); T = Math.max(K.cur, st + L) + 0.4; } else T = K.cur + 0.6;
  });
  // ---- 收束：拉远看整张导图 ----
  T += HOLD; key(T, P.idea);
  {   // 镜头框住整张导图（内容外接框），不按世界大小拉远——图更大、更好认
    const xs = [CX - EW / 2, CX + EW / 2, BX[0], BX[1] + BW], ys = [CY - EH / 2 - 20, BY + bh];
    G.forEach(g => { xs.push(g.gx + g.side * (g.nw / 2 + 90 + LW)); xs.push(g.gx - g.side * g.nw / 2); ys.push(g.y0, g.y1); });
    const x0 = Math.min(...xs) - 120, x1 = Math.max(...xs) + 120, y0 = Math.min(...ys) - 60, y1 = Math.max(...ys) + 60;
    const zf = Math.min(1920 / (x1 - x0), 1080 / (y1 - y0), 1);
    K.cam(T, { x: (x0 + x1) / 2, y: (y0 + y1) / 2, z: zf, d: 1.6 });
  }
  const d1 = Math.max(3.4, readT(D.outro) + 1.2); K.narr(D.outro, T + 0.6, T + 0.6 + d1);
  T = Math.max(T + 0.6 + d1, K.cur) + 0.4;
  K.shade(T); K.end(T + 1.6);
  return K.done();
}
