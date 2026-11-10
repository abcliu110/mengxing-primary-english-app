import subprocess, pathlib
cands = sorted(pathlib.Path('docs/whiteboard/src').glob('patch_*.py')) + [
    pathlib.Path(p) for p in ['docs/whiteboard/src/appwrite.py',
    'docs/whiteboard/src/build_etym_db.py','docs/whiteboard/src/gen_module_quiz.py',
    'docs/whiteboard/src/split_vocab.py','docs/whiteboard/src/retire_canvas.py']]
print("candidates:", len(cands))
live_docs = ['docs/whiteboard/SOP.md','docs/whiteboard/HANDOFF.md',
    'docs/whiteboard/MASTER_DESIGN.md','docs/whiteboard/src/runall.py',
    'laws-prototype/tools/check_all.py','README.md','laws-prototype/DATA_SOURCE_SPEC.md']
for f in cands:
    b = f.stem
    code = subprocess.run(['grep','-rln','--include=*.py', b, '.'],
                          capture_output=True, text=True).stdout.split()
    code = [c for c in code if c != './'+str(f) and '__pycache__' not in c]
    docs = []
    for d in live_docs:
        try:
            t = pathlib.Path(d).read_text(encoding='utf-8', errors='ignore')
        except FileNotFoundError:
            continue
        if b in t:
            lines = [i+1 for i, l in enumerate(t.splitlines()) if b in l]
            docs.append("%s:%s" % (d, lines))
    other = subprocess.run(['grep','-rln', b, '.'],
                           capture_output=True, text=True).stdout.split()
    docfiles = [x.split(':')[0] for x in docs]
    other = [o for o in other if o not in code and './'+str(f) not in o
             and o not in docfiles and '__pycache__' not in o
             and 'docs/work-2026-11-09' not in o and 'CHANGELOG' not in o]
    print("%s: code=%s docs=%s other=%s" % (b, code, docs, other))
