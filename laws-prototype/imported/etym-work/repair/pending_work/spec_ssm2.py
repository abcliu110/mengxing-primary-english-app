# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['beyond'] = {
 'chain': [('Old English', 'beġeondan', '在……的那一边', '古英语时期'),
           ('Middle English', 'biyonde', '在……之外', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 begeondan 起头）',
 'orig': '在……的那一边',
 'path': [('在……的那一边', '古英语时期', ''),
          ('在……之外；超过', '现代', 'be-（在旁）＋ geond（那边，同 yonder）拼成：「在那一边」→ 14 世纪晚期「比……更远」→ 1530 年代「够不着、超出了」（从空间的对岸到程度的超出）')],
 'mech': 'beyond 是「在那边」：站在河这边，指着对岸，就是「在……之外」。',
 'link': '今天的意思「在……之外；超过」从「在那一边」来：先是地方的对岸，后是程度的过界。',
 'disp': '此复合形式不见于其他日耳曼语（Etymonline 注明），是英语自家的古英语拼法。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['fold'] = {
 'chain': [('Proto-Indo-European', '*pel-', '折叠', '原始印欧语时期'),
           ('Proto-Germanic', '*falþaną', '折叠', '原始日耳曼语时期'),
           ('Old English', 'fealdan', '折叠', '古英语时期'),
           ('Middle English', 'folden', '折叠', '中古英语时期')],
 'fa': '古英语时期就已经有了（Etymonline 与牛津词源栏都以古英语 fealdan 起头）',
 'orig': '折叠',
 'path': [('折叠', '古英语时期', ''),
          ('折叠；对折', '现代', '主干义稳定：把布折回来。14 世纪晚期添「（压力下）屈服、垮掉」——折过去的身子撑不住（动作到结果的引申）')],
 'mech': 'fold 的老根就是「折」：布折回来，纸对折，都是它。',
 'link': '今天的意思「折叠」就是最早的意思，一路没变。',
 'disp': '同形分立：名词 fold「羊圈」是另一个词（古英语 falæd「畜栏」，来源未定），不混档。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['gem'] = {
 'chain': [('Latin', 'gemma', '花芽；宝石', '拉丁语时期'),
           ('Old English', 'ġimm', '宝石', '古英语时期'),
           ('Middle English', 'gemme', '宝石', '中古英语时期')],
 'fa': '古英语已有 ġimm（直接借自拉丁语）；今形约 1300 年经古法语 gemme 定型（Etymonline）',
 'orig': '花芽；宝石',
 'path': [('花芽；宝石', '拉丁语时期', ''),
          ('宝石', '现代', '拉丁语 gemma 先指「鼓起的花芽」，也指宝石（两义同词的先后如此，这一步的缘由来源未交代）；英语借入时只取「宝石」一义，13 世纪晚期添比喻义「（人中）瑰宝」')],
 'mech': 'gem 在拉丁语里先是枝头鼓起的芽，后来宝石也叫了这个名，英语只借了宝石义。',
 'link': '今天的意思「宝石」就是拉丁语借入的那一义，一路没变。',
 'disp': 'gemma 的印欧层谱系两说并存（*gembh-「牙、钉」与 *gem-「压」，De Vaan 倾向前者而谓语义衔接勉强，见 Etymonline），本档链止于拉丁语。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['taught'] = {
 'chain': [('Proto-Germanic', '*taihtē', '教（的过去形）', '原始日耳曼语时期'),
           ('Old English', 'tāhte', '教（teach 的过去式）', '古英语时期'),
           ('Middle English', 'taught', '教（过去式）', '中古英语时期')],
 'fa': '古英语时期就已经有了（tāhte 为 tæcan「教」的过去式，Etymonline 与 Wiktionary 同载）',
 'orig': '教（teach 的过去式）',
 'path': [('教（teach 的过去式）', '古英语时期', ''),
          ('教（过去式与过去分词）', '现代', '词义无变化：taught 一直是 teach 的过去形（带 -ht 的老式弱变化过去式，同 caught 一家）；teach 本身的谱系另见其记录口径，本档只记过去形的形史')],
 'mech': 'taught 是 teach 的过去式：-ht 结尾的老变法留下来的形状。',
 'link': '今天的 taught 就是古英语 tāhte，意思一点没变。',
 'disp': '同形异词登记：旧拼 taught 曾兼指 taut「拉紧的」（Etymonline 注），与本词无关。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['told'] = {
 'chain': [('Proto-Germanic', '*talid-', '数；讲（的过去形）', '原始日耳曼语时期'),
           ('Old English', 'tealde', '讲（tell 的过去式）', '古英语时期'),
           ('Middle English', 'tolde', '讲（过去式）', '中古英语时期')],
 'fa': '古英语时期就已经有了（tealde 为 tellan「讲」的过去式，Etymonline 与 Wiktionary 同载）',
 'orig': '讲（tell 的过去式）',
 'path': [('讲（tell 的过去式）', '古英语时期', ''),
          ('讲（过去式与过去分词）', '现代', '词义无变化：told 是 tell 的过去形；它的祖先 *taljaną 本兼「数」与「讲」——把数目一五一十数出来，就是讲（tell 本词口径），told 只承「讲」的过去形')],
 'mech': 'told 是 tell 的过去式：数着说、说着数，是同一家。',
 'link': '今天的 told 就是古英语 tealde，意思一点没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['blew'] = {
 'chain': [('Proto-West Germanic', '*blē', '吹（的过去形）', '原始西日耳曼语时期'),
           ('Old English', 'blēow', '吹（blow 的过去式）', '古英语时期'),
           ('Middle English', 'blew', '吹（过去式）', '中古英语时期')],
 'fa': '古英语时期就已经有了（blēow 为 blow 的过去式，Etymonline 与 Wiktionary 同载）',
 'orig': '吹（blow 的过去式）',
 'path': [('吹（blow 的过去式）', '古英语时期', ''),
          ('吹（过去式）', '现代', '词义无变化：blew 一直是强变化动词 blow 的过去式（元音交替是其正规律）；blow 本词的谱系另见其记录口径，本档只记过去形的形史')],
 'mech': 'blew 是 blow 的过去式：强变化动词靠换元音表过去。',
 'link': '今天的 blew 就是古英语 blēow，意思一点没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['spoke'] = {
 'chain': [('Old English', 'spæc', '说（speak 的过去式）', '古英语时期'),
           ('Middle English', 'spake', '说（过去式）', '中古英语时期')],
 'fa': '古英语时期就已经有了（spæc 为 specan「说」的过去式，见 Etymonline 的 speak 词条与 Wiktionary）',
 'orig': '说（speak 的过去式）',
 'path': [('说（speak 的过去式）', '古英语时期', ''),
          ('说（过去式）', '现代', '词义无变化：spoke 是强变化动词 speak 的过去式（中古英语 spake/spoke 两形并行，后 spoke 胜出）；speak 本词的谱系另见其记录口径，本档只记过去形的形史')],
 'mech': 'spoke 是 speak 的过去式：元音 a 换 o，是老强变化的形状。',
 'link': '今天的 spoke 就是古英语 spæc 的后代，意思一点没变。',
 'disp': '同形分立：名词 spoke「轮辐」是另一个词（古英语 spāca），不混档。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}

R = {'rung': 'evidence_gap（主干复核后）：词库义为 ring 的过去分词；现有缓存来源只成段记载名词 rung「梯档」（古英语 hrung「横杆」，与动词形同形异词），ring 动词过去分词 rung 的形史未见成段记载，不凭通例补档，保持待核'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
