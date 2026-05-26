"""Fix erroneous motion.div tags in home feature files."""
from pathlib import Path

FILES = [
    "src/features/home/HeroSection.tsx",
    "src/features/home/AIFeaturesSection.tsx",
    "src/features/home/DealerCTA.tsx",
]

STATIC_SNIPPETS = [
    'className="container',
    'className="grid ',
    'className="space-y-',
    'className="flex ',
    'className="rounded-xl border',
    'className="mb-',
    'className="text-center"',
    'className="relative grid',
    'className="home-cta-panel"',
    'className="absolute -right',
]

def fix_file(path: Path) -> None:
    t = path.read_text(encoding="utf-8")
    d, m = "motion.div", "motion.div"
    d = "div"
    m_tag = "motion.div"

    for snip in STATIC_SNIPPETS:
        t = t.replace(f"<{m_tag} {snip}", f"<{d} {snip}")

    lines = t.splitlines()
    out = []
    for line in lines:
        if "</motion.div>" in line or "</motion.div>" in line:
            # keep close for motion if open had initial in recent 8 lines
            window = "\n".join(out[-12:])
            if "initial=" in window and "<motion.div" in window:
                out.append(line.replace("</motion.div>", f"</{m_tag}>"))
            else:
                out.append(line.replace("</motion.div>", f"</{d}>").replace(f"</{m_tag}>", f"</{d}>"))
        else:
            out.append(line)
    path.write_text("\n".join(out) + "\n", encoding="utf-8")
    print("fixed", path)

for f in FILES:
    p = Path(f)
    if p.exists():
        fix_file(p)
