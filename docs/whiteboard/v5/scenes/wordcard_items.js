// 普通单词卡通用白板模板：词条数据 → auto.js ITEMS（纯函数，App 运行时与离线验收共用同一份代码）
// 设计：docs/whiteboard/DESIGN_MINDMAP_WORDCARD.md §2。R1：旧 wordModalCanvas 非多义分支的全部文字（完整原句，不截断）每幕都在；字段缺失就跳过，不补写。
export const ACT_FRAMES = [
  { '*': ['l_books', 'l_read', 'l_think'] },
  { '*': ['l_point', 'l_idea0', 'l_think'] },
  { '*': ['l_speak', 'l_hand0', 'l_laugh'] },
];
export const ACT_NAMES = ['词源与音节拆解', '积木构词与搭配', '汉英句法防坑'];
const str = x => (x == null ? '' : String(x)).replace(/\s+/g, ' ').trim();
export function wordParts(w) {
  const ss = w.senses || [];
  const s0 = ss[0] || { pos: w.pos, meaning: w.meaning, ex_en: w.example_en, ex_zh: w.example_zh };
  const co = w.collocations || {};
  const verbs = (co.verbs && co.verbs.slice(0, 3).join(' / ')) || w.word;
  const ety = str(str(w.etymology).replace('📖 【秒懂造词小故事】', '').replace('📖 【秒懂巧记小故事】', ''));
  const aff = str(w.affix_root).replace('🧩 ', '');
  const fam = aff.split('｜').slice(1).join('｜').trim();
  return {
    title: '词源与构词原理',
    banner: `${w.emoji} ${w.word} ${w.phonetic} — 【${w.pos}】${w.meaning}`,
    sub: str(w.affix_root || w.memory_tip),
    bench: `🔬 『${w.word}』三维深度解剖：象形词源 × 构词家族 × 汉英句法防坑`,
    box1: [`① 词源与音节拆解：【${w.syllables}】${str(w.memory_tip)}`, ety],
    box2: [`② 积木构词与搭配：${aff.split('｜')[0]}`, fam ? `🧩 构词家族：${fam}` : '', `常用搭配动词：${verbs}`,
      co.adjs && co.adjs.length ? `常用搭配：${co.adjs.join(' / ')}` : ''],
    box3: [`③ 地道例句：${s0.ex_en} (${s0.ex_zh})`, str(w.syntax_contrast), str(w.spelling_alert) ? `✏️ 拼写提醒：${str(w.spelling_alert)}` : ''],
    s0, ss,
  };
}
// 幕 a（0–2）：标题 → 横幅 → 本幕重点框（加一句朗读）→ 另两个框 → 例句朗读
export function wordItems(w, a) {
  const P = wordParts(w), items = [];
  const W = t => { if (str(t)) items.push(['w', str(t)]); };
  W(P.title); W(P.banner); W(P.sub); W(P.bench);
  items.push(['n', `精讲第${a + 1}幕：${ACT_NAMES[a]}`]);
  const boxes = [P.box1, P.box2, P.box3];
  [a, ...[0, 1, 2].filter(i => i !== a)].forEach((bi, k) => {
    boxes[bi].forEach(W);
    if (k) return;
    const v0 = str(w.collocations && w.collocations.verbs && w.collocations.verbs[0]);
    if (bi === 1 && /[A-Za-z]{2}/.test(v0) && v0 !== str(P.s0.ex_en)) items.push(['s', v0, `常用搭配：${v0}`]);
    if (bi === 2) P.ss.slice(1).forEach(s => { if (str(s.ex_en)) items.push(['s', str(s.ex_en), `${s.pos} ${s.meaning}：${str(s.ex_zh)}`]); });
  });
  W(`精讲第${a + 1}幕`);
  items.push(['s', str(P.s0.ex_en), `${w.word} (${w.pos} ${w.meaning})：${str(P.s0.ex_zh)}`]);
  // 去重：一行白板字若已整句包含在另一行里（如记忆锦囊既单独成行又在「① 词源与音节拆解：…」里），只写长的那行（R1 仍一字不差）
  const ws = items.filter(it => it[0] === 'w').map(it => it[1]);
  return items.filter(it => it[0] !== 'w' || it[1].length < 4 || !ws.some(o => o !== it[1] && o.includes(it[1])));
}
// R1 清单：旧舞台上这一幕的全部文字（完整原句）
export function wordInventory(w, a) {
  const P = wordParts(w);
  return [P.title, P.banner, P.sub, P.bench, P.box1[0], P.box1[1], P.box2[0], P.box2[2], P.box3[0], P.box3[1], `精讲第${a + 1}幕`,
    str(P.s0.ex_en), `${w.word} (${w.pos} ${w.meaning})：${str(P.s0.ex_zh)}`].filter(x => str(x));
}
