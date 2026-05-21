import { Link } from "react-router-dom";
import {
  BadgeCheck,
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CommunityHubPost } from "../data/community-hub-posts";

const TAG_STYLES = {
  purchase:
    "community-premium-tag community-premium-tag-purchase",
  review: "community-premium-tag community-premium-tag-review",
  promotion: "community-premium-tag community-premium-tag-promo",
} as const;

interface TrendingPostCardProps {
  post: CommunityHubPost;
}

export function TrendingPostCard({ post }: TrendingPostCardProps) {
  const TagIcon = post.tag.icon;
  const tagClass = TAG_STYLES[post.tag.variant];

  return (
    <article className="community-premium-post">
      <div className="community-premium-post-header">
        <div className="flex min-w-0 items-start gap-3">
          <div className="community-premium-post-avatar-ring">
            <span className="community-premium-post-avatar" aria-hidden>
              {post.authorName.charAt(0)}
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-foreground">{post.authorName}</span>
              {post.verified && (
                <BadgeCheck className="h-4 w-4 shrink-0 text-primary" aria-label="Verified" />
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {post.handle} · {post.role} · {post.timeAgo}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-start gap-2">
          <span className={tagClass}>
            <TagIcon className="h-3 w-3 shrink-0" />
            {post.tag.label}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" aria-label="More">
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      <p className="community-premium-post-body">{post.body}</p>

      {post.imageUrl ? (
        <Link to="/community" className="community-premium-post-media group">
          <img src={post.imageUrl} alt="" className="community-premium-post-media-img" loading="lazy" />
          <span className="community-premium-post-media-shade" aria-hidden />
        </Link>
      ) : null}

      <div className="community-premium-post-actions">
        <div className="community-premium-post-stats">
          <button type="button" className="community-premium-action community-premium-action-like">
            <Heart className="h-4 w-4" />
            <span>{post.likes}</span>
          </button>
          <button type="button" className="community-premium-action">
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments}</span>
          </button>
          <button type="button" className="community-premium-action">
            <Share2 className="h-4 w-4" />
            <span>{post.shares}</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="community-premium-rating">
            <Star className="h-4 w-4" />
            {post.rating.toFixed(1)}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" aria-label="Save">
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </article>
  );
}
