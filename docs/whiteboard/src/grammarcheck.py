#!/usr/bin/env python3
"""grammarcheck.py —— 决策 35-B2 防回退：语法数据硬伤检查（只读主文件，输出「不合格 N」，N>0 返回 1）。
1. 句子积木：角色只能是 S / V / O / C / A；系动词（be / smell / look / sound / taste / feel / keep / become）后面的成分不能标 O（应是 C 表语）。
2. 黑名单：已纠正过的硬伤原句 / 说法不得再出现在 GRAMMAR_DB、语法例句库 GRAMMAR_EX_JSON、疑问词雷达、重音规律表里。"""
import json, re, sys, pathlib
APP = pathlib.Path(__file__).resolve().parents[3] / '萌星小学英语_最终合并版.html'
s = APP.read_text(encoding='utf-8')
bad = []

def js_value(name):
    i = s.index('const ' + name + ' = ') + len('const ' + name + ' = ')
    return json.JSONDecoder().raw_decode(s, i)[0]

G = js_value('GRAMMAR_DB')
LINK = {'is', 'am', 'are', 'was', 'were', 'be', "isn't", "aren't", "wasn't", "weren't",
        'smell', 'smells', 'look', 'looks', 'sound', 'sounds', 'taste', 'tastes', 'feel', 'feels', 'keep', 'keeps', 'become', 'becomes'}
for g in G:
    items = g['step4_quiz']['blocks']['items']
    for k, it in enumerate(items):
        if it['role'] not in 'SVOCA' or len(it['role']) != 1:
            bad.append(f"{g['id']} 积木角色非法：{it}")
        if it['role'] == 'O' and k > 0:
            prev_v = [x for x in items[:k] if x['role'] == 'V']
            if prev_v:
                w = re.sub(r'[^\w\']', ' ', prev_v[-1]['text'].lower()).split()
                if w and w[-1] in LINK:
                    bad.append(f"{g['id']} 系动词「{prev_v[-1]['text']}」后的「{it['text']}」标成了 O（应为 C 表语）")

tag = '<script type="application/json" id="GRAMMAR_EX_JSON">'
i = s.index(tag) + len(tag); EX = json.loads(s[i:s.index('</script>', i)].replace('<\\/', '</'))
ex_text = '\n'.join(x[0] for v in EX.values() for x in v)
g_text = json.dumps(G, ensure_ascii=False)
def region(name, n=6000):
    i = s.index('const ' + name); return s[i:i + n]
other = region('INTERROGATIVE_RADAR_DB', 4000) + region('STRESS_AND_SCHWA_DB', 3000)

BLACK = [
    (r'like best, \w+ or \w+\?', '两项比较用了 best（应为 better）'),
    (r'clean river', '「清澈的小河」应为 clear river'),
    (r'smells very delicious', 'delicious 一般不加 very'),
    (r'stopped and look at', '病句 The rain stopped and look at…'),
    (r'second day of a week', '应为 the week'),
    (r'Subway is a fast public transport', '病句（缺冠词、transport 用法）'),
    (r'垫一个鼻音', 'G05 a/an 历史讲反（an 是原形）'),
    (r'不是 i 变 a', 'G22 补丁残文'),
    (r'How do you like 是对的）', 'G32 补丁残文'),
    (r'必须把 and 换成 or', 'G15 否定句 and→or 说得太绝对'),
    (r'并列词必须换成', 'G15 否定句 and→or 说得太绝对'),
    (r'绝不能把时间地点插在', 'G28 绝对化（频度副词在主谓之间、时间状语可放句首）'),
    (r'时间词放句尾！', 'G28 绝对化'),
    (r'有生命的加 \*\*-es\*\*', 'G01 -o 复数口诀未标 💡'),
    (r'重音铁律', '名前动后说成铁律'),
    (r'100% 吸在', '后缀重音说成 100%'),
]
for pat, why in BLACK:
    for name, text in (('GRAMMAR_DB', g_text), ('例句库', ex_text), ('雷达/重音表', other)):
        for m in re.finditer(pat, text):
            bad.append(f'{name}：{why}：…{text[max(0, m.start() - 30):m.end() + 20]}…')

for b in bad: print('BAD', b)
print(f'语法硬伤检查：积木 {len(G)} 个、例句库 {sum(len(v) for v in EX.values())} 句；不合格 {len(bad)}')
sys.exit(1 if bad else 0)
