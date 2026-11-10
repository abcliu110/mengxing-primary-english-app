#!/usr/bin/env python3
"""app_check11.py —— 别名词条完整性回归（原 Playwright 版查已删老 App 的别名重定向与读档迁移）。

用法：python3 app_check11.py [wordbank.json]
  wordbank.json 缺省为 laws-prototype/model/wordbank.json；别名表缺省为
  docs/whiteboard/lab/audit35/a2_alias.json。
  2026-11-11 left4/appcheck 线修（与 app_check14 收尾线同法：去掉 Playwright 改静态
  检查；接受路径参数；跑不动的腿打印跳过说明、不静默）：旧版写死的
  「萌星小学英语_最终合并版.html」已删（2026-11-04），脚本启动即
  net::ERR_FILE_NOT_FOUND，runall 的别名词条一步是断的；现不再读老 App。
  现状（2026-11-11 核实）：别名事实源已换形——老 App 内嵌 WORD_ALIAS /
  VOCAB_ALIAS_ENTRY 不复存在，现行事实源是两处：
  ① lab/audit35/a2_alias.json（17 条：别名 id → [主词条 id，关系]）；
  ② wordbank.json 各主词条的 aliases 字段（14 条：主词条 word 内的分形，
  如 G1_K01「a / an」→ ['a', 'an']）。
  - 可跑（静态）：① a2_alias 每条别名 id 与主词条 id 都在词库里；② 主词条
    不是别名（无环、无自指）；③ 关系非空；④ wordbank aliases 每条分形都
    出现在本主词条的 word 字段里。核查时 17 条全对上、无环、关系 7 种；
    14 条分形全在本词条 word 里。
  - 不断言（口径已变，见下）：旧断言“别名 id 不在 VOCAB_DB 列表里”在新模型
    里不成立——新词库保留 V6_MORPH_* 等别名 id 作为独立条目（如 V6_MORPH_26
    在词库里），故本脚本不断言别名 id 不在库；旧断言“别名表 ≥ 51 条”对应
    的老 WORD_ALIAS 表已不存在，现行两表共 31 条，不沿用 51 的数。
    代词组分形（如 I/me/my/mine）在 V6_核心_* 单形条目里另有主词条，是
    “只互链不重定向”的旧口径遗留，本脚本不断言分形全库唯一。
  - 跳过（打印说明，不静默）：②③④⑤ 的 UI 腿（旧 id 开卡转主词条、主卡
    「过去式：went」类标签、旧记录读档迁移、按词形跳卡/小测题单转主词条、
    centre 美式别名卡），全部是已删老 App 词卡与读档（openWordCardModal /
    WORD_ALIAS / localStorage 记录）的实时 UI 行为；现主文件与全仓库均无
    这些标识，新 App 也无词卡/读档呈现位。若要恢复，须先在新 App 立呈现
    位并定新口径，另立项，本脚本不自行补数据。
  退役线：若将来连上表也无事实源（整表无一可跑），按 anchorcheck 例立 RETIRED
  标记退役，不留一个启动即报错的脚本（见 src/anchorcheck.RETIRED.md）。
输出最后一行「app_check11：别名词条 N 条（来源）；不合格 M」，M>0 返回 1；无事实源返回 2。
"""
import json, pathlib, sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
WB_DEFAULT = ROOT / 'laws-prototype' / 'model' / 'wordbank.json'
ALIAS_DEFAULT = HERE.parent / 'lab' / 'audit35' / 'a2_alias.json'


def main():
    wb_path = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else WB_DEFAULT
    try:
        wb = json.loads(wb_path.read_text(encoding='utf-8'))
    except FileNotFoundError:
        print(f'app_check11：文件不存在：{wb_path}')
        sys.exit(2)
    if not ALIAS_DEFAULT.exists():
        print(f'app_check11：无事实源：{ALIAS_DEFAULT} 不存在')
        sys.exit(2)
    alias = json.loads(ALIAS_DEFAULT.read_text(encoding='utf-8'))
    bad = []
    byid = {w['id']: w for w in wb}
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
        bad.append(f'别名成环（别名 id 同时是别人的主词条）：{cyc}')
    n_wb_alias = 0
    for w in wb:
        forms = [f.strip().lower() for f in str(w.get('word') or '').split('/')]
        for a in (w.get('aliases') or []):
            n_wb_alias += 1
            if str(a).strip().lower() not in forms:
                bad.append(f'词库别名分形不在本词条 word 里：{w["id"]} aliases {a}（word：{w.get("word")}）')
    for b in bad:
        print('BAD', b)
    print('app_check11：跳过 UI 腿（旧 id 开卡转主词条/主卡标签/读档迁移/按词形跳卡/小测转主词条，需已删老 App 的 openWordCardModal 与 WORD_ALIAS，现主文件与全仓库均无，见脚本头注）；只跑别名表静态核查')
    print(f'app_check11：别名词条 {len(alias)} 条（a2_alias.json）+ {n_wb_alias} 个词库别名分形（wordbank.json）；不合格 {len(bad)}')
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
