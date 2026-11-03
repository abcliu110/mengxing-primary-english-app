# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['collect'] = {
 'chain': [('Proto-Indo-European', '*leǵ-', '收集；挑选', '原始印欧语时期'),
           ('Latin', 'colligere', '聚拢到一起', '拉丁语时期'),
           ('Middle English', 'collecten', '收集', '中古英语时期')],
 'fa': '15 世纪早期进入英语（Etymonline：early 15c.，及物义「聚到一处」）',
 'orig': '聚拢到一起',
 'path': [('聚拢到一起', '拉丁语时期', ''),
          ('收集，采集，收藏', '现代', 'com-「一起」+ legere「拣」：拣到一堆里。中世纪拉丁语 collecta 还指「集会、集祷」——人聚拢了也是 collect（由拣物到聚人）')],
 'mech': 'collect 是「往一堆里拣」：物拣齐了，人聚齐了，都是它。',
 'link': '今天的意思「收集」就是构词本义，一路没变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['invent'] = {
 'chain': [('Proto-Indo-European', '*gʷem-', '来；去', '原始印欧语时期'),
           ('Latin', 'venīre', '来', '拉丁语时期'),
           ('Latin', 'invenīre', '遇上；发现', '拉丁语时期'),
           ('Middle English', 'inventen', '发明', '中古英语时期')],
 'fa': '约 1500 年见载（Etymonline：c. 1500，义为「找到、发现」，或为 invention 的逆构）',
 'orig': '遇上；发现',
 'path': [('遇上；发现', '拉丁语时期', ''),
          ('发明，创造', '现代', 'in-「上」+ venīre「来」：撞上、找到。1530 年代生「凭原创做出来」义——从「找到已有的」到「做出没有的」，英语里发现与发明在此分家（由发现到创造）')],
 'mech': 'invent 是「撞见」：先撞见现成的，后造出没有的。',
 'link': '今天的意思「发明」是从「发现」跨过去的：界限就在 1530 年代。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['invention'] = {
 'chain': [('Latin', 'invenīre', '遇上；发现', '拉丁语时期'),
           ('Latin', 'inventiō', '发现；找出', '拉丁语时期'),
           ('Middle English', 'invencioun', '发明', '中古英语时期')],
 'fa': '15 世纪早期进入英语（Etymonline：early 15c.，义为「找到、发现某物」）',
 'orig': '发现；找出',
 'path': [('发现；找出', '拉丁语时期', ''),
          ('发明，发明物', '现代', '中古英语最早义是「设计出的组织办法」（约 1400 年，今佚）；1510 年代「发明出来的东西」，1530 年代「发明的行为」——名词比动词 invent 先行入英（由发现其物到造物）')],
 'mech': 'invention 先是「找到」：找到的办法，成了做出的东西。',
 'link': '今天的意思「发明」从「发现」转来，与 invent 同步跨界。',
 'disp': '「十字架的发现」（Invention of the Cross，5 月 3 日教会节日）保存着最老的「发现」义（Etymonline 并记）。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {
 'thirteen': 'compositional（主干复核后）：three + -teen 复合数词（古英语 þrēotīene 一线），构件自明，本词不单独立档，保持待核',
 'fourteen': 'compositional（主干复核后）：four + -teen 复合数词（古英语 fēowertīene 一线），构件自明，本词不单独立档，保持待核',
 'seventeen': 'compositional（主干复核后）：seven + -teen 复合数词（古英语 seofontīene 一线），构件自明，本词不单独立档，保持待核',
 'eighty': 'compositional（主干复核后）：eight + -ty（「十」组后缀）复合数词（古英语 hundeahtatiġ 一线），构件自明，本词不单独立档，保持待核',
 'seventh': 'compositional（主干复核后）：seven + -th 序数词（古英语 seofoþa 一线），构件自明，本词不单独立档，保持待核',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
