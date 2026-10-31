#!/usr/bin/env python3
"""gen_vocab_a2.py —— 决策 35 A2 第 1 批：课标二级词表缺的 60 个词 → 新词条（输出 lab/audit35/a2_kebiao_add.json + A2_KEBIAO_ADD.md）。
来源：
- 收词：《义务教育英语课程标准（2022 年版）》附录 3 二级词汇表（lab/audit35/kebiao2.json，审计时 OCR 比对；缺词清单 kebiao_missing.json）。
- 音标：CMUdict（/workspace/work/cmudict.dict，ARPAbet → IPA 用 phon_gen.arpa2ipa，口径同 A1：美式）与 Wiktionary {{IPA|en}} 逐词对照；
  功能词列强读 + 弱读（a /ə/ /eɪ/、can /kæn/ /kən/ 等，两处都有）；email 取 Wiktionary /ˈiːmeɪl/（CMUdict 首重音缺）。
- 年级：暂定。人教社区词表（billyjr/pep-english-vocabulary，只作参考）里有的取它的年级，没有的暂放 G3；A5 按课标 + 教材统一重排。
- 释义 / 例句 / 语法提示：本道按常用词典义项人工撰写（例句只用课标词，标「补写」）；词源 / 构词 / 搭配不编，留空（A4 补真实搭配）。
数据进主文件由 patch_vocab_a2.py 做。"""
import json, pathlib, sys, re
HERE = pathlib.Path(__file__).resolve().parent; sys.path.insert(0, str(HERE))
LAB = HERE.parent / 'lab' / 'audit35'

# (id, word, phonetic, syllables, pos, meaning, emoji, macro, sub, func(type, grammar_id, tip) | None, spelling_alert,
#  [(pos, meaning, ex_en, ex_zh), ...], syntax_contrast)
S, Z, N = '人与社会', '人与自我', '人与自然'
ROWS = [
 ('G1_K01', 'a / an', '/ə/ /eɪ/ /ən/ /æn/', 'a - an', 'art.', '一（个）（不定冠词）', '☝️', Z, '语法功能与指代',
  ('冠词', 'G05', 'a 用在辅音音素开头的词前（a book, a uniform），an 用在元音音素开头的词前（an apple, an hour）：看读音，不看字母。'), '',
  [('art.', '一（个）', 'I have an apple and a banana.', '我有一个苹果和一根香蕉。')], ''),
 ('G1_K02', 'the', '/ðə/ /ði/', 'the', 'art.', '这（个），那（个）（定冠词，特指）', '👉', Z, '语法功能与指代',
  ('冠词', 'G06', '特指说话双方都知道的人或物：Open the door. 在元音音素前常读 /ði/（the apple）。'), '',
  [('art.', '这（个），那（个）', 'Please open the door.', '请打开门。')], ''),
 ('G3_K01', 'be / am / is / are', '/biː/ /æm/ /ɪz/ /ɑːr/', 'be - am - is - are', 'v.', '是（原形 be；现在时 am / is / are）', '🟰', Z, '语法功能与指代',
  ('be 动词', 'G16', 'I 配 am，he / she / it 和单数配 is，you 和复数配 are；原形 be 用在 will、can 等后面：I will be ten.'), '',
  [('v.', '是', 'I am a student. She is my sister.', '我是学生。她是我姐姐。')], ''),
 ('G1_K03', 'can', '/kæn/ /kən/', 'can', 'modal v.', '能，会；可以', '💪', Z, '语法功能与指代',
  ('情态动词', 'G26', '后面跟动词原形：I can swim. 否定 can\'t / cannot；问句把 can 提到句首：Can you swim?'), '',
  [('modal v.', '能，会；可以', 'I can swim. Can you swim?', '我会游泳。你会游泳吗？')], ''),
 ('G3_K02', 'will', '/wɪl/', 'will', 'modal v.', '将，会（表示将来）', '🔮', Z, '语法功能与指代',
  ('情态动词', 'G25', 'will + 动词原形表示将来：It will rain tomorrow. 否定 won\'t = will not。'), '',
  [('modal v.', '将，会', 'It will be sunny tomorrow.', '明天会是晴天。')], ''),
 ('G3_K03', 'must', '/mʌst/', 'must', 'modal v.', '必须', '❗', Z, '语法功能与指代',
  ('情态动词', 'G27', 'must + 动词原形表示必须；mustn\'t 表示禁止（不许）。'), '',
  [('modal v.', '必须', 'You must wash your hands before dinner.', '饭前你必须洗手。')], ''),
 ('G3_K04', 'should', '/ʃʊd/', 'should', 'modal v.', '应该', '👍', Z, '语法功能与指代',
  ('情态动词', 'G27', 'should + 动词原形表示建议、应该做的事：You should drink more water.'), '',
  [('modal v.', '应该', 'You should go to bed early.', '你应该早点睡觉。')], ''),
 ('G3_K05', 'not', '/nɑːt/', 'not', 'adv.', '不，没有', '🚫', Z, '语法功能与指代',
  ('副词', 'G29', '放在 be 动词、情态动词或助动词后面构成否定：I am not tired. He does not like milk. 缩写 isn\'t、can\'t、don\'t。'), '',
  [('adv.', '不，没有', 'I am not hungry.', '我不饿。')], ''),
 ('G1_K04', 'no', '/noʊ/', 'no', 'adv./det.', '不，不是；没有', '🙅', S, '交际与礼仪', None, '',
  [('adv.', '不，不是', 'Is this your pen? No, it isn\'t.', '这是你的钢笔吗？不，不是。'), ('det.', '没有', 'There is no milk in the cup.', '杯子里没有牛奶。')], ''),
 ('G1_K05', 'yes', '/jes/', 'yes', 'adv.', '是，是的', '✅', S, '交际与礼仪', None, '',
  [('adv.', '是，是的', 'Are you ready? Yes, I am.', '你准备好了吗？是的。')], ''),
 ('G4_K01', 'please', '/pliːz/', 'please', 'adv.', '请', '🙏', S, '交际与礼仪', None, '',
  [('adv.', '请', 'Please sit down.', '请坐。')], 'please 可以放句首或句尾：Please help me. / Help me, please.（放句尾时前面加逗号）'),
 ('G3_K06', 'OK', '/ˌoʊˈkeɪ/', 'O - K', 'adj./adv.', '好的，可以；不错', '👌', S, '交际与礼仪', None, '',
  [('adv.', '好的，可以', 'Let\'s go to the park. OK!', '我们去公园吧。好的！'), ('adj.', '不错的，没事的', 'I\'m OK, thank you.', '我没事，谢谢你。')], ''),
 ('G3_K07', 'hi', '/haɪ/', 'hi', 'interj.', '嗨，你好', '👋', S, '交际与礼仪', None, '',
  [('interj.', '嗨，你好', 'Hi, I\'m Amy.', '嗨，我是艾米。')], ''),
 ('G3_K08', 'good', '/ɡʊd/', 'good', 'adj.', '好的；擅长的', '👍', Z, '个人特征与情绪', None, '',
  [('adj.', '好的', 'This is a good book.', '这是一本好书。'), ('adj.', '擅长的（be good at）', 'He is good at drawing.', '他擅长画画。')],
  '比较级 better，最高级 best（不规则）。good 是形容词，修饰名词；修饰动作用 well：He sings well.'),
 ('G3_K09', 'bad', '/bæd/', 'bad', 'adj.', '坏的；糟糕的', '👎', Z, '个人特征与情绪', None, '',
  [('adj.', '坏的；糟糕的', 'The weather is bad today.', '今天天气很糟糕。')], '比较级 worse，最高级 worst（不规则）。'),
 ('G5_K01', 'nice', '/naɪs/', 'nice', 'adj.', '美好的；友好的', '😊', Z, '个人特征与情绪', None, '',
  [('adj.', '美好的，令人愉快的', 'Nice to meet you.', '很高兴认识你。'), ('adj.', '友好的', 'She is nice to everyone.', '她对每个人都很友好。')], ''),
 ('G4_K02', 'great', '/ɡreɪt/', 'great', 'adj.', '极好的；伟大的', '🌟', Z, '个人特征与情绪', None, '',
  [('adj.', '极好的，太好了', 'That\'s a great idea!', '这是个好主意！'), ('adj.', '伟大的', 'The Great Wall is in China.', '长城在中国。')], ''),
 ('G2_K01', 'name', '/neɪm/', 'name', 'n.', '名字', '📛', S, '交际与礼仪', None, '',
  [('n.', '名字', 'What\'s your name? My name is Tom.', '你叫什么名字？我叫汤姆。')], ''),
 ('G3_K10', 'age', '/eɪdʒ/', 'age', 'n.', '年龄', '🎂', Z, '个人特征与情绪', None, '',
  [('n.', '年龄', 'They are the same age.', '他们同岁。')], '问年龄说 How old are you?，回答 I\'m ten (years old).'),
 ('G4_K03', 'money', '/ˈmʌni/', 'mon - ey', 'n.', '钱', '💰', S, '数字与计量', None, '',
  [('n.', '钱', 'I don\'t have much money.', '我没有多少钱。')], '不可数名词：前面用 much / some，不用 a 或 many；问多少钱说 How much money?'),
 ('G4_K04', 'busy', '/ˈbɪzi/', 'bus - y', 'adj.', '忙碌的', '🏃', Z, '个人特征与情绪', None, '⚠️ busy 里的 u 读 /ɪ/',
  [('adj.', '忙碌的', 'My mother is very busy today.', '我妈妈今天很忙。')], ''),
 ('G4_K05', 'late', '/leɪt/', 'late', 'adj./adv.', '迟的，晚的；晚地', '⏰', S, '节日与时间', None, '',
  [('adj.', '迟到的', 'Don\'t be late for school.', '上学别迟到。')], ''),
 ('G5_K02', 'early', '/ˈɜːrli/', 'ear - ly', 'adj./adv.', '早的；早地', '🌅', S, '节日与时间', None, '',
  [('adv.', '早地', 'I get up early every day.', '我每天早起。')], ''),
 ('G4_K06', 'free', '/friː/', 'free', 'adj.', '空闲的；免费的', '🆓', Z, '个人特征与情绪', None, '',
  [('adj.', '空闲的', 'Are you free on Sunday?', '你星期天有空吗？'), ('adj.', '免费的', 'The tickets are free.', '这些票是免费的。')], ''),
 ('G4_K07', 'cute', '/kjuːt/', 'cute', 'adj.', '可爱的', '🐱', Z, '个人特征与情绪', None, '',
  [('adj.', '可爱的', 'The little cat is so cute.', '这只小猫真可爱。')], ''),
 ('G3_K11', 'sit', '/sɪt/', 'sit', 'v.', '坐', '🪑', Z, '日常作息与动作', None, '',
  [('v.', '坐', 'Sit down, please.', '请坐下。')], '过去式 sat（不规则）；现在分词双写 t：sitting。'),
 ('G3_K12', 'stand', '/stænd/', 'stand', 'v.', '站，站立', '🧍', Z, '日常作息与动作', None, '',
  [('v.', '站，站立', 'Stand up, please.', '请起立。')], '过去式 stood（不规则）。'),
 ('G5_K03', 'call', '/kɔːl/', 'call', 'v.', '打电话；叫，称呼', '📞', Z, '日常作息与动作', None, '',
  [('v.', '打电话', 'I will call you tonight.', '我今晚给你打电话。'), ('v.', '叫，称呼', 'Please call me Amy.', '请叫我艾米。')], ''),
 ('G3_K13', 'let', '/let/', 'let', 'v.', '让', '🤝', Z, '日常作息与动作', None, '',
  [('v.', '让', 'Let\'s play football.', '我们踢足球吧。')], 'let + 人 + 动词原形：Let me help you. Let\'s = Let us。过去式还是 let。'),
 ('G3_K14', 'hurry', '/ˈhɜːri/', 'hur - ry', 'v.', '赶快，快点', '🏃‍♂️', Z, '日常作息与动作', None, '',
  [('v.', '赶快', 'Hurry up! The bus is coming.', '快点！公交车来了。')], ''),
 ('G3_K15', 'wrong', '/rɔːŋ/', 'wrong', 'adj.', '错误的；有毛病的', '❌', Z, '个人特征与情绪', None, '⚠️ wr 开头的 w 不发音',
  [('adj.', '错误的', 'This answer is wrong.', '这个答案是错的。'), ('adj.', '有毛病的', 'What\'s wrong?', '怎么了？')], ''),
 ('G3_K16', 'welcome', '/ˈwelkəm/', 'wel - come', 'adj./v./interj.', '欢迎；不用谢', '🤗', S, '交际与礼仪', None, '',
  [('interj.', '欢迎', 'Welcome to our school!', '欢迎来到我们学校！'), ('adj.', '不用谢（You\'re welcome.）', 'Thank you. You\'re welcome.', '谢谢你。不用谢。')], ''),
 ('G1_K06', 'sure', '/ʃʊr/', 'sure', 'adj./adv.', '当然；确信的', '🙆', S, '交际与礼仪', None, '',
  [('adv.', '当然', 'Can I use your pen? Sure.', '我能用你的钢笔吗？当然。'), ('adj.', '确信的', 'Are you sure?', '你确定吗？')], ''),
 ('G3_K17', 'next', '/nekst/', 'next', 'adj./adv.', '下一个的；紧挨着的', '⏭️', N, '色彩与空间方位', None, '',
  [('adj.', '下一个的', 'See you next week.', '下周见。'), ('adv.', '紧挨着（next to）', 'The bank is next to the park.', '银行在公园旁边。')], ''),
 ('G3_K18', 'middle', '/ˈmɪdəl/', 'mid - dle', 'n.', '中间', '⏺️', N, '色彩与空间方位', None, '',
  [('n.', '中间', 'I sit in the middle.', '我坐在中间。')], ''),
 ('G6_K01', 'top', '/tɑːp/', 'top', 'n.', '顶部', '🔝', N, '色彩与空间方位', None, '',
  [('n.', '顶部', 'The bird is at the top of the tree.', '鸟在树顶上。')], ''),
 ('G3_K19', 'up', '/ʌp/', 'up', 'adv./prep.', '向上', '⬆️', N, '色彩与空间方位', None, '',
  [('adv.', '向上', 'Stand up and look up!', '站起来，抬头看！')], ''),
 ('G3_K20', 'down', '/daʊn/', 'down', 'adv./prep.', '向下', '⬇️', N, '色彩与空间方位', None, '',
  [('adv.', '向下', 'Put your book down.', '把书放下。')], ''),
 ('G3_K21', 'out', '/aʊt/', 'out', 'adv.', '向外，出去', '🚪', N, '色彩与空间方位', None, '',
  [('adv.', '向外，出去', 'Let\'s go out and play.', '我们出去玩吧。')], ''),
 ('G3_K22', 'front', '/frʌnt/', 'front', 'n.', '前面', '🔜', N, '色彩与空间方位', None, '',
  [('n.', '前面（in front of）', 'There is a tree in front of my house.', '我家前面有一棵树。')],
  'in front of 在……（外部的）前面；in the front of 在……（内部的）前部：in the front of the bus。'),
 ('G3_K23', 'now', '/naʊ/', 'now', 'adv.', '现在', '⏱️', S, '节日与时间', None, '',
  [('adv.', '现在', 'What are you doing now?', '你现在在做什么？')], '常和现在进行时连用：I am reading now.'),
 ('G3_K24', 'again', '/əˈɡen/', 'a - gain', 'adv.', '再，又', '🔁', S, '节日与时间', None, '',
  [('adv.', '再，又', 'Please say it again.', '请再说一遍。')], ''),
 ('G3_K25', 'ago', '/əˈɡoʊ/', 'a - go', 'adv.', '以前', '⏪', S, '节日与时间', None, '',
  [('adv.', '以前', 'I saw him two days ago.', '两天前我看见了他。')], '放在时间段后面：two days ago；句子用一般过去时。'),
 ('G3_K26', 'last', '/læst/', 'last', 'adj.', '上一个的；最后的', '🔚', S, '节日与时间', None, '',
  [('adj.', '上一个的', 'I went to Beijing last summer.', '去年夏天我去了北京。'), ('adj.', '最后的', 'Z is the last letter.', 'Z 是最后一个字母。')], ''),
 ('G3_K27', 'well', '/wel/', 'well', 'adv./adj.', '好地；健康的', '🙆‍♂️', Z, '身体与健康', None, '',
  [('adv.', '好地', 'She sings very well.', '她唱歌唱得很好。'), ('adj.', '健康的', 'I don\'t feel well.', '我感觉不舒服。')],
  'good 修饰名词（a good singer），well 修饰动作（sings well）；比较级 better，最高级 best。'),
 ('G3_K28', 'lot', '/lɑːt/', 'lot', 'n.', '许多（a lot / a lot of）', '➕', S, '数字与计量', None, '',
  [('n.', '许多', 'There are a lot of books in the library.', '图书馆里有许多书。')], 'a lot of 后面可接可数名词复数，也可接不可数名词：a lot of apples, a lot of water。'),
 ('G3_K29', 'dear', '/dɪr/', 'dear', 'adj.', '亲爱的', '💌', S, '交际与礼仪', None, '',
  [('adj.', '亲爱的', 'Dear Tom, how are you?', '亲爱的汤姆，你好吗？')], '写信开头：Dear + 名字，后面用逗号。'),
 ('G3_K30', 'candle', '/ˈkændəl/', 'can - dle', 'n.', '蜡烛', '🕯️', Z, '居家与生活', None, '',
  [('n.', '蜡烛', 'There are ten candles on the cake.', '蛋糕上有十根蜡烛。')], ''),
 ('G5_K04', 'chore', '/tʃɔːr/', 'chore', 'n.', '家务活', '🧹', Z, '居家与生活', None, '',
  [('n.', '家务活', 'I do some chores at home every day.', '我每天在家做一些家务。')], ''),
 ('G3_K31', 'email', '/ˈiːmeɪl/', 'e - mail', 'n./v.', '电子邮件；发电子邮件', '📧', S, '交际与礼仪', None, '',
  [('n.', '电子邮件', 'I write an email to my friend.', '我给朋友写一封电子邮件。')], ''),
 ('G3_K32', 'TV', '/ˌtiːˈviː/', 'T - V', 'n.', '电视', '📺', Z, '居家与生活', None, '',
  [('n.', '电视', 'I watch TV after dinner.', '我晚饭后看电视。')], 'TV 是 television 的缩写；watch TV 不加 the。'),
 ('G2_K02', 'favourite', '/ˈfeɪvərɪt/', 'fa - vour - ite', 'adj./n.', '最喜欢的', '❤️', Z, '个人特征与情绪', None, '🇬🇧 favourite（英式）/ 🇺🇸 favorite（美式）',
  [('adj.', '最喜欢的', 'My favourite colour is blue.', '我最喜欢的颜色是蓝色。')], 'favourite 本身就是“最”喜欢，前面不再加 most。'),
 ('G3_K33', 'Mr', '/ˈmɪstər/', 'Mr', 'n.', '先生（用在男子的姓前）', '👨', S, '交际与礼仪', None, '',
  [('n.', '先生', 'Mr Li is our English teacher.', '李先生是我们的英语老师。')], 'Mr / Mrs / Ms / Miss 后面接姓：Mr Li；英式不加点，美式写 Mr.'),
 ('G3_K34', 'Mrs', '/ˈmɪsɪz/', 'Mrs', 'n.', '太太，夫人（用在姓前）', '👩', S, '交际与礼仪', None, '',
  [('n.', '太太，夫人', 'Mrs Wang is at home.', '王太太在家。')], ''),
 ('G3_K35', 'Ms', '/mɪz/', 'Ms', 'n.', '女士（对女子的通用称呼）', '👩‍💼', S, '交际与礼仪', None, '',
  [('n.', '女士', 'Ms White is a doctor.', '怀特女士是一名医生。')], ''),
 ('G3_K36', 'Miss', '/mɪs/', 'Miss', 'n.', '小姐；（学生称呼女老师）老师', '👧', S, '交际与礼仪', None, '',
  [('n.', '小姐；老师', 'Good morning, Miss Li!', '李老师，早上好！')], ''),
 ('G3_K37', 'hard', '/hɑːrd/', 'hard', 'adj./adv.', '困难的；努力地', '🏋️', Z, '个人特征与情绪', None, '',
  [('adj.', '困难的', 'This question is hard.', '这道题很难。'), ('adv.', '努力地', 'He works hard.', '他工作很努力。')], ''),
 ('G3_K38', 'police', '/pəˈliːs/', 'po - lice', 'n.', '警察（总称）', '👮', S, '职业与社会', None, '',
  [('n.', '警察', 'The police are helping the old man.', '警察在帮助那位老人。')], 'the police 作主语时动词用复数 are；一名警察说 a police officer。'),
 ('G4_K08', 'China', '/ˈtʃaɪnə/', 'Chi - na', 'n.', '中国', '🇨🇳', S, '城市与场所', None, '',
  [('n.', '中国', 'I am from China.', '我来自中国。')], '国名首字母大写；小写 china 是“瓷器”。'),
 ('G3_K39', 'cream', '/kriːm/', 'cream', 'n.', '奶油', '🍦', Z, '食物与饮品', None, '',
  [('n.', '奶油', 'There is cream on the cake.', '蛋糕上有奶油。')], ''),
]

def build():
    sys.path.insert(0, str(HERE)); import phon_gen as P
    cmu = P.load_cmu(); out = []; md_rows = []
    for (i, word, ph, syl, pos, mean, emo, mac, sub, func, alert, senses, sc) in ROWS:
        ss = [{'pos': p, 'meaning': m, 'ex_en': e, 'ex_zh': z, 'scene': ''} for p, m, e, z in senses]
        light = {'id': i, 'word': word, 'phonetic': ph, 'syllables': syl, 'pos': pos, 'meaning': mean, 'emoji': emo,
                 'freq_rank': 9000 + len(out), 'is_function_word': bool(func),
                 'func_info': {'type': func[0], 'grammar_id': func[1], 'tip': func[2]} if func else None,
                 'theme_macro': mac, 'theme_sub': sub, 'sight_type': '', 'irregular_info': None, 'has_polysemy': False,
                 'spelling_alert': alert, 'kebiao_level': '二级', 'added_by': '35-A2'}
        heavy = {'senses': ss, 'affix_root': '', 'collocations': {'verbs': [], 'adjs': []}, 'etymology': '', 'syntax_contrast': sc,
                 'memory_tip': '', 'visual_scene': '', 'example_zh': ss[0]['ex_zh'], 'polysemy_data': None, 'example_en': ss[0]['ex_en']}
        out.append({'light': light, 'heavy': heavy})
        cm = ' '.join('/' + P.arpa2ipa(v) + '/' for h in word.split(' / ') for v in cmu.get(h.lower(), [])[:2])
        md_rows.append(f"| {i} | {word} | {ph} | {cm} | {pos} | {mean} | {mac} · {sub} | {'功能词 ' + func[1] if func else ''} | {ss[0]['ex_en']} |")
    (LAB / 'a2_kebiao_add.json').write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding='utf-8')
    md = ['# 决策 35 A2 第 1 批 · 课标二级缺词补词条（60 词）', '',
          '- 收词来源：《义务教育英语课程标准（2022 年版）》附录 3 二级词汇表（教育部原件 http://www.moe.gov.cn/srcsite/A26/s8001/202204/W020220420582349487953.pdf ；清单 `kebiao2.json` 500 词，数词 / 月份 / 星期在课标里另列，未参与比对）。补完后 `src/kebiaocheck.py` 逐词能在 VOCAB_DB 找到（词头按「 / 」拆分）。',
          '- 音标：CMUdict 与 Wiktionary 逐词对照（缓存 /workspace/work/etym/wikt_ipa/，不入库），美式口径同 A1；功能词强读 + 弱读都列。下表「CMUdict」列是 CMUdict 前两个读音原样转写。',
          '- 年级：**暂定**（人教社区词表有的取其年级，没有的放 G3），A5 统一重排；id 用 `G<年级>_K<序号>`，新增字段 `kebiao_level: 二级`、`added_by: 35-A2`。',
          '- 释义、例句（补写，只用课标词）、语法提示由本道按常用词典义项撰写；词源 / 构词 / 搭配不编，留空——词卡会显示 ETYM_DB 里已有的可核实词源（若有）；搭配在 A4 补。',
          '- 8 个功能词（a / an、the、be、can、will、must、should、not）走功能词卡（不播单词卡动画），挂对应语法点。', '',
          '| id | 词 | 音标 | CMUdict | 词性 | 释义 | 主题 | 功能词 | 例句（补写） |', '|---|---|---|---|---|---|---|---|---|'] + md_rows
    (LAB / 'A2_KEBIAO_ADD.md').write_text('\n'.join(md) + '\n', encoding='utf-8')
    print('a2 entries', len(out))

if __name__ == '__main__' and '--dolch' not in sys.argv: build()

# ---------------- A2 第 2 批：Dolch 220 视觉高频词（lab/audit35/dolch220.json） ----------------
# 词库没有的 20 个：9 个新建完整词条；11 个屈折 / 缩写形式建别名词条并到原形（走 WORD_ALIAS，主卡显示「过去式：said」类标签）；
# 另把 A2 第 1 批补进原形后、原来没原形的 6 个 V6_MORPH 变形词（was / were / better / best / worse / worst）也并到原形。
DOLCH_NEW = [
 ('G3_K40', 'into', '/ˈɪntuː/', 'in - to', 'prep.', '进入，到……里面', '📥', N, '色彩与空间方位',
  ('介词', 'G14', '表示从外到里的动作：go into the room；in 只表示在里面的位置。'), '',
  [('prep.', '进入，到……里面', 'The cat runs into the house.', '猫跑进了房子。')], ''),
 ('G3_K41', 'soon', '/suːn/', 'soon', 'adv.', '很快，不久', '🔜', S, '节日与时间', None, '',
  [('adv.', '很快，不久', 'Dinner will be ready soon.', '晚饭很快就好。')], ''),
 ('G3_K42', 'as', '/æz/ /əz/', 'as', 'adv./conj./prep.', '像……一样；作为', '🟰', Z, '语法功能与指代',
  ('连词 / 副词', 'G37', 'as + 形容词原级 + as 表示“和……一样”：I am as tall as Tom.'), '',
  [('adv.', '和……一样（as … as）', 'I am as tall as my brother.', '我和我哥哥一样高。')], ''),
 ('G3_K43', 'around', '/əˈraʊnd/', 'a - round', 'prep./adv.', '在……周围；到处', '🔄', N, '色彩与空间方位', None, '',
  [('prep.', '在……周围', 'We sit around the table.', '我们围着桌子坐。')], ''),
 ('G3_K44', 'off', '/ɔːf/', 'off', 'adv./prep.', '离开；（电器）关着', '📴', N, '色彩与空间方位', None, '',
  [('adv.', '关着（turn off）', 'Please turn off the light.', '请关灯。'), ('adv.', '脱下，离开（take off）', 'Take off your coat.', '脱下你的外套。')], ''),
 ('G3_K45', 'pull', '/pʊl/', 'pull', 'v.', '拉', '🪢', Z, '日常作息与动作', None, '',
  [('v.', '拉', 'Pull the door. Don\'t push it.', '拉门，别推。')], ''),
 ('G3_K46', 'upon', '/əˈpɑːn/', 'up - on', 'prep.', '在……上面（= on，多用于书面）', '📖', Z, '语法功能与指代',
  ('介词', 'G14', '意思和 on 一样，多用在书面和故事里：Once upon a time（从前）。'), '',
  [('prep.', '在……上面', 'Once upon a time, there was a little rabbit.', '从前，有一只小兔子。')], ''),
 ('G3_K47', 'own', '/oʊn/', 'own', 'adj./v.', '自己的；拥有', '🏠', Z, '个人特征与情绪', None, '',
  [('adj.', '自己的', 'I have my own room.', '我有我自己的房间。')], ''),
 ('G3_K48', 'shall', '/ʃæl/ /ʃəl/', 'shall', 'modal v.', '将；……好吗（提建议）', '🤔', Z, '语法功能与指代',
  ('情态动词', 'G25', '多用于 I / we 开头的问句提建议：Shall we go now?（我们现在走好吗？）'), '',
  [('modal v.', '……好吗（提建议）', 'Shall we play football after school?', '放学后我们踢足球好吗？')], ''),
]
# (别名 id, 词, 音标, 词性, 释义, 例句, 译文, 主词条 id, 关系)
DOLCH_ALIAS = [
 ('G3_KA01', 'said', '/sed/', 'v.', 'say 的过去式（说了）', 'She said hello to me.', '她跟我打了招呼。', 'G3_0625', '过去式'),
 ('G3_KA02', 'goes', '/ɡoʊz/', 'v.', 'go 的第三人称单数', 'He goes to school by bus.', '他坐公交车上学。', 'V6_日常_1', '三单'),
 ('G3_KA03', 'going', '/ˈɡoʊɪŋ/', 'v.', 'go 的现在分词', 'I am going to the park.', '我正要去公园。', 'V6_日常_1', '现在分词'),
 ('G3_KA04', 'does', '/dʌz/', 'v.', 'do 的第三人称单数', 'She does her homework every day.', '她每天做作业。', 'V6_日常_3', '三单'),
 ('G3_KA05', 'done', '/dʌn/', 'v.', 'do 的过去分词', 'I have done my homework.', '我已经做完作业了。', 'V6_日常_3', '过去分词'),
 ('G3_KA06', "don't", '/doʊnt/', 'v.', 'do not 的缩写（不）', "I don't like milk.", '我不喜欢牛奶。', 'V6_日常_3', '否定缩写'),
 ('G3_KA07', 'has', '/hæz/', 'v.', 'have 的第三人称单数', 'He has a new bike.', '他有一辆新自行车。', 'V6_日常_5', '三单'),
 ('G3_KA08', 'got', '/ɡɑːt/', 'v.', 'get 的过去式', 'I got a gift yesterday.', '我昨天收到一份礼物。', 'V6_日常_0', '过去式'),
 ('G3_KA09', 'been', '/bɪn/', 'v.', 'be 的过去分词', 'I have been to Beijing.', '我去过北京。', 'G3_K01', '过去分词'),
 ('G3_KA10', 'could', '/kʊd/', 'modal v.', 'can 的过去式（能，会）', 'I could swim when I was five.', '我五岁时就会游泳了。', 'G1_K03', '过去式'),
 ('G3_KA11', 'would', '/wʊd/', 'modal v.', 'will 的过去式（将会）', 'He said he would come.', '他说他会来。', 'G3_K02', '过去式'),
]
OLD_ALIAS = {'V6_MORPH_26': ['G3_K01', '过去式'], 'V6_MORPH_27': ['G3_K01', '过去式'], 'V6_MORPH_60': ['G3_K08', '比较级'],
             'V6_MORPH_61': ['G3_K08', '最高级'], 'V6_MORPH_62': ['G3_K09', '比较级'], 'V6_MORPH_63': ['G3_K09', '最高级']}

def build_dolch():
    out = []
    for (i, word, ph, syl, pos, mean, emo, mac, sub, func, alert, senses, sc) in DOLCH_NEW:
        ss = [{'pos': p, 'meaning': m, 'ex_en': e, 'ex_zh': z, 'scene': ''} for p, m, e, z in senses]
        out.append({'light': {'id': i, 'word': word, 'phonetic': ph, 'syllables': syl, 'pos': pos, 'meaning': mean, 'emoji': emo,
                              'freq_rank': 9100 + len(out), 'is_function_word': bool(func),
                              'func_info': {'type': func[0], 'grammar_id': func[1], 'tip': func[2]} if func else None,
                              'theme_macro': mac, 'theme_sub': sub, 'sight_type': '', 'irregular_info': None, 'has_polysemy': False,
                              'spelling_alert': alert, 'kebiao_level': '', 'added_by': '35-A2 Dolch'},
                    'heavy': {'senses': ss, 'affix_root': '', 'collocations': {'verbs': [], 'adjs': []}, 'etymology': '', 'syntax_contrast': sc,
                              'memory_tip': '', 'visual_scene': '', 'example_zh': ss[0]['ex_zh'], 'polysemy_data': None, 'example_en': ss[0]['ex_en']}})
    alias = dict(OLD_ALIAS)
    for (i, word, ph, pos, mean, en, zh, main, rel) in DOLCH_ALIAS:
        out.append({'light': {'id': i, 'word': word, 'phonetic': ph, 'syllables': word, 'pos': pos, 'meaning': mean, 'emoji': '🔁',
                              'freq_rank': 9100 + len(out), 'is_function_word': False, 'func_info': None, 'theme_macro': '人与自我',
                              'theme_sub': '语法功能与指代', 'sight_type': '', 'irregular_info': None, 'has_polysemy': False, 'spelling_alert': '',
                              'kebiao_level': '', 'added_by': '35-A2 Dolch 别名'},
                    'heavy': {'senses': [{'pos': pos, 'meaning': mean, 'ex_en': en, 'ex_zh': zh, 'scene': ''}], 'affix_root': '',
                              'collocations': {'verbs': [], 'adjs': []}, 'etymology': '', 'syntax_contrast': '', 'memory_tip': '', 'visual_scene': '',
                              'example_zh': zh, 'polysemy_data': None, 'example_en': en},
                    'alias': [main, rel]})
        alias[i] = [main, rel]
    (LAB / 'a2_dolch_add.json').write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding='utf-8')
    (LAB / 'a2_alias.json').write_text(json.dumps(alias, ensure_ascii=False, indent=1), encoding='utf-8')
    print('dolch entries', len(out), 'alias', len(alias))

if __name__ == '__main__' and '--dolch' in sys.argv: build_dolch()
