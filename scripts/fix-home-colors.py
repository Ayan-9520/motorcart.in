from pathlib import Path

REPLACEMENTS = [
    ("bg-[#f8fafc]", "bg-muted/40"),
    ("dark:bg-muted/20", "dark:bg-muted/30"),
    ("border-slate-200", "border-border"),
    ("bg-white ", "bg-card "),
    ("bg-white\n", "bg-card\n"),
    ("text-[#0f172a]", "text-foreground"),
    ("text-[#16a34a]", "text-primary"),
    ("bg-[#16a34a]", "bg-primary"),
    ("border-[#16a34a]", "border-primary"),
    ("from-[#16a34a]", "from-primary"),
    ("to-emerald-600", "to-primary"),
    ("bg-gradient-to-br from-primary to-primary", "bg-primary"),
    ("bg-gradient-to-br from-[#16a34a] to-emerald-600", "bg-primary"),
    ("group-hover:bg-[#16a34a]", "group-hover:bg-primary"),
    ("group-hover:text-white", "group-hover:text-primary-foreground"),
    ("hover:border-[#16a34a]", "hover:border-primary"),
    ("text-slate-300", "text-muted-foreground"),
    ("text-slate-200", "text-muted-foreground"),
    ("bg-[#0f172a]", "bg-secondary"),
    ("bg-[#0f172a]/80", "bg-secondary/90"),
    ("from-[#0f172a]/80", "from-secondary/90"),
    ("gradient-brand", "bg-primary"),
    ('variant="gradient"', 'variant="default"'),
    ("text-[#4ade80]", "text-primary"),
    ("border-[#4ade80]", "border-primary"),
    ("bg-[#16a34a]/5", "bg-primary/5"),
    ("bg-[#16a34a]/10", "bg-primary/10"),
    ("bg-[#16a34a]/20", "bg-primary/20"),
    ("border-[#16a34a]/20", "border-primary/20"),
    ("border-[#16a34a]/30", "border-primary/30"),
    ("border-[#16a34a]/40", "border-primary/40"),
    ("section-padding relative overflow-hidden bg-[#0f172a] text-white", "home-section-alt"),
    ("section-padding bg-[#f8fafc] dark:bg-background", "home-section-alt"),
]

for path in Path("src/features/home").rglob("*.tsx"):
    t = path.read_text(encoding="utf-8")
    orig = t
    for a, b in REPLACEMENTS:
        t = t.replace(a, b)
    if t != orig:
        path.write_text(t, encoding="utf-8")
        print("colors", path.name)
