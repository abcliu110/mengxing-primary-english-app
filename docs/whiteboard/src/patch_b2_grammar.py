"""patch_b2_grammar.py —— 决策 35-B2：语法讲解 / 句子积木 / 测验 / 发音规律里的硬伤（对照表 lab/audit35/GRAMMAR_FIX.md）。
幂等：每处先看改后文字是否已在，在就跳过；否则断言改前文字恰好出现，再替换。写回走 appwrite.save（anchorcheck + jscheck）。
- GRAMMAR_DB：积木加 C（表语）角色并重标 14 点 + G40 拆法；G05 a/an 史实；G15 and→or 绝对化；G22 / G32 补丁残文；G28 时间位置；G35 clear river；G11 smells delicious；G01 -o 复数口诀标 💡；G07 复数排序标 ⚠️。
- 积木渲染：roleShapePrefix 加「◇ 表语」，O 改「◆ 宾语」；CSS .block-chip.role-C；图例加紫色表语。
- STRESS_AND_SCHWA_DB：「名前动后铁律」「后缀重音磁铁 100%」改为规律 + ✂️ 例外 + 💡 比喻说明。
- FIRST_PRINCIPLES_DB（口腔省力原理）：a→an 方向改正（an 是原形）。场景 fp_economy 由道 r38 重建，这里只改数据。
"""
import sys, pathlib, json
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from appwrite import save, APP

s = APP.read_text(encoding='utf-8')
n_done = n_skip = 0

def rep(old, new, count=1):
    global s, n_done, n_skip
    if old == new: return
    if new in s: n_skip += 1; return
    c = s.count(old)
    assert c == count, f'锚点出现 {c} 次（应 {count}）：{old[:80]}'
    s = s.replace(old, new); n_done += 1

# ---------- GRAMMAR_DB（JSON 整体解析改字段） ----------
tag = 'const GRAMMAR_DB = '
i = s.index(tag) + len(tag)
G, end = json.JSONDecoder().raw_decode(s, i)
assert json.dumps(G, ensure_ascii=False, separators=(',', ':')) == s[i:end]
by = {g['id']: g for g in G}

def setf(gid, path, old, new):
    """path: 字段路径列表；old 为改前值（断言），已是 new 则跳过。"""
    global n_done, n_skip
    o = by[gid]
    for k in path[:-1]: o = o[k]
    cur = o[path[-1]]
    if cur == new: n_skip += 1; return
    assert cur == old, f'{gid} {path} 现值不符：{str(cur)[:120]}'
    o[path[-1]] = new; n_done += 1

def blocks(gid, old_items, new_items, zh=None):
    b = by[gid]['step4_quiz']['blocks']
    setf(gid, ['step4_quiz', 'blocks', 'items'], old_items, new_items)
    if zh: setf(gid, ['step4_quiz', 'blocks', 'zh'], zh[0], zh[1])

T = lambda *xs: [{'text': t, 'role': r} for t, r in xs]
# 表语（C）重标：系动词 be / smell / keep 后面的成分不是宾语
blocks('G04', T(('This', 'S'), ('is', 'V'), ("my sister's new bike.", 'O')), T(('This', 'S'), ('is', 'V'), ("my sister's new bike.", 'C')))
blocks('G08', T(('This storybook', 'S'), ('is', 'V'), ('hers, not mine.', 'O')), T(('This storybook', 'S'), ('is', 'V'), ('hers, not mine.', 'C')))
blocks('G09', T(('Are', 'V'), ('those', 'S'), ('ducks', 'O'), ('over there?', 'A')), T(('Are', 'V'), ('those', 'S'), ('ducks', 'C'), ('over there?', 'A')))
blocks('G11', T(('This bowl of noodles', 'S'), ('smells', 'V'), ('very delicious.', 'O')), T(('This bowl of noodles', 'S'), ('smells', 'V'), ('delicious.', 'C')))
blocks('G16', T(('All the children', 'S'), ('are', 'V'), ('very happy', 'O'), ('today.', 'A')), T(('All the children', 'S'), ('are', 'V'), ('very happy', 'C'), ('today.', 'A')))
blocks('G17', T(('The weather', 'S'), ('was', 'V'), ('very cold', 'O'), ('last Saturday.', 'A')), T(('The weather', 'S'), ('was', 'V'), ('very cold', 'C'), ('last Saturday.', 'A')))
blocks('G25', T(('The weather', 'S'), ('will be', 'V'), ('sunny and warm', 'O'), ('tomorrow.', 'A')), T(('The weather', 'S'), ('will be', 'V'), ('sunny and warm', 'C'), ('tomorrow.', 'A')))
blocks('G27', T(('We', 'S'), ('must keep', 'V'), ('quiet', 'O'), ('in the library.', 'A')), T(('We', 'S'), ('must keep', 'V'), ('quiet', 'C'), ('in the library.', 'A')))
blocks('G31', T(('Whose dictionary', 'O'), ('is', 'V'), ('this', 'S'), ('on the desk?', 'A')), T(('Whose dictionary', 'C'), ('is', 'V'), ('this', 'S'), ('on the desk?', 'A')))
blocks('G32', T(('How tall and how heavy', 'O'), ('is', 'V'), ('your little brother?', 'S')), T(('How tall and how heavy', 'C'), ('is', 'V'), ('your little brother?', 'S')))
blocks('G34', T(('How beautiful', 'O'), ('this red rose', 'S'), ('is!', 'V')), T(('How beautiful', 'C'), ('this red rose', 'S'), ('is!', 'V')))
blocks('G35', T(('There is', 'V'), ('a clean river', 'S'), ('in the forest.', 'A')), T(('There is', 'V'), ('a clear river', 'S'), ('in the forest.', 'A')))
blocks('G37', T(('My schoolbag', 'S'), ('is', 'V'), ('as heavy as yours.', 'O')), T(('My schoolbag', 'S'), ('is', 'V'), ('as heavy as yours.', 'C')))
blocks('G38', T(('An elephant', 'S'), ('is', 'V'), ('bigger and heavier', 'O'), ('than a monkey.', 'A')), T(('An elephant', 'S'), ('is', 'V'), ('bigger and heavier', 'C'), ('than a monkey.', 'C')))
blocks('G39', T(('He', 'S'), ('is', 'V'), ('the fastest boy', 'O'), ('in our class.', 'A')), T(('He', 'S'), ('is', 'V'), ('the fastest boy', 'C'), ('in our class.', 'A')))
# G40：thank sb for doing sth —— you 是宾语，for helping me learn English 整体是原因状语
blocks('G40', T(('Thank you', 'V'), ('for helping me', 'A'), ('learn English.', 'O')), T(('Thank', 'V'), ('you', 'O'), ('for helping me learn English.', 'A')))

# G05：a / an 谁是原形（Etymonline「a」「an」：a 是 an「一」在辅音前丢了 n 的弱化形式）
setf('G05', ['why_explanation'],
     '【为什么 a 在元音前要变成 an？】连读 a apple 时两个元音撞在一起嘴巴卡壳，在中间垫一个鼻音 n 变成 an apple（/ən ˈæpl/），读起来立刻丝滑顺畅！所以选 a 还是 an 完全取决于“发音开头的第一个音是不是元音音素”！',
     '【a 和 an，谁是原形？】an 才是老祖宗：它来自古英语 ān「一」（今天的 one 也是它变来的）。后来在辅音前面，n 慢慢读丢了，就成了 a；在元音前面 n 留了下来（an apple /ən ˈæpl/），两个元音不撞在一起，读起来顺。所以今天选 a 还是 an，只看后面单词“发音的第一个音是不是元音音素”！')

# G01 ⑤：-o 结尾复数的「有生命 / 无生命」只是口诀
setf('G01', ['step3_rules', 4],
     '⑤ 以 **o** 结尾：有生命的加 **-es**（potatoes, tomatoes, heroes），无生命的加 **-s**（photos, zoos, pianos）',
     '⑤ 以 **o** 结尾：potato ➔ **potatoes**, tomato ➔ **tomatoes**, hero ➔ **heroes** 加 **-es**；photo ➔ photos, zoo ➔ zoos, piano ➔ pianos, radio ➔ radios, kangaroo ➔ kangaroos 只加 **-s**。💡「有生命加 es、无生命加 s」只是帮助记忆的口诀，不是真规则（kangaroo 是动物也只加 s），加 -es 的几个词要单独记')
setf('G01', ['step4_quiz', 'choice', 'explain'],
     'tomato 有生命的 o 多数加 -es，kangaroo 只加 s（tomatoes）；knife 以 fe 结尾变 ves（knives）！',
     'tomato 是要单独记住的加 -es 的词（tomatoes）；knife 以 fe 结尾变 ves（knives）！')
setf('G01', ['step4_quiz', 'correct', 'options', 0], '把 photoes 改为 photos（无生命 o 结尾只加 s）', '把 photoes 改为 photos（photo 只加 s）')
setf('G01', ['step4_quiz', 'correct', 'explain'], 'photo 是无生命物品，复数直接加 s（photos）！', 'photo 的复数直接加 s（photos）；要加 -es 的只有 potato / tomato / hero 等少数几个词！')

# G07 ③：复数「we, you and they」是国内教辅说法
setf('G07', ['step3_rules', 2],
     '③ **礼貌排序**：单数按 **你、他、我 (`you, he and I`)**，复数按 **我们、你们、他们 (`we, you and they`)**',
     '③ **礼貌排序**：几个人并列时把自己放最后，单数常说 **你、他、我 (`you, he and I`)**。⚠️ 复数「`we, you and they`」是国内教辅的口诀，英语里并没有这样固定的规定')

# G11：delicious 本身已是「非常好吃」，一般不加 very
setf('G11', ['step3_rules', 1],
     '② **表语搭桥**：主语 + **be** 或 **五大感官系动词 (`look / sound / smell / taste / feel`)** + **形容词**！',
     '② **表语搭桥**：主语 + **be** 或 **五大感官系动词 (`look / sound / smell / taste / feel`)** + **形容词**！（⚠️ delicious 本身就是“非常好吃”，一般不说 very delicious，说 smells delicious 即可）')

# G15：否定句 and → or 不是铁律
setf('G15', ['step2_options', 0],
     '在否定句（含 not/no）中连接两个并列成分表“既不…也不…”时，必须把 and 换成 or！',
     '在否定句（含 not/no）中表示“两样都不”时，通常把 and 换成 or！')
setf('G15', ['step3_rules', 0],
     '① **and vs or 否定转换铁律**：肯定句并列用 **and**；一旦变成**否定句**，并列词必须换成 **or**！',
     '① **and vs or 否定转换**：肯定句并列用 **and**；否定句里表示“两样都不”时，通常换成 **or**（I don\'t like pears or peaches）。✂️ 小学简化：I can\'t sing and dance 也是对的，意思是“不能边唱边跳”')
setf('G15', ['step4_quiz', 'correct', 'q'], '【火眼金睛改错】I can\'t sing and dance.', '【火眼金睛改错】Which do you like better, tea and milk?')
setf('G15', ['step4_quiz', 'correct', 'options'],
     ['把 and 改为 or（否定句并列用 or）', '把 sing 改为 singing', "把 can't 改为 don't"],
     ['把 and 改为 or（二选一的问句用 or）', '把 better 改为 best', '把 Which 改为 What'])
setf('G15', ['step4_quiz', 'correct', 'explain'], '否定句中连接并列动作必须把 and 改为 or！', '让对方在两样里选一样，要用 or：tea or milk？两样里比较用 better！')

# G22 ①：come→came、run→ran 不是 i 变 a
setf('G22', ['step3_rules', 0],
     '① **i 变 a**：sing ➔ **sang**, swim ➔ **swam**, drink ➔ **drank**, sit ➔ **sat**, give ➔ **gave**, come ➔ **came**, run ➔ **ran** 注意：come→came、run→ran 不是 i 变 a。',
     '① **i 变 a**：sing ➔ **sang**, swim ➔ **swam**, drink ➔ **drank**, sit ➔ **sat**, give ➔ **gave**；**o / u 变 a**：come ➔ **came**, run ➔ **ran**')

# G28：时间状语也可放句首；频度副词在主谓之间
setf('G28', ['step3_rules', 1],
     '② **切忌中式直译**：绝不能把时间地点插在主语和谓语动词之间！',
     '② **切忌中式直译**：every morning、in the park 这类时间、地点短语不要插在主语和谓语中间；时间状语常放句尾，也可以放句首（Every morning, I read English.）。⚠️ 例外：always / usually / often 这类频度副词就放在主语和谓语中间（I always get up at seven.）')
setf('G28', ['step4_quiz', 'correct', 'options', 0], '把 every morning 移到句尾', '把 every morning 移到句尾（或句首）')
setf('G28', ['step4_quiz', 'correct', 'explain'], '时间词放句尾！', 'every morning 不能夹在主语和谓语中间：常放句尾，也可放句首 Every morning, my father reads…')

# G32 ③：补丁残文
setf('G32', ['step3_rules', 2],
     '③ **What 高频家族**：`What...like?`（问外貌性格或天气，What 问事物，How 问程度。How do you like 是对的）、`What day`（星期几）vs `What date`（几月几号）',
     '③ **What 高频家族**：`What...like?`（问外貌、性格或天气：What is she like? / What\'s the weather like?）、`What day`（星期几）vs `What date`（几月几号）。另有 `How do you like…?`（你觉得……怎么样？）也是对的，这里的 like 是动词“喜欢”')

# G35：「清澈」= clear；就近原则标 ✂️
setf('G35', ['step3_rules', 1],
     '② **就近原则**：并列多个物品时，`be` 只由**紧挨着它的第一个名词**的单复数决定！',
     '② **就近原则**：并列多个物品时，`be` 只由**紧挨着它的第一个名词**的单复数决定！（✂️ 考试按这条；英语口语里也常听到 There\'s two books… 这种说法）')

s = s[:i] + json.dumps(G, ensure_ascii=False, separators=(',', ':')) + s[end:]

# ---------- 积木渲染：表语 C ----------
rep('''  if (role === "O") return "◆ 宾/表 | ";
  return "▲ 状语 | ";''', '''  if (role === "O") return "◆ 宾语 | ";
  if (role === "C") return "◇ 表语 | ";
  return "▲ 状语 | ";''')
rep('''  /* Adverbial = Green Triangle-accented 🔺 */
  .block-chip.role-A {''', '''  /* Complement (predicative) = Purple 🟪（决策 35-B2） */
  .block-chip.role-C {
    background: #f3e8ff; color: #6b21a8; border: 2.5px solid #9333ea;
    border-radius: 4px 14px 4px 14px;
  }
  /* Adverbial = Green Triangle-accented 🔺 */
  .block-chip.role-A {''')
rep('''border:1.5px solid #d97706;">◆ 琥珀=宾/表</span>''',
    '''border:1.5px solid #d97706;">◆ 琥珀=宾语</span>
            <span style="background:#f3e8ff; color:#6b21a8; padding:2px 8px; border-radius:2px 8px; border:1.5px solid #9333ea;">◇ 紫=表语</span>''')

# ---------- STRESS_AND_SCHWA_DB ----------
rep('title: "法则 A：双音节词「名前动后」重音铁律（拼写一模一样，重音一换词性立变！）",',
    'title: "法则 A：双音节词「名前动后」重音规律（一批成对的词：拼写一样，重音一换词性就变）",')
rep('principle: "为什么同样拼写的词，当名词时重音在第一音节（前重），当动词时重音移到第二音节（后重）？因为名词代表『静态定格的事物（重心稳在开头）』，而动词代表『向前推进发力的动作（能量冲向词尾）』！",',
    'principle: "present、record、desert、export 这样的成对词，当名词时重音在第一音节（前重），当动词时重音在第二音节（后重）。✂️ 这只对一批成对词成立（词典里至少有 170 对），不是所有双音节词都这样：visit、promise 当名词当动词都前重，report、control 都后重。💡『名词稳、动词往前冲』只是帮助记忆的比喻，不是真正的原因。",')
rep('title: "法则 B：后缀「重音磁铁」定律（再长的多音节词，看一眼尾巴就知重音在哪！）",',
    'title: "法则 B：后缀「重音磁铁」规律（多音节词看尾巴，大多能猜对重音）",')
rep('principle: "遇到三四个音节的长单词（如 vacation, dictionary, musician, scientific）怎么找重音？根本不用查音标——特定后缀就像强力磁铁，永远把重音吸在固定位置！",',
    'principle: "遇到三四个音节的长单词（如 vacation, musician, scientific）怎么找重音？有些后缀像磁铁，通常把重音吸在固定位置。✂️ 大多数词适用，少数例外还是要查词典（如 Arabic、coffee）。",')
rep('nForm: "重音 100% 吸在它前面那一个音节！", vForm: "va-ˈCA-tion', 'nForm: "重音几乎总在它前面那一个音节！", vForm: "va-ˈCA-tion')
rep('nForm: "重音 100% 吸在它前面那一个音节！", vForm: "mu-ˈSI-cian', 'nForm: "重音通常在它前面那一个音节（例外：Arabic、politics）！", vForm: "mu-ˈSI-cian')
rep('nForm: "重音直接吸在后缀自己身上！"', 'nForm: "重音通常在后缀自己身上（例外：coffee、committee）！"')
rep('word: "合成名词「前重」铁律", nForm: "两个名词拼成合成词，重音永远在第一个词！"', 'word: "合成名词「前重」规律", nForm: "两个名词拼成合成词，重音通常在第一个词（✂️ 也有例外，如 apple pie 重音在 pie）！"')

# ---------- FIRST_PRINCIPLES_DB：口腔省力原理里的 a / an ----------
rep('unified: "省力真相：两个元音直接相撞（a apple）会导致喉咙卡顿（声门塞音），插入鼻音 /n/（an apple）或滑音 /j/（/ðiː eg/）充当丝滑桥梁！" },',
    'unified: "历史真相：an 才是原形（古英语 ān「一」），在辅音前 n 读丢了才变成 a；元音前留住 n（an apple），两个元音就不会撞在一起。the 在元音前读 /ði/（the egg）也是为了读得顺。" },')
rep('topBanner: "气流架桥与双唇同化律：元音撞元音加 /n/ 架桥；双唇音 /p,b,m/ 前鼻音 /n/ 自动同化为双唇鼻音 /m/！",',
    'topBanner: "留 n 不撞车与双唇同化律：an 是原形，元音前留住 n、辅音前丢掉 n 变 a；双唇音 /p,b,m/ 前鼻音 /n/ 自动同化为双唇鼻音 /m/！",')
rep('{ title: "🌉 元音防卡顿桥梁 (a ➔ an)",', '{ title: "🌉 元音前留住 n (an 是原形，辅音前变 a)",')

# ---------- 例句：两项比较用 better；transport 例句（INTERROGATIVE_RADAR_DB + 词卡例句，按原句全量替换，没有就跳过） ----------
def rep_all(old, new):
    global s, n_done, n_skip
    if old not in s: n_skip += 1; return
    s = s.replace(old, new); n_done += 1
rep('formula: "Which + 名词 (season/one) do you like best?", ex_en: "Which season do you like best, spring or summer?",',
    'formula: "Which + 名词 (season/one) do you like better / best?", ex_en: "Which season do you like better, spring or summer?",')
rep_all('Which season do you like best, spring or autumn?', 'Which season do you like better, spring or autumn?')
rep_all('"example_zh":"你最喜欢哪个季节，春天还是秋天？"', '"example_zh":"你更喜欢哪个季节，春天还是秋天？"')
rep_all('Subway is a fast public transport.', 'Buses and subways are public transport.')
rep_all('地铁是一种快速的公共交通工具。', '公共汽车和地铁都是公共交通工具。')

print(f'B2：改 {n_done} 处，已是新值跳过 {n_skip} 处')
save(s)
