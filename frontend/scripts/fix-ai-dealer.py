d = "div"
m = "motion.div"

AI = f"""import {{ Link }} from "react-router-dom";
import {{ motion }} from "framer-motion";
import {{ Brain, LineChart, Gavel, Bot, Share2, Headphones }} from "lucide-react";
import {{ aiAgents }} from "@/data/mock";
import {{ Button }} from "@/components/ui/button";
import {{ SectionHeader }} from "./SectionHeader";

const agentIcons = [Brain, LineChart, Gavel, Bot, Share2, Headphones];

export function AIFeaturesSection() {{
  return (
    <section className="home-section-alt relative overflow-hidden">
      <{d} className="container relative mx-auto space-y-10 px-4">
        <SectionHeader
          eyebrow="AI automation"
          title="6 AI Agents Powering Motorcart"
          description="From lead qualification to 24/7 support — intelligent automation at every touchpoint."
          href="/ai"
          linkLabel="Explore AI"
        />
        <{d} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {{aiAgents.slice(0, 6).map((agent, index) => {{
            const Icon = agentIcons[index % agentIcons.length];
            return (
              <{m}
                key={{agent.name}}
                initial={{{{ opacity: 0, y: 16 }}}}
                whileInView={{{{ opacity: 1, y: 0 }}}}
                viewport={{{{ once: true }}}}
                transition={{{{ delay: index * 0.06 }}}}
                whileHover={{{{ y: -4 }}}}
                className="home-ai-card"
              >
                <{d} className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </{d}>
                <h3 className="text-lg font-semibold text-foreground">{{agent.name}}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{{agent.desc}}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                  <span className="ai-pulse" /> Active
                </span>
              </{m}>
            );
          }})}}
        </{d}>
        <{d} className="text-center">
          <Button size="lg" className="rounded-xl px-8" asChild>
            <Link to="/ai">See AI in Action</Link>
          </Button>
        </{d}>
      </{d}>
    </section>
  );
}}
"""

DEALER = f"""import {{ Link }} from "react-router-dom";
import {{ motion }} from "framer-motion";
import {{ ArrowRight, BarChart3, Shield, Store, Users }} from "lucide-react";
import {{ Button }} from "@/components/ui/button";
import {{ Badge }} from "@/components/ui/badge";

const perks = [
  {{ icon: Store, label: "List unlimited inventory" }},
  {{ icon: BarChart3, label: "Dealer CRM & analytics" }},
  {{ icon: Shield, label: "Verified buyer leads" }},
  {{ icon: Users, label: "8,500+ dealer network" }},
];

export function DealerCTA() {{
  return (
    <section className="home-section">
      <{d} className="container mx-auto px-4">
        <{m}
          className="home-cta-panel"
          initial={{{{ opacity: 0, y: 24 }}}}
          whileInView={{{{ opacity: 1, y: 0 }}}}
          viewport={{{{ once: true }}}}
        >
          <{d} className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <{d} className="relative grid items-center gap-10 lg:grid-cols-2">
            <{d} className="space-y-5">
              <Badge className="border-primary/30 bg-primary/10 text-primary">Partner program</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Become a Verified Dealer on Motorcart.in
              </h2>
              <p className="max-w-lg text-muted-foreground">
                Join India&apos;s fastest-growing automotive marketplace with AI leads and enterprise tools.
              </p>
              <{d} className="flex flex-wrap gap-3">
                <Button size="lg" className="rounded-xl" asChild>
                  <Link to="/dashboard/dealer">
                    Apply as Dealer
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl bg-card" asChild>
                  <Link to="/dealers">Learn more</Link>
                </Button>
              </{d}>
            </{d}>
            <{d} className="grid grid-cols-2 gap-3">
              {{perks.map((perk, index) => {{
                const Icon = perk.icon;
                return (
                  <{m}
                    key={{perk.label}}
                    initial={{{{ opacity: 0, x: 12 }}}}
                    whileInView={{{{ opacity: 1, x: 0 }}}}
                    viewport={{{{ once: true }}}}
                    transition={{{{ delay: index * 0.08 }}}}
                    className="rounded-xl border border-border bg-muted/50 p-4 dark:bg-muted/30"
                  >
                    <Icon className="mb-2 h-6 w-6 text-primary" />
                    <p className="text-sm font-medium text-foreground">{{perk.label}}</p>
                  </{m}>
                );
              }})}}
            </{d}>
          </{d}>
        </{m}>
      </{d}>
    </section>
  );
}}
"""

open("src/features/home/AIFeaturesSection.tsx", "w", encoding="utf-8").write(AI)
open("src/features/home/DealerCTA.tsx", "w", encoding="utf-8").write(DEALER)
print("written ok")
