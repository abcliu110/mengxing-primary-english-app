#!/usr/bin/env python3
"""app_check13.py —— 构词页完整性回归（原 Playwright 版查已删老 App 的构词页与词卡构词栏）。

用法：python3 app_check13.py [morph_data.json]
  morph_data.json 缺省为 laws-prototype/model/morph_data.json；词库对照缺省为
  laws-prototype/model/wordbank.json。
  2026-11-11 left4/appcheck 线修（与 app_check14 收尾线同法：去掉 Playwright 改静态
  检查；接受路径参数；跑不动的腿打印跳过说明、不静默）：旧版写死的
  「萌星小学英语_最终合并版.html」已删（2026-11-04），脚本启动即
  net::ERR_FILE_NOT_FOUND，runall 的构词派生词一步是断的；现不再读老 App。
  现状（2026-11-11 核实）：构词事实源已换形——老 App 内嵌 AFFIX_WORDS_JSON /
  MORPH_DB_JSON 不复存在，现行事实源是 model/morph_data.json（126 页：
  前缀 21、后缀 26、词根 56、屈折 8、拼装 1、复合 2、画廊 1、整词 11）：
  - 可跑（静态）：① 每页 count = 有效词数（words + sections 各节 words +
    pending 的 bank_id；6 个 misc/main 汇集页的词在 sections 里，假拆画廊
    gl-main 的 79 词在 pending 里）；每页有效词全在词库里、页内无重复；
    uncle（G2_067）/ under（G3_143）不在 pf-un 页下（映射旧断言“uncle /
    under 不在 un- 下”）；② 词根页（派生词族）56 页 ≥ 10；③ 前缀/后缀
    页全部 723 个派生词在词库里都有 morphemes（映射旧断言“词卡出真实构词”：
    构词拆分数据在，不依赖词卡 UI 呈现）。核查时 126 页 count 全对、0 词
    页 0 个、723 词 morphemes 全有。
  - 跳过（打印说明，不静默）：构词页 UI（页签卡数/词数渲染、0 词词缀单列
    展示、点派生词开对应词卡、词卡「🧩 真实构词」栏），全部是已删老 App
    构词页与词卡（navigateTo('vocab_formation') / data-affix / data-etym）
    的实时 UI 行为；现主文件与全仓库均无这些标识，新 App 也无构词页与
    词卡呈现位。若要恢复，须先在新 App 立呈现位并定新口径，另立项，
    本脚本不自行补数据。
  退役线：若将来连上表也无事实源（整表无一可跑），按 anchorcheck 例立 RETIRED
  标记退役，不留一个启动即报错的脚本（见 src/anchorcheck.RETIRED.md）。
输出最后一行「app_check13：构词页 N 页（来源）；不合格 M」，M>0 返回 1；无事实源返回 2。
"""
import json, pathlib, sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
MORPH_DEFAULT = ROOT / 'laws-prototype' / 'model' / 'morph_data.json'
WB_DEFAULT = ROOT / 'laws-prototype' / 'model' / 'wordbank.json'


def eff_words(page):
    """一页的有效词：words + sections 各节 words + pending 的 bank_id。"""
    ws = list(page.get('words') or [])
    for s in (page.get('sections') or []):
        ws += s.get('words') or []
    for pe in (page.get('pending') or []):
        if isinstance(pe, dict) and pe.get('bank_id'):
            ws.append(pe['bank_id'])
    return ws


def main():
    morph_path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else MORPH_DEFAULT
    try:
        morph = json.loads(morph_path.read_text(encoding='utf-8'))
    except FileNotFoundError:
        print(f'app_check13：文件不存在：{morph_path}')
        sys.exit(2)
    if not WB_DEFAULT.exists():
        print(f'app_check13：无事实源：{WB_DEFAULT} 不存在')
        sys.exit(2)
    wb = {w['id']: w for w in json.loads(WB_DEFAULT.read_text(encoding='utf-8'))}
    pages = (morph.get('data') or {}).get('pages') or {}
    bad = []
    n_affix_words = 0
    for pid, p in sorted(pages.items()):
        ws = eff_words(p)
        if p.get('count') != len(ws):
            bad.append(f'{pid} count {p.get("count")} ≠ 有效词数 {len(ws)}')
        if not ws:
            bad.append(f'{pid} 0 词')
        if len(ws) != len(set(ws)):
            bad.append(f'{pid} 页内词重复')
        missing = [w for w in ws if w not in wb]
        if missing:
            bad.append(f'{pid} 词不在词库：{missing[:5]}')
        if p.get('group') in ('prefix', 'suffix'):
            for wid in ws:
                n_affix_words += 1
                if not (wb.get(wid) or {}).get('morphemes'):
                    bad.append(f'派生词无 morphemes：{wid}（{pid}）')
    pfun = eff_words(pages.get('pf-un', {}))
    for wid, word in (('G2_067', 'uncle'), ('G3_143', 'under')):
        if wid in pfun:
            bad.append(f'{word}（{wid}）不应在 un- 下')
    n_roots = sum(1 for p in pages.values() if p.get('group') == 'roots')
    if n_roots < 10:
        bad.append(f'词根页（派生词族）仅 {n_roots} 页（期望 ≥ 10）')
    for b in bad:
        print('BAD', b)
    print('app_check13：跳过构词页 UI 腿（页签渲染/点词开卡/词卡真实构词栏，需已删老 App 的 vocab_formation 页与 data-affix，现主文件与全仓库均无，见脚本头注）；只跑构词数据静态核查')
    print(f'app_check13：构词页 {len(pages)} 页（前缀 {sum(1 for p in pages.values() if p.get("group") == "prefix")}、后缀 {sum(1 for p in pages.values() if p.get("group") == "suffix")}、词根 {n_roots}；派生词 {n_affix_words} 个全有 morphemes）（morph_data.json ↔ wordbank.json）；不合格 {len(bad)}')
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
