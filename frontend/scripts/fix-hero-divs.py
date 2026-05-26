import re

path = "src/features/home/HeroSection.tsx"
t = open(path, encoding="utf-8").read()

# Remove gradient overlay (no gradients rule)
t = re.sub(
    r'\s*<div className="pointer-events-none absolute inset-0 bg-gradient[^"]*" />\s*',
    "\n",
    t,
)
t = re.sub(
    r'\s*<motion\.motion\.div className="pointer-events-none[^"]*" />\s*',
    "\n",
    t,
)

d, m = "div", "motion.div"
static = [
    'className="container relative',
    'className="grid items-center',
    'className="space-y-3"',
    'className="flex flex-wrap gap-2 sm:gap-3"',
    'className="grid grid-cols-2 gap-2',
    'className="rounded-xl border border-border bg-card/80',
    'className="flex flex-wrap gap-1.5"',
    'className="mb-3 flex flex-wrap',
]
for s in static:
    t = t.replace(f"<{m} {s}", f"<{d} {s}")

open(path, "w", encoding="utf-8").write(t)
print("hero fixed")
