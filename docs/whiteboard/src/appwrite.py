"""appwrite.py —— 决策 29 O8：所有改主文件的脚本统一用 save(s) 写回。
写之前：anchorcheck.check(s) 必须 0 问题（锚点 / 标记数目对不上就不写、报错退出）；
写之后：跑 jscheck.py（node --check 全部直接执行的脚本 + anchorcheck），不过就把原文件写回去并退出非 0。"""
import os, sys, subprocess, pathlib
HERE = pathlib.Path(__file__).resolve().parent
APP = HERE.parents[2] / '萌星小学英语_最终合并版.html'
def save(s, path=APP):
    sys.path.insert(0, str(HERE)); import anchorcheck
    errs = anchorcheck.check(s)
    if errs:
        for e in errs: print('anchorcheck FAIL', e)
        sys.exit('appwrite: 锚点检查不过，未写入')
    old = path.read_text(encoding='utf-8'); path.write_text(s, encoding='utf-8')
    r = subprocess.run([sys.executable, str(HERE / 'jscheck.py'), str(path)], capture_output=True, text=True)
    if r.returncode:
        path.write_text(old, encoding='utf-8'); print(r.stdout[-1500:]); sys.exit('appwrite: jscheck 不过，已还原主文件')
