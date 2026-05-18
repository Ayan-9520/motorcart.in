import { motion } from "framer-motion";
import { Car, IndianRupee, Store, Users } from "lucide-react";
import { platformStats } from "@/data/mock";
import { AnimatedCounter } from "@/components/shared/animated-counter";

const statIcons = [Car, Store, IndianRupee, Users];

function parseStatValue(value: string): { numeric: number; suffix: string; prefix: string } {
  const prefix = value.startsWith("₹") ? "₹" : "";
  const cleaned = value.replace(/[₹,+]/g, "");
  const match = cleaned.match(/^([\d.]+)([A-Za-z%]*)$/);
  if (!match) return { numeric: 0, suffix: value, prefix };
  const num = parseFloat(match[1]);
  const suffix = match[2] ? `${match[2]}+` : "+";
  let multiplier = 1;
  if (suffix.startsWith("L")) multiplier = 100000;
  else if (suffix.startsWith("Cr")) multiplier = 10000000;
  return { numeric: num * multiplier, suffix: suffix.replace(/\+$/, "") + "+", prefix };
}

export function StatsSection() {
  return (
    <section className="border-y border-slate-200 bg-[#f8fafc] py-12 dark:border-border dark:bg-muted/20">
      <motion.div className="container mx-auto px-4">
        <motion.div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {platformStats.map((stat, index) => {
            const Icon = statIcons[index] ?? Car;
            const parsed = parseStatValue(stat.value);
            const useCounter = parsed.numeric > 0 && parsed.numeric < 1e12;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#16a34a] to-emerald-600 shadow-lg">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#16a34a] sm:text-3xl">
                    {useCounter ? (
                      <AnimatedCounter
                        value={Math.round(parsed.numeric)}
                        prefix={parsed.prefix}
                        suffix={parsed.suffix}
                      />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
