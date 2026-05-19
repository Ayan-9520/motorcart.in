import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  LineChart,
  Gavel,
  Bot,
  Share2,
  Headphones,
  Package,
  BarChart3,
  Bell,
} from "lucide-react";
import { aiAgents } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";

const agentIcons = [
  Brain,
  LineChart,
  Gavel,
  Bot,
  Share2,
  Headphones,
  Package,
  BarChart3,
  Bell,
];

export function AIFeaturesSection() {
  const agents = aiAgents.slice(0, 9);

  return (
    <section className="home-section-alt relative overflow-hidden">
      <motion.div className="container relative mx-auto space-y-10 px-4">
        <SectionHeader
          eyebrow="AI automation"
          title="9 AI Agents Powering Motorcart"
          description="From lead qualification to 24/7 support — intelligent automation at every touchpoint."
          href="/ai"
          linkLabel="Explore AI"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent, index) => {
            const Icon = agentIcons[index % agentIcons.length];
            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="home-ai-card"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-primary)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{agent.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{agent.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                  <span className="ai-pulse" /> Active
                </span>
              </motion.div>
            );
          })}
        </div>
        <div className="text-center">
          <Button size="lg" className="rounded-xl px-8" asChild>
            <Link to="/ai">See AI in Action</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
