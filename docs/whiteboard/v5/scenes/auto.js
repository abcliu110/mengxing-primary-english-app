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
    const toks = isEn(s) ? s.split(/(\s+)/) : [...s];
    for (const tk of toks) { if (K.measure(line + tk, size) > maxW && line.trim()) { out.push(line.trimEnd()); line = tk.trimStart(); } else line += tk; }
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
