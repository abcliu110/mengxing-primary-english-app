#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
选项级反馈表生成器（学习阶段 3 试点，《数据源规范》§3：内嵌副本只能由脚本生成）。

派生：主文件 `var RV_FEEDBACK`（生成副本，不得手改）←
  病例库 model/laws_master.json（lawdata.cases + yaml.error_cases 并集）
       + model/verb_error_cases.json（TA 病例库 VEC）
  题面：主文件内嵌 LAWDATA / RV_TA 字面量（按 RV 题源适配器 srcLAWDATA/srcTA
        的同一口径重建 LQ:/TA: 题面键，只读解析，不改一字）。

对齐口径（norm = 小写、弯引号转直、去标点、折叠空白）：
  M1 整句等值 / M2 填空还原 / M3 差分词（选项 == 病例 wrong 侧独有词串）= 自动强对齐
  M4 弱对齐（选项词串是 wrong 的连续子串而非 right 的）= 仅提示，不自动进表
  M5 句级错形（同错 token 跨句）自动命中假阳率约 50%（阶段3 盘点实测），
     一律不自动采信：逐条人工核验后登记 VERIFIED 才进表。
  EXCLUDED：自动命中经核验为假对齐者登记于此（附理由），生成时跳过。
  REWRITES：进表条目的 why（孩子白话一句）逐条登记于此——源自对应病例 diag
     的事实改写；无登记者（强对齐未被 REWRITES/EXCLUDED 覆盖）生成即报错，
     防止新对齐未经核验静默进表。right 默认取病例 right，可登记覆盖（如节选）。
  reveal 副表：LAWDATA 自评题中内嵌「A. x B. y」两选项者，答错可反推所选项，
     其错选项同样按 M1/M2/M3 对齐（GR-12 经 REVEAL_CASE_FIX 改配同机制病例）。

呈现：复习区（RV）答错时按 (key, 所选项) 查表显示 why + right；无条目保持现行为。
题池内容、判答、盒子升降一字不动（RV_FEEDBACK 是附加层）。

用法：
  python3 tools/gen_feedback.py --check   # 只比对，退出码 0=逐字节一致
  python3 tools/gen_feedback.py --write   # 写回主文件
"""
import difflib
import importlib.util
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MAIN = ROOT / "mengxing-prototype-v1.html"
MASTER = ROOT / "model/laws_master.json"
VECF = ROOT / "model/verb_error_cases.json"
STAMP = "/* GENERATED: tools/gen_feedback.py ← 病例库（laws_master + verb_error_cases）× 复习题面错选项对齐（阶段3 试点） · DO NOT EDIT */"
JD = lambda o: json.dumps(o, ensure_ascii=False)

_spec = importlib.util.spec_from_file_location("xr", ROOT / "tools/extract_review_data.py")
XR = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(XR)

PUNCT = set(".,!?;:'\"()") | set("（）「」、，【】")

def norm(s):
    s = (s or "").replace("‘", "'").replace("’", "'").replace("“", '"').replace("”", '"')
    s = s.lower()
    s = "".join(" " if ch in PUNCT else ch for ch in s)
    return re.sub(r"\s+", " ", s).strip()

def toks(s):
    n = norm(s)
    return n.split(" ") if n else []

def subseq(needle, hay):
    if not needle or len(needle) > len(hay):
        return False
    return any(hay[i:i + len(needle)] == needle for i in range(len(hay) - len(needle) + 1))

def diff_wrong_tokens(wrong, right):
    tw, tr = toks(wrong), toks(right)
    sm = difflib.SequenceMatcher(a=tw, b=tr, autojunk=False)
    out = []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag in ("replace", "delete"):
            out.extend(tw[i1:i2])
    return out

# ---------------- 病例库 ----------------
def case_registry():
    master = json.load(open(MASTER, encoding="utf-8"))
    reg = {}
    for x in master:
        out, seen = [], set()
        for c in ((x.get("lawdata") or {}).get("cases") or []):
            if c.get("wrong"):
                out.append({"wrong": c["wrong"], "right": c.get("right", ""), "diag": c.get("diag", ""), "ref": x["id"] + "病例"})
                seen.add(norm(c["wrong"]))
        for e in ((x.get("yaml") or {}).get("error_cases") or []):
            if e.get("wrong") and norm(e["wrong"]) not in seen:
                out.append({"wrong": e["wrong"], "right": e.get("right", ""), "diag": e.get("diagnosis", ""), "ref": x["id"] + "病例"})
                seen.add(norm(e["wrong"]))
        if out:
            reg[x["id"]] = out
    vec = json.load(open(VECF, encoding="utf-8"))["cases"]
    veclist = [{"wrong": c["error_sentence"], "right": c["corrected"], "diag": c.get("note", ""), "ref": "病例 " + c["id"]} for c in vec]
    return reg, veclist

# ---------------- 核验 / 剔除 / 改配登记 ----------------
def _find(reg, law, sub):
    for c in reg.get(law, []):
        if sub in c["wrong"]:
            return c
    raise KeyError((law, sub))

def build_registries(reg, veclist):
    vec_by_ref = {c["ref"]: c for c in veclist}
    verified = {  # (key, opt) -> (case, 核验依据)
        ("LQ:CO-07:1", "There has a dog under the tree."): (_find(reg, "CO-07", "There has a book"), "同构存现句 + 同一错 token has"),
        ("LQ:QI-11:1", "No."): (_find(reg, "QI-11", "Do you want tea or juice"), "与 Yes. 同案：极性回答误对选择图式，病例 diag 覆盖该图式混淆"),
        ("LQ:E-09:0", "No, no."): (_find(reg, "E-09", "No, no."), "M4 弱对齐核验提升：病例 wrong 的答语段即 No, no.（括号内为场景注）"),
        ("TA:TA02-E1", "We visited Grandma tomorrow."): (vec_by_ref["病例 VEC-031"], "病例框架 Tomorrow + visited 与选项错误逐点相同"),
        ("TA:TA09-E3", "I have finished my homework when Mum came home."): (vec_by_ref["病例 VEC-008"], "完成时被钉在明确过去锚点；病例为该错型的语料正例（last year）"),
        ("TA:TA16-E4", "We live here for three years."): (vec_by_ref["病例 VEC-012"], "持续到现在却用一般现在时，与病例 I live here since 2020 同错"),
    }
    excluded = {  # (key, opt) -> 理由（自动命中但核验为假对齐，不进表）
        ("TA:TA06-E4", "I have seen him."): "似对齐：该选项本身合语法，仅未说出 yesterday（题面 reason 已明示）；病例（have seen + yesterday 并置冲突）会讲错原因",
        ("TA:TA17-E2", "watch"): "似对齐：题问 saw 的动词原形（see/watch 之辨）；病例是 watch 漏加 -ed，误解不同",
    }
    reveal_fix = {  # key -> (case, 说明)
        "LQ:GR-12:0": (_find(reg, "GR-12", "there is 3 watermelons"), "自动配到 population 病例；本题为 there be 就近一致，改配同机制镜像病例"),
    }
    return verified, excluded, reveal_fix

# ---------------- why 改写登记（孩子白话，逐条源自病例 diag 的事实） ----------------
REWRITES = {
    ("LQ:V-40:0", "Open the light"): {"why": "这是把汉语的『开灯』直接搬过来了：英语里开灯不用 open，要用 turn on。"},
    ("LQ:V-40:1", "Eat medicine"): {"why": "『吃药』是汉语的打包法：英语把『服药』这件事交给 take，不用 eat。"},
    ("LQ:QI-13:1", "You want what?"): {"why": "把汉语的原样问法整套搬进来了——英语提问时，疑问词要站到最前面，还要请 do 来帮忙。"},
    ("LQ:QI-13:1", "What you want?"): {"why": "疑问词搬到了前面，却忘了请助动词 do 来帮忙——只搬了一半。"},
    ("LQ:QI-11:1", "Yes."): {"why": "带 or 的问题是让你二选一，不是问『是或不是』，所以不能答 Yes，要直接选一个。", "right": "Juice, please."},
    ("LQ:QI-11:1", "No."): {"why": "带 or 的问题是让你二选一，不是问『是或不是』，答 No 也不对图式，要直接选一个。", "right": "Juice, please."},
    ("LQ:CO-07:1", "There has a dog under the tree."): {"why": "把新朋友介绍出场，要用 There is；has 管的是『谁拥有』，搬进出场句就错了。"},
    ("LQ:E-09:0", "No, no."): {"why": "这是汉语的谦虚说法搬过来了：英语里受了夸要大方收下；说 No, no.，对方会以为你在否定他的夸奖。"},
    ("TA:TA06-E4", "I have seen him yesterday."): {"why": "have seen 把眼睛望着现在，yesterday 又把事情钉在昨天——两个定位打架。点名了昨天，就归一般过去时管。"},
    ("TA:TA02-E1", "We visited Grandma tomorrow."): {"why": "tomorrow 是明天的事，visited 却是过去的衣裳——时间和衣裳打架了。说将来的事要借 will 来帮忙。"},
    ("TA:TA02-E3", "visit"): {"why": "visit 是要干活的动词本身，不是借来的小帮手——它自己还得换衣裳（讲过去要变 visited）；小帮手是 will。"},
    ("TA:TA09-E3", "I have finished my homework when Mum came home."): {"why": "小旗插在过去（妈妈到家那一刻），站在那一刻往回看要用 had；have 是站在今天往回看的。真实病例里有人把 have visited 和 last year 放进一句，错的是同一回事。"},
    ("TA:TA16-E4", "We live here for three years."): {"why": "『住了三年、还住着』这条线从过去一直拉到现在，要用完成时 have lived 把线拉通；只说 live，线就断在今天。真实病例里 I live here since 2020 错在同一个地方。"},
}
REWRITES_REVEAL = {
    "LQ:GR-02:0": {"why": "did 已经把『过去』扛在自己身上，后面的动词就卸下担子、用原形 go——一句话里过去只标一次。真实病例里有人写 didn't went，就是多标了一次。"},
    "LQ:GR-11:0": {"why": "because 和 so 是同一座桥的两头——一段因果只搭一座桥，留一个就行。"},
    "LQ:GR-12:0": {"why": "there be 里的 be，听离它最近的那个名字：pen 只有一个，所以用 is。真实病例里有人给 3 个西瓜配了 is，也是没听最近的名字。"},
    "LQ:GR-14:0": {"why": "位置决定穿哪件：between 后面是宾语的位置，要穿宾格 me。用 I 是把『正式感』加错了地方——连母语者也常犯这个错。"},
    "LQ:GR-34:0": {"why": "代词主语绝不倒装：it 要老老实实站在 comes 前面。"},
}

JARGON = re.compile(r"语料|DOI|病例号|转述|负迁移|屈折|形合|意合|原文|清单条目|探针|条目支撑")

def clean_diag(diag):
    """diag 程序化清洗（改写登记缺失时的兜底路径）：去出处括号与归属前缀，
    取首句，过行话门；过不了返回 None（条目不进表，待人工登记）。"""
    s = diag or ""
    s = re.sub(r"〔[^〕]*〕", "", s)
    s = re.sub(r"（回[^）]*）|\(回[^)]*\)", "", s)
    s = re.sub(r"^原文(分析|归类)?[（(]?转述[）)]?\s*[:：]?", "", s)
    s = re.sub(r"^原文将此例归入『[^』]*』\s*[:：]?", "", s)
    s = re.sub(r"^清单条目登记\s*[:：]?", "", s)
    s = s.strip()
    first = re.split(r"(?<=。)", s)[0] if s else ""
    if not first or len(first) > 90 or JARGON.search(first):
        return None
    return first

def align(opt, q, cases):
    no = norm(opt)
    for c in cases:
        if no and no == norm(c["wrong"]):
            return "strong", "M1", c
    if re.search(r"_{2,}", q or ""):
        filled = re.sub(r"_{2,}", opt, q)
        nf = norm(filled)
        for c in cases:
            if norm(c["wrong"]) and norm(c["wrong"]) in nf:
                return "strong", "M2", c
    for c in cases:
        dw = diff_wrong_tokens(c["wrong"], c["right"])
        if dw and " ".join(dw) == no:
            return "strong", "M3", c
    to = toks(opt)
    if len(to) >= 2:
        for c in cases:
            if subseq(to, toks(c["wrong"])) and not subseq(to, toks(c["right"])):
                return "weak", "M4", c
    return None, None, None

# ---------------- 题面重建（与 RV 适配器同口径） ----------------
def rebuild_items(text):
    _, _, lbody = XR.find_block(text, "var LAWDATA=")
    lawdata = XR.get_literal(lbody, r"(?:var|const|let)\s+LAWDATA\s*=")
    items = []
    for lid, d in lawdata.items():
        if d.get("aud") == "教师/设计层" or d.get("g") == "PB" or d.get("zone") == "parents":
            continue
        for i, q in enumerate(d.get("quiz") or []):
            items.append({"key": "LQ:" + lid + ":" + str(i), "fam": "law", "law": lid,
                          "kind": "choice" if (q.get("opts")) else "reveal",
                          "q": q.get("q") or "", "opts": q.get("opts"), "a": q.get("a") or ""})
    _, _, tbody = XR.find_block(text, "var RV_TA=")
    rvta = XR.get_literal(tbody, r"(?:var|const|let)\s+RV_TA\s*=")
    for u in rvta:
        for it in u.get("quiz") or []:
            items.append({"key": "TA:" + it["id"], "fam": "ta", "law": u["id"],
                          "kind": "choice" if it.get("options") else ("build" if it.get("build") else "reveal"),
                          "q": it.get("prompt") or "", "opts": it.get("options"), "a": it.get("answer") or "",
                          "caseError": it.get("case_error") or "", "reason": it.get("reason") or ""})
    return items

AB_PAT = re.compile(r"A[.．、]\s*(.+?)\s*B[.．、]\s*(.+)$")

def build_feedback(text):
    reg, veclist = case_registry()
    verified, excluded, reveal_fix = build_registries(reg, veclist)
    items = rebuild_items(text)
    fb = {}
    accounted = set()
    pending_weak = []
    errors = []

    def why_for(key, opt, case):
        rw = REWRITES.get((key, opt))
        if rw:
            return rw["why"], rw.get("right") or case["right"]
        cd = clean_diag(case["diag"])
        if cd:
            return cd, case["right"]
        return None, None

    for it in items:
        law = it["law"]
        cases = list(reg.get(law, []))
        if it["fam"] == "ta":
            cases = cases + veclist
            if it.get("caseError"):
                cases = cases + [{"wrong": it["caseError"], "right": it["a"], "diag": it.get("reason", ""), "ref": law + "题面病例"}]
        if it["kind"] == "choice":
            for opt in it["opts"] or []:
                if norm(opt) == norm(it["a"]):
                    continue
                kk = (it["key"], opt)
                if kk in excluded:
                    accounted.add(kk)
                    continue
                status, method, case = align(opt, it["q"], cases)
                if kk in verified:
                    case, _note = verified[kk]
                    status, method = "strong", "M5v"
                if status == "strong":
                    accounted.add(kk)
                    why, right = why_for(it["key"], opt, case)
                    if why is None:
                        errors.append(f"{it['key']} 选项 {opt!r}：强对齐但 why 无登记且 diag 清洗不过门")
                        continue
                    fb.setdefault(it["key"], {}).setdefault("opts", {})[opt] = {"why": why, "right": right, "ref": case["ref"]}
                elif status == "weak":
                    if kk in REWRITES:
                        accounted.add(kk)
                        why, right = why_for(it["key"], opt, case)
                        fb.setdefault(it["key"], {}).setdefault("opts", {})[opt] = {"why": why, "right": right, "ref": case["ref"]}
                    else:
                        pending_weak.append(kk)
        elif it["kind"] == "reveal" and it["fam"] == "law":
            m = AB_PAT.search(it["q"])
            if not m:
                continue
            mm = re.match(r"\s*([AB])[.．、—\- ]", it["a"])
            if not mm:
                continue
            wrong_opt = (m.group(2) if mm.group(1) == "A" else m.group(1)).strip()
            stem = it["q"][:m.start()].strip()
            filled = re.sub(r"_{2,}", wrong_opt, stem)
            case = None
            for c in reg.get(law, []):
                if norm(wrong_opt) == norm(c["wrong"]) or norm(filled) == norm(c["wrong"]) or norm("Here " + wrong_opt) == norm(c["wrong"]):
                    case = c
                    break
            if not case:
                for c in reg.get(law, []):
                    dw = diff_wrong_tokens(c["wrong"], c["right"])
                    if dw and " ".join(dw) == norm(wrong_opt):
                        case = c
                        break
            if it["key"] in reveal_fix:
                case = reveal_fix[it["key"]][0]
            if case is not None:
                rw = REWRITES_REVEAL.get(it["key"])
                if rw is None:
                    errors.append(f"{it['key']}：reveal 对齐但 REWRITES_REVEAL 无登记")
                    continue
                fb[it["key"]] = {"reveal": {"opt": wrong_opt, "why": rw["why"], "right": rw.get("right") or case["right"], "ref": case["ref"]}}
    # 登记表反向断言：登记的每条都必须命中真实对齐（防漂移）
    for kk in list(REWRITES) + list(verified):
        if kk not in accounted:
            errors.append(f"登记条目 {kk} 未命中任何对齐（题面或病例已变，需复核登记）")
    for k in REWRITES_REVEAL:
        if k not in fb:
            errors.append(f"REWRITES_REVEAL 登记 {k} 未产出条目（题面或病例已变，需复核登记）")
    return fb, pending_weak, errors

def render(text):
    fb, pending, errors = build_feedback(text)
    if errors:
        raise ValueError("；".join(errors))
    block = ("<script>\n" + STAMP + "\n" + "var RV_FEEDBACK=" + JD(fb) + ";\n" + "</script>")
    n_opts = sum(len(v.get("opts", {})) for v in fb.values())
    n_rev = sum(1 for v in fb.values() if "reveal" in v)
    return block, (len(fb), n_opts, n_rev, len(pending))

def locate_block(text):
    i = text.find(STAMP)
    if i < 0:
        return None
    start = text.rindex("<script>", 0, i)
    end = text.index("</script>", i) + len("</script>")
    return start, end

def main(argv):
    text = MAIN.read_text(encoding="utf-8")
    try:
        block, counts = render(text)
    except ValueError as e:
        print("FAIL: 生成门禁未过：", e)
        return 1
    if len(argv) >= 2 and argv[1] == "--check":
        loc = locate_block(text)
        if loc is None:
            print("FAIL: RV_FEEDBACK 生成块不存在（先 --write）")
            return 1
        if text[loc[0]:loc[1]] == block:
            print(f"PASS: RV_FEEDBACK 逐字节一致（{counts[0]} 题 · 选项反馈 {counts[1]} 条 · reveal 反馈 {counts[2]} 条 · 弱对齐待核 {counts[3]}）")
            return 0
        print("FAIL: RV_FEEDBACK 与重新生成不一致（病例/题面/登记已变，需复核后 --write）")
        return 1
    if len(argv) >= 2 and argv[1] == "--write":
        loc = locate_block(text)
        if loc is not None:
            new = text[:loc[0]] + block + text[loc[1]:]
        else:
            xloc = XR.locate_block(text)
            if xloc is None:
                print("FAIL: 找不到 extract_review 生成块（插入锚点缺失）")
                return 1
            new = text[:xloc[1]] + "\n" + block + text[xloc[1]:]
        if new != text:
            MAIN.write_text(new, encoding="utf-8")
            print(f"写回完成（{counts[0]} 题 · 选项反馈 {counts[1]} 条 · reveal 反馈 {counts[2]} 条 · 弱对齐待核 {counts[3]}）")
        else:
            print("与现行逐字节相同，文件未改动")
        return 0
    print(__doc__)
    return 64

if __name__ == "__main__":
    sys.exit(main(sys.argv))
