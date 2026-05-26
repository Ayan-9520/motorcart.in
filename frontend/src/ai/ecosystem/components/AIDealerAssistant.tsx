import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { runAgent } from "@/ai/agents";
import { AIPanel } from "./AIPanel";

const PROMPTS = [
  "Draft follow-up for test drive",
  "Price objection reply",
  "WhatsApp intro for new lead",
];

interface AIDealerAssistantProps {
  leadName?: string;
  vehicleInterest?: string | null;
}

export function AIDealerAssistant({ leadName, vehicleInterest }: AIDealerAssistantProps) {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const ask = async (text: string) => {
    if (!text.trim()) return;
    setLoading(true);
    const res = await runAgent("supportbot", "chat", {
      payload: {
        message: `Dealer assistant: ${text}. Lead: ${leadName ?? "customer"}. Interest: ${vehicleInterest ?? "vehicle"}.`,
        page: "dealer",
      },
    });
    setReply(res.ok && res.data ? String((res.data as { reply: string }).reply) : "Try rephrasing your question.");
    setLoading(false);
  };

  return (
    <AIPanel title="Dealer assistant" subtitle="Draft replies & next steps" compact>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {PROMPTS.map((p) => (
          <button
            key={p}
            type="button"
            className="ai-eco-chip"
            onClick={() => {
              setInput(p);
              void ask(p);
            }}
          >
            {p}
          </button>
        ))}
      </div>
      {reply && <p className="ai-eco-reply text-sm">{reply}</p>}
      <div className="flex gap-2 mt-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask DealerBot…"
          className="h-9 text-sm"
          onKeyDown={(e) => e.key === "Enter" && void ask(input)}
        />
        <Button size="icon" className="h-9 w-9 shrink-0" disabled={loading} onClick={() => void ask(input)}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </AIPanel>
  );
}
