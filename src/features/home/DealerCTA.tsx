import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Shield, Store, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const perks = [
  { icon: Store, label: "List unlimited inventory" },
  { icon: BarChart3, label: "Dealer CRM & analytics" },
  { icon: Shield, label: "Verified buyer leads" },
  { icon: Users, label: "8,500+ dealer network" },
];

export function DealerCTA() {
  return (
    <section className="section-padding">
      <motion.div className="container mx-auto px-4">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-[#0f172a] px-8 py-12 text-white md:px-12 md:py-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#16a34a]/20 blur-3xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <motion.div className="space-y-6">
              <Badge className="bg-[#16a34a]/20 text-[#4ade80] border-[#16a34a]/40">
                Partner program
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Become a Verified Dealer on Motorcart.in
              </h2>
              <p className="max-w-lg text-slate-300">
                Join India&apos;s fastest-growing automotive marketplace. Get AI-powered leads,
                finance integrations, and enterprise tools to scale your dealership.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="gradient" size="lg" asChild>
                  <Link to="/dealers/register">
                    Apply as Dealer
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/dealers">Learn more</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div className="grid grid-cols-2 gap-4">
              {perks.map((perk, index) => {
                const Icon = perk.icon;
                return (
                  <motion.div
                    key={perk.label}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                  >
                    <Icon className="mb-3 h-6 w-6 text-[#4ade80]" />
                    <p className="text-sm font-medium">{perk.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
