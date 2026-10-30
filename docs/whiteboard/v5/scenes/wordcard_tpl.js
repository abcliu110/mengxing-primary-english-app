// 普通单词卡通用白板模板（DESIGN_MINDMAP_WORDCARD.md §2）：父页面在 srcdoc 里注入 globalThis.__WB5_WORD__（词条）与 __WB5_ACT__（0–2），这里现场排版。
// 不注入时显示示例词 apple，便于单独预览。角色帧：sprites/wordtpl.js（全部词共用）。
import { autoBuild } from './auto.js';
import * as SP from '../sprites/wordtpl.js';
import { wordItems, ACT_FRAMES, ACT_NAMES } from './wordcard_items.js';
const DEMO = {"id":"G1_037","word":"apple","phonetic":"/ˈæpl/","syllables":"ap-ple","pos":"n.","meaning":"苹果","emoji":"🍎","senses":[{"pos":"n.","meaning":"苹果","ex_en":"An apple a day keeps the doctor away.","ex_zh":"一天一苹果，医生远离我。"}],"collocations":{"verbs":["An apple a day keeps the doctor away."],"adjs":["a apple","the apple","my apple"]},"spelling_alert":"","memory_tip":"a像圆圆的苹果带着小叶子","example_en":"An apple a day keeps the doctor away.","example_zh":"一天一苹果，医生远离我。","etymology":"📖 【秒懂巧记小故事】🍎 ap-ple：圆圆红红、咬一口咔嚓脆的“苹果”，西方有句老话：An apple a day keeps the doctor away（一天一苹果，医生远离我）！","affix_root":"🧩 【基础独体词】音节拼读：ap-ple（巧记：a像圆圆的苹果带着小叶子）","syntax_contrast":"可数名词单数前面要加 a、an、the 或 my。数量超过 1 时，词尾一般加 -s。giraffe 和 kangaroo 只加 -s。"};
export default function build() {
  const w = globalThis.__WB5_WORD__ || DEMO, a = Math.max(0, Math.min(2, globalThis.__WB5_ACT__ | 0));
  return autoBuild(SP, { title: `🔬 ${w.word} · 精讲第${a + 1}幕 · ${ACT_NAMES[a]}`, items: wordItems(w, a), acts: ACT_FRAMES[a] });
}
