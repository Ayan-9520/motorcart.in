# Hero grid
p = "src/features/home/HeroSection.tsx"
t = open(p, encoding="utf-8").read()
t = t.replace(
    "grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16",
    "grid items-center gap-8 md:grid-cols-2 md:gap-10 xl:gap-14",
)
t = t.replace("relative hidden lg:block", "relative")
open(p, "w", encoding="utf-8").write(t)

# Category inner div
p = "src/features/home/CategorySection.tsx"
t = open(p, encoding="utf-8").read()
t = t.replace(
    '<motion.div>\n                    <p className="font-semibold text-foreground">',
    '<div>\n                    <p className="font-semibold text-foreground">',
)
t = t.replace(
    '</motion.div>\n                </Link>',
    '</div>\n                </Link>',
    1,
)
open(p, "w", encoding="utf-8").write(t)

# HomePage
p = "src/pages/HomePage.tsx"
t = open(p, encoding="utf-8").read()
t = t.replace("</motion.div>", "</div>")
open(p, "w", encoding="utf-8").write(t)

print("done")
