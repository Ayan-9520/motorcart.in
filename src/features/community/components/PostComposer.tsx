import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ImagePlus, Lock, Sparkles, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { suggestPostLines } from "../lib/ai-suggestions";
import { scoreSpamContent, shouldQueueForReview } from "../lib/spam-detection";
import { uploadCommunityPostMedia } from "../services/community-media.service";
import { SocialAvatar } from "./SocialAvatar";
import toast from "react-hot-toast";

interface PostComposerProps {
  onSubmit: (
    body: string,
    opts?: { embedUrl?: string | null; pollOptions?: string[] | null; mediaUrls?: string[] }
  ) => Promise<void>;
  disabled?: boolean;
}

export function PostComposer({ onSubmit, disabled }: PostComposerProps) {
  const { user, isAuthenticated } = useAuth();
  const [body, setBody] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [pollLines, setPollLines] = useState("");
  const [busy, setBusy] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const spam = scoreSpamContent(body + embedUrl + pollLines);
  const suggestions = suggestPostLines(body);

  if (!isAuthenticated || !user) {
    return (
      <Card className="community-composer-gate mb-4 overflow-hidden rounded-2xl border-primary/20">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">Sign in to post</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Motorcart Community is open to read. Creating posts, likes, and comments requires your account.
            </p>
          </div>
          <Button className="shrink-0 rounded-xl font-semibold" asChild>
            <Link to="/login?redirect=/community">Sign in</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const onPickImages = (files: FileList | null) => {
    if (!files?.length) return;
    const next = [...mediaFiles, ...Array.from(files)].slice(0, 4);
    setMediaFiles(next);
    setPreviews(next.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (index: number) => {
    const nextFiles = mediaFiles.filter((_, i) => i !== index);
    const nextPreviews = previews.filter((_, i) => i !== index);
    setMediaFiles(nextFiles);
    setPreviews(nextPreviews);
  };

  const submit = async () => {
    if (!body.trim() && !pollLines.trim() && !embedUrl.trim() && !mediaFiles.length) {
      toast.error("Add text, photo, poll, or link");
      return;
    }
    if (!user?.id) {
      toast.error("Sign in to post");
      return;
    }
    setBusy(true);
    try {
      let mediaUrls: string[] = [];
      if (mediaFiles.length) {
        try {
          mediaUrls = await uploadCommunityPostMedia(user.id, mediaFiles);
        } catch {
          toast.error("Photo upload failed — post text only or try again");
        }
      }
      const pollOpts = pollLines
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      await onSubmit(body, {
        embedUrl: embedUrl.trim() || null,
        pollOptions: pollOpts.length >= 2 ? pollOpts : null,
        mediaUrls,
      });
      setBody("");
      setEmbedUrl("");
      setPollLines("");
      setMediaFiles([]);
      setPreviews([]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="community-premium-panel community-composer mb-4 overflow-hidden border-primary/15">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-start gap-3">
          <SocialAvatar userId={user.id} name={user.fullName} src={user.avatarUrl} size="md" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-foreground">{user.fullName}</p>
            <p className="text-xs text-muted-foreground">
              Posting as{" "}
              <Link to={`/community/u/${user.id}`} className="font-medium text-primary hover:underline">
                your community profile
              </Link>
            </p>
          </div>
        </div>

        <textarea
          className="min-h-[100px] w-full rounded-xl border border-input bg-background p-3 text-sm"
          placeholder="What's on your mind? #hashtags · photos · polls…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={disabled || busy}
        />

        {previews.length > 0 && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {previews.map((src, i) => (
              <div key={src} className="relative aspect-square overflow-hidden rounded-lg border">
                <img src={src} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  className="absolute right-1 top-1 rounded-full bg-background/90 p-1 shadow"
                  onClick={() => removeImage(i)}
                  aria-label="Remove"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={(e) => onPickImages(e.target.files)}
        />

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            disabled={disabled || busy || mediaFiles.length >= 4}
            onClick={() => fileRef.current?.click()}
          >
            <ImagePlus className="mr-1.5 h-4 w-4" />
            Photo
          </Button>
        </div>

        <details className="rounded-lg border border-dashed border-border/80 bg-muted/20 px-3 py-2">
          <summary className="cursor-pointer text-xs font-medium text-muted-foreground">
            Poll · video link (optional)
          </summary>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <Label className="text-xs">YouTube / LinkedIn / reel URL</Label>
              <Input
                value={embedUrl}
                onChange={(e) => setEmbedUrl(e.target.value)}
                placeholder="https://…"
                className="mt-1"
                disabled={disabled || busy}
              />
            </div>
            <div>
              <Label className="text-xs">Poll options (one per line)</Label>
              <textarea
                className="mt-1 min-h-[72px] w-full rounded-md border border-input bg-background p-2 text-sm"
                value={pollLines}
                onChange={(e) => setPollLines(e.target.value)}
                disabled={disabled || busy}
              />
            </div>
          </div>
        </details>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            AI spam score:{" "}
            <strong className={spam >= 0.45 ? "text-destructive" : "text-primary"}>
              {spam.toFixed(2)}
            </strong>
            {shouldQueueForReview(spam) ? " · moderation queue" : ""}
          </span>
          <Button size="sm" className="rounded-full px-5" disabled={disabled || busy} onClick={() => void submit()}>
            <Send className="mr-2 h-4 w-4" />
            Post
          </Button>
        </div>

        {suggestions.length > 0 && (
          <div className="rounded-lg border border-dashed bg-background p-3">
            <p className="mb-2 flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3 text-amber-500" />
              AI ideas
            </p>
            <ul className="space-y-1 text-xs">
              {suggestions.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    className="text-left text-primary hover:underline"
                    onClick={() => setBody((b) => (b ? `${b}\n\n` : "") + s)}
                  >
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
