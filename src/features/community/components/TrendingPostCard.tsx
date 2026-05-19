import { Link } from "react-router-dom";
import {
  BadgeCheck,
  Heart,
  ImageIcon,
  MessageCircle,
  Share2,
  Star,
} from "lucide-react";
import type { CommunityHubPost } from "../data/community-hub-posts";

const TAG_STYLES = {
  purchase:
    "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-800",
  review:
    "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-800",
  promotion:
    "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-200 dark:border-orange-800",
} as const;

interface TrendingPostCardProps {
  post: CommunityHubPost;
}

export function TrendingPostCard({ post }: TrendingPostCardProps) {
  const TagIcon = post.tag.icon;
  const tagClass = TAG_STYLES[post.tag.variant];

  return (
    <article className="community-hub-post">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="community-hub-avatar" aria-hidden>
            {post.authorName.charAt(0)}
          </span>
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
        <span className={`community-hub-tag ${tagClass}`}>
          <TagIcon className="h-3 w-3 shrink-0" />
          {post.tag.label}
        </span>
      </div>

      <p className="community-hub-body">{post.body}</p>

      {post.imageUrl ? (
        <Link to="/community" className="community-hub-media block overflow-hidden">
          <img src={post.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
        </Link>
      ) : (
        <div className="community-hub-media community-hub-media-placeholder">
          <ImageIcon className="h-10 w-10 text-muted-foreground/40" strokeWidth={1.25} />
        </div>
      )}

      <div className="community-hub-post-footer">
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Heart className="h-4 w-4" />
            {post.likes}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4" />
            {post.comments}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Share2 className="h-4 w-4" />
            {post.shares}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          {post.rating.toFixed(1)}
        </span>
      </div>
    </article>
  );
}
