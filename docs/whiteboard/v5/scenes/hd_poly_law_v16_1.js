// 多义词像一棵树 —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_poly_laws.json（laws_master V-16/V-41/V-42 headline_kid / mechanism / examples 全文照录，未另编例句）
// 角色关键帧：sprites/hdplv161.js（turn on → l_switch；第六波 2026-11-10 补，依据见 docs/work-2026-11-09/wave6_item2_acts_empty.md）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdplv161.js';
const ACTS = {"turn on": ["l_switch"]};
const ITEMS = [
  ['n', '一个词好几个意思，怎么记？'],
  ['w', 'eye'],
  ['s', 'I see with my eyes.', '我用眼睛看。', 'eye'],
  ['w', 'the eye of a needle'],
  ['s', 'The needle has an eye.', '针上有个针眼。', 'eye'],
  ['n', '同形异源是两棵树，不许硬连。'],
  ['w', 'light'],
  ['s', 'Turn on the light. This bag is light.', '打开灯。这个包很轻。', 'light'],
  ['n', '先认树干（最中心的意思），再顺着树枝认其他意思：它们都是从树干长出来的亲戚。'],
  ['w', '先认树干再认树枝'],
  ['w', '推不出的树枝就老实记'],
  ['w', '💡 一句话洞见'],
  ['w', '多义词像一棵树：树干是它最主要的意思，其他意思都是树枝——先认树干，树枝就好认了'],
];
export default function build() { return autoBuild(SP, { title: '多义词像一棵树', items: ITEMS, acts: ACTS }); }
