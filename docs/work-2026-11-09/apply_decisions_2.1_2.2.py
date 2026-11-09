#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_decisions_2.1_2.2.py — 应用 2.1 成人层判定补丁到 laws_master.json。

用法（在仓库根目录运行）：
  python3 docs/work-2026-11-09/apply_decisions_2.1_2.2.py               # 演练：只核对并报告，不写文件
  python3 docs/work-2026-11-09/apply_decisions_2.1_2.2.py --apply      # 真正写回 laws_master.json
  python3 docs/work-2026-11-09/apply_decisions_2.1_2.2.py --apply --backup
      # 写回前先把原文件拷一份 laws_master.json.bak（同目录）

只读 docs/work-2026-11-09/law_zone_patch.json（law_id → "keep" | "adult"，
只含判定为 adult 的 21 条），只改判定为 adult 的条目；keep 的条目不用列，
即使列了也会被跳过（并报告）。

====================================================================
2.1 字段口径（为什么改 aud、不改 zone）——先读主文件核实过：
--------------------------------------------------------------------
* 律的成人层标记是 `aud`，不是 `zone`：
  - 主文件 LAW.render（约 6474 行）以 `teacher=(d.aud==='教师/设计层'||d.g==='PB')`
    判定：教师层条目只渲染“教师/家长方法层条目”提示条，kid 文字、机制、
    例句、病句医院、练习一律不渲染，完整内容放在 <div class="adult …"> 里，
    只在 body.adult 时显示（CSS 约 895 行 body.adult .adult{display:block}）。
  - tools/gen_roster.py（约 148–151 行）layer 判 T 的条件是
    yaml.audience 在 {教师/设计层, teacher, design} 之中，
    或 lawdata.aud === '教师/设计层'，
    或 LAWDATA.aud === '教师/设计层'，
    或 zone === 'parents'。
    其中前三项是律的受众标记，最后一项是支撑条目的分区标记。
  - 主文件 srcLAWDATA（约 14225 行）跳过 aud 为教师/设计层的条目
    （注释原话：“教师层条目不进孩子的复习队列”）；gen_laws.py 的
    POOL_FIELDS 含 'aud'，LAWDATA 原样携带该字段。
* `zone='parents'` 是另一类东西：它是 SUPPDATA 里支撑性教学条目
  （TM/CB/LS 等 114 条）的分区字段；LAW.open 用 zone 算回跳区
  （homeFor 映射：parents→家长角，expr/expr2→expr）。把 E/W/NE 律的
  lawdata.zone 从 expr/expr2 改成 parents，会把它逐出表达写作区导航、
  改掉回跳目标，属于改分区，不是改受众层。
* 因此本脚本对每个 adult 条目只写两处，且两处都写为 "教师/设计层"：
    entry["lawdata"]["aud"]  和  entry["yaml"]["audience"]
  并断言 entry["lawdata"]["zone"] 不变（仍为 expr / expr2）。
* 实测现状（2026-11-09）：21 条 adult 的两处字段早已是 "教师/设计层"，
  索引行已标 .st tchr、详情页已设防——脚本在真文件上跑会报告
  “21 条已正确标记，0 条改动”，这是核对结果，不是脚本失效。
  唯一真正待改数据的是决策文档 1.4 节的 3 条改判 keep
  （NE-09、NE-24、NE-25：aud 由 "教师/设计层" 改为 "双层"），
  它们不在补丁文件里，本脚本不碰它们（见下面 KEEP_OVERRIDES_PENDING，
  仅作只读提醒）；须 Priya 批准后另行修改。

改完数据后的再生步骤（实施方执行，本脚本不做）：
  1. python3 laws-prototype/tools/gen_laws.py        # LAWDATA.aud 同步
  2. python3 laws-prototype/tools/gen_roster.py --check / --write
      # 索引行徽标与分组同步
  3. python3 laws-prototype/tools/gen_links.py        # LINKIDX 不受 aud 影响，确认无漂移
  4. python3 laws-prototype/tools/check_rel_coverage.py  # 关系门禁
  主文件是生成物，不许手改主文件。

====================================================================
2.2 渲染落点说明（本脚本不改主文件，以下是给实施方的落点清单，
全文见 docs/work-2026-11-09/decisions-2.1-2.2.md）：
--------------------------------------------------------------------
【已实现，保留不动】
* 规律详情页底部“相关规律”块：主文件 LINKGO.relSectionHTML
  （约 2687–2717 行），从 LINKIDX.g 读关系渲染；p 槽分组标题就是
  '前置 · 先学这个'，后跟可点芯片（lawChip → LINKGO.openLaw）；
  q 槽标题是 '前置 · 学完这条可以学'。LAW.render 在儿童律详情页
  （约 6541 行）与教师律详情页（约 6480 行）都调用了它。

【新增 1：详情页顶部先修条】
* 位置：主文件 LAW.render 里 kid 文字段落之前（教师律详情页放在
  教师提示条之后）；只在有先修时整块出现，无先修时不渲染。
* 模板（单先修）：⏳ 建议先学《CO-02 双宾模具自带“让某人收到某物”》，再学这一条。
  模板（多先修，如 C-19）：⏳ 建议先学《C-06 a 的本职》、《C-07 the 的本职》，再学这一条。
  无标题时只写编号：⏳ 建议先学 CB-04，再学这一条。
  先修目标为成人层条目时末尾追加“（给爸爸妈妈看的）”。
* 标题规则：《》内 = 编号 ＋ 空格 ＋ 标题；标题取合并后运行态
  LAWDATA[先修id].hl（与详情页标题同一字段）；取 hl 中第一个中文冒号
  '：'或破折号 '——' 之前的部分，若无则取前 12 字加 '…'；hl 为空只写编号。
  整个《…》为一个可点芯片，复用 LINKGO.lawChip（已有 off 形态）；
  芯片 title 属性放完整 hl。
* 标题解析不许只读 LAWDATA 字面量——C-01、S-01 等律不在 LAWDATA 字面量里
  （在独立的 LAWS 数组 / PHONLAWS 里），须走 LINKGO 现成的落点判定
  （resolveLaw＋hasLawPage），取不到标题时只显示编号。
* 只显示直接先修，不递归展开链（如 CO-03 只显示 CO-02）。

【新增 2：主索引行紧凑标记】
* 位置：tools/gen_roster.py 生成的 .urow 行内，标题 <span class="tt"> 之后、
  状态徽标 <span class="st …"> 之前；只写编号，不写标题。
* 模板（单先修）：<span class="lz-pre">⏳ 先修 CO-02</span>
  模板（多先修）：<span class="lz-pre">⏳ 先修 C-06、C-07</span>
  无先修不加。gen_roster.py 直接读总表 relations_teaching，不另建第二份关系。

【不做】
* 各大区入口页不加逐条先修列表；不做进区前先修检查（不拦截、不弹窗）；
  首页“建议路线”文案不动。

【渲染时读哪个字段】
* 事实源：laws_master.json 条目.relations_teaching[]：{id: 先修律编号，kind: "前置"}
  （记录挂在“后学律”名下，id 指向“先修律”；方向已用链式验证，
  如 CO-03→CO-02→CO-01、GR-18→GR-17→GR-16）。
* tools/gen_links.py → LINKIDX.g[后学律].p = [先修律编号…]（直接先修），
  LINKIDX.g[先修律].q = [后学律编号…]（反向）。
  顶部条、底部块读同一个 g.p；索引行读总表 relations_teaching。
  不许从行内 LAWDATA.rel、LAWS 数组、const DATA 等字面量直读先修关系——
  户口在总表（tools/check_rel_coverage.py 的 R11-01 门禁）。
* 没有先修时三处均整块不渲染，不写“无先修”字样。

【是否强制】
* 不强制，只提示：可直接学本条、可跳过先修、不记录、不拦截、不弹窗。
  与 App 既定原则一致：“不分学段、用先修关系代替学段”
  （主文件分词帽子页诚实说明原话）。

【实施前必须先做的两件对账事】
* 1) TODO 称 51 对前置关系，与实测三口径均不符——总表 70 对（68 个持有律，
  44 个不同目标）、运行时 LAWDATA 合并后 38 对、主文件全量去重 75 对。
  请数据负责人确认 51 的口径（最可能是旧快照）；本方案默认渲染全部 70 对。
* 2) 5 对 TA-*（TA-03→TA-01、TA-06→TA-05、TA-07→TA-03、TA-09→TA-05、
  TA-16→TA-05）只在行内 const DATA 字面量，不在总表、无 LINKIDX.g 条目，
  其详情页永远不显示前置块。按 R11-01 政策先迁入总表对应条目的
  relations_teaching（kind="前置"），再跑 gen_links.py 与
  check_rel_coverage.py 验证；迁入前不要在 TA 律上渲染先修提示。
* 另：70 对里没有任何一对涉及 E/W/NE 编号，先修提示不会出现在 E/W/NE 页面上。
====================================================================
"""

import argparse
import json
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]  # 仓库根目录
DEFAULT_PATCH = Path(__file__).resolve().parent / "law_zone_patch.json"
DEFAULT_MASTER = ROOT / "laws-prototype" / "model" / "laws_master.json"

ADULT_AUD = "教师/设计层"
ADULT_ZONES = {"expr", "expr2"}  # 2.1 范围：E/W（expr）与 NE（expr2）

# 决策文档 1.4 节的 3 条改判 keep：现 aud 为教师/设计层，复核后应改为“双层”。
# 它们不在 law_zone_patch.json 里（补丁文件按任务要求只含 adult 条目），
# 本脚本不写它们；只读提醒，防止遗忘。改动须 Priya 批准后另行执行。
KEEP_OVERRIDES_PENDING = ("NE-09", "NE-24", "NE-25")


def fail(msg):
    print("FAIL:", msg)
    return 1


def main(argv=None):
    ap = argparse.ArgumentParser(description="应用 2.1 成人层判定补丁到 laws_master.json（默认只演练不写回）")
    ap.add_argument("--patch", default=str(DEFAULT_PATCH), help="补丁文件 law_zone_patch.json")
    ap.add_argument("--master", default=str(DEFAULT_MASTER), help="总表 laws_master.json")
    ap.add_argument("--apply", action="store_true", help="真正写回总表（缺省只演练并报告）")
    ap.add_argument("--backup", action="store_true", help="写回前把原总表拷一份 .bak（仅与 --apply 联用）")
    args = ap.parse_args(argv)

    patch_path = Path(args.patch)
    master_path = Path(args.master)
    if not patch_path.is_file():
        return fail("补丁文件不存在：%s" % patch_path)
    if not master_path.is_file():
        return fail("总表不存在：%s" % master_path)
    if args.backup and not args.apply:
        return fail("--backup 须与 --apply 联用")

    patch = json.loads(patch_path.read_text(encoding="utf-8"))
    if not isinstance(patch, dict):
        return fail("补丁文件顶层必须是对象（law_id → keep|adult）")
    for law_id, verdict in patch.items():
        if verdict not in ("keep", "adult"):
            return fail("补丁值非法：%s → %r（只允许 keep|adult）" % (law_id, verdict))

    raw = master_path.read_text(encoding="utf-8")
    data = json.loads(raw)
    if not isinstance(data, list):
        return fail("总表顶层必须是数组")
    by_id = {e.get("id"): e for e in data}

    n_adult = 0
    n_keep_skip = 0
    n_changed = 0
    n_already = 0
    problems = []
    for law_id in sorted(patch):
        verdict = patch[law_id]
        if verdict == "keep":
            n_keep_skip += 1
            print("SKIP keep（不改）：%s" % law_id)
            continue
        n_adult += 1
        entry = by_id.get(law_id)
        if entry is None:
            problems.append("%s 不在总表内" % law_id)
            continue
        ld = entry.get("lawdata") or {}
        zone = ld.get("zone")
        if zone not in ADULT_ZONES:
            problems.append("%s 的 lawdata.zone=%r，不在 2.1 范围 %s 内，拒绝改动" % (law_id, zone, sorted(ADULT_ZONES)))
            continue
        changed_here = []
        if ld.get("aud") != ADULT_AUD:
            ld["aud"] = ADULT_AUD
            changed_here.append("lawdata.aud")
        yaml = entry.get("yaml") or {}
        if yaml.get("audience") != ADULT_AUD:
            yaml["audience"] = ADULT_AUD
            changed_here.append("yaml.audience")
        if changed_here:
            n_changed += 1
            print("SET adult：%s（zone=%s 不变）改了 %s" % (law_id, zone, "、".join(changed_here)))
        else:
            n_already += 1
            print("OK 已是成人层：%s（lawdata.aud 与 yaml.audience 已是“教师/设计层”，未改动）" % law_id)

    # 只读提醒：3 条改判 keep 不在本脚本处理范围内
    pending = [i for i in KEEP_OVERRIDES_PENDING
               if (by_id.get(i) or {}).get("lawdata", {}).get("aud") == ADULT_AUD]
    if pending:
        print("NOTE 改判 keep 待另行处理（本脚本不写）："
              + "、".join(pending)
              + " 现 aud 仍为“教师/设计层”，按决策文档 1.4 节应改为“双层”，须 Priya 批准后另行修改。")

    if problems:
        for p in problems:
            print("FAIL:", p)
        return 1

    if not args.apply:
        print("DRY-RUN：adult %d 条（改动 %d 条、已正确 %d 条）%s；未写文件。加 --apply 写回。"
              % (n_adult, n_changed, n_already,
                 ("，跳过 keep %d 条" % n_keep_skip) if n_keep_skip else ""))
        return 0

    if n_changed == 0:
        print("APPLY：无改动需要写回（21 条 adult 均已正确标记），总表未动。")
        return 0
    if args.backup:
        bak = master_path.with_suffix(master_path.suffix + ".bak")
        shutil.copyfile(master_path, bak)
        print("BACKUP：已备份到 %s" % bak)
    # 回写格式与原文件一致：indent=1、中文原文、保留末尾换行
    text = json.dumps(data, ensure_ascii=False, indent=1)
    if raw.endswith("\n"):
        text += "\n"
    master_path.write_text(text, encoding="utf-8")
    # 回写后自检：能重新解析、条目数不变
    after = json.loads(master_path.read_text(encoding="utf-8"))
    if len(after) != len(data):
        return fail("写回自检失败：条目数变化")
    print("APPLY 完成：adult %d 条，改动 %d 条、已正确 %d 条；总表已写回 %s。下一步：跑 gen_laws.py → gen_roster.py --check/--write → gen_links.py → check_rel_coverage.py（见脚本头）。"
          % (n_adult, n_changed, n_already, master_path))
    return 0


if __name__ == "__main__":
    sys.exit(main())
