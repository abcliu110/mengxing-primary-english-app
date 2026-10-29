// ==================== 🔀 中英对照总枢 · 正迁移：这些你已经会了（ze_same）（v2 + 讲解员）====================
// 设计：docs/whiteboard/zh_en_hub/DESIGN.md「正迁移」。先讲一样的：主谓宾顺序、形容词放名词前、数字放名词前、「会 + 动词」。
// 一样里面的小不同（three books 要加 -s、He likes 要加 -s）用 ⚠️ 标出来，留给「单复数和时态要上身」一幕细讲。
// 配色只用 V3 四色（ink / red / green / blue）。
// 徽章：💡 = 中英对照 / 记忆说法（不是历史词源）；⚠️ = 有要注意的地方。
WB_LAB.ze_same = [
  {
    build(k) {
      k.v2();
      const { N, T, P, F, go } = k, D = WO_PROPS(k), M = D.MONO, C = k.PAL, S = k.S;
      const sayAt = (en, o) => { k.say(en, o); return S.says[S.says.length - 1]; };
      const win = sy => [sy.t + sy.wd + .15, sy.dur - sy.wd - .3];
      const me = k.actor("narrator", { x: 1010, y: 538, s: 1.15, f: -1 });
      // 一行中英对照：中文块在上、英文块在下，同色块对齐，中间画竖线表示「顺序一样」
      const pair = (y, zh, en, cols) => {
        let x = 60;
        zh.forEach((z, i) => {
          const w = Math.max(k.estW(z, 24), k.estW(en[i], 24) * 1.05) + 28;
          P(k.roughRect(x, y - 30, w, 42), go(.35), .35, { color: cols[i], w: 2.2 });
          F(k.rectD(x, y - 30, w, 42), go(.08, 0), { color: "#ffffff", op: .9 });
          T(z, x + w / 2, y - 1, go(.3), .3, { size: 24, color: cols[i], weight: 900, anchor: "middle" });
          P(k.wl(x + w / 2, y + 16, x + w / 2, y + 44, .2), go(.2), .2, { color: C.grey, w: 2 });
          T(en[i], x + w / 2, y + 74, go(.4), .4, { size: 24, color: cols[i], weight: 900, font: M, anchor: "middle" });
          x += w + 16;
        });
        return x;
      };
      N("", "这一幕：学英语不全是「新东西」——有好多地方，中文和英语本来就一样！");
      k.act(me, "walk", .3, 1.6, { to: 892 });
      k.act(me, "wave", 2.0, 1.8);
      D.scene({ title: "这些你已经会了", sub: "🔀 中英对照 · 正迁移", badges: ["💡", "⚠️"], steps: ["① 中文", "② 对一对", "③ 英语", "④ 例子", "⑤ 口诀", "🔮 预测"] });
      N("正迁移：", "中文里已经会的本领，直接搬到英语里也对，就叫正迁移。先讲一样的，再讲不一样的。");
      k.wait(.6);

      // ───── 镜头 1 · 谁 + 做什么 + 什么：顺序一样 ─────
      D.step(0); D.shot();
      N("中文：", "「我爱妈妈」：谁（我）+ 做什么（爱）+ 对谁（妈妈）。");
      const x1 = pair(150, ["我", "爱", "妈妈"], ["I", "love", "my mom"], [C.blue, C.red, C.green]);
      D.step(1);
      N("对一对：", "英语也是「谁 + 做什么 + 对谁」，一个萝卜一个坑，顺序完全一样！");
      T("顺序一样 ✔", x1 + 10, 190, go(.6), .6, { size: 20, color: C.green, weight: 900 });
      k.badge("💡", x1 + 10 + k.estW("顺序一样 ✔", 20) + 8, 186);
      D.step(2);
      sayAt("I love my mom.", { zh: "我爱妈妈。", word: "I love my mom" });
      k.act(me, "point", S.at - 1.4, 1.4, { at: [200, 220] });
      sayAt("My mom loves me.", { zh: "妈妈爱我。", word: "loves me" });
      k.wait(.6);
      D.wipe();

      // ───── 镜头 2 · 形容词放名词前面：一样 ─────
      D.step(3); D.shot();
      N("形容词：", "「红苹果」「大猫」：颜色、大小放在东西前面，英语也一样。");
      pair(150, ["红", "苹果"], ["red", "apple"], [C.red, C.green]);
      T("a red apple", 420, 150, go(.6), .6, { size: 24, color: C.ink, weight: 900, font: M });
      T("a big cat", 420, 210, go(.5), .5, { size: 24, color: C.ink, weight: 900, font: M });
      sayAt("A red apple. A big cat.", { zh: "一个红苹果。一只大猫。", word: "a red apple big cat a red apple a big cat" });
      N("⚠️ 小提醒：", "只有一两个词的修饰才放前面；长的修饰要挂到后面（看「修饰语位置」那一幕）。");
      T("⚠️ 长修饰挂后面：the boy in blue", 420, 270, go(.8), .8, { size: 16, color: C.red, weight: 900 });
      sayAt("The boy in blue is my friend.", { zh: "穿蓝衣服的男孩是我的朋友。", word: "the boy in blue friend is" });
      k.wait(.5);
      D.wipe();

      // ───── 镜头 3 · 数字放前面 + 「会」：一样（-s 是小不同）─────
      D.shot();
      N("数字：", "「三本书」：数字放在前面，英语也一样——只是英语的 book 要变成 books。");
      pair(150, ["三", "本书"], ["three", "books"], [C.ink, C.green]);
      T("⚠️ 两个以上要加 -s", 420, 150, go(.6), .6, { size: 17, color: C.red, weight: 900 });
      sayAt("Three books. One book.", { zh: "三本书。一本书。", word: "three books one book s", blocks: ["s"] });
      N("会 + 动词：", "「我会跳」：我 + 会 + 跳，英语 I + can + jump，顺序还是一样！");
      pair(330, ["我", "会", "跳"], ["I", "can", "jump"], [C.blue, C.red, C.red]);
      const syJ = sayAt("I can jump. Look, I jump!", { zh: "我会跳。看，我跳起来了！", word: "can jump" });
      { const [w0, wd] = win(syJ); k.act(me, "jump", w0, Math.min(1.2, wd), { words: ["jump"] }); }
      k.wait(.6);
      D.wipe();

      // ───── 口诀 ─────
      D.step(4); D.shot();
      N("口诀：", "谁做什么顺序同，颜色大小放前头，数字在前加个 s！");
      T("谁 + 做什么 + 什么：顺序一样", 60, 150, go(.8), .8, { size: 22, color: C.blue, weight: 900 });
      T("颜色、大小放前面：一样", 60, 200, go(.8), .8, { size: 22, color: C.red, weight: 900 });
      T("数字放前面：一样（两个以上加 -s ⚠️）", 60, 250, go(.9), .9, { size: 22, color: C.ink, weight: 900 });
      k.act(me, "nod", S.at - .5, .8);
      k.wait(.8);

      // ───── 🔮 预测 ─────
      D.step(5);
      N("预测：", "考考你：「他喜欢小狗」用英语怎么说？顺序一样，再想想要加哪个 -s！先想 3 秒。");
      P(k.roughRect(16, 430, 824, 100), go(.8), .8, { color: C.green, w: 2.5 });
      F(k.rectD(16, 430, 824, 100), go(.2, 0), { color: C.tintGreen, op: .9 });
      T("🔮 他喜欢小狗 = ？", 36, 470, go(1), 1, { size: 20, color: C.ink, weight: 900 });
      const qm = D.sub(); T("？", 300, 474, go(.3), .3, { size: 32, color: C.red, weight: 900 }); D.back();
      k.act(me, "think", S.at, 3.1);
      D.hold(3);
      N("揭晓：", "He likes dogs. 顺序和中文一样；他一个人，likes 要加 -s；小狗不止一只，dogs 也加 -s。");
      const tRev = go(.3);
      k.fade(qm, tRev, .3, 0);
      k.hlText("He likes dogs.", 300, 472, 22, { mono: true, color: C.hlGreen });
      T("He likes dogs.", 300, 472, go(1), 1, { size: 22, color: C.green, weight: 900, font: M });
      T("（likes、dogs 都有 -s）", 36, 510, go(.6), .6, { size: 15, color: C.grey, weight: 700 });
      k.act(me, "cheer", tRev + .4, 1.3); k.sfx("ding", tRev + .9);
      sayAt("He likes dogs.", { zh: "他喜欢小狗。", word: "He likes dogs" });
      D.hold(2.5);

      k.quoteCard({ insight: "中文已经会的本领，很多能直接用：\n谁 + 做什么 + 什么，顺序一样；\n颜色、大小、数字都放前面。", rhyme: "谁做什么顺序同，\n数字在前加个 s！", hlLines: 2, foot: "🔀 中英对照 · 正迁移" });
      k.act(me, "nod", S.at - 1.2, 1); k.expr(me, "proud", S.at - 1.2, 9);
      D.hold(2.5);
      D.finish(.42);
    },
    actionWords: [
      { word: "jump", act: "讲解员蓄力跳起来（jump）" },
    ],
    terms: [
      ["正迁移", "中文里已经会的本领，搬到英语里也对。比如「谁 + 做什么 + 什么」的顺序，中英文一样。"],
      ["负迁移", "把中文的习惯硬搬进英语，结果说错了。比如照「我是喜欢」说成 I am like。"],
      ["形容词", "说明颜色、大小、样子的词：red、big。一两个词的形容词放在名词前面。"],
      ["-s", "名词两个以上要加 -s（books、dogs）；he / she 做主语时，动词也要加 -s（likes）。"],
      ["可信度徽章", "💡 中英对照 / 记忆说法 · ⚠️ 有要注意的地方 · 📜 有出处的历史 · ✂️ 简化说法 · ❓ 有争议。"],
    ],
  },
];
