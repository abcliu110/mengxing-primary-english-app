#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Merge cases_phonics_spelling.json into laws-prototype/model/laws_master.json.

Usage (from repo root):
    python3 docs/work-2026-11-09/apply_cases_phonics_spelling.py [path/to/laws_master.json]

Default target is laws-prototype/model/laws_master.json. TEST FIRST on a
/tmp copy; never run on the real file until the /tmp run is verified.

What it does (append-only):
  * For each law_id in the cases JSON, assert the law exists in laws_master.json.
  * The 49 target laws currently have lawdata == null (key present, value None);
    create the lawdata dict and its cases list when missing/None.
  * Append a case only if its norm(wrong) is not already present among that
    law's merged cases across ALL four gen_errors.py sources
    (lawdata.cases / yaml.error_cases / zone.data.errors / zone.parts errors).
  * Never touch any other field. Write back with ensure_ascii=False.

norm() is copied verbatim from laws-prototype/tools/gen_errors.py so the
dedup matches the ERRIDX generator exactly.
"""

import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
CASES_FILE = Path(__file__).resolve().parent / "cases_phonics_spelling.json"
DEFAULT_MASTER = REPO_ROOT / "laws-prototype" / "model" / "laws_master.json"

REQUIRED_FIELDS = {"wrong", "right", "type", "diag", "src", "diag_kid", "source_url"}

# norm() copied VERBATIM from laws-prototype/tools/gen_errors.py (incl. PUNCT),
# so dedup matches the ERRIDX generator exactly. Do not "simplify" it.
PUNCT = set(".,!?;:'\"()") | set("（）「」、，【】")


def norm(s):
    s = (s or "").replace("‘", "'").replace("’", "'").replace("“", '"').replace("”", '"')
    s = s.lower()
    s = "".join(" " if ch in PUNCT else ch for ch in s)
    return re.sub(r"\s+", " ", s).strip()


def merged_normed_wrongs(entry):
    """All norm(wrong) values gen_errors.py would see for this law."""
    seen = set()
    ld = entry.get("lawdata") or {}
    for c in ld.get("cases") or []:
        if isinstance(c, dict) and c.get("wrong"):
            seen.add(norm(c["wrong"]))
    y = entry.get("yaml") or {}
    for c in y.get("error_cases") or []:
        if isinstance(c, dict) and c.get("wrong"):
            seen.add(norm(c["wrong"]))
    z = entry.get("zone") or {}
    zd = z.get("data") or {}
    for c in zd.get("errors") or []:
        if isinstance(c, dict) and c.get("wrong"):
            seen.add(norm(c["wrong"]))
    # Fourth source (zone.parts): same shape as in gen_errors.build() —
    # parts[*] is {part_law_id: {data: {errors}}}.
    for part in z.get("parts") or []:
        for pobj in (part or {}).values():
            pd = (pobj or {}).get("data") or {}
            for c in pd.get("errors") or []:
                if isinstance(c, dict) and c.get("wrong"):
                    seen.add(norm(c["wrong"]))
    return seen


def main():
    master_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_MASTER
    assert master_path.is_file(), f"laws_master.json not found: {master_path}"
    assert CASES_FILE.is_file(), f"cases file not found: {CASES_FILE}"

    cases_by_law = json.loads(CASES_FILE.read_text(encoding="utf-8"))
    assert isinstance(cases_by_law, dict) and cases_by_law, "cases JSON must be a non-empty object"

    master = json.loads(master_path.read_text(encoding="utf-8"))
    assert isinstance(master, list) and master, "laws_master.json must be a non-empty list"
    by_id = {}
    for e in master:
        assert isinstance(e, dict) and "id" in e, "every master entry must be a dict with id"
        assert e["id"] not in by_id, f"duplicate law id in master: {e['id']}"
        by_id[e["id"]] = e

    total_appended = 0
    total_skipped = 0
    per_law = {}

    for law_id in sorted(cases_by_law):
        cases = cases_by_law[law_id]
        assert isinstance(cases, list) and cases, f"{law_id}: case list must be non-empty"
        assert law_id in by_id, f"law not found in laws_master.json: {law_id}"
        entry = by_id[law_id]

        # Validate every case before touching anything for this law.
        for c in cases:
            assert isinstance(c, dict), f"{law_id}: case must be an object"
            assert set(c.keys()) == REQUIRED_FIELDS, (
                f"{law_id}: case fields must be exactly {sorted(REQUIRED_FIELDS)}, "
                f"got {sorted(c.keys())}")
            for f in REQUIRED_FIELDS:
                assert isinstance(c[f], str) and c[f].strip(), f"{law_id}: field {f} must be a non-empty string"
            assert c["source_url"].startswith(("http://", "https://")), f"{law_id}: source_url must be http(s)"
            assert any(ch.isascii() and ch.isalpha() for ch in c["wrong"]), (
                f"{law_id}: wrong must contain English letters (else it becomes a teaching item)")
            assert c["diag"] != c["diag_kid"], f"{law_id}: diag and diag_kid must differ"

        # Anchor: lawdata is null for these laws today; create dict + cases list.
        ld = entry.get("lawdata")
        assert ld is None or isinstance(ld, dict), f"{law_id}: lawdata must be null or dict, got {type(ld)}"
        if ld is None:
            ld = {}
            entry["lawdata"] = ld
        if "cases" not in ld or ld["cases"] is None:
            ld["cases"] = []
        assert isinstance(ld["cases"], list), f"{law_id}: lawdata.cases must be a list"

        existing = merged_normed_wrongs(entry)
        appended = skipped = 0
        for c in cases:
            if norm(c["wrong"]) in existing:
                skipped += 1
                continue
            ld["cases"].append(dict(c))
            existing.add(norm(c["wrong"]))
            appended += 1
        per_law[law_id] = (appended, skipped)
        total_appended += appended
        total_skipped += skipped

    # Sanity: no law lost its cases; every target law now has >= 1 lawdata case.
    for law_id in cases_by_law:
        assert len(by_id[law_id]["lawdata"]["cases"]) >= 1, f"{law_id}: still has no lawdata cases"

    master_path.write_text(json.dumps(master, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(f"merged into: {master_path}")
    for law_id in sorted(per_law):
        a, s = per_law[law_id]
        print(f"  {law_id}: +{a} appended, {s} skipped")
    print(f"TOTAL: {total_appended} appended, {total_skipped} skipped, {len(per_law)} laws")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
