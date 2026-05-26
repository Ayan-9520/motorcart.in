import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchModerationQueue,
  moderatePost,
  resolveFlag,
} from "../services/community.service";
import type { CommunityPost, ModerationFlag, ModerationStatus } from "../types";
import toast from "react-hot-toast";

export function CommunityModerationPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [flags, setFlags] = useState<ModerationFlag[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const q = await fetchModerationQueue();
      setPosts(q.posts);
      setFlags(q.flags);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const setStatus = async (id: string, status: ModerationStatus) => {
    await moderatePost(id, status, false);
    toast.success("Updated");
    void load();
  };

  const dismissFlag = async (id: string) => {
    await resolveFlag(id, "dismissed");
    void load();
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Community moderation</h1>
      </div>
      <p className="text-sm text-muted-foreground">AI-assisted queue, user reports, approve / hide / reject.</p>
      <Button variant="outline" size="sm" className="mt-4" asChild>
        <Link to="/community">Open feed</Link>
      </Button>
      {loading ? (
        <Skeleton className="mt-8 h-48" />
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold">Posts in review</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {posts.map((p) => (
                  <li key={p.id} className="rounded-md border p-3">
                    <p className="line-clamp-2">{p.body || "(embed / poll)"}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      spam {p.spamScore.toFixed(2)} · {p.moderationStatus}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Button size="sm" onClick={() => void setStatus(p.id, "approved")}>
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => void setStatus(p.id, "hidden")}>
                        Hide
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => void setStatus(p.id, "rejected")}>
                        Reject
                      </Button>
                      <Button size="sm" variant="secondary" asChild>
                        <Link to={`/community/post/${p.id}`}>Open</Link>
                      </Button>
                    </div>
                  </li>
                ))}
                {posts.length === 0 && <li className="text-muted-foreground">Queue empty.</li>}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold">User flags</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {flags.map((f) => (
                  <li key={f.id} className="rounded-md border p-3">
                    <Badge variant="outline">Post {f.postId.slice(0, 8)}…</Badge>
                    <p className="mt-2">{f.reason}</p>
                    {f.aiSpamScore != null && <p className="text-xs text-muted-foreground">AI score: {f.aiSpamScore.toFixed(2)}</p>}
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => void dismissFlag(f.id)}>
                        Dismiss
                      </Button>
                      <Button size="sm" onClick={() => void resolveFlag(f.id, "action_taken").then(() => load())}>
                        Action taken
                      </Button>
                    </div>
                  </li>
                ))}
                {flags.length === 0 && <li className="text-muted-foreground">No open flags.</li>}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
