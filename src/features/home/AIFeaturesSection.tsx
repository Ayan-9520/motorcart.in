import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bot,
  Brain,
  Gavel,
  Headphones,
  LineChart,
  Share2,
} from "lucide-react";
import { aiAgents } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";

const agentIcons = [Brain, LineChart, Gavel, Bot, Share2, Headphones];

export function AIFeaturesSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-[#0f172a] text-white">
      <motion.div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#f8fafc 1px, transparent 1px), linear-gradient(90deg, #f8fafc 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <motion.div className="container relative mx-auto space-y-12 px-4">
        <SectionHeader
          eyebrow="AI automation"
          title="6 AI Agents Powering Motorcart"
          description="From lead qualification to 24/7 support — intelligent automation at every touchpoint."
          href="/ai-automation"
          linkLabel="Explore AI"
          className="[&_h2]:text-white [&_p]:text-slate-300"
        />
        <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiAgents.map((agent, index) => {
            const Icon = agentIcons[index % agentIcons.length];
            return (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-[#16a34a]/50"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#16a34a] to-emerald-600">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{agent.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{agent.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Button variant="gradient" size="lg" asChild>
            <Link to="/ai-automation">See AI in Action</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
