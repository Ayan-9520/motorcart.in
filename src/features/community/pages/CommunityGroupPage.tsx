import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { fetchCommunityGroupBySlug } from "../services/community.service";
import { useCommunityFeed } from "../hooks/useCommunityFeed";
import { PostComposer } from "../components/PostComposer";
import { PostCard } from "../components/PostCard";
import type { CommunityGroup } from "../types";
import toast from "react-hot-toast";

export function CommunityGroupPage() {
  const { slug } = useParams<{ slug: string }>();
  const [group, setGroup] = useState<CommunityGroup | null>(null);
  const feed = useCommunityFeed({ groupSlug: slug });

  useEffect(() => {
    if (!slug) return;
    void fetchCommunityGroupBySlug(slug).then(setGroup);
  }, [slug]);

  if (!slug) return null;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Link to="/community/groups" className="text-sm text-primary hover:underline">
        ← All groups
      </Link>
      {!group ? (
        <Skeleton className="mt-4 h-24 w-full" />
      ) : (
        <header className="mt-4">
          <h1 className="text-2xl font-bold">{group.name}</h1>
          <p className="text-muted-foreground">{group.description}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Auto group · {group.groupType}
            {group.ruleValue ? ` · ${group.ruleValue}` : ""}
          </p>
        </header>
      )}
      <div className="mt-8 space-y-6">
        <PostComposer
          onSubmit={async (body, opts) => {
            await feed.createPost(body, opts);
            toast.success("Posted to group");
          }}
        />
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
    </div>
  );
}
