#!/usr/bin/env python3
from pathlib import Path

HTML = Path("mengxing-prototype-v1.html")
html = HTML.read_text(encoding="utf-8")

OLD = """  wbRenderScene();
  wbPlayStart();
}
/* CUT"""

NEW = """  wbRenderScene();
  wbPlayStart();
  if(window.wbCapSpeak) wbCapSpeak();
}
/* CUT"""

count = html.count(OLD)
print(f"Found {count} matches")
html = html.replace(OLD, NEW)
HTML.write_text(html, encoding="utf-8")
print("Done")
