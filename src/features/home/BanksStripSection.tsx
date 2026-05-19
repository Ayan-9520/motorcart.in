import { Link } from "react-router-dom";
import { ArrowRight, Clock, Percent } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BANK_OFFERS } from "@/features/home/data/homepage-data";
import { SectionHeader } from "./SectionHeader";

export function BanksStripSection() {
  return (
    <section className="section-padding bg-card">
      <div className="container mx-auto space-y-8 px-4">
        <SectionHeader
          eyebrow="Finance marketplace"
          title="Compare loans from 14+ banks & NBFCs"
          description="Instant EMI preview, AI eligibility, and fastest approval times."
          href="/finance/compare"
          linkLabel="Compare all lenders"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {BANK_OFFERS.map((bank, i) => (
            <motion.div
              key={bank.code}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to="/finance"
                className="mc-card-interactive block p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                    {bank.code}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {bank.approval}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-tight">{bank.name}</p>
                <p className="mt-2 flex items-center gap-1 text-lg font-bold text-primary">
                  <Percent className="h-4 w-4" />
                  {bank.rate}
                </p>
                <p className="text-xs text-muted-foreground">EMI from {bank.emi}/mo</p>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Button size="lg" className="rounded-xl" asChild>
            <Link to="/finance/apply">
              Check eligibility <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
