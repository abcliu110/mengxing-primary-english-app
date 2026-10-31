// 🗺️ 家庭与亲友 · 思维导图讲解 —— 决策 38 ⑪ 啊哈重做（开场「找不同」+ 导图；版式 scenes/auto.js 的 mindmapBuild，啊哈卡 lab/audit38/aha/11_hd_mindmap.md）
// 内容来源（R1 零丢失）：主文件 VOCAB_DB「家庭与亲友」旧交互导图的全部节点（「常用搭配 / 评价形容词」两框是首词的模板占位，按 R37-03 / 决策 38 删去）；分组表 v5/mindmap_groups.json；对照清单 lab/INVENTORY_HD_MINDMAP_10_V5.md
// 由 v5/gen_mindmap.py 生成，勿手改。角色关键帧：sprites/mindmap.js（25 幕共用）
import { mindmapBuild } from './auto.js';
import * as SP from '../sprites/mindmap.js';
const ACTS = {"*": ["l_speak", "l_point", "l_think", "l_idea0"]};
const GROUPS = [
  { name: '家人和客人', leaves: [
    ['👨 father', '父亲，爸爸', 'father'],
    ['👩 mother', '母亲，妈妈', 'mother'],
    ['👨‍👩‍👧‍👦 family', '家，家庭；家人', 'family'],
    ['🎁 guest', '客人，宾客', 'guest']
  ] },
  { name: '爷爷奶奶', leaves: [
    ['👴 grandfather', '（外）祖父，爷爷，外公', 'grandfather'],
    ['👵 grandmother', '（外）祖母，奶奶，外婆', 'grandmother']
  ] },
  { name: '兄弟姐妹', leaves: [
    ['👦 brother', '兄；弟', 'brother'],
    ['👧 sister', '姐；妹', 'sister'],
    ['👯 twin', '双胞胎之一', 'twin']
  ] },
  { name: '叔叔阿姨', leaves: [
    ['👩 aunt', '姑；姨；婶；伯母；舅母', 'aunt'],
    ['👨 uncle', '叔；伯；舅；姑父；姨父', 'uncle']
  ] },
  { name: '男和女', leaves: [
    ['👨 man', '成年男子，男人', 'man'],
    ['👩 woman', '成年女子，妇女', 'woman'],
    ['👦 boy', '男孩，男生', 'boy'],
    ['👨‍👦 men', '男人们（man的复数）', 'men'],
    ['👩‍👧 women', '女人们，妇女们（woman的复数）', 'women']
  ] }
];
export default function build() {
  return mindmapBuild(SP, { title: '🗺️ 家庭与亲友 · 思维导图讲解', center: '🌍 家庭与亲友', hint: '点击周围节点开卡学习', groups: GROUPS,
    odd: true,
    intro: '今天用一张思维导图学「家庭与亲友」：16 个单词分成 5 组。',
    outro: '点下面导图里的任意单词，打开词卡继续学',
    frames: {"speak": "l_speak", "point": "l_point", "think": "l_think", "idea": "l_idea0"} });
}
