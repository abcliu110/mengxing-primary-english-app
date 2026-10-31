#!/usr/bin/env python3
"""知识模型校验器（REWRITE_TECH_PLAN §3.2/§6 硬规则）。
用法: python3 validate.py <model.yaml> [...]
规则:
  R1 ID 全局唯一; 所有引用 (supports/exceptionOf/linkedClaim/for/concept) 必须可解析
  R2 tendency: 必须挂 >=1 条 Exception, 且必须有 scope
  R3 mnemonic: 必须有 linkedClaim (它帮记的真内容)
  R4 etymology: 必须有 source (来源语与原义)
  R5 rule: 必须有 >=2 条 Example 支持
  R6 措辞红线: 任何 Claim.statement 禁含 物理定律/统摄/物理边界/绝对;
     tendency/mnemonic 另禁 一律/永远/从来都
"""
import sys, yaml

BANNED_ALL = ["物理定律", "统摄", "物理边界", "绝对"]
BANNED_SOFT = ["一律", "永远", "从来都"]

def main(paths):
    errors, warnings = [], []
    for path in paths:
        doc = yaml.safe_load(open(path, encoding="utf-8"))
        fam = doc.get("family", path)
        concepts = {c["id"] for c in doc.get("concepts", [])}
        claims = {c["id"]: c for c in doc.get("claims", [])}
        examples = doc.get("examples", [])
        exceptions = {e["id"]: e for e in doc.get("exceptions", [])}
        chants = doc.get("chants", [])
        all_ids = list(concepts) + list(claims) + [e["id"] for e in examples] + list(exceptions) + [c["id"] for c in chants]
        # R1 uniqueness
        seen = set()
        for i in all_ids:
            if i in seen: errors.append(f"[{fam}] R1 重复 ID: {i}")
            seen.add(i)
        sup_count = {}
        for e in examples:
            t = e.get("supports")
            if t not in claims: errors.append(f"[{fam}] R1 例证 {e['id']} supports 不可解析: {t}")
            sup_count[t] = sup_count.get(t, 0) + 1
        for x in exceptions.values():
            if x.get("exceptionOf") not in claims: errors.append(f"[{fam}] R1 例外 {x['id']} exceptionOf 不可解析")
        for c in chants:
            if c.get("for") not in claims: errors.append(f"[{fam}] R1 口诀 {c['id']} for 不可解析")
        for cl in claims.values():
            cid, typ = cl["id"], cl.get("type")
            if cl.get("concept") not in concepts: errors.append(f"[{fam}] R1 {cid} concept 不可解析")
            st = cl.get("statement", "")
            for w in BANNED_ALL:
                if w in st: errors.append(f"[{fam}] R6 {cid} statement 含红线词「{w}」")
            if typ == "tendency":
                exc = [e for e in exceptions.values() if e.get("exceptionOf") == cid]
                if not exc: errors.append(f"[{fam}] R2 {cid} tendency 没有例外")
                if not cl.get("scope"): errors.append(f"[{fam}] R2 {cid} tendency 缺 scope")
                for w in BANNED_SOFT:
                    if w in st: errors.append(f"[{fam}] R6 {cid} tendency 含绝对化措辞「{w}」")
            elif typ == "mnemonic":
                if cl.get("linkedClaim") not in claims: errors.append(f"[{fam}] R3 {cid} mnemonic 缺 linkedClaim 或不可解析")
                for w in BANNED_SOFT:
                    if w in st: errors.append(f"[{fam}] R6 {cid} mnemonic 含绝对化措辞「{w}」")
            elif typ == "etymology":
                if not cl.get("source"): errors.append(f"[{fam}] R4 {cid} etymology 缺 source")
            elif typ == "rule":
                if sup_count.get(cid, 0) < 2: errors.append(f"[{fam}] R5 {cid} rule 的例证不足 2 条 (现 {sup_count.get(cid,0)})")
            else:
                errors.append(f"[{fam}] {cid} 未知 type: {typ}")
            for xid in cl.get("exceptions", []):
                if xid not in exceptions: errors.append(f"[{fam}] R1 {cid} 引用的例外不存在: {xid}")
        print(f"{fam}: concepts={len(concepts)} claims={len(claims)} examples={len(examples)} exceptions={len(exceptions)} chants={len(chants)}")
    for w in warnings: print("  ⚠", w)
    if errors:
        print(f"\n✗ 校验失败 {len(errors)} 项:")
        for e in errors: print("  -", e)
        return 1
    print("\n✓ 全部校验通过")
    return 0

if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
