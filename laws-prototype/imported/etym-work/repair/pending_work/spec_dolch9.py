# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['cut'] = {
 'chain': [('Proto-Germanic', '*kutjaną', '切', '原始日耳曼语时期'),
           ('Middle English', 'cutten', '切；剪', '中古英语时期')],
 'fa': '约 1300 年见载 cutten（Etymonline；古英语期未见记载）',
 'orig': '切',
 'path': [('切', '中古英语时期', ''),
          ('切；剪', '现代', '主干义稳定：用利器分开东西。它一出现就顶替了古英语原有的 ceorfan（今 carve）、scieran（今 shear）等词，成为「切」的主力词（顶替旧词，词义稳定）')],
 'mech': 'cut 来自日耳曼语的 *kut- 一家，斯堪的纳维亚语里 kuti 就是「小刀」。',
 'link': '今天的意思「切」就是最早的意思，一路没变。',
 'disp': '传入路径两说：可能经斯堪的纳维亚语（古诺斯语 kuti「小刀」），也可能出自未见载的古英语 *cyttan（中古英语辞典说）；另有古法语 couteau「刀」说。三家一致的是：日耳曼语 *kut- 词根、中古英语约 1300 年始见、更早来源未定。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk', 'ox'], 'grade': 'et_wk_ox'}
S['laugh'] = {
 'chain': [('Proto-Indo-European', '*kleg-', '笑（拟声）', '原始印欧语时期'),
           ('Proto-Germanic', '*hlahjaną', '笑', '原始日耳曼语时期'),
           ('Old English', 'hlæhhan', '笑', '古英语时期'),
           ('Middle English', 'laughen', '笑', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 hlæhhan 起头）',
 'orig': '笑',
 'path': [('笑', '古英语时期', ''),
          ('大笑', '现代', '主干义稳定：出声地笑。它是拟声词——笑声「哈哈」凝成的词，希腊语 kakhazein、拉丁语 cachinnare 都是各语自己摹的同一种笑声（拟声造词，后世稳定）')],
 'mech': 'laugh 是把笑声写成的词：喉咙里的「哈」声，就是它的老根。',
 'link': '今天的意思「大笑」就是最早的意思，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['pick'] = {
 'chain': [('Proto-Germanic', '*pikkōną', '啄；刺', '原始日耳曼语时期'),
           ('Old English', '*piccian', '刺；啄', '古英语时期'),
           ('Middle English', 'piken', '啄；摘', '中古英语时期')],
 'fa': '古英语期已见同根的 picung「刺」（8 世纪注释）；动词 picken 约 1200 年代初见载（Etymonline）',
 'orig': '啄；刺',
 'path': [('啄；刺', '古英语时期', ''),
          ('采摘；挑选', '现代', '鸟啄食（13 世纪初）→ 用尖器扎、挖 → 用手指把果子「啄」下来：采摘（14 世纪初）→ 从一堆里啄出想要的：挑选（14 世纪晚期）（动作从鸟喙到手指再到眼光的连环比喻）')],
 'mech': 'pick 先是鸟的动作「啄」：人用手啄果子是采摘，用眼睛啄是挑选。',
 'link': '今天的意思「采摘；挑选」都从「啄」长出来：啄下来是摘，啄出一个是选。',
 'disp': '牛津词源栏标 of unknown origin，仅并列荷兰语 pikken、德语 picken、法语 piquer 对照；Etymonline 与 Wiktionary 主张日耳曼词根 *pikkōn-（或为拟声），可能受法语 piquer 影响。本档据两家的主干建档，牛津的审慎立场登记在此。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk', 'ox'], 'grade': 'et_wk_ox'}
S['to'] = {
 'chain': [('Proto-Indo-European', '*do-', '向；朝', '原始印欧语时期'),
           ('Proto-West Germanic', '*tō', '向；到', '原始西日耳曼语时期'),
           ('Old English', 'tō', '向；到', '古英语时期'),
           ('Middle English', 'to', '向；到', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 to 起头）',
 'orig': '向；到',
 'path': [('向；到', '古英语时期', ''),
          ('向；到', '现代', '主干义稳定：朝着目标去。古英语里它还替其他语言的「与格」干活；中古英语起又兼职不定式记号（to sleep 的 to，此时已无实义，纯语法标记）（词义稳定，语法功能扩大）')],
 'mech': 'to 是印欧语的老方向小词：朝着哪儿去，就用它指路。',
 'link': '今天的意思「向；到」就是最早的意思，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['for'] = {
 'chain': [('Proto-Indo-European', '*per-', '向前；在前', '原始印欧语时期'),
           ('Proto-Germanic', '*furi', '在……之前；为了', '原始日耳曼语时期'),
           ('Old English', 'for', '在……之前；因为，为了', '古英语时期'),
           ('Middle English', 'for', '为了', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 词条以古英语 for 起头）',
 'orig': '在……之前；因为',
 'path': [('在……之前；因为', '古英语时期', ''),
          ('为了；给；持续', '现代', '站在某人「面前」→ 替他出头：为了、给；面对一段时间：持续（时长）。古英语晚期已添「支持、赞成」，连词「因为」也出自 for þon þy「因为那（缘故）」的缩略（从空间在前到受益与原因的引申）')],
 'mech': 'for 的老根是「在前面」：站在前面护着谁，就是「为了」谁。',
 'link': '今天的意思「为了」从「在……之前」引申来：位置在前 → 立场在前。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['by'] = {
 'chain': [('Proto-Germanic', '*bi', '靠近；在旁；环绕', '原始日耳曼语时期'),
           ('Old English', 'bī', '在旁；靠近', '古英语时期'),
           ('Middle English', 'by', '在旁；被', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 bī 起头）',
 'orig': '靠近；在旁',
 'path': [('靠近；在旁', '古英语时期', ''),
          ('乘；在…旁；被', '现代', '本是地点小词「在旁边、环绕」；中古英语后义域大扩：经由、乘（交通工具）、不迟于、被（施动者）等，OED 列出 38 个义项——核心仍是「挨着、靠着」（词义扩展；其中「被」一义的转出过程，来源未专门交代）')],
 'mech': 'by 的老义是「在旁边」：挨着路走是「经由」，挨着的人出的手就成了「被」。',
 'link': '今天的意思都从「在旁边」扩出来：旁边的路、旁边的车、旁边出手的人。',
 'disp': '印欧层两说：Etymonline 作 *ambhi-「环绕」的弱化形 *bhi，Wiktionary 作 *h₁epi；日耳曼语主干（*bi「在旁」）三家一致，本档链止于日耳曼层。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk', 'ox'], 'grade': 'et_wk_ox'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, {})
    print('built:', ', '.join(promoted))
