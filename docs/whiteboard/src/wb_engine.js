// ==================== 白板动画引擎 WB（王炸实验室通用）====================
// 画布 960×600：上方 0–544 白板，下方 544–600 讲解字幕条。
// 每个案例 = build(k) 脚本；k 提供带「时间游标」的绘制工具，按调用顺序自动排时间。
const WB = (function () {
  const NS = "http://www.w3.org/2000/svg";
  const C = { ink: "#1f2937", red: "#e11d48", green: "#059669", brown: "#92400e", blue: "#2563eb", orange: "#f59e0b", grey: "#64748b", purple: "#7c3aed" };
  const ZH = '"WenQuanYi Zen Hei","PingFang SC","Microsoft YaHei",sans-serif';
  const MONO = '"Courier New",Courier,monospace';
  // 估算文字宽度：中日韩字符按 1 个字号，其他按 0.55 个字号
  const estW = (str, size) => [...String(str)].reduce((w, ch) => w + (ch.charCodeAt(0) > 0x2e80 ? size : size * .55), 0);
  const clamp = v => Math.max(0, Math.min(1, v));
  const ease = k => k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;

  // ---------- 脚本工具包 ----------
  function kit(seed) {
    const S = { items: [], narr: [], at: 0, pathIdx: [] };
    let s = seed;
    const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280 - .5;
    const wl = (x1, y1, x2, y2, j = 1.6) => {
      const mx = (x1 + x2) / 2 + rnd() * j * 2, my = (y1 + y2) / 2 + rnd() * j * 2;
      return `M${(x1 + rnd() * j).toFixed(1)},${(y1 + rnd() * j).toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${(x2 + rnd() * j).toFixed(1)},${(y2 + rnd() * j).toFixed(1)}`;
    };
    const roughRect = (x, y, w, h) => [wl(x - 3, y, x + w + 2, y), wl(x + w, y - 2, x + w, y + h + 2), wl(x + w + 2, y + h, x - 2, y + h), wl(x, y + h + 2, x, y - 4)]
      .map((d, i) => i ? d.replace(/^M/, "L") : d).join(" ");
    const ellipse = (cx, cy, rx, ry) => {
      let d = "";
      for (let i = 0; i <= 40; i++) {
        const a = -Math.PI * .6 + i / 40 * Math.PI * 2.12, r = 1 + rnd() * .06;
        d += (i ? " L" : "M") + (cx + Math.cos(a) * rx * r).toFixed(1) + "," + (cy + Math.sin(a) * ry * r).toFixed(1);
      }
      return d;
    };
    const wave = (x1, x2, y, amp = 3) => {
      let d = `M${x1},${y}`;
      for (let x = x1, n = 0; x < x2; x += 6, n++) d += ` Q${x + 3},${y + (n % 2 ? -amp : amp)} ${x + 6},${y}`;
      return d;
    };
    const cloud = (cx, cy, rx, ry, n = 7) => {
      let d = "";
      for (let i = 0; i <= n; i++) {
        const a = Math.PI * .55 + i / n * Math.PI * 2;
        const x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry;
        if (!i) { d = `M${x.toFixed(1)},${y.toFixed(1)}`; continue; }
        const am = a - Math.PI / n, bulge = 1.32 + rnd() * .08;
        d += ` Q${(cx + Math.cos(am) * rx * bulge).toFixed(1)},${(cy + Math.sin(am) * ry * bulge).toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
      }
      return d + " Z";
    };

    const P = (d, t, dur, o = {}) => { S.pathIdx.push(S.items.length); S.items.push({ kind: "path", d, t, dur, ...o }); };
    const T = (text, x, y, t, dur, o = {}) => S.items.push({ kind: "text", text: String(text), x, y, t, dur, ...o });
    // 涂色：插到最近 back 笔描边的前面（DOM 在下层），这样色块盖住它后面的线、又不盖住自己的描边
    const F = (d, t, o = {}) => {
      const back = o.back ?? 1, pos = S.pathIdx.length >= back ? S.pathIdx[S.pathIdx.length - back] : S.items.length;
      S.items.splice(pos, 0, { kind: "fill", d, t, dur: .6, ...o });
      for (let i = 0; i < S.pathIdx.length; i++) if (S.pathIdx[i] >= pos) S.pathIdx[i]++;
    };
    const go = (dur, gap = .15) => { const st = S.at; S.at += dur + gap; return st; };
    const wait = d => { S.at += d; };
    const N = (term, text) => S.narr.push([S.at, term, text]);
    const rectD = (x, y, w, h) => `M${x},${y} h${w} v${h} h${-w} Z`;

    const k = {
      estW, C, S, P, T, F, go, wait, N, wl, roughRect, ellipse, wave, cloud, rectD,
      // 标题 + 中线
      // 标题：title 大字，sub 灰色副标题（自动排在标题右边）；divider=false 时不画中线
      header(sub, title = "竹节句 vs 树干句", divider = true) {
        T(title, 40, 52, go(1.4), 1.4, { size: 32, color: C.ink, weight: 900 });
        T(sub, 40 + estW(title, 32) + 28, 52, go(1.2), 1.2, { size: 20, color: C.grey });
        if (divider) P(wl(480, 80, 480, 425, 1), go(.5), .5, { color: "#cbd5e1", w: 2, dash: "6 7" });
      },
      // 小标题：anchor "start" / "middle" / "end"
      head(text, x, y = 108, color = C.ink, anchor = "start", size = 22) { T(text, x, y, go(.9), .9, { size, color, weight: 900, anchor }); },
      leftHead() { T("汉语：竹节句", 40, 108, go(.9), .9, { size: 22, color: C.brown, weight: 900 }); },
      rightHead() { T("英语：树干句", 930, 108, go(.9), .9, { size: 22, color: C.green, weight: 900, anchor: "end" }); },
      // 中文句子（等宽方块字），返回字位置
      zh(text, x, y, size = 28) {
        T(text, x, y, go(text.length * .16), text.length * .16, { size, color: C.ink });
        return { cx: i => x + size * i + size / 2, cy: y - size * .36, size, x, y };
      },
      circle(z, i, j = i, color = C.red) {
        const cx = (z.cx(i) + z.cx(j)) / 2, rx = (j - i + 1) * z.size * .5 + z.size * .16;
        P(ellipse(cx, z.cy, rx, z.size * .72), go(.45), .45, { color, w: 3 });
      },
      bracket(z, i, j, label, color = C.purple) {
        const x1 = z.x + z.size * i + 2, x2 = z.x + z.size * (j + 1) - 2, y = z.y + 10;
        P(`M${x1},${y - 4} Q${x1},${y + 6} ${x1 + 10},${y + 6} L${x2 - 10},${y + 6} Q${x2},${y + 6} ${x2},${y - 4}`, go(.45), .45, { color, w: 2.5 });
        T(label, (x1 + x2) / 2, y + 26, go(.5), .5, { size: 14, color, weight: 900, anchor: "middle" });
      },
      // 竹竿：每节一样长
      bamboo(labels, y = 192, x0 = 50, x1 = 449, size = 20) {
        const h = 40, w = x1 - x0, seg = w / labels.length;
        P(roughRect(x0, y, w, h), go(1.0), 1.0, { color: C.green, w: 3 });
        F(rectD(x0, y, w, h), go(.2, 0), { color: "#bbf7d0", op: .7 });
        for (let i = 1; i < labels.length; i++) P(wl(x0 + seg * i, y - 6, x0 + seg * i, y + h + 6), go(.3), .3, { color: C.green, w: 4 });
        P(`M${x1 + 3},${y + 6} q22,-22 42,-16 q-18,14 -42,16`, go(.45), .45, { color: C.green, w: 2.5 });
        labels.forEach((s, i) => T(s, x0 + seg * (i + .5), y + 28, go(.45), .45, { size, color: C.ink, weight: 900, anchor: "middle" }));
      },
      note(text, x, y, o = {}) {
        const dur = o.dur || Math.max(.6, text.length * .07);
        T(text, x, y, go(dur), dur, { size: 18, color: C.grey, ...o });
      },
      // 等宽英文行，返回词位置
      mono(text, x, y, size = 20, color = C.red, weight = 700) {
        const dur = Math.max(.8, text.length * .05);
        T(text, x, y, go(dur), dur, { size, color, font: MONO, weight });
        const cw = size * .6;
        const at = (sub, nth = 0) => { let i = -1; for (let n = 0; n <= nth; n++) i = text.indexOf(sub, i + 1); return i; };
        return { x, y, size, cw, text, at, x0: (sub, n) => x + at(sub, n) * cw, x1: (sub, n) => x + (at(sub, n) + sub.length) * cw };
      },
      squiggle(m, sub, nth = 0, color = C.red) { P(wave(m.x0(sub, nth), m.x1(sub, nth), m.y + 10), go(.4), .4, { color, w: 2.5 }); },
      underline(m, sub, nth = 0, color = C.orange) { P(wl(m.x0(sub, nth), m.y + 8, m.x1(sub, nth), m.y + 8, .6), go(.4), .4, { color, w: 4 }); },
      strike(m, sub, nth = 0, color = C.red) { P(wl(m.x0(sub, nth) - 2, m.y - m.size * .3, m.x1(sub, nth) + 2, m.y - m.size * .3, .5), go(.35), .35, { color, w: 3 }); },
      // 在 m 的 sub 前面插入符号 ^ 和要补的词
      caret(m, sub, nth, word, color = C.green) {
        const x = m.x0(sub, nth) - m.cw * .5;
        P(`M${x - 7},${m.y + 14} L${x},${m.y + 3} L${x + 7},${m.y + 14}`, go(.35), .35, { color, w: 3 });
        T(word, x, m.y - m.size - 2, go(.5), .5, { size: 17, color, weight: 900, anchor: "middle", font: MONO });
      },
      // 在 sub 上方写纠正词（配合 strike）
      above(m, sub, nth, word, color = C.green) {
        T(word, (m.x0(sub, nth) + m.x1(sub, nth)) / 2, m.y - m.size - 2, go(.5), .5, { size: 17, color, weight: 900, anchor: "middle", font: MONO });
      },
      redX(x, y) { P(wl(x, y, x + 20, y + 30, .6) + " " + wl(x + 20, y, x, y + 30, .6), go(.5), .5, { color: C.red, w: 4 }); },
      miniCrown(cx, y, color = C.orange) {
        const d = `M${cx - 14},${y} l4,-12 l6,7 l4,-10 l4,10 l6,-7 l4,12 Z`;
        P(d, go(.35), .35, { color, w: 2 }); F(d, go(.1, 0), { color: "#fde047", op: 1 });
      },
      bolt(x, y) { const d = `M${x},${y} l-8,14 h8 l-6,14 l16,-18 h-8 l6,-10 Z`; P(d, go(.35), .35, { color: C.red, w: 2 }); F(d, go(.1, 0), { color: "#fecaca", op: 1 }); },
      // 树：树干 + 树冠 + 主干牌子 + 王冠
      tree(o) {
        const cx = o.cx ?? 720, gr = o.ground ?? 420, tw = o.trunkW ?? 54, top = o.trunkTop ?? 210;
        const crY = o.crownY ?? 160, crRx = o.crownRx ?? 92, crRy = o.crownRy ?? 46;
        if (o.groundLine !== false) P(wl(o.gx0 ?? 560, gr, o.gx1 ?? 910, gr, 1), go(.5), .5, { color: C.ink, w: 2.5 });
        const l = cx - tw / 2, r = cx + tw / 2;
        const dl = `M${l},${gr} C${l + 6},${gr - 60} ${l - 2},${gr - 120} ${l + 4},${top}`;
        const dr = `M${r},${gr} C${r - 6},${gr - 60} ${r + 4},${gr - 120} ${r - 4},${top}`;
        P(dl, go(.6, 0), .6, { color: C.brown, w: 3.5 }); P(dr, go(.6), .6, { color: C.brown, w: 3.5 });
        F(`${dl} L${r - 4},${top} C${r + 4},${gr - 120} ${r - 6},${gr - 60} ${r},${gr} Z`, go(.3, 0), { color: "#fde68a", op: .8, back: 2 });
        const cd = cloud(cx, crY, crRx, crRy);
        P(cd, go(1.1, 0), 1.1, { color: C.green, w: 3 }); F(cd, go(.3), { color: "#bbf7d0", op: .75 });
        return { cx, l, r, gr };
      },
      sign(label, cx, y, crownWord, o = {}) {
        const fs = o.size ?? 24, cw = fs * .6, w = label.length * cw + 24, h = fs + 16, x = cx - w / 2;
        P(roughRect(x, y, w, h), go(.6, 0), .6, { color: C.ink, w: 2.5 });
        F(rectD(x, y, w, h), go(.3, 0), { color: "#fff", op: 1 });
        T(label, cx, y + h - 11, go(Math.max(.6, label.length * .06)), Math.max(.6, label.length * .06), { size: fs, color: C.ink, weight: 900, anchor: "middle", font: MONO });
        const res = { x, y, w, h, cw, wordX: (sub) => x + 12 + (label.indexOf(sub) + sub.length / 2) * cw };
        if (crownWord) {
          const ccx = res.wordX(crownWord), cy = y - 8;
          const d = `M${ccx - 21},${cy} l6,-16 l8,10 l7,-12 l7,12 l8,-10 l6,16 Z`;
          P(d, go(.6, 0), .6, { color: C.orange, w: 2.5 }); F(d, go(.3), { color: "#fde047", op: 1 });
          if (o.crownTag !== false) {
            const tx = o.tagX ?? ccx + 34, ty = o.tagY ?? cy - 4;
            T(o.crownTag || "唯一的谓语王", tx, ty, go(.8), .8, { size: 15, color: C.orange, weight: 900, anchor: o.tagAnchor || "start" });
          }
        }
        return res;
      },
      // 挂件：从 from 点画树枝/吊绳到牌子
      chip(text, x, y, from, o = {}) {
        const fs = o.size ?? 15, w = text.length * fs * .6 + 20, h = fs + 17, col = o.color ?? C.blue;
        const fill = o.fill ?? (col === C.green ? "#d1fae5" : col === C.purple ? "#ede9fe" : col === C.orange ? "#fef3c7" : "#dbeafe");
        const hx = o.hangX ?? x + w / 2;
        if (from) {
          const [fx, fy] = from;
          if (o.string) P(wl(fx, fy, hx, y, .4), go(.4), .4, { color: C.grey, w: 1.5 });
          else {
            const ey = y - 14;
            P(`M${fx},${fy} C${(fx * 2 + hx) / 3},${fy - 4} ${(fx + hx * 2) / 3},${ey + 2} ${hx},${ey}`, go(.5), .5, { color: C.brown, w: 3 });
            P(wl(hx, ey, hx, y, .3), go(.2), .2, { color: C.grey, w: 1.5 });
          }
        }
        P(roughRect(x, y, w, h), go(.5, 0), .5, { color: col, w: 2.5 });
        F(rectD(x, y, w, h), go(.2, 0), { color: fill, op: .95 });
        T(text, x + w / 2, y + h - 10, go(Math.max(.5, text.length * .05)), Math.max(.5, text.length * .05), { size: fs, color: col, weight: 700, anchor: "middle", font: MONO });
        if (o.tag) T(o.tag, o.tagX ?? x + 4, o.tagY ?? y + h + 18, go(.5), .5, { size: 13, color: C.grey, anchor: o.tagAnchor || "start" });
        return { x, y, w, h };
      },
      arrow(x1, y1, x2, y2, color = C.purple, label, lx, ly) {
        const a = Math.atan2(y2 - y1, x2 - x1), hl = 10;
        P(wl(x1, y1, x2, y2, .6) + ` M${x2 - hl * Math.cos(a - .5)},${y2 - hl * Math.sin(a - .5)} L${x2},${y2} L${x2 - hl * Math.cos(a + .5)},${y2 - hl * Math.sin(a + .5)}`, go(.5), .5, { color, w: 2.5 });
        if (label) T(label, lx ?? (x1 + x2) / 2, ly ?? (Math.min(y1, y2) - 8), go(.5), .5, { size: 14, color, weight: 900, anchor: "middle" });
      },
      // 底部完整句：自动缩放字号；crown 指定谓语词下划橙线
      final(text, crown, zhLine) {
        const size = Math.min(24, 860 / (text.length * .6)), cw = size * .6;
        T(text, 40, 478, go(Math.max(2, text.length * .045)), Math.max(2, text.length * .045), { size, color: C.green, weight: 900, font: MONO });
        (Array.isArray(crown) ? crown : [crown]).forEach(wd => {
          const i = (" " + text + " ").search(new RegExp("[ ,]" + wd + "[ ,.]"));
          if (i >= 0) P(wl(40 + i * cw, 487, 40 + (i + wd.length) * cw, 487, .6), go(.4), .4, { color: C.orange, w: 4 });
        });
        P(roughRect(16, 448, Math.max(380, text.length * cw + 48), 48), go(1.0), 1.0, { color: C.green, w: 2 });
        T(zhLine, 40, 522, go(1.6), 1.6, { size: 17, color: C.grey });
      }
    };
    return k;
  }

  // ---------- 播放器：把脚本挂到 svg 上 ----------
  function mount(svg, build, seed = 7) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute("viewBox", "0 0 960 600");
    const k = kit(seed);
    build(k);
    const items = k.S.items, NARR = k.S.narr.length ? k.S.narr : [[0, "", ""]];
    const END = k.S.at + 4;
    const uid = "wb" + Math.random().toString(36).slice(2, 8);
    const mk = (tag, attrs, parent = svg) => { const e = document.createElementNS(NS, tag); for (const a in attrs) e.setAttribute(a, attrs[a]); parent.appendChild(e); return e; };
    const defs = mk("defs", {});
    const pat = mk("pattern", { id: uid + "g", width: 30, height: 30, patternUnits: "userSpaceOnUse" }, defs);
    mk("path", { d: "M30,0 L0,0 0,30", fill: "none", stroke: "#eef2f5", "stroke-width": 1 }, pat);
    mk("rect", { x: 0, y: 0, width: 960, height: 600, fill: "#fdfdfb" });
    mk("rect", { x: 0, y: 0, width: 960, height: 544, fill: `url(#${uid}g)` });
    mk("rect", { x: 0, y: 544, width: 960, height: 56, fill: "#f1f5f9" });
    mk("line", { x1: 0, y1: 544, x2: 960, y2: 544, stroke: "#cbd5e1", "stroke-width": 1.5 });
    const narr = mk("text", { x: 24, y: 579, "font-size": 18, "font-family": ZH, "font-weight": 700, fill: "#334155" });
    const nTerm = mk("tspan", { fill: C.red, "font-weight": 900 }, narr), nRest = mk("tspan", {}, narr);
    const fillLayer = mk("g", {}), inkLayer = fillLayer;
    items.forEach((it, idx) => {
      if (it.kind === "fill") it.el = mk("path", { d: it.d, fill: it.color, opacity: 0 }, fillLayer);
      else if (it.kind === "path") {
        it.el = mk("path", { d: it.d, fill: "none", stroke: it.color, "stroke-width": it.w || 3, "stroke-linecap": "round", "stroke-linejoin": "round" }, inkLayer);
        it.len = it.el.getTotalLength();
        it.el.setAttribute("stroke-dasharray", it.dash || `${it.len} ${it.len}`);
      } else {
        const clip = mk("clipPath", { id: uid + "c" + idx }, defs);
        it.clipRect = mk("rect", { x: 0, y: 0, width: 0, height: 600 }, clip);
        it.el = mk("text", { x: it.x, y: it.y, fill: it.color, "font-size": it.size, "font-weight": it.weight || 700,
          "font-family": it.font || ZH, "text-anchor": it.anchor || "start", "clip-path": `url(#${uid}c${idx})` }, inkLayer);
        it.el.textContent = it.text;
      }
    });
    function measure() {
      items.forEach(it => { if (it.kind === "text") { const b = it.el.getBBox(); it.bx = b.x; it.bw = b.width; it.by = b.y; it.bh = b.height; it.clipRect.setAttribute("y", b.y - 6); it.clipRect.setAttribute("height", b.height + 12); } });
    }
    measure();
    // 拿马克笔的手
    const pen = mk("g", {});
    mk("path", { d: "M0,0 L10,-8 L72,-70 L60,-82 L-2,-20 Z", fill: "#1f2937", stroke: "#111", "stroke-width": 1.5 }, pen);
    mk("path", { d: "M60,-82 L72,-70 L84,-82 L72,-94 Z", fill: "#94a3b8", stroke: "#111", "stroke-width": 1.5 }, pen);
    mk("path", { d: "M22,-36 C30,-18 52,-6 78,-14 C104,-22 118,-52 108,-74 C98,-96 70,-98 56,-84 C46,-74 40,-60 22,-36 Z", fill: "#fde4cf", stroke: "#b45309", "stroke-width": 2, "stroke-linejoin": "round" }, pen);
    mk("path", { d: "M30,-30 C42,-26 52,-30 58,-40 M44,-20 C56,-18 66,-24 70,-34", fill: "none", stroke: "#b45309", "stroke-width": 1.8, "stroke-linecap": "round" }, pen);
    let penX = 905, penY = 525, lastNarr = -1;
    function render(t) {
      let active = null;
      for (const it of items) {
        const kk = clamp((t - it.t) / it.dur);
        if (it.kind === "fill") { it.el.setAttribute("opacity", (it.op ?? 1) * ease(kk)); continue; }
        if (it.kind === "path") {
          if (it.dash) it.el.setAttribute("opacity", kk > 0 ? Math.min(1, kk * 3) : 0);
          else it.el.setAttribute("stroke-dashoffset", it.len * (1 - kk));
          it.el.style.visibility = kk > 0 ? "visible" : "hidden";
          if (kk > 0 && kk < 1) { const p = it.el.getPointAtLength(it.len * kk); active = [p.x, p.y]; }
        } else {
          it.clipRect.setAttribute("x", it.bx - 4);
          it.clipRect.setAttribute("width", kk >= 1 ? it.bw + 12 : (it.bw + 8) * kk);
          if (kk > 0 && kk < 1) active = [it.bx + it.bw * kk, it.by + it.bh * .75 + Math.sin(t * 40) * 3];
        }
      }
      let ni = 0; for (let i = 0; i < NARR.length; i++) if (t >= NARR[i][0]) ni = i;
      if (ni !== lastNarr) {
        nTerm.textContent = NARR[ni][1]; nRest.textContent = NARR[ni][2]; lastNarr = ni;
        narr.setAttribute("font-size", 18);
        const L = narr.getComputedTextLength();
        if (L > 912) narr.setAttribute("font-size", (18 * 912 / L).toFixed(1));
      }
      narr.setAttribute("opacity", clamp((t - NARR[ni][0]) / .35));
      const target = active || [905, 525], f = active ? .55 : .12;
      penX += (target[0] - penX) * f; penY += (target[1] - penY) * f;
      pen.setAttribute("transform", `translate(${penX.toFixed(1)},${penY.toFixed(1)}) scale(.8)`);
      pen.setAttribute("opacity", t > END - .6 ? clamp((END - t) / .6) : 1);
    }
    return { render, end: END, remeasure() { measure(); lastNarr = -1; }, resetPen() { penX = 905; penY = 525; } };
  }

  return { mount, kit, C, ZH, MONO, estW };
})();
// 各页签的白板案例都登记在这里：WB_LAB[labTab] = [ { build(k){...}, terms:[[术语, 解释], ...] }, ... ]
const WB_LAB = {};
