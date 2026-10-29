// ==================== 单词身世 · 溯源幕 ②：Europe 欧罗巴（v2，对齐 port 样板幕）====================
// 分镜：docs/whiteboard/word_origins/EUROPE_STORYBOARD.md；出处：word_origins/SOURCES.md「溯源幕 ②」
// 一句话洞见：一块大陆的名字，背后有一个神话；名字到底怎么来的有好几种说法（❓）——神话今天还在给新东西取名。
// 严谨：Europe 的来源「不确定」（etymonline），三种说法全部标 ❓；神话本身有古书记载（📜），但讲给小学生时简化了（✂️）。
WB_LAB.wo_europe = [
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const grp = () => { const g = D.sub(); D.back(); return g; };
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const win = sy => [sy.t + sy.wd + .15, sy.dur - sy.wd - .3];
      const mw = (txt, fs) => txt.length * fs * .6;                                   // 等宽字宽
      // 后缀吸附：词根块固定在 (rx, y)，后缀块从右边飞过来贴在右边（D.snap 的镜像）
      const snapR = (root, suf, rx, y, o = {}) => {
        const fs = o.size ?? 18, rw = D.chipW(root, fs);
        k.chip(root, rx, y, null, { size: fs, color: C.blue, fill: C.tintBlue });
        const g = D.sub(); k.chip(suf, rx + rw, y, null, { size: fs, color: C.red, fill: C.tintRed }); D.back();
        k.move(g, -1, .001, 60, -50);
        const t = go(.9); k.move(g, t, .6, -60, 50, { ease: "antic" }); k.squash(g, t + .6, .32, .16); k.sfx("pop", t + .6);
        return { end: rx + rw + D.chipW(suf, fs), t };
      };
      // ── 讲解员小人：右下角，从画面外走进来 ──
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：Europe（欧洲）这个名字，是从哪儿来的？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "Europe 欧罗巴", sub: "单词身世 · 欧洲文化密码", badges: ["📜", "✂️", "❓"] });
      N("可信度徽章：", "📜 = 查得到出处；✂️ = 为小朋友讲简单了；❓ = 有好几种说法，没有定论。");
      k.wait(.6);

      // ───── 镜头 1 · 地图：欧洲在哪 ─────
      D.step(0); D.shot();
      N("地图：", "地中海北边是欧洲，南边是非洲，东边是亚洲。");
      const mp = D.map({ x: 40, y: 100, w: 550, h: 275 });
      T("欧洲", ...mp.pt(-1, 45.6), go(.4), .4, { size: 18, color: C.ink, weight: 900 });
      T("非洲", ...mp.pt(-2, 31), go(.4), .4, { size: 18, color: C.ink, weight: 900 });
      T("亚洲", ...mp.pt(36, 38.6), go(.4), .4, { size: 18, color: C.ink, weight: 900 });
      const [ex, ey] = mp.pt(-1, 45.6);
      k.act(me, "point", S.at, 2.4, { at: [ex + 70, ey] });
      k.hlText("Europe", ex + 46, ey, 18, { mono: true });
      T("Europe", ex + 46, ey, go(.8), .8, { size: 18, color: C.blue, weight: 900, font: M });
      k.egg(ex + 46 + mw("Europe", 18) + 12, ey - 6, { word: "Europe" });
      mp.dot(12.5, 41.9, "罗马", { dx: 8, dy: -6 });
      const syEu = sayAt("Rome is in Europe.", { zh: "罗马在欧洲。", word: "Europe", egg: ["Europe"] });
      k.look(me, ex + 60, ey, syEu.t, syEu.dur);
      N("公主的家：", "神话里，公主欧罗巴住在地中海东岸的提尔城（今天的黎巴嫩）。");
      const tyre = mp.dot(35.2, 33.3, "提尔", { dx: -10, dy: -10, anchor: "end" });
      N("克里特岛：", "她后来到了海中间的克里特岛——等会儿看她是怎么过去的。");
      const crete = mp.dot(24.9, 35.2, "克里特岛", { dx: 0, dy: 24, anchor: "middle" });
      const route = `M${tyre[0] - 6},${tyre[1] - 4} Q${(tyre[0] + crete[0]) / 2},${crete[1] - 34} ${crete[0] + 10},${crete[1] - 4}`;
      P(route, go(1.2), 1.2, { color: C.red, w: 2.4, dash: "7 6" });
      P(`M${crete[0] + 20},${crete[1] - 12} L${crete[0] + 9},${crete[1] - 4} L${crete[0] + 21},${crete[1] + 1}`, go(.2), .2, { color: C.red, w: 2.4 });
      k.act(me, "point", S.at - 1.2, 1.6, { at: crete });
      N("问题：", "这块大陆为什么叫 Europe？先听一个古希腊神话。");
      T("🤔 为什么叫 Europe？", 615, 150, go(1), 1, { size: 22, color: C.ink, weight: 900 });
      T("先听一个古希腊神话 ↓", 615, 192, go(.8), .8, { size: 18, color: C.grey, weight: 700 });
      k.act(me, "think", S.at - .4, 2.2);
      k.wait(1);
      D.wipe();

      // ───── 镜头 2 · 场景：公主、白牛、游过大海 ─────
      D.step(1); D.shot();
      N("神话：", "这是古希腊神话（古书里有记载，但不是真事）：公主欧罗巴在海边采花。");
      T("古希腊神话 · 公主 Europa", 40, 134, go(1), 1, { size: 20, color: C.ink, weight: 900 });
      const bw = 40 + k.estW("古希腊神话 · 公主 Europa", 20) + 14;
      const bb = k.badge("📜", bw, 134, { label: "神话有古书记载" }); k.badge("✂️", bb.end + 8, 134, { label: "讲简单了" });
      T("（神话故事，不是真事）", 40, 166, go(.5), .5, { size: 14, color: C.grey, weight: 700 });
      // 海、东岸（右）、克里特岛（左）
      const WL = 400;
      P(k.wl(24, WL, 640, WL, 1), go(.5), .5, { color: C.blue, w: 2.5, alpha: .6 });
      P(k.wave(40, 620, WL + 22, 3) + " " + k.wave(60, 600, WL + 50, 3) + " " + k.wave(40, 620, WL + 78, 3), go(.6), .6, { color: C.blue, w: 2, alpha: .45 });
      const shore = `M620,${WL} Q640,${WL - 4} 660,380 L936,380 L936,470 L620,470 Z`;
      P(`M620,${WL} Q640,${WL - 4} 660,380 L936,380`, go(.6), .6, { color: C.ink, w: 2.5 }); F(shore, go(.2, 0), { color: "#fef9c3", op: 1 });
      T("东岸 · 提尔", 690, 412, go(.4), .4, { size: 15, color: C.ink, weight: 900 });
      const isle = `M40,${WL} Q70,352 120,348 Q170,352 200,${WL} Z`;
      P(isle, go(.6), .6, { color: C.ink, w: 2.4 }); F(isle, go(.1, 0), { color: "#fef9c3", op: 1 });
      T("克里特岛", 120, WL + 30, go(.4), .4, { size: 15, color: C.ink, weight: 900, anchor: "middle" });
      // 岸上的花
      [[690, 0], [712, 6], [830, 2]].forEach(([fx, d]) => {
        P(`M${fx},380 Q${fx - 2},${370 - d} ${fx},${362 - d}`, go(.12), .12, { color: C.green, w: 1.8 });
        const c = k.ellipse(fx, 359 - d, 4, 4); P(c, go(.1), .1, { color: C.red, w: 2 }); F(c, go(.05, 0), { color: C.tintRed, op: 1 });
      });
      const gPr = grp();
      const fl = k.prop("flower", 742, 380, { g: gPr, s: 1 });
      const pr = k.actor("princess", { x: 770, y: 380, s: .78, f: -1, g: gPr });
      const syPr = sayAt("Europa is a princess.", { zh: "欧罗巴是一位公主。", word: "Europa" });
      k.act(pr, "wave", syPr.t, syPr.dur);
      const gLab = grp(); k.S.g = gLab; T("公主 Europa", 770, 256, syPr.t, .6, { size: 15, color: C.blue, weight: 900, anchor: "middle" }); D.back();
      const syPick = sayAt("She picks flowers by the sea.", { zh: "她在海边采花。", word: "" });
      let [w0, wd] = win(syPick);
      k.act(pr, "take", w0 - .2, 1.2, { prop: fl, words: ["picks"] });
      k.expr(pr, "happy", w0, wd + 1);
      // 白牛从右边走过来（神话里是宙斯变的）
      N("白牛：", "这时，一头雪白、温顺的公牛走了过来（神话里，它是宙斯变的）。");
      const bl = D.bull(860, 380, 1.25);
      const gRide = grp();
      const pr2 = k.actor("princess", { x: bl.back[0] + 6, y: bl.back[1] + 4 + 58 * .7, s: .7, f: -1, g: gRide, hidden: true });
      const bullGs = [bl.g, bl.legs, gRide];
      const tIn = go(2.4);
      bullGs.forEach(g => { k.move(g, -1, .001, 180, 0); k.path(g, tIn, 2.4, [[-90, -3], [-180, 0]], { ease: "move" }); });
      for (let i = 0; i < 4; i++) k.squash(bl.g, tIn + .2 + i * .55, .5, .05);
      k.act(me, "surprised", tIn + .6, 1.2);
      k.look(pr, 860, 330, tIn, 3);
      // 公主坐上牛背（rides）：走过去 → 跳 → 在空中换成「坐着的公主」
      const syRide = sayAt("She rides on the white bull.", { zh: "她骑上了白牛。", word: "", egg: ["bull"] });
      [w0, wd] = win(syRide);
      k.act(pr, "walk", syRide.t - .1, .9, { to: 800 });
      const tJ = syRide.t + .85;
      k.act(pr, "jump", tJ, .8);
      k.actorFade(pr, tJ + .34, .12, 0); k.actorFade(pr2, tJ + .34, .12, 1); k.fade(gLab, tJ + .2, .3, 0);
      const tSwimEnd = tJ + .5 + 11;
      k.act(pr2, "sit", tJ + .3, tSwimEnd - tJ, { words: ["rides"], expr: "happy" });
      N("游过大海：", "白牛驮着公主跳进大海，一直往西游，游到了克里特岛。");
      const sySw = sayAt("The bull swims across the sea.", { zh: "公牛游过了大海。", word: "", egg: ["bull"] });
      [w0, wd] = win(sySw);
      const tS = sySw.t - .2, dS = sySw.dur + 2.6;
      bullGs.forEach(g => k.path(g, tS, dS, [[-150, 4], [-230, 24], [-420, 22], [-584, 24]], { ease: "move" }));
      k.fade(bl.legs, tS + dS * .32, .5, 0);                                         // 腿藏进水里
      for (let i = 0; i < 7; i++) k.squash(bl.g, tS + .6 + i * (dS - .8) / 7, (dS - .8) / 7, .06);
      k.actFx(["swims"], tS, dS, "白牛驮着公主游过大海");
      k.look(me, 420, 360, tS, dS);
      k.expr(pr2, "surprised", tS + dS * .4, 1.2);
      S.at = Math.max(S.at, tS + dS + .2);                                            // 游到岸边再讲下一句
      N("到了：", "在克里特岛，公主成了那里的第一位王后（神话）。");
      T("🏝️ 公主成了克里特岛的王后", 260, 220, go(1.2), 1.2, { size: 18, color: C.green, weight: 900 });
      k.act(me, "nod", S.at - .4, .8);
      k.wait(1);
      D.wipe();

      // ───── 镜头 3 · 名字从哪来：三种说法都打 ❓ ─────
      D.step(2); D.shot();
      N("名字：", "公主叫 Europa，大陆叫 Europe：只差最后一个字母。");
      const ex0 = 60, ey0 = 148;
      // 整个词一起「变身」：等宽字体，前 5 个字母位置不变，看起来只有最后一个字母 a → e
      const gA = D.sub(); T("Europa", ex0, ey0, go(1), 1, { size: 34, color: C.blue, weight: 900, font: M }); D.back();
      const gE = D.sub(); T("Europe", ex0, ey0, go(.01, 0), .01, { size: 34, color: C.green, weight: 900, font: M }); D.back(); k.hide(gE);
      const tm3 = D.morph(gA, gE, .8);
      T("拉丁语 Europa → 英语 Europe", ex0 + mw("Europe", 34) + 30, ey0 - 4, go(1), 1, { size: 18, color: C.ink, weight: 700 });
      k.badge("📜", ex0 + mw("Europe", 34) + 30 + k.estW("拉丁语 Europa → 英语 Europe", 18) + 12, ey0 - 4);
      k.act(me, "point", tm3, 1.4, { at: [ex0 + 120, ey0 - 12] });
      N("可是：", "这个名字到底是什么意思？学者有好几种说法，谁也没法证明——所以每种都打上 ❓。");
      const cards = [[24, "① 公主的名字"], [330, "② 宽宽的脸"], [636, "③ 太阳落下的地方"]];
      cards.forEach(([cx, title]) => {
        P(k.roughRect(cx, 196, 296, 178), go(.5), .5, { color: C.ink, w: 2 });
        T(title, cx + 14, 228, go(.6), .6, { size: 19, color: C.ink, weight: 900 });
        k.badge("❓", cx + 296 - 72, 226, { label: "有争议" });
      });
      k.act(me, "think", S.at - 1, 3.4);
      T("传统说法：大陆的名字", 24 + 14, 268, go(.8), .8, { size: 16, color: C.ink, weight: 700 });
      T("来自神话公主 Europa", 24 + 14, 294, go(.8), .8, { size: 16, color: C.ink, weight: 700 });
      T("（维基：「可能」来自她）", 24 + 14, 324, go(.6), .6, { size: 14, color: C.grey, weight: 700 });
      const sn = D.snap("eurys", "ops", 330 + 14 + D.chipW("eurys", 16), 250, { size: 16, color: C.red, rootColor: C.blue, from: [-10, 50] });
      T("eurys = 宽，ops = 脸、眼睛", 330 + 14, 312, go(.8), .8, { size: 16, color: C.ink, weight: 700 });
      T("合起来 →「宽脸」", 330 + 14, 340, go(.6), .6, { size: 16, color: C.ink, weight: 700 });
      k.say("Eurys means wide, and ops means face.", { zh: "（希腊语）eurys 是「宽」，ops 是「脸」。", word: "eurys ops", blocks: ["eurys", "ops"] });
      T("古代闪米特语：「傍晚、", 636 + 14, 268, go(.8), .8, { size: 16, color: C.ink, weight: 700 });
      T("太阳落山」→ 西方", 636 + 14, 294, go(.8), .8, { size: 16, color: C.ink, weight: 700 });
      T("（多数学者认为不太可能）", 636 + 14, 324, go(.6), .6, { size: 14, color: C.grey, weight: 700 });
      N("结论：", "三种说法都有人讲，都没有定论。好故事 ≠ 真历史，查证很重要！");
      k.hlText("❓ 三种说法，没有定论：好故事 ≠ 真历史", 24, 430, 20);
      T("❓ 三种说法，没有定论：好故事 ≠ 真历史", 24, 430, go(1.4), 1.4, { size: 20, color: C.ink, weight: 900 });
      k.act(me, "nod", S.at - .3, .8);
      k.wait(1);
      D.wipe();

      // ───── 镜头 3b · 词族：-an（……的、……人）和 euro ─────
      D.step(2); D.shot();
      N("一家人：", "Europe 还长出了自己的小家族：加上词尾 -an，就是「欧洲的、欧洲人」。");
      const s1 = snapR("Europe", "-an", 60, 120, { size: 20 });
      k.hlText("= European 欧洲的、欧洲人", s1.end + 14, 146, 20);
      T("= European 欧洲的、欧洲人", s1.end + 14, 146, go(1), 1, { size: 20, color: C.green, weight: 900 });
      k.egg(s1.end + 14 + k.estW("= European 欧洲的、欧洲人", 20) + 14, 140, { word: "European" });
      T("-an =「属于……的」", 60, 196, go(.8), .8, { size: 17, color: C.ink, weight: 700 });
      const bx1 = 60 + k.estW("-an =「属于……的」", 17) + 12;
      const bb1 = k.badge("📜", bx1, 196); k.badge("✂️", bb1.end + 8, 196, { label: "简化：其实经法语、拉丁语变来" });
      const syAn = sayAt("European means from Europe.", { zh: "European = 来自欧洲的。", word: "an", blocks: ["an"] });
      k.act(me, "point", syAn.t, 1.6, { at: [s1.end - 20, 132] });
      sayAt("She is a European girl.", { zh: "她是一个欧洲女孩。", word: "European", egg: ["European"] });
      N("欧元：", "Euro- 就是「欧洲」：欧洲很多国家一起用的钱，叫 euro（欧元），1996 年定的名字。");
      const coin = k.ellipse(110, 300, 40, 40);
      P(coin, go(.6), .6, { color: C.ink, w: 2.5 }); F(coin, go(.1, 0), { color: "#fef9c3", op: 1 });
      P(k.ellipse(110, 300, 31, 31), go(.4), .4, { color: C.ink, w: 1.4 });
      T("€", 110, 313, go(.4), .4, { size: 34, color: C.blue, weight: 900, anchor: "middle", noHL: true });
      T("Euro-（欧洲）→ euro 欧元", 176, 296, go(1), 1, { size: 20, color: C.ink, weight: 900 });
      k.badge("📜", 176 + k.estW("Euro-（欧洲）→ euro 欧元", 20) + 12, 296);
      T("1996 年起用这个名字", 176, 330, go(.6), .6, { size: 15, color: C.grey, weight: 700 });
      const card = k.prop("card", 0, 0, { g: 0, text: "euro", hidden: true });
      const syHave = sayAt("I have one euro.", { zh: "我有一欧元。", word: "euro", egg: ["euro"] });
      k.act(me, "holdCard", syHave.t - .3, syHave.dur + .5, { prop: card, words: ["have"] });
      N("", "一个名字，长出「欧洲的、欧洲人、欧元」一家子。");
      k.hlText("Europe → European · euro", 60, 420, 22, { mono: true, color: C.hlGreen });
      T("Europe → European · euro", 60, 420, go(1.2), 1.2, { size: 22, color: C.green, weight: 900, font: M });
      k.wait(1);
      D.wipe();

      // ───── 镜头 4 · 彩蛋：神话今天还在取名（木星的卫星、欧元纸币）─────
      D.step(3); D.shot();
      N("彩蛋：", "神话今天还在给新东西取名：木星有一颗卫星，就叫 Europa（欧罗巴）。");
      const jx = 230, jy = 300;
      const jup = k.ellipse(jx, jy, 86, 86);
      P(jup, go(.8), .8, { color: C.ink, w: 2.5 }); F(jup, go(.1, 0), { color: "#fef3c7", op: 1 });
      P(`M${jx - 80},${jy - 30} Q${jx},${jy - 40} ${jx + 80},${jy - 30} M${jx - 86},${jy + 4} Q${jx},${jy - 6} ${jx + 86},${jy + 4} M${jx - 74},${jy + 40} Q${jx},${jy + 32} ${jx + 74},${jy + 40}`, go(.6), .6, { color: C.red, w: 2, alpha: .6 });
      T("木星", jx, jy + 112, go(.4), .4, { size: 16, color: C.ink, weight: 900, anchor: "middle" });
      P(`M${jx - 150},${jy} A150,46 0 1,0 ${jx + 150},${jy} A150,46 0 1,0 ${jx - 150},${jy}`, go(.8), .8, { color: C.grey, w: 1.4, dash: "5 6" });
      const gMoon = grp();
      k.S.g = gMoon;
      const mo = k.ellipse(jx + 150, jy, 13, 13); P(mo, go(.3), .3, { color: C.blue, w: 2.4 }); F(mo, go(.05, 0), { color: C.tintBlue, op: 1 });
      D.back();
      T("卫星 Europa", jx + 150, jy - 26, go(.6), .6, { size: 16, color: C.blue, weight: 900, anchor: "middle" });
      k.badge("📜", jx + 100, jy + 86);
      const syMoon = sayAt("Europa is also a moon.", { zh: "欧罗巴也是一颗卫星的名字。", word: "" });
      k.act(me, "point", syMoon.t - .2, syMoon.dur, { at: [jx + 150, jy] });
      k.path(gMoon, syMoon.t - .4, syMoon.dur + 1.6, [[-150, 46], [-300, 0], [-150, -46], [0, 0]], { ease: "sine" });
      N("欧元纸币：", "新版欧元纸币叫「Europa 系列」，水印里藏着公主欧罗巴的头像。");
      const nx = 520, ny = 210;
      P(k.roughRect(nx, ny, 300, 150), go(.8), .8, { color: C.ink, w: 2.4 }); F(k.rectD(nx, ny, 300, 150), go(.1, 0), { color: "#ecfdf5", op: 1 });
      T("€", nx + 24, ny + 46, go(.3), .3, { size: 30, color: C.green, weight: 900, noHL: true });
      T("5", nx + 260, ny + 46, go(.3), .3, { size: 30, color: C.green, weight: 900, anchor: "middle", noHL: true });
      const face = `M${nx + 150},${ny + 40} Q${nx + 176},${ny + 42} ${nx + 176},${ny + 76} Q${nx + 174},${ny + 108} ${nx + 150},${ny + 112} Q${nx + 126},${ny + 108} ${nx + 124},${ny + 76} Q${nx + 124},${ny + 42} ${nx + 150},${ny + 40} Z`;
      P(face, go(.6), .6, { color: C.grey, w: 1.8, alpha: .7 });
      P(`M${nx + 124},${ny + 70} Q${nx + 112},${ny + 112} ${nx + 118},${ny + 132} M${nx + 176},${ny + 70} Q${nx + 188},${ny + 112} ${nx + 182},${ny + 132}`, go(.4), .4, { color: C.grey, w: 1.8, alpha: .7 });
      T("水印：公主 Europa 的头像", nx + 150, ny + 182, go(.8), .8, { size: 15, color: C.ink, weight: 900, anchor: "middle" });
      k.badge("📜", nx + 230, ny + 214);
      T("（2013 年起的 Europa 系列）", nx + 10, ny + 214, go(.6), .6, { size: 14, color: C.grey, weight: 700 });
      k.act(me, "point", S.at - .6, 1.6, { at: [nx + 150, ny + 76] });
      N("", "一个三千年前的神话，今天还在给卫星、纸币取名。");
      k.hlText("神话 → 今天的名字：卫星、纸币……", 24, 470, 20, { color: C.hlGreen });
      T("神话 → 今天的名字：卫星、纸币……", 24, 470, go(1.2), 1.2, { size: 20, color: C.green, weight: 900 });
      k.wait(1);
      D.wipe();

      // ───── 镜头 5 · 中文对照：欧罗巴洲 → 欧洲（音译）＋ 🔮 预测 ─────
      D.step(4);
      N("中文：", "中文「欧洲」从哪来？1602 年，意大利人利玛窦在北京刻印世界地图《坤舆万国全图》。");
      P(k.roughRect(24, 104, 300, 120), go(.7), .7, { color: C.ink, w: 2.2 }); F(k.rectD(24, 104, 300, 120), go(.1, 0), { color: "#fefce8", op: 1 });
      T("《坤舆万国全图》", 174, 146, go(.8), .8, { size: 20, color: C.ink, weight: 900, anchor: "middle" });
      T("1602 · 利玛窦", 174, 180, go(.6), .6, { size: 16, color: C.grey, weight: 700, anchor: "middle" });
      k.badge("📜", 174 - 26, 210);
      N("照着声音翻：", "Eu、ro、pa → 欧、逻、巴：照着声音翻译，叫「音译」。今天写作「欧罗巴」。");
      const syl = [["Eu", "欧"], ["ro", "逻"], ["pa", "巴"]];
      syl.forEach(([en, zh], i) => {
        const x = 380 + i * 100;
        k.chip(en, x, 110, null, { size: 20, color: C.blue, fill: C.tintBlue });
        P(k.wl(x + 28, 152, x + 28, 178, .3) + ` M${x + 22},${172} L${x + 28},${180} L${x + 34},${172}`, go(.3), .3, { color: C.grey, w: 2 });
        T(zh, x + 28, 210, go(.4), .4, { size: 26, color: C.red, weight: 900, anchor: "middle" });
      });
      T("（图上写「欧逻巴」，今天写「欧罗巴」）", 380, 242, go(.6), .6, { size: 14, color: C.grey, weight: 700 });
      k.say("Europa is a name from a story.", { zh: "欧罗巴是故事里的名字。", word: "Eu ro pa", blocks: ["eu", "ro", "pa"] });
      N("简称：", "欧罗巴洲，后来简称「欧洲」。");
      T("欧罗巴洲", 380, 300, go(.6), .6, { size: 24, color: C.ink, weight: 900 });
      P(k.wl(380 + 24 - 2, 291, 380 + 72 + 2, 291, .4), go(.35), .35, { color: C.red, w: 3 });
      T("→ 欧洲", 380 + 104, 300, go(.6), .6, { size: 24, color: C.green, weight: 900 });
      k.act(me, "point", S.at - .6, 1.4, { at: [470, 290] });
      k.badge("💡", 24, 300, { label: "对照" });
      T("上一幕的「进口、出口」是照着意思对照；「欧洲」是照着声音翻", 24, 346, go(1.4), 1.4, { size: 16, color: C.ink, weight: 700 });
      T("（中文对照，不是词源）", 24, 374, go(.5), .5, { size: 14, color: C.grey });
      k.wait(.6);

      // ───── 🔮 预测：Africa + -an = ? ─────
      D.step(5);
      N("预测：", "考考你：Europe + -an = European。那 Africa（非洲）+ -an = ？先想 3 秒！");
      const syAf = sayAt("Africa is very big.", { zh: "非洲非常大。", word: "Africa", egg: ["Africa"] });
      P(k.roughRect(16, 410, 824, 120), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 410, 824, 120), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 Europe + -an = European", 36, 444, go(1), 1, { size: 19, color: C.ink, weight: 900 });
      T("Africa（非洲）+ -an =", 36, 482, go(1), 1, { size: 19, color: C.ink, weight: 900 });
      const qx = 36 + Math.round(k.estW("Africa（非洲）+ -an =", 19) * .9) + 10;
      const qm = D.sub(); T("？", qx, 486, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "African = 非洲的、非洲人。规律用上了！");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      k.hlText("African", qx, 484, 22, { mono: true, color: C.hlGreen });
      T("African", qx, 484, go(.9), .9, { size: 22, color: C.green, weight: 900, font: M });
      k.egg(qx + mw("African", 22) + 14, 478, { word: "African" });
      const ax2 = qx + mw("African", 22) + 34;
      T("= 非洲的、非洲人", ax2, 484, go(.8), .8, { size: 18, color: C.green, weight: 900 });
      k.badge("📜", ax2 + k.estW("= 非洲的、非洲人", 18) + 10, 484);
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("She is an African girl.", { zh: "她是一个非洲女孩。", word: "African", egg: ["African"] });
      N("口诀：", "公主骑白牛，名字打问号；加上 -an，就是「哪儿的人」！");
      D.hold(2.5);

      // ───── 收尾金句卡 ─────
      k.quoteCard({ insight: "一块大陆的名字，背后有一个神话；\n名字到底怎么来的有好几种说法（❓），\n神话今天还在给卫星、纸币取名。", rhyme: "公主骑白牛，名字打问号；\n加上 -an，就是「哪儿的人」！", hlLines: 2, foot: "📖 单词身世 · Europe 欧罗巴" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    // 分镜动作词清单（R4）
    actionWords: [
      { word: "picks", act: "公主弯腰伸手，把花拿到手里" },
      { word: "rides", act: "公主跳上牛背，坐着（sit）跟白牛一起走" },
      { word: "swims", act: "白牛驮着公主游过大海（场景：牛身起伏前进，腿藏进水里）" },
      { word: "have", act: "讲解员举起 euro 词卡（我有一欧元）" },
    ],
    terms: [
      ["神话", "古时候的人讲的神仙故事，不是真事，但会留在名字和语言里。"],
      ["词源", "一个词是从哪里来的、原来是什么意思（单词的「身世」）。"],
      ["❓ 有争议", "专家有好几种说法，谁也证明不了，所以不能当成定论。Europe 名字的来历就是这样。"],
      ["词尾（后缀）", "加在词后面、改变意思的小块：-an =「属于……的、……地方的人」。"],
      ["音译", "照着声音翻译：Europa → 欧罗巴。对比：照着意思翻译叫「意译」。"],
      ["卫星", "绕着行星转的星球。木星有一颗卫星叫 Europa（欧罗巴）。"],
      ["可信度徽章", "📜 真实词源（查得到出处）· 💡 记忆联想 · ✂️ 简化说法 · ⚠️ 有例外或流行错误说法 · ❓ 有争议。"],
      ["🥚 彩蛋词", "超出小学课标的词，知道就好，不用背。"],
    ],
  },
];
