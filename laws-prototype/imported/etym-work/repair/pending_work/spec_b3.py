# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['giraffe'] = {
 'chain': [('Classical Persian', 'zurnāpā', '长颈鹿（字面：笛腿）', '波斯语时期'),
           ('Arabic', 'zarāfa', '长颈鹿', '阿拉伯语时期'),
           ('Italian', 'giraffa', '长颈鹿', '意大利语时期'),
           ('English', 'giraffe', '长颈鹿', '16 世纪末')],
 'fa': '1590 年代见载（Etymonline：1590s, giraffa，经意大利语自阿拉伯语）',
 'orig': '长颈鹿',
 'path': [('长颈鹿', '阿拉伯语时期', ''),
          ('长颈鹿', '现代', '阿拉伯语 zarāfa 或出非洲语言；更深一层波斯语 zurnāpā 字面「笛子腿」——腿长如笛；中世纪英语拼法五花八门（gerfauntz 曾与 olifaunt「大象」相混），它顶掉了旧名 camelopard「骆驼豹」（借词守恒）')],
 'mech': 'giraffe 是「笛子腿」：波斯人看它先看到腿。',
 'link': '今天的意思「长颈鹿」就是本义，一路没变。',
 'disp': '阿拉伯语词本身的更深来源作「或出非洲语言」（probably from an African language)。',
 'folk': '中古拼法 gerfauntz 与「大象」olifaunt 相混，是拼写层面的历史混淆，已如实登记', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['grape'] = {
 'chain': [('Proto-Indo-European', '*ger-', '转；弯', '原始印欧语时期'),
           ('Frankish', '*krappō', '钩', '法兰克语时期'),
           ('Old French', 'graper', '（用钩）采摘', '古法语时期'),
           ('Middle English', 'grape', '葡萄', '中古英语时期')],
 'fa': '13 世纪中期进入英语（Etymonline：mid-13c.，义为「葡萄（一颗/一串）」）',
 'orig': '（一串）葡萄',
 'path': [('（一串）葡萄', '古法语时期', ''),
          ('葡萄', '现代', 'OF grape 或为 graper「钩摘葡萄」的逆构：钩（*krappō，源于「弯」）→摘→果——它顶掉了古英语本族词 wīnberġe「酒莓」（由工具名到果名）')],
 'mech': 'grape 的老祖宗是把钩子：钩子摘的，就是葡萄。',
 'link': '今天的意思「葡萄」从「钩摘之物」凝固而来。',
 'disp': 'OF grape 的逆构说作 probably（Etymonline/牛津并同）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['snow'] = {
 'chain': [('Proto-Indo-European', '*sniegwh-', '雪；下雪', '原始印欧语时期'),
           ('Proto-Germanic', '*snaiwaz', '雪', '原始日耳曼语时期'),
           ('Old English', 'snāw', '雪', '古英语时期'),
           ('Middle English', 'snou', '雪', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE snaw，义为「雪；降雪；暴风雪」）',
 'orig': '雪',
 'path': [('雪', '原始印欧语时期', ''),
          ('雪；下雪', '现代', '同根的梵语词 snihyati 义竟漂成「他变湿了」（雪化成水）；动词 snow 顶掉了古英语 snīwan——按规则本应留下 snew（借词守恒）')],
 'mech': 'snow 在梵语里的亲戚是「湿」：雪的另一面是水。',
 'link': '今天的意思「雪」就是本义，一路未变（1914 年起俚指可卡因，属行话层）。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['fridge'] = {
 'chain': [('Latin', 'frīgidārium', '（浴场）凉水室', '拉丁语时期'),
           ('English', 'refrigerator', '冰箱', '19 世纪'),
           ('English', 'fridge', '冰箱', '1926 年')],
 'fa': '1926 年见载（Etymonline：1926, refrigerator 的截短变体）',
 'orig': '冰箱（refrigerator 的截短）',
 'path': [('冰箱（refrigerator 的截短）', '19 世纪', ''),
          ('冰箱', '现代', '罕见的成词法：截短之外还添了个 d（类推 bridge、ridge 的拼法），或受 1919 年名牌 Frigidaire 影响——refrigerator 里本没有这个 d（截短成词）')],
 'mech': 'fridge 多出来的 d 是「借」来的：向 bridge 看齐。',
 'link': '今天的意思「冰箱」就是截短源头的意思。',
 'disp': 'd 的来源两解并存：拼法类推说（Wiktionary/OED）与 Frigidaire 品牌影响说（Etymonline/牛津），并载。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {
 'fifteen': 'compositional（主干复核后）：five + -teen 的数词构式，古英语 fīftīene 以来构词透明、词义无漂移，现代词仍是「五加十」的活构式（与全数词同一口径）；词源叙事归形态层，待核保持',
 'sixteen': 'compositional（主干复核后）：six + -teen 的数词构式，古英语 sixtīene 以来构词透明、词义无漂移，现代词仍是「六加十」的活构式（与全数词同一口径）；词源叙事归形态层，待核保持',
 'playground': 'compositional（主干复核后）：play + ground 现代透明复合（1780 年记录），词义即「玩的场地」无历史漂移（古英语另有 plegstow 同义旧构）；词源叙事归形态层，待核保持',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
