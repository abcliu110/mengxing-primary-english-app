// ==================== 单词身世 · 溯源幕 ③：Bluetooth 蓝牙（v2，对齐 port 样板幕）====================
// 分镜：docs/whiteboard/word_origins/BLUETOOTH_STORYBOARD.md；出处：word_origins/SOURCES.md「溯源幕 ③」
// 一句话洞见：一千年前把丹麦连成一个国家的国王，今天在把你的手机和电脑连在一起——名字借来了故事的力量。
// 严谨：国王统一丹麦、技术命名、标志由来都有出处（📜）；外号「蓝牙」的来历说法不一（❓）。
WB_LAB.wo_bluetooth = [
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const grp = () => { const g = D.sub(); D.back(); return g; };
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const win = sy => [sy.t + sy.wd + .15, sy.dur - sy.wd - .3];
      const mw = (txt, fs) => txt.length * fs * .6;
      let w0, wd;
      // ── 讲解员小人 ──
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      N("", "这一幕：手机上的 Bluetooth（蓝牙），为什么叫「蓝色的牙」？");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "Bluetooth 蓝牙", sub: "单词身世 · 欧洲文化密码", badges: ["📜", "❓", "💡"] });
      N("可信度徽章：", "📜 = 查得到出处；❓ = 有好几种说法；💡 = 中文对照，不是词源。");
      k.wait(.6);

      // ───── 镜头 1 · 地图：一千年前的丹麦，被一位国王连成一个国家 ─────
      D.step(0); D.shot();
      N("地图：", "这是北欧。下面伸出来的半岛和旁边的岛，就是丹麦。");
      P(k.roughRect(40, 100, 520, 300), go(.8), .8, { color: C.blue, w: 2, alpha: .5 }); F(k.rectD(40, 100, 520, 300), go(.2, 0), { color: C.tintBlue, op: 1 });
      const landD = (d, dur = 1) => { P(d, go(dur), dur, { color: C.ink, w: 2.2 }); F(d, go(.15, 0), { color: "#fef9c3", op: 1 }); };
      landD("M40,100 L560,100 L560,226 Q524,240 502,204 Q474,172 432,192 Q402,214 382,182 Q352,152 302,172 Q252,192 202,162 Q152,132 102,170 Q72,190 40,180 Z", 1.2);
      landD("M40,400 L40,376 Q120,366 186,372 Q178,320 186,286 Q196,252 222,250 Q244,256 246,290 Q248,330 240,372 Q330,378 420,372 Q500,368 560,376 L560,400 Z", 1.1);
      landD(`M263,330 Q264,314 285,314 Q306,316 306,330 Q304,346 285,346 Q264,346 263,330 Z`, .4);
      landD(`M320,320 Q322,296 350,296 Q380,298 380,320 Q378,344 350,344 Q322,344 320,320 Z`, .4);
      T("挪威", 120, 140, go(.4), .4, { size: 17, color: C.ink, weight: 900 });
      T("瑞典", 430, 140, go(.4), .4, { size: 17, color: C.ink, weight: 900 });
      T("丹麦", 258, 270, go(.4), .4, { size: 18, color: C.red, weight: 900 });
      T("北海", 90, 280, go(.4), .4, { size: 16, color: C.blue, weight: 900 });
      T("简化示意图，不按比例", 556, 394, go(.3), .3, { size: 13, color: C.grey, anchor: "end" });
      k.act(me, "point", S.at - .6, 2, { at: [262, 300] });
      // 国王出场（场景角色）
      N("国王：", "一千多年前（10 世纪），丹麦有一位国王，叫哈拉尔（Harald）。");
      T("一千多年前（10 世纪）", 600, 150, go(.8), .8, { size: 18, color: C.grey, weight: 700 });
      k.hlText("丹麦国王 Harald", 600, 188, 22);
      T("丹麦国王 Harald", 600, 188, go(1), 1, { size: 22, color: C.ink, weight: 900 });
      k.egg(600 + k.estW("丹麦国王 Harald", 22) + 12, 182, { word: "Harald" });
      const gK = grp();
      const king = k.actor("king", { x: 700, y: 420, s: .95, f: -1, g: gK });
      const syH = sayAt("Harald was a king of Denmark.", { zh: "哈拉尔是丹麦的国王。", word: "Harald", egg: ["Harald", "Denmark"] });
      k.act(king, "wave", syH.t, syH.dur);
      // 部落一个个分散 → 被国王连成一个国家（unites）
      N("统一：", "那时丹麦分成好多个部落。哈拉尔把它们连成了一个王国——石碑上刻着这件事。");
      const huts = [[212, 300, C.red], [226, 352, C.green], [285, 328, C.blue], [350, 318, C.ink]].map(([x, y, c]) => {
        const g = D.sub();
        const tent = `M${x - 12},${y} L${x},${y - 20} L${x + 12},${y} Z`;
        P(tent, go(.25), .25, { color: C.ink, w: 2 }); F(tent, go(.05, 0), { color: "#ffffff", op: 1 });
        P(`M${x},${y - 20} L${x},${y - 34} L${x + 11},${y - 30} L${x},${y - 26}`, go(.15), .15, { color: c, w: 2.2 });
        D.back(); return { g, x, y };
      });
      const gCrown = D.sub();
      const cx0 = 330, cy0 = 364;
      const crown = `M${cx0 - 22},${cy0} L${cx0 - 24},${cy0 - 26} L${cx0 - 10},${cy0 - 14} L${cx0},${cy0 - 32} L${cx0 + 10},${cy0 - 14} L${cx0 + 24},${cy0 - 26} L${cx0 + 22},${cy0} Z`;
      P(crown, go(.01, 0), .01, { color: C.ink, w: 2.4 }); F(crown, go(.01, 0), { color: "#facc15", op: 1 });
      T("一个王国", cx0, cy0 + 24, go(.01, 0), .01, { size: 15, color: C.red, weight: 900, anchor: "middle" });
      D.back(); k.hide(gCrown);
      const syU = sayAt("The king unites the people.", { zh: "国王把大家团结（连）在一起。", word: "", egg: ["unites"] });
      [w0, wd] = win(syU);
      huts.forEach(h => { k.move(h.g, w0 - .2, wd * .7, cx0 - h.x, cy0 - h.y + 4, { ease: "move" }); k.fade(h.g, w0 + wd * .7 - .3, .3, 0); });
      k.fade(gCrown, w0 + wd * .7 - .2, .2, 1); k.pop(gCrown, w0 + wd * .7 - .2, .5, { cx: cx0, cy: cy0 - 10 });
      k.act(king, "cheer", w0, wd, { words: ["unites"] });
      k.actFx(["unites"], w0 - .2, wd * .7, "四个部落向中间靠拢，合成一个王国（王冠）");
      k.look(me, cx0, cy0, w0, wd);
      T("（耶林石碑上刻着：他统一了丹麦）", 600, 226, go(.8), .8, { size: 14, color: C.grey, weight: 700 });
      k.badge("📜", 600, 258);
      D.hold(1.6);                                                                     // 让「一个王国」多停一会儿
      D.wipe();

      // ───── 镜头 2 · 外号：blue + tooth = Bluetooth；为什么叫蓝牙？❓ ─────
      D.step(1); D.shot();
      N("外号：", "哈拉尔有个外号，叫 Bluetooth：blue（蓝）+ tooth（牙）。");
      const sn = D.snap("Blue", "tooth", 60 + D.chipW("Blue", 26), 112, { size: 26, color: C.blue, rootColor: C.ink, from: [-20, 60] });
      k.hlText("= Bluetooth 蓝牙", sn.end + 14, 144, 26);
      T("= Bluetooth 蓝牙", sn.end + 14, 144, go(1), 1, { size: 26, color: C.green, weight: 900 });
      k.badge("📜", sn.end + 14 + k.estW("= Bluetooth 蓝牙", 26) + 12, 140);
      const gK2 = grp();
      const king2 = k.actor("king", { x: 730, y: 470, s: 1.05, f: -1, g: gK2 });
      sayAt("Blue and tooth make Bluetooth.", { zh: "blue（蓝）和 tooth（牙）合成 Bluetooth。", word: "blue tooth" });
      k.act(king2, "nod", S.at - 1.2, 1); k.expr(king2, "happy", S.at - 2, 3);
      N("为什么？", "为什么叫「蓝牙」？说法不止一种，所以打 ❓。");
      // 大牙齿：发黑发蓝
      const tx = 130, ty = 330;
      const tooth = `M${tx - 40},${ty - 46} Q${tx - 44},${ty - 70} ${tx - 18},${ty - 70} Q${tx},${ty - 62} ${tx + 18},${ty - 70} Q${tx + 44},${ty - 70} ${tx + 40},${ty - 46} Q${tx + 36},${ty - 10} ${tx + 26},${ty + 30} Q${tx + 18},${ty + 44} ${tx + 10},${ty + 24} L${tx},${ty} L${tx - 10},${ty + 24} Q${tx - 18},${ty + 44} ${tx - 26},${ty + 30} Q${tx - 36},${ty - 10} ${tx - 40},${ty - 46} Z`;
      P(tooth, go(.8), .8, { color: C.ink, w: 2.6 });
      const gBlue = D.sub(); F(tooth, go(.6, 0), { color: C.blue, op: .55 }); D.back(); k.hide(gBlue);
      k.fade(gBlue, S.at, .8, 1);
      k.act(me, "surprised", S.at + .2, 1.2);
      P(k.roughRect(230, 210, 340, 70), go(.5), .5, { color: C.ink, w: 2 });
      T("传统说法：他有一颗坏牙，", 246, 240, go(.8), .8, { size: 16, color: C.ink, weight: 700 });
      T("颜色发黑发蓝", 246, 266, go(.5), .5, { size: 16, color: C.ink, weight: 700 });
      k.badge("❓", 570 - 70, 238, { label: "说法" });
      P(k.roughRect(230, 296, 340, 70), go(.5), .5, { color: C.ink, w: 2 });
      T("另一种说法：「深色的首领」", 246, 326, go(.8), .8, { size: 16, color: C.ink, weight: 700 });
      T("（英格兰人这样叫他）", 246, 352, go(.5), .5, { size: 14, color: C.grey, weight: 700 });
      k.badge("❓", 570 - 70, 324, { label: "说法" });
      k.act(me, "think", S.at - 1.4, 2.6);
      N("小知识：", "古代北欧话里的「蓝」，意思是「蓝黑、深色」。");
      T("古代北欧话的「蓝」= 蓝黑、深色", 60, 420, go(1.2), 1.2, { size: 18, color: C.ink, weight: 900 });
      k.badge("📜", 60 + k.estW("古代北欧话的「蓝」= 蓝黑、深色", 18) + 12, 420);
      const syPh = sayAt("My phone has Bluetooth.", { zh: "我的手机有蓝牙。", word: "Bluetooth" });
      k.act(me, "point", syPh.t, 1.6, { at: [sn.end + 80, 132] });
      k.wait(.8);
      D.wipe();

      // ───── 镜头 3 · 词族：两个词一粘 = 一个新词（合成词）─────
      D.step(2); D.shot();
      N("规律：", "Bluetooth 是两个词粘起来的。英语里这样的「合成词」特别多！");
      const r1 = D.snap("tooth", "brush", 60 + D.chipW("tooth", 22), 116, { size: 22, color: C.blue, rootColor: C.ink, from: [-20, 60] });
      T("= toothbrush 牙刷", r1.end + 14, 146, go(.9), .9, { size: 22, color: C.green, weight: 900 });
      // 牙刷小图
      const bx = r1.end + 14 + k.estW("= toothbrush 牙刷", 22) + 30;
      P(`M${bx},150 L${bx + 70},136`, go(.3), .3, { color: C.blue, w: 5 });
      P(`M${bx + 52},134 l0,-10 M${bx + 58},133 l0,-10 M${bx + 64},132 l0,-10 M${bx + 70},131 l0,-10`, go(.3), .3, { color: C.ink, w: 1.6 });
      sayAt("This is my toothbrush.", { zh: "这是我的牙刷。", word: "brush toothbrush", blocks: ["tooth", "brush"] });
      const r2 = D.snap("foot", "ball", 60 + D.chipW("foot", 22), 206, { size: 22, color: C.blue, rootColor: C.ink, from: [-20, 60] });
      T("= football 足球", r2.end + 14, 236, go(.9), .9, { size: 22, color: C.green, weight: 900 });
      const bx2 = r2.end + 14 + k.estW("= football 足球", 22) + 40;
      const ball = k.ellipse(bx2, 228, 16, 16); P(ball, go(.4), .4, { color: C.ink, w: 2.2 }); F(ball, go(.05, 0), { color: "#ffffff", op: 1 });
      P(`M${bx2 - 6},${222} l6,-5 l6,5 l-2,7 l-8,0 Z`, go(.2), .2, { color: C.ink, w: 1.6 });
      sayAt("This is a football.", { zh: "这是一个足球。", word: "foot ball football", blocks: ["foot", "ball"] });
      N("合成词：", "两个认识的词一粘，就是一个新词：看到长单词，先找找里面藏着哪两个词！");
      k.hlText("两个词一粘 = 一个新词（合成词）", 60, 320, 22, { color: C.hlGreen });
      T("两个词一粘 = 一个新词（合成词）", 60, 320, go(1.2), 1.2, { size: 22, color: C.green, weight: 900 });
      k.badge("📜", 60 + k.estW("两个词一粘 = 一个新词（合成词）", 22) + 12, 318);
      T("Bluetooth = blue + tooth · toothbrush = tooth + brush · football = foot + ball", 60, 366, go(1.6), 1.6, { size: 15, color: C.grey, weight: 700 });
      k.act(me, "nod", S.at - .3, .8);
      k.wait(1);
      D.wipe();

      // ───── 镜头 4 · 彩蛋：国王的名字 → 今天的无线技术；标志 = 国王名字的两个首字母 ─────
      D.step(3); D.shot();
      N("今天：", "1997 年，一位工程师说：国王把丹麦连成一个国家，我们要把电脑和手机连在一起——就叫它「蓝牙」！");
      T("1997 年，一位工程师说：", 40, 132, go(.8), .8, { size: 18, color: C.grey, weight: 700 });
      T("「国王把丹麦连成一个国家，", 40, 166, go(1), 1, { size: 19, color: C.ink, weight: 900 });
      T("我们要把电脑和手机连在一起！」", 40, 196, go(1), 1, { size: 19, color: C.ink, weight: 900 });
      k.badge("📜", 40 + k.estW("我们要把电脑和手机连在一起！」", 19) + 12, 194);
      // 电脑、手机、耳机
      const comp = "M60,250 L180,250 L180,330 L60,330 Z";
      P(comp, go(.5), .5, { color: C.ink, w: 2.4 }); F(comp, go(.05, 0), { color: C.tintBlue, op: 1 });
      P("M100,330 L92,352 L148,352 L140,330", go(.3), .3, { color: C.ink, w: 2.2 });
      T("电脑", 120, 378, go(.3), .3, { size: 15, color: C.ink, weight: 900, anchor: "middle" });
      const ph = "M300,262 Q300,252 310,252 L346,252 Q356,252 356,262 L356,340 Q356,350 346,350 L310,350 Q300,350 300,340 Z";
      P(ph, go(.5), .5, { color: C.ink, w: 2.4 }); F(ph, go(.05, 0), { color: C.tintBlue, op: 1 });
      T("手机", 328, 378, go(.3), .3, { size: 15, color: C.ink, weight: 900, anchor: "middle" });
      P("M460,320 Q460,252 510,252 Q560,252 560,320", go(.4), .4, { color: C.ink, w: 3 });
      [[452, 312], [552, 312]].forEach(([x, y]) => { const c = `M${x},${y} L${x + 16},${y} L${x + 16},${y + 36} L${x},${y + 36} Z`; P(c, go(.2), .2, { color: C.ink, w: 2.2 }); F(c, go(.05, 0), { color: C.tintBlue, op: 1 }); });
      T("耳机", 510, 378, go(.3), .3, { size: 15, color: C.ink, weight: 900, anchor: "middle" });
      const syC = sayAt("Bluetooth connects my phone and my computer.", { zh: "蓝牙把我的手机和电脑连在一起。", word: "", egg: ["connects"] });
      [w0, wd] = win(syC);
      const sig = (x1, x2, y) => `M${x1},${y} Q${(x1 + x2) / 2},${y - 40} ${x2},${y}`;
      P(sig(186, 294, 290), w0, wd * .4, { color: C.blue, w: 2.6, dash: "6 6" });
      P(sig(362, 450, 290), w0 + wd * .45, wd * .4, { color: C.blue, w: 2.6, dash: "6 6" });
      k.actFx(["connects"], w0, wd, "蓝色信号线把电脑、手机、耳机连起来");
      k.act(me, "point", w0 - .2, wd, { at: [328, 290] });
      // 标志：两个北欧古字母 ᚼ（H）+ ᛒ（B）合在一起
      N("标志：", "蓝牙标志是两个北欧古字母（卢恩字母）合在一起：一个像 H，一个像 B——国王名字的首字母！");
      const lx = 740, ly = 290;
      const gBg = D.sub();
      const shield = `M${lx - 38},${ly - 50} Q${lx},${ly - 74} ${lx + 38},${ly - 50} L${lx + 38},${ly + 50} Q${lx},${ly + 74} ${lx - 38},${ly + 50} Z`;
      P(shield, go(.01, 0), .01, { color: C.blue, w: 2.6 }); F(shield, go(.01, 0), { color: C.blue, op: 1 });
      D.back(); k.hide(gBg);
      const gH = D.sub();
      P(`M${lx - 70},${ly - 40} L${lx - 70},${ly + 40} M${lx - 86},${ly - 20} L${lx - 54},${ly + 6} M${lx - 54},${ly - 20} L${lx - 86},${ly + 6}`, go(.8), .8, { color: C.ink, w: 4 });
      D.back();
      T("H（Harald）", lx - 70, ly + 70, go(.5), .5, { size: 15, color: C.ink, weight: 900, anchor: "middle" });
      const gB = D.sub();
      P(`M${lx + 70},${ly - 40} L${lx + 70},${ly + 40} M${lx + 70},${ly - 40} L${lx + 92},${ly - 20} L${lx + 70},${ly} L${lx + 92},${ly + 20} L${lx + 70},${ly + 40}`, go(.8), .8, { color: C.ink, w: 4 });
      D.back();
      T("B（Bluetooth）", lx + 70, ly + 70, go(.5), .5, { size: 15, color: C.ink, weight: 900, anchor: "middle" });
      const tM = go(1.2);
      k.move(gH, tM, .8, 70, 0, { ease: "move" }); k.move(gB, tM, .8, -70, 0, { ease: "move" });
      k.fade(gBg, tM + .8, .3, 1); k.pop(gBg, tM + .8, .5, { cx: lx, cy: ly });
      k.sfx("ding", tM + 1);
      k.act(me, "surprised", tM + .9, 1.2);
      T("合成蓝牙标志", lx, ly - 90, go(.5), .5, { size: 16, color: C.blue, weight: 900, anchor: "middle" });
      k.badge("📜", lx - 34, ly + 104);
      N("", "这个名字本来只是临时代号，后来没来得及换，就一直用到了今天。");
      T("本来只是临时代号，没来得及换，就用到了今天", 40, 440, go(1.4), 1.4, { size: 17, color: C.green, weight: 900 });
      k.badge("📜", 40 + k.estW("本来只是临时代号，没来得及换，就用到了今天", 17) + 12, 440);
      k.wait(1);
      D.wipe();

      // ───── 镜头 5 · 中文对照：蓝牙 = 照着意思翻（意译）；欧罗巴 = 照着声音翻（音译）＋ 🔮 预测 ─────
      D.step(4);
      N("中文：", "中文「蓝牙」是照着意思一个字一个字翻的：蓝 + 牙。");
      P(k.roughRect(24, 104, 400, 150), go(.6), .6, { color: C.ink, w: 2 });
      T("蓝牙 = 蓝 + 牙", 44, 150, go(1), 1, { size: 26, color: C.ink, weight: 900 });
      T("照着意思翻（意译）", 44, 196, go(.8), .8, { size: 18, color: C.green, weight: 900 });
      P(k.roughRect(450, 104, 380, 150), go(.6), .6, { color: C.ink, w: 2 });
      T("欧罗巴（上一幕）", 470, 150, go(1), 1, { size: 24, color: C.ink, weight: 900 });
      T("照着声音翻（音译）", 470, 196, go(.8), .8, { size: 18, color: C.red, weight: 900 });
      k.badge("💡", 24, 290, { label: "中文对照，不是词源" });
      T("同一种翻译法也有例外：「足球」是照意思，「沙发」是照声音", 24, 330, go(1.4), 1.4, { size: 15, color: C.grey, weight: 700 });
      k.act(me, "point", S.at - 1, 1.4, { at: [230, 170] });
      k.wait(.6);

      // ───── 🔮 预测：sun + flower = ? ─────
      D.step(5);
      N("预测：", "考考你：sun（太阳）+ flower（花）= ？先想 3 秒！");
      sayAt("Sun and flower make a new word.", { zh: "sun 和 flower 合成一个新词。", word: "sun flower" });
      P(k.roughRect(16, 410, 824, 120), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 410, 824, 120), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 sun（太阳）+ flower（花）=", 36, 462, go(1.2), 1.2, { size: 20, color: C.ink, weight: 900 });
      const qx = 36 + Math.round(k.estW("🔮 sun（太阳）+ flower（花）=", 20) * .92) + 10;
      const qm = D.sub(); T("？", qx, 466, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "sunflower = 向日葵（跟着太阳转的花）。");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      k.hlText("sunflower", qx, 464, 22, { mono: true, color: C.hlGreen });
      T("sunflower", qx, 464, go(.9), .9, { size: 22, color: C.green, weight: 900, font: M });
      const ax2 = qx + mw("sunflower", 22) + 18;
      T("向日葵", ax2, 464, go(.6), .6, { size: 20, color: C.green, weight: 900 });
      k.badge("📜", ax2 + 76, 462);
      T("（跟着太阳转的花）", 36, 506, go(.6), .6, { size: 15, color: C.grey, weight: 700 });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("The sunflower is yellow.", { zh: "向日葵是黄色的。", word: "sunflower" });
      N("口诀：", "国王外号叫蓝牙，为啥？打个问号；两个词一粘，新词就出来！");
      D.hold(2.5);

      // ───── 收尾金句卡 ─────
      k.quoteCard({ insight: "一千年前把丹麦连成一个国家的国王，\n今天在把你的手机和电脑连在一起——\n名字借来了故事的力量。", rhyme: "国王外号叫蓝牙，为啥？打个问号；\n两个词一粘，新词就出来！", hlLines: 2, foot: "📖 单词身世 · Bluetooth 蓝牙" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    actionWords: [
      { word: "unites", act: "国王举起双手欢呼，四个部落向中间靠拢合成一个王国" },
      { word: "connects", act: "蓝色信号线一段段画出来，把电脑、手机、耳机连在一起（场景）" },
    ],
    terms: [
      ["外号", "别人给起的名字。哈拉尔国王的外号叫「蓝牙」。"],
      ["部落", "古时候住在一起的一群人。统一 = 把很多部落合成一个国家。"],
      ["合成词", "两个词粘在一起成的新词：tooth + brush = toothbrush（牙刷）。"],
      ["卢恩字母", "古代北欧人用的字母，刻在石头上。蓝牙标志就是两个卢恩字母合在一起。"],
      ["意译 / 音译", "照着意思翻叫意译（蓝牙）；照着声音翻叫音译（欧罗巴）。"],
      ["可信度徽章", "📜 真实词源（查得到出处）· 💡 记忆联想 / 中文对照 · ✂️ 简化说法 · ⚠️ 有例外 · ❓ 有争议。"],
      ["🥚 彩蛋词", "超出小学课标的词，知道就好，不用背。"],
    ],
  },
];
