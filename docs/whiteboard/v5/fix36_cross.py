"""fix36_cross.py —— 决策 36 ①2：语法白板模板串课（一个点只放本点的板）。
- G08（my / mine）、G09（this / that）、G10（some / any）的幕里放着「代词全局原理」的三块深度机制板（主格宾格 / 物主代词 / 指示代词），
  只留本课那一块（G08 ② 物主代词、G09 ③ 指示代词），其余幕换成本课的「规则 + 对比 + 常错」板；G10 三幕全换成 some / any。
- G31（5W1H）三幕放的是 G32 的 How / What 三块板 → 换成 Who / Whose、Where / When / What time、Why / Which 三块本课板。
- G32 ③ 放的是感叹句「遮住主谓」板（属于 G34）→ 换成 What + 名词 / How + 形容词家族板；G34 ① 改用「遮住主谓」板开场（原第 3 幕），
  ② 三大公式，③ 常错。G35 放的是 G36 的 There be / have 双轨板 → 换成「就近原则」板。
- 内容全部取自 App 里该语法点的 GRAMMAR_DB（step1 例句 / step3 规则 / step4 题目），不新编；新英文句都配朗读、字幕给译文；
  原来末尾那句朗读的中文是口诀（不是译文），口诀改成讲解字幕（'n'）保留。
- 被拿掉的共用板原文仍在：G07 ①–③、G08 ②、G09 ③、hd_sum_pronouns、G32 ①②、G34 ①、G36 ①（R1 知识点不丢）。
- G07_2 ↔ G08_2、G07_3 ↔ G09_3 仍重复：要改 G07（决策 38 第 7 幕，道 r38），本脚本不碰 G07。
- 幂等：已改过的幕跳过。对照表写到 lab/audit36/R1_36_2_CROSS.md。"""
import os, re
HERE = os.path.dirname(os.path.abspath(__file__))
LAB = os.path.join(HERE, '..', 'lab', 'audit36')
q = lambda s: "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"
def L(it): return '  [' + ', '.join(q(x) for x in it) + ']'
W = lambda s: ('w', s)
S = lambda en, zh: ('s', en, zh)
NEW = {
 'hd_g08_1': [W('🔬 粘人精 vs 独行侠'),
              W('粘人精 my / your / her / our / their：后面必须跟名词'),
              W('独行侠 mine / yours / hers / ours / theirs：后面不再接名词'),
              W('对比：This is my bag. ｜ That red one is yours (= your bag).'),
              S('This is my bag. That red one is yours.', '这是我的包。那个红色的是你的。'),
              W('对比：Her dress is blue, and mine (= my dress) is yellow.'),
              S('Her dress is blue, and mine is yellow.', '她的连衣裙是蓝色的，我的是黄色的。')],
 'hd_g08_3': [W('🔬 做题秒杀：看空格后面有没有名词'),
              W('有名词 → my / your / her / our / their'),
              W('没名词 → mine / yours / hers / ours / theirs'),
              W('例：Their dog is big, but ours is small and cute.'),
              S('Their dog is big, but ours is small and cute.', '他们的狗很大，我们的又小又可爱。'),
              W('常错：This blue umbrella is my. ✗ → This blue umbrella is mine. ✓'),
              S('This blue umbrella is mine.', '这把蓝伞是我的。'),
              W('例：Our classroom is on the first floor, and theirs is on the second floor.')],
 'hd_g09_1': [W('🔬 问答替换：答句换成 it / they'),
              W("Is this / that ...? → Yes, it is. / No, it isn't."),
              W("Are these / those ...? → Yes, they are. / No, they aren't."),
              W('例：— What are those? — They are sheep.'),
              S('What are those? They are sheep.', '那些是什么？它们是绵羊。'),
              W('例：— Are those tomatoes over there? — Yes, they are.'),
              S('Are those tomatoes over there? Yes, they are.', '那边那些是西红柿吗？是的。')],
 'hd_g09_2': [W('🔬 打电话：This is ...（我是…）；Is that ...?（你是…吗？）'),
              W('例：Hello! This is Wu Binbin speaking. Is that Mike?'),
              S('Hello! This is Wu Binbin speaking. Is that Mike?', '你好！我是吴斌斌。你是迈克吗？'),
              W('数的一致：this / that 配 is + 单数；these / those 配 are + 复数'),
              W('常错：These flower is very beautiful. ✗ → These flowers are very beautiful. ✓'),
              S('These flowers are very beautiful.', '这些花非常漂亮。')],
 'hd_g10_1': [W('🔬 some / any 的共同本领：都表示「一些」'),
              W('后面能接可数名词复数：some storybooks'),
              W('也能接不可数名词：some milk'),
              S('I have some storybooks and some milk.', '我有一些故事书和一些牛奶。'),
              W("换成否定也一样：I don't have any crayons.")],
 'hd_g10_2': [W('🔬 常规分工：肯定句用 some；否定句和一般疑问句用 any'),
              W('肯定：I have some storybooks.'),
              W("否定：I don't have any crayons."),
              W('疑问：Do you have any?'),
              S("I don't have any crayons. Do you have any?", '我没有蜡笔。你有吗？'),
              W('答句：— Do you have any comic books? — Yes, I have some.'),
              S('Do you have any comic books? Yes, I have some.', '你有漫画书吗？有，我有一些。')],
 'hd_g10_3': [W('🔬 黄金特例：邀请、请求的问句仍用 some（盼着对方说 Yes）'),
              W('邀请：Would you like some juice?'),
              W('请求：Can I have some bread, please?'),
              S('Would you like some juice? Can I have some bread, please?', '你想喝点果汁吗？请问我能吃点面包吗？'),
              W('常错：Can I have any water, Mum? ✗ → Can I have some water, Mum? ✓'),
              W("对比：There isn't any milk in the fridge. Would you like some tea instead?"),
              S("There isn't any milk in the fridge. Would you like some tea instead?", '冰箱里没有牛奶了。你想喝点茶吗？')],
 'hd_g31_1': [W("🔬 Who / Whose / Who's 三兄弟"),
              W('Who 谁：问人是谁'),
              W('Whose 谁的：问东西归谁，后面常跟名词'),
              W("Who's = Who is（谁是）"),
              W('例：— Who is that girl? — She is my cousin.'),
              S('Who is that girl? She is my cousin.', '那个女孩是谁？她是我的堂姐。'),
              W("例：— Whose schoolbag is this? — It's Mike's."),
              S("Whose schoolbag is this? It's Mike's.", '这是谁的书包？是迈克的。')],
 'hd_g31_2': [W('🔬 Where 哪里 · When 何时 · What time 几点'),
              W('When 问任何时间；What time 专问钟表上的几点几分'),
              W('例：Where are you going, and when will you come back?'),
              S('Where are you going, and when will you come back?', '你要去哪里？什么时候回来？'),
              W("常错：Where is your birthday? ✗ → When is your birthday? ✓ — It's in May."),
              S("When is your birthday? It's in May.", '你的生日是什么时候？在五月。')],
 'hd_g31_3': [W('🔬 Why 和 Because 锁死配对'),
              W('用 Why 提问，回答必用 Because ...'),
              W('Which 哪一个：在几样里挑一个'),
              S('Why do you like spring? Because there are beautiful flowers.', '你为什么喜欢春天？因为有美丽的花。'),
              W('例：— Which season do you like best, and why? — Winter, because I can make a snowman!'),
              S('Which season do you like best? Winter, because I can make a snowman!', '你最喜欢哪个季节？冬天，因为我可以堆雪人！')],
 'hd_g32_3': [W('🔬 What + 名词家族 vs How + 形容词家族'),
              W('What colour / What time / What day / What date / What size'),
              W('What day 问星期几 ｜ What date 问几月几号'),
              W('How old / How tall / How heavy / How long / How far / How often'),
              W('How many + 可数复数 ｜ How much + 不可数或问价钱'),
              S('What size are your shoes? Size 37. How much are they? 80 yuan.', '你的鞋几码？37 码。多少钱？80 元。'),
              W('问方式：How does she go to work? — By car.'),
              W('常错：How is your bedroom like? ✗ → What is your bedroom like? ✓'),
              S('What is your new English teacher like? She is kind. How does she go to work? By car.', '你的新英语老师是什么样的？她很和蔼。她怎么去上班？开车。')],
 'hd_g34_1': [W('🔬 两步秒判：先遮住主谓，再看剩下的核心词'),
              W('🟦 What a'), W('clever'), W('boy (核心是名词!)'), W('[he is 遮住主谓] !'),
              W('➔ 去掉主谓 he is，尾巴核心词是名词 boy，所以派代词 What a!'),
              W('🔶 How'), W('clever (核心是形容词!)'), W('[the boy is 遮住] !'),
              W('➔ 去掉主谓 the boy is，只剩形容词 clever，所以派副词 How!'),
              S('What a clever boy he is! How clever the boy is!', '他是多么聪明的一个男孩啊！这个男孩多聪明啊！')],
 'hd_g34_2': [W('🔬 感叹句三大公式'),
              W('What + a / an + 形容词 + 单数可数名词！'),
              W('What + 形容词 + 复数 / 不可数名词！（绝不加 a）'),
              W('How + 形容词 / 副词 + 主谓！'),
              S('What beautiful flowers they are! What fine weather it is!', '多么美丽的花啊！多么好的天气啊！'),
              S('How fast he runs!', '他跑得多快啊！')],
 'hd_g34_3': [W('🔬 感叹句常错'),
              W('What a great news it is! ✗ → What great news it is! ✓（news 不可数，不加 a）'),
              W('What an interesting book it is!（interesting 元音开头用 an）'),
              W('How happily the children are reading!（happily 是副词，用 How）'),
              S('What an interesting book it is! How happily the children are reading!', '这是一本多么有趣的书啊！孩子们读得多开心啊！'),
              W('What bad weather today! How cold it is outside!'),
              S('What bad weather today! How cold it is outside!', '今天天气真糟糕！外面多冷啊！')],
 'hd_g35_1': [W('🔬 be 是近视眼：只看紧挨着它的第一个名词'),
              W('There is + 单数 / 不可数 ｜ There are + 复数'),
              W('例：There is a computer and two books on the desk.（紧挨 a computer → is）'),
              S('There is a computer and two books on the desk.', '书桌上有一台电脑和两本书。'),
              W('换个顺序：There are two books and a computer on the desk.（紧挨 two books → are）'),
              S('There are two books and a computer on the desk.', '书桌上有两本书和一台电脑。'),
              W('不可数也用 is：There is some milk in the glass.'),
              S('There is some milk in the glass.', '玻璃杯里有一些牛奶。'),
              W('常错：There are an apple and three pears on the plate. ✗ → There is an apple ... ✓')],
}
KEEP = {'hd_g08_2', 'hd_g09_3'}   # 本课自己的那块板：只把末句中文口诀改成讲解字幕
def item_lines(src):
    m = re.search(r'const ITEMS = \[\n(.*?)\n\];', src, re.S); return m, m.group(1).split('\n')
def ev(line):   # 一行 ITEMS → tuple
    return tuple(x.replace("\\'", "'").replace('\\\\', '\\') for x in re.findall(r"'((?:[^'\\]|\\.)*)'", line))
rows = []
for stem in sorted(set(NEW) | KEEP):
    f = os.path.join(HERE, 'scenes', stem + '.js'); src = open(f, encoding='utf-8').read()
    if 'fix36_cross' in src: print('skip', stem); continue
    m, ls = item_lines(src); its = [ev(x.rstrip(',')) for x in ls]
    g = stem[3:6].upper()
    i0 = next(i for i, it in enumerate(its) if it[0] == 'w' and it[1].startswith('🔬'))
    i1 = next(i for i, it in enumerate(its) if it[0] == 'w' and re.match(rf'^{g} 第\d+幕$', it[1]))
    last = its[-1]; assert last[0] == 's', stem
    chant = last[2]
    old = its[i0:i1]
    if stem in KEEP:
        body = list(old); new_s = []
        en0 = last[1]
        tr = {'hd_g08_2': '这是我的包。那个红色的是你的（包）。', 'hd_g09_3': '这儿这个是个红苹果，那儿那个是个梨。'}[stem]
        new_s = [('s', en0, tr)]
    else:
        body = NEW[stem]; new_s = []
    out = its[:i0] + body + [its[i1]] + new_s + [('n', '🎵 口诀：' + chant)]
    src = src[:m.start(1)] + '\n'.join(L(it) + ',' for it in out)[:-1] + src[m.end(1):]
    src = src.replace('\nimport ', '\n// 决策 36 ①2（fix36_cross）：只放本课的板，口诀进讲解字幕\nimport ', 1)
    open(f, 'w', encoding='utf-8').write(src)
    oldtxt = ' / '.join(x[1] for x in old if x[0] == 'w')
    rows.append(f"| {stem} | {oldtxt[:120]}{'…' if len(oldtxt) > 120 else ''} ；末句中文 = 口诀 | " +
                ('（保留本课板）' if stem in KEEP else ' / '.join(('🔊 ' if x[0] == 's' else '') + x[1] for x in body)) +
                f" ；口诀 → 讲解字幕 | {'—' if stem in KEEP else '原板仍在 ' + {'G08': 'G07 / G08 ② / G09 ③ / 代词总结', 'G09': 'G07 / G08 ② / G09 ③ / 代词总结', 'G10': 'G07 / G08 ② / G09 ③ / 代词总结', 'G31': 'G32 ①② / G34 ①', 'G32': 'G34 ①', 'G34': 'G32 ①②（G34 ① 改用本课「遮住主谓」板）', 'G35': 'G36 ①'}[g]} |")
if rows:
    p = os.path.join(LAB, 'R1_36_2_CROSS.md')
    head = ('# 决策 36 ①2 对照表：语法白板模板串课 → 一个点只放本点的板（R1 纠错删改）\n\n'
            '> 生成：`v5/fix36_cross.py`。新内容全部取自该语法点的 GRAMMAR_DB（step1 例句、step3 规则、step4 题目），新英文句配朗读、字幕给译文；'
            '原末句中文是口诀，改进讲解字幕。拿掉的共用板原文仍在别的幕（最后一列），知识点不丢。G07_2↔G08_2、G07_3↔G09_3 需改 G07，留给决策 38 第 7 幕（道 r38）。\n\n'
            '| 幕 | 删（改前） | 改后 | 原内容去向 |\n|---|---|---|---|\n')
    old = open(p, encoding='utf-8').read().split('|---|---|---|---|\n', 1)[1] if os.path.exists(p) else ''
    open(p, 'w', encoding='utf-8').write(head + old + '\n'.join(rows) + '\n')
print('done', len(rows))
