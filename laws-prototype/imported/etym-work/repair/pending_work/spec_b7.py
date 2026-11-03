# -*- coding: utf-8 -*-
import assemble as A

S = {}
S['tenth'] = {
 'chain': [('Proto-Germanic', '*tehundô', '第十', '原始日耳曼语时期'),
           ('Old English', 'tēoþa', '第十', '古英语时期'),
           ('Middle English', 'tenðe', '第十', '中古英语时期')],
 'fa': '12 世纪中期见载（Etymonline：mid-12c., tenðe)',
 'orig': '第十',
 'path': [('第十', '原始日耳曼语时期', ''),
          ('第十（10th)', '现代', '重造的序数词：本族古形 tēoþa 在中古被「按 ten + -th 规则重造」的 tenth 顶替（鼻音按类推补回）——古形没有消失，它活在 tithe「什一税」里（类推重造）')],
 'mech': 'tenth 是「重做」的：旧形 tēoþa 退到 tithe 里，新形按 ten 的模样重铸。',
 'link': '今天的意思「第十」就是本义，重造只动了形。',
 'disp': '无已知争议（seventh、ninth 同为类推重造，Etymonline 并举）。',
 'folk': '未见流传假词源', 'srcs': ['et', 'wk'], 'grade': 'et_wk'}
S['alone'] = {
 'chain': [('Old English', 'eall', '完全；全部', '古英语时期'),
           ('Old English', 'ān', '一；独自', '古英语时期'),
           ('Middle English', 'allone', '独自的', '中古英语时期')],
 'fa': '约 1300 年见载（Etymonline：c. 1300, all ane 的缩合，源头短语义为「完全只身一人」）',
 'orig': '完全独自一人',
 'path': [('完全独自一人', '古英语时期', ''),
          ('独自的，单独地', '现代', '短语化石：all ane（all「完全」+ ane「一」）缩合成一个词——它还保留了 one 的古读音（与 one 本身的音变分了家）（缩合化石）')],
 'mech': 'alone 是「all + one」焊死的：一个人，就是全部。',
 'link': '今天的意思「独自」就是本义，缩合只动了形。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}
S['tooth'] = {
 'chain': [('Proto-Indo-European', '*h₃dónts', '牙', '原始印欧语时期'),
           ('Proto-Germanic', '*tanþs', '牙', '原始日耳曼语时期'),
           ('Old English', 'tōþ', '牙', '古英语时期'),
           ('Middle English', 'toth', '牙', '中古英语时期')],
 'fa': '古英语见载（Etymonline：OE toð，复数 teð)',
 'orig': '牙',
 'path': [('牙', '原始印欧语时期', ''),
          ('牙齿', '现代', '复数 teeth 是 i-音变的化石（与 feet、mice 同律）；词中的 -n- 在擦音前按规则脱落（与 goose、five、mouth 同例）——德语 Zahn 里的 n 还在（借词守恒）')],
 'mech': 'tooth 把 n 弄丢了：擦音前面，古英语的 n 站不住。',
 'link': '今天的意思「牙」就是本义，一路未变。',
 'disp': '无已知争议',
 'folk': '未见流传假词源', 'srcs': ['ox', 'et', 'wk'], 'grade': 'ox_et'}

R = {
 'tourist': 'compositional（主干复核后）：tour + -ist 透明派生（1772 年记录，初指「游记作者」为同一构式的职业定型），现代词义由构词直接可读；词源叙事在 tour 本词，待核保持',
 'sunset': 'compositional（主干复核后）：sun + set 透明复合（14 世纪末），现代词义由构词直接可读、无历史漂移（古英语另有 sunnansetlgong 同义旧构）；词源叙事归形态层，待核保持',
 'seaside': 'compositional（主干复核后）：sea + side 透明复合（约 1200)，现代词义由构词直接可读、无历史漂移；词源叙事归形态层，待核保持',
 'starfish': 'compositional（主干复核后）：star + fish 透明描形复合（1530 年代 starrefyshe)，因五臂星形得名，构词理据现代仍透明；词源叙事归形态层，待核保持',
 'blackberry': 'compositional（主干复核后）：black + berry 透明复合（古英语 blaceberian)，因果色得名，构词理据现代仍透明；词源叙事归形态层，待核保持',
 'peanut': 'trunk_unsettled（主干复核后）：Etymonline 作 pea + nut 复合（1807)，然 Wiktionary 明注此形 perhaps a folk etymology of pinda/pinder（源出非洲语言的旧名，南美植物经葡萄牙人传播）；构词理据未定，两说未合，保持待核',
 'butterfly': 'motivation_unsettled（主干复核后）：切分 butter + fly 自古英语 buttorflēoge 以来无争议，然命名理据三说并存且皆无定论——（女巫化蝶）偷食黄油的旧信、常见种翅色奶黄、排泄物色（荷兰语同源词 boterschijte）；Etymonline 亦言 of obscure signification。切分成立而理据未定（半透明），保持待核',
 'firefly': 'compositional（主干复核后）：fire + fly 透明描形复合（1650 年代），因虫体发光得名，构词理据现代仍透明；词源叙事归形态层，待核保持',
 'earthworm': 'compositional（主干复核后）：earth + worm 透明复合（约 1400)，现代词义由构词直接可读（古英语另有 eorðmata、regnwyrm「雨虫」旧名）；词源叙事归形态层，待核保持',
}

if __name__ == '__main__':
    promoted = {w: A.build(w, s) for w, s in S.items()}
    A.merge(promoted, R)
    print('built:', ', '.join(promoted), '| reasons:', ', '.join(R))
