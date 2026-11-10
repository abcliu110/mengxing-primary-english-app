#!/usr/bin/env python3
"""grammarcheck.py —— 决策 35-B2 防回退：语法数据硬伤检查（只读文件，输出「不合格 N」，N>0 返回 1）。
1. 句子积木：角色只能是 S / V / O / C / A；系动词（be / smell / look / sound / taste / feel / keep / become）后面的成分不能标 O（应是 C 表语）。
2. 黑名单：已纠正过的硬伤原句 / 说法不得再出现在 GRAMMAR_DB、语法例句库 GRAMMAR_EX_JSON、疑问词雷达、重音规律表里。

用法：python3 grammarcheck.py [APP.html]
  APP.html 缺省为现主文件 laws-prototype/mengxing-prototype-v1.html。
  2026-11-10 第八波第 13 项修（与 wbtextcheck 第七波同法）：旧版写死的
  「萌星小学英语_最终合并版.html」已删（2026-11-04），脚本启动即 FileNotFoundError，
  runall 的语法硬伤一步是断的；现接受路径参数、不再读老 App。
  事实源现状（2026-11-10 核实）：
  - GRAMMAR_DB（含 step4_quiz 积木、why_explanation、chant）只存在于已删老 App，
    现主文件与全仓库均无此表 → ① 积木检查与 ② 的 GRAMMAR_DB 腿跳过（打印说明，不静默）。
  - 语法例句库现行事实源是仓库内 docs/whiteboard/lab/GRAMMAR_EXAMPLES.json
    （决策 34-B 建库 3809 句、35-B2 改 5 句删 3 句，现 3806 句）；APP 内若有
    GRAMMAR_EX_JSON 优先用 APP 的，否则用该 lab 文件 → ② 的例句库腿可跑。
  - 疑问词雷达 / 重音规律表（INTERROGATIVE_RADAR_DB、STRESS_AND_SCHWA_DB）同样只存在于
    老 App → ② 的雷达/重音腿跳过（打印说明）。① 与 ② 其余腿若要全量恢复，须先定
    新事实源（如从 LAWDATA 重定口径），另立项，本脚本不自行补数据。
  退役线：若将来连例句库腿也无事实源（整表无一可跑），按 anchorcheck 例立 RETIRED
  标记退役，不留一个启动即报错的脚本（见 src/anchorcheck.RETIRED.md）。
"""
import json, re, sys, pathlib
HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
MAIN = ROOT / 'laws-prototype' / 'mengxing-prototype-v1.html'
LAB_EX = HERE.parent / 'lab' / 'GRAMMAR_EXAMPLES.json'

LINK = {'is', 'am', 'are', 'was', 'were', 'be', "isn't", "aren't", "wasn't", "weren't",
        'smell', 'smells', 'look', 'looks', 'sound', 'sounds', 'taste', 'tastes', 'feel', 'feels', 'keep', 'keeps', 'become', 'becomes'}

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

def js_value(s, name):
    """从 APP 文本取 const <name> = <JSON>；没有则返回 None（该腿跳过，不报错）。"""
    try:
        i = s.index('const ' + name + ' = ') + len('const ' + name + ' = ')
        return json.JSONDecoder().raw_decode(s, i)[0]
    except (ValueError, json.JSONDecodeError):
        return None

def load_ex(s):
    """语法例句库：优先 APP 内的 GRAMMAR_EX_JSON；没有则用仓库 lab/GRAMMAR_EXAMPLES.json；都没有返回 (None, None)。"""
    tag = '<script type="application/json" id="GRAMMAR_EX_JSON">'
    try:
        i = s.index(tag) + len(tag)
        ex = json.loads(s[i:s.index('</script>', i)].replace('<\\/', '</'))
        return ex, 'APP 内 GRAMMAR_EX_JSON'
    except ValueError:
        pass
    if LAB_EX.exists():
        return json.loads(LAB_EX.read_text(encoding='utf-8')), f'lab/GRAMMAR_EXAMPLES.json'
    return None, None

def region(s, name, n=6000):
    try:
        i = s.index('const ' + name)
        return s[i:i + n]
    except ValueError:
        return None

def main():
    app = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else MAIN
    try:
        s = app.read_text(encoding='utf-8')
    except FileNotFoundError:
        print(f'grammarcheck：文件不存在：{app}')
        sys.exit(2)
    bad = []
    skipped = []

    G = js_value(s, 'GRAMMAR_DB')
    if G is None:
        skipped.append('① 句子积木（需 GRAMMAR_DB.step4_quiz，该表只存在于已删老 App，现主文件与全仓库均无）')
    else:
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

    legs = []
    if G is not None:
        legs.append(('GRAMMAR_DB', json.dumps(G, ensure_ascii=False)))
    else:
        skipped.append('② 黑名单 GRAMMAR_DB 腿（需 GRAMMAR_DB，同上）')
    EX, ex_src = load_ex(s)
    if EX is not None:
        legs.append(('例句库', '\n'.join(x[0] for v in EX.values() for x in v)))
    else:
        skipped.append('② 黑名单例句库腿（APP 内无 GRAMMAR_EX_JSON，且 lab/GRAMMAR_EXAMPLES.json 也不存在）')
    radar = region(s, 'INTERROGATIVE_RADAR_DB', 4000)
    stress = region(s, 'STRESS_AND_SCHWA_DB', 3000)
    if radar is not None or stress is not None:
        legs.append(('雷达/重音表', (radar or '') + (stress or '')))
    else:
        skipped.append('② 黑名单雷达/重音表腿（需 INTERROGATIVE_RADAR_DB / STRESS_AND_SCHWA_DB，两表只存在于已删老 App）')
    for pat, why in BLACK:
        for name, text in legs:
            for m in re.finditer(pat, text):
                bad.append(f'{name}：{why}：…{text[max(0, m.start() - 30):m.end() + 20]}…')

    for b in bad:
        print('BAD', b)
    for sk in skipped:
        print(f'grammarcheck：跳过 {sk}')
    n_blocks = len(G) if G is not None else 0
    n_ex = sum(len(v) for v in EX.values()) if EX is not None else 0
    ex_note = f'（{ex_src}）' if EX is not None else '（跳过）'
    print(f'语法硬伤检查：积木 {n_blocks if G is not None else "—"} 个、例句库 {n_ex} 句{ex_note}；不合格 {len(bad)}')
    sys.exit(1 if bad else 0)

if __name__ == '__main__':
    main()
