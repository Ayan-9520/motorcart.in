import { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { suggestPostLines } from "../lib/ai-suggestions";
import { scoreSpamContent, shouldQueueForReview } from "../lib/spam-detection";

interface PostComposerProps {
  onSubmit: (body: string, opts?: { embedUrl?: string | null; pollOptions?: string[] | null }) => Promise<void>;
  disabled?: boolean;
}

export function PostComposer({ onSubmit, disabled }: PostComposerProps) {
  const [body, setBody] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [pollLines, setPollLines] = useState("");
  const [busy, setBusy] = useState(false);
  const spam = scoreSpamContent(body + embedUrl + pollLines);
  const suggestions = suggestPostLines(body);

  const submit = async () => {
    if (!body.trim() && !pollLines.trim() && !embedUrl.trim()) return;
    setBusy(true);
    try {
      const pollOpts = pollLines
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      await onSubmit(body, {
        embedUrl: embedUrl.trim() || null,
        pollOptions: pollOpts.length >= 2 ? pollOpts : null,
      });
      setBody("");
      setEmbedUrl("");
      setPollLines("");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Create post
        </div>
        <textarea
          className="min-h-[100px] w-full rounded-md border border-input bg-background p-3 text-sm"
          placeholder="Share a story, tip, or question… Use #hashtags to reach the right crowd."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={disabled || busy}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label className="text-xs">YouTube / LinkedIn / reel URL (optional)</Label>
            <Input value={embedUrl} onChange={(e) => setEmbedUrl(e.target.value)} placeholder="https://…" className="mt-1" disabled={disabled || busy} />
          </div>
          <div>
            <Label className="text-xs">Poll options (one per line, min 2)</Label>
            <textarea
              className="mt-1 min-h-[72px] w-full rounded-md border border-input bg-background p-2 text-sm"
              value={pollLines}
              onChange={(e) => setPollLines(e.target.value)}
              disabled={disabled || busy}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            AI spam score: <strong className={spam >= 0.45 ? "text-destructive" : "text-primary"}>{spam.toFixed(2)}</strong>
            {shouldQueueForReview(spam) ? " · may enter moderation queue" : ""}
          </span>
          <Button size="sm" disabled={disabled || busy} onClick={() => void submit()}>
            <Send className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
        {suggestions.length > 0 && (
          <div className="rounded-lg border border-dashed bg-background p-3">
            <p className="mb-2 text-xs font-medium text-muted-foreground">AI content ideas</p>
            <ul className="space-y-1 text-xs">
              {suggestions.map((s) => (
                <li key={s}>
                  <button type="button" className="text-left text-primary hover:underline" onClick={() => setBody((b) => (b ? `${b}\n\n` : "") + s)}>
                    + {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
