// ==================== 单词身世 · 格林定律章 ②③④：元音变异——三幕共用小工具（wo_vowel_kit）====================
// 三幕：cases/wo_vowel_a.js（原定律 A）、wo_vowel_b.js（原定律 B）、wo_vowel_c.js（原定律 C）。
// 来源：原王炸实验室「③ 格林音变律」（cases/vowel_shift.js；旧页签已于 2026-10-29 经用户确认删除，原文件见 git 历史 adb2106）按 R1 零丢失整体搬来，
//   逐条对照 grimm_law/VOWEL_SHIFT_INVENTORY.md（185 条）；讲错处按 R3 改正（出处 word_origins/SOURCES.md ⑤）：
//   ① 名字：不是「格林音变」——格林定律是辅音（见 wo_grimm），这里是元音变异（i-mutation）；
//   ② 定律 B：o→e 的真正原因也是 i 变异（古后缀 *-itho 里的 i），不是「嘴巴省力缩短」；width 是 1620 年代仿 breadth 造的；
//   ③ 定律 C：本土词的清浊交替来自古英语「f/th/s 夹在元音中间读浊音」；safe/save、use、advice/advise 是法语借词，看起来像规律，来历不同（⚠️）；
//   ④ blood 今天读 /ʌ/；full→fill 是形容词变动词。
// 每个英文词都有单独朗读 + 例句（R2）；动作词由讲解员演（R4）。
// 每个案例：build(k) 白板脚本 + terms 术语小词典。k 的工具见 WB 引擎（按调用顺序自动排时间）。
// 本页签局部小工具（不改引擎）：
var VW_KIT = {
  // 一行「原词 /音标/ → 变形 /音标/」；a、b = [单词, 音标, [[要标的字母, 第几个, 颜色], ...]]
  pairRow(k, x, y, a, b, o = {}) {
    const { C } = k, size = o.size || 22, cw = size * .6, ax = x + (o.ax || 175), bx = ax + 40;
    const m1 = k.mono(a[0], x, y, size, C.ink);
    if (a[1]) k.T(a[1], x + a[0].length * cw + 6, y, k.go(.4), .4, { size: 15, color: C.grey, font: WB.MONO, weight: 700 });
    k.arrow(ax, y - size * .32, ax + 28, y - size * .32, C.purple);
    const m2 = k.mono(b[0], bx, y, size, C.ink);
    if (b[1]) k.T(b[1], bx + b[0].length * cw + 6, y, k.go(.4), .4, { size: 15, color: C.grey, font: WB.MONO, weight: 700 });
    (a[2] || []).forEach(([s, n, c]) => k.underline(m1, s, n || 0, c || C.red));
    (b[2] || []).forEach(([s, n, c]) => k.underline(m2, s, n || 0, c || C.green));
    return { m1, m2 };
  },
  // 在等宽词的某几个字母外画圈
  ring(k, m, sub, nth = 0, color) {
    const x0 = m.x0(sub, nth), x1 = m.x1(sub, nth);
    k.P(k.ellipse((x0 + x1) / 2, m.y - m.size * .34, (x1 - x0) / 2 + m.size * .12, m.size * .52), k.go(.45), .45, { color: color || k.C.red, w: 3 });
  },
  // 普通文字（自动时长）
  txt(k, s, x, y, o = {}) {
    const dur = o.dur || Math.max(.5, k.estW(s, o.size || 17) / 220);
    k.T(s, x, y, k.go(dur), dur, { size: 17, color: k.C.grey, ...o });
  }
};

// 片头 + 讲解员（三幕共用）；sayAt 返回这句朗读的登记
VW_KIT.open = (k, o) => {
  k.v2();
  const S = k.S;
  k.titleCard({ title: o.title, sub: o.sub, badges: o.badges });
  k.header(o.sub, o.title, false);
  if (o.badges) k.badges(o.badges);
  const me = k.actor("narrator", { x: 1010, y: 540, s: .85, f: -1 });
  k.act(me, "walk", S.at, 1.4, { to: 920 }); k.act(me, "wave", S.at + 1.4, 1.4);
  return me;
};
VW_KIT.sayAt = (k, en, o) => { k.say(en, o); return k.S.says[k.S.says.length - 1]; };
VW_KIT.win = sy => [sy.t + sy.wd + .15, Math.max(.6, sy.dur - sy.wd - .3)];

