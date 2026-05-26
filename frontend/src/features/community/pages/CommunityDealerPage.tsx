import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Store } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCommunityFeed } from "../hooks/useCommunityFeed";
import { fetchDealerIdBySlug } from "../services/community.service";
import { PostComposer } from "../components/PostComposer";
import { PostCard } from "../components/PostCard";
import toast from "react-hot-toast";

export function CommunityDealerPage() {
  const { slug } = useParams<{ slug: string }>();
  const [dealerId, setDealerId] = useState<string | null>(null);
  const feed = useCommunityFeed({ dealerId: dealerId ?? undefined });

  useEffect(() => {
    if (!slug) return;
    void fetchDealerIdBySlug(slug).then(setDealerId);
  }, [slug]);

  if (!slug) return null;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Store className="h-4 w-4" />
        <span>Dealer community</span>
        <span>·</span>
        <Link to="/community" className="text-primary hover:underline">
          Global feed
        </Link>
      </div>
      <h1 className="mt-4 text-2xl font-bold">/{slug}</h1>
      <p className="text-muted-foreground">Inventory stories, launches & customer wins — scoped to this showroom.</p>
      {!dealerId ? (
        <Skeleton className="mt-8 h-40" />
      ) : (
        <div className="mt-8 space-y-6">
          <PostComposer
            onSubmit={async (body, opts) => {
              await feed.createPost(body, { ...opts, dealerId });
              toast.success("Posted to dealer community");
            }}
          />
          <p className="text-xs text-muted-foreground">Tip: link your Supabase dealer slug so posts attach to this hub.</p>
          {feed.loading ? (
            <Skeleton className="h-40" />
          ) : (
            <div className="space-y-4">
              {feed.posts.map((p) => (
                <PostCard key={p.id} post={p} onLike={() => void feed.like(p)} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
