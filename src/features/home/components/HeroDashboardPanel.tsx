import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, CheckCircle2, Gavel, LineChart, Bell, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay },
});

export function HeroDashboardPanel() {
  return (
    <motion.div className="hero-dashboard relative mx-auto h-[520px] w-full max-w-[480px]">
      <motion.div {...fadeUp(0.1)} className="floating-card absolute left-0 top-0 z-20 w-[58%]">
        <div className="flex items-center justify-between gap-2">
          <Badge className="border-0 bg-red-600 text-white">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            LIVE
          </Badge>
          <span className="text-xs text-muted-foreground">34 bidding</span>
        </div>
        <p className="mt-3 text-sm font-semibold leading-snug">2019 Honda City VX CVT</p>
        <p className="mt-1 text-2xl font-bold text-primary">{formatCurrency(782000)}</p>
        <p className="text-xs text-muted-foreground">Ends in 04:22:18</p>
        <Button size="sm" className="mt-3 w-full rounded-xl" asChild>
          <Link to="/auctions">Place Bid</Link>
        </Button>
      </motion.div>

      <motion.div {...fadeUp(0.2)} className="floating-card absolute right-0 top-8 z-30 w-[52%]">
        <img
          src="https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&q=80"
          alt="Featured vehicle"
          className="mb-3 h-24 w-full rounded-xl object-cover"
        />
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-primary">Verified</p>
            <p className="text-sm font-semibold">Hyundai Creta SX(O)</p>
          </div>
          <Badge variant="outline" className="shrink-0 text-[10px]">
            360°
          </Badge>
        </div>
        <p className="mt-1 text-lg font-bold">{formatCurrency(1485000)}</p>
        <p className="text-xs text-muted-foreground">EMI {formatCurrency(24500)}/mo</p>
      </motion.div>

      <motion.div {...fadeUp(0.3)} className="floating-card absolute bottom-28 left-2 z-10 w-[48%]">
        <div className="flex items-center gap-2 text-primary">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-semibold">Loan Pre-Approved</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">HDFC Bank · 8.9% p.a.</p>
        <p className="text-xl font-bold">{formatCurrency(1200000)}</p>
        <p className="text-xs text-muted-foreground">Approved in 4 hours</p>
      </motion.div>

      <motion.div {...fadeUp(0.35)} className="floating-card absolute bottom-4 right-0 z-40 w-[54%]">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold">AI SupportBot</p>
            <p className="flex items-center gap-1 text-xs text-primary">
              <span className="ai-pulse" /> Online now
            </p>
          </div>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          &quot;Found 12 SUVs under ₹15L in Mumbai matching your budget.&quot;
        </p>
        <Button variant="outline" size="sm" className="mt-2 w-full rounded-xl" asChild>
          <Link to="/ai">Ask AI</Link>
        </Button>
      </motion.div>

      <motion.div {...fadeUp(0.45)} className="floating-card absolute bottom-[42%] right-4 z-0 hidden w-[44%] sm:block">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-muted-foreground">Dealer Growth</p>
          <TrendingUp className="h-4 w-4 text-primary" />
        </div>
        <p className="mt-2 text-2xl font-bold">+38%</p>
        <div className="mt-2 flex h-12 items-end gap-1">
          {[40, 65, 45, 80, 55, 95, 70].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-primary/80" style={{ height: `${h}%` }} />
          ))}
        </div>
        <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="h-3 w-3" /> 8.5K dealers active
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.55 }}
        className="absolute right-8 top-[46%] z-50 flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 shadow-[var(--shadow-card)]"
      >
        <Bell className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium">3 new leads</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute left-6 top-[38%] z-10 flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
      >
        <Gavel className="h-3.5 w-3.5" />
        Bank repo · 12 ending today
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="absolute bottom-[62%] left-0 flex items-center gap-1 rounded-lg border border-border bg-card/90 px-2 py-1 text-[10px] text-muted-foreground backdrop-blur-sm"
      >
        <LineChart className="h-3 w-3 text-primary" />
        ₹1200Cr+ loans disbursed
      </motion.div>
    </motion.div>
  );
}
