"""fix36_mid.py —— 决策 36 ①1：12 个语法点（hd_g19–g33）中段「能量吸收器」串板按本课重做（结构公式 + 对比 + 常错）。
- 每幕把原 8 行吸收器板换成本课的板（MID 表）；新英文例句都配朗读（R2），字幕给译文。
- 原 8 行一字不差搬到「操作词总论」：scenes/aux_transformer_4.js 末尾的 ⑥ 板（助动词照妖镜，R1 零丢失），并补总论说明。
- 幂等：已改过的幕跳过。对照表写到 lab/audit36/R1_36_1_MIDBOARD.md。"""
import os, re
HERE = os.path.dirname(os.path.abspath(__file__))
LAB = os.path.join(HERE, '..', 'lab', 'audit36')
OLD = ['🔬 助动词/情态动词『能量吸收器』与动词变形还原实验', '🧲 强力能量磁铁', 'did / does / can / will', '吸走过去时与三单!',
       '🌱 动词 100% 回原形', 'went➔go ｜ likes➔like', "Did he go? Doesn't like", '-ed/-s']
q = lambda s: "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"
def L(it): return '  [' + ', '.join(q(x) for x in it) + ']'
MID = {
 'G19': [('w', '🔬 三单警报器：主语是 he / she / it 或一个人、一样东西 → 动词加 -s'),
         ('w', '公式：He / She / It + 动词-s（-es）'),
         ('w', '加法：一般 +s（likes）；s、x、ch、sh、o 结尾 +es（watches, goes）；辅音字母 + y 变 y 为 i 加 es（studies）'),
         ('w', '读音：清辅音后读 /s/（works）；浊辅音和元音后读 /z/（plays）；s、x、ch、sh 后读 /ɪz/（watches）'),
         ('w', '对比：I like apples. → She likes apples.'),
         ('s', 'She likes apples.', '她喜欢苹果。'),
         ('w', '常错：He go to school. ✗ → He goes to school. ✓'),
         ('w', "否定、疑问请 does：does 吸走 -s，likes ➔ like（He doesn't like it. / Does he like it?）"),
         ('s', "He doesn't like milk. Does he like milk?", '他不喜欢牛奶。他喜欢牛奶吗？')],
 'G20': [('w', '🔬 进行时两件套：be + 动词-ing，缺一不可'),
         ('w', '公式：I am / He is / They are + 动词-ing'),
         ('w', '-ing 变法：一般 +ing（playing）；不发音的 e 结尾去 e（make → making）；重读闭音节双写（run → running, swim → swimming）'),
         ('w', '对比：He plays football every day.（习惯）｜ He is playing football now.（正在）'),
         ('s', 'He is playing football now.', '他现在正在踢足球。'),
         ('w', '常错：He running. ✗ → He is running. ✓'),
         ('w', '信号词：now、Look!、Listen!')],
 'G21': [('w', '🔬 -ed 四条加法'),
         ('w', '一般 +ed：play → played'),
         ('w', '不发音的 e 结尾 +d：live → lived'),
         ('w', '辅音字母 + y：变 y 为 i 加 ed：study → studied'),
         ('w', '重读闭音节、末尾只有一个辅音字母：双写再加 ed：stop → stopped'),
         ('w', '读音：清辅音后读 /t/（washed）；浊辅音和元音后读 /d/（played）；t、d 后读 /ɪd/（wanted）'),
         ('s', 'I washed my hands. She played the piano. We wanted a cake.', '我洗了手。她弹了钢琴。我们想要一个蛋糕。'),
         ('w', '💡 为什么这样读？清配清、浊配浊，嘴巴最省力——见「第一性原理 · 经济原则」'),
         ('w', '常错：stoped ✗ → stopped ✓；studyed ✗ → studied ✓')],
 'G22': [('w', '🔬 不规则动词：不加 -ed，整个词换样'),
         ('w', '高频榜：go → went, see → saw, eat → ate, have → had, do → did, take → took, make → made, buy → bought'),
         ('w', '分组记：换元音（sit → sat, swim → swam）；整个换（go → went）；变成 -ought（buy → bought, think → thought）'),
         ('w', '对比：I go to school every day. ｜ I went to school yesterday.'),
         ('s', 'I went to school yesterday.', '我昨天去上学了。'),
         ('w', '常错：goed ✗ → went ✓；eated ✗ → ate ✓')],
 'G23': [('w', '🔬 did 能量吸收器：did / didn\'t 吸走过去时'),
         ('w', '公式：否定 主语 + didn\'t + 动词原形；疑问 Did + 主语 + 动词原形？'),
         ('w', '动词打回原形：went ➔ go，saw ➔ see'),
         ('w', '对比：He went to the zoo. → He didn\'t go to the zoo. → Did he go to the zoo?'),
         ('s', 'Did he go to the zoo? No, he didn\'t.', '他去动物园了吗？不，他没去。'),
         ('w', '常错：I didn\'t went. ✗ → I didn\'t go. ✓'),
         ('w', '答语：— Did you go? — Yes, I did. / No, I didn\'t.')],
 'G24': [('w', '① 计划：早就想好'),
         ('p', '📅'),
         ('w', '心里已经决定、安排好了的事：We are going to have a picnic this Sunday.'),
         ('s', 'We are going to have a picnic this Sunday.', '这个星期天我们打算去野餐。'),
         ('w', '② 迹象：眼看要发生'),
         ('p', '🌧️'),
         ('w', '看到证据、马上要发生的事：Look at the black clouds! It is going to rain.'),
         ('s', 'Look at the black clouds! It is going to rain.', '看那些乌云！要下雨了。'),
         ('w', '对比 will：说话时临时决定用 will——The phone is ringing. I will get it.'),
         ('s', 'The phone is ringing. I will get it.', '电话响了，我去接。'),
         ('w', '常错：I going to... ✗（漏 be）；I will going to... ✗（will 和 be going to 二选一）')],
 'G25': [('w', '🔬 will 的三种用法'),
         ('w', '预测：It will be sunny tomorrow.'),
         ('w', '临时决定：I\'m thirsty. I will get some water.'),
         ('w', '承诺：I will help you.'),
         ('s', 'It will be sunny tomorrow. I will help you.', '明天会是晴天。我会帮你。'),
         ('w', '公式：主语 + will + 动词原形（人称不变）；否定 won\'t = will not'),
         ('w', '🧲 will 后面动词回原形：He will go. ✓（He will goes ✗）'),
         ('w', '对比 be going to：早有计划、看到迹象 → be going to')],
 'G26': [('w', '🔬 can 的两种意思'),
         ('w', '能力（会）：I can swim.'),
         ('w', '许可（可以）：Can I use your pen? — Yes, you can. / Sorry, you can\'t.'),
         ('s', 'Can I use your pen? Yes, you can.', '我可以用你的钢笔吗？可以。'),
         ('w', '公式：主语 + can + 动词原形；否定 can\'t；疑问 Can + 主语 + 动词原形？'),
         ('w', '🧲 can 后面动词回原形：He can swims. ✗ → He can swim. ✓'),
         ('w', '常错：Can you to swim? ✗ → Can you swim? ✓')],
 'G27': [('w', '🔬 口气梯子（从轻到重）'),
         ('w', 'may 可以 → should 应该 → must 必须 → mustn\'t 不准'),
         ('w', 'may 礼貌请求：May I come in?'),
         ('w', 'should 建议：You should drink more water.'),
         ('w', 'mustn\'t 禁止：You mustn\'t swim here.'),
         ('s', 'May I come in? You should drink more water. You mustn\'t swim here.', '我可以进来吗？你应该多喝水。你不准在这里游泳。'),
         ('w', '⚠️ mustn\'t（不准）≠ don\'t have to（不必）'),
         ('w', '公式：情态动词 + 动词原形（不加 s，不加 to）')],
 'G29': [('w', '🔬 否定两条路'),
         ('w', '路一：句中有 be / can / will → 直接加 not：is → isn\'t，can → can\'t，will → won\'t'),
         ('w', '路二：只有实义动词 → 请 don\'t / doesn\'t / didn\'t，动词回原形'),
         ('w', '对比：I like it. → I don\'t like it. ｜ He likes it. → He doesn\'t like it. ｜ I went. → I didn\'t go.'),
         ('s', 'He likes it. He doesn\'t like it.', '他喜欢它。他不喜欢它。'),
         ('w', '常错：I am not like it. ✗ → I don\'t like it. ✓；He doesn\'t likes it. ✗')],
 'G30': [('w', '🔬 句首信号灯：把 be / can / do 提到最前面'),
         ('w', '有 be 提 be：You are from China. → Are you from China?'),
         ('w', '有 can 提 can：He can swim. → Can he swim?'),
         ('w', '都没有就请 do / does / did：She likes cats. → Does she like cats?'),
         ('s', 'Does she like cats? Yes, she does.', '她喜欢猫吗？是的，她喜欢。'),
         ('w', '怎问怎答：Can he swim? — Yes, he can. / No, he can\'t.'),
         ('w', '常错：Do you are...? ✗；Does she likes...? ✗')],
 'G33': [('w', '🔬 祈使句四种口气'),
         ('w', '指令：动词原形开头——Stand up! Open the door.'),
         ('w', '礼貌：加 please——Please sit down. / Sit down, please.'),
         ('w', '禁止：Don\'t + 动词原形——Don\'t run!'),
         ('w', '一起做：Let\'s + 动词原形——Let\'s go!'),
         ('s', 'Don\'t run in the classroom. Let\'s go!', '不要在教室里跑。我们走吧！'),
         ('w', '常错：Don\'t to run. ✗；Let\'s goes. ✗；be 也能开头：Be quiet!')],
}
OP = [('w', '⑥ 操作词总论'),
      ('n', '英语变否定、变疑问，全靠一个「操作词」：be、can、will，或者 do / does / did。'),
      ('w', '英语的否定和疑问都靠「操作词」：be / can / will / do / does / did'),
      ('w', '句子里有操作词：直接加 not、直接提到句首（He can swim. → Can he swim?）'),
      ('w', '句子里没有：就请 do / does / did 出来当操作词，动词回原形'),
      *[('w', x) for x in OLD],
      ('s', 'He likes milk. He doesn\'t like milk. Does he like milk?', '他喜欢牛奶。他不喜欢牛奶。他喜欢牛奶吗？')]
oldblk = '\n'.join(L(('w', x)) + ',' for x in OLD)
rows = []
for g, new in MID.items():
    f = os.path.join(HERE, 'scenes', f'hd_{g.lower()}_1.js'); s = open(f, encoding='utf-8').read()
    if oldblk not in s: print('skip', g); continue
    s = s.replace(oldblk, '\n'.join(L(it) + ',' for it in new)); open(f, 'w', encoding='utf-8').write(s)
    rows.append(f"| {g} | 8 行「能量吸收器」板（{OLD[0]} … {OLD[-1]}） | " + ' / '.join(x[1] if x[0] != 's' else '🔊 ' + x[1] for x in new) + ' | 原 8 行一字不差移到 aux_transformer ④ 末尾「⑥ 操作词总论」 |')
f = os.path.join(HERE, 'scenes', 'aux_transformer_4.js'); s = open(f, encoding='utf-8').read()
anchor = "  ['w', '💡 一句话洞见'],"
if '⑥ 操作词总论' not in s:
    assert s.count(anchor) == 1
    s = s.replace(anchor, '\n'.join(L(it) + ',' for it in OP) + '\n' + anchor); open(f, 'w', encoding='utf-8').write(s)
src = open(f, encoding='utf-8').read().replace("\\'", "'")
assert all(x in src for x in OLD), 'R1：原吸收器板没有全部落到操作词总论'
if rows:
    md = os.path.join(LAB, 'R1_36_1_MIDBOARD.md')
    open(md, 'w', encoding='utf-8').write('# 决策 36 ①1 对照表：12 个语法点中段「能量吸收器」串板 → 本课板（R1 纠错删改）\n\n'
        '> 生成：`v5/fix36_mid.py`。原板 8 行在 12 幕里完全相同、与本课无关（审计〇-1）；每幕换成本课「结构公式 + 对比 + 常错」，新英文句都配朗读、字幕给译文。\n'
        '> 原 8 行一字不差保留在 `scenes/aux_transformer_4.js`（助动词照妖镜 ④）末尾的「⑥ 操作词总论」，并补「有操作词直接变、没有就请 do」的总论说明（审计 1.4）——R1 零丢失。\n\n'
        '| 语法点 | 删（改前） | 改后（本课中段板） | 原内容去向 |\n|---|---|---|---|\n' + '\n'.join(rows) + '\n')
print('done', len(rows))
