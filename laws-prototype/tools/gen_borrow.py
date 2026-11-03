#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen_borrow.py — 老 App 借鉴呈现层（B1 王牌速查 / B2 天坑榜）的数据生成器。

事实源：laws-prototype/model/laws_master.json（规律总表）。
生成目标：主文件 mengxing-prototype-v1.html 中借鉴呈现脚本块内的
  var BORROW = {...} 字面量（{trump:[...15], pit:[...10]}），带 GENERATED 标记。

B1 王牌速查（15 张）：主题镜像老 App ROYAL_TRUMPS_DB 的 15 个主题槽位，
  逐槽位在本总表中选一条现行规律承接（选条表 TRUMP_PICK 写死在本文件，
  每条注明老主题与选条理由）；卡面内容（kid 一句话 / 例句或例词 / 机制拍名 /
  可信度徽章）全部由总表字段现算，不手写内容。老 T14「感叹句」在现行总表
  无独立规律（已普查），以 GR-03（疑问句构成）补位并在选条表登记缺口。
B2 十大天坑榜：由总表错误诊断字段实测聚合——病例数 = yaml.error_cases +
  lawdata.cases（专区页 errors 是同批病例的呈现副本，计入会双计，故不计），
  排序：病例数降序 → (quiz+prb 数) 降序 → id 升序；生成时断言聚合结果与
  冻结榜单 PIT_EXPECT 一致（数据变动导致榜单变化时须人工复核后改冻结值）。

可信度徽章（B3 的数据面，与页面渲染共用同一映射）：徽章跟「该表面实际
  渲染的记录」走，保证卡面与规律页同条同徽——有 lawdata 仓的规律只用
  lawdata 字段（LAWDATA 即由此仓生成）；无 lawdata 仓的（S/SR 条，其
  PHONLAWS 在册记录即由 yaml 侧字段构成）用 yaml 字段；专区条无结构化
  例外/主张字段 → 不贴。
  warn    ⚠️有例外   —— 渲染记录的 exc（lawdata.exc / yaml.claim.exceptions）非空
  cut     ✂️简化说法 —— 主张类型 ctype/claim.type == 'tendency'（倾向性表述）
  dispute ❓有争议   —— disp 有不以「无」开头的条目，或 yaml.adult.disputes
                        实质文本（非空且不以「无」开头）
  （📜真实词源 / 💡记忆联想 属词级徽章，数据面在 gen_words.py 的 WEXTRA。）
  注：GR-12 等条的 yaml 例外未入 lawdata.exc（总表内部口径差，已在借鉴波
  报告中登记），按本规则其卡面与规律页同为 ✂️，不贴 ⚠️。

用法：
  python3 laws-prototype/tools/gen_borrow.py --check   # 稳态校验（逐字节）
  python3 laws-prototype/tools/gen_borrow.py --write   # 生成并写回
退出码：0=通过；1=断言失败/不一致；2=用法错误。
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]  # laws-prototype/
MAIN = ROOT / "mengxing-prototype-v1.html"
MASTER = ROOT / "model" / "laws_master.json"

JD = lambda o: json.dumps(o, ensure_ascii=False)  # 默认分隔符 — 与各区字面量同格式
MARKER = "/* GENERATED: tools/gen_borrow.py ← model/laws_master.json · DO NOT EDIT */"
MARKER_RE = re.compile(r"^\s*/\* GENERATED: tools/gen_\w+\.py ← model/\S+ · DO NOT EDIT \*/\s*$")
ANCHOR = "var BORROW ="

# ---- B1 选条表：（老主题槽位, 规律 id, 短标题[形态层文案], 回链, 选条理由) ----
# 回链：law = LAW.open(id)（含 LAWDATA 本条与 PHONLAWS 覆盖的 S 条）；
#       pn  = window.PN.go(id)（专区立条，无 LAWDATA 记录）。
TRUMP_PICK = [
    ("拼读口诀", "S-32", "ch 和 th 是组合音", "law", "老 T01 拼读口诀在本表的承接条：组合音总纲，kid 口径现成"),
    ("发音天坑", "S-43", "汉语里没有的音", "law", "老 T01 的发音面；病例数 7，全表第 4，诊断最实的发音条"),
    ("变形拼写", "GR-05", "两个 -s 不是一家", "law", "老 T02 四大变形 + T03 变形面；病例数 8 并列第 2"),
    ("词根词缀", "V-38", "拆词先验真", "law", "老 T04 词根词缀乐高；V-38 假拆分是词根区纪律条"),
    ("疑问词记形", "QI-02", "疑问词两大家族", "law", "老 T05 疑问词押韵对子（记词形面）：wh/th 两家分家"),
    ("代词矩阵", "PR-12", "说「谁的」有两种站法", "pn", "老 T06 人称代词矩阵；PR-12 为 2026-11-03 新立条，走代词区回链"),
    ("一词多义", "V-16", "多义词先认树干", "law", "老 T07 一词多义三幕剧在本表的承接条：树干—树枝模型"),
    ("易混词辨析", "V-40", "中文一个「开」，英语一串按钮", "law", "老 T08 高频易混词辨析；病例+探针最密的词汇条之一"),
    ("介词坐标", "PB-08", "介词先看证件照", "law", "老 T09 in/on/at 三维坐标在本表的承接条：标准照（点/面/里）"),
    ("时态速查", "GR-04", "三单尾巴 -s 还在值班", "law", "老 T10 四大时态速查的现在时面；病例数 6"),
    ("疑问词雷达", "QI-13", "疑问词要站到最前面", "law", "老 T11 特殊疑问词雷达；病例数 4、题量最密的 QI 条"),
    ("句型与交际", "E-02", "听话要听用意", "law", "老 T12 句型转换与交际铁律的交际面：间接请求"),
    ("同音词", "V-44", "同音词靠意思选", "law", "老 T13 同音词对对碰在本表的承接条"),
    ("感叹句（缺口补位）", "GR-03", "提问请 do 来帮忙", "law", "老 T14 感叹句在现行总表无独立规律（缺口登记）；以疑问句构成 GR-03 补位"),
    ("写作速查", "W-14", "写作路标词", "law", "老 T15 作文五步法的写作面；病例数 6 的写作条"),
]

# ---- B2 冻结榜单（聚合规则见文件头；数据变动时人工复核后更新） ----
PIT_EXPECT = ["GR-12", "GR-05", "GR-08", "S-43", "GR-04",
              "W-14", "C-10", "QI-13", "V-40", "GR-02"]


def fail(msg):
    print("FAIL:", msg)
    sys.exit(1)


def scan_literal(text, i):
    open_c = text[i]
    close_c = "}" if open_c == "{" else "]"
    depth = 0
    in_str = None
    esc = False
    k = i
    while k < len(text):
        c = text[k]
        if in_str:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == in_str:
                in_str = None
            k += 1
            continue
        if c in "\"'`":
            in_str = c
        elif c == open_c:
            depth += 1
        elif c == close_c:
            depth -= 1
            if depth == 0:
                return k + 1
        k += 1
    raise ValueError("字面量定界失败")


def find_span(text, anchor, first_char):
    hits = []
    i = 0
    while True:
        j = text.find(anchor, i)
        if j < 0:
            break
        p = j + len(anchor)
        while p < len(text) and text[p].isspace():
            p += 1
        if p < len(text) and text[p] == first_char:
            hits.append(p)
        i = j + len(anchor)
    if len(hits) != 1:
        fail(f"锚点 {anchor!r} 命中 {len(hits)} 处（应为 1）")
    s = hits[0]
    return s, scan_literal(text, s)


def badges_of(r):
    """B3 映射（规律面）：跟渲染记录走——有 lawdata 仓只用 lawdata 字段，
    无 lawdata 仓（S/SR、专区）用 yaml 字段；专区条无 yaml → 无徽章。"""
    out = []
    ld = r.get("lawdata")
    if ld:
        if ld.get("exc"):
            out.append("warn")
        if ld.get("ctype") == "tendency":
            out.append("cut")
        if any(not str(x).startswith("无") for x in (ld.get("disp") or [])):
            out.append("dispute")
        return out
    y = r.get("yaml") or {}
    if (y.get("claim") or {}).get("exceptions"):
        out.append("warn")
    if (y.get("claim") or {}).get("type") == "tendency":
        out.append("cut")
    ad = (y.get("adult") or {}).get("disputes")
    if isinstance(ad, str):
        ad = [ad] if ad.strip() else []
    if any(not str(x).startswith("无") for x in (ad or [])):
        out.append("dispute")
    return out


def first_example(r):
    ld = r.get("lawdata") or {}
    exs = ld.get("exs") or []
    if exs and isinstance(exs[0], dict) and exs[0].get("s"):
        return exs[0]["s"]
    y = r.get("yaml") or {}
    exs = y.get("examples") or []
    if exs:
        e = exs[0]
        if isinstance(e, dict):
            if e.get("s"):
                return e["s"]
            if e.get("words"):
                return "例词：" + "、".join(str(w) for w in e["words"])
        elif isinstance(e, str):
            return e
    zd = (r.get("zone") or {}).get("data") or {}
    exs = zd.get("examples") or []
    if exs and isinstance(exs[0], dict) and exs[0].get("s"):
        return exs[0]["s"]
    return ""


def first_beat(r):
    ld = r.get("lawdata") or {}
    mech = ld.get("mech") or []
    if mech and isinstance(mech[0], dict) and mech[0].get("beat"):
        return mech[0]["beat"]
    y = r.get("yaml") or {}
    m = y.get("mechanism")
    if isinstance(m, list) and m and isinstance(m[0], dict):
        return m[0].get("beat") or ""
    if isinstance(m, dict):
        beats = m.get("beats") or []
        if beats and isinstance(beats[0], dict):
            return beats[0].get("beat") or ""
    zd = (r.get("zone") or {}).get("data") or {}
    beats = zd.get("beats") or []
    if beats and isinstance(beats[0], dict):
        return beats[0].get("name") or ""
    return ""


def case_counts(r):
    y = r.get("yaml") or {}
    ld = r.get("lawdata") or {}
    cases = len(y.get("error_cases") or []) + len(ld.get("cases") or [])
    quiz = len(y.get("quiz") or []) + len(ld.get("quiz") or [])
    prb = len(y.get("probes") or []) + len(ld.get("prb") or [])
    return cases, quiz, prb


def norm_case(r):
    ld = r.get("lawdata") or {}
    cs = ld.get("cases") or []
    if cs:
        c = cs[0]
        return {"wrong": c.get("wrong") or "", "right": c.get("right") or "",
                "diag": c.get("diag") or ""}
    y = r.get("yaml") or {}
    cs = y.get("error_cases") or []
    if cs:
        c = cs[0]
        return {"wrong": c.get("wrong") or "", "right": c.get("right") or "",
                "diag": c.get("diagnosis") or ""}
    fail(f"{r['id']} 无病例可取")


def route_of(r):
    """回链路由（2026-11-03 jsdom 实测落点）：
    有 lawdata 仓（LAWDATA 在册，含指针转发）或 S/SR 条（PHONLAWS 覆盖）
    → 'law'（LAW.open）；仅专区在册（如 PR-12，无 LAWDATA 指针）→ 'pn'。"""
    if r.get("lawdata"):
        return "law"
    if r["id"].startswith(("S-", "SR-")):
        return "law"
    if (r.get("zone") or {}).get("zone") == "pron":
        return "pn"
    return "law"


def build(master):
    recs = master if isinstance(master, list) else master["laws"]
    by = {r["id"]: r for r in recs}

    trump = []
    for n, (theme, lid, title, link, _why) in enumerate(TRUMP_PICK, 1):
        r = by.get(lid)
        if r is None:
            fail(f"王牌选条 {lid} 不在总表")
        kid = (r.get("canonical") or {}).get("kid_headline") or ""
        if not kid:
            fail(f"{lid} 无 kid_headline")
        ex = first_example(r)
        if not ex:
            fail(f"{lid} 取不到例句/例词")
        if route_of(r) != link:
            fail(f"{lid} 选条表回链 {link} != 计算路由 {route_of(r)}（落点已变，须复核）")
        trump.append({
            "n": n, "theme": theme, "law": lid, "title": title,
            "kid": kid, "ex": ex, "beat": first_beat(r),
            "link": link, "badges": badges_of(r),
        })

    rows = []
    for r in recs:
        c, q, p = case_counts(r)
        if c:
            rows.append((r["id"], c, q, p))
    rows.sort(key=lambda x: (-x[1], -(x[2] + x[3]), x[0]))
    top = [x[0] for x in rows[:10]]
    if top != PIT_EXPECT:
        fail(f"天坑榜聚合结果 {top} != 冻结榜单 {PIT_EXPECT}（数据已变，须人工复核）")
    pit = []
    for rank, (lid, c, _q, _p) in enumerate(rows[:10], 1):
        r = by[lid]
        kid = (r.get("canonical") or {}).get("kid_headline") or ""
        if not kid:
            fail(f"{lid} 无 kid_headline")
        pit.append({"rank": rank, "law": lid, "kid": kid, "cnt": c,
                    "case": norm_case(r), "link": route_of(r),
                    "badges": badges_of(r)})
    return {"trump": trump, "pit": pit}


def load_master():
    return json.loads(MASTER.read_text(encoding="utf-8"))


def render(master):
    return JD(build(master))


def check(text, rendered):
    s, e = find_span(text, ANCHOR, "{")
    cur = text[s:e]
    if cur == rendered:
        print(f"PASS: BORROW 字面量逐字节一致（{len(cur)} 字符；王牌 15 / 天坑 10）")
        return 0
    try:
        a = json.loads(cur)
        b = json.loads(rendered)
    except Exception as ex:
        print("FAIL: 字面量无法解析:", ex)
        return 1
    if a == b:
        print("FAIL: 内容深相等但序列化不同（字节漂移）")
        return 1
    print("FAIL: BORROW 内容不一致（现行 != 生成）")
    return 1


def write(text, rendered):
    s, e = find_span(text, ANCHOR, "{")
    out = text[:s] + rendered + text[e:]
    # 确保标记行存在（在锚点所在行之前）
    lines = out.split("\n")
    for i, ln in enumerate(lines):
        if ANCHOR in ln:
            prev = lines[i - 1] if i > 0 else ""
            if not MARKER_RE.match(prev):
                lines.insert(i, MARKER)
            break
    return "\n".join(lines)


def main(argv):
    if len(argv) != 2 or argv[1] not in ("--check", "--write"):
        print(__doc__)
        return 2
    master = load_master()
    rendered = render(master)
    text = MAIN.read_text(encoding="utf-8")
    if argv[1] == "--check":
        return check(text, rendered)
    new = write(text, rendered)
    if new != text:
        MAIN.write_text(new, encoding="utf-8")
        print(f"写回完成：BORROW 字面量 {len(rendered)} 字符")
    else:
        print("写回完成：与现行逐字节相同，文件未改动")
    return check(MAIN.read_text(encoding="utf-8"), rendered)


if __name__ == "__main__":
    sys.exit(main(sys.argv))
