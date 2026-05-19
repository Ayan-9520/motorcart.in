import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, Flag, Car, Linkedin, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "../lib/time";
import type { CommunityPost } from "../types";
import { youtubeEmbedSrc, buildShareUrl } from "../lib/embed-utils";

function HashtagBody({ text }: { text: string }) {
  const parts = text.split(/(#\w+)/g);
  return (
    <p className="whitespace-pre-wrap text-sm leading-relaxed">
      {parts.map((part, i) => {
        if (part.startsWith("#")) {
          const tag = part.slice(1).toLowerCase();
          return (
            <Link key={i} to={`/community?tag=${encodeURIComponent(tag)}`} className="font-medium text-primary hover:underline">
              {part}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

interface PostCardProps {
  post: CommunityPost;
  onLike?: () => void;
  onFlag?: () => void;
  compact?: boolean;
}

export function PostCard({ post, onLike, onFlag, compact }: PostCardProps) {
  const yt = post.embedProvider === "youtube" && post.embedUrl ? youtubeEmbedSrc(post.embedUrl) : null;

  const shareNative = async () => {
    const url = buildShareUrl(post.id);
    try {
      if (navigator.share) await navigator.share({ title: "Motorcart community", text: post.body.slice(0, 80), url });
      else await navigator.clipboard.writeText(url);
    } catch {
      /* ignore */
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Link to={`/community/u/${post.authorId}`} className="font-medium text-foreground hover:underline">
            {post.authorName ?? "Member"}
          </Link>
          <span>·</span>
          <span>{formatRelativeTime(post.createdAt)}</span>
          {post.groupSlug && (
            <>
              <span>·</span>
              <Link to={`/community/groups/${post.groupSlug}`} className="text-primary hover:underline">
                #{post.groupSlug}
              </Link>
            </>
          )}
          {post.postKind === "review" && <Badge variant="secondary">Review</Badge>}
          {post.postKind === "poll" && <Badge variant="secondary">Poll</Badge>}
          {post.postKind === "embed" && <Badge variant="outline">{post.embedProvider}</Badge>}
          {post.needsReview && <Badge variant="destructive">Review queue</Badge>}
        </div>
        {post.body ? <HashtagBody text={post.body} /> : null}
        {post.mediaUrls?.[0] && (
          <img src={post.mediaUrls[0]} alt="" className={`mt-3 w-full rounded-lg object-cover ${compact ? "max-h-48" : "max-h-72"}`} />
        )}
        {yt && (
          <div className="mt-3 aspect-video w-full overflow-hidden rounded-lg border bg-black">
            <iframe title="YouTube" className="h-full w-full" src={yt} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" />
          </div>
        )}
        {post.embedProvider === "linkedin" && post.embedUrl && (
          <a
            href={post.embedUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center gap-2 rounded-lg border bg-muted/40 p-3 text-sm hover:bg-muted/60"
          >
            <Linkedin className="h-5 w-5 text-primary" />
            Open LinkedIn article
          </a>
        )}
        {post.embedProvider === "reel" && post.embedUrl && (
          <a
            href={post.embedUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center gap-2 rounded-lg border bg-muted/40 p-3 text-sm hover:bg-muted/60"
          >
            <Film className="h-5 w-5 text-pink-600" />
            Watch reel
          </a>
        )}
        {post.vehicleId && (
          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <Car className="h-3.5 w-3.5" />
            Vehicle discussion thread
          </div>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-3">
          <Button variant={post.likedByMe ? "default" : "outline"} size="sm" className="gap-1" onClick={onLike}>
            <Heart className={`h-4 w-4 ${post.likedByMe ? "fill-current" : ""}`} />
            {post.likeCount}
          </Button>
          <Button variant="outline" size="sm" className="gap-1" asChild>
            <Link to={`/community/post/${post.id}`}>
              <MessageCircle className="h-4 w-4" />
              {post.commentCount}
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="gap-1" onClick={() => void shareNative()}>
            <Share2 className="h-4 w-4" />
            {post.shareCount}
          </Button>
          {onFlag && (
            <Button variant="ghost" size="sm" className="ml-auto text-muted-foreground" onClick={onFlag}>
              <Flag className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
