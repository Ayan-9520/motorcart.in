import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { setPageMeta } from "@/utils/seo";
import { PostCard } from "../components/PostCard";
import { useCommunityPostDetail } from "../hooks/useCommunityPostDetail";
import { togglePostLike } from "../services/community.service";

export function CommunityPostPage() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const { post, comments, pollChoice, loading, reload, comment, vote, share } = useCommunityPostDetail(id);
  const [draft, setDraft] = useState("");
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (post) setLiked(Boolean(post.likedByMe));
  }, [post?.id, post?.likedByMe]);

  useEffect(() => {
    if (post?.body) setPageMeta({ title: `Post — ${post.body.slice(0, 42)}…`, description: "Discussion on Motorcart community." });
  }, [post?.body]);

  if (!id) return null;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-4" asChild>
        <Link to="/community">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Feed
        </Link>
      </Button>
      {loading || !post ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <>
          <PostCard
            post={{ ...post, likedByMe: liked }}
            onLike={async () => {
              if (!user?.id) return;
              await togglePostLike(post.id, user.id, liked);
              setLiked(!liked);
              await reload();
            }}
          />
          {post.postKind === "poll" && post.pollOptions && (
            <Card className="mt-4">
              <CardContent className="space-y-3 p-4">
                <p className="font-medium">Poll</p>
                {post.pollEndsAt && <p className="text-xs text-muted-foreground">Ends {new Date(post.pollEndsAt).toLocaleString()}</p>}
                <div className="space-y-2">
                  {post.pollOptions.map((opt, i) => (
                    <Button
                      key={opt}
                      variant={pollChoice === i ? "default" : "outline"}
                      className="w-full justify-start"
                      disabled={!isAuthenticated}
                      onClick={() => void vote(i)}
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          <div className="mt-6 flex gap-2">
            <Button variant="outline" size="sm" onClick={() => void share()}>
              Record share + copy link
            </Button>
          </div>
          <h2 className="mt-8 text-lg font-semibold">Comments</h2>
          <ul className="mt-3 space-y-3">
            {comments.map((c) => (
              <li key={c.id} className="rounded-lg border bg-card/50 p-3 text-sm">
                <span className="font-medium">{c.authorName ?? "Member"}</span>
                <p className="mt-1 whitespace-pre-wrap">{c.body}</p>
                {c.spamScore >= 0.5 && <p className="mt-1 text-xs text-amber-600">AI spam score: {c.spamScore.toFixed(2)}</p>}
              </li>
            ))}
          </ul>
          {isAuthenticated ? (
            <div className="mt-4 flex gap-2">
              <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write a comment…" />
              <Button onClick={() => void comment(draft).then(() => setDraft(""))}>Send</Button>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              <Link to="/login" className="text-primary">
                Sign in
              </Link>{" "}
              to comment.
            </p>
          )}
        </>
      )}
    </div>
  );
}
