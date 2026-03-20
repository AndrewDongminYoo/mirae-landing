import json
import os
import re
from collections import defaultdict

root = "."
max_depth = 3
skip = {
    "node_modules",
    ".git",
    ".next",
    "dist",
    "build",
    "coverage",
    "venv",
    ".venv",
    "out",
}
code_ext = {".ts", ".tsx", ".js", ".jsx", ".py", ".go", ".rs"}
text_ext = code_ext | {".md", ".json", ".yaml", ".yml", ".mjs", ".cjs", ".css", ".sh"}
all_files = []
for dp, dns, fns in os.walk(root):
    dns[:] = [d for d in dns if d not in skip and not d.startswith(".")]
    rel = os.path.relpath(dp, root)
    depth = 0 if rel == "." else rel.count(os.sep) + 1
    if depth > max_depth:
        dns[:] = []
        continue
    for fn in fns:
        if fn.startswith("."):
            continue
        p = os.path.join(dp, fn)
        relfile = os.path.relpath(p, root)
        ext = os.path.splitext(fn)[1].lower()
        all_files.append((relfile, ext))
# gather dirs
dirs = set(["."])
for f, _ in all_files:
    d = os.path.dirname(f) or "."
    while True:
        dirs.add(d)
        if d == ".":
            break
        d = os.path.dirname(d) or "."
# precompute file text for code
file_text = {}
for f, ext in all_files:
    if ext in code_ext:
        try:
            with open(f, "r", encoding="utf-8") as fh:
                file_text[f] = fh.read()
        except Exception:
            file_text[f] = ""
# incoming refs per dir via import paths
incoming = defaultdict(int)
for f, ext in all_files:
    if ext not in {".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"}:
        continue
    try:
        txt = open(f, "r", encoding="utf-8").read()
    except Exception:
        continue
    for m in re.finditer(r"from\s+['\"]([^'\"]+)['\"]", txt):
        imp = m.group(1)
        if imp.startswith("@/"):
            path = imp[2:]
            target_dir = os.path.dirname(path) or "."
            incoming[target_dir] += 1
scores = []
for d in sorted(dirs):
    depth = 0 if d == "." else d.count(os.sep) + 1
    if depth > max_depth:
        continue
    files = [f for f, _ in all_files if (os.path.dirname(f) or ".") == d]
    if d == ".":
        subdirs = sorted(
            {
                (os.path.dirname(f) or ".").split(os.sep)[0]
                for f, _ in all_files
                if (os.path.dirname(f) or ".") != "."
            }
        )
    else:
        prefix = d + os.sep
        subdirs = sorted(
            {
                p[len(prefix) :].split(os.sep)[0]
                for p, _ in all_files
                if p.startswith(prefix) and (os.path.dirname(p) or ".") != d
            }
        )
    total = len(files)
    code = len(
        [1 for f, _ in all_files if (os.path.dirname(f) or ".") == d and _ in code_ext]
    )
    ratio = (code / total) if total else 0
    # symbol/export counts
    exports = 0
    symbols = 0
    for f in files:
        txt = file_text.get(f, "")
        exports += len(re.findall(r"\bexport\b", txt))
        symbols += len(
            re.findall(r"\b(function|const|class|interface|type|enum)\b", txt)
        )
    # unique patterns/config presence
    has_config = any(
        os.path.basename(f)
        in {
            "package.json",
            "next.config.ts",
            "eslint.config.mjs",
            "tsconfig.json",
            "components.json",
            "knip.json",
            "postcss.config.mjs",
        }
        for f in files
    )
    has_agents = any(os.path.basename(f) == "AGENTS.md" for f in files)
    has_script = d.startswith("scripts")
    has_boundary = any(
        os.path.basename(f)
        in {"index.ts", "index.tsx", "__init__.py", "page.tsx", "layout.tsx"}
        for f in files
    )
    refs = sum(v for k, v in incoming.items() if k == d or k.startswith(d + "/"))
    score = 0
    score += 3 if total > 20 else 2 if total > 10 else 1 if total > 5 else 0
    score += 2 if len(subdirs) > 5 else 1 if len(subdirs) > 2 else 0
    score += 2 if ratio > 0.7 else 1 if ratio > 0.4 else 0
    score += 1 if (has_config or has_agents or has_script) else 0
    score += 2 if has_boundary else 0
    score += 2 if symbols > 30 else 1 if symbols > 10 else 0
    score += 2 if exports > 10 else 1 if exports > 3 else 0
    score += 3 if refs > 20 else 2 if refs > 10 else 1 if refs > 3 else 0
    scores.append(
        {
            "dir": d,
            "score": score,
            "files": total,
            "subdirs": len(subdirs),
            "code_ratio": round(ratio, 2),
            "symbols": symbols,
            "exports": exports,
            "refs": refs,
            "has_agents": has_agents,
            "has_boundary": has_boundary,
        }
    )
scores = sorted(scores, key=lambda x: (-x["score"], -x["files"], x["dir"]))
print(json.dumps(scores[:20], indent=2))
