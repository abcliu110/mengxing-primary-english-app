#!/usr/bin/env python3
"""app_check14.py —— 决策 34-B 回归：语法课例句库（原 src/patch_grammar_examples.py）。
① 40 课每课底部都有例句库，句数 = GRAMMAR_EX_JSON；② 句型筛选后条数对；③ 点句子朗读不报错；换课例句库跟着换。0 报错。

用法：python3 app_check14.py [APP.html]
  APP.html 缺省为现主文件 laws-prototype/mengxing-prototype-v1.html。
  2026-11-10 收尾线修（与 grammarcheck 第八波第 13 项、wbtextcheck 第七波同法）：旧版
  写死的「萌星小学英语_最终合并版.html」已删（2026-11-04），脚本启动即
  net::ERR_FILE_NOT_FOUND，runall 的语法例句库一步是断的；现接受路径参数、不再读老 App。
  现状（2026-11-10 核实）：
  - ① 可跑（静态）：语法例句库现行事实源是仓库内 docs/whiteboard/lab/GRAMMAR_EXAMPLES.json
    （决策 34-B 建库 3809 句、35-B2 改 5 句删 3 句，现 3806 句）；APP 内若有
    GRAMMAR_EX_JSON 优先用 APP 的，否则用该 lab 文件（与 grammarcheck.load_ex 同口径）。
    核查：40 课（G01–G40）齐全、每课不少于 5 句。
  - ②③④ 跳过（打印说明，不静默）：句型筛选、点读朗读、换课跟随都是已删老 App
    grammar_detail 页（#grexBox）的实时 UI 行为；现主文件无 GRAMMAR_DB、
    无 grammar_detail、无 grexBox（全仓库 grep 0 次），新 App 也无语法例句库
    呈现位（主文件内“例句库”3 处均为 Collins 短语动词词条页来源注记，与语法课无关）。
    若要恢复，须先在新 App 立语法例句库呈现位并定新口径，另立项，本脚本不自行补数据。
  退役线：若将来连例句库腿也无事实源（整表无一可跑），按 anchorcheck 例立 RETIRED
  标记退役，不留一个启动即报错的脚本（见 src/anchorcheck.RETIRED.md）。
输出最后一行「app_check14：语法例句库 N 课（来源）；不合格 M」，M>0 返回 1；无事实源返回 2。
"""
import json, sys, pathlib
HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
MAIN = ROOT / 'laws-prototype' / 'mengxing-prototype-v1.html'
LAB_EX = HERE.parent / 'lab' / 'GRAMMAR_EXAMPLES.json'
EXPECTED = [f'G{i:02d}' for i in range(1, 41)]
MIN_PER_LESSON = 5

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
        return json.loads(LAB_EX.read_text(encoding='utf-8')), 'lab/GRAMMAR_EXAMPLES.json'
    return None, None

def main():
    app = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else MAIN
    try:
        s = app.read_text(encoding='utf-8')
    except FileNotFoundError:
        print(f'app_check14：文件不存在：{app}')
        sys.exit(2)
    EX, ex_src = load_ex(s)
    if EX is None:
        print('app_check14：例句库无事实源（APP 内无 GRAMMAR_EX_JSON，且 lab/GRAMMAR_EXAMPLES.json 不存在）——整表无一可跑，见脚本头注退役线')
        sys.exit(2)
    bad = []
    keys = set(EX)
    missing = [g for g in EXPECTED if g not in keys]
    extra = sorted(keys - set(EXPECTED))
    if missing:
        bad.append(f'缺课 {missing}')
    if extra:
        bad.append(f'多余课 {extra}')
    low = [g for g in EXPECTED if g in EX and len(EX[g]) < MIN_PER_LESSON]
    if low:
        bad.append(f'少于 {MIN_PER_LESSON} 句 {[(g, len(EX[g])) for g in low]}')
    for b in bad:
        print('BAD', b)
    print('app_check14：跳过 ② 句型筛选 / ③ 点读朗读 / ④ 换课跟随（需已删老 App 的 grammar_detail 页 #grexBox，现主文件与全仓库均无该页，见脚本头注）；只跑 ① 例句库静态核查')
    n = sum(len(v) for v in EX.values())
    print(f'app_check14：语法例句库 {len(EX)} 课、{n} 句（{ex_src}）；不合格 {len(bad)}')
    sys.exit(1 if bad else 0)

if __name__ == '__main__':
    main()
