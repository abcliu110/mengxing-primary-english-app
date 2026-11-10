#!/usr/bin/env python3
"""wbtextcheck.py —— 决策 36 ①3：白板文字检查（v5/scenes/*_<n>.js 的 ITEMS）。
① Markdown 残留：白板字 / 讲解 / 朗读里出现 `**` 或反引号 → 不合格（全部场景）。
② 截断句：语法白板（hd_g*）的白板字去掉「① 典型语境：」等标签后，是 GRAMMAR_DB 某字段的真前缀（≥8 字、原句还没完）→ 不合格。
③ 底部字幕放口诀：hd_g* 朗读句的中文 = 本课口诀（应是这句英文的译文，口诀进讲解字幕）→ 不合格。
白名单 lab/audit36/wbtext_allow.json：{"场景前缀": "理由"}（决策 38 样板幕归道 r38 重做，暂列；做完删）。
输出最后一行「wbtextcheck 幕 N，不合格 M」，M>0 返回码 1。

用法：python3 docs/whiteboard/src/wbtextcheck.py [APP.html]
  APP.html 缺省为现主文件 laws-prototype/mengxing-prototype-v1.html。
  2026-11-10 第七波修：旧版写死的「萌星小学英语_最终合并版.html」已删（2026-11-04），
  脚本启动即 FileNotFoundError，SOP 五步管线第 ④ 步是断的；现接受路径参数、不再读老 App。
  注意：②③ 需 GRAMMAR_DB（why_explanation/subtitle/step1_zh/chant/step1_story/step3_rules），
  该表只存在于已删老 App，全仓库现已无此表（主文件无 GRAMMAR_DB，见底稿 wave7_wbscenes_main.md）；
  故给现主文件时只跑 ①，②③ 打印一行跳过说明、不静默。②③ 若要恢复，须先定新事实源
  （如从 LAWDATA 重定口径，另立项），不是本脚本能自行补的。
"""
import glob, json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
V5 = os.path.join(HERE, '..', 'v5')
MAIN = os.path.join(ROOT, 'laws-prototype', 'mengxing-prototype-v1.html')
ALLOW = os.path.join(HERE, '..', 'lab', 'audit36', 'wbtext_allow.json')
allow = json.load(open(ALLOW, encoding='utf-8')) if os.path.exists(ALLOW) else {}
clean = lambda s: s.replace('**', '').replace('`', '')
LABELS = ['① 典型语境：', '② 核心结构规律：', '③ 进阶要点：']

def load_db(app_path):
    """从给定 HTML 取 GRAMMAR_DB；没有则返回 None（②③ 跳过，不报错）。"""
    try:
        txt = open(app_path, encoding='utf-8').read()
    except FileNotFoundError:
        print(f'wbtextcheck：文件不存在：{app_path}')
        sys.exit(2)
    m = re.search(r'const GRAMMAR_DB = (\[.*?\]);\n', txt)
    if not m:
        return None
    return {g['id']: g for g in json.loads(m.group(1))}

def items(src):
    m = re.search(r'const ITEMS = (\[.*?\n\]);', src, re.S)
    if not m: return []
    return [tuple(x.replace("\\'", "'").replace('\\\\', '\\') for x in re.findall(r"'((?:[^'\\]|\\.)*)'", ln)) for ln in m.group(1).split('\n') if ln.strip().startswith("['")]

def main():
    app = sys.argv[1] if len(sys.argv) > 1 else MAIN
    DB = load_db(app)
    if DB is None:
        print(f'wbtextcheck：{app} 无 GRAMMAR_DB，② 截断句 / ③ 底部字幕是口诀 跳过（事实源已随老 App 删除，见脚本头注）；只跑 ① Markdown 残留')
    bad = n = 0; skipped = 0
    for f in sorted(glob.glob(os.path.join(V5, 'scenes', '*_[0-9]*.js'))):
        stem = os.path.basename(f)[:-3]
        al = next((k for k in allow if stem.startswith(k)), None)
        its = items(open(f, encoding='utf-8').read())
        if not its: continue
        n += 1; errs = []
        for it in its:
            if any('**' in x or '`' in x for x in it[1:]): errs.append(f'Markdown 残留：{it[1][:50]}')
        m = re.match(r'hd_g(\d\d)_', stem)
        if m and DB is not None:
            g = 'G' + m.group(1); d = DB.get(g)
            if d is None:
                errs.append(f'GRAMMAR_DB 无 {g}')
            else:
                F = [clean(x) for x in [d['why_explanation'], d['subtitle'], d['step1_zh'], d['chant'], *d['step1_story'], *d['step3_rules']]]
                for it in its:
                    if it[0] != 'w': continue
                    a = clean(it[1]); p = next((x for x in LABELS if a.startswith(x)), ''); rem = a[len(p):]
                    if len(rem) >= 8 and any(len(x) > len(rem) and x.startswith(rem) and not re.search(r'[。！？!?.】；;]$', rem) for x in F): errs.append(f'截断：…{a[-30:]}')
                ch = clean(d['chant'])
                for it in its:
                    if it[0] == 's' and len(it) > 2 and clean(it[2]) == ch: errs.append(f'底部字幕是口诀：{it[1][:40]}')
        if errs:
            if al: skipped += 1; print(f'⚠ {stem}（白名单：{allow[al]}）{len(errs)} 处，例：{errs[0]}'); continue
            bad += 1; print(f'❌ {stem} {len(errs)} 处：' + ' ｜ '.join(errs[:3]))
    print(f'wbtextcheck 幕 {n}（白名单跳过 {skipped}），不合格 {bad}')
    sys.exit(1 if bad else 0)

if __name__ == '__main__':
    main()
