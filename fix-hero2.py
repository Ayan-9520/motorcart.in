path = "src/features/home/HeroSection.tsx"
lines = open(path, encoding="utf-8").read().splitlines()
lines[141] = '                <motion.div className="flex flex-wrap gap-2">'.replace("motion.div", "div")
lines[151] = "                </div>"
lines[152] = "              </div>"
lines[153] = "            </motion.div>"
lines[154] = "          </motion.div>"
open(path, "w", encoding="utf-8").write("\n".join(lines) + "\n")
