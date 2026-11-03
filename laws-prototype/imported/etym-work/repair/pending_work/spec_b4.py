# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['breakfast'] = {
 'chain': [('Old English', 'fæsten', '斋戒；禁食', '古英语时期'),
           ('Old English', 'fæstenbryċe', '破斋', '古英语时期'),
           ('Middle English', 'brekefast', '早餐', '中古英语时期')],
 'fa': '15 世纪中期见载（Etymonline：mid-15c.，源自动词短语 break fast)',
 'orig': '打破夜间的斋戒（第一餐）',
 'path': [('打破夜间的斋戒（第一餐）', '古英语时期', ''),
          ('早餐，早饭', '现代', '化石复合词：fast 在此是「（整夜的）禁食」，break fast 就是「开斋」——法语 déjeuner、西班牙语 desayuno 都是同一个「解斋」构造（化石复合）')],
 'mech': 'breakfast 的直译是「破斋」：睡一夜，人人都是斋戒状态，第一口饭就是开斋。',
 'link': '今天的意思「早餐」就是本义的日常化。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['cow'] = {
 'chain': [('Proto-Indo-European', '*gʷṓws', '牛', '原始印欧语时期'),
           ('Proto-Germanic', '*kōz', '牛', '原始日耳曼语时期'),
           ('Old English', 'cū', '母牛', '古英语时期'),
           ('Middle English', 'cou', '奶牛', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE cu，义为「牛科动物的雌性」）',
 'orig': '牛（母牛）',
 'path': [('牛（母牛）', '原始印欧语时期', ''),
          ('奶牛，母牛', '现代', '与 beef 是同源双式：拉丁语 bōs 一支管词（beef 管肉）；14 世纪末起泛指各种大型动物的雌性（借词守恒）')],
 'mech': 'cow 与 beef 是亲戚：一个在圈里，一个在盘里。',
 'link': '今天的意思「奶牛」就是本义。',
 'disp': '动词 cow「威吓」约 1600 年，或源古诺斯语 kúga「压迫」（OED 拟，源头未明），与名词为另一词条，登记在案。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['salad'] = {
 'chain': [('Proto-Indo-European', '*sal-', '盐', '原始印欧语时期'),
           ('Latin', 'sal', '盐', '拉丁语时期'),
           ('Vulgar Latin', '*salāta', '盐渍的', '通俗拉丁语时期'),
           ('Middle English', 'salade', '沙拉', '中古英语时期')],
 'fa': '14 世纪末进入英语（Etymonline：late 14c., salade，义为「切碎拌调料的生菜」）',
 'orig': '盐渍的（菜）',
 'path': [('盐渍的（菜）', '通俗拉丁语时期', ''),
          ('蔬菜沙拉，水果沙拉', '现代', '全称 herba salāta「盐渍蔬菜」——罗马人用盐水与咸油醋汁拌生菜：沙拉是「咸」出来的；莎士比亚「salad days」（1606）指青涩年华（由盐渍到拌菜）')],
 'mech': 'salad 里藏着 sal（盐）：沙拉的出生证上写的是「盐渍菜」。',
 'link': '今天的意思「沙拉」从「盐渍的」凝固为菜名。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['mouse'] = {
 'chain': [('Proto-Indo-European', '*mus-', '鼠', '原始印欧语时期'),
           ('Proto-Germanic', '*mus', '鼠', '原始日耳曼语时期'),
           ('Old English', 'mūs', '老鼠', '古英语时期'),
           ('Middle English', 'mous', '老鼠', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE mus，义为「小啮齿动物」）',
 'orig': '老鼠',
 'path': [('老鼠', '原始印欧语时期', ''),
          ('老鼠，耗子；电脑鼠标', '现代', '印欧语各家的老词（拉丁 mūs、希腊 mŷs 同源；希腊语里它还兼指「肌肉」——隆起像鼠）；复数 mice 是 i-音变的化石；1965 年工程师 Bill English 以形似命名电脑鼠标（由兽到器）')],
 'mech': 'mouse 的复数不说 mouses 说 mice:一千年前的元音变异留下的。',
 'link': '今天的意思「鼠标」是 1965 年按形状起的新名，本义未动。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['third'] = {
 'chain': [('Proto-Indo-European', '*trei-', '三', '原始印欧语时期'),
           ('Proto-Indo-European', '*tr̥tyós', '第三', '原始印欧语时期'),
           ('Proto-Germanic', '*þridjô', '第三', '原始日耳曼语时期'),
           ('Middle English', 'thirde', '第三', '中古英语时期')],
 'fa': '古英语晚期见载（Etymonline：late OE，þridda 的换位形）',
 'orig': '第三',
 'path': [('第三', '原始印欧语时期', ''),
          ('第三（3rd)', '现代', '序数词不是 three 的现拼：本形 thrid（þridda)，约 950 年北umbria 方言起 r 与 i 换位成 third，thrid 一直用到 16 世纪才退场（换位成词）')],
 'mech': 'third 里 r 和 i 换过座位：它本该叫 thrid。',
 'link': '今天的意思「第三」就是本义，换位只动了拼法。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['factory'] = {
 'chain': [('Proto-Indo-European', '*dʰeh₁-', '放置；做', '原始印欧语时期'),
           ('Latin', 'facere', '做；造', '拉丁语时期'),
           ('Late Latin', 'factorium', '代理行；油坊', '晚期拉丁语时期'),
           ('English', 'factory', '工厂', '16 世纪末')],
 'fa': '1550 年代见载（Etymonline：1550s，义为「庄园管事的办公室」）',
 'orig': '代理人办事处；油坊',
 'path': [('代理人办事处；油坊', '晚期拉丁语时期', ''),
          ('工厂', '现代', 'factor 是「做事的人」（商行代理人）：1580 年代指海外商站（经葡萄牙语 feitoria)，1610 年代才转「制造货物的厂房」——从管事的屋子到做工的屋子（由办事处到工厂）')],
 'mech': 'factory 先是「人」（代理）的办公室，后是「造东西」的厂房。',
 'link': '今天的意思「工厂」是 17 世纪才定型的第三站。',
 'disp': '构词一说 factor + -y 并受拉丁语 fact- 词干强烈影响（Wiktionary/OED），与 factorium 主干并行不悖。',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {'angry': 'compositional（主干复核后）：anger + -y 透明派生（14 世纪末），现代词义即「有怒气的」由 anger 直接可读，无独立漂移链；词源叙事在 anger 本词，待核保持'}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
