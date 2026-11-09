"""LAWDATA 同步：把总表 lawdata 分仓的新内容（本次为 1.1 三批病例 + nocase 改写）
按 gen_laws.py 自身的派生口径（lawdata_with_exc + lawdata_with_rel）写进主文件
LAWDATA 字面量的非双户口条目；双户口条目只校验池字段、不动。
gen_laws.py 的 build_lawdata 是 fail-closed 校验门，不做传播，故需本脚本先同步，
再跑 gen_laws --check/--write 验收。"""
import copy, json, sys
sys.path.insert(0, "/home/hatch/workspace/mengxing-primary-english-app/laws-prototype/tools")
import gen_laws as gl

MAIN = gl.MAIN
by = gl.load_master()
text = MAIN.read_text(encoding="utf-8")
w = gl.collect(text)
s, e, cur = w["lawdata"]
duals = gl.dual_map(by)
new_ld = {}
changed = {}
for lid, entry in cur.items():
    assert lid in by, f"LAWDATA {lid} 不在总表"
    if lid in duals:
        src = by[lid]["lawdata"]
        for f in gl.POOL_FIELDS:
            assert f in src, f"LAWDATA {lid} 缺池字段 {f}"
            assert gl.deep_eq(src[f], entry.get(f)), f"LAWDATA {lid} 池字段 {f} 与总表不一致"
        new_ld[lid] = entry
    else:
        expect = gl.lawdata_with_rel(
            gl.lawdata_with_exc(copy.deepcopy(by[lid]["lawdata"]), by[lid]),
            gl.teach_rel(by, lid))
        if not gl.deep_eq(entry, expect):
            diffs = [k for k in set(entry) | set(expect) if not gl.deep_eq(entry.get(k), expect.get(k))]
            changed[lid] = diffs
            new_ld[lid] = expect
        else:
            new_ld[lid] = entry
print("LAWDATA 条目总数:", len(cur), "| 双户口:", len(duals), "| 需同步条目:", len(changed))
for lid, diffs in sorted(changed.items()):
    print(" ", lid, "->", diffs)
bad = {lid: d for lid, d in changed.items() if set(d) - {"cases", "nocase"}}
assert not bad, f"同步涉及 cases/nocase 之外的字段：{bad}"
new_text = text[:s] + gl.JD(new_ld) + text[e:]
MAIN.write_text(new_text, encoding="utf-8")
print("写回完成：", MAIN)
