import { useState } from "react";
import { MessageCircle, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SupportChatWidget } from "@/ai/components/SupportChatWidget";

export function FloatingButtons() {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <>
      <a
        href="https://wa.me/911800123456"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 md:bottom-8"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <Button
        size="icon"
        variant="default"
        className="fixed bottom-40 right-4 z-50 h-12 w-12 rounded-full shadow-lg md:bottom-24"
        onClick={() => setAiOpen(!aiOpen)}
        aria-label="AI Assistant"
      >
        <Bot className="h-5 w-5" />
      </Button>
      <SupportChatWidget open={aiOpen} onOpenChange={setAiOpen} />
    </>
  );
}
