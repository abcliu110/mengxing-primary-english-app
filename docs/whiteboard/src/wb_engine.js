// ==================== 白板动画引擎 WB（王炸实验室通用）====================
// 画布 960×600：上方 0–544 白板，下方 544–600 讲解字幕条。
// 每个案例 = build(k) 脚本；k 提供带「时间游标」的绘制工具，按调用顺序自动排时间。
const WB = (function () {
  const NS = "http://www.w3.org/2000/svg";
  const C = { ink: "#1f2937", red: "#e11d48", green: "#059669", brown: "#92400e", blue: "#2563eb", orange: "#f59e0b", grey: "#64748b", purple: "#7c3aed" };
  const ZH = '"WenQuanYi Zen Hei","PingFang SC","Microsoft YaHei",sans-serif';
  const MONO = '"Courier New",Courier,monospace';
  // 可信度徽章（单词身世骨架；全 App 通用）
  const BADGES = {
    "📜": { label: "真实词源", full: "真实词源：查得到出处的历史事实", color: "#92400e", fill: "#fef3c7" },
    "💡": { label: "记忆联想", full: "记忆联想：帮你记住的画面，不是历史", color: "#b45309", fill: "#fff7ed" },
    "✂️": { label: "简化说法", full: "简化说法：为了小学生好懂，讲得简单了一些", color: "#2563eb", fill: "#dbeafe" },
    "⚠️": { label: "有例外", full: "有例外，或者是流行的错误说法", color: "#e11d48", fill: "#ffe4e6" },
    "❓": { label: "有争议", full: "有争议：专家有不同说法，还没有定论", color: "#7c3aed", fill: "#ede9fe" },
  };
  // 估算文字宽度：中日韩字符按 1 个字号，其他按 0.55 个字号
  const estW = (str, size) => [...String(str)].reduce((w, ch) => w + (ch.charCodeAt(0) > 0x2e80 ? size : size * .55), 0);
  const clamp = v => Math.max(0, Math.min(1, v));
  const ease = k => k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
  // ---- 引擎 v3（视觉标准 V1–V8 + 商业动画 M1–M12）：只对调用了 k.v2() 的案例生效，旧案例画面不变 ----
  // 分类缓动（V4 / M4）：出现 = 弹入过冲，吸附 = 回弹，移动 = 缓入缓出，退场 = 快出；linear 只给进度条
  const EASE = {
    move: x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
    in: x => 1 - Math.pow(1 - x, 3),
    exit: x => x * x * x,
    pop: x => { const c = 1.7; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); },
    snap: x => x >= 1 ? 1 : 1 - Math.exp(-6.5 * x) * Math.cos(11 * x),
    antic: x => { const c = 1.2 * 1.525; return x < .5 ? (Math.pow(2 * x, 2) * ((c + 1) * 2 * x - c)) / 2 : (Math.pow(2 * x - 2, 2) * ((c + 1) * (x * 2 - 2) + c) + 2) / 2; },
    sine: x => -(Math.cos(Math.PI * x) - 1) / 2,
    linear: x => x,
  };
  // 统一调色板（V3）：墨黑 + 红（错误 / 术语）+ 绿（正确 / 结论）+ 蓝（主角词 / 词根）；灰只用于注释；荧光黄 / 绿只作底色
  const PAL = { ink: "#1f2937", red: "#e11d48", green: "#059669", blue: "#2563eb", grey: "#64748b",
    hlYellow: "#fde047", hlGreen: "#86efac", tintBlue: "#dbeafe", tintGreen: "#d1fae5", tintRed: "#ffe4e6", tintInk: "#f1f5f9", paper: "#fdfdfb", sea: "#93c5fd" };
  const FS = { title: 32, sub: 22, body: 19, note: 14 };    // 字号 4 级
  const GRID = { col: i => 24 + i * 76, margin: 24 };          // 12 列网格（列宽 76，含边距 24）

  // ---------- 脚本工具包 ----------
  function kit(seed) {
    const S = { items: [], narr: [], at: 0, pathIdx: [], fx: [], g: 0, gn: 0, cam: [], says: [], badges: [], eggs: [], hdrEnd: 0, v2: false, wipes: [], sfx: [], keeps: [] };
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

    const P = (d, t, dur, o = {}) => { S.pathIdx.push(S.items.length); S.items.push({ kind: "path", d, t, dur, g: S.g, ...o }); };
    const T = (text, x, y, t, dur, o = {}) => S.items.push({ kind: "text", text: String(text), x, y, t, dur, g: S.g, ...o });
    // 涂色：插到最近 back 笔描边的前面（DOM 在下层），这样色块盖住它后面的线、又不盖住自己的描边
    const F = (d, t, o = {}) => {
      const back = o.back ?? 1, pos = S.pathIdx.length >= back ? S.pathIdx[S.pathIdx.length - back] : S.items.length;
      S.items.splice(pos, 0, { kind: "fill", d, t, dur: .6, g: S.g, ...o });
      for (let i = 0; i < S.pathIdx.length; i++) if (S.pathIdx[i] >= pos) S.pathIdx[i]++;
    };
    const go = (dur, gap = .15) => { const st = S.at; S.at += dur + gap; return st; };
    const wait = d => { S.at += d; };
    const N = (term, text) => S.narr.push([S.at, term, text]);
    const rectD = (x, y, w, h) => `M${x},${y} h${w} v${h} h${-w} Z`;

    // ---- 引擎 v2 动效（全部按时间 t 计算，进度条可拖动）----
    // group() 之后画的元素进同一个 <g>，endGroup() 结束；动效作用在整组上
    const group = () => (S.g = ++S.gn);
    const endGroup = () => { S.g = 0; };
    // v2：没写 ease 的动效按类型给默认缓动（移动 = 缓入缓出，淡出 = 快出，淡入 = 缓出）
    const dflt = (o, e) => (S.v2 && !o.ease && !o.linear ? { ...o, ease: e } : o);
    const move = (g, t, dur, dx, dy, o = {}) => S.fx.push({ type: "move", g, t, dur, dx, dy, ...dflt(o, "move") });
    const arc = (g, t, dur, d, o = {}) => S.fx.push({ type: "arc", g, t, dur, d, ...dflt(o, "move") });   // d：相对路径，从 0,0 出发
    // 沿折线移动（船环游、货箱进城）：pts = [[dx,dy], ...] 相对组的当前位置；o.linear 匀速
    // v2：折线自动变成平滑曲线（Catmull-Rom），运动走弧线（M5）
    const path = (g, t, dur, pts, o = {}) => {
      if (!S.v2 || o.sharp) return arc(g, t, dur, "M0,0 " + pts.map(p => "L" + p[0] + "," + p[1]).join(" "), o);
      const P0 = [[0, 0], ...pts]; let d = "M0,0";
      for (let i = 0; i < P0.length - 1; i++) {
        const a = P0[i - 1] || P0[i], b = P0[i], c = P0[i + 1], e = P0[i + 2] || c;
        d += ` C${(b[0] + (c[0] - a[0]) / 6).toFixed(1)},${(b[1] + (c[1] - a[1]) / 6).toFixed(1)} ${(c[0] - (e[0] - b[0]) / 6).toFixed(1)},${(c[1] - (e[1] - b[1]) / 6).toFixed(1)} ${c[0]},${c[1]}`;
      }
      return arc(g, t, dur, d, o);
    };
    const buzz = (g, t, dur, amp = 2.5) => S.fx.push({ type: "buzz", g, t, dur, amp });
    const fade = (g, t, dur, to, o = {}) => S.fx.push({ type: "fade", g, t, dur, to, ...dflt(o, to > .5 ? "in" : "exit") });
    const rot = (g, t, dur, deg, cx, cy) => S.fx.push({ type: "rot", g, t, dur, deg, cx, cy, ...dflt({}, "move") });
    // v2：弹入（M2 挤压拉伸：从小到大、过冲回弹，体积大致不变）；中心不给就用组的包围盒中心
    const pop = (g, t, dur = .5, o = {}) => { S.fx.push({ type: "pop", g, t, dur, from: o.from ?? 0, cx: o.cx, cy: o.cy, amp: o.amp ?? .12 }); if (o.sfx !== false) S.sfx.push({ t, name: "pop" }); };
    // v2：落地挤压（以底边为支点压扁再回弹）
    const squash = (g, t, dur = .32, amp = .14, o = {}) => S.fx.push({ type: "squash", g, t, dur, amp, cx: o.cx, cy: o.cy });
    const sfx = (name, t = S.at) => S.sfx.push({ t, name });
    // v2：板擦擦除转场（V8）：组 gs 在 [t, t+dur] 被板擦一行一行擦掉，结束时整组隐藏
    const erase = (gs, dur = 1.1, o = {}) => {
      const t = go(dur, o.gap ?? .1);
      S.wipes.push({ t, dur, gs: gs.slice(), y0: o.y0 ?? 92, y1: o.y1 ?? 544 });
      S.keeps.push([t, t + dur]);   // 擦除按原速，不被节奏压缩
      gs.forEach(g => S.fx.push({ type: "fade", g, t: t + dur, dur: .001, to: 0, wipe: true }));
      S.sfx.push({ t, name: "erase" });
      return t;
    };
    const v2 = (o = {}) => { S.v2 = true; S.v2o = o; };
    const hide = g => S.fx.push({ type: "fade", g, t: -1, dur: .001, to: 0 });         // 组一开始隐藏，之后用 fade 显示
    // 镜头：白板区（不含字幕条）在 t 开始、dur 内缩放平移到「以 (x,y) 为中心、放大 z 倍」
    const camera = (t, dur, x, y, z) => S.cam.push({ t, dur, x, y, z });
    // 英文例句朗读：在当前时刻读 en（可先单独读 word），时间轴预留朗读时长；读的时候画面停住。只读正确的英文！
    const say = (en, o = {}) => {
      en = String(en).trim();
      const words = en.split(/\s+/).length, wd = o.word ? .4 + String(o.word).split(/\s+/).length * .45 : 0;
      const dur = wd + .5 + words * .42;
      S.says.push({ t: S.at, dur, wd, en, zh: o.zh || "", word: o.word || "", egg: (o.egg || []).map(w => String(w).toLowerCase()), blocks: o.blocks || [] });
      (o.egg || []).forEach(w => S.eggs.includes(w) || S.eggs.push(w));
      S.at += dur + .25;
    };

    const k = {
      estW, C, S, P, T, F, go, wait, N, wl, roughRect, ellipse, wave, cloud, rectD,
      group, endGroup, move, arc, path, buzz, fade, rot, hide, camera, say,
      v2, pop, squash, sfx, erase, PAL, FS, GRID, EASE,
      // 荧光笔底色（V2）：在文字下面先刷一道半透明荧光带（左 → 右），再写字；每屏不超过 3 处
      hl(x, y, w, h = 24, o = {}) {
        const yy = y - h * .5;
        P(`M${x},${(yy + 1.5).toFixed(1)} Q${(x + w / 2).toFixed(1)},${(yy - 1).toFixed(1)} ${x + w},${(yy + .5).toFixed(1)}`, go(o.dur ?? .35, o.gap ?? .05), o.dur ?? .35, { color: o.color || PAL.hlYellow, w: h, alpha: o.alpha ?? .55, hl: true, cap: "butt" });
      },
      // 文字 + 荧光底色：text 在 (x, y) 基线；size 字号；mono 等宽
      hlText(text, x, y, size, o = {}) {
        const w = o.mono ? text.length * size * .6 : estW(text, size), ax = o.anchor === "middle" ? x - w / 2 : o.anchor === "end" ? x - w : x;
        k.hl(ax - 6, y - size * .3, w + 12, size * .98, o);
      },
      // 统一片头（V8）：居中标题卡（标题 + 副标题 + 徽章）弹入 → 停留 → 快出；之后正常写 header
      titleCard(o = {}) {
        const t0 = S.at, g = group(), w = o.w ?? 560, h = 214, x = 480 - w / 2, y = 150;
        P(roughRect(x, y, w, h), t0, .55, { color: PAL.ink, w: 2.6 });
        F(rectD(x, y, w, h), t0 + .1, { color: "#ffffff", op: 1 });
        const tw = estW(o.title, FS.title);
        P(`M${(480 - tw / 2 - 14).toFixed(1)},${y + 76} Q480,${y + 72} ${(480 + tw / 2 + 14).toFixed(1)},${y + 75}`, t0 + .55, .35, { color: PAL.hlYellow, w: 40, alpha: .6, hl: true, cap: "butt" });
        T(o.title, 480, y + 87, t0 + .9, .7, { size: FS.title, color: PAL.ink, weight: 900, anchor: "middle", noHL: true });
        if (o.sub) T(o.sub, 480, y + 128, t0 + 1.55, .6, { size: 18, color: PAL.grey, weight: 700, anchor: "middle", noHL: true });
        S.at = t0 + 1.7;
        if (o.badges && o.badges.length) {
          const fs = 14, ws = o.badges.map(kk => estW(kk + " " + (BADGES[kk] || BADGES["📜"]).label, fs) + 14), tot = ws.reduce((a, b) => a + b, 0) + 8 * (ws.length - 1);
          let bx = 480 - tot / 2;
          o.badges.forEach((kk, i) => { k.badge(kk, bx, y + 172, { size: fs }); bx += ws[i] + 8; });
        }
        endGroup();
        pop(g, t0, .55, { cx: 480, cy: y + h / 2 });
        const tOut = t0 + (o.dur ?? 4.2);
        S.keeps.push([t0 + .6, tOut + .5]);   // 片头停留时间不被节奏压缩
        move(g, tOut, .45, 0, -40, { ease: "exit" }); fade(g, tOut, .45, 0, { ease: "exit" });
        S.at = tOut + .5;
        return g;
      },
      // 统一收尾金句卡（V8）：一句话洞见 + 口诀；盖住前面的画面，定格可截图复习
      quoteCard(o = {}) {
        const t0 = go(.01, 0), dim = group();
        S.items.push({ kind: "fill", d: rectD(0, 0, 960, 544), t: t0, dur: .5, g: S.g, color: PAL.paper, op: .94 });   // 盖在之前所有内容上面
        endGroup();
        const g = group(), x = o.x ?? 70, y = 104, w = o.w ?? 760, h = 380;   // 右边留给讲解员小人
        P(roughRect(x, y, w, h), t0 + .2, .6, { color: PAL.ink, w: 2.8 });
        F(rectD(x, y, w, h), t0 + .3, { color: "#ffffff", op: 1 });
        P(roughRect(x + 10, y + 10, w - 20, h - 20), t0 + .7, .5, { color: PAL.green, w: 1.6 });
        T("💡 一句话洞见", x + 40, y + 56, t0 + 1.1, .5, { size: FS.note + 1, color: PAL.grey, weight: 900 });
        const wrap = (str, n) => String(str).split("\n").flatMap(part => wrap1(part, n));
        const wrap1 = (str, n) => { const out = []; let cur = "", cw = 0; for (const ch of str) { const add = ch.charCodeAt(0) > 0x2e80 ? 1 : .55; if (cw + add > n && cur) { out.push(cur); cur = ""; cw = 0; } cur += ch; cw += add; } if (cur) out.push(cur); return out; };
        S.at = t0 + 1.5;
        wrap(o.insight || "", 31).forEach((ln, i) => T(ln, x + 40, y + 102 + i * 36, go(Math.max(.6, ln.length * .05)), Math.max(.6, ln.length * .05), { size: FS.sub, color: PAL.ink, weight: 900 }));
        const ry = y + 102 + Math.max(1, wrap(o.insight || "", 31).length) * 36 + 30;
        P(wl(x + 40, ry - 24, x + w - 40, ry - 24, .8), go(.4), .4, { color: "#cbd5e1", w: 2, dash: "6 7" });
        T("🎵 口诀", x + 40, ry + 6, go(.4), .4, { size: FS.note + 1, color: PAL.grey, weight: 900 });
        wrap(o.rhyme || "", 31).forEach((ln, i) => {
          if (i < (o.hlLines ?? 1)) k.hlText(ln, x + 40, ry + 46 + i * 36, FS.sub, { color: PAL.hlGreen });
          T(ln, x + 40, ry + 46 + i * 36, go(Math.max(.6, ln.length * .05)), Math.max(.6, ln.length * .05), { size: FS.sub, color: PAL.green, weight: 900 });
        });
        if (o.foot) T(o.foot, x + w - 30, y + h - 24, go(.4), .4, { size: FS.note, color: PAL.grey, weight: 700, anchor: "end" });
        endGroup();
        pop(g, t0 + .15, .6, { cx: 480, cy: y + h / 2, from: .2 });
        sfx("ding", S.at);
        return { dim, g };
      },
      // 标题 + 中线
      // 标题：title 大字，sub 灰色副标题（自动排在标题右边）；divider=false 时不画中线
      header(sub, title = "竹节句 vs 树干句", divider = true) {
        T(title, 40, 52, go(1.4), 1.4, { size: 32, color: C.ink, weight: 900, noHL: true });
        T(sub, 40 + estW(title, 32) + 28, 52, go(1.2), 1.2, { size: 20, color: C.grey, noHL: true });
        S.hdrEnd = 40 + estW(title, 32) + 28 + estW(sub, 20);
        if (divider) P(wl(480, 80, 480, 425, 1), go(.5), .5, { color: "#cbd5e1", w: 2, dash: "6 7" });
      },
      // ---- 可信度徽章（全 App 通用）：📜 真实词源 / 💡 记忆联想 / ✂️ 简化说法 / ⚠️ 有例外或流行错误说法 / ❓ 有争议 ----
      // 单个徽章胶囊：左边 x，基线 y；返回 { x, w, end }
      badge(key, x, y, o = {}) {
        const b = BADGES[key] || BADGES["📜"], fs = o.size ?? 13, label = key + " " + (o.label ?? b.label);
        const w = estW(label, fs) + 14, h = fs + 10;
        P(roughRect(x, y - fs - 2, w, h), go(.35, 0), .35, { color: b.color, w: 1.8 });
        F(rectD(x, y - fs - 2, w, h), go(.1, 0), { color: b.fill, op: 1 });
        T(label, x + 7, y + 2, go(.4), .4, { size: fs, color: b.color, weight: 900 });
        if (!S.badges.includes(key)) S.badges.push(key);
        return { x, w, end: x + w };
      },
      // 一排徽章：默认排在 header 副标题后面（同一行）；放不下就靠右对齐
      badges(keys, o = {}) {
        const fs = o.size ?? 13, ws = keys.map(kk => estW(kk + " " + (BADGES[kk] || BADGES["📜"]).label, fs) + 14), tot = ws.reduce((a, b) => a + b, 0) + 8 * (keys.length - 1);
        let x = o.x ?? (S.hdrEnd + 18);
        if (x + tot > 948) x = 948 - tot;
        const y = o.y ?? 48;
        keys.forEach((kk, i) => { k.badge(kk, x, y, { size: fs }); x += ws[i] + 8; });
        return x;
      },
      // 🥚 彩蛋词标记（超出课标：知道就好，不用背）：手绘小鸡蛋，中心 (x,y)；o.note 加一行小字说明
      egg(x, y, o = {}) {
        const s = o.s ?? 8;
        const d = `M${x},${y - s * 1.3} C${x + s * 1.05},${y - s * 1.3} ${x + s * 1.05},${y + s} ${x},${y + s} C${x - s * 1.05},${y + s} ${x - s * 1.05},${y - s * 1.3} ${x},${y - s * 1.3} Z`;
        P(d, go(.3), .3, { color: C.orange, w: 2 }); F(d, go(.1, 0), { color: "#fef08a", op: 1 });
        P(`M${x - s * .8},${y - s * .1} l${s * .4},${-s * .35} l${s * .4},${s * .35} l${s * .4},${-s * .35} l${s * .4},${s * .35}`, go(.15), .15, { color: C.brown, w: 1.4 });
        if (o.word && !S.eggs.includes(o.word)) S.eggs.push(o.word);
        if (o.note) T(o.note === true ? "彩蛋词：知道就好，不用背" : o.note, o.nx ?? x + s + 6, o.ny ?? y + 5, go(.6), .6, { size: S.v2 ? 13 : 12, color: C.grey, weight: 700 });
      },
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
      final(text, crown, zhLine, o = {}) {
        const size = Math.min(24, 860 / (text.length * .6)), cw = size * .6;
        T(text, 40, 478, go(Math.max(2, text.length * .045)), Math.max(2, text.length * .045), { size, color: C.green, weight: 900, font: MONO });
        (Array.isArray(crown) ? crown : [crown]).forEach(wd => {
          const i = (" " + text + " ").search(new RegExp("[ ,]" + wd + "[ ,.]"));
          if (i >= 0) P(wl(40 + i * cw, 487, 40 + (i + wd.length) * cw, 487, .6), go(.4), .4, { color: C.orange, w: 4 });
        });
        P(roughRect(16, 448, Math.max(380, text.length * cw + 48), 48), go(1.0), 1.0, { color: C.green, w: 2 });
        T(zhLine, 40, 522, go(1.6), 1.6, { size: 17, color: C.grey });
        if (!o.noSay) say(o.say ?? text, { zh: o.zh ?? String(zhLine || "").split(/\s{2,}/)[0], word: o.word });
      }
    };
    // 时间重映射（D.finish 压缩节奏用）：所有带时间的登记一起改；g(t) 单调
    k.remap = (g) => {
      const mapD = o => { const t0 = o.t; o.t = g(t0); o.dur = Math.max(.001, g(t0 + o.dur) - o.t); };
      S.wipes.forEach(mapD); S.sfx.forEach(e => { e.t = g(e.t); });
      (S.actors || []).forEach(a => { a.acts.forEach(mapD); a.exprs.forEach(mapD); a.looks.forEach(mapD); a.fades.forEach(f => { if (f.t >= 0) mapD(f); }); });
      (S.acts || []).forEach(r => { if (r.fx) mapD(r.e); r.t = r.e.t; r.dur = r.e.dur; });
      (S.props || []).forEach(p => { if (p.stampAt != null) p.stampAt = g(p.stampAt); if (p.showAt != null) p.showAt = g(p.showAt); });
    };
    if (typeof WB_ACTOR !== "undefined") WB_ACTOR.kit(k);   // 人物骨架与动作库（wb_actor.js）
    return k;
  }

  // ---------- 播放器：把脚本挂到 svg 上 ----------
  function mount(svg, build, seed = 7) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const k = kit(seed);
    build(k);
    const S = k.S, V2 = !!S.v2;
    // 尊重「减少动态效果」（只对 v2 案例）：画线写字改淡入、弹入改淡入、擦除改淡出、镜头直接到位、不画手
    const REDUCED = V2 && typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = S.items, NARR = S.narr.length ? S.narr : [[0, "", ""]];
    const END = S.at + 4;
    const SAYS = S.says, H = SAYS.length ? 650 : 600;
    svg.setAttribute("viewBox", `0 0 960 ${H}`);
    svg.style.aspectRatio = `960/${H}`;
    const uid = "wb" + Math.random().toString(36).slice(2, 8);
    const mk = (tag, attrs, parent = svg) => { const e = document.createElementNS(NS, tag); for (const a in attrs) e.setAttribute(a, attrs[a]); parent.appendChild(e); return e; };
    // 只在值变了才写 DOM（省掉每帧几千次无用的 setAttribute；写进去的值和以前完全一样）
    const setA = (el, n, v) => { const c = el.__c || (el.__c = {}); if (c[n] !== v) { c[n] = v; el.setAttribute(n, v); } };
    const setV = (el, v) => { if (el.__vis !== v) { el.__vis = v; el.style.visibility = v; } };
    const defs = mk("defs", {});
    const pat = mk("pattern", { id: uid + "g", width: 30, height: 30, patternUnits: "userSpaceOnUse" }, defs);
    mk("path", { d: "M30,0 L0,0 0,30", fill: "none", stroke: "#eef2f5", "stroke-width": 1 }, pat);
    mk("rect", { x: 0, y: 0, width: 960, height: 600, fill: "#fdfdfb" });
    const bclip = mk("clipPath", { id: uid + "b" }, defs);
    mk("rect", { x: 0, y: 0, width: 960, height: 544 }, bclip);
    const boardClip = mk("g", { "clip-path": `url(#${uid}b)` });
    const board = mk("g", {}, boardClip);
    mk("rect", { x: -960, y: -600, width: 2880, height: 1744, fill: `url(#${uid}g)` }, board);
    mk("rect", { x: 0, y: 544, width: 960, height: 56, fill: "#f1f5f9" });
    mk("line", { x1: 0, y1: 544, x2: 960, y2: 544, stroke: "#cbd5e1", "stroke-width": 1.5 });
    const narr = mk("text", { x: 24, y: 579, "font-size": 18, "font-family": ZH, "font-weight": 700, fill: "#334155" });
    const nTerm = mk("tspan", { fill: C.red, "font-weight": 900 }, narr), nRest = mk("tspan", {}, narr);
    // 🔊 英文朗读条（600–650）：英文逐词高亮，下面一行中文；点一下重听
    let strip = null, sEn = null, sZh = null, sWords = [], lastSay = -2, lastHL = -2;
    if (SAYS.length) {
      strip = mk("g", { style: "cursor:pointer" });
      mk("rect", { x: 0, y: 600, width: 960, height: 50, fill: "#ecfdf5" }, strip);
      mk("line", { x1: 0, y1: 600, x2: 960, y2: 600, stroke: "#a7f3d0", "stroke-width": 1.5 }, strip);
      mk("text", { x: 14, y: 632, "font-size": 22 }, strip).textContent = "🔊";
      sEn = mk("text", { x: 50, y: 622, "font-size": 19, "font-family": MONO, "font-weight": 700, fill: "#065f46" }, strip);
      sZh = mk("text", { x: 50, y: 643, "font-size": 14, "font-family": ZH, fill: "#64748b" }, strip);
    }
    const layer = mk("g", {}, board);
    const groups = {};
    const parentOf = it => !it.g ? layer : (groups[it.g] || (groups[it.g] = { el: mk("g", {}, layer) })).el;
    items.forEach((it, idx) => {
      const fillLayer = parentOf(it), inkLayer = fillLayer;
      if (it.kind === "fill") it.el = mk("path", { d: it.d, fill: it.color, opacity: 0 }, fillLayer);
      else if (it.kind === "path") {
        const w = it.w || 3;
        // v2 粗细笔触（V2）：底线略细，再叠一条只覆盖中段的粗线 → 中段粗、起笔收笔细
        const thick = V2 && !it.hl && !it.dash && it.alpha == null && w >= 1.8;   // 半透明线不叠加粗线（叠起来会发深）
        it.el = mk("path", { d: it.d, fill: "none", stroke: it.color, "stroke-width": thick ? w * .8 : w, "stroke-linecap": it.cap || "round", "stroke-linejoin": "round" }, inkLayer);
        if (it.hl) it.el.setAttribute("stroke-opacity", it.alpha ?? .55);   // 荧光带画在文字下面，不需要混合模式（省合成开销）
        else if (V2 && it.alpha != null) it.el.setAttribute("stroke-opacity", it.alpha);
        it.len = it.el.getTotalLength();
        it.el.setAttribute("stroke-dasharray", it.dash || `${it.len} ${it.len}`);
        if (thick && it.len > 18) { it.el2 = mk("path", { d: it.d, fill: "none", stroke: it.color, "stroke-width": w * 1.32, "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-dashoffset": (-it.len * .15).toFixed(1) }, inkLayer); it.el2.style.visibility = "hidden"; if (it.alpha != null) it.el2.setAttribute("stroke-opacity", it.alpha); }
        if (REDUCED) it.el.setAttribute("stroke-dasharray", it.dash || "none");
      } else {
        const clip = mk("clipPath", { id: uid + "c" + idx }, defs);
        it.clipRect = mk("rect", { x: 0, y: 0, width: 0, height: 600 }, clip);
        it.el = mk("text", { x: it.x, y: it.y, fill: it.color, "font-size": it.size, "font-weight": it.weight || 700,
          "font-family": it.font || ZH, "text-anchor": it.anchor || "start", "clip-path": `url(#${uid}c${idx})` }, inkLayer);
        it.el.textContent = it.text;
      }
    });
    const FX = S.fx, CAM = S.cam;
    FX.forEach(f => { if (f.type === "arc") { f.el = mk("path", { d: f.d, fill: "none" }, defs); f.len = f.el.getTotalLength(); } });
    if (REDUCED) FX.forEach(f => { if (f.wipe) { const w = S.wipes.find(w => Math.abs(w.t + w.dur - f.t) < .01); if (w) { f.t = w.t; f.dur = w.dur * .6; } } });
    let camM = [0, 0, 1];   // 当前镜头：平移 tx,ty + 缩放 z（render 里更新）
    const camEase = V2 ? EASE.move : ease;
    function camAt(t) {
      let x = 480, y = 272, z = 1;
      for (const c of CAM) { const kq = clamp((t - c.t) / Math.max(.001, c.dur)), q = REDUCED ? (kq >= 1 ? 1 : kq > .5 ? 1 : 0) : camEase(kq); x += (c.x - x) * q; y += (c.y - y) * q; z += (c.z - z) * q; }
      return [480 - x * z, 272 - y * z, z];
    }
    // 第一个镜头在开始前就生效（脚本一开始就设好特写）：camera(0, 0, ...)
    function fxRender(t) {
      for (const id in groups) {
        let dx = 0, dy = 0, op = 1, deg = 0, cx = 0, cy = 0, sx = 1, sy = 1, scx = null, scy = null;
        for (const f of FX) {
          if (f.g != id) continue;
          const kk = clamp((t - f.t) / Math.max(.001, f.dur)), q = f.linear ? kk : f.ease ? (REDUCED && f.type !== "fade" ? (kk >= 1 ? 1 : 0) : EASE[f.ease](kk)) : ease(kk);
          if (f.type === "move") { dx += f.dx * q; dy += f.dy * q; }
          else if (f.type === "arc") { const p = f.el.getPointAtLength(f.len * q), p0 = f.el.getPointAtLength(0); dx += p.x - p0.x; dy += p.y - p0.y; }
          else if (f.type === "buzz") { if (kk > 0 && kk < 1) { dx += Math.sin(t * 71) * f.amp; dy += Math.cos(t * 53) * f.amp * .6; } }
          else if (f.type === "fade") { if (t >= f.t) op += (f.to - op) * q; }
          else if (f.type === "rot") { deg += f.deg * q; cx = f.cx; cy = f.cy; }
          else if (f.type === "pop") {
            if (t < f.t) { if (!REDUCED) { sx = sy = Math.max(.001, f.from); } op *= f.from > 0 ? 1 : 0; }
            else if (kk < 1) {
              if (REDUCED) op *= kk;
              else { const s = f.from + (1 - f.from) * EASE.pop(kk), st = Math.sin(Math.PI * Math.min(1, kk * 1.6)) * f.amp; sx *= s * (1 - st * .7); sy *= s * (1 + st); }
            }
            const bb = bbOf(id); scx = f.cx ?? bb[0]; scy = f.cy ?? bb[1];
          } else if (f.type === "squash") {
            if (kk > 0 && kk < 1 && !REDUCED) { const w = Math.sin(2 * Math.PI * kk) * (1 - kk) * f.amp; sx *= 1 + w; sy *= 1 - w; const bb = bbOf(id); scx = f.cx ?? bb[0]; scy = f.cy ?? bb[2]; }
          }
        }
        const G = groups[id]; G.dx = dx; G.dy = dy; G.op = op;
        let tf = `translate(${dx.toFixed(2)},${dy.toFixed(2)})` + (deg ? ` rotate(${deg.toFixed(2)},${cx},${cy})` : "");
        if (scx != null && (Math.abs(sx - 1) > 1e-4 || Math.abs(sy - 1) > 1e-4)) tf += ` translate(${scx.toFixed(1)},${scy.toFixed(1)}) scale(${sx.toFixed(4)},${sy.toFixed(4)}) translate(${(-scx).toFixed(1)},${(-scy).toFixed(1)})`;
        setA(G.el, "transform", tf);
        setA(G.el, "opacity", op.toFixed(3));
      }
      if (CAM.length) { camM = camAt(t); setA(board, "transform", `translate(${camM[0].toFixed(2)},${camM[1].toFixed(2)}) scale(${camM[2].toFixed(4)})`); }
    }
    // 组的包围盒中心（弹入 / 挤压的支点）；量一次缓存
    function bbOf(id) {
      const G = groups[id];
      if (!G.bb) { try { const tf = G.el.getAttribute("transform"); G.el.removeAttribute("transform"); const b = G.el.getBBox(); if (tf) G.el.setAttribute("transform", tf); G.bb = [b.x + b.width / 2, b.y + b.height / 2, b.y + b.height]; } catch (e) { G.bb = [480, 272, 300]; } }
      return G.bb;
    }
    // V5：白板上的英文词 → 位置（读到这个词时，在它下面亮一道荧光底色）
    const TOKS = [];
    const normW = w => String(w).toLowerCase().replace(/[^a-z']/g, "");
    function measure() {
      items.forEach(it => { if (it.kind === "text") { const b = it.el.getBBox(); it.bx = b.x; it.bw = b.width; it.by = b.y; it.bh = b.height; it.clipRect.setAttribute("y", b.y - 6); it.clipRect.setAttribute("height", b.height + 12); } });
      if (!V2) return;
      TOKS.forEach(tk => tk.el.remove()); TOKS.length = 0;
      items.forEach(it => {
        if (it.kind !== "text" || it.noHL) return;
        const re = /[A-Za-z][A-Za-z']*/g; let m;
        while ((m = re.exec(it.text))) {
          if (m[0].length < 2) continue;
          try {
            const a = it.el.getStartPositionOfChar(m.index), b = it.el.getEndPositionOfChar(m.index + m[0].length - 1);
            const h = it.size * 1.05, el = document.createElementNS(NS, "rect");
            el.setAttribute("x", (a.x - 3).toFixed(1)); el.setAttribute("y", (it.y - it.size * .82).toFixed(1));
            el.setAttribute("width", (b.x - a.x + 6).toFixed(1)); el.setAttribute("height", h.toFixed(1)); el.setAttribute("rx", 4);
            el.setAttribute("fill", PAL.hlYellow); el.setAttribute("opacity", 0);
            it.el.parentNode.insertBefore(el, it.el);
            TOKS.push({ w: normW(m[0]), el, it, on: false });
          } catch (e) { /* 字体没好时跳过，remeasure 会再来 */ }
        }
      });
    }
    measure();
    // ---- v2：板擦擦除转场（V8）：一条和纸一样颜色（带格子）的粗线沿 Z 字路线一行行盖过去，板擦跟着走 ----
    const WIPES = [];
    if (V2 && S.wipes.length) {
      const wl0 = mk("g", {}, board);
      S.wipes.forEach(w => {
        let d = "", row = 0;
        for (let y = w.y0 + 22; y < w.y1 + 30; y += 50, row++) d += (row ? ` L` : `M`) + (row % 2 ? "990," : "-30,") + y + ` L${row % 2 ? -30 : 990},${y + 24}`;
        const g = mk("g", { opacity: 0 }, wl0);
        const paper = mk("path", { d, fill: "none", stroke: PAL.paper, "stroke-width": 68, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
        mk("path", { d, fill: "none", stroke: `url(#${uid}g)`, "stroke-width": 68, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
        const smudge = mk("path", { d, fill: "none", stroke: "#94a3b8", "stroke-width": 54, "stroke-linecap": "round", opacity: 0 }, wl0);
        const len = paper.getTotalLength();
        g.querySelectorAll("path").forEach(p => p.setAttribute("stroke-dasharray", `${len} ${len}`));
        WIPES.push({ ...w, g, paper, smudge, len });
      });
    }
    // 人物（讲解员小人 + 场景角色）：讲解员在屏幕层（不跟镜头缩放），场景角色在各自的组里
    let actorR = null;
    const api = {};
    if (typeof WB_ACTOR !== "undefined" && S.actors && S.actors.length) {
      const screenLayer = mk("g", {}, boardClip);
      actorR = WB_ACTOR.mount({ S, mk, NS, layer, screenLayer, says: SAYS, end: END, api, reduced: REDUCED,
        ensureGroup: g => (groups[g] || (groups[g] = { el: mk("g", {}, layer) })).el });
    }
    // 板擦（v2）
    let eraser = null;
    if (WIPES.length) {
      eraser = mk("g", { opacity: 0 }, boardClip);
      mk("path", { d: "M-34,-16 L34,-16 Q40,-16 40,-10 L40,4 L-40,4 L-40,-10 Q-40,-16 -34,-16 Z", fill: "#c08457", stroke: "#1f2937", "stroke-width": 2.2 }, eraser);
      mk("path", { d: "M-40,4 L40,4 L40,15 L-40,15 Z", fill: "#475569", stroke: "#1f2937", "stroke-width": 2.2 }, eraser);
      mk("path", { d: "M-26,-9 L26,-9", stroke: "#8a5a35", "stroke-width": 2, "stroke-linecap": "round" }, eraser);
    }
    // 拿马克笔的手
    const pen = mk("g", {});
    mk("path", { d: "M0,0 L10,-8 L72,-70 L60,-82 L-2,-20 Z", fill: "#1f2937", stroke: "#111", "stroke-width": 1.5 }, pen);
    mk("path", { d: "M60,-82 L72,-70 L84,-82 L72,-94 Z", fill: "#94a3b8", stroke: "#111", "stroke-width": 1.5 }, pen);
    mk("path", { d: "M22,-36 C30,-18 52,-6 78,-14 C104,-22 118,-52 108,-74 C98,-96 70,-98 56,-84 C46,-74 40,-60 22,-36 Z", fill: "#fde4cf", stroke: "#b45309", "stroke-width": 2, "stroke-linejoin": "round" }, pen);
    mk("path", { d: "M30,-30 C42,-26 52,-30 58,-40 M44,-20 C56,-18 66,-24 70,-34", fill: "none", stroke: "#b45309", "stroke-width": 1.8, "stroke-linecap": "round" }, pen);
    let penX = 905, penY = 525, lastNarr = -1;
    // v2 手的位置是时间的纯函数（V1）：在画 → 贴着笔尖；两笔之间 → 走弧线移过去；空闲 → 滑出画面
    const REST = [1000, 640];
    const STROKES = V2 ? items.filter(it => (it.kind === "path" && !it.dash) || it.kind === "text").filter(it => it.dur > .04) : [];
    const strokeEnds = it => it.kind === "path" ? [it.el.getPointAtLength(0), it.el.getPointAtLength(it.len)].map(p => [p.x, p.y]) : [[it.bx, it.by + it.bh * .75], [it.bx + it.bw, it.by + it.bh * .75]];
    const toScreen = (it, p) => { const G = it.g ? groups[it.g] : null; let x = p[0] + (G ? G.dx || 0 : 0), y = p[1] + (G ? G.dy || 0 : 0); if (CAM.length) { x = x * camM[2] + camM[0]; y = y * camM[2] + camM[1]; } return [x, y]; };
    function penAt(t, active) {
      if (active) return active;
      let prev = null, next = null;
      for (const it of STROKES) {
        const e = it.t + it.dur;
        if (e <= t && (!prev || e > prev.t + prev.dur)) prev = it;
        if (it.t > t && (!next || it.t < next.t)) next = it;
      }
      const pe = prev ? toScreen(prev, strokeEnds(prev)[1]) : REST, te = prev ? prev.t + prev.dur : -9;
      const ps = next ? toScreen(next, strokeEnds(next)[0]) : REST, ts = next ? next.t : 1e9;
      const gap = ts - te, lift = (a, b, q) => { const d = Math.hypot(b[0] - a[0], b[1] - a[1]); const e = EASE.move(q); return [a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e - Math.sin(Math.PI * q) * Math.min(40, d * .18)]; };
      if (gap <= 1.4) return lift(pe, ps, clamp((t - te) / Math.max(.05, gap)));
      if (t - te < .5) return lift(pe, REST, (t - te) / .5);
      if (ts - t < .5) return lift(REST, ps, 1 - (ts - t) / .5);
      return REST;
    }
    let drawing = false, curWords = null;
    function render(t) {
      let active = null, activeIt = null;
      for (const it of items) {
        const kk = clamp((t - it.t) / it.dur);
        if (it.kind === "fill") { setA(it.el, "opacity", V2 ? (it.op ?? 1) * EASE.in(kk) : (it.op ?? 1) * ease(kk)); continue; }
        if (it.kind === "path") {
          if (REDUCED) setA(it.el, "opacity", it.dash ? (kk > 0 ? Math.min(1, kk * 3) : 0) : Math.min(1, kk * 2).toFixed(3));
          else if (it.dash) setA(it.el, "opacity", kk > 0 ? Math.min(1, kk * 3) : 0);
          else {
            const q = V2 ? EASE.sine(kk) : kk;
            setA(it.el, "stroke-dashoffset", it.len * (1 - q));
            if (it.el2) {   // 中段加粗线：只露出 [15%, 85%] ∩ 已画部分（dashoffset 把起点挪到 15% 处）
              const a = it.len * .15, b = Math.min(it.len * q, it.len * .85);
              if (b > a + .5) { setA(it.el2, "stroke-dasharray", `${(b - a).toFixed(1)} ${(it.len * 2).toFixed(0)}`); setV(it.el2, "visible"); }
              else setV(it.el2, "hidden");
            }
          }
          setV(it.el, kk > 0 ? "visible" : "hidden");
          if (kk > 0 && kk < 1) { const p = it.el.getPointAtLength(it.len * (V2 ? EASE.sine(kk) : kk)); active = [p.x, p.y]; activeIt = it; }
        } else {
          setA(it.clipRect, "x", it.bx - 4);
          if (REDUCED) { setA(it.clipRect, "width", it.bw + 12); setA(it.el, "opacity", Math.min(1, kk * 2).toFixed(3)); }
          else {
            const q = V2 ? kk * .75 + EASE.sine(kk) * .25 : kk;
            setA(it.clipRect, "width", kk >= 1 ? it.bw + 12 : (it.bw + 8) * q);
            if (kk > 0 && kk < 1) { active = [it.bx + it.bw * q, it.by + it.bh * .75 + Math.sin(t * 40) * 3]; activeIt = it; }
          }
        }
      }
      let ni = 0; for (let i = 0; i < NARR.length; i++) if (t >= NARR[i][0]) ni = i;
      if (ni !== lastNarr) {
        nTerm.textContent = NARR[ni][1]; nRest.textContent = NARR[ni][2]; lastNarr = ni;
        narr.setAttribute("font-size", 18);
        const L = narr.getComputedTextLength();
        if (L > 912) narr.setAttribute("font-size", (18 * 912 / L).toFixed(1));
      }
      setA(narr, "opacity", clamp((t - NARR[ni][0]) / .35));
      curWords = null;
      if (strip) {
        let si = -1; for (let i = 0; i < SAYS.length; i++) if (t >= SAYS[i].t) si = i;
        if (si !== lastSay) {
          lastSay = si; lastHL = -2;
          while (sEn.firstChild) sEn.removeChild(sEn.firstChild);
          sWords = [];
          if (si >= 0) {
            SAYS[si].en.split(/\s+/).forEach((w, j) => { const ts = mk("tspan", {}, sEn); const egg = SAYS[si].egg.includes(w.replace(/[^A-Za-z'-]/g, "").toLowerCase()); ts.textContent = (j ? " " : "") + w + (egg ? "🥚" : ""); sWords.push(ts); });
            sZh.textContent = SAYS[si].zh;
            sEn.setAttribute("font-size", 19); const L = sEn.getComputedTextLength(); if (L > 890) sEn.setAttribute("font-size", (19 * 890 / L).toFixed(1));
          } else sZh.textContent = "";
        }
        if (si >= 0) {
          const sy = SAYS[si], n = sWords.length;
          let hl = -1;
          if (api.hl && api.hl.i === si) hl = api.hl.w;
          else { const q = (t - sy.t - sy.wd) / Math.max(.3, sy.dur - sy.wd - .2); hl = q < 0 || q >= 1 ? -1 : Math.floor(q * n); }
          if (hl !== lastHL) { lastHL = hl; sWords.forEach((ts, j) => { ts.setAttribute("fill", j === hl ? "#e11d48" : "#065f46"); ts.setAttribute("text-decoration", j === hl ? "underline" : "none"); }); }
          setA(strip, "opacity", clamp((t - sy.t) / .3).toFixed(2));
          // 正在读的词（白板同步高亮用）：先单独读 word（按时间或语音事件），再读句子
          if (V2) {
            const live = api.speech && api.speech.live && api.speech.i === si;
            if (live && api.speech.phase === "word") curWords = String(sy.word).split(/\s+/).map(normW);
            else if (!live && sy.word && t - sy.t < sy.wd) { const ws = String(sy.word).split(/\s+/); curWords = [normW(ws[Math.min(ws.length - 1, Math.floor((t - sy.t) / Math.max(.1, sy.wd - .3) * ws.length))])]; }
            else if (hl >= 0 && hl < n) curWords = [normW(sy.en.split(/\s+/)[hl])];
            if (t > sy.t + sy.dur) curWords = null;
          }
        } else setA(strip, "opacity", 0);
      }
      fxRender(t);
      // V5：白板上同一个词亮荧光底色（只亮已经写完、正在显示的词）
      if (V2 && TOKS.length) {
        for (const tk of TOKS) {
          let on = false;
          if (curWords && t >= tk.it.t + tk.it.dur) {
            const G = tk.it.g ? groups[tk.it.g] : null;
            if (!G || G.op > .5) on = curWords.some(w => w && (w === tk.w || w === tk.w + "s" || w === tk.w + "es" || w === tk.w + "ed" || w === tk.w + "ing"));
          }
          if (on !== tk.on) { tk.on = on; tk.el.setAttribute("opacity", on ? .7 : 0); }
        }
      }
      // 擦除转场
      let er = null;
      for (const w of WIPES) {
        const q = (t - w.t) / w.dur;
        if (REDUCED || q <= 0 || q >= 1) { setA(w.g, "opacity", 0); }
        else {
          setA(w.g, "opacity", 1);
          const e = EASE.sine(q) * .94 + q * .06, off = (w.len * (1 - e)).toFixed(1);
          w.g.querySelectorAll("path").forEach(p => setA(p, "stroke-dashoffset", off));
          const p = w.paper.getPointAtLength(w.len * e); er = [p.x, p.y];
        }
        const sm = t - (w.t + w.dur);
        setA(w.smudge, "opacity", REDUCED || sm < 0 || sm > .7 ? 0 : (.08 * (1 - sm / .7)).toFixed(3));
      }
      if (eraser) {
        setA(eraser, "opacity", er ? 1 : 0);
        if (er) setA(eraser, "transform", `translate(${er[0].toFixed(1)},${er[1].toFixed(1)}) rotate(${(Math.sin(t * 9) * 6).toFixed(1)})`);
      }
      if (V2) {
        if (activeIt) active = toScreen(activeIt, active);
      } else if (active && CAM.length) active = [active[0] * camM[2] + camM[0], active[1] * camM[2] + camM[1]];
      drawing = !!active;
      if (actorR) actorR.render(t, { pen: active });
      if (V2) {
        const pp = REDUCED ? REST : penAt(t, active);
        setA(pen, "transform", `translate(${pp[0].toFixed(1)},${pp[1].toFixed(1)}) scale(.8)`);
        setA(pen, "opacity", REDUCED ? 0 : 1);
      } else {
        const target = active || [905, 525], f = active ? .55 : .12;
        penX += (target[0] - penX) * f; penY += (target[1] - penY) * f;
        pen.setAttribute("transform", `translate(${penX.toFixed(1)},${penY.toFixed(1)}) scale(.8)`);
        pen.setAttribute("opacity", t > END - .6 ? clamp((END - t) / .6) : 1);
      }
    }
    // 音效事件（V7）：(t0, t1] 里该响的音效；drawing = 正在画线写字（马克笔沙沙声）
    const SFX = V2 ? S.sfx.slice().sort((a, b) => a.t - b.t) : [];
    Object.assign(api, { render, end: END, says: SAYS, badges: S.badges, eggs: S.eggs, strip, hl: null, speech: null, actors: actorR, v2: V2, reduced: REDUCED,
      sfxBetween(t0, t1) { return SFX.filter(e => e.t > t0 && e.t <= t1).map(e => e.name); },
      get drawing() { return drawing; },
      remeasure() { measure(); lastNarr = -1; lastSay = -2; }, resetPen() { penX = 905; penY = 525; } });
    return api;
  }

  return { mount, kit, C, ZH, MONO, estW, BADGES, EASE, PAL, FS, GRID };
})();
// 各页签的白板案例都登记在这里：WB_LAB[labTab] = [ { build(k){...}, terms:[[术语, 解释], ...] }, ... ]
const WB_LAB = {};
