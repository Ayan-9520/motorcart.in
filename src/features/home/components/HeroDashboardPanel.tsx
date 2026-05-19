import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, CheckCircle2, Gavel, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

export function HeroDashboardPanel() {
  return (
    <motion.div
      {...fade(0.1)}
      className="hero-dashboard-panel w-full max-w-full rounded-2xl border border-border/80 bg-gradient-to-b from-card to-muted/20 p-2.5 shadow-[var(--shadow-card)] sm:p-3"
    >
      <div className="grid grid-cols-2 gap-2">
        <motion.div {...fade(0.15)} className="floating-card flex flex-col">
          <div className="flex items-center justify-between gap-1">
            <Badge className="border-0 bg-destructive text-[10px] text-destructive-foreground">
              <span className="mr-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              LIVE
            </Badge>
            <span className="text-[10px] text-muted-foreground">34 bids</span>
          </div>
          <p className="mt-2 text-xs font-semibold leading-snug">2019 Honda City VX</p>
          <p className="mt-1 text-base font-bold text-primary">{formatCurrency(782000)}</p>
          <p className="text-[10px] text-muted-foreground">04:22:18 left</p>
          <Button size="sm" className="mt-auto w-full rounded-lg pt-3 text-xs" asChild>
            <Link to="/auctions">Place Bid</Link>
          </Button>
        </motion.div>

        <motion.div {...fade(0.2)} className="floating-card flex flex-col overflow-hidden p-0">
          <img
            src="https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&q=80"
            alt="Hyundai Creta"
            className="h-14 w-full object-cover sm:h-16"
          />
          <div className="flex flex-1 flex-col p-2 sm:p-2.5">
            <div className="flex items-start justify-between gap-1">
              <div>
                <p className="text-[10px] font-medium text-primary">Verified</p>
                <p className="text-xs font-semibold">Creta SX(O)</p>
              </div>
              <Badge variant="outline" className="shrink-0 px-1.5 text-[9px]">
                360°
              </Badge>
            </div>
            <p className="mt-1 text-sm font-bold sm:text-base">{formatCurrency(1485000)}</p>
            <p className="text-[10px] text-muted-foreground">EMI {formatCurrency(24500)}/mo</p>
          </div>
        </motion.div>

        <motion.div {...fade(0.25)} className="floating-card">
          <div className="flex items-center gap-2 text-primary">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span className="text-xs font-semibold">Loan Pre-Approved</span>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">HDFC · 8.9% p.a.</p>
          <p className="text-base font-bold">{formatCurrency(1200000)}</p>
          <p className="text-[10px] text-muted-foreground">Approved in 4 hrs</p>
        </motion.div>

        <motion.div {...fade(0.3)} className="floating-card flex flex-col">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Bot className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold">AI SupportBot</p>
              <p className="flex items-center gap-1 text-[10px] text-primary">
                <span className="ai-pulse" /> Online
              </p>
            </div>
          </div>
          <p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground">
            12 SUVs under ₹15L in Mumbai found.
          </p>
          <Button variant="outline" size="sm" className="mt-auto w-full rounded-lg text-xs" asChild>
            <Link to="/ai">Ask AI</Link>
          </Button>
        </motion.div>

        <motion.div {...fade(0.35)} className="floating-card col-span-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground">Dealer growth</p>
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2 flex items-end justify-between gap-3">
            <p className="text-xl font-bold text-foreground">+38%</p>
            <div className="flex h-8 flex-1 max-w-[120px] items-end gap-0.5">
              {[40, 65, 45, 80, 55, 95, 70].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm bg-primary/80" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <p className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
            <Users className="h-3 w-3" /> 8.5K dealers · ₹1200Cr+ loans
          </p>
        </motion.div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/5 px-2.5 py-1 text-[10px] font-medium text-primary">
          <Gavel className="h-3 w-3" />
          12 repo auctions today
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] text-muted-foreground">
          3 new leads
        </span>
      </div>
    </motion.div>
  );
}
