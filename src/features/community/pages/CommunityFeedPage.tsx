import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Hash, Users, TrendingUp, Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { setPageMeta } from "@/utils/seo";
import { cn } from "@/lib/utils";
import { useCommunityFeed } from "../hooks/useCommunityFeed";
import { PostCard } from "../components/PostCard";
import { PostComposer } from "../components/PostComposer";
import { CommunityHubHeader } from "../components/CommunityHubHeader";
import { TrendingPostCard } from "../components/TrendingPostCard";
import { CommunityAutoHubCta } from "../components/CommunityAutoHubCta";
import { CommunityHubFooter } from "../components/CommunityHubFooter";
import { COMMUNITY_HUB_POSTS } from "../data/community-hub-posts";
import { flagPost, fetchCommunityNotifications, markNotificationRead } from "../services/community.service";
import toast from "react-hot-toast";

type Tab = "trending" | "for_you" | "vehicles";

const TABS: { id: Tab; label: string; icon?: typeof TrendingUp }[] = [
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "for_you", label: "For you" },
  { id: "vehicles", label: "Vehicle talk" },
];

export function CommunityFeedPage() {
  const { user, isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab: Tab =
    tabParam === "for_you" || tabParam === "vehicles" ? tabParam : "trending";
  const [tab, setTab] = useState<Tab>(initialTab);
  const feed = useCommunityFeed({ vehicleOnly: tab === "vehicles" });
  const [notifs, setNotifs] = useState<Awaited<ReturnType<typeof fetchCommunityNotifications>>>([]);

  useEffect(() => {
    setPageMeta({
      title: "Community — What's Trending | Motorcart.in",
      description:
        "Join the AutoHub community — trending posts, reviews, dealer promotions, and automotive conversations across India.",
    });
  }, []);

  useEffect(() => {
    if (user?.id) void fetchCommunityNotifications(user.id).then(setNotifs);
  }, [user?.id]);

  useEffect(() => {
    const next = searchParams.get("tab");
    if (next === "for_you" || next === "vehicles" || next === "trending") {
      setTab(next);
    }
  }, [searchParams]);

  const setTabAndUrl = (next: Tab) => {
    setTab(next);
    setSearchParams(next === "trending" ? {} : { tab: next }, { replace: true });
  };

  const displayPosts = useMemo(() => {
    if (tab === "trending") {
      return [...feed.posts].sort(
        (a, b) => b.likeCount + b.commentCount * 2 - (a.likeCount + a.commentCount * 2)
      );
    }
    return feed.posts;
  }, [feed.posts, tab]);

  const flag = async (postId: string) => {
    if (!user?.id) return toast.error("Sign in to report");
    const reason = window.prompt("Reason for report (helps moderation AI):") ?? "";
    if (!reason.trim()) return;
    await flagPost({ postId, reporterId: user.id, reason, aiSpamScore: undefined });
    toast.success("Report submitted");
  };

  const isHubView = tab === "trending";

  return (
    <div className="community-hub-page min-h-screen">
      <CommunityHubHeader />

      <nav className="community-hub-tabs" aria-label="Community views">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTabAndUrl(id)}
            className={cn("community-hub-tab", tab === id && "community-hub-tab-active")}
          >
            {Icon && <Icon className="mr-1 inline h-3.5 w-3.5" />}
            {label}
          </button>
        ))}
        <Button variant="outline" size="sm" className="ml-1 rounded-full" asChild>
          <Link to="/community/groups">
            <Users className="mr-1 h-3.5 w-3.5" />
            Groups
          </Link>
        </Button>
        {user?.role === "admin" && (
          <Button variant="outline" size="sm" className="rounded-full" asChild>
            <Link to="/dashboard/admin/community">
              <Shield className="mr-1 h-3.5 w-3.5" />
              Moderation
            </Link>
          </Button>
        )}
      </nav>

      {isHubView ? (
        <>
          <div className="community-hub-feed">
            {COMMUNITY_HUB_POSTS.map((post) => (
              <TrendingPostCard key={post.id} post={post} />
            ))}
            {displayPosts.length > 0 &&
              displayPosts.slice(0, 2).map((p) => (
                <PostCard key={p.id} post={p} onLike={() => void feed.like(p)} onFlag={() => void flag(p.id)} />
              ))}
          </div>
          <div className="mx-auto max-w-3xl px-4 pb-10">
            <CommunityAutoHubCta />
          </div>
          <CommunityHubFooter />
        </>
      ) : (
        <div className="container mx-auto grid gap-8 px-4 py-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {feed.tag && (
              <Badge variant="secondary" className="text-sm">
                Filter: #{feed.tag}{" "}
                <Link to="/community?tab=for_you" className="ml-2 underline">
                  clear
                </Link>
              </Badge>
            )}
            {isAuthenticated ? (
              <PostComposer
                disabled={!user}
                onSubmit={async (body, opts) => {
                  await feed.createPost(body, opts);
                  toast.success("Posted");
                }}
              />
            ) : (
              <Card>
                <CardContent className="p-6 text-sm text-muted-foreground">
                  <Link to="/login" className="font-medium text-primary">
                    Sign in
                  </Link>{" "}
                  to post, like, comment, and follow creators.
                </CardContent>
              </Card>
            )}
            {feed.loading ? (
              <Skeleton className="h-40 w-full" />
            ) : (
              <div className="space-y-4">
                {displayPosts.map((p) => (
                  <PostCard key={p.id} post={p} onLike={() => void feed.like(p)} onFlag={() => void flag(p.id)} />
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 font-semibold">
                  <Bell className="h-4 w-4" />
                  Community alerts
                </div>
                <ul className="mt-3 max-h-56 space-y-2 overflow-y-auto text-xs">
                  {notifs.length === 0 && (
                    <li className="text-muted-foreground">No alerts yet (likes & comments notify here).</li>
                  )}
                  {notifs.map((n) => (
                    <li key={n.id}>
                      <Link
                        to={n.link ?? "/community"}
                        className={`block rounded-md border p-2 hover:bg-muted/50 ${n.isRead ? "opacity-60" : ""}`}
                        onClick={() => user && void markNotificationRead(n.id, user.id)}
                      >
                        <span className="font-medium">{n.title}</span>
                        <p className="text-muted-foreground">{n.message}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 font-semibold">
                  <Hash className="h-4 w-4" />
                  Trending hashtags
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {feed.trending.map((t) => (
                    <Link key={t.hashtag} to={`/community?tag=${encodeURIComponent(t.hashtag)}`}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        #{t.hashtag} · {t.count}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="font-semibold">Auto groups</div>
                <p className="mt-1 text-xs text-muted-foreground">Joined by interest & city — discover curated rooms.</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {feed.groups.slice(0, 6).map((g) => (
                    <li key={g.id}>
                      <Link to={`/community/groups/${g.slug}`} className="text-primary hover:underline">
                        {g.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      )}
    </div>
  );
}
