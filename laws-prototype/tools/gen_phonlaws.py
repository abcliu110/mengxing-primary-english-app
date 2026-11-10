#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen_phonlaws.py — 拼读律页运行时记录 PHONLAWS 的 quiz 注入生成器。

背景（2026-11-10 内容缺口波 CONTENT_GAP_SUMMARY.md §四.3 登记）：
  主文件 52 条 PHONLAWS 条目的 quiz 全为 []，且此前没有任何工具生成
  `var PHONLAWS=`（各检查脚本只读它）。S/SR 104 题只活在 yaml 事实源，
  拼读律页运行时显示 0 练习。本生成器是该缺口的打通工具：只改 quiz
  字段，其余字段一字不动。

事实源（《数据源规范》§1「规律」行：总表为准，yaml 为历史源头）
  - laws-prototype/model/laws_master.json（规律总表 yaml 分仓）
  - laws-prototype/model/laws/phonics.yaml（yaml 本体，逐条交叉核对；
    check_upstream 链 [a] 已断言两者 428 条深比全等，本生成器再对
    S/SR 52 条的 quiz 逐条深比）

生成目标：主文件 mengxing-prototype-v1.html 的 `var PHONLAWS=` 字面量
  （单行，json.dumps(ensure_ascii=False) 默认分隔符；实测重序列化与
  现行字面量逐字节一致，见 build() 内断言）。

映射口径（内容逐字照录，只换键名）
  - yaml quiz 条目 {q, answer, hint} -> 运行时条目 {q, a, h}。
  - 键名必须换：律页渲染器 LAW.kidView / LAW.open 与复习引擎
    srcLAWDATA 一律读 q.a / q.h，不读 answer / hint；原样照搬会使律页
    显示「答案：undefined」。无 opts 键的条目走渲染器既有 reveal
    分支（「想好了？看答案」）与复习引擎 kind='reveal' 分支，LAWDATA
    已有同形条目在先（如 QI-15），无需改渲染器。
  - 顺序与文案一字不动；题干内嵌的 A./B. 选项随 q 原样保留。

本生成器只拥有 quiz 字段
  - 生成前后逐路径深比：差异路径必须全部落在 $.<id>.quiz 之内，
    任一非 quiz 字段差异即停（见 build() 末尾断言）。其余 22 个字段
    以现行字面量为模板原样保留，不从事实源重算。
  - S-44 不在 PHONLAWS 内：2026-11-10 收尾线已补 yaml（含 2 道 quiz），
    但 PHONLAWS 字面量仍无 S-44 行（本生成器只替换既有行的 quiz，
    不加行；加行须生成器支持行新增 + roster 门禁复核，另立项），故
    PHONLAWS 52 条 = S-01..S-43（43 条）+ SR-01..SR-09（9 条）；
    S-44 的 2 道 quiz 只在 yaml/总表，不进运行时。

冻结断言（任一失败即停，退出码 1）
  - S 组 quiz 86 题（43 条 × 2）、SR 组 18 题（9 条 × 2），合计 104 题。
  - 每条 quiz 恰 2 题；每题键恰为 {q, answer, hint}，三值皆为非空串。
  - yaml 本体与总表 yaml 分仓的 S/SR quiz 逐条深比全等。
  - PHONLAWS 键集恰为上述 52 条；现行 quiz 须为 [] 或已等于映射结果
    （非空且不等者视为漂移，拒绝静默覆盖）。
  - 题面不得含 `</script`（大小写不敏感）与 U+2028/U+2029（内联脚本
    字面量安全）。

用法
  python3 laws-prototype/tools/gen_phonlaws.py --check   # 稳态校验：
      现行字面量 == 生成结果（逐字节）且生成标记在位
  python3 laws-prototype/tools/gen_phonlaws.py --write   # 注入 quiz 并
      写回（只替换 PHONLAWS 字面量跨度 + 补生成标记行；写前在内存中
      完成全部断言）
退出码：0=通过；1=断言失败/不一致；2=用法错误。
门禁：check_all.py 第 28 项（gen_phonlaws --check）。
"""
import json
import re
import sys
import yaml
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]  # laws-prototype/
MAIN = ROOT / "mengxing-prototype-v1.html"
MASTER = ROOT / "model" / "laws_master.json"
PHONICS_YAML = ROOT / "model" / "laws" / "phonics.yaml"

ANCHOR = "var PHONLAWS="
MARKER = ("/* GENERATED: tools/gen_phonlaws.py ← model/laws_master.json "
          "(yaml 分仓) + model/laws/phonics.yaml · DO NOT EDIT */")

JD = lambda o: json.dumps(o, ensure_ascii=False)  # 默认分隔符 — 与现行字面量字节格式一致

S_IDS = [f"S-{i:02d}" for i in range(1, 44)]    # S-01..S-43
SR_IDS = [f"SR-{i:02d}" for i in range(1, 10)]  # SR-01..SR-09
EXPECTED_IDS = S_IDS + SR_IDS                   # 52 条
EXPECTED_TOTAL = 104                            # S 86 + SR 18


def fail(msg):
    raise AssertionError(msg)


def scan_literal(src, start):
    """从 start 处的 '{' 起做花括号匹配，返回字面量结尾下标（含 '}'）。"""
    depth = 0
    instr = False
    esc = False
    for p in range(start, len(src)):
        ch = src[p]
        if instr:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == '"':
                instr = False
        else:
            if ch == '"':
                instr = True
            elif ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    return p
    raise ValueError("PHONLAWS 字面量花括号未闭合")


def find_span(src):
    """定位 var PHONLAWS= 字面量跨度 (start, end)，end 为 '}' 后一位。"""
    hits = []
    i = 0
    while True:
        j = src.find(ANCHOR, i)
        if j < 0:
            break
        hits.append(j)
        i = j + len(ANCHOR)
    if len(hits) != 1:
        fail(f"锚点 {ANCHOR!r} 命中 {len(hits)} 处（应为 1），拒绝操作")
    a = hits[0]
    s = src.find("{", a)
    if s < 0:
        fail("PHONLAWS 锚点后无 '{'")
    return s, scan_literal(src, s) + 1


def marker_present(src):
    a = src.find(ANCHOR)
    ls = src.rfind("\n", 0, a) + 1
    prev_end = ls - 1
    if prev_end <= 0:
        return False
    prev_start = src.rfind("\n", 0, prev_end) + 1
    return src[prev_start:prev_end].strip() == MARKER


def ensure_marker(src):
    """在 var PHONLAWS= 行首前补生成标记行（已在位则不动）。"""
    if marker_present(src):
        return src
    a = src.find(ANCHOR)
    ls = src.rfind("\n", 0, a) + 1
    return src[:ls] + MARKER + "\n" + src[ls:]


def load_quiz():
    """读事实源，返回 {id: [运行时 quiz 条目 {q, a, h}, ...]}（S 86 + SR 18）。"""
    recs = json.loads(MASTER.read_text(encoding="utf-8"))
    byid = {r["id"]: r for r in recs if isinstance(r, dict)}
    doc = yaml.safe_load(PHONICS_YAML.read_text(encoding="utf-8"))
    ybyid = {e["id"]: e for e in doc["entries"]}
    # S-44 例外登记：有 yaml（2026-11-10 收尾线补齐，2 道 quiz）但无
    # PHONLAWS 行，quiz 不注入；行新增须生成器支持加行 + roster 门禁
    # 复核，另立项。冻结：yaml 有且 quiz 恰 2 题（键形同 52 行），且
    # phonics.yaml 与总表分仓一致，且 S-44 不进 EXPECTED_IDS。
    s44 = byid.get("S-44")
    if not s44 or not isinstance(s44.get("yaml"), dict):
        fail("S-44 应已有 yaml（2026-11-10 收尾线补齐），实测缺失")
    s44q = s44["yaml"].get("quiz")
    if not isinstance(s44q, list) or len(s44q) != 2:
        fail(f"S-44 yaml quiz 应恰为 2 题，实得 {len(s44q) if isinstance(s44q, list) else type(s44q)}")
    for qi, q in enumerate(s44q):
        if not isinstance(q, dict) or set(q.keys()) != {"q", "answer", "hint"}:
            fail(f"S-44 第 {qi + 1} 题键应恰为 {{q, answer, hint}}")
    s44y = ybyid.get("S-44")
    if s44y is None or (s44y.get("quiz") or []) != s44q:
        fail("S-44 phonics.yaml 缺失或 quiz 与总表 yaml 分仓不一致")
    if "S-44" in EXPECTED_IDS:
        fail("S-44 不在 PHONLAWS 内，不得进 EXPECTED_IDS")
    out = {}
    for lid in EXPECTED_IDS:
        rec = byid.get(lid)
        if rec is None:
            fail(f"总表缺 {lid}")
        y = rec.get("yaml")
        if not isinstance(y, dict):
            fail(f"{lid} 总表 yaml 分仓缺失")
        qz = y.get("quiz")
        if not isinstance(qz, list) or len(qz) != 2:
            fail(f"{lid} yaml quiz 应恰为 2 题，实得 {len(qz) if isinstance(qz, list) else type(qz)}")
        yrec = ybyid.get(lid)
        if yrec is None:
            fail(f"phonics.yaml 缺 {lid}")
        if (yrec.get("quiz") or []) != qz:
            fail(f"{lid} phonics.yaml quiz 与总表 yaml 分仓不一致")
        mapped = []
        for qi, q in enumerate(qz):
            if not isinstance(q, dict) or set(q.keys()) != {"q", "answer", "hint"}:
                fail(f"{lid} 第 {qi + 1} 题键应恰为 {{q, answer, hint}}，实得 {sorted(q.keys()) if isinstance(q, dict) else type(q)}")
            for k in ("q", "answer", "hint"):
                v = q[k]
                if not isinstance(v, str) or not v.strip():
                    fail(f"{lid} 第 {qi + 1} 题 {k} 为空或非字符串")
                if "</script" in v.lower():
                    fail(f"{lid} 第 {qi + 1} 题 {k} 含 </script>，拒绝写入内联字面量")
                if "\u2028" in v or "\u2029" in v:
                    fail(f"{lid} 第 {qi + 1} 题 {k} 含 U+2028/U+2029，拒绝写入内联字面量")
            mapped.append({"q": q["q"], "a": q["answer"], "h": q["hint"]})
        out[lid] = mapped
    n_s = sum(len(out[i]) for i in S_IDS)
    n_sr = sum(len(out[i]) for i in SR_IDS)
    if n_s != 86 or n_sr != 18 or n_s + n_sr != EXPECTED_TOTAL:
        fail(f"题数冻结断言失败：S {n_s}/86、SR {n_sr}/18、合计 {n_s + n_sr}/104")
    return out


def deep_diff_paths(a, b, path="$", out=None):
    if out is None:
        out = []
    if type(a) is not type(b):
        out.append(path)
        return out
    if isinstance(a, dict):
        for k in a:
            if k not in b:
                out.append(f"{path}.{k}")
            else:
                deep_diff_paths(a[k], b[k], f"{path}.{k}", out)
        for k in b:
            if k not in a:
                out.append(f"{path}.{k}")
    elif isinstance(a, list):
        if len(a) != len(b):
            out.append(f"{path}.length")
        for i in range(min(len(a), len(b))):
            deep_diff_paths(a[i], b[i], f"{path}[{i}]", out)
    elif a != b:
        out.append(path)
    return out


def build(src):
    """返回 (current, built_text)。只改 quiz，其余字段逐路径断言不动。"""
    quiz_map = load_quiz()
    s0, s1 = find_span(src)
    cur_text = src[s0:s1]
    current = json.loads(cur_text)
    if list(current.keys()) != EXPECTED_IDS:
        fail(f"PHONLAWS 键集与预期 52 条不符：多 {sorted(set(current) - set(EXPECTED_IDS))}、"
             f"少 {sorted(set(EXPECTED_IDS) - set(current))}")
    built = {}
    for lid in EXPECTED_IDS:
        ent = dict(current[lid])
        cur_q = ent.get("quiz")
        if cur_q is None:
            fail(f"{lid} 现行条目缺 quiz 键")
        if cur_q != [] and cur_q != quiz_map[lid]:
            fail(f"{lid} 现行 quiz 非空且与事实源映射结果不一致（漂移），拒绝静默覆盖")
        ent["quiz"] = quiz_map[lid]
        built[lid] = ent
    # 只 quiz 动：差异路径必须全部落在 $.<id>.quiz 内
    diffs = deep_diff_paths(current, built)
    bad = [p for p in diffs if not re.match(r"^\$\.(S-\d\d|SR-\d\d)\.quiz(\.|$|\[)", p)]
    if bad:
        fail(f"非 quiz 字段出现差异（本生成器只拥有 quiz）：{bad[:10]}")
    gen_text = JD(built)
    # 序列化口径自证：空 quiz 时重序列化须与现行字面量逐字节一致
    if all(current[lid].get("quiz") == [] for lid in EXPECTED_IDS):
        probe = {lid: dict(current[lid], quiz=[]) for lid in EXPECTED_IDS}
        if JD(probe) != cur_text:
            fail("序列化口径漂移：json.dumps(ensure_ascii=False) 重序列化现行字面量不一致")
    if json.loads(gen_text) != built:
        fail("生成字面量 JSON 回解析不一致")
    return current, gen_text


def main(argv) -> int:
    if len(argv) != 2 or argv[1] not in ("--check", "--write"):
        print(__doc__)
        return 2
    src = MAIN.read_bytes().decode("utf-8")
    try:
        current, gen_text = build(src)
    except AssertionError as e:
        print(f"FAIL: {e}")
        return 1
    s0, s1 = find_span(src)
    cur_text = src[s0:s1]
    stale_ids = [lid for lid in EXPECTED_IDS if current[lid].get("quiz") !=
                 json.loads(gen_text)[lid]["quiz"]]
    if argv[1] == "--check":
        problems = []
        if gen_text != cur_text:
            problems.append(f"字面量过期：{len(stale_ids)} 条 quiz 待注入"
                            f"（{', '.join(stale_ids[:5])}{'…' if len(stale_ids) > 5 else ''}）")
        if not marker_present(src):
            problems.append("生成标记行缺失（待 --write 补）")
        if problems:
            for p in problems:
                print(f"FAIL: {p}")
            return 1
        print(f"PASS: PHONLAWS 字面量逐字节一致（{len(cur_text)} 字符；"
              f"52 条，quiz 104 题 = S 86 + SR 18，生成标记在位）")
        return 0
    out = src[:s0] + gen_text + src[s1:]
    out = ensure_marker(out)
    MAIN.write_bytes(out.encode("utf-8"))
    print(f"写回完成：文件 {len(src)} -> {len(out)} 字符"
          f"（PHONLAWS {len(cur_text)} -> {len(gen_text)} 字符；52 条，quiz 104 题 = S 86 + SR 18）")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
