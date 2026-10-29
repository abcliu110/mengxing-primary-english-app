// ==================== 单词身世 · 溯源幕 ①：port 港口（v2 样板幕）====================
// 分镜（带时间码、焦点、小人姿态、口播句、动作词）：docs/whiteboard/word_origins/PORT_STORYBOARD_V2.md；出处：word_origins/SOURCES.md
// 一句话洞见：港口是罗马世界的大门；一个 port，长出了进、出、穿越、带回、机会。
// v2 = 视觉标准 V1–V8 + 商业动画标准 M1–M12 + 讲解员小人 / 场景角色演动作（R4）。升级前的版本保留在 wo_port_classic.js（R1 零丢失）。
WB_LAB.wo_port = [
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const grp = () => { const g = D.sub(); D.back(); return g; };                 // 动的组（跟镜头一起被擦掉）
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };  // 返回这句朗读的时间段
      const win = sy => [sy.t + sy.wd + .15, sy.dur - sy.wd - .3];                  // 句子部分（先读单词，再读句子）
      // ── 讲解员小人（v3a 定稿）：屏幕右下角，不跟镜头缩放；从画面外走进来 ──
      const me = k.actor("narrator", { x: 1010, y: 538, s: .74, f: -1 });
      N("", "这一幕：一个小小的 port（港口），怎么长出一整家单词？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "port 港口", sub: "单词身世 · 欧洲文化密码", badges: ["📜", "💡"] });
      N("可信度徽章：", "📜 = 查得到出处的真实词源；💡 = 帮你记的联想画面，不是历史。");
      k.wait(.6);

      // ───── 镜头 1 · 地图：陆地中间的海 ─────
      D.step(0); D.shot();
      N("地图：", "这是欧洲、非洲、亚洲三块大陆，中间围着一片海。");
      k.act(me, "point", S.at + .4, 2.6, { at: [330, 250] });
      const mp = D.map({ x: 40, y: 100, w: 550, h: 275 });
      T("欧洲", ...mp.pt(-1, 45.6), go(.4), .4, { size: 18, color: C.ink, weight: 900 });
      T("非洲", ...mp.pt(-2, 31), go(.4), .4, { size: 18, color: C.ink, weight: 900 });
      T("亚洲", ...mp.pt(36, 38.6), go(.4), .4, { size: 18, color: C.ink, weight: 900 });
      T("地中海", ...mp.pt(15.5, 34.6), go(.6), .6, { size: 20, color: C.blue, weight: 900, anchor: "middle" });
      N("", "三块大陆一起往中间靠：这片海被陆地包在中间。");
      const tm = go(1.4);
      k.move(mp.eu, tm, .8, 0, 10); k.move(mp.af, tm, .8, 0, -10); k.move(mp.as, tm, .8, -10, 0);
      k.move(mp.eu, tm + 1.4, .6, 0, -10, { ease: "snap" }); k.move(mp.af, tm + 1.4, .6, 0, 10, { ease: "snap" }); k.move(mp.as, tm + 1.4, .6, 10, 0, { ease: "snap" });
      N("罗马：", "罗马城就在地中海边，罗马人靠船把四周连在一起。");
      const rome = mp.dot(12.5, 41.9, "罗马 Rome", { dx: 8, dy: -8 });
      const syRome = sayAt("Rome is an old city in Italy.", { zh: "罗马是意大利的一座古城。", word: "Rome" });
      k.act(me, "point", syRome.t - .3, syRome.dur + .3, { at: rome });
      k.hlText("Mediterranean", 615, 132, 20, { mono: true });
      T("Mediterranean", 615, 132, go(1), 1, { size: 20, color: C.ink, weight: 900, font: M });
      k.egg(615 + 13 * 20 * .6 + 14, 125, { word: "Mediterranean" });
      N("拆开看：", "Mediterranean = medi（中间）+ terra（陆地）。");
      const sn = D.snap("medi", "terra", 615 + D.chipW("medi"), 160, { color: C.red, rootColor: C.blue, from: [0, 60] });
      T("中间", sn.x0 + D.chipW("medi") / 2, 220, go(.4), .4, { size: 15, color: C.red, weight: 900, anchor: "middle" });
      T("陆地", sn.x0 + D.chipW("medi") + D.chipW("terra") / 2, 220, go(.4), .4, { size: 15, color: C.blue, weight: 900, anchor: "middle" });
      k.hlText("= 陆地中间的海", 615, 262, 22, { color: C.hlGreen });
      const tSea = go(.9);
      T("= 陆地中间的海", 615, 262, tSea, .9, { size: 22, color: C.green, weight: 900 });
      k.act(me, "surprised", tSea + .6, 1.3);                                         // 恍然大悟（M8）
      k.badge("📜", 615, 298);
      k.egg(622, 332, { note: true });
      k.say("Medi means middle, and terra means land.", { zh: "medi 是「中间」，terra 是「陆地」。", word: "medi terra", blocks: ["medi", "terra"] });
      k.say("The Mediterranean Sea is in the middle of the land.", { zh: "地中海在陆地的中间。", word: "Mediterranean", egg: ["Mediterranean"], blocks: ["medi", "terra"] });
      N("", "四周都是陆地，船从哪儿都能到 → 港口就特别重要。");
      T("四周都是陆地 → 船来船往 → 港口最重要", 40, 420, go(1.4), 1.4, { size: 20, color: C.green, weight: 900 });
      k.act(me, "nod", S.at - .4, .8);
      k.wait(1.2);
      D.wipe();

      // ───── 镜头 2 · 进港：顺风 = 机会 ─────
      D.step(1); D.shot();
      N("场景：", "一艘罗马商船在海上，岸边是港口小城。");
      const shore = "M640,250 Q628,320 650,430 L936,430 L936,250 Z";
      P(shore, go(.8), .8, { color: C.ink, w: 2.5 }); F(shore, go(.2, 0), { color: "#fefce8", op: 1 });
      D.city(700, 300, 200, "港口小城");
      D.pier(560, 340, 100);
      P(k.wave(40, 620, 348, 3) + " " + k.wave(60, 600, 380, 3) + " " + k.wave(40, 620, 412, 3), go(.8), .8, { color: C.blue, w: 2, alpha: .45 });
      k.chip("port", 572, 186, null, { size: 22, color: C.blue, fill: C.tintBlue });
      T("港口", 572 + D.chipW("port", 22) / 2, 240, go(.4), .4, { size: 15, color: C.blue, weight: 900, anchor: "middle" });
      const boat = D.boat(110, 345, .9);
      const wind = D.wind(20, 300, 70);
      N("风：", "顺风从后面推着船，一路把船吹进港口。");
      k.wait(.3);
      // 读到 takes 时船正被风推着走（R4：风 + 船演「送进港口」）
      const syW = sayAt("The wind takes the ship into the port.", { zh: "风把船送进港口。", word: "port" });
      k.path(boat, syW.t + .1, syW.dur - .1, [[180, -8], [330, 0], [395, -4]]);
      k.path(wind, syW.t + .1, syW.dur - .1, [[180, -8], [330, 0], [380, -4]]); k.fade(wind, syW.t + syW.dur - .5, .5, 0);
      k.actFx(["takes"], syW.t + .1, syW.dur - .1, "风推着船进港");
      k.look(me, 420, 330, syW.t, syW.dur);
      N("机会：", "拉丁语 ob portum = 「朝着港口（吹）」——顺风进港，就是好时机。");
      const s2 = D.snap("ob", "port", 60 + D.chipW("ob"), 112, { from: [-10, 60], color: C.red, rootColor: C.blue });
      k.hlText("= opportunity", s2.end + 12, 136, 22, { mono: true });
      T("= opportunity", s2.end + 12, 136, go(.9), .9, { size: 22, color: C.green, weight: 900, font: M });
      k.egg(s2.end + 12 + 13 * 22 * .6 + 14, 128, { word: "opportunity" });
      T("原来指「朝着港口吹的顺风」→ 好时机、机会", 60, 180, go(1.4), 1.4, { size: 18, color: C.ink, weight: 700 });
      k.badge("📜", 60, 214);
      const book1 = k.prop("book", 0, 0, { g: 0, hidden: true });
      const syOb = sayAt("Ob portum means toward the port.", { zh: "ob portum（拉丁语）= 朝着港口。", word: "ob portum", blocks: ["ob"] });
      k.act(me, "read", syOb.t - .2, syOb.dur + .1, { prop: book1 });              // 翻开拉丁语词典读
      const syOp = sayAt("This is a good opportunity.", { zh: "这是一个好机会。", word: "opportunity", egg: ["opportunity"] });
      k.expr(me, "proud", syOp.t, syOp.dur);
      k.wait(.8);
      D.wipe();

      // ───── 镜头 3 · 搬运：方向前缀 + port = 一家人（搬运工演 import / export，船演 transport，信使演 report）─────
      D.step(2); D.shot();
      N("搬运：", "港口天天在搬货。拉丁语 portare = 搬运，和 portus（港口）是亲戚。");
      D.city(40, 250, 150, "城里");
      P(k.wl(24, 250, 330, 250, 1), go(.5), .5, { color: C.ink, w: 2.5 });
      D.pier(300, 250, 70);
      P(k.wl(330, 250, 936, 250, 1), go(.6), .6, { color: C.blue, w: 2.5, alpha: .6 });
      P(k.wave(380, 930, 266, 3), go(.5), .5, { color: C.blue, w: 2, alpha: .45 });
      const ship3 = D.boat(440, 248, .85);
      const crate3 = D.crate(446, 226); k.hide(crate3);
      P(`M820,250 L820,200 L850,185 L880,200 L880,250`, go(.5), .5, { color: C.blue, w: 2.2 });
      T("别的港口", 850, 172, go(.4), .4, { size: 15, color: C.blue, weight: 900, anchor: "middle" });
      T("拉丁语 portare = 搬运", 40, 296, go(.9), .9, { size: 18, color: C.blue, weight: 900 });
      k.badge("📜", 40 + k.estW("拉丁语 portare = 搬运", 18) + 14, 296);
      const book2 = k.prop("book", 0, 0, { g: 0, hidden: true });
      k.act(me, "read", S.at - 3.2, 3.0, { prop: book2 });
      const col = [50, 500], row = [314, 386], rootX = i => col[i % 2] + 90;   // 词根块在每一列对齐不动
      // 搬运工（场景角色，和小人同一套骨架）：两个人，一进一出
      const gP = grp();
      const boxA = k.prop("box", 356, 250, { g: gP, s: .7 }), boxB = k.prop("box", 122, 250, { g: gP, s: .7, hidden: true });
      const boxC = k.prop("box", 352, 250, { g: gP, s: .7, hidden: true }), boxD = k.prop("box", 122, 250, { g: gP, s: .7, hidden: true });
      const pA = k.actor("porter", { x: 384, y: 250, s: .7, f: -1, g: gP });
      const pB = k.actor("porter", { x: 116, y: 250, s: .7, f: 1, g: gP, hidden: true });
      k.look(me, 250, 210, S.at, 30);
      const syC = sayAt("Portus means port, and portare means carry.", { zh: "portus = 港口，portare = 搬运（拉丁语）。", word: "portus portare" });
      let [w0, wd] = win(syC);
      k.act(pA, "carry", w0 - .3, wd + .3, { prop: boxA, to: 262, put: true, words: ["carry"] });
      // ① im：搬进城
      N("im- 进：", "货箱从船上搬进城里 → import（进口）。");
      const w1 = D.snap("im", "port", rootX(0), row[0], { from: [-40, -70], color: C.red, rootColor: C.blue });
      T("= import 进口", w1.end + 10, row[0] + 24, go(.8), .8, { size: 19, color: C.green, weight: 900 });
      const syIm = sayAt("Import means to carry things in.", { zh: "import = 把东西搬进来。", word: "im", blocks: ["im"] });
      [w0, wd] = win(syIm);
      k.act(pA, "carry", w0 - .4, wd + .4, { prop: boxA, to: 118, words: ["import", "carry"] });
      k.actorFade(pA, w0 + wd - .1, .35, 0);                                        // 走进城门
      // ② ex：搬出城
      N("ex- 出：", "货箱从城里搬出去、装上船 → export（出口）。");
      const w2 = D.snap("ex", "port", rootX(1), row[0], { from: [-40, -70], color: C.red, rootColor: C.blue });
      T("= export 出口", w2.end + 10, row[0] + 24, go(.8), .8, { size: 19, color: C.green, weight: 900 });
      const syEx = sayAt("Export means to carry things out.", { zh: "export = 把东西搬出去。", word: "ex", blocks: ["ex"] });
      [w0, wd] = win(syEx);
      k.actorFade(pB, w0 - .6, .3, 1); boxB.showAt = w0 - .6;
      k.act(pB, "carry", w0 - .3, wd + .3, { prop: boxB, to: 330, put: true, words: ["export", "carry"] });
      // 一进一出同时演：A 从码头搬进城，B 从城门搬出来
      const pA2 = k.actor("porter", { x: 384, y: 250, s: .7, f: -1, g: gP, hidden: true });
      const pB2 = k.actor("porter", { x: 116, y: 250, s: .7, f: 1, g: gP, hidden: true });
      const syIE = sayAt("We import fruit and export tea.", { zh: "我们进口水果，出口茶叶。", word: "import export" });
      [w0, wd] = win(syIE);
      k.actorFade(pB, w0 - .5, .3, 0);
      k.actorFade(pA2, w0 - .5, .3, 1); k.actorFade(pB2, w0 - .5, .3, 1); boxC.showAt = boxD.showAt = w0 - .5;
      k.act(pA2, "carry", w0 - .2, wd + .3, { prop: boxC, to: 118, words: ["import"] });
      k.act(pB2, "carry", w0 - .2, wd + .3, { prop: boxD, to: 300, put: true, words: ["export"] });
      k.actorFade(pA2, w0 + wd, .3, 0); k.actorFade(pB2, w0 + wd + .4, .3, 0);
      // ③ trans：船把货运到对岸别的港口
      N("trans- 穿过：", "船穿过大海，把货运到别的港口 → transport（运输）。");
      const w3 = D.snap("trans", "port", rootX(0), row[1], { from: [-40, -70], color: C.red, rootColor: C.blue });
      T("= transport 运输", w3.end + 10, row[1] + 24, go(.8), .8, { size: 19, color: C.green, weight: 900 });
      const tLoad = go(.6);
      k.fade(crate3, tLoad, .4, 1); k.pop(crate3, tLoad, .4, { from: .5 });
      k.fade(gP, tLoad, .4, 0);                                                         // 码头上的箱子装上船了
      const syTr = sayAt("Transport means to carry things across.", { zh: "transport = 把东西运过去。", word: "trans", blocks: ["trans"] });
      [w0, wd] = win(syTr);
      k.path(ship3, w0 - .2, wd + .2, [[160, -8], [330, 0]]); k.path(crate3, w0 - .2, wd + .2, [[160, -8], [330, 0]]);
      k.actFx(["transport", "carry"], w0 - .2, wd + .2, "船载着货箱穿过大海");
      k.look(me, 700, 220, w0, wd);
      const syTr2 = sayAt("Ships transport food across the sea.", { zh: "船把食物运过大海。", word: "transport" });
      [w0, wd] = win(syTr2);
      k.path(ship3, w0 - .2, wd + .2, [[-160, 8], [-330, 0]]); k.path(crate3, w0 - .2, wd + .2, [[-160, 8], [-330, 0]]);
      k.actFx(["transport"], w0 - .2, wd + .2, "船把货运回来");
      // ④ re：信使把消息带回城里
      N("re- 回：", "别的港口发生了什么？把消息带回城里 → report（报告）。");
      const w4 = D.snap("re", "port", rootX(1), row[1], { from: [-40, -70], color: C.red, rootColor: C.blue });
      T("= report 报告", w4.end + 10, row[1] + 24, go(.8), .8, { size: 19, color: C.green, weight: 900 });
      const gM = grp();
      const scr = k.prop("scroll", 0, 0, { g: gM, s: .7, hidden: true });
      const msg = k.actor("traveler", { x: 352, y: 250, s: .7, f: -1, g: gM, hidden: true });
      const syRe = sayAt("Report means to carry news back.", { zh: "report = 把消息带回来。", word: "re", blocks: ["re"] });
      [w0, wd] = win(syRe);
      k.actorFade(msg, w0 - .9, .3, 1);
      k.act(msg, "take", w0 - .7, .6, { prop: scr });
      k.act(msg, "run", w0 - .05, wd + .05, { to: 150, words: ["report", "carry"] });
      const syRe2 = sayAt("He reports the news to the city.", { zh: "他把消息报告给城里。", word: "report" });
      [w0, wd] = win(syRe2);
      k.act(msg, "holdCard", w0 - .3, wd + .3, { prop: scr, pop: false, words: ["reports"] });
      N("", "词根 port 一直不变，变的只是前面表示方向的小块。");
      k.hlText("词根不变，方向前缀一换，就是一个新词", 40, 470, 20, { color: C.hlGreen });
      T("词根不变，方向前缀一换，就是一个新词", 40, 470, go(1.4), 1.4, { size: 20, color: C.green, weight: 900 });
      k.act(me, "nod", S.at - .3, .8);
      k.wait(1);
      D.wipe();

      // ───── 镜头 4 · 港口关卡：出示文书 → 盖章 → 走过关卡 = passport ─────
      D.step(2); D.shot();
      N("关卡：", "旅客要从港口出入国境，得先拿文书给守卫看、盖个章。");
      P(k.wl(24, 340, 936, 340, 1), go(.6), .6, { color: C.ink, w: 2.5 });
      const arch = "M600,340 L600,170 Q680,110 760,170 L760,340 M626,340 L626,184 Q680,140 734,184 L734,340";
      P(arch, go(1), 1, { color: C.ink, w: 3 });
      T("港口关卡", 680, 128, go(.5), .5, { size: 18, color: C.ink, weight: 900, anchor: "middle" });
      P(k.wave(780, 936, 300, 3) + " " + k.wave(790, 930, 322, 3), go(.5), .5, { color: C.blue, w: 2, alpha: .45 });
      const gT = grp();
      const doc = k.prop("doc", 0, 0, { g: gT, s: .75, hidden: true });
      const tv = k.actor("traveler", { x: 140, y: 340, s: .78, f: 1, g: gT });
      k.act(tv, "walk", go(2.2), 2.2, { to: 520 });
      const syShow = sayAt("Show me your passport, please.", { zh: "请出示你的护照。", word: "passport" });
      [w0, wd] = win(syShow);
      k.act(tv, "holdCard", syShow.t + .2, syShow.dur + .6, { prop: doc, release: false, expr: "happy", words: ["show"] });
      k.look(me, 520, 230, syShow.t, syShow.dur + 1.5);
      N("盖章：", "啪！章盖上了：可以通过港口了。");
      doc.stampAt = go(1.1) + .7; doc.stampText = "OK";
      k.sfx("pop", doc.stampAt);
      k.act(me, "surprised", doc.stampAt - .1, 1.1);
      const syPass = sayAt("OK! You can pass now.", { zh: "好了！你现在可以通过了。", word: "OK pass" });
      [w0, wd] = win(syPass);
      k.act(tv, "take", syPass.t + .1, .7, { prop: doc });
      k.act(tv, "walk", w0 - .1, wd + 1.4, { to: 820, words: ["pass"] });
      k.wait(1.2);
      N("pass + port：", "pass（通过）+ port（港口）= 通过港口的许可 → passport（护照）。");
      const s4 = D.snap("pass", "port", 60 + D.chipW("pass"), 384, { from: [-20, -60], color: C.red, rootColor: C.blue });
      k.hlText("= passport 护照", s4.end + 12, 408, 22);
      T("= passport 护照", s4.end + 12, 408, go(.9), .9, { size: 22, color: C.green, weight: 900 });
      T("通过港口、出入国境的许可", 60, 458, go(1), 1, { size: 18, color: C.ink, weight: 700 });
      k.badge("📜", 60 + k.estW("通过港口、出入国境的许可", 18) + 14, 458);
      k.act(me, "point", S.at - .2, 1.6, { at: [s4.end + 60, 400] });
      k.wait(.6);
      D.wipe();

      // ───── 镜头 5 · 穿越到今天：港口 → 机场 ─────
      D.step(3); D.shot();
      k.camera(go(.01, 0), .01, 480, 285, 1.5);
      N("穿越：", "镜头拉近：古代的海港，一艘帆船靠岸。");
      k.act(me, "turn", S.at + .2, .5); k.act(me, "turn", S.at + 1.2, .5);           // 转个圈：穿越！
      const seaL = D.sub();
      T("古代：港口", 480, 160, go(.6), .6, { size: 20, color: C.ink, weight: 900, anchor: "middle" });
      P(k.wave(250, 720, 300, 3) + " " + k.wave(260, 700, 322, 3), go(.6), .6, { color: C.blue, w: 2, alpha: .45 });
      D.back();
      const oldShip = D.boat(420, 290, 1);
      const oldPier = D.pier(560, 300, 110);
      const plane = D.plane(420, 250, 1); k.hide(plane);
      const twr = D.tower(610, 300); k.hide(twr);
      const nowL = D.sub(); T("今天：机场", 480, 160, go(.01, 0), .01, { size: 20, color: C.blue, weight: 900, anchor: "middle" }); D.back(); k.hide(nowL);
      N("变身：", "帆船变成飞机，海港变成机场：古今是同一个道理。");
      const tm5 = D.morph(oldShip, plane, 1.2);
      k.fade(oldPier, tm5 + .4, 1.2, 0); k.fade(seaL, tm5 + .4, 1.2, 0); k.fade(twr, tm5 + .4, 1.2, 1); k.fade(nowL, tm5 + .8, .6, 1);
      k.act(me, "jump", tm5 + .5, 1.2);                                              // 哇——变成飞机了！
      k.wait(1.2);
      k.camera(go(1.8), 1.8, 480, 272, 1);
      N("air + port：", "air（空中）+ port（港口）= 空中的港口 → airport（机场）。");
      const s5 = D.snap("air", "port", 60 + D.chipW("air"), 440, { from: [-20, -60], color: C.red, rootColor: C.blue });
      k.hlText("= airport 机场（空中的港口）", s5.end + 12, 464, 20);
      T("= airport 机场（空中的港口）", s5.end + 12, 464, go(1.2), 1.2, { size: 20, color: C.green, weight: 900 });
      k.badge("📜", s5.end + 12 + k.estW("= airport 机场（空中的港口）", 20) + 10, 464);
      // 鸟飞过天空（R4：fly）
      const birds = D.sub();
      [[0, 0], [34, 14], [66, -6]].forEach(([dx, dy]) => P(`M${120 + dx},${140 + dy} q8,-9 15,0 q7,-9 15,0`, go(.15, .02), .15, { color: C.ink, w: 2.2 }));
      D.back(); k.hide(birds);
      const syFly = sayAt("Birds fly in the air.", { zh: "鸟儿在空中飞。", word: "air" });
      [w0, wd] = win(syFly);
      k.fade(birds, syFly.t, .3, 1);
      k.path(birds, syFly.t, syFly.dur, [[220, -20], [470, 10], [700, -16]]);
      for (let i = 0; i < 7; i++) k.squash(birds, syFly.t + .2 + i * (syFly.dur - .3) / 7, (syFly.dur - .3) / 7, .22);
      k.fade(birds, syFly.t + syFly.dur - .3, .3, 0);
      k.actFx(["fly"], syFly.t, syFly.dur, "三只鸟扇着翅膀飞过天空");
      // 旅客走向飞机（take a plane）→ 飞机起飞
      const gTk = grp();
      const tv2 = k.actor("traveler", { x: 250, y: 304, s: .55, f: 1, g: gTk, hidden: true });
      const syTake = sayAt("We take a plane at the airport.", { zh: "我们在机场坐飞机。", word: "airport" });
      [w0, wd] = win(syTake);
      k.actorFade(tv2, syTake.t - .2, .3, 1);
      k.act(tv2, "walk", w0 - .4, wd * .6, { to: 392, words: ["take"] });
      k.actorFade(tv2, w0 + wd * .6 - .5, .4, 0);
      k.path(plane, w0 + wd * .55, wd * .45 + .8, [[140, -12], [300, -70], [420, -170]], { ease: "in" });
      k.actFx(["take"], w0 + wd * .55, wd * .45 + .8, "旅客登机、飞机起飞");
      k.wait(.6);
      D.wipe();

      // ───── 镜头 6 · 定格总结图 + 中文对照 ─────
      D.step(4);
      N("总结：", "港口是罗马世界的大门；一个 port 长出了进、出、穿越、带回、机会。");
      k.chip("port", 444, 98, null, { size: 22, color: C.blue, fill: C.tintBlue });
      P(`M445,128 Q330,140 250,160 M515,128 Q630,140 710,160`, go(.6), .6, { color: C.grey, w: 2 });
      // 左：港口线
      P(k.roughRect(30, 162, 430, 160), go(.6), .6, { color: C.ink, w: 2 });
      T("港口线：portus（港口）", 46, 192, go(.8), .8, { size: 19, color: C.ink, weight: 900 });
      k.badge("📜", 300, 192);
      T("port 港口 · airport 机场", 46, 236, go(.8), .8, { size: 19, color: C.ink, weight: 900 });
      T("passport 护照", 46, 276, go(.6), .6, { size: 19, color: C.ink, weight: 900 });
      T("opportunity 机会", 46, 310, go(.6), .6, { size: 19, color: C.ink, weight: 900 });
      k.egg(196, 303, { word: "opportunity" });
      // 右：搬运线
      P(k.roughRect(500, 162, 430, 160), go(.6), .6, { color: C.blue, w: 2 });
      T("搬运线：portare（搬运）", 516, 192, go(.8), .8, { size: 19, color: C.blue, weight: 900 });
      k.badge("📜", 776, 192);
      T("import 进口 · export 出口", 516, 236, go(.8), .8, { size: 19, color: C.ink, weight: 900 });
      T("transport 运输 · report 报告", 516, 276, go(.8), .8, { size: 19, color: C.ink, weight: 900 });
      const quiz = D.sub(); T("sup + port = ？（考考你）", 516, 310, go(.6), .6, { size: 19, color: C.grey, weight: 900 }); D.back();
      N("亲戚词：", "portus 和 portare 是同一个古老词根长出的亲戚，不是同一个词。");
      k.act(me, "point", S.at, 1.4, { at: [245, 240] }); k.act(me, "point", S.at + 1.6, 1.4, { at: [715, 240] });
      k.badge("💡", 30, 360);
      T("两条线是亲戚（同一个古老词根），不是同一个词；动画用港口场景把它们串起来记", 124, 360, go(1.6), 1.6, { size: 15, color: C.ink, weight: 700 });
      N("中文对照：", "中文也用一个「口」字串起来：港口、进口、出口、口岸。");
      T("🀄 中文也用一个「口」串起来：港口 · 进口 · 出口 · 口岸", 30, 404, go(1.6), 1.6, { size: 19, color: C.ink, weight: 900 });
      T("（这是对照，不是同源）", 530, 404, go(.6), .6, { size: 14, color: C.grey });
      const card = k.prop("card", 0, 0, { g: 0, text: "port", hidden: true });
      const syDoor = sayAt("A port is a door to the world.", { zh: "港口是通向世界的大门。", word: "port" });
      k.act(me, "holdCard", syDoor.t - .3, syDoor.dur + .5, { prop: card });
      k.wait(.6);

      // ───── 镜头 7 · 预测：sup + port = ? ─────
      D.step(5);
      N("预测：", "考考你：sup（从下面）+ port（扛、搬）= ？先想 3 秒！");
      P(k.roughRect(16, 438, 824, 92), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 438, 824, 92), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 sup（从下面）+ port（扛、搬）=", 36, 474, go(1.4), 1.4, { size: 20, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 392, 478, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "support = 从下面把东西托住 → 支持。");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      k.hlText("support 支持", 392, 476, 22, { mono: true, color: C.hlGreen });
      T("support 支持", 392, 476, go(.9), .9, { size: 22, color: C.green, weight: 900, font: M });
      k.fade(quiz, go(.3), .3, 0);
      T("sup + port = support 支持 ✔", 516, 310, go(.8), .8, { size: 19, color: C.green, weight: 900 });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      T("从下面托住 → 支持、帮助", 36, 514, go(1), 1, { size: 15, color: C.grey, weight: 700 });
      k.badge("📜", 36 + k.estW("从下面托住 → 支持、帮助", 15) + 12, 514);
      // 小人从下面把箱子托起来（hold up / support）
      const box7 = k.prop("box", 0, 0, { g: 0, hidden: true });
      const sySup = sayAt("Support means to hold something up from below.", { zh: "support = 从下面把东西托住。", word: "sup", blocks: ["sup"] });
      k.act(me, "support", sySup.t - .2, sySup.dur + .3, { prop: box7, words: ["hold", "support"] });
      // 朋友们一起托住（My friends support me）
      const gF = grp();
      const box8 = k.prop("box", 0, 0, { g: gF, hidden: true, s: .55 });
      const f1 = k.actor("porter", { x: 728, y: 524, s: .5, f: 1, g: gF, hidden: true });
      const f2 = k.actor("traveler", { x: 790, y: 524, s: .5, f: -1, g: gF, hidden: true });
      const syFr = sayAt("My friends support me.", { zh: "我的朋友们支持我。", word: "support" });
      k.actorFade(f1, syFr.t - .4, .3, 1); k.actorFade(f2, syFr.t - .4, .3, 1);
      k.act(f1, "support", syFr.t - .2, syFr.dur + 1.2, { prop: box8, words: ["support"] });
      k.act(f2, "support", syFr.t - .1, syFr.dur + 1.1, { words: ["support"] });
      N("口诀：", "港口一扇门，进出穿回都靠 port；sup 托住就是 support！");
      D.hold(2.5);

      // ───── 收尾金句卡（统一样式，定格可截图复习）─────
      k.fade(gF, S.at, .4, 0); k.actorFade(f1, S.at, .4, 0); k.actorFade(f2, S.at, .4, 0);
      k.quoteCard({ insight: "港口是罗马世界的大门：一个 port，长出了进、出、穿越、带回、机会。", rhyme: "港口一扇门，进出穿回都靠 port；sup 托住就是 support！", foot: "📖 单词身世 · port 港口" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    // 分镜动作词清单（R4）：每个动作词由谁演、怎么演；r2check.py 逐个对照 k.act / k.actFx 登记，并检查和朗读同步
    actionWords: [
      { word: "takes", act: "风推着船进港（场景：风 + 船）" },
      { word: "carry", act: "搬运工弯腰抱起箱子、走、放下" },
      { word: "import", act: "搬运工把箱子从码头搬进城门" },
      { word: "export", act: "搬运工把箱子从城门搬出到码头" },
      { word: "transport", act: "船载着货箱穿过大海、再运回来" },
      { word: "report", act: "信使拿起卷轴跑回城" },
      { word: "reports", act: "信使在城门举起卷轴报告" },
      { word: "show", act: "旅客举起护照给人看" },
      { word: "pass", act: "旅客拿着盖好章的护照走过关卡" },
      { word: "fly", act: "三只鸟扇着翅膀飞过天空" },
      { word: "take", act: "旅客走向飞机登机，飞机起飞" },
      { word: "hold", act: "讲解员从下面把箱子托起来" },
      { word: "support", act: "讲解员托举箱子；两个朋友一起托住" },
    ],
    terms: [
      ["词源", "一个词是从哪里来的、原来是什么意思（单词的「身世」）。"],
      ["词根", "单词里表示核心意思、不变的那一块，比如 port。"],
      ["前缀", "加在词根前面、改变意思的小块：im-（进）、ex-（出）、trans-（穿过）、re-（回）、sup-（从下面）。"],
      ["拉丁语", "古罗马人说的话。很多英语单词是从拉丁语借来的。"],
      ["亲戚词（同源词）", "从同一个古老词根长出来的不同的词，像一家人；但不是同一个词。portus 港口和 portare 搬运就是亲戚。"],
      ["可信度徽章", "📜 真实词源（查得到出处）· 💡 记忆联想 · ✂️ 简化说法 · ⚠️ 有例外或流行错误说法 · ❓ 有争议。"],
      ["🥚 彩蛋词", "超出小学课标的词，知道就好，不用背。"],
      ["地中海", "被欧洲、非洲、亚洲三块大陆围在中间的海。Mediterranean = medi（中间）+ terra（陆地）。"],
    ],
  },
];
