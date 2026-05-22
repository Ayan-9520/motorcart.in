import { Gift, Share2, Sparkles } from "lucide-react";
import { AnimatedStat } from "./AnimatedStat";

type CustomerRewardsPanelProps = {
  balance: number;
  tier: string;
};

const perks = [
  { title: "Service cashback", desc: "5% back on periodic service via partner garages", pts: "+250" },
  { title: "Insurance renewal", desc: "₹500 off ACKO / Digit renewals", pts: "+500" },
  { title: "Referral bonus", desc: "Invite friends — earn 1,000 pts each", pts: "+1000" },
];

export function CustomerRewardsPanel({ balance, tier }: CustomerRewardsPanelProps) {
  return (
    <div className="space-y-6">
      <div className="cos-rewards-hero">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80">{tier} member</p>
          <p className="mt-1 text-4xl font-bold text-white tabular-nums">
            <AnimatedStat value={balance} />
          </p>
          <p className="text-sm text-white/80">Motorcart reward points</p>
        </div>
        <Sparkles className="h-12 w-12 text-white/30" />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {perks.map((p) => (
          <article key={p.title} className="cos-reward-card">
            <Gift className="h-5 w-5 text-primary" />
            <h3 className="font-medium">{p.title}</h3>
            <p className="text-xs text-muted-foreground">{p.desc}</p>
            <span className="cos-reward-card__pts">{p.pts}</span>
          </article>
        ))}
      </div>
      <div className="cos-referral">
        <Share2 className="h-5 w-5 text-primary" />
        <div>
          <p className="font-medium">Refer & earn</p>
          <p className="text-sm text-muted-foreground">Share your link — both get premium service credits.</p>
        </div>
        <code className="rounded-lg bg-muted px-2 py-1 text-xs">MOTORCART-AYAN</code>
      </div>
    </div>
  );
}
