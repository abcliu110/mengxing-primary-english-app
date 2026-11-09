// 撞脸还是亲戚？塞进一句话验一验 —— v5.1 标准画法（决策 32，MASTER_DESIGN §2.9 / SOP §17；通用版面引擎 scenes/auto.js）
// 内容来源：docs/whiteboard/src/wb13/wb13_poly_laws.json（laws_master V-16/V-41/V-42 headline_kid / mechanism / examples 全文照录，未另编例句）
// 角色关键帧：ACTS 待配（wb13 未给动作帧登记，见 whiteboard_1.3_note.md 缺-7；不编造帧映射；后补帧只改 ACTS 与 units 登记）
import { autoBuild } from './auto.js';
import * as SP from '../sprites/hdplv411.js';
const ACTS = {};
const ITEMS = [
  ['n', 'bank 两张词卡——河岸 bank、银行 bank，长得一模一样，是一个词吗？'],
  ['w', 'bank'],
  ['s', 'The bank is by the river. I have money in the bank.', '河岸在河边。我把钱存在银行里。', 'bank'],
  ['n', '想知道两个意思是不是一家：把它们塞进同一句话试试。顺顺当当，多半是近亲；别扭得像笑话（河岸和银行一起『塌了』)，多半是撞脸或远亲。'],
  ['w', '河岸和银行一起「塌了」'],
  ['w', '银行义借自意大利语 banca（钱商长凳）'],
  ['w', '河岸义源出日耳曼/古诺尔斯一线'],
  ['s', 'An eye and the eye of a needle.', '一只眼睛和一个针眼。', 'eye'],
  ['w', 'run：OED3 动词 645 项'],
  ['w', 'run：OED 官网现行页 245 meanings'],
  ['w', 'run：学习词典（OALD9+COBUILD9）46 项'],
  ['w', '数字必须连口径一起说'],
  ['w', '💡 一句话洞见'],
  ['w', '塞进同一句只是验亲的直觉工具，不是判决机。'],
];
export default function build() { return autoBuild(SP, { title: '撞脸还是亲戚？塞进一句话验一验', items: ITEMS, acts: ACTS }); }
