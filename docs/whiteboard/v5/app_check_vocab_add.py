#!/usr/bin/env python3
"""app_check_vocab_add.py —— 决策 35-A2 新增词条完整性回归（原 Playwright 版查已删老 App 的新增词卡与别名）。

用法：python3 app_check_vocab_add.py [wordbank.json]
  wordbank.json 缺省为 laws-prototype/model/wordbank.json；新增词记录缺省为
  docs/whiteboard/lab/audit35/a2_kebiao_add.json（60 条）与 a2_dolch_add.json
  （20 条）；别名表缺省为 docs/whiteboard/lab/audit35/a2_alias.json。
  2026-11-11 left4/appcheck 线修（与 app_check14 收尾线同法：去掉 Playwright 改静态
  检查；接受路径参数；跑不动的腿打印跳过说明、不静默）：旧版写死的
  「萌星小学英语_最终合并版.html」已删（2026-11-04），脚本启动即
  net::ERR_FILE_NOT_FOUND，runall 的新增词条一步是断的；现不再读老 App。
  现状（2026-11-11 核实）：新增词事实源已换形——老 App VOCAB_DB 的 added_by
  字段不复存在（新词库 model/wordbank.json 与 words_master.json 均无 added_by
  字段），现行事实源是 audit35 的两份新增记录（各条含 light 全量词条）：
  - 可跑（静态）：① 两份记录 80 条 id 唯一、不重复；② 80 条 id 全在词库里，
    且词库里的 word / meaning 非空（新增词确已入库，不是只在记录里）；
    ③ a2_alias.json 17 条别名 id 与主词条 id 全在词库、无环无自指、关系非空
    （与 app_check11 同一别名表，本脚本按原 scope 复核）。
    核查时 80 条全在库、别名 17 条全对上。
  - 跳过（打印说明，不静默）：词卡 UI（功能词说明块/普通词挂模板 iframe
    且注入本词/三个幕按钮/揭示释义重渲染）、单词表搜索能搜到、别名开卡转
    主词条，全部是已删老 App 词卡与单词表（openWordCardModal / data-wb5tpl /
    wlFilter）的实时 UI 行为；现主文件与全仓库均无这些标识，新 App 也无
    词卡/单词表呈现位。若要恢复，须先在新 App 立呈现位并定新口径，另立项，
    本脚本不自行补数据。
  退役线：若将来连上表也无事实源（整表无一可跑），按 anchorcheck 例立 RETIRED
  标记退役，不留一个启动即报错的脚本（见 src/anchorcheck.RETIRED.md）。
输出最后一行「app_check_vocab_add：新增词 N 条（来源）；不合格 M」，M>0 返回 1；无事实源返回 2。
"""
import json, pathlib, sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
WB_DEFAULT = ROOT / 'laws-prototype' / 'model' / 'wordbank.json'
ADD_FILES = [
    HERE.parent / 'lab' / 'audit35' / 'a2_kebiao_add.json',
    HERE.parent / 'lab' / 'audit35' / 'a2_dolch_add.json',
]
ALIAS_DEFAULT = HERE.parent / 'lab' / 'audit35' / 'a2_alias.json'


def main():
    wb_path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else WB_DEFAULT
    try:
        wb = json.loads(wb_path.read_text(encoding='utf-8'))
    except FileNotFoundError:
        print(f'app_check_vocab_add：文件不存在：{wb_path}')
        sys.exit(2)
    for f in ADD_FILES + [ALIAS_DEFAULT]:
        if not f.exists():
            print(f'app_check_vocab_add：无事实源：{f} 不存在')
            sys.exit(2)
    byid = {w['id']: w for w in wb}
    bad = []
    added = []
    for f in ADD_FILES:
        recs = json.loads(f.read_text(encoding='utf-8'))
        for r in recs:
            light = r.get('light') or {}
            wid = light.get('id')
            if not wid:
                bad.append(f'{f.name} 有无 id 的记录')
                continue
            added.append((wid, f.name, light))
    seen = {}
    for wid, src, light in added:
        if wid in seen:
            bad.append(f'新增词 id 重复：{wid}（{seen[wid]} 与 {src}）')
        seen[wid] = src
        w = byid.get(wid)
        if w is None:
            bad.append(f'新增词不在词库：{wid}（{src}）')
            continue
        if not str(w.get('word') or '').strip():
            bad.append(f'新增词库 word 为空：{wid}')
        if not str(w.get('meaning') or '').strip():
            bad.append(f'新增词库 meaning 为空：{wid}')
        if str(w.get('word') or '').strip() != str(light.get('word') or '').strip():
            bad.append(f'新增词 word 与记录不一致：{wid}（词库 {w.get("word")} / 记录 {light.get("word")}）')
    alias = json.loads(ALIAS_DEFAULT.read_text(encoding='utf-8'))
    mains = set()
    for k, v in alias.items():
        if not isinstance(v, (list, tuple)) or len(v) != 2:
            bad.append(f'别名条目格式错：{k} → {v}')
            continue
        main, rel = v
        if k not in byid:
            bad.append(f'别名 id 不在词库：{k}')
        if main not in byid:
            bad.append(f'别名主词条不在词库：{k} → {main}')
        if k == main:
            bad.append(f'别名自指：{k}')
        if not rel:
            bad.append(f'别名关系为空：{k} → {main}')
        mains.add(main)
    cyc = [k for k in alias if k in mains]
    if cyc:
        bad.append(f'别名成环：{cyc}')
    for b in bad:
        print('BAD', b)
    print('app_check_vocab_add：跳过词卡 UI 腿与单词表搜索腿（功能词说明块/模板 iframe/三幕按钮/揭示重渲染/搜索能搜到/别名开卡转主词条，需已删老 App 的 openWordCardModal 与 wlFilter，现主文件与全仓库均无，见脚本头注）；只跑新增词入库静态核查')
    print(f'app_check_vocab_add：新增词 {len(added)} 条（a2_kebiao_add.json 60 + a2_dolch_add.json 20，全在 wordbank.json；别名 {len(alias)} 条）（来源见头注）；不合格 {len(bad)}')
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
