#!/usr/bin/env python3
"""app_check8.py —— 词源库完整性回归（原 Playwright 版查已删老 App 词卡的「真实词源」/「巧记」块）。

用法：python3 app_check8.py [etymology.json]
  etymology.json 缺省为 laws-prototype/model/etymology.json；词库对照缺省为
  laws-prototype/model/wordbank.json。
  2026-11-11 left4/appcheck 线修（与 app_check14 收尾线同法：去掉 Playwright 改静态
  检查；接受路径参数；跑不动的腿打印跳过说明、不静默）：旧版写死的
  「萌星小学英语_最终合并版.html」已删（2026-11-04），脚本启动即
  net::ERR_FILE_NOT_FOUND，runall 的词卡词源一步是断的（底稿已用本脚本实测证实）；
  现不再读老 App。
  现状（2026-11-11 核实）：词源事实源已换形——老 App 内嵌 ETYM_DB_JSON 不复存在，
  现行事实源是 model/etymology.json（2278 条，按 wordbank_key 对齐词库）：
  - 可跑（静态）：① 每条 word 唯一、无重复；② 每条 word 能对上词库任一词形
    （word 字段按 '/' 切分的任一分形）；③ 已核实（status=verified）的条目
    sources ≥ 2（映射旧断言“在库 = real、带两个出处链接”）；④ 待核
    （status=待核）的条目必有 pending_reason（映射旧断言“不在库 = none 暂未
    收录”：待核条目不冒充已核实）。核查时 462 条待核与 sources 为空当且仅当
    待核（0 条例外），非待核 0 条少于 2 个出处。
  - 只报数、不判 BAD（现状，非回归失败）：词库 2942 词中 653 词暂无词源条目；
    待核 462 条。两者都是数据待补状态，另立项补，不由本脚本新设门禁拦截。
  - 跳过（打印说明，不静默）：词卡 UI（开卡/揭示/词源块 real-none/两个出处链接/
    巧记块文字 = 旧 etymology 去标题前缀、词表弹窗抽查、占位词不显示巧记），
    全部是已删老 App 词卡（openWordCardModal / data-etym / data-etym-tip）的
    实时 UI 行为；现主文件与全仓库均无这些标识，且词库新模型已无 etymology /
    memory_tip 字段（巧记文字无事实源可对），新 App 也无词卡呈现位。若要恢复，
    须先在新 App 立词卡呈现位并定新口径，另立项，本脚本不自行补数据。
  退役线：若将来连上表也无事实源（整表无一可跑），按 anchorcheck 例立 RETIRED
  标记退役，不留一个启动即报错的脚本（见 src/anchorcheck.RETIRED.md）。
输出最后一行「app_check8：词源库 N 条（来源）；不合格 M」，M>0 返回 1；无事实源返回 2。
"""
import json, pathlib, sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
ETYM_DEFAULT = ROOT / 'laws-prototype' / 'model' / 'etymology.json'
WB_DEFAULT = ROOT / 'laws-prototype' / 'model' / 'wordbank.json'


def main():
    etym_path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ETYM_DEFAULT
    try:
        etym = json.loads(etym_path.read_text(encoding='utf-8'))
    except FileNotFoundError:
        print(f'app_check8：文件不存在：{etym_path}')
        sys.exit(2)
    if not WB_DEFAULT.exists():
        print(f'app_check8：无事实源：{WB_DEFAULT} 不存在')
        sys.exit(2)
    wb = json.loads(WB_DEFAULT.read_text(encoding='utf-8'))
    forms = set()
    for w in wb:
        for f in str(w.get('word') or '').split('/'):
            forms.add(f.strip().lower())
    bad = []
    seen = {}
    n_verified = n_pending = 0
    for e in etym:
        word = str(e.get('word') or '').strip()
        if not word:
            bad.append('空 word 条目')
            continue
        if word in seen:
            bad.append(f'重复 word：{word}')
        seen[word] = True
        if word.lower() not in forms:
            bad.append(f'词源词对不上词库：{word}')
        status = e.get('status')
        nsrc = len(e.get('sources') or [])
        if status == '待核':
            n_pending += 1
            if not e.get('pending_reason'):
                bad.append(f'待核无 pending_reason：{word}')
        elif status == 'verified':
            n_verified += 1
            if nsrc < 2:
                bad.append(f'已核实但出处 < 2：{word}（{nsrc} 个）')
        else:
            bad.append(f'未知 status：{word}（{status}）')
    first_forms = {str(w.get('word') or '').split('/')[0].strip().lower() for w in wb}
    etym_words = {str(e.get('word') or '').strip().lower() for e in etym}
    no_etym = sum(1 for f in first_forms if f not in etym_words)
    for b in bad:
        print('BAD', b)
    print('app_check8：跳过词卡 UI 腿（开卡/揭示/词源块/巧记块/词表弹窗，需已删老 App 的 openWordCardModal 与 data-etym，现主文件与全仓库均无，词库新模型也无 etymology/memory_tip 字段，见脚本头注）；只跑词源库静态核查')
    print(f'app_check8：词源库 {len(etym)} 条（已核实 {n_verified}、待核 {n_pending}；词库 {len(wb)} 词中 {no_etym} 词暂无词源条目，仅报数）（etymology.json ↔ wordbank.json）；不合格 {len(bad)}')
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
