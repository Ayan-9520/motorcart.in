import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useCommunityFeed } from "../hooks/useCommunityFeed";
import { followUser, isFollowing, unfollowUser } from "../services/community.service";
import { PostCard } from "../components/PostCard";
import toast from "react-hot-toast";

export function CommunityInfluencerPage() {
  const { userId } = useParams<{ userId: string }>();
  const { user, isAuthenticated } = useAuth();
  const feed = useCommunityFeed({ authorId: userId });
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (!user?.id || !userId || user.id === userId) return;
    void isFollowing(user.id, userId).then(setFollowing);
  }, [user?.id, userId]);

  if (!userId) return null;

  const toggleFollow = async () => {
    if (!user?.id || user.id === userId) return;
    if (following) {
      await unfollowUser(user.id, userId);
      setFollowing(false);
      toast.success("Unfollowed");
    } else {
      await followUser(user.id, userId);
      setFollowing(true);
      toast.success("Following");
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Link to="/community" className="text-sm text-primary hover:underline">
        ← Feed
      </Link>
      <header className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Creator profile</h1>
          <p className="text-sm text-muted-foreground">User ID · {userId}</p>
        </div>
        {isAuthenticated && user && user.id !== userId && (
          <Button variant={following ? "outline" : "default"} onClick={() => void toggleFollow()}>
            {following ? "Unfollow" : "Follow"}
          </Button>
        )}
      </header>
      {feed.loading ? (
        <Skeleton className="mt-8 h-40" />
      ) : (
        <div className="mt-8 space-y-4">
          {feed.posts.length === 0 && <p className="text-muted-foreground">No public posts yet.</p>}
          {feed.posts.map((p) => (
            <PostCard key={p.id} post={p} onLike={() => void feed.like(p)} />
          ))}
        </div>
      )}
    </div>
  );
}
