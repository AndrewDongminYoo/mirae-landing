import json
import os
from collections import Counter

root = "."
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
code_ext = {
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".py",
    ".go",
    ".rs",
    ".java",
    ".kt",
    ".swift",
    ".c",
    ".cpp",
    ".h",
    ".hpp",
    ".rb",
    ".php",
}
line_ext = code_ext | {".css", ".scss", ".md", ".json", ".yaml", ".yml"}
file_count = 0
max_depth = 0
total_lines = 0
large_files = 0
ext_counts = Counter()
dir_file_counts = Counter()
depth_counts = Counter()
for dp, dns, fns in os.walk(root):
    dns[:] = [d for d in dns if d not in skip and not d.startswith(".")]
    rel = os.path.relpath(dp, root)
    depth = 0 if rel == "." else rel.count(os.sep) + 1
    depth_counts[depth] += 1
    max_depth = max(max_depth, depth)
    for fn in fns:
        if fn.startswith("."):
            continue
        p = os.path.join(dp, fn)
        relfile = os.path.relpath(p, root)
        file_count += 1
        dir_file_counts[os.path.dirname(relfile) or "."] += 1
        ext = os.path.splitext(fn)[1].lower()
        ext_counts[ext] += 1
        if ext in line_ext:
            try:
                with open(p, "rb") as f:
                    data = f.read()
                lines = data.count(b"\n") + (
                    1 if data and not data.endswith(b"\n") else 0
                )
                total_lines += lines
                if ext in code_ext and lines > 500:
                    large_files += 1
            except Exception:
                pass
print(
    json.dumps(
        {
            "total_files": file_count,
            "total_lines_selected_ext": total_lines,
            "max_depth": max_depth,
            "large_code_files_over_500_lines": large_files,
            "top_extensions": ext_counts.most_common(15),
            "depth_histogram": sorted(depth_counts.items()),
            "top_directories_by_file_count": dir_file_counts.most_common(30),
        },
        indent=2,
    )
)
