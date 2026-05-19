import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, CheckCircle2, Percent } from "lucide-react";
import { loanProducts } from "@/data/loans";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "./SectionHeader";

function calcEmi(principal: number, annualRate: number, months: number): number {
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / months;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export function FinanceSection() {
  const [amount, setAmount] = useState(1200000);
  const [tenure, setTenure] = useState(60);
  const featured = loanProducts.filter((p) => p.is_featured).slice(0, 3);

  const emi = useMemo(() => calcEmi(amount, 9.5, tenure), [amount, tenure]);

  return (
    <section className="home-section-card">
      <div className="container mx-auto space-y-10 px-4">
        <SectionHeader
          eyebrow="Smart finance"
          title="Instant Auto Loans"
          description="Compare rates from top banks, preview EMI, and check eligibility with FinanceBot."
          href="/finance"
          linkLabel="Compare all loans"
        />

        <motion.div
          className="grid gap-8 lg:grid-cols-[1fr_1.2fr]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-primary/20 bg-muted/40 dark:bg-card">
            <CardContent className="space-y-5 p-6">
              <div className="flex items-center gap-2 text-primary">
                <Calculator className="h-5 w-5" />
                <h3 className="font-semibold text-foreground dark:text-foreground">EMI Preview</h3>
              </div>
              <div className="space-y-2">
                <Label htmlFor="loan-amount">Loan amount (₹)</Label>
                <Input
                  id="loan-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  min={100000}
                  step={50000}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenure">Tenure (months)</Label>
                <Input
                  id="tenure"
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value) || 12)}
                  min={12}
                  max={84}
                />
              </div>
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                <p className="text-sm text-muted-foreground">Estimated EMI @ 9.5% p.a.</p>
                <p className="text-3xl font-bold text-primary">{formatCurrency(Math.round(emi))}/mo</p>
              </div>
              <Button variant="default" className="w-full" asChild>
                <Link to="/finance/apply">
                  Check Eligibility
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3">
            {featured.map((loan, index) => (
              <motion.div
                key={loan.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="relative h-full hover:shadow-card-hover">
                  {loan.is_featured && (
                    <Badge className="absolute right-4 top-4 border-0 bg-primary text-primary-foreground">
                      Popular
                    </Badge>
                  )}
                  <CardContent className="space-y-4 p-5">
                    <motion.div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                        {loan.bank_name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold">{loan.bank_name}</h4>
                        <p className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Percent className="h-3.5 w-3.5" />
                          {loan.interest_rate_min}% – {loan.interest_rate_max}% p.a.
                        </p>
                      </div>
                    </motion.div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="rounded-lg bg-muted/60 p-2 dark:bg-muted/40">
                        <p className="text-xs text-muted-foreground">Max loan</p>
                        <p className="font-semibold">{formatCurrency(loan.max_loan_amount)}</p>
                      </div>
                      <div className="rounded-lg bg-muted/60 p-2 dark:bg-muted/40">
                        <p className="text-xs text-muted-foreground">Tenure</p>
                        <p className="font-semibold">Up to {loan.tenure_max_months} mo</p>
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {loan.features.slice(0, 2).map((feature: string) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
