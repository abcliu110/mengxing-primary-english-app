// 📖 单词身世 · 格林定律 · 1 —— 决策 38 ⑭ 啊哈重做（「时光机」，概念原语 lib/concept.js；啊哈卡 lab/audit38/aha/14_wo_grimm.md）
// 内容来源：旧版 src/cases/wo_grimm.js 案例 1（清单 lab/INVENTORY_WO_GRIMM_1_V5.md）：全部讲解字幕 / 朗读句原样（SEQ），板书要点进 KNOW。
// 画面：一家人的树（南边老辅音 p t d k / 北边挪一格 f th t h）→ 一台时光机：拉丁词投进去，先猜掉出来的英语小词 → pes→foot；
//       借来的大词 pedal 从机器上面绕过去（没进时光机）；tres / dent / decem / dual / centum / cardiac 一个个过机器；古罗马历月份条；格林是谁；中文对照；再猜 ped / pedestrian。
// 角色：不用人物帧（R4 修订）；sprites/wog1.js 为空包。
import { scene, OR, INK, GREY } from '../wb5.js';
import { concept, BLUE, GREEN, RED, FONT } from '../lib/concept.js';
import * as SP from '../sprites/wog1.js';
const ACTS = {};
const SEQ = [["n", "这一幕：为什么认识 foot（脚），就能猜出 pedal（脚踏板）？秘密叫「格林定律」。"], ["n", "可信度徽章：📜 = 查得到出处；⚠️ = 有例外；💡 = 中文对照，不是词源。"], ["n", "老祖宗：很久很久以前，欧洲很多语言是一家人，有同一个老祖宗（原始印欧语）。"], ["n", "什么时候：大约三千年前（公元前一千年左右），北边这一支的辅音整排换了位置。"], ["n", "借词：后来英语又从拉丁语借了很多「大词」——借来的词还是老辅音！"], ["n", "时光机：把拉丁语的 pes（脚）放进时光机：p 进去，出来变成 f——就是 foot！"], ["s", "Pes means foot.", "pes 的意思是脚。", "pes"], ["s", "We walk on our feet.", "我们用脚走路。", "foot"], ["n", "借来的大词：英语从拉丁语借来 pedal（脚踏板），借来的词没进时光机——还是 p！"], ["s", "My bike has two pedals.", "我的自行车有两个踏板。", "pedal"], ["n", "一排都挪：不止 p→f。t 变 th，d 变 t，k 变 h：一整排辅音都挪了一格！"], ["s", "Tres means three.", "tres 的意思是三。", "tres"], ["s", "My sister is three.", "我妹妹三岁。", "three"], ["s", "Three starts with th.", "three 以 th 开头。", "th"], ["s", "The dentist looks at my tooth.", "牙医检查我的牙。", "dentist tooth"], ["s", "December is the last month.", "十二月是最后一个月。", "December"], ["s", "I have ten fingers.", "我有十根手指。", "ten"], ["s", "Dual means two.", "dual 的意思是「双的」。", "dual"], ["s", "I have two hands.", "我有两只手。", "two"], ["s", "A century is one hundred years.", "一个世纪是一百年。", "century hundred"], ["s", "Cardiac means of the heart.", "cardiac 的意思是「心脏的」。", "cardiac"], ["s", "My heart is strong.", "我的心脏很强壮。", "heart"], ["n", "例外：格林定律不是百分之百整齐，有一些例外（后来别的学者解释了一部分）。"], ["n", "彩蛋：December 里藏着 decem（十）。可它是第十二个月呀？"], ["s", "Decem means ten.", "decem 的意思是十。", "decem"], ["n", "古罗马历：因为古罗马的历法从三月开始数：三月是第一个月，December 正好是第十个月！"], ["n", "格林是谁？格林定律的「格林」，就是编《格林童话》的格林兄弟里的哥哥——雅各布·格林。"], ["s", "Jacob Grimm wrote fairy tales and studied words.", "雅各布·格林写童话，也研究单词。", "Jacob Grimm"], ["n", "中文对照：中文也有「两套字」：说话用「脚」「牙」，书面大词用「足」「齿」（足球、牙齿）。"], ["n", "预测：考考你：p 变 f。ped 在英语小词里是谁？那 pedestrian 是什么人？先想 3 秒！"], ["n", "揭晓：ped = foot（脚）；pedestrian = 用脚走路的人，就是「行人」！"], ["s", "Ped means foot.", "ped 的意思是脚。", "ped"], ["s", "A pedestrian walks on foot.", "行人是走路的人。", "pedestrian"], ["n", "口诀：辅音挪一格：p 变 f，t 变 th，d 变 t，k 变 h；小词变了，大词没变！"]];
export const KNOW = [
"这一幕：为什么认识 foot（脚），就能猜出 pedal（脚踏板）？秘密叫「格林定律」。",
"可信度徽章：📜 = 查得到出处；⚠️ = 有例外；💡 = 中文对照，不是词源。",
"老祖宗：很久很久以前，欧洲很多语言是一家人，有同一个老祖宗（原始印欧语）。",
"什么时候：大约三千年前（公元前一千年左右），北边这一支的辅音整排换了位置。",
"借词：后来英语又从拉丁语借了很多「大词」——借来的词还是老辅音！",
"时光机：把拉丁语的 pes（脚）放进时光机：p 进去，出来变成 f——就是 foot！",
"Pes means foot.",
"pes 的意思是脚。",
"We walk on our feet.",
"我们用脚走路。",
"借来的大词：英语从拉丁语借来 pedal（脚踏板），借来的词没进时光机——还是 p！",
"My bike has two pedals.",
"我的自行车有两个踏板。",
"一排都挪：不止 p→f。t 变 th，d 变 t，k 变 h：一整排辅音都挪了一格！",
"Tres means three.",
"tres 的意思是三。",
"My sister is three.",
"我妹妹三岁。",
"Three starts with th.",
"three 以 th 开头。",
"The dentist looks at my tooth.",
"牙医检查我的牙。",
"December is the last month.",
"十二月是最后一个月。",
"I have ten fingers.",
"我有十根手指。",
"Dual means two.",
"dual 的意思是「双的」。",
"I have two hands.",
"我有两只手。",
"A century is one hundred years.",
"一个世纪是一百年。",
"Cardiac means of the heart.",
"cardiac 的意思是「心脏的」。",
"My heart is strong.",
"我的心脏很强壮。",
"例外：格林定律不是百分之百整齐，有一些例外（后来别的学者解释了一部分）。",
"彩蛋：December 里藏着 decem（十）。可它是第十二个月呀？",
"Decem means ten.",
"decem 的意思是十。",
"古罗马历：因为古罗马的历法从三月开始数：三月是第一个月，December 正好是第十个月！",
"格林是谁？格林定律的「格林」，就是编《格林童话》的格林兄弟里的哥哥——雅各布·格林。",
"Jacob Grimm wrote fairy tales and studied words.",
"雅各布·格林写童话，也研究单词。",
"中文对照：中文也有「两套字」：说话用「脚」「牙」，书面大词用「足」「齿」（足球、牙齿）。",
"预测：考考你：p 变 f。ped 在英语小词里是谁？那 pedestrian 是什么人？先想 3 秒！",
"揭晓：ped = foot（脚）；pedestrian = 用脚走路的人，就是「行人」！",
"Ped means foot.",
"ped 的意思是脚。",
"A pedestrian walks on foot.",
"行人是走路的人。",
"口诀：辅音挪一格：p 变 f，t 变 th，d 变 t，k 变 h；小词变了，大词没变！",
"格林定律：辅音挪一格",
"老祖宗（原始印欧语）",
"拉丁语、希腊语（南边）",
"辅音没变，还是老样子",
"p · t · d · k",
"日耳曼语（北边，英语的祖先）",
"辅音整排「挪了一格」",
"f · th · t · h",
"大约三千年前（公元前一千年左右）",
"小词 = 英语自己的（变了）· 大词 = 借来的（没变）",
"脚踏板（借来的，没变）",
"同一个老祖宗：p ↔ f",
"December = decem（十）+ …",
"古罗马：从三月开始数",
"Jacob Grimm（雅各布·格林）",
"《格林童话》的哥哥",
"1822 年把这条规律系统写出来",
"（1818 年丹麦学者拉斯克先发现）",
"英语：foot ↔ pedal",
"小词自己的 · 大词借来的",
"中文：脚 ↔ 足",
"口语字 · 书面字",
"💡 中文对照，不是同源",
"看见长长的大词别害怕：先找它藏着哪个小词！",
"ped = foot",
"pedestrian = 行人（用脚走路的人）",
"英语的祖先把一排辅音整体「挪了一格」，",
"借来的拉丁大词却没挪——",
"认识 foot，就能猜出 pedal。",
"p 变 f，t 变 th，d 变 t，k 变 h；",
"小词变了，大词没变！",
"📖 单词身世 · 格林定律（下一幕：元音变异）"
];
void ACTS;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const readT = s => { const str = String(s).replace(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF]/gu, ''); const cjk = (str.match(/[\u3400-\u9fff]/g) || []).length; const en = (str.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length; return Math.max(0.8, cjk / 5 + en / 2.2); };
const sayLen = en => en.split(/\s+/).length * 0.36 + 0.9;

export default function build() {
  const K = scene({ sprites: SP }), C = concept(K);
  C.aha({
    see: '一台时光机（齿轮在转）：左边投料口写着「拉丁语 · 老辅音」，右边出口写着「英语 · 挪一格」；拉丁词 pes（脚）被放进投料口',
    guess: 'p 进去，掉出来的英语小词会是什么？',
    reveal: '掉出来的是 foot：p 变成了 f；而借来的大词 pedal 从机器上面绕过去，还是 p。接着 tres→three、dent→tooth、decem→ten、dual→two、centum→hundred、cardiac→heart 一个个过机器',
    rule: '格林定律：辅音挪一格——p 变 f，t 变 th，d 变 t，k 变 h；小词变了，大词没变',
  });
  // 自带 z 的标签 / emoji（分段用板色遮罩清场，后面的东西 z 更高）
  const L = (str, x, y, { size = 40, col = INK, from = 0, out = null, z = 10, align = 'center', bold = false } = {}) => { C.TEXTS.push(str); K.prop((g, t) => { const a = clamp((t - from) / 0.35) * (out != null ? 1 - clamp((t - out) / 0.4) : 1); if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = FONT(size, bold); g.fillStyle = col; g.textAlign = align; g.textBaseline = 'alphabetic'; g.fillText(str, x, y); g.restore(); }, { from, z }); };
  const E = (em, x, y, size, from, z = 10) => K.prop((g, t) => { const a = clamp((t - from) / 0.4); if (a <= 0) return; g.save(); g.globalAlpha = a; g.font = `${size}px sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(em, x, y); g.restore(); }, { from, z });
  const wipe = (t, z) => K.prop((g, tt) => { const a = clamp((tt - t) / 0.5); g.save(); g.globalAlpha = a; g.fillStyle = '#FBFBFB'; g.fillRect(40, 110, 1840, 820); g.restore(); }, { from: t, z });
  let T = 0.3, i = 0;
  const step = () => { const s = SEQ[i++]; if (!s) return T;
    if (s[0] === 'n') { const d = Math.max(2.8, readT(s[1]) + 0.8); K.narr(s[1], T, T + d); T += d; }
    else { const Ls = Math.max(sayLen(s[1]), readT(s[2]) + 0.6); K.say(T, s[1], { zh: s[2], key: s[3] ? s[3].toLowerCase().split(/\s+/) : [], len: Ls }); T += Ls + 0.5; }
    return T; };
  L('📖 单词身世 · 格林定律（下一幕：元音变异）', 60, 1060, { size: 34, col: GREY, from: 0.2, align: 'left', z: 99 });
  L('格林定律：辅音挪一格', 960, 200, { size: 64, col: OR, from: 0.4, bold: true, z: 10 });
  step(); step();                                  // 0 开场、1 可信度徽章
  // ---- 一家人的树 ----
  const t2 = T;
  L('老祖宗（原始印欧语）', 960, 330, { size: 46, from: t2, bold: true, z: 10 });
  K.at(t2 + 0.4).line(960, 350, 560, 470, { col: GREY, w: 5 }); K.line(960, 350, 1360, 470, { col: GREY, w: 5 });
  L('拉丁语、希腊语（南边）', 560, 520, { size: 40, col: BLUE, from: t2 + 0.8, z: 10 }); L('辅音没变，还是老样子', 560, 580, { size: 32, col: GREY, from: t2 + 1.0, z: 10 });
  L('p · t · d · k', 560, 670, { size: 64, col: BLUE, from: t2 + 1.2, bold: true, z: 10 });
  L('日耳曼语（北边，英语的祖先）', 1360, 520, { size: 40, col: OR, from: t2 + 1.6, z: 10 }); L('辅音整排「挪了一格」', 1360, 580, { size: 32, col: GREY, from: t2 + 1.8, z: 10 });
  L('f · th · t · h', 1360, 670, { size: 64, col: OR, from: t2 + 2.0, bold: true, z: 10 });
  step();                                          // 2 老祖宗
  L('大约三千年前（公元前一千年左右）', 1360, 760, { size: 32, col: GREY, from: T, z: 10 }); step();   // 3
  L('小词 = 英语自己的（变了）· 大词 = 借来的（没变）', 960, 850, { size: 36, col: INK, from: T, z: 10 }); step();   // 4
  // ---- 时光机 ----
  const M0 = T; wipe(M0, 20);
  const MX = 960, MY = 470, MR = 170;
  K.prop((g, t) => { const a = clamp((t - M0 - 0.3) / 0.5); if (a <= 0) return; g.save(); g.globalAlpha = a; g.strokeStyle = INK; g.lineWidth = 7; g.fillStyle = '#fff7ed';
    g.beginPath(); g.roundRect(MX - 230, MY - 190, 460, 380, 40); g.fill(); g.stroke();
    g.translate(MX, MY); g.rotate(t * 1.3); g.strokeStyle = OR; g.lineWidth = 10; g.beginPath(); g.arc(0, 0, 90, 0, 7); g.stroke();
    for (let k = 0; k < 8; k++) { g.rotate(Math.PI / 4); g.fillStyle = OR; g.fillRect(84, -14, 34, 28); } g.restore();
    g.save(); g.globalAlpha = a; g.font = FONT(36, true); g.fillStyle = OR; g.textAlign = 'center'; g.fillText('⚙ 时光机 ⚙', MX, MY - 210); g.font = FONT(30); g.fillStyle = GREY; g.fillText('三千年', MX, MY + 240); g.restore(); }, { from: M0 + 0.3, z: 21 });
  C.TEXTS.push('⚙ 时光机 ⚙', '三千年');
  L('拉丁语 · 老辅音', 330, 300, { size: 38, col: BLUE, from: M0 + 0.5, z: 21 }); L('英语 · 挪一格', 1590, 300, { size: 38, col: OR, from: M0 + 0.6, z: 21 });
  K.at(M0 + 0.8).arrow(560, MY, MX - 240, MY, { col: BLUE, w: 6 }); K.arrow(MX + 240, MY, 1360, MY, { col: OR, w: 6 });
  // 过机器：拉丁词从左进，消失；英语词从右出
  const pass = (lat, zh1, eng, zh2, rule, t, z = 22) => {
    const c = C.chip({ text: lat, x: 330, y: MY, size: 56, from: t, col: BLUE, bd: BLUE, z, path: [[t + 0.6, MX - 120, MY, 0.7]], out: t + 1.4 });
    void c; L(zh1, 330, MY + 80, { size: 30, col: GREY, from: t, out: t + 1.4, z });
    return t + 1.4;
  };
  const outW = (eng, zh2, rule, t, y = MY, z = 22, keep = null) => { C.chip({ text: eng, x: 1590, y, size: 60, from: t, col: OR, bd: OR, bold: true, z, path: [[t, MX + 160, y, 0.01], [t + 0.05, 1590, y, 0.6, 'back']], out: keep }); L(zh2, 1590, y + 80, { size: 30, col: GREY, from: t + 0.3, z, out: keep }); L(rule, 1590, y - 90, { size: 44, col: OR, from: t + 0.2, z: z + 1, bold: true, out: keep }); };
  T = M0 + 1.4;
  const tIn = pass('pes', '（脚）', null, null, null, T);
  T = C.predict(tIn - 0.4, { q: 'p 进去，掉出来的英语小词会是什么？', sec: 4 });
  outW('foot', '（脚）', 'p → f', T + 0.2);
  step(); step(); step();                           // 5 时光机、6 Pes means foot、7 feet
  // pedal 绕过去
  const tP = T;
  C.chip({ text: 'pedal', x: 330, y: 760, size: 52, from: tP, col: BLUE, bd: BLUE, z: 22, path: [[tP + 0.4, 960, 200 + 40, 1.2], [tP + 1.6, 1590, 760, 1.0]] });
  L('脚踏板（借来的，没变）', 1590, 840, { size: 30, col: GREY, from: tP + 2.6, z: 22 });
  L('同一个老祖宗：p ↔ f', 1590, 900 - 10, { size: 32, col: OR, from: tP + 2.8, z: 22 });
  step(); step();                                   // 8 借来的大词、9 pedals
  C.rule(T);
  // 一排都挪：清场 → 其余词对一个个过机器，右边结果列累积
  const R0 = T; wipe(R0, 30);
  K.prop((g, t) => { const a = clamp((t - R0 - 0.2) / 0.4); if (a <= 0) return; g.save(); g.globalAlpha = a; g.strokeStyle = INK; g.lineWidth = 6; g.fillStyle = '#fff7ed'; g.beginPath(); g.roundRect(780, 340, 360, 300, 36); g.fill(); g.stroke();
    g.translate(960, 490); g.rotate(t * 1.3); g.strokeStyle = OR; g.lineWidth = 9; g.beginPath(); g.arc(0, 0, 70, 0, 7); g.stroke(); for (let k = 0; k < 8; k++) { g.rotate(Math.PI / 4); g.fillStyle = OR; g.fillRect(66, -11, 26, 22); } g.restore(); }, { from: R0 + 0.2, z: 31 });
  L('借来的大词（老辅音）', 380, 260, { size: 36, col: BLUE, from: R0 + 0.3, z: 31 }); L('英语小词（挪了一格）', 1540, 260, { size: 36, col: OR, from: R0 + 0.3, z: 31 });
  step();                                           // 10 一排都挪
  const PAIRS = [['tres', '（拉丁语：三）', 'three', '三', 't → th', 3], ['dentist', '牙医', 'tooth', '牙', 'd → t', 1], ['December', '（原来是第十个月）', 'ten', '十', 'd → t', 2], ['dual', '双的', 'two', '二', 'd → t', 2], ['century', '一百年', 'hundred', '一百', 'k → h', 1], ['cardiac', '心脏的', 'heart', '心', 'k → h', 2]];
  PAIRS.forEach(([lat, z1, eng, z2, rule, nsay], k) => {
    const t = T, y = 330 + k * 95;
    C.chip({ text: lat, x: 380, y, size: 44, from: t, col: BLUE, bd: BLUE, z: 32 }); L(z1, 380, y + 50, { size: 24, col: GREY, from: t, z: 32 });
    C.chip({ text: eng, x: 1540, y, size: 48, from: t + 0.9, col: OR, bd: OR, bold: true, z: 32 }); L(z2, 1540, y + 50, { size: 24, col: GREY, from: t + 0.9, z: 32 });
    L(rule, 960, y + 14 > 640 ? y + 14 : 690, { size: 34, col: OR, from: t + 0.5, out: t + 0.5 + 2.4, z: 33, bold: true });
    K.prop((g, tt) => { const p = clamp((tt - t - 0.1) / 0.8); if (p <= 0 || p >= 1) return; g.save(); g.font = FONT(36); g.fillStyle = BLUE; g.textAlign = 'center'; g.globalAlpha = 1 - p; g.fillText(lat[0], 520 + (780 - 520) * p, y); g.restore(); }, { from: t, z: 33 });
    for (let q = 0; q < nsay; q++) step();
  });
  step();                                           // 22 例外
  L('⚠️ 有例外', 960, 900 - 10, { size: 36, col: RED, from: T - 2.4, z: 33 });
  C.TEXTS.push('📜 真实词源', '💡 记忆联想');
  // ---- 彩蛋：December + 古罗马历 ----
  const D0 = T; wipe(D0, 40);
  L('December = decem（十）+ …', 960, 300, { size: 56, col: OR, from: D0 + 0.3, bold: true, z: 41 });
  step(); step();                                   // 23 彩蛋、24 Decem means ten
  const MON = ['三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '一', '二'];
  const tM = T;
  MON.forEach((m, k) => { const x = 230 + k * 132; const hi = m === '十二';
    C.chip({ text: m, x, y: 520, size: 40, from: tM + k * 0.15, z: 41, col: hi ? OR : INK, bd: hi ? OR : GREY });
    L(String(k + 1), x, 620, { size: 44, col: hi ? OR : GREY, from: tM + 0.4 + k * 0.15, z: 41, bold: hi }); });
  L('古罗马：从三月开始数', 960, 720, { size: 40, col: OR, from: tM + 2.0, z: 41 });
  L('十二月 = 第 10 个 → decem', 1550, 700 + 80, { size: 32, col: OR, from: tM + 2.4, z: 41 });
  step();                                           // 25 古罗马历
  // ---- 格林是谁 ----
  const G0 = T; wipe(G0, 50);
  E('📚', 560, 520, 220, G0 + 0.3, 51);
  ['Jacob Grimm（雅各布·格林）', '《格林童话》的哥哥', '1822 年把这条规律系统写出来', '（1818 年丹麦学者拉斯克先发现）'].forEach((s, k) => L(s, 1180, 380 + k * 90, { size: k ? 36 : 48, col: k ? INK : OR, from: G0 + 0.4 + k * 0.4, z: 51, bold: !k }));
  step(); step();                                   // 26、27
  // ---- 中文对照 ----
  const Z0 = T; wipe(Z0, 60);
  L('英语：foot ↔ pedal', 560, 420, { size: 50, col: OR, from: Z0 + 0.3, z: 61 }); L('小词自己的 · 大词借来的', 560, 490, { size: 32, col: GREY, from: Z0 + 0.5, z: 61 });
  L('中文：脚 ↔ 足', 1360, 420, { size: 50, col: BLUE, from: Z0 + 0.8, z: 61 }); L('口语字 · 书面字', 1360, 490, { size: 32, col: GREY, from: Z0 + 1.0, z: 61 });
  L('💡 中文对照，不是同源', 960, 600, { size: 36, col: GREY, from: Z0 + 1.3, z: 61 });
  L('看见长长的大词别害怕：先找它藏着哪个小词！', 960, 700, { size: 40, col: INK, from: Z0 + 1.6, z: 61 });
  step();                                           // 28
  // ---- 再猜：ped / pedestrian ----
  const P0 = T; wipe(P0, 70);
  step();                                           // 29 预测（字幕）
  const pc = C.chip({ text: 'ped', x: 560, y: 450, size: 70, from: P0 + 0.3, col: BLUE, bd: BLUE, z: 71 });
  const pd = C.chip({ text: 'pedestrian', x: 1300, y: 450, size: 70, from: P0 + 0.5, col: BLUE, bd: BLUE, z: 71 });
  T = C.predict(T, { q: 'p 变 f：ped 是哪个小词？pedestrian 是什么人？', sec: 4 });
  C.swap(pc, T + 0.2, 'ped = foot', OR, '#fff', OR); C.swap(pd, T + 0.6, 'pedestrian = 行人', OR, '#fff', OR);
  L('ped = foot', 560, 560, { size: 34, col: GREY, from: T + 0.4, z: 71 }); L('pedestrian = 行人（用脚走路的人）', 1300, 560, { size: 34, col: GREY, from: T + 0.8, z: 71 });
  E('🚶', 1300, 720, 140, T + 1.0, 71);
  step(); step(); step();                           // 30 揭晓、31、32
  // ---- 口诀 + 洞见 ----
  const F0 = T; wipe(F0, 80);
  ['💡 一句话洞见', '英语的祖先把一排辅音整体「挪了一格」，', '借来的拉丁大词却没挪——', '认识 foot，就能猜出 pedal。', '🎵 口诀', 'p 变 f，t 变 th，d 变 t，k 变 h；', '小词变了，大词没变！'].forEach((s, k) => L(s, 960, 250 + k * 88, { size: k === 0 || k === 4 ? 40 : 46, col: k === 0 || k === 4 ? OR : INK, from: F0 + 0.3 + k * 0.3, z: 81 }));
  step();                                           // 33 口诀
  K.end(T + 2.0);
  return C.finish();
}
