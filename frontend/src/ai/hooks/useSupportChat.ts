import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { runAgent } from "../agents";
import type { AIChatMessage } from "../types";
import { useAuth } from "@/hooks/useAuth";

export function useSupportChat() {
  const { user } = useAuth();
  const location = useLocation();
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm Motorcart SupportBot. Ask about vehicles, loans, auctions, parts, or service booking.",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const userMsg: AIChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
        createdAt: new Date().toISOString(),
      };
      setMessages((m) => [...m, userMsg]);
      setLoading(true);

      const result = await runAgent("supportbot", "chat", {
        userId: user?.id,
        payload: { message: trimmed, page: location.pathname },
      });

      const reply: AIChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.ok && result.data && typeof result.data === "object" && "reply" in result.data
          ? String((result.data as { reply: string }).reply)
          : "Sorry, I couldn't process that. Try again or contact support on WhatsApp.",
        createdAt: new Date().toISOString(),
      };
      setMessages((m) => [...m, reply]);
      setLoading(false);
    },
    [location.pathname, user?.id]
  );

  return { messages, loading, send };
}
